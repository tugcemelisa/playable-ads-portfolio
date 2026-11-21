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
        public const string MobControlStoreUrl = "https://apps.apple.com/us/app/mob-control/id1562817072";

        [LunaPlaygroundField("Cannon Fire Rate", 0, "Mob Control Settings")]
        public float fireRate = 8.0f;

        [LunaPlaygroundField("Round Duration (s)", 1, "Mob Control Settings")]
        public float roundDuration = 21.0f;

        [LunaPlaygroundField("Yellow Block HP", 2, "Mob Control Settings")]
        public int yellowBlockStartHp = 60;

        [LunaPlaygroundField("Enemy Base HP", 3, "Mob Control Settings")]
        public int enemyBaseStartHp = 50;

        [LunaPlaygroundField("Front Sliding Gate (X)", 0, "Gate Multipliers")]
        public int frontGateMultiplier = 3;

        [LunaPlaygroundField("Left Gate (X)", 1, "Gate Multipliers")]
        public int leftGateMultiplier = 2;

        [LunaPlaygroundField("Right Gate (X)", 2, "Gate Multipliers")]
        public int rightGateMultiplier = 7;

        [LunaPlaygroundField("CTA Button Text", 0, "Endcard & Localization")]
        public string ctaText = "PLAY NOW";

        [LunaPlaygroundField("Defeat Title", 1, "Endcard & Localization")]
        public string defeatTitle = "DEFEAT...";

        [LunaPlaygroundField("Victory Title", 2, "Endcard & Localization")]
        public string victoryTitle = "VICTORY!";

        [LunaPlaygroundField("Defeat Subtitle", 3, "Endcard & Localization")]
        public string defeatSubtitle = "CAN YOU BEAT THE BOSS?";

        [LunaPlaygroundField("Victory Subtitle", 4, "Endcard & Localization")]
        public string victorySubtitle = "READY FOR LEVEL 2?";

        [LunaPlaygroundField("Tutorial Text", 5, "Endcard & Localization")]
        public string tutorialText = "<  HOLD & DRAG TO AIM  >";

        public enum BackgroundTheme { AlpineWinter = 0, MidnightSlate = 1 }
        public enum CharacterStyle { StylizedModels = 0, ClassicStickmen = 1 }
        public enum CtaButtonColor { Green = 0, Blue = 1, Yellow = 2, Red = 3, Purple = 4 }
        public enum CtaButtonShape { Rounded = 0, Sharp = 1 }

        [Header("Background Theme")]
        [LunaPlaygroundField("Background Theme", 0, "Visual Settings")]
        public BackgroundTheme backgroundTheme = BackgroundTheme.AlpineWinter;

        [LunaPlaygroundField("Character Style", 1, "Visual Settings")]
        public CharacterStyle characterStyle = CharacterStyle.StylizedModels;

        [LunaPlaygroundField("CTA Button Color", 6, "Endcard & Localization")]
        public CtaButtonColor ctaColor = CtaButtonColor.Green;

        [LunaPlaygroundField("CTA Button Shape", 7, "Endcard & Localization")]
        public CtaButtonShape ctaShape = CtaButtonShape.Rounded;

        // Active theme colors (AlpineWinter: Purple vs Yellow | MidnightSlate: Electric Blue vs Vivid Red)
        Color PurpleMain = new Color(0.50f, 0.10f, 0.96f);
        Color PurpleLight = new Color(0.68f, 0.38f, 1.00f);
        Color PurpleGateCol = new Color(0.58f, 0.22f, 0.98f, 0.88f);
        Color YellowMain = new Color(0.98f, 0.84f, 0.08f);
        Color YellowDark = new Color(0.82f, 0.66f, 0.04f);
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
            public bool hasSkeletalRun;
        }

        class MultiplierGate
        {
            public Transform root;
            public Label label;
            public Renderer shieldRenderer;
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

        class RingFx
        {
            public Transform tr;
            public SpriteRenderer sr;
            public Color baseCol;
            public float maxScale;
            public float life;
            public float maxLife;
        }

        class SparkFx
        {
            public Transform tr;
            public Vector3 vel;
            public Vector3 spin;
            public float baseScale;
            public float gravity;
            public float life;
            public float maxLife;
        }

        Camera _cam;
        Vector3 _camBasePos;
        float _shakeTimer;
        float _shakeAmp;
        Transform _bgTransform;
        float _bgSpriteW;
        float _bgSpriteH;
        float _lastCamAspect = -1f;

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
        readonly List<RingFx> _rings = new List<RingFx>();
        readonly List<SparkFx> _sparks = new List<SparkFx>();
        GameObject _purpleMobPrefab;
        GameObject _yellowMobPrefab;
        AnimationClip _purpleRunClip;
        AnimationClip _yellowRunClip;
        Material _matFriendlyMain, _matFriendlyLight, _matFriendlyDark, _matFriendlyDeep;
        Material _matEnemyMain, _matEnemyAccent, _matGrayCorpse;

        // UI & State
        AdUI _ui;
        GameObject _endOverlayRoot;
        GameObject _topHudRoot;
        Text _topBlueMobsText;
        Text _topEnemyBaseText;
        RectTransform _defeatBannerRt;
        Text _defeatTitleText;
        Text _endSubText;
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
            ApplyThemePalette();
            _purpleMobPrefab = Resources.Load<GameObject>("Models/PurpleMob");
            _yellowMobPrefab = Resources.Load<GameObject>("Models/YellowMob");
            _purpleRunClip = FindRunClip("Models/PurpleMob");
            _yellowRunClip = FindRunClip("Models/YellowMob");
            SetupCameraAndSpaceEnvironment();
            BuildWhiteBridge();
            BuildArchedPurpleTube();
            BuildPurpleCannon();
            BuildGatesAndYellowBlock();
            BuildYellowEnemyBase();
            BuildUI();
            SpawnInitialReferenceState();
            Luna.Unity.Analytics.LogEvent("mobcontrol_start", 1);
        }

        void ApplyThemePalette()
        {
            if (backgroundTheme == BackgroundTheme.MidnightSlate)
            {
                // Night theme: Electric Blue (friendly) vs Vivid Red (enemy)
                PurpleMain = new Color(0.10f, 0.56f, 1.00f);
                PurpleLight = new Color(0.42f, 0.82f, 1.00f);
                PurpleGateCol = new Color(0.14f, 0.62f, 1.00f, 0.88f);
                YellowMain = new Color(0.96f, 0.18f, 0.22f);
                YellowDark = new Color(0.66f, 0.08f, 0.12f);
            }
            else
            {
                // Alpine Winter theme: Vivid Purple (friendly) vs Golden Yellow (enemy)
                PurpleMain = new Color(0.50f, 0.10f, 0.96f);
                PurpleLight = new Color(0.68f, 0.38f, 1.00f);
                PurpleGateCol = new Color(0.58f, 0.22f, 0.98f, 0.88f);
                YellowMain = new Color(0.98f, 0.84f, 0.08f);
                YellowDark = new Color(0.82f, 0.66f, 0.04f);
            }

            // Build shared cached materials for multi-material FBX mobs (zero GC / high batching in Playworks WebGL)
            _matFriendlyMain  = MakeThemeMat(PurpleMain);
            _matFriendlyLight = MakeThemeMat(PurpleLight);
            _matFriendlyDark  = MakeThemeMat(Color.Lerp(PurpleMain, Color.black, 0.34f));
            _matFriendlyDeep  = MakeThemeMat(Color.Lerp(PurpleMain, Color.black, 0.60f));
            _matEnemyMain     = MakeThemeMat(YellowMain);
            _matEnemyAccent   = MakeThemeMat(YellowDark);
            _matGrayCorpse    = MakeThemeMat(GrayCorpse);
        }

        static Material MakeThemeMat(Color col)
        {
            var baseMat = AdRes.PrimMat;
            var mat = baseMat ? new Material(baseMat) : new Material(Shader.Find("Standard"));
            mat.color = col;
            return mat;
        }

        void SetupCameraAndSpaceEnvironment()
        {
            _cam = Camera.main;
            if (!_cam)
            {
                var go = new GameObject("Main Camera") { tag = "MainCamera" };
                _cam = go.AddComponent<Camera>();
            }
#if !UNITY_LUNA
            if (!_cam.GetComponent<AudioListener>())
                _cam.gameObject.AddComponent<AudioListener>();
#endif

            _cam.orthographic = false;
            _cam.fieldOfView = 50f;
            _cam.clearFlags = CameraClearFlags.SolidColor;
            bool isMidnight = backgroundTheme == BackgroundTheme.MidnightSlate;
            _cam.backgroundColor = isMidnight
                ? new Color(0.11f, 0.16f, 0.22f)
                : new Color(0.72f, 0.83f, 0.92f);
            _camBasePos = new Vector3(0f, 11.4f, -6.2f);
            _cam.transform.position = _camBasePos;
            _cam.transform.rotation = Quaternion.Euler(38f, 0f, 0f);

            // Illustrated Backdrop (MidnightBg.jpg or AlpineBg.jpg in Resources — both kept so you can switch anytime!)
            string bgResName = isMidnight ? "MidnightBg" : "AlpineBg";
            var bgTex = Resources.Load<Texture2D>(bgResName);
            if (bgTex != null)
            {
                var bgGo = new GameObject(bgResName + "Backdrop");
                bgGo.transform.SetParent(_cam.transform, false);
                bgGo.transform.localPosition = new Vector3(0f, 0f, 55f);
                bgGo.transform.localRotation = Quaternion.identity;

                var sr = bgGo.AddComponent<SpriteRenderer>();
                if (AdRes.SpriteMat) sr.sharedMaterial = AdRes.SpriteMat;
                sr.sprite = Sprite.Create(bgTex, new Rect(0, 0, bgTex.width, bgTex.height), new Vector2(0.5f, 0.5f), 100f);
                sr.color = Color.white;
                sr.sortingOrder = -100;

                _bgTransform = bgGo.transform;
                _bgSpriteW = bgTex.width / 100f;
                _bgSpriteH = bgTex.height / 100f;
                _lastCamAspect = -1f;
                UpdateBackdropScale();
            }
        }

        void UpdateBackdropScale()
        {
            if (!_bgTransform || !_cam) return;
            float aspect = _cam.aspect;
            if (Mathf.Abs(aspect - _lastCamAspect) < 0.001f) return;
            _lastCamAspect = aspect;

            float dist = _bgTransform.localPosition.z;
            float viewH = 2f * dist * Mathf.Tan(_cam.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float viewW = viewH * aspect;
            float sx = viewW / Mathf.Max(0.01f, _bgSpriteW);
            float sy = viewH / Mathf.Max(0.01f, _bgSpriteH);
            float fill = Mathf.Max(sx, sy) * 1.04f;
            _bgTransform.localScale = new Vector3(fill, fill, 1f);
        }

        void BuildWhiteBridge()
        {
            var bridge = new GameObject("WhiteBridge").transform;
            bridge.SetParent(transform, false);

            // Clean bright white platform matching reference
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(0f, -0.35f, 11.5f), new Vector3(6.8f, 0.70f, 24.5f), new Color(0.95f, 0.96f, 0.98f));
            // Crisp dark-slate side guardrails so the white lane pops against the snowy valley
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(-3.48f, -0.18f, 11.5f), new Vector3(0.18f, 0.52f, 24.5f), new Color(0.28f, 0.34f, 0.44f));
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(3.48f, -0.18f, 11.5f), new Vector3(0.18f, 0.52f, 24.5f), new Color(0.28f, 0.34f, 0.44f));
            // Subtle darker front ledge face
            Prims.Make(PrimitiveType.Cube, bridge, new Vector3(0f, -0.36f, -0.72f), new Vector3(6.98f, 0.68f, 0.08f), new Color(0.72f, 0.76f, 0.82f));
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

            // Stylized metallic chassis platform with dark under-frame and side rails
            Prims.Make(PrimitiveType.Cube, _cannonRoot, new Vector3(0f, 0.19f, 0f), new Vector3(1.12f, 0.10f, 1.32f), new Color(0.24f, 0.26f, 0.32f));
            Prims.Make(PrimitiveType.Cube, _cannonRoot, new Vector3(0f, 0.27f, 0f), new Vector3(1.04f, 0.14f, 1.24f), new Color(0.62f, 0.66f, 0.74f));
            Prims.Make(PrimitiveType.Cube, _cannonRoot, new Vector3(-0.46f, 0.36f, 0f), new Vector3(0.10f, 0.08f, 1.18f), new Color(0.38f, 0.16f, 0.78f));
            Prims.Make(PrimitiveType.Cube, _cannonRoot, new Vector3(0.46f, 0.36f, 0f), new Vector3(0.10f, 0.08f, 1.18f), new Color(0.38f, 0.16f, 0.78f));

            // 4 Chunky Rubber Wheels with Metallic Rims & Purple Center Caps
            Vector3[] wheelOffsets =
            {
                new Vector3(-0.60f, 0.25f, -0.45f),
                new Vector3(0.60f, 0.25f, -0.45f),
                new Vector3(-0.60f, 0.25f, 0.45f),
                new Vector3(0.60f, 0.25f, 0.45f)
            };
            foreach (var wo in wheelOffsets)
            {
                var wRoot = new GameObject("Wheel").transform;
                wRoot.SetParent(_cannonRoot, false);
                wRoot.localPosition = wo;

                var tire = Prims.Make(PrimitiveType.Cylinder, wRoot, Vector3.zero, new Vector3(0.50f, 0.12f, 0.50f), new Color(0.14f, 0.15f, 0.18f));
                tire.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                var rim = Prims.Make(PrimitiveType.Cylinder, wRoot, Vector3.zero, new Vector3(0.30f, 0.135f, 0.30f), new Color(0.76f, 0.80f, 0.86f));
                rim.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                var cap = Prims.Make(PrimitiveType.Cylinder, wRoot, Vector3.zero, new Vector3(0.14f, 0.15f, 0.14f), PurpleMain);
                cap.transform.localRotation = Quaternion.Euler(0f, 0f, 90f);
                _cannonWheels.Add(wRoot);
            }

            // Glossy Purple Cannon Barrel with power rings, flared muzzle & inner bore
            _cannonBarrel = new GameObject("PurpleBarrel").transform;
            _cannonBarrel.SetParent(_cannonRoot, false);
            _cannonBarrel.localPosition = new Vector3(0f, 0.58f, -0.15f);
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

            var mainTube = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 0.42f), new Vector3(0.78f, 0.64f, 0.78f), PurpleMain);
            mainTube.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            // Metallic mid power band + light purple highlight stripe
            var midRing = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 0.42f), new Vector3(0.84f, 0.09f, 0.84f), new Color(0.88f, 0.78f, 1f));
            midRing.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            var stripe = Prims.Make(PrimitiveType.Cube, _cannonBarrel, new Vector3(0f, 0.36f, 0.42f), new Vector3(0.22f, 0.08f, 1.08f), PurpleLight);
            var rearSphere = Prims.Make(PrimitiveType.Sphere, _cannonBarrel, new Vector3(0f, 0f, -0.18f), new Vector3(0.88f, 0.88f, 0.88f), PurpleMain);
            var rearCap = Prims.Make(PrimitiveType.Sphere, _cannonBarrel, new Vector3(0f, 0f, -0.52f), new Vector3(0.32f, 0.32f, 0.32f), new Color(0.95f, 0.82f, 0.22f));
            var muzzleRing = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 1.04f), new Vector3(0.92f, 0.10f, 0.92f), PurpleLight);
            muzzleRing.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);
            var muzzleBore = Prims.Make(PrimitiveType.Cylinder, _cannonBarrel, new Vector3(0f, 0f, 1.11f), new Vector3(0.62f, 0.04f, 0.62f), new Color(0.08f, 0.04f, 0.14f));
            muzzleBore.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);

            _muzzleFlash = Prims.Make(PrimitiveType.Sphere, _cannonBarrel, new Vector3(0f, 0f, 1.22f), Vector3.zero, PurpleLight).transform;
            Prims.Make(PrimitiveType.Sphere, _muzzleFlash, new Vector3(0f, 0f, 0.14f), Vector3.one * 0.62f, Color.white);
        }

        void BuildGatesAndYellowBlock()
        {
            // 1. Front Sliding Gate (z = 3.65f, slides from left to right across the bridge!)
            CreateGate(0, Mathf.Max(2, frontGateMultiplier), -0.4f, 3.65f, 1.15f, 1.85f, 1.35f, 0.2f);

            // 2. Left Stationary Gate (z = 5.45f, x = -1.95f)
            CreateGate(1, Mathf.Max(2, leftGateMultiplier), -1.95f, 5.45f, 1.25f, 0.0f, 0f, 0f);

            // 3. Right Lane Yellow Destructible Block ("60" HP at z = 5.85f, x = 1.85f)
            // Automatically uses Poly Pizza "Cube Bricks" FBX if placed at Assets/MobControl/Resources/Models/CubeBricks.fbx,
            // tinted bright yellow; otherwise renders a stylized 3D yellow brick block!
            _yellowBlockHp = yellowBlockStartHp;
            _yellowBlockRoot = new GameObject("YellowBlock_60").transform;
            _yellowBlockRoot.SetParent(transform, false);
            _yellowBlockRoot.localPosition = new Vector3(1.85f, 0f, 5.85f);

            var brickPrefab = Resources.Load<GameObject>("Models/CubeBricks");
            if (brickPrefab != null)
            {
                var inst = Instantiate(brickPrefab, _yellowBlockRoot);
                inst.name = "CubeBricks_Model";
                inst.transform.localPosition = Vector3.zero;
                inst.transform.localRotation = Quaternion.identity;
                inst.transform.localScale = Vector3.one;

                var rends = inst.GetComponentsInChildren<Renderer>();
                Bounds b = new Bounds(inst.transform.position, Vector3.zero);
                bool hasBounds = false;
                for (int i = 0; i < rends.Length; i++)
                {
                    if (AdRes.PrimMat) rends[i].sharedMaterial = AdRes.PrimMat;
                    Prims.SetColor(rends[i], YellowMain);
                    if (!hasBounds) { b = rends[i].bounds; hasBounds = true; }
                    else b.Encapsulate(rends[i].bounds);
                }
                if (hasBounds && b.size.x > 0.001f && b.size.y > 0.001f && b.size.z > 0.001f)
                {
                    Vector3 targetSize = new Vector3(2.75f, 1.44f, 1.65f);
                    Vector3 scale = new Vector3(targetSize.x / b.size.x, targetSize.y / b.size.y, targetSize.z / b.size.z);
                    inst.transform.localScale = scale;
                    Vector3 localCenter = _yellowBlockRoot.InverseTransformPoint(b.center);
                    inst.transform.localPosition = new Vector3(-localCenter.x * scale.x, targetSize.y * 0.5f - localCenter.y * scale.y, -localCenter.z * scale.z);
                }
            }
            else
            {
                // Stylized 3D brick wall fallback (recessed dark mortar core + beveled bricks, themed to Yellow or Red)
                bool isBlueRed = backgroundTheme == BackgroundTheme.MidnightSlate;
                Color mortarCol = isBlueRed ? new Color(0.42f, 0.05f, 0.08f) : new Color(0.56f, 0.42f, 0.04f);
                Color brickHi = isBlueRed ? new Color(1.00f, 0.38f, 0.38f) : new Color(1f, 0.92f, 0.30f);
                Prims.Make(PrimitiveType.Cube, _yellowBlockRoot, new Vector3(0f, 0.72f, 0f), new Vector3(2.64f, 1.32f, 1.54f), mortarCol);
                for (int row = 0; row < 3; row++)
                {
                    float y = 0.25f + row * 0.47f;
                    bool stagger = (row % 2) == 1;
                    int cols = stagger ? 4 : 3;
                    float brickW = stagger ? 0.64f : 0.86f;
                    float span = (cols - 1) * (brickW + 0.06f);
                    for (int col = 0; col < cols; col++)
                    {
                        float bx = -span * 0.5f + col * (brickW + 0.06f);
                        Color bc = ((row + col) % 2 == 0) ? YellowMain : brickHi;
                        Prims.Make(PrimitiveType.Cube, _yellowBlockRoot, new Vector3(bx, y, 0f), new Vector3(brickW, 0.41f, 1.66f), bc);
                    }
                }
            }
            _yellowBlockLabel = AdRes.MakeLabel(_yellowBlockRoot, _yellowBlockHp.ToString(), 0.95f, Color.white, 25, new Vector3(0f, 0.72f, -0.90f));

            // 4. Right Lane Gate right behind the Yellow Block (z = 8.15f, x = 1.65f)
            CreateGate(2, Mathf.Max(2, rightGateMultiplier), 1.65f, 8.15f, 1.25f, 0.0f, 0f, 0f);
        }

        void CreateGate(int bitIndex, int mult, float x, float z, float halfWidth, float moveAmp, float moveSpeed, float phaseOffset)
        {
            var root = new GameObject("Gate_X" + mult).transform;
            root.SetParent(transform, false);
            root.localPosition = new Vector3(x, 0f, z);

            float fullW = halfWidth * 2f;
            Color frameDark = new Color(0.16f, 0.14f, 0.24f);
            Color capGlow = new Color(0.84f, 0.62f, 1.00f);

            // Stylized rounded-cap pillars + base bar + glowing neon trim
            Prims.Make(PrimitiveType.Cylinder, root, new Vector3(-halfWidth, 0.60f, 0f), new Vector3(0.22f, 0.60f, 0.22f), frameDark);
            Prims.Make(PrimitiveType.Cylinder, root, new Vector3(halfWidth, 0.60f, 0f), new Vector3(0.22f, 0.60f, 0.22f), frameDark);
            Prims.Make(PrimitiveType.Sphere, root, new Vector3(-halfWidth, 1.22f, 0f), Vector3.one * 0.26f, capGlow);
            Prims.Make(PrimitiveType.Sphere, root, new Vector3(halfWidth, 1.22f, 0f), Vector3.one * 0.26f, capGlow);
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.08f, 0f), new Vector3(fullW + 0.22f, 0.16f, 0.24f), frameDark);
            // Glowing bottom & top neon trim bars
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.16f, -0.06f), new Vector3(fullW - 0.12f, 0.08f, 0.12f), Color.white);
            Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 1.12f, -0.04f), new Vector3(fullW - 0.12f, 0.07f, 0.10f), capGlow);

            // Glowing purple energy gate shield
            var shieldGo = Prims.Make(PrimitiveType.Cube, root, new Vector3(0f, 0.64f, 0f), new Vector3(fullW - 0.14f, 0.96f, 0.06f), PurpleGateCol);
            var label = AdRes.MakeLabel(root, "X" + mult, 0.82f, Color.white, 24, new Vector3(0f, 0.64f, -0.10f));

            _gates.Add(new MultiplierGate
            {
                root = root,
                label = label,
                shieldRenderer = shieldGo.GetComponent<Renderer>(),
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

            // Stylized Two-Tier Yellow Fortress Castle with plinth, battlements & framed gate
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.10f, 0f), new Vector3(2.72f, 0.20f, 2.12f), YellowDark);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.92f, 0f), new Vector3(2.48f, 1.66f, 1.88f), YellowMain);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 2.28f, 0f), new Vector3(2.72f, 1.24f, 2.10f), YellowMain);
            // Castle battlements / crenellations along top rim
            for (int bx = -1; bx <= 1; bx++)
            {
                Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(bx * 0.96f, 3.04f, -0.84f), new Vector3(0.56f, 0.34f, 0.38f), YellowMain);
                Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(bx * 0.96f, 3.04f, 0.84f), new Vector3(0.56f, 0.34f, 0.38f), YellowDark);
            }
            // Dark horizontal trim band between tiers
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 1.68f, -0.96f), new Vector3(2.54f, 0.16f, 0.14f), new Color(0.28f, 0.22f, 0.06f));
            // Framed dark spawn doorway at bottom center
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.60f, -0.95f), new Vector3(0.96f, 1.20f, 0.10f), YellowDark);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 0.56f, -0.98f), new Vector3(0.74f, 1.08f, 0.10f), new Color(0.14f, 0.10f, 0.06f));
            // Crisp dark-slate scoreboard plate with bright yellow bezel
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 2.28f, -1.04f), new Vector3(2.02f, 0.96f, 0.08f), YellowDark);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0f, 2.28f, -1.08f), new Vector3(1.86f, 0.82f, 0.08f), new Color(0.16f, 0.14f, 0.22f));

            _enemyBaseLabel = AdRes.MakeLabel(_enemyBaseRoot, _enemyBaseHp.ToString(), 0.82f, Color.white, 26, new Vector3(0f, 2.28f, -1.16f));

            // Metallic flagpole with golden finial + yellow banner flag on top
            Prims.Make(PrimitiveType.Cylinder, _enemyBaseBody, new Vector3(0f, 3.72f, 0f), new Vector3(0.11f, 0.88f, 0.11f), new Color(0.22f, 0.22f, 0.28f));
            Prims.Make(PrimitiveType.Sphere, _enemyBaseBody, new Vector3(0f, 4.60f, 0f), Vector3.one * 0.20f, YellowMain);
            Prims.Make(PrimitiveType.Cube, _enemyBaseBody, new Vector3(0.48f, 4.22f, 0f), new Vector3(0.92f, 0.50f, 0.08f), YellowMain);
        }

        void BuildUI()
        {
            _ui = AdUI.Create("MOB CONTROL", ctaText, new Color(0.14f, 0.08f, 0.28f), new Color(1f, 0.86f, 0.22f));
            _ui.SetTutorialText(tutorialText);
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

            // Theme-matched UI palette (AlpineWinter: Purple/Yellow | MidnightSlate: Electric Blue/Crimson Red)
            bool isBlueRed = backgroundTheme == BackgroundTheme.MidnightSlate;
            Color mobFill = isBlueRed ? new Color(0.10f, 0.50f, 0.96f, 1f) : new Color(0.36f, 0.14f, 0.90f, 1f);
            Color mobShadow = isBlueRed ? new Color(0.03f, 0.18f, 0.46f, 1f) : new Color(0.16f, 0.04f, 0.44f, 1f);
            Color stageFill = isBlueRed ? new Color(0.18f, 0.72f, 0.88f, 1f) : new Color(1f, 0.72f, 0.10f, 1f);
            Color stageShadow = isBlueRed ? new Color(0.05f, 0.28f, 0.42f, 1f) : new Color(0.54f, 0.30f, 0.02f, 1f);
            Color baseFill = isBlueRed ? new Color(0.95f, 0.20f, 0.24f, 1f) : new Color(0.95f, 0.24f, 0.28f, 1f);
            Color baseShadow = isBlueRed ? new Color(0.46f, 0.04f, 0.08f, 1f) : new Color(0.48f, 0.05f, 0.08f, 1f);

            // Left: Cartoon Mob Count Pill (same font size 44 + generous padding + theme-matched dark shadow)
            AdUI.Img(trt, AdRes.Round(64), mobShadow, center, new Vector2(-330f, -10f), new Vector2(304f, 114f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(-330f, 0f), new Vector2(292f, 102f), true);
            AdUI.Img(trt, AdRes.Round(64), mobFill, center, new Vector2(-330f, 0f), new Vector2(278f, 88f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.26f), center, new Vector2(-330f, 22f), new Vector2(236f, 24f), true);
            _topBlueMobsText = AdUI.Txt(trt, "MOBS: 0", 44, Color.white, center, new Vector2(-330f, -1f));
            _topBlueMobsText.resizeTextForBestFit = false;
            var mobOut = _topBlueMobsText.GetComponent<Outline>();
            if (mobOut) { mobOut.effectColor = mobShadow; mobOut.effectDistance = new Vector2(3.5f, -3.5f); }

            // Center: Cartoon Stage Pill (same font size 44 + generous padding + theme-matched dark shadow)
            AdUI.Img(trt, AdRes.Round(64), stageShadow, center, new Vector2(0f, -10f), new Vector2(304f, 114f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(0f, 0f), new Vector2(292f, 102f), true);
            AdUI.Img(trt, AdRes.Round(64), stageFill, center, new Vector2(0f, 0f), new Vector2(278f, 88f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.34f), center, new Vector2(0f, 22f), new Vector2(236f, 24f), true);
            var stageLbl = AdUI.Txt(trt, "STAGE 1", 44, Color.white, center, new Vector2(0f, -1f));
            stageLbl.resizeTextForBestFit = false;
            var stageOut = stageLbl.GetComponent<Outline>();
            if (stageOut) { stageOut.effectColor = stageShadow; stageOut.effectDistance = new Vector2(3.5f, -3.5f); }

            // Right: Cartoon Enemy Base HP Pill (same font size 44 + generous padding + theme-matched dark shadow)
            AdUI.Img(trt, AdRes.Round(64), baseShadow, center, new Vector2(330f, -10f), new Vector2(304f, 114f), true);
            AdUI.Img(trt, AdRes.Round(64), Color.white, center, new Vector2(330f, 0f), new Vector2(292f, 102f), true);
            AdUI.Img(trt, AdRes.Round(64), baseFill, center, new Vector2(330f, 0f), new Vector2(278f, 88f), true);
            AdUI.Img(trt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.28f), center, new Vector2(330f, 22f), new Vector2(236f, 24f), true);
            _topEnemyBaseText = AdUI.Txt(trt, "BASE: " + enemyBaseStartHp, 44, Color.white, center, new Vector2(330f, -1f));
            _topEnemyBaseText.resizeTextForBestFit = false;
            var baseOut = _topEnemyBaseText.GetComponent<Outline>();
            if (baseOut) { baseOut.effectColor = baseShadow; baseOut.effectDistance = new Vector2(3.5f, -3.5f); }

            // =========================================================================
            // CARTOON ART STYLE END CARD OVERLAY (Theme-matched dark shadows, no black!)
            // =========================================================================
            _endOverlayRoot = new GameObject("MobControlEndOverlay", typeof(RectTransform));
            var ort = (RectTransform)_endOverlayRoot.transform;
            ort.SetParent(_ui.Root, false);
            ort.anchorMin = Vector2.zero;
            ort.anchorMax = Vector2.one;
            ort.offsetMin = Vector2.zero;
            ort.offsetMax = Vector2.zero;
            _endOverlayRoot.AddComponent<Image>().color = isBlueRed
                ? new Color(0.03f, 0.08f, 0.20f, 0.56f)
                : new Color(0.08f, 0.04f, 0.22f, 0.54f);

            // Top Official MOB CONTROL Logo Image (loaded from Resources/MobControlLogo.png)
            var logoTex = Resources.Load<Texture2D>("MobControlLogo");
            if (logoTex != null)
            {
                var logoGo = new GameObject("MobControlLogoImg", typeof(RectTransform), typeof(Image));
                var lrt = (RectTransform)logoGo.transform;
                lrt.SetParent(ort, false);
                lrt.anchorMin = center;
                lrt.anchorMax = center;
                lrt.anchoredPosition = new Vector2(0f, 545f);
                lrt.sizeDelta = new Vector2(780f, 435f);
                var limg = logoGo.GetComponent<Image>();
                limg.sprite = Sprite.Create(logoTex, new Rect(0, 0, logoTex.width, logoTex.height), new Vector2(0.5f, 0.5f), 100f);
                limg.preserveAspect = true;
                limg.raycastTarget = false;
            }

            // Tilted Juicy Cartoon "DEFEAT..." / "VICTORY!" Center Card (theme-matched high contrast!)
            var defWrap = new GameObject("DefeatBanner", typeof(RectTransform));
            _defeatBannerRt = (RectTransform)defWrap.transform;
            _defeatBannerRt.SetParent(ort, false);
            _defeatBannerRt.anchorMin = center;
            _defeatBannerRt.anchorMax = center;
            _defeatBannerRt.anchoredPosition = new Vector2(0f, 80f);
            _defeatBannerRt.sizeDelta = new Vector2(960f, 340f);
            _defeatBannerRt.localRotation = Quaternion.Euler(0f, 0f, 3.0f);

            Color cardShadow = isBlueRed ? new Color(0.03f, 0.14f, 0.38f, 1f) : new Color(0.16f, 0.04f, 0.42f, 1f);
            Color cardBorder = isBlueRed ? new Color(1f, 0.30f, 0.32f, 1f) : new Color(1f, 0.88f, 0.18f, 1f);
            Color cardFill   = isBlueRed ? new Color(0.08f, 0.34f, 0.78f, 1f) : new Color(0.32f, 0.09f, 0.72f, 1f);
            Color titleStroke = isBlueRed ? new Color(0.46f, 0.04f, 0.08f, 1f) : new Color(0.24f, 0.04f, 0.48f, 1f);

            AdUI.Img(_defeatBannerRt, AdRes.Round(64), cardShadow, center, new Vector2(0f, -18f), new Vector2(944f, 304f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), cardBorder, center, Vector2.zero, new Vector2(920f, 282f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), cardFill, center, Vector2.zero, new Vector2(894f, 256f), true);
            AdUI.Img(_defeatBannerRt, AdRes.Round(64), new Color(1f, 1f, 1f, 0.16f), center, new Vector2(0f, 76f), new Vector2(820f, 68f), true);

            _defeatTitleText = AdUI.Txt(_defeatBannerRt, defeatTitle, 136, new Color(1f, 0.88f, 0.14f), center, new Vector2(0f, 30f));
            var outline = _defeatTitleText.GetComponent<Outline>();
            if (outline)
            {
                outline.effectColor = titleStroke;
                outline.effectDistance = new Vector2(8f, -8f);
            }

            _endSubText = AdUI.Txt(_defeatBannerRt, defeatSubtitle, 52, isBlueRed ? Color.white : new Color(1f, 0.96f, 0.62f), center, new Vector2(0f, -82f));
            var subOut = _endSubText.GetComponent<Outline>();
            if (subOut) { subOut.effectColor = cardShadow; subOut.effectDistance = new Vector2(4.5f, -4.5f); }

            // Configurable Cartoon / Sharp 3D Glossy CTA Button (Text, Color & Rounded/Sharp Shape via Playworks Playground!)
            var ctaGo = new GameObject("PlayNowCTA", typeof(RectTransform));
            _playNowBtnRt = (RectTransform)ctaGo.transform;
            _playNowBtnRt.SetParent(ort, false);
            _playNowBtnRt.anchorMin = center;
            _playNowBtnRt.anchorMax = center;
            _playNowBtnRt.anchoredPosition = new Vector2(0f, -455f);
            _playNowBtnRt.sizeDelta = new Vector2(740f, 210f);

            GetCtaPalette(ctaColor, out Color ctaMain, out Color ctaBevel, out Color ctaShadow, out Color ctaTextCol);
            bool ctaSliced = ctaShape == CtaButtonShape.Rounded;
            Sprite ctaSprite = ctaSliced ? AdRes.Round(64) : AdRes.Square;

            AdUI.Img(_playNowBtnRt, ctaSprite, ctaShadow, center, new Vector2(0f, -18f), new Vector2(736f, 204f), ctaSliced);
            AdUI.Img(_playNowBtnRt, ctaSprite, Color.white, center, new Vector2(0f, 0f), new Vector2(716f, 186f), ctaSliced);
            AdUI.Img(_playNowBtnRt, ctaSprite, ctaBevel, center, new Vector2(0f, -10f), new Vector2(694f, 166f), ctaSliced);
            AdUI.Img(_playNowBtnRt, ctaSprite, ctaMain, center, new Vector2(0f, 6f), new Vector2(690f, 158f), ctaSliced);
            AdUI.Img(_playNowBtnRt, ctaSprite, new Color(1f, 1f, 1f, 0.34f), center, new Vector2(0f, 48f), new Vector2(620f, 44f), ctaSliced);
            string ctaDisplay = string.IsNullOrEmpty(ctaText) ? "PLAY NOW!" : (ctaText.EndsWith("!") ? ctaText : ctaText + "!");
            var ctaLbl = AdUI.Txt(_playNowBtnRt, ctaDisplay, 92, ctaTextCol, center, new Vector2(0f, 6f));
            var ctaOut = ctaLbl.GetComponent<Outline>();
            if (ctaOut) { ctaOut.effectColor = ctaShadow; ctaOut.effectDistance = new Vector2(6f, -6f); }

            var fullBtn = _endOverlayRoot.AddComponent<Button>();
            fullBtn.onClick.AddListener(() => StoreLink.Open(MobControlStoreUrl));
            _endOverlayRoot.SetActive(false);
        }

        static void GetCtaPalette(CtaButtonColor col, out Color main, out Color bevel, out Color shadow, out Color txt)
        {
            txt = Color.white;
            switch (col)
            {
                case CtaButtonColor.Blue:
                    main = new Color(0.14f, 0.62f, 1.00f, 1f);
                    bevel = new Color(0.06f, 0.36f, 0.74f, 1f);
                    shadow = new Color(0.03f, 0.18f, 0.44f, 1f);
                    break;
                case CtaButtonColor.Yellow:
                    main = new Color(1.00f, 0.80f, 0.12f, 1f);
                    bevel = new Color(0.78f, 0.50f, 0.04f, 1f);
                    shadow = new Color(0.46f, 0.24f, 0.02f, 1f);
                    break;
                case CtaButtonColor.Red:
                    main = new Color(0.96f, 0.22f, 0.26f, 1f);
                    bevel = new Color(0.68f, 0.08f, 0.12f, 1f);
                    shadow = new Color(0.42f, 0.04f, 0.08f, 1f);
                    break;
                case CtaButtonColor.Purple:
                    main = new Color(0.56f, 0.20f, 0.98f, 1f);
                    bevel = new Color(0.34f, 0.08f, 0.68f, 1f);
                    shadow = new Color(0.18f, 0.04f, 0.42f, 1f);
                    break;
                default: // Green
                    main = new Color(0.24f, 0.92f, 0.36f, 1f);
                    bevel = new Color(0.08f, 0.56f, 0.20f, 1f);
                    shadow = new Color(0.04f, 0.34f, 0.11f, 1f);
                    break;
            }
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
            GameObject customPrefab = (characterStyle == CharacterStyle.StylizedModels)
                ? (isPurple ? _purpleMobPrefab : _yellowMobPrefab)
                : null;

            if (customPrefab != null)
            {
                var inst = Instantiate(customPrefab, body);
                inst.transform.localPosition = Vector3.zero;
                inst.transform.localRotation = Quaternion.identity;
                // Quaternius FBX characters are ~1.9-2.0m tall with feet at y=0; fixed scale avoids
                // frame-0 SkinnedMeshRenderer bounds glitches under Legacy Animation!
                float modelScale = isPurple ? 0.62f : 0.58f;
                inst.transform.localScale = Vector3.one * modelScale;

                // Play the embedded Quaternius "CharacterArmature|Run" skeletal animation clip!
                var runClip = isPurple ? _purpleRunClip : _yellowRunClip;
                if (runClip != null)
                {
                    var anim = inst.GetComponent<Animation>();
                    if (!anim) anim = inst.AddComponent<Animation>();
                    anim.playAutomatically = false;
                    anim.cullingType = AnimationCullingType.AlwaysAnimate;
                    anim.AddClip(runClip, "Run");
                    var st = anim["Run"];
                    if (st != null)
                    {
                        st.wrapMode = WrapMode.Loop;
                        st.speed = isPurple ? 1.45f : 1.15f;
                        st.time = Random.Range(0f, Mathf.Max(0.01f, runClip.length));
                    }
                    anim.Play("Run");
                    anim.Sample();
                    unit.hasSkeletalRun = true;
                }

                var rends = inst.GetComponentsInChildren<Renderer>(true);
                // Multi-tone theme shading per material slot:
                // - Friendly (DgOCW9ZCRJ): all clothes/body in harmonious purple (or electric blue) tones
                // - Enemy (RRliSQBP7r Alien): preserve Eye_Black & Eye_White, paint Alien_Main/Secondary/Tongue bright yellow (or red)
                for (int i = 0; i < rends.Length; i++)
                {
                    var r = rends[i];
                    if (r is SkinnedMeshRenderer smr)
                        smr.updateWhenOffscreen = true;
                    unit.renderers.Add(r);
                    var mats = r.sharedMaterials;
                    if (isPurple)
                    {
                        for (int m = 0; m < mats.Length; m++)
                        {
                            string mn = mats[m] != null ? mats[m].name.ToLowerInvariant() : "";
                            if (mn.Contains("eye") || mn.Contains("pupil"))
                                mats[m] = _matFriendlyDeep;
                            else if (mn.Contains("pants") || mn.Contains("boots") || mn.Contains("hair"))
                                mats[m] = _matFriendlyDark;
                            else if (mn.Contains("skin") || mn.Contains("detail") || mn.Contains("white"))
                                mats[m] = _matFriendlyLight;
                            else
                                mats[m] = _matFriendlyMain;
                        }
                        r.sharedMaterials = mats;
                    }
                    else
                    {
                        if (IsEyeMesh(r)) continue;
                        for (int m = 0; m < mats.Length; m++)
                        {
                            string mn = mats[m] != null ? mats[m].name : "";
                            if (IsEyeName(mn)) continue; // Keep Eye_Black & Eye_White untouched!
                            string low = mn.ToLowerInvariant();
                            mats[m] = (low.Contains("secondary") || low.Contains("tongue"))
                                ? _matEnemyAccent
                                : _matEnemyMain;
                        }
                        r.sharedMaterials = mats;
                    }
                }
            }
            else
            {
                // Classic Mob Control Glossy 3D Rounded Stickman
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
            }

            if (isPurple) _purpleMobs.Add(unit);
            else _yellowMobs.Add(unit);
            return unit;
        }

        static AnimationClip FindRunClip(string resourcePath)
        {
            var clips = Resources.LoadAll<AnimationClip>(resourcePath);
            if (clips == null || clips.Length == 0) return null;
            AnimationClip walkFallback = null;
            for (int i = 0; i < clips.Length; i++)
            {
                if (!clips[i]) continue;
                string low = clips[i].name.ToLowerInvariant();
                if (low.Contains("run")) return clips[i];
                if (low.Contains("walk") && walkFallback == null) walkFallback = clips[i];
            }
            return walkFallback != null ? walkFallback : clips[0];
        }

        static bool IsEyeName(string n)
        {
            if (string.IsNullOrEmpty(n)) return false;
            string low = n.ToLowerInvariant();
            return low.Contains("eye") || low.Contains("pupil") || low.Contains("iris") || low.Contains("cornea");
        }

        static bool IsEyeMesh(Renderer r)
        {
            if (!r) return false;
            if (IsEyeName(r.name)) return true;
            var mats = r.sharedMaterials;
            if (mats != null && mats.Length == 1 && mats[0] != null && IsEyeName(mats[0].name))
                return true;
            return false;
        }

        void SetStickmanColor(StickmanUnit u, Color c)
        {
            bool isGray = Mathf.Abs(c.r - GrayCorpse.r) < 0.02f && Mathf.Abs(c.g - GrayCorpse.g) < 0.02f;
            for (int i = 0; i < u.renderers.Count; i++)
            {
                var r = u.renderers[i];
                if (!r) continue;
                // On clash/death, turn EVERY mesh & material slot (including Eye_Black & Eye_White!) completely solid gray
                if (isGray && _matGrayCorpse != null)
                {
                    var mats = r.sharedMaterials;
                    for (int m = 0; m < mats.Length; m++) mats[m] = _matGrayCorpse;
                    r.sharedMaterials = mats;
                }
                else
                {
                    Prims.SetColor(r, c);
                }
            }
        }

        void Update()
        {
            float dt = Time.deltaTime;
            _ui?.Tick(dt);
            UpdateBackdropScale();

            if (_topBlueMobsText) _topBlueMobsText.text = "MOBS: " + _purpleMobs.Count;
            if (_topEnemyBaseText) _topEnemyBaseText.text = "BASE: " + _enemyBaseHp;

            if (_climaxTriggered)
            {
                _climaxTimer += dt;
                UpdateSmokePuffs(dt);
                UpdateRings(dt);
                UpdateSparks(dt);
                UpdateCameraShake(dt);
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
            UpdateRings(dt);
            UpdateSparks(dt);
            UpdateCameraShake(dt);

            // Trigger DEFEAT... climax when roundDuration expires if still battling
            if (_elapsedTime >= Mathf.Max(8f, roundDuration) && !_climaxTriggered)
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
                    Luna.Unity.Analytics.LogEvent("mobcontrol_first_drag", 1);
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

            _barrelRecoil = Mathf.MoveTowards(_barrelRecoil, 0f, dt * 4.5f);
            _cannonBarrel.localPosition = new Vector3(0f, 0.58f, -0.15f - _barrelRecoil * 0.26f);
            float squash = 1f + _barrelRecoil * 0.14f;
            float stretch = 1f - _barrelRecoil * 0.12f;
            _cannonBarrel.localScale = new Vector3(squash, squash, stretch);
            _muzzleFlash.localScale = Vector3.one * (_barrelRecoil * 0.72f);
        }

        void FirePurpleStickman()
        {
            _barrelRecoil = 1f;
            Sfx.Play(Sfx.Id.Pop, 0.32f);

            Vector3 spawnPos = new Vector3(Mathf.Clamp(_cannonX + Random.Range(-0.10f, 0.10f), -2.85f, 2.85f), 0f, 2.35f);
            SpawnStickman(true, spawnPos, 0);
            Vector3 muzzleWorld = new Vector3(_cannonX, 0.62f, 2.32f);
            SpawnWhiteSmoke(muzzleWorld, 2, PurpleLight);
            SpawnRing(muzzleWorld, 1.35f, new Color(0.90f, 0.72f, 1f, 0.92f), 0.22f, 0f);
            SpawnSparks(muzzleWorld, 3, Color.white, 3.6f, false);
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
                    float s = 1f + Mathf.Sin(g.punchTimer * Mathf.PI) * 0.18f;
                    g.root.localScale = new Vector3(s, s, 1f);
                    if (g.shieldRenderer)
                        Prims.SetColor(g.shieldRenderer, Color.Lerp(PurpleGateCol, Color.white, g.punchTimer * 0.72f));
                }
                else
                {
                    g.root.localScale = Vector3.one;
                    if (g.shieldRenderer)
                        Prims.SetColor(g.shieldRenderer, PurpleGateCol);
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
                        Vector3 exitFx = m.root.localPosition + Vector3.up * 0.45f;
                        SpawnWhiteSmoke(exitFx, 3, Color.white);
                        SpawnRing(exitFx, 1.85f, new Color(0.84f, 0.56f, 1f, 0.95f), 0.28f, 90f);
                        SpawnSparks(exitFx, 4, PurpleLight, 4.4f, false);
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
                    Vector3 entryFx = new Vector3(0f, 0.55f, TubeEntranceZ);
                    SpawnWhiteSmoke(entryFx, 2, PurpleLight);
                    SpawnRing(entryFx, 1.55f, new Color(0.86f, 0.62f, 1f, 0.92f), 0.24f, 0f);
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
                            Vector3 gateFx = new Vector3(pos.x, 0.55f, g.z);
                            SpawnWhiteSmoke(gateFx, 4, Color.white);
                            SpawnRing(gateFx, 1.95f, new Color(0.88f, 0.70f, 1f, 0.95f), 0.28f, 0f);
                            SpawnSparks(gateFx, 5, Color.white, 4.6f, false);
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

                        Vector3 clashPos = (pp + yp) * 0.5f + Vector3.up * 0.55f;
                        SpawnSparks(clashPos, 3, new Color(1f, 0.94f, 0.48f), 4.2f, false);
                        if (_sfxHitCooldown <= 0f)
                        {
                            _sfxHitCooldown = 0.08f;
                            SpawnRing(clashPos, 1.55f, new Color(1f, 0.95f, 0.65f, 0.90f), 0.22f, 90f);
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
            u.body.localScale = Vector3.one * popScale;

            // Real skeletal Run clip is driving the FBX limbs — don't add fake sideways wobble!
            if (u.hasSkeletalRun)
            {
                u.body.localPosition = Vector3.zero;
                u.body.localRotation = Quaternion.identity;
                return;
            }

            float cyc = _elapsedTime * 16f + u.phase;
            float bob = Mathf.Abs(Mathf.Sin(cyc)) * 0.10f;
            float swing = Mathf.Sin(cyc) * 38f;

            u.body.localPosition = new Vector3(0f, bob, 0f);
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
            SpawnSparks(hitPos + Vector3.up * 0.55f, 4, YellowMain, 4.8f, true);

            if (_sfxHitCooldown <= 0f)
            {
                _sfxHitCooldown = 0.07f;
                SpawnRing(hitPos + Vector3.up * 0.55f, 1.65f, new Color(1f, 0.92f, 0.36f, 0.92f), 0.24f, 0f);
                Sfx.Play(Sfx.Id.Hit, 0.45f);
            }

            if (_yellowBlockHp <= 0)
            {
                _yellowBlockDestroyed = true;
                Sfx.Play(Sfx.Id.Glass, 0.8f);
                Vector3 burstPos = _yellowBlockRoot.localPosition + Vector3.up * 0.75f;
                SpawnWhiteSmoke(burstPos, 10, YellowMain);
                SpawnSparks(burstPos, 18, YellowMain, 7.2f, true);
                SpawnSparks(burstPos, 10, Color.white, 6.0f, false);
                SpawnRing(burstPos, 4.6f, new Color(1f, 0.92f, 0.30f, 0.98f), 0.42f, 90f);
                TriggerCameraShake(0.28f, 0.20f);
                Destroy(_yellowBlockRoot.gameObject);
            }
        }

        void DamageEnemyBase(int dmg, Vector3 hitPos)
        {
            _enemyBaseHp = Mathf.Max(0, _enemyBaseHp - dmg);
            _enemyBaseHitPunch = 1f;
            if (_enemyBaseLabel) _enemyBaseLabel.Text = _enemyBaseHp.ToString();
            SpawnWhiteSmoke(hitPos + Vector3.up * 0.5f, 2, YellowMain);
            SpawnSparks(hitPos + Vector3.up * 0.75f, 4, new Color(1f, 0.92f, 0.36f), 5.2f, true);

            if (_sfxHitCooldown <= 0f)
            {
                _sfxHitCooldown = 0.07f;
                SpawnRing(hitPos + Vector3.up * 0.75f, 2.0f, new Color(1f, 0.90f, 0.26f, 0.95f), 0.26f, 0f);
                Sfx.Play(Sfx.Id.Stomp, 0.45f);
            }

            if (_enemyBaseHp <= 0 && !_climaxTriggered)
            {
                Vector3 winPos = _enemyBaseRoot ? _enemyBaseRoot.localPosition + Vector3.up * 1.4f : hitPos + Vector3.up * 1.2f;
                SpawnSparks(winPos, 22, YellowMain, 8.2f, true);
                SpawnSparks(winPos, 18, PurpleLight, 7.6f, false);
                SpawnRing(winPos, 6.2f, new Color(1f, 0.90f, 0.24f, 0.98f), 0.52f, 90f);
                SpawnRing(winPos + Vector3.up * 0.6f, 4.8f, new Color(0.82f, 0.52f, 1f, 0.95f), 0.44f, 0f);
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
                _defeatTitleText.text = string.IsNullOrEmpty(victoryTitle) ? "VICTORY!" : victoryTitle;
                _defeatTitleText.color = new Color(1f, 0.88f, 0.14f); // Bright yellow fill
                var vOut = _defeatTitleText.GetComponent<Outline>();
                if (vOut) { vOut.effectColor = new Color(0.06f, 0.48f, 0.16f, 1f); vOut.effectDistance = new Vector2(8f, -8f); } // Rich green stroke
            }
            if (_endSubText)
                _endSubText.text = string.IsNullOrEmpty(victorySubtitle) ? "READY FOR LEVEL 2?" : victorySubtitle;
            if (_endOverlayRoot) _endOverlayRoot.SetActive(true);
            Luna.Unity.Analytics.LogEvent("mobcontrol_victory", 1);
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
                _defeatTitleText.text = string.IsNullOrEmpty(defeatTitle) ? "DEFEAT..." : defeatTitle;
                bool isBlueRed = backgroundTheme == BackgroundTheme.MidnightSlate;
                _defeatTitleText.color = isBlueRed ? new Color(1f, 0.34f, 0.34f) : new Color(1f, 0.88f, 0.14f);
                var dOut = _defeatTitleText.GetComponent<Outline>();
                if (dOut) { dOut.effectColor = isBlueRed ? new Color(0.46f, 0.04f, 0.08f, 1f) : new Color(0.24f, 0.04f, 0.48f, 1f); dOut.effectDistance = new Vector2(8f, -8f); }
            }
            if (_endSubText)
                _endSubText.text = string.IsNullOrEmpty(defeatSubtitle) ? "CAN YOU BEAT THE BOSS?" : defeatSubtitle;
            if (_endOverlayRoot) _endOverlayRoot.SetActive(true);
            Luna.Unity.Analytics.LogEvent("mobcontrol_defeat", 1);
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

        void SpawnRing(Vector3 pos, float maxScale, Color col, float duration, float tiltX)
        {
            if (_rings.Count > 24) return;
            var sr = AdRes.Spr("RingFx", transform, AdRes.Ring, col, 35, pos, Vector2.one * 0.25f);
            sr.transform.localRotation = Quaternion.Euler(tiltX, 0f, 0f);
            _rings.Add(new RingFx
            {
                tr = sr.transform,
                sr = sr,
                baseCol = col,
                maxScale = maxScale,
                life = duration,
                maxLife = duration
            });
        }

        void UpdateRings(float dt)
        {
            for (int i = _rings.Count - 1; i >= 0; i--)
            {
                var r = _rings[i];
                r.life -= dt;
                if (r.life <= 0f || !r.tr)
                {
                    if (r.tr) Destroy(r.tr.gameObject);
                    _rings.RemoveAt(i);
                    continue;
                }
                float t = 1f - (r.life / r.maxLife);
                float easeOut = 1f - (1f - t) * (1f - t);
                float sc = Mathf.Lerp(0.28f, r.maxScale, easeOut);
                r.tr.localScale = new Vector3(sc, sc, 1f);
                if (r.sr)
                {
                    Color c = r.baseCol;
                    c.a = r.baseCol.a * (1f - t);
                    r.sr.color = c;
                }
            }
        }

        void SpawnSparks(Vector3 pos, int count, Color col, float speed, bool cubeDebris)
        {
            for (int i = 0; i < count; i++)
            {
                if (_sparks.Count > 85) return;
                float sz = cubeDebris ? Random.Range(0.14f, 0.26f) : Random.Range(0.10f, 0.18f);
                var go = Prims.Make(cubeDebris ? PrimitiveType.Cube : PrimitiveType.Sphere, transform,
                    pos + Random.insideUnitSphere * 0.16f, Vector3.one * sz, col);
                Vector3 dir = new Vector3(Random.Range(-1f, 1f), Random.Range(0.45f, 1.35f), Random.Range(-1f, 1f)).normalized;
                float dur = cubeDebris ? Random.Range(0.36f, 0.56f) : Random.Range(0.22f, 0.38f);
                _sparks.Add(new SparkFx
                {
                    tr = go.transform,
                    vel = dir * Random.Range(speed * 0.65f, speed * 1.15f),
                    spin = new Vector3(Random.Range(-420f, 420f), Random.Range(-420f, 420f), Random.Range(-420f, 420f)),
                    baseScale = sz,
                    gravity = cubeDebris ? 14.5f : 7.5f,
                    life = dur,
                    maxLife = dur
                });
            }
        }

        void UpdateSparks(float dt)
        {
            for (int i = _sparks.Count - 1; i >= 0; i--)
            {
                var sp = _sparks[i];
                sp.life -= dt;
                if (sp.life <= 0f || !sp.tr)
                {
                    if (sp.tr) Destroy(sp.tr.gameObject);
                    _sparks.RemoveAt(i);
                    continue;
                }
                sp.vel.y -= sp.gravity * dt;
                sp.tr.localPosition += sp.vel * dt;
                sp.tr.Rotate(sp.spin * dt, Space.Self);
                float frac = sp.life / sp.maxLife;
                sp.tr.localScale = Vector3.one * (sp.baseScale * frac);
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
                Vector3 shakeOffset = Random.insideUnitSphere * _shakeAmp;
                shakeOffset.z = 0f;
                _cam.transform.position = _camBasePos + shakeOffset;
            }
            else
            {
                _cam.transform.position = _camBasePos;
            }
        }
    }
}
