using System.Collections;
using System.Collections.Generic;
using AdKit;
using UnityEngine;
using UnityEngine.Rendering;

namespace NumberMatchAd
{
    /// <summary>
    /// Number Match playable (colour-by-number reveal).
    /// A picture is shown, then breaks into a numbered grid at 0.35s. A few cells of every colour group are missing:
    /// drag the coloured tiles from the tray onto a cell with the same number. When every cell of a number
    /// is filled, that whole colour group reveals with a wave.
    /// Includes Voodoo near-miss fail mode (stops with 1 tile / ~92% left when timer hits 00:00 -> DEFEAT + Endcard).
    /// </summary>
    [DisallowMultipleComponent]
    public class NumberMatchGame : MonoBehaviour
    {
        [Header("Picture")]
        [Tooltip("Optional. Needs Read/Write enabled. Empty = built-in pixel-art picture.")]
        public Texture2D sourceImage;
        [Range(8, 20)] public int gridSize = 16;
        [Range(0.02f, 0.4f)] public float colorTolerance = 0.1f;
        [Tooltip("Empty cells per colour group, by group number (cycled). Each group keeps at least one filled cell.")]
        public int[] missingPerGroup = { 2, 1, 2, 2, 2, 2, 1, 1 };

        [Header("Ad")]
        [LunaPlaygroundField("Game Title", 0, "Ad Settings")]
        public string gameTitle = "NUMBER MATCH";
        [LunaPlaygroundField("Intro Banner", 1, "Ad Settings")]
        public string introBanner = "MATCH NUMBERS!";
        [Tooltip("Big title on the endcard (keep it short, ~10 letters).")]
        [LunaPlaygroundField("Endcard Title", 2, "Ad Settings")]
        public string endcardTitle = "SO CLOSE!";
        [LunaPlaygroundField("CTA Text", 3, "Ad Settings")]
        public string ctaText = "PLAY NOW";
        [LunaPlaygroundField("Store URL", 4, "Ad Settings")]
        public string storeUrl = "https://apps.apple.com/us/search?term=Number+Match";
        [Tooltip("Force the endcard after this many seconds of play (0 = never).")]
        [LunaPlaygroundField("Round Timer (s)", 5, "Ad Settings")]
        public float endcardAfterSeconds = 24f;
        [Tooltip("Voodoo near-miss fail hook: time expires when only 1 tile is left (~92% complete).")]
        [LunaPlaygroundField("Near-Miss Fail Ending", 6, "Ad Settings")]
        public bool nearMissEnding = true;
        public bool showTutorial = true;

        [Header("Video recording (auto-play)")]
        [Tooltip("The game plays itself with a visible hand. Use with Unity Recorder for the video ad.")]
        [LunaPlaygroundField("Auto Play (Video Mode)", 7, "Recording")]
        public bool autoPlay;
        public float autoMoveInterval = 0.32f;
        [Tooltip("The hand makes one wrong drop early on, so the video shows the red 'wrong' feedback.")]
        [LunaPlaygroundField("Scripted Mistake", 8, "Recording")]
        public bool autoPlayOneMistake = true;
        public int randomSeed = 3;

        // ---------------------------------------------------------------- layout
        const float BoardWorld = 9.6f, BoardCenterY = 1.7f;
        const float TrayY = -5.55f, TrayRowGap = 1.32f, TraySpacing = 1.3f, PieceSize = 1.02f;
        const int TrayPerRow = 7;
        const float SnapRadius = 1.6f; // in cells

        // Exact 16x16 pixel-art layout from number-match-case-study/Assets/Textures/showcase.png
        static readonly string[] DefaultPicture =
        {
            "0000000000000000",
            "0000111221110000",
            "0001233333321000",
            "0012344554432100",
            "0023456666543200",
            "0124567887654210",
            "0134679999764310",
            "0235679AA9765320",
            "0235689BB9865320",
            "0235678998765320",
            "0134567887654310",
            "0123456666543210",
            "0012334554332100",
            "0000123333210000",
            "0000012222100000",
            "0000000000000000",
        };

        // Exact 12-colour palette sampled from showcase.png
        static Color PaletteColor(char ch)
        {
            switch (ch)
            {
                case '0': return new Color(0.949f, 0.549f, 0.749f); // Soft Pink
                case '1': return new Color(0.902f, 0.251f, 0.702f); // Magenta
                case '2': return new Color(0.651f, 0.251f, 0.800f); // Orchid Purple
                case '3': return new Color(0.451f, 0.302f, 0.851f); // Electric Violet
                case '4': return new Color(0.251f, 0.451f, 0.902f); // Royal Blue
                case '5': return new Color(0.200f, 0.702f, 0.902f); // Sky Blue
                case '6': return new Color(0.149f, 0.749f, 0.651f); // Turquoise
                case '7': return new Color(0.200f, 0.749f, 0.349f); // Emerald Green
                case '8': return new Color(0.600f, 0.851f, 0.200f); // Lime Green
                case '9': return new Color(0.949f, 0.800f, 0.149f); // Golden Yellow
                case 'A': return new Color(0.902f, 0.200f, 0.251f); // Crimson Red
                case 'B': return new Color(0.949f, 0.451f, 0.149f); // Sunset Orange
                default:  return new Color(0.949f, 0.549f, 0.749f);
            }
        }

        // Deep royal purple board styling matching number-match-case-study
        static readonly Color MaskColor = new Color(0.16f, 0.12f, 0.32f);
        static readonly Color FilledColor = new Color(0.38f, 0.30f, 0.62f);
        static readonly Color HighlightColor = new Color(1f, 0.90f, 0.42f);
        static readonly Color NumberColor = new Color(0.90f, 0.92f, 1f);
        static readonly string[] Praise = { "AMAZING!", "BRILLIANT!", "SPECTACULAR!", "UNSTOPPABLE!", "PERFECT!" };

