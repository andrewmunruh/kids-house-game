# M2 need bubble size and fit (solo, LOCAL static server only): on-screen width >= 36px (40px portrait phone), and the bubble
# does not cover her name tag, a held baby, another doll's bubble, or the room arrows (#nudgeL/#nudgeR).
# usage: flock /workspace/surprise/gate.lock /workspace/.pwvenv/bin/python tests/needs_bubble_fit_test.py   env WEB=http://localhost:5610 NEED_SHOTS=shots/needs/
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5610').rstrip('/')
assert 'workers.dev' not in WEB
SHOT = os.environ.get('NEED_SHOTS', 'shots/needs/'); os.makedirs(SHOT, exist_ok=True)
ok_all = True
def check(name, ok, extra=''):
    global ok_all; ok_all &= bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
SETUP = """([x0, cam]) => { const S = __store; S.dispatch({type:'room/switch', room:'living'});
  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}};
  for (const [id, dx, need, name] of [['fa', 0, 'hungry', 'Rosie'], ['fb', 150, 'sleepy', 'Lulu']]) {
    if (!S.get().characters.some(c => c.id === id)) S.dispatch({type:'char/add', char:{...base, id, name, room:'living', x: x0 + dx, y: 640}});
    S.dispatch({type:'char/move', id, room:'living', x: x0 + dx, y: 640});
    for (let i = 0; i < 3; i++) S.dispatch({type:'need/drift', id, need});
  }
  if (!S.get().baby) S.dispatch({type:'baby/meet', now: Date.now()});
  S.dispatch({type:'baby/hold', holder:'fa', room:'living', x: x0, y: 640, now: Date.now()});
  __cam.set(cam); }"""
MEASURE = """() => {
  const R = e => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; };
  const vis = e => e && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0';
  const out = { bubbles: [], tags: [], babies: [], arrows: [] };
  for (const id of ['fa', 'fb']) { const c = document.querySelector(`.char[data-cid="${id}"]`); if (!c) continue;
    const b = c.querySelector(':scope > .need-bubble.show'); if (b) out.bubbles.push({ id, r: R(b) });
    const t = c.querySelector('.nametag'); if (vis(t) && t.textContent.trim()) out.tags.push({ id, r: R(t) }); }
  for (const e of document.querySelectorAll('[class*="baby"], [data-baby]')) if (vis(e) && !e.closest('.toolbar,.tray,.cat,.menu') && e.getBoundingClientRect().width > 4 && e.getBoundingClientRect().width < 400) out.babies.push(R(e));
  for (const id of ['nudgeL', 'nudgeR']) { const e = document.getElementById(id); if (vis(e)) out.arrows.push(R(e)); }
  return out; }"""
def hit(a, b, pad=0):
    return a[0] < b[2] - pad and b[0] < a[2] - pad and a[1] < b[3] - pad and b[1] < a[3] - pad
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for tag, w, h in (('820x1180', 820, 1180), ('1180x820', 1180, 820), ('phone-844x390', 844, 390), ('phone-390x844', 390, 844)):
            need_w = 40 if (w, h) == (390, 844) else 36
            c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page()
            await pg.goto(f'{WEB}/kids-house-game/'); await pg.wait_for_timeout(1500)
            await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test(b.textContent.trim()) && b.offsetParent) b.click(); }"); await pg.wait_for_timeout(400)
            for where, x0, cam in (('middle', 700, 480), ('left edge', 150, 0)):
                await pg.evaluate(SETUP, [x0, cam]); await pg.wait_for_timeout(1000)
                # let the pop-in (scale .6 -> 1) finish before measuring
                try: await pg.wait_for_function("() => { const b = [...document.querySelectorAll('.char > .need-bubble.show')]; return b.length >= 2 && b.every(e => new DOMMatrix(getComputedStyle(e).transform).a > 0.999); }", timeout=4000)
                except Exception: pass
                await pg.wait_for_timeout(200)
                m = await pg.evaluate(MEASURE)
                bs = m['bubbles']
                check(f'{tag} {where}: both bubbles show', len(bs) == 2, str([x['id'] for x in bs]))
                for x in bs:
                    bw = x['r'][2] - x['r'][0]
                    check(f'{tag} {where} {x["id"]}: bubble >= {need_w}px on screen', bw >= need_w - 0.5, f'{bw:.1f}px')
                    check(f'{tag} {where} {x["id"]}: clear of name tags', not any(hit(x['r'], t['r']) for t in m['tags']))
                    check(f'{tag} {where} {x["id"]}: clear of the held baby', not any(hit(x['r'], r, 2) for r in m['babies']), f'{len(m["babies"])} baby els')
                    check(f'{tag} {where} {x["id"]}: clear of the room arrows', not any(hit(x['r'], r) for r in m['arrows']))
                if len(bs) == 2: check(f'{tag} {where}: bubbles do not overlap each other', not hit(bs[0]['r'], bs[1]['r']))
                await pg.screenshot(path=f'{SHOT}shot-bubble-fit-{where.replace(" ", "")}-{tag}.png')
            await c.close()
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)
asyncio.run(main())
