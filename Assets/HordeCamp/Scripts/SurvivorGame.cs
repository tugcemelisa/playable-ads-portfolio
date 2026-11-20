using System.Collections;
using System.Collections.Generic;
using AdKit;
using JellyAd;
using UnityEngine;
using UnityEngine.UI;

namespace HordeCamp
{
    /// <summary>
    /// Horde-survivor playable: joystick hero grabs an axe at the forge, survives growing skeleton waves,
    /// levels up into spinning blades, fire nova and lightning, then the camera pulls out to reveal
    /// the camp surrounded by a giant horde ("CAN YOU SURVIVE?") and the endcard.
    /// Built fully from primitives at runtime: drop on an empty GameObject and press Play.
    /// </summary>
    [DisallowMultipleComponent]
    public class SurvivorGame : MonoBehaviour
    {
        [Header("Ad")]
        public string gameTitle = "LAST CAMP";
        public string ctaText = "PLAY NOW";
        public string storeUrl = "https://play.google.com/store";
        [Tooltip("Seconds of fighting before the zoom-out reveal.")]
        public float revealAfterSeconds = 24f;

        [Header("Gameplay")]
        public float heroSpeed = 5f;
        public float heroHp = 100f;
        public float enemySpeed = 2.1f;
        public float spawnRateStart = 1.2f;
        public float spawnRateEnd = 12f;
        public int[] xpForLevel = { 4, 14, 32 };

        [Header("Video recording (auto-play)")]
        public bool autoPlay;

        // -------------------------------------------------------------- constants
        static readonly Vector3 ForgePos = new Vector3(-3f, 0f, 3.2f);
        static readonly Vector3 PickupPos = new Vector3(-3f, 0f, 1.2f);
        const float CampHalf = 7f, WorldHalf = 26f;
        static readonly Color Bone = new Color(0.92f, 0.9f, 0.84f), BoneDark = new Color(0.55f, 0.53f, 0.5f);
        static readonly Color Skin = new Color(1f, 0.8f, 0.65f), Hair = new Color(1f, 0.55f, 0.15f);

        enum Phase { Wait, Forge, Fight, Reveal, Result, End }
        Phase phase = Phase.Wait;

        class Enemy
        {
            public Transform tr;
            public Vector3 pos;
            public float hp, hitCd, flash;
            public bool alive = true, horde;
        }

        class Gem
        {
            public Transform tr;
            public Vector3 pos;
        }

        Camera cam;
        Transform world, fx;
        AdUI ui;

        Transform hero, heroAxe;
        Vector3 heroPos = new Vector3(2.5f, 0f, -2.5f), moveDir;
        float hp, hurtFlash;
        Transform hpFill, hpBar;

        int weaponLevel; // 0 none, 1 axe, 2 +blades, 3 +nova, 4 +lightning
        int xp, level;
        float axeTimer, novaTimer, boltTimer, fightTime, spawnTimer, bladeAngle;
        readonly List<Transform> blades = new List<Transform>();
        Transform novaRing;
        float novaT = -1f;
        Transform pickupRing, pickupIcon;

        readonly List<Enemy> enemies = new List<Enemy>();
        readonly List<Gem> gems = new List<Gem>();

        // joystick
        bool touching;
        Vector2 touchOrigin;
        RectTransform joyBase, joyKnob;
        Text levelText;
        Image xpFill;

        // ============================================================ setup
        void Start()
        {
            Application.targetFrameRate = 60;
            hp = heroHp;
            cam = Camera.main;
            if (!cam) cam = new GameObject("Main Camera") { tag = "MainCamera" }.AddComponent<Camera>();
            cam.orthographic = false;
            cam.fieldOfView = 55f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.45f, 0.36f, 0.26f);
            cam.farClipPlane = 250f;
            RenderSettings.fog = false;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.62f, 0.62f, 0.66f);
            // The scene's Sun supplies lighting, including in Playworks.

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;
            ui = AdUI.Create(gameTitle, ctaText, new Color(0.35f, 0.25f, 0.18f), new Color(1f, 0.75f, 0.25f));
            BuildHud();
            BuildWorld();
            BuildHero();
            UpdateCamera(true);

