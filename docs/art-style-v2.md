# Art style v2

This is the canonical drawing guide for the catalog. Bathroom, backyard, and any new pack follow these rules. Winter Cheer and Critter Corner are restyled after those branches ship. Characters and the avatar pets stay on avatar v2. Do not redraw them here.

`ART_V2` in `src/art/flag.ts` is the one-line switch. `true` draws this style. `false` draws the previous art. `?art=v1` forces the old catalog drawings for one visit and is not stored on the house. Nothing here changes a save, an item id, a footprint, or the protocol (it stays 4). Old clients keep the art they already have, because the drawing lives in the client, not in the house.

`?art=v1` does not revert props that are built when their module loads. Those stay in this style either way: the empty-room rug, lamp, plant, and curtains in `src/scenery.ts`, the map trees in `src/map.ts`, and the park and ranch props drawn in `src/park.ts` and `src/ranch.ts` (the swing, ball, tree icon, hen house, tractor, and apple tree). They are not catalog items, so the visit flag never swaps them.

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
- Bed: the original side view (headboard on the left, footboard on the right, pillow, duvet), plus a heart cutout, quilt diamonds, and a folded sheet edge.
- Fridge: a closed freezer over a closed door, both solid pastel blue, with a highlight, handles, and a few magnets. Not glass shelves.
- Rug: flat on the floor, a pattern ring, and a short tassel fringe on the left and right ends only. Each end has 5 to 7 tabs, about 5 long and 3 wide, in a slightly darker shade of the border, tucked against the edge, with a thin plum outline. No large lobes. A cloud rug is a puffy cloud with a side plane and a couple of stitches, not a dashed ring.
- Table: a top with thickness, grain, and turned legs.
- Shelf: books of different heights, a small plant or trophy, grain, a darker side board.
- Lamp: a pleated shade and a warm pool of light at the opening.
- Plant: a terracotta pot with a rim band, and leaves that are not three copies.
- Window: a frame, a sill, mullions, folded curtains with tiebacks, a sky.
- Crib: rounded rails, a heart on the top rail, and a short bunting between the rails. The hanging mobile is the separate Crib Mobile item, so the crib drawing does not include one.
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

Measured again after the whole catalog moved to this style. One run in headless Chrome, 310 drawings in the rotation. While the layer was nudged, the steady frames sat on the display refresh: p50 16.7 ms and p95 16.8 ms for the previous art and the new art, at 48 items and at 80. Building the layer was 3.6–3.7 ms for the previous art, and 4.0 ms (48) and 8.4 ms (80) for the new art. Both builds are under one frame at the room cap. The thing that would miss 60 fps on an iPad is a blur filter on every piece, and these drawings do not use one.

Markup per drawing is 670–7461 bytes. Most pieces sit near 1.6KB. Eight pack pieces that were already detailed stay above 4.5KB.

## Pictures

The approved sample board is still in `docs/art-sample/`. The whole-catalog boards are in `docs/art-catalog/`:

- `sheet-<room>.png` — before / after for that room's pieces (living, bedroom, kitchen, salon, nursery, backyard, any, ranch)
- `sheet-living-night.png` — the living sheet under the indigo veil
- `<room>-820x1180.png` and `<room>-390x844.png` — the same staged room at the iPad portrait size and the phone portrait size

The room shots use each piece's real width, height, and bottom-center anchor. They are not a change to the starter rooms in a save.

## Out of this pass

Winter Cheer and Critter Corner live on other branches. Restyle them after they ship, using this file. Do not deploy this branch, and do not retint the characters or the avatar pets.
