#!/usr/bin/env python3
"""Render the CURRENT VECTOR scene as the layout guide for a scene painting, plus its geometry.

usage: scene_guide.py URL SCENE OUT_DIR [--room living]
  URL   a built game, e.g. http://127.0.0.1:6400/kids-house-game/
  SCENE room-<id> (room shells; others: see SCENE_RECIPE.md)
Writes OUT_DIR/<scene>__guide.png (2x the scene's logical size, items/avatars hidden, vector
shell + door shown) and OUT_DIR/<scene>__geom.json (logical px rects: door, floor line, wall
bottom, baseboard, scene window) used by tests/scene_hotspot_test.py.
Always renders with ?art=v1 so the guide is the vector even after a painting exists.
"""
import asyncio, json, sys, os
from playwright.async_api import async_playwright

from pathlib import Path
GEOM_JS = (Path(__file__).with_name('scene_geom.js')).read_text()

async def outdoor_guide(pg, scene, out):
    """Ranch yard / barn: the scene SVG alone (no props, animals, fence layer, avatars), 2x, no sun face."""
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from testnav import go
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.is_visible(): await loc.click(force=True)
    await go(pg, scene)
    geom = await pg.evaluate(GEOM_JS, scene)
    LW, LH = geom['logical']
    await pg.evaluate("""([LW, LH]) => {
      const svg = document.querySelector('#ranchWorld > svg.ranchScene').cloneNode(true);
      svg.querySelectorAll('.ranchSignArt').forEach(a => a.style.transform = '');
      // No faces on scenery: keep the sun disc, drop its eyes/mouth/blush.
      svg.querySelectorAll('g[transform]').forEach(g => { const c = g.firstElementChild; if (c && c.tagName === 'circle' && c.getAttribute('r') === '48' && c.getAttribute('fill') === '#ffe066') [...g.children].slice(1).forEach(n => n.remove()); });
      const st = document.createElement('style'); st.textContent = '* { animation:none !important; transition:none !important }'; document.head.appendChild(st);
      Object.assign(svg.style, { position: 'fixed', left: '0', top: '0', width: LW + 'px', height: LH + 'px', zIndex: '999999', background: '#fff' });
      document.body.appendChild(svg);
    }""", [LW, LH])
    await pg.set_viewport_size({'width': LW, 'height': LH})
    await pg.wait_for_timeout(400)
    await pg.screenshot(path=f'{out}/{scene}__guide.png', clip={'x': 0, 'y': 0, 'width': LW, 'height': LH})
    json.dump(geom, open(f'{out}/{scene}__geom.json', 'w'), indent=1)
    print(json.dumps(geom)[:400])

async def main():
    url, scene, out = sys.argv[1], sys.argv[2], sys.argv[3]
    room = scene.split('-', 1)[1] if '-' in scene else scene
    os.makedirs(out, exist_ok=True)
    sep = '&' if '?' in url else '?'
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1180, 'height': 820}, device_scale_factor=2)
        await pg.add_init_script("localStorage.getItem('cozy-whatsnew')||localStorage.setItem('cozy-whatsnew','999')")
        await pg.goto(url + sep + 'art=v1', wait_until='networkidle')
        await pg.wait_for_selector('#world')
        if scene in ('ranch', 'barn'):
            await outdoor_guide(pg, scene, out); await b.close(); return
        if room != 'living':
            await pg.evaluate("(r) => { const b = document.querySelector(`.rooms [data-room=\"${r}\"], [data-room=\"${r}\"]`); b && b.click(); }", room)
            await pg.wait_for_timeout(800)
        geom = await pg.evaluate(GEOM_JS, scene)
        # Lift the world out of the stage at 1:1, hide items/avatars/UI, keep the shell + door.
        await pg.evaluate("""() => {
          const w = document.getElementById('world');
          document.body.appendChild(w);
          Object.assign(w.style, {position:'fixed', left:'0', top:'0', transform:'none', zIndex:'99999', width:'2400px', height:'600px'});
          const st = document.createElement('style');
          st.textContent = `#world .layer > :not(.yardDoor), #world .scenery .sceneRug, #world .scenery .sceneLamp, #world .scenery .scenePlant, #world .toolbar, #world .artGrip, #world .partyFx, .yardHintLabel, #world .eggs { display:none !important }
            #world::after { display:none !important } #world * { animation:none !important; transition:none !important }`;
          document.head.appendChild(st);
        }""")
        await pg.set_viewport_size({'width': 2400, 'height': 600})
        await pg.wait_for_timeout(300)
        await pg.screenshot(path=f'{out}/{scene}__guide.png', clip={'x': 0, 'y': 0, 'width': 2400, 'height': 600})
        await b.close()
    json.dump(geom, open(f'{out}/{scene}__geom.json', 'w'), indent=1)
    print(json.dumps(geom))

asyncio.run(main())
