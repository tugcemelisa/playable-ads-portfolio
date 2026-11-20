# Playable Ads Portfolio

Playable ads and video creatives by **Melisa Tuğçe Haspolat**, built in Unity.

> 🚧 Work in progress: playable links, GIF previews and videos will be added here.

## Projects

| Creative | Type | Description |
|---|---|---|
| **Jelly Flow** | Playable + Video | Pixel-art puzzle: jellies ride a conveyor around the picture and eat matching pixels. |
| **Rescue Run** | Playable + Video (spec) | Runner shooter: grow your squad through +/× gates, free the trapped hero, face the boss. |
| **Number Match** | Playable + Video | Colour-by-number: a picture breaks into a numbered grid, drag tiles onto matching numbers and each colour group reveals with a wave. Playable-ad version of my Number Match case study. |

## Tech

- Unity 6000.0 LTS (Unity Playworks / Luna compatible)
- Procedural SFX (no audio files, small build size)
- Shared `AdKit`: tutorial hand, endcard + CTA, banners
- Auto-play mode for recording video creatives with Unity Recorder

## Structure

```
Assets/
├── AdKit/         shared ad UI + SFX
├── JellyPuzzle/   Jelly Flow playable
├── NumberMatch/   Number Match playable
├── RescueRun/     Rescue Run playable
└── Scenes/
```
