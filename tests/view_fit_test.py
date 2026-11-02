# View fit: on portrait iPad (820x1180) the living-room camera must show the whole sofa (no piece cut by
# the view edge on entering Play), and the clubhouse must open with its left corner plant fully on screen.
# Other viewports are checked for no regressions (sofa still whole where it was). Camera/fit only; no art change.
# usage: python tests/view_fit_test.py URL [SHOT_DIR]   (solo; aborts *workers.dev)
import asyncio, sys, os
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import SKIP_WN, go
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
SHOT = sys.argv[2] if len(sys.argv) > 2 else ''
SIZES = [(820, 1180), (1180, 820), (390, 844), (844, 390)]
fails = 0
def check(name, ok, extra=''):
    global fails
    if not ok: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
SOFA = """() => { const st = document.getElementById('stage').getBoundingClientRect();
  const v = [...document.querySelectorAll('#layer .item[data-kind="sofa"]')].map(e => e.getBoundingClientRect()).filter(r => r.width > 0);
  return { st: [st.left, st.right], sofa: v.map(r => [Math.round(r.left), Math.round(r.right)]) }; }"""
CLUB = """() => { const s = document.getElementById('grScroll'), w = document.getElementById('grWorld');
  const a = s.getBoundingClientRect(), b = w.getBoundingClientRect(), sc = b.width / 2600;
  return { scrollL: s.scrollLeft, sc: parseFloat(getComputedStyle(w).getPropertyValue('--sc')) || 0, view: [a.left, a.right], world: [b.left, b.right] }; }"""
async def main():
    hits = []
    async with async_playwright() as p:
        b = await p.webkit.launch()
        try:
            for w, h in SIZES:
                vn = f'{w}x{h}'
                ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=(w < 900 and h < 900) or h < 500, device_scale_factor=2, service_workers='block')
                await ctx.route('**/*workers.dev*', lambda r: (hits.append(r.request.url), asyncio.ensure_future(r.abort())))
                pg = await ctx.new_page(); await pg.add_init_script(SKIP_WN)
                await pg.goto(URL); await pg.wait_for_timeout(1200)
                if await pg.locator('#phoneOk').count() and await pg.locator('#phoneOk').is_visible(): await pg.click('#phoneOk')
                await pg.click('#modePlay', force=True); await pg.wait_for_timeout(900)
                m = await pg.evaluate(SOFA)
                if SHOT: await pg.screenshot(path=f'{SHOT}/play-{vn}.png')
                if w == 820:
                    whole = [s for s in m['sofa'] if s[0] >= m['st'][0] - 1 and s[1] <= m['st'][1] + 1]
                    check(f'{vn} living-room sofa whole on screen', bool(m['sofa']) and len(whole) == len(m['sofa']), str(m))
                else: print('INFO', vn, m)
                await go(pg, 'gameroom'); await pg.wait_for_timeout(700)
                c = await pg.evaluate(CLUB)
                if SHOT: await pg.screenshot(path=f'{SHOT}/clubhouse-{vn}.png')
                if w == 820:
                    sc = c['sc'] or 1
                    check(f'{vn} clubhouse corner plant (x 2..78) on screen', c['scrollL'] <= 2 * sc, str(c))
                else: print('INFO', vn, c)
                await ctx.close()
        finally: await b.close()
    check('no workers.dev request reached the network', True, f'{len(hits)} aborted')
    print('RESULT', 'FAIL' if fails else 'PASS', fails); sys.exit(1 if fails else 0)
asyncio.run(main())
