# Batch B — rooms (branch cursor/art-batch-b-rooms, from cursor/art-batch-b0 @3337aae)

| scene | commit | webp bytes | q | attempt picked |
|---|---|---|---|---|
| room-bedroom | 9d1b253 | 134598 | 78 | C |
| room-kitchen | a1dfc4a | 120708 | 82 | C |
| room-salon | 314835f | 126358 | 82 | C |
| room-nursery | e5c7a35 | 152332 (148.8 KiB) | 78 | C |
| room-bathroom | 57027bb | 132198 | 82 | C |
| loader fix | 6a442c9 | - | - | src/art/scene.ts re-queries its img in put() |

Attempt C = exact vector wall pattern (scripts/scene_pattern_tex.py) + gouache grain, living's floor texture,
palette = room vector colours one step darker (living's Lab delta). A = AI patterned walls, B = AI hand-brushed (rejected: seams, busy gingham, leaf artifacts, size).

Loader bug found by shots: two pending loads of the first painting each created an <img>, so the living painting
stayed on top in every other room. Fixed in 6a442c9 (+1 line); JS gzip 243280 -> 244184 (+904 B).

## Gate (PR dist vs base logs/base)
tsc 0=0 · art_catalog 13=13 · art_bounds 2=2 · art_raster 11 pass + same known fails as base · phone 383/383 (base had yard_door flake)
· hood 44/44 = · rooms 71 = · avatar 34/34 = · b0_compat 14/14 = · migration vs 10ef736 43/43 = · sit rc=1 = base
· scene_hotspot (6 room paintings) 110/0; SCENE_SHIFT=12,10 -> 9 FAIL (negative check OK)

Shots: /workspace/t-batchB-shots/rooms/ (cur-dda1839__, pr-6a442c9__, __artv1; 3 sizes x chromium/webkit)
Family sheet: pr-6a442c9__six-rooms__844x390__webkit__sheet.png
