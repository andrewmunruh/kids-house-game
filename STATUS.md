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
