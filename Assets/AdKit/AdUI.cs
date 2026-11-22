using UnityEngine;
using UnityEngine.UI;

namespace AdKit
{
    /// <summary>Shared screen-space UI for playables: banner with pill backdrop, Voodoo endcard + 3D CTA, drag tutorial hand.</summary>
    public class AdUI
    {
        public RectTransform Root;
        RectTransform bannerWrap;
        Image bannerBg;
        Text banner;
        float bannerT = -1f;
        Color bannerColor;
        GameObject endcard;
        RectTransform card, cta, tut, tutHand, tutRing;
        Text endSub, tutLabel;

        public void SetTutorialText(string text)
        {
            if (tutLabel && !string.IsNullOrEmpty(text))
                tutLabel.text = text;
        }

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

            // Pop-in Banner with dark high-contrast pill backdrop
            ui.bannerWrap = (RectTransform)new GameObject("BannerWrap", typeof(RectTransform)).transform;
            ui.bannerWrap.SetParent(ui.Root, false);
            ui.bannerWrap.anchorMin = c;
            ui.bannerWrap.anchorMax = c;
            ui.bannerWrap.anchoredPosition = new Vector2(0f, 430f);
            ui.bannerWrap.sizeDelta = new Vector2(920f, 155f);
            ui.bannerBg = Img(ui.bannerWrap, AdRes.Round(64), new Color(0.05f, 0.07f, 0.16f, 0.84f), c, Vector2.zero, new Vector2(900f, 148f), true);
            ui.banner = Txt(ui.bannerWrap, "", 92, Color.white, c, new Vector2(0f, 4f));
            ui.bannerWrap.gameObject.SetActive(false);

            // Sleek Voodoo Drag Tutorial with prominent high-contrast pill backdrop + glowing rim + hand
            ui.tut = (RectTransform)new GameObject("DragTutorial", typeof(RectTransform)).transform;
            ui.tut.SetParent(ui.Root, false);
            ui.tut.anchorMin = new Vector2(0.5f, 0f);
            ui.tut.anchorMax = new Vector2(0.5f, 0f);
            ui.tut.anchoredPosition = new Vector2(0f, 430f);
            ui.tut.sizeDelta = new Vector2(960f, 250f);

            // Layer 1: Deep navy-purple outer shadow (color-matched, not black)
            AdRes.Round(64);
            Img(ui.tut, AdRes.Round(64), new Color(0.06f, 0.14f, 0.32f, 0.96f), c, new Vector2(0f, -8f), new Vector2(952f, 236f), true);
            // Layer 2: Glowing cyan arcade rim
            Img(ui.tut, AdRes.Round(64), new Color(0.25f, 0.88f, 1f, 0.95f), c, Vector2.zero, new Vector2(944f, 228f), true);
            // Layer 3: Deep purple body
            Img(ui.tut, AdRes.Round(64), new Color(0.10f, 0.05f, 0.28f, 0.98f), c, Vector2.zero, new Vector2(928f, 212f), true);

            // Slider guide track + endpoint indicator dots
            Img(ui.tut, AdRes.Round(64), new Color(1f, 1f, 1f, 0.20f), c, new Vector2(0f, -46f), new Vector2(740f, 30f), true);
            Img(ui.tut, AdRes.Circle, new Color(0.25f, 0.88f, 1f, 0.95f), c, new Vector2(-345f, -46f), new Vector2(36f, 36f), false);
            Img(ui.tut, AdRes.Circle, new Color(0.25f, 0.88f, 1f, 0.95f), c, new Vector2(345f, -46f), new Vector2(36f, 36f), false);

            // Single-line symmetric arcade tutorial text (identical left/right arrows, comfortable padding)
            var tutTxt = Txt(ui.tut, "<  HOLD & DRAG TO AIM  >", 50, new Color(1f, 0.92f, 0.28f), c, new Vector2(0f, 44f));
            ui.tutLabel = tutTxt;
            tutTxt.rectTransform.sizeDelta = new Vector2(880f, 80f);
            tutTxt.horizontalOverflow = HorizontalWrapMode.Overflow;
            tutTxt.verticalOverflow = VerticalWrapMode.Overflow;
            tutTxt.resizeTextForBestFit = false;
            var tutOut = tutTxt.gameObject.AddComponent<Outline>();
            tutOut.effectColor = new Color(0.20f, 0.08f, 0.42f, 1f);
            tutOut.effectDistance = new Vector2(4f, -4f);

