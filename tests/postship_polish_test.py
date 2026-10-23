# Name tag clears a held baby, and a lying doll does not show the wall through the pillow.
# Never talks to production.
import asyncio, os, sys
from playwright.async_api import async_playwright

WEB = os.environ.get('POLISH_WEB', 'http://127.0.0.1:5173/kids-house-game/')
PROD = 'cozy-hood.andrewmunruh.workers.dev'
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def ready(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.first.is_visible():
            await loc.first.click(force=True)
            await pg.wait_for_timeout(120)

SETUP = """(arg) => {
  const s = __store;
  s.dispatch({ type: 'room/switch', room: 'nursery' });
  __sky.setChoice('day');
  if (!s.get().baby) s.dispatch({ type: 'baby/meet', now: Date.now() });
  if (!s.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
    s.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 1700, y: 540, flip: false, z: 8, scale: 1 } });
  const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
  if (bed && !!bed.flip !== !!arg.bedFlip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
  const kid = s.get().characters[0];
  const look2 = arg.chibi ? __avatar.look2FromLegacy(kid) : null;
  s.dispatch({ type: 'char/update', id: kid.id, patch: { size: arg.size, flip: false, look2, name: 'Mia Longname' } });
  const seat = arg.pose === 'stand' ? null : { item: arg.pose === 'sit' ? 'rocker-3' : 'qa-bed', pose: arg.pose, n: 0 };
  s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 700, y: 540, seat });
  s.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 700, y: 480, now: Date.now() });
  const holder = document.querySelector('#stage .char');
  if (holder && !holder.querySelector('.nametag')) {
    const t = document.createElement('div');
    t.className = 'nametag';
    t.textContent = 'Mia Longname';
    holder.appendChild(t);
  }
  const stage = document.getElementById('stage');
  if (holder && stage) {
    const hs = holder.getBoundingClientRect();
    const ss = stage.getBoundingClientRect();
    const sc = ss.width / stage.offsetWidth || 1;
    __cam.set(__cam.get() + ((hs.left + hs.width / 2) - ss.left) / sc - stage.offsetWidth / 2);
  }
}"""

MEASURE = """() => {
  const holder = document.querySelector('#stage .char.holding');
  const tag = holder && holder.querySelector('.nametag');
  const baby = document.querySelector('#stage .baby.baby-cradle');
  if (!holder || !tag || !baby) return null;
  const hb = holder.getBoundingClientRect();
  const tb = tag.getBoundingClientRect();
  const bb = baby.getBoundingClientRect();
  const overlap = tb.right > bb.left && tb.left < bb.right && tb.bottom > bb.top && tb.top < bb.bottom;
  return { overlap, gap: bb.top - tb.bottom, h: hb.height };
}"""

async def nametags(pg):
    cases = []
    for size in ('little', 'kid', 'adult'):
        for pose in ('stand', 'sit', 'lie'):
            for chibi in (False, True):
                cases.append((size, pose, chibi, False))
    cases.append(('kid', 'lie', False, True))
    cases.append(('kid', 'lie', True, True))
    for size, pose, chibi, bed_flip in cases:
        await pg.evaluate(SETUP, {'size': size, 'pose': pose, 'chibi': chibi, 'bedFlip': bed_flip})
        try:
            await pg.wait_for_function("""() => {
              const img = document.querySelector('#stage .baby img.artimg');
              return !!(img && img.complete && img.naturalWidth > 0);
            }""", timeout=8000)
        except Exception:
            pass
        await pg.wait_for_timeout(40)
        m = await pg.evaluate(MEASURE)
        look = 'chibi' if chibi else 'classic'
        flip = ' flipped' if bed_flip else ''
        label = f'{size} {pose} {look}{flip} name tag clears the held baby'
        ok = bool(m) and not m['overlap'] and m['h'] > 40 and m['gap'] >= m['h'] * 0.05
        check(label, ok, '' if ok else str(m))

async def pillow(pg):
    await pg.evaluate(SETUP, {'size': 'kid', 'pose': 'lie', 'chibi': False, 'bedFlip': False})
    await pg.wait_for_timeout(120)
    info = await pg.evaluate("""async () => {
      const bed = document.querySelector('.item[data-id="qa-bed"]');
      const img = bed && bed.querySelector('img');
      if (!bed || !img || !img.complete) return null;
      const r = bed.getBoundingClientRect();
      const wall = getComputedStyle(document.querySelector('.wall')).backgroundColor;
      const m = wall.match(/\\d+/g) || ['214', '243', '255'];
      const wr = +m[0], wg = +m[1], wb = +m[2];
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(r.width));
      c.height = Math.max(1, Math.round(r.height));
      const g = c.getContext('2d');
      // Draw the stage pixels by sampling the screenshot path is done in Python.
      // Here, report the bed box and the wall colour for the screenshot sample.
      return { x: r.x, y: r.y, w: r.width, h: r.height, wall: [wr, wg, wb] };
    }""")
    if not info:
        check('classic lie has no wall plate behind the pillow', False, 'missing bed')
        return
    shot = await pg.screenshot()
    from PIL import Image
    import io
    im = Image.open(io.BytesIO(shot)).convert('RGB')
    # Band just behind the pillow, fractions of the bed box.
    x0 = int(info['x'] + info['w'] * 0.10)
    x1 = int(info['x'] + info['w'] * 0.32)
    y0 = int(info['y'] + info['h'] * 0.17)
    y1 = int(info['y'] + info['h'] * 0.28)
    x0 = max(0, min(im.width - 1, x0)); x1 = max(x0 + 1, min(im.width, x1))
    y0 = max(0, min(im.height - 1, y0)); y1 = max(y0 + 1, min(im.height, y1))
    crop = im.crop((x0, y0, x1, y1))
    wr, wg, wb = info['wall']
    wall_n = 0
    n = crop.size[0] * crop.size[1]
    px = crop.load()
    for y in range(crop.size[1]):
        for x in range(crop.size[0]):
            r, g, b = px[x, y]
            if abs(r - wr) < 14 and abs(g - wg) < 14 and abs(b - wb) < 14:
                wall_n += 1
    frac = wall_n / n if n else 1
    check('classic lie has no wall plate behind the pillow', frac < 0.12, f'wall {frac:.2f} of the notch')

async def main():
    if PROD in WEB:
        print('refusing production')
        sys.exit(1)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': 1180, 'height': 820}, device_scale_factor=1)
        await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
        pg = await ctx.new_page()
        await pg.clock.set_fixed_time('2026-06-15T12:00:00Z')
        await pg.goto(WEB, wait_until='domcontentloaded')
        await ready(pg)
        await nametags(pg)
        await pillow(pg)
        await browser.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
    if not all(res.values()):
        sys.exit(1)

asyncio.run(main())
