# Batch B — ranch group status

Branch `cursor/art-batch-b-ranch` (base `cursor/art-batch-b0` 3337aae, from main dda1839).

| scene | commit | file | bytes |
|---|---|---|---|
| ranch | 50167ea (painting + hooks + adapter), re-encoded in 8408882 | assets/art/scene/ranch.webp 7200x1200 q70 | 141,724 |
| barn | 76a0065 | assets/art/scene/barn.webp 3800x1200 q82 | 148,740 |

## How it was painted
Each scene is painted on its own 2x vector render (`scripts/scene_guide.py`, ?art=v1, sun face removed). It uses `scripts/scene_paint_guide.py` and recipes in `scripts/scene_recipes/outdoor/`. Doors, floor lines and hotspots therefore cannot drift.

Three attempts were made per scene, and A was picked each time:
- A: textured regions.
- B: flat, too plain.
- C: heavier edges that dull the banner.

Textures are tiled seamlessly in both directions and kept low-frequency so the 7200 px ranch fits the budget. The budget is now decimal: 150,000 B.

## Gate (PR 8408882 vs base dda1839, ports 6650-6679, under gate.lock)
| suite | PR | base |
|---|---|---|
| tsc | ok | ok |
| art_catalog | 13 passed | same |
| art_bounds | 2 passed | same |
| art_raster | 11 pass, 2 FAIL (decor contact shadow; living rasters) | same 2 known |
| phone | 383/383 | known flake only |
| hood | 44/44 | known 429 line on base |
| b0_compat | 14/14 | — |
| avatar | 34/34 | same |
| rooms | 71 passed | same |
| sit (node) | crash | same known crash |
| migration vs 10ef736 | 43/43 | 43/43 |
| scene_hotspot (all painted scenes) | 139 passed, 0 failed; ranch + barn deliberate-shift negatives caught | n/a |

Merge-test onto origin/main ec4b455: clean (auto-merge in src/main.ts). It was a throwaway worktree and was not pushed.

## Concerns
- The paddock fence stays as the live vector `svg.fenceLayer` above the painting, so it keeps depth-sorting with the horses. This is a design decision.
- The barn lanterns are part of the painting, so they no longer swing. The vector sun's face is not in the painting.
- Horses and animals wander, so they are compared only as tappable live elements, not box for box.
- The scene SVG is hidden with `opacity:0` rather than `visibility:hidden`, so testnav's visibility waits still work.
- Rooms fix 6a442c9 (duplicate img in showSceneArt) does not affect ranch/barn in practice: renderRanch recreates the host on every render. The integrator should still take it.
- JS gzip vs dda1839 is +1,094 B, and that includes b0. Under the 2 KB limit.
- The 820x1180 desktop WebKit map button is covered by the stage, as on base. The tests open the map by its own click.