        enum Phase { Intro, Play, Done, End }
        Phase phase = Phase.Intro;

        class CellV
        {
            public int num, c, r;
            public Color col;
            public bool filled, revealed, animating;
            public SpriteRenderer sr;
            public TextMesh tm;
        }

        class Piece
        {
            public int num;
            public Color col;
            public Transform t;
            public SortingGroup group;
            public Vector3 home;
            public bool busy;
        }

        Camera cam;
        Transform world, fx;
        SpriteRenderer bg;
        Vector3 camBase = new Vector3(0f, 0f, -10f);
        float shakeT, shakeDur, shakeAmp;

        int N;
        float cell;
        Vector2 boardMin;
        CellV[] cells;
        readonly Dictionary<int, List<int>> groups = new Dictionary<int, List<int>>();
        readonly Dictionary<int, Color> groupColor = new Dictionary<int, Color>();
        readonly List<Piece> pieces = new List<Piece>();
        Texture2D pictureTex;
        System.Random rng;

        Piece dragging;
        readonly List<int> highlighted = new List<int>();
        int combo, praiseIdx, revealedGroups;

        Transform hand, handArt;
        SpriteRenderer handRing;
        Coroutine tutorialRoutine;
        bool tutorialVisible;
        float playTime, idleTime;

        AdUI ui;
        UnityEngine.UI.Image progressFill, timerBg;
        UnityEngine.UI.Text progressText, timerText;
        int totalMissingTiles, placedTiles, lastTimerSec = -1;

        // ================================================================ setup
#if !UNITY_WEBGL
        // Desktop test builds only: "-nm-autoplay" plays itself, "-nm-shots <dir>" saves a screenshot every second.
        void Awake()
        {
            var args = System.Environment.GetCommandLineArgs();
            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == "-nm-autoplay") autoPlay = true;
                if (args[i] == "-nm-shots" && i + 1 < args.Length) StartCoroutine(CaptureShots(args[i + 1]));
            }
        }

        IEnumerator CaptureShots(string dir)
        {
            System.IO.Directory.CreateDirectory(dir);
            for (int s = 0; s < 45; s++)
            {
                yield return new WaitForSeconds(1f);
                ScreenCapture.CaptureScreenshot(System.IO.Path.Combine(dir, "shot_" + s.ToString("00") + ".png"));
            }
            Application.Quit();
        }
