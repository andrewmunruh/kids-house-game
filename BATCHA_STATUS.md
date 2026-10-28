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

## Step 2 — faceless secret pop-ups
Pop-up paintings (seen from behind, no faces): assets/art/living/_pop~cada-mouse.webp (6236 B), _pop~quinn-pup.webp (6950 B), _pop~sloane-snail.webp (9962 B), 300x300 (3x of the 100 viewBox), stretch 1.00. Loader ignores `_` names; eggs.ts reveal() shows them (SVG if ?art=v1 or the load fails).
Chloe's star lamp has no pop-up (no hello); its shipped painting is already faceless, and it is the Secrets tab icon.
Vector fallbacks for egg:cada-mouse, sloane-snail, chloe-starlamp, quinn-pup: eyes/mouth/nose/blush removed; shapes and bounds kept.
NOT changed (still have faces, per brief): shipped in-room paintings living/egg~cada-mouse.webp, egg~quinn-pup.webp (and the snail's eye stalks).

## Step 3 — drawer tab icons and chips
Chips (furniture/decor/plants/food/pets, pack chips) now preload their item paintings at boot and swap to them once loaded (refreshChipArt); the Secrets chip shows the faceless star-lamp painting instead of 🎁 (SVG under ?art=v1). TAB_ICO (compact room tabs) refit: plum #5b3d5c stroke + door, same 14x12 box. PEOPLE_ICON stroke #5a3d5c → #5b3d5c. Chip/tab sizes and hit areas unchanged (no size CSS touched). Checked in screenshots at 1180x820 and 844x390.

## Step 4 — draft PR https://github.com/andrewmunruh/kids-house-game/pull/50

## Step 5 — merged paint branch (FINAL d59253e) → 4015199; STOPPED at art_bounds lint
Normal merge, clean; brings scripts/art_process_peel.py + 10 backyard webps.
tests/art_bounds.py (items re-dumped, 30 backyard kinds), rc=1: 16 OK, 13 WARN over 3%, 1 FAIL.
FAIL patio-lights (2 interior holes, w .050). WARN w/h: picnic-blanket .136/.194, pinwheel h .111, seesaw w .102, butterfly-bush w .095, rain-barrel w .088, sprinkler h .084, lemonade-cup h .084, stepping-stones w .084, birdhouse h .050, hedge-row w .050, patio-umbrella w .036, splash-pool w .033, sun-lounger w .032.
Not on base dda1839 (no backyard paintings there), so not a base-identical failure → stopped before the full gate, Step 6 and the rest of Step 7. Contact sheet: /workspace/t-batchA-shots/pr-4015199__backyard-contact.png

## Step 4b — art fixes (post-FINAL merge)
- patio-lights: filled 2 interior holes (end-hook eyelets, 204/205 px) with pale lavender; art_bounds no longer FAILs.
- lemonade-cup: painted bbox refit to processor box (24,36–134,200; content scale 1.058×1.051, <18%), stray alpha cleaned. In-game day: dw +0.0 dh -1.0 feet 0.0 (was -5.8/-4.9/-3.1).
- picnic-blanket: content height ×1.037 bottom-anchored. In-game: dw -0.6 dh 0.0 feet -0.5 (was dh -3.6).
- art_ingame_bounds backyard (±3% std, TOL 2): day 30/30 OK, night 28/28 OK (+2 lights SKIP).
- art_bounds (offline, advisory) remaining backyard WARNs all pass in-game ≤2%; raster bbox == cairosvg processor box, so they are browser-vs-cairo measurement artifacts, same class as shipped WARNs (plant w .151, cc-flower-lamp .095, wh-fiddle-leaf-fig .089, pothos .068, unicorn-plush .066). Kept: picnic-blanket w.136 h.167, pinwheel h.111, seesaw w.102, butterfly-bush, rain-barrel, stepping-stones, sprinkler, birdhouse, hedge-row, patio-lights w.050, patio-umbrella, splash-pool, sun-lounger. Shipped pack:fire-pit FAIL (size) is base-known.

## Step (a) — glow check @83e57a9
beach-ball, toadstool-light, sprinkler, rain-barrel are byte-identical to paint FINAL d59253e. Edge alpha profile (semi-alpha band px / mean semi alpha / halo luminance):
beach-ball 6.41/137/74, toadstool-light 6.36/136/74, sprinkler 7.69/136/74, rain-barrel 5.82/135/74.
Shipped living: bunny 6.30/136/74, cactus 6.31, cat-tower 5.74, cat 6.09, dog 6.38, egg~cada-mouse 7.09 (all 134-136/74).
=> matches shipped within tolerance (sprinkler +8% vs widest shipped, thin-stroke item). No reprocess. Earlier "thick glow" was the contact sheet's upscaled view.

## Step 5 — gate @PR (83e57a9 + chip-art lazy fix) vs base dda1839
Found: art_raster "a fresh house does not fetch unplaced catalog art" FAILed on PR only (drawer chip paintings were in the boot kinds → fetched balloon). Fix: chip icon paintings now load on first touch of #cats/#shelf (loadChipArt), SVG until then.
| suite | PR | base |
|---|---|---|
| tsc | ok | ok |
| art_catalog | 13/13 | 13/13 |
| art_bounds_test | 15 pass | 15 pass |
| art_raster | 59 pass / 2 FAIL | 59 pass / 2 FAIL (same 2: decor contact shadow; living rasters art=v1) |
| avatar (unit) | 50 | 50 |
| costume | 20 | 20 |
| phone | 383/383 | 383/383 |
| hood | 44/44 | 44/44 |
| avatar_test | 34/34 | 34/34 |
| eggs | 25 pass | 25 pass |
| b0_compat | 14/14 | 14/14 |
| mail_persist node/worker/b0 | 4/4/1 pass | 4/4/1 pass |
| migration vs 10ef736 | 43 pass | 43 pass |
Bundle (fresh --emptyOutDir builds, all JS gzip -9): dist 16,138,804 → 7,870,284 B; JS gzip 290,915 → 288,440 B (−2,475).

## Step 6 — rollback values (verified live before deploy, 2026-10-28)
- Worker cozy-hood-preview version 42fe087f-13f9-45e4-8db7-6c06e0a2c982
- cozy-preview gh-pages 1b38f18f52032723fb442ded2ffb448b06c1341b
- preview bundle index-BJ-2qTB5.js
