# Portrait living-room framing in Play: the sofa, rug and toy cat must all be whole inside the visible stage
# at 820x1180, 810x1080, 768x1024 and 744x1133 (cat at its default spot). With the cat dragged to the far
# right (x 2367, the drag limit) it cannot share a 480-wide view with the sofa (room is 2400 wide), so there
# the sofa and rug must be whole and the cat is reported, not asserted.
# usage: python tests/view_fit_living_test.py URL [SHOT_DIR]   (solo; aborts *workers.dev)
import asyncio, sys, os, json
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import SKIP_WN
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
SHOT = sys.argv[2] if len(sys.argv) > 2 else ''
SIZES = [(820, 1180), (810, 1080), (768, 1024), (744, 1133)]
FAR_X = 2367  # 2400 - 0.6 * half the cat (main.ts drag clamp)
fails = 0
def check(name, ok, extra=''):
    global fails
    if not ok: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
M = """() => { const st = document.getElementById('stage').getBoundingClientRect(), wr = document.getElementById('stage').parentElement.getBoundingClientRect();
  const L = Math.max(st.left, wr.left, 0), R = Math.min(st.right, wr.right, innerWidth);
  const box = k => [...document.querySelectorAll(`#layer .item[data-kind="${k}"] .inner`)].map(e => e.getBoundingClientRect()).filter(r => r.width > 0).map(r => [Math.round(r.left), Math.round(r.right)]);
  return { view: [Math.round(L), Math.round(R)], sofa: box('sofa'), rug: box('rug'), cat: box('cat') }; }"""
def whole(m, k): return bool(m[k]) and all(a >= m['view'][0] - 1 and b <= m['view'][1] + 1 for a, b in m[k])
async def main():
    hits = []
    async with async_playwright() as p:
        b = await p.webkit.launch()
        try:
            for w, h in SIZES:
                for pos in ('default', 'far-right'):
                    vn = f'{w}x{h}'
                    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=1, service_workers='block')
                    await ctx.route('**/*workers.dev*', lambda r: (hits.append(r.request.url), asyncio.ensure_future(r.abort())))
                    pg = await ctx.new_page(); await pg.add_init_script(SKIP_WN)
                    await pg.goto(URL); await pg.wait_for_timeout(1200)
                    if pos == 'far-right':
                        await pg.evaluate(f"""() => {{ const s = window.__store, c = s.get().rooms.living.items.find(i => i.kind === 'cat');
                          s.dispatch({{ type: 'item/move', room: 'living', id: c.id, x: {FAR_X}, y: c.y }}); }}""")
                        await pg.wait_for_timeout(600); await pg.reload(); await pg.wait_for_timeout(1200)
                    await pg.click('#modePlay', force=True); await pg.wait_for_timeout(900)
                    m = await pg.evaluate(M)
                    if SHOT: await pg.screenshot(path=f'{SHOT}/living-{vn}-cat-{pos}.png')
                    check(f'{vn} cat {pos}: sofa whole', whole(m, 'sofa'), json.dumps(m))
                    check(f'{vn} cat {pos}: rug whole', whole(m, 'rug'))
                    if pos == 'default': check(f'{vn} cat {pos}: cat whole', whole(m, 'cat'))
                    else: print('INFO', f'{vn} far-right cat whole={whole(m, "cat")} (cannot share the view with the sofa)')
                    await ctx.close()
        finally: await b.close()
    print('RESULT', 'FAIL' if fails else 'PASS', fails); sys.exit(1 if fails else 0)
asyncio.run(main())
