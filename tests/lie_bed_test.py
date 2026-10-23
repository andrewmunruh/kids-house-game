# Lie pose on every painted bed. Head on the pillow, one rotation, both flips, all 7 sizes.
# Phone Play caps the zoom. A player's own avatar lies down too. Never talks to production.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from PIL import Image
from playwright.async_api import async_playwright
from testnav import tap

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

WEB = opt('--web', 'LIE_WEB', 'http://127.0.0.1:5173/kids-house-game/')
HOOD = opt('--hood', 'LIE_HOOD', 'http://127.0.0.1:8798')
SIZES = [(820, 1180), (1180, 820), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)]
SHOTS = {(820, 1180), (390, 844)}
OUT = os.environ.get('LIE_SHOTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(OUT, exist_ok=True)
ART = {
    'bed': 'assets/art/bedroom/bed.webp',
    'pack:wooden-bed': 'assets/art/bedroom/pack~wooden-bed.webp',
    'pack:checker-bed': 'assets/art/bedroom/pack~checker-bed.webp',
    'pack:bunk-bed': 'assets/art/bedroom/pack~bunk-bed.webp',
    'pack:canopy-bed': 'assets/art/bedroom/pack~canopy-bed.webp',
    'pack:cc-heart-bed': 'assets/art/bedroom/pack~cc-heart-bed.webp',
    'pack:cc-canopy-daybed': 'assets/art/bedroom/pack~cc-canopy-daybed.webp',
    'pack:wc-plaid-bed': 'assets/art/winter/pack~wc-plaid-bed.webp',
}
problems = []

def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

def pillow_ok(kind, c):
    r, g, b, a = c
    if a < 80: return False
    L = 0.3 * r + 0.5 * g + 0.2 * b
    if 'checker' in kind: return r > 200 and g > 160 and b < 170
    if 'wooden' in kind: return r > 180 and g > 140 and L > 150
    if 'bunk' in kind: return L > 170 and r > 170
    if 'heart' in kind: return L > 150 and b > 140
    # Red plaid quilt, cream pillow: the pillow is light but not the default red-white.
    if 'wc-plaid' in kind: return L > 170 and r > 175 and g > 155
    return L > 160 and r > 190

def sample_ok(kind, fx, fy, flip=False):
    # A flipped piece mirrors the painting, so the source pixel is the other side.
    sx = (1 - fx) if flip else fx
    im = Image.open(ART[kind]).convert('RGBA')
    w, h = im.size
    px = im.load()
    good = 0
    for dy in (-2, 0, 2):
        for dx in (-2, 0, 2):
            x = min(w - 1, max(0, int(sx * w) + dx))
            y = min(h - 1, max(0, int(fy * h) + dy))
            if pillow_ok(kind, px[x, y]): good += 1
    return good >= 5

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    await pg.wait_for_timeout(200)
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      if (window.__sky) { __sky.freeze(null); __sky.setChoice('day'); }
    }""")

PLACE = """async ({kind, flip, chibi}) => {
  const s = __store;
  s.dispatch({ type: 'room/switch', room: 'bedroom' });
  const id = 'lie-bed';
  const y = 520;
  const x = 1200;
  const room = s.get().rooms.bedroom;
  if (room.items.some(i => i.id === id)) s.dispatch({ type: 'item/delete', room: 'bedroom', id });
  s.dispatch({ type: 'item/add', room: 'bedroom', item: { id, kind, x, y, flip: false, z: 40, scale: 1 } });
  if (flip) s.dispatch({ type: 'item/flip', room: 'bedroom', id });
  const info = __lie.box(kind);
  const art = __lie.bedArt(kind);
  const head = __lie.lieOffset('head', false);
  const dx = (art.head.x - 0.5) * info.w - head.x;
  const dy = (art.head.y - 1) * info.h - head.y;
  const ax = x + (flip ? -dx : dx);
  const ay = y + dy;
  const kid = s.get().characters[0];
  if (kid) {
    const look2 = chibi ? { v: 1, hair: 'bob', skin: '#f1c27d', dress: 'party', dressC: '#f4a3c8' } : null;
    s.dispatch({ type: 'char/update', id: kid.id, patch: { look2, flip: false } });
    s.dispatch({ type: 'char/move', id: kid.id, room: 'bedroom', x: ax, y: ay, seat: { item: id, pose: 'lie', n: 0 } });
  }
  const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
  __cam.set(x - viewW / 2);
  return { id: kid ? kid.id : null, ax, ay, w: info.w, h: info.h };
}"""

MEASURE = """() => {
  const bed = document.querySelector('.item[data-id="lie-bed"]');
  const kid = document.querySelector('.char.pose-lie');
  const head = kid && kid.querySelector('[data-dollhead]');
  const front = document.querySelector('.seatFront[data-id="lie-bed"]');
  if (!bed || !kid || !head || !front) return { missing: true, bed: !!bed, kid: !!kid, head: !!head, front: !!front };
  const br = bed.getBoundingClientRect();
  const hr = head.getBoundingClientRect();
  const fx = (hr.left + hr.width / 2 - br.left) / br.width;
  const fy = (hr.top + hr.height / 2 - br.top) / br.height;
  const inner = kid.querySelector('.inner');
  const t = getComputedStyle(inner).transform;
  const m = t && t !== 'none' ? t.slice(7, -1).split(',').map(Number) : null;
  const svg = kid.querySelector('svg');
  const z = getComputedStyle(kid, '::after').content || '';
  const pillow = { x: fx, y: fy };
  front.style.pointerEvents = 'auto';
  const footX = br.left + br.width * (kid.classList.contains('pose-lie-r') ? 0.08 : 0.92);
  const footY = br.top + br.height * 0.6;
  const topDown = /canopy|heart|daybed/.test(front.className || '');
  const fx2 = topDown ? br.left + br.width * 0.5 : footX;
  const fy2 = topDown ? br.top + br.height * 0.9 : footY;
  const at = (x, y) => [...document.elementsFromPoint(x, y)].some(n => n.closest && n.closest('.seatFront'));
  const footFront = at(fx2, fy2);
  const pillowFront = at(hr.left + hr.width / 2, hr.top + hr.height / 2);
  const headHit = document.elementFromPoint(hr.left + hr.width / 2, hr.top + hr.height / 2);
  const leg = kid.querySelector('.leg');
  let bodyPass = null;
  if (leg) {
    const lr = leg.getBoundingClientRect();
    const hit = document.elementFromPoint(lr.left + lr.width / 2, lr.top + lr.height / 2);
    bodyPass = !(hit && hit.closest && hit.closest('.char'));
  }
  front.style.pointerEvents = '';
  const stage = document.querySelector('.stage').getBoundingClientRect();
  let widest = 0;
  document.querySelectorAll('.item').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 2) widest = Math.max(widest, r.width / stage.width);
  });
  return {
    fx, fy, pillow,
    matrix: m,
    svgTurn: svg && svg.outerHTML.indexOf('rotate(-78') >= 0,
    poseR: kid.classList.contains('pose-lie-r'),
    z,
    itemZ: parseInt(bed.style.zIndex, 10),
    charZ: parseInt(kid.style.zIndex, 10),
    frontZ: parseInt(front.style.zIndex, 10),
    footFront,
    pillowFront,
    headIsHead: !!(headHit && headHit.closest && headHit.closest('.dollhead')),
    bodyPass,
    viewW: parseFloat(document.querySelector('.stage').style.width) || 0,
    widest,
    chibi: kid.classList.contains('chibi'),
  };
}"""

async def run_sizes(pg):
    kinds = await pg.evaluate("() => __lie.lieBedKinds()")
    for w, h in SIZES:
        await pg.set_viewport_size({'width': w, 'height': h})
        await pg.wait_for_timeout(180)
        await dismiss(pg)
        short = min(w, h) < 500
        if short:
            await pg.click('#modePlay')
            await pg.wait_for_timeout(120)
        for kind in kinds:
            for flip in (False, True):
                for chibi in (False, True):
                    tag = f'{w}x{h} {kind} {"R" if flip else "L"} {"chibi" if chibi else "classic"}'
                    await pg.evaluate(PLACE, {'kind': kind, 'flip': flip, 'chibi': chibi})
                    await pg.wait_for_timeout(40)
                    m = await pg.evaluate(MEASURE)
                    if m.get('missing'):
                        fail(tag + ' missing ' + str(m))
                        continue
                    art = await pg.evaluate("(k) => __lie.bedArt(k)", kind)
                    pillow = art['pillow']
                    inside = (pillow['x'] - 0.02 <= m['fx'] <= pillow['x'] + pillow['w'] + 0.02
                              and pillow['y'] - 0.02 <= m['fy'] <= pillow['y'] + pillow['h'] + 0.02)
                    if flip:
                        inside = ((1 - (pillow['x'] + pillow['w'])) - 0.02 <= m['fx'] <= (1 - pillow['x']) + 0.02
                                  and pillow['y'] - 0.02 <= m['fy'] <= pillow['y'] + pillow['h'] + 0.02)
                    if not inside:
                        fail(tag + f' head {m["fx"]:.3f},{m["fy"]:.3f} outside pillow')
                    if not sample_ok(kind, m['fx'], m['fy'], flip):
                        fail(tag + f' head pixel is not pillow {m["fx"]:.3f},{m["fy"]:.3f}')
                    if m['svgTurn']:
                        fail(tag + ' svg still rotates -78')
                    if not m['matrix']:
                        fail(tag + ' inner has no transform')
                    else:
                        a, b = m['matrix'][0], m['matrix'][1]
                        det = a * m['matrix'][3] - b * m['matrix'][2]
                        if not flip and (abs(a) > 0.2 or abs(b) < 0.9):
                            fail(tag + f' not a flat lie {m["matrix"][:4]}')
                        if flip and det > -0.5:
                            fail(tag + f' flipped pose did not mirror {det:.2f}')
                    if bool(m['poseR']) != flip:
                        fail(tag + ' pose-lie-r ' + str(m['poseR']))
                    if 'z z' not in (m['z'] or ''):
                        fail(tag + ' missing z z ' + str(m['z']))
                    if not (m['itemZ'] < m['charZ'] < m['frontZ']):
                        fail(tag + f' layer {m["itemZ"]} {m["charZ"]} {m["frontZ"]}')
                    if not m['footFront']:
                        fail(tag + ' footboard is not in front')
                    if m['pillowFront']:
                        fail(tag + ' headboard overlay covers the pillow')
                    if not m['headIsHead']:
                        fail(tag + ' head is not the hit target')
                    if m['bodyPass'] is False:
                        fail(tag + ' body did not pass through')
                    if (w, h) in SHOTS and chibi:
                        slug = kind.replace('pack:', '')
                        await pg.locator('.stage').screenshot(path=f'{OUT}/bed-{slug}-{"flip" if flip else "face"}-{w}x{h}.png')
        if short:
            zoom = await pg.evaluate(MEASURE)
            if zoom.get('widest', 1) > 0.58:
                fail(f'{w}x{h} piece is {zoom.get("widest"):.2f} of the width')
            else:
                print(f'{w}x{h} widest piece {zoom.get("widest", 0):.2f} viewW {zoom.get("viewW")}', flush=True)
            if (w, h) == (390, 844):
                await pg.evaluate("() => { if (window.__frameHouseKid) __frameHouseKid(); }")
                await pg.wait_for_timeout(80)
                await pg.locator('.stage').screenshot(path=f'{OUT}/phone-zoom-390x844.png')
        print(f'{w}x{h} beds checked', flush=True)

async def own_avatar(browser):
    ctx = await browser.new_context(viewport={'width': 820, 'height': 1180}, has_touch=True, is_mobile=False, device_scale_factor=1)
    # Playwright sets navigator.webdriver, which skips the look sheet unless this flag is on.
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); window.__forceAvatarIntro = true;")
    pg = await ctx.new_page()
    pg.on('pageerror', lambda e: fail('avatar pageerror ' + str(e)))
    await pg.goto(WEB + ('&' if '?' in WEB else '?') + 'hood=' + HOOD, wait_until='domcontentloaded')
    await dismiss(pg)
    await tap(pg, '#btnHood')
    await pg.click('[data-m="create"]')
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
    await pg.wait_for_selector('#newCode')
    code = (await pg.inner_text('#newCode')).strip()
    await pg.click('[data-m="setup"]')
    await pg.click('.sugg button')
    await pg.click('.hoodSheet [data-m="close"]')
    await tap(pg, '#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code)
    await pg.click('#codeForm button')
    await pg.locator('.nicks button').first.click()
    await pg.click('[data-m="bring"]')
    await pg.wait_for_selector('.avDone', timeout=8000)
    await pg.click('.avSurprise')
    await pg.click('.avDone')
    await pg.wait_for_selector('#mapWorld .mapHouse.mine', timeout=8000)
    await pg.click('#mapWorld .mapHouse.mine')
    await pg.wait_for_selector('.stage .layer', timeout=8000)
    await pg.wait_for_timeout(400)
    await pg.evaluate(PLACE, {'kind': 'bed', 'flip': False, 'chibi': False})
    await pg.evaluate("""() => {
      const s = __store;
      const h = __hood();
      const me = h.myPresence();
      const info = __lie.box('bed');
      const art = __lie.bedArt('bed');
      const head = __lie.lieOffset('head', false);
      const dx = (art.head.x - 0.5) * info.w - head.x;
      const dy = (art.head.y - 1) * info.h - head.y;
      h.setPresence({ ...me, where: 'house', houseId: h.myHouseId(), room: 'bedroom', x: 1200 + dx, y: 520 + dy, flip: false, seat: { id: 'lie-bed', pose: 'lie', n: 0 } });
      if (window.__paint) __paint();
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1200 - viewW / 2);
    }""")
    await pg.wait_for_timeout(500)
    got = await pg.evaluate("""() => {
      const el = document.querySelector('.char.avatar.mine');
      if (!el) return { missing: true };
      const inner = el.querySelector('.inner');
      const t = getComputedStyle(inner).transform;
      const m = t && t !== 'none' ? t.slice(7, -1).split(',').map(Number) : null;
      const z = getComputedStyle(el, '::after').content || '';
      const svg = el.querySelector('svg');
      const tag = el.querySelector('.nametag');
      const head = el.querySelector('[data-dollhead]');
      const tr = tag ? tag.getBoundingClientRect() : null;
      const hr = head ? head.getBoundingClientRect() : null;
      const kr = el.getBoundingClientRect();
      return {
        lie: el.classList.contains('pose-lie'),
        matrix: m,
        z,
        chibi: el.classList.contains('chibi'),
        svgTurn: !!(svg && svg.outerHTML.indexOf('rotate(-78') >= 0),
        tagLow: !!(tr && hr && tr.top > kr.top + 8 && tr.bottom > hr.top - 4 && tr.top < hr.bottom),
        tagTop: tag ? getComputedStyle(tag).top : '',
      };
    }""")
    if got.get('missing') or not got.get('lie'):
        fail('own avatar is not lying ' + str(got))
    elif not got.get('matrix') or abs(got['matrix'][0]) > 0.2 or abs(got['matrix'][1]) < 0.9:
        fail('own avatar is upright ' + str(got.get('matrix')))
    elif 'z z' not in (got.get('z') or ''):
        fail('own avatar missing z z')
    elif got.get('svgTurn'):
        fail('own avatar svg rotates as well')
    elif not got.get('tagLow'):
        fail('lying name tag is still at standing height ' + str(got.get('tagTop')))
    else:
        print('own avatar lies', 'chibi' if got.get('chibi') else 'classic', flush=True)
    await pg.locator('.stage').screenshot(path=f'{OUT}/avatar-lie-820x1180.png')
    await pg.set_viewport_size({'width': 390, 'height': 844})
    await pg.wait_for_timeout(400)
    await pg.click('#modePlay')
    await pg.wait_for_timeout(250)
    phone = await pg.evaluate("""() => {
      const el = document.querySelector('.char.avatar.mine');
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const bed = document.querySelector('.item[data-id="lie-bed"]');
      const head = el && el.querySelector('[data-dollhead]');
      const t = el ? getComputedStyle(el.querySelector('.inner')).transform : 'none';
      const m = t && t !== 'none' ? t.slice(7, -1).split(',').map(Number) : null;
      const br = bed ? bed.getBoundingClientRect() : null;
      const hr = head ? head.getBoundingClientRect() : null;
      let widest = 0;
      document.querySelectorAll('.item').forEach(n => { const r = n.getBoundingClientRect(); if (r.width > 2) widest = Math.max(widest, r.width / stage.width); });
      const inside = (r) => r && r.left > stage.left - 8 && r.right < stage.right + 8 && r.top > stage.top - 8 && r.bottom < stage.bottom + 40;
      return { matrix: m, widest, bedIn: inside(br), headIn: inside(hr), lie: !!(el && el.classList.contains('pose-lie')) };
    }""")
    if not phone.get('lie') or not phone.get('matrix') or abs(phone['matrix'][0]) > 0.2 or abs(phone['matrix'][1]) < 0.9:
        fail('390 own avatar upright ' + str(phone.get('matrix')))
    if phone.get('widest', 1) > 0.58:
        fail(f'390 play zoom {phone.get("widest")}')
    if not phone.get('bedIn') or not phone.get('headIn'):
        fail('390 play did not keep the doll and the bed in view ' + str(phone))
    await pg.locator('.stage').screenshot(path=f'{OUT}/avatar-lie-390x844.png')
    await ctx.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        if '--avatar-only' not in sys.argv:
            ctx = await browser.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1)
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e: fail('pageerror ' + str(e)))
            await pg.goto(WEB, wait_until='domcontentloaded')
            await dismiss(pg)
            await run_sizes(pg)
            await ctx.close()
        try:
            await own_avatar(browser)
        except Exception as e:
            fail('own avatar flow ' + str(e).splitlines()[0][:240])
        await browser.close()
    print(('FAIL' if problems else 'PASS') + f' lie beds, {len(problems)} problems', flush=True)
    if problems:
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
