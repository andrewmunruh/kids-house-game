"""Yard camera visits at 820x1180: frame her avatar on first entry and on every
room switch; keep a pan only for the rest of that same visit (including after a sit).
"""
import asyncio, json, os, sys
from pathlib import Path
from playwright.async_api import async_playwright

URL = os.environ.get('URL', 'http://127.0.0.1:5312/kids-house-game/').rstrip('/') + '/'
BROWSERS = [x for x in os.environ.get('BROWSERS', 'webkit,chromium').split(',') if x]
FIXTURE = Path(os.environ.get('FIXTURE', '/workspace/t-bench-refit/tests/fixtures/save_v3_old10.json'))
SIZE = (820, 1180)

problems = []
def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

def house_init():
    raw = json.loads(FIXTURE.read_text())
    raw['currentRoom'] = 'living'
    return (
        "localStorage.setItem('cozy-whatsnew','999');"
        "localStorage.setItem('avatar-intro','1');"
        "localStorage.setItem('cozy-welcome','1');"
        "localStorage.setItem('cozy-house', " + json.dumps(json.dumps(raw)) + ");"
    )

async def dismiss(pg):
    await pg.wait_for_function(
        "() => !!(window.__store || document.getElementById('btnMenu'))", timeout=25000)
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      document.querySelector('.whatsNew .wnGo')?.click();
      document.getElementById('modePlay')?.click();
      if (window.__sky) { try { __sky.freeze(null); __sky.setChoice('day'); } catch(e) {} }
    }""")
    await pg.wait_for_timeout(300)

async def info(pg):
    return await pg.evaluate("""() => {
      const s = __store.get();
      const me = s.characters.find(c => c.room === s.currentRoom) || s.characters[0];
      const el = me && document.querySelector('.char[data-cid="' + me.id + '"]');
      const r = el && el.getBoundingClientRect();
      const stage = document.getElementById('stage');
      const sr = stage && stage.getBoundingClientRect();
      const vw = innerWidth, vh = innerHeight;
      const visible = !!(r && r.width > 2 && r.right > 8 && r.left < vw - 8 && r.bottom > 8 && r.top < vh - 8);
      const inStage = !!(r && sr && r.right > sr.left + 4 && r.left < sr.right - 4 && r.bottom > sr.top + 4 && r.top < sr.bottom - 4);
      const door = document.querySelector('.yardDoor');
      const db = door && door.getBoundingClientRect();
      const bench = document.querySelector('.item[data-kind="yard-bench"]');
      const bb = bench && bench.getBoundingClientRect();
      const n = document.getElementById('nudgeR');
      return {
        room: s.currentRoom,
        cam: window.__cam && __cam.get(),
        viewW: parseFloat(stage && stage.style.width) || null,
        kidX: me && me.x, kidY: me && me.y, kidId: me && me.id, seat: me && me.seat || null,
        kidBox: r ? { l: r.left, r: r.right, t: r.top, b: r.bottom } : null,
        visible, inStage,
        doorGo: door && door.dataset.yardGo,
        doorBox: db ? { l: db.left, r: db.right, t: db.top, b: db.bottom } : null,
        benchBox: bb ? { l: bb.left, r: bb.right, t: bb.top, b: bb.bottom, w: bb.width } : null,
        arrowOn: !!(n && !n.classList.contains('off') && n.offsetParent !== null),
      };
    }""")

async def switch_to(pg, room, x=None, y=540):
    await pg.evaluate("""({room, x, y}) => {
      const s = __store;
      const c = s.get().characters[0];
      if (c) s.dispatch({ type: 'char/move', id: c.id, room, x: x == null ? c.x : x, y, seat: null });
      s.dispatch({ type: 'room/switch', room });
    }""", {'room': room, 'x': x, 'y': y})
    await pg.wait_for_timeout(500)
    return await info(pg)

async def tap_door(pg):
    """Real pointer down+up on the painted door (the handler listens for that, not click)."""
    box = await pg.evaluate("""() => {
      const d = document.querySelector('.yardDoor');
      if (!d) return null;
      const r = d.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return null;
      const vw = innerWidth, vh = innerHeight;
      const x = Math.min(vw - 8, Math.max(8, r.left + r.width / 2));
      const y = Math.min(vh - 8, Math.max(8, r.top + r.height * 0.55));
      return { x, y, go: d.dataset.yardGo, on: r.right > 8 && r.left < vw - 8 };
    }""")
    if not box or not box['on']:
        return None
    await pg.mouse.move(box['x'], box['y'])
    await pg.mouse.down()
    await pg.wait_for_timeout(40)
    await pg.mouse.up()
    await pg.wait_for_timeout(700)
    return box

async def click_nudge_right(pg):
    on = await pg.evaluate("() => { const n=document.getElementById('nudgeR'); return n && !n.classList.contains('off') && n.offsetParent !== null; }")
    if not on:
        return False
    box = await pg.evaluate("() => { const r=document.getElementById('nudgeR').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }")
    await pg.mouse.click(box['x'], box['y'])
    await pg.wait_for_timeout(800)
    return True

async def bench_tap(pg):
    vis = await pg.evaluate("""() => {
      const el = document.querySelector('.item[data-kind="yard-bench"]');
      const n = document.getElementById('nudgeR');
      if (!el) return null;
      const r = el.getBoundingClientRect(), vw = innerWidth, vh = innerHeight;
      const visW = Math.max(0, Math.min(vw, r.right) - Math.max(0, r.left));
      const frac = r.width * r.height ? visW / r.width : 0;
      const a = n && !n.classList.contains('off') ? n.getBoundingClientRect() : null;
      return {
        frac, visW,
        tapX: Math.min(vw - 8, Math.max(8, r.left + visW * 0.5)),
        tapY: Math.min(vh - 8, Math.max(8, r.top + r.height * 0.55)),
        left: r.left, right: r.right, top: r.top, bottom: r.bottom,
        behind: !!(a && Math.min(r.right, a.right) - Math.max(r.left, a.left) > 2
                    && Math.min(r.bottom, a.bottom) - Math.max(r.top, a.top) > 2),
      };
    }""")
    return vis

async def pan_until_bench(pg):
    """Tap › until most of the bench is on screen. Stop if a further pan would hide it."""
    vis = await bench_tap(pg)
    best = vis
    for _ in range(6):
        if vis and vis['frac'] >= 0.85 and vis['visW'] >= 200:
            return vis
        if not await click_nudge_right(pg):
            break
        nxt = await bench_tap(pg)
        if best and nxt and nxt['frac'] + 0.05 < best['frac'] and best['frac'] >= 0.5:
            # We overshot. One tap of ‹ brings the bench back.
            await pg.evaluate("""() => {
              const n = document.getElementById('nudgeL');
              return n && !n.classList.contains('off') && n.offsetParent !== null;
            }""")
            box = await pg.evaluate("() => { const n=document.getElementById('nudgeL'); if(!n) return null; const r=n.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }")
            if box:
                await pg.mouse.click(box['x'], box['y'])
                await pg.wait_for_timeout(800)
                nxt = await bench_tap(pg)
            return nxt or best
        vis = nxt
        if vis and (not best or vis['frac'] >= best['frac']):
            best = vis
    return vis or best

async def sit_on_bench(pg, cid):
    vis = await bench_tap(pg)
    if not vis or vis['frac'] < 0.5:
        return None
    await pg.evaluate("""(cid) => {
      if (window.__test && __test.setActive) { __test.setActive(cid); return; }
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      if (el) el.click();
    }""", cid)
    await pg.wait_for_timeout(120)
    await pg.mouse.click(vis['tapX'], vis['tapY'])
    await pg.wait_for_timeout(400)
    st = await info(pg)
    if st.get('seat'):
        return st
    # Drag her onto the visible bench if a tap was not enough.
    kid = await pg.evaluate("""(cid) => {
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height*0.6 };
    }""", cid)
    if kid:
        await pg.mouse.move(kid['x'], kid['y'])
        await pg.mouse.down()
        await pg.mouse.move(vis['tapX'], vis['tapY'], steps=12)
        await pg.mouse.up()
        await pg.wait_for_timeout(400)
    return await info(pg)

async def enter_yard_via_door(pg):
    """From the living room, walk through the back door into the yard."""
    here = await pg.evaluate("() => __store.get().currentRoom")
    if here != 'living':
        await switch_to(pg, 'living', 824, 540)
    await pg.wait_for_timeout(200)
    before = await info(pg)
    tapped = await tap_door(pg)
    st = await info(pg)
    if st['room'] == 'backyard' and abs((st['kidX'] or 0) - 1084) < 40:
        return st, 'door', before
    # Door was off-screen or the tap missed; place her at the door and try once more.
    await switch_to(pg, 'living', 996, 540)
    tapped = await tap_door(pg)
    st = await info(pg)
    if st['room'] == 'backyard' and abs((st['kidX'] or 0) - 1084) < 40:
        return st, 'door-retry', before
    return st, 'door-failed:' + str(tapped), before

async def run_browser(p, engine):
    tag = f'{engine} 820x1180'
    browser = await p.webkit.launch() if engine == 'webkit' else await p.chromium.launch()
    ctx = await browser.new_context(viewport={'width': SIZE[0], 'height': SIZE[1]},
                                    device_scale_factor=1, has_touch=True, service_workers='block')
    await ctx.add_init_script(house_init())
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='domcontentloaded')
    await dismiss(pg)
    await pg.click('#modePlay')

    # --- First yard entry frames her avatar ---
    st, how, _ = await enter_yard_via_door(pg)
    print(f'{tag} FIRST_ENTRY via={how}', st, flush=True)
    if st['room'] != 'backyard' or abs((st['kidX'] or 0) - 1084) > 40:
        fail(f'{tag} first entry did not go through the yard door to YARD_KID: {how} {st}')
    elif not (st['visible'] and st['inStage']):
        fail(f'{tag} first yard entry did not frame her avatar: {st}')

    # --- Pan, then sit, and the pan is kept ---
    cam0 = st['cam']
    vis = await pan_until_bench(pg)
    after_pan = await info(pg)
    print(f'{tag} AFTER_PAN vis={vis}', after_pan, flush=True)
    if after_pan['room'] != 'backyard':
        fail(f'{tag} › pan left the backyard: {after_pan}')
    elif after_pan['cam'] is None or cam0 is None or abs(after_pan['cam'] - cam0) < 20:
        fail(f'{tag} › pan did not move the camera: before={cam0} after={after_pan}')
    pan_cam = after_pan['cam']
    seated = await sit_on_bench(pg, after_pan['kidId'])
    print(f'{tag} AFTER_SIT', seated, flush=True)
    if not seated:
        fail(f'{tag} could not reach the bench to sit')
    elif not seated.get('seat'):
        fail(f'{tag} sit did not land on a seat: {seated}')
    elif abs((seated['cam'] or 0) - pan_cam) > 8:
        fail(f'{tag} pan was not kept after sit: pan={pan_cam} after sit={seated}')

    # --- Leave for the house and come back: frame her again, not the stale pan ---
    leave = await tap_door(pg)
    left = await info(pg)
    print(f'{tag} LEFT', leave, left, flush=True)
    if left['room'] != 'living':
        # The door might be off-camera after the pan; walk through via a switch and retry.
        await switch_to(pg, 'living', 940, 540)
        left = await info(pg)
    if left['room'] != 'living':
        fail(f'{tag} could not leave the yard for the house: {left}')
    back, how2, _ = await enter_yard_via_door(pg)
    print(f'{tag} REENTER via={how2}', back, flush=True)
    if back['room'] != 'backyard' or abs((back['kidX'] or 0) - 1084) > 40:
        fail(f'{tag} coming back did not go through the yard door: {how2} {back}')
    elif not (back['visible'] and back['inStage']):
        fail(f'{tag} coming back to the yard did not frame her avatar: {back}')
    elif abs((back['cam'] or 0) - pan_cam) < 20:
        fail(f'{tag} coming back kept the stale pan {pan_cam}: {back}')

    # --- A room switch frames her avatar ---
    living = await switch_to(pg, 'living', 824, 540)
    print(f'{tag} SWITCH_LIVING', living, flush=True)
    if living['room'] != 'living' or not (living['visible'] and living['inStage']):
        fail(f'{tag} room switch to living did not frame her avatar: {living}')
    kitchen = await switch_to(pg, 'kitchen', 900, 540)
    print(f'{tag} SWITCH_KITCHEN', kitchen, flush=True)
    if kitchen['room'] != 'kitchen' or not (kitchen['visible'] and kitchen['inStage']):
        fail(f'{tag} room switch to kitchen did not frame her avatar: {kitchen}')

    await ctx.close(); await browser.close()

async def main():
    os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')
    async with async_playwright() as p:
        for engine in BROWSERS:
            await run_browser(p, engine)
    if problems:
        print(f'YARD_CAM_VISIT {len(problems)} failed', flush=True)
        sys.exit(1)
    print('YARD_CAM_VISIT PASS', flush=True)

asyncio.run(main())