            if (autoPlay) phase = Phase.Forge;
            else ui.ShowDragTutorial(true);
            ui.Banner("GET YOUR WEAPON!", Color.white);
        }

        void BuildWorld()
        {
            // desert outside, green camp inside a fence
            Prims.Make(PrimitiveType.Cube, world, new Vector3(0f, -0.25f, 0f), new Vector3(140f, 0.5f, 140f), new Color(0.62f, 0.5f, 0.35f));
            Prims.Make(PrimitiveType.Cube, world, new Vector3(0f, -0.2f, 0f), new Vector3(CampHalf * 2f + 1f, 0.5f, CampHalf * 2f + 1f), new Color(0.43f, 0.72f, 0.3f));
            for (float t = -CampHalf; t <= CampHalf; t += 1.4f)
            {
                Post(new Vector3(t, 0f, -CampHalf));
                Post(new Vector3(t, 0f, CampHalf));
                Post(new Vector3(-CampHalf, 0f, t));
                Post(new Vector3(CampHalf, 0f, t));
            }
            for (int s = 0; s < 4; s++)
            {
                float a = s * Mathf.PI * 0.5f;
                var dir = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var rail = Prims.Make(PrimitiveType.Cube, world, dir * CampHalf + Vector3.up * 0.45f, new Vector3(CampHalf * 2f, 0.1f, 0.1f), new Color(0.55f, 0.38f, 0.22f));
                rail.transform.localRotation = Quaternion.Euler(0f, s % 2 == 0 ? 90f : 0f, 0f);
            }

            // trees & rocks
            var rnd = new System.Random(3);
            for (int i = 0; i < 26; i++)
            {
                float a = (float)rnd.NextDouble() * Mathf.PI * 2f, r = 9f + (float)rnd.NextDouble() * 16f;
                var p = new Vector3(Mathf.Cos(a) * r, 0f, Mathf.Sin(a) * r);
                if (i % 3 == 0)
                    Prims.Make(PrimitiveType.Sphere, world, p + Vector3.up * 0.3f, new Vector3(1.2f, 0.7f, 1f), new Color(0.5f, 0.5f, 0.52f));
                else
                {
                    Prims.Make(PrimitiveType.Cylinder, world, p + Vector3.up * 0.6f, new Vector3(0.3f, 0.6f, 0.3f), new Color(0.45f, 0.3f, 0.18f));
                    Prims.Make(PrimitiveType.Sphere, world, p + Vector3.up * 1.7f, new Vector3(1.4f, 1.8f, 1.4f), new Color(0.2f, 0.48f, 0.25f));
                }
            }

            // forge hut + anvil + pickup ring with floating axe
            Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0f, 0.9f, 0f), new Vector3(3f, 1.8f, 2.2f), new Color(0.6f, 0.42f, 0.25f));
            var roof = Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0f, 2.1f, 0f), new Vector3(3.4f, 0.35f, 2.6f), new Color(0.75f, 0.6f, 0.2f));
            roof.transform.localRotation = Quaternion.Euler(-8f, 0f, 0f);
            Prims.Make(PrimitiveType.Cube, world, ForgePos + new Vector3(0.6f, 0.3f, -1.4f), new Vector3(0.7f, 0.6f, 0.45f), new Color(0.3f, 0.3f, 0.34f));
            Prims.Make(PrimitiveType.Cylinder, world, ForgePos + new Vector3(-0.9f, 0.4f, -1.4f), new Vector3(0.7f, 0.4f, 0.7f), new Color(1f, 0.45f, 0.1f));
            pickupRing = Prims.Make(PrimitiveType.Cylinder, world, PickupPos + Vector3.up * 0.03f, new Vector3(1.8f, 0.02f, 1.8f), new Color(1f, 0.85f, 0.3f)).transform;
            pickupIcon = new GameObject("AxeIcon").transform;
            pickupIcon.SetParent(world, false);
            pickupIcon.localPosition = PickupPos + Vector3.up * 1.4f;
            AxeModel(pickupIcon, 1.6f);
        }

        void Post(Vector3 p) => Prims.Make(PrimitiveType.Cube, world, p + Vector3.up * 0.4f, new Vector3(0.18f, 0.8f, 0.18f), new Color(0.5f, 0.34f, 0.2f));

        static void AxeModel(Transform parent, float s)
        {
            Prims.Make(PrimitiveType.Cube, parent, Vector3.zero, new Vector3(0.1f, 0.9f, 0.1f) * s, new Color(0.5f, 0.32f, 0.18f));
            Prims.Make(PrimitiveType.Cube, parent, new Vector3(0.15f, 0.32f, 0f) * s, new Vector3(0.35f, 0.3f, 0.06f) * s, new Color(0.8f, 0.82f, 0.86f));
        }

        void BuildHero()
        {
            hero = Prims.Figure(world, new Color(0.6f, 0.42f, 0.25f), Hair, Skin, new Color(0f, 0f, 0f, 0f), 1.15f);
            hero.GetChild(3).gameObject.SetActive(false); // no item until the forge
            heroAxe = new GameObject("Axe").transform;
            heroAxe.SetParent(hero, false);
            heroAxe.localPosition = new Vector3(0.3f, 0.55f, 0.1f);
            AxeModel(heroAxe, 0.9f);
            heroAxe.gameObject.SetActive(false);

            hpBar = new GameObject("HpBar").transform;
            hpBar.SetParent(world, false);
            Prims.Make(PrimitiveType.Cube, hpBar, Vector3.zero, new Vector3(1.3f, 0.16f, 0.05f), new Color(0.15f, 0.15f, 0.18f));
            hpFill = Prims.Make(PrimitiveType.Cube, hpBar, new Vector3(0f, 0f, -0.03f), new Vector3(1.22f, 0.1f, 0.05f), new Color(0.35f, 0.9f, 0.35f)).transform;

            novaRing = Prims.Make(PrimitiveType.Cylinder, fx, Vector3.zero, Vector3.zero, new Color(1f, 0.5f, 0.1f)).transform;
            novaRing.gameObject.SetActive(false);
        }

        void BuildHud()
        {
            var top = new Vector2(0.5f, 1f);
            levelText = AdUI.Txt(ui.Root, "LV 1", 62, Color.white, top, new Vector2(0f, -70f));
            var bg = AdUI.Img(ui.Root, Res.Round(128), new Color(0f, 0f, 0f, 0.35f), top, new Vector2(0f, -145f), new Vector2(620f, 40f), true);
            xpFill = AdUI.Img(bg.transform, Res.Square, new Color(0.35f, 0.75f, 1f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(604f, 26f), false);
            xpFill.type = Image.Type.Filled;
            xpFill.fillMethod = Image.FillMethod.Horizontal;
            xpFill.fillAmount = 0f;

            joyBase = AdUI.Img(ui.Root, Res.Circle, new Color(1f, 1f, 1f, 0.22f), Vector2.zero, Vector2.zero, new Vector2(300f, 300f), false).rectTransform;
            joyBase.anchorMin = joyBase.anchorMax = new Vector2(0f, 0f);
            joyKnob = AdUI.Img(joyBase, Res.Circle, new Color(1f, 1f, 1f, 0.75f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(130f, 130f), false).rectTransform;
            joyBase.gameObject.SetActive(false);
            ui.Root.SetAsLastSibling();
        }

        // ============================================================ loop
        void Update()
        {
            float dt = Time.deltaTime;
            ui.Tick(Time.unscaledDeltaTime);
            ReadInput();

            if (phase == Phase.Forge || phase == Phase.Fight || phase == Phase.Reveal)
            {
                if (autoPlay) moveDir = AutoDir();
                if (phase != Phase.Reveal)
                {
                    heroPos += moveDir * heroSpeed * dt;
                    heroPos.x = Mathf.Clamp(heroPos.x, -WorldHalf, WorldHalf);
                    heroPos.z = Mathf.Clamp(heroPos.z, -WorldHalf, WorldHalf);
                }
            }

            if (phase == Phase.Forge && (heroPos - PickupPos).sqrMagnitude < 1.2f) GetAxe();
            if (phase == Phase.Fight)
            {
                fightTime += dt;
                Spawn(dt);
                Weapons(dt);
                if (fightTime >= revealAfterSeconds) StartCoroutine(Reveal());
            }
            if (phase == Phase.Fight || phase == Phase.Reveal) UpdateEnemies(dt);
            UpdateGems(dt);
            UpdateHero(dt);
            UpdateCamera(false);
            UpdateJoystickVisual();

            if (pickupIcon && pickupIcon.gameObject.activeSelf)
            {
                pickupIcon.Rotate(0f, 120f * dt, 0f, Space.World);
                pickupIcon.localPosition = PickupPos + Vector3.up * (1.4f + Mathf.Sin(Time.time * 3f) * 0.15f);
                float s = 1.8f + Mathf.Sin(Time.time * 5f) * 0.15f;
                pickupRing.localScale = new Vector3(s, 0.02f, s);
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
                if (phase == Phase.Wait) { phase = Phase.Forge; ui.ShowDragTutorial(false); }
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
            else moveDir = Vector3.zero;
        }

        void UpdateJoystickVisual()
        {
            bool show = (touching && !autoPlay) || (autoPlay && phase != Phase.Reveal && phase != Phase.End && phase != Phase.Result);
            show &= phase != Phase.End;
            joyBase.gameObject.SetActive(show);
            if (!show) return;
            var canvasScale = ui.Root.localScale.x;
            Vector2 origin = autoPlay ? new Vector2(Screen.width * 0.5f, Screen.height * 0.18f) : touchOrigin;
            joyBase.anchoredPosition = origin / canvasScale;
            joyKnob.anchoredPosition = new Vector2(moveDir.x, moveDir.z) * 95f;
        }

        void UpdateHero(float dt)
        {
            hero.localPosition = heroPos + Vector3.up * (moveDir.sqrMagnitude > 0.01f ? Mathf.Abs(Mathf.Sin(Time.time * 14f)) * 0.12f : 0f);
            if (moveDir.sqrMagnitude > 0.01f)
                hero.localRotation = Quaternion.Slerp(hero.localRotation, Quaternion.LookRotation(moveDir), 1f - Mathf.Exp(-14f * dt));
            hurtFlash = Mathf.MoveTowards(hurtFlash, 0f, dt * 5f);
            Prims.SetColor(hero.GetChild(0).GetComponent<Renderer>(), Color.Lerp(new Color(0.6f, 0.42f, 0.25f), Color.red, hurtFlash));

            hpBar.position = heroPos + Vector3.up * 2.1f;
            hpBar.rotation = cam.transform.rotation;
            float f = Mathf.Clamp01(hp / heroHp);
            hpFill.localScale = new Vector3(1.22f * f, 0.1f, 0.05f);
            hpFill.localPosition = new Vector3(-0.61f * (1f - f), 0f, -0.03f);
        }

        void UpdateCamera(bool snap)
        {
            Vector3 pos, look;
            if (phase == Phase.Reveal || phase == Phase.End || phase == Phase.Result && revealT > 0f)
            {
                float k = Ease(Mathf.Clamp01(revealT / 2.2f));
                pos = Vector3.Lerp(heroPos + new Vector3(0f, 14f, -9f), new Vector3(0f, 62f, -40f), k);
                look = Vector3.Lerp(heroPos + new Vector3(0f, 0f, 1.5f), Vector3.zero, k);
                cam.transform.position = pos;
                cam.transform.rotation = Quaternion.LookRotation(look - pos);
                return;
            }
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            float h = Mathf.Lerp(16f, 12f, Mathf.Clamp01((a - 0.5f) / 0.5f));
            pos = heroPos + new Vector3(0f, h, -h * 0.62f);
            look = heroPos + new Vector3(0f, 0f, 1.5f);
            cam.transform.position = snap ? pos : Vector3.Lerp(cam.transform.position, pos, 1f - Mathf.Exp(-6f * Time.deltaTime));
            cam.transform.rotation = Quaternion.LookRotation(look - cam.transform.position);
        }

        // ============================================================ forge & levels
        void GetAxe()
        {
            phase = Phase.Fight;
            weaponLevel = 1;
            heroAxe.gameObject.SetActive(true);
            pickupIcon.gameObject.SetActive(false);
            pickupRing.gameObject.SetActive(false);
            Prims.Burst(this, fx, PickupPos + Vector3.up, new Color(1f, 0.85f, 0.3f), 24);
            Sfx.Play(Sfx.Id.GateGood);
            ui.Banner("THEY'RE COMING!", new Color(1f, 0.85f, 0.3f));
            // first wave already close to the fence
            for (int i = 0; i < 8; i++) SpawnEnemy(9f + Random.Range(0f, 3f), false);
        }

        void AddXp()
        {
            xp++;
            int need = level < xpForLevel.Length ? xpForLevel[level] : int.MaxValue;
            int prev = level > 0 ? xpForLevel[level - 1] : 0;
            if (xp >= need)
            {
                level++;
                weaponLevel = Mathf.Min(4, weaponLevel + 1);
                levelText.text = "LV " + (level + 1);
                StartCoroutine(LevelUp());
                prev = need;
                need = level < xpForLevel.Length ? xpForLevel[level] : need + 30;
            }
            xpFill.fillAmount = Mathf.Clamp01((xp - prev) / (float)Mathf.Max(1, need - prev));
        }

        IEnumerator LevelUp()
        {
            string name = weaponLevel == 2 ? "SPINNING BLADES!" : weaponLevel == 3 ? "FIRE NOVA!" : "LIGHTNING STORM!";
            ui.Banner("LEVEL UP!  " + name, new Color(1f, 0.85f, 0.3f));
            Sfx.Play(Sfx.Id.Win);
            Prims.Burst(this, fx, heroPos + Vector3.up, new Color(1f, 0.9f, 0.4f), 30, 6f);
            if (weaponLevel == 2)
                for (int i = 0; i < 3; i++)
                {
                    var b = Prims.Make(PrimitiveType.Cube, fx, heroPos, new Vector3(0.9f, 0.08f, 0.22f), new Color(0.8f, 0.9f, 1f)).transform;
                    blades.Add(b);
                }
            Time.timeScale = 0.25f;
            yield return new WaitForSecondsRealtime(0.45f);
            Time.timeScale = 1f;
        }

        // ============================================================ enemies
        void Spawn(float dt)
        {
            float k = Mathf.Clamp01(fightTime / revealAfterSeconds);
            spawnTimer += dt * Mathf.Lerp(spawnRateStart, spawnRateEnd, k * k);
            while (spawnTimer >= 1f)
            {
                spawnTimer -= 1f;
                SpawnEnemy(Random.Range(12f, 15f), false);
            }
        }

        void SpawnEnemy(float dist, bool horde)
        {
            float a = Random.value * Mathf.PI * 2f;
            var center = horde ? Vector3.zero : heroPos;
            var p = center + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * dist;
            var e = new Enemy { pos = p, hp = 18f + fightTime * 1.2f, horde = horde };
            e.tr = Prims.Figure(world, Bone, BoneDark, Bone, BoneDark, horde ? Random.Range(0.9f, 1.1f) : 1f);
            e.tr.localPosition = p;
            enemies.Add(e);
        }

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
                var vel = d > 0.01f ? to / d * (e.horde ? 0.8f : enemySpeed) : Vector3.zero;

                if (!e.horde)
                {
                    // light separation so the horde spreads into a crowd
                    for (int j = i + 1; j < enemies.Count && j < i + 25; j++)
                    {
                        var o = enemies[j];
                        if (!o.alive) continue;
                        var sep = e.pos - o.pos;
                        float sd = sep.sqrMagnitude;
                        if (sd < 0.5f && sd > 0.0001f)
                        {
                            var push = sep / Mathf.Sqrt(sd) * (0.7f - Mathf.Sqrt(sd)) * 3f * dt;
                            e.pos += push;
                            o.pos -= push;
                        }
                    }
                    if (d < 0.85f && phase == Phase.Fight)
                    {
                        hp -= 9f * dt;
                        if (autoPlay) hp = Mathf.Max(hp, heroHp * 0.3f); // the video always reaches the reveal
                        hurtFlash = 1f;
                        vel = Vector3.zero;
                        if (hp <= 0f) { StartCoroutine(Die()); }
                    }
                }

                e.pos += vel * dt;
                e.hitCd -= dt;
                e.flash = Mathf.MoveTowards(e.flash, 0f, dt * 6f);
                e.tr.localPosition = e.pos + Vector3.up * Mathf.Abs(Mathf.Sin(Time.time * 10f + i)) * 0.08f;
                if (vel.sqrMagnitude > 0.001f) e.tr.localRotation = Quaternion.LookRotation(vel);
                if (e.flash > 0f) Prims.SetColor(e.tr.GetChild(0).GetComponent<Renderer>(), Color.Lerp(Bone, Color.red, e.flash));
            }
            if (enemies.Count > 0 && Time.frameCount % 60 == 0) enemies.RemoveAll(x => !x.alive);
        }

        void Damage(Enemy e, float dmg)
        {
            if (!e.alive || e.horde) return;
            e.hp -= dmg;
            e.flash = 1f;
            if (e.hp > 0f) return;
            e.alive = false;
            Sfx.Play(Sfx.Id.Pop, 0.6f);
            Prims.Burst(this, fx, e.pos + Vector3.up * 0.6f, Bone, 7);
            Destroy(e.tr.gameObject);
            var g = new Gem { pos = e.pos + Vector3.up * 0.3f };
            g.tr = Prims.Make(PrimitiveType.Cube, world, g.pos, Vector3.one * 0.28f, new Color(0.3f, 0.75f, 1f)).transform;
            g.tr.localRotation = Quaternion.Euler(45f, 0f, 45f);
            gems.Add(g);
        }

        void UpdateGems(float dt)
        {
            for (int i = gems.Count - 1; i >= 0; i--)
            {
                var g = gems[i];
                var to = heroPos + Vector3.up * 0.6f - g.pos;
                float d = to.magnitude;
                if (d < 3.2f) g.pos += to.normalized * Mathf.Lerp(14f, 5f, d / 3.2f) * dt;
                g.tr.localPosition = g.pos + Vector3.up * Mathf.Sin(Time.time * 4f + i) * 0.08f;
                g.tr.Rotate(0f, 180f * dt, 0f, Space.World);
                if (d < 0.5f)
                {
                    Destroy(g.tr.gameObject);
                    gems.RemoveAt(i);
                    Sfx.Play(Sfx.Id.Tap, 0.4f, 1.6f);
                    if (phase == Phase.Fight) AddXp();
                }
            }
        }

        // ============================================================ weapons
        void Weapons(float dt)
        {
            // 1: axe swing on everything close
            axeTimer += dt;
            if (weaponLevel >= 1 && axeTimer >= 0.55f && Nearest(2.3f) != null)
            {
                axeTimer = 0f;
                Sfx.Play(Sfx.Id.Hit, 0.7f);
                StartCoroutine(AxeSwing());
                foreach (var e in enemies)
                    if (e.alive && !e.horde && (e.pos - heroPos).sqrMagnitude < 2.3f * 2.3f) Damage(e, 26f);
            }

            // 2: blades orbit
            if (weaponLevel >= 2)
            {
                if (weaponLevel >= 3 && blades.Count < 5)
                    blades.Add(Prims.Make(PrimitiveType.Cube, fx, heroPos, new Vector3(0.9f, 0.08f, 0.22f), new Color(0.8f, 0.9f, 1f)).transform);
                bladeAngle += dt * 4.5f;
                for (int i = 0; i < blades.Count; i++)
                {
                    float a = bladeAngle + i * Mathf.PI * 2f / blades.Count;
                    var p = heroPos + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * 2.4f + Vector3.up * 0.7f;
                    blades[i].localPosition = p;
                    blades[i].localRotation = Quaternion.Euler(0f, -a * Mathf.Rad2Deg + Time.time * 900f, 0f);
                    foreach (var e in enemies)
                        if (e.alive && !e.horde && e.hitCd <= 0f && (e.pos - new Vector3(p.x, 0f, p.z)).sqrMagnitude < 0.6f)
                        { e.hitCd = 0.3f; Damage(e, 16f); }
                }
            }

            // 3: fire nova
            if (weaponLevel >= 3)
            {
                novaTimer += dt;
                if (novaTimer >= 1.7f) { novaTimer = 0f; novaT = 0f; novaRing.gameObject.SetActive(true); }
                if (novaT >= 0f)
                {
                    novaT += dt / 0.45f;
                    float r = Mathf.Lerp(0.5f, 6.5f, novaT);
                    novaRing.localPosition = heroPos + Vector3.up * 0.15f;
                    novaRing.localScale = new Vector3(r * 2f, 0.03f, r * 2f);
                    foreach (var e in enemies)
                    {
                        if (!e.alive || e.horde) continue;
                        float d = (e.pos - heroPos).magnitude;
                        if (Mathf.Abs(d - r) < 0.7f && e.hitCd <= 0f) { e.hitCd = 0.25f; Damage(e, 40f); }
                    }
                    if (novaT >= 1f) { novaT = -1f; novaRing.gameObject.SetActive(false); }
                }
            }

            // 4: lightning
            if (weaponLevel >= 4)
            {
                boltTimer += dt;
                if (boltTimer >= 0.35f)
                {
                    boltTimer = 0f;
                    for (int k = 0; k < 3; k++)
                    {
                        var e = RandomEnemy(9f);
                        if (e != null) StartCoroutine(Bolt(e));
                    }
                }
            }
        }

        Enemy Nearest(float range)
        {
            Enemy best = null;
            float bd = range * range;
            foreach (var e in enemies)
            {
                if (!e.alive || e.horde) continue;
                float d = (e.pos - heroPos).sqrMagnitude;
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
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.2f)
            {
                heroAxe.localRotation = Quaternion.Euler(Mathf.Lerp(-60f, 110f, k), 0f, 0f);
                yield return null;
            }
            heroAxe.localRotation = Quaternion.identity;
            var trail = Prims.Make(PrimitiveType.Cylinder, fx, heroPos + Vector3.up * 0.4f, new Vector3(4.4f, 0.02f, 4.4f), new Color(1f, 1f, 1f));
            yield return new WaitForSeconds(0.06f);
            Destroy(trail);
        }

        IEnumerator Bolt(Enemy e)
        {
            var p = e.pos;
            var b = Prims.Make(PrimitiveType.Cube, fx, p + Vector3.up * 6f, new Vector3(0.18f, 12f, 0.18f), new Color(1f, 0.95f, 0.4f));
            Damage(e, 120f);
            Sfx.Play(Sfx.Id.Glass, 0.5f);
            Prims.Burst(this, fx, p + Vector3.up * 0.3f, new Color(1f, 0.95f, 0.5f), 6, 5f);
            yield return new WaitForSeconds(0.1f);
            Destroy(b);
        }

        // ============================================================ autoplay
        Vector3 AutoDir()
        {
            if (phase == Phase.Forge)
            {
                var to = PickupPos - heroPos;
                return to.magnitude > 0.3f ? to.normalized : Vector3.zero;
            }
            var away = Vector3.zero;
            foreach (var e in enemies)
            {
                if (!e.alive || e.horde) continue;
                var d = heroPos - e.pos;
                float m = d.sqrMagnitude;
                if (m < 36f) away += d / Mathf.Max(0.3f, m);
            }
            // circle inside the camp, drift toward gems, keep away from the crowd
            var orbit = Vector3.Cross(Vector3.up, heroPos).normalized * 0.6f;
            var home = -heroPos * 0.08f;
            Vector3 gemPull = Vector3.zero;
            float gd = 36f;
            foreach (var g in gems)
            {
                float d = (g.pos - heroPos).sqrMagnitude;
                if (d < gd) { gd = d; gemPull = (g.pos - heroPos).normalized * 0.5f; }
            }
            var dir = away * 1.6f + orbit + home + gemPull;
            dir.y = 0f;
            return dir.sqrMagnitude > 0.01f ? Vector3.ClampMagnitude(dir, 1f) : Vector3.zero;
        }

        // ============================================================ endings
        float revealT;

        IEnumerator Reveal()
        {
            if (phase != Phase.Fight) yield break;
            phase = Phase.Reveal;
            moveDir = Vector3.zero;
            for (int i = 0; i < 360; i++) SpawnEnemy(Random.Range(CampHalf + 3f, 40f), true);
            yield return new WaitForSeconds(0.2f);
            ui.Banner("CAN YOU SURVIVE?", new Color(1f, 0.4f, 0.35f));
            Sfx.Play(Sfx.Id.Stomp);
            while (revealT < 2.2f)
            {
                revealT += Time.deltaTime;
                yield return null;
            }
            yield return new WaitForSeconds(1.2f);
            ShowEndcard("Thousands are coming. Build your camp!");
        }

        IEnumerator Die()
        {
            if (phase != Phase.Fight) yield break;
            phase = Phase.Result;
            ui.Banner("YOU DIED", new Color(1f, 0.35f, 0.35f));
            Sfx.Play(Sfx.Id.Fail);
            Prims.Burst(this, fx, heroPos + Vector3.up, Hair, 24);
            hero.gameObject.SetActive(false);
            yield return new WaitForSeconds(1.5f);
            ShowEndcard("So close! Can you survive longer?");
        }

        void ShowEndcard(string sub)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            Time.timeScale = 1f;
            ui.ShowEndcard(sub);
        }

        static float Ease(float k) => k * k * (3f - 2f * k);
    }
}
