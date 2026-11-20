using System.Collections;
using System.Collections.Generic;
using AdKit;
using JellyAd;
using UnityEngine;
using UnityEngine.UI;

namespace HordeCamp
{
    /// <summary>
    /// Voodoo Creative 2 style Horde-Survivor playable ("Last Camp"):
    /// - 0.0s instant action hook: hero starts armed with a Whirlwind Axe inside a palisade camp with a glowing
    ///   Forge & Crystal Altar while skeletons & crystal clusters surround the perimeter.
    /// - Slain skeletons drop Red Meat chunks (with bone tips) + Blue XP Gems that magnet-pull to the hero.
    /// - 3-Choice Upgrade Card popup on Level-Up (auto-picks or tap-picks with golden pulse) that evolves
    ///   the hero across 4 visual stages (1: Whirlwind Axe, 2: Red Knight + Orbiting Blades + Ice Mage Ally,
    ///   3: Winged Berserker + Fiery Pentagram Nova + Fire Mage Ally, 4: Golden Winged Paladin + Sky Lightning).
    /// - Climax: Red danger alert + Giant Crowned Skeleton King Boss (2450 HP) + 360-skeleton horde breach.
    /// - Near-Miss Fail Ending: Boss drops down to ~148 HP (kıl payı!) before slamming the camp -> zoom-out reveal -> DEFEAT + CTA.
    /// </summary>
    [DisallowMultipleComponent]
    public class SurvivorGame : MonoBehaviour
    {
        [Header("Ad")]
        [LunaPlaygroundField("Game Title", 0, "Ad Settings")]
        public string gameTitle = "LAST CAMP";
        [LunaPlaygroundField("CTA Text", 1, "Ad Settings")]
        public string ctaText = "PLAY NOW";
        [LunaPlaygroundField("Store URL", 2, "Ad Settings")]
        public string storeUrl = "https://play.google.com/store";
        [Tooltip("Seconds of fighting before the Boss & zoom-out horde climax.")]
        [LunaPlaygroundField("Climax Time (s)", 3, "Ad Settings")]
        public float revealAfterSeconds = 21f;
        [Tooltip("Voodoo near-miss fail: Boss survives with ~148 HP before overwhelming the camp.")]
        [LunaPlaygroundField("Near-Miss Fail Ending", 4, "Ad Settings")]
        public bool nearMissEnding = true;

        [Header("Gameplay")]
        public float heroSpeed = 5.4f;
        public float heroHp = 100f;
        public float enemySpeed = 2.25f;
        public float spawnRateStart = 2.2f;
        public float spawnRateEnd = 13.5f;
        public int[] xpForLevel = { 5, 14, 27 };

        [Header("Video recording (auto-play)")]
        [LunaPlaygroundField("Auto Play (Video Mode)", 5, "Recording")]
        public bool autoPlay;

        // -------------------------------------------------------------- constants
        static readonly Vector3 ForgePos = new Vector3(-3.1f, 0f, 3.2f);
        static readonly Vector3 AltarPos = new Vector3(3.1f, 0f, 3.0f);
        const float CampHalf = 7.2f, WorldHalf = 26f;

        static readonly Color Bone = new Color(0.93f, 0.91f, 0.85f), BoneDark = new Color(0.55f, 0.53f, 0.50f);
        static readonly Color PurpleBone = new Color(0.62f, 0.28f, 0.88f), RedBrute = new Color(0.92f, 0.22f, 0.24f);
        static readonly Color Skin = new Color(1f, 0.80f, 0.65f), Hair = new Color(1f, 0.58f, 0.16f);
        static readonly Color Gold = new Color(1f, 0.84f, 0.24f), MeatRed = new Color(0.92f, 0.24f, 0.26f);
        static readonly Color CyanGem = new Color(0.28f, 0.82f, 1f);

        enum Phase { Fight, ClimaxBoss, Reveal, Result, End }
        Phase phase = Phase.Fight;

        class Enemy
        {
            public Transform tr;
            public Renderer bodyRen;
            public Color baseCol;
            public Vector3 pos;
            public float hp, maxHp, hitCd, flash, scale;
            public bool alive = true, horde, isBoss;
            public Label hpLabel;
            public Transform hpFill;
        }

        class DropItem
        {
            public Transform tr;
            public Vector3 pos;
            public bool isMeat;
        }

        class Ally
        {
            public Transform tr;
            public Vector3 pos;
            public Color boltCol;
            public float fireCd;
        }

        Camera cam;
        Transform world, fx;
        AdUI ui;

        // Hero & visual evolution parts
        Transform hero, heroAxe, heroArmor, heroWings, heroCrown, heroAura;
        Vector3 heroPos = new Vector3(0f, 0f, -1.2f), moveDir;
        float hp, hurtFlash;
        Transform hpFill, hpBar;

        // Camera shake
        float shakeT, shakeDur, shakeAmp;

        int weaponLevel = 1; // Starts at 1 (0s action hook!), evolves 1 -> 2 -> 3 -> 4
        int xp, level, meatCount;
        float axeTimer, novaTimer, boltTimer, fightTime, spawnTimer, bladeAngle;
        readonly List<Transform> blades = new List<Transform>();
        readonly List<Ally> allies = new List<Ally>();
        Transform novaRing, novaInnerRing;
        float novaT = -1f;
        Transform forgeRing, altarCrystal;

        readonly List<Enemy> enemies = new List<Enemy>();
        readonly List<DropItem> drops = new List<DropItem>();
        Enemy boss;

        // Joystick & HUD
        bool touching, dismissedTut;
        Vector2 touchOrigin;
        RectTransform joyBase, joyKnob;
        Text levelText, meatText;
        Image xpFill, dangerFlash;
        RectTransform upgradePanel;
        readonly Image[] cardBgs = new Image[3];
        readonly Text[] cardTitles = new Text[3];
        bool showingUpgradeCards;

        // ============================================================ setup
        void Start()
        {
            Application.targetFrameRate = 60;
            hp = heroHp;
            cam = Camera.main;
            if (!cam) cam = new GameObject("Main Camera") { tag = "MainCamera" }.AddComponent<Camera>();
            cam.orthographic = false;
            cam.fieldOfView = 54f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.42f, 0.34f, 0.24f);
            cam.farClipPlane = 250f;
            RenderSettings.fog = false;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.64f, 0.64f, 0.68f);

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;
            ui = AdUI.Create(gameTitle, ctaText, new Color(0.35f, 0.22f, 0.16f), new Color(1f, 0.76f, 0.22f));
            BuildHud();
            BuildWorld();
            BuildHero();
            UpdateCamera(true);

            // 0.0s Voodoo Action Hook: initial skeleton wave + scattered meat/gems already inside & around camp!
            SpawnInitialHookWave();

