# Item art style lock (raster v2, from the shipped living-room pilot)

Reference paintings (approved, shipped at 8a12495): docs/art-refs/{sofa,armchair,plant,clock}.webp.
Generation references passed on every call: /workspace/art-pilot/concept.jpg + /workspace/art-pilot/style-sheet.png.
Rule: RECOGNIZABLE FIRST, CUTE SECOND. Real silhouette and proportions; keep the item's ID, footprint, anchors. Original art, no trademarks or brand look-alikes, kid-safe. No faces on objects (plush toys, pets and characters keep theirs).

## Look
- Palette: rose pink #f28fa6, lavender #b9a0dc, mint #a8d8c0, butter yellow #f7d27a, sky blue #a8d4ea, honey wood #c98d55, cream #fbf3e4. Outline #5a3d36.
- Light from the top left; soft shading lower right.
- Soft, even dark contour (#5a3d36) closing the outer silhouette.
- Painterly gouache, subtle paper texture, 3/4 front view slightly from above.
- No painted shadows. Floor items get the CSS `.artshade` contact shadow.

## Output
- WebP at 3x: round(3*w) x round(3*h) canvas (the item box aspect), under 60,000 bytes.
- The drawn box matches the SVG's visible art box (contact-shadow ellipse excluded) within 3% (width, height, bottom-center anchor).
- File: assets/art/<group>/<id with ':' as '~'>.webp.

## Cutout rules (scripts/art_process.py)
1. Background key: cream connected to the card border is removed (also removes any painted floor shadow). rembg is not used for alpha: it punched holes in glass, white enamel and pale cushions.
2. Everything enclosed by the drawing stays solid. Enclosed flat cream ≥150 px (a gap between stems, rungs, strings) stays open and is ringed in plum #5a3d5c so the lint sees it as between parts. Smaller flecks are filled. Thin parts are never gap-closed.
3. One alpha island: specks under 3% of the main body are dropped; separate big parts get a thin bridge.
4. Outer edge recoloured to #5a3d36 (no cream fringe); stray lavender-grey outline pixels are warmed so only opening rings are plum.
5. Fit by bounding box onto the SVG art box; flag raws whose aspect needs >18% stretch and regenerate.
6. Encode, decode, re-verify (islands, pinholes); repair and re-encode.

## Prompt template (GenerateImage, aspect 1:1 / 4:3 / 3:4 / 16:9 nearest the SVG art box)
"A single {OBJECT, DETAILS}. Overall silhouette about {ASPECT HINT}. Cozy storybook game item art, painterly digital illustration with soft gouache-like shading and subtle paper texture, gentle highlights, rounded friendly shapes but true-to-life proportions and silhouette. Consistent thin soft dark-brown outline (#5a3d36) of even weight. Light from the upper left, soft shading on the lower right. 3/4 front view, slightly from above. Palette: rose pink #f28fa6, lavender #b9a0dc, mint #a8d8c0, butter yellow #f7d27a, sky blue #a8d4ea, honey wood #c98d55, cream #fbf3e4. Single object centered, filling the frame, plain flat solid pale-cream (#f6efe2) background, no cast shadow, no scene, no floor, no other objects, no text, no logos, original design."
Wall items use "Front view" instead of "3/4 front view, slightly from above".

## Gates
`node scripts/dump-art-items.mjs` then `python tests/art_bounds.py /tmp/art-items.json . [kinds]`; contact sheets white+black via scripts/art_sheet.py; in-room SVG vs raster at 1180x820 and 390x844; art_catalog_test, art_raster_test (?art=v1, preload by save), tests/raster_sw_prod.py (SW cache).
