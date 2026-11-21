using System.Collections.Generic;
using AdKit;
using Luna.Unity;
using UnityEngine;
using UnityEngine.UI;

namespace MobControlAd
{
    /// <summary>
    /// Exact Playworks-compatible recreation of "MD Test - Mob Control case study" (VideoReference.mp4):
    /// - Deep Space backdrop with Giant 3D Moon on the left & Planet on the right.
    /// - Glossy White 3D Bridge Platform.
    /// - Purple 4-Wheeled Cannon (Cannon.fbx + 4 black spoked wheels) firing Purple 3D Stickmen (LowPoly_Stickaman_Running.fbx).
    /// - Center Arched Purple Long Tube (LongTube): stickmen shot into the tube mouth travel through the 3D arched pipe (with a traveling bulge) and exit onto the upper-right lane!
    /// - Front sliding X3 purple gate, left stationary X2 purple gate, right destructible Yellow "60" Block guarding the X7 purple gate.
    /// - Top-left Yellow Enemy Base ("50" HP) with yellow triangle flag spawning waves of Yellow 3D Stickmen (turning gray on clash).
    /// - Dramatic "DEFEAT..." / "VICTORY!" climax -> Playworks Endcard CTA -> Google Play Store (com.vincentb.MobControl).
    /// </summary>
    public class MobControlGame : MonoBehaviour
    {
        public const string MobControlStoreUrl = "https://play.google.com/store/apps/details?id=com.vincentb.MobControl&gl=IN";

        [LunaPlaygroundField("Cannon Fire Rate", 0, "Mob Control Settings")]
        public float fireRate = 8.0f;

        [LunaPlaygroundField("Yellow Block HP", 1, "Mob Control Settings")]
        public int yellowBlockStartHp = 60;

        [LunaPlaygroundField("Enemy Base HP", 2, "Mob Control Settings")]
        public int enemyBaseStartHp = 50;

        [LunaPlaygroundField("CTA Button Text", 3, "Endcard Settings")]
        public string ctaText = "PLAY NOW";

        static readonly Color PurpleMain = new Color(0.50f, 0.10f, 0.96f);
        static readonly Color PurpleLight = new Color(0.68f, 0.38f, 1.00f);
        static readonly Color PurpleGateCol = new Color(0.58f, 0.22f, 0.98f, 0.88f);
        static readonly Color YellowMain = new Color(0.98f, 0.84f, 0.08f);
        static readonly Color YellowDark = new Color(0.82f, 0.66f, 0.04f);
        static readonly Color GrayCorpse = new Color(0.36f, 0.38f, 0.42f);

        class StickmanUnit
        {
            public Transform root;
            public Transform body;
            public Transform leftArm, rightArm, leftLeg, rightLeg;
            public List<Renderer> renderers = new List<Renderer>();
            public bool isPurple;
            public bool isDyingGray;
            public float dyingTimer;
            public float speed;
            public int gateMask;
            public float phase;
            public float spawnPop;
            public bool inTube;
            public float tubeT;
        }

        class MultiplierGate
        {
            public Transform root;
            public Label label;
            public int multiplier;
            public float z;
            public float baseX;
            public float currentX;
            public float halfWidth;
            public float moveAmp;
            public float moveSpeed;
            public float phaseOffset;
            public float punchTimer;
            public int bitIndex;
        }

        class SmokePuff
        {
            public Transform tr;
            public Vector3 vel;
            public float life;
            public float maxLife;
        }

        Camera _cam;
        Vector3 _camBasePos;
        float _shakeTimer;
        float _shakeAmp;

        // Purple 4-Wheeled Cannon
        Transform _cannonRoot;
        Transform _cannonBarrel;
        Transform _muzzleFlash;
        readonly List<Transform> _cannonWheels = new List<Transform>();
        float _cannonX;
        float _targetCannonX;
        float _fireCooldown;
        float _barrelRecoil;

        // Center Arched Purple Tube
        Vector3[] _tubeSpline;
        readonly List<Transform> _tubeSegments = new List<Transform>();
        const float TubeEntranceX = 0.0f;
        const float TubeEntranceZ = 4.85f;
        const float TubeEntranceRadius = 0.72f;

        // Right Yellow Destructible Block ("60")
        Transform _yellowBlockRoot;
        Label _yellowBlockLabel;
        int _yellowBlockHp;
        float _yellowBlockHitPunch;
        bool _yellowBlockDestroyed;

        // Top-Left Yellow Enemy Base ("50")
        Transform _enemyBaseRoot;
        Transform _enemyBaseBody;
        Label _enemyBaseLabel;
        int _enemyBaseHp;
        float _enemyBaseHitPunch;
        float _enemyWaveTimer;

        // Collections
        readonly List<StickmanUnit> _purpleMobs = new List<StickmanUnit>();
        readonly List<StickmanUnit> _yellowMobs = new List<StickmanUnit>();
        readonly List<MultiplierGate> _gates = new List<MultiplierGate>();
        readonly List<SmokePuff> _puffs = new List<SmokePuff>();

        // UI & State
        AdUI _ui;
        GameObject _endOverlayRoot;
        GameObject _topHudRoot;
        Text _topBlueMobsText;
        Text _topEnemyBaseText;
        RectTransform _defeatBannerRt;
        Text _defeatTitleText;
        RectTransform _playNowBtnRt;
        bool _hasInteracted;
        bool _climaxTriggered;
        float _climaxTimer;
        float _elapsedTime;
        float _sfxHitCooldown;
        float _sfxGateCooldown;

        void Awake()
        {
            Application.targetFrameRate = 60;
        }

        void Start()
        {
            SetupCameraAndSpaceEnvironment();
            BuildWhiteBridge();
            BuildArchedPurpleTube();
            BuildPurpleCannon();
            BuildGatesAndYellowBlock();
            BuildYellowEnemyBase();
            BuildUI();
            SpawnInitialReferenceState();
        }

