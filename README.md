# Playable Ads & Creative Video Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**.  
Games and interactive playable ads are built and exported in **Unity** using **Unity Playworks (Luna)**, while motion design, visual hooks, and video editing are crafted with **Adobe After Effects** and **Higgsfield AI**.

## Projects

| Project | Format | Description |
|---|---|---|
| **Mob Control** | Playable Ad + Creative Video | Voodoo-style 3D cannon & mob multiplier playable ad: 4-wheeled purple cannon, arched 3D center tube transport, sliding `X3` / `X2` / `X7` multiplier gates, destructible `60` HP block, yellow enemy base siege (`50` HP), prominent `HOLD & DRAG TO AIM!` tutorial, live HUD, near-miss `DEFEAT...` hook, and Store CTA.<br>🎮 **Play Live (Playworks HTML5):** [Play Mob Control Demo](https://tugcemelisa.github.io/playable-ads-portfolio/mob-control/) |
| **Number Match** | Playable Ad + Creative Video | 3D colour-by-number pixel art puzzle: complete case study with 9:16 vertical marketing creative video (Adobe After Effects & Adobe Illustrator) and Playworks HTML5 Playable Ad.<br>🎮 **Play Live (Playworks HTML5):** [Play Number Match Demo](https://tugcemelisa.github.io/playable-ads-portfolio/number-match/) · 🎬 **Video:** [Watch on YouTube Shorts](https://youtube.com/shorts/G4jU1Z6JKeI) · 🔗 **Case Study Repo:** [github.com/tugcemelisa/number-match-case-study](https://github.com/tugcemelisa/number-match-case-study) |
| **Runner** | Playable Ad + Creative Video | 3D castle obstacle runner: swipe steering, jumping, coin & large gem collection, shield invincibility, destructible obstacles, and finish line multiplier gate.<br>🔗 **Original Repo:** [github.com/tugcemelisa/Runner](https://github.com/tugcemelisa/Runner) · 🎮 **Playable Ad:** Integrated in `Assets/Runner/` |
| **Jelly Flow** | Creative Video | Pixel-art conveyor puzzle 9:16 vertical marketing video creative.<br>🎬 **Video:** [Watch on YouTube Shorts](https://www.youtube.com/shorts/1l0v7LeWNJU) |
| **MechWars** | Creative Video | Action shooter mobile marketing video creatives.<br>🎬 **Video:** [Watch on TikTok](https://www.tiktok.com/@mechwarsofficial_) |

## Tech Stack

- **Unity 6000.0 LTS & Unity Playworks (Luna 7.2.0)** — Interactive 3D playable ad development and single-package HTML5 export
- **Adobe After Effects, Adobe Illustrator & Higgsfield AI** — Motion design, 9:16 vertical creative video hooks, vector UI badges, voiceover & 3D endcards
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
