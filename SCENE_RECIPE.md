# Scene painting recipe (pilot: room-living)

Paint FROM a render of the vector scene, at the vector's exact geometry, so no hotspot, door,
floor line or footprint can drift. Recognizable first, cute second. No faces. Never repaint shipped item art.

## The 13 scenes
| # | scene file (assets/art/scene/) | where the vector is drawn | logical size |
|---|---|---|---|
| 1 | room-living.webp (DONE, pilot) | src/main.ts renderRoomBg (#wall/#floor/.baseboard, pattern) + src/scenery.ts; door = main.ts LIVE_DOOR + panelDoor() | 2400x600 |
| 2 | room-bedroom.webp | same room shell, bedroom defaults (src/shared/state.ts initialState) | 2400x600 |
| 3 | room-kitchen.webp | same | 2400x600 |
| 4 | room-salon.webp | same | 2400x600 |
| 5 | room-nursery.webp | same + src/nursery.ts | 2400x600 |
| 6 | room-bathroom.webp | same + src/bathroom.ts | 2400x600 |
| 7 | backyard.webp | src/yard.ts yardBackyardScenery() (+ YARD_DOOR) | 2400x600 |
| 8 | map.webp | src/map.ts mapBgSVG() (landscape) | MAP_W x MAP_H |
| 9 | map-portrait.webp | src/map.ts mapPortraitBgSVG(w,h) + portraitMeadowSVG | plan.w x plan.h |
| 10 | park.webp | src/park.ts parkSceneSVG() | its viewBox |
| 11 | ranch.webp | src/ranch.ts ranchSceneSVG() (+ paddockFenceSVG) | its viewBox |
| 12 | barn.webp | src/ranch.ts barnSceneSVG() | its viewBox |
| 13 | clubhouse.webp | src/gameroom.ts gameRoomSVG() (+ gameRoomExtSVG top/bottom) | W x GR_H |
Room shells (1-6) are wired: `roomSceneArt()` in src/scenery.ts returns `room-<id>` only while the
room keeps its DEFAULT wallpaper/floor/pattern and no tile (her own pick always wins).
Scenes 7-13 still need a one-line hook each (call `showSceneArt(host, name, mark)` from src/art/scene.ts
where the SVG is injected, and hide the vector layer behind it via `.sceneArtOn`), and a geometry
adapter in tests/scene_hotspot_test.py (the test FAILS for a painted scene without one, on purpose).

## 1. Guide render (layout truth)
    python scripts/scene_guide.py http://127.0.0.1:64xx/kids-house-game/ room-<id> OUT/
Always renders with ?art=v1 at 2x: OUT/<scene>__guide.png (4800x1200 for rooms; items, avatars,
eggs, night tint and animation hidden; shell + door kept) and OUT/<scene>__geom.json (logical rects:
wall, floor, baseboard, door art, door tap box, scene window, eggs). Scene geometry JS lives in
scripts/scene_geom.js (shared with the test). For scenes 7-13 extend scene_geom.js with that scene's
doors/spots (e.g. .barnDoor, map [data-go] spots, park/ranch hotspots).

## 2. Generate textures / props (GenerateImage), never the whole scene
Free img2img of the full guide drifted (attempt C tile: floor gained perspective, door moved), so
generate PARTS and composite them on the guide geometry:
- Wall, flat straight-on, tileable:
  "Seamless flat wallpaper texture, straight-on, no perspective, no objects, no shadows of objects.
   Soft <vector wallpaper colour> with <pattern: small white polka dots | hand-dabbed sparse dots | ...>,
   gentle gouache/colour-pencil storybook texture, light from upper left, kids' game, cozy."
- Floor, flat straight-on (NO perspective):
  "Seamless top-down flat texture of <honey wood vertical planks ~8 per image | tiles ...>, straight-on,
   no perspective, soft storybook paint, warm, no objects."
- Door / big props, isolated:
  "A single <lilac panel door with four-pane window and peach frame>, flat front view, thick plum
   #5b3d5c outline, soft storybook paint, on a plain flat cream background, no shadow, no face."
Colours: scene = vector colour ONE STEP DARKER in the same hue (items use plum #5b3d5c outline;
scene lines also plum so items stay on top visually).

## 3. Composite + post-processing (scripts/scene_paint.py RECIPE.json)
Example: scripts/scene_recipes/room-living.json + its inputs in scripts/scene_recipes/room-living/ (reproduces the shipped file byte-for-byte).
- crop -> recolour to target mean in Lab (keep 85-90% of texture variance) -> flatten low-frequency
  light (divide by heavy blur) -> horizontal edge crossfade -> tile at the vector's scale
  (wall_tile_h, floor_tile_w logical px).
- floor: soft shade under the baseboard; baseboard is drawn procedurally at the exact rect
  (cream + 4-logical-px plum lines top and bottom).
- door/props: background keyed out, fitted EXACTLY into geom.door (2x).
- smooth soft top light (no per-view resets -> no seams), fine grain.
- Make 2-3 genuinely different attempts (A dense dots / B sparse hand-dabbed / C big grid dots for
  the pilot); swap each into a built dist and pick by shots (step 6). Picked A for living: the
  closest to the vector's dotted wallpaper.

## 4. Size budget
Opaque WebP at 2x logical (4800x1200 for 2400x600 rooms), <= 150 KB (scene_paint.py searches
quality 86 -> 22 in steps of 4; pilot: q82, 145.7 KB). If a scene cannot fit at q>=60, lower texture
noise (grain, keep) before dropping quality; last resort 1.5x with a note. Decode is async
(img.decode()) and the file is lazy (import.meta.glob ?url), loaded only when that scene opens.
Memory: a 4800x1200 bitmap is ~23 MB decoded. Keep one scene decoded at a time.

## 5. Hotspot / drift check
    python tests/scene_hotspot_test.py http://127.0.0.1:64xx/kids-house-game/?hood=http://127.0.0.1:64yy
Finds the baseboard ink line and the door's left/right/top edges IN THE PAINTING and compares with the
live vector (tolerance 4 px at 2x); door + egg hotspots must be identical painted vs ?art=v1 and
tappable; painting pointer-events:none; then taps the door and every map place with the painting on.
Chromium + WebKit. A deliberate 12/10 px shift fails all 4 edge checks.

## 6. Shots (labelled by build)
    SIZES=820x1180,844x390,390x844 python tests/scene_shots.py URL cur-dda1839 OUT [scene]
    python tests/scene_shots.py URL pr-<sha> OUT [scene]      # also writes __artv1 fallback shots
Names: `<label>__<scene>__<WxH>__<browser>[__artv1].png`, label `cur-<base sha>` for the base build and
`pr-<sha>` for the PR build. Run under `flock /workspace/surprise/gate.lock`, ports 6400-6499.
Look for: same door/floor line as cur, placed items keep contrast (sofa, armchair, rug, lamp,
shelf), no visible tile seams, night tint still over the painting.
