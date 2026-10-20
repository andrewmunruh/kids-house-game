# Lint + fit fix: cursor/art-rollout @ abc2639 (2026-10-19)

Merge: `git fetch && git merge origin/cursor/art-rollout`. If it conflicts in scripts/art_process.py,
take theirs (the cursor/art-rollout version). Then re-run art_process.py on your raws (no repaint) and the lint.
Builds on 698d05a / 542ab1f / 7c701f2 (the plum contour, see OUTLINE-FIX.md).

## 1. Bounds out to alpha > 0, fit on that basis (cause of "small items 3-7% narrow in game")
- Before: the art's alpha>0 box was fitted to the SVG box, so the contour's faint outer fade sat
  *inside* it. The visible edge was ~3 px (3x) in on each side, which costs a 40-60 px item 5-7% width.
- art_process.py: the fit box is the SVG box grown by `FADE_OUT = 3` px on each side (clamped to the
  canvas). alpha>0 now reaches 3 px past the SVG edge, and the half-alpha (visible) line sits on it.
- tests/art_bounds.py: the raster box is measured at **alpha > 0** (was > 12), minus `FADE` px each side
  (env `ART_FADE`, default 3; set 0 for art made before the plum contour). The shipped living room still
  passes (all 14 OK, worst ball 2.2%).
- Kitchen result (visible box, alpha>128, vs SVG): polish width −7.1% → 0.0%, juice −5.2% → +2.2%,
  perfume −3.3% → +1.0%.
- Side effect: thin items get 6 px wider while their height barely changes, so stretch rises a little
  (polish went 1.14 → 1.19). Check the STRETCH flag after the refit.
- Curves: the 542ab1f smoothed signed distance already removed the stair-stepping; nothing more was needed.

## 2. Cream-edge check treated plum as see-through (packs: sale-sign failed)
The flood from the frame went through every plum pixel, so with the full opaque plum band any cream
part on the silhouette edge counted as "cream edge". Now an opaque plum pixel (alpha >= 200) is
structural, part of the frame. Only the faint outer fade is see-through.

## 3. key() never opened real holes (handle loops, leg gaps)
`obj = ~outside` already contains the enclosed cream, so `binary_fill_holes(obj) & ~obj` was always
empty. Now the candidates are the enclosed card-like pixels `filled & (dist < KEY)`. Each one opens only
if all of these hold:
- size >= `MIN_HOLE` (400 raw px) and >= `MIN_HOLE_FRAC` (0.4%) of the object
- median colour distance to the card < `CARD_EXACT` (8)
- at least `HOLE_RIM_DARK` (50%) of the 6 px ring around it is the painter's dark line (lum < 120)

That guards against punching cream frosting, glass and bottle labels. All 12 kitchen/salon items came
out with no new holes. `SEE_THROUGH=kind,...` still forces an open hole (e.g. donut) without the
rim test. I couldn't test the positive case, since no kitchen item has a loop, so check a mug handle
or chair-back gap when you run it.

## 4. Painted lavender "sticker" border
The outline prompt line ("Thick soft plum (#5b3d5c) contour...") can make the painter draw its own
thick lavender/plum border. The process then adds its plum band inside it, which comes out double-thick.
- Prompt: prefer "Thin even plum (#5b3d5c) contour", or leave the outline out. The process lays the real
  contour either way.
- Fix without a repaint: `DEBAND=kind,...` peels boundary rings while 60% or more of the ring is mid-dark
  purple (b > g+15, r > g+10, lum < 175), up to 40 px. It's opt-in because lavender objects would peel.
