# Art style v2

A sample of twelve pieces, drawn so Andy can approve the direction before the rest of the catalog is touched. The game still ships the current drawings. Open the game with `?art=v2` to preview the sample in a real room, or open `art-sample.html` for the before/after board. Nothing in this pass changes a save, an item id, a footprint, or the protocol (it stays 4). Old clients keep the art they already have, because the drawing lives in the client, not in the house.

Characters stay on avatar v2. Do not redraw them in this style.

## What changed in the sample

Same silhouette, same viewBox, same floor point. The new drawing adds:

- a top-left light, painted with a gradient
- a short white highlight on the lit edge
- a little texture (wood grain, a fabric stitch, a leaf vein)
- a soft contact shadow made of two flat ellipses

The darkest solid color on a piece is the color that piece already used, or another pastel already on that piece. Highlights are lighter than today. That keeps the shape readable when a night pass lays an indigo tint over the room.

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

Light comes from the top left.

```svg
<linearGradient id="example" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#ffd4e2"/>
  <stop offset="1" stop-color="#ff8fab"/>
</linearGradient>
```

The stop at offset 1 is the flat color the piece uses today. The stop at offset 0 is a lighter mix of that color, still in the same hue. A white stroke, about 2 units wide and around 0.5 opacity, sits on the upper-left edge. Do not add a dark underside. A second pastel already used on the piece (the lilac wardrobe's right door, the teddy's belly) is enough for the turn-away side.

Lamp glow is a radial gradient that fades to transparent, drawn behind the shade and inside the viewBox. It is not a blur.

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

## Texture

A few strokes, not a tiled photo and not a dense hatch (a hatch buzzes on a small iPad shelf icon).

- Wood: two or three short grain lines, plus one lighter streak on the lit edge.
- Cloth: two or three stitches, or a single seam curve. A sofa can have one small pillow inside the old silhouette.
- Leaves: one vein.
- Glass and ceramic: one white highlight. A fridge handle can take a thin white tick.
- Plush: a lighter belly and a stitch. Keep a face that the current piece already has. Do not add a face to a table or a lamp.

If the current piece has a face (the wardrobe, the teddy), keep the eyes, blush, and smile where they are.

## Night

A later branch tints the room indigo and lets lamps glow. This sample does not do that tint. It only stays light enough that the tint will not crush the drawing.

- No fill darker than the piece's current flat color, except plum outlines and the contact shadow.
- Texture strokes stay under opacity .3.
- The lamp already has a soft radial pool, so a glow pass has something to brighten.
- Check the after column of `art-sample.html?view=night`. That page lays a flat indigo veil (`rgba(58, 48, 130, .22)`) over the sample. It is a stand-in, not the night branch.

## Performance

Target is 60fps on an iPad 10th gen, and the page has to run on iPadOS 16 Safari.

- No `feGaussianBlur`, `feDropShadow`, or a `filter` on an item. A blur on every sofa will miss the frame.
- One to four gradients per item. A gradient id is prefixed with the piece (`a2sofa-body`) so two kinds do not clash. Copies of the same kind may share an id.
- Keep each drawing under about 2.5KB of markup. The sample pieces are under that.
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

Rough numbers from the sample bench (`art-sample.html?view=bench`) in headless Chrome on this build machine, not on an iPad. The bench builds a room layer, forces layout, then nudges it for about 70 frames. 48 items is a busy room. 80 is the room cap.

The measured times are filled in after the bench run on this branch. Treat a result near 16.7ms as "on the display refresh," and treat a large gap between Before and After as a reason to simplify the sample before drawing the rest.

## Not in this pass

The other furniture and decor stays as it is until the sample direction is approved. Winter Cheer, Critter Corner, the bathroom, and the backyard should follow this guide when their packs are drawn. Do not deploy this branch for the preview, and do not retint the characters.
