# B18 item 4: two pets at one bed overlap neither the doll's face nor each other.
# Measured at 820x1180 and 1180x820. Stored cat.x stays unchanged.
# usage: WEB=http://127.0.0.1:5350/kids-house-game python tests/pet_foot_ingame_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

WEB = os.environ.get('WEB', 'http://localhost:5350').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True

def check(name, ok, extra=''):
    global ok_all
    ok_all &= bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + str(extra)) if extra else ''), flush=True)

def hit(a, b, pad=0):
    return a['l'] < b['r'] - pad and b['l'] < a['r'] - pad and a['t'] < b['b'] - pad and b['t'] < a['b'] - pad

READY = """() => !!(window.__store && document.getElementById('btnMenu') && document.querySelector('.char[data-cid]'))"""

SETUP = """() => {
  const S = __store;
  S.dispatch({ type: 'room/switch', room: 'bedroom' });
  const s = S.get();
  const bed = s.rooms.bedroom.items.find(i => i.kind === 'bed');
  const c = s.characters[0];
  S.dispatch({ type: 'char/move', id: c.id, room: 'bedroom', x: bed.x, y: bed.y, seat: { item: bed.id, pose: 'lie', n: 0 } });
  if (!s.cat) S.dispatch({ type: 'cat/set', cat: { name: 'Clover', coat: 0, room: 'bedroom', x: bed.x } });
  else S.dispatch({ type: 'cat/move', room: 'bedroom', x: bed.x });
  const catX = S.get().cat.x;
  if (!s.dog) S.dispatch({ type: 'dog/set', dog: { name: 'Sunny', breed: 0, owner: c.id } });
  // Pin the cat near the bed so we do not wait on the wander clock.
  window.__pinCat = { x: bed.x, y: Math.max(520, bed.y) };
  if (window.__cam) __cam.set(Math.max(0, bed.x - 340));
  return { id: c.id, bed: { id: bed.id, x: bed.x, y: bed.y }, catX };
}"""

MEASURE = """() => {
  const box = el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height };
  };
  const cat = document.querySelector('.pet.pet-cat');
  const dog = document.querySelector('.pet.pet-dog:not(.kenneled)');
  const doll = document.querySelector('.char[data-cid]');
  const head = doll && doll.querySelector('.dollhead');
  return {
    cat: box(cat),
    dog: box(dog),
    face: box(head),
    doll: box(doll),
    catStored: (__store.get().cat || {}).x,
    footClass: !!(cat && cat.classList.contains('soc-foot')) || !!(dog && dog.classList.contains('soc-foot')),
    catT: cat && cat.style.translate,
    dogT: dog && dog.style.translate,
  };
}"""

async def wait_ready(pg):
    try:
        await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test((b.textContent||'').trim()) && b.offsetParent) b.click(); }")
    except Exception:
        pass
    await pg.wait_for_function(READY, timeout=20000)

async def goto_game(pg):
    url = WEB if '/kids-house-game' in WEB else WEB.rstrip('/') + '/kids-house-game'
    await pg.goto(url + '/', wait_until='domcontentloaded')
    await pg.wait_for_timeout(600)
    await wait_ready(pg)

async def run_size(browser, w, h):
    tag = f'{w}x{h}'
    c = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN)
    pg = await c.new_page()
    await goto_game(pg)
    info = await pg.evaluate(SETUP)
    await pg.wait_for_timeout(800)
    # Give the rAF / social paint a moment to slide them to the foot.
    try:
        await pg.wait_for_function("() => document.querySelector('.pet.pet-cat') && document.querySelector('.pet.pet-dog:not(.kenneled)')", timeout=5000)
    except Exception:
        pass
    await pg.wait_for_timeout(600)
    m = await pg.evaluate(MEASURE)
    check(f'{tag}: setup has a bed and a stored cat.x', info and 'catX' in info, info)
    check(f'{tag}: cat is on screen', bool(m.get('cat')), m)
    check(f'{tag}: dog is on screen', bool(m.get('dog')), m)
    check(f'{tag}: doll face (.dollhead) is on screen', bool(m.get('face')), m)
    if m.get('cat') and m.get('dog'):
        check(f'{tag}: two pets do not overlap each other', not hit(m['cat'], m['dog']), m)
    if m.get('cat') and m.get('face'):
        check(f'{tag}: cat does not overlap the doll face', not hit(m['cat'], m['face']), {'cat': m['cat'], 'face': m['face']})
    if m.get('dog') and m.get('face'):
        check(f'{tag}: dog does not overlap the doll face', not hit(m['dog'], m['face']), {'dog': m['dog'], 'face': m['face']})
    check(f'{tag}: stored cat.x is unchanged', m.get('catStored') == info.get('catX'), f"before={info.get('catX')} after={m.get('catStored')}")
    await c.close()

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        await run_size(b, 820, 1180)
        await run_size(b, 1180, 820)
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)

asyncio.run(main())
