# Batch B — group yard status
## backyard
- Attempts (scripts/scene_recipes/backyard_{A,B,C}.json, compositor scripts/scene_paint_svg.py from ?art=v1 vector layers):
  A AI textures + stylized vector tree (148 KB q82); B paper+median, darker (133 KB q86); C = A + AI gouache tree prop (149 KB q78).
- Shot in Chromium+WebKit at 820x1180/844x390/390x844: picked C (most recognizable tree, gouache texture, door/fence/house aligned).
- Hook: src/scenery.ts roomSceneArt('backyard'); CSS hides .yardWorld vector under the painting; ?art=v1 keeps vector.
- Loader fix src/art/scene.ts: put() re-queries the <img> (stale closure made a 2nd img -> living painting stayed over the backyard).
- scene_hotspot_test: backyard adapter (lawn horizon via G-B chroma, door L/R/top, door hotspot); 72/73 then horizon fixed offline; SCENE_SHIFT=12 negative fails all edge checks.
