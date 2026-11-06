# Batch 10 App Builder redo @ `767f760`

## Basket usage
`basketSVG` is the **empty** wicker chip icon in `renderBasketChip` / basket sheet (`src/ranch.ts` + `main.ts`). Contents (eggs/carrots/flowers) are separate count badges, not painted into the basket. Painted `basket.webp` matches the **empty** SVG.

## Redo results
| item | change | notes |
|---|---|---|
| cat-tuxedo-sit / nap | cream-key whites restored opaque | pink wallpaper composite clean; holes=0 |
| eggs-sign | faceless chick restored | wood + EGGS + beak/comb chick, no eyes |
| basket | empty soft weave | matches empty SVG |
| windmill | slim tower/sails + FIT_ADJUST [2.5, 0.6] | ranch bounds **OK** dw=-1.9% dh=-0.6% (sails frozen) |
| tractor | side profile, fills box | ranch bounds **OK** dw=0.0% dh=-0.4% |
| animal-chicks | content aspect ~1.2 | process stretch 0.98 |

## Ranch bounds ±3% (day, sails frozen)
pass 7 / warn 2 (horse-0, horse-3) / fail 0 of 9 (barn animals skipped — visibility). horse-3 accepted per AB.

## Artifacts
- Contact: `shots/batch10/batch10-contact-sheet-767f760-redo.png` (also full sheet)
- In-game WebKit 820×1180: `shots/batch10/ingame/pr-767f760__{ranch,room-living}__*` vs main-6f89474
- Crops: `shots/batch10/crops/767f760__crop-*`
