# Playable Ads & Creative Video Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**.  
Games and interactive playable ads are built and exported in **Unity** using **Unity Playworks (Luna)**, while motion design, visual hooks, and video editing are crafted with **Adobe After Effects** and **Higgsfield AI**.

## Projects

| Project | Format | Description |
|---|---|---|
| **Mob Control** | Playable Ad + Creative Video | Voodoo-style 3D cannon & mob multiplier playable ad: 4-wheeled purple cannon, arched 3D center tube transport, sliding `X3` / `X2` / `X7` multiplier gates, destructible `60` HP block, yellow enemy base siege (`50` HP), near-miss `DEFEAT...` hook, and Google Play Store CTA ([Google Play Store](https://play.google.com/store/apps/details?id=com.vincentb.MobControl&gl=IN)). |
| **Number Match** | Playable Ad + Creative Video | 3D colour-by-number pixel art puzzle ([Case Study & Creative Video Repo](https://github.com/tugcemelisa/number-match-case-study)): drag numbered cubes onto matching board cells, wrong-move tension hook with screen shake & particles, 360° radial colour wave reveals, celebratory star-eyes praise popups, ticking timer explosion transition, and voiceover endcard CTA. |
| **Jelly Flow** | Creative Video | Pixel-art conveyor puzzle 9:16 vertical marketing video creative ([Watch on YouTube Shorts](https://www.youtube.com/shorts/1l0v7LeWNJU)). |
| **MechWars** | Creative Video | Action shooter mobile marketing video creatives ([Watch on TikTok](https://www.tiktok.com/@mechwarsofficial_)). |
| *Upcoming Title (TBD)* | Playable Ad + Creative Video | *Next Voodoo-style playable ad and creative video currently in selection.* |

## Tech Stack

- **Unity 6000.0 LTS & Unity Playworks (Luna 7.2.0)** — Interactive 3D/2D playable ad development and single-package HTML5/WebGL export
- **Adobe After Effects & Higgsfield AI** — Motion design, 9:16 vertical creative video hooks, VFX transitions, voiceover & 3D endcards
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
├── NumberMatch/   Number Match Playable Ad
└── Scenes/        Playable Ad Unity Scenes
```
