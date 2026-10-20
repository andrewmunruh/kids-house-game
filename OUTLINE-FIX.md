# Outline fix (2026-10-19): match the SHIPPED living room (main 8a12495)

The old lock said "thin soft dark-brown outline #5a3d36". That is wrong. The 14 shipped living-room WebPs
(assets/art/any/*.webp at 8a12495) all share this measured contour:

- Colour: plum **#5b3d5c** (RGB 91,61,92), solid, for every edge (outer silhouette and see-through openings).
- Depth: **9 px on the 3x canvas (= 3 CSS px)** measured inward from the nearest transparent pixel, then ~2 px blending into the paint.
- Soft outer alpha ramp, alpha at depth 1..6 px: **27, 70, 132, 194, 234, 251**, then 255.
- Not trusted to the painter; laid by the post-process at final canvas size.

## Parameters (scripts/art_process.py on cursor/art-rollout, commits 698d05a + 542ab1f; use 542ab1f)
```
OUTLINE    = [91, 61, 92]                 # #5b3d5c
CONTOUR_PX = 9
RAMP       = [27, 70, 132, 194, 234, 251]
BLEND_PX   = 2
SMOOTH     = 2.0                          # gaussian sigma of the silhouette mask
```
`plum_contour(fg, al)` runs last in `finish()`: silhouette = gaussian(alpha/255, 2.0) > 0.5 (largest island); d = signed EDT (inside minus outside, padded 1), blurred with sigma 1.0; colour t = clip((9+2+1.5-d)/3, 0, 1) mixes toward plum (solid plum to ~d 10); alpha = min(alpha, interp(d, 0..7 -> 0,27,70,132,194,234,251,255)); alpha 0 where d<=0. Result measured on the fridge: a25/72/132/194/234/251 #5b3d5c, solid to ~9 px, the same as the shipped armchair.
Also fixed: the canvas paste no longer uses the image as its own mask (that squared edge alpha and darkened it to near-black).

## Prompt template change
Replace "Consistent thin soft dark-brown outline (#5a3d36) of even weight." with
"Thick soft plum (#5b3d5c) contour of even weight around the whole silhouette."

## What to do
Copy scripts/art_process.py from cursor/art-rollout (or cherry-pick 698d05a and 542ab1f) and re-run it on your raws. No repainting is needed for the outline.
Verify: measure the median alpha/colour per 1-px depth ring; it should read a27..a251 #5b3d5c like armchair.webp.

## Also on cursor/art-rollout (7c701f2)
Opt-in `SEE_THROUGH=kind,kind` env for real holes (donut hole, ring): enclosed pixels within colour distance 8 of the card open as transparency. Default off, because a global rule punched cream frosting and glass.
Tip: a painted floor shadow that touches the object survives the key and gets outlined. Flood it out before processing: warm beige/tan pixels (r>=g>=b, r-g<45, 4<g-b<60, lum>105) connected to the border, limited to the lower part of the image (the kitchen worker's work/deshadow2.py with YMIN=0.5–0.72).
