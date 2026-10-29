# Batch B — group yard status
## backyard
- Attempts (scripts/scene_recipes/backyard_{A,B,C}.json, compositor scripts/scene_paint_svg.py from ?art=v1 vector layers):
  A AI textures + stylized vector tree (148 KB q82); B paper+median, darker (133 KB q86); C = A + AI gouache tree prop (149 KB q78).
- Shot in Chromium+WebKit at 820x1180/844x390/390x844: picked C (most recognizable tree, gouache texture, door/fence/house aligned).
- Hook: src/scenery.ts roomSceneArt('backyard'); CSS hides .yardWorld vector under the painting; ?art=v1 keeps vector.
- Loader fix src/art/scene.ts: put() re-queries the <img> (stale closure made a 2nd img -> living painting stayed over the backyard).
- scene_hotspot_test: backyard adapter (lawn horizon via G-B chroma, door L/R/top, door hotspot); 72/73 then horizon fixed offline; SCENE_SHIFT=12 negative fails all edge checks.

## clubhouse
- Attempts: A paper/paper q70 148822 B; B AI wall+floor q58 148330 B; C wall amt2.6 dblur5 + floor, q70, 145818 B — picked C (less blotchy than B, clean in WebKit+Chromium at 3 sizes).
- Hook in gameroom-view.ts (#grSceneArt in #grWorld); bulbs/neon/photo stay vector; ext strip colours matched via scenery.css.
- scene_layers.py renames cloned ids (dup #grWall broke gradients). Door geom = outer ink box.
- scene_hotspot_test: 117 passed/0 failed; SCENE_SHIFT=12 → 12 expected fails.
## Batch A contrast (throwaway tmp-yard-x-batcha, not pushed)
- All 30 items mean diff ≥41 (thr 25) in Chromium+WebKit; lowest lily-pond 41 (vs 69 on vector).

## Group gate (2026-10-29) base dda1839 vs pr 381944c — identical
| suite | base | pr |
|---|---|---|
| tsc | rc0 | rc0 |
| art_catalog | 13 pass | 13 pass |
| art_bounds | 2 pass | 2 pass |
| art_raster | 11 pass, 2 known FAIL | same 2 FAIL |
| phone | 383/383 | 383/383 |
| hood | 44/44 | 44/44 |
| rooms | 71 pass | 71 pass |
| sit | known node crash | same |
| avatar | 34/34 | 34/34 |
| b0_compat | 14/14 | 14/14 |
| migration vs 10ef736 | 43/43 | 43/43 |
| scene_hotspot | n/a | 117/0; SCENE_SHIFT=12 → 12 expected FAIL |
- JS gzip: 243280 → 244094 (+814 B vs dda1839).
- WebPs: backyard 148920 B, clubhouse 145818 B (≤150000).
- Merge onto origin/main ec4b455: clean (throwaway tmp-yard-rebase-test f23dd7c; rebase also clean), tsc+build ok; not pushed.
- Batch A items on painted backyard (merged build): all 30 ≥41 mean diff (thr 25); lowest lily-pond 41, stepping-stones 42, birdbath 46.
- Shots: /workspace/t-batchB-shots/yard/ (cur-ec4b455__, pr-381944c__, __artv1, merge-main-f23dd7c__ backyard w/ Batch A).
