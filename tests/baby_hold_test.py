# Two browsers: she is drawn on the holder, and leaving or disconnecting puts her down.
# Also the care card (Play only, 44px, Name stays one line), Play vs Decorate sit/lie,
# and a real protocol-4 client from the pre-baby build. Never talks to production.
import asyncio, os, shutil, signal, subprocess, sys, time
from urllib.parse import urlparse
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import tap

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = opt('--web', 'BABY_WEB', 'http://127.0.0.1:5173/kids-house-game/')
HOOD_PORT = int(opt('--hood-port', 'BABY_HOOD_PORT', '8807'))
OLD_PORT = int(opt('--old-port', 'BABY_OLD_PORT', '4198'))
OLD_DIST = opt('--old-dist', 'BABY_OLD_DIST', '/tmp/prod-dist')
HOOD = f'http://127.0.0.1:{HOOD_PORT}'
PROD_WORKER = 'cozy-hood.andrewmunruh.workers.dev'
SIZES = [(820, 1180), (1180, 820), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)]
OUT = os.environ.get('BABY_SHOTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(OUT, exist_ok=True)
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def hits_prod(url):
    try: return (urlparse(url).hostname or '') == PROD_WORKER
    except Exception: return False

def page_url(base):
    return base + ('&' if '?' in base else '?') + 'hood=' + HOOD

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    await pg.wait_for_timeout(200)
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.first.is_visible():
            await loc.first.click(force=True)
            await pg.wait_for_timeout(150)

async def join(pg, code, nick, bring):
    await tap(pg, '#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    if bring is not None:
        await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

def server():
    data = '/tmp/baby-hold-data'
    shutil.rmtree(data, ignore_errors=True)
    os.makedirs(data)
    env = dict(os.environ, PORT=str(HOOD_PORT), HOOD_DATA=data)
    return subprocess.Popen(['npx', 'tsx', 'server/node.ts'], cwd=ROOT, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)

def old_web():
    www = '/tmp/baby-old-www'
    shutil.rmtree(www, ignore_errors=True)
    os.makedirs(www)
    os.symlink(OLD_DIST, www + '/kids-house-game')
    code = (
        "import http.server, functools\n"
        "class H(http.server.SimpleHTTPRequestHandler):\n"
        "    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
        "    def log_message(self, *a): pass\n"
        f"http.server.ThreadingHTTPServer(('127.0.0.1', {OLD_PORT}), functools.partial(H, directory='{www}')).serve_forever()"
    )
    return subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)

def wait_port(port, t=20):
    import socket
    end = time.time() + t
    while time.time() < end:
        try:
            socket.create_connection(('127.0.0.1', port), 0.4).close()
            return True
        except OSError:
            time.sleep(0.25)
    return False

def stop(pr):
    if not pr: return
    try: os.killpg(pr.pid, signal.SIGTERM)
    except Exception: pass

async def drag(pg, a, b):
    await pg.mouse.move(a[0], a[1])
    await pg.mouse.down()
    await pg.mouse.move(b[0], b[1], steps=14)
    await pg.mouse.up()
    await pg.wait_for_timeout(250)

async def center(pg, sel):
    return await pg.evaluate("""(sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return null;
      return { x: r.x + r.width / 2, y: r.y + Math.min(24, r.height * 0.25), top: r.y };
    }""", sel)

async def card_layout(pg):
    return await pg.evaluate("""() => {
      const card = document.querySelector('.babyCare');
      const floor = document.querySelector('#stage .floor');
      if (!card || !floor || card.hidden) return null;
      const c = card.getBoundingClientRect();
      const f = floor.getBoundingClientRect();
      const buttons = [...card.querySelectorAll('button')].filter(b => !b.hidden && b.offsetParent);
      const small = buttons.some(b => { const r = b.getBoundingClientRect(); return r.width < 43.5 || r.height < 43.5; });
      const overFloor = c.bottom > f.top + 1 && c.top < f.bottom && c.right > f.left && c.left < f.right;
      let overLegs = false;
      document.querySelectorAll('#stage .char').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return;
        const legTop = r.top + r.height * 0.55;
        if (c.bottom > legTop && c.top < r.bottom && c.right > r.left && c.left < r.right) overLegs = true;
      });
      return { overFloor, overLegs, small, n: buttons.length, cardTop: Math.round(c.top), floorTop: Math.round(f.top) };
    }""")

CRADLE_VIEWS = [(820, 1180), (390, 844), (844, 390)]
# Hold band in the 120×192 doll box: below the chin, across the torso and the arms.
# The bundle may overlap the arms. It may not overlap the head.
CRADLE_JS = """(sel) => {
  const holder = document.querySelector(sel);
  const baby = document.querySelector('#stage .baby');
  if (!holder || !baby) return { ok: false, why: 'missing' };
  const b = holder.getBoundingClientRect();
  const babyR = baby.getBoundingClientRect();
  if (b.width < 2 || babyR.width < 2) return { ok: false, why: 'offscreen' };
  const stage = document.getElementById('stage');
  const sc = stage.getBoundingClientRect().height / stage.offsetHeight;
  const pose = holder.classList.contains('pose-lie') ? 'lie' : (holder.classList.contains('pose-sit') ? 'sit' : 'stand');
  const lieFlip = holder.classList.contains('pose-lie-r');
  const torso = [[16, 98], [104, 98], [104, 168], [16, 168]];
  const head = [[24, 22.8], [96, 22.8], [96, 96], [24, 96]];
  const doll = b.width / sc / 120;
  function map(px, py) {
    if (pose === 'lie' && lieFlip) {
      return [b.left + (-py * doll + 210.24) * sc, b.top + (-px * doll + 186.24) * sc];
    }
    let x = b.left + px / 120 * b.width;
    let y = b.top + py / 192 * b.height;
    if (pose === 'sit') y += 0.26 * b.height;
    if (pose === 'lie') {
      const ox = b.left + 0.40 * b.width, oy = b.top + 0.72 * b.height;
      const dx = x - ox, dy = y - oy;
      x = ox + dy; y = oy - dx;
    }
    return [x, y];
  }
  function pip(poly, x, y) {
    let inside = false, j = poly.length - 1;
    for (let i = 0; i < poly.length; i++) {
      const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / ((yj - yi) || 1e-9) + xi) inside = !inside;
      j = i;
    }
    return inside;
  }
  function distEdge(poly, x, y) {
    let best = 1e9;
    for (let i = 0; i < poly.length; i++) {
      const ax = poly[i][0], ay = poly[i][1], bx = poly[(i + 1) % poly.length][0], by = poly[(i + 1) % poly.length][1];
      const vx = bx - ax, vy = by - ay, l2 = vx * vx + vy * vy || 1;
      let t = ((x - ax) * vx + (y - ay) * vy) / l2;
      t = Math.max(0, Math.min(1, t));
      best = Math.min(best, Math.hypot(x - (ax + t * vx), y - (ay + t * vy)));
    }
    return best;
  }
  function cross(p, q, r) { return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]); }
  function hit(a, bq, c, d) {
    const d1 = cross(a, bq, c), d2 = cross(a, bq, d), d3 = cross(c, d, a), d4 = cross(c, d, bq);
    return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
  }
  const tp = torso.map(p => map(p[0], p[1]));
  const hp = head.map(p => map(p[0], p[1]));
  const corners = [[babyR.left, babyR.top], [babyR.right, babyR.top], [babyR.right, babyR.bottom], [babyR.left, babyR.bottom]];
  const outside = corners.filter(p => !pip(tp, p[0], p[1]) && distEdge(tp, p[0], p[1]) > 1);
  const L = babyR.left + 1, R = babyR.right - 1, T = babyR.top + 1, Bm = babyR.bottom - 1;
  const box = [[L, T], [R, T], [R, Bm], [L, Bm]];
  let overlap = false;
  if (R > L && Bm > T) {
    for (const p of box) if (pip(hp, p[0], p[1])) overlap = true;
    for (const p of hp) if (p[0] >= L && p[0] <= R && p[1] >= T && p[1] <= Bm) overlap = true;
    for (let i = 0; i < 4 && !overlap; i++) for (let k = 0; k < 4; k++) if (hit(box[i], box[(i + 1) % 4], hp[k], hp[(k + 1) % 4])) overlap = true;
  }
  const fracW = babyR.width / b.width, fracH = babyR.height / b.height;
  const sizeOk = fracW >= 0.34 && fracW <= 0.7 && fracH >= 0.22;
  return {
    ok: outside.length === 0 && !overlap && sizeOk && baby.classList.contains('baby-cradle'),
    why: outside.length ? 'torso' : (overlap ? 'head' : (!sizeOk ? 'size' : (baby.classList.contains('baby-cradle') ? '' : 'class'))),
    pose, lieFlip, doll: Math.round(doll * 100) / 100,
    baby: { w: Math.round(babyR.width * 10) / 10, h: Math.round(babyR.height * 10) / 10 },
    holder: { w: Math.round(b.width), h: Math.round(b.height) },
  };
}"""

async def frame_holder(pg, sel):
    await pg.evaluate("""(sel) => {
      const stage = document.getElementById('stage');
      const holder = document.querySelector(sel);
      if (!stage || !holder) return;
      const hs = holder.getBoundingClientRect();
      const ss = stage.getBoundingClientRect();
      const sc = ss.width / stage.offsetWidth || 1;
      __cam.set(__cam.get() + ((hs.left + hs.width / 2) - ss.left) / sc - stage.offsetWidth / 2);
    }""", sel)

async def cradle_check(pg, browser_name, sel='#stage .char'):
    await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({ type: 'room/switch', room: 'nursery' });
      if (!s.get().baby) s.dispatch({ type: 'baby/meet', now: Date.now() });
      if (!s.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
        s.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 1700, y: 540, flip: false, z: 8, scale: 1 } });
      const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
      if (bed && bed.flip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
    }""")
    for w, h in CRADLE_VIEWS:
        await pg.set_viewport_size({'width': w, 'height': h})
        await pg.wait_for_timeout(320)
        await dismiss(pg)
        cases = []
        for size in ('little', 'kid', 'adult'):
            cases.append((size, 'stand', None, False, False))
            cases.append((size, 'sit', 'rocker-3', False, False))
            cases.append((size, 'lie', 'qa-bed', False, False))
        cases.append(('kid', 'stand', None, False, True))
        cases.append(('kid', 'lie', 'qa-bed', True, False))
        for size, pose, item, bed_flip, face_left in cases:
            await pg.evaluate("""(arg) => {
              const s = __store;
              const kid = s.get().characters[0];
              const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
              if (bed && !!bed.flip !== arg.bedFlip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
              s.dispatch({ type: 'char/update', id: kid.id, patch: { size: arg.size, flip: arg.faceLeft } });
              const seat = arg.item ? { item: arg.item, pose: arg.pose, n: 0 } : null;
              s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 700, y: 540, seat });
              s.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 700, y: 480, now: Date.now() });
              const play = document.getElementById('modePlay');
              if (play) play.click();
            }""", {'size': size, 'pose': pose, 'item': item, 'bedFlip': bed_flip, 'faceLeft': face_left})
            await pg.wait_for_timeout(60)
            await frame_holder(pg, sel)
            await pg.wait_for_timeout(60)
            info = await pg.evaluate(CRADLE_JS, sel)
            tag = f'{browser_name} {w}x{h} {size} {pose}'
            if bed_flip: tag += ' flipped bed'
            if face_left: tag += ' facing left'
            check(tag + ' cradle stays on the torso and off the head', bool(info and info.get('ok')), str(info))
            if browser_name == 'chromium' and size == 'kid' and not face_left and not bed_flip and (pose == 'stand' or (w, h) == (820, 1180)):
                name = {'stand': 'held', 'sit': 'sit', 'lie': 'lie'}[pose]
                await pg.screenshot(path=os.path.join(OUT, f'after-{w}x{h}-{name}.png'))
            if browser_name == 'chromium' and (w, h) == (820, 1180) and size == 'kid' and bed_flip:
                await pg.screenshot(path=os.path.join(OUT, 'after-820x1180-lie-flip.png'))
            if browser_name == 'chromium' and (w, h) == (820, 1180) and pose == 'stand' and size in ('little', 'adult') and not face_left:
                await pg.screenshot(path=os.path.join(OUT, f'after-820x1180-{size}.png'))

async def buttons(pg):
    return await pg.evaluate("""() => {
      const card = document.querySelector('.babyCare');
      if (!card) return null;
      const list = [...card.querySelectorAll('button')].filter(b => !b.hidden && b.offsetParent);
      return list.map(b => {
        const r = b.getBoundingClientRect();
        return { t: b.textContent.trim(), w: r.width, h: r.height, care: b.dataset.care || '', name: b.hasAttribute('data-baby-name-open') };
      });
    }""")

async def solo_card(pg, browser_name):
    await pg.goto(WEB, wait_until='domcontentloaded')
    await dismiss(pg)
    await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({ type: 'room/switch', room: 'nursery' });
      if (!s.get().baby) s.dispatch({ type: 'baby/meet', now: Date.now() });
      const crib = s.get().rooms.nursery.items.find(i => i.kind === 'crib');
      const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
      __cam.set((crib ? crib.x : 1170) - vw / 2);
    }""")
    await pg.click('#modePlay')
    await pg.wait_for_selector('.babyCare button', timeout=5000)
    await pg.wait_for_timeout(200)
    deco = await pg.evaluate("""() => {
      document.getElementById('modeDecorate').click();
      return document.querySelectorAll('.babyCare').length;
    }""")
    check(browser_name + ' care card is hidden in Decorate', deco == 0)
    await pg.click('#modePlay')
    await pg.wait_for_selector('.babyCare')
    if browser_name == 'chromium':
        await pg.set_viewport_size({'width': 820, 'height': 1180})
        await pg.wait_for_timeout(300)
        await dismiss(pg)
        await pg.evaluate("""() => {
          const crib = __store.get().rooms.nursery.items.find(i => i.kind === 'crib');
          const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
          __cam.set((crib ? crib.x : 1170) - vw / 2);
        }""")
        await pg.wait_for_timeout(200)
        await pg.screenshot(path=os.path.join(OUT, 'baby-nursery-820x1180.png'))
        await pg.evaluate("""() => {
          const kid = __store.get().characters[0];
          const now = Date.now();
          __store.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 600, y: 540, seat: null });
          __store.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 628, y: 430, now });
          __store.dispatch({ type: 'baby/care', care: 'rock', now });
          const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
          __cam.set(600 - vw / 2);
        }""")
        await pg.wait_for_timeout(120)
        await pg.screenshot(path=os.path.join(OUT, 'baby-held-rock-820x1180.png'))
        await pg.set_viewport_size({'width': 390, 'height': 844})
        await pg.wait_for_timeout(300)
        await dismiss(pg)
        await pg.evaluate("""() => {
          const s = __store;
          s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 1170, y: 480, now: Date.now() });
          s.dispatch({ type: 'baby/place', room: 'nursery', x: 1170, y: 480, spot: 'crib', bed: 'crib-1', seat: null, now: Date.now() });
          const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 480;
          const crib = s.get().rooms.nursery.items.find(i => i.id === 'crib-1');
          __cam.set((crib ? crib.x : 1170) - vw / 2);
        }""")
        await pg.wait_for_timeout(200)
        await pg.screenshot(path=os.path.join(OUT, 'baby-nursery-390x844.png'))
        await pg.evaluate("""() => {
          const kid = __store.get().characters[0];
          const now = Date.now();
          __store.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 600, y: 540, seat: null });
          __store.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 628, y: 430, now });
          __store.dispatch({ type: 'baby/care', care: 'rock', now });
          const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 480;
          __cam.set(600 - vw / 2);
        }""")
        await pg.wait_for_timeout(120)
        await pg.screenshot(path=os.path.join(OUT, 'baby-held-rock-390x844.png'))
        await pg.set_viewport_size({'width': 1024, 'height': 768})
        await pg.wait_for_timeout(250)
        await dismiss(pg)
    # Put her on the mat, then drag in Play and in Decorate.
    await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({ type: 'room/switch', room: 'nursery' });
      if (!s.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
        s.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 1700, y: 540, flip: false, z: 8, scale: 1 } });
      const rocker = s.get().rooms.nursery.items.find(i => i.id === 'rocker-3');
      if (rocker) s.dispatch({ type: 'item/move', room: 'nursery', id: 'rocker-3', x: 1450, y: 540 });
      s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 1000, y: 540, now: Date.now() });
      s.dispatch({ type: 'baby/place', room: 'nursery', x: 1000, y: 540, spot: 'mat', bed: null, seat: null, now: Date.now() });
      document.getElementById('modePlay').click();
      const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
      __cam.set(1080 - vw / 2);
    }""")
    await pg.wait_for_timeout(200)
    baby = await center(pg, '.baby')
    crib = await center(pg, '.item[data-id="crib-1"]')
    if baby and crib:
        await drag(pg, (baby['x'], baby['top'] + 30), (crib['x'], crib['top'] + 40))
    laid = await pg.evaluate("() => { const b = __store.get().baby; return b && { spot: b.spot, bed: b.bed || '' }; }")
    check(browser_name + ' play drag lies her in the crib', laid and laid['spot'] == 'crib' and laid['bed'] == 'crib-1', str(laid))
    await pg.evaluate("""() => {
      __store.dispatch({ type: 'baby/place', room: 'nursery', x: 1280, y: 540, spot: 'mat', bed: null, seat: null, now: Date.now() });
      const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
      __cam.set(1360 - vw / 2);
    }""")
    await pg.wait_for_timeout(200)
    baby = await center(pg, '.baby')
    rock = await center(pg, '.item[data-id="rocker-3"]')
    if baby and rock:
        await drag(pg, (baby['x'], baby['top'] + 30), (rock['x'], rock['top'] + 40))
    sat = await pg.evaluate("() => { const b = __store.get().baby; return b && b.seat ? b.seat.pose : ''; }")
    check(browser_name + ' play drag sits her in the rocker', sat == 'sit', str(sat))
    await pg.evaluate("""() => {
      __store.dispatch({ type: 'baby/place', room: 'nursery', x: 1540, y: 540, spot: 'mat', bed: null, seat: null, now: Date.now() });
      const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
      __cam.set(1620 - vw / 2);
    }""")
    await pg.wait_for_timeout(200)
    baby = await center(pg, '.baby')
    bed = await center(pg, '.item[data-id="qa-bed"]')
    if baby and bed:
        await drag(pg, (baby['x'], baby['top'] + 30), (bed['x'], bed['top'] + 40))
    lie = await pg.evaluate("() => { const b = __store.get().baby; return b && b.seat ? b.seat.pose : ''; }")
    check(browser_name + ' play drag lies her on the bed', lie == 'lie', str(lie))
    await pg.evaluate("""() => {
      __store.dispatch({ type: 'baby/place', room: 'nursery', x: 1000, y: 540, spot: 'mat', bed: null, seat: null, now: Date.now() });
      document.getElementById('modeDecorate').click();
      const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 800;
      __cam.set(1080 - vw / 2);
    }""")
    await pg.wait_for_timeout(200)
    baby = await center(pg, '.baby')
    crib = await center(pg, '.item[data-id="crib-1"]')
    if baby and crib:
        await drag(pg, (baby['x'], baby['top'] + 20), (crib['x'], crib['top'] + 40))
    deco_drop = await pg.evaluate("() => { const b = __store.get().baby; return b && { spot: b.spot, bed: b.bed || '', seat: !!b.seat }; }")
    check(browser_name + ' decorate drag does not lie or sit her', deco_drop and deco_drop['spot'] == 'mat' and not deco_drop['bed'] and not deco_drop['seat'], str(deco_drop))
    await pg.click('#modePlay')
    await pg.wait_for_selector('.babyCare')
    for w, h in SIZES:
        await pg.set_viewport_size({'width': w, 'height': h})
        await pg.wait_for_timeout(280)
        await dismiss(pg)
        if not await pg.locator('.babyCare').count():
            await pg.click('#modePlay')
            await pg.wait_for_timeout(150)
        info = await buttons(pg)
        small = [b for b in (info or []) if b['w'] < 44 or b['h'] < 44]
        name = next((b for b in (info or []) if b['name']), None)
        burp = next((b for b in (info or []) if b['t'] == 'Burp'), None)
        wrapped = bool(name and burp and name['h'] > burp['h'] + 8)
        check(f'{browser_name} {w}x{h} care buttons are at least 44px', bool(info) and len(info) >= 4 and not small and not wrapped, str(info))
        if (w, h) == (844, 390):
            lay = await card_layout(pg)
            check(browser_name + ' 844x390 care card stays off the floor and her legs', lay and not lay['overFloor'] and not lay['overLegs'] and not lay['small'], str(lay))
        if (w, h) == (390, 844):
            hit = await pg.evaluate("""() => {
              const el = document.querySelector('.item[data-kind="crib-mobile"]');
              if (!el) return null;
              const cs = getComputedStyle(el, '::after');
              const stage = document.getElementById('stage');
              const sc = stage.getBoundingClientRect().width / stage.offsetWidth;
              return { w: parseFloat(cs.width) * sc, h: parseFloat(cs.height) * sc, pe: cs.pointerEvents, on: cs.content !== 'none' };
            }""")
            check(browser_name + ' portrait crib mobile hit is at least 44px', hit and hit['on'] and hit['pe'] == 'auto' and hit['w'] >= 44 and hit['h'] >= 44, str(hit))
    await cradle_check(pg, browser_name)
    left = await pg.evaluate("""() => {
      const s = __store;
      const kid = s.get().characters[0];
      s.dispatch({ type: 'room/switch', room: 'nursery' });
      s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 500, y: 540, seat: null });
      s.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 528, y: 430, now: Date.now() });
      s.dispatch({ type: 'char/move', id: kid.id, room: 'living', x: 800, y: 540, seat: null });
      const b = s.get().baby;
      return b && { spot: b.spot, holder: b.holder || '', room: b.room, x: Math.round(b.x), y: Math.round(b.y) };
    }""")
    check(browser_name + ' solo doll leaving the room puts her on the mat', left and left['spot'] == 'mat' and not left['holder'] and left['room'] == 'nursery' and left['x'] == 500 and left['y'] == 540, str(left))

async def main():
    check('this test does not point at the production Worker', not hits_prod(HOOD) and not hits_prod(WEB) and 'workers.dev' not in HOOD)
    if not os.path.isdir(OLD_DIST):
        check('old protocol-4 build is available', False, OLD_DIST)
        print(f"\n{sum(res.values())}/{len(res)} passed")
        return
    hood = server()
    old = None
    if not wait_port(HOOD_PORT):
        check('local hood started', False)
        stop(hood)
        print(f"\n{sum(res.values())}/{len(res)} passed")
        return
    check('local hood started', True)
    try:
        async with async_playwright() as p:
            for browser_name in ('chromium', 'webkit'):
                b = await getattr(p, browser_name).launch()
                ctx = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
                await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999');")
                pg = await ctx.new_page()
                errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                await solo_card(pg, browser_name)
                check(browser_name + ' solo page has no script errors', not errs, '; '.join(errs[:2]))
                await ctx.close()
                await b.close()

            b = await p.chromium.launch()
            async def mk():
                c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
                await c.add_init_script("localStorage.setItem('cozy-whatsnew','999');")
                return c
            A = await (await mk()).new_page()
            B = await (await mk()).new_page()
            a_err, b_err = [], []
            A.on('pageerror', lambda e: a_err.append(str(e)))
            B.on('pageerror', lambda e: b_err.append(str(e)))
            url = page_url(WEB)
            await A.goto(url, wait_until='domcontentloaded')
            await B.goto(url, wait_until='domcontentloaded')
            await dismiss(A); await dismiss(B)
            await tap(A, '#btnHood'); await A.click('[data-m="create"]'); await adult(A)
            await A.wait_for_selector('#newCode', timeout=8000)
            code = (await A.inner_text('#newCode')).strip()
            await A.click('.hoodSheet [data-m="close"]')
            await join(A, code, 'Sunny Bunny', True)
            await join(B, code, 'Bubbly Panda', False)
            await A.click('#mapWorld .mapHouse.mine')
            await A.wait_for_selector('body:not(.view-street) #stage')
            hid = await A.evaluate('__hood().myHouseId()')
            await B.click(f'.mapHouse[data-go="house:{hid}"]')
            await B.wait_for_selector('body:not(.view-street) #stage')
            await A.wait_for_timeout(300)
            await A.evaluate("""() => {
              const s = __store;
              s.dispatch({ type: 'room/switch', room: 'nursery' });
              if (!s.get().baby) s.dispatch({ type: 'baby/meet', now: Date.now() });
              __hood().setPresence({ where: 'house', houseId: __hood().myHouseId(), room: 'nursery', x: 600, y: 540, flip: false });
              const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 600;
              __cam.set(790 - vw / 2);
            }""")
            await B.evaluate("""(hid) => {
              __store.dispatch({ type: 'room/switch', room: 'nursery' });
              __hood().setPresence({ where: 'house', houseId: hid, room: 'nursery', x: 980, y: 540, flip: false });
              const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 600;
              __cam.set(790 - vw / 2);
            }""", hid)
            await B.wait_for_function("() => __store.get().baby && __store.get().baby.spot === 'crib'", timeout=8000)
            pid_a = await A.evaluate('__hood().pid')
            await A.evaluate("""() => {
              __store.dispatch({ type: 'baby/hold', holder: __hood().pid, room: 'nursery', x: 628, y: 430, now: Date.now() });
            }""")
            await B.wait_for_function("""(pid) => { const b = __store.get().baby; return b && b.spot === 'arms' && b.holder === pid; }""", arg=pid_a, timeout=8000)
            await B.wait_for_selector('.char.avatar.other', timeout=8000)
            guest = await card_layout(B)
            check('desktop guest care card stays off the floor and her legs', guest and not guest['overFloor'] and not guest['overLegs'] and not guest['small'] and guest['n'] >= 4, str(guest))
            await B.set_viewport_size({'width': 820, 'height': 1180})
            await B.wait_for_timeout(400)
            await B.evaluate("""() => {
              const vw = parseFloat(getComputedStyle(document.getElementById('stage')).width) || 600;
              __cam.set(790 - vw / 2);
            }""")
            await B.wait_for_timeout(250)
            boxes = await B.evaluate("""() => {
              const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width }; };
              return { baby: box(document.querySelector('.baby')), mine: box(document.querySelector('.char.avatar.mine')), other: box(document.querySelector('.char.avatar.other')) };
            }""")
            def dist(p, q):
                return ((p['x'] - q['x']) ** 2 + (p['y'] - q['y']) ** 2) ** 0.5
            near_holder = boxes['baby'] and boxes['other'] and boxes['mine'] and dist(boxes['baby'], boxes['other']) + 40 < dist(boxes['baby'], boxes['mine'])
            check("B draws her on A's avatar, not on herself", near_holder, str(boxes))
            for w, h in CRADLE_VIEWS:
                await B.set_viewport_size({'width': w, 'height': h})
                await B.wait_for_timeout(300)
                await frame_holder(B, '#stage .char.avatar.other')
                await B.wait_for_timeout(80)
                guest_hold = await B.evaluate(CRADLE_JS, '#stage .char.avatar.other')
                check(f'B {w}x{h} sees the cradle on A, on the torso and off the head', bool(guest_hold and guest_hold.get('ok')), str(guest_hold))
            await B.set_viewport_size({'width': 820, 'height': 1180})
            await B.wait_for_timeout(200)
            await frame_holder(B, '#stage .char.avatar.other')
            await B.wait_for_timeout(80)
            await B.screenshot(path=os.path.join(OUT, 'baby-b-sees-a-holding-820x1180.png'))
            word = await B.evaluate("() => (document.querySelector('.babyWord') || {}).textContent || ''")
            check('B sees the care card in Play', word in ('Cozy', 'Happy'))
            await A.click('#btnMap')
            await A.wait_for_selector('body.view-map', timeout=8000)
            await B.wait_for_function("() => __store.get().baby && __store.get().baby.spot === 'mat' && !__store.get().baby.holder", timeout=8000)
            check('when A leaves the house, B sees her put down', True)
            await B.evaluate("""() => { __store.dispatch({ type: 'baby/hold', holder: __hood().pid, room: 'nursery', x: 1008, y: 430, now: Date.now() }); }""")
            await B.wait_for_function("() => { const b = __store.get().baby; return b && b.spot === 'arms' && b.holder === __hood().pid; }", timeout=8000)
            toasted = await B.evaluate("() => [...document.querySelectorAll('.toast')].some(t => (t.textContent || '').indexOf('cuddling') >= 0)")
            check('B can take her after A leaves, with no cuddling toast', not toasted)
            # B is holding. Closing her screen must drop the baby for A.
            await A.click('#mapWorld .mapHouse.mine')
            await A.wait_for_selector('body:not(.view-street) #stage')
            await A.evaluate("""() => { __store.dispatch({ type: 'room/switch', room: 'nursery' }); }""")
            await B.close()
            await A.wait_for_function("() => { const b = __store.get().baby; return b && b.spot === 'mat' && !b.holder; }", timeout=8000)
            check('when the holder disconnects, A sees her on the mat', True)

            old = old_web()
            check('old client server started', wait_port(OLD_PORT))
            old_ctx = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
            await old_ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999');")
            O = await old_ctx.new_page()
            o_err = []
            O.on('pageerror', lambda e: o_err.append(str(e)))
            await O.goto(page_url(f'http://127.0.0.1:{OLD_PORT}/kids-house-game/'), wait_until='domcontentloaded')
            await dismiss(O)
            await join(O, code, 'Sparkle Kitty', False)
            await O.click(f'.mapHouse[data-go="house:{hid}"]')
            await O.wait_for_selector('body:not(.view-street) #stage')
            await A.evaluate("""() => {
              __store.dispatch({ type: 'room/switch', room: 'nursery' });
              __hood().setPresence({ where: 'house', houseId: __hood().myHouseId(), room: 'nursery', x: 600, y: 540, flip: false });
              __store.dispatch({ type: 'baby/hold', holder: __hood().pid, room: 'nursery', x: 628, y: 430, now: Date.now() });
            }""")
            await A.wait_for_timeout(800)
            old_view = await O.evaluate("""() => {
              const s = __store.get();
              return { baby: 'baby' in s, crib: s.rooms.nursery.items.some(i => i.kind === 'crib'), living: s.rooms.living.items.length, sprite: document.querySelectorAll('.baby').length, hood: document.body.classList.contains('mode-hood') };
            }""")
            await O.evaluate("""() => { __store.dispatch({ type: 'item/add', room: 'living', item: { id: 'old-keep', kind: 'plant', x: 500, y: 540, flip: false, z: 3, scale: 1 } }); }""")
            await A.wait_for_timeout(600)
            kept = await A.evaluate("""() => { const s = __store.get(); return { baby: !!(s.baby && s.baby.name), edit: s.rooms.living.items.some(i => i.id === 'old-keep'), crib: s.rooms.nursery.items.some(i => i.kind === 'crib') }; }""")
            check('old protocol-4 client keeps the house and never draws the baby', old_view and old_view['hood'] and old_view['crib'] and old_view['living'] > 0 and not old_view['baby'] and old_view['sprite'] == 0 and not o_err, str(old_view) + ' ' + '; '.join(o_err[:2]))
            check('old client edit does not wipe the baby on the new server', kept and kept['baby'] and kept['edit'] and kept['crib'], str(kept))
            check('new clients have no script errors', not a_err and not b_err, '; '.join((a_err + b_err)[:2]))
            await b.close()
    finally:
        stop(old)
        stop(hood)
    print(f"\n{sum(res.values())}/{len(res)} passed")
    if not all(res.values()):
        sys.exit(1)

asyncio.run(main())
