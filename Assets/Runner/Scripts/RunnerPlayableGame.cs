using System.Collections.Generic;
using AdKit;
using Luna.Unity;
using UnityEngine;
using UnityEngine.UI;

namespace RunnerAd
{
    /// <summary>
    /// AAA Voodoo-style 3D Hyper-Casual Runner Playable Ad ("TURBO RUNNER") — Playworks 7.2.0 certified.
    /// Feature parity with MobControlGame:
    /// - Large, high-contrast Bangers Arcade HUD (COINS, DISTANCE, HP HEARTS, SFX ON/OFF, TURBO CHARGE, JUMP button).
    /// - 1:1 Mob-Control-style direct horizontal steering + A/D/Arrows + Swipe-Up / Space / W / JUMP button.
    /// - Neon Bonus Gates (+10, X2 TURBO, SHIELD), Jump Ramps (sky coin arcs!), Moving Drones, Tall Walls, Low Hurdles.
    /// - TURBO FEVER super mode (golden aura, auto-magnet, SMASH through walls for +10 bonus, FOV surge).
    /// - 15 [LunaPlaygroundField] A/B parameters, 100% Object Pooling, zero 3D physics overhead, zero realtime shadows.
    /// </summary>
    public class RunnerPlayableGame : MonoBehaviour
    {
        public const string RunnerStoreUrl = "https://apps.apple.com/us/app/subway-surfers/id512939461";

        public enum BackgroundTheme { SunsetMetropolis = 0, CyberNeonNight = 1 }
        public enum CharacterStyle { StylizedHero = 0, ClassicRunner = 1 }
        public enum CtaButtonColor { Green = 0, Blue = 1, Yellow = 2, Red = 3, Purple = 4 }
        public enum CtaButtonShape { Rounded = 0, Sharp = 1 }

        [Header("Visual Settings")]
        [LunaPlaygroundField("Background Theme", 0, "Visual Settings")]
        public BackgroundTheme backgroundTheme = BackgroundTheme.SunsetMetropolis;

        [LunaPlaygroundField("Character Style", 1, "Visual Settings")]
        public CharacterStyle characterStyle = CharacterStyle.StylizedHero;

        [Header("Runner Settings")]
        [LunaPlaygroundField("Run Speed", 0, "Runner Settings")]
        public float baseRunSpeed = 16.5f;

        [LunaPlaygroundField("Target Distance (m)", 1, "Runner Settings")]
        public int targetDistance = 260;

        [LunaPlaygroundField("Max Lives", 2, "Runner Settings")]
        public int maxLives = 3;

        [LunaPlaygroundField("Enable Turbo Fever", 3, "Runner Settings")]
        public bool enableTurboFever = true;

        [LunaPlaygroundField("Coin Magnet Radius", 4, "Runner Settings")]
        public float coinMagnetRadius = 3.6f;

        [LunaPlaygroundField("Obstacle Density", 5, "Runner Settings")]
        public float obstacleDensity = 1.0f;

        [Header("Endcard & Localization")]
        [LunaPlaygroundField("CTA Button Text", 0, "Endcard & Localization")]
        public string ctaText = "PLAY NOW";

        [LunaPlaygroundField("Victory Title", 1, "Endcard & Localization")]
        public string victoryTitle = "VICTORY!";

        [LunaPlaygroundField("Victory Subtitle", 2, "Endcard & Localization")]
        public string victorySubtitle = "CAN YOU BEAT LEVEL 2?";

        [LunaPlaygroundField("Defeat Title", 3, "Endcard & Localization")]
        public string defeatTitle = "SO CLOSE!";

        [LunaPlaygroundField("Defeat Subtitle", 4, "Endcard & Localization")]
        public string defeatSubtitle = "TRY AGAIN & UNLOCK TURBO!";

        [LunaPlaygroundField("Tutorial Text", 5, "Endcard & Localization")]
        public string tutorialText = "< DRAG TO STEER • TAP JUMP >";

        [LunaPlaygroundField("CTA Button Color", 6, "Endcard & Localization")]
        public CtaButtonColor ctaColor = CtaButtonColor.Green;

        [LunaPlaygroundField("CTA Button Shape", 7, "Endcard & Localization")]
        public CtaButtonShape ctaShape = CtaButtonShape.Rounded;

        // Track & Lane Constants
        const float LaneWidth = 2.4f;
        const float TrackHalfWidth = 3.8f;
        const float ChunkLen = 10f;
        const int ChunkCount = 14;

        // Theme Palette
        Color _roadColor;
        Color _stripeColor;
        Color _railColor;
        Color _heroColor;
        Color _heroAccent;
        Color _wallColor;
        Color _hurdleColor;
        Color _coinColor = new Color(1.00f, 0.84f, 0.12f);
        Color _gemColor = new Color(0.16f, 0.90f, 1.00f);
        Color _boostColor = new Color(0.18f, 0.94f, 0.44f);
        Color _gateColor = new Color(0.56f, 0.22f, 0.98f);

        // State
        bool _started;
        bool _ended;
        float _distance;
        int _coins;
        int _lives;
        int _combo;
        float _turboCharge;
        float _turboTimer;
        bool _hasShield;
        float _invulnTimer;
        float _damageFlashT;
        float _shakeTimer;
        float _shakeAmp;
        float _nextSpawnZ;
        float _finishLineZ;
        bool _finishSpawned;

        // Hero analytical motion
        float _heroX;
        float _targetX;
        float _heroY;
        float _heroVelY;
        float _heroRoll;
        bool _isGrounded = true;

        // Input
        bool _pointerDown;
        Vector2 _pointerStart;
        bool _swipedUpThisPress;

        // Scene Objects
        Camera _cam;
        Vector3 _camBasePos = new Vector3(0f, 5.9f, -8.3f);
        Transform _worldRoot;
        Transform _heroRoot;
        Transform _heroVisual;
        Transform _heroArmL, _heroArmR, _heroLegL, _heroLegR;
        Animation _heroAnim;
        GameObject _turboAura;
        GameObject _shieldBubble;
        GameObject _finishGate;

        // Pooled Entities
        readonly List<Transform> _chunks = new List<Transform>();

        enum ObsKind { LowHurdle, TallWall, MovingDrone, BoostRamp, BonusGate }
        class ObstacleItem
        {
            public GameObject root;
            public GameObject visualLow, visualTall, visualDrone, visualRamp, visualGate;
            public ObsKind kind;
            public float z, x, phase;
            public bool active, hit;
        }
        readonly List<ObstacleItem> _obstacles = new List<ObstacleItem>();

        enum PickKind { Coin, Gem, Shield, Heart }
        class PickupItem
        {
            public GameObject root;
            public GameObject visCoin, visGem, visShield, visHeart;
            public PickKind kind;
            public float z, x, y;
            public bool active;
        }
        readonly List<PickupItem> _pickups = new List<PickupItem>();

        class SparkItem
        {
            public Transform tr;
            public Renderer r;
            public Vector3 vel;
            public float t, dur;
            public bool active;
        }
        readonly List<SparkItem> _sparks = new List<SparkItem>();

        class RingItem
        {
            public Transform tr;
            public Renderer r;
            public float t, dur, maxScale;
            public bool active;
        }
        readonly List<RingItem> _rings = new List<RingItem>();

        class PopupItem
        {
            public RectTransform rt;
            public Text[] strokes;
            public Text main;
            public Vector3 worldPos;
            public float t, dur;
            public bool active;
        }
        readonly List<PopupItem> _popups = new List<PopupItem>();

        // Large Arcade HUD & Endcard UI
        AdUI _ui;
        Canvas _hudCanvas;
        Text _coinsTxt, _distTxt, _livesTxt, _sfxTxt, _turboTxt, _sprintTxt;
        Image _livesPillImg, _damageFlashImg;
        RectTransform _sfxBtnRect, _jumpBtnRect, _turboFillRect, _sprintBanner;
        GameObject _endcardRoot;
        RectTransform _endcardCard, _endcardCtaRect;
        float _endcardAnimT;

        void Start()
        {
            Application.targetFrameRate = 60;
            Time.fixedDeltaTime = 0.1f;

            ApplyThemePalette();
            SetupCameraAndLighting();
            BuildBackdrop();

            _worldRoot = new GameObject("RunnerWorld").transform;
            BuildTrackPool();
            BuildHero();
            BuildObstaclePool();
            BuildPickupPool();
            BuildVfxPools();
            BuildHudAndEndcard();

            ResetRun();
            StoreLink.LogEvent("runner_loaded", 1);
        }