        void SetupCameraAndSpaceEnvironment()
        {
            _cam = Camera.main;
            if (!_cam)
            {
                var go = new GameObject("Main Camera") { tag = "MainCamera" };
                _cam = go.AddComponent<Camera>();
            }
            if (!_cam.GetComponent<AudioListener>())
                _cam.gameObject.AddComponent<AudioListener>();

            _cam.orthographic = false;
            _cam.fieldOfView = 50f;
            _cam.clearFlags = CameraClearFlags.SolidColor;
            _cam.backgroundColor = new Color(0.02f, 0.02f, 0.04f); // Deep pitch-black outer space
            _camBasePos = new Vector3(0f, 11.4f, -6.2f);
            _cam.transform.position = _camBasePos;
            _cam.transform.rotation = Quaternion.Euler(38f, 0f, 0f);

            var spaceRoot = new GameObject("SpaceEnvironment").transform;
            spaceRoot.SetParent(transform, false);

            // Giant 3D Cratered Moon on the Left (matching VideoReference.mp4)
            var leftMoon = Prims.Make(PrimitiveType.Sphere, spaceRoot, new Vector3(-11.8f, 5.2f, 15.5f), Vector3.one * 17.5f, new Color(0.68f, 0.69f, 0.67f)).transform;
            // Subtle golden-yellow crater patches on lower-left moon surface
            Prims.Make(PrimitiveType.Sphere, leftMoon, new Vector3(0.32f, -0.22f, -0.34f), new Vector3(0.35f, 0.25f, 0.25f), new Color(0.76f, 0.68f, 0.22f));
            Prims.Make(PrimitiveType.Sphere, leftMoon, new Vector3(0.38f, -0.10f, -0.30f), new Vector3(0.22f, 0.18f, 0.22f), new Color(0.45f, 0.46f, 0.45f));

            // 3D Clouded Dark/White Planet on the Right
            var rightPlanet = Prims.Make(PrimitiveType.Sphere, spaceRoot, new Vector3(9.4f, 0.8f, 17.0f), Vector3.one * 10.2f, new Color(0.34f, 0.36f, 0.38f)).transform;
            Prims.Make(PrimitiveType.Sphere, rightPlanet, new Vector3(-0.18f, 0.24f, -0.40f), new Vector3(0.55f, 0.42f, 0.35f), new Color(0.78f, 0.80f, 0.82f));

            // Distant twinkling stars in space
            for (int i = 0; i < 32; i++)
            {
                Vector3 sp = new Vector3(Random.Range(-18f, 18f), Random.Range(-4f, 22f), Random.Range(24f, 42f));
                float sz = Random.Range(0.08f, 0.18f);
                Prims.Make(PrimitiveType.Cube, spaceRoot, sp, Vector3.one * sz, new Color(0.85f, 0.88f, 0.95f));
            }
        }