            if (!autoPlay) ui.ShowDragTutorial(true);
            ui.Banner("DEFEND THE CAMP!", Gold);
            StoreLink.LogEvent("lastcamp_start");
        }

        void BuildWorld()
        {
            // Outer desert wasteland + inner lush stone-trimmed camp courtyard
            Prims.Make(PrimitiveType.Cube, world, new Vector3(0f, -0.26f, 0f), new Vector3(150f, 0.5f, 150f), new Color(0.58f, 0.46f, 0.32f));
            Prims.Make(PrimitiveType.Cube, world, new Vector3(0f, -0.21f, 0f), new Vector3(CampHalf * 2f + 1.2f, 0.5f, CampHalf * 2f + 1.2f), new Color(0.38f, 0.66f, 0.28f));

            // Inner stone cobblestone tiles for visual depth (like Reference 2 courtyard)
            for (int gx = -2; gx <= 2; gx++)
                for (int gz = -2; gz <= 2; gz++)
                {
                    if ((gx + gz) % 2 == 0)
                        Prims.Make(PrimitiveType.Cube, world, new Vector3(gx * 2.2f, -0.18f, gz * 2.2f), new Vector3(1.85f, 0.46f, 1.85f), new Color(0.44f, 0.69f, 0.33f));
                }

            // Wooden palisade fence with entrance gap on North/South
            for (float t = -CampHalf; t <= CampHalf; t += 1.35f)
            {
                if (Mathf.Abs(t) > 1.8f) Post(new Vector3(t, 0f, -CampHalf));
                if (Mathf.Abs(t) > 2.0f) Post(new Vector3(t, 0f, CampHalf));
                Post(new Vector3(-CampHalf, 0f, t));
                Post(new Vector3(CampHalf, 0f, t));
            }
            for (int s = 0; s < 4; s++)
            {
                float a = s * Mathf.PI * 0.5f;
                var dir = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var rail = Prims.Make(PrimitiveType.Cube, world, dir * CampHalf + Vector3.up * 0.45f, new Vector3(CampHalf * 2f, 0.11f, 0.11f), new Color(0.52f, 0.36f, 0.20f));
                rail.transform.localRotation = Quaternion.Euler(0f, s % 2 == 0 ? 90f : 0f, 0f);
            }

            // 4 corner flaming braziers
            for (int sx = -1; sx <= 1; sx += 2)
                for (int sz = -1; sz <= 1; sz += 2)
                {
                    var bp = new Vector3(sx * (CampHalf - 0.5f), 0f, sz * (CampHalf - 0.5f));
                    Prims.Make(PrimitiveType.Cylinder, world, bp + Vector3.up * 0.55f, new Vector3(0.45f, 0.55f, 0.45f), new Color(0.28f, 0.28f, 0.32f));
                    Prims.Make(PrimitiveType.Sphere, world, bp + Vector3.up * 1.22f, new Vector3(0.52f, 0.65f, 0.52f), new Color(1f, 0.55f, 0.12f));
                }

            // Glowing Blue Crystal Clusters around camp border (Reference 2 resource nodes)
            Vector3[] crystalSpots =
            {
                new Vector3(-5.4f, 0f, -4.8f), new Vector3(5.5f, 0f, -4.6f),
                new Vector3(-5.8f, 0f, 0.8f),  new Vector3(5.6f, 0f, 0.5f)
            };
            for (int i = 0; i < crystalSpots.Length; i++) BuildCrystalCluster(crystalSpots[i]);

            // Outer trees & rocks
            var rnd = new System.Random(3);
            for (int i = 0; i < 26; i++)
            {
                float a = (float)rnd.NextDouble() * Mathf.PI * 2f, r = 9.5f + (float)rnd.NextDouble() * 16f;
                var p = new Vector3(Mathf.Cos(a) * r, 0f, Mathf.Sin(a) * r);
                if (i % 3 == 0)
                    Prims.Make(PrimitiveType.Sphere, world, p + Vector3.up * 0.3f, new Vector3(1.25f, 0.75f, 1.05f), new Color(0.48f, 0.48f, 0.52f));
                else
                {
                    Prims.Make(PrimitiveType.Cylinder, world, p + Vector3.up * 0.6f, new Vector3(0.32f, 0.6f, 0.32f), new Color(0.45f, 0.30f, 0.18f));
                    Prims.Make(PrimitiveType.Sphere, world, p + Vector3.up * 1.75f, new Vector3(1.45f, 1.85f, 1.45f), new Color(0.20f, 0.48f, 0.25f));
                }
            }

            // Left: Blacksmith Forge Hut + glowing furnace + anvil + golden upgrade ring
            Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0f, 0.9f, 0f), new Vector3(3.1f, 1.8f, 2.2f), new Color(0.58f, 0.40f, 0.24f));
            var roof = Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0f, 2.15f, 0f), new Vector3(3.5f, 0.36f, 2.6f), new Color(0.78f, 0.58f, 0.18f));
            roof.transform.localRotation = Quaternion.Euler(-8f, 0f, 0f);
            Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0.6f, 0.32f, -1.4f), new Vector3(0.75f, 0.62f, 0.48f), new Color(0.28f, 0.29f, 0.34f));
            Prims.Make(PrimitiveType.Cylinder, world, ForgePos + new Vector3(-0.9f, 0.42f, -1.4f), new Vector3(0.75f, 0.42f, 0.75f), new Color(1f, 0.42f, 0.10f));
            forgeRing = Prims.Make(PrimitiveType.Cylinder, world, ForgePos + new Vector3(0f, 0.03f, -1.9f), new Vector3(2.1f, 0.02f, 2.1f), Gold).transform;
            Res.MakeLabel(world, "FORGE", 0.62f, Gold, 35, ForgePos + new Vector3(0f, 2.75f, -0.5f));

            // Right: Magic Crystal Well / Altar (Reference 2 right-side structure)
            Prims.Make(PrimitiveType.Cylinder, world, AltarPos + new Vector3(0f, 0.35f, 0f), new Vector3(2.4f, 0.35f, 2.4f), new Color(0.38f, 0.40f, 0.48f));
            Prims.Make(PrimitiveType.Cylinder, world, AltarPos + new Vector3(0f, 0.65f, 0f), new Vector3(1.8f, 0.15f, 1.8f), new Color(0.22f, 0.65f, 0.96f));
            altarCrystal = Prims.Make(PrimitiveType.Cube, world, AltarPos + new Vector3(0f, 1.65f, 0f), new Vector3(0.75f, 1.15f, 0.75f), CyanGem).transform;
            altarCrystal.localRotation = Quaternion.Euler(35f, 45f, 25f);
            Res.MakeLabel(world, "ALTAR", 0.62f, CyanGem, 35, AltarPos + new Vector3(0f, 2.75f, -0.5f));
        }

        void BuildCrystalCluster(Vector3 p)
        {
            var root = new GameObject("CrystalCluster").transform;
            root.SetParent(world, false);
            root.localPosition = p;
            for (int i = 0; i < 3; i++)
            {
                var shard = Prims.Make(PrimitiveType.Cube, root, new Vector3((i - 1) * 0.32f, 0.45f + (i == 1 ? 0.2f : 0f), (i % 2) * 0.15f),
                    new Vector3(0.32f, 0.85f + (i == 1 ? 0.35f : 0f), 0.32f), CyanGem);
                shard.transform.localRotation = Quaternion.Euler((i - 1) * 14f, i * 40f, (1 - i) * 16f);
            }
        }

        void Post(Vector3 p) => Prims.Make(PrimitiveType.Cube, world, p + Vector3.up * 0.45f, new Vector3(0.20f, 0.9f, 0.20f), new Color(0.50f, 0.34f, 0.20f));

        static void AxeModel(Transform parent, float s, Color bladeCol)
        {
            Prims.Make(PrimitiveType.Cube, parent, Vector3.zero, new Vector3(0.11f, 0.95f, 0.11f) * s, new Color(0.48f, 0.30f, 0.16f));
            Prims.Make(PrimitiveType.Cube, parent, new Vector3(0.18f, 0.34f, 0f) * s, new Vector3(0.46f, 0.36f, 0.07f) * s, bladeCol);
            Prims.Make(PrimitiveType.Cube, parent, new Vector3(-0.14f, 0.34f, 0f) * s, new Vector3(0.28f, 0.24f, 0.06f) * s, bladeCol);
        }

        void BuildHero()
        {
            hero = Prims.Figure(world, new Color(0.25f, 0.48f, 0.88f), Hair, Skin, new Color(0f, 0f, 0f, 0f), 1.22f);
            hero.GetChild(3).gameObject.SetActive(false);

            // Armed right from 0.0s with the Whirlwind Battle-Axe!
            heroAxe = new GameObject("Axe").transform;
            heroAxe.SetParent(hero, false);
            heroAxe.localPosition = new Vector3(0.34f, 0.56f, 0.14f);
            AxeModel(heroAxe, 1.05f, new Color(0.85f, 0.90f, 0.98f));

            // Evolution Stage 2: Red & Gold Shoulder Armor
            heroArmor = new GameObject("Armor").transform;
            heroArmor.SetParent(hero, false);
            Prims.Make(PrimitiveType.Sphere, heroArmor, new Vector3(-0.34f, 0.72f, 0f), new Vector3(0.32f, 0.26f, 0.32f), new Color(0.88f, 0.18f, 0.20f));
            Prims.Make(PrimitiveType.Sphere, heroArmor, new Vector3(0.34f, 0.72f, 0f), new Vector3(0.32f, 0.26f, 0.32f), new Color(0.88f, 0.18f, 0.20f));
            Prims.Make(PrimitiveType.Cylinder, heroArmor, new Vector3(0f, 0.52f, 0f), new Vector3(0.56f, 0.12f, 0.50f), Gold);
            heroArmor.gameObject.SetActive(false);

            // Evolution Stage 3: Dark-Crimson Battle Wings (Reference 2 winged evolution!)
            heroWings = new GameObject("Wings").transform;
            heroWings.SetParent(hero, false);
            for (int s = -1; s <= 1; s += 2)
            {
                var w1 = Prims.Make(PrimitiveType.Cube, heroWings, new Vector3(s * 0.48f, 0.78f, -0.22f), new Vector3(0.68f, 0.24f, 0.08f), new Color(0.85f, 0.16f, 0.22f));
                w1.transform.localRotation = Quaternion.Euler(0f, s * -18f, s * 28f);
                var w2 = Prims.Make(PrimitiveType.Cube, heroWings, new Vector3(s * 0.74f, 0.96f, -0.26f), new Vector3(0.55f, 0.18f, 0.07f), Gold);
                w2.transform.localRotation = Quaternion.Euler(0f, s * -22f, s * 42f);
            }
            heroWings.gameObject.SetActive(false);

            // Evolution Stage 4: Golden Paladin Crown & Glowing Ground Aura
            heroCrown = Prims.Make(PrimitiveType.Cylinder, hero, new Vector3(0f, 1.24f, 0f), new Vector3(0.36f, 0.09f, 0.36f), Gold).transform;
            heroCrown.gameObject.SetActive(false);
            heroAura = Prims.Make(PrimitiveType.Cylinder, hero, new Vector3(0f, 0.03f, 0f), new Vector3(1.85f, 0.015f, 1.85f), new Color(1f, 0.85f, 0.25f)).transform;
            heroAura.gameObject.SetActive(false);

            hpBar = new GameObject("HpBar").transform;
            hpBar.SetParent(world, false);
            Prims.Make(PrimitiveType.Cube, hpBar, Vector3.zero, new Vector3(1.35f, 0.17f, 0.05f), new Color(0.14f, 0.14f, 0.18f));
            hpFill = Prims.Make(PrimitiveType.Cube, hpBar, new Vector3(0f, 0f, -0.03f), new Vector3(1.26f, 0.11f, 0.05f), new Color(0.32f, 0.94f, 0.36f)).transform;

            // Fiery Pentagram / Nova rings
            novaRing = Prims.Make(PrimitiveType.Cylinder, fx, Vector3.zero, Vector3.zero, new Color(1f, 0.42f, 0.10f)).transform;
            novaRing.gameObject.SetActive(false);
            novaInnerRing = Prims.Make(PrimitiveType.Cylinder, fx, Vector3.zero, Vector3.zero, new Color(1f, 0.82f, 0.22f)).transform;
            novaInnerRing.gameObject.SetActive(false);
        }

        void BuildHud()
        {
            var top = new Vector2(0.5f, 1f);
            levelText = AdUI.Txt(ui.Root, "LV 1  WARRIOR", 54, Color.white, top, new Vector2(-130f, -72f));
            meatText = AdUI.Txt(ui.Root, "MEAT: 0", 46, new Color(1f, 0.78f, 0.35f), top, new Vector2(210f, -72f));

            var bg = AdUI.Img(ui.Root, Res.Round(128), new Color(0f, 0f, 0f, 0.42f), top, new Vector2(0f, -142f), new Vector2(660f, 42f), true);
            xpFill = AdUI.Img(bg.transform, Res.Square, new Color(0.28f, 0.78f, 1f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(642f, 28f), false);
            xpFill.type = Image.Type.Filled;
            xpFill.fillMethod = Image.FillMethod.Horizontal;
            xpFill.fillAmount = 0f;

            // Red danger vignette overlay for Boss Climax
            dangerFlash = AdUI.Img(ui.Root, Res.Square, new Color(0.95f, 0.12f, 0.12f, 0f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(1200f, 2400f), false);
            dangerFlash.raycastTarget = false;

            // 3-Choice Upgrade Cards Container (Reference 2 upgrade bar)
            var cardRootGo = new GameObject("UpgradeCards", typeof(RectTransform));
            upgradePanel = cardRootGo.GetComponent<RectTransform>();
            upgradePanel.SetParent(ui.Root, false);
            upgradePanel.anchorMin = new Vector2(0.5f, 0.25f);
            upgradePanel.anchorMax = new Vector2(0.5f, 0.25f);
            upgradePanel.sizeDelta = new Vector2(920f, 220f);
            for (int i = 0; i < 3; i++)
            {
                float cx = (i - 1) * 295f;
                cardBgs[i] = AdUI.Img(upgradePanel, Res.Round(64), new Color(0.16f, 0.18f, 0.28f, 0.94f), new Vector2(0.5f, 0.5f), new Vector2(cx, 0f), new Vector2(272f, 185f), true);
                cardTitles[i] = AdUI.Txt(cardBgs[i].transform, "UPGRADE", 34, Color.white, new Vector2(0.5f, 0.5f), Vector2.zero);
            }
            upgradePanel.gameObject.SetActive(false);

            // Virtual joystick (split struct assignments for Bridge.NET compatibility!)
            joyBase = AdUI.Img(ui.Root, Res.Circle, new Color(1f, 1f, 1f, 0.24f), Vector2.zero, Vector2.zero, new Vector2(280f, 280f), false).rectTransform;
            joyBase.anchorMin = new Vector2(0f, 0f);
            joyBase.anchorMax = new Vector2(0f, 0f);
            joyKnob = AdUI.Img(joyBase, Res.Circle, new Color(1f, 1f, 1f, 0.78f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(122f, 122f), false).rectTransform;
            joyBase.gameObject.SetActive(false);
            ui.Root.SetAsLastSibling();
        }

        void SpawnInitialHookWave()
        {
            // Immediate skeletons charging in + pre-dropped meat & gems so 0.0s frame is packed with action
            for (int i = 0; i < 10; i++)
            {
                float a = i * Mathf.PI * 2f / 10f;
                SpawnEnemyAt(new Vector3(Mathf.Cos(a) * 6.2f, 0f, Mathf.Sin(a) * 6.2f), false, 0);
            }
            for (int i = 0; i < 4; i++)
            {
                SpawnDrop(new Vector3(Random.Range(-2.5f, 2.5f), 0.3f, Random.Range(-2.2f, 2.2f)), i % 2 == 0);
            }
        }

        // ============================================================ loop
        void Update()
        {
            float dt = Time.deltaTime;
            ui.Tick(Time.unscaledDeltaTime);
            ReadInput();

            if (phase == Phase.Fight || phase == Phase.ClimaxBoss)
            {
                if (autoPlay || !touching && !dismissedTut) moveDir = AutoDir();
                heroPos += moveDir * heroSpeed * dt;
                heroPos.x = Mathf.Clamp(heroPos.x, -CampHalf + 0.6f, CampHalf - 0.6f);
                heroPos.z = Mathf.Clamp(heroPos.z, -CampHalf + 0.6f, CampHalf - 0.6f);

                fightTime += dt;
                Spawn(dt);
                Weapons(dt);
                UpdateAllies(dt);

                if (phase == Phase.Fight && fightTime >= revealAfterSeconds)
                    StartCoroutine(ClimaxBossAndReveal());
            }

            if (phase == Phase.Fight || phase == Phase.ClimaxBoss || phase == Phase.Reveal)
                UpdateEnemies(dt);

            UpdateDrops(dt);
            UpdateHero(dt);
            UpdateCamera(false);
            UpdateJoystickVisual();

            if (altarCrystal)
            {
                altarCrystal.Rotate(0f, 110f * dt, 0f, Space.World);
                altarCrystal.localPosition = AltarPos + new Vector3(0f, 1.65f + Mathf.Sin(Time.time * 3.5f) * 0.14f, 0f);
            }
            if (forgeRing)
            {
                float s = 2.0f + Mathf.Sin(Time.time * 5f) * 0.15f;
                forgeRing.localScale = new Vector3(s, 0.02f, s);
            }
        }

        void ReadInput()
        {
            bool down, held;
            Vector2 pos;
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
            var p = UnityEngine.InputSystem.Pointer.current;
            down = p != null && p.press.wasPressedThisFrame;
            held = p != null && p.press.isPressed;
            pos = p != null ? p.position.ReadValue() : Vector2.zero;
#else
            down = Input.GetMouseButtonDown(0);
            held = Input.GetMouseButton(0);
            pos = Input.mousePosition;
#endif
            if (down)
            {
                if (phase == Phase.End) { Sfx.Play(Sfx.Id.Click); StoreLink.Open(storeUrl); return; }
                if (!dismissedTut) { dismissedTut = true; ui.ShowDragTutorial(false); }
                touching = true;
                touchOrigin = pos;
            }
            if (!held) touching = false;
            if (autoPlay) return;
            if (touching)
            {
                float radius = Screen.height * 0.07f;
                var d = (pos - touchOrigin) / radius;
                moveDir = d.sqrMagnitude > 0.04f ? new Vector3(d.x, 0f, d.y) : Vector3.zero;
                if (moveDir.sqrMagnitude > 1f) moveDir.Normalize();
            }
            else if (dismissedTut) moveDir = Vector3.zero;
        }

        void UpdateJoystickVisual()
        {
            bool show = (touching && !autoPlay) || (autoPlay && (phase == Phase.Fight || phase == Phase.ClimaxBoss));
            show &= phase != Phase.End;
            joyBase.gameObject.SetActive(show);
            if (!show) return;
            var canvasScale = ui.Root.localScale.x;
            Vector2 origin = autoPlay ? new Vector2(Screen.width * 0.5f, Screen.height * 0.17f) : touchOrigin;
            joyBase.anchoredPosition = origin / canvasScale;
            joyKnob.anchoredPosition = new Vector2(moveDir.x, moveDir.z) * 90f;
        }

        void UpdateHero(float dt)
        {
            hero.localPosition = heroPos + Vector3.up * (moveDir.sqrMagnitude > 0.01f ? Mathf.Abs(Mathf.Sin(Time.time * 15f)) * 0.13f : 0f);
            if (moveDir.sqrMagnitude > 0.01f)
                hero.localRotation = Quaternion.Slerp(hero.localRotation, Quaternion.LookRotation(moveDir), 1f - Mathf.Exp(-14f * dt));
            hurtFlash = Mathf.MoveTowards(hurtFlash, 0f, dt * 5f);
            Color baseTorso = weaponLevel >= 4 ? Gold : weaponLevel >= 3 ? new Color(0.22f, 0.20f, 0.28f) : weaponLevel >= 2 ? new Color(0.82f, 0.20f, 0.22f) : new Color(0.25f, 0.48f, 0.88f);
            Prims.SetColor(hero.GetChild(0).GetComponent<Renderer>(), Color.Lerp(baseTorso, Color.red, hurtFlash));

            if (heroWings && heroWings.gameObject.activeSelf)
            {
                float flap = Mathf.Sin(Time.time * 12f) * 14f;
                heroWings.localRotation = Quaternion.Euler(flap, 0f, 0f);
            }

            hpBar.position = heroPos + Vector3.up * 2.25f;
            hpBar.rotation = cam.transform.rotation;
            float f = Mathf.Clamp01(hp / heroHp);
            hpFill.localScale = new Vector3(1.26f * f, 0.11f, 0.05f);
            hpFill.localPosition = new Vector3(-0.63f * (1f - f), 0f, -0.03f);
        }

        void Shake(float dur, float amp)
        {
            shakeDur = Mathf.Max(shakeDur, dur);
            shakeT = Mathf.Max(shakeT, dur);
            shakeAmp = Mathf.Max(shakeAmp, amp);
        }

        void UpdateCamera(bool snap)
        {
            Vector3 shakeOffset = Vector3.zero;
            if (shakeT > 0f)
            {
                shakeT -= Time.deltaTime;
                float f = Mathf.Clamp01(shakeT / Mathf.Max(0.01f, shakeDur));
                Vector2 r = Random.insideUnitCircle * (shakeAmp * f);
                shakeOffset = new Vector3(r.x, r.y, 0f);
            }

            Vector3 pos, look;
            if (phase == Phase.Reveal || phase == Phase.End || phase == Phase.Result && revealT > 0f)
            {
                float k = Ease(Mathf.Clamp01(revealT / 2.1f));
                pos = Vector3.Lerp(heroPos + new Vector3(0f, 14f, -9f), new Vector3(0f, 58f, -38f), k) + shakeOffset;
                look = Vector3.Lerp(heroPos + new Vector3(0f, 0f, 1.5f), Vector3.zero, k);
                cam.transform.position = pos;
                cam.transform.rotation = Quaternion.LookRotation(look - pos);
                return;
            }
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            float h = Mathf.Lerp(16.5f, 12.5f, Mathf.Clamp01((a - 0.5f) / 0.5f));
            pos = heroPos + new Vector3(0f, h, -h * 0.62f) + shakeOffset;
            look = heroPos + new Vector3(0f, 0f, 1.5f);
            cam.transform.position = snap ? pos : Vector3.Lerp(cam.transform.position, pos, 1f - Mathf.Exp(-6.5f * Time.deltaTime));
            cam.transform.rotation = Quaternion.LookRotation(look - cam.transform.position);
        }

        // ============================================================ progression & 3-choice upgrade cards
        void CollectDrop(bool isMeat)
        {
            if (isMeat)
            {
                meatCount++;
                meatText.text = "MEAT: " + meatCount;
            }
            xp++;
            int need = level < xpForLevel.Length ? xpForLevel[level] : int.MaxValue;
            int prev = level > 0 ? xpForLevel[level - 1] : 0;
            if (xp >= need && weaponLevel < 4)
            {
                level++;
                weaponLevel = Mathf.Min(4, weaponLevel + 1);
                string title = weaponLevel == 2 ? "LV 2  RED KNIGHT" : weaponLevel == 3 ? "LV 3  FIRE DEMON" : "LV 4  PALADIN LORD";
                levelText.text = title;
                StartCoroutine(LevelUpAndShowCards(weaponLevel));
                prev = need;
                need = level < xpForLevel.Length ? xpForLevel[level] : need + 30;
            }
            xpFill.fillAmount = Mathf.Clamp01((xp - prev) / (float)Mathf.Max(1, need - prev));
        }

        IEnumerator LevelUpAndShowCards(int newTier)
        {
            StoreLink.LogEvent("lastcamp_levelup");
            Sfx.Play(Sfx.Id.Win);
            Shake(0.25f, 0.22f);
            Prims.Burst(this, fx, heroPos + Vector3.up, Gold, 32, 6.5f);

            // Evolve hero visuals & spawn camp ally!
            if (newTier == 2)
            {
                heroArmor.gameObject.SetActive(true);
                for (int i = 0; i < 3; i++)
                {
                    var b = Prims.Make(PrimitiveType.Cube, fx, heroPos, new Vector3(0.95f, 0.08f, 0.24f), new Color(0.75f, 0.92f, 1f)).transform;
                    blades.Add(b);
                }
                SpawnCampAlly(new Vector3(-2.4f, 0f, 1.2f), new Color(0.25f, 0.78f, 1f), "ICE MAGE");
            }
            else if (newTier == 3)
            {
                heroWings.gameObject.SetActive(true);
                SpawnCampAlly(new Vector3(2.4f, 0f, 1.2f), new Color(1f, 0.45f, 0.14f), "FIRE MAGE");
            }
            else if (newTier == 4)
            {
                heroCrown.gameObject.SetActive(true);
                heroAura.gameObject.SetActive(true);
            }

            // Reference 2 style 3-Choice Upgrade Cards popup
            string c0 = newTier == 2 ? "SPIN BLADES\n+ICE MAGE" : newTier == 3 ? "FIRE PENTAGRAM\n+DEMON WINGS" : "SKY LIGHTNING\n+PALADIN LORD";
            string c1 = newTier == 2 ? "MAX HP +25%" : newTier == 3 ? "MOVE SPEED +20%" : "CRIT RATE +30%";
            string c2 = newTier == 2 ? "MEAT MAGNET" : newTier == 3 ? "AXE RANGE +15%" : "ALLY SPEED +25%";
            cardTitles[0].text = c1;
            cardTitles[1].text = c0;
            cardTitles[2].text = c2;
            for (int i = 0; i < 3; i++)
                cardBgs[i].color = i == 1 ? new Color(0.26f, 0.48f, 0.92f, 0.96f) : new Color(0.16f, 0.18f, 0.28f, 0.92f);

            string bannerMsg = newTier == 2 ? "LV+1! SPINNING BLADES & ICE MAGE!" : newTier == 3 ? "LV+1! FIRE NOVA & DEMON WINGS!" : "MAX LEVEL! SKY LIGHTNING STORM!";
            ui.Banner(bannerMsg, Gold);

            if (!showingUpgradeCards)
            {
                showingUpgradeCards = true;
                upgradePanel.gameObject.SetActive(true);
                upgradePanel.localScale = Vector3.one * 0.6f;
                for (float t = 0f; t < 0.18f; t += Time.unscaledDeltaTime)
                {
                    upgradePanel.localScale = Vector3.one * Mathf.Lerp(0.6f, 1.04f, t / 0.18f);
                    yield return null;
                }
                upgradePanel.localScale = Vector3.one;
                // Highlight middle card as picked (golden flash)
                cardBgs[1].color = new Color(0.95f, 0.72f, 0.15f, 0.98f);
                cardBgs[1].transform.localScale = Vector3.one * 1.12f;
                yield return new WaitForSecondsRealtime(0.65f);
                cardBgs[1].transform.localScale = Vector3.one;
                upgradePanel.gameObject.SetActive(false);
                showingUpgradeCards = false;
            }
        }

        void SpawnCampAlly(Vector3 pos, Color col, string label)
        {
            var tr = Prims.Figure(world, col, Gold, Skin, col, 0.98f);
            tr.localPosition = pos;
            Prims.Burst(this, fx, pos + Vector3.up, col, 18, 5f);
            var lbl = Res.MakeLabel(fx, "+" + label, 0.65f, col, 45, pos + Vector3.up * 2.1f);
            Destroy(lbl.gameObject, 1.1f);
            allies.Add(new Ally { tr = tr, pos = pos, boltCol = col, fireCd = 0.4f });
        }

        void UpdateAllies(float dt)
        {
            for (int i = 0; i < allies.Count; i++)
            {
                var a = allies[i];
                a.tr.localPosition = a.pos + Vector3.up * (Mathf.Sin(Time.time * 5f + i) * 0.06f);
                a.fireCd -= dt;
                if (a.fireCd <= 0f)
                {
                    var target = NearestFrom(a.pos, 10f);
                    if (target != null)
                    {
                        a.fireCd = 0.65f;
                        a.tr.localRotation = Quaternion.LookRotation(target.pos - a.pos);
                        StartCoroutine(AllyBolt(a.pos + Vector3.up * 0.8f, target, a.boltCol));
                    }
                }
            }
        }

        IEnumerator AllyBolt(Vector3 from, Enemy target, Color col)
        {
            var orb = Prims.Make(PrimitiveType.Sphere, fx, from, Vector3.one * 0.34f, col).transform;
            for (float t = 0f; t < 1f; t += Time.deltaTime / 0.18f)
            {
                if (target != null && target.alive)
                    orb.localPosition = Vector3.Lerp(from, target.pos + Vector3.up * 0.6f, t);
                yield return null;
            }
            Destroy(orb.gameObject);
            if (target != null && target.alive) Damage(target, 22f);
        }

        // ============================================================ enemies & Boss
        void Spawn(float dt)
        {
            float k = Mathf.Clamp01(fightTime / revealAfterSeconds);
            spawnTimer += dt * Mathf.Lerp(spawnRateStart, spawnRateEnd, k * k);
            while (spawnTimer >= 1f)
            {
                spawnTimer -= 1f;
                int variant = fightTime > 12f && Random.value < 0.35f ? 2 : (fightTime > 5f && Random.value < 0.45f ? 1 : 0);
                SpawnEnemy(Random.Range(10.5f, 14.5f), false, variant);
            }
        }

        void SpawnEnemy(float dist, bool horde, int variant = 0)
        {
            float a = Random.value * Mathf.PI * 2f;
            var center = horde ? Vector3.zero : heroPos * 0.4f;
            var p = center + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * dist;
            SpawnEnemyAt(p, horde, variant);
        }

        void SpawnEnemyAt(Vector3 p, bool horde, int variant)
        {
            Color col = variant == 2 ? RedBrute : variant == 1 ? PurpleBone : Bone;
            float sc = variant == 2 ? 1.25f : variant == 1 ? 1.08f : (horde ? Random.Range(0.92f, 1.12f) : 1f);
            float ehp = (variant == 2 ? 42f : variant == 1 ? 26f : 16f) + fightTime * 1.1f;
            var e = new Enemy { pos = p, hp = ehp, maxHp = ehp, horde = horde, baseCol = col, scale = sc };
            e.tr = Prims.Figure(world, col, BoneDark, col, BoneDark, sc);
            e.bodyRen = e.tr.GetChild(0).GetComponent<Renderer>();
            e.tr.localPosition = p;
            enemies.Add(e);
        }

        void SpawnSkeletonKingBoss()
        {
            Vector3 p = new Vector3(0f, 0f, CampHalf + 2.2f);
            float bhp = 2450f;
            boss = new Enemy
            {
                pos = p, hp = bhp, maxHp = bhp,
                horde = false, isBoss = true,
                baseCol = new Color(0.88f, 0.16f, 0.20f), scale = 2.85f
            };
            boss.tr = Prims.Figure(world, boss.baseCol, Gold, Bone, DarkCol(), 2.85f);
            boss.bodyRen = boss.tr.GetChild(0).GetComponent<Renderer>();
            // Golden Crown + Giant horns on Skeleton King
            Prims.Make(PrimitiveType.Cylinder, boss.tr, new Vector3(0f, 1.24f, 0f), new Vector3(0.42f, 0.12f, 0.42f), Gold);
            Prims.Make(PrimitiveType.Cube, boss.tr, new Vector3(0.38f, 0.55f, 0.25f), new Vector3(0.18f, 0.95f, 0.35f), new Color(0.22f, 0.22f, 0.26f));

            // Overhead Boss HP Bar + Numeric Counter ("2450 HP")
            var barRoot = new GameObject("BossHp").transform;
            barRoot.SetParent(boss.tr, false);
            barRoot.localPosition = new Vector3(0f, 1.55f, 0f);
            Prims.Make(PrimitiveType.Cube, barRoot, Vector3.zero, new Vector3(1.1f, 0.14f, 0.05f), new Color(0.12f, 0.12f, 0.15f));
            boss.hpFill = Prims.Make(PrimitiveType.Cube, barRoot, new Vector3(0f, 0f, -0.02f), new Vector3(1.04f, 0.10f, 0.05f), new Color(1f, 0.22f, 0.22f)).transform;
            boss.hpLabel = Res.MakeLabel(barRoot, "BOSS: 2450", 0.38f, Gold, 50, new Vector3(0f, 0.26f, -0.04f));

            boss.tr.localPosition = p;
            enemies.Add(boss);
        }

        static Color DarkCol() => new Color(0.18f, 0.18f, 0.22f);

        void UpdateEnemies(float dt)
        {
            for (int i = 0; i < enemies.Count; i++)
            {
                var e = enemies[i];
                if (!e.alive) continue;
                Vector3 target = e.horde ? Vector3.zero : heroPos;
                var to = target - e.pos;
                to.y = 0f;
                float d = to.magnitude;
                float spd = e.isBoss ? enemySpeed * 0.85f : (e.horde ? 0.95f : enemySpeed);
                var vel = d > 0.01f ? to / d * spd : Vector3.zero;

                if (!e.horde)
                {
                    for (int j = i + 1; j < enemies.Count && j < i + 25; j++)
                    {
                        var o = enemies[j];
                        if (!o.alive || o.isBoss) continue;
                        var sep = e.pos - o.pos;
                        float sd = sep.sqrMagnitude;
                        if (sd < 0.52f && sd > 0.0001f)
                        {
                            var push = sep / Mathf.Sqrt(sd) * (0.72f - Mathf.Sqrt(sd)) * 3f * dt;
                            if (!e.isBoss) e.pos += push;
                            o.pos -= push;
                        }
                    }
                    float hitRadius = e.isBoss ? 1.85f : 0.88f;
                    if (d < hitRadius && (phase == Phase.Fight || phase == Phase.ClimaxBoss))
                    {
                        hp -= (e.isBoss ? 22f : 9f) * dt;
                        // Keep hero alive until the dramatic near-miss boss climax finishes
                        if (autoPlay || nearMissEnding) hp = Mathf.Max(hp, heroHp * 0.22f);
                        hurtFlash = 1f;
                        vel = Vector3.zero;
                        if (hp <= 0f) StartCoroutine(Die());
                    }
                }

                e.pos += vel * dt;
                e.hitCd -= dt;
                e.flash = Mathf.MoveTowards(e.flash, 0f, dt * 6f);
                e.tr.localPosition = e.pos + Vector3.up * Mathf.Abs(Mathf.Sin(Time.time * 10f + i)) * 0.08f;
                if (vel.sqrMagnitude > 0.001f) e.tr.localRotation = Quaternion.LookRotation(vel);
                if (e.bodyRen) Prims.SetColor(e.bodyRen, Color.Lerp(e.baseCol, Color.white, e.flash));

                if (e.isBoss && e.hpFill)
                {
                    float bf = Mathf.Clamp01(e.hp / e.maxHp);
                    e.hpFill.localScale = new Vector3(1.04f * bf, 0.10f, 0.05f);
                    e.hpFill.localPosition = new Vector3(-0.52f * (1f - bf), 0f, -0.02f);
                    if (e.hpLabel) e.hpLabel.Text = "BOSS: " + Mathf.CeilToInt(e.hp);
                }
            }
            if (enemies.Count > 0 && Time.frameCount % 60 == 0) enemies.RemoveAll(x => !x.alive);
        }

        void Damage(Enemy e, float dmg)
        {
            if (!e.alive || e.horde) return;
            if (e.isBoss)
            {
                // Near-Miss clamping: Boss drops rapidly from 2450 down to 148 HP (kıl payı!)
                float minBossHp = nearMissEnding ? 148f : 0f;
                e.hp = Mathf.Max(minBossHp, e.hp - dmg * 4.2f);
                e.flash = 1f;
                if (e.hp > 0f) return;
            }
            else
            {
                e.hp -= dmg;
                e.flash = 1f;
                if (e.hp > 0f) return;
            }

            e.alive = false;
            Sfx.Play(Sfx.Id.Pop, 0.55f);
            Prims.Burst(this, fx, e.pos + Vector3.up * 0.6f, e.baseCol, 7);
            Destroy(e.tr.gameObject);

            // Drop either a Red Meat leg (Reference 2 signature drop!) or a Blue XP Crystal
            SpawnDrop(e.pos + Vector3.up * 0.32f, Random.value < 0.55f);
        }

        void SpawnDrop(Vector3 pos, bool isMeat)
        {
            var d = new DropItem { pos = pos, isMeat = isMeat };
            if (isMeat)
            {
                // Meat chunk with white bone tip (just like Reference 2!)
                var root = new GameObject("Meat").transform;
                root.SetParent(world, false);
                root.localPosition = pos;
                Prims.Make(PrimitiveType.Sphere, root, Vector3.zero, new Vector3(0.42f, 0.30f, 0.32f), MeatRed);
                Prims.Make(PrimitiveType.Cube, root, new Vector3(0.24f, 0f, 0f), new Vector3(0.22f, 0.10f, 0.10f), Color.white);
                d.tr = root;
            }
            else
            {
                d.tr = Prims.Make(PrimitiveType.Cube, world, pos, Vector3.one * 0.30f, CyanGem).transform;
                d.tr.localRotation = Quaternion.Euler(45f, 0f, 45f);
            }
            drops.Add(d);
        }

        void UpdateDrops(float dt)
        {
            for (int i = drops.Count - 1; i >= 0; i--)
            {
                var g = drops[i];
                var to = heroPos + Vector3.up * 0.6f - g.pos;
                float d = to.magnitude;
                if (d < 4.5f) g.pos += to.normalized * Mathf.Lerp(16f, 6f, d / 4.5f) * dt;
                g.tr.localPosition = g.pos + Vector3.up * Mathf.Sin(Time.time * 4.5f + i) * 0.08f;
                g.tr.Rotate(0f, 160f * dt, 0f, Space.World);
                if (d < 0.55f)
                {
                    Destroy(g.tr.gameObject);
                    drops.RemoveAt(i);
                    Sfx.Play(Sfx.Id.Tap, 0.42f, 1.55f);
                    if (phase == Phase.Fight || phase == Phase.ClimaxBoss) CollectDrop(g.isMeat);
                }
            }
        }

        // ============================================================ weapons
        void Weapons(float dt)
        {
            // 1: Whirlwind Axe 360° swing
            axeTimer += dt;
            if (weaponLevel >= 1 && axeTimer >= 0.48f && Nearest(2.65f) != null)
            {
                axeTimer = 0f;
                Sfx.Play(Sfx.Id.Hit, 0.7f);
                StartCoroutine(AxeSwing());
                foreach (var e in enemies)
                    if (e.alive && !e.horde && (e.pos - heroPos).sqrMagnitude < 2.65f * 2.65f) Damage(e, 28f);
            }

            // 2: Orbiting silver blades
            if (weaponLevel >= 2)
            {
                if (weaponLevel >= 3 && blades.Count < 5)
                    blades.Add(Prims.Make(PrimitiveType.Cube, fx, heroPos, new Vector3(0.95f, 0.08f, 0.24f), new Color(0.8f, 0.92f, 1f)).transform);
                bladeAngle += dt * 4.8f;
                for (int i = 0; i < blades.Count; i++)
                {
                    float a = bladeAngle + i * Mathf.PI * 2f / blades.Count;
                    var p = heroPos + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * 2.5f + Vector3.up * 0.7f;
                    blades[i].localPosition = p;
                    blades[i].localRotation = Quaternion.Euler(0f, -a * Mathf.Rad2Deg + Time.time * 900f, 0f);
                    foreach (var e in enemies)
                        if (e.alive && !e.horde && e.hitCd <= 0f && (e.pos - new Vector3(p.x, 0f, p.z)).sqrMagnitude < 0.85f)
                        { e.hitCd = 0.25f; Damage(e, 18f); }
                }
            }

            // 3: Fiery Pentagram / Flame Nova wave
            if (weaponLevel >= 3)
            {
                novaTimer += dt;
                if (novaTimer >= 1.5f)
                {
                    novaTimer = 0f;
                    novaT = 0f;
                    novaRing.gameObject.SetActive(true);
                    novaInnerRing.gameObject.SetActive(true);
                    Sfx.Play(Sfx.Id.GateGood, 0.55f, 0.85f);
                }
                if (novaT >= 0f)
                {
                    novaT += dt / 0.45f;
                    float r = Mathf.Lerp(0.6f, 6.8f, novaT);
                    novaRing.localPosition = heroPos + Vector3.up * 0.14f;
                    novaRing.localScale = new Vector3(r * 2f, 0.03f, r * 2f);
                    novaInnerRing.localPosition = heroPos + Vector3.up * 0.16f;
                    novaInnerRing.localScale = new Vector3(r * 1.35f, 0.03f, r * 1.35f);
                    novaInnerRing.Rotate(0f, 240f * dt, 0f, Space.World);
                    foreach (var e in enemies)
                    {
                        if (!e.alive || e.horde) continue;
                        float d = (e.pos - heroPos).magnitude;
                        if (Mathf.Abs(d - r) < 0.85f && e.hitCd <= 0f) { e.hitCd = 0.22f; Damage(e, 42f); }
                    }
                    if (novaT >= 1f)
                    {
                        novaT = -1f;
                        novaRing.gameObject.SetActive(false);
                        novaInnerRing.gameObject.SetActive(false);
                    }
                }
            }

            // 4: Sky Lightning Pillars
            if (weaponLevel >= 4)
            {
                boltTimer += dt;
                if (boltTimer >= 0.32f)
                {
                    boltTimer = 0f;
                    for (int k = 0; k < 3; k++)
                    {
                        var e = boss != null && boss.alive && k == 0 ? boss : RandomEnemy(9.5f);
                        if (e != null) StartCoroutine(Bolt(e));
                    }
                }
            }
        }

        Enemy Nearest(float range) => NearestFrom(heroPos, range);

        Enemy NearestFrom(Vector3 origin, float range)
        {
            Enemy best = null;
            float bd = range * range;
            foreach (var e in enemies)
            {
                if (!e.alive || e.horde) continue;
                float d = (e.pos - origin).sqrMagnitude;
                if (d < bd) { bd = d; best = e; }
            }
            return best;
        }

        Enemy RandomEnemy(float range)
        {
            Enemy pick = null;
            int seen = 0;
            foreach (var e in enemies)
            {
                if (!e.alive || e.horde || (e.pos - heroPos).sqrMagnitude > range * range) continue;
                if (Random.Range(0, ++seen) == 0) pick = e;
            }
            return pick;
        }

        IEnumerator AxeSwing()
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.18f)
            {
                heroAxe.localRotation = Quaternion.Euler(0f, Mathf.Lerp(0f, 360f, k), 0f);
                yield return null;
            }
            heroAxe.localRotation = Quaternion.identity;
            var trail = Prims.Make(PrimitiveType.Cylinder, fx, heroPos + Vector3.up * 0.42f, new Vector3(4.8f, 0.02f, 4.8f), new Color(1f, 0.95f, 0.75f));
            yield return new WaitForSeconds(0.06f);
            Destroy(trail);
        }

        IEnumerator Bolt(Enemy e)
        {
            var p = e.pos;
            var b = Prims.Make(PrimitiveType.Cube, fx, p + Vector3.up * 6f, new Vector3(0.24f, 12f, 0.24f), new Color(1f, 0.95f, 0.38f));
            Damage(e, 125f);
            Sfx.Play(Sfx.Id.Glass, 0.45f);
            Shake(0.08f, 0.08f);
            Prims.Burst(this, fx, p + Vector3.up * 0.3f, new Color(1f, 0.95f, 0.5f), 6, 5f);
            yield return new WaitForSeconds(0.09f);
            Destroy(b);
        }

        // ============================================================ autoplay choreography
        Vector3 AutoDir()
        {
            var away = Vector3.zero;
            foreach (var e in enemies)
            {
                if (!e.alive || e.horde) continue;
                var d = heroPos - e.pos;
                float m = d.sqrMagnitude;
                if (m < 32f) away += d / Mathf.Max(0.35f, m);
            }
            var orbit = Vector3.Cross(Vector3.up, heroPos + new Vector3(0.1f, 0f, 0.1f)).normalized * 0.65f;
            var home = -heroPos * 0.12f;
            Vector3 dropPull = Vector3.zero;
            float gd = 36f;
            foreach (var g in drops)
            {
                float d = (g.pos - heroPos).sqrMagnitude;
                if (d < gd) { gd = d; dropPull = (g.pos - heroPos).normalized * 0.65f; }
            }
            var dir = away * 1.55f + orbit + home + dropPull;
            dir.y = 0f;
            return dir.sqrMagnitude > 0.01f ? Vector3.ClampMagnitude(dir, 1f) : Vector3.zero;
        }

        // ============================================================ Boss Climax & Near-Miss Fail Reveal
        float revealT;

        IEnumerator ClimaxBossAndReveal()
        {
            if (phase != Phase.Fight) yield break;
            phase = Phase.ClimaxBoss;
            StoreLink.LogEvent("lastcamp_boss");

            // Red danger alert flash + Boss arrival!
            ui.Banner("WARNING! SKELETON KING!", new Color(1f, 0.32f, 0.28f));
            Sfx.Play(Sfx.Id.Stomp);
            Shake(0.45f, 0.32f);
            SpawnSkeletonKingBoss();
            for (int i = 0; i < 16; i++) SpawnEnemy(Random.Range(CampHalf + 0.5f, CampHalf + 3.5f), false, 2);

            // Pulse red danger screen overlay while fighting the Boss down to ~148 HP
            for (float t = 0f; t < 3.4f; t += Time.deltaTime)
            {
                float pulse = Mathf.Abs(Mathf.Sin(t * 7f)) * 0.24f;
                dangerFlash.color = new Color(0.95f, 0.10f, 0.10f, pulse);
                yield return null;
            }
            dangerFlash.color = new Color(0.95f, 0.10f, 0.10f, 0f);

            // Transition into massive 360-skeleton encirclement & near-miss defeat!
            phase = Phase.Reveal;
            moveDir = Vector3.zero;
            for (int i = 0; i < 360; i++) SpawnEnemy(Random.Range(CampHalf + 2.5f, 38f), true, i % 3);
            Shake(0.55f, 0.38f);
            Sfx.Play(Sfx.Id.Fail);

            int bossLeft = boss != null ? Mathf.CeilToInt(boss.hp) : 148;
            ui.Banner("DEFEAT!  BOSS HP: " + bossLeft, new Color(1f, 0.35f, 0.32f));
            StoreLink.LogEvent("lastcamp_defeat");

            while (revealT < 2.1f)
            {
                revealT += Time.deltaTime;
                yield return null;
            }
            yield return new WaitForSeconds(1.1f);
            ShowEndcard("Boss survived with " + bossLeft + " HP! Can you save the camp?");
        }

        IEnumerator Die()
        {
            if (phase != Phase.Fight && phase != Phase.ClimaxBoss) yield break;
            phase = Phase.Result;
            ui.Banner("DEFEAT!", new Color(1f, 0.35f, 0.35f));
            Sfx.Play(Sfx.Id.Fail);
            Prims.Burst(this, fx, heroPos + Vector3.up, Hair, 24);
            hero.gameObject.SetActive(false);
            StoreLink.LogEvent("lastcamp_defeat");
            yield return new WaitForSeconds(1.4f);
            ShowEndcard("So close! Upgrade your hero & survive!");
        }

        void ShowEndcard(string sub)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            Time.timeScale = 1f;
            StoreLink.GameEnded();
            ui.ShowEndcard(sub);
        }

        static float Ease(float k) => k * k * (3f - 2f * k);
    }
}
