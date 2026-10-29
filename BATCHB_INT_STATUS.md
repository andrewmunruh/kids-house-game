# Batch B integration (cursor/art-batch-b, PR #52)
Base origin/main ec4b455. Merged in order: b0 3337aae, rooms 9fc7d6e, town 17d1003 (clean), yard 76d1d56 (conflicts), ranch 0c68dad (conflicts).
- src/art/scene.ts: rooms 6a442c9 and yard 638b5cb made the same re-query fix; kept ONE (yard's commented version).
- scenery.css, scripts/scene_geom.js, tests/scene_hotspot_test.py, tests/scene_shots.py: all adapters kept (town, yard/clubhouse, ranch/barn, rooms). paint_checks merged (SCENE_SHIFT + lines + ref/check/floorLine).
## Assets
scene_paint.py encode(): budget now decimal (max_kb*1000) with quality step 1.
- room-nursery re-run from recipe: 152,332 -> 141,502 B (q78->q77)
- map: from town source map_C.png: 150,152 -> 147,140 B (q69); park from park_C.png: 150,284 -> 148,090 B (q45)

## Perf (Chromium, 1180x820 unless noted)
- Renderer PSS after visiting all scenes: PR 663 MB vs base 257 MB (Chromium decoded-image cache); after critical memory-pressure purge PR 167 MB vs base 153 MB (pre-fix PR 171). DOM: only 1 painted <img> holds a src after fix (was up to 5).
- Nominal decode 4 B/px: room 23 MB, map 11.2, park 27.8, ranch 34.6, barn 18.2, clubhouse 25.0.
- Park @6x CPU, dpr2: 820x1180 enter max 100 ms (base 66.7), pan 4642 px/3 s max 16.8 ms 0 slow; 1180x820 enter max 50 ms (base 66.7), pan max 16.8.

## Preview rollback values (recorded before deploy, 2026-10-29)
- Worker cozy-hood-preview version a40cfe72-19aa-49d2-9936-968939be066a (server unchanged; deploy-preview.sh does not redeploy the Worker)
- cozy-preview gh-pages f70d538c230b8dbbad9a38104ce85fa1ae71599f; live bundle assets/index-C3A4WDTr.js

## Gate (PR 7c2ece7 dist vs base ec4b455 dist; ports 6760-6769 / 6780-6789; old client 10ef736 = /workspace/t-batchB-old10)
Box was restored from a snapshot ~10:21 CT (node_modules, Playwright browsers + WebKit libs, /tmp/b0tree, old10 dist lost); all rebuilt/reinstalled, then suites rerun.
| suite | PR | base |
|---|---|---|
| tsc | ok | ok |
| art_catalog | 13 passed | 13 passed |
| art_bounds | 2 passed | 2 passed |
| art_raster | 11 passed, rc=1 (2 known) | same |
| avatar unit / costume / rooms | 50 / 20 / 71 passed | same |
| avatar_test | 34/34 | 34/34 |
| hood | 44/44 | 44/44 |
| eggs | rc=0 | rc=0 |
| b0_compat | 14/14 | 14/14 |
| mail_persist node/worker/b0 | 4/4/1 | 4/4/1 |
| migration vs 10ef736 | 43/43 | 43/43 |
| phone | 381/383, 380/383 (only "Let's play visible" at short landscape, button 43-46 px at viewport edge); one run hit a random pet covering the back-door label | 383/383, earlier 346/348 with the same "Let's play visible" fail at 932x430 |
| scene_hotspot all 13 scenes | 613 PASS, 0 FAIL | n/a |
| scene_hotspot SCENE_SHIFT=12,10 | 19 FAIL across 10 adapter scenes (expected); map/map-portrait/park/ranch use their built-in shift negatives | n/a |
Found + fixed during gate: town's `.parkWorld.sceneArtOn > svg.parkScene {visibility:hidden}` also hid the ranch svg (ranchWorld has .parkWorld) -> phone_test timed out on `.ranchScene`. Fixed with :not(.ranchWorld) (7c2ece7).
