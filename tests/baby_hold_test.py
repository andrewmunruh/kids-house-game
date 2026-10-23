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

CRADLE_VIEWS = [(1180, 820), (820, 1180), (390, 844), (844, 390)]
# Hold band in the 120×192 doll box: below the chin, across the torso and the arms.
# Visible painted pixels, not the slot: 80–90% of that width, inside the band, off the head.
CRADLE_JS = """(sel) => {
  const holder = document.querySelector(sel);
  const baby = document.querySelector('#stage .baby');
  if (!holder || !baby) return { ok: false, why: 'missing' };
  const img = baby.querySelector('img.artimg');
  if (!img || !img.complete || !img.naturalWidth) return { ok: false, why: 'art' };
  const b = holder.getBoundingClientRect();
  if (b.width < 2) return { ok: false, why: 'offscreen' };
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
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  let data;
  try { data = ctx.getImageData(0, 0, canvas.width, canvas.height).data; }
  catch (e) { return { ok: false, why: 'canvas' }; }
  const iw = canvas.width, ih = canvas.height;
  let minx = iw, miny = ih, maxx = -1, maxy = -1;
  for (let y = 0; y < ih; y++) {
    const row = y * iw * 4;
    for (let x = 0; x < iw; x++) {
      if (data[row + x * 4 + 3] >= 40) {
        if (x < minx) minx = x;
        if (y < miny) miny = y;
        if (x > maxx) maxx = x;
        if (y > maxy) maxy = y;
      }
    }
  }
  if (maxx < 0) return { ok: false, why: 'empty' };
  const spin = baby.querySelector('.babySpin');
  if (!spin) return { ok: false, why: 'spin' };
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;width:0;height:0;margin:0;padding:0;border:0;pointer-events:none';
  spin.appendChild(probe);
  function at(u, v) {
    probe.style.left = (u * 100) + '%';
    probe.style.top = (v * 100) + '%';
    const r = probe.getBoundingClientRect();
    return [r.left, r.top];
  }
  const corners = [at(minx / iw, miny / ih), at((maxx + 1) / iw, miny / ih), at((maxx + 1) / iw, (maxy + 1) / ih), at(minx / iw, (maxy + 1) / ih)];
  probe.remove();
  const tp = torso.map(p => map(p[0], p[1]));
  const hp = head.map(p => map(p[0], p[1]));
  const axisA = map(16, 98), axisB = map(104, 98);
  const ax = axisB[0] - axisA[0], ay = axisB[1] - axisA[1];
  const alen = Math.hypot(ax, ay) || 1;
  let lo = 1e9, hi = -1e9;
  for (const p of corners) {
    const t = ((p[0] - axisA[0]) * ax + (p[1] - axisA[1]) * ay) / (alen * alen);
    if (t < lo) lo = t;
    if (t > hi) hi = t;
  }
  const extent = (hi - lo) * alen;
  const frac = extent / alen;
  const outside = corners.filter(p => !pip(tp, p[0], p[1]) && distEdge(tp, p[0], p[1]) > 2.5);
  let overlap = false;
  for (const p of corners) if (pip(hp, p[0], p[1])) overlap = true;
  for (const p of hp) if (pip(corners, p[0], p[1])) overlap = true;
  for (let i = 0; i < 4 && !overlap; i++) for (let k = 0; k < 4; k++) if (hit(corners[i], corners[(i + 1) % 4], hp[k], hp[(k + 1) % 4])) overlap = true;
  const xs = corners.map(p => p[0]), ys = corners.map(p => p[1]);
  const artL = Math.min.apply(null, xs), artR = Math.max.apply(null, xs), artT = Math.min.apply(null, ys), artB = Math.max.apply(null, ys);
  const id = holder.dataset.cid || holder.dataset.pid || '';
  const front = id ? document.querySelector('.cradle-front[data-for="' + id + '"]') : null;
  function shown(node) {
    if (!node) return false;
    const st = getComputedStyle(node);
    if (st.display === 'none' || st.visibility === 'hidden') return false;
    const r = node.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  }
  const inDoll = [...holder.querySelectorAll('.arm')];
  const inFront = front ? [...front.querySelectorAll('.arm')] : [];
  const visible = inDoll.concat(inFront).filter(shown);
  const hanging = [...holder.querySelectorAll('.arm.hang, .hand.hang')];
  const hangingHidden = hanging.length >= 2 && hanging.every(function (n) { return !shown(n); });
  const under = visible.filter(function (n) { return holder.contains(n); });
  const over = visible.filter(function (n) { return front && front.contains(n); });
  const overR = over[0] ? over[0].getBoundingClientRect() : null;
  const overOn = !!(overR && overR.width > 4 && overR.left < artR - 2 && overR.right > artL + 2 && overR.top < artB - 2 && overR.bottom > artT + 2);
  const lying = pose === 'lie';
  const armsOk = lying
    ? visible.length === 1 && under.length === 1 && over.length === 0 && hangingHidden && visible.every(function (n) { return n.classList.contains('cradle'); })
    : visible.length === 2 && under.length === 1 && over.length === 1 && hangingHidden && overOn && visible.every(function (n) { return n.classList.contains('cradle'); });
  const handNodes = [...holder.querySelectorAll('.cradle-hand')].concat(front ? [...front.querySelectorAll('.cradle-hand')] : []);
  const handPts = handNodes.map(function (n) {
    const r = n.getBoundingClientRect();
    return [(r.left + r.right) / 2, (r.top + r.bottom) / 2];
  });
  const handsIn = handPts.length === (lying ? 1 : 2) && handPts.every(function (p) { return pip(corners, p[0], p[1]); });
  const crown = at((minx + maxx) / 2 / iw, miny / ih);
  const soles = at((minx + maxx) / 2 / iw, (maxy + 1) / ih);
  const headUp = crown[1] <= soles[1] + 8;
  const chibi = !!holder.querySelector('svg[data-chibi]');
  let sizeRatio = frac;
  let sizeOk = frac >= 0.80 && frac <= 0.90;
  if (chibi) {
    const cA = map(39.6, 129), cB = map(80.4, 129);
    const chest = Math.hypot(cB[0] - cA[0], cB[1] - cA[1]) || 1;
    sizeRatio = extent / chest;
    const mid = [(artL + artR) / 2, (artT + artB) / 2];
    const chestBox = [[36, 108], [84, 108], [84, 148], [36, 148]].map(function (p) { return map(p[0], p[1]); });
    const onChest = pip(chestBox, mid[0], mid[1]) || distEdge(chestBox, mid[0], mid[1]) < 6;
    sizeOk = sizeRatio >= 0.82 && sizeRatio <= 1.12 && onChest;
  }
  const spanX = Math.max(1, maxx - minx), spanY = Math.max(1, maxy - miny);
  const face = [
    at((minx + spanX * 0.18) / iw, (miny + spanY * 0.04) / ih),
    at((minx + spanX * 0.82) / iw, (miny + spanY * 0.04) / ih),
    at((minx + spanX * 0.82) / iw, (miny + spanY * 0.26) / ih),
    at((minx + spanX * 0.18) / iw, (miny + spanY * 0.26) / ih),
  ];
  function nearFace(x, y, pad) {
    if (pip(face, x, y)) return true;
    return distEdge(face, x, y) <= pad;
  }
  let armFace = false;
  for (let ai = 0; ai < visible.length && !armFace; ai++) {
    const shapes = [...visible[ai].querySelectorAll('path, circle, ellipse')];
    for (let si = 0; si < shapes.length && !armFace; si++) {
      const sh = shapes[si];
      const sw = parseFloat(sh.getAttribute('stroke-width') || '0');
      const m = sh.getScreenCTM();
      const sc = m ? Math.hypot(m.a, m.c) : 1;
      const pad = Math.max(1.5, sw * sc * 0.35);
      if (sh.tagName === 'circle' || sh.tagName === 'ellipse') {
        const r = sh.getBoundingClientRect();
        if (nearFace((r.left + r.right) / 2, (r.top + r.bottom) / 2, Math.max(pad, Math.min(r.width, r.height) / 2))) armFace = true;
      } else if (sh.getTotalLength) {
        const len = sh.getTotalLength();
        const steps = 12;
        for (let i = 0; i <= steps && !armFace; i++) {
          const p = sh.getPointAtLength(len * i / steps);
          if (!m) continue;
          const x = m.a * p.x + m.c * p.y + m.e;
          const y = m.b * p.x + m.d * p.y + m.f;
          if (nearFace(x, y, pad)) armFace = true;
        }
      }
    }
  }
  const cradle = baby.classList.contains('baby-cradle');
  let why = '';
  if (outside.length) why = 'torso';
  else if (overlap) why = 'head';
  else if (!sizeOk) why = 'size';
  else if (!cradle) why = 'class';
  else if (!armsOk) why = 'arms';
  else if (!handsIn) why = 'hands';
  else if (!headUp) why = 'headup';
  else if (armFace) why = 'face';
  return {
    ok: outside.length === 0 && !overlap && sizeOk && cradle && armsOk && handsIn && headUp && !armFace,
    why, pose, lieFlip, doll: Math.round(doll * 100) / 100, chibi,
    arms: visible.length, hang: hanging.length, under: under.length, over: over.length,
    hands: handPts.length, headUp, armFace,
    frac: Math.round(frac * 1000) / 1000,
    chest: Math.round(sizeRatio * 1000) / 1000,
    px: Math.round(extent * 10) / 10,
    torso: Math.round(alen * 10) / 10,
    art: { w: Math.round((artR - artL) * 10) / 10, h: Math.round((artB - artT) * 10) / 10 },
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

async def closeup(pg, name):
    box = await pg.evaluate("""() => {
      const holder = document.querySelector('#stage .char.holding');
      const nodes = [...document.querySelectorAll('#stage .baby.baby-cradle, #stage .cradle-front, #stage .arm.cradle')];
      let l = 1e9, t = 1e9, r = -1e9, b = -1e9, n = 0;
      for (const el of nodes) {
        const q = el.getBoundingClientRect();
        if (q.width < 2 || q.height < 2) continue;
        l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
        n += 1;
      }
      if (holder) {
        const q = holder.getBoundingClientRect();
        if (q.width > 2) { l = Math.min(l, q.left); r = Math.max(r, q.right); t = Math.min(t, q.top); }
      }
      if (!n) return null;
      const pad = 18;
      const x = Math.max(0, Math.floor(l - pad));
      const y = Math.max(0, Math.floor(t - pad));
      return {
        x, y,
        width: Math.max(1, Math.min(window.innerWidth - x, Math.ceil(r - l + pad * 2))),
        height: Math.max(1, Math.min(window.innerHeight - y, Math.ceil(b - t + pad * 2))),
      };
    }""")
    if box and box['width'] > 24 and box['height'] > 24:
        await pg.screenshot(path=os.path.join(OUT, name), clip=box)

async def chibi_putdown(pg, browser_name):
    """Hold and release a chibi at the phone size where sleeves used to vanish."""
    await pg.set_viewport_size({'width': 430, 'height': 932})
    await pg.wait_for_timeout(280)
    await dismiss(pg)
    info = await pg.evaluate("""() => {
      const s = __store;
      const kid = s.get().characters[0];
      const look2 = __avatar.look2FromLegacy(kid);
      s.dispatch({ type: 'room/switch', room: 'nursery' });
      s.dispatch({ type: 'char/update', id: kid.id, patch: { size: 'kid', flip: false, look2 } });
      s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 700, y: 540, seat: null });
      if (!s.get().baby) s.dispatch({ type: 'baby/meet', now: Date.now() });
      const shown = (n) => {
        const st = getComputedStyle(n);
        if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) return false;
        const r = n.getBoundingClientRect();
        return r.width > 1 && r.height > 1;
      };
      let bad = 0;
      let last = null;
      for (let i = 0; i < 8; i++) {
        s.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 700, y: 480, now: Date.now() });
        s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 700, y: 540, now: Date.now() });
        const holder = document.querySelector('#stage .char');
        const hang = holder ? [...holder.querySelectorAll('.arm.hang')] : [];
        const sleeves = holder ? [...holder.querySelectorAll('.arm.sleeve')] : [];
        const mittens = holder ? [...holder.querySelectorAll('.arm.hang path.hand')] : [];
        last = {
          hang: hang.length,
          hangShown: hang.filter(shown).length,
          sleeves: sleeves.length,
          sleevesShown: sleeves.filter(shown).length,
          mittens: mittens.length,
          mittensShown: mittens.filter(shown).length,
          cradle: document.querySelectorAll('.arm.cradle, .cradle-front').length,
          holding: !!(holder && holder.classList.contains('holding')),
          chibi: !!(holder && holder.querySelector('svg[data-chibi]')),
        };
        if (last.hang !== 4 || last.hangShown !== 4 || last.sleeves !== 2 || last.sleevesShown !== 2 || last.mittensShown < 2 || last.cradle !== 0 || last.holding || !last.chibi) bad++;
      }
      return { bad, last };
    }""")
    check(browser_name + ' 430x932 chibi put-down brings back 4 arms, sleeves, and mittens', bool(info) and info.get('bad') == 0, str(info))

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
            cases.append((size, 'stand', None, False, False, False))
            cases.append((size, 'sit', 'rocker-3', False, False, False))
            cases.append((size, 'lie', 'qa-bed', False, False, False))
        cases.append(('kid', 'stand', None, False, True, False))
        cases.append(('kid', 'lie', 'qa-bed', True, False, False))
        cases.append(('kid', 'stand', None, False, False, True))
        cases.append(('kid', 'sit', 'rocker-3', False, False, True))
        cases.append(('kid', 'lie', 'qa-bed', False, False, True))
        cases.append(('kid', 'stand', None, False, True, True))
        for size, pose, item, bed_flip, face_left, chibi in cases:
            await pg.evaluate("""(arg) => {
              const s = __store;
              const kid = s.get().characters[0];
              const bed = s.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
              if (bed && !!bed.flip !== arg.bedFlip) s.dispatch({ type: 'item/flip', room: 'nursery', id: 'qa-bed' });
              const look2 = arg.chibi ? __avatar.look2FromLegacy(kid) : null;
              s.dispatch({ type: 'char/update', id: kid.id, patch: { size: arg.size, flip: arg.faceLeft, look2 } });
              const seat = arg.item ? { item: arg.item, pose: arg.pose, n: 0 } : null;
              s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 700, y: 540, seat });
              s.dispatch({ type: 'baby/hold', holder: kid.id, room: 'nursery', x: 700, y: 480, now: Date.now() });
              const play = document.getElementById('modePlay');
              if (play) play.click();
            }""", {'size': size, 'pose': pose, 'item': item, 'bedFlip': bed_flip, 'faceLeft': face_left, 'chibi': chibi})
            try:
                await pg.wait_for_function("""() => {
                  const img = document.querySelector('#stage .baby img.artimg');
                  return !!(img && img.complete && img.naturalWidth > 0);
                }""", timeout=8000)
            except Exception:
                pass
            await frame_holder(pg, sel)
            await pg.wait_for_timeout(40)
            info = await pg.evaluate(CRADLE_JS, sel)
            tag = f'{browser_name} {w}x{h} {size} {pose}'
            if chibi: tag += ' chibi'
            if bed_flip: tag += ' flipped bed'
            if face_left: tag += ' facing left'
            check(tag + ' cradle stays on the torso and off the head', bool(info and info.get('ok')), str(info))
            if browser_name == 'chromium' and size == 'kid' and not face_left and not bed_flip and not chibi and (pose == 'stand' or (w, h) == (820, 1180) or (w, h) == (1180, 820)):
                name = {'stand': 'held', 'sit': 'sit', 'lie': 'lie'}[pose]
                await pg.screenshot(path=os.path.join(OUT, f'after-{w}x{h}-{name}.png'))
                if (w, h) == (1180, 820):
                    await closeup(pg, f'arms-1180x820-{pose}.png')
            if browser_name == 'chromium' and (w, h) == (1180, 820) and size == 'kid' and chibi and not face_left and not bed_flip:
                if pose == 'stand':
                    await pg.screenshot(path=os.path.join(OUT, 'after-1180x820-chibi.png'))
                await closeup(pg, f'arms-1180x820-chibi-{pose}.png')
            if browser_name == 'chromium' and (w, h) == (1180, 820) and size == 'kid' and face_left and pose == 'stand' and not chibi:
                await closeup(pg, 'arms-1180x820-flipped.png')
            if browser_name == 'chromium' and (w, h) == (820, 1180) and size == 'kid' and bed_flip and not chibi:
                await pg.screenshot(path=os.path.join(OUT, 'after-820x1180-lie-flip.png'))
            if browser_name == 'chromium' and (w, h) == (820, 1180) and pose == 'stand' and size in ('little', 'adult') and not face_left and not chibi:
                await pg.screenshot(path=os.path.join(OUT, f'after-820x1180-{size}.png'))
    await chibi_putdown(pg, browser_name)
    if browser_name == 'chromium':
        await pg.set_viewport_size({'width': 1180, 'height': 820})
        await pg.wait_for_timeout(200)
    released = await pg.evaluate("""() => {
      const s = __store;
      const kid = s.get().characters[0];
      s.dispatch({ type: 'char/update', id: kid.id, patch: { size: 'kid', flip: false, look2: null } });
      s.dispatch({ type: 'char/move', id: kid.id, room: 'nursery', x: 700, y: 540, seat: null });
      s.dispatch({ type: 'baby/hold', holder: null, room: 'nursery', x: 700, y: 540, now: Date.now() });
      const holder = document.querySelector('#stage .char');
      const shown = (n) => {
        const st = getComputedStyle(n);
        if (st.display === 'none' || st.visibility === 'hidden') return false;
        const r = n.getBoundingClientRect();
        return r.width > 1 && r.height > 1;
      };
      const hang = holder ? [...holder.querySelectorAll('.arm.hang')] : [];
      return {
        hang: hang.length,
        hangShown: hang.filter(shown).length,
        cradle: document.querySelectorAll('.arm.cradle, .cradle-front').length,
        holding: !!(holder && holder.classList.contains('holding')),
      };
    }""")
    check(browser_name + ' letting go brings the hanging arms back', released and released['hang'] == 2 and released['hangShown'] == 2 and released['cradle'] == 0 and not released['holding'], str(released))

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
            await pg.evaluate("""() => {
              __store.dispatch({ type: 'room/switch', room: 'nursery' });
              const vw = parseFloat(document.querySelector('.stage').style.width) || 800;
              __cam.set(470 - vw / 2);
            }""")
            await pg.wait_for_timeout(200)
            mobile = await pg.evaluate("""() => {
              const card = document.querySelector('.babyCare');
              const el = document.querySelector('.item[data-kind="crib-mobile"]');
              if (!card || card.hidden || !el) return null;
              const c = card.getBoundingClientRect();
              const m = el.getBoundingClientRect();
              const overlap = m.right > c.left + 1 && m.left < c.right - 1 && m.bottom > c.top + 1 && m.top < c.bottom - 1;
              const stage = document.getElementById('stage').getBoundingClientRect();
              return {
                overlap, mw: Math.round(m.width), mh: Math.round(m.height),
                mt: Math.round(m.top), mb: Math.round(m.bottom),
                ct: Math.round(c.top), cb: Math.round(c.bottom),
                stageTop: Math.round(stage.top),
                on: m.width > 20 && m.height > 20 && m.left < innerWidth && m.right > 0,
              };
            }""")
            check(browser_name + ' 844x390 crib mobile stays clear of the care card', mobile and mobile['on'] and not mobile['overlap'] and mobile['mt'] >= mobile['cb'] - 1, str(mobile))
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
                try:
                    await B.wait_for_function("""() => {
                      const img = document.querySelector('#stage .baby img.artimg');
                      return !!(img && img.complete && img.naturalWidth > 0);
                    }""", timeout=8000)
                except Exception:
                    pass
                guest_hold = await B.evaluate(CRADLE_JS, '#stage .char.avatar.other')
                check(f'B {w}x{h} sees the cradle on A, on the torso and off the head', bool(guest_hold and guest_hold.get('ok')), str(guest_hold))
            await B.set_viewport_size({'width': 1180, 'height': 820})
            await B.wait_for_timeout(200)
            await frame_holder(B, '#stage .char.avatar.other')
            await B.wait_for_timeout(80)
            await B.screenshot(path=os.path.join(OUT, 'baby-b-sees-a-holding-1180x820.png'))
            await closeup(B, 'arms-1180x820-guest.png')
            await B.set_viewport_size({'width': 820, 'height': 1180})
            await B.wait_for_timeout(200)
            await frame_holder(B, '#stage .char.avatar.other')
            await B.wait_for_timeout(80)
            await B.screenshot(path=os.path.join(OUT, 'baby-b-sees-a-holding-820x1180.png'))
            await B.set_viewport_size({'width': 1180, 'height': 820})
            await B.wait_for_timeout(200)
            await A.evaluate("""() => {
              if (!__store.get().rooms.nursery.items.some(i => i.id === 'qa-bed'))
                __store.dispatch({ type: 'item/add', room: 'nursery', item: { id: 'qa-bed', kind: 'bed', x: 1400, y: 540, flip: false, z: 8, scale: 1 } });
            }""")
            await B.wait_for_function("() => __store.get().rooms.nursery.items.some(i => i.id === 'qa-bed')", timeout=8000)
            for label, pose, flip in (('sit', 'sit', False), ('lie', 'lie', False), ('flipped', 'stand', True)):
                await A.evaluate("""(arg) => {
                  const h = __hood();
                  const room = __store.get().rooms.nursery;
                  let x = 600, y = 540, seat = null;
                  if (arg.pose === 'sit') {
                    const rocker = room.items.find(i => i.kind === 'rocker');
                    seat = { id: rocker.id, pose: 'sit', n: 0 };
                    x = rocker.x; y = rocker.y;
                  } else if (arg.pose === 'lie') {
                    const bed = room.items.find(i => i.id === 'qa-bed');
                    seat = { id: bed.id, pose: 'lie', n: 0 };
                    x = bed.x; y = bed.y;
                  }
                  h.setPresence({ where: 'house', houseId: h.myHouseId(), room: 'nursery', x, y, flip: !!arg.flip, seat });
                }""", {'pose': pose, 'flip': flip})
                if pose == 'sit':
                    await B.wait_for_selector('#stage .char.avatar.other.holding.pose-sit', timeout=8000)
                elif pose == 'lie':
                    await B.wait_for_selector('#stage .char.avatar.other.holding.pose-lie', timeout=8000)
                else:
                    await B.wait_for_function("""(flip) => {
                      const el = document.querySelector('#stage .char.avatar.other.holding');
                      return !!(el && !el.classList.contains('pose-sit') && !el.classList.contains('pose-lie') && el.classList.contains('flipped') === flip);
                    }""", arg=flip, timeout=8000)
                await frame_holder(B, '#stage .char.avatar.other')
                await B.wait_for_timeout(280)
                guest_pose = await B.evaluate(CRADLE_JS, '#stage .char.avatar.other')
                check(f'B sees A {label} with two cradle arms', bool(guest_pose and guest_pose.get('ok')), str(guest_pose))
                await closeup(B, f'arms-1180x820-guest-{label}.png')
            await A.evaluate("""() => {
              const h = __hood();
              h.setPresence({ where: 'house', houseId: h.myHouseId(), room: 'nursery', x: 600, y: 540, flip: false });
            }""")
            try:
                await B.wait_for_function("""() => {
                  const el = document.querySelector('#stage .char.avatar.other');
                  return !!(el && el.classList.contains('holding') && !el.classList.contains('pose-sit') && !el.classList.contains('pose-lie'));
                }""", timeout=8000)
            except Exception:
                pass
            await A.evaluate("""() => {
              const h = __hood();
              const look = h.players.get(h.pid).look;
              h.setLook(Object.assign({}, look, { look2: __avatar.look2FromLegacy(look) }));
            }""")
            try:
                await B.wait_for_selector('.char.avatar.other svg[data-chibi="1"]', timeout=8000)
            except Exception:
                pass
            await B.set_viewport_size({'width': 1180, 'height': 820})
            await B.wait_for_timeout(250)
            await frame_holder(B, '#stage .char.avatar.other')
            await B.wait_for_timeout(80)
            guest_chibi = await B.evaluate(CRADLE_JS, '#stage .char.avatar.other')
            check('B 1180x820 sees a chibi cradle on A, on the torso and off the head', bool(guest_chibi and guest_chibi.get('ok')), str(guest_chibi))
            await B.screenshot(path=os.path.join(OUT, 'baby-b-sees-a-chibi-1180x820.png'))
            await closeup(B, 'arms-1180x820-guest-chibi.png')
            for label, pose in (('chibi-sit', 'sit'), ('chibi-lie', 'lie')):
                await A.evaluate("""(pose) => {
                  const h = __hood();
                  const room = __store.get().rooms.nursery;
                  let x = 600, y = 540, seat = null;
                  if (pose === 'sit') {
                    const rocker = room.items.find(i => i.kind === 'rocker');
                    seat = { id: rocker.id, pose: 'sit', n: 0 };
                    x = rocker.x; y = rocker.y;
                  } else {
                    const bed = __store.get().rooms.nursery.items.find(i => i.id === 'qa-bed');
                    seat = { id: bed.id, pose: 'lie', n: 0 };
                    x = bed.x; y = bed.y;
                  }
                  h.setPresence({ where: 'house', houseId: h.myHouseId(), room: 'nursery', x, y, flip: false, seat });
                }""", pose)
                try:
                    await B.wait_for_selector('#stage .char.avatar.other.holding' + ('.pose-sit' if pose == 'sit' else '.pose-lie'), timeout=8000)
                except Exception:
                    pass
                await frame_holder(B, '#stage .char.avatar.other')
                await B.wait_for_timeout(280)
                guest_more = await B.evaluate(CRADLE_JS, '#stage .char.avatar.other')
                check(f'B sees A {label} with two cradle arms', bool(guest_more and guest_more.get('ok')), str(guest_more))
                await closeup(B, f'arms-1180x820-guest-{label}.png')
            await A.evaluate("""() => {
              const h = __hood();
              h.setPresence({ where: 'house', houseId: h.myHouseId(), room: 'nursery', x: 600, y: 540, flip: false });
            }""")
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