        void ApplyThemePalette()
        {
            if (backgroundTheme == BackgroundTheme.SunsetMetropolis)
            {
                _roadColor = new Color(0.20f, 0.22f, 0.34f);
                _stripeColor = new Color(1.00f, 0.94f, 0.72f);
                _railColor = new Color(0.18f, 0.78f, 1.00f);
                _heroColor = new Color(0.12f, 0.76f, 1.00f);
                _heroAccent = new Color(1.00f, 0.82f, 0.16f);
                _wallColor = new Color(0.96f, 0.22f, 0.26f);
                _hurdleColor = new Color(1.00f, 0.56f, 0.12f);
            }
            else
            {
                _roadColor = new Color(0.10f, 0.09f, 0.22f);
                _stripeColor = new Color(0.22f, 0.92f, 1.00f);
                _railColor = new Color(0.94f, 0.24f, 0.68f);
                _heroColor = new Color(0.22f, 0.96f, 1.00f);
                _heroAccent = new Color(0.96f, 0.26f, 0.84f);
                _wallColor = new Color(0.98f, 0.16f, 0.42f);
                _hurdleColor = new Color(1.00f, 0.74f, 0.14f);
            }
        }

        void SetupCameraAndLighting()
        {
            _cam = Camera.main;
            if (!_cam)
            {
                var cgo = new GameObject("Main Camera");
                _cam = cgo.AddComponent<Camera>();
                cgo.tag = "MainCamera";
            }
            _cam.clearFlags = CameraClearFlags.SolidColor;
            _cam.backgroundColor = backgroundTheme == BackgroundTheme.SunsetMetropolis
                ? new Color(0.28f, 0.66f, 0.96f)
                : new Color(0.06f, 0.07f, 0.18f);
            _cam.fieldOfView = 54f;
            _cam.nearClipPlane = 0.3f;
            _cam.farClipPlane = 160f;
            _cam.transform.position = _camBasePos;
            _cam.transform.rotation = Quaternion.Euler(20f, 0f, 0f);

            var light = FindObjectOfType<Light>();
            if (!light)
            {
                var lgo = new GameObject("SunLight");
                light = lgo.AddComponent<Light>();
#if !UNITY_LUNA
                light.type = LightType.Directional;
#endif
            }
            light.shadows = LightShadows.None;
            light.intensity = 1.25f;
            light.color = backgroundTheme == BackgroundTheme.SunsetMetropolis
                ? new Color(1.0f, 0.96f, 0.88f)
                : new Color(0.84f, 0.92f, 1.0f);
            light.transform.rotation = Quaternion.Euler(46f, -26f, 0f);

            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = backgroundTheme == BackgroundTheme.SunsetMetropolis
                ? new Color(0.55f, 0.56f, 0.68f)
                : new Color(0.32f, 0.34f, 0.52f);
        }

        void BuildBackdrop()
        {
            string bgName = backgroundTheme == BackgroundTheme.SunsetMetropolis ? "SunsetMetropolisBg" : "CyberNeonBg";
            var bgTex = Resources.Load<Texture2D>(bgName);
            if (!bgTex) return;

            var bgCanvasGo = new GameObject("BackdropCanvas");
            var bgCanvas = bgCanvasGo.AddComponent<Canvas>();
            bgCanvas.renderMode = RenderMode.ScreenSpaceCamera;
            bgCanvas.worldCamera = _cam;
            bgCanvas.planeDistance = 125f;
            bgCanvas.sortingOrder = -100;

            var scaler = bgCanvasGo.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            scaler.matchWidthOrHeight = 0.5f;

            var rawGo = new GameObject("BgImage");
            rawGo.transform.SetParent(bgCanvasGo.transform, false);
            var raw = rawGo.AddComponent<RawImage>();
            raw.texture = bgTex;
            raw.raycastTarget = false;
            var rt = raw.rectTransform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
        }

        void BuildTrackPool()
        {
            for (int i = 0; i < ChunkCount; i++)
            {
                var chunk = new GameObject("TrackChunk_" + i).transform;
                chunk.SetParent(_worldRoot, false);
                chunk.position = new Vector3(0f, 0f, i * ChunkLen - ChunkLen);

                Prims.Make(PrimitiveType.Cube, chunk, new Vector3(0f, -0.35f, 0f), new Vector3(TrackHalfWidth * 2f, 0.7f, ChunkLen + 0.08f), _roadColor);

                if (i % 2 == 0)
                {
                    Color alt = Color.Lerp(_roadColor, Color.white, 0.08f);
                    Prims.Make(PrimitiveType.Cube, chunk, new Vector3(0f, 0.01f, 0f), new Vector3(TrackHalfWidth * 1.92f, 0.02f, ChunkLen * 0.45f), alt);
                }

                Prims.Make(PrimitiveType.Cube, chunk, new Vector3(-LaneWidth * 0.5f, 0.02f, 0f), new Vector3(0.15f, 0.03f, ChunkLen * 0.52f), _stripeColor);
                Prims.Make(PrimitiveType.Cube, chunk, new Vector3(LaneWidth * 0.5f, 0.02f, 0f), new Vector3(0.15f, 0.03f, ChunkLen * 0.52f), _stripeColor);

                // Side rails + glowing speed pylons
                Prims.Make(PrimitiveType.Cube, chunk, new Vector3(-TrackHalfWidth - 0.16f, 0.24f, 0f), new Vector3(0.32f, 0.56f, ChunkLen + 0.08f), _railColor);
                Prims.Make(PrimitiveType.Cube, chunk, new Vector3(TrackHalfWidth + 0.16f, 0.24f, 0f), new Vector3(0.32f, 0.56f, ChunkLen + 0.08f), _railColor);

                if (i % 2 == 1)
                {
                    Prims.Make(PrimitiveType.Cube, chunk, new Vector3(-TrackHalfWidth - 0.18f, 0.85f, 0f), new Vector3(0.28f, 0.90f, 0.45f), _heroAccent);
                    Prims.Make(PrimitiveType.Cube, chunk, new Vector3(TrackHalfWidth + 0.18f, 0.85f, 0f), new Vector3(0.28f, 0.90f, 0.45f), _heroAccent);
                }

                _chunks.Add(chunk);
            }

            // Grand Checkered Finish Archway
            _finishGate = new GameObject("FinishGate");
            _finishGate.transform.SetParent(_worldRoot, false);
            Prims.Make(PrimitiveType.Cylinder, _finishGate.transform, new Vector3(-TrackHalfWidth, 2.6f, 0f), new Vector3(0.5f, 2.6f, 0.5f), new Color(1f, 0.84f, 0.12f));
            Prims.Make(PrimitiveType.Cylinder, _finishGate.transform, new Vector3(TrackHalfWidth, 2.6f, 0f), new Vector3(0.5f, 2.6f, 0.5f), new Color(1f, 0.84f, 0.12f));
            Prims.Make(PrimitiveType.Cube, _finishGate.transform, new Vector3(0f, 4.9f, 0f), new Vector3(TrackHalfWidth * 2.2f, 1.25f, 0.5f), new Color(0.14f, 0.88f, 0.36f));
            for (int c = 0; c < 6; c++)
            {
                float cx = -TrackHalfWidth + 0.63f + c * 1.26f;
                Color col = (c % 2 == 0) ? Color.white : new Color(0.12f, 0.12f, 0.18f);
                Prims.Make(PrimitiveType.Cube, _finishGate.transform, new Vector3(cx, 0.04f, 0f), new Vector3(1.24f, 0.04f, 1.5f), col);
            }
            _finishGate.SetActive(false);
        }

