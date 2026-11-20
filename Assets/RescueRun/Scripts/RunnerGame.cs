using System.Collections;
using System.Collections.Generic;
using AdKit;
using JellyAd;
using UnityEngine;

namespace RescueRun
{
    /// <summary>
    /// Runner-shooter playable: drag the squad left/right, pass +/x gates, shoot the glass tank
    /// to free the hero (x2 power), mow through the horde and fight the boss.
    /// Built fully from primitives at runtime: drop on an empty GameObject and press Play.
    /// </summary>
    [DisallowMultipleComponent]
    public class RunnerGame : MonoBehaviour
    {
        [Header("Ad")]
        public string gameTitle = "RESCUE SQUAD";
        public string ctaText = "PLAY NOW";
        public string storeUrl = "https://play.google.com/store";
        public float endcardAfterSeconds = 45f;

        [Header("Gameplay")]
        public float runSpeed = 8.5f;
        public float dpsPerSoldier = 10f;
        public int startSquad = 1;
        public float tankHp = 260f;
        public float bossHp = 6000f;
        public float gateHitDamage = 6f;

        [Header("Video recording (auto-play)")]
        public bool autoPlay;
        [Tooltip("Boss can't drop below this HP fraction in auto-play, so the video ends on a 'so close' DEFEAT.")]
        public bool autoPlayFailEnding = true;
        [Range(0f, 0.3f)] public float failClampFraction = 0.06f;

        // -------------------------------------------------------------- tuning
        const float RoadHalf = 4f, MoveLimit = 3.2f, FireInterval = 0.15f, BulletSpeed = 42f, BulletRange = 32f;
        const int MaxVisualSoldiers = 70;

        static readonly int ColorId = Shader.PropertyToID("_Color");
        static readonly Color Blue = new Color(0.22f, 0.5f, 0.95f), Red = new Color(0.9f, 0.22f, 0.25f);
        static readonly Color Skin = new Color(1f, 0.8f, 0.65f), Dark = new Color(0.15f, 0.16f, 0.2f);

        enum Phase { Wait, Run, Boss, Result, End }
        Phase phase = Phase.Wait;

        class Unit
        {
            public Transform tr;
            public float x, z, hp, hit;
            public bool alive = true;
        }

        class Gate
        {
            public float z;
            public int[] val = new int[2];
            public bool[] mul = new bool[2];
            public float[] acc = new float[2];
            public Label[] txt = new Label[2];
            public Renderer[] panel = new Renderer[2];
            public Transform root;
            public bool passed;
        }

        class Bullet
        {
            public Transform tr;
            public float x, z, dmg, startZ;
        }

        Camera cam;
        Transform world, fx;
        AdUI ui;

        float squadX, squadZ, targetX, power = 1f, fireTimer, playTime, bossContactTimer;
        int squad;
        readonly List<Transform> soldiers = new List<Transform>();
        Label squadLabel;
        Transform hero;

        readonly List<Unit> enemies = new List<Unit>();
        readonly List<Gate> gates = new List<Gate>();
        readonly List<Bullet> bullets = new List<Bullet>();
        readonly Stack<Bullet> bulletPool = new Stack<Bullet>();

        Unit tank;
        float tankMax;
        Label tankLabel, helpLabel;
        Renderer tankGlass;
        Transform trappedHero;
        bool tankBroken;

        Unit boss;
        float bossMax, bossZStart;
        Transform bossBarFill;

        bool dragging;
        float lastPointerX;
        readonly List<Transform> billboards = new List<Transform>();

        // ============================================================ setup
        void Start()
        {
            Application.targetFrameRate = 60;
            cam = Camera.main;
            if (!cam) cam = new GameObject("Main Camera") { tag = "MainCamera" }.AddComponent<Camera>();
            cam.orthographic = false;
            cam.fieldOfView = 60f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.62f, 0.78f, 0.95f);
            cam.farClipPlane = 200f;

            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogColor = cam.backgroundColor;
            RenderSettings.fogStartDistance = 35f;
            RenderSettings.fogEndDistance = 85f;
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.62f, 0.64f, 0.72f);

            // The scene's Sun supplies lighting, including in Playworks.

            world = new GameObject("World").transform;
            fx = new GameObject("FX").transform;
            ui = AdUI.Create(gameTitle, ctaText, new Color(0.2f, 0.32f, 0.62f), new Color(1f, 0.85f, 0.25f));
            AddEndcardMascots();

