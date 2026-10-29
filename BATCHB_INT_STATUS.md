# Batch B integration (cursor/art-batch-b, PR #52)
Base origin/main ec4b455. Merged in order: b0 3337aae, rooms 9fc7d6e, town 17d1003 (clean), yard 76d1d56 (conflicts), ranch 0c68dad (conflicts).
- src/art/scene.ts: rooms 6a442c9 and yard 638b5cb made the same re-query fix; kept ONE (yard's commented version).
- scenery.css, scripts/scene_geom.js, tests/scene_hotspot_test.py, tests/scene_shots.py: all adapters kept (town, yard/clubhouse, ranch/barn, rooms). paint_checks merged (SCENE_SHIFT + lines + ref/check/floorLine).
## Assets
scene_paint.py encode(): budget now decimal (max_kb*1000) with quality step 1.
- room-nursery re-run from recipe: 152,332 -> 141,502 B (q78->q77)
- map: from town source map_C.png: 150,152 -> 147,140 B (q69); park from park_C.png: 150,284 -> 148,090 B (q45)
