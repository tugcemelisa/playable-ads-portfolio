# Playable Ads & Creative Video Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**, built in Unity (Unity Playworks / Luna & Adobe After Effects / Higgsfield).

## Watch — Video Creatives

- **[Jelly Flow — Original Video Creative](https://www.youtube.com/shorts/1l0v7LeWNJU)** — 9:16 vertical marketing video creative.
- **[MechWars — Video Creative Collection](https://www.tiktok.com/@mechwarsofficial_)** — Published mobile marketing video creatives.
- **[Number Match — Case Study & Creative Video](https://github.com/tugcemelisa/number-match-case-study)** — 9:16 gameplay hook creative video with Adobe After Effects & Higgsfield 3D endcard workflow.

## Projects

| Project | Format | Description |
|---|---|---|
| **Mob Control** | Playable Ad + Creative Video | Voodoo-style 3D cannon & mob multiplier playable ad: 4-wheeled purple cannon, arched 3D center tube transport, sliding `X3` / `X2` / `X7` multiplier gates, destructible `60` HP block, yellow enemy base siege (`50` HP), near-miss `DEFEAT...` hook, and Google Play Store CTA (`com.vincentb.MobControl`). |
| **Number Match** | Playable Ad + Creative Video | 3D colour-by-number pixel art puzzle: drag numbered cubes onto matching board cells, wrong-move tension hook with screen shake & particles, 360° radial colour wave reveals, celebratory star-eyes praise popups, and endcard CTA. |
| **Jelly Flow** | Creative Video | Pixel-art conveyor puzzle video creative ([Watch on YouTube Shorts](https://www.youtube.com/shorts/1l0v7LeWNJU)). |
| **MechWars** | Creative Video | Action shooter marketing video creatives ([Watch on TikTok](https://www.tiktok.com/@mechwarsofficial_)). |
| *Upcoming Title (TBD)* | Playable Ad + Creative Video | *Next Voodoo-style playable ad and creative video currently in selection.* |

## Tech Stack

- **Unity 6000.0 LTS** (Unity Playworks / Luna 7.2.0 compatible)
- **Adobe After Effects & Higgsfield AI** for 9:16 vertical creative video hooks, VFX transitions, and 3D endcards
- **Procedural & Baked WAV SFX** for lightweight single-file Playworks HTML5 builds
- **Shared `AdKit`**: interactive drag tutorial hand, dynamic HUD, endcard + store CTA (`Luna.Unity.Playable.InstallFullGame`)

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
