# Portfolio production checklist

## Delivery order

1. Jelly Flow: validate the recreated Unity playable, then pair it with the original video.
2. MechWars: select one strong motion/design creative and one gameplay-led creative. Confirm the author's exact contribution for each before publishing credits.
3. Rescue Run: polish and validate a spec playable to show a different mechanic. Keep Number Match and Last Camp as additional candidates until visual review.

## Playworks

- [x] Confirm Unity version: 6000.0.51f1.
- [x] Install Playworks 7.2.0 from the downloaded distribution.
- [x] Open plugin and authenticate locally.
- [x] Start the first JellyPuzzle development export.
- [ ] Resolve export diagnostics; verify WebGL 2 for Unity 6.
- [ ] Verify tutorial, touch input, win/fail, replay and endcard in a browser.
- [ ] Integrate and verify Playworks install/end-of-game APIs.
- [ ] Verify audio; replace runtime synthesis with imported clips if needed.
- [ ] Replace generic store destinations with appropriate demo behavior or approved app destinations.
- [ ] Record final compressed size, loading time and device/browser test results.

## Creative review

Authorship boundary confirmed by the author: [Every mech is a weapon](https://www.tiktok.com/@mechwarsofficial_/video/7564694631250808085), published 2025-10-24, is the first work in scope; select this video or later posts. Earlier posts are not the author's work. The previously considered customization and lava-arena videos were rejected for that reason and must not be credited to her.

Pair a verified selection with Jelly Flow and a finished spec playable. The final choice should prioritize craft, relevance and confirmed personal contribution.

For each shortlisted creative, check the opening two seconds, readable objective, one clear mechanic, escalating payoff, sound and a legible endcard. Record one clean vertical gameplay capture and one alternate hook. Autoplay recordings must not replace manual playable testing.

The reference directions are a squad runner with number gates/rescue and a survivor/base-defense horde. Build original portfolio concepts and label them spec work; do not imply a Voodoo commission.

Voodoo's current game catalogue includes puzzle, action and strategy titles: https://voodoo.io/games . Select a specific title only after reviewing its actual gameplay.

## GitHub handoff

- [ ] Put the strongest 2–3 direct watch/play links near the top of README.
- [ ] Add a thumbnail and short contribution statement for each selected work.
- [ ] Publish tested browser outputs and verify links without a signed-in account.
- [ ] Keep source, setup instructions and final demo links accessible together.
- [ ] Exclude local accounts, credentials, private correspondence, SDK distribution and generated caches.
- [ ] Review the final diff before committing and uploading.

## First export findings — 2026-11-20

Playworks 7.2.0 installed and its panel opened successfully after local sign-in. Two development export attempts failed with MSB3644: missing .NET Framework v4.7 reference assemblies. Compiler v2 was enabled for the second attempt but did not remove this failure on this machine. Other targeting pack versions are present, but v4.7 is absent.

The official Microsoft Developer Pack installer was downloaded and its Authenticode signature verified as Microsoft Corporation. The initial installation was cancelled; after the user granted Windows administrator consent, the retry completed with exit code 0 and v4.7 reference assemblies were verified on disk.

CTA and endcard code now call the installed Playworks SDK directly. Conditional calls were absent from the Editor assembly used by the exporter, so the initial UNITY_LUNA-only integration was replaced. A local `off` identifier was renamed after LP3005. The next export showed the ad-network API checks passing.

Subsequent compilation exposed unsupported runtime audio synthesis, modern object lookup, generic built-in font lookup, Light.type and TextMesh.fontStyle. Audio synthesis was moved to an Editor-only baker; 16 WAV files were generated and imported. Object/font lookups were changed to older API forms; unsupported light type and TextMesh bold assignments were removed. Lighting for the two 3D concepts must be visually reviewed. A successful final compilation and browser test are still required; WebGL shader warnings remain to investigate.

TikTok view counts are public reach signals; they do not establish organic reach, CPI, ROAS or authorship. Do not present them as campaign performance evidence without supporting data.
