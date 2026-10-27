# X1 minimal repro: a doll lying in bed with a wish. Her thought bubble should sit near her head on the pillow,
# (head is on the pillow side, left when unflipped) and not float where her head would be if she stood up (where it reads as another doll's or avatar's wish).
# usage: WEB=http://localhost:5960 /workspace/.pwvenv/bin/python tests/cross_lying_bubble_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5960').rstrip('/')
assert 'workers.dev' not in WEB
SHOT = os.environ.get('X_SHOTS', '/workspace/t-cross-shots/'); os.makedirs(SHOT, exist_ok=True)
GEO = """() => { const e = document.querySelector('.char[data-cid="ly1"]'); const b = e && e.querySelector(':scope > .need-bubble.show .nb-cloud'); if (!b) return null;
  const parts = [...e.querySelectorAll('.inner svg *')].map(n => n.getBoundingClientRect()).filter(r => r.width > 0);
  const art = parts.reduce((a, r) => ({l: Math.min(a.l, r.left), t: Math.min(a.t, r.top), r: Math.max(a.r, r.right), b: Math.max(a.b, r.bottom)}), {l: 1e9, t: 1e9, r: -1e9, b: -1e9});
  const br = b.getBoundingClientRect(); return {gap: Math.round(art.t - br.bottom), cx: Math.round((br.left + br.right) / 2), art: [Math.round(art.l), Math.round(art.t), Math.round(art.r), Math.round(art.b)]}; }"""
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch(); ok = True
        for (w, h) in [(820, 1180), (844, 390)]:
            c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{WEB}/kids-house-game/?needsqa=1'); await pg.wait_for_timeout(900)
            await pg.evaluate("document.querySelectorAll('button').forEach(b => /^OK/.test(b.textContent.trim()) && b.offsetParent && b.click())")
            await pg.evaluate("""() => { const s = __store, room = 'living'; s.dispatch({type:'room/switch', room});
              s.dispatch({type:'item/add', room, item:{id:'ly-bed', kind:'bed', x:700, y:600, flip:false, z:42, scale:1}});
              s.dispatch({type:'char/add', char:{skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room, id:'ly1', x:700, y:600, seat:{item:'ly-bed', pose:'lie', n:0}}});
              for (let i = 0; i < 40 && !Object.values((s.get().characters.find(c => c.id === 'ly1') || {}).needs || {}).some(v => v <= 1); i++) __needs.tick(4 * 60000); }""")
            await pg.click('#modePlay'); await pg.evaluate('__cam.set(350)'); await pg.wait_for_timeout(1500)
            g = await pg.evaluate(GEO); await pg.screenshot(path=f'{SHOT}x-lying-bubble-{w}x{h}.png')
            a = g and g['art']; good = g is not None and g['gap'] < 0.35 * (a[3] - a[1]) and a[0] <= g['cx'] <= (a[0] + a[2]) / 2  # near, and over the head half (head is on the left when not flipped)
            print(f'{w}x{h}', 'bubble vs lying doll art', g, 'errors', errs, 'PASS' if good else 'FAIL'); ok &= good and not errs
            await c.close()
        await b.close(); print('LYING-BUBBLE', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
asyncio.run(main())
