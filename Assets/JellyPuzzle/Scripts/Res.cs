using System.Collections.Generic;
using UnityEngine;

namespace JellyAd
{
    /// <summary>Procedural sprites / text helpers so the playable needs no imported art (keeps build tiny).</summary>
    public static class Res
    {
        static Font _font;
        static Material _fontMat, _spriteMat, _primMat;
        static Sprite _square, _bead, _circle, _soft, _ring;
        static readonly Dictionary<int, Sprite> _round = new Dictionary<int, Sprite>();

        public static Font Font => _font ? _font : (_font = Resources.Load<Font>("Fonts/Inter-SemiBold"));
        public static Material FontMat => _fontMat ? _fontMat : (_fontMat = Resources.Load<Material>("JellyFont"));
        public static Material SpriteMat => _spriteMat ? _spriteMat : (_spriteMat = Resources.Load<Material>("JellySprite"));
        public static Material PrimMat => _primMat ? _primMat : (_primMat = Resources.Load<Material>("PlayablePrimMat"));

        public static Sprite Square => _square ? _square : (_square = RoundRect(8, 0f, 8));
        public static Sprite Bead => _bead ? _bead : (_bead = RoundRect(32, 8f, 32));
        public static Sprite Circle => _circle ? _circle : (_circle = Disc(128, false));
        public static Sprite Soft => _soft ? _soft : (_soft = Disc(128, true));
        public static Sprite Ring => _ring ? _ring : (_ring = RingTex(128, 0.72f));

        /// <summary>Rounded rect with 9-slice border. Lower ppu = bigger corners in world units.</summary>
        public static Sprite Round(int ppu)
        {
            if (_round.TryGetValue(ppu, out var s) && s) return s;
            s = RoundRect(128, 40f, ppu, 44f);
            _round[ppu] = s;
            return s;
        }

        static Sprite RoundRect(int size, float radius, int ppu, float border = 0f)
        {
            var t = new Texture2D(size, size, TextureFormat.RGBA32, false)
            { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color32[size * size];
            for (int y = 0; y < size; y++)
                for (int x = 0; x < size; x++)
                {
                    float a = 1f;
                    if (radius > 0f)
                    {
                        float dx = Mathf.Max(0f, Mathf.Max(radius - (x + 0.5f), (x + 0.5f) - (size - radius)));
                        float dy = Mathf.Max(0f, Mathf.Max(radius - (y + 0.5f), (y + 0.5f) - (size - radius)));
                        a = Mathf.Clamp01(radius - Mathf.Sqrt(dx * dx + dy * dy) + 0.5f);
                    }
                    px[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255));
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return Sprite.Create(t, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), ppu, 0,
                SpriteMeshType.FullRect, new Vector4(border, border, border, border));
        }

        static Sprite Disc(int size, bool soft)
        {
            var t = new Texture2D(size, size, TextureFormat.RGBA32, false)
            { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color32[size * size];
            float h = size * 0.5f;
            for (int y = 0; y < size; y++)
                for (int x = 0; x < size; x++)
                {
                    float d = new Vector2(x + 0.5f - h, y + 0.5f - h).magnitude / h;
                    float a = soft ? Mathf.Pow(Mathf.Clamp01(1f - d), 1.5f) : Mathf.Clamp01((1f - d) * h);
                    px[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255));
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return Sprite.Create(t, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), size);
        }

        static Sprite RingTex(int size, float inner)
        {
            var t = new Texture2D(size, size, TextureFormat.RGBA32, false)
            { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color32[size * size];
            float h = size * 0.5f;
            for (int y = 0; y < size; y++)
                for (int x = 0; x < size; x++)
                {
                    float d = new Vector2(x + 0.5f - h, y + 0.5f - h).magnitude / h;
                    float a = Mathf.Clamp01((1f - d) * h) * Mathf.Clamp01((d - inner) * h);
                    px[y * size + x] = new Color32(255, 255, 255, (byte)(a * 255));
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return Sprite.Create(t, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), size);
        }

        public static Sprite Gradient(Color top, Color bottom)
        {
            const int s = 64;
            var t = new Texture2D(s, s, TextureFormat.RGBA32, false)
            { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color[s * s];
            for (int y = 0; y < s; y++)
            {
                var c = Color.Lerp(bottom, top, y / (s - 1f));
                for (int x = 0; x < s; x++) px[y * s + x] = c;
            }
            t.SetPixels(px);
            t.Apply(false, true);
            return Sprite.Create(t, new Rect(0, 0, s, s), new Vector2(0.5f, 0.5f), s);
        }

        public static SpriteRenderer Spr(string name, Transform parent, Sprite s, Color c, int order,
            Vector3 pos, Vector2 size, bool sliced = false)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            var sr = go.AddComponent<SpriteRenderer>();
            sr.sharedMaterial = SpriteMat;
            sr.sprite = s;
            sr.color = c;
            sr.sortingOrder = order;
            if (sliced)
            {
                sr.drawMode = SpriteDrawMode.Sliced;
                sr.size = size;
            }
            else go.transform.localScale = new Vector3(size.x, size.y, 1f);
            return sr;
        }

        public static TextMesh Txt(Transform parent, string name, string text, float height, Color c, int order, Vector3 pos)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            var tm = go.AddComponent<TextMesh>();
            var mr = go.GetComponent<MeshRenderer>();
            mr.sharedMaterial = Font.material;
            tm.font = Font;
            tm.fontSize = 64;
            tm.characterSize = height / 6.4f;
            tm.anchor = TextAnchor.MiddleCenter;
            tm.offsetZ = -0.02f;
            // TextMesh.fontStyle is not supported by Playworks.
            tm.color = c;
            tm.text = text;
            mr.sortingOrder = order;
            return tm;
        }

        public static Label MakeLabel(Transform parent, string text, float height, Color c, int order, Vector3 pos)
        {
            var go = new GameObject("Label");
            go.transform.SetParent(parent, false);
            go.transform.localPosition = pos;
            var l = go.AddComponent<Label>();
            l.shadow = Txt(go.transform, "shadow", text, height, new Color(0f, 0f, 0f, 0.55f), order - 1,
                new Vector3(height * 0.06f, -height * 0.08f, 0f));
            l.main = Txt(go.transform, "main", text, height, c, order, Vector3.zero);
            return l;
        }
    }

    public class Label : MonoBehaviour
    {
        public TextMesh main, shadow;
        public string Text
        {
            get => main.text;
            set { main.text = value; shadow.text = value; }
        }
    }
}
