# Batch B0 status (scene-art loader + room-living pilot)
Branch cursor/art-batch-b0 from dda1839. Preview-only; no deploys from this job. Ports 6400-6499.

## Step 1 — scene-art loader (done)
- src/art/scene.ts: generic `showSceneArt(host, scene, mark)`; files are `assets/art/scene/<scene>.webp` (import.meta.glob, lazy URL import, fetched on first entry, `img.decode()` before shown). Vector stays underneath; shows while loading, on failure, with ?art=v1, and for scenes without a file.
- #sceneArt host div sits after wall/floor/baseboard, before #scenery/#layer: under items/avatars, over the vector shell, under the night tint (.world::after z3).
- Room shells: `roomSceneArt(room, r)` in scenery.ts → `room-<id>` only while the room keeps its starting wallpaper/floor/pattern and no tiles (her own pick always wins → vector).
- While shown, #stage gets `.sceneArtOn` + data-scene-art; the door button's vector `.doorArt` is hidden (painting carries the door), button/tap box unchanged.
