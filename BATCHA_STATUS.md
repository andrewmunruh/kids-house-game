# Batch A (art refresh) — PREVIEW ONLY
Branch cursor/art-batch-a from dda1839c8343b647c7051f3504f12ba7363461ef. Never production (main/gh-pages/Worker cozy-hood untouched).

## Steps
- [ ] 0 baseline: base dist + bundle size, base test failures (art_raster/art_bounds/photobooth known list)
- [ ] 1 delete 279 PNG duplicates (keep 3 app icons), manifest png fields, art_catalog_test, bundle before/after
- [ ] 2 secret popup paints faceless art
- [ ] 3 drawer tab icons / category chips
- [ ] 4 30 backyard paintings
- [ ] gate, preview deploy, smoke, shots

## Log (CDT)
- 10:56 started; clone at /workspace/t-batchA; style guide PLAN.md not yet present, using docs/art-style-lock.md (shipped painted style)

## Step 4 (backyard art) — WIP
- 30 backyard WebPs painted, all <30 KB, art_process stretch within ±18% except little-slide 0.76 (flagged).
- Not yet linted (art_bounds needs Playwright browser env; must run under gate lock).
- Visual concerns: sprinkler droplets dropped by keyer (reads as splat); birdhouse post shortened; plum halo on several items; toadstool red not rose.
