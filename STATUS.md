# Batch 10 — Pets + ranch animals painted (A-17, A-08, A-09, A-18)

Base: main **6f89474** (PR #58 merged). Branch `cursor/batch10-painted-animals`. Worktree `/workspace/t-batch10`.

## Standing
- Never deploy, never touch cozy-preview / Workers / deploy.sh.
- Never touch /workspace/t-batch6, t-batch7, t-batch8.
- No server / save / protocol change. SVG kept as fallback.
- Art: recognizable first, cute second; original only; pets/animals keep faces; EGGS chick + 3 egg critters NO face; plush faces untouched; no repaint of shipped scene webps.
- art_ingame_bounds ±3% (fail >3%, warn 2–3%), SKY=day|night. Ranch decoded mem already 34.6 MB — keep assets tight, webp.
- Gate lock busy with 6/7/8 → **art first**, gate later under flock.

## Inventory (~55 webp ≈ 2.5 MB)
| group | count | ids |
|---|---|---|
| pets/cats | 12 | cat-{tabby,smokey,tuxedo,calico}-{stand,sit,nap} |
| pets/dogs | 15 | dog-{pup,poodle,dachshund,golden,spotty}-{stand,sit,sleep} |
| ranch animals | 6 | animal-{goat,sheep,piglet,chicks,bunny,cow} |
| horses | 10 | horse-{chestnut,snowy,midnight,sunny,rainbow}-{bare,saddle} |
| props | 5 | hen-house, tractor, apple-tree, windmill, basket |
| sign | 1 | eggs-sign (faceless chick) |
| fences/wall | 3 | paddock-fence, backyard-fence, house-wall |
| egg critters (faceless replace) | 3 | egg~cada-mouse, egg~quinn-pup, egg~sloane-snail |
| **total** | **55** | |

## Steps
1. [ ] STATUS + inventory + SVG shape refs
2. [ ] Generate raw paintings (GenerateImage + style lock)
3. [ ] art_process → assets/art/pets|ranch|living
4. [ ] Wire sprite maps (SVG fallback)
5. [ ] Contact sheet (new vs old SVG)
6. [ ] In-game shots 820x1180 before/after + SHA
7. [ ] art_ingame_bounds + decoded memory per scene
8. [ ] Full gate vs base (when lock free)
9. [ ] Old-client 10ef736 smoke ?hood=localhost
10. [ ] Draft PR

## Log
- 2026-11-06 ~02:21 CT  Worktree created at 6f89474. Gate lock BUSY. Starting art.

- 2026-11-06 ~02:27 CT  Pushed branch. 55 SVG refs rendered. Generated 12/12 cat raws into work/raw. Generating dogs next. Gate still busy.

- 2026-11-06 ~02:42 CT  Art pass complete (55/55 raws → webp). Total painted payload **0.66 MB** (under ~2.5 MB budget).
  - `assets/art/pets/` 27 webp (cats 12 + dogs 15)
  - `assets/art/ranch/` 25 webp (animals 6 + horses 10 + props 5 + fences/wall/sign 4)
  - `assets/art/living/egg~{cada-mouse,quinn-pup,sloane-snail}.webp` faceless replace (A-18)
  - Wired via `src/art/sprites.ts` + main.ts (SVG fallback; `?art=v1` forces SVG)
  - Contact sheet: `/workspace/t-batch10/work/sheets/batch10-contact-sheet.png` (+ `-half.png`)
  - Stretch warnings (art_process >18%): cat-tabby-sit, dog-poodle-stand, dog-dachshund-sleep, dog-golden-stand, dog-spotty-stand, basket, eggs-sign, egg-quinn-pup, egg-sloane-snail — may need aspect regen before bounds gate.
  - Gate lock still busy (batches 6/7/8). No preview/deploy. No server/save/protocol change.
  - Next: App Builder art review → then art_ingame_bounds + decoded-memory + full gate + old-client smoke + draft PR polish.

- 2026-11-06 ~02:43 CT  Face zoom-check:
  - egg~cada-mouse, egg~quinn-pup, egg~sloane-snail, eggs-sign: FACLESS OK
  - hen-house chick: HAS eyes → regenerate faceless
  - Stretch outliers to regen: cat-tabby-sit, dog-poodle-stand, dog-dachshund-sleep,
    dog-golden-stand, dog-spotty-stand, basket, eggs-sign, egg-quinn-pup, egg-sloane-snail
  - Gate lock still BUSY (pids on lock). Will run gate when free.

- 2026-11-06 ~02:48 CT  Regenerated hen-house (faceless chick confirmed). Regenerated stretch outliers;
  cat-tabby-sit 0.99, basket/eggs-sign/egg-quinn ~1.07–1.11 OK. Still watching dog-poodle/golden/dachshund-sleep
  and egg-sloane-snail stretch; will verify via art_ingame_bounds next.

- 2026-11-06 ~02:49 CT  App Builder ART_REVIEW received (/workspace/quality-audit/2026-11-06/batch10/ART_REVIEW.md).
  Pausing bounds/gate. Doing P0 → P1 → P2 regenerations before continuing.

- 2026-11-06 ~03:10 CT  ART_REVIEW P0+P1+P2 regenerations applied (before bounds/gate):
  P0: horse-rainbow bare+saddle yellow conical horn restored (no forehead star);
       all 4 cat-*-sit front-facing with faces visible; dog-dachshund-sleep real curled lying sleep.
  P1: native-aspect regen — basket, egg-quinn-pup, dog-spotty/poodle/golden-stand, egg-sloane-snail, eggs-sign (stretch ≤1.12).
  P2: all dog-*-sleep now lie/curl; animal-chicks + egg-cada-mouse + dog-dachshund-sit aspect-fixed;
       apple-tree + basket weave toned to furniture level; hen-house chick re-checked FACELESS;
       paddock-fence kept prior HEAD paint (near-stretch 1.17; ultra-wide regen was worse).
  Stretch audit after regen: hard STRETCH cleared on prior outliers except dachshund-sleep ~0.87 (near) and paddock 1.17 (near).
  New contact sheet: work/sheets/batch10-review-*.png + shots/batch10/batch10-contact-sheet*.png (SHA stamp after commit).
  Next: stamp SHA on sheet → art_ingame_bounds ±3% → decoded memory → in-game 820x1180 before/after → full gate vs 6f89474 when lock free → old-client smoke → update PR #66.
  Still NOT cleared for Andy/preview until App Builder re-review.

- 2026-11-06 ~03:15 CT  Post-ART_REVIEW verification (SHA after this commit):
  - Egg critters reprocessed with real catalog SVGs + FIT_ADJUST egg:cada-mouse [0,-0.5].
  - art_ingame_bounds living eggs SKY=day: **3/3 OK** (±2%). SKY=night: **3/3 OK**.
  - Decoded memory (scene_perf_mem): ranch still **34.6 MB** (unchanged scene backdrop); living rooms ~23 MB; park 27.8; map 11.2.
  - In-game 820x1180 chromium before/after: shots/batch10/ingame/pr-<sha>__{ranch,room-living}__820x1180__chromium{,__artv1}.png
  - Contact sheet: shots/batch10/batch10-contact-sheet.png (SHA-labeled).
  - Gate lock `/workspace/surprise/gate.lock` still contended by batches 6/7/8 — full gate + old-client 10ef736 smoke still pending.
  - Still NOT cleared for Andy/preview until App Builder re-reviews P0/P1 art.

- 2026-11-06 ~03:25 CT  (1)–(3) ready for App Builder re-review:
  - Shots: pr-cedf220 vs main-6f89474 WebKit 820x1180 ranch+living (+ artv1); crops under shots/batch10/crops/
  - Egg art_ingame_bounds: all 7 rooms × day/night **3/3 OK** (±2%/±3% shipping)
  - Ranch decoded mem: **34.6 MB HEAD = 34.6 MB main** (unchanged; sceneArt ranch.webp only)
  - Report: shots/batch10/REPORT-1-3.md
  - (4) full gate + 10ef736 oldsmoke: waiter holding for gate.lock (no kill); logs work/gate-logs/

## Andy assets (report first) — tip `8faaa2c`
- Rainbow windmill sails restored (Y/B/P/G); slim + FIT_ADJUST [2.5,0.6]; ranch bounds OK dw=-1.9%.
- animal-chicks fill nudged (asp~1.2).
- 2× downscale cancelled; sizes stay as committed.
- Andy JPGs (<2 MB) in `shots/batch10/andy/`:
  - `before-after__ranch__820x1180.jpg` (paddock horses, SHA-labeled)
  - `before-after__barn__820x1180.jpg` (barn animals, SHA-labeled)
  - `before-after__ranch-windmill__820x1180.jpg` (windmill frame)
  - `crops-animals__compact.jpg` (horses incl. rainbow unicorn, cats, dogs+sleeps, egg critters, barn animals, windmill, tractor, eggs-sign)


## Verification 1–3 (in progress after Andy assets)
- Tip HEAD: `e9f88b0` (rainbow windmill + Andy JPGs). In-flight tip gate locked at `a76b451`.
- (1) FOREIGN HOSTS (prior oldsmoke @ tip gate-logs): only `127.0.0.1:7630/7631/7632` harness — **not** workers.dev / real remote. Allowlist gap (`localhost` vs `127.0.0.1`). **No hard-stop.** Tip2 oldsmoke will reconfirm.
- (2) gameroom: tip `a76b451` **68/69** — FAIL `390x844 paddock horses… mounts:False` (hit-test). Base (batch8 gate2-base) **69/69** mounts:True. CSS pe:auto fix landed in `c2c941e`; tip2 re-gate queued to confirm 69/69.
- (3) tip-vs-base gate table: tip2 re-run queued (`work/run-gate-tip-rerun.sh` → `work/gate-logs-tip2/`) after pid 1534414 releases lock; will capture HEAD at start (expect e9f88b0+).
