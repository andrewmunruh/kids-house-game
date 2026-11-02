# Art Studio bounds: every colour swatch dot is at least 44x44 CSS px (the dot itself, not just its pad), the Hang
# button stays on screen, and once the new painting is hung and selected the piece toolbar covers no doll's head.
# Four viewports; solo, local only (every workers.dev request is aborted and must not happen).
# usage: python tests/art_studio_bounds_test.py http://localhost:PORT/kids-house-game/ [shots_dir]
import asyncio, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'art_studio_test.py')).read().replace('asyncio.run(main())', '')
_argv = sys.argv; sys.argv = sys.argv[:1]; os.environ.setdefault('ART_SHOTS', '/tmp/art_bounds_shots/'); exec(src); sys.argv = _argv
URL = sys.argv[1]; SHOTS = sys.argv[2] if len(sys.argv) > 2 else os.environ.get('ART_BOUNDS_SHOTS', '')
SIZES = [tuple(map(int, s.split('x'))) for s in os.environ.get('ART_SIZES', '820x1180,1180x820,390x844,844x390').split(',')]
fails = 0
def ck(name, ok, extra=''):
    global fails
    if not ok: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
SW = """() => { const r = [...document.querySelectorAll('.stuColor')].map(e => e.getBoundingClientRect()).filter(r => r.width);
  const h = document.querySelector('.stuHang').getBoundingClientRect();
  return { n: r.length, min: Math.floor(Math.min(...r.map(r => Math.min(r.width, r.height))) + 0.01), hang: h.bottom <= innerHeight + 1 && h.top >= 0 && h.height >= 40 }; }"""
HEAD = """() => { const t = document.getElementById('toolbar'); if (!t || t.classList.contains('hidden')) return { shown: false };
  const b = t.getBoundingClientRect(); let cov = 0;
  for (const e of document.querySelectorAll('#layer .char')) { const r = e.getBoundingClientRect(), hb = r.top + r.height * 0.42;
    cov += Math.max(0, Math.min(b.right, r.right) - Math.max(b.left, r.left)) * Math.max(0, Math.min(b.bottom, hb) - Math.max(b.top, r.top)); }
  return { shown: true, cov: Math.round(cov), bar: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)] }; }"""
async def main():
    hits = []
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for (w, h) in SIZES:
            t = f'{w}x{h}'
            ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=2, service_workers='block')
            await ctx.route(re.compile(r'workers\.dev'), lambda r: (hits.append(r.request.url), asyncio.ensure_future(r.abort())))
            await ctx.add_init_script(SKIP_WN); pg = await ctx.new_page()
            await pg.goto(URL); await pg.wait_for_selector('#stage .char'); await pg.wait_for_timeout(900)
            if await pg.locator('#phoneOk').is_visible(): await pg.click('#phoneOk'); await pg.wait_for_timeout(300)
            if await pg.locator('#artFab').is_visible(): await pg.locator('#artFab').click()
            else: await tap(pg, '#btnStudio', timeout=8000)
            await pg.wait_for_selector('.studio canvas'); await pg.wait_for_timeout(400)
            sw = await pg.evaluate(SW)
            if SHOTS: os.makedirs(SHOTS, exist_ok=True); await pg.screenshot(path=os.path.join(SHOTS, f'studio-{t}.png'))
            await pg.locator('.stuX').click(); await pg.wait_for_timeout(500)
            await paint(pg, 2, fab=await pg.locator('#artFab').is_visible()); await pg.wait_for_timeout(300)
            ck(f'{t} studio: 16 swatch dots >=44px', sw['n'] >= 16 and sw['min'] >= 44, sw)
            ck(f'{t} studio: Hang it up on screen', sw['hang'], sw)
            before = {q['id'] for q in await pg.evaluate(PAINTINGS)}
            await pg.locator('.stuHang').click(); await pg.wait_for_timeout(1500)
            pid = [q for q in await pg.evaluate(PAINTINGS) if q['id'] not in before][0]['id']
            await into_view(pg, pid)
            if await pg.evaluate("document.body.classList.contains('mode-play')"): await pg.click('#modeDecorate'); await pg.wait_for_timeout(300)
            bb = await pg.locator(f'.item[data-id="{pid}"]').bounding_box(); await pg.mouse.click(bb['x'] + bb['width'] * .35, bb['y'] + bb['height'] * .35); await pg.wait_for_timeout(3400)
            hd = await pg.evaluate(HEAD); g = await pg.evaluate(GRIPCHK, pid)
            ck(f'{t} painting selected: toolbar shown', hd['shown'], hd)
            ck(f'{t} painting selected: toolbar covers no doll head', hd.get('cov', 1) == 0, hd)
            ck(f'{t} painting selected: toolbar clear of the resize handle', g['toolbarOnGrip'] == 0, g)
            if SHOTS: await pg.screenshot(path=os.path.join(SHOTS, f'art-selected-{t}.png'))
            await ctx.close()
        await b.close()
    ck('no workers.dev request', not hits, str(hits[:3]))
    print('RESULT', 'FAIL' if fails else 'PASS', 'fails=', fails); sys.exit(1 if fails else 0)
asyncio.run(main())
