# Name tag clears a held baby, and the starter-bed cap fills the headboard notch.
# Never talks to production.
import asyncio, io, os, sys
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

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

def headboard_art():
    """Headboard box and the wallpaper notch inside it, as fractions of the painting."""
    im = Image.open(Path(__file__).resolve().parents[1] / 'assets/art/bedroom/bed.webp').convert('RGBA')
    w, h = im.size
    px = im.load()
    prev = None
    right = int(0.55 * w)
    for x in range(int(0.2 * w), int(0.7 * w)):
        y40 = next((y for y in range(h) if px[x, y][3] > 40), None)
        if y40 is None:
            continue
        if prev is not None and (y40 - prev) / h > 0.08 and x / w > 0.4:
            right = x - 1
            break
        prev = y40
    top = min(y for y in range(h) for x in range(int(0.6 * w)) if px[x, y][3] > 40)
    left = min(x for y in range(top, int(0.7 * h)) for x in range(w) if px[x, y][3] > 40)
    bottom = int(0.68 * h)
    for y in range(int(0.3 * h), int(0.9 * h)):
        x40 = next((x for x in range(w) if px[x, y][3] > 40), None)
        if x40 is not None and x40 > left + int(0.02 * w):
            bottom = y - 1
            break
    # The notch is the clear corner inside that box, where the crown curves away
    # from the left post. A one-pixel fringe down the post is the painting's own edge.
    notch = []
    gap = int(0.02 * w)
    for y in range(top, bottom + 1):
        sil = next((x for x in range(left, right + 1) if px[x, y][3] > 16), None)
        if sil is None or sil - left < gap:
            continue
        for x in range(left, sil):
            if px[x, y][3] < 16:
                notch.append((x / w, y / h))
    return {'left': left / w, 'top': top / h, 'right': right / w, 'bottom': bottom / h, 'notch': notch, 'px': px, 'w': w, 'h': h}

ART = headboard_art()

CAP = """(arg) => {
  const s = __store;
  s.dispatch({ type: 'room/switch', room: 'nursery' });
  let st = document.getElementById('captest');
  if (!st) { st = document.createElement('style'); st.id = 'captest'; document.head.appendChild(st); }
  st.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }'
    + (arg.hide ? ' .item[data-kind="bed"] > .inner::before { background: none !important; }' : '');
  __sky.setChoice(arg.sky);
  const kid = s.get().characters[0];
  s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 40, y: 40, seat: null });
  if (s.get().baby) s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 80, y: 80, now: Date.now() });
  if (!s.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
    s.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 900, y: 520, flip: false, z: 40, scale: 1.6 } });
  const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
  if (bed && !!bed.flip !== !!arg.flip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
  const stage = document.getElementById('stage');
  const el = document.querySelector('.item[data-id="qa-bed"]');
  const img = el && el.querySelector('img');
  if (!el || !img || !img.complete || !img.naturalWidth) return null;
  const hs = el.getBoundingClientRect();
  const ss = stage.getBoundingClientRect();
  const sc = ss.width / stage.offsetWidth || 1;
  __cam.set(__cam.get() + ((hs.left + hs.width / 2) - ss.left) / sc - stage.offsetWidth / 2);
  const r = img.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
}"""

def changed(a, b, tol=18):
    return abs(a[0] - b[0]) > tol or abs(a[1] - b[1]) > tol or abs(a[2] - b[2]) > tol

async def cap_case(pg, sky, flip, vw, vh):
    await pg.set_viewport_size({'width': vw, 'height': vh})
    label = f'{sky} {"flipped" if flip else "normal"} {vw}x{vh}'
    info = None
    for _ in range(8):
        info = await pg.evaluate(CAP, {'sky': sky, 'flip': flip, 'hide': False})
        if info and info['w'] > 80:
            break
        await pg.wait_for_timeout(80)
    if not info:
        check(f'{label} cap is inside the headboard and covers the notch', False, 'missing bed')
        return
    await pg.wait_for_timeout(60)
    on = Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')
    bare = await pg.evaluate(CAP, {'sky': sky, 'flip': flip, 'hide': True})
    await pg.wait_for_timeout(40)
    off = Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')
    if not bare or abs(bare['x'] - info['x']) > 1 or abs(bare['w'] - info['w']) > 1:
        check(f'{label} cap is inside the headboard and covers the notch', False, 'bed moved')
        return
    bx, by, bw, bh = info['x'], info['y'], info['w'], info['h']
    pon, poff = on.load(), off.load()
    sp, sw, sh = ART['px'], ART['w'], ART['h']
    def screen(fx, fy):
        sfx = 1 - fx if flip else fx
        return bx + sfx * bw, by + fy * bh
    corners = [screen(ART['left'], ART['top']), screen(ART['right'], ART['top']),
               screen(ART['left'], ART['bottom']), screen(ART['right'], ART['bottom'])]
    hx0 = min(p[0] for p in corners); hy0 = min(p[1] for p in corners)
    hx1 = max(p[0] for p in corners); hy1 = max(p[1] for p in corners)
    minx = miny = 10 ** 9
    maxx = maxy = -1
    n = 0
    x0, y0 = max(0, int(bx)), max(0, int(by))
    x1, y1 = min(on.width, int(bx + bw) + 1), min(on.height, int(by + bh) + 1)
    for sy in range(y0, y1):
        for sx in range(x0, x1):
            if not changed(pon[sx, sy], poff[sx, sy]):
                continue
            fx = (sx - bx) / bw
            fy = (sy - by) / bh
            if flip:
                fx = 1 - fx
            ix, iy = int(fx * sw), int(fy * sh)
            if not (0 <= ix < sw and 0 <= iy < sh) or sp[ix, iy][3] >= 16:
                continue
            n += 1
            if sx < minx: minx = sx
            if sy < miny: miny = sy
            if sx > maxx: maxx = sx
            if sy > maxy: maxy = sy
    tol = 2
    inside = n > 50 and minx >= hx0 - tol and miny >= hy0 - tol and maxx <= hx1 + tol and maxy <= hy1 + tol
    covered = 0
    for fx, fy in ART['notch']:
        sx, sy = screen(fx, fy)
        sx, sy = int(round(sx)), int(round(sy))
        if 0 <= sx < on.width and 0 <= sy < on.height and changed(pon[sx, sy], poff[sx, sy]):
            covered += 1
    frac = covered / len(ART['notch']) if ART['notch'] else 0
    ok = inside and frac >= 0.90
    extra = '' if ok else f'inside={inside} cover={frac:.2f} patch=({minx},{miny},{maxx},{maxy}) board=({hx0:.0f},{hy0:.0f},{hx1:.0f},{hy1:.0f})'
    check(f'{label} cap is inside the headboard and covers the notch', ok, extra)

async def headboard(pg):
    for vw, vh in ((1180, 820), (820, 1180)):
        for sky in ('day', 'night'):
            for flip in (False, True):
                await cap_case(pg, sky, flip, vw, vh)

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
        await headboard(pg)
        await browser.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
    if not all(res.values()):
        sys.exit(1)

asyncio.run(main())
