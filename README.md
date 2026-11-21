# Playable Ads & Creative Video Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**.  
Games and interactive playable ads are built and exported in **Unity** using **Unity Playworks (Luna)**, while motion design, visual hooks, UI art, and video editing are crafted with **Adobe After Effects** and **Adobe Illustrator / Photoshop**.

## Projects

| Project | Format | Links & Details |
|---|---|---|
| **Mob Control** | Playable Ad + Creative Video | Voodoo-style 3D cannon & mob multiplier playable ad: 4-wheeled purple cannon, arched 3D center tube transport, sliding `X3` / `X2` / `X7` multiplier gates, destructible `60` HP block, yellow enemy base siege (`50` HP), cartoon HUD & endcard CTA.<br>🎮 **Playable Ad:** [Play Live Demo](https://tugcemelisa.github.io/playable-ads-portfolio/mob-control/) · 🎬 **Creative Ad:** *(Coming soon)* · 🔗 **Repo:** [`Assets/MobControl/`](Assets/MobControl/) *(this repository)* |
| **Number Match** | Playable Ad + Creative Video | 3D colour-by-number pixel art puzzle with wrong-move tension hook, 360° radial colour wave reveals, centered `HURRY UP!` countdown alarm, `00:00` explosion transition, and 3D endcard CTA.<br>🎮 **Playable Ad:** [Play Live Demo](https://tugcemelisa.github.io/playable-ads-portfolio/number-match/) · 🎬 **Creative Ad:** [Watch on YouTube Shorts](https://youtube.com/shorts/G4jU1Z6JKeI) · 🔗 **Repo:** [github.com/tugcemelisa/number-match-case-study](https://github.com/tugcemelisa/number-match-case-study) |
| **Runner** | Playable Ad + Creative Video | 3D castle obstacle runner with swipe steering, jumping, gem collection, shield invincibility, and destructible obstacles.<br>🎮 **Playable Ad:** *(In progress — `Assets/Runner/`)* · 🎬 **Creative Ad:** *(Coming soon)* · 🔗 **Repo:** [github.com/tugcemelisa/Runner](https://github.com/tugcemelisa/Runner) |
| **Jelly Flow** | Creative Video | Pixel-art conveyor puzzle 9:16 vertical marketing video creative.<br>🎬 **Creative Ad:** [Watch on YouTube Shorts](https://www.youtube.com/shorts/1l0v7LeWNJU) |
| **MechWars** | Creative Video | Action shooter mobile marketing video creatives.<br>🎬 **Creative Ad:** [Watch on TikTok](https://www.tiktok.com/@mechwarsofficial_) |

## Tech Stack

- **Unity 6000.0 LTS & Unity Playworks (Luna 7.2.0)** — Interactive 3D playable ad development and single-package HTML5 export
- **Adobe After Effects & Adobe Illustrator / Photoshop** — Motion design, 9:16 vertical creative video hooks, vector UI badges, raster art, voiceover & 3D endcards
- **Procedural & Baked WAV SFX** — Lightweight audio pipeline for Playworks HTML5 size budgets
- **Shared `AdKit`** — Interactive drag tutorial hand, dynamic HUD, endcard + store CTA (`Luna.Unity.Playable.InstallFullGame`)

## Open and Build in Unity

Use Unity **6000.0.51f1** with **Unity Playworks Plugin 7.2.0**:
1. From the top menu bar, click **`Voodoo → Mob Control`** to automatically build, open, and export the **Mob Control** Playable Ad scene (`Assets/Scenes/MobControl.unity`).
2. Or open **Tools → Unity Playworks Plugin** (`Ctrl+E`) and click **Build Develop** to export the HTML5 playable bundle.

## Structure

```
Assets/
├── AdKit/         Shared Playable Ad UI, Tutorial Hand, Endcard CTA & Baked SFX
├── MobControl/    Mob Control 3D Playable Ad (Models, Materials, Prefabs & Scripts)
├── Runner/        Runner 3D Playable Ad (Castle Models, Player Rig, Obstacles & Scripts)
└── Scenes/        Playable Ad Unity Scenes
```