        void BuildWhiteBridge()
        {
            var bridge = new GameObject("WhiteBridge").transform;
            bridge.SetParent(transform, false);

            // Clean bright white platform matching VideoReference.mp4
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(0f, -0.35f, 11.5f), new Vector3(6.8f, 0.70f, 24.5f), new Color(0.93f, 0.94f, 0.96f));
            // Subtle darker front ledge face
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(0f, -0.36f, -0.72f), new Vector3(6.82f, 0.68f, 0.08f), new Color(0.75f, 0.77f, 0.80f));
        }

        void BuildArchedPurpleTube()
        {
            var tubeRoot = new GameObject("ArchedPurpleLongTube").transform;
            tubeRoot.SetParent(transform, false);

            // Define 3D spline path matching VideoReference.mp4:
            // Starts at center (0, 0.55, 4.85), runs straight up center to z=13.5,
            // arches high up (y=6.4) at z=16.5, loops to the right (x=3.1, y=2.2, z=18.2),
            // and curves back onto the upper-right lane at (x=1.45, y=0.55, z=19.2)!
            _tubeSpline = new[]
            {
                new Vector3(0.00f, 0.52f, 4.85f),
                new Vector3(0.00f, 0.52f, 7.20f),
                new Vector3(0.00f, 0.54f, 9.60f),
                new Vector3(0.00f, 0.58f, 12.00f),
                new Vector3(0.02f, 1.15f, 13.80f),
                new Vector3(0.10f, 2.85f, 15.10f),
                new Vector3(0.28f, 4.95f, 16.00f),
                new Vector3(0.65f, 6.45f, 16.75f),
                new Vector3(1.15f, 6.85f, 17.35f),
                new Vector3(1.75f, 5.85f, 17.90f),
                new Vector3(2.45f, 3.85f, 18.35f),
                new Vector3(3.05f, 1.85f, 18.70f),
                new Vector3(3.25f, 0.78f, 19.00f),
                new Vector3(2.75f, 0.55f, 19.25f),
                new Vector3(1.95f, 0.55f, 19.35f),
                new Vector3(1.35f, 0.55f, 19.35f)
            };

            // Entrance mouth ring + dark inner hole at (0, 0.52, 4.85)
            var mouthRing = Prims.Make(PrimitiveType.Cylinder, tubeRoot, new Vector3(0f, 0.52f, 4.80f), new Vector3(1.22f, 0.14f, 1.22f), PurpleMain);
            mouthRing.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            var mouthHole = Prims.Make(PrimitiveType.Cylinder, tubeRoot, new Vector3(0f, 0.52f, 4.76f), new Vector3(0.88f, 0.15f, 0.88f), new Color(0.04f, 0.02f, 0.06f));
            mouthHole.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);

            // Build smooth overlapping 3D cylindrical segments along the spline
            int denseSteps = 54;
            Vector3 prevPt = SampleTubeSpline(0f);
            for (int i = 1; i <= denseSteps; i++)
            {
                float t = i / (float)denseSteps;
                Vector3 pt = SampleTubeSpline(t);
                Vector3 mid = (prevPt + pt) * 0.5f;
                Vector3 dir = pt - prevPt;
                float len = dir.magnitude;
                if (len > 0.001f)
                {
                    var seg = Prims.Make(PrimitiveType.Cylinder, tubeRoot, mid, new Vector3(0.96f, len * 0.62f, 0.96f), PurpleMain).transform;
                    seg.localRotation = Quaternion.FromToRotation(Vector3.up, dir.normalized);
                    _tubeSegments.Add(seg);
                    // Joint sphere to keep curves completely seamless
                    Prims.Make(PrimitiveType.Sphere, tubeRoot, pt, Vector3.one * 0.95f, PurpleMain);
                }
                prevPt = pt;
            }

            // Exit cuff at upper-right lane (1.35, 0.55, 19.35)
            var exitRing = Prims.Make(PrimitiveType.Cylinder, tubeRoot, new Vector3(1.35f, 0.55f, 19.35f), new Vector3(1.08f, 0.14f, 1.08f), PurpleMain);
            exitRing.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
        }

        Vector3 SampleTubeSpline(float t)
        {
            float f = Mathf.Clamp01(t) * (_tubeSpline.Length - 1);
            int idx = Mathf.Clamp(Mathf.FloorToInt(f), 0, _tubeSpline.Length - 2);
            float frac = f - idx;
            return Vector3.Lerp(_tubeSpline[idx], _tubeSpline[idx + 1], frac);
        }

        void BuildPurpleCannon()
        {
            _cannonRoot = new GameObject("PurpleCannon").transform;
            _cannonRoot.SetParent(transform, false);
            _cannonX = 0.0f;
            _targetCannonX = 0.0f;
            _cannonRoot.localPosition = new Vector3(0f, 0f, 1.45f);

            // Gray rectangular chassis platform
            Prims.Make(PrimitiveType.Cube, _cannonRoot, new Vector3(0f, 0.24f, 0f), new Vector3(1.05f, 0.16f, 1.25f), new Color(0.55f, 0.57f, 0.62f));

            // 4 Black Spoked Wheels (matching VideoReference.mp4)
            Vector3[] wheelOffsets =
            {
                new Vector3(-0.58f, 0.24f, -0.45f),
                new Vector3(0.58f, 0.24f, -0.45f),
                new Vector3(-0.58f, 0.24f, 0.45f),
                new Vector3(0.58f, 0.24f, 0.45f)
            };
            foreach (var wo in wheelOffsets)
            {
                var wRoot = new GameObject("Wheel").transform;
                wRoot.SetParent(_cannonRoot, false);
                wRoot.localPosition = wo;

                var tire = Prims.Make(PrimitiveType.Cylinder, wRoot, Vector3.zero, new Vector3(0.48f, 0.11f, 0.48f), new Color(0.14f, 0.15f, 0.17f));
                tire.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                var hub = Prims.Make(PrimitiveType.Cylinder, wRoot, Vector3.zero, new Vector3(0.22f, 0.13f, 0.22f), new Color(0.42f, 0.44f, 0.48f));
                hub.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                _cannonWheels.Add(wRoot);
            }

            // Glossy Purple Cannon Barrel with lighter purple top highlight stripe
            _cannonBarrel = new GameObject("PurpleBarrel").transform;
            _cannonBarrel.SetParent(_cannonRoot, false);
            _cannonBarrel.localPosition = new Vector3(0f, 0.56f, -0.15f);
            _cannonBarrel.localRotation = Quaternion.Euler(-8f, 0f, 0f);

            // Try loading imported Cannon.fbx mesh if available, layered with clean Playworks primitives
            var importedCannon = Resources.Load<GameObject>("Models/Cannon");
            if (importedCannon)
            {
                var inst = Instantiate(importedCannon, _cannonBarrel);
                inst.transform.localPosition = new Vector3(0f, -0.15f, 0.35f);
                inst.transform.localScale = Vector3.one * 0.45f;
                foreach (var r in inst.GetComponentsInChildren<Renderer>())
                {
                    if (AdRes.PrimMat) r.sharedMaterial = AdRes.PrimMat;
                    Prims.SetColor(r, PurpleMain);
                }
            }

            var mainTube = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 0.42f), new Vector3(0.76f, 0.62f, 0.76f), PurpleMain);
            mainTube.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            // Light purple top stripe along barrel
            var stripe = Prims.Make(PrimitiveType.Cube, _cannonBarrel, new Vector3(0f, 0.34f, 0.42f), new Vector3(0.24f, 0.08f, 1.10f), PurpleLight);
            var rearSphere = Prims.Make(PrimitiveType.Sphere, _cannonBarrel, new Vector3(0f, 0f, -0.18f), new Vector3(0.84f, 0.84f, 0.84f), PurpleMain);
            var muzzleRing = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 1.02f), new Vector3(0.86f, 0.08f, 0.86f), PurpleLight);
            muzzleRing.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);

            _muzzleFlash = Prims.Make(PrimitiveType.Sphere, _cannonBarrel, new Vector3(0f, 0f, 1.18f), Vector3.zero, PurpleLight).transform;
        }

        void BuildGatesAndYellowBlock()
        {
            // 1. Front Sliding X3 Gate (z = 3.65f, slides from left to right across the bridge!)
            CreateGate(0, 3, -0.4f, 3.65f, 1.15f, 1.85f, 1.35f, 0.2f);

            // 2. Left Stationary X2 Gate (z = 5.45f, x = -1.95f)
            CreateGate(1, 2, -1.95f, 5.45f, 1.25f, 0.0f, 0f, 0f);

            // 3. Right Lane Yellow Destructible Block ("60" HP at z = 5.85f, x = 1.85f)
            _yellowBlockHp = yellowBlockStartHp;
            _yellowBlockRoot = new GameObject("YellowBlock_60").transform;
            _yellowBlockRoot.SetParent(transform, false);
            _yellowBlockRoot.localPosition = new Vector3(1.85f, 0f, 5.85f);

            Prims.Make(PrimitiveType.Cube, _yellowBlockRoot, new Vector3(0f, 0.72f, 0f), new Vector3(2.75f, 1.44f, 1.65f), YellowMain);
            Prims.Make(PrimitiveType.Cube, _yellowBlockRoot, new Vector3(0f, 1.40f, 0f), new Vector3(2.68f, 0.12f, 1.58f), new Color(1f, 0.94f, 0.38f));
            _yellowBlockLabel = AdRes.MakeLabel(_yellowBlockRoot, _yellowBlockHp.ToString(), 0.95f, Color.white, 25, new Vector3(0f, 0.72f, -0.86f));

            // 4. Right Lane X7 Gate right behind the Yellow Block (z = 8.15f, x = 1.65f)
            CreateGate(2, 7, 1.65f, 8.15f, 1.25f, 0.0f, 0f, 0f);
        }

        void CreateGate(int bitIndex, int mult, float x, float z, float halfWidth, float moveAmp, float moveSpeed, float phaseOffset)
        {
            var root = new GameObject("Gate_X" + mult).transform;
            root.SetParent(transform, false);
            root.localPosition = new Vector3(x, 0f, z);

            float fullW = halfWidth * 2f;
            Color frameBlack = new Color(0.10f, 0.10f, 0.12f);

            // Black U-shaped frame posts & bottom bar (matching VideoReference.mp4!)
            Prims.Make(PrimitiveType.Cube, root, new Vector3(-halfWidth, 0.58f, 0f), new Vector3(0.18f, 1.16f, 0.18f), frameBlack);
            Prims.Make(PrimitiveType.Cube, root, new Vector3(halfWidth, 0.58f, 0f), new Vector3(0.18f, 1.16f, 0.18f), frameBlack);
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.08f, 0f), new Vector3(fullW + 0.18f, 0.14f, 0.20f), frameBlack);
            // White glowing bottom strip
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.15f, -0.06f), new Vector3(fullW - 0.12f, 0.08f, 0.12f), Color.white);

            // Glowing purple gate shield
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.62f, 0f), new Vector3(fullW - 0.14f, 0.96f, 0.06f), PurpleGateCol);
            var label = AdRes.MakeLabel(root, "X" + mult, 0.82f, Color.white, 24, new Vector3(0f, 0.62f, -0.10f));

            _gates.Add(new MultiplierGate
            {
                root = root,
                label = label,
                multiplier = mult,
                z = z,
                baseX = x,
                currentX = x,
                halfWidth = halfWidth,
                moveAmp = moveAmp,
                moveSpeed = moveSpeed,
                phaseOffset = phaseOffset,
                bitIndex = bitIndex
            });
        }

        void BuildYellowEnemyBase()
        {
            _enemyBaseHp = enemyBaseStartHp;
            _enemyBaseRoot = new GameObject("YellowEnemyBase_50").transform;
            _enemyBaseRoot.SetParent(transform, false);
            _enemyBaseRoot.localPosition = new Vector3(-1.85f, 0f, 21.8f);

            _enemyBaseBody = new GameObject("BaseBody").transform;
            _enemyBaseBody.SetParent(_enemyBaseRoot, false);

            // Two-tier Yellow Fortress Box matching VideoReference.mp4
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.85f, 0f), new Vector3(2.45f, 1.70f, 1.85f), YellowMain);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 2.25f, 0f), new Vector3(2.65f, 1.25f, 2.05f), YellowMain);
            // Dark horizontal groove band between tiers
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 1.66f, -0.95f), new Vector3(2.25f, 0.18f, 0.14f), new Color(0.18f, 0.16f, 0.06f));
            // Dark spawn doorway at bottom center
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.55f, -0.94f), new Vector3(0.75f, 1.10f, 0.12f), new Color(0.12f, 0.10f, 0.05f));
            // Black scoreboard plate on upper tier
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 2.28f, -1.04f), new Vector3(1.85f, 0.82f, 0.10f), new Color(0.12f, 0.12f, 0.14f));

            _enemyBaseLabel = AdRes.MakeLabel(_enemyBaseRoot, _enemyBaseHp.ToString(), 0.82f, Color.white, 26, new Vector3(0f, 2.28f, -1.14f));

            // Tall black flagpole + yellow triangular flag on top
            Prims.Make(PrimitiveType.Cylinder, _enemyBaseBody, new Vector3(0f, 3.65f, 0f), new Vector3(0.12f, 0.85f, 0.12f), new Color(0.12f, 0.12f, 0.14f));
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0.45f, 4.15f, 0f), new Vector3(0.85f, 0.48f, 0.08f), YellowMain);
        }

        void BuildUI()
        {
            _ui = AdUI.Create("MOB CONTROL", ctaText, new Color(0.14f, 0.08f, 0.28f), new Color(1f, 0.86f, 0.22f));
            _ui.ShowDragTutorial(true);

            var center = new Vector2(0.5f, 0.5f);

            // =========================================================================
            // CARTOON ART STYLE TOP HUD (Chunky comic strokes + glossy highlight strips)
            // =========================================================================
            _topHudRoot = new GameObject("TopHUD", typeof(RectTransform));
            var trt = (RectTransform)_topHudRoot.transform;
            trt.SetParent(_ui.Root, false);
            trt.anchorMin = new Vector2(0.5f, 1f);
            trt.anchorMax = new Vector2(0.5f, 1f);
            trt.anchoredPosition = new Vector2(0f, -125f);
            trt.sizeDelta = new Vector2(990f, 150f);

            // Left: Cartoon Blue/Purple Mob Count Pill
            AdUI.Img(trt, AdRes.Round(64), new Color(0.05f, 0.03f, 0.12f, 1f), center, new Vector2(-330f, -8f), new Vector2(314f, 122f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(-330f, 0f), new Vector2(300f, 108f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(0.36f, 0.14f, 0.90f, 1f), center, new Vector2(-330f, 0f), new Vector2(286f, 94f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.26f), center, new Vector2(-330f, 24f), new Vector2(246f, 28f), true);
            _topBlueMobsText = AdUI.Txt(trt, "MOBS: 0", 52, Color.white, center, new Vector2(-330f, -2f));
            var mobOut = _topBlueMobsText.GetComponent<Outline>();
            if (mobOut) { mobOut.effectColor = new Color(0.05f, 0.02f, 0.14f, 1f); mobOut.effectDistance = new Vector2(4f, -4f); }

            // Center: Cartoon Gold Stage Shield
            AdUI.Img(trt, AdRes.Round(64), new Color(0.05f, 0.03f, 0.12f, 1f), center, new Vector2(0f, -8f), new Vector2(274f, 134f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(0f, 0f), new Vector2(260f, 120f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 0.72f, 0.10f, 1f), center, new Vector2(0f, 0f), new Vector2(244f, 104f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.35f), center, new Vector2(0f, 28f), new Vector2(204f, 28f), true);
            var stageLbl = AdUI.Txt(trt, "STAGE 1", 56, Color.white, center, new Vector2(0f, -2f));
            var stageOut = stageLbl.GetComponent<Outline>();
            if (stageOut) { stageOut.effectColor = new Color(0.36f, 0.16f, 0.02f, 1f); stageOut.effectDistance = new Vector2(4f, -4f); }

            // Right: Cartoon Red/Orange Enemy Base HP Pill
            AdUI.Img(trt, AdRes.Round(64), new Color(0.05f, 0.03f, 0.12f, 1f), center, new Vector2(330f, -8f), new Vector2(314f, 122f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(330f, 0f), new Vector2(300f, 108f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(0.95f, 0.24f, 0.28f, 1f), center, new Vector2(330f, 0f), new Vector2(286f, 94f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.28f), center, new Vector2(330f, 24f), new Vector2(246f, 28f), true);
            _topEnemyBaseText = AdUI.Txt(trt, "BASE: " + enemyBaseStartHp, 52, Color.white, center, new Vector2(330f, -2f));
            var baseOut = _topEnemyBaseText.GetComponent<Outline>();
            if (baseOut) { baseOut.effectColor = new Color(0.26f, 0.02f, 0.05f, 1f); baseOut.effectDistance = new Vector2(4f, -4f); }

            // =========================================================================
            // CARTOON ART STYLE END CARD OVERLAY (Live 3D battlefield behind juicy comic UI!)
            // =========================================================================
            _endOverlayRoot = new GameObject("MobControlEndOverlay", typeof(RectTransform));
            var ort = (RectTransform)_endOverlayRoot.transform;
            ort.SetParent(_ui.Root, false);
            ort.anchorMin = Vector2.zero;
            ort.anchorMax = Vector2.one;
            ort.offsetMin = Vector2.zero;
            ort.offsetMax = Vector2.zero;
            _endOverlayRoot.AddComponent<Image>().color = new Color(0.04f, 0.02f, 0.12f, 0.56f);

            // Top Cartoon Game Title Ribbon: "MOB CONTROL"
            AdUI.Img(ort, AdRes.Round(64), new Color(0.05f, 0.02f, 0.12f, 1f), center, new Vector2(0f, 520f), new Vector2(780f, 164f), true);
            AdUI.Img(ort, AdRes.Round(64), Color.white, center, new Vector2(0f, 530f), new Vector2(756f, 144f), true);
            AdUI.Img(ort, AdRes.Round(64), new Color(0.46f, 0.14f, 0.96f, 1f), center, new Vector2(0f, 530f), new Vector2(734f, 122f), true);
            AdUI.Img(ort, AdRes.Round(64), new Color(1f, 1f, 1f, 0.28f), center, new Vector2(0f, 562f), new Vector2(660f, 36f), true);
            var brandLbl = AdUI.Txt(ort, "MOB CONTROL", 84, new Color(1f, 0.90f, 0.22f), center, new Vector2(0f, 528f));
            var brandOut = brandLbl.GetComponent<Outline>();
            if (brandOut) { brandOut.effectColor = new Color(0.08f, 0.02f, 0.18f, 1f); brandOut.effectDistance = new Vector2(6f, -6f); }

            // Tilted Juicy Cartoon "DEFEAT..." / "VICTORY!" Center Card
            var defWrap = new GameObject("DefeatBanner", typeof(RectTransform));
            _defeatBannerRt = (RectTransform)defWrap.transform;
            _defeatBannerRt.SetParent(ort, false);
            _defeatBannerRt.anchorMin = center;
            _defeatBannerRt.anchorMax = center;
            _defeatBannerRt.anchoredPosition = new Vector2(0f, 95f);
            _defeatBannerRt.sizeDelta = new Vector2(960f, 340f);
            _defeatBannerRt.localRotation = Quaternion.Euler(0f, 0f, 3.0f);

            // Chunky 3D comic drop shadow + bright white cartoon border + deep royal card + top gloss
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), new Color(0.04f, 0.02f, 0.10f, 1f), center, new Vector2(0f, -18f), new Vector2(944f, 304f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), Color.white, center, Vector2.zero, new Vector2(920f, 282f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), new Color(0.14f, 0.06f, 0.34f, 1f), center, Vector2.zero, new Vector2(894f, 256f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.14f), center, new Vector2(0f, 76f), new Vector2(820f, 68f), true);

            _defeatTitleText = AdUI.Txt(_defeatBannerRt, "DEFEAT...", 136, new Color(1f, 0.86f, 0.22f), center, new Vector2(0f, 28f));
            var outline = _defeatTitleText.GetComponent<Outline>();
            if (outline)
            {
                outline.effectColor = new Color(0.06f, 0.02f, 0.14f, 1f);
                outline.effectDistance = new Vector2(8f, -8f);
            }

            var subLbl = AdUI.Txt(_defeatBannerRt, "CAN YOU BEAT THE BOSS?", 52, new Color(0.55f, 0.94f, 1f), center, new Vector2(0f, -82f));
            var subOut = subLbl.GetComponent<Outline>();
            if (subOut) { subOut.effectColor = new Color(0.05f, 0.02f, 0.12f, 1f); subOut.effectDistance = new Vector2(4f, -4f); }

            // Chunky Cartoon 3D Glossy Green "PLAY NOW!" CTA Button
            var ctaGo = new GameObject("PlayNowCTA", typeof(RectTransform));
            _playNowBtnRt = (RectTransform)ctaGo.transform;
            _playNowBtnRt.SetParent(ort, false);
            _playNowBtnRt.anchorMin = center;
            _playNowBtnRt.anchorMax = center;
            _playNowBtnRt.anchoredPosition = new Vector2(0f, -455f);
            _playNowBtnRt.sizeDelta = new Vector2(740f, 210f);

            // Black comic outline -> Deep green 3D extrusion -> Bright white rim -> Vivid lime-green body -> Top cartoon shine
            AdUI.Img(_playNowBtnRt, AdRes.Round(64), new Color(0.04f, 0.02f, 0.10f, 1f), center, new Vector2(0f, -18f), new Vector2(736f, 204f), true);
            AdUI.Img(_playNowBtnRt, AdRes.Round(64), Color.white, center, new Vector2(0f, 0f), new Vector2(716f, 186f), true);
            AdUI.Img(_playNowBtnRt, AdRes.Round(64), new Color(0.06f, 0.52f, 0.18f, 1f), center, new Vector2(0f, -10f), new Vector2(694f, 166f), true);
            AdUI.Img(_playNowBtnRt, AdRes.Round(64), new Color(0.24f, 0.92f, 0.36f, 1f), center, new Vector2(0f, 6f), new Vector2(690f, 158f), true);
            AdUI.Img(_playNowBtnRt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.36f), center, new Vector2(0f, 48f), new Vector2(620f, 44f), true);
            var ctaLbl = AdUI.Txt(_playNowBtnRt, ctaText + "!", 92, Color.white, center, new Vector2(0f, 6f));
            var ctaOut = ctaLbl.GetComponent<Outline>();
            if (ctaOut) { ctaOut.effectColor = new Color(0.04f, 0.30f, 0.10f, 1f); ctaOut.effectDistance = new Vector2(6f, -6f); }

            var fullBtn = _endOverlayRoot.AddComponent<Button>();
            fullBtn.onClick.AddListener(() => StoreLink.Open(MobControlStoreUrl));
            _endOverlayRoot.SetActive(false);
        }

        void SpawnInitialReferenceState()
        {
            // Initial cluster of 8 Yellow Stickmen in front of the Yellow "50" Base (matching ref_01.jpg!)
            for (int i = 0; i < 8; i++)
            {
                float rx = -1.85f + ((i % 3) - 1) * 0.45f + Random.Range(-0.12f, 0.12f);
                float rz = 18.8f + (i / 3) * 0.55f;
                SpawnStickman(false, new Vector3(rx, 0f, rz), 0);
            }
        }

        StickmanUnit SpawnStickman(bool isPurple, Vector3 pos, int gateMask)
        {
            var root = new GameObject(isPurple ? "PurpleStickman" : "YellowStickman").transform;
            root.SetParent(transform, false);
            root.localPosition = pos;
            if (!isPurple)
                root.localRotation = Quaternion.Euler(0f, 180f, 0f);

            var body = new GameObject("Body").transform;
            body.SetParent(root, false);

            var unit = new StickmanUnit
            {
                root = root,
                body = body,
                isPurple = isPurple,
                speed = isPurple ? 4.8f : 2.95f,
                gateMask = gateMask,
                phase = Random.Range(0f, 6.28f),
                spawnPop = 1.0f
            };

            Color col = isPurple ? PurpleMain : YellowMain;

            // Glossy 3D Rounded Stickman (matching LowPoly_Stickaman_Running.fbx & VideoReference.mp4!)
            var head = Prims.Make(PrimitiveType.Sphere, body, new Vector3(0f, 0.88f, 0f), new Vector3(0.36f, 0.36f, 0.36f), col);
            var torso = Prims.Make(PrimitiveType.Capsule, body, new Vector3(0f, 0.52f, 0f), new Vector3(0.26f, 0.24f, 0.22f), col);
            var lArm = Prims.Make(PrimitiveType.Capsule, body, new Vector3(-0.19f, 0.54f, 0f), new Vector3(0.11f, 0.18f, 0.11f), col);
            var rArm = Prims.Make(PrimitiveType.Capsule, body, new Vector3(0.19f, 0.54f, 0f), new Vector3(0.11f, 0.18f, 0.11f), col);
            var lLeg = Prims.Make(PrimitiveType.Capsule, body, new Vector3(-0.09f, 0.20f, 0f), new Vector3(0.12f, 0.20f, 0.12f), col);
            var rLeg = Prims.Make(PrimitiveType.Capsule, body, new Vector3(0.09f, 0.20f, 0f), new Vector3(0.12f, 0.20f, 0.12f), col);

            unit.leftArm = lArm.transform;
            unit.rightArm = rArm.transform;
            unit.leftLeg = lLeg.transform;
            unit.rightLeg = rLeg.transform;

            unit.renderers.Add(head.GetComponent<Renderer>());
            unit.renderers.Add(torso.GetComponent<Renderer>());
            unit.renderers.Add(lArm.GetComponent<Renderer>());
            unit.renderers.Add(rArm.GetComponent<Renderer>());
            unit.renderers.Add(lLeg.GetComponent<Renderer>());
            unit.renderers.Add(rLeg.GetComponent<Renderer>());

            if (isPurple) _purpleMobs.Add(unit);
            else _yellowMobs.Add(unit);
            return unit;
        }

        void SetStickmanColor(StickmanUnit u, Color c)
        {
            for (int i = 0; i < u.renderers.Count; i++)
            {
                if (u.renderers[i])
                    Prims.SetColor(u.renderers[i], c);
            }
        }

        void Update()
        {
            float dt = Time.deltaTime;
            _ui?.Tick(dt);

            if (_topBlueMobsText) _topBlueMobsText.text = "MOBS: " + _purpleMobs.Count;
            if (_topEnemyBaseText) _topEnemyBaseText.text = "BASE: " + _enemyBaseHp;

            if (_climaxTriggered)
            {
                _climaxTimer += dt;
                float pop = _climaxTimer < 0.22f
                    ? Mathf.Lerp(0.35f, 1.12f, _climaxTimer / 0.22f)
                    : Mathf.Lerp(1.12f, 1.0f, Mathf.Clamp01((_climaxTimer - 0.22f) / 0.14f));
                if (_defeatBannerRt) _defeatBannerRt.localScale = Vector3.one * pop;
                if (_playNowBtnRt)
                {
                    float pulse = 1.0f + 0.06f * Mathf.Sin(Time.time * 6.5f);
                    _playNowBtnRt.localScale = Vector3.one * pulse;
                }
                if (_climaxTimer >= 0.35f && Input.GetMouseButtonDown(0))
                {
                    StoreLink.Open(MobControlStoreUrl);
                }
                return;
            }

            _elapsedTime += dt;
            if (_sfxHitCooldown > 0f) _sfxHitCooldown -= dt;
            if (_sfxGateCooldown > 0f) _sfxGateCooldown -= dt;

            HandleCannonAndInput(dt);
            UpdateGates(dt);
            UpdateYellowWaves(dt);
            UpdateStickmen(dt);
            UpdateTubeBulge(dt);
            UpdateSmokePuffs(dt);
            UpdateCameraShake(dt);

            // Trigger DEFEAT... climax at 21s if still battling
            if (_elapsedTime >= 21.0f && !_climaxTriggered)
            {
                TriggerDefeatClimax();
            }
        }

        void HandleCannonAndInput(float dt)
        {
            bool pressing = Input.GetMouseButton(0);
            if (pressing)
            {
                if (!_hasInteracted)
                {
                    _hasInteracted = true;
                    _ui.ShowDragTutorial(false);
                }
                float normX = Mathf.Clamp01(Input.mousePosition.x / Mathf.Max(1f, Screen.width));
                _targetCannonX = Mathf.Lerp(-2.45f, 2.45f, normX);
            }
            else if (!_hasInteracted)
            {
                // Auto-aim choreography matching VideoReference.mp4 (left X3/X2 -> center Tube/Yellow 60 -> left X2)
                if (_elapsedTime < 5.5f)
                    _targetCannonX = -1.25f + Mathf.Sin(_elapsedTime * 1.6f) * 0.65f;
                else if (_elapsedTime < 12.0f)
                    _targetCannonX = 0.25f + Mathf.Sin(_elapsedTime * 1.4f) * 0.55f;
                else
                    _targetCannonX = -0.95f + Mathf.Sin(_elapsedTime * 1.5f) * 0.75f;
            }

            float prevX = _cannonX;
            _cannonX = Mathf.Lerp(_cannonX, _targetCannonX, dt * 12f);
            _cannonRoot.localPosition = new Vector3(_cannonX, 0f, 1.45f);

            // Rotate the 4 wheels as the cannon rolls horizontally
            float wheelRot = (_cannonX - prevX) * 260f;
            for (int i = 0; i < _cannonWheels.Count; i++)
                _cannonWheels[i].Rotate(wheelRot, 0f, 0f, Space.Self);

            float activeRate = pressing ? fireRate : 4.2f;
            _fireCooldown -= dt;
            if (_fireCooldown <= 0f)
            {
                _fireCooldown = 1f / Mathf.Max(1f, activeRate);
                FirePurpleStickman();
            }

            _barrelRecoil = Mathf.MoveTowards(_barrelRecoil, 0f, dt * 4.2f);
            _cannonBarrel.localPosition = new Vector3(0f, 0.56f, -0.15f - _barrelRecoil * 0.22f);
            _muzzleFlash.localScale = Vector3.one * (_barrelRecoil * 0.52f);
        }

        void FirePurpleStickman()
        {
            _barrelRecoil = 1f;
            Sfx.Play(Sfx.Id.Pop, 0.32f);

            Vector3 spawnPos = new Vector3(Mathf.Clamp(_cannonX + Random.Range(-0.10f, 0.10f), -2.85f, 2.85f), 0f, 2.35f);
            SpawnStickman(true, spawnPos, 0);
            SpawnWhiteSmoke(spawnPos + new Vector3(0f, 0.35f, 0f), 2, PurpleLight);
        }

        void UpdateGates(float dt)
        {
            foreach (var g in _gates)
            {
                if (g.moveAmp > 0.01f)
                {
                    g.currentX = g.baseX + Mathf.Sin(_elapsedTime * g.moveSpeed + g.phaseOffset) * g.moveAmp;
                    g.root.localPosition = new Vector3(g.currentX, 0f, g.z);
                }
                if (g.punchTimer > 0f)
                {
                    g.punchTimer = Mathf.MoveTowards(g.punchTimer, 0f, dt * 5f);
                    float s = 1f + Mathf.Sin(g.punchTimer * Mathf.PI) * 0.16f;
                    g.root.localScale = new Vector3(s, s, 1f);
                }
                else
                {
                    g.root.localScale = Vector3.one;
                }
            }

            if (_yellowBlockHitPunch > 0f && _yellowBlockRoot)
            {
                _yellowBlockHitPunch = Mathf.MoveTowards(_yellowBlockHitPunch, 0f, dt * 6f);
                float s = 1f + Mathf.Sin(_yellowBlockHitPunch * Mathf.PI) * 0.08f;
                _yellowBlockRoot.localScale = new Vector3(s, s, s);
            }

            if (_enemyBaseHitPunch > 0f && _enemyBaseBody)
            {
                _enemyBaseHitPunch = Mathf.MoveTowards(_enemyBaseHitPunch, 0f, dt * 6f);
                float s = 1f + Mathf.Sin(_enemyBaseHitPunch * Mathf.PI) * 0.08f;
                _enemyBaseBody.localScale = new Vector3(s, s, s);
            }
        }

        void UpdateYellowWaves(float dt)
        {
            _enemyWaveTimer -= dt;
            if (_enemyWaveTimer <= 0f)
            {
                // Spawn wave of Yellow Stickmen marching down the left lane (matching VideoReference.mp4!)
                _enemyWaveTimer = _elapsedTime < 10f ? 1.15f : 0.72f;
                int waveSize = _elapsedTime < 10f ? 5 : 8;
                for (int i = 0; i < waveSize; i++)
                {
                    if (_yellowMobs.Count >= 180) break;
                    float rx = -1.85f + Random.Range(-1.05f, 0.95f);
                    float rz = 20.2f + (i / 3) * 0.48f;
                    SpawnStickman(false, new Vector3(Mathf.Clamp(rx, -3.05f, -0.55f), 0f, rz), 0);
                }
            }
        }

        void UpdateStickmen(float dt)
        {
            // 1. Update Purple Stickmen
            for (int i = _purpleMobs.Count - 1; i >= 0; i--)
            {
                var m = _purpleMobs[i];
                if (m.isDyingGray)
                {
                    m.dyingTimer -= dt;
                    if (m.dyingTimer <= 0f)
                    {
                        Destroy(m.root.gameObject);
                        _purpleMobs.RemoveAt(i);
                    }
                    continue;
                }

                // If traveling through the Center Arched Purple Tube!
                if (m.inTube)
                {
                    m.tubeT += dt * 0.42f;
                    if (m.tubeT >= 1f)
                    {
                        m.inTube = false;
                        m.root.gameObject.SetActive(true);
                        // Pop out of upper-right tube exit!
                        m.root.localPosition = new Vector3(1.35f + Random.Range(-0.25f, 0.25f), 0f, 19.35f);
                        SpawnWhiteSmoke(m.root.localPosition + Vector3.up * 0.4f, 3, Color.white);
                        Sfx.Play(Sfx.Id.Pop, 0.4f);
                    }
                    else
                    {
                        m.root.localPosition = SampleTubeSpline(m.tubeT);
                    }
                    continue;
                }

                Vector3 pos = m.root.localPosition;
                float prevZ = pos.z;
                pos.z += m.speed * dt;

                // Check if stickman enters the mouth of the Center Arched Purple Tube (x ~ 0, z ~ 4.85)
                if (prevZ < TubeEntranceZ && pos.z >= TubeEntranceZ && Mathf.Abs(pos.x - TubeEntranceX) <= TubeEntranceRadius)
                {
                    m.inTube = true;
                    m.tubeT = 0.02f;
                    m.root.gameObject.SetActive(false); // Hidden inside pipe while traveling!
                    SpawnWhiteSmoke(new Vector3(0f, 0.52f, TubeEntranceZ), 2, PurpleLight);
                    Sfx.Play(Sfx.Id.Jump, 0.35f);
                    continue;
                }

                // Check if stickman hits the Right Lane Yellow "60" Block (x > 0.45f, z ~ 5.0f)
                if (!_yellowBlockDestroyed && prevZ < 5.05f && pos.z >= 5.05f && pos.x >= 0.45f)
                {
                    DamageYellowBlock(1, pos);
                    Destroy(m.root.gameObject);
                    _purpleMobs.RemoveAt(i);
                    continue;
                }

                // Check Multiplier Gates (X3, X2, X7)
                for (int gi = 0; gi < _gates.Count; gi++)
                {
                    var g = _gates[gi];
                    int bit = 1 << g.bitIndex;
                    if ((m.gateMask & bit) == 0 && prevZ < g.z && pos.z >= g.z)
                    {
                        if (Mathf.Abs(pos.x - g.currentX) <= g.halfWidth + 0.12f)
                        {
                            m.gateMask |= bit;
                            g.punchTimer = 1f;
                            int toSpawn = g.multiplier - 1;
                            int allowed = Mathf.Min(toSpawn, Mathf.Max(0, 150 - _purpleMobs.Count));
                            for (int c = 0; c < allowed; c++)
                            {
                                float ox = (c - (allowed - 1) * 0.5f) * 0.28f + Random.Range(-0.12f, 0.12f);
                                float oz = Random.Range(0.05f, 0.42f);
                                Vector3 clonePos = new Vector3(Mathf.Clamp(pos.x + ox, -3.05f, 3.05f), 0f, pos.z + oz);
                                // Keep left-lane mobs in left lane so they don't clip through center tube wall
                                if (pos.x < -0.45f)
                                    clonePos.x = Mathf.Clamp(clonePos.x, -3.05f, -0.58f);
                                SpawnStickman(true, clonePos, m.gateMask);
                            }
                            SpawnWhiteSmoke(new Vector3(pos.x, 0.4f, g.z), 4, Color.white);
                            if (_sfxGateCooldown <= 0f)
                            {
                                _sfxGateCooldown = 0.08f;
                                Sfx.Play(Sfx.Id.GateGood, 0.5f);
                            }
                        }
                    }
                }

                // Keep left-lane and right-lane mobs separated by the center purple tube (x = -0.48 .. +0.48)
                if (pos.z > 4.85f && pos.z < 16.5f)
                {
                    if (pos.x < 0f && pos.x > -0.56f) pos.x = -0.56f;
                    else if (pos.x >= 0f && pos.x < 0.56f) pos.x = 0.56f;
                }
                // Upper right mobs steer toward the Top-Left Yellow Enemy Base once past the tube arch (z > 18.5)
                if (pos.z > 18.2f)
                {
                    pos.x = Mathf.MoveTowards(pos.x, -1.85f, dt * 3.2f);
                }

                pos.x = Mathf.Clamp(pos.x, -3.1f, 3.1f);
                m.root.localPosition = pos;
                AnimateStickmanRun(m, dt);

                // Check if Purple Stickman reached Top-Left Yellow Enemy Base ("50")
                if (pos.z >= 20.6f)
                {
                    DamageEnemyBase(1, pos);
                    Destroy(m.root.gameObject);
                    _purpleMobs.RemoveAt(i);
                }
            }

            // 2. Update Yellow Stickmen marching down the Left Lane
            for (int i = _yellowMobs.Count - 1; i >= 0; i--)
            {
                var y = _yellowMobs[i];
                if (y.isDyingGray)
                {
                    y.dyingTimer -= dt;
                    if (y.dyingTimer <= 0f)
                    {
                        Destroy(y.root.gameObject);
                        _yellowMobs.RemoveAt(i);
                    }
                    continue;
                }

                Vector3 pos = y.root.localPosition;
                pos.z -= y.speed * dt;
                pos.x = Mathf.Clamp(pos.x, -3.05f, -0.58f);
                y.root.localPosition = pos;
                AnimateStickmanRun(y, dt);

                // When Yellow Horde reaches the Cannon at bottom -> DEFEAT... climax!
                if (pos.z <= 1.85f)
                {
                    if (_elapsedTime < 7.5f)
                    {
                        Destroy(y.root.gameObject);
                        _yellowMobs.RemoveAt(i);
                        continue;
                    }
                    TriggerDefeatClimax();
                    return;
                }
            }

            // 3. Purple vs. Yellow Stickman Clashes (turn dark gray briefly like VideoReference.mp4!)
            for (int p = _purpleMobs.Count - 1; p >= 0; p--)
            {
                var pm = _purpleMobs[p];
                if (pm.inTube || pm.isDyingGray) continue;
                Vector3 pp = pm.root.localPosition;

                for (int y = _yellowMobs.Count - 1; y >= 0; y--)
                {
                    var ym = _yellowMobs[y];
                    if (ym.isDyingGray) continue;
                    Vector3 yp = ym.root.localPosition;

                    if (Mathf.Abs(pp.z - yp.z) < 0.55f && Mathf.Abs(pp.x - yp.x) < 0.55f)
                    {
                        pm.isDyingGray = true;
                        pm.dyingTimer = 0.24f;
                        SetStickmanColor(pm, GrayCorpse);

                        ym.isDyingGray = true;
                        ym.dyingTimer = 0.24f;
                        SetStickmanColor(ym, GrayCorpse);

                        if (_sfxHitCooldown <= 0f)
                        {
                            _sfxHitCooldown = 0.08f;
                            Sfx.Play(Sfx.Id.Hit, 0.4f);
                        }
                        break;
                    }
                }
            }
        }

        void UpdateTubeBulge(float dt)
        {
            // Bulge the segments of the Arched Purple Tube where stickmen are currently sliding inside!
            for (int s = 0; s < _tubeSegments.Count; s++)
            {
                float segT = (s + 0.5f) / _tubeSegments.Count;
                float bulge = 0f;
                for (int i = 0; i < _purpleMobs.Count; i++)
                {
                    var m = _purpleMobs[i];
                    if (!m.inTube) continue;
                    float d = Mathf.Abs(m.tubeT - segT);
                    if (d < 0.07f)
                        bulge = Mathf.Max(bulge, (1f - d / 0.07f) * 0.38f);
                }
                var tr = _tubeSegments[s];
                Vector3 sc = tr.localScale;
                float r = 0.96f + bulge;
                tr.localScale = new Vector3(r, sc.y, r);
            }
        }

        void AnimateStickmanRun(StickmanUnit u, float dt)
        {
            if (u.spawnPop > 0f)
                u.spawnPop = Mathf.MoveTowards(u.spawnPop, 0f, dt * 5f);

            float popScale = 1f + Mathf.Sin(u.spawnPop * Mathf.PI) * 0.28f;
            float cyc = _elapsedTime * 16f + u.phase;
            float bob = Mathf.Abs(Mathf.Sin(cyc)) * 0.10f;
            float swing = Mathf.Sin(cyc) * 38f;

            u.body.localPosition = new Vector3(0f, bob, 0f);
            u.body.localScale = Vector3.one * popScale;
            if (u.leftArm) u.leftArm.localRotation = Quaternion.Euler(swing, 0f, 0f);
            if (u.rightArm) u.rightArm.localRotation = Quaternion.Euler(-swing, 0f, 0f);
            if (u.leftLeg) u.leftLeg.localRotation = Quaternion.Euler(-swing, 0f, 0f);
            if (u.rightLeg) u.rightLeg.localRotation = Quaternion.Euler(swing, 0f, 0f);
        }

        void DamageYellowBlock(int dmg, Vector3 hitPos)
        {
            if (_yellowBlockDestroyed) return;
            _yellowBlockHp = Mathf.Max(0, _yellowBlockHp - dmg);
            _yellowBlockHitPunch = 1f;
            if (_yellowBlockLabel) _yellowBlockLabel.Text = _yellowBlockHp.ToString();
            SpawnWhiteSmoke(hitPos + Vector3.up * 0.4f, 2, YellowMain);

            if (_sfxHitCooldown <= 0f)
            {
                _sfxHitCooldown = 0.07f;
                Sfx.Play(Sfx.Id.Hit, 0.45f);
            }

            if (_yellowBlockHp <= 0)
            {
                _yellowBlockDestroyed = true;
                Sfx.Play(Sfx.Id.Glass, 0.8f);
                SpawnWhiteSmoke(_yellowBlockRoot.localPosition + Vector3.up * 0.7f, 10, YellowMain);
                Destroy(_yellowBlockRoot.gameObject);
            }
        }

        void DamageEnemyBase(int dmg, Vector3 hitPos)
        {
            _enemyBaseHp = Mathf.Max(0, _enemyBaseHp - dmg);
            _enemyBaseHitPunch = 1f;
            if (_enemyBaseLabel) _enemyBaseLabel.Text = _enemyBaseHp.ToString();
            SpawnWhiteSmoke(hitPos + Vector3.up * 0.5f, 2, YellowMain);

            if (_sfxHitCooldown <= 0f)
            {
                _sfxHitCooldown = 0.07f;
                Sfx.Play(Sfx.Id.Stomp, 0.45f);
            }

            if (_enemyBaseHp <= 0 && !_climaxTriggered)
            {
                TriggerVictoryClimax();
            }
        }

        void TriggerVictoryClimax()
        {
            if (_climaxTriggered) return;
            _climaxTriggered = true;
            _climaxTimer = 0f;
            _ui.ShowDragTutorial(false);
            if (_topHudRoot) _topHudRoot.SetActive(false);
            if (_defeatTitleText)
            {
                _defeatTitleText.text = "VICTORY!";
                _defeatTitleText.color = new Color(0.26f, 0.96f, 0.42f);
            }
            if (_endOverlayRoot) _endOverlayRoot.SetActive(true);
            StoreLink.NotifyGameEnded();
            Sfx.Play(Sfx.Id.Win, 0.9f);
            TriggerCameraShake(0.45f, 0.25f);
        }

        void TriggerDefeatClimax()
        {
            if (_climaxTriggered) return;
            _climaxTriggered = true;
            _climaxTimer = 0f;
            _ui.ShowDragTutorial(false);
            if (_topHudRoot) _topHudRoot.SetActive(false);

            // Turn yellow stickmen closest to the Purple Cannon charcoal gray (matching ref_end_10.jpg!)
            for (int i = 0; i < _yellowMobs.Count; i++)
            {
                var ym = _yellowMobs[i];
                if (ym.root && ym.root.localPosition.z < 3.6f)
                    SetStickmanColor(ym, GrayCorpse);
            }

            if (_defeatTitleText)
            {
                _defeatTitleText.text = "DEFEAT...";
                _defeatTitleText.color = PurpleMain;
            }
            if (_endOverlayRoot) _endOverlayRoot.SetActive(true);
            StoreLink.NotifyGameEnded();
            Sfx.Play(Sfx.Id.Fail, 0.85f);
            TriggerCameraShake(0.45f, 0.28f);
        }

        void SpawnWhiteSmoke(Vector3 pos, int count, Color col)
        {
            if (_puffs.Count > 55) return;
            for (int i = 0; i < count; i++)
            {
                var p = Prims.Make(PrimitiveType.Sphere, transform, pos + Random.insideUnitSphere * 0.18f, Vector3.one * 0.24f, col).transform;
                Vector3 vel = new Vector3(Random.Range(-1.4f, 1.4f), Random.Range(0.8f, 2.2f), Random.Range(-1.2f, 1.2f));
                _puffs.Add(new SmokePuff { tr = p, vel = vel, life = 0.36f, maxLife = 0.36f });
            }
        }

        void UpdateSmokePuffs(float dt)
        {
            for (int i = _puffs.Count - 1; i >= 0; i--)
            {
                var p = _puffs[i];
                p.life -= dt;
                if (p.life <= 0f || !p.tr)
                {
                    if (p.tr) Destroy(p.tr.gameObject);
                    _puffs.RemoveAt(i);
                    continue;
                }
                p.tr.localPosition += p.vel * dt;
                float s = 0.32f * (p.life / p.maxLife);
                p.tr.localScale = Vector3.one * s;
            }
        }

        void TriggerCameraShake(float duration, float amp)
        {
            _shakeTimer = duration;
            _shakeAmp = amp;
        }

        void UpdateCameraShake(float dt)
        {
            if (_shakeTimer > 0f)
            {
                _shakeTimer -= dt;
                Vector3 off = Random.insideUnitSphere * _shakeAmp;
                off.z = 0f;
                _cam.transform.position = _camBasePos + off;
            }
            else
            {
                _cam.transform.position = _camBasePos;
            }
        }
    }
}
