# Batch B0 status (scene-art loader + room-living pilot)
Branch cursor/art-batch-b0 from dda1839. Preview-only; no deploys from this job. Ports 6400-6499.

## Step 1 — scene-art loader (done)
- src/art/scene.ts: generic `showSceneArt(host, scene, mark)`; files are `assets/art/scene/<scene>.webp` (import.meta.glob, lazy URL import, fetched on first entry, `img.decode()` before shown). Vector stays underneath; shows while loading, on failure, with ?art=v1, and for scenes without a file.
- #sceneArt host div sits after wall/floor/baseboard, before #scenery/#layer: under items/avatars, over the vector shell, under the night tint (.world::after z3).
- Room shells: `roomSceneArt(room, r)` in scenery.ts → `room-<id>` only while the room keeps its starting wallpaper/floor/pattern and no tiles (her own pick always wins → vector).
- While shown, #stage gets `.sceneArtOn` + data-scene-art; the door button's vector `.doorArt` is hidden (painting carries the door), button/tap box unchanged.

## Step 2 — drift + tap tests (tests/scene_hotspot_test.py)
- For every assets/art/scene/*.webp: live vector geometry (?art=v1) vs edges found IN the painting (baseboard ink line, door left/right/top), tolerance 4 px at 2x; door + egg hotspot boxes identical painted vs vector and tappable; painting is pointer-events:none; ?art=v1 shows vector.
- Taps with the painting present: living door → backyard → back; map: park, ranch, barn door, clubhouse, home. Chromium + WebKit, 820x1180 and 844x390.
- Negative check: painting shifted 12/10 px → all 4 edge checks FAIL (test catches drift).
- Result on PR build: 59 passed, 0 failed. Note: desktop WebKit 820x1180 the indoor stage overlaps the Map button — identical on base dda1839 (also with ?art=v1); test opens the map by button.click() there and prints a NOTE.
- Shared geometry JS: scripts/scene_geom.js (used by scene_guide.py and the test). Needs numpy? No — PIL only.

## Step 3 — room-living pilot
- scripts/scene_paint.py composites AI textures onto the exact vector geometry (wall/baseboard/floor/door rect from geom.json), recolours to the vector palette one step darker, seamless tiling, smooth soft top light, grain; WebP size search.
- Attempts (all 4800x1200 opaque WebP): A dense painted dots 145.7 KB q82; B sparse hand-dabbed dots 119.5 KB q78; C big grid dots (img2img tile) 122.6 KB q82.
- Picked A: closest to the default dotted wallpaper (recognizable first), items keep contrast (checked 844x390 + 820x1180 WebKit, all 3 sizes both browsers for B/A).
- src/art/load.ts glob now excludes assets/art/scene/.