        void BuildHero()
        {
            _heroRoot = new GameObject("HeroRoot").transform;
            _heroRoot.SetParent(_worldRoot, false);
            _heroVisual = new GameObject("HeroVisual").transform;
            _heroVisual.SetParent(_heroRoot, false);

            bool usedModel = false;
            if (characterStyle == CharacterStyle.StylizedHero)
            {
                var prefab = Resources.Load<GameObject>("Models/PurpleMob");
                if (prefab)
                {
                    var inst = Instantiate(prefab, _heroVisual);
                    inst.transform.localPosition = Vector3.zero;
                    inst.transform.localRotation = Quaternion.identity;
                    inst.transform.localScale = Vector3.one * 0.72f;
                    foreach (var r in inst.GetComponentsInChildren<Renderer>(true))
                    {
                        r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                        r.receiveShadows = false;
                        Prims.SetColor(r, _heroColor);
#if !UNITY_LUNA
                        if (r is SkinnedMeshRenderer smr) smr.updateWhenOffscreen = true;
#endif
                    }
                    _heroAnim = inst.GetComponentInChildren<Animation>(true);
                    if (_heroAnim)
                    {
                        _heroAnim.enabled = true;
                        _heroAnim.wrapMode = WrapMode.Loop;
                        foreach (AnimationState st in _heroAnim)
                        {
                            st.speed = 1.75f;
                            _heroAnim.Play(st.name);
                            break;
                        }
                    }
                    usedModel = true;
                }
            }

            if (!usedModel)
            {
                Prims.Make(PrimitiveType.Capsule, _heroVisual, new Vector3(0f, 0.95f, 0f), new Vector3(0.58f, 0.54f, 0.44f), _heroColor);
                Prims.Make(PrimitiveType.Sphere, _heroVisual, new Vector3(0f, 1.68f, 0f), Vector3.one * 0.54f, _heroColor);
                Prims.Make(PrimitiveType.Cube, _heroVisual, new Vector3(0f, 1.70f, 0.24f), new Vector3(0.40f, 0.15f, 0.14f), _heroAccent);
                _heroArmL = Prims.Make(PrimitiveType.Capsule, _heroVisual, new Vector3(-0.40f, 0.95f, 0f), new Vector3(0.19f, 0.38f, 0.19f), _heroAccent).transform;
                _heroArmR = Prims.Make(PrimitiveType.Capsule, _heroVisual, new Vector3(0.40f, 0.95f, 0f), new Vector3(0.19f, 0.38f, 0.19f), _heroAccent).transform;
                _heroLegL = Prims.Make(PrimitiveType.Capsule, _heroVisual, new Vector3(-0.19f, 0.36f, 0f), new Vector3(0.21f, 0.40f, 0.21f), _heroColor).transform;
                _heroLegR = Prims.Make(PrimitiveType.Capsule, _heroVisual, new Vector3(0.19f, 0.36f, 0f), new Vector3(0.21f, 0.40f, 0.21f), _heroColor).transform;
            }

            _turboAura = Prims.Make(PrimitiveType.Cylinder, _heroRoot, new Vector3(0f, 0.08f, 0f), new Vector3(1.9f, 0.05f, 1.9f), new Color(1.00f, 0.84f, 0.14f));
            _turboAura.SetActive(false);

            _shieldBubble = Prims.Make(PrimitiveType.Cylinder, _heroRoot, new Vector3(0f, 0.95f, 0f), new Vector3(1.65f, 0.08f, 1.65f), new Color(0.20f, 0.92f, 1.00f));
            _shieldBubble.SetActive(false);
        }

        void BuildObstaclePool()
        {
            for (int i = 0; i < 30; i++)
            {
                var item = new ObstacleItem();
                item.root = new GameObject("Obs_" + i);
                item.root.transform.SetParent(_worldRoot, false);

                // 1) Low Hurdle (jumpable!)
                item.visualLow = new GameObject("LowHurdle");
                item.visualLow.transform.SetParent(item.root.transform, false);
                Prims.Make(PrimitiveType.Cube, item.visualLow.transform, new Vector3(0f, 0.65f, 0f), new Vector3(2.10f, 0.44f, 0.38f), _hurdleColor);
                Prims.Make(PrimitiveType.Cube, item.visualLow.transform, new Vector3(0f, 0.66f, -0.20f), new Vector3(1.70f, 0.15f, 0.04f), Color.white);
                Prims.Make(PrimitiveType.Cube, item.visualLow.transform, new Vector3(-0.90f, 0.35f, 0f), new Vector3(0.22f, 0.70f, 0.32f), new Color(0.18f, 0.18f, 0.24f));
                Prims.Make(PrimitiveType.Cube, item.visualLow.transform, new Vector3(0.90f, 0.35f, 0f), new Vector3(0.22f, 0.70f, 0.32f), new Color(0.18f, 0.18f, 0.24f));

                // 2) Tall Block Wall
                item.visualTall = new GameObject("TallWall");
                item.visualTall.transform.SetParent(item.root.transform, false);
                Prims.Make(PrimitiveType.Cube, item.visualTall.transform, new Vector3(0f, 1.38f, 0f), new Vector3(2.10f, 2.75f, 0.95f), _wallColor);
                Prims.Make(PrimitiveType.Cube, item.visualTall.transform, new Vector3(0f, 2.38f, -0.49f), new Vector3(1.78f, 0.32f, 0.05f), new Color(1f, 0.88f, 0.22f));
                Prims.Make(PrimitiveType.Cube, item.visualTall.transform, new Vector3(0f, 1.18f, -0.49f), new Vector3(1.78f, 0.32f, 0.05f), new Color(1f, 0.88f, 0.22f));

                // 3) Moving Sweeper Drone
                item.visualDrone = new GameObject("SweeperDrone");
                item.visualDrone.transform.SetParent(item.root.transform, false);
                Prims.Make(PrimitiveType.Sphere, item.visualDrone.transform, new Vector3(0f, 1.05f, 0f), new Vector3(1.30f, 0.88f, 1.30f), new Color(0.95f, 0.18f, 0.56f));
                Prims.Make(PrimitiveType.Cylinder, item.visualDrone.transform, new Vector3(0f, 1.05f, 0f), new Vector3(1.72f, 0.12f, 1.72f), new Color(1.00f, 0.84f, 0.16f));

                // 4) Green Jump/Boost Ramp (launches hero high into sky coins!)
                item.visualRamp = new GameObject("BoostRamp");
                item.visualRamp.transform.SetParent(item.root.transform, false);
                var ramp = Prims.Make(PrimitiveType.Cube, item.visualRamp.transform, new Vector3(0f, 0.24f, 0f), new Vector3(2.0f, 0.18f, 2.5f), _boostColor);
                ramp.transform.localRotation = Quaternion.Euler(-16f, 0f, 0f);
                Prims.Make(PrimitiveType.Cube, item.visualRamp.transform, new Vector3(0f, 0.42f, 0.3f), new Vector3(1.3f, 0.06f, 0.45f), Color.white);

                // 5) Mob-Control-Style Glowing Purple Bonus Gate (+10 & Turbo!)
                item.visualGate = new GameObject("BonusGate");
                item.visualGate.transform.SetParent(item.root.transform, false);
                Prims.Make(PrimitiveType.Cylinder, item.visualGate.transform, new Vector3(-1.02f, 1.25f, 0f), new Vector3(0.24f, 1.25f, 0.24f), new Color(0.14f, 0.14f, 0.22f));
                Prims.Make(PrimitiveType.Cylinder, item.visualGate.transform, new Vector3(1.02f, 1.25f, 0f), new Vector3(0.24f, 1.25f, 0.24f), new Color(0.14f, 0.14f, 0.22f));
                Prims.Make(PrimitiveType.Cube, item.visualGate.transform, new Vector3(0f, 1.30f, 0f), new Vector3(1.92f, 1.90f, 0.16f), _gateColor);
                Prims.Make(PrimitiveType.Cube, item.visualGate.transform, new Vector3(0f, 2.30f, 0f), new Vector3(2.22f, 0.24f, 0.28f), new Color(1f, 0.86f, 0.16f));

                item.root.SetActive(false);
                _obstacles.Add(item);
            }
        }

        void BuildPickupPool()
        {
            for (int i = 0; i < 64; i++)
            {
                var p = new PickupItem();
                p.root = new GameObject("Pick_" + i);
                p.root.transform.SetParent(_worldRoot, false);

                p.visCoin = Prims.Make(PrimitiveType.Cylinder, p.root.transform, Vector3.zero, new Vector3(0.82f, 0.14f, 0.82f), _coinColor);
                p.visCoin.transform.localRotation = Quaternion.Euler(90f, 0f, 0f);

                p.visGem = Prims.Make(PrimitiveType.Cube, p.root.transform, Vector3.zero, new Vector3(0.68f, 0.68f, 0.68f), _gemColor);
                p.visGem.transform.localRotation = Quaternion.Euler(45f, 45f, 0f);

                p.visShield = Prims.Make(PrimitiveType.Sphere, p.root.transform, Vector3.zero, Vector3.one * 0.88f, new Color(0.24f, 0.94f, 1.0f));

                p.visHeart = Prims.Make(PrimitiveType.Sphere, p.root.transform, Vector3.zero, new Vector3(0.92f, 0.82f, 0.56f), new Color(0.98f, 0.18f, 0.36f));

                p.root.SetActive(false);
                _pickups.Add(p);
            }
        }

