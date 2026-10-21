# Play sit and lie, at every review size. Real pointer drags. Never talks to a Worker.
# Screenshots of the sofa, the bed, and Decorate are saved for 820x1180 and 390x844.
import asyncio, os, sys
from playwright.async_api import async_playwright

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

WEB_PORT = opt('--web-port', 'WEB_PORT', opt('--port', 'PORT', '5173'))
URL = f'http://127.0.0.1:{WEB_PORT}/kids-house-game/'
SIZES = [(820, 1180), (1180, 820), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)]
SHOTS = {(820, 1180), (390, 844)}
OUT = os.environ.get('SIT_SHOTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(OUT, exist_ok=True)

problems = []
def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    await pg.wait_for_timeout(200)
    await pg.evaluate("""() => {
      const note = document.querySelector('#phoneOk');
      if (note && note.offsetParent) note.click();
      document.querySelector('#wnGo')?.click();
      if (window.__sky) { __sky.freeze(null); __sky.setChoice('day'); }
    }""")

async def drag(pg, a, b):
    await pg.mouse.move(a[0], a[1])
    await pg.mouse.down()
    await pg.mouse.move(b[0], b[1], steps=16)
    await pg.mouse.up()
    await pg.wait_for_timeout(160)

async def kid_box(pg, cid):
    return await pg.evaluate("""(cid) => {
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width < 2) return null;
      return { x: r.left + r.width / 2, y: r.top + r.height * 0.72, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
    }""", cid)

async def item_box(pg, iid):
    return await pg.evaluate("""(iid) => {
      const el = document.querySelector('.item[data-id="' + iid + '"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width < 2) return null;
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top, bottom: r.bottom, left: r.left, right: r.right, h: r.height };
    }""", iid)

async def ready(pg, room, kind, iid, x, kid_at):
    return await pg.evaluate("""([room, kind, iid, x, kidAt]) => {
      const s = __store;
      s.dispatch({ type: 'room/switch', room });
      const y = 540;
      if (!s.get().rooms[room].items.some(i => i.id === iid))
        s.dispatch({ type: 'item/add', room, item: { id: iid, kind, x, y, flip: false, z: 30, scale: 1 } });
      else s.dispatch({ type: 'item/move', room, id: iid, x, y });
      // Park every other seat so the drop can only land on this one.
      for (const it of s.get().rooms[room].items) {
        if (it.id === iid) continue;
        if (/sofa|chair|bench|bed|stool|rocker/.test(it.kind) && !/crib|tulip|flower|pet-bed|cat-bed|dog-bed/.test(it.kind))
          s.dispatch({ type: 'item/move', room, id: it.id, x: 80, y: 540 });
      }
      const kid = s.get().characters[0];
      s.dispatch({ type: 'char/move', id: kid.id, room, x: kidAt, y: 540, seat: null });
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set((x + kidAt) / 2 - viewW / 2);
      return kid.id;
    }""", [room, kind, iid, x, kid_at])

async def state_of(pg, cid):
    return await pg.evaluate("""(cid) => {
      const c = __store.get().characters.find(c => c.id === cid);
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      return { x: c.x, y: c.y, room: c.room, seat: c.seat || null, pose: el && el.classList.contains('pose-lie') ? 'lie' : el && el.classList.contains('pose-sit') ? 'sit' : '', front: !!document.querySelector('.seatFront') };
    }""", cid)

async def shot(pg, name):
    await pg.wait_for_timeout(160)
    await pg.screenshot(path=os.path.join(OUT, name), animations='disabled')

async def run_size(pg, w, h):
    tag = f'{w}x{h}'
    await dismiss(pg)
    await pg.click('#modePlay')
    play = await pg.evaluate("() => document.body.classList.contains('mode-play')")
    if not play:
        fail(f'{tag} play mode did not turn on')
        return
    cid = await ready(pg, 'living', 'sofa', 'sit-sofa', 1500, 1410)
    await pg.wait_for_timeout(100)
    before = await state_of(pg, cid)
    me = await kid_box(pg, cid)
    if not me or me['left'] < 2:
        fail(f'{tag} doll is off screen {me}')
        return
    await pg.mouse.click(me['x'], me['y'])
    await pg.wait_for_timeout(60)
    tapped = await state_of(pg, cid)
    if tapped['seat'] or abs(tapped['x'] - before['x']) > 1:
        fail(f'{tag} a doll tap moved her {tapped}')
    stage = await pg.evaluate("""() => { const r = document.querySelector('.stage').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }""")
    cam0 = await pg.evaluate('() => __cam.get()')
    await drag(pg, (stage['x'] + stage['w'] * 0.5, stage['y'] + stage['h'] * 0.22), (stage['x'] + stage['w'] * 0.28, stage['y'] + stage['h'] * 0.22))
    cam1 = await pg.evaluate('() => __cam.get()')
    floor = await state_of(pg, cid)
    if floor['seat'] or abs(floor['x'] - before['x']) > 1:
        fail(f'{tag} floor pan wrote a seat {floor}')
    if abs(cam1 - cam0) < 2:
        fail(f'{tag} floor pan did not pan')
    cid = await ready(pg, 'living', 'sofa', 'sit-sofa', 1500, 1410)
    await pg.wait_for_timeout(80)
    me = await kid_box(pg, cid)
    sofa = await item_box(pg, 'sit-sofa')
    if not me or not sofa:
        fail(f'{tag} sofa targets missing')
        return
    cushion = sofa['top'] + sofa['h'] * 0.62
    await drag(pg, (me['x'], me['y']), (sofa['x'], cushion))
    sat = await state_of(pg, cid)
    if not sat['seat'] or sat['seat']['pose'] != 'sit' or sat['seat']['item'] != 'sit-sofa':
        fail(f'{tag} sofa drag did not sit {sat}')
    elif sat['pose'] != 'sit' or not sat['front']:
        fail(f'{tag} sofa pose missing {sat}')
    else:
        covered = await pg.evaluate("""(cid) => {
          const s = __store.get();
          const it = s.rooms.living.items.find(i => i.id === 'sit-sofa');
          const kid = document.querySelector('.char[data-cid="' + cid + '"]');
          const stage = document.querySelector('.stage');
          const st = stage.getBoundingClientRect();
          const view = parseFloat(stage.style.width) || 1;
          const sc = st.width / view;
          const ox = st.left + 6 * sc;
          const oy = st.top + 6 * sc;
          const n = __store.get().characters.find(c => c.id === cid).seat.n;
          const ax = ox + (it.x + (n ? 0.18 : -0.18) * 260 - __cam.get()) * sc;
          const ay = oy + (Math.min(it.y, 588) - 0.33 * 260) * sc;
          const r = kid.getBoundingClientRect();
          return { ok: ax >= r.left - 4 && ax <= r.right + 4 && ay >= r.top - 4 && ay <= r.bottom + 4, ax, ay, l: r.left, rgt: r.right, t: r.top, b: r.bottom };
        }""", cid)
        if not covered['ok']:
            fail(f'{tag} sofa avatar misses the anchor {covered}')
    if (w, h) in SHOTS and sat['seat'] and sat['seat']['pose'] == 'sit':
        await pg.evaluate("""() => { const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000; __cam.set(1500 - viewW / 2); }""")
        await shot(pg, f'sit-sofa-{w}x{h}.png')
    # The other cushion. Phone Play zooms until the sofa nearly fills the window,
    # so she stands inside the visible room, on the free side.
    await pg.evaluate("""() => {
      const s = __store;
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      const cam = Math.max(0, Math.min(2400 - viewW, 1500 - viewW / 2));
      __cam.set(cam);
      const taken = s.get().characters.find(c => c.seat && c.seat.item === 'sit-sofa');
      const n = taken && taken.seat ? taken.seat.n : 0;
      const side = n === 1 ? -1 : 1;
      let x = 1500 + side * 200;
      x = Math.max(cam + 70, Math.min(cam + viewW - 70, x));
      const char = { id: 'sit-pal', skin: '#ffe0c4', hair: '#5b3a29', hairStyle: 1, shirt: '#ffd166', pants: '#5aa9e6', size: 'kid', acc: 0, room: 'living', x, y: 540, flip: false, held: { left: null, right: null } };
      if (!s.get().characters.some(c => c.id === 'sit-pal')) s.dispatch({ type: 'char/add', char });
      else s.dispatch({ type: 'char/move', id: 'sit-pal', room: 'living', x, y: 540, seat: null });
    }""")
    await pg.wait_for_timeout(80)
    pal = await kid_box(pg, 'sit-pal')
    aim = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage');
      const st = stage.getBoundingClientRect();
      const view = parseFloat(stage.style.width) || 1;
      const sc = st.width / view;
      const taken = __store.get().characters.find(c => c.seat && c.seat.item === 'sit-sofa');
      const n = taken && taken.seat && taken.seat.n === 0 ? 1 : 0;
      const x = 1500 + (n ? 0.18 : -0.18) * 260;
      const y = Math.min(540, 588) - 0.33 * 260;
      return { x: st.left + 6 * sc + (x - __cam.get()) * sc, y: st.top + 6 * sc + y * sc };
    }""")
    stage = await pg.evaluate("""() => { const r = document.querySelector('.stage').getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; }""")
    on_stage = pal and stage['l'] + 4 < pal['x'] < stage['r'] - 4 and stage['t'] + 4 < pal['y'] < stage['b'] - 4
    if not pal or not on_stage:
        fail(f'{tag} second doll is off screen {pal}')
    else:
        await drag(pg, (pal['x'], pal['y']), (aim['x'], aim['y']))
        both = await pg.evaluate("""() => __store.get().characters.filter(c => c.seat && c.seat.item === 'sit-sofa').map(c => c.seat.n).sort()""")
        if both != [0, 1]:
            fail(f'{tag} sofa should hold two sitters {both}')
    # Lie, then drag off to empty floor.
    cid = await ready(pg, 'bedroom', 'bed', 'sit-bed', 1500, 1380)
    await pg.click('#modePlay')
    await pg.wait_for_timeout(60)
    me = await kid_box(pg, cid)
    bed = await item_box(pg, 'sit-bed')
    if not me or not bed:
        fail(f'{tag} bed targets missing')
        return
    await drag(pg, (me['x'], me['y']), (bed['x'], bed['top'] + bed['h'] * 0.55))
    lay = await state_of(pg, cid)
    if not lay['seat'] or lay['seat']['pose'] != 'lie' or lay['pose'] != 'lie':
        fail(f'{tag} bed drag did not lie {lay}')
    if (w, h) in SHOTS and lay['seat'] and lay['seat']['pose'] == 'lie':
        await pg.evaluate("""() => { const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000; __cam.set(1500 - viewW / 2); }""")
        await shot(pg, f'lie-bed-{w}x{h}.png')
    me = await kid_box(pg, cid)
    away = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage');
      const st = stage.getBoundingClientRect();
      const view = parseFloat(stage.style.width) || 1;
      const sc = st.width / view;
      const x = 1100, y = 540;
      return { x: st.left + 6 * sc + (x - __cam.get()) * sc, y: st.top + 6 * sc + y * sc };
    }""")
    await drag(pg, (me['x'], me['y']), (away['x'], away['y']))
    stood = await state_of(pg, cid)
    if stood['seat']:
        fail(f'{tag} drag off the bed left a seat {stood}')
    # Decorate: the same drop does not sit.
    await pg.click('#modeDecorate')
    cid = await ready(pg, 'living', 'chair', 'sit-chair', 1500, 1400)
    await pg.wait_for_timeout(60)
    me = await kid_box(pg, cid)
    chair = await item_box(pg, 'sit-chair')
    await drag(pg, (me['x'], me['y']), (chair['x'], chair['y']))
    deco = await state_of(pg, cid)
    if deco['seat'] or deco['pose']:
        fail(f'{tag} decorate drop sat her {deco}')
    if (w, h) in SHOTS:
        await pg.evaluate("""() => { const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000; __cam.set(1500 - viewW / 2); }""")
        await shot(pg, f'decorate-{w}x{h}.png')
    # Moving the sofa, which sticks out past her, stands her at the old anchor.
    cid = await ready(pg, 'living', 'sofa', 'sit-sofa', 1500, 1410)
    await pg.evaluate("""(cid) => {
      const s = __store;
      const it = s.get().rooms.living.items.find(i => i.id === 'sit-sofa');
      const y = Math.min(it.y, 588) - 0.33 * 260;
      s.dispatch({ type: 'char/move', id: cid, room: 'living', x: it.x + 0.18 * 260, y, seat: { item: 'sit-sofa', pose: 'sit', n: 1 } });
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(it.x - viewW / 2);
    }""", cid)
    await pg.wait_for_timeout(80)
    held = await state_of(pg, cid)
    sofa = await item_box(pg, 'sit-sofa')
    # Grab the left arm, clear of the doll on the right cushion.
    await drag(pg, (sofa['left'] + 12, sofa['top'] + sofa['h'] * 0.55), (sofa['left'] + 90, sofa['top'] + sofa['h'] * 0.55))
    after = await state_of(pg, cid)
    moved = await pg.evaluate("""() => { const it = __store.get().rooms.living.items.find(i => i.id === 'sit-sofa'); return it.x; }""")
    if after['seat']:
        fail(f'{tag} moving the sofa left her seated {after}')
    if abs(after['x'] - held['x']) > 1.5 or abs(after['y'] - held['y']) > 1.5:
        fail(f'{tag} she was carried {after} from {held}')
    if abs(moved - 1500) < 6:
        fail(f'{tag} sofa did not move {moved}')
    # Play does not drag furniture, and a slip does not sit anyone.
    await pg.click('#modePlay')
    await pg.evaluate("""(cid) => { const s = __store; s.dispatch({ type: 'char/move', id: cid, room: 'living', x: 1200, y: 540, seat: null }); }""", cid)
    await pg.wait_for_timeout(40)
    sofa = await item_box(pg, 'sit-sofa')
    x0 = await pg.evaluate("""() => __store.get().rooms.living.items.find(i => i.id === 'sit-sofa').x""")
    await drag(pg, (sofa['left'] + 8, sofa['y']), (sofa['left'] + 48, sofa['y']))
    slip = await state_of(pg, cid)
    x1 = await pg.evaluate("""() => __store.get().rooms.living.items.find(i => i.id === 'sit-sofa').x""")
    if slip['seat']:
        fail(f'{tag} a play slip sat someone {slip}')
    if abs(x1 - x0) > 1:
        fail(f'{tag} play slip moved the sofa {x0} -> {x1}')
    print(f'{tag} checked', flush=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for w, h in SIZES:
            phone = min(w, h) < 500 or (w > h and h <= 500)
            ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=min(w, h) < 500, device_scale_factor=1)
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e, wh=(w, h): fail(f'{wh[0]}x{wh[1]} pageerror {e}'))
            await pg.goto(URL, wait_until='domcontentloaded')
            await run_size(pg, w, h)
            await ctx.close()
        await browser.close()
    print(('FAIL' if problems else 'PASS') + f' sit touch, {len(problems)} problems', flush=True)
    if problems:
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
