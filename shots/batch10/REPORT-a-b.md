# Batch 10 follow-ups (a) decoded ranch memory (b) barn animals bounds

## (a) Real ranch decoded memory (incl. Batch 10 sprites)

Method: Chromium Playwright, open ranch (then barn), sum `naturalWidth×naturalHeight×4` for every `<img>`, plus renderer PSS. HEAD `cedf220` vite :5198 vs main `6f89474` vite :5197.

| build | where | sceneArt | Batch 10 sprites shown | **all imgs decoded** | renderer PSS |
|---|---|---:|---:|---:|---:|
| HEAD | ranch outside | 34.6 MB (`ranch.webp`) | **12.99 MB** (10 sprites) | **74.9 MB** | 282 MB |
| MAIN | ranch outside | 34.6 MB | **0** (SVG animals) | **61.9 MB** | 275 MB |
| HEAD | barn | 18.2 MB (`barn.webp`) | **2.59 MB** (6 animals) | **48.2 MB** | 272 MB |
| MAIN | barn | 18.2 MB | **0** | **45.6 MB** | 287 MB |

**Delta HEAD − MAIN (all decoded imgs):**
- ranch outside: **+13.0 MB** (matches the 12.99 MB Batch 10 ranch sprites on stage)
- barn: **+2.6 MB** (matches the 2.59 MB animal sprites)

Batch 10 sprites on ranch outside: apple-tree, hen-house, 5×horse-*-bare, paddock-fence, tractor, windmill.  
Batch 10 sprites in barn: goat/sheep/piglet/chicks/bunny/cow.

Note: earlier `scene_perf_mem` 34.6 MB was **only** `ranch.webp` and is unchanged vs main; the +13 MB is the new painted sprites.

Theoretical catalog sum of all 55 Batch 10 WebPs if every pose loaded: **37.17 MB** (not all on screen at once).

## (b) Barn animals bounds (retry, longer wait)

`state=attached` + 2.5s settle + scrollIntoView. Shipping TOL=2 / WARN_TOL=3.

| animal | sky=day | sky=night |
|---|---|---|
| goat | OK (+0.4 / +1.3) | OK |
| sheep | WARN (+0.0 / +2.1) | OK (+0.0 / +1.0) |
| piglet | **FAIL** (−0.8 / **+3.2**) | **FAIL** (−0.8 / +3.2) |
| chicks | OK | OK |
| bunny | OK | OK |
| cow | OK | OK |

**day: 4 OK / 1 WARN / 1 FAIL** · **night: 5 OK / 0 WARN / 1 FAIL** (piglet dh +3.2% both). JSON: `work/bounds/barn-animals-{day,night}.json`.
