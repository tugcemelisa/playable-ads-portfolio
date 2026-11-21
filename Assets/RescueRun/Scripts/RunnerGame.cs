using System.Collections;
using System.Collections.Generic;
using AdKit;
using JellyAd;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace RescueRun
{
    /// <summary>
    /// Voodoo Reference 1 bridge-runner playable:
    /// - 0s Hook: running on an elevated bridge over a canyon, horizontal glass tube (8 HP) on the left
    ///   with a trapped hero + giant blue liquid tank (1241 HP) on the right with "HELP!!" popups.
    /// - Freeing the tube hero triggers "LV+1" upgrade into a heavy twin-laser gunner.
    /// - Shootable number gates (-13 -> +1 -> +6, -40 -> -20) that flip from red to blue as you shoot them.
    /// - Red enemy hordes + Mid-Boss (372 HP) + Final Giant Boss (878 HP).
    /// - Near-miss fail ending: tank reaches 7 HP (cracked glass) and Final Boss reaches ~170 HP when
    ///   he slams the remaining squad -> DEFEAT emblem + Endcard CTA.
    /// </summary>
    [DisallowMultipleComponent]
    public class RunnerGame : MonoBehaviour
    {
        [Header("Ad")]
        [LunaPlaygroundField("Game Title", 0, "Ad Settings")]
        public string gameTitle = "RESCUE SQUAD";
        [LunaPlaygroundField("CTA Text", 1, "Ad Settings")]
        public string ctaText = "PLAY NOW";
        public string storeUrl = "https://play.google.com/store";
        [LunaPlaygroundField("Endcard Timeout (s)", 2, "Ad Settings")]
        public float endcardAfterSeconds = 40f;

        [Header("Gameplay")]
        [LunaPlaygroundField("Run Speed", 0, "Gameplay")]
        public float runSpeed = 7.6f;
        [LunaPlaygroundField("Soldier DPS", 1, "Gameplay")]
        public float dpsPerSoldier = 16f;
        [LunaPlaygroundField("Start Squad", 2, "Gameplay")]
        public int startSquad = 1;
        public float tubeHp = 8f;
        public float tankHp = 1241f;
        public float midBossHp = 372f;
        public float finalBossHp = 878f;
        public float gateHitDamage = 5.5f;

        [Header("Video recording (auto-play)")]
        [LunaPlaygroundField("Auto Play", 0, "Video / Ending")]
        public bool autoPlay;
        [LunaPlaygroundField("Near-Miss Fail Ending", 1, "Video / Ending")]
        [Tooltip("Clamps the big tank at 7 HP and final boss at ~170 HP so the run ends on a 'so close' DEFEAT.")]
        public bool nearMissEnding = true;

        // -------------------------------------------------------------- tuning
        const float RoadHalf = 4.1f, MoveLimit = 3.1f, FireInterval = 0.11f, BulletSpeed = 46f, BulletRange = 36f;
        const int MaxVisualSoldiers = 45;

        static readonly int ColorId = Shader.PropertyToID("_Color");
        static readonly Color Blue = new Color(0.18f, 0.52f, 0.98f);
        static readonly Color HeavyBlue = new Color(0.12f, 0.38f, 0.85f);
        static readonly Color Red = new Color(0.92f, 0.20f, 0.22f);
        static readonly Color Skin = new Color(0.98f, 0.78f, 0.64f);
        static readonly Color BossSkin = new Color(0.95f, 0.68f, 0.65f);
        static readonly Color Dark = new Color(0.14f, 0.15f, 0.20f);
        static readonly Color Gold = new Color(1.00f, 0.82f, 0.18f);
        static readonly Color LaserCyan = new Color(0.30f, 0.88f, 1.00f);

        enum Phase { Run, Boss, Result, End }
        Phase phase = Phase.Run;

        class Unit
        {
            public Transform tr;
            public float x, z, hp, maxHp, hit, radius;
            public bool alive = true, isBoss, isFinalBoss;
            public Transform barRoot, barFill;
            public Label hpLabel;
        }

        class Gate
        {
            public float z, x, width;
            public int val;
            public float acc;
            public Label txt;
            public Renderer panel, frame;
            public Transform root;
            public bool passed;
        }

        class Pod
        {
            public Transform tr, glassTr, heroTr, crackRoot;
            public Renderer glassRen;
            public Label hpLabel, helpLabel;
            public float x, z, hp, maxHp, radiusX, radiusZ, hit;
            public bool broken, isBigTank, followsPlayer;
        }

        class Bullet
        {
            public Transform tr;
            public Renderer ren;
            public float x, z, vx, dmg, startZ;
        }

        Camera cam;
        Transform world, fx;
        AdUI ui;

        float squadX = 1.65f, squadZ = 0f, targetX = 1.65f;
        float fireTimer, playTime, idleTime, bossContactTimer;
        int squad, weaponTier = 1; // 1 = starter pistol soldier, 2 = LV+1 heavy dual-laser gunner
        bool tutorialActive;
        readonly List<Transform> soldiers = new List<Transform>();
        Label squadLabel;

        readonly List<Unit> enemies = new List<Unit>();
        readonly List<Gate> gates = new List<Gate>();
        readonly List<Bullet> bullets = new List<Bullet>();
        readonly Stack<Bullet> bulletPool = new Stack<Bullet>();

        Pod leftTube, rightTank, backTube;
        Unit midBoss, finalBoss;

        bool dragging;
        float lastPointerX;
        readonly List<Transform> billboards = new List<Transform>();
        Vector3 shakeOffset;

        // Top 2D HUD elements
        Image hudProgressFill, hudSquadPill, hudTankPill;
        Text hudSquadText, hudTankText;

        // ============================================================ setup
        void Start()
        {
            Application.targetFrameRate = 60;
            cam = Camera.main;
            if (!cam) cam = new GameObject("Main Camera") { tag = "MainCamera" }.AddComponent<Camera>();
            cam.orthographic = false;
            cam.fieldOfView = 54f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            // Warm canyon background matching Voodoo Reference 1
            cam.backgroundColor = new Color(0.45f, 0.29f, 0.19f);
            cam.farClipPlane = 220f;

            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogColor = new Color(0.45f, 0.29f, 0.19f);
            RenderSettings.fogStartDistance = 48f;
            RenderSettings.fogEndDistance = 115f;
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.68f, 0.68f, 0.74f);

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;
            ui = AdUI.Create(gameTitle, ctaText, new Color(0.12f, 0.22f, 0.48f), Gold);
            BuildTopHud();
            AddEndcardMascots();

            squad = Mathf.Max(1, startSquad);
            BuildBridgeLevel();

            // Squad counter badge with dark backing disc
            var sqRoot = new GameObject("SquadBadge").transform;
            sqRoot.SetParent(world, false);
            Prim(PrimitiveType.Cube, sqRoot, new Vector3(0f, 0f, 0.08f), new Vector3(1.05f, 0.78f, 0.04f), new Color(0.06f, 0.10f, 0.24f));
            Prim(PrimitiveType.Cube, sqRoot, new Vector3(0f, 0f, 0.10f), new Vector3(1.17f, 0.90f, 0.03f), Gold);
            squadLabel = Res.MakeLabel(sqRoot, squad.ToString(), 0.78f, Color.white, 50, Vector3.zero);
            billboards.Add(sqRoot);
            RebuildSoldiers();
            UpdateCamera(true);
            UpdateTopHud();

            // 0s Instant Action Hook: game starts running & shooting immediately at 0.0s!
            phase = Phase.Run;
            StoreLink.LogEvent("rescue_run_start", 1);
            if (!autoPlay)
            {
                tutorialActive = true;
                ui.ShowDragTutorial(true);
            }
        }

        void BuildTopHud()
        {
            var top = new Vector2(0.5f, 1f);
            // Stage progress bar
            var barBg = AdUI.Img(ui.Root, Res.Round(64), new Color(0.04f, 0.06f, 0.15f, 0.78f), top, new Vector2(0f, -72f), new Vector2(720f, 44f), true);
            hudProgressFill = AdUI.Img(barBg.transform, Res.Round(64), LaserCyan, new Vector2(0f, 0.5f), new Vector2(8f, 0f), new Vector2(40f, 28f), true);
            hudProgressFill.rectTransform.pivot = new Vector2(0f, 0.5f);
            AdUI.Txt(barBg.transform, "BRIDGE RESCUE", 28, new Color(1f, 1f, 1f, 0.9f), new Vector2(0.5f, 0.5f), new Vector2(0f, 1f));
            var bossTag = AdUI.Img(barBg.transform, Res.Round(64), new Color(0.88f, 0.18f, 0.22f), new Vector2(1f, 0.5f), new Vector2(-10f, 0f), new Vector2(115f, 42f), true);
            AdUI.Txt(bossTag.transform, "BOSS", 26, Gold, new Vector2(0.5f, 0.5f), Vector2.zero);

            // Left Squad & Weapon Tier Pill
            hudSquadPill = AdUI.Img(ui.Root, Res.Round(64), new Color(0.10f, 0.28f, 0.68f, 0.88f), top, new Vector2(-235f, -142f), new Vector2(410f, 62f), true);
            hudSquadText = AdUI.Txt(hudSquadPill.transform, "SQUAD: 1  |  LV 1", 34, Color.white, new Vector2(0.5f, 0.5f), Vector2.zero);

            // Right Giant Tank Rescue Status Pill
            hudTankPill = AdUI.Img(ui.Root, Res.Round(64), new Color(0.08f, 0.22f, 0.48f, 0.88f), top, new Vector2(235f, -142f), new Vector2(410f, 62f), true);
            hudTankText = AdUI.Txt(hudTankPill.transform, "TANK: 1241 HP", 34, LaserCyan, new Vector2(0.5f, 0.5f), Vector2.zero);

            ui.Root.SetAsLastSibling();
        }

        void UpdateTopHud()
        {
            if (!hudProgressFill) return;
            float prog = Mathf.Clamp01(squadZ / 140f);
            hudProgressFill.rectTransform.sizeDelta = new Vector2(Mathf.Max(32f, 704f * prog), 28f);
            if (hudSquadText)
            {
                bool lv2 = weaponTier >= 2;
                hudSquadText.text = "SQUAD: " + squad + (lv2 ? "  |  LV 2 MAX" : "  |  LV 1");
                hudSquadText.color = lv2 ? Gold : Color.white;
                hudSquadPill.color = lv2 ? new Color(0.24f, 0.42f, 0.88f, 0.94f) : new Color(0.10f, 0.28f, 0.68f, 0.88f);
            }
            if (hudTankText && rightTank != null)
            {
                int thp = Mathf.Max(0, Mathf.CeilToInt(rightTank.hp));
                hudTankText.text = thp <= 0 ? "TANK: FREED!" : "TANK: " + thp + " HP";
                bool low = thp <= 50;
                hudTankText.color = low ? Gold : LaserCyan;
                hudTankPill.color = low ? new Color(0.78f, 0.16f, 0.20f, 0.94f) : new Color(0.08f, 0.22f, 0.48f, 0.88f);
                if (low)
                    hudTankPill.transform.localScale = Vector3.one * (1f + Mathf.Abs(Mathf.Sin(Time.time * 9f)) * 0.06f);
            }
        }

        void BuildBridgeLevel()
        {
            float end = 210f;
            // Canyon floor deep below
            Prim(PrimitiveType.Cube, world, new Vector3(0f, -14f, end * 0.5f), new Vector3(140f, 1f, end + 160f), new Color(0.42f, 0.26f, 0.17f));

            // Concrete bridge deck
            Prim(PrimitiveType.Cube, world, new Vector3(0f, -0.35f, end * 0.5f), new Vector3(RoadHalf * 2f + 0.6f, 0.7f, end + 80f), new Color(0.62f, 0.63f, 0.66f));
            Prim(PrimitiveType.Cube, world, new Vector3(0f, -0.02f, end * 0.5f), new Vector3(RoadHalf * 2f, 0.06f, end + 80f), new Color(0.69f, 0.70f, 0.73f));

            // Side bridge walls, concrete posts, steel guardrails, and bridge piers
            for (int s = -1; s <= 1; s += 2)
            {
                float rx = s * (RoadHalf + 0.28f);
                Prim(PrimitiveType.Cube, world, new Vector3(rx, 0.35f, end * 0.5f), new Vector3(0.45f, 0.75f, end + 80f), new Color(0.48f, 0.49f, 0.53f));
                Prim(PrimitiveType.Cube, world, new Vector3(rx, 0.82f, end * 0.5f), new Vector3(0.55f, 0.14f, end + 80f), new Color(0.36f, 0.37f, 0.41f));
                for (float z = -10f; z < end + 30f; z += 5f)
                {
                    Prim(PrimitiveType.Cube, world, new Vector3(rx + s * 0.15f, 0.5f, z), new Vector3(0.4f, 1.25f, 0.55f), new Color(0.40f, 0.41f, 0.45f));
                }
                for (float z = 0f; z < end + 20f; z += 18f)
                {
                    Prim(PrimitiveType.Cube, world, new Vector3(s * (RoadHalf - 0.3f), -7f, z), new Vector3(1.1f, 13.5f, 1.4f), new Color(0.34f, 0.35f, 0.38f));
                }
            }

            // Center dashed white road line
            for (float z = -10f; z < end + 30f; z += 4.2f)
                Prim(PrimitiveType.Cube, world, new Vector3(0f, 0.02f, z), new Vector3(0.18f, 0.02f, 2.0f), new Color(0.94f, 0.94f, 0.95f));

            // ---------------------------------------------------------- Voodoo Ref 1 exact encounter timeline
            // 1. Horizontal Glass Tube on left lane (8 HP) -> frees hero & gives LV+1 heavy upgrade
            leftTube = BuildHorizontalTube(-1.60f, 21f, tubeHp);

            // 2. Giant Vertical Blue Tank on right lane (1241 HP) on a wheeled platform that rolls ahead on the right lane
            rightTank = BuildBigVerticalTank(1.65f, 17f, tankHp);

            // 3. First red enemy crowd behind the tube
            AddEnemyGroup(30f, 18, -1.65f, 1.65f, 2.6f);

            // 4. Shootable red gate (-13) on left lane -> player shoots it up to +1 -> +6!
            AddSingleGate(47f, -1.65f, 3.4f, -13);

            // 5. Second red enemy crowd + Mid-Boss (372 HP)
            AddEnemyGroup(60f, 24, -1.65f, 1.75f, 3.2f);
            midBoss = AddBossUnit(76f, -1.55f, midBossHp, 2.5f, false);

            // 6. Second red enemy crowd + Second shootable red gate (-40) -> shot down to -20 -> reduces squad from 6 to 3
            AddEnemyGroup(92f, 22, -1.65f, 1.75f, 3.4f);
            AddSingleGate(108f, -1.65f, 3.4f, -40);

            // 7. Final Giant Boss (878 HP) + massive horde + background 158 tube teaser
            AddEnemyGroup(124f, 28, -1.55f, 1.85f, 4.0f);
            finalBoss = AddBossUnit(142f, -1.45f, finalBossHp, 3.3f, true);
            backTube = BuildHorizontalTube(-1.60f, 160f, 158f);
            AddEnemyGroup(166f, 36, -1.65f, 1.85f, 99f);
        }

        // ============================================================ builders (using real poly.pizza 3D meshes!)
        GameObject Prim(PrimitiveType t, Transform parent, Vector3 pos, Vector3 scale, Color c)
            => Prims.Make(t, parent, pos, scale, c);

        static void SetColor(Renderer r, Color c) => Prims.SetColor(r, c);

        Transform BuildSoldierModel(int tier)
        {
            var root = new GameObject("Soldier").transform;
            root.SetParent(world, false);
            if (tier == 1)
            {
                // Real poly.pizza SWAT Soldier (/m/Btfn3G5Xv4) + Assault Rifle (/m/XGeBGFQxYg)
                // Child 0 & 1: Articulated Left & Right Legs (pivoted at hip y = 0.50f)
                PolyPizzaModels.Part("Swat_LegL", root, new Vector3(-0.09f, 0.50f, 0f), Vector3.one, new Color(0.14f, 0.36f, 0.82f));
                PolyPizzaModels.Part("Swat_LegR", root, new Vector3(0.09f, 0.50f, 0f), Vector3.one, new Color(0.14f, 0.36f, 0.82f));
                // SWAT Armor, Tactical Vest/Gear, Skin, Visor
                PolyPizzaModels.Part("Swat_Armor", root, Vector3.zero, Vector3.one, Blue);
                PolyPizzaModels.Part("Swat_Gear", root, Vector3.zero, Vector3.one, Dark);
                PolyPizzaModels.Part("Swat_Skin", root, Vector3.zero, Vector3.one, Skin);
                PolyPizzaModels.Part("Swat_Visor", root, Vector3.zero, Vector3.one, LaserCyan);
                // Real poly.pizza Assault Rifle
                PolyPizzaModels.Part("Rifle1", root, new Vector3(0.14f, 0.62f, 0.25f), Vector3.one, Dark);
                Prim(PrimitiveType.Sphere, root, new Vector3(0.14f, 0.66f, 0.56f), Vector3.one * 0.08f, Gold);
            }
            else
            {
                // LV+1 Heavy Gunner: Armored poly.pizza SWAT Hero + Gold Trim + Twin poly.pizza Heavy Rifles (/m/Bgvuu4CUMV)
                var scaleBody = new Vector3(1.18f, 1.08f, 1.16f);
                PolyPizzaModels.Part("Swat_LegL", root, new Vector3(-0.11f, 0.54f, 0f), scaleBody, HeavyBlue);
                PolyPizzaModels.Part("Swat_LegR", root, new Vector3(0.11f, 0.54f, 0f), scaleBody, HeavyBlue);
                PolyPizzaModels.Part("Swat_Armor", root, Vector3.zero, scaleBody, HeavyBlue);
                PolyPizzaModels.Part("Swat_Gear", root, Vector3.zero, scaleBody, Gold);
                PolyPizzaModels.Part("Swat_Skin", root, Vector3.zero, scaleBody, Skin);
                PolyPizzaModels.Part("Swat_Visor", root, Vector3.zero, scaleBody, LaserCyan);
                // Dorsal plasma reactor & twin HeavyRifle2 laser cannons
                Prim(PrimitiveType.Sphere, root, new Vector3(0f, 0.78f, -0.24f), Vector3.one * 0.20f, LaserCyan);
                for (int s = -1; s <= 1; s += 2)
                {
                    PolyPizzaModels.Part("HeavyRifle2", root, new Vector3(s * 0.28f, 0.66f, 0.28f), Vector3.one * 1.05f, Dark);
                    Prim(PrimitiveType.Sphere, root, new Vector3(s * 0.28f, 0.68f, 0.66f), Vector3.one * 0.14f, LaserCyan);
                }
            }
            return root;
        }

        Transform BuildEnemyModel()
        {
            // Real poly.pizza Zombie (/m/ftpTNkeqGWc) in Voodoo Crimson Horde palette
            var root = new GameObject("Enemy").transform;
            root.SetParent(world, false);
            PolyPizzaModels.Part("Zombie_Clothes", root, Vector3.zero, Vector3.one, new Color(0.72f, 0.12f, 0.15f));
            PolyPizzaModels.Part("Zombie_Skin", root, Vector3.zero, Vector3.one, Red);
            return root;
        }

        Transform BuildBossModel(float scale)
        {
            // Giant Muscular Brute Boss using poly.pizza Zombie mesh + heavy war armor (indices >= 3 flash white on hit!)
            var root = new GameObject("Boss").transform;
            root.SetParent(world, false);
            root.localScale = Vector3.one * scale;
            var hulkScale = new Vector3(1.26f, 1.02f, 1.24f);
            // Child 0, 1, 2: War clothes, belt, and dark shoulder armor
            PolyPizzaModels.Part("Zombie_Clothes", root, Vector3.zero, hulkScale, new Color(0.75f, 0.12f, 0.16f));
            Prim(PrimitiveType.Cylinder, root, new Vector3(0f, 0.48f, 0f), new Vector3(0.68f, 0.10f, 0.52f), Gold);
            Prim(PrimitiveType.Sphere, root, new Vector3(0.34f, 0.88f, 0.04f), new Vector3(0.28f, 0.24f, 0.28f), Dark);
            // Child 3+: Boss Skin mesh & glowing eyes (flashes white when hit!)
            PolyPizzaModels.Part("Zombie_Skin", root, Vector3.zero, hulkScale, BossSkin);
            Prim(PrimitiveType.Sphere, root, new Vector3(-0.07f, 1.02f, 0.18f), Vector3.one * 0.06f, Gold);
            Prim(PrimitiveType.Sphere, root, new Vector3(0.07f, 1.02f, 0.18f), Vector3.one * 0.06f, Gold);
            return root;
        }

        Transform MakeWorldBadge(Transform parent, Vector3 localPos, Vector2 size, Color bgCol, Color borderCol)
        {
            var root = new GameObject("Badge").transform;
            root.SetParent(parent, false);
            root.localPosition = localPos;
            Prim(PrimitiveType.Cube, root, new Vector3(0f, 0f, 0.09f), new Vector3(size.x + 0.14f, size.y + 0.14f, 0.03f), borderCol);
            Prim(PrimitiveType.Cube, root, new Vector3(0f, 0f, 0.06f), new Vector3(size.x, size.y, 0.04f), bgCol);
            return root;
        }

        Pod BuildHorizontalTube(float x, float z, float hp)
        {
            var pod = new Pod { x = x, z = z, hp = hp, maxHp = hp, radiusX = 1.55f, radiusZ = 0.85f, isBigTank = false };
            pod.tr = new GameObject("HorizontalTube").transform;
            pod.tr.SetParent(world, false);
            pod.tr.localPosition = new Vector3(x, 0f, z);

            // Cradle base & Left/Right metallic end-caps with gold rings
            Prim(PrimitiveType.Cube, pod.tr, new Vector3(0f, 0.14f, 0f), new Vector3(2.6f, 0.24f, 1.40f), Dark);
            for (int s = -1; s <= 1; s += 2)
            {
                var cap = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(s * 1.35f, 0.86f, 0f), new Vector3(1.46f, 0.15f, 1.46f), new Color(0.14f, 0.38f, 0.85f));
                cap.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                var ring = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(s * 1.20f, 0.86f, 0f), new Vector3(1.38f, 0.05f, 1.38f), Gold);
                ring.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                Prim(PrimitiveType.Cube, pod.tr, new Vector3(s * 1.35f, 0.18f, 0f), new Vector3(0.38f, 0.34f, 1.48f), Dark);
            }
            // Horizontal glass cylinder
            var glass = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 0.86f, 0f), new Vector3(1.30f, 1.20f, 1.30f), new Color(0.32f, 0.74f, 1f));
            glass.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
            pod.glassTr = glass.transform;
            pod.glassRen = glass.GetComponent<Renderer>();

            // Floating trapped hero clearly visible on front face of cylinder
            pod.heroTr = BuildSoldierModel(2);
            pod.heroTr.SetParent(pod.tr, false);
            pod.heroTr.localPosition = new Vector3(-0.32f, 0.86f, -0.58f);
            pod.heroTr.localRotation = Quaternion.Euler(0f, 180f, -75f);
            pod.heroTr.localScale = Vector3.one * 0.85f;

            // Compact framed HP badge ("8" / "158") + "HELP!!" callout shifted inward so it never overflows screen edges
            var hpBadge = MakeWorldBadge(pod.tr, new Vector3(0f, 0.78f, -1.05f), new Vector2(1.20f, 0.85f), new Color(0.06f, 0.12f, 0.28f), LaserCyan);
            pod.hpLabel = Res.MakeLabel(hpBadge, Mathf.CeilToInt(hp).ToString(), 0.88f, Color.white, 45, Vector3.zero);
            var helpBadge = MakeWorldBadge(pod.tr, new Vector3(0.55f, 1.85f, -1.05f), new Vector2(1.65f, 0.68f), new Color(0.14f, 0.10f, 0.06f), Gold);
            pod.helpLabel = Res.MakeLabel(helpBadge, "HELP!!", 0.58f, Gold, 46, Vector3.zero);
            billboards.Add(hpBadge);
            billboards.Add(helpBadge);
            return pod;
        }

        Pod BuildBigVerticalTank(float x, float z, float hp)
        {
            var pod = new Pod
            {
                x = x, z = z, hp = hp, maxHp = hp,
                radiusX = 1.55f, radiusZ = 1.38f,
                isBigTank = true, followsPlayer = true
            };
            pod.tr = new GameObject("BigVerticalTank").transform;
            pod.tr.SetParent(world, false);
            pod.tr.localPosition = new Vector3(x, 0f, z);

            // Wheeled heavy cart base with gold bumper & 4 wheels with hubcaps
            Prim(PrimitiveType.Cube, pod.tr, new Vector3(0f, 0.24f, 0f), new Vector3(2.85f, 0.34f, 2.75f), new Color(0.22f, 0.25f, 0.32f));
            Prim(PrimitiveType.Cube, pod.tr, new Vector3(0f, 0.26f, -1.38f), new Vector3(2.65f, 0.16f, 0.12f), Gold);
            for (int sx = -1; sx <= 1; sx += 2)
                for (int sz = -1; sz <= 1; sz += 2)
                {
                    var w = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(sx * 1.44f, 0.26f, sz * 0.98f), new Vector3(0.54f, 0.12f, 0.54f), Dark);
                    w.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                    var hub = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(sx * 1.52f, 0.26f, sz * 0.98f), new Vector3(0.26f, 0.05f, 0.26f), Gold);
                    hub.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                }

            // Blue metallic tank base & top lid with golden energy rings
            Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 0.56f, 0f), new Vector3(2.65f, 0.24f, 2.65f), new Color(0.14f, 0.40f, 0.90f));
            Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 0.78f, 0f), new Vector3(2.52f, 0.05f, 2.52f), Gold);
            Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 4.05f, 0f), new Vector3(2.65f, 0.22f, 2.65f), new Color(0.16f, 0.46f, 0.96f));
            Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 3.85f, 0f), new Vector3(2.52f, 0.05f, 2.52f), Gold);
            Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 4.28f, 0f), new Vector3(1.70f, 0.12f, 1.70f), Dark);

            // Tall blue liquid cylinder
            var glass = Prim(PrimitiveType.Cylinder, pod.tr, new Vector3(0f, 2.30f, 0f), new Vector3(2.38f, 1.50f, 2.38f), new Color(0.22f, 0.66f, 0.98f));
            pod.glassTr = glass.transform;
            pod.glassRen = glass.GetComponent<Renderer>();

            // Trapped giant hero floating on the camera side of the cylinder
            pod.heroTr = BuildSoldierModel(2);
            pod.heroTr.SetParent(pod.tr, false);
            pod.heroTr.localPosition = new Vector3(0f, 1.65f, -1.12f);
            pod.heroTr.localRotation = Quaternion.Euler(0f, 180f, 0f);
            pod.heroTr.localScale = Vector3.one * 1.28f;

            // Crack lines container (revealed progressively as HP drops toward 7)
            pod.crackRoot = new GameObject("Cracks").transform;
            pod.crackRoot.SetParent(pod.tr, false);
            for (int i = 0; i < 10; i++)
            {
                float cy = 1.1f + (i % 5) * 0.52f;
                float cx = ((i * 37) % 11 - 5) * 0.16f;
                var cr = Prim(PrimitiveType.Cube, pod.crackRoot, new Vector3(cx, cy, -1.24f), new Vector3(0.90f, 0.055f, 0.04f), new Color(0.92f, 0.98f, 1f));
                cr.transform.localRotation = Quaternion.Euler(0f, 0f, (i * 53) % 140 - 70);
                cr.SetActive(false);
            }

            // Compact framed "1241" counter & "HELP!!" callout badge kept well inside right screen border!
            var hpBadge = MakeWorldBadge(pod.tr, new Vector3(-0.15f, 1.35f, -1.56f), new Vector2(1.85f, 0.96f), new Color(0.05f, 0.11f, 0.26f), LaserCyan);
            pod.hpLabel = Res.MakeLabel(hpBadge, Mathf.CeilToInt(hp).ToString(), 0.98f, Color.white, 48, Vector3.zero);
            var helpBadge = MakeWorldBadge(pod.tr, new Vector3(-0.75f, 3.20f, -1.56f), new Vector2(1.75f, 0.72f), new Color(0.16f, 0.10f, 0.05f), Gold);
            pod.helpLabel = Res.MakeLabel(helpBadge, "HELP!!", 0.62f, Gold, 49, Vector3.zero);
            billboards.Add(hpBadge);
            billboards.Add(helpBadge);
            return pod;
        }

        void AddSingleGate(float z, float x, float width, int val)
        {
            var g = new Gate { z = z, x = x, width = width, val = val };
            g.root = new GameObject("Gate").transform;
            g.root.SetParent(world, false);

            var p = Prim(PrimitiveType.Cube, g.root, new Vector3(x, 1.08f, z), new Vector3(width, 1.98f, 0.18f), Color.white);
            g.panel = p.GetComponent<Renderer>();
            var top = Prim(PrimitiveType.Cube, g.root, new Vector3(x, 2.16f, z), new Vector3(width + 0.32f, 0.28f, 0.38f), Color.white);
            g.frame = top.GetComponent<Renderer>();
            Prim(PrimitiveType.Cube, g.root, new Vector3(x, 0.10f, z), new Vector3(width + 0.24f, 0.16f, 0.32f), Dark);

            // Side tech pillars with gold trim & top beacon spheres
            for (int s = -1; s <= 1; s += 2)
            {
                float px = x + s * (width * 0.5f + 0.14f);
                Prim(PrimitiveType.Cube, g.root, new Vector3(px, 1.12f, z), new Vector3(0.28f, 2.28f, 0.40f), Dark);
                Prim(PrimitiveType.Cube, g.root, new Vector3(px, 1.12f, z - 0.18f), new Vector3(0.12f, 1.85f, 0.08f), Gold);
                Prim(PrimitiveType.Sphere, g.root, new Vector3(px, 2.40f, z), Vector3.one * 0.30f, Gold);
            }

            // Compact dark number badge plate in front of gate panel
            var numBadge = MakeWorldBadge(g.root, new Vector3(x, 1.15f, z - 0.26f), new Vector2(1.75f, 0.98f), new Color(0.06f, 0.08f, 0.18f), Color.white);
            g.txt = Res.MakeLabel(numBadge, "", 1.05f, Color.white, 42, Vector3.zero);
            billboards.Add(numBadge);
            RefreshGate(g);
            gates.Add(g);
        }

        void RefreshGate(Gate g)
        {
            bool good = g.val >= 0;
            var col = good ? new Color(0.22f, 0.64f, 1f) : new Color(0.94f, 0.26f, 0.28f);
            var topCol = good ? new Color(0.12f, 0.42f, 0.88f) : new Color(0.72f, 0.14f, 0.16f);
            SetColor(g.panel, col);
            SetColor(g.frame, topCol);
            g.txt.Text = g.val > 0 ? "+" + g.val : g.val.ToString();
            g.txt.main.color = good ? new Color(0.55f, 0.96f, 1f) : Color.white;
        }

        void AddEnemyGroup(float z, int count, float centerX, float halfWidth, float hp)
        {
            int perRow = 5;
            for (int i = 0; i < count; i++)
            {
                int row = i / perRow, col = i % perRow;
                float x = centerX + Mathf.Lerp(-halfWidth, halfWidth, col / (float)(perRow - 1)) + Random.Range(-0.12f, 0.12f);
                var u = new Unit { x = x, z = z + row * 0.78f, hp = hp, maxHp = hp, radius = 0.45f };
                u.tr = BuildEnemyModel();
                u.tr.localPosition = new Vector3(u.x, 0f, u.z);
                u.tr.localRotation = Quaternion.Euler(0f, 180f, 0f);
                enemies.Add(u);
            }
        }

        Unit AddBossUnit(float z, float x, float hp, float scale, bool isFinal)
        {
            var b = new Unit
            {
                x = x, z = z, hp = hp, maxHp = hp,
                radius = 1.45f, isBoss = true, isFinalBoss = isFinal
            };
            b.tr = BuildBossModel(scale);
            b.tr.localPosition = new Vector3(x, 0f, z);
            b.tr.localRotation = Quaternion.Euler(0f, 180f, 0f);

            // Overhead framed red HP bar with high-contrast numeric label ("372" / "878")
            var bar = new GameObject("BossBar").transform;
            bar.SetParent(b.tr, false);
            bar.localPosition = new Vector3(0f, 1.82f, 0f);
            bar.localScale = Vector3.one / scale;
            Prim(PrimitiveType.Cube, bar, new Vector3(0f, 0f, 0.04f), new Vector3(3.62f, 0.72f, 0.10f), Gold);
            Prim(PrimitiveType.Cube, bar, Vector3.zero, new Vector3(3.46f, 0.58f, 0.12f), Dark);
            b.barFill = Prim(PrimitiveType.Cube, bar, new Vector3(0f, 0f, -0.06f), new Vector3(3.24f, 0.42f, 0.12f), new Color(0.95f, 0.22f, 0.18f)).transform;
            b.hpLabel = Res.MakeLabel(bar, Mathf.CeilToInt(hp).ToString(), 0.76f, Color.white, 55, new Vector3(0f, 0.02f, -0.26f));
            b.barRoot = bar;
            billboards.Add(bar);

            enemies.Add(b);
            return b;
        }

        void AddEndcardMascots()
        {
            var c = new Vector2(0.5f, 0.5f);
            // Near-miss tank progress badge on Endcard
            var barBg = AdUI.Img(ui.Card, Res.Round(64), new Color(0.05f, 0.08f, 0.20f, 0.92f), c, new Vector2(0f, 12f), new Vector2(720f, 68f), true);
            var fill = AdUI.Img(barBg.transform, Res.Round(64), new Color(0.95f, 0.28f, 0.24f), new Vector2(0f, 0.5f), new Vector2(10f, 0f), new Vector2(675f, 48f), true);
            fill.rectTransform.pivot = new Vector2(0f, 0.5f);
            AdUI.Txt(barBg.transform, "HERO TANK: 7 HP LEFT (99%)", 34, Gold, c, Vector2.zero);

            for (int i = 0; i < 3; i++)
            {
                bool center = i == 1;
                var b = AdUI.Img(ui.Card, Res.Round(128), center ? Gold : Blue, c, new Vector2((i - 1) * 205f, -135f), new Vector2(140f, 165f), true);
                AdUI.Img(b.transform, Res.Circle, Skin, c, new Vector2(0f, 68f), new Vector2(106f, 106f), false);
                AdUI.Img(b.transform, Res.Round(128), center ? new Color(0.18f, 0.48f, 0.98f) : HeavyBlue, c, new Vector2(0f, 112f), new Vector2(130f, 52f), true);
                AdUI.Img(b.transform, Res.Round(64), Dark, c, new Vector2(0f, 66f), new Vector2(82f, 26f), true);
            }
        }

        // ============================================================ game loop
        void Update()
        {
            float dt = Time.deltaTime;
            ui.Tick(dt);
            HandleInput();
            UpdateTopHud();

            if (phase == Phase.Run || phase == Phase.Boss)
            {
                playTime += dt;
                if (!dragging) idleTime += dt;

                // Re-show tutorial hand if player stays idle for >3.2s
                if (!autoPlay && !tutorialActive && idleTime > 3.2f && playTime < 15f)
                {
                    tutorialActive = true;
                    ui.ShowDragTutorial(true);
                }

                if (autoPlay) AutoSteer();
                squadX = Mathf.MoveTowards(squadX, targetX, (autoPlay ? 6.5f : 26f) * dt);

                if (phase == Phase.Run)
                {
                    squadZ += runSpeed * dt;
                    if (finalBoss != null && finalBoss.alive && squadZ >= finalBoss.z - 12.5f)
                    {
                        phase = Phase.Boss;
                    }
                }

                Fire(dt);
                UpdatePods(dt);
                UpdateGates();
                UpdateEnemies(dt);

                if (squad <= 0) StartCoroutine(Lose());
                if (endcardAfterSeconds > 0f && playTime > endcardAfterSeconds) ShowEndcard(false);
            }

            UpdateBullets(dt);
            SyncSoldiers(false);
            UpdateCamera(false);
            foreach (var b in billboards) if (b) b.rotation = cam.transform.rotation;
        }

        void HandleInput()
        {
            bool down, held;
            float px;
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
            var p = UnityEngine.InputSystem.Pointer.current;
            down = p != null && p.press.wasPressedThisFrame;
            held = p != null && p.press.isPressed;
            px = p != null ? p.position.ReadValue().x : 0f;
#else
            down = Input.GetMouseButtonDown(0);
            held = Input.GetMouseButton(0);
            px = Input.mousePosition.x;
#endif
            if (down)
            {
                if (phase == Phase.End || (ui != null && ui.EndcardVisible))
                {
                    Sfx.Play(Sfx.Id.Click, 1f, 1f, 0f, 0.02f);
                    StoreLink.Open(storeUrl);
                    return;
                }
                if (tutorialActive)
                {
                    tutorialActive = false;
                    ui.ShowDragTutorial(false);
                    Sfx.Play(Sfx.Id.Tap, 0.6f);
                }
                dragging = true;
                idleTime = 0f;
                lastPointerX = px;
            }
            if (!held) dragging = false;
            if (dragging && !autoPlay && (phase == Phase.Run || phase == Phase.Boss))
            {
                idleTime = 0f;
                targetX = Mathf.Clamp(targetX + (px - lastPointerX) / Mathf.Max(1f, Screen.width) * 10.5f, -MoveLimit, MoveLimit);
                lastPointerX = px;
            }
        }

        float SquadRadius => 0.45f * Mathf.Sqrt(Mathf.Min(squad, MaxVisualSoldiers)) + 0.30f;

        void SetSquad(int n)
        {
            n = Mathf.Max(0, n);
            if (n == squad) return;
            squad = n;
            if (squadLabel)
            {
                squadLabel.Text = squad.ToString();
                squadLabel.transform.parent.localScale = Vector3.one * 1.42f;
            }
        }

        void RebuildSoldiers()
        {
            foreach (var s in soldiers) if (s) Destroy(s.gameObject);
            soldiers.Clear();
            SyncSoldiers(true);
        }

        void SyncSoldiers(bool snap)
        {
            int want = Mathf.Min(squad, MaxVisualSoldiers);
            while (soldiers.Count < want)
            {
                var f = BuildSoldierModel(weaponTier);
                f.localPosition = new Vector3(squadX, 0f, squadZ);
                soldiers.Add(f);
            }
            while (soldiers.Count > want)
            {
                var f = soldiers[soldiers.Count - 1];
                soldiers.RemoveAt(soldiers.Count - 1);
                Burst(f.position + Vector3.up * 0.5f, new Color(0.88f, 0.90f, 0.95f), 10);
                Destroy(f.gameObject);
            }

            float dt = Time.deltaTime;
            bool running = phase == Phase.Run;
            for (int i = 0; i < soldiers.Count; i++)
            {
                // Clean formation like Ref 1 (tight rows)
                Vector3 offset;
                if (i == 0) offset = Vector3.zero;
                else
                {
                    int row = (i - 1) / 3 + 1;
                    int col = (i - 1) % 3 - 1;
                    offset = new Vector3(col * 0.72f + (row % 2 == 0 ? 0.25f : 0f), 0f, -row * 0.68f);
                }
                var slot = new Vector3(Mathf.Clamp(squadX + offset.x, -RoadHalf + 0.4f, RoadHalf - 0.4f), 0f, squadZ + offset.z);
                float phaseTime = Time.time * 16f + i * 1.3f;
                if (running) slot.y = Mathf.Abs(Mathf.Sin(phaseTime)) * 0.11f;
                var tr = soldiers[i];
                tr.localPosition = snap ? slot : Vector3.Lerp(tr.localPosition, slot, 1f - Mathf.Exp(-14f * dt));
                if (tr.childCount >= 2)
                {
                    float swing = running ? Mathf.Sin(phaseTime) * 34f : 0f;
                    tr.GetChild(0).localRotation = Quaternion.Euler(swing, 0f, 0f);
                    tr.GetChild(1).localRotation = Quaternion.Euler(-swing, 0f, 0f);
                }
            }
            if (squadLabel)
            {
                var badgeTr = squadLabel.transform.parent;
                badgeTr.position = new Vector3(squadX, 2.35f + SquadRadius * 0.25f, squadZ);
                badgeTr.localScale = Vector3.Lerp(badgeTr.localScale, Vector3.one, 1f - Mathf.Exp(-10f * dt));
                badgeTr.gameObject.SetActive(squad > 1);
            }
        }

        void UpdateCamera(bool snap)
        {
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            float back = Mathf.Lerp(12.2f, 8.8f, Mathf.Clamp01((a - 0.5f) / 0.5f)) + SquadRadius * 0.35f;
            var pos = new Vector3(squadX * 0.22f, back * 1.12f, squadZ - back * 0.72f) + shakeOffset;
            var look = new Vector3(squadX * 0.18f, 0.4f, squadZ + 7.5f);
            if (snap) cam.transform.position = pos;
            else cam.transform.position = Vector3.Lerp(cam.transform.position, pos, 1f - Mathf.Exp(-8f * Time.deltaTime));
            cam.transform.rotation = Quaternion.LookRotation(look - cam.transform.position);
        }

        // ============================================================ combat
        void Fire(float dt)
        {
            if (squad <= 0) return;
            fireTimer += dt;
            if (fireTimer < FireInterval) return;
            fireTimer -= FireInterval;

            float tierMul = weaponTier >= 2 ? 2.4f : 1f;
            float totalDmg = squad * dpsPerSoldier * FireInterval * tierMul;
            intstreams(totalDmg);
            Sfx.Play(Sfx.Id.Shot, weaponTier >= 2 ? 0.38f : 0.28f, weaponTier >= 2 ? 1.15f : 0.95f, 0.10f, 0.06f);
        }

        void intstreams(float totalDmg)
        {
            int count = Mathf.Clamp(soldiers.Count, 1, 8);
            int streamsPerSoldier = weaponTier >= 2 ? 2 : 1;
            float dmgPerBullet = totalDmg / (count * streamsPerSoldier);

            for (int i = 0; i < count; i++)
            {
                var sPos = soldiers[i].localPosition;
                if (streamsPerSoldier == 1)
                {
                    SpawnBullet(sPos.x + 0.15f, sPos.z + 0.55f, 0f, dmgPerBullet);
                }
                else
                {
                    // Twin cyan laser bolts per heavy soldier
                    SpawnBullet(sPos.x - 0.28f, sPos.z + 0.65f, -0.4f, dmgPerBullet);
                    SpawnBullet(sPos.x + 0.28f, sPos.z + 0.65f, 0.4f, dmgPerBullet);
                }
            }
        }

        void SpawnBullet(float x, float z, float vx, float dmg)
        {
            var b = bulletPool.Count > 0 ? bulletPool.Pop() : null;
            if (b == null)
            {
                b = new Bullet();
                var go = Prim(PrimitiveType.Capsule, fx, Vector3.zero, new Vector3(0.14f, 0.45f, 0.14f), LaserCyan);
                b.tr = go.transform;
                b.ren = go.GetComponent<Renderer>();
                b.tr.localRotation = Quaternion.Euler(90f, 0f, 0f);
            }
            b.tr.gameObject.SetActive(true);
            bool heavy = weaponTier >= 2;
            b.tr.localScale = heavy ? new Vector3(0.16f, 0.72f, 0.16f) : new Vector3(0.12f, 0.38f, 0.12f);
            SetColor(b.ren, heavy ? LaserCyan : new Color(1f, 0.82f, 0.25f));
            b.x = x;
            b.z = b.startZ = z;
            b.vx = vx;
            b.dmg = dmg;
            b.tr.localPosition = new Vector3(x, 0.65f, z);
            bullets.Add(b);
        }

        void UpdateBullets(float dt)
        {
            for (int i = bullets.Count - 1; i >= 0; i--)
            {
                var b = bullets[i];
                float z0 = b.z, z1 = b.z + BulletSpeed * dt;
                b.x += b.vx * dt;
                if (HitSomething(b, z0, z1) || z1 - b.startZ > BulletRange)
                {
                    b.tr.gameObject.SetActive(false);
                    bullets.RemoveAt(i);
                    bulletPool.Push(b);
                    continue;
                }
                b.z = z1;
                b.tr.localPosition = new Vector3(b.x, 0.65f, z1);
            }
        }

        bool HitSomething(Bullet b, float z0, float z1)
        {
            float bestZ = float.MaxValue;
            int kind = -1, idx = -1;
            Pod hitPod = null;

            // 1. Enemies & Bosses
            for (int i = 0; i < enemies.Count; i++)
            {
                var e = enemies[i];
                if (!e.alive || Mathf.Abs(e.x - b.x) > e.radius) continue;
                if (e.z >= z0 - 0.4f && e.z <= z1 + 0.4f && e.z < bestZ)
                {
                    bestZ = e.z; kind = 0; idx = i;
                }
            }
            // 2. Shootable Number Gates
            for (int i = 0; i < gates.Count; i++)
            {
                var g = gates[i];
                if (g.passed || Mathf.Abs(b.x - g.x) > g.width * 0.52f) continue;
                if (g.z >= z0 && g.z <= z1 && g.z < bestZ)
                {
                    bestZ = g.z; kind = 1; idx = i;
                }
            }
            // 3. Pods (left horizontal tube & right giant tank)
            CheckPodHit(leftTube, b, z0, z1, ref bestZ, ref kind, ref hitPod);
            CheckPodHit(rightTank, b, z0, z1, ref bestZ, ref kind, ref hitPod);

            switch (kind)
            {
                case 0:
                    var e = enemies[idx];
                    if (e.isFinalBoss && nearMissEnding)
                    {
                        // Near-miss clamp on Final Boss (~170 HP left just like Voodoo Ref 1!)
                        e.hp = Mathf.Max(170f, e.hp - b.dmg);
                    }
                    else
                    {
                        e.hp -= b.dmg;
                    }
                    e.hit = 1f;
                    if (e.hpLabel) e.hpLabel.Text = Mathf.CeilToInt(Mathf.Max(0f, e.hp)).ToString();
                    if (e.hp <= 0f) KillEnemy(e);
                    else Sfx.Play(Sfx.Id.Hit, 0.32f, e.isBoss ? 0.72f : 1.05f, 0.12f, 0.06f);
                    return true;

                case 1:
                    var g = gates[idx];
                    int prevVal = g.val;
                    g.acc += b.dmg;
                    bool changed = false;
                    while (g.acc >= gateHitDamage)
                    {
                        g.acc -= gateHitDamage;
                        g.val++;
                        changed = true;
                    }
                    if (changed)
                    {
                        RefreshGate(g);
                        g.txt.transform.localScale = Vector3.one * 1.28f;
                        if (prevVal < 0 && g.val >= 0)
                        {
                            // Gate flipped from Red (<0) to Blue (>=0)!
                            Sfx.Play(Sfx.Id.GateGood, 0.9f, 1.25f, 0f, 0.04f);
                            Burst(new Vector3(g.x, 1.3f, g.z), Blue, 16);
                        }
                        else
                        {
                            Sfx.Play(Sfx.Id.Tap, 0.55f, g.val >= 0 ? 1.38f : 0.95f, 0.05f, 0.045f);
                        }
                    }
                    StartCoroutine(Punch(g.panel.transform, 0.06f));
                    return true;

                case 2:
                    DamagePod(hitPod, b.dmg, new Vector3(b.x, 1.3f, hitPod.z - hitPod.radiusZ));
                    return true;
            }
            return false;
        }

        void CheckPodHit(Pod pod, Bullet b, float z0, float z1, ref float bestZ, ref int kind, ref Pod hitPod)
        {
            if (pod == null || pod.broken) return;
            float frontZ = pod.z - pod.radiusZ;
            if (Mathf.Abs(pod.x - b.x) <= pod.radiusX && frontZ >= z0 - 0.5f && frontZ <= z1 + 0.5f && frontZ < bestZ)
            {
                bestZ = frontZ;
                kind = 2;
                hitPod = pod;
            }
        }

        void DamagePod(Pod pod, float dmg, Vector3 hitPos)
        {
            if (pod.isBigTank && nearMissEnding)
            {
                // In Voodoo Ref 1, the big tank drops from 1241 down to 7 HP and stays cracked at 7!
                pod.hp = Mathf.Max(7f, pod.hp - dmg * 3.1f);
            }
            else
            {
                pod.hp -= dmg * 0.55f;
            }
            pod.hit = 1f;
            StartCoroutine(Punch(pod.tr, 0.045f));
            Burst(hitPos, LaserCyan, 3);
            Sfx.Play(Sfx.Id.Glass, 0.45f, pod.isBigTank ? 1.35f : 1.55f, 0.10f, 0.055f);

            if (pod.crackRoot)
            {
                float lost = 1f - Mathf.Clamp01(pod.hp / pod.maxHp);
                int showCracks = Mathf.FloorToInt(lost * pod.crackRoot.childCount);
                for (int i = 0; i < pod.crackRoot.childCount; i++)
                    pod.crackRoot.GetChild(i).gameObject.SetActive(i < showCracks);
            }

            if (pod.hp <= 0f)
            {
                BreakPod(pod, true);
            }
            else if (pod.hpLabel)
            {
                pod.hpLabel.Text = Mathf.CeilToInt(pod.hp).ToString();
            }
        }

        void BreakPod(Pod pod, bool freed)
        {
            if (pod.broken) return;
            pod.broken = true;
            Sfx.Play(Sfx.Id.Glass, 1f, 0.95f, 0.04f, 0.02f);
            Burst(pod.tr.position + Vector3.up * 1.4f, new Color(0.45f, 0.85f, 1f), 28);
            if (pod.glassRen) pod.glassRen.enabled = false;
            if (pod.hpLabel) pod.hpLabel.transform.parent.gameObject.SetActive(false);
            if (pod.helpLabel) pod.helpLabel.transform.parent.gameObject.SetActive(false);

            if (freed)
            {
                if (!pod.isBigTank && weaponTier == 1)
                {
                    // Tube broken -> freed hero leaps out & merges with soldier -> LV+1 Heavy Gunner upgrade!
                    weaponTier = 2;
                    Sfx.Play(Sfx.Id.Win, 0.95f, 1.15f, 0f, 0.02f);
                    Sfx.Play(Sfx.Id.GateGood, 1f, 1.2f, 0f, 0.02f);
                    StoreLink.LogEvent("rescue_run_lv1_upgrade", 1);
                    if (pod.heroTr)
                        StartCoroutine(RescueMergeHeroRoutine(pod.heroTr));
                    else
                        ApplyLv1UpgradeVisuals();
                }
                else if (pod.isBigTank)
                {
                    if (pod.heroTr) pod.heroTr.gameObject.SetActive(false);
                    SetSquad(squad + 4);
                    SpawnFloatText(new Vector3(squadX, 2.5f, squadZ), "HERO FREED!", Gold, 1.1f);
                    Burst(new Vector3(squadX, 0.8f, squadZ), Gold, 30);
                    Sfx.Play(Sfx.Id.Win, 0.95f, 1.1f, 0f, 0.03f);
                }
            }
            else if (pod.heroTr)
            {
                pod.heroTr.gameObject.SetActive(false);
            }
        }

        void ApplyLv1UpgradeVisuals()
        {
            RebuildSoldiers();
            SpawnFloatText(new Vector3(squadX - 0.4f, 2.3f, squadZ), "LV+1", Gold, 1.25f);
            Burst(new Vector3(squadX, 0.8f, squadZ), Gold, 26);
        }

        IEnumerator RescueMergeHeroRoutine(Transform freedHero)
        {
            freedHero.SetParent(world, true);
            Vector3 startPos = freedHero.position;
            Quaternion startRot = freedHero.rotation;
            for (float t = 0f; t < 1f; t += Time.deltaTime / 0.28f)
            {
                if (!freedHero) yield break;
                Vector3 dst = new Vector3(squadX, 0f, squadZ);
                Vector3 p = Vector3.Lerp(startPos, dst, t);
                p.y += Mathf.Sin(t * Mathf.PI) * 1.4f;
                freedHero.position = p;
                freedHero.rotation = Quaternion.Slerp(startRot, Quaternion.identity, t);
                yield return null;
            }
            if (freedHero) Destroy(freedHero.gameObject);
            ApplyLv1UpgradeVisuals();
        }

        void UpdatePods(float dt)
        {
            UpdateSinglePod(leftTube, dt);
            UpdateSinglePod(rightTank, dt);
            UpdateSinglePod(backTube, dt);
        }

        void UpdateSinglePod(Pod pod, float dt)
        {
            if (pod == null || pod.broken) return;

            pod.hit = Mathf.MoveTowards(pod.hit, 0f, dt * 7f);
            if (pod.glassRen)
            {
                Color baseGlass = pod.isBigTank ? new Color(0.25f, 0.68f, 0.98f) : new Color(0.38f, 0.76f, 1f);
                SetColor(pod.glassRen, Color.Lerp(baseGlass, Color.white, pod.hit * 0.55f));
            }

            // In Voodoo Ref 1, the giant 1241 tank sits on a wheeled platform on the right lane and rolls forward ahead of the player!
            if (pod.followsPlayer)
            {
                float desiredZ = Mathf.Max(pod.z, squadZ + 11.5f);
                pod.z = Mathf.Lerp(pod.z, desiredZ, 1f - Mathf.Exp(-10f * dt));
                pod.tr.localPosition = new Vector3(pod.x, 0f, pod.z);
            }

            if (pod.helpLabel)
            {
                float pulse = 1f + 0.14f * Mathf.Sin(Time.time * 9f);
                pod.helpLabel.transform.parent.localScale = Vector3.one * pulse;
            }

            // If player runs past the horizontal tube without breaking it
            if (!pod.followsPlayer && squadZ >= pod.z - 0.6f)
            {
                if (Mathf.Abs(squadX - pod.x) < pod.radiusX + 0.3f)
                    BreakPod(pod, true);
                else if (squadZ > pod.z + 1.5f)
                    BreakPod(pod, false);
            }
        }

        void KillEnemy(Unit e)
        {
            e.alive = false;
            // White/grey corpse flash & puff like Ref 1
            Burst(e.tr.position + Vector3.up * (e.isBoss ? 1.5f : 0.5f), e.isBoss ? Color.white : new Color(0.85f, 0.88f, 0.92f), e.isBoss ? 22 : 7);
            Sfx.Play(e.isBoss ? Sfx.Id.Stomp : Sfx.Id.Pop, e.isBoss ? 0.85f : 0.45f, e.isBoss ? 0.65f : 0.85f, 0.15f, 0.04f);
            Destroy(e.tr.gameObject);
            if (e.isFinalBoss && (phase == Phase.Run || phase == Phase.Boss))
            {
                StartCoroutine(Win());
            }
        }

        void UpdateEnemies(float dt)
        {
            float r = SquadRadius;
            foreach (var e in enemies)
            {
                if (!e.alive) continue;
                float dz = e.z - squadZ;
                if (dz < 28f && dz > -1.5f)
                {
                    float spd = e.isBoss ? 2.2f : 2.8f;
                    e.z -= spd * dt;
                    e.x = Mathf.MoveTowards(e.x, squadX, (e.isBoss ? 1.1f : 0.65f) * dt);
                }

                // Update Boss HP bar
                if (e.isBoss && e.barFill)
                {
                    float f = Mathf.Clamp01(e.hp / e.maxHp);
                    e.barFill.localScale = new Vector3(3.24f * f, 0.42f, 0.12f);
                    e.barFill.localPosition = new Vector3(-1.62f * (1f - f), 0f, -0.06f);
                }

                // Contact with squad
                if (dz < (e.isBoss ? 1.8f : 0.65f) && dz > -1.5f && Mathf.Abs(e.x - squadX) < r + (e.isBoss ? 0.9f : 0.1f))
                {
                    if (e.isFinalBoss)
                    {
                        // Final boss slams the squad in rapid stomps until DEFEAT
                        bossContactTimer += dt;
                        if (bossContactTimer >= 0.22f)
                        {
                            bossContactTimer = 0f;
                            int loss = Mathf.Max(1, (squad + 1) / 2);
                            SetSquad(squad - loss);
                            SpawnFloatText(new Vector3(squadX, 2.2f, squadZ), "-" + loss, new Color(1f, 0.35f, 0.35f), 1.15f);
                            StartCoroutine(Punch(e.tr, 0.15f));
                            StartCoroutine(Shake(0.22f, 0.32f));
                            Sfx.Play(Sfx.Id.Stomp, 0.95f);
                        }
                    }
                    else if (e.isBoss)
                    {
                        SetSquad(Mathf.Max(1, squad - 1));
                        SpawnFloatText(new Vector3(squadX, 2.2f, squadZ), "-1", new Color(1f, 0.35f, 0.35f), 1.05f);
                        Sfx.Play(Sfx.Id.Stomp, 0.9f, 0.8f);
                        KillEnemy(e);
                        StartCoroutine(Shake(0.18f, 0.22f));
                        continue;
                    }
                    else
                    {
                        SetSquad(squad - 1);
                        SpawnFloatText(new Vector3(squadX, 2.1f, squadZ), "-1", new Color(1f, 0.35f, 0.35f), 0.95f);
                        Sfx.Play(Sfx.Id.Hit, 0.8f, 0.72f, 0.06f, 0.05f);
                        KillEnemy(e);
                        continue;
                    }
                }
                if (dz < -4f) { e.alive = false; Destroy(e.tr.gameObject); continue; }

                e.hit = Mathf.MoveTowards(e.hit, 0f, dt * 6f);
                float phaseT = Time.time * (e.isBoss ? 7f : 14f) + e.x * 2.1f;
                float bob = Mathf.Abs(Mathf.Sin(phaseT)) * (e.isBoss ? 0.16f : 0.09f);
                e.tr.localPosition = new Vector3(e.x, bob, e.z);
                if (!e.isBoss)
                {
                    e.tr.localRotation = Quaternion.Euler(0f, 180f, Mathf.Sin(phaseT) * 7f);
                    if (e.tr.childCount >= 2 && e.hit > 0.01f)
                    {
                        var r1 = e.tr.GetChild(1).GetComponent<Renderer>();
                        if (r1) SetColor(r1, Color.Lerp(Red, Color.white, e.hit * 0.7f));
                    }
                }
                if (e.isBoss)
                {
                    // Flash white when hit like Ref 1 at 00:17
                    var tint = Color.Lerp(BossSkin, Color.white, e.hit * 0.75f);
                    for (int c = 0; c < e.tr.childCount; c++)
                    {
                        var child = e.tr.GetChild(c);
                        if (child == e.barRoot) continue;
                        var ren = child.GetComponent<Renderer>();
                        if (ren && c >= 3) SetColor(ren, tint);
                    }
                }
            }
        }

        void UpdateGates()
        {
            foreach (var g in gates)
            {
                g.txt.transform.localScale = Vector3.Lerp(g.txt.transform.localScale, Vector3.one, 0.15f);
                if (g.passed || squadZ < g.z) continue;
                g.passed = true;

                // Passing through the gate
                if (Mathf.Abs(squadX - g.x) <= g.width * 0.65f)
                {
                    int before = squad;
                    int after = Mathf.Max(1, squad + g.val);
                    // In near-miss autoPlay, ensure gate 1 gives 6 soldiers and gate 2 reduces to 3 soldiers like Ref 1
                    if (autoPlay && g.z < 60f) after = 6;
                    else if (autoPlay && g.z > 80f) after = 3;

                    SetSquad(after);
                    bool good = after >= before;
                    Sfx.Play(good ? Sfx.Id.GateGood : Sfx.Id.GateBad, 1f, 1f, 0f, 0.08f);
                    string popTxt = good ? "+" + (after - before) : (after - before).ToString();
                    SpawnFloatText(new Vector3(squadX, 2.1f, squadZ), popTxt, good ? Gold : new Color(1f, 0.4f, 0.4f), 1.1f);
                    Burst(new Vector3(g.x, 1f, g.z), good ? Gold : new Color(0.9f, 0.85f, 0.85f), 22);
                }
                StartCoroutine(SinkGate(g.root));
            }
        }

        // ============================================================ Voodoo Ref 1 Choreography (AutoSteer)
        void AutoSteer()
        {
            // Seamless choreography matching Voodoo Reference 1:
            // 0-16m: start on right shooting 1241 tank -> slide left to shoot & break 8 HP tube (LV+1!)
            if (leftTube != null && !leftTube.broken)
            {
                targetX = squadZ < 4.5f ? 1.55f : -1.60f;
                return;
            }
            // 21-33m: briefly slide right to pump the 1241 tank down to ~825, then slide left to flip the -13 gate to +6
            if (squadZ < 33f) { targetX = 1.60f; return; }
            if (squadZ < 48f) { targetX = -1.65f; return; }
            // 48-57m: shoot the right tank down to 280
            if (squadZ < 57f) { targetX = 1.45f; return; }
            // 57-82m: slide left to gun down the 372 Mid-Boss
            if (squadZ < 82f) { targetX = -1.55f; return; }
            // 82-96m: shoot the right tank down to 95
            if (squadZ < 96f) { targetX = 1.55f; return; }
            // 96-109m: slide left to shoot the -40 gate down to -20 and pass through it (6 -> 3 soldiers)
            if (squadZ < 109f) { targetX = -1.65f; return; }
            // 109-121m: shoot the right tank all the way down to 7 HP!
            if (squadZ < 121f) { targetX = 1.55f; return; }
            // 121m+: face the 878 Final Boss on the left lane until he reaches ~170 HP and crushes the squad -> DEFEAT!
            targetX = -1.45f;
        }

        // ============================================================ results
        IEnumerator Win()
        {
            if (phase != Phase.Run && phase != Phase.Boss) yield break;
            phase = Phase.Result;
            ui.Banner("VICTORY!", Gold);
            Sfx.Play(Sfx.Id.Win, 1f, 1f, 0f);
            StoreLink.LogEvent("rescue_run_win", 1);
            yield return new WaitForSeconds(1.2f);
            ShowEndcard(true);
        }

        IEnumerator Lose()
        {
            if (phase != Phase.Run && phase != Phase.Boss) yield break;
            phase = Phase.Result;
            ui.ShowDragTutorial(false);
            ui.Banner("DEFEAT", new Color(0.85f, 0.88f, 0.96f));
            Sfx.Play(Sfx.Id.Fail, 1f, 1f, 0f);
            StoreLink.LogEvent("rescue_run_defeat", 1);
            StartCoroutine(Shake(0.45f, 0.4f));
            yield return new WaitForSeconds(1.5f);
            ShowEndcard(false);
        }

        void ShowEndcard(bool win)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            ui.ShowEndcard(win ? "Can you save the next hero?" : "So close! Only 7 HP left to free the hero!");
        }

        // ============================================================ fx
        void SpawnFloatText(Vector3 pos, string text, Color col, float size)
        {
            var l = Res.MakeLabel(fx, text, size, col, 65, pos);
            billboards.Add(l.transform);
            StartCoroutine(FloatTextRoutine(l));
        }

        IEnumerator FloatTextRoutine(Label l)
        {
            var tr = l.transform;
            Vector3 start = tr.position;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.85f)
            {
                if (!tr) yield break;
                tr.position = start + new Vector3(0f, k * 1.6f, 0f);
                float s = k < 0.25f ? Mathf.Lerp(0.3f, 1.25f, k / 0.25f) : Mathf.Lerp(1.25f, 1f, (k - 0.25f) / 0.75f);
                tr.localScale = Vector3.one * s;
                yield return null;
            }
            if (l) Destroy(l.gameObject);
        }

        void Burst(Vector3 pos, Color c, int n) => StartCoroutine(BurstRoutine(pos, c, n));

        IEnumerator BurstRoutine(Vector3 pos, Color c, int n)
        {
            var parts = new Transform[n];
            var vel = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                parts[i] = Prim(PrimitiveType.Cube, fx, pos, Vector3.one * Random.Range(0.08f, 0.22f), c).transform;
                vel[i] = new Vector3(Random.Range(-1f, 1f), Random.Range(0.6f, 1.7f), Random.Range(-1f, 1f)) * 4.2f;
            }
            for (float t = 0f; t < 0.55f; t += Time.deltaTime)
            {
                float dt = Time.deltaTime;
                for (int i = 0; i < n; i++)
                {
                    vel[i].y -= 14f * dt;
                    parts[i].position += vel[i] * dt;
                    parts[i].Rotate(400f * dt, 300f * dt, 0f);
                    parts[i].localScale *= 1f - dt * 1.5f;
                }
                yield return null;
            }
            foreach (var p in parts) if (p) Destroy(p.gameObject);
        }

        IEnumerator Punch(Transform t, float amount)
        {
            if (!t) yield break;
            var s0 = t.localScale;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.11f)
            {
                if (!t) yield break;
                t.localScale = s0 * (1f + Mathf.Sin(k * Mathf.PI) * amount);
                yield return null;
            }
            if (t) t.localScale = s0;
        }

        IEnumerator SinkGate(Transform root)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.35f)
            {
                if (!root) yield break;
                root.localPosition = new Vector3(0f, -2.5f * k, 0f);
                yield return null;
            }
            if (root) root.gameObject.SetActive(false);
        }

        IEnumerator Shake(float dur, float amp)
        {
            for (float t = 0f; t < dur; t += Time.deltaTime)
            {
                shakeOffset = (Vector3)Random.insideUnitCircle * amp * (1f - t / dur);
                yield return null;
            }
            shakeOffset = Vector3.zero;
        }
    }
}
