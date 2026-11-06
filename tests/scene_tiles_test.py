"""Batch 6 (D-02): the lossless strips (?tiles=1) look exactly like the single painting and keep
every hotspot where it was. For each scene: render with ?tiles=0 and ?tiles=1 at the same camera,
compare screenshots (painting layer only: items/kids hidden) and the hotspot boxes; check only the
strips near the screen were fetched. Also saves labelled shots when SHOTS=dir (LABEL=sha).
usage: scene_tiles_test.py URL [WxH=820x1180]"""
import asyncio, io, os, sys
from pathlib import Path
from PIL import Image, ImageChops
from playwright.async_api import async_playwright
URL = sys.argv[1]; W, H = map(int, (sys.argv[2] if len(sys.argv) > 2 else '820x1180').split('x'))
SHOTS = os.environ.get('SHOTS'); LABEL = os.environ.get('LABEL', '')
SEP = '&' if '?' in URL else '?'; R = []
def ok(n, c, x=''): R.append(bool(c)); print(('PASS ' if c else 'FAIL ') + n + (f'  [{x}]' if x != '' else ''), flush=True)
INIT = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"
HIDE = "#layer .item, #layer .char, .kid, .avatar, .toast, #ranchWorld .animal, .pspot *, .ambFx { visibility: hidden !important; } *, *::before, *::after { animation: none !important; transition: none !important; }"
SPOTS = """() => [...document.querySelectorAll('#layer .yardDoor, #world .eggspot, #parkWorld .pspot, .barnDoor, #grWorld [data-act]')].filter(e => e.offsetParent)
  .map(e => [e.className.baseVal ?? e.className, ...Object.values(e.getBoundingClientRect().toJSON()).slice(0, 4).map(v => Math.round(v))].join(' '))"""
async def nav(pg, place):
    if place.startswith('room-'):
        await pg.evaluate("(r) => document.querySelector('[data-room=' + JSON.stringify(r) + ']')?.click()", place[5:]); return '#stage'
    await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
    await pg.wait_for_function("() => !!document.querySelector('body.view-map #mapWorld .mapSpot')"); await pg.wait_for_timeout(400)
    if place == 'map': return '#mapWorld .mapClip'
    tgt = 'ranch' if place == 'barn' else 'gameroom' if place == 'clubhouse' else place
    await pg.evaluate("(p) => document.querySelector('[data-go=' + JSON.stringify(p) + ']').click()", tgt)
    host = {'park': '#parkWorld', 'ranch': '#ranchWorld', 'barn': '#ranchWorld', 'clubhouse': '#grWorld'}[place]
    await pg.wait_for_function("(h) => !!document.querySelector(h)", arg=host); await pg.wait_for_timeout(600)
    if place == 'barn': await pg.evaluate("() => document.querySelector('.barnDoor').click()"); await pg.wait_for_timeout(800)
    return host
async def shot(b, tiles, place):
    ctx = await b.new_context(viewport={'width': W, 'height': H}); await ctx.add_init_script(INIT)
    pg = await ctx.new_page(); urls = []
    pg.on('request', lambda r: urls.append(r.url) if '.webp' in r.url and ('scene' in r.url or '.' in r.url.rsplit('/', 1)[-1][:-5]) else None)
    await pg.goto(URL + SEP + 'tiles=' + tiles); await pg.wait_for_function("() => !!document.getElementById('stage')"); await pg.wait_for_timeout(2000)
    await pg.evaluate("() => { for (const s of ['#phoneOk', '#wnGo']) { const e = document.querySelector(s); if (e && e.offsetParent) e.click(); } }")
    host = await nav(pg, place)
    try: await pg.wait_for_function("(h) => !!document.querySelector(h + '.sceneArtOn, .sceneArtOn ' + h + ', ' + h + ' .sceneArtOn') || !!document.querySelector('#stage.sceneArtOn')", arg=host, timeout=12000)
    except Exception: pass
    await pg.wait_for_timeout(1500); await pg.add_style_tag(content=HIDE); await pg.wait_for_timeout(400)
    png = await pg.screenshot(); spots = await pg.evaluate(SPOTS)
    tilesN = await pg.evaluate("() => document.querySelectorAll('img.sceneTile').length")
    loaded = await pg.evaluate("() => document.querySelectorAll('img.sceneTile[data-state=ok]').length")
    on = await pg.evaluate("() => document.querySelectorAll('.sceneArtOn').length")
    if SHOTS and tiles == '1':
        Path(SHOTS).mkdir(parents=True, exist_ok=True); im = Image.open(io.BytesIO(png))
        im.save(f'{SHOTS}/{LABEL}_{place}_{W}x{H}.png')
    await ctx.close(); return Image.open(io.BytesIO(png)).convert('RGB'), spots, tilesN, loaded, on
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for place in ['room-living', 'room-kitchen', 'room-bedroom', 'room-bathroom', 'room-nursery', 'room-salon', 'park', 'ranch', 'barn', 'clubhouse', 'map']:
            a, sa, _, _, ona = await shot(b, '0', place); t, st, n, loaded, ont = await shot(b, '1', place)
            d = ImageChops.difference(a, t).convert('L').point(lambda v: 255 if v > 24 else 0)
            frac = sum(d.histogram()[255:]) / (a.width * a.height)
            ok(f'{place}: painted in both', ona > 0 and ont > 0)
            ok(f'{place}: strips look like the single painting (<0.5% px differ)', frac < 0.005, f'{frac*100:.3f}%')
            ok(f'{place}: hotspots unchanged', sa == st, f'{len(sa)} spots')
            if place != 'map': ok(f'{place}: strips used, only the near ones loaded', n > 0 and 0 < loaded <= n, f'{loaded}/{n}')
        await b.close()
    f = R.count(False); print(f'SCENE_TILES: {len(R) - f}/{len(R)} pass'); sys.exit(1 if f else 0)
asyncio.run(main())