            ui.tutHand = Hand(ui.tut, out ui.tutRing);
            ui.tutHand.localScale = Vector3.one * 1.35f;
            ui.tut.gameObject.SetActive(false);

            // Multi-layered Voodoo Endcard with 3D glossy CTA button
            ui.endcard = new GameObject("Endcard", typeof(RectTransform));
            var ert = (RectTransform)ui.endcard.transform;
            ert.SetParent(ui.Root, false);
            ert.anchorMin = Vector2.zero;
            ert.anchorMax = Vector2.one;
            ert.offsetMin = Vector2.zero;
            ert.offsetMax = Vector2.zero;
            ui.endcard.AddComponent<Image>().color = new Color(0.02f, 0.03f, 0.09f, 0.84f);

            // Card outer golden border + inner body + top header ribbon
            var outerBorder = Img(ert, AdRes.Round(64), new Color(titleColor.r, titleColor.g, titleColor.b, 0.95f), c, new Vector2(0f, 55f), new Vector2(932f, 1044f), true).rectTransform;
            ui.card = Img(outerBorder, AdRes.Round(64), cardColor, c, Vector2.zero, new Vector2(900f, 1012f), true).rectTransform;
            Img(ui.card, AdRes.Round(64), new Color(0f, 0f, 0f, 0.28f), c, new Vector2(0f, 315f), new Vector2(820f, 185f), true);
            Img(ui.card, AdRes.Round(64), new Color(1f, 1f, 1f, 0.08f), c, new Vector2(0f, 385f), new Vector2(780f, 38f), true);

            var t = Txt(ui.card, title, 108, titleColor, c, new Vector2(0f, 318f));
            t.GetComponent<Outline>().effectDistance = new Vector2(6f, -6f);
            ui.endSub = Txt(ui.card, "", 52, new Color(0.94f, 0.96f, 1f), c, new Vector2(0f, 125f));

            // 3D Glossy Green CTA Button (shadow lip + main face + top specular shine)
            ui.cta = (RectTransform)new GameObject("CTA", typeof(RectTransform)).transform;
            ui.cta.SetParent(ui.card, false);
            ui.cta.anchorMin = c;
            ui.cta.anchorMax = c;
            ui.cta.anchoredPosition = new Vector2(0f, -330f);
            ui.cta.sizeDelta = new Vector2(680f, 186f);
            Img(ui.cta, AdRes.Round(64), new Color(0.08f, 0.44f, 0.14f), c, new Vector2(0f, -14f), new Vector2(680f, 178f), true);
            Img(ui.cta, AdRes.Round(64), new Color(0.22f, 0.86f, 0.32f), c, new Vector2(0f, 2f), new Vector2(672f, 172f), true);
            Img(ui.cta, AdRes.Round(64), new Color(1f, 1f, 1f, 0.26f), c, new Vector2(0f, 48f), new Vector2(620f, 54f), true);
            var ctaTxt = Txt(ui.cta, ctaText, 82, Color.white, c, new Vector2(0f, 4f));
            ctaTxt.GetComponent<Outline>().effectDistance = new Vector2(5f, -5f);

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
            bannerBg.color = new Color(0.05f, 0.07f, 0.16f, 0.84f);
            bannerT = 0f;
            bannerWrap.gameObject.SetActive(true);
            Sfx.Play(Sfx.Id.Banner, 0.5f, 1f, 0.04f, 0.12f);
        }

        public void ShowDragTutorial(bool on) => tut.gameObject.SetActive(on);

        public void ShowEndcard(string sub)
        {
            if (!EndcardVisible)
            {
                StoreLink.NotifyGameEnded();
                Sfx.Play(Sfx.Id.Banner, 0.75f, 1.08f, 0f, 0.05f);
            }
            bannerWrap.gameObject.SetActive(false);
            tut.gameObject.SetActive(false);
            endSub.text = sub;
            card.parent.localScale = Vector3.one * 0.6f;
            endcard.SetActive(true);
        }