            squad = startSquad;
            BuildLevel();
            squadLabel = Res.MakeLabel(world, squad.ToString(), 0.9f, Color.white, 50, Vector3.zero);
            billboards.Add(squadLabel.transform);
            SyncSoldiers(true);
            UpdateCamera(true);

            if (autoPlay) StartRun();
            else ui.ShowDragTutorial(true);
        }

        void StartRun()
        {
            phase = Phase.Run;
            ui.ShowDragTutorial(false);
            ui.Banner("SAVE THE HERO!", Color.white);
        }

        void BuildLevel()
        {
            float end = 175f;
            // ground, road, rails, lane dashes
            Prim(PrimitiveType.Cube, world, new Vector3(0f, -0.3f, end * 0.5f), new Vector3(80f, 0.4f, end + 120f), new Color(0.55f, 0.42f, 0.32f));
            Prim(PrimitiveType.Cube, world, new Vector3(0f, -0.1f, end * 0.5f), new Vector3(RoadHalf * 2f, 0.2f, end + 60f), new Color(0.6f, 0.62f, 0.67f));
            for (int s = -1; s <= 1; s += 2)
            {
                Prim(PrimitiveType.Cube, world, new Vector3(s * (RoadHalf + 0.25f), 0.25f, end * 0.5f), new Vector3(0.5f, 0.7f, end + 60f), new Color(0.38f, 0.4f, 0.46f));
                Prim(PrimitiveType.Cube, world, new Vector3(s * (RoadHalf + 0.25f), 0.65f, end * 0.5f), new Vector3(0.6f, 0.12f, end + 60f), new Color(0.95f, 0.75f, 0.2f));
            }
            for (float z = -10f; z < end + 20f; z += 4f)
                Prim(PrimitiveType.Cube, world, new Vector3(0f, 0.01f, z), new Vector3(0.15f, 0.02f, 1.8f), new Color(0.92f, 0.92f, 0.92f));

            // level script
            AddGate(22f, 5, false, -2, false);
            AddEnemyGroup(38f, 6, 2.2f);
            AddGate(52f, 2, true, -5, false);
            AddTank(72f, 2.2f);
            AddEnemyGroup(82f, 14, 3.4f);
            AddGate(100f, 8, false, 3, true);
            AddEnemyGroup(118f, 26, 3.6f);
            AddEnemyGroup(132f, 18, 3.6f);
            AddBoss(160f);
        }

        // ============================================================ builders
        GameObject Prim(PrimitiveType t, Transform parent, Vector3 pos, Vector3 scale, Color c)
        {
            var g = GameObject.CreatePrimitive(t);
            Destroy(g.GetComponent<Collider>());
            g.transform.SetParent(parent, false);
            g.transform.localPosition = pos;
            g.transform.localScale = scale;
            SetColor(g.GetComponent<Renderer>(), c);
            return g;
        }

        static void SetColor(Renderer r, Color c)
        {
            var mpb = new MaterialPropertyBlock();
            r.GetPropertyBlock(mpb);
            mpb.SetColor(ColorId, c);
            r.SetPropertyBlock(mpb);
        }

        Transform Figure(Transform parent, Color body, Color helmet, Color skin, float scale)
        {
            var root = new GameObject("Figure").transform;
            root.SetParent(parent, false);
            root.localScale = Vector3.one * scale;
            Prim(PrimitiveType.Capsule, root, new Vector3(0f, 0.42f, 0f), new Vector3(0.46f, 0.42f, 0.4f), body);
            Prim(PrimitiveType.Sphere, root, new Vector3(0f, 0.98f, 0f), Vector3.one * 0.4f, skin);
            Prim(PrimitiveType.Sphere, root, new Vector3(0f, 1.07f, -0.02f), new Vector3(0.46f, 0.3f, 0.46f), helmet);
            Prim(PrimitiveType.Cube, root, new Vector3(0.2f, 0.5f, 0.22f), new Vector3(0.09f, 0.09f, 0.5f), Dark);
            return root;
        }

        void AddGate(float z, int lv, bool lmul, int rv, bool rmul)
        {
            var g = new Gate { z = z };
            g.root = new GameObject("Gate").transform;
            g.root.SetParent(world, false);
            g.val[0] = lv; g.mul[0] = lmul;
            g.val[1] = rv; g.mul[1] = rmul;
            for (int s = 0; s < 2; s++)
            {
                float x = s == 0 ? -2f : 2f;
                var p = Prim(PrimitiveType.Cube, g.root, new Vector3(x, 1.0f, z), new Vector3(3.8f, 2.0f, 0.25f), Color.white);
                g.panel[s] = p.GetComponent<Renderer>();
                Prim(PrimitiveType.Cube, g.root, new Vector3(x, 2.1f, z), new Vector3(3.9f, 0.2f, 0.35f), Dark);
                g.txt[s] = Res.MakeLabel(g.root, "", 1.2f, Color.white, 40, new Vector3(x, 1.1f, z - 0.4f));
                billboards.Add(g.txt[s].transform);
            }
            Prim(PrimitiveType.Cube, g.root, new Vector3(0f, 1.0f, z), new Vector3(0.25f, 2.2f, 0.4f), Dark);
            RefreshGate(g);
            gates.Add(g);
        }

        void RefreshGate(Gate g)
        {
            for (int s = 0; s < 2; s++)
            {
                bool good = g.mul[s] ? g.val[s] >= 1 : g.val[s] >= 0;
                SetColor(g.panel[s], good ? new Color(0.35f, 0.65f, 1f) : new Color(1f, 0.4f, 0.4f));
                g.txt[s].Text = g.mul[s] ? "x" + g.val[s] : (g.val[s] >= 0 ? "+" + g.val[s] : g.val[s].ToString());
            }
        }

        void AddEnemyGroup(float z, int count, float width)
        {
            int perRow = Mathf.Max(1, Mathf.RoundToInt(width / 0.75f) + 1);
            for (int i = 0; i < count; i++)
            {
                int row = i / perRow, col = i % perRow;
                float x = Mathf.Lerp(-width, width, perRow == 1 ? 0.5f : col / (perRow - 1f)) + Random.Range(-0.2f, 0.2f);
                var u = new Unit { x = x, z = z + row * 0.9f, hp = 3f };
                u.tr = Figure(world, Red, new Color(0.45f, 0.1f, 0.12f), new Color(0.65f, 0.85f, 0.55f), 1f);
                u.tr.localPosition = new Vector3(u.x, 0f, u.z);
                u.tr.localRotation = Quaternion.Euler(0f, 180f, 0f);
                enemies.Add(u);
            }
        }

        void AddTank(float z, float x)
        {
            tank = new Unit { x = x, z = z, hp = tankHp };
            tankMax = tankHp;
            tank.tr = new GameObject("Tank").transform;
            tank.tr.SetParent(world, false);
            tank.tr.localPosition = new Vector3(x, 0f, z);
            Prim(PrimitiveType.Cylinder, tank.tr, new Vector3(0f, 0.25f, 0f), new Vector3(2.6f, 0.25f, 2.6f), new Color(0.2f, 0.35f, 0.75f));
            Prim(PrimitiveType.Cylinder, tank.tr, new Vector3(0f, 3.3f, 0f), new Vector3(2.5f, 0.15f, 2.5f), new Color(0.2f, 0.45f, 0.95f));
            tankGlass = Prim(PrimitiveType.Cylinder, tank.tr, new Vector3(0f, 1.8f, 0f), new Vector3(2.3f, 1.35f, 2.3f), new Color(0.55f, 0.85f, 1f)).GetComponent<Renderer>();
            trappedHero = Figure(world, Blue, new Color(0.95f, 0.75f, 0.15f), Skin, 1.6f);
            trappedHero.localPosition = new Vector3(x, 0.5f, z - 1.25f);
            trappedHero.localRotation = Quaternion.Euler(0f, 180f, 0f);
            tankLabel = Res.MakeLabel(world, Mathf.CeilToInt(tankHp).ToString(), 1.3f, Color.white, 45, new Vector3(x, 2.2f, z - 1.6f));
            helpLabel = Res.MakeLabel(world, "HELP!!", 0.9f, new Color(1f, 0.9f, 0.2f), 46, new Vector3(x - 1.4f, 3.6f, z - 1.3f));
            billboards.Add(tankLabel.transform);
            billboards.Add(helpLabel.transform);
        }

        void AddBoss(float z)
        {
            bossZStart = z;
            boss = new Unit { x = 0f, z = z, hp = bossHp };
            bossMax = bossHp;
            boss.tr = Figure(world, new Color(0.75f, 0.2f, 0.25f), new Color(0.3f, 0.05f, 0.08f), new Color(0.95f, 0.6f, 0.6f), 4f);
            boss.tr.localPosition = new Vector3(0f, 0f, z);
            boss.tr.localRotation = Quaternion.Euler(0f, 180f, 0f);
            var bar = new GameObject("BossBar").transform;
            bar.SetParent(boss.tr, false);
            bar.localPosition = new Vector3(0f, 1.6f, 0f);
            bar.localScale = Vector3.one / 4f;
            Prim(PrimitiveType.Cube, bar, Vector3.zero, new Vector3(4.2f, 0.45f, 0.1f), Dark);
            bossBarFill = Prim(PrimitiveType.Cube, bar, new Vector3(0f, 0f, -0.06f), new Vector3(4f, 0.32f, 0.1f), new Color(1f, 0.3f, 0.3f)).transform;
            billboards.Add(bar);
            AddEnemyGroup(z - 4f, 10, 3.5f);
        }

        void AddEndcardMascots()
        {
            var c = new Vector2(0.5f, 0.5f);
            for (int i = 0; i < 3; i++)
            {
                var b = AdUI.Img(ui.Card, Res.Round(128), i == 1 ? new Color(0.95f, 0.75f, 0.15f) : Blue, c, new Vector2((i - 1) * 190f, -110f), new Vector2(120f, 150f), true);
                AdUI.Img(b.transform, Res.Circle, Skin, c, new Vector2(0f, 70f), new Vector2(100f, 100f), false);
                AdUI.Img(b.transform, Res.Round(128), i == 1 ? new Color(0.95f, 0.75f, 0.15f) : new Color(0.15f, 0.35f, 0.8f), c, new Vector2(0f, 110f), new Vector2(120f, 50f), true);
            }
        }

        // ============================================================ loop
        void Update()
        {
            float dt = Time.deltaTime;
            ui.Tick(dt);
            HandleInput();

            if (phase == Phase.Run || phase == Phase.Boss)
            {
                playTime += dt;
                if (autoPlay) AutoSteer();
                squadX = Mathf.MoveTowards(squadX, targetX, (autoPlay ? 7f : 30f) * dt);

                if (phase == Phase.Run)
                {
                    squadZ += runSpeed * dt;
                    if (boss != null && squadZ >= boss.z - 13f)
                    {
                        phase = Phase.Boss;
                        ui.Banner("BOSS FIGHT!", new Color(1f, 0.4f, 0.35f));
                    }
                }

                Fire(dt);
                UpdateEnemies(dt);
                UpdateGates();
                UpdateTank(dt);
                UpdateBoss(dt);

                if (squad <= 0) StartCoroutine(Lose());
                if (endcardAfterSeconds > 0f && playTime > endcardAfterSeconds) ShowEndcard(false);
            }

            UpdateBullets(dt);
            SyncSoldiers(false);
            UpdateCamera(false);
            foreach (var b in billboards) if (b) b.rotation = cam.transform.rotation;
            if (helpLabel) helpLabel.transform.localScale = Vector3.one * (1f + 0.12f * Mathf.Sin(Time.time * 8f));
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
                if (phase == Phase.End) { Sfx.Play(Sfx.Id.Click); StoreLink.Open(storeUrl); return; }
                if (phase == Phase.Wait) { StartRun(); Sfx.Play(Sfx.Id.Tap); }
                dragging = true;
                lastPointerX = px;
            }
            if (!held) dragging = false;
            if (dragging && !autoPlay && (phase == Phase.Run || phase == Phase.Boss))
            {
                targetX = Mathf.Clamp(targetX + (px - lastPointerX) / Screen.width * 11f, -MoveLimit, MoveLimit);
                lastPointerX = px;
            }
        }

        float SquadRadius => 0.5f * Mathf.Sqrt(Mathf.Min(squad, MaxVisualSoldiers)) + 0.35f;

        void SetSquad(int n)
        {
            n = Mathf.Max(0, n);
            if (n == squad) return;
            squad = n;
            squadLabel.Text = squad.ToString();
            squadLabel.transform.localScale = Vector3.one * 1.4f;
        }

        void SyncSoldiers(bool snap)
        {
            int want = Mathf.Min(squad, MaxVisualSoldiers);
            while (soldiers.Count < want)
            {
                var f = Figure(world, Blue, new Color(0.15f, 0.35f, 0.8f), Skin, 1f);
                f.localPosition = new Vector3(squadX, 0f, squadZ);
                soldiers.Add(f);
            }
            while (soldiers.Count > want)
            {
                var f = soldiers[soldiers.Count - 1];
                soldiers.RemoveAt(soldiers.Count - 1);
                Burst(f.position + Vector3.up * 0.5f, Blue, 6);
                Destroy(f.gameObject);
            }
            float dt = Time.deltaTime;
            bool running = phase == Phase.Run;
            for (int i = 0; i < soldiers.Count; i++)
            {
                float r = i == 0 ? 0f : 0.5f * Mathf.Sqrt(i);
                float a = i * 2.39996f;
                var slot = new Vector3(squadX + Mathf.Cos(a) * r, 0f, squadZ + Mathf.Sin(a) * r * 0.8f);
                if (running) slot.y = Mathf.Abs(Mathf.Sin(Time.time * 14f + i)) * 0.12f;
                var tr = soldiers[i];
                tr.localPosition = snap ? slot : Vector3.Lerp(tr.localPosition, slot, 1f - Mathf.Exp(-12f * dt));
            }
            if (hero)
            {
                var hp = new Vector3(squadX, 0f, squadZ + SquadRadius + 0.6f);
                hero.localPosition = Vector3.Lerp(hero.localPosition, hp, 1f - Mathf.Exp(-6f * dt));
            }
            squadLabel.transform.position = new Vector3(squadX, 2.4f + SquadRadius * 0.4f, squadZ);
            squadLabel.transform.localScale = Vector3.Lerp(squadLabel.transform.localScale, Vector3.one, 1f - Mathf.Exp(-10f * dt));
        }

        void UpdateCamera(bool snap)
        {
            float a = (float)Screen.width / Mathf.Max(1, Screen.height);
            float back = Mathf.Lerp(13f, 9f, Mathf.Clamp01((a - 0.5f) / 0.5f)) + SquadRadius * 0.6f;
            var pos = new Vector3(squadX * 0.35f, back * 1.05f, squadZ - back * 0.75f);
            var look = new Vector3(squadX * 0.35f, 0f, squadZ + 7f);
            if (snap) cam.transform.position = pos;
            else cam.transform.position = Vector3.Lerp(cam.transform.position, pos, 1f - Mathf.Exp(-6f * Time.deltaTime));
            cam.transform.rotation = Quaternion.LookRotation(look - cam.transform.position);
        }

        // ============================================================ combat
        void Fire(float dt)
        {
            if (squad <= 0) return;
            fireTimer += dt;
            if (fireTimer < FireInterval) return;
            fireTimer -= FireInterval;
            float total = squad * dpsPerSoldier * FireInterval * power + (hero ? 40f * FireInterval : 0f);
            int visuals = Mathf.Clamp(squad, 1, 10);
            for (int i = 0; i < visuals; i++)
            {
                Vector3 from = soldiers.Count > 0 ? soldiers[Random.Range(0, soldiers.Count)].localPosition : new Vector3(squadX, 0f, squadZ);
                SpawnBullet(from.x, from.z + 0.4f, total / visuals);
            }
            Sfx.Play(Sfx.Id.Shot, 0.35f, 1f, 0.12f, 0.07f);
        }

        void SpawnBullet(float x, float z, float dmg)
        {
            var b = bulletPool.Count > 0 ? bulletPool.Pop() : null;
            if (b == null)
            {
                b = new Bullet();
                b.tr = Prim(PrimitiveType.Capsule, fx, Vector3.zero, new Vector3(0.12f, 0.35f, 0.12f), new Color(0.5f, 0.9f, 1f)).transform;
                b.tr.localRotation = Quaternion.Euler(90f, 0f, 0f);
            }
            b.tr.gameObject.SetActive(true);
            b.tr.localScale = power > 1f ? new Vector3(0.18f, 0.45f, 0.18f) : new Vector3(0.12f, 0.35f, 0.12f);
            b.x = x;
            b.z = b.startZ = z;
            b.dmg = dmg;
            b.tr.localPosition = new Vector3(x, 0.6f, z);
            bullets.Add(b);
        }

        void UpdateBullets(float dt)
        {
            for (int i = bullets.Count - 1; i >= 0; i--)
            {
                var b = bullets[i];
                float z0 = b.z, z1 = b.z + BulletSpeed * dt;
                if (HitSomething(b, z0, z1) || z1 - b.startZ > BulletRange)
                {
                    b.tr.gameObject.SetActive(false);
                    bullets.RemoveAt(i);
                    bulletPool.Push(b);
                    continue;
                }
                b.z = z1;
                b.tr.localPosition = new Vector3(b.x, 0.6f, z1);
            }
        }

        bool HitSomething(Bullet b, float z0, float z1)
        {
            float bestZ = float.MaxValue;
            int kind = -1, idx = -1;

            for (int i = 0; i < enemies.Count; i++)
            {
                var e = enemies[i];
                if (!e.alive || Mathf.Abs(e.x - b.x) > 0.45f) continue;
                if (e.z >= z0 - 0.3f && e.z <= z1 + 0.3f && e.z < bestZ) { bestZ = e.z; kind = 0; idx = i; }
            }
            for (int i = 0; i < gates.Count; i++)
            {
                var g = gates[i];
                if (g.passed || Mathf.Abs(b.x) > RoadHalf) continue;
                if (g.z >= z0 && g.z <= z1 && g.z < bestZ) { bestZ = g.z; kind = 1; idx = i; }
            }
            if (tank != null && !tankBroken && Mathf.Abs(tank.x - b.x) < 1.4f && tank.z - 1.2f >= z0 && tank.z - 1.2f <= z1 && tank.z < bestZ)
            { bestZ = tank.z; kind = 2; }
            if (boss != null && boss.alive && Mathf.Abs(boss.x - b.x) < 1.6f && boss.z - 0.8f <= z1 && boss.z < bestZ)
            { bestZ = boss.z; kind = 3; }

            switch (kind)
            {
                case 0:
                    var e = enemies[idx];
                    e.hp -= b.dmg;
                    e.hit = 1f;
                    if (e.hp <= 0f) KillEnemy(e);
                    else Sfx.Play(Sfx.Id.Hit, 0.3f, 1f, 0.15f, 0.06f);
                    return true;
                case 1:
                    var g = gates[idx];
                    int s = b.x < 0f ? 0 : 1;
                    if (!g.mul[s])
                    {
                        g.acc[s] += b.dmg;
                        bool changed = false;
                        while (g.acc[s] >= gateHitDamage) { g.acc[s] -= gateHitDamage; g.val[s]++; changed = true; }
                        if (changed) { RefreshGate(g); g.txt[s].transform.localScale = Vector3.one * 1.25f; }
                    }
                    StartCoroutine(Punch(g.panel[s].transform, 0.06f));
                    return true;
                case 2:
                    tank.hp -= b.dmg;
                    StartCoroutine(Punch(tank.tr, 0.04f));
                    Sfx.Play(Sfx.Id.Hit, 0.35f, 1.6f, 0.1f, 0.06f);
                    if (tank.hp <= 0f) FreeHero();
                    else tankLabel.Text = Mathf.CeilToInt(tank.hp).ToString();
                    return true;
                case 3:
                    float min = autoPlay && autoPlayFailEnding ? bossMax * failClampFraction : 0f;
                    boss.hp = Mathf.Max(min, boss.hp - b.dmg);
                    boss.hit = 1f;
                    Sfx.Play(Sfx.Id.Hit, 0.4f, 0.7f, 0.1f, 0.07f);
                    if (boss.hp <= 0f) StartCoroutine(Win());
                    return true;
            }
            return false;
        }

        void KillEnemy(Unit e)
        {
            e.alive = false;
            Burst(e.tr.position + Vector3.up * 0.5f, Red, 6);
            Sfx.Play(Sfx.Id.Pop, 0.45f, 0.8f, 0.15f, 0.04f);
            Destroy(e.tr.gameObject);
        }

        void UpdateEnemies(float dt)
        {
            float r = SquadRadius;
            foreach (var e in enemies)
            {
                if (!e.alive) continue;
                float dz = e.z - squadZ;
                if (dz < 26f && dz > -1f)
                {
                    e.z -= 2.6f * dt;
                    e.x = Mathf.MoveTowards(e.x, squadX, 0.8f * dt);
                }
                if (dz < 0.6f && dz > -1.5f && Mathf.Abs(e.x - squadX) < r)
                {
                    SetSquad(squad - 1);
                    KillEnemy(e);
                    continue;
                }
                if (dz < -3f) { e.alive = false; Destroy(e.tr.gameObject); continue; }
                e.hit = Mathf.MoveTowards(e.hit, 0f, dt * 6f);
                e.tr.localPosition = new Vector3(e.x, Mathf.Abs(Mathf.Sin(Time.time * 12f + e.x)) * 0.1f, e.z);
                e.tr.localScale = Vector3.one * (1f + e.hit * 0.2f);
            }
        }

        void UpdateGates()
        {
            foreach (var g in gates)
            {
                for (int s = 0; s < 2; s++)
                    g.txt[s].transform.localScale = Vector3.Lerp(g.txt[s].transform.localScale, Vector3.one, 0.15f);
                if (g.passed || squadZ < g.z) continue;
                g.passed = true;
                int s2 = squadX < 0f ? 0 : 1;
                int before = squad;
                int after = g.mul[s2] ? squad * g.val[s2] : squad + g.val[s2];
                SetSquad(after);
                bool good = after >= before;
                Sfx.Play(good ? Sfx.Id.GateGood : Sfx.Id.GateBad, 1f, 1f, 0f, 0.1f);
                Burst(new Vector3(s2 == 0 ? -2f : 2f, 1f, g.z), good ? new Color(0.35f, 0.65f, 1f) : new Color(1f, 0.4f, 0.4f), 20);
                StartCoroutine(SinkGate(g.root));
            }
        }

        void UpdateTank(float dt)
        {
            if (tank == null || tankBroken) return;
            if (squadZ >= tank.z - 1f && Mathf.Abs(squadX - tank.x) < 1.6f + SquadRadius * 0.5f)
            {
                // ran into the unbroken tank: lose soldiers, tank smashes without reward
                SetSquad(squad - 5);
                BreakTank(false);
            }
            else if (squadZ > tank.z + 2f) BreakTank(false);
        }

        void FreeHero()
        {
            BreakTank(true);
            power = 2f;
            hero = trappedHero;
            trappedHero = null;
            hero.localRotation = Quaternion.identity;
            ui.Banner("HERO FREED!  x2 POWER", new Color(1f, 0.88f, 0.3f));
            Sfx.Play(Sfx.Id.GateGood, 1f, 1.25f, 0f, 0.1f);
        }

        void BreakTank(bool freed)
        {
            tankBroken = true;
            Sfx.Play(Sfx.Id.Glass, 1f, 1f, 0.05f, 0.1f);
            Burst(tank.tr.position + Vector3.up * 1.8f, new Color(0.6f, 0.9f, 1f), 30);
            tankGlass.enabled = false;
            if (tankLabel) tankLabel.gameObject.SetActive(false);
            if (helpLabel) helpLabel.gameObject.SetActive(false);
            if (!freed && trappedHero) trappedHero.gameObject.SetActive(false);
        }

        void UpdateBoss(float dt)
        {
            if (boss == null || !boss.alive) return;
            if (phase == Phase.Boss)
            {
                float gap = boss.z - squadZ;
                if (gap > 2.4f + SquadRadius * 0.5f) boss.z -= 1.4f * dt;
                else
                {
                    bossContactTimer += dt;
                    if (bossContactTimer >= 0.25f)
                    {
                        bossContactTimer = 0f;
                        SetSquad(squad - Mathf.Max(2, squad / 12));
                        StartCoroutine(Punch(boss.tr, 0.12f));
                        StartCoroutine(Shake(0.15f, 0.25f));
                        Sfx.Play(Sfx.Id.Stomp, 0.9f);
                    }
                }
            }
            boss.hit = Mathf.MoveTowards(boss.hit, 0f, dt * 6f);
            boss.tr.localPosition = new Vector3(boss.x, 0f, boss.z);
            var tint = Color.Lerp(new Color(0.75f, 0.2f, 0.25f), Color.white, boss.hit * 0.6f);
            SetColor(boss.tr.GetChild(0).GetComponent<Renderer>(), tint);
            float f = Mathf.Clamp01(boss.hp / bossMax);
            bossBarFill.localScale = new Vector3(4f * f, 0.32f, 0.1f);
            bossBarFill.localPosition = new Vector3(-2f * (1f - f), 0f, -0.06f);
        }

        void AutoSteer()
        {
            // free the hero first
            if (tank != null && !tankBroken)
            {
                float d = tank.z - squadZ;
                if (d < 32f && d > 0f) { targetX = d > 7f ? tank.x - 0.2f : -2.4f; return; }
            }
            Gate next = null;
            foreach (var g in gates)
                if (!g.passed && g.z > squadZ && g.z - squadZ < 26f) { next = g; break; }
            if (next != null)
            {
                int best = 0;
                int bv = int.MinValue;
                for (int s = 0; s < 2; s++)
                {
                    int v = next.mul[s] ? squad * next.val[s] : squad + next.val[s];
                    if (v > bv) { bv = v; best = s; }
                }
                targetX = best == 0 ? -2.2f : 2.2f;
                return;
            }
            targetX = Mathf.MoveTowards(targetX, 0f, Time.deltaTime * 2f);
        }

        // ============================================================ results
        IEnumerator Win()
        {
            if (phase != Phase.Run && phase != Phase.Boss) yield break;
            phase = Phase.Result;
            boss.alive = false;
            ui.Banner("VICTORY!", new Color(1f, 0.88f, 0.3f));
            Sfx.Play(Sfx.Id.Win, 1f, 1f, 0f);
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.8f)
            {
                boss.tr.localRotation = Quaternion.Euler(-90f * k, 180f, 0f);
                yield return null;
            }
            for (int i = 0; i < 6; i++)
            {
                Burst(boss.tr.position + new Vector3(Random.Range(-2f, 2f), 2f, Random.Range(-1f, 1f)), Random.value > 0.5f ? Blue : new Color(1f, 0.85f, 0.2f), 20);
                yield return new WaitForSeconds(0.12f);
            }
            yield return new WaitForSeconds(0.6f);
            ShowEndcard(true);
        }

        IEnumerator Lose()
        {
            if (phase != Phase.Run && phase != Phase.Boss) yield break;
            phase = Phase.Result;
            ui.Banner("DEFEAT", new Color(1f, 0.35f, 0.35f));
            Sfx.Play(Sfx.Id.Fail, 1f, 1f, 0f);
            StartCoroutine(Shake(0.5f, 0.4f));
            yield return new WaitForSeconds(1.6f);
            ShowEndcard(false);
        }

        void ShowEndcard(bool win)
        {
            if (phase == Phase.End) return;
            phase = Phase.End;
            ui.ShowEndcard(win ? "Can you beat the next boss?" : "So close! Can you beat the boss?");
        }

        // ============================================================ fx
        void Burst(Vector3 pos, Color c, int n) => StartCoroutine(BurstRoutine(pos, c, n));

        IEnumerator BurstRoutine(Vector3 pos, Color c, int n)
        {
            var parts = new Transform[n];
            var vel = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                parts[i] = Prim(PrimitiveType.Cube, fx, pos, Vector3.one * Random.Range(0.08f, 0.2f), c).transform;
                vel[i] = new Vector3(Random.Range(-1f, 1f), Random.Range(0.6f, 1.6f), Random.Range(-1f, 1f)) * 4f;
            }
            for (float t = 0f; t < 0.6f; t += Time.deltaTime)
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
            foreach (var p in parts) Destroy(p.gameObject);
        }

        IEnumerator Punch(Transform t, float amount)
        {
            if (!t) yield break;
            var s0 = t.localScale;
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.12f)
            {
                if (!t) yield break;
                t.localScale = s0 * (1f + Mathf.Sin(k * Mathf.PI) * amount);
                yield return null;
            }
            if (t) t.localScale = s0;
        }

        IEnumerator SinkGate(Transform root)
        {
            for (float k = 0f; k < 1f; k += Time.deltaTime / 0.4f)
            {
                root.localPosition = new Vector3(0f, -2.5f * k, 0f);
                yield return null;
            }
            root.gameObject.SetActive(false);
        }

        IEnumerator Shake(float dur, float amp)
        {
            for (float t = 0f; t < dur; t += Time.deltaTime)
            {
                cam.transform.position += (Vector3)Random.insideUnitCircle * amp * (1f - t / dur);
                yield return null;
            }
        }
    }
}
