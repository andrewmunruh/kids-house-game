# Name tag clears a held baby. The starter bed matches the shipped painting:
# any pixel that differs from ee2d71b sits inside the painted silhouette,
# and the sky corners above the posts stay clear.
# Never talks to production.
import asyncio, io, os, sys, threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
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

BED = Image.open(Path(__file__).resolve().parents[1] / 'assets/art/bedroom/bed.webp').convert('RGBA')
BED_PX = BED.load()
BED_W, BED_H = BED.size
# Clear paint outside the silhouette. The cut above each post is in this set.
SKY = []
for y in range(int(0.12 * BED_H), int(0.50 * BED_H)):
    for x in range(BED_W):
        if BED_PX[x, y][3] < 16:
            SKY.append((x / BED_W, y / BED_H))

EE2_DIST = os.environ.get('EE2_DIST', '/tmp/prod-ee2-dist')
EE2_PORT = int(os.environ.get('EE2_PORT', '4188'))

PLACE = """(arg) => {
  const s = __store;
  s.dispatch({ type: 'room/switch', room: 'nursery' });
  let st = document.getElementById('captest');
  if (!st) { st = document.createElement('style'); st.id = 'captest'; document.head.appendChild(st); }
  st.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
  __sky.setChoice(arg.sky);
  const kid = s.get().characters[0];
  s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 40, y: 40, seat: null });
  if (s.get().baby) s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 80, y: 80, now: Date.now() });
  // Same spot and scale on both builds. The name-tag cases leave a smaller bed behind.
  if (s.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
    s.dispatch({ type: 'item/delete', room: 'nursery', id: 'qa-bed' });
  s.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 900, y: 520, flip: false, z: 40, scale: 1.6 } });
  const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
  if (bed && !!bed.flip !== !!arg.flip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
  document.querySelectorAll('#stage .item, #stage .char, #stage .baby, #stage .pet, #stage .seatFront').forEach(el => {
    el.style.visibility = el.dataset.id === 'qa-bed' ? 'visible' : 'hidden';
  });
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

def far(a, b, tol=12):
    return abs(a[0] - b[0]) > tol or abs(a[1] - b[1]) > tol or abs(a[2] - b[2]) > tol

def serve_ee2():
    root = Path('/tmp/ee2-www')
    link = root / 'kids-house-game'
    root.mkdir(parents=True, exist_ok=True)
    if link.is_symlink() or link.exists():
        if not link.is_symlink() or os.readlink(link) != EE2_DIST:
            link.unlink()
            link.symlink_to(EE2_DIST)
    else:
        link.symlink_to(EE2_DIST)
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            pass
    handler = partial(Quiet, directory=str(root))
    httpd = ThreadingHTTPServer(('127.0.0.1', EE2_PORT), handler)
    httpd.daemon_threads = True
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return f'http://127.0.0.1:{EE2_PORT}/kids-house-game/'

async def place_bed(pg, sky, flip, vw, vh):
    await pg.set_viewport_size({'width': vw, 'height': vh})
    info = None
    for _ in range(8):
        info = await pg.evaluate(PLACE, {'sky': sky, 'flip': flip})
        if info and info['w'] > 80:
            break
        await pg.wait_for_timeout(80)
    if not info:
        return None, None
    await pg.wait_for_timeout(40)
    info = await pg.evaluate(PLACE, {'sky': sky, 'flip': flip})
    shot = Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')
    return info, shot

async def bed_case(now, old, sky, flip, vw, vh):
    label = f'{sky} {"flipped" if flip else "normal"} {vw}x{vh}'
    name = f'{label} bed differs from ee2d71b only inside the painting'
    cur, cur_im = await place_bed(now, sky, flip, vw, vh)
    base, base_im = await place_bed(old, sky, flip, vw, vh)
    if not cur or not base:
        check(name, False, 'missing bed')
        return
    cp, bp = cur_im.load(), base_im.load()
    outside = 0
    sky_changed = 0
    sky_n = 0
    changed_n = 0
    # Every rendered bed pixel. A change on clear paint is outside the silhouette.
    x0, y0 = int(cur['x']), int(cur['y'])
    x1, y1 = int(cur['x'] + cur['w']), int(cur['y'] + cur['h'])
    for cy in range(max(0, y0), min(cur_im.height, y1)):
        fy = (cy - cur['y']) / cur['h']
        by = int(round(base['y'] + fy * base['h']))
        if not (0 <= by < base_im.height) or not (0 <= fy < 1):
            continue
        for cx in range(max(0, x0), min(cur_im.width, x1)):
            fx = (cx - cur['x']) / cur['w']
            if not (0 <= fx < 1):
                continue
            sfx = 1 - fx if flip else fx
            bx = int(round(base['x'] + fx * base['w']))
            if not (0 <= bx < base_im.width):
                continue
            if not far(cp[cx, cy], bp[bx, by]):
                continue
            changed_n += 1
            ix, iy = int(sfx * BED_W), int(fy * BED_H)
            if ix >= BED_W: ix = BED_W - 1
            if iy >= BED_H: iy = BED_H - 1
            if BED_PX[ix, iy][3] < 16:
                outside += 1
    for fx, fy in SKY:
        sfx = 1 - fx if flip else fx
        cx, cy = int(round(cur['x'] + sfx * cur['w'])), int(round(cur['y'] + fy * cur['h']))
        bx, by = int(round(base['x'] + sfx * base['w'])), int(round(base['y'] + fy * base['h']))
        if not (0 <= cx < cur_im.width and 0 <= cy < cur_im.height and 0 <= bx < base_im.width and 0 <= by < base_im.height):
            continue
        sky_n += 1
        if far(cp[cx, cy], bp[bx, by]):
            sky_changed += 1
    ok = outside == 0 and sky_changed == 0 and sky_n > 1000
    extra = '' if ok else f'outside={outside} sky={sky_changed}/{sky_n} changed={changed_n}'
    check(name, ok, extra)

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
        old_web = serve_ee2()
        if PROD in old_web or not os.path.isdir(EE2_DIST):
            print('refusing production or missing ee2d71b dist')
            sys.exit(1)
        old = await ctx.new_page()
        await old.clock.set_fixed_time('2026-06-15T12:00:00Z')
        await old.goto(old_web, wait_until='domcontentloaded')
        await ready(old)
        await nametags(pg)
        for vw, vh in ((1180, 820), (820, 1180)):
            for sky in ('day', 'night'):
                for flip in (False, True):
                    await bed_case(pg, old, sky, flip, vw, vh)
        await browser.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
    if not all(res.values()):
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
