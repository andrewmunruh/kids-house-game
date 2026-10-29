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