        void BuildVfxPools()
        {
            for (int i = 0; i < 30; i++)
            {
                var g = Prims.Make(PrimitiveType.Cube, _worldRoot, Vector3.zero, Vector3.one * 0.26f, Color.white);
                g.SetActive(false);
                _sparks.Add(new SparkItem { tr = g.transform, r = g.GetComponent<Renderer>() });
            }
            for (int i = 0; i < 6; i++)
            {
                var g = Prims.Make(PrimitiveType.Cylinder, _worldRoot, Vector3.zero, new Vector3(0.6f, 0.04f, 0.6f), Color.white);
                g.SetActive(false);
                _rings.Add(new RingItem { tr = g.transform, r = g.GetComponent<Renderer>() });
            }
        }

        void BuildHudAndEndcard()
        {
            _ui = AdUI.Create("TURBO RUNNER", ctaText, new Color(0.10f, 0.14f, 0.30f), new Color(1f, 0.86f, 0.18f));
            _ui.SetTutorialText(tutorialText);
            _ui.ShowDragTutorial(true);

            var hudGo = new GameObject("RunnerHudCanvas");
            _hudCanvas = hudGo.AddComponent<Canvas>();
            _hudCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            _hudCanvas.sortingOrder = 25;
            var scaler = hudGo.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1080f, 1920f);
            scaler.matchWidthOrHeight = 0.5f;

            // Fullscreen Red Damage Flash overlay
            var flGo = new GameObject("DamageFlash", typeof(RectTransform));
            flGo.transform.SetParent(_hudCanvas.transform, false);
            var flRt = flGo.GetComponent<RectTransform>();
            flRt.anchorMin = Vector2.zero;
            flRt.anchorMax = Vector2.one;
            flRt.offsetMin = Vector2.zero;
            flRt.offsetMax = Vector2.zero;
            _damageFlashImg = flGo.AddComponent<Image>();
            _damageFlashImg.color = new Color(1f, 0.12f, 0.16f, 0f);
            _damageFlashImg.raycastTarget = false;

            // BIG, BOLD Top 3 Arcade Pills (COINS, DISTANCE, HP HEARTS)
            _coinsTxt = MakePill(_hudCanvas.transform, new Vector2(-345f, -108f), new Vector2(330f, 118f), new Color(0.96f, 0.66f, 0.06f), "COINS: 0", 52, out _);
            _distTxt  = MakePill(_hudCanvas.transform, new Vector2(0f, -108f),    new Vector2(310f, 118f), new Color(0.12f, 0.64f, 0.98f), targetDistance + "M", 56, out _);
            _livesTxt = MakePill(_hudCanvas.transform, new Vector2(345f, -108f),  new Vector2(330f, 118f), new Color(0.92f, 0.16f, 0.32f), "HP: 3/3", 52, out _livesPillImg);

            // BIG Final Sprint Banner
            var spGo = new GameObject("SprintBanner", typeof(RectTransform));
            spGo.transform.SetParent(_hudCanvas.transform, false);
            _sprintBanner = spGo.GetComponent<RectTransform>();
            _sprintBanner.anchorMin = _sprintBanner.anchorMax = new Vector2(0.5f, 1f);
            _sprintBanner.anchoredPosition = new Vector2(0f, -245f);
            _sprintBanner.sizeDelta = new Vector2(560f, 108f);
            var spImg = spGo.AddComponent<Image>();
            spImg.sprite = AdRes.Pill;
            spImg.color = new Color(0.96f, 0.22f, 0.18f, 0.96f);
            _sprintTxt = MakeOutlinedHudText(_sprintBanner, "FINAL SPRINT!", 58, Color.white);
            _sprintBanner.gameObject.SetActive(false);

            // BIG Bottom-Left SFX ON/OFF toggle button
            var sfxGo = new GameObject("SfxBtn", typeof(RectTransform));
            sfxGo.transform.SetParent(_hudCanvas.transform, false);
            _sfxBtnRect = sfxGo.GetComponent<RectTransform>();
            _sfxBtnRect.anchorMin = _sfxBtnRect.anchorMax = new Vector2(0f, 0f);
            _sfxBtnRect.anchoredPosition = new Vector2(148f, 112f);
            _sfxBtnRect.sizeDelta = new Vector2(246f, 102f);
            var sfxImg = sfxGo.AddComponent<Image>();
            sfxImg.sprite = AdRes.Pill;
            sfxImg.color = new Color(0.16f, 0.56f, 0.96f);
            _sfxTxt = MakeOutlinedHudText(_sfxBtnRect, "SFX ON", 46, Color.white);

            // BIG Bottom-Center TURBO CHARGE bar
            var barGo = new GameObject("TurboBarBg", typeof(RectTransform));
            barGo.transform.SetParent(_hudCanvas.transform, false);
            var barRt = barGo.GetComponent<RectTransform>();
            barRt.anchorMin = barRt.anchorMax = new Vector2(0.5f, 0f);
            barRt.anchoredPosition = new Vector2(0f, 112f);
            barRt.sizeDelta = new Vector2(460f, 96f);
            var barBg = barGo.AddComponent<Image>();
            barBg.sprite = AdRes.Pill;
            barBg.color = new Color(0.08f, 0.10f, 0.24f, 0.94f);

            var fillGo = new GameObject("TurboFill", typeof(RectTransform));
            fillGo.transform.SetParent(barRt, false);
            _turboFillRect = fillGo.GetComponent<RectTransform>();
            _turboFillRect.anchorMin = new Vector2(0f, 0f);
            _turboFillRect.anchorMax = new Vector2(0f, 1f);
            _turboFillRect.pivot = new Vector2(0f, 0.5f);
            _turboFillRect.anchoredPosition = new Vector2(8f, 0f);
            _turboFillRect.sizeDelta = new Vector2(0f, -16f);
            var fillImg = fillGo.AddComponent<Image>();
            fillImg.sprite = AdRes.Pill;
            fillImg.color = new Color(1.00f, 0.82f, 0.12f);

            _turboTxt = MakeOutlinedHudText(barRt, "TURBO CHARGE", 42, Color.white);

            // BIG Bottom-Right JUMP Button (easy click on Desktop + thumb tap on Mobile!)
            var jmpGo = new GameObject("JumpBtn", typeof(RectTransform));
            jmpGo.transform.SetParent(_hudCanvas.transform, false);
            _jumpBtnRect = jmpGo.GetComponent<RectTransform>();
            _jumpBtnRect.anchorMin = _jumpBtnRect.anchorMax = new Vector2(1f, 0f);
            _jumpBtnRect.anchoredPosition = new Vector2(-148f, 112f);
            _jumpBtnRect.sizeDelta = new Vector2(246f, 102f);
            var jmpImg = jmpGo.AddComponent<Image>();
            jmpImg.sprite = AdRes.Pill;
            jmpImg.color = new Color(0.16f, 0.82f, 0.36f);
            MakeOutlinedHudText(_jumpBtnRect, "JUMP!", 52, Color.white);

            // BIG Pooled Floating Bangers Popups
            for (int i = 0; i < 8; i++)
            {
                var pGo = new GameObject("Popup_" + i, typeof(RectTransform));
                pGo.transform.SetParent(_hudCanvas.transform, false);
                var prt = pGo.GetComponent<RectTransform>();
                prt.sizeDelta = new Vector2(520f, 140f);
                var item = new PopupItem { rt = prt, strokes = new Text[4] };
                Vector2[] offs = { new Vector2(-5, 0), new Vector2(5, 0), new Vector2(0, -5), new Vector2(0, 5) };
                for (int k = 0; k < 4; k++)
                {
                    item.strokes[k] = MakeRawText(prt, "", 82, new Color(0.08f, 0.04f, 0.22f));
                    item.strokes[k].rectTransform.anchoredPosition = offs[k];
                }
                item.main = MakeRawText(prt, "", 82, new Color(1f, 0.90f, 0.18f));
                pGo.SetActive(false);
                _popups.Add(item);
            }

            BuildCustomEndcard();
        }

