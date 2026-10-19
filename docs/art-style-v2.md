# Art style v2

A sample of twelve pieces, drawn so Andy can approve the direction before the rest of the catalog is touched. The game still ships the current drawings. Open the game with `?art=v2` to preview the sample in a real room, or open `art-sample.html` for the before/after board. Nothing in this pass changes a save, an item id, a footprint, or the protocol (it stays 4). Old clients keep the art they already have, because the drawing lives in the client, not in the house.

Characters stay on avatar v2. Do not redraw them in this style.

## What changed in the sample

Same viewBox, same floor point, new parts. A kid should be able to tell the two drawings apart at a glance.

- Real parts: cushions, piping, a quilt, a pleated shade, fringe, turned legs, knobs, a mobile.
- Two-tone cel shading. Every major surface has a lit face and a darker side plane on the right and along the lower edge. The plane is a hard-edged shape, not a thin gloss line.
- A little texture on top of that (grain, stitches, a leaf vein).
- A soft contact shadow made of two flat ellipses.

The side plane is one clear step darker than the lit face, and it stays a pastel. Example: lit cloth `#ff8fab`, side `#e45d88`. That is dark enough to read as a side, and still pink under an indigo night tint. Do not take the side plane down to brown, gray, or near-black.

## Palette

Outlines are always plum `#5a3d5c`.

| Use | Colors already in the house |
| --- | --- |
| Pink cloth | `#fff4f7` `#ffd4e2` `#ffb3c6` `#ff8fab` `#ff7096` |
| Wood | `#f3d2aa` `#f0d2b0` `#d4a373` `#c99366` `#f4a261` `#e07a3f` |
| Leaf | `#e7f8ee` `#c6f0d6` `#95d5b2` `#74c69d` `#52b788` |
| Sky / glass | `#f3fbff` `#eaf6ff` `#bde0fe` `#a2d2ff` |
| Warm light | `#fff8e4` `#fff1c2` `#ffd166` |
| Lilac | `#f7ecff` `#f6e9ff` `#c9a0dc` `#b388d6` `#a78bfa` |
| Paper / sheet | `#ffffff` `#fff7f8` `#fde2e4` |

New packs (Winter Cheer, Critter Corner, bathroom, backyard) can add a family of pastels, then use the same light and shadow rules. Keep at least one step of each color light enough to read on a dim floor.

## Light

Light comes from the top left. Paint the form as two flat tones:

| Face | Role |
| --- | --- |
| Lit | The pastel the piece is known by, on the upper left |
| Side | The same hue, one step darker, on the right and the lower edge |

```svg
<rect x="16" y="24" width="68" height="34" rx="12" fill="#ffb7cc" stroke="#5a3d5c" stroke-width="3.5"/>
<rect x="52" y="28" width="28" height="26" rx="8" fill="#e888a8"/>
```

The darker rect has no stroke of its own. It sits inside the outline, inset so it does not eat the plum edge. A whole right-hand part (the right arm, the right door, the right leaf) can simply be filled with the side color.

Use a gradient only for a sky, a glass pane, or a lamp glow. The glow is a radial gradient that fades to transparent, inside the viewBox. It is not a blur. A white tick on the lit edge is optional. It does not replace the side plane.

## Contact shadow

Floor pieces only. Rugs and wall pieces (the window) do not get one. Two ellipses, plum, no stroke, no filter:

```svg
<ellipse cx="50" cy="96.4" rx="36" ry="3.4" fill="#5a3d5c" opacity=".08"/>
<ellipse cx="50" cy="97.6" rx="22" ry="1.55" fill="#5a3d5c" opacity=".12"/>
```

Keep the shadow on the same spot as the old one (near y=97 in a 100-high viewBox) so the piece still stands on its floor point. Widen `rx` for a sofa or a crib, narrow it for a lamp. Do not paint the shadow black and do not blur it. Plum at this opacity stays visible on a night tint without turning into a hole.

## Outlines

| Edge | Weight |
| --- | --- |
| Outer silhouette | 3.5 |
| A door, a pillow, a seam that is part of the shape | 2.2 |
| Grain, stitch, vein | 1 to 1.2, opacity about .16 to .28 |

`stroke-linejoin` and `stroke-linecap` stay `round`. The outline color is always `#5a3d5c`.

## Parts and texture

Draw the thing the kid would name. A gloss line on the old shape is not a refresh.

