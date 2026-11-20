using UnityEngine;
using UnityEngine.UI;
using JellyAd;

namespace AdKit
{
    /// <summary>Shared screen-space UI for playables: banner, endcard + CTA, drag tutorial hand.</summary>
    public class AdUI
    {
        public RectTransform Root;
        Text banner;
        float bannerT = -1f;
        Color bannerColor;
        GameObject endcard;
        RectTransform card, cta, tut, tutHand;
        Text endSub;

        public bool EndcardVisible => endcard && endcard.activeSelf;

        public static AdUI Create(string title, string ctaText, Color cardColor, Color titleColor)
        {
            var ui = new AdUI();
            var go = new GameObject("UI", typeof(RectTransform));
            var canvas = go.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 10;
            var sc = go.AddComponent<CanvasScaler>();
            sc.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            sc.referenceResolution = new Vector2(1080f, 1920f);
            sc.matchWidthOrHeight = 0.5f;
            ui.Root = (RectTransform)go.transform;
            var c = new Vector2(0.5f, 0.5f);

            ui.banner = Txt(ui.Root, "", 110, Color.white, c, new Vector2(0f, 420f));
            ui.banner.gameObject.SetActive(false);

            // drag tutorial
            ui.tut = (RectTransform)new GameObject("DragTutorial", typeof(RectTransform)).transform;
            ui.tut.SetParent(ui.Root, false);
            ui.tut.anchorMin = ui.tut.anchorMax = new Vector2(0.5f, 0f);
            ui.tut.anchoredPosition = new Vector2(0f, 420f);
            Img(ui.tut, Res.Round(64), new Color(0f, 0f, 0f, 0.35f), c, new Vector2(0f, 0f), new Vector2(760f, 26f), true);
            Txt(ui.tut, "HOLD & DRAG TO MOVE", 64, Color.white, c, new Vector2(0f, 150f));
            ui.tutHand = Hand(ui.tut);
            ui.tut.gameObject.SetActive(false);

            // endcard
            ui.endcard = new GameObject("Endcard", typeof(RectTransform));
            var ert = (RectTransform)ui.endcard.transform;
            ert.SetParent(ui.Root, false);
            ert.anchorMin = Vector2.zero;
            ert.anchorMax = Vector2.one;
            ert.offsetMin = ert.offsetMax = Vector2.zero;
            ui.endcard.AddComponent<Image>().color = new Color(0.03f, 0.03f, 0.1f, 0.8f);
            ui.card = Img(ert, Res.Round(64), cardColor, c, new Vector2(0f, 60f), new Vector2(900f, 1000f), true).rectTransform;
            var t = Txt(ui.card, title, 130, titleColor, c, new Vector2(0f, 300f));
            t.GetComponent<Outline>().effectDistance = new Vector2(7f, -7f);
            ui.endSub = Txt(ui.card, "", 58, Color.white, c, new Vector2(0f, 110f));
            ui.cta = Img(ui.card, Res.Round(64), new Color(0.3f, 0.85f, 0.35f), c, new Vector2(0f, -320f), new Vector2(640f, 170f), true).rectTransform;
            Txt(ui.cta, ctaText, 82, Color.white, c, new Vector2(0f, 4f));
            ui.endcard.SetActive(false);
            return ui;
        }

        /// <summary>Extra content on the endcard (e.g. mascots), centred around y = -80.</summary>
        public RectTransform Card => card;

        public void Banner(string text, Color color)
        {
            banner.text = text;
            bannerColor = color;
            banner.color = color;
            bannerT = 0f;
            banner.gameObject.SetActive(true);
        }

        public void ShowDragTutorial(bool on) => tut.gameObject.SetActive(on);

        public void ShowEndcard(string sub)
        {
            if (!EndcardVisible) StoreLink.NotifyGameEnded();
            banner.gameObject.SetActive(false);
            tut.gameObject.SetActive(false);
            endSub.text = sub;
            card.localScale = Vector3.one * 0.6f;
            endcard.SetActive(true);
        }

        public void Tick(float dt)
        {
            if (bannerT >= 0f)
            {
                bannerT += dt;
                var rt = banner.rectTransform;
                float k = bannerT / 0.25f;
                rt.localScale = Vector3.one * (k < 0.7f ? Mathf.Lerp(0f, 1.2f, k / 0.7f) : (k < 1f ? Mathf.Lerp(1.2f, 1f, (k - 0.7f) / 0.3f) : 1f));
                float fade = Mathf.Clamp01((bannerT - 1.4f) / 0.25f);
                banner.color = new Color(bannerColor.r, bannerColor.g, bannerColor.b, 1f - fade);
                if (fade >= 1f) { bannerT = -1f; banner.gameObject.SetActive(false); }
            }
            if (tut.gameObject.activeSelf)
                tutHand.anchoredPosition = new Vector2(Mathf.Sin(Time.time * 3f) * 300f, -40f);
            if (EndcardVisible)
            {
                cta.localScale = Vector3.one * (1f + 0.06f * Mathf.Sin(Time.time * 6f));
                card.localScale = Vector3.Lerp(card.localScale, Vector3.one, 1f - Mathf.Exp(-10f * dt));
            }
        }

        static RectTransform Hand(Transform parent)
        {
            var h = (RectTransform)new GameObject("Hand", typeof(RectTransform)).transform;
            h.SetParent(parent, false);
            h.anchorMin = h.anchorMax = new Vector2(0.5f, 0.5f);
            var art = (RectTransform)new GameObject("art", typeof(RectTransform)).transform;
            art.SetParent(h, false);
            art.localRotation = Quaternion.Euler(0f, 0f, 20f);
            var custom = Resources.Load<Sprite>("hand");
            if (custom)
            {
                var img = Img(art, custom, Color.white, new Vector2(0.5f, 0.5f), new Vector2(40f, -90f), new Vector2(200f, 200f), false);
                img.preserveAspect = true;
                return h;
            }
            for (int pass = 0; pass < 2; pass++)
            {
                var c = pass == 0 ? new Color(0.1f, 0.1f, 0.16f) : Color.white;
                float g = pass == 0 ? 10f : 0f;
                var r = Res.Round(256);
                Img(art, r, c, new Vector2(0.5f, 0.5f), new Vector2(0f, -40f), new Vector2(34f + g, 100f + g), true);
                Img(art, r, c, new Vector2(0.5f, 0.5f), new Vector2(28f, -70f), new Vector2(30f + g, 60f + g), true);
                Img(art, r, c, new Vector2(0.5f, 0.5f), new Vector2(52f, -80f), new Vector2(28f + g, 52f + g), true);
                Img(art, r, c, new Vector2(0.5f, 0.5f), new Vector2(22f, -118f), new Vector2(88f + g, 80f + g), true);
                var th = Img(art, r, c, new Vector2(0.5f, 0.5f), new Vector2(-26f, -104f), new Vector2(30f + g, 64f + g), true);
                th.rectTransform.localRotation = Quaternion.Euler(0f, 0f, 40f);
            }
            return h;
        }

        public static Text Txt(Transform parent, string s, int size, Color c, Vector2 anchor, Vector2 pos)
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
            t.fontStyle = FontStyle.Normal;
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

        public static Image Img(Transform parent, Sprite s, Color c, Vector2 anchor, Vector2 pos, Vector2 size, bool sliced)
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
    }
}
