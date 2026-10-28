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

## Step 0 — baseline on base dda1839 (2026-10-28)
tsc ok. vite-node: ambient 63 (OLD_TREE=10ef736 archive), needs 51, arm_layer 3068, arrive ok, art_catalog 13, art_bounds 2, art_raster 11 pass/2 FAIL (base-known: "decor thumbnails have no contact shadow", "living rasters load, art=v1..."), avatar 50, baby 84, bathroom 27, costume 20, halloween ok, mail 77, mail_persist n/a (needs mode arg), needs_first_hint 11, paint 51, party 6, polish 34, rooms 71, sit 119, sky_undo 14, social 55, tables 26/26, trick_or_treat 24.
Browser (gate, fresh servers): phone 383/383, hood 44/44, eggs ok, avatar 34/34, b0_compat 14/14.

## Step 1 — drop 279 PNGs with SVG siblings
Removed 279 PNGs (items 254, patterns 25); app icons icon-180/192/512 kept. Manifest: png+pngPx dropped on those entries, svg filled in where missing (78 entries). The png fields that point at winter/halloween .webp files were left alone. art_catalog 13 passed, tsc ok.
dist bytes: 16,469,213 before → 7,843,986 after (−8.6 MB); hashed PNGs in dist/assets 279 → 0.