        Text MakePill(Transform parent, Vector2 pos, Vector2 size, Color bgCol, string text, int fontSize, out Image bgImage)
        {
            var go = new GameObject("Pill_" + text, typeof(RectTransform));
            go.transform.SetParent(parent, false);
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 1f);
            rt.anchoredPosition = pos;
            rt.sizeDelta = size;
            bgImage = go.AddComponent<Image>();
            bgImage.sprite = AdRes.Pill;
            bgImage.color = bgCol;
            return MakeOutlinedHudText(rt, text, fontSize, Color.white);
        }

        Text MakeOutlinedHudText(RectTransform parent, string str, int size, Color col)
        {
            var shadow = MakeRawText(parent, str, size, new Color(0.06f, 0.04f, 0.16f, 0.92f));
            shadow.rectTransform.anchoredPosition = new Vector2(0f, -4f);
            var main = MakeRawText(parent, str, size, col);
            // Keep shadow synced only on static labels; dynamic labels update main text directly
            return main;
        }

        Text MakeRawText(RectTransform parent, string str, int size, Color col)
        {
            var go = new GameObject("Txt", typeof(RectTransform));
            go.transform.SetParent(parent, false);
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
            var t = go.AddComponent<Text>();
            t.font = AdRes.Font;
            t.fontSize = size;
            t.alignment = TextAnchor.MiddleCenter;
            t.color = col;
            t.text = str;
            t.raycastTarget = false;
            return t;
        }

        void BuildCustomEndcard()
        {
            _endcardRoot = new GameObject("RunnerEndcard", typeof(RectTransform));
            _endcardRoot.transform.SetParent(_hudCanvas.transform, false);
            var rootRt = _endcardRoot.GetComponent<RectTransform>();
            rootRt.anchorMin = Vector2.zero;
            rootRt.anchorMax = Vector2.one;
            rootRt.offsetMin = Vector2.zero;
            rootRt.offsetMax = Vector2.zero;

            var dim = _endcardRoot.AddComponent<Image>();
            dim.color = new Color(0.04f, 0.05f, 0.14f, 0.80f);

            var cardGo = new GameObject("Card", typeof(RectTransform));
            cardGo.transform.SetParent(_endcardRoot.transform, false);
            _endcardCard = cardGo.GetComponent<RectTransform>();
            _endcardCard.anchorMin = _endcardCard.anchorMax = new Vector2(0.5f, 0.5f);
            _endcardCard.sizeDelta = new Vector2(920f, 1220f);
            var cardImg = cardGo.AddComponent<Image>();
            cardImg.sprite = AdRes.Pill;
            cardImg.color = backgroundTheme == BackgroundTheme.SunsetMetropolis
                ? new Color(0.11f, 0.14f, 0.30f, 0.97f)
                : new Color(0.08f, 0.06f, 0.22f, 0.97f);

            var logoTex = Resources.Load<Texture2D>("RunnerLogo");
            if (logoTex)
            {
                var lgo = new GameObject("Logo", typeof(RectTransform));
                lgo.transform.SetParent(_endcardCard, false);
                var lrt = lgo.GetComponent<RectTransform>();
                lrt.anchorMin = lrt.anchorMax = new Vector2(0.5f, 0.5f);
                lrt.anchoredPosition = new Vector2(0f, 385f);
                lrt.sizeDelta = new Vector2(720f, 380f);
                var rimg = lgo.AddComponent<RawImage>();
                rimg.texture = logoTex;
                rimg.raycastTarget = false;
            }

            var titleGo = new GameObject("EndTitle", typeof(RectTransform));
            titleGo.transform.SetParent(_endcardCard, false);
            var trt = titleGo.GetComponent<RectTransform>();
            trt.anchorMin = trt.anchorMax = new Vector2(0.5f, 0.5f);
            trt.anchoredPosition = new Vector2(0f, 105f);
            trt.sizeDelta = new Vector2(840f, 140f);
            MakeRawText(trt, victoryTitle, 114, new Color(1f, 0.86f, 0.16f));

            var subGo = new GameObject("EndSub", typeof(RectTransform));
            subGo.transform.SetParent(_endcardCard, false);
            var srt = subGo.GetComponent<RectTransform>();
            srt.anchorMin = srt.anchorMax = new Vector2(0.5f, 0.5f);
            srt.anchoredPosition = new Vector2(0f, -25f);
            srt.sizeDelta = new Vector2(840f, 100f);
            MakeRawText(srt, victorySubtitle, 54, Color.white);

            var scoreGo = new GameObject("EndScore", typeof(RectTransform));
            scoreGo.transform.SetParent(_endcardCard, false);
            var scrt = scoreGo.GetComponent<RectTransform>();
            scrt.anchorMin = scrt.anchorMax = new Vector2(0.5f, 0.5f);
            scrt.anchoredPosition = new Vector2(0f, -135f);
            scrt.sizeDelta = new Vector2(540f, 88f);
            var scImg = scoreGo.AddComponent<Image>();
            scImg.sprite = AdRes.Pill;
            scImg.color = new Color(0.96f, 0.68f, 0.08f);
            MakeRawText(scrt, "COINS: 0", 52, Color.white);

            var ctaGo = new GameObject("CtaButton", typeof(RectTransform));
            ctaGo.transform.SetParent(_endcardCard, false);
            _endcardCtaRect = ctaGo.GetComponent<RectTransform>();
            _endcardCtaRect.anchorMin = _endcardCtaRect.anchorMax = new Vector2(0.5f, 0.5f);
            _endcardCtaRect.anchoredPosition = new Vector2(0f, -345f);
            _endcardCtaRect.sizeDelta = new Vector2(720f, 192f);
            var ctaImg = ctaGo.AddComponent<Image>();
            ctaImg.sprite = ctaShape == CtaButtonShape.Rounded ? AdRes.Pill : null;
            ctaImg.color = GetCtaColor();
            MakeRawText(_endcardCtaRect, ctaText, 96, Color.white);

            _endcardRoot.SetActive(false);
        }

        Color GetCtaColor()
        {
            switch (ctaColor)
            {
                case CtaButtonColor.Blue:   return new Color(0.14f, 0.58f, 0.98f);
                case CtaButtonColor.Yellow: return new Color(0.96f, 0.74f, 0.08f);
                case CtaButtonColor.Red:    return new Color(0.94f, 0.22f, 0.26f);
                case CtaButtonColor.Purple: return new Color(0.54f, 0.22f, 0.96f);
                default:                    return new Color(0.16f, 0.80f, 0.34f);
            }
        }

        void ResetRun()
        {
            _started = false;
            _ended = false;
            _distance = 0f;
            _coins = 0;
            _combo = 0;
            _lives = Mathf.Max(1, maxLives);
            _turboCharge = 0f;
            _turboTimer = 0f;
            _hasShield = false;
            _invulnTimer = 0f;
            _damageFlashT = 0f;
            _heroX = 0f;
            _targetX = 0f;
            _heroY = 0f;
            _heroVelY = 0f;
            _isGrounded = true;
            _finishLineZ = Mathf.Max(100, targetDistance);
            _finishSpawned = false;
            _nextSpawnZ = 24f;

            for (int i = 0; i < 6; i++) SpawnPattern();
            UpdateHud();
        }

        void StartRunIfNeeded()
        {
            if (_started) return;
            _started = true;
            _ui.ShowDragTutorial(false);
            Sfx.Play(Sfx.Id.Tap, 0.8f);
            StoreLink.LogEvent("runner_first_interaction", 1);
        }

        void Update()
        {
            float dt = Mathf.Min(Time.deltaTime, 0.05f);
            _ui.Tick(dt);

            HandleInput(dt);

            if (_damageFlashT > 0f && _damageFlashImg)
            {
                _damageFlashT = Mathf.Max(0f, _damageFlashT - dt * 2.8f);
                _damageFlashImg.color = new Color(1f, 0.12f, 0.16f, _damageFlashT * 0.42f);
            }

            if (_ended)
            {
                _endcardAnimT += dt;
                float s = Mathf.Lerp(0.7f, 1f, Mathf.Clamp01(_endcardAnimT * 4f));
                _endcardCard.localScale = Vector3.one * s;
                _endcardCtaRect.localScale = Vector3.one * (1f + 0.05f * Mathf.Sin(Time.time * 6.5f));
                TickVfx(dt);
                return;
            }

            if (!_started)
            {
                _heroVisual.localPosition = new Vector3(0f, Mathf.Abs(Mathf.Sin(Time.time * 4f)) * 0.14f, 0f);
                return;
            }

            if (_invulnTimer > 0f) _invulnTimer -= dt;

            bool inTurbo = _turboTimer > 0f;
            if (inTurbo)
            {
                _turboTimer -= dt;
                _turboCharge = Mathf.Clamp01(_turboTimer / 5.0f);
                if (_turboTimer <= 0f) _turboAura.SetActive(false);
            }

            float speed = baseRunSpeed * (1f + Mathf.Clamp01(_distance / _finishLineZ) * 0.28f);
            if (inTurbo) speed *= 1.44f;
            float dz = speed * dt;
            _distance += dz;

            for (int i = 0; i < _chunks.Count; i++)
            {
                var p = _chunks[i].position;
                p.z -= dz;
                if (p.z < -ChunkLen * 1.5f) p.z += ChunkCount * ChunkLen;
                _chunks[i].position = p;
            }

            while (_nextSpawnZ - _distance < 110f && _nextSpawnZ < _finishLineZ - 14f)
            {
                SpawnPattern();
            }

            float rem = _finishLineZ - _distance;
            if (!_finishSpawned && rem < 115f)
            {
                _finishSpawned = true;
                _finishGate.SetActive(true);
            }
            if (_finishSpawned)
            {
                _finishGate.transform.position = new Vector3(0f, 0f, rem);
                if (rem <= 0.5f)
                {
                    EndRun(true);
                    return;
                }
            }

            if (_sprintBanner)
            {
                bool showSprint = rem < 65f && rem > 1f;
                if (_sprintBanner.gameObject.activeSelf != showSprint)
                    _sprintBanner.gameObject.SetActive(showSprint);
                if (showSprint)
                    _sprintBanner.localScale = Vector3.one * (1f + 0.06f * Mathf.Sin(Time.time * 10f));
            }

            UpdateHeroMotion(dt, inTurbo);
            UpdatePickups(dt, dz, inTurbo);
            UpdateObstacles(dt, dz, inTurbo);
            TickVfx(dt);
            UpdateCamera(dt, inTurbo);
            UpdateHud();
        }

        void HandleInput(float dt)
        {
            // Keyboard support works IMMEDIATELY (even before first mouse click!)
            if (!_ended)
            {
                if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A))
                {
                    StartRunIfNeeded();
                    _targetX = Mathf.Clamp(_targetX - 13.5f * dt, -LaneWidth, LaneWidth);
                }
                if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D))
                {
                    StartRunIfNeeded();
                    _targetX = Mathf.Clamp(_targetX + 13.5f * dt, -LaneWidth, LaneWidth);
                }
                if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W))
                {
                    StartRunIfNeeded();
                    TriggerJump(13.2f);
                }
            }

            if (Input.GetMouseButtonDown(0))
            {
                Vector2 pos = Input.mousePosition;

                if (_ended)
                {
                    if ((_endcardCtaRect && RectTransformUtility.RectangleContainsScreenPoint(_endcardCtaRect, pos, null)) || _endcardAnimT > 0.6f)
                    {
                        Sfx.Play(Sfx.Id.Click, 0.9f);
                        StoreLink.Open(RunnerStoreUrl);
                    }
                    return;
                }

                // SFX ON/OFF toggle
                if (_sfxBtnRect && RectTransformUtility.RectangleContainsScreenPoint(_sfxBtnRect, pos, null))
                {
                    Sfx.Muted = !Sfx.Muted;
                    if (_sfxTxt) _sfxTxt.text = Sfx.Muted ? "SFX OFF" : "SFX ON";
                    if (!Sfx.Muted) Sfx.Play(Sfx.Id.Click, 0.8f);
                    return;
                }

                // Dedicated JUMP! button
                if (_jumpBtnRect && RectTransformUtility.RectangleContainsScreenPoint(_jumpBtnRect, pos, null))
                {
                    StartRunIfNeeded();
                    TriggerJump(13.2f);
                    return;
                }

                StartRunIfNeeded();
                _pointerDown = true;
                _pointerStart = pos;
                _swipedUpThisPress = false;

                // Direct 1:1 Mob-Control-style X steering on touch/click!
                float normX = (pos.x / Mathf.Max(1f, Screen.width) - 0.5f) * 2.25f;
                _targetX = Mathf.Clamp(normX * LaneWidth, -LaneWidth, LaneWidth);
            }
            else if (Input.GetMouseButton(0) && _pointerDown && !_ended)
            {
                Vector2 pos = Input.mousePosition;
                float normX = (pos.x / Mathf.Max(1f, Screen.width) - 0.5f) * 2.25f;
                _targetX = Mathf.Clamp(normX * LaneWidth, -LaneWidth, LaneWidth);

                if (!_swipedUpThisPress && (pos.y - _pointerStart.y) > Screen.height * 0.035f)
                {
                    _swipedUpThisPress = true;
                    TriggerJump(13.2f);
                }
            }
            else if (Input.GetMouseButtonUp(0))
            {
                _pointerDown = false;
            }
        }

        void TriggerJump(float vel)
        {
            if (!_isGrounded) return;
            _isGrounded = false;
            _heroVelY = vel;
            Sfx.Play(Sfx.Id.Jump, 0.88f);
            SpawnRing(new Vector3(_heroX, 0.08f, 0f), _heroColor, 2.0f);
        }

        void UpdateHeroMotion(float dt, bool inTurbo)
        {
            float prevX = _heroX;
            _heroX = Mathf.Lerp(_heroX, _targetX, 1f - Mathf.Exp(-18f * dt));
            float vx = (_heroX - prevX) / Mathf.Max(0.001f, dt);

            if (!_isGrounded)
            {
                _heroVelY -= 32f * dt;
                _heroY += _heroVelY * dt;
                if (_heroY <= 0f)
                {
                    _heroY = 0f;
                    _heroVelY = 0f;
                    _isGrounded = true;
                    Sfx.Play(Sfx.Id.Land, 0.48f);
                }
            }

            _heroRoot.position = new Vector3(_heroX, _heroY, 0f);
            _heroRoll = Mathf.Lerp(_heroRoll, Mathf.Clamp(-vx * 2.2f, -20f, 20f), 1f - Mathf.Exp(-14f * dt));
            _heroVisual.localRotation = Quaternion.Euler(0f, 0f, _heroRoll);

            float sy = _isGrounded ? 1f : (1f + Mathf.Clamp(_heroVelY * 0.018f, -0.14f, 0.22f));
            float sxz = 1f / Mathf.Sqrt(Mathf.Max(0.5f, sy));
            _heroVisual.localScale = new Vector3(sxz, sy, sxz);

            if (_heroLegL)
            {
                float sw = Mathf.Sin(Time.time * (inTurbo ? 20f : 14f)) * 40f;
                _heroLegL.localRotation = Quaternion.Euler(sw, 0f, 0f);
                _heroLegR.localRotation = Quaternion.Euler(-sw, 0f, 0f);
                _heroArmL.localRotation = Quaternion.Euler(-sw * 0.8f, 0f, 0f);
                _heroArmR.localRotation = Quaternion.Euler(sw * 0.8f, 0f, 0f);
            }

            if (_turboAura.activeSelf) _turboAura.transform.Rotate(0f, 240f * dt, 0f);
            if (_shieldBubble.activeSelf) _shieldBubble.transform.Rotate(0f, -160f * dt, 0f);
        }

        void SpawnPattern()
        {
            float gap = Mathf.Lerp(15.5f, 11.8f, Mathf.Clamp01(obstacleDensity * 0.5f));
            float zWorld = _nextSpawnZ;
            _nextSpawnZ += gap;

            int openLane = Random.Range(0, 3);
            float relZ = zWorld - _distance;

            for (int lane = 0; lane < 3; lane++)
            {
                float lx = (lane - 1) * LaneWidth;
                if (lane == openLane)
                {
                    float r = Random.value;
                    if (r < 0.22f)
                    {
                        // Green Jump Ramp + Sky Coin Arc!
                        ActivateObstacle(ObsKind.BoostRamp, relZ, lx);
                        for (int c = 0; c < 4; c++)
                            ActivatePickup(c == 2 ? PickKind.Gem : PickKind.Coin, relZ + 2.2f + c * 2.0f, lx, 2.3f + Mathf.Sin(c / 3f * Mathf.PI) * 1.1f);
                    }
                    else if (r < 0.44f)
                    {
                        // Mob-Control-Style Glowing Bonus Gate!
                        ActivateObstacle(ObsKind.BonusGate, relZ, lx);
                    }
                    else
                    {
                        bool isGemLine = Random.value < 0.30f;
                        for (int c = 0; c < 4; c++)
                            ActivatePickup(isGemLine && c == 2 ? PickKind.Gem : PickKind.Coin, relZ - 2.4f + c * 1.8f, lx, 0.78f);
                    }
                }
                else if (Random.value < Mathf.Clamp(0.62f * obstacleDensity, 0.35f, 0.92f))
                {
                    float roll = Random.value;
                    ObsKind kind = roll < 0.44f ? ObsKind.LowHurdle : (roll < 0.82f ? ObsKind.TallWall : ObsKind.MovingDrone);
                    ActivateObstacle(kind, relZ, lx);
                    if (kind == ObsKind.LowHurdle)
                        ActivatePickup(PickKind.Gem, relZ, lx, 2.15f);
                }
                else if (_lives < maxLives && Random.value < 0.18f)
                {
                    ActivatePickup(PickKind.Heart, relZ, lx, 0.95f);
                }
                else if (!_hasShield && Random.value < 0.12f)
                {
                    ActivatePickup(PickKind.Shield, relZ, lx, 0.95f);
                }
            }
        }

        void ActivateObstacle(ObsKind kind, float z, float x)
        {
            for (int i = 0; i < _obstacles.Count; i++)
            {
                var o = _obstacles[i];
                if (o.active) continue;
                o.active = true;
                o.hit = false;
                o.kind = kind;
                o.z = z;
                o.x = x;
                o.phase = Random.Range(0f, 6.28f);
                o.visualLow.SetActive(kind == ObsKind.LowHurdle);
                o.visualTall.SetActive(kind == ObsKind.TallWall);
                o.visualDrone.SetActive(kind == ObsKind.MovingDrone);
                o.visualRamp.SetActive(kind == ObsKind.BoostRamp);
                o.visualGate.SetActive(kind == ObsKind.BonusGate);
                o.root.transform.position = new Vector3(x, 0f, z);
                o.root.SetActive(true);
                return;
            }
        }

        void ActivatePickup(PickKind kind, float z, float x, float y)
        {
            for (int i = 0; i < _pickups.Count; i++)
            {
                var p = _pickups[i];
                if (p.active) continue;
                p.active = true;
                p.kind = kind;
                p.z = z;
                p.x = x;
                p.y = y;
                p.visCoin.SetActive(kind == PickKind.Coin);
                p.visGem.SetActive(kind == PickKind.Gem);
                p.visShield.SetActive(kind == PickKind.Shield);
                p.visHeart.SetActive(kind == PickKind.Heart);
                p.root.transform.position = new Vector3(x, y, z);
                p.root.SetActive(true);
                return;
            }
        }

        void UpdatePickups(float dt, float dz, bool inTurbo)
        {
            float magR = inTurbo ? Mathf.Max(coinMagnetRadius * 2.2f, 8.0f) : coinMagnetRadius;
            for (int i = 0; i < _pickups.Count; i++)
            {
                var p = _pickups[i];
                if (!p.active) continue;
                p.z -= dz;
                if (p.z < -8f)
                {
                    p.active = false;
                    p.root.SetActive(false);
                    continue;
                }

                float dx = _heroX - p.x;
                float distSq = dx * dx + p.z * p.z;
                if (distSq < magR * magR && p.z > -1.2f && p.z < 6.8f)
                {
                    float pull = (inTurbo ? 24f : 12f) * dt;
                    p.x = Mathf.Lerp(p.x, _heroX, pull);
                    p.y = Mathf.Lerp(p.y, _heroY + 0.85f, pull);
                }

                p.root.transform.position = new Vector3(p.x, p.y + Mathf.Sin(Time.time * 5f + i) * 0.12f, p.z);
                p.root.transform.Rotate(0f, 180f * dt, 0f);

                if (Mathf.Abs(p.z) < 1.2f && Mathf.Abs(p.x - _heroX) < 1.15f && Mathf.Abs(p.y - (_heroY + 0.85f)) < 1.45f)
                {
                    p.active = false;
                    p.root.SetActive(false);
                    OnCollectPickup(p);
                }
            }
        }

        void OnCollectPickup(PickupItem p)
        {
            if (p.kind == PickKind.Coin)
            {
                _coins += 1;
                _combo++;
                AddTurbo(0.055f);
                Sfx.Play(Sfx.Id.Pop, 0.55f, 1.05f + (_combo % 8) * 0.04f);
                SpawnBurst(new Vector3(p.x, p.y, 0f), _coinColor, 4);
            }
            else if (p.kind == PickKind.Gem)
            {
                _coins += 5;
                AddTurbo(0.18f);
                Sfx.Play(Sfx.Id.GateGood, 0.80f);
                SpawnBurst(new Vector3(p.x, p.y, 0f), _gemColor, 7);
                SpawnPopup(new Vector3(_heroX, _heroY + 2.3f, 0f), "+5 GEM!", _gemColor);
            }
            else if (p.kind == PickKind.Shield)
            {
                _hasShield = true;
                _shieldBubble.SetActive(true);
                Sfx.Play(Sfx.Id.Banner, 0.78f, 1.15f);
                SpawnRing(new Vector3(_heroX, 0.8f, 0f), _gemColor, 2.8f);
                SpawnPopup(new Vector3(_heroX, _heroY + 2.4f, 0f), "SHIELD!", _gemColor);
            }
            else if (p.kind == PickKind.Heart)
            {
                _lives = Mathf.Min(maxLives, _lives + 1);
                Sfx.Play(Sfx.Id.Win, 0.75f, 1.2f);
                SpawnRing(new Vector3(_heroX, 0.8f, 0f), new Color(1f, 0.22f, 0.42f), 2.8f);
                SpawnPopup(new Vector3(_heroX, _heroY + 2.4f, 0f), "+1 HP!", new Color(1f, 0.30f, 0.48f));
            }
        }

        void AddTurbo(float amt)
        {
            if (!enableTurboFever || _turboTimer > 0f) return;
            _turboCharge = Mathf.Clamp01(_turboCharge + amt);
            if (_turboCharge >= 1f)
            {
                _turboTimer = 5.0f;
                _turboAura.SetActive(true);
                TriggerShake(0.28f, 0.26f);
                Sfx.Play(Sfx.Id.Stomp, 0.92f);
                Sfx.Play(Sfx.Id.Banner, 0.72f, 1.2f);
                SpawnRing(new Vector3(_heroX, 0.2f, 0f), new Color(1f, 0.85f, 0.16f), 4.4f);
                SpawnPopup(new Vector3(_heroX, _heroY + 2.6f, 0f), "TURBO!", new Color(1f, 0.86f, 0.14f));
                StoreLink.LogEvent("runner_turbo_activated", 1);
            }
        }

        void UpdateObstacles(float dt, float dz, bool inTurbo)
        {
            for (int i = 0; i < _obstacles.Count; i++)
            {
                var o = _obstacles[i];
                if (!o.active) continue;
                o.z -= dz;
                if (o.z < -8f)
                {
                    o.active = false;
                    o.root.SetActive(false);
                    continue;
                }

                if (o.kind == ObsKind.MovingDrone)
                {
                    o.x = Mathf.Sin(Time.time * 2.5f + o.phase) * LaneWidth;
                    o.visualDrone.transform.Rotate(0f, 180f * dt, 0f);
                }

                o.root.transform.position = new Vector3(o.x, 0f, o.z);

                if (!o.hit && Mathf.Abs(o.z) < 0.98f && Mathf.Abs(o.x - _heroX) < 1.08f)
                {
                    if (o.kind == ObsKind.BoostRamp)
                    {
                        o.hit = true;
                        _isGrounded = true;
                        TriggerJump(16.2f);
                        AddTurbo(0.26f);
                        Sfx.Play(Sfx.Id.GateGood, 0.88f, 1.18f);
                        SpawnRing(new Vector3(o.x, 0.15f, 0f), _boostColor, 3.0f);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.4f, 0f), "MEGA JUMP!", _boostColor);
                        continue;
                    }

                    if (o.kind == ObsKind.BonusGate)
                    {
                        o.hit = true;
                        o.active = false;
                        o.root.SetActive(false);
                        _coins += 10;
                        AddTurbo(0.35f);
                        Sfx.Play(Sfx.Id.GateGood, 0.92f, 1.12f);
                        SpawnBurst(new Vector3(o.x, 1.3f, 0f), _gateColor, 10);
                        SpawnRing(new Vector3(o.x, 0.2f, 0f), new Color(1f, 0.86f, 0.18f), 3.4f);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.5f, 0f), "X2 BONUS!", new Color(1f, 0.88f, 0.18f));
                        continue;
                    }

                    if (o.kind == ObsKind.LowHurdle && _heroY > 0.82f)
                    {
                        o.hit = true;
                        _coins += 2;
                        Sfx.Play(Sfx.Id.Pop, 0.65f, 1.25f);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.2f, 0f), "NICE!", _boostColor);
                        continue;
                    }

                    o.hit = true;
                    o.active = false;
                    o.root.SetActive(false);

                    if (inTurbo)
                    {
                        _coins += 10;
                        TriggerShake(0.20f, 0.24f);
                        Sfx.Play(Sfx.Id.Hit, 0.92f, 0.85f);
                        SpawnBurst(new Vector3(o.x, 1.0f, 0f), _wallColor, 12);
                        SpawnRing(new Vector3(o.x, 0.25f, 0f), new Color(1f, 0.84f, 0.16f), 3.6f);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.5f, 0f), "SMASH!", new Color(1f, 0.82f, 0.14f));
                    }
                    else if (_hasShield)
                    {
                        _hasShield = false;
                        _shieldBubble.SetActive(false);
                        _invulnTimer = 1.0f;
                        TriggerShake(0.22f, 0.20f);
                        Sfx.Play(Sfx.Id.Glass, 0.92f);
                        SpawnBurst(new Vector3(_heroX, 1.0f, 0f), _gemColor, 10);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.4f, 0f), "SAVED!", _gemColor);
                    }
                    else if (_invulnTimer <= 0f)
                    {
                        _lives--;
                        _combo = 0;
                        _invulnTimer = 1.2f;
                        _damageFlashT = 1.0f;
                        TriggerShake(0.32f, 0.36f);
                        Sfx.Play(Sfx.Id.Error, 0.92f);
                        SpawnBurst(new Vector3(o.x, 1.0f, 0f), new Color(1f, 0.24f, 0.26f), 12);
                        SpawnRing(new Vector3(_heroX, 0.2f, 0f), new Color(1f, 0.22f, 0.26f), 3.0f);
                        SpawnPopup(new Vector3(_heroX, _heroY + 2.4f, 0f), "-1 HP!", new Color(1f, 0.26f, 0.28f));

                        if (_lives <= 0)
                        {
                            EndRun(false);
                            return;
                        }
                    }
                }
            }
        }

        void EndRun(bool won)
        {
            if (_ended) return;
            _ended = true;
            _endcardAnimT = 0f;

            _ui.ShowDragTutorial(false);
            if (_sprintBanner) _sprintBanner.gameObject.SetActive(false);

            Sfx.Play(won ? Sfx.Id.Win : Sfx.Id.Fail, 0.95f);
            StoreLink.NotifyGameEnded();
            StoreLink.LogEvent(won ? "runner_victory" : "runner_defeat", _coins);

            if (won)
            {
                SpawnBurst(new Vector3(_heroX, 1.6f, 0f), new Color(1f, 0.86f, 0.16f), 15);
                SpawnBurst(new Vector3(_heroX, 1.6f, 0f), _heroColor, 12);
            }

            var titleTr = _endcardCard.Find("EndTitle");
            if (titleTr) { var t = titleTr.GetComponentInChildren<Text>(); if (t) t.text = won ? victoryTitle : defeatTitle; }
            var subTr = _endcardCard.Find("EndSub");
            if (subTr) { var t = subTr.GetComponentInChildren<Text>(); if (t) t.text = won ? victorySubtitle : defeatSubtitle; }
            var scTr = _endcardCard.Find("EndScore");
            if (scTr) { var t = scTr.GetComponentInChildren<Text>(); if (t) t.text = "COINS: " + _coins; }

            _endcardRoot.SetActive(true);
        }

        void TriggerShake(float dur, float amp)
        {
            _shakeTimer = Mathf.Max(_shakeTimer, dur);
            _shakeAmp = Mathf.Max(_shakeAmp, amp);
        }

        void UpdateCamera(float dt, bool inTurbo)
        {
            float targetFov = inTurbo ? 62f : 54f;
            _cam.fieldOfView = Mathf.Lerp(_cam.fieldOfView, targetFov, 1f - Mathf.Exp(-6f * dt));

            Vector3 targetPos = new Vector3(_heroX * 0.36f, _camBasePos.y + _heroY * 0.35f, _camBasePos.z);
            if (_shakeTimer > 0f)
            {
                _shakeTimer -= dt;
                targetPos.x += Random.Range(-_shakeAmp, _shakeAmp);
                targetPos.y += Random.Range(-_shakeAmp, _shakeAmp);
            }
            _cam.transform.position = Vector3.Lerp(_cam.transform.position, targetPos, 1f - Mathf.Exp(-12f * dt));
        }

        void UpdateHud()
        {
            if (_coinsTxt) _coinsTxt.text = "COINS: " + _coins;
            if (_distTxt) _distTxt.text = Mathf.Max(0, Mathf.CeilToInt(_finishLineZ - _distance)) + "M";
            if (_livesTxt) _livesTxt.text = "HP: " + Mathf.Max(0, _lives) + "/" + maxLives;
            if (_livesPillImg)
                _livesPillImg.color = _lives <= 1
                    ? Color.Lerp(new Color(0.96f, 0.12f, 0.22f), new Color(1f, 0.45f, 0.16f), 0.5f + 0.5f * Mathf.Sin(Time.time * 10f))
                    : new Color(0.92f, 0.16f, 0.32f);
            if (_turboFillRect)
                _turboFillRect.sizeDelta = new Vector2(Mathf.Clamp01(_turboCharge) * 444f, -16f);
            if (_turboTxt)
                _turboTxt.text = _turboTimer > 0f ? "TURBO ACTIVE!" : "TURBO CHARGE";
        }

        void SpawnBurst(Vector3 pos, Color col, int count)
        {
            int spawned = 0;
            for (int i = 0; i < _sparks.Count && spawned < count; i++)
            {
                var s = _sparks[i];
                if (s.active) continue;
                s.active = true;
                s.t = 0f;
                s.dur = Random.Range(0.35f, 0.62f);
                s.tr.position = pos;
                s.tr.localScale = Vector3.one * Random.Range(0.20f, 0.38f);
                Prims.SetColor(s.r, col);
                s.vel = new Vector3(Random.Range(-5.5f, 5.5f), Random.Range(3.5f, 8.5f), Random.Range(-3.5f, 5.5f));
                s.tr.gameObject.SetActive(true);
                spawned++;
            }
        }

        void SpawnRing(Vector3 pos, Color col, float maxScale)
        {
            for (int i = 0; i < _rings.Count; i++)
            {
                var r = _rings[i];
                if (r.active) continue;
                r.active = true;
                r.t = 0f;
                r.dur = 0.34f;
                r.maxScale = maxScale;
                r.tr.position = pos;
                r.tr.localScale = new Vector3(0.4f, 0.04f, 0.4f);
                Prims.SetColor(r.r, col);
                r.tr.gameObject.SetActive(true);
                return;
            }
        }

        void SpawnPopup(Vector3 worldPos, string text, Color col)
        {
            for (int i = 0; i < _popups.Count; i++)
            {
                var p = _popups[i];
                if (p.active) continue;
                p.active = true;
                p.t = 0f;
                p.dur = 0.76f;
                p.worldPos = worldPos;
                p.main.text = text;
                p.main.color = col;
                for (int k = 0; k < p.strokes.Length; k++) p.strokes[k].text = text;
                p.rt.gameObject.SetActive(true);
                return;
            }
        }

        void TickVfx(float dt)
        {
            for (int i = 0; i < _sparks.Count; i++)
            {
                var s = _sparks[i];
                if (!s.active) continue;
                s.t += dt;
                if (s.t >= s.dur) { s.active = false; s.tr.gameObject.SetActive(false); continue; }
                s.vel.y -= 18f * dt;
                s.tr.position += s.vel * dt;
                s.tr.Rotate(380f * dt, 260f * dt, 0f);
                s.tr.localScale = Vector3.one * (0.30f * (1f - s.t / s.dur));
            }

            for (int i = 0; i < _rings.Count; i++)
            {
                var r = _rings[i];
                if (!r.active) continue;
                r.t += dt;
                if (r.t >= r.dur) { r.active = false; r.tr.gameObject.SetActive(false); continue; }
                float u = r.t / r.dur;
                float sc = Mathf.Lerp(0.4f, r.maxScale, u);
                r.tr.localScale = new Vector3(sc, 0.04f * (1f - u), sc);
            }

            for (int i = 0; i < _popups.Count; i++)
            {
                var p = _popups[i];
                if (!p.active) continue;
                p.t += dt;
                if (p.t >= p.dur) { p.active = false; p.rt.gameObject.SetActive(false); continue; }
                float u = p.t / p.dur;
                Vector3 wp = p.worldPos + Vector3.up * (u * 2.0f);
                Vector3 sp = _cam.WorldToScreenPoint(wp);
                float sx = (sp.x / Mathf.Max(1f, Screen.width) - 0.5f) * 1080f;
                float sy = (sp.y / Mathf.Max(1f, Screen.height) - 0.5f) * 1920f;
                p.rt.anchoredPosition = new Vector2(sx, sy);
                float sc = u < 0.25f ? Mathf.Lerp(0.35f, 1.24f, u / 0.25f) : Mathf.Lerp(1.24f, 0.94f, (u - 0.25f) / 0.75f);
                p.rt.localScale = Vector3.one * sc;
            }
        }
    }
}
