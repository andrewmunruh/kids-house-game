# Batch 10 verification (1)–(3) — HEAD `cedf220` vs main `6f89474`

## (1) In-game before/after shots (820×1180, WebKit)

| Scene | HEAD painted | HEAD vector (`?art=v1`) | main `6f89474` |
|---|---|---|---|
| ranch | `shots/batch10/ingame/pr-cedf220__ranch__820x1180__webkit.png` | `...__artv1.png` | `shots/batch10/ingame/main-6f89474__ranch__820x1180__webkit.png` |
| living | `shots/batch10/ingame/pr-cedf220__room-living__820x1180__webkit.png` | `...__artv1.png` | `shots/batch10/ingame/main-6f89474__room-living__820x1180__webkit.png` |

Close crops (`shots/batch10/crops/` / `work/crops/`):
- `cedf220__crop-horse-rainbow-bare.png` — unicorn horn present, no forehead star
- `cedf220__crop-ranch-horses.png` — paddock horse row
- `cedf220__crop-cats-sit-front-row.png` — all 4 coats front-facing sits
- `cedf220__crop-dogs-sleep-row.png` — all 5 breeds lying/curled sleep
- also: animal-chicks, barn-animals, cat-tabby-sit alone

## (2) art_ingame_bounds — shipping ±3% (TOL=2 warn band, WARN_TOL=3 fail), SKY pin

### Egg critters (placeable ITEMS) — every house room + backyard

| room | sky=day | sky=night |
|---|---|---|
| living | 3/3 OK | 3/3 OK |
| bedroom | 3/3 OK | 3/3 OK |
| kitchen | 3/3 OK | 3/3 OK |
| salon | 3/3 OK | 3/3 OK |
| nursery | 3/3 OK | 3/3 OK |
| bathroom | 3/3 OK | 3/3 OK |
| backyard | 3/3 OK | 3/3 OK |

(nursery/bathroom used explicit placement — stock LAYOUTS filter drops non-nursery kinds.)

### Ranch sprites (horses / props / barn animals) — custom in-game alpha vs `?art=v1`

Same hide-all / show-one method as `art_ingame_bounds`. Day (sky=day):
**sky=day:** pass 5, warn 1, fail 3 of 9 — OK horse-1/2/**4(rainbow)** hen-house apple-tree; WARN horse-0; FAIL horse-3, tractor, windmill. Barn animals skipped (visibility timeout).

**sky=night:** pass 5, warn 2, fail 2 of 9 — OK horse-0/1/**4** hen-house apple-tree; WARN horse-2/3; FAIL tractor, windmill.

Pets (injected host vs inventory SVG, advisory — not furniture `art_ingame_bounds`): day 3 OK / 6 WARN / 18 FAIL; night 5 / 4 / 18. Worst: **dog-*-sleep** +25–34% dw (curled lies wider than SVG sleep loafs).

## (3) Ranch decoded memory vs main

| build | ranch `retained_decoded_mb_max` |
|---|---|
| HEAD `cedf220` | **34.6 MB** |
| main `6f89474` | **34.6 MB** |
| delta | **+0.0 MB (unchanged)** |

Note: `scene_perf_mem.py` only sums `img.sceneArt` (here `ranch.webp` backdrop). Individual pet/ranch sprite WebPs are not in that total; 34.6 MB is the pre-existing ranch scene paint, not Batch 10 sprites.
