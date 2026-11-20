using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace JellyAd
{
    /// <summary>
    /// Jelly pixel-puzzle playable.
    /// Tap a jelly -> it rides the conveyor around the picture and eats the first exposed pixel
    /// of its own colour in every row/column it passes. Leftover jellies park in slots; slots full = fail.
    /// Everything is built from code: drop this component on an empty GameObject and press Play.
    /// </summary>
    [DisallowMultipleComponent]
    public class JellyGame : MonoBehaviour
    {
        [Header("Picture")]
        [Tooltip("Optional. Needs Read/Write enabled in import settings. Gets pixelated onto the board and shown as the intro hook.")]
        public Texture2D sourceImage;
        [Range(8, 24)] public int gridSize = 16;
        public Color[] palette =
        {
            new Color(0.95f, 0.27f, 0.33f), // 0 red
            new Color(0.24f, 0.55f, 0.98f), // 1 blue
            new Color(1.00f, 0.82f, 0.22f), // 2 yellow
            new Color(0.42f, 0.85f, 0.32f), // 3 green
            new Color(0.66f, 0.42f, 0.95f), // 4 purple
            new Color(1.00f, 0.56f, 0.18f), // 5 orange
            new Color(1.00f, 0.55f, 0.80f), // 6 pink
            new Color(0.96f, 0.96f, 0.98f), // 7 white
        };

        [Header("Gameplay")]
        [Range(2, 5)] public int columns = 4;
        [Range(3, 7)] public int slotCount = 5;
        [Range(1, 8)] public int beltCapacity = 5;
        public float beltSpeed = 5.5f;
        public int[] chunkSizes = { 30, 20, 10 };

        [Header("Ad")]
        public string gameTitle = "JELLY FLOW";
        public string levelLabel = "LEVEL 7";
        public string introBanner = "CLEAR THE PICTURE!";
        public string ctaText = "PLAY NOW";
        public string storeUrl = "https://play.google.com/store";
        [Tooltip("Force the endcard after this many seconds of play (0 = never).")]
        public float endcardAfterSeconds = 45f;
        public bool showTutorial = true;

        [Header("Video recording (auto-play)")]
        [Tooltip("The game plays itself with a visible hand. Use with Unity Recorder for the video ad.")]
        public bool autoPlay;
        public float autoTapInterval = 0.9f;
        [Tooltip("Near the end the hand starts making wrong moves so the video ends on a 'so close' fail.")]
        public bool autoPlayFailEnding = true;
        [Range(0f, 1f)] public float failAfterProgress = 0.85f;
        public int randomSeed = 7;

        // ---------------------------------------------------------------- layout
        const float BoardSize = 6.4f, BoardCenterY = 3.4f, BeltInset = 0.55f, TrackWidth = 0.8f;
        const float SlotY = -1.75f, StackTopY = -3.1f, StackSpacing = 1.05f, ColSpacing = 1.8f;
        const float StackScale = 0.95f, StackBackScale = 0.8f, SlotScale = 0.8f, BeltScale = 0.72f;

        static readonly string[] DefaultPicture =
        {
            "BBBBBBBBBBBBBBYB",
            "BYBBBBBBBBBBBBBB",
            "BBRRRRBBBBRRRRBB",
            "BRRPPRRBBRRRRRRB",
            "BRPPRRRRRRRRRRRB",
            "BRPRRRRRRRRRRRRB",
            "BRRRRRRRRRRRRRRB",
            "BBRRRRRRRRRRRRBB",
            "BBBRRRRRRRRRRBBB",
            "BBBBRRRRRRRRBBBB",
            "BBBBBRRRRRRBBBBB",
            "BBBBBBRRRRBBBBBB",
            "BBBBBBBRRBBBBBBY",
            "BBYBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBB",
        };

        enum Phase { Intro, Play, Result, End }
        Phase phase = Phase.Intro;

        Camera cam;
        Transform world, fx;
        SpriteRenderer bg;
        PixelBoard board;
        float cellVisual;
        float xMin, xMax, yMin, yMax, perim;
        List<Jelly>[] cols;
        Jelly[] slots;
        SpriteRenderer[] slotBgs;
        readonly List<Jelly> moving = new List<Jelly>();
        SpriteRenderer[] dashes;
        Label capLabel;
        System.Random rng;

        Transform hand, handArt;
        SpriteRenderer handRing;
        bool handBusy, tutorialVisible;
        Jelly tutorialTarget;
        float tapFx = 1f;

        float playTime, idleTime, autoTimer;

        Image progressFill;
        Text bannerText;
        GameObject endcard;
        Text endSub;
        RectTransform ctaRt, endCardRt;

        float Progress => board.Total == 0 ? 1f : 1f - (float)board.AliveCount / board.Total;

        // ================================================================ setup
        void Start()
        {
            rng = new System.Random(randomSeed);
            Application.targetFrameRate = 60;

            cam = Camera.main;
            if (!cam)
            {
                var cgo = new GameObject("Main Camera") { tag = "MainCamera" };
                cam = cgo.AddComponent<Camera>();
            }
            cam.orthographic = true;
            cam.transform.position = new Vector3(0f, 0f, -10f);
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.16f, 0.18f, 0.42f);

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;

            bg = Res.Spr("Background", world, Res.Gradient(new Color(0.40f, 0.46f, 0.92f), new Color(0.14f, 0.15f, 0.38f)),
                Color.white, -100, Vector3.zero, Vector2.one);

            BuildBoard();
            BuildBelt();
            BuildSlots();
            BuildJellies();
            BuildHand();
            BuildUI();
            FitCamera();
            StartCoroutine(Intro());
        }

        void FitCamera()
        {
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            cam.orthographicSize = Mathf.Max(9.2f, 4.5f / a);
            float h = cam.orthographicSize * 2f;
            bg.transform.localScale = new Vector3(h * a * 1.05f, h * 1.05f, 1f);
        }

        int[] BuildPicture(out int n)
        {
            if (sourceImage != null && sourceImage.isReadable)
            {
                n = gridSize;
                var res = new int[n * n];
                for (int r = 0; r < n; r++)
                    for (int c = 0; c < n; c++)
                    {
                        var col = sourceImage.GetPixelBilinear((c + 0.5f) / n, (r + 0.5f) / n);
                        res[r * n + c] = col.a < 0.5f ? -1 : Nearest(col);
                    }
                return res;
            }
            if (sourceImage != null)
                Debug.LogWarning("[JellyGame] sourceImage is not Read/Write enabled - using the default heart picture.");

            n = DefaultPicture.Length;
            var map = new int[n * n];
            for (int r = 0; r < n; r++)
            {
                string line = DefaultPicture[n - 1 - r]; // rows are stored top-first
                for (int c = 0; c < n; c++)
                {
                    char ch = c < line.Length ? line[c] : 'B';
                    map[r * n + c] = ch switch
                    {
                        'R' => 0, 'B' => 1, 'Y' => 2, 'G' => 3, 'U' => 4, 'O' => 5, 'P' => 6, 'W' => 7, _ => -1
                    };
                }
            }
            return map;
        }

        int Nearest(Color c)
        {
            int best = 0;
            float bd = float.MaxValue;
            for (int i = 0; i < palette.Length; i++)
            {
                var p = palette[i];
                float d = (p.r - c.r) * (p.r - c.r) * 0.3f + (p.g - c.g) * (p.g - c.g) * 0.59f + (p.b - c.b) * (p.b - c.b) * 0.11f;
                if (d < bd) { bd = d; best = i; }
            }
            return best;
        }

        void BuildBoard()
        {
            var pic = BuildPicture(out int n);
            board = new PixelBoard
            {
                N = n,
                Cell = BoardSize / n,
                Min = new Vector2(-BoardSize * 0.5f, BoardCenterY - BoardSize * 0.5f),
                color = pic,
                alive = new bool[n * n],
                sr = new SpriteRenderer[n * n],
            };
            cellVisual = board.Cell * 0.92f;

            var root = new GameObject("Board").transform;
            root.SetParent(world, false);
            float trackOuter = BoardSize + 2f * BeltInset + TrackWidth;
            float trackInner = BoardSize + 2f * BeltInset - TrackWidth;
            Res.Spr("Track", root, Res.Round(48), new Color(0.07f, 0.08f, 0.15f), 1,
                new Vector3(0f, BoardCenterY, 0f), Vector2.one * trackOuter, true);
            Res.Spr("Panel", root, Res.Round(96), new Color(0.13f, 0.14f, 0.26f), 2,
                new Vector3(0f, BoardCenterY, 0f), Vector2.one * trackInner, true);

            for (int i = 0; i < pic.Length; i++)
            {
                if (pic[i] < 0) continue;
                board.alive[i] = true;
                board.AliveCount++;
                var s = Res.Spr("px", root, Res.Bead, palette[pic[i]], 10, board.Pos(i), Vector2.one * cellVisual);
                s.transform.localScale = Vector3.zero;
                board.sr[i] = s;
            }
            board.Total = board.AliveCount;
        }

        void BuildBelt()
        {
            xMin = board.Min.x - BeltInset;
            xMax = board.Min.x + BoardSize + BeltInset;
            yMin = board.Min.y - BeltInset;
            yMax = board.Min.y + BoardSize + BeltInset;
            perim = 2f * ((xMax - xMin) + (yMax - yMin));

            int count = Mathf.RoundToInt(perim / 0.5f);
            dashes = new SpriteRenderer[count];
            var root = new GameObject("Belt").transform;
            root.SetParent(world, false);
            for (int i = 0; i < count; i++)
                dashes[i] = Res.Spr("dash", root, Res.Square, new Color(1f, 1f, 1f, 0.10f), 3, Vector3.zero,
                    new Vector2(0.24f, 0.07f));

            capLabel = Res.MakeLabel(root, "", 0.38f, new Color(1f, 1f, 1f, 0.9f), 6,
                new Vector3(xMin + 0.15f, yMin - 0.65f, 0f));
        }

        void BuildSlots()
        {
            slots = new Jelly[slotCount];
            slotBgs = new SpriteRenderer[slotCount];
            var root = new GameObject("Slots").transform;
            root.SetParent(world, false);
            for (int i = 0; i < slotCount; i++)
                slotBgs[i] = Res.Spr("slot", root, Res.Round(160), new Color(0.08f, 0.09f, 0.2f, 0.85f), 4,
                    SlotPos(i), Vector2.one * 0.95f, true);
        }

        Vector3 SlotPos(int i) => new Vector3((i - (slotCount - 1) * 0.5f) * 1.15f, SlotY, 0f);
        float ColX(int c) => (c - (columns - 1) * 0.5f) * ColSpacing;

        void BuildJellies()
        {
            // Split every colour's pixel count into jellies (30/20/10...), so totals match the picture exactly.
            int pc = palette.Length;
            var total = new int[pc];
            var depthSum = new float[pc];
            int n = board.N;
            for (int i = 0; i < board.color.Length; i++)
            {
                int col = board.color[i];
                if (col < 0) continue;
                total[col]++;
                int c = i % n, r = i / n;
                depthSum[col] += Mathf.Min(Mathf.Min(c, r), Mathf.Min(n - 1 - c, n - 1 - r));
            }

            var chunks = new List<(int col, int cnt, float key)>();
            for (int col = 0; col < pc; col++)
            {
                int rem = total[col];
                float depth = rem > 0 ? depthSum[col] / rem : 0f;
                while (rem > 0)
                {
                    int size = Mathf.Min(chunkSizes[rng.Next(chunkSizes.Length)], rem);
                    if (rem - size > 0 && rem - size < 5) size = rem;
                    // outer colours first, with some shuffle so the player has real choices
                    chunks.Add((col, size, depth + (float)rng.NextDouble() * 2.5f));
                    rem -= size;
                }
            }
            chunks.Sort((a, b) => a.key.CompareTo(b.key));

            cols = new List<Jelly>[columns];
            for (int c = 0; c < columns; c++) cols[c] = new List<Jelly>();
            for (int k = 0; k < chunks.Count; k++)
            {
                var j = MakeJelly(chunks[k].col, chunks[k].cnt);
                cols[k % columns].Add(j);
            }
            for (int c = 0; c < columns; c++)
                for (int k = 0; k < cols[c].Count; k++)
                {
                    var j = cols[c][k];
                    j.transform.position = new Vector3(ColX(c), StackTopY - Mathf.Min(k, 4) * StackSpacing, 0f);
                    j.target = j.transform.position;
                }
        }

        Jelly MakeJelly(int colorIdx, int count)
        {
            var go = new GameObject("Jelly");
            go.transform.SetParent(world, false);
            var j = go.AddComponent<Jelly>();
            j.group = go.AddComponent<SortingGroup>();
            j.group.sortingOrder = 20;
            j.colorIdx = colorIdx;
            j.baseColor = palette[colorIdx];
            var t = go.transform;
            Res.Spr("shadow", t, Res.Soft, new Color(0f, 0f, 0f, 0.35f), -1, new Vector3(0f, -0.44f, 0f), new Vector2(1.0f, 0.32f));
            j.body = Res.Spr("body", t, Res.Round(128), j.baseColor, 0, Vector3.zero, new Vector2(1f, 0.92f), true);
            Res.Spr("shine", t, Res.Soft, new Color(1f, 1f, 1f, 0.5f), 1, new Vector3(-0.24f, 0.25f, 0f), new Vector2(0.38f, 0.24f));
            for (int s = -1; s <= 1; s += 2)
            {
                Res.Spr("eye", t, Res.Circle, Color.white, 2, new Vector3(s * 0.17f, 0.14f, 0f), Vector2.one * 0.22f);
                Res.Spr("pupil", t, Res.Circle, new Color(0.1f, 0.1f, 0.16f), 3, new Vector3(s * 0.17f + 0.02f, 0.12f, 0f), Vector2.one * 0.11f);
            }
            j.label = Res.MakeLabel(t, "", 0.34f, Color.white, 5, new Vector3(0f, -0.2f, 0f));
            j.SetCount(count);
            j.state = JState.Stack;
            j.curScale = j.targetScale = 0f;
            go.transform.localScale = Vector3.zero;
            return j;
        }

        void RelayoutStacks()
        {
            for (int c = 0; c < columns; c++)
                for (int k = 0; k < cols[c].Count; k++)
                {
                    var j = cols[c][k];
                    j.state = JState.Stack;
                    j.target = new Vector3(ColX(c), StackTopY - Mathf.Min(k, 4) * StackSpacing, 0f);
                    j.targetScale = k == 0 ? StackScale : (k < 4 ? StackBackScale : 0f);
                    j.SetDim(k > 0);
                    j.group.sortingOrder = 20 - k;
                }
        }

        void BuildHand()
        {
            hand = new GameObject("Hand").transform;
            hand.SetParent(world, false);
            hand.gameObject.AddComponent<SortingGroup>().sortingOrder = 200;
            handRing = Res.Spr("ring", hand, Res.Ring, new Color(1f, 1f, 1f, 0f), 0, Vector3.zero, Vector2.one * 0.9f);
            handArt = new GameObject("art").transform;
            handArt.SetParent(hand, false);
            handArt.localRotation = Quaternion.Euler(0f, 0f, 25f);

            var custom = Resources.Load<Sprite>("hand"); // optional: Assets/JellyPuzzle/Resources/hand.png
            if (custom)
            {
                Res.Spr("img", handArt, custom, Color.white, 2, new Vector3(0.3f, -0.6f, 0f), Vector2.one);
            }
            else
            {
                HandShape(handArt, new Color(0.1f, 0.1f, 0.16f), 0.08f, 1);
                HandShape(handArt, Color.white, 0f, 2);
            }
            hand.gameObject.SetActive(false);
        }

        static void HandShape(Transform p, Color c, float g, int order)
        {
            var r = Res.Round(512);
            Res.Spr("finger", p, r, c, order, new Vector3(0f, -0.38f, 0f), new Vector2(0.26f + g, 0.8f + g), true);
            Res.Spr("k1", p, r, c, order, new Vector3(0.21f, -0.62f, 0f), new Vector2(0.22f + g, 0.46f + g), true);
            Res.Spr("k2", p, r, c, order, new Vector3(0.39f, -0.7f, 0f), new Vector2(0.2f + g, 0.4f + g), true);
            Res.Spr("palm", p, r, c, order, new Vector3(0.16f, -0.98f, 0f), new Vector2(0.68f + g, 0.62f + g), true);
            var th = Res.Spr("thumb", p, r, c, order, new Vector3(-0.2f, -0.86f, 0f), new Vector2(0.22f + g, 0.5f + g), true);
            th.transform.localRotation = Quaternion.Euler(0f, 0f, 40f);
        }

        // ================================================================ UI
        void BuildUI()
        {
            var cgo = new GameObject("UI", typeof(RectTransform));
            var canvas = cgo.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 10;
            var sc = cgo.AddComponent<CanvasScaler>();
            sc.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            sc.referenceResolution = new Vector2(1080f, 1920f);
            sc.matchWidthOrHeight = 0.5f;
            var root = cgo.transform;
            var top = new Vector2(0.5f, 1f);

            UIText(root, levelLabel, 62, Color.white, top, new Vector2(0f, -70f));
            var barBg = UIImage(root, Res.Round(128), new Color(0f, 0f, 0f, 0.35f), top, new Vector2(0f, -145f), new Vector2(620f, 40f), true);
            progressFill = UIImage(barBg.transform, Res.Square, new Color(0.45f, 0.95f, 0.4f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(604f, 26f), false);
            progressFill.type = Image.Type.Filled;
            progressFill.fillMethod = Image.FillMethod.Horizontal;
            progressFill.fillOrigin = 0;
            progressFill.fillAmount = 0f;

            bannerText = UIText(root, "", 104, Color.white, new Vector2(0.5f, 0.5f), new Vector2(0f, 355f));
            bannerText.gameObject.SetActive(false);

            // endcard
            endcard = new GameObject("Endcard", typeof(RectTransform));
            var ert = (RectTransform)endcard.transform;
            ert.SetParent(root, false);
            ert.anchorMin = Vector2.zero;
            ert.anchorMax = Vector2.one;
            ert.offsetMin = ert.offsetMax = Vector2.zero;
            endcard.AddComponent<Image>().color = new Color(0.03f, 0.03f, 0.1f, 0.82f);

            var card = UIImage(ert, Res.Round(64), new Color(0.27f, 0.32f, 0.78f), new Vector2(0.5f, 0.5f), new Vector2(0f, 60f), new Vector2(900f, 1000f), true);
            endCardRt = card.rectTransform;
            var title = UIText(endCardRt, gameTitle, 140, new Color(1f, 0.85f, 0.25f), new Vector2(0.5f, 0.5f), new Vector2(0f, 300f));
            title.GetComponent<Outline>().effectDistance = new Vector2(7f, -7f);
            endSub = UIText(endCardRt, "", 58, Color.white, new Vector2(0.5f, 0.5f), new Vector2(0f, 110f));

            // little jelly mascots on the endcard
            for (int i = 0; i < 3; i++)
            {
                var m = UIImage(endCardRt, Res.Round(128), palette[i % palette.Length], new Vector2(0.5f, 0.5f),
                    new Vector2((i - 1) * 190f, -80f), new Vector2(150f, 138f), true);
                UIImage(m.transform, Res.Circle, Color.white, new Vector2(0.5f, 0.5f), new Vector2(-26f, 18f), new Vector2(34f, 34f), false);
                UIImage(m.transform, Res.Circle, Color.white, new Vector2(0.5f, 0.5f), new Vector2(26f, 18f), new Vector2(34f, 34f), false);
                UIImage(m.transform, Res.Circle, Color.black, new Vector2(0.5f, 0.5f), new Vector2(-23f, 15f), new Vector2(16f, 16f), false);
                UIImage(m.transform, Res.Circle, Color.black, new Vector2(0.5f, 0.5f), new Vector2(29f, 15f), new Vector2(16f, 16f), false);
            }

            var cta = UIImage(endCardRt, Res.Round(64), new Color(0.3f, 0.85f, 0.35f), new Vector2(0.5f, 0.5f), new Vector2(0f, -320f), new Vector2(640f, 170f), true);
            ctaRt = cta.rectTransform;
            UIText(ctaRt, ctaText, 82, Color.white, new Vector2(0.5f, 0.5f), new Vector2(0f, 4f));
            endcard.SetActive(false);
        }

        static Text UIText(Transform parent, string s, int size, Color c, Vector2 anchor, Vector2 pos)
        {
            var go = new GameObject("Text", typeof(RectTransform));
            var rt = (RectTransform)go.transform;
            rt.SetParent(parent, false);
            rt.anchorMin = rt.anchorMax = anchor;
            rt.anchoredPosition = pos;
            rt.sizeDelta = new Vector2(1000f, size * 1.4f);
            var t = go.AddComponent<Text>();
            t.font = Res.Font;
            t.text = s;
            t.fontSize = size;
            t.fontStyle = FontStyle.Bold;
            t.color = c;
            t.alignment = TextAnchor.MiddleCenter;
            t.horizontalOverflow = HorizontalWrapMode.Overflow;
            t.verticalOverflow = VerticalWrapMode.Overflow;
            t.raycastTarget = false;
            var o = go.AddComponent<Outline>();
            o.effectColor = new Color(0f, 0f, 0f, 0.6f);
            o.effectDistance = new Vector2(4f, -4f);
            return t;
        }

        static Image UIImage(Transform parent, Sprite s, Color c, Vector2 anchor, Vector2 pos, Vector2 size, bool sliced)
        {
            var go = new GameObject("Image", typeof(RectTransform));
            var rt = (RectTransform)go.transform;
            rt.SetParent(parent, false);
            rt.anchorMin = rt.anchorMax = anchor;
            rt.anchoredPosition = pos;
            rt.sizeDelta = size;
            var img = go.AddComponent<Image>();
            img.sprite = s;
            img.color = c;
            img.type = sliced ? Image.Type.Sliced : Image.Type.Simple;
            img.raycastTarget = false;
            return img;
        }

        // ================================================================ flow
        IEnumerator Intro()
        {
            phase = Phase.Intro;
            SpriteRenderer src = null;
            if (sourceImage)
            {
                var sp = Sprite.Create(sourceImage, new Rect(0, 0, sourceImage.width, sourceImage.height),
                    new Vector2(0.5f, 0.5f), Mathf.Max(sourceImage.width, sourceImage.height));
                src = Res.Spr("SourceImage", world, sp, Color.white, 50, Vector3.zero, Vector2.one * 9.5f);
                yield return new WaitForSeconds(1.1f);
                for (float k = 0f; k < 1f; k += Time.deltaTime / 0.5f)
                {
                    float e = Ease(k);
                    src.transform.position = Vector3.Lerp(Vector3.zero, new Vector3(0f, BoardCenterY, 0f), e);
                    src.transform.localScale = Vector3.one * Mathf.Lerp(9.5f, BoardSize, e);
                    yield return null;
                }
                src.transform.position = new Vector3(0f, BoardCenterY, 0f);
                src.transform.localScale = Vector3.one * BoardSize;
            }

            // pixelate: cells pop in from the centre outwards
            var order = new List<int>();
            for (int i = 0; i < board.alive.Length; i++) if (board.alive[i]) order.Add(i);
            var centre = new Vector3(0f, BoardCenterY, 0f);
            order.Sort((a, b) => (board.Pos(a) - centre).sqrMagnitude.CompareTo((board.Pos(b) - centre).sqrMagnitude));
            for (int k = 0; k < order.Count; k++)
                StartCoroutine(PopIn(order[k], k / (float)order.Count * 0.8f));
            if (src) StartCoroutine(FadeOut(src, 0.9f));
            yield return new WaitForSeconds(0.95f);

            Banner(introBanner, Color.white);
            RelayoutStacks();
            yield return new WaitForSeconds(0.5f);

            phase = Phase.Play;
            UpdateProgress();
            if (showTutorial && !autoPlay) ShowTutorial();
        }

        void Update()
        {
            float dt = Time.deltaTime;
            FitCamera();
            AnimateDashes();
            UpdateHand(dt);
            if (capLabel) capLabel.Text = (beltCapacity - moving.Count) + "/" + beltCapacity;
            if (endcard.activeSelf)
            {
                ctaRt.localScale = Vector3.one * (1f + 0.06f * Mathf.Sin(Time.time * 6f));
                endCardRt.localScale = Vector3.Lerp(endCardRt.localScale, Vector3.one, 1f - Mathf.Exp(-10f * dt));
            }

            if (GetTap(out var sp))
            {
                idleTime = 0f;
                OnTap(cam.ScreenToWorldPoint(new Vector3(sp.x, sp.y, 10f)));
            }

            if (phase != Phase.Play) return;
            playTime += dt;
            idleTime += dt;
            SimulateBelt(dt);
            if (phase != Phase.Play) return;

            if (autoPlay)
            {
                autoTimer += dt;
                if (!handBusy && autoTimer >= autoTapInterval && CanEnter())
                {
                    bool worst = autoPlayFailEnding && Progress >= failAfterProgress;
                    var j = BestCandidate(worst);
                    if (j)
                    {
                        autoTimer = 0f;
                        StartCoroutine(AutoTap(j));
                    }
                }
            }
            else if (showTutorial && !tutorialVisible && idleTime > 4f)
            {
                ShowTutorial();
            }

            if (endcardAfterSeconds > 0f && playTime > endcardAfterSeconds) ShowEndcard(false);
        }

        static bool GetTap(out Vector2 pos)
        {
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
            var p = UnityEngine.InputSystem.Pointer.current;
            if (p != null && p.press.wasPressedThisFrame) { pos = p.position.ReadValue(); return true; }
#else
            if (Input.GetMouseButtonDown(0)) { pos = Input.mousePosition; return true; }
#endif
            pos = default;
            return false;
        }

        void OnTap(Vector3 w)
        {
            if (phase == Phase.End) { AdKit.Sfx.Play(AdKit.Sfx.Id.Click); StoreLink.Open(storeUrl); return; }
            if (phase != Phase.Play) return;
            HideTutorial();

            for (int i = 0; i < slotCount; i++)
                if (slots[i] && Vector2.Distance(w, SlotPos(i)) < 0.6f) { TrySend(slots[i]); return; }

            if (w.y < StackTopY + 0.7f)
            {
                int best = -1;
                float bd = 0.95f;
                for (int c = 0; c < columns; c++)
                {
                    float d = Mathf.Abs(w.x - ColX(c));
                    if (d < bd && cols[c].Count > 0) { bd = d; best = c; }
                }
                if (best >= 0) TrySend(cols[best][0]);
            }
        }

        bool CanEnter()
        {
            if (moving.Count >= beltCapacity) return false;
            foreach (var m in moving)
                if (m.state == JState.Entering || m.t < 0.95f) return false;
            return true;
        }

        bool TrySend(Jelly j)
        {
            if (!j || phase != Phase.Play) return false;
            if (!CanEnter()) { j.Kick(); AdKit.Sfx.Play(AdKit.Sfx.Id.Error, 0.6f, 1f, 0f, 0.15f); return false; }

            bool found = false;
            for (int c = 0; c < columns && !found; c++)
                if (cols[c].Count > 0 && cols[c][0] == j) { cols[c].RemoveAt(0); found = true; }
            for (int i = 0; i < slotCount && !found; i++)
                if (slots[i] == j) { slots[i] = null; found = true; }
            if (!found) return false;

            RelayoutStacks();
            AdKit.Sfx.Play(AdKit.Sfx.Id.Jump);
            j.state = JState.Entering;
            j.enterFrom = j.transform.position;
            j.enterTimer = 0f;
            j.lastSide = j.lastLane = -1;
            j.group.sortingOrder = 40;
            j.targetScale = BeltScale;
            j.SetDim(false);
            moving.Add(j);
            return true;
        }

        void SimulateBelt(float dt)
        {
            for (int i = moving.Count - 1; i >= 0; i--)
            {
                var j = moving[i];
                if (j.state == JState.Entering)
                {
                    j.enterTimer += dt / 0.28f;
                    float e = Mathf.Clamp01(j.enterTimer);
                    var p = Vector3.Lerp(j.enterFrom, BeltPos(0f), Ease(e));
                    p.y += Mathf.Sin(e * Mathf.PI) * 0.8f;
                    j.transform.position = p;
                    if (j.enterTimer >= 1f)
                    {
                        j.state = JState.Belt;
                        j.t = 0f;
                        j.Kick();
                    }
                    continue;
                }

                j.t += beltSpeed * dt;
                j.transform.position = BeltPos(j.t);
                TryFire(j);

                if (j.count <= 0)
                {
                    moving.RemoveAt(i);
                    AdKit.Sfx.Play(AdKit.Sfx.Id.JellyPop);
                    StartCoroutine(PopJelly(j));
                    continue;
                }

                if (j.t >= perim)
                {
                    moving.RemoveAt(i);
                    int s = FreeSlot();
                    j.state = JState.Slot;
                    j.group.sortingOrder = 30;
                    if (s < 0)
                    {
                        j.target = j.transform.position;
                        StartCoroutine(FailRoutine());
                        return;
                    }
                    slots[s] = j;
                    j.target = SlotPos(s);
                    j.targetScale = SlotScale;
                    j.Kick();
                    AdKit.Sfx.Play(AdKit.Sfx.Id.Land, 0.8f);
                }
            }
        }

        int FreeSlot()
        {
            for (int i = 0; i < slotCount; i++) if (!slots[i]) return i;
            return -1;
        }

        Vector3 BeltPos(float t)
        {
            float w = xMax - xMin, h = yMax - yMin;
            t = Mathf.Repeat(t, perim);
            if (t < w) return new Vector3(xMin + t, yMin, 0f);
            t -= w;
            if (t < h) return new Vector3(xMax, yMin + t, 0f);
            t -= h;
            if (t < w) return new Vector3(xMax - t, yMax, 0f);
            t -= w;
            return new Vector3(xMin, yMax - t, 0f);
        }

        /// <summary>side: 0 bottom, 1 right, 2 top, 3 left. lane = column (bottom/top) or row (left/right), -1 if off the board.</summary>
        void SideLane(float t, out int side, out int lane)
        {
            float w = xMax - xMin, h = yMax - yMin;
            t = Mathf.Repeat(t, perim);
            float coord;
            if (t < w) { side = 0; coord = xMin + t - board.Min.x; }
            else if (t < w + h) { side = 1; coord = yMin + (t - w) - board.Min.y; }
            else if (t < 2f * w + h) { side = 2; coord = xMax - (t - w - h) - board.Min.x; }
            else { side = 3; coord = yMax - (t - 2f * w - h) - board.Min.y; }
            lane = Mathf.FloorToInt(coord / board.Cell);
            if (coord < 0f || lane >= board.N) lane = -1;
        }

        void TryFire(Jelly j)
        {
            if (j.count <= 0) return;
            SideLane(j.t, out int side, out int lane);
            if (lane < 0) { j.lastLane = -1; return; }
            if (side == j.lastSide && lane == j.lastLane) return;
            j.lastSide = side;
            j.lastLane = lane;

            int idx = board.FirstAlive(side, lane);
            if (idx < 0 || board.color[idx] != j.colorIdx) return;

            board.Kill(idx);
            AdKit.Sfx.Play(AdKit.Sfx.Id.Pop, 0.55f, 0.9f + 0.6f * Progress, 0.08f, 0.03f);
            j.SetCount(j.count - 1);
            j.Kick();
            StartCoroutine(Shot(j.transform.position, idx, palette[j.colorIdx]));
            UpdateProgress();
            if (board.AliveCount == 0) StartCoroutine(WinRoutine());
        }

        void UpdateProgress()
        {
            if (progressFill) progressFill.fillAmount = Progress;
        }

        Jelly BestCandidate(bool worst)
        {
            var cand = new List<Jelly>();
            for (int c = 0; c < columns; c++) if (cols[c].Count > 0) cand.Add(cols[c][0]);
            if (!worst) for (int i = 0; i < slotCount; i++) if (slots[i]) cand.Add(slots[i]);
            if (cand.Count == 0) return null;

            var cache = new Dictionary<int, int>();
            Jelly best = null;
            float bs = worst ? float.MaxValue : float.MinValue;
            foreach (var j in cand)
            {
                if (!cache.TryGetValue(j.colorIdx, out int exp)) cache[j.colorIdx] = exp = board.Exposed(j.colorIdx);
                float s = Mathf.Min(exp, j.count) + (j.state == JState.Slot ? 0.5f : 0f);
                if (worst ? s < bs : s > bs) { bs = s; best = j; }
            }
            return best;
        }

        IEnumerator WinRoutine()
        {
            if (phase != Phase.Play) yield break;
            phase = Phase.Result;
            HideTutorial();
            yield return new WaitForSeconds(0.4f);
            Banner("AMAZING!", new Color(1f, 0.88f, 0.3f));
            AdKit.Sfx.Play(AdKit.Sfx.Id.Win, 1f, 1f, 0f);
            // the finished artwork reappears as a reward
            int n = board.N;
            for (int i = 0; i < board.color.Length; i++)
                if (board.sr[i]) StartCoroutine(PopIn(i, (i / n) * 0.035f));
            for (int k = 0; k < 6; k++)
            {
                StartCoroutine(Burst(new Vector3(Random.Range(-3f, 3f), Random.Range(1f, 7f), 0f),
                    palette[Random.Range(0, palette.Length)], 18, 6f, 1.1f));
                yield return new WaitForSeconds(0.15f);
            }
            yield return new WaitForSeconds(1.2f);
            ShowEndcard(true);
        }

        IEnumerator FailRoutine()
        {
            if (phase != Phase.Play) yield break;
            phase = Phase.Result;
            HideTutorial();
            Banner("OUT OF SPACE!", new Color(1f, 0.35f, 0.35f));
            AdKit.Sfx.Play(AdKit.Sfx.Id.Fail, 1f, 1f, 0f);
            StartCoroutine(Shake(0.45f, 0.25f));
            for (float k = 0f; k < 1.2f; k += Time.deltaTime)
            {
                var c = Color.Lerp(new Color(0.08f, 0.09f, 0.2f, 0.85f), new Color(0.9f, 0.15f, 0.2f, 0.9f),
                    Mathf.PingPong(k * 5f, 1f));
                foreach (var s in slotBgs) s.color = c;
                yield return null;
            }
            yield return new WaitForSeconds(0.4f);
            ShowEndcard(false);
        }

        void ShowEndcard(bool win)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            tutorialVisible = false;
            hand.gameObject.SetActive(false);
            bannerText.gameObject.SetActive(false);
            endSub.text = win ? "Can you beat the next level?" : "So close! Can you finish it?";
            endCardRt.localScale = Vector3.one * 0.6f;
            endcard.SetActive(true);
        }

        // ================================================================ hand / tutorial
        void ShowTutorial()
        {
            tutorialTarget = BestCandidate(false);
            if (!tutorialTarget) return;
            tutorialVisible = true;
            hand.gameObject.SetActive(true);
            tapFx = 1f;
        }

        void HideTutorial()
        {
            if (!tutorialVisible) return;
            tutorialVisible = false;
            if (!autoPlay) hand.gameObject.SetActive(false);
        }

        void UpdateHand(float dt)
        {
            if (!hand.gameObject.activeSelf) return;
            tapFx += dt;
            if (tutorialVisible)
            {
                if (!tutorialTarget || tutorialTarget.state == JState.Dead) { HideTutorial(); return; }
                hand.position = tutorialTarget.transform.position + new Vector3(0.1f, -0.05f, 0f);
                if (tapFx > 0.9f) tapFx = 0f;
            }
            float f = Mathf.Clamp01(tapFx / 0.45f);
            handRing.transform.localScale = Vector3.one * Mathf.Lerp(0.3f, 1.2f, f);
            handRing.color = new Color(1f, 1f, 1f, (1f - f) * 0.9f);
            handArt.localScale = Vector3.one * (1f - 0.15f * Mathf.Sin(Mathf.PI * Mathf.Clamp01(tapFx / 0.22f)));
        }

        IEnumerator AutoTap(Jelly j)
        {
            handBusy = true;
            if (!hand.gameObject.activeSelf)
            {
                hand.gameObject.SetActive(true);
                hand.position = new Vector3(2.5f, -8.5f, 0f);
                tapFx = 1f;
            }
            Vector3 a = hand.position;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.3f)
            {
                if (!j || j.state == JState.Dead) break;
                hand.position = Vector3.Lerp(a, j.transform.position + new Vector3(0.1f, -0.05f, 0f), Ease(k));
                yield return null;
            }
            tapFx = 0f;
            yield return new WaitForSeconds(0.08f);
            if (j && (j.state == JState.Stack || j.state == JState.Slot)) TrySend(j);
            yield return new WaitForSeconds(0.2f);
            handBusy = false;
        }

        // ================================================================ fx
        void AnimateDashes()
        {
            if (dashes == null) return;
            float spacing = perim / dashes.Length;
            float off = Mathf.Repeat(Time.time * beltSpeed, spacing);
            float w = xMax - xMin, h = yMax - yMin;
            for (int i = 0; i < dashes.Length; i++)
            {
                float t = Mathf.Repeat(i * spacing + off, perim);
                dashes[i].transform.position = BeltPos(t);
                bool vertical = (t >= w && t < w + h) || t >= 2f * w + h;
                dashes[i].transform.localRotation = Quaternion.Euler(0f, 0f, vertical ? 90f : 0f);
            }
        }

        void Banner(string text, Color c)
        {
            StopCoroutine(nameof(BannerAnim));
            bannerText.text = text;
            bannerText.color = c;
            StartCoroutine(nameof(BannerAnim));
        }

        IEnumerator BannerAnim()
        {
            bannerText.gameObject.SetActive(true);
            var rt = bannerText.rectTransform;
            var baseColor = bannerText.color;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.25f)
            {
                rt.localScale = Vector3.one * (k < 0.7f ? Mathf.Lerp(0f, 1.2f, k / 0.7f) : Mathf.Lerp(1.2f, 1f, (k - 0.7f) / 0.3f));
                yield return null;
            }
            rt.localScale = Vector3.one;
            yield return new WaitForSeconds(1.0f);
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.25f)
            {
                bannerText.color = new Color(baseColor.r, baseColor.g, baseColor.b, 1f - k);
                yield return null;
            }
            bannerText.gameObject.SetActive(false);
            bannerText.color = baseColor;
        }

        IEnumerator PopIn(int i, float delay)
        {
            if (delay > 0f) yield return new WaitForSeconds(delay);
            var tr = board.sr[i].transform;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.2f)
            {
                float s = k < 0.6f ? Mathf.Lerp(0f, 1.2f, k / 0.6f) : Mathf.Lerp(1.2f, 1f, (k - 0.6f) / 0.4f);
                tr.localScale = Vector3.one * cellVisual * s;
                yield return null;
            }
            tr.localScale = Vector3.one * cellVisual;
        }

        IEnumerator Shot(Vector3 from, int idx, Color c)
        {
            var p = Res.Spr("shot", fx, Res.Circle, c, 60, from, Vector2.one * 0.22f);
            Vector3 to = board.Pos(idx);
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.12f)
            {
                p.transform.position = Vector3.Lerp(from, to, k);
                yield return null;
            }
            Destroy(p.gameObject);
            if (phase == Phase.Result) yield break; // win restore owns the cells now
            var tr = board.sr[idx].transform;
            StartCoroutine(Burst(to, c, 4, 2.5f, 0.35f));
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.16f)
            {
                float s = k < 0.35f ? Mathf.Lerp(1f, 1.35f, k / 0.35f) : Mathf.Lerp(1.35f, 0f, (k - 0.35f) / 0.65f);
                tr.localScale = Vector3.one * cellVisual * s;
                yield return null;
            }
            if (phase != Phase.Result) tr.localScale = Vector3.zero;
        }

        IEnumerator PopJelly(Jelly j)
        {
            j.state = JState.Dead;
            yield return new WaitForSeconds(0.12f);
            StartCoroutine(Burst(j.transform.position, j.baseColor, 12, 4f, 0.5f));
            j.targetScale = 1.2f;
            yield return new WaitForSeconds(0.08f);
            Destroy(j.gameObject);
        }

        IEnumerator Burst(Vector3 pos, Color c, int n, float speed, float life)
        {
            var parts = new SpriteRenderer[n];
            var vel = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                parts[i] = Res.Spr("p", fx, Res.Square, c, 70, pos, Vector2.one * Random.Range(0.06f, 0.15f));
                float a = Random.value * Mathf.PI * 2f;
                vel[i] = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f) * speed * Random.Range(0.4f, 1f);
            }
            for (float t = 0f; t < life; t += Time.deltaTime)
            {
                float dt = Time.deltaTime;
                for (int i = 0; i < n; i++)
                {
                    vel[i].y -= 9f * dt;
                    parts[i].transform.position += vel[i] * dt;
                    parts[i].transform.Rotate(0f, 0f, 360f * dt);
                    var col = parts[i].color;
                    col.a = 1f - t / life;
                    parts[i].color = col;
                }
                yield return null;
            }
            foreach (var p in parts) Destroy(p.gameObject);
        }

        IEnumerator FadeOut(SpriteRenderer s, float dur)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / dur)
            {
                s.color = new Color(1f, 1f, 1f, 1f - k);
                yield return null;
            }
            Destroy(s.gameObject);
        }

        IEnumerator Shake(float dur, float amp)
        {
            var basePos = new Vector3(0f, 0f, -10f);
            for (float t = 0f; t < dur; t += Time.deltaTime)
            {
                cam.transform.position = basePos + (Vector3)Random.insideUnitCircle * amp * (1f - t / dur);
                yield return null;
            }
            cam.transform.position = basePos;
        }

        static float Ease(float k)
        {
            k = Mathf.Clamp01(k);
            return k * k * (3f - 2f * k);
        }
    }

    public class PixelBoard
    {
        public int N;
        public float Cell;
        public Vector2 Min;
        public int[] color;
        public bool[] alive;
        public SpriteRenderer[] sr;
        public int AliveCount, Total;

        public int Idx(int c, int r) => r * N + c;

        public Vector3 Pos(int i) => new Vector3(Min.x + (i % N + 0.5f) * Cell, Min.y + (i / N + 0.5f) * Cell, 0f);

        public void Kill(int i)
        {
            if (!alive[i]) return;
            alive[i] = false;
            AliveCount--;
        }

        /// <summary>First alive pixel seen from a belt side looking inward along a lane.</summary>
        public int FirstAlive(int side, int lane)
        {
            for (int k = 0; k < N; k++)
            {
                int c, r;
                switch (side)
                {
                    case 0: c = lane; r = k; break;
                    case 1: c = N - 1 - k; r = lane; break;
                    case 2: c = lane; r = N - 1 - k; break;
                    default: c = k; r = lane; break;
                }
                int i = Idx(c, r);
                if (alive[i]) return i;
            }
            return -1;
        }

        /// <summary>How many pixels of a colour are currently reachable from the belt.</summary>
        public int Exposed(int col)
        {
            var seen = new HashSet<int>();
            for (int side = 0; side < 4; side++)
                for (int lane = 0; lane < N; lane++)
                {
                    int i = FirstAlive(side, lane);
                    if (i >= 0 && color[i] == col) seen.Add(i);
                }
            return seen.Count;
        }
    }
}