- Sofa: two seat cushions, piping, tuft buttons, curled arms, a patterned throw pillow.
- Bed: a headboard with a heart cutout, a quilt pattern, a folded sheet.
- Fridge: a separate freezer door, rounded chrome-pastel handles, a couple of magnets.
- Rug: flat on the floor, a fringe, a pattern ring. Not a stack of ovals.
- Table: a top with thickness, grain, and turned legs.
- Shelf: books of different heights, a small plant or trophy, grain, a darker side board.
- Lamp: a pleated shade and a warm pool of light at the opening.
- Plant: a terracotta pot with a rim band, and leaves that are not three copies.
- Window: a frame, a sill, mullions, folded curtains with tiebacks, a sky.
- Crib: rounded rails and a mobile.
- Teddy: a stitched tummy patch and a bow.
- Wardrobe: inset panels and round knobs. Keep a face the current piece already has.

Texture is a few strokes, not a tiled photo and not a dense hatch (a hatch buzzes on a small shelf icon). Wood grain is two or three lines. Cloth stitches are a short dash. A leaf gets one vein. Do not add a face to a table or a lamp.

## Night

A later branch tints the room indigo and lets lamps glow. This sample does not do that tint. It only stays light enough that the tint will not crush the drawing.

- No fill darker than the piece's current flat color, except plum outlines and the contact shadow.
- Texture strokes stay under opacity .3.
- The lamp already has a soft radial pool, so a glow pass has something to brighten.
- Check the after column of `art-sample.html?view=night`. That page lays a flat indigo veil (`rgba(58, 48, 130, .22)`) over the sample. It is a stand-in, not the night branch.

## Performance

Target is 60fps on an iPad 10th gen, and the page has to run on iPadOS 16 Safari.

- No `feGaussianBlur`, `feDropShadow`, or a `filter` on an item. A blur on every sofa will miss the frame.
- Gradients only for sky, glass, and a lamp glow. A gradient id is prefixed with the piece (`a2win-sky`) so two kinds do not clash.
- Keep each drawing under about 3KB of markup. The sample pieces are in that range (the sofa is the largest, about 2.8KB).
- Stay inside the viewBox. The game draws SVG with overflow visible, so a mark outside the box would spill onto a neighbor without moving the saved anchor.
- Do not use CSS or JS newer than Safari 16 in the game. The sample page follows the same limit.

## Footprints

Do not change `kind`, `w`, `h`, `vb`, or the bottom-center anchor. Placement is `(x - w/2, y - h)` in the 2400×600 room. The sample swaps the drawing string only, and only while the flag is on.

| Display name | Kind | Box |
| --- | --- | --- |
| Sofa | `sofa` | 260 square |
| Bed | `bed` | 300 square |
| Fridge | `fridge` | 150 square |
| Lamp | `lamp` | 90 square |
| Shelf | `bookshelf` | 170 square |
| Rug | `rug` | 320 square |
| Plant | `plant` | 110 square |
| Table | `table` | 200 square |
| Wardrobe | `pack:wardrobe` | 150.5 × 178.5, viewBox `7 -1 86 102` |
| Teddy | `teddy` | 100 square |
| Window | `window` | 180 square, on the wall |
| Crib | `crib` | 260 square |

The wardrobe file on disk is unchanged. The sample is an inline stand-in used only when the flag is on.

## Frame time

Rough numbers from `art-sample.html?view=bench` in headless Chrome on this build machine. This is not an iPad 10th gen. The bench builds a room layer, forces layout, then nudges that layer for about 70 frames. 48 items is a busy room. 80 is the room cap.

Measured again after the pieces gained real parts and a side plane. One run in headless Chrome. While the layer was nudged, every case sat on the display refresh: p50 16.7 ms, p95 16.7–16.8 ms, max 16.8 ms, for the current art and the sample, at 48 items and at 80. Building the layer was 3.8 ms (48) and 4.6 ms (80) for the current art, and 5.5 ms (48) and 8.4 ms (80) for the sample. Both are under one frame, including at the room cap. The thing that would miss 60 fps on an iPad is a blur filter on every piece, and the sample does not use one.

Markup per sample piece is 1090–2590 bytes (rug smallest, sofa largest).

## Pictures

- `docs/art-sample/contact-sheet.png` — before / after, with display names
- `docs/art-sample/living-820x1180.png` — living room, current art on top, sample below
- `docs/art-sample/bedroom-820x1180.png` — bedroom, same
- `docs/art-sample/contact-sheet-night.png` — the after column under a flat indigo veil

The room shots stage the sample pieces so they fit in one iPad-portrait frame. They use each piece's real width, height, and bottom-center anchor. They are not a change to the starter rooms in a save.

## Not in this pass

The other furniture and decor stays as it is until the sample direction is approved. Winter Cheer, Critter Corner, the bathroom, and the backyard should follow this guide when their packs are drawn. Do not deploy this branch for the preview, and do not retint the characters.
