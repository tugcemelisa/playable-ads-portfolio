# Playable Ads Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**, built in Unity.

> 🚧 Work in progress: playable links, GIF previews and videos will be added here.

## Watch

- [Jelly Flow — original video creative](https://www.youtube.com/shorts/1l0v7LeWNJU). The Unity playable in this repository is a new recreation; the original Unity project was unavailable.
- [MechWars — video creative collection](https://www.tiktok.com/@mechwarsofficial_). Individual creative selections and contribution details are being prepared.

Rescue Run and Last Camp are independent portfolio **spec work**, not commissioned or released Voodoo projects. Browser builds are not yet validated.

## Projects

| Creative | Type | Description |
|---|---|---|
| **Jelly Flow** | Playable + Video | Pixel-art puzzle: jellies ride a conveyor around the picture and eat matching pixels. |
| **Rescue Run** | Playable + Video (spec) | Runner shooter: grow your squad through +/× gates, free the trapped hero, face the boss. |
| **Last Camp** | Playable prototype (spec) | Survivor/base-defense concept with weapon progression and a horde reveal. |
| **Number Match** | Playable + Video | Colour-by-number: a picture breaks into a numbered grid, drag tiles onto matching numbers and each colour group reveals with a wave. Playable-ad version of my Number Match case study. |

## Tech

- Unity 6000.0 LTS (Unity Playworks / Luna compatible)
- Procedural SFX baked to WAV in the Editor for Playworks compatibility
- Shared `AdKit`: tutorial hand, endcard + CTA, banners
- Auto-play mode for recording video creatives with Unity Recorder

## Open and build

Use Unity **6000.0.51f1**. Unity Playworks Plugin **7.2.0** is installed as a local package. Download the plugin from your own [Unity Playworks account](https://playground.lunalabs.io/downloads), extract it to `../Playworks-7.2.0` beside this project, and select its `scripts/package.json` in Package Manager if Unity cannot resolve the package. The plugin distribution is kept outside this repository.

Open **Tools → Unity Playworks Plugin** (Ctrl+E), sign in locally, select one creative scene, then use **Build Develop**. Installation alone does not establish export compatibility; inspect the build diagnostics and test the browser output before sharing it.

See [the production checklist](docs/PRODUCTION_PLAN.md) for the remaining delivery steps.

## Structure

```
Assets/
├── AdKit/         shared ad UI + SFX
├── JellyPuzzle/   Jelly Flow playable
├── NumberMatch/   Number Match playable
├── RescueRun/     Rescue Run playable
└── Scenes/
```
