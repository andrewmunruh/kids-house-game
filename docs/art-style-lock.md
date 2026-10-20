# Item art style lock (raster v2, from the shipped living-room pilot)

Reference paintings (approved, shipped at 8a12495): docs/art-refs/{sofa,armchair,plant,clock}.webp.
Generation references passed on every call: /workspace/art-pilot/concept.jpg + /workspace/art-pilot/style-sheet.png.
Rule: RECOGNIZABLE FIRST, CUTE SECOND. Real silhouette and proportions; keep the item's ID, footprint, anchors. Original art, no trademarks or brand look-alikes, kid-safe. No faces on objects (plush toys, pets and characters keep theirs).

## Look
- Palette: rose pink #f28fa6, lavender #b9a0dc, mint #a8d8c0, butter yellow #f7d27a, sky blue #a8d4ea, honey wood #c98d55, cream #fbf3e4. Contour plum #5b3d5c.
- Light from the top left; soft shading lower right.
- Thick, soft plum contour (#5b3d5c) closing the silhouette, as on the shipped living room (8a12495): about 3 CSS px (9 px on the 3x canvas) deep, with a soft outer alpha fade. It is applied by scripts/art_process.py, not trusted to the painter.
- Painterly gouache, subtle paper texture, 3/4 front view slightly from above.
- No painted shadows. Floor items get the CSS `.artshade` contact shadow.

## Output
- WebP at 3x: round(3*w) x round(3*h) canvas (the item box aspect), under 60,000 bytes.
- The drawn box matches the SVG's visible art box (contact-shadow ellipse excluded) within 3% (width, height, bottom-center anchor). The raster box is measured out to alpha > 0, minus the contour fade (FADE_OUT = 3 px at 3x) on each side, so the half-alpha visible edge is what lands on the SVG box (tests/art_bounds.py, env ART_FADE=0 for pre-contour art).
- File: assets/art/<group>/<id with ':' as '~'>.webp.

## Cutout rules (scripts/art_process.py)
1. Background key: cream connected to the card border is removed (also removes any painted floor shadow). rembg is not used for alpha: it punched holes in glass, white enamel and pale cushions.
2. Everything enclosed by the drawing stays solid unless it is a real hole. An enclosed card-like region (colour distance < KEY) opens only if it is ≥ MIN_HOLE (400 raw px) and ≥ MIN_HOLE_FRAC (0.4%) of the object, its median distance to the card is < CARD_EXACT (8), and ≥ HOLE_RIM_DARK (50%) of the 6 px ring around it is the painter's dark line (handle loops, gaps between legs or stems). Cream frosting, glass and bottle labels fail those tests and stay solid. `SEE_THROUGH=kind,...` forces a card-exact hole open without the rim test (e.g. a donut). Openings are ringed in plum. Smaller flecks are filled. Thin parts are never gap-closed.
3. One alpha island: specks under 3% of the main body are dropped; separate big parts get a thin bridge.
4. Contour (plum_contour, at final canvas size, on a smoothed silhouette: gaussian sigma 2 mask, then a signed distance blurred with sigma 1 so curves have no staircase): every pixel within 9 px of a transparent pixel (outer edge and ringed openings) becomes plum #5b3d5c; alpha at depth 1..6 px is capped at 27, 70, 132, 194, 234, 251; the next 2 px blend plum into the paint. Measured from the 14 shipped living-room WebPs, which all show this profile. No cream fringe.
5. Fit by bounding box onto the SVG art box grown by FADE_OUT (3 px) on each side, so the contour's outer fade straddles the SVG edge and its half-alpha line sits on it. Flag raws whose aspect needs >18% stretch (measured against that grown box) and regenerate; the 18% rule is firm. Thin items get relatively wider from the fade, so ask the painter for a wider hint.
5b. Painted "sticker" border: if the painter drew its own thick lavender/plum border, run with `DEBAND=kind,...` to peel boundary rings that are ≥60% mid-dark purple (b > g+15, r > g+10, lum < 175), up to 40 px. It is opt-in because lavender objects would peel too.
5c. Painted floor shadow touching the object survives the key; flood it out first (warm beige/tan pixels connected to the border, lower part of the image only).
6. Encode, decode, re-verify (islands, pinholes); repair and re-encode.

## Prompt template (GenerateImage, aspect 1:1 / 4:3 / 3:4 / 16:9 nearest the SVG art box)
"A single {OBJECT, DETAILS}. Overall silhouette about {ASPECT HINT}. Cozy storybook game item art, painterly digital illustration with soft gouache-like shading and subtle paper texture, gentle highlights, rounded friendly shapes but true-to-life proportions and silhouette. Thin even plum (#5b3d5c) contour. Light from the upper left, soft shading on the lower right. 3/4 front view, slightly from above. Palette: rose pink #f28fa6, lavender #b9a0dc, mint #a8d8c0, butter yellow #f7d27a, sky blue #a8d4ea, honey wood #c98d55, cream #fbf3e4. Single object centered, filling the frame, plain flat solid pale-cream (#f6efe2) background, no cast shadow, no scene, no floor, no other objects, no text, no logos, original design."
Wall items use "Front view" instead of "3/4 front view, slightly from above".
The outline in the prompt is only a hint: the process lays the real 9 px plum contour. "Thick soft plum contour" makes the painter draw its own lavender sticker border (then use DEBAND), so prompt "Thin even plum (#5b3d5c) contour" or omit it. The painter draws objects ~25% taller than asked; for tall thin items, ask for a wider aspect (e.g. "1 wide by 1 tall" for a target near 0.6) on a 16:9 card.

## Lint notes
- Cream-edge check: an opaque plum pixel (alpha ≥ 200) is the contour band and counts as frame; only the faint outer fade is see-through for the outside flood. Cream parts on the silhouette edge inside the band do not fail.

## Gates
`node scripts/dump-art-items.mjs` then `python tests/art_bounds.py /tmp/art-items.json . [kinds]`; contact sheets white+black via scripts/art_sheet.py; in-room SVG vs raster at 1180x820 and 390x844; art_catalog_test, art_raster_test (?art=v1, preload by save), tests/raster_sw_prod.py (SW cache).