#endif

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
            cam.transform.position = camBase;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.06f, 0.04f, 0.14f);

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;

            bg = AdRes.Spr("Background", world, AdRes.Gradient(new Color(0.22f, 0.12f, 0.44f), new Color(0.05f, 0.03f, 0.13f)),
                Color.white, -100, Vector3.zero, Vector2.one);

            BuildPicture();
            BuildBoard();
            BuildTray();
            BuildHand();
            BuildUI();
            FitCamera();
            StartCoroutine(Intro());
        }

        void FitCamera()
        {
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            cam.orthographicSize = Mathf.Max(9.6f, 5.4f / a);
            float h = cam.orthographicSize * 2f;
            bg.transform.localScale = new Vector3(h * a * 1.05f, h * 1.05f, 1f);
        }

        /// <summary>Reads the picture into colour groups (numbered 1..k in reading order).</summary>
        void BuildPicture()
        {
            N = sourceImage ? gridSize : DefaultPicture.Length;
            cell = BoardWorld / N;
            boardMin = new Vector2(-BoardWorld * 0.5f, BoardCenterY - BoardWorld * 0.5f);
            cells = new CellV[N * N];

            var palette = new List<Color>();
            var charToNum = new Dictionary<char, int>();
            for (int r = N - 1; r >= 0; r--) // top row first, so numbering reads naturally
                for (int c = 0; c < N; c++)
                {
                    int num;
                    Color col;
                    if (sourceImage)
                    {
                        col = sourceImage.GetPixelBilinear((c + 0.5f) / N, (r + 0.5f) / N);
                        num = -1;
                        for (int k = 0; k < palette.Count; k++)
                            if (Similar(col, palette[k])) { num = k + 1; col = palette[k]; break; }
                        if (num < 0) { palette.Add(col); num = palette.Count; }
                    }
                    else
                    {
                        char ch = DefaultPicture[N - 1 - r][c];
                        if (!charToNum.TryGetValue(ch, out num)) { num = charToNum.Count + 1; charToNum[ch] = num; }
                        col = PaletteColor(ch);
                    }

                    int i = Idx(c, r);
                    cells[i] = new CellV { num = num, c = c, r = r, col = col, filled = true };
                    if (!groups.TryGetValue(num, out var list)) { groups[num] = list = new List<int>(); groupColor[num] = col; }
                    list.Add(i);
                }

            // carve out the missing cells the player has to fill
            foreach (var kv in groups)
            {
                var list = kv.Value;
                int want = missingPerGroup.Length > 0 ? missingPerGroup[(kv.Key - 1) % missingPerGroup.Length] : 1;
                int k = Mathf.Clamp(want, 1, Mathf.Max(1, list.Count - 1));
                var pool = new List<int>(list);
                for (int n = 0; n < k && pool.Count > 0; n++)
                {
                    int pick = pool[rng.Next(pool.Count)];
                    pool.Remove(pick);
                    cells[pick].filled = false;
                }
            }

            // small point-filtered texture of the finished picture (endcard)
            pictureTex = new Texture2D(N, N, TextureFormat.RGBA32, false) { filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp };
            for (int i = 0; i < cells.Length; i++) pictureTex.SetPixel(cells[i].c, cells[i].r, cells[i].col);
            pictureTex.Apply();
        }

        bool Similar(Color a, Color b) =>
            Mathf.Abs(a.r - b.r) < colorTolerance && Mathf.Abs(a.g - b.g) < colorTolerance && Mathf.Abs(a.b - b.b) < colorTolerance;

        int Idx(int c, int r) => r * N + c;
        Vector3 CellPos(int i) => new Vector3(boardMin.x + (cells[i].c + 0.5f) * cell, boardMin.y + (cells[i].r + 0.5f) * cell, 0f);

        void BuildBoard()
        {
            var board = new GameObject("Board").transform;
            board.SetParent(world, false);
            var centre = new Vector3(0f, BoardCenterY, 0f);
            AdRes.Spr("FrameOuter", board, AdRes.Round(160), new Color(0.55f, 0.42f, 0.92f), -21, centre + new Vector3(0f, -0.08f, 0f),
                Vector2.one * (BoardWorld + 0.7f), true);
            AdRes.Spr("Frame", board, AdRes.Round(160), new Color(0.16f, 0.12f, 0.31f), -20, centre, Vector2.one * (BoardWorld + 0.4f), true);

            var round = AdRes.Round(Mathf.RoundToInt(44f / (cell * 0.22f)));
            for (int i = 0; i < cells.Length; i++)
            {
                var cv = cells[i];
                // intro starts with the finished picture: the hook
                cv.sr = AdRes.Spr("Cell", board, round, cv.col, 0, CellPos(i), Vector2.one * cell * 0.9f, true);
                cv.tm = AdRes.Txt(cv.sr.transform, "n", cv.num.ToString(), cell * 0.58f, NumberColor, 1, new Vector3(0f, -cell * 0.02f, 0f));
                cv.tm.gameObject.SetActive(false);
            }
        }

        void BuildTray()
        {
            var tray = new GameObject("Tray").transform;
            tray.SetParent(world, false);

            var missing = new List<int>();
            for (int i = 0; i < cells.Length; i++) if (!cells[i].filled) missing.Add(i);
            // shuffle so the tray doesn't read in board order
            for (int i = missing.Count - 1; i > 0; i--) { int j = rng.Next(i + 1); (missing[i], missing[j]) = (missing[j], missing[i]); }

            int rows = Mathf.Max(1, Mathf.CeilToInt(missing.Count / (float)TrayPerRow));
            float trayH = rows * TrayRowGap + 0.5f;
            float trayCentreY = TrayY - (rows - 1) * TrayRowGap * 0.5f;
            AdRes.Spr("TrayOuter", tray, AdRes.Round(160), new Color(0.55f, 0.42f, 0.92f), -21, new Vector3(0f, trayCentreY - 0.08f, 0f),
                new Vector2(BoardWorld + 0.7f, trayH + 0.3f), true);
            AdRes.Spr("TrayBg", tray, AdRes.Round(160), new Color(0.16f, 0.12f, 0.31f), -20, new Vector3(0f, trayCentreY, 0f),
                new Vector2(BoardWorld + 0.4f, trayH), true);

            for (int k = 0; k < missing.Count; k++)
            {
                int row = k / TrayPerRow;
                int inRow = Mathf.Min(TrayPerRow, missing.Count - row * TrayPerRow);
                int col = k % TrayPerRow;
                var home = new Vector3((col - (inRow - 1) * 0.5f) * TraySpacing, TrayY - row * TrayRowGap, 0f);
                pieces.Add(MakePiece(tray, cells[missing[k]].num, cells[missing[k]].col, home));
            }
        }

        Piece MakePiece(Transform parent, int num, Color col, Vector3 home)
        {
            var p = new Piece { num = num, col = col, home = home };
            var go = new GameObject("Piece" + num);
            p.t = go.transform;
            p.t.SetParent(parent, false);
            p.t.localPosition = home;
            p.t.localScale = Vector3.zero;
            p.group = go.AddComponent<SortingGroup>();
            p.group.sortingOrder = 10;

            var r = AdRes.Round(150);
            AdRes.Spr("shadow", p.t, r, new Color(0f, 0f, 0f, 0.35f), 0, new Vector3(0.04f, -0.1f, 0f), Vector2.one * PieceSize, true);
            AdRes.Spr("side", p.t, r, col * 0.68f, 1, new Vector3(0f, -0.07f, 0f), Vector2.one * PieceSize, true);
            AdRes.Spr("top", p.t, r, col, 2, Vector3.zero, Vector2.one * PieceSize, true);
            AdRes.Spr("gloss", p.t, r, new Color(1f, 1f, 1f, 0.28f), 3, new Vector3(0f, PieceSize * 0.22f, 0f),
                new Vector2(PieceSize * 0.78f, PieceSize * 0.34f), true);

            bool light = col.r * 0.3f + col.g * 0.59f + col.b * 0.11f > 0.72f;
            var label = AdRes.MakeLabel(p.t, num.ToString(), PieceSize * 0.62f, light ? new Color(0.2f, 0.14f, 0.32f) : Color.white, 5,
                new Vector3(0f, -0.02f, 0f));
            if (light) label.shadow.color = new Color(1f, 1f, 1f, 0.45f);
            return p;
        }

        void BuildHand()
        {
            hand = new GameObject("Hand").transform;
            hand.SetParent(world, false);
            hand.gameObject.AddComponent<SortingGroup>().sortingOrder = 200;
            handRing = AdRes.Spr("ring", hand, AdRes.Ring, new Color(1f, 1f, 1f, 0f), 0, Vector3.zero, Vector2.one * 0.9f);
            handArt = new GameObject("art").transform;
            handArt.SetParent(hand, false);
            handArt.localRotation = Quaternion.Euler(0f, 0f, 25f);
            var custom = Resources.Load<Sprite>("hand");
            if (custom) AdRes.Spr("img", handArt, custom, Color.white, 2, new Vector3(0.3f, -0.6f, 0f), Vector2.one);
            else
            {
                HandShape(handArt, new Color(0.1f, 0.1f, 0.16f), 0.08f, 1);
                HandShape(handArt, Color.white, 0f, 2);
            }
            hand.gameObject.SetActive(false);
        }

        static void HandShape(Transform p, Color c, float g, int order)
        {
            var r = AdRes.Round(512);
            AdRes.Spr("finger", p, r, c, order, new Vector3(0f, -0.38f, 0f), new Vector2(0.26f + g, 0.8f + g), true);
            AdRes.Spr("k1", p, r, c, order, new Vector3(0.21f, -0.62f, 0f), new Vector2(0.22f + g, 0.46f + g), true);
            AdRes.Spr("k2", p, r, c, order, new Vector3(0.39f, -0.7f, 0f), new Vector2(0.2f + g, 0.4f + g), true);
            AdRes.Spr("palm", p, r, c, order, new Vector3(0.16f, -0.98f, 0f), new Vector2(0.68f + g, 0.62f + g), true);
            var th = AdRes.Spr("thumb", p, r, c, order, new Vector3(-0.2f, -0.86f, 0f), new Vector2(0.22f + g, 0.5f + g), true);
            th.transform.localRotation = Quaternion.Euler(0f, 0f, 40f);
        }

        void BuildUI()
        {
            totalMissingTiles = Mathf.Max(1, pieces.Count);
            ui = AdUI.Create(endcardTitle, ctaText, new Color(0.33f, 0.22f, 0.62f), new Color(1f, 0.85f, 0.3f));
            var top = new Vector2(0.5f, 1f);
            AdUI.Txt(ui.Root, gameTitle, 72, Color.white, top, new Vector2(-115f, -108f));

            // Voodoo tension countdown pill on top-right
            timerBg = AdUI.Img(ui.Root, AdRes.Round(128), new Color(0.18f, 0.12f, 0.36f, 0.88f), top, new Vector2(315f, -108f), new Vector2(220f, 64f), true);
            timerText = AdUI.Txt(timerBg.transform, "24s", 44, new Color(1f, 0.90f, 0.35f), new Vector2(0.5f, 0.5f), Vector2.zero);

            var barBg = AdUI.Img(ui.Root, AdRes.Round(128), new Color(0f, 0f, 0f, 0.4f), top, new Vector2(0f, -202f), new Vector2(660f, 48f), true);
            progressFill = AdUI.Img(barBg.transform, AdRes.Round(128), new Color(0.45f, 0.9f, 0.4f), new Vector2(0f, 0.5f),
                new Vector2(8f, 0f), new Vector2(0f, 32f), true);
            progressFill.rectTransform.pivot = new Vector2(0f, 0.5f);
            progressText = AdUI.Txt(barBg.transform, "0%", 40, Color.white, new Vector2(0.5f, 0.5f), new Vector2(0f, 2f));

            // finished picture on the endcard
            var pic = Sprite.Create(pictureTex, new Rect(0, 0, N, N), new Vector2(0.5f, 0.5f), N);
            AdUI.Img(ui.Card, AdRes.Round(64), new Color(1f, 1f, 1f, 0.9f), new Vector2(0.5f, 0.5f), new Vector2(0f, -95f), new Vector2(300f, 300f), true);
            AdUI.Img(ui.Card, pic, Color.white, new Vector2(0.5f, 0.5f), new Vector2(0f, -95f), new Vector2(276f, 276f), false);
            UpdateProgress();
        }

        void UpdateProgress()
        {
            float tileFrac = totalMissingTiles == 0 ? 1f : (float)placedTiles / totalMissingTiles;
            float groupFrac = groups.Count == 0 ? 1f : (float)revealedGroups / groups.Count;
            float p = Mathf.Max(tileFrac, groupFrac);
            progressFill.rectTransform.sizeDelta = new Vector2(Mathf.Max(30f, 644f * p), 32f);
            progressText.text = Mathf.RoundToInt(p * 100f) + "%";
        }

        // ================================================================ flow
        IEnumerator Intro()
        {
            StoreLink.LogEvent("numbermatch_start");
            // 0.0s hook: show finished picture briefly (0.35s), then immediately shatter into numbered grid!
            yield return new WaitForSeconds(0.35f);

            var centre = new Vector3(0f, BoardCenterY, 0f);
            var order = new List<int>();
            for (int i = 0; i < cells.Length; i++) order.Add(i);
            order.Sort((a, b) => (CellPos(a) - centre).sqrMagnitude.CompareTo((CellPos(b) - centre).sqrMagnitude));
            for (int k = 0; k < order.Count; k++)
                StartCoroutine(MaskCell(order[k], k / (float)order.Count * 0.42f));
            Sfx.Play(Sfx.Id.Glass, 0.6f);
            Shake(0.25f, 0.14f);
            for (int k = 0; k < pieces.Count; k++) StartCoroutine(PopIn(pieces[k].t, 0.15f + k * 0.025f));
            ui.Banner(introBanner, Color.white);
            Sfx.Play(Sfx.Id.Banner);
            yield return new WaitForSeconds(0.65f);

            // ~1.0s mark: gameplay and tutorial hand begin immediately!
            phase = Phase.Play;
            if (autoPlay) StartCoroutine(AutoPlay());
            else if (showTutorial) ShowTutorial();
        }

        IEnumerator MaskCell(int i, float delay)
        {
            yield return new WaitForSeconds(delay);
            var cv = cells[i];
            var tr = cv.sr.transform;
            Color from = cv.col, to = cv.filled ? FilledColor : MaskColor;
            for (float t = 0f; t < 0.22f; t += Time.deltaTime)
            {
                float k = t / 0.22f;
                cv.sr.color = Color.Lerp(from, to, k);
                tr.localScale = Vector3.one * (1f - 0.25f * Mathf.Sin(k * Mathf.PI));
                yield return null;
            }
            tr.localScale = Vector3.one;
            cv.sr.color = to;
            cv.tm.gameObject.SetActive(true);
        }

        IEnumerator PopIn(Transform t, float delay)
        {
            yield return new WaitForSeconds(delay);
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.25f)
            {
                t.localScale = Vector3.one * BackOut(k);
                yield return null;
            }
            t.localScale = Vector3.one;
        }

        void Update()
        {
            float dt = Time.deltaTime;
            FitCamera();
            UpdateShake(dt);
            ui.Tick(dt);
            UpdateHighlights();

            if (GetPointer(out var sp, out bool down, out bool held, out bool up))
            {
                var w = cam.ScreenToWorldPoint(new Vector3(sp.x, sp.y, 10f));
                w.z = 0f;
                if (down) OnDown(w);
                else if (held && dragging != null) DragTo(w, dt);
                if (up && dragging != null) Release();
            }

            if (phase != Phase.Play) return;
            playTime += dt;
            if (dragging == null) idleTime += dt;
            if (!autoPlay && showTutorial && !tutorialVisible && idleTime > 2.4f) ShowTutorial();

            if (endcardAfterSeconds > 0f && timerText)
            {
                int rem = Mathf.Max(0, Mathf.CeilToInt(endcardAfterSeconds - playTime));
                if (rem != lastTimerSec)
                {
                    lastTimerSec = rem;
                    timerText.text = rem + "s";
                    if (rem <= 5 && rem > 0)
                    {
                        timerBg.color = new Color(0.85f, 0.16f, 0.20f, 0.92f);
                        timerText.color = Color.white;
                        Sfx.Play(Sfx.Id.Tap, 0.35f, 1.3f);
                    }
                }
                if (rem <= 5)
                    timerBg.transform.localScale = Vector3.one * (1f + Mathf.Abs(Mathf.Sin(Time.time * 10f)) * 0.08f);
                if (playTime >= endcardAfterSeconds)
                    StartCoroutine(NearMissFail());
            }
        }

        static bool GetPointer(out Vector2 pos, out bool down, out bool held, out bool up)
        {
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
            var p = UnityEngine.InputSystem.Pointer.current;
            if (p == null) { pos = default; down = held = up = false; return false; }
            pos = p.position.ReadValue();
            down = p.press.wasPressedThisFrame;
            held = p.press.isPressed;
            up = p.press.wasReleasedThisFrame;
#else
            pos = Input.mousePosition;
            down = Input.GetMouseButtonDown(0);
            held = Input.GetMouseButton(0);
            up = Input.GetMouseButtonUp(0);
#endif
            return down || held || up;
        }

        void OnDown(Vector3 w)
        {
            if (phase == Phase.End || (ui != null && ui.EndcardVisible)) { Sfx.Play(Sfx.Id.Click); StoreLink.Open(storeUrl); return; }
            if (phase != Phase.Play || autoPlay) return;

            Piece best = null;
            float bd = PieceSize * 0.75f;
            foreach (var p in pieces)
            {
                if (p.busy) continue;
                float d = Vector2.Distance(w, p.t.position);
                if (d < bd) { bd = d; best = p; }
            }
            if (best == null) return;
            HideTutorial();
            BeginDrag(best);
        }

        void BeginDrag(Piece p)
        {
            dragging = p;
            p.busy = true;
            p.group.sortingOrder = 60;
            idleTime = 0f;
            Sfx.Play(Sfx.Id.Tap);
            highlighted.Clear();
            foreach (int i in groups[p.num])
                if (!cells[i].filled) highlighted.Add(i);
        }

        void DragTo(Vector3 w, float dt)
        {
            // the tile floats a little above the finger so it stays visible
            var target = w + new Vector3(0f, 0.9f, 0f);
            var t = dragging.t;
            t.position = Vector3.Lerp(t.position, target, 1f - Mathf.Exp(-30f * dt));
            float overBoard = Mathf.InverseLerp(TrayY + 0.6f, boardMin.y + 0.3f, t.position.y);
            t.localScale = Vector3.one * Mathf.Lerp(1.1f, cell * 1.05f / PieceSize, overBoard);
        }

        void Release()
        {
            var p = dragging;
            dragging = null;
            highlighted.Clear();
            ResolveDrop(p, p.t.position);
        }

        void ResolveDrop(Piece p, Vector3 pos)
        {
            // forgiving: snap to the nearest matching empty cell around the drop point
            int best = -1;
            float bd = cell * SnapRadius;
            foreach (int i in groups[p.num])
            {
                if (cells[i].filled) continue;
                float d = Vector2.Distance(pos, CellPos(i));
                if (d < bd) { bd = d; best = i; }
            }
            if (best >= 0) { Place(p, best); return; }

            // any other drop is wrong: shake + red tint + error sound, wherever it landed
            combo = 0;
            int under = CellAt(pos);
            if (under >= 0 && !cells[under].filled) StartCoroutine(WrongFlash(under));
            StartCoroutine(RejectAndReturn(p));
            Sfx.Play(Sfx.Id.Error, 0.7f, 1f, 0f, 0.15f);
        }

        int CellAt(Vector3 pos)
        {
            int c = Mathf.FloorToInt((pos.x - boardMin.x) / cell);
            int r = Mathf.FloorToInt((pos.y - boardMin.y) / cell);
            if (c < 0 || c >= N || r < 0 || r >= N) return -1;
            return Idx(c, r);
        }

        void Place(Piece p, int i)
        {
            cells[i].filled = true; // logic first, so nothing else can target this cell
            pieces.Remove(p);
            placedTiles++;
            combo++;
            UpdateProgress();
            StartCoroutine(PlaceRoutine(p, i));
        }

        IEnumerator PlaceRoutine(Piece p, int i)
        {
            var t = p.t;
            Vector3 from = t.position, to = CellPos(i);
            Vector3 s0 = t.localScale, s1 = Vector3.one * cell * 1.05f / PieceSize;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.14f)
            {
                float e = 1f - Mathf.Pow(1f - k, 3f);
                t.position = Vector3.Lerp(from, to, e);
                t.localScale = Vector3.Lerp(s0, s1, e);
                yield return null;
            }
            t.position = to;
            // TAK: pop up, squash, then crack into fragments
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.07f) { t.localScale = s1 * Mathf.Lerp(1f, 1.15f, k); yield return null; }
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.06f) { t.localScale = s1 * Mathf.Lerp(1.15f, 0.92f, k); yield return null; }
            Destroy(t.gameObject);
            Fragments(to, p.col);
            Sfx.Play(Sfx.Id.Pop);

            var cv = cells[i];
            cv.sr.color = FilledColor;
            StartCoroutine(Punch(cv.sr.transform, 1.25f, 0.18f));
            if (combo >= 2) FloatText(to + new Vector3(0f, cell, 0f), "x" + combo, new Color(1f, 0.9f, 0.35f));

            bool complete = true;
            foreach (int j in groups[p.num]) if (!cells[j].filled) { complete = false; break; }
            if (complete) RevealGroup(p.num);
            else Burst(to, p.col, 6, 2.5f);

            // Voodoo Near-Miss Fail Hook: when only 1 tile remains (~92% completion), trigger dramatic time-out fail!
            if (nearMissEnding && pieces.Count == 1 && phase == Phase.Play)
            {
                StartCoroutine(NearMissFail());
            }
        }

        IEnumerator RejectAndReturn(Piece p)
        {
            var t = p.t;
            var start = t.position;
            var srs = t.GetComponentsInChildren<SpriteRenderer>();
            var cols = new Color[srs.Length];
            for (int k = 0; k < srs.Length; k++) cols[k] = srs[k].color;
            for (float e = 0f; e < 0.25f; e += Time.deltaTime)
            {
                float f = 1f - e / 0.25f;
                t.position = start + new Vector3(Mathf.Sin(e * 45f) * 0.12f * f, 0f, 0f);
                for (int k = 0; k < srs.Length; k++) srs[k].color = Color.Lerp(cols[k], new Color(1f, 0.15f, 0.15f, cols[k].a), 0.6f * f);
                yield return null;
            }
            for (int k = 0; k < srs.Length; k++) srs[k].color = cols[k];
            yield return ReturnHome(p, 0.2f);
        }

        IEnumerator ReturnHome(Piece p, float dur)
        {
            var t = p.t;
            Vector3 from = t.position, s0 = t.localScale;
            for (float k = 0f; k < 1f; k += Time.deltaTime / dur)
            {
                float e = Smooth(k);
                t.position = Vector3.Lerp(from, p.home, e);
                t.localScale = Vector3.Lerp(s0, Vector3.one, e);
                yield return null;
            }
            t.position = p.home;
            t.localScale = Vector3.one;
            p.group.sortingOrder = 10;
            p.busy = false;
        }

        IEnumerator WrongFlash(int i)
        {
            var cv = cells[i];
            for (float e = 0f; e < 0.4f; e += Time.deltaTime)
            {
                if (cv.revealed || cv.filled) yield break;
                cv.sr.color = Color.Lerp(new Color(1f, 0.2f, 0.2f), MaskColor, e / 0.4f);
                yield return null;
            }
            if (!cv.filled) cv.sr.color = MaskColor;
        }

        void RevealGroup(int num)
        {
            var list = new List<int>(groups[num]);
            Vector3 centre = Vector3.zero;
            foreach (int i in list) centre += CellPos(i);
            centre /= list.Count;
            list.Sort((a, b) => (CellPos(a) - centre).sqrMagnitude.CompareTo((CellPos(b) - centre).sqrMagnitude));
            for (int k = 0; k < list.Count; k++)
            {
                cells[list[k]].revealed = true;
                StartCoroutine(RevealCell(list[k], Mathf.Min(k * 0.025f, 0.6f)));
            }

            revealedGroups++;
            UpdateProgress();
            Burst(centre, groupColor[num], 22, 5f);
            Shake(0.25f, 0.14f);
            Sfx.Play(Sfx.Id.GateGood);
            Sfx.Play(Sfx.Id.JellyPop, 0.6f);
            StoreLink.LogEvent("numbermatch_group_reveal");

            if (revealedGroups >= groups.Count) StartCoroutine(Complete());
            else if (!(nearMissEnding && pieces.Count <= 1))
            {
                ui.Banner(Praise[praiseIdx++ % Praise.Length], new Color(1f, 0.88f, 0.3f));
            }
        }

        IEnumerator RevealCell(int i, float delay)
        {
            if (delay > 0f) yield return new WaitForSeconds(delay);
            var cv = cells[i];
            cv.animating = true;
            cv.tm.gameObject.SetActive(false);
            var tr = cv.sr.transform;
            Color from = cv.sr.color;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.45f)
            {
                cv.sr.color = k < 0.3f ? Color.Lerp(from, Color.white, k / 0.3f) : Color.Lerp(Color.white, cv.col, (k - 0.3f) / 0.7f);
                tr.localScale = Vector3.one * (1f + 0.3f * Mathf.Sin(k * Mathf.PI) * (1f - k));
                yield return null;
            }
            cv.sr.color = cv.col;
            tr.localScale = Vector3.one;
            cv.animating = false;
        }

        IEnumerator NearMissFail()
        {
            if (phase != Phase.Play) yield break;
            phase = Phase.Done;
            HideTutorial();
            if (timerText) timerText.text = "0s";
            if (timerBg) timerBg.color = new Color(0.92f, 0.15f, 0.18f, 0.96f);
            StoreLink.LogEvent("numbermatch_nearmiss");

            // Highlight the single missing cell in pulsing red/gold so the viewer sees only 1 piece was left!
            for (int i = 0; i < cells.Length; i++)
                if (!cells[i].filled) StartCoroutine(WrongFlash(i));

            yield return new WaitForSeconds(0.45f);
            int pct = Mathf.Clamp(Mathf.RoundToInt((float)placedTiles / Mathf.Max(1, totalMissingTiles) * 100f), 88, 96);
            ui.Banner("TIME'S UP!  " + pct + "% DONE!", new Color(1f, 0.35f, 0.32f));
            Sfx.Play(Sfx.Id.Fail);
            Shake(0.42f, 0.24f);
            yield return new WaitForSeconds(1.35f);
            ShowEndcard("Only 1 tile left (" + pct + "%)! Can you finish the picture?");
        }

        IEnumerator Complete()
        {
            phase = Phase.Done;
            HideTutorial();
            StoreLink.LogEvent("numbermatch_complete");
            yield return new WaitForSeconds(0.7f);
            ui.Banner("COMPLETED!", new Color(0.5f, 1f, 0.45f));
            Sfx.Play(Sfx.Id.Win);
            Shake(0.4f, 0.22f);
            Burst(new Vector3(0f, BoardCenterY, 0f), Color.white, 40, 8f);

            // celebration wave across the finished picture
            var centre = new Vector3(0f, BoardCenterY, 0f);
            for (int i = 0; i < cells.Length; i++)
                StartCoroutine(PunchDelayed(cells[i].sr.transform, (CellPos(i) - centre).magnitude * 0.06f));
            yield return new WaitForSeconds(1.8f);
            ShowEndcard("You fixed the picture!");
        }

        void ShowEndcard(string sub)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            HideTutorial();
            if (dragging != null) { var p = dragging; dragging = null; StartCoroutine(ReturnHome(p, 0.15f)); }
            highlighted.Clear();
            StoreLink.GameEnded();
            ui.ShowEndcard(sub);
            Sfx.Play(Sfx.Id.Win, 0.7f);
        }

        // ================================================================ helpers / fx
        void UpdateHighlights()
        {
            if (highlighted.Count == 0) return;
            float k = 0.5f + 0.5f * Mathf.Sin(Time.time * 10f);
            foreach (int i in highlighted)
                if (!cells[i].filled) cells[i].sr.color = Color.Lerp(MaskColor, HighlightColor, 0.35f + 0.5f * k);
        }

        void Shake(float dur, float amp)
        {
            shakeDur = dur;
            shakeT = dur;
            shakeAmp = amp;
        }

        void UpdateShake(float dt)
        {
            if (shakeT > 0f)
            {
                shakeT -= dt;
                float f = Mathf.Clamp01(shakeT / shakeDur);
                cam.transform.position = camBase + (Vector3)(Random.insideUnitCircle * shakeAmp * f);
            }
            else cam.transform.position = camBase;
        }

        IEnumerator Punch(Transform t, float to, float dur)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / dur)
            {
                t.localScale = Vector3.one * (1f + (to - 1f) * Mathf.Sin(k * Mathf.PI));
                yield return null;
            }
            t.localScale = Vector3.one;
        }

        IEnumerator PunchDelayed(Transform t, float delay)
        {
            yield return new WaitForSeconds(delay);
            yield return Punch(t, 1.22f, 0.3f);
        }

        void Fragments(Vector3 pos, Color c)
        {
            int n = 6;
            var parts = new Transform[n];
            var vel = new Vector3[n];
            for (int k = 0; k < n; k++)
            {
                parts[k] = AdRes.Spr("frag", fx, AdRes.Square, k % 2 == 0 ? c : c * 0.75f, 50, pos, Vector2.one * cell * Random.Range(0.25f, 0.4f)).transform;
                parts[k].localRotation = Quaternion.Euler(0f, 0f, Random.Range(0f, 360f));
                float a = (k + Random.value * 0.5f) / n * Mathf.PI * 2f;
                vel[k] = new Vector3(Mathf.Cos(a), Mathf.Sin(a) + 0.8f, 0f) * Random.Range(2.5f, 4f);
            }
            StartCoroutine(Fly(parts, vel, 0.5f, 18f, 600f));
        }

        void Burst(Vector3 pos, Color c, int n, float speed)
        {
            var parts = new Transform[n];
            var vel = new Vector3[n];
            for (int k = 0; k < n; k++)
            {
                var tint = Color.Lerp(c, Color.white, Random.Range(0f, 0.5f));
                parts[k] = AdRes.Spr("spark", fx, AdRes.Circle, tint, 51, pos, Vector2.one * Random.Range(0.15f, 0.35f)).transform;
                float a = Random.value * Mathf.PI * 2f;
                vel[k] = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f) * speed * Random.Range(0.4f, 1f);
            }
            StartCoroutine(Fly(parts, vel, 0.7f, 6f, 0f));
        }

        IEnumerator Fly(Transform[] parts, Vector3[] vel, float life, float gravity, float spin)
        {
            var s0 = new Vector3[parts.Length];
            for (int k = 0; k < parts.Length; k++) s0[k] = parts[k].localScale;
            for (float t = 0f; t < life; t += Time.deltaTime)
            {
                float dt = Time.deltaTime, f = 1f - t / life;
                for (int k = 0; k < parts.Length; k++)
                {
                    vel[k].y -= gravity * dt;
                    vel[k] *= 1f - 2f * dt;
                    parts[k].position += vel[k] * dt;
                    parts[k].Rotate(0f, 0f, spin * dt);
                    parts[k].localScale = s0[k] * f;
                }
                yield return null;
            }
            foreach (var p in parts) Destroy(p.gameObject);
        }

        void FloatText(Vector3 pos, string s, Color c)
        {
            var l = AdRes.MakeLabel(fx, s, cell * 1.4f, c, 71, pos);
            l.GetComponentInChildren<MeshRenderer>().sortingOrder = 71;
            StartCoroutine(FloatRoutine(l));
        }

        IEnumerator FloatRoutine(Label l)
        {
            var t = l.transform;
            var start = t.position;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.7f)
            {
                t.position = start + new Vector3(0f, k * 0.9f, 0f);
                t.localScale = Vector3.one * (k < 0.2f ? BackOut(k / 0.2f) : 1f);
                var c = l.main.color; c.a = 1f - Mathf.Clamp01((k - 0.6f) / 0.4f); l.main.color = c;
                var sc = l.shadow.color; sc.a = 0.55f * c.a; l.shadow.color = sc;
                yield return null;
            }
            Destroy(l.gameObject);
        }

        // ================================================================ tutorial + auto-play
        /// <summary>Best move: the tile whose group needs the fewest more tiles (so a reveal comes fast).</summary>
        Piece BestPiece(out int targetCell)
        {
            Piece best = null;
            targetCell = -1;
            int bestLeft = int.MaxValue;
            foreach (var p in pieces)
            {
                if (p.busy) continue;
                int left = 0, firstEmpty = -1;
                foreach (int i in groups[p.num])
                    if (!cells[i].filled) { left++; if (firstEmpty < 0) firstEmpty = i; }
                if (firstEmpty >= 0 && left < bestLeft) { bestLeft = left; best = p; targetCell = firstEmpty; }
            }
            return best;
        }

        void ShowTutorial()
        {
            var p = BestPiece(out int target);
            if (p == null) return;
            tutorialVisible = true;
            idleTime = 0f;
            tutorialRoutine = StartCoroutine(TutorialLoop(p, target));
        }

        void HideTutorial()
        {
            if (tutorialRoutine != null) StopCoroutine(tutorialRoutine);
            tutorialRoutine = null;
            if (tutorialVisible)
            {
                tutorialVisible = false;
                hand.gameObject.SetActive(false);
                if (dragging == null) highlighted.Clear();
                foreach (var cv in cells) if (!cv.filled && !cv.animating) cv.sr.color = MaskColor;
            }
            idleTime = 0f;
        }

        IEnumerator TutorialLoop(Piece p, int target)
        {
            hand.gameObject.SetActive(true);
            highlighted.Clear();
            highlighted.Add(target);
            while (true)
            {
                if (p.busy || cells[target].filled) { HideTutorial(); yield break; }
                Vector3 a = p.t.position, b = CellPos(target);
                hand.position = a;
                yield return HandPress(true);
                for (float k = 0f; k < 1f; k += Time.deltaTime / 0.9f)
                {
                    hand.position = Vector3.Lerp(a, b, Smooth(k));
                    yield return null;
                }
                yield return HandPress(false);
                yield return new WaitForSeconds(0.35f);
            }
        }

        IEnumerator HandPress(bool press)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.15f)
            {
                float s = press ? Mathf.Lerp(1f, 0.85f, k) : Mathf.Lerp(0.85f, 1f, k);
                handArt.localScale = Vector3.one * s;
                handRing.color = new Color(1f, 1f, 1f, press ? (1f - k) * 0.8f : 0f);
                handRing.transform.localScale = Vector3.one * (0.4f + k * 0.8f);
                yield return null;
            }
        }

        IEnumerator AutoPlay()
        {
            hand.gameObject.SetActive(true);
            bool mistakeDone = !autoPlayOneMistake;
            int moves = 0;
            while (phase == Phase.Play)
            {
                yield return new WaitForSeconds(autoMoveInterval);
                var p = BestPiece(out int target);
                if (p == null) break;

                Vector3 drop = CellPos(target);
                if (!mistakeDone && moves >= 2)
                {
                    int wrong = FarWrongCell(p.num);
                    if (wrong >= 0) { drop = CellPos(wrong); mistakeDone = true; }
                }

                yield return MoveHand(hand.position, p.t.position, 0.35f);
                yield return HandPress(true);
                BeginDrag(p);
                Vector3 a = p.t.position;
                for (float k = 0f; k < 1f; k += Time.deltaTime / 0.55f)
                {
                    var w = Vector3.Lerp(a, drop, Smooth(k));
                    hand.position = w;
                    DragTo(w - new Vector3(0f, 0.9f, 0f), Time.deltaTime);
                    yield return null;
                }
                dragging.t.position = drop;
                Release();
                yield return HandPress(false);
                moves++;
            }
            hand.gameObject.SetActive(false);
        }

        IEnumerator MoveHand(Vector3 a, Vector3 b, float dur)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / dur)
            {
                hand.position = Vector3.Lerp(a, b, Smooth(k));
                yield return null;
            }
            hand.position = b;
        }

        /// <summary>An empty cell of another number, far from any valid target (for the scripted mistake).</summary>
        int FarWrongCell(int num)
        {
            for (int i = 0; i < cells.Length; i++)
            {
                if (cells[i].filled || cells[i].num == num) continue;
                bool far = true;
                foreach (int j in groups[num])
                    if (!cells[j].filled && Vector2.Distance(CellPos(i), CellPos(j)) < cell * (SnapRadius + 0.5f)) { far = false; break; }
                if (far) return i;
            }
            return -1;
        }

        static float Smooth(float k)
        {
            k = Mathf.Clamp01(k);
            return k * k * (3f - 2f * k);
        }

        static float BackOut(float k)
        {
            k = Mathf.Clamp01(k);
            const float s = 1.70158f;
            k -= 1f;
            return k * k * ((s + 1f) * k + s) + 1f;
        }
    }
}