        public void Tick(float dt)
        {
            if (bannerT >= 0f)
            {
                bannerT += dt;
                float k = bannerT / 0.25f;
                bannerWrap.localScale = Vector3.one * (k < 0.7f ? Mathf.Lerp(0f, 1.15f, k / 0.7f) : (k < 1f ? Mathf.Lerp(1.15f, 1f, (k - 0.7f) / 0.3f) : 1f));
                float fade = Mathf.Clamp01((bannerT - 1.45f) / 0.25f);
                banner.color = new Color(bannerColor.r, bannerColor.g, bannerColor.b, 1f - fade);
                bannerBg.color = new Color(0.05f, 0.07f, 0.16f, 0.84f * (1f - fade));
                if (fade >= 1f) { bannerT = -1f; bannerWrap.gameObject.SetActive(false); }
            }
            if (tut.gameObject.activeSelf)
            {
                tutHand.anchoredPosition = new Vector2(Mathf.Sin(Time.time * 3.2f) * 320f, -48f);
                if (tutRing)
                {
                    float p = 0.85f + 0.25f * Mathf.Sin(Time.time * 7f);
                    tutRing.localScale = Vector3.one * p;
                }
            }
            if (EndcardVisible)
            {
                cta.localScale = Vector3.one * (1f + 0.06f * Mathf.Sin(Time.time * 6.5f));
                card.parent.localScale = Vector3.Lerp(card.parent.localScale, Vector3.one, 1f - Mathf.Exp(-10f * dt));
            }
        }

        static RectTransform Hand(Transform parent, out RectTransform pulseRing)
        {
            var h = (RectTransform)new GameObject("Hand", typeof(RectTransform)).transform;
            h.SetParent(parent, false);
            h.anchorMin = new Vector2(0.5f, 0.5f);
            h.anchorMax = new Vector2(0.5f, 0.5f);
            pulseRing = Img(h, AdRes.Ring, new Color(1f, 0.86f, 0.28f, 0.75f), new Vector2(0.5f, 0.5f), new Vector2(0f, 12f), new Vector2(115f, 115f), false).rectTransform;
            var art = (RectTransform)new GameObject("art", typeof(RectTransform)).transform;
            art.SetParent(h, false);
            art.localRotation = Quaternion.Euler(0f, 0f, 20f);
            var custom = Resources.Load<Sprite>("hand");
            if (!custom)
            {
                var tex = Resources.Load<Texture2D>("hand");
                if (tex) custom = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), new Vector2(0.5f, 0.5f), 100f);
            }
            if (custom)
            {
                art.localRotation = Quaternion.Euler(0f, 0f, 8f);
                var img = Img(art, custom, Color.white, new Vector2(0.5f, 0.5f), new Vector2(18f, -72f), new Vector2(168f, 168f), false);
                img.preserveAspect = true;
                return h;
            }
            for (int pass = 0; pass < 2; pass++)
            {
                var c = pass == 0 ? new Color(0.08f, 0.09f, 0.16f) : Color.white;
                float g = pass == 0 ? 12f : 0f;
                var r = AdRes.Round(256);
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
            rt.anchorMin = anchor;
            rt.anchorMax = anchor;
            rt.anchoredPosition = pos;
            float maxW = 840f;
            var prt = parent as RectTransform;
            if (prt != null && prt.sizeDelta.x > 50f && prt.sizeDelta.x < 960f)
                maxW = prt.sizeDelta.x - 28f;
            rt.sizeDelta = new Vector2(maxW, size * 1.45f);
            var t = go.AddComponent<Text>();
            t.font = AdRes.Font;
            t.text = s;
            t.fontSize = size;
            t.fontStyle = FontStyle.Normal;
            t.color = c;
            t.alignment = TextAnchor.MiddleCenter;
            t.horizontalOverflow = HorizontalWrapMode.Wrap;
            t.verticalOverflow = VerticalWrapMode.Truncate;
            t.resizeTextForBestFit = true;
            t.resizeTextMinSize = 18;
            t.resizeTextMaxSize = size;
            t.raycastTarget = false;
            var o = go.AddComponent<Outline>();
            o.effectColor = new Color(0.03f, 0.04f, 0.11f, 0.94f);
            o.effectDistance = new Vector2(4f, -4f);
            var sh = go.AddComponent<Shadow>();
            sh.effectColor = new Color(0f, 0f, 0f, 0.65f);
            sh.effectDistance = new Vector2(0f, -6f);
            return t;
        }

        public static Image Img(Transform parent, Sprite s, Color c, Vector2 anchor, Vector2 pos, Vector2 size, bool sliced)
        {
            var go = new GameObject("Image", typeof(RectTransform));
            var rt = (RectTransform)go.transform;
            rt.SetParent(parent, false);
            rt.anchorMin = anchor;
            rt.anchorMax = anchor;
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
