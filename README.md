# Playable Ads & Creative Video Portfolio

Playable ads and performance marketing video creatives by **Melisa Tuğçe Haspolat**.  
Interactive 3D HTML5 playable ads are engineered in **Unity 6** and exported with **Unity Playworks (Luna 7.2.0)**; 3D mesh/rig optimization is performed in **Blender 5.0**, and motion design, visual hooks, UI art, and video creatives are crafted in **Adobe After Effects** and **Adobe Illustrator / Photoshop**.

> **Live Portfolio Hub:** [tugcemelisa.github.io/playable-ads-portfolio](https://tugcemelisa.github.io/playable-ads-portfolio/)

---

## Projects

| Project | Format | Links & Highlights |
|---|---|---|
| **Mob Control** | Playable Ad *(Unity Playworks)* | Voodoo-style 3D cannon & mob multiplier playable ad featuring two full visual themes (`AlpineWinter` Purple/Yellow & `MidnightSlate` Deep Navy/Red), two character styles (522-tri hairless 3D mob + eye-preserving alien with skeletal `Run` animation vs. classic stickmen), single-mesh arched center tube with traveling gulp waves, sliding `X3` / `X2` / `X7` gates, `GIANT CHARGE` 2.25× Giant Champion, destructible brick block (`100` HP), castle siege (`160` HP), `HURRY UP!` 8s finale countdown, `SFX ON/OFF`, and auto iOS App Store / Android Google Play CTA.<br>🎮 **Playable Ad (Playworks Studio on Desktop / Fullscreen on Mobile):** [Play Live Demo](https://tugcemelisa.github.io/playable-ads-portfolio/mob-control/) · 🔗 **Source:** [`Assets/MobControl/`](Assets/MobControl/) |
| **Number Match** | Playable Ad + Creative Video | 3D colour-by-number pixel art puzzle (`16×16` rainbow artwork) with wrong-move tension hook, 360° radial colour wave reveals, centered `HURRY UP!` countdown alarm, `00:00` explosion transition, and 3D endcard CTA.<br>🎮 **Playable Ad:** [Play Live Demo](https://tugcemelisa.github.io/playable-ads-portfolio/number-match/) · 🎬 **Creative Video Ad:** [Watch on YouTube Shorts](https://youtube.com/shorts/G4jU1Z6JKeI) · 🔗 **Case Study Repo:** [github.com/tugcemelisa/number-match-case-study](https://github.com/tugcemelisa/number-match-case-study) |
| **Runner** | Playable Ad *(WIP)* | 3D castle obstacle runner with swipe steering, jumping, gem collection, shield invincibility, and destructible obstacles.<br>🎮 **Playable Ad:** *(In progress — `Assets/Runner/`)* · 🔗 **Repo:** [github.com/tugcemelisa/Runner](https://github.com/tugcemelisa/Runner) |
| **Jelly Flow** | Creative Video | Pixel-art conveyor puzzle 9:16 vertical marketing video creative.<br>🎬 **Creative Video Ad:** [Watch on YouTube Shorts](https://www.youtube.com/shorts/1l0v7LeWNJU) |
| **MechWars** | Creative Video | Action shooter mobile marketing video creatives.<br>🎬 **Creative Video Ads:** [Watch on TikTok](https://www.tiktok.com/@mechwarsofficial_) |

---

## Mob Control — Unity Playworks Playground A/B Testing Matrix

Open the [Mob Control Live Playable](https://tugcemelisa.github.io/playable-ads-portfolio/mob-control/) on desktop to test **all 15 `[LunaPlaygroundField]` A/B parameters live** in the Unity Playworks Playground without rebuilding Unity:

| Playground Section | Configurable Parameters | A/B Test Use Case |
|---|---|---|
| **Visual Settings** | `Background Theme` (`AlpineWinter` / `MidnightSlate`)<br>`Character Style` (`StylizedModels` / `ClassicStickmen`) | Day snowy valley (Purple vs. Yellow) ↔ Night slate valley (Deep Navy vs. Crimson Red); 3D animated characters ↔ Classic Mob Control stickmen |
| **Mob Control Settings** | `Cannon Fire Rate`, `Round Duration (s)`, `Yellow Block HP`, `Enemy Base HP`, `Enable Giant Champion`, `Min Lose Time (s)` | Tune pacing for Meta (15s) vs. AppLovin/Unity Ads (24–30s), adjust difficulty & Giant Champion dopamine spikes |
| **Gate Multipliers** | `Front Sliding Gate (X)`, `Left Gate (X)`, `Right Gate (X)` | Test conservative (`X2/X3/X7`) vs. hyper-satisfying crowd multipliers (`X4/X5/X10`) |
| **Endcard & Localization** | `CTA Button Text`, `CTA Button Color` (`Green`/`Blue`/`Yellow`/`Red`/`Purple`), `CTA Button Shape` (`Rounded`/`Sharp`), `Defeat Title`, `Victory Title`, `Defeat Subtitle`, `Victory Subtitle`, `Tutorial Text` | Zero-code localization & CTA color/shape conversion (IPM) experiments |

---

## Mob Control — Live Verified Performance & Engineering

Measured directly inside **Unity Playworks Performance Profiler** (`iPhone X/XS` preview, active combat & endcard):

| Metric | Before Optimization | Final Verified Live | Target (Playworks / MRAID) |
|---|---:|---:|---|
| **RAM Usage** | `881 MB` ⚠️ | **`117 – 124 MB`** | `< 256 MB` ✅ |
| **Average Frame Time** | `12 ms` | **`3 – 6 ms`** *(60+ FPS)* | `< 16.6 ms` ✅ |
| **CPU Usage** | `64%` | **`14% – 36%`** | `< 50%` ✅ |
| **Draw Calls** | `672` | **`117 – 160`** | `< 200` ✅ |
| **Vertices** | `1,260,588` | **`37,511 – 45,792`** | `< 100,000` ✅ |
| **Triangles** | `369,670` | **`61,856 – 75,742`** | `< 100,000` ✅ |
| **Physics 3D CPU** | `23.7%` | **`0.6% – 0.8%`** | `< 5%` ✅ |
| **Shadow Casters** | `0` | **`0`** | `0` ✅ |
| **Exported Asset Bundle** | `~4.8 MB` | **`1.23 MB`** | `≤ 2–5 MB` ✅ |

### Key Technical Optimizations
- **6-Pool Zero-GC Object Pooling:** Friendly mobs, enemy aliens, smoke puffs, shockwave rings, sparks/debris, and World-Space floating `Canvas` pop-ups are recycled via `Stack<T>` pools — eliminating WebGL heap growth (`881 MB → 124 MB`).
- **Blender 5.0 FBX Pipeline:** Stripped 28+ unused animation clips (retaining only `CharacterArmature|Run`), removed heavy hair/accessory submeshes, collapsed `PurpleMob.fbx` from 11 materials to **1 single material / 522 tris** (`4,155 KB → 330 KB`), and preserved `YellowMob.fbx` alien eyes (`Eye_Black` / `Eye_White`) while cutting polygons by 55%.
- **Single-Mesh Procedural Tube (`88 → 1 Draw Call`):** Replaced 88 separate cylinder/sphere tube segments with a single C# swept `UnityEngine.Mesh` (`BuildSmoothTubeMesh`) paired with 10 pooled bulge beads for smooth entrance-to-exit gulp waves.
- **Playworks 7.2.0 WebGL Compatibility:** Per-`Color32` cached shared materials (`Prims._matCache`), non-sliced procedural `AdRes.Pill` UI sprites, 4-way World-Space `UI.Text` comic strokes (Bangers font), and mobile-safe CTA redirect (`window.open` + `top.location` fallback with auto iOS App Store / Android Google Play routing).

---

## Tech Stack

- **Unity 6 (`6000.0.51f1`) & Unity Playworks (Luna `7.2.0`)** — Interactive 3D playable ad architecture, Playground A/B fields & HTML5 export
- **Blender `5.0`** — Low-poly mesh decimation, material slot merging & animation clip stripping
- **Adobe After Effects & Adobe Illustrator / Photoshop** — 9:16 vertical creative video hooks, vector UI badges, raster art, voiceover & 3D endcards
- **Shared `AdKit`** — Procedural pill UI, World-Space labels, drag tutorial hand, baked WAV SFX & Playworks lifecycle/CTA bridge

---

## Open and Export in Unity

Use Unity **6000.0.51f1** with **Unity Playworks Plugin 7.2.0**:
1. From the top menu bar, open **`Playable Ads → Open Scene → Mob Control / Number Match / Runner`**.
2. To build and sync directly to `Builds/Playables/` and `docs/<slug>/`, click **`Playable Ads → Export Playworks → Mob Control`** (or open **Tools → Unity Playworks Plugin** → **Build Develop**).

```text
Assets/
├── AdKit/         Shared Playable Ad UI, Pills, World-Space Labels, Object Pooling Helpers, SFX & Export Menu
├── MobControl/    Mob Control 3D Playable Ad (Optimized FBX Models, Alpine/Midnight Backdrops, Logo & Scripts)
├── NumberMatch/   Number Match 3D Playable Ad (16x16 Showcase Pixel Art & Scripts)
├── Runner/        Runner 3D Playable Ad (Castle Models, Player Rig, Obstacles & Scripts)
└── Scenes/        MobControl.unity, NumberMatch.unity, Runner.unity
```
