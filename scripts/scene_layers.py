#!/usr/bin/env python3
"""Render a non-room scene's VECTOR as paint layers at 2x (layout truth for scene_paint_svg.py).

usage: scene_layers.py URL SCENE OUT_DIR      SCENE: backyard | clubhouse
Writes OUT_DIR/<scene>__guide.png (full vector scene, ?art=v1, items/avatars hidden), one
transparent PNG per layer (<scene>__L_<name>.png, see LAYERS) and <scene>__geom.json
(scripts/scene_geom.js, logical px). Layers are picked by child index / class of the scene
SVG, so a part is painted exactly where the vector draws it.
"""
import asyncio, json, sys, os
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go

GEOM_JS = (Path(__file__).with_name('scene_geom.js')).read_text()
# JS predicates over (el, i) = a direct child of the scene SVG and its index.
LAYERS = {
  'backyard': {'svg': '#scenery svg.yardWorld', 'size': (2400, 600), 'layers': {
    'sky': 'i >= 1 && i <= 7', 'ground': 'i >= 8 && i <= 11', 'fence': 'i >= 12 && i <= 177',
    'tree': "el.id === 'yardTree'", 'house': 'i >= 179'}},
  'clubhouse': {'svg': '#grWorld svg.grScene', 'size': (2600, 600), 'layers': {
    # kept vector on top while painted (src/scenery.css): .bulb, .neonSign, .photoFrame
    'wall': 'i >= 1 && i <= 10', 'floor': 'i >= 11 && i <= 15',
    'props': "i >= 16 && !el.classList.contains('bulb') && !el.classList.contains('neonSign') && !el.classList.contains('photoFrame')",
    'kept': "el.classList.contains('bulb') || el.classList.contains('neonSign') || el.classList.contains('photoFrame')"}},
}

async def main():
    url, scene, out = sys.argv[1], sys.argv[2], sys.argv[3]
    spec = LAYERS[scene]; LW, LH = spec['size']
    os.makedirs(out, exist_ok=True)
    sep = '&' if '?' in url else '?'
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1180, 'height': 820}, device_scale_factor=2)
        await pg.add_init_script(SKIP_WN)
        await pg.goto(url + sep + 'art=v1', wait_until='networkidle')
        await pg.wait_for_selector('#stage')
        if scene == 'backyard':
            await pg.click('#layer .yardDoor'); await pg.wait_for_selector('#stage.room-yard'); await pg.wait_for_timeout(800)
        else:
            await go(pg, 'gameroom')
        geom = await pg.evaluate(GEOM_JS, scene)
        await pg.evaluate("""([sel, W, H]) => {
          const src = document.querySelector(sel);
          const host = document.createElement('div'); host.id = 'layerHost';
          Object.assign(host.style, {position:'fixed', left:'0', top:'0', width:W+'px', height:H+'px', zIndex:'999999', background:'transparent'});
          const svg = src.cloneNode(true); svg.setAttribute('width', W); svg.setAttribute('height', H);
          svg.style.cssText = 'position:absolute;left:0;top:0;width:'+W+'px;height:'+H+'px';
          host.appendChild(svg); src.remove();
          [...document.body.children].forEach(c => { c.style.display = 'none'; }); document.body.appendChild(host);
          const st = document.createElement('style');
          st.textContent = '#layerHost * { animation:none !important; transition:none !important } body.phone #layerHost .frameAtHead { display:inline !important }';
          document.head.appendChild(st);
        }""", [spec['svg'], LW, LH])
        await pg.set_viewport_size({'width': LW, 'height': LH})
        await pg.wait_for_timeout(300)
        clip = {'x': 0, 'y': 0, 'width': LW, 'height': LH}
        # Guide: full vector scene (backyard: with the door, from the lifted world).
        await pg.screenshot(path=f'{out}/{scene}__vector.png', clip=clip)
        for name, pred in spec['layers'].items():
            await pg.evaluate("""(pred) => { const f = new Function('el', 'i', 'return ' + pred);
              [...document.querySelector('#layerHost svg').children].forEach((el, i) => { if (el.tagName.toLowerCase() !== 'defs') el.style.visibility = f(el, i) ? 'visible' : 'hidden'; }); }""", pred)
            await pg.evaluate("() => { document.documentElement.style.background = 'transparent'; document.body.style.background = 'transparent'; }")
            await pg.screenshot(path=f'{out}/{scene}__L_{name}.png', clip=clip, omit_background=True)
        await b.close()
    json.dump(geom, open(f'{out}/{scene}__geom.json', 'w'), indent=1)
    print(json.dumps(geom))

asyncio.run(main())
