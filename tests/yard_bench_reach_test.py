"""Portrait 820x1180 WebKit: a kid can reach the refit bench at 1420, tap-sit two
kids on it in Play, and drag it in Decorate. Uses the real yard camera and the
right-arrow pan a kid would use. Never talks to a Worker.
"""
import asyncio, json, os, sys, copy
from pathlib import Path
from playwright.async_api import async_playwright

URL = os.environ.get('URL', 'http://127.0.0.1:5310/kids-house-game/').rstrip('/') + '/'
FIXTURE = Path(os.environ.get('FIXTURE', '/workspace/t-bench-refit/tests/fixtures/save_v3_old10.json'))
OUT = Path(os.environ.get('REACH_SHOTS', '/workspace/t-bench-refit/shots'))
OUT.mkdir(parents=True, exist_ok=True)

problems = []
def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

def house_init():
    raw = json.loads(FIXTURE.read_text())
    raw['currentRoom'] = 'backyard'
    # Leave the seed at 1122 with no flag so this run also exercises the migrate.
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
      if (window.__sky) { try { __sky.freeze(null); __sky.setChoice('day'); } catch(e) {} }
    }""")
    await pg.wait_for_timeout(300)

async def goto_yard(pg):
    await pg.evaluate("""() => {
      if (__store.get().currentRoom !== 'backyard') __store.dispatch({type:'room/switch', room:'backyard'});
    }""")
    await pg.wait_for_timeout(400)
    st = await pg.evaluate("""() => {
      const b = __store.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
      return { x: b && b.x, y: b && b.y, flag: __store.get().yardBenchRefit || null,
               viewW: parseFloat(document.getElementById('stage').style.width)||null,
               cam: window.__cam && __cam.get() };
    }""")
    if st['x'] != 1420 or st['flag'] != 1:
        fail(f'migrate did not land the bench at 1420+flag: {st}')
        return st
    return st

async def bench_vis(pg):
    return await pg.evaluate("""() => {
      const el = document.querySelector('.item[data-kind="yard-bench"]');
      const n = document.getElementById('nudgeR');
      if (!el) return null;
      const r = el.getBoundingClientRect(), vw = innerWidth, vh = innerHeight;
      const visW = Math.max(0, Math.min(vw, r.right) - Math.max(0, r.left));
      const visH = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
      const frac = r.width * r.height ? (visW * visH) / (r.width * r.height) : 0;
      const a = n && !n.classList.contains('off') ? n.getBoundingClientRect() : null;
      const tapX = Math.min(vw - 8, Math.max(8, r.left + visW * 0.5));
      const tapY = Math.min(vh - 8, Math.max(8, r.top + r.height * 0.55));
      return { frac, visW, left: r.left, right: r.right, top: r.top, bottom: r.bottom,
               cam: window.__cam && __cam.get(),
               arrowOn: !!(a), tapX, tapY,
               behind: !!(a && Math.min(r.right, a.right) - Math.max(r.left, a.left) > 2
                           && Math.min(r.bottom, a.bottom) - Math.max(r.top, a.top) > 2) };
    }""")

async def pan_until_reachable(pg):
    """A kid taps › until most of the bench is on screen, or the arrow turns off."""
    vis = await bench_vis(pg)
    for _ in range(6):
        if vis and vis['frac'] >= 0.85 and vis['visW'] >= 200:
            return vis
        arrow = await pg.evaluate("() => { const n=document.getElementById('nudgeR'); return n && !n.classList.contains('off'); }")
        if not arrow:
            break
        box = await pg.evaluate("() => { const r=document.getElementById('nudgeR').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }")
        await pg.mouse.click(box['x'], box['y'])
        await pg.wait_for_timeout(700)
        vis = await bench_vis(pg)
    return vis

async def two_kids_in_yard(pg):
    return await pg.evaluate("""() => {
      const s = __store;
      const b = s.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
      const ids = s.get().characters.slice(0, 2).map(c => c.id);
      s.dispatch({ type: 'char/move', id: ids[0], room: 'backyard', x: b.x - 90, y: 578, seat: null });
      s.dispatch({ type: 'char/move', id: ids[1], room: 'backyard', x: b.x + 90, y: 578, seat: null });
      return ids;
    }""")

async def select_kid(pg, cid):
    # Drawer / active character: click the doll, or set active via __test if present.
    await pg.evaluate("""(cid) => {
      if (window.__test && __test.setActive) { __test.setActive(cid); return; }
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      if (el) el.click();
    }""", cid)
    await pg.wait_for_timeout(120)

async def seats_of(pg, ids):
    return await pg.evaluate("""(ids) => ids.map(cid => {
      const c = __store.get().characters.find(c => c.id === cid);
      const el = document.querySelector('.char[data-cid="' + cid + '"]');
      return { id: cid, seat: c && c.seat || null, x: c && c.x, y: c && c.y,
               pose: el && el.classList.contains('pose-sit') ? 'sit' : (el && el.classList.contains('pose-lie') ? 'lie' : '') };
    })""", ids)

async def run():
    os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')
    async with async_playwright() as p:
        browser = await p.webkit.launch()
        ctx = await browser.new_context(viewport={'width': 820, 'height': 1180},
                                        device_scale_factor=1, has_touch=True, service_workers='block')
        await ctx.add_init_script(house_init())
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until='domcontentloaded')
        await dismiss(pg)
        await pg.click('#modePlay')
        st = await goto_yard(pg)
        print('START', st, flush=True)
        vis0 = await bench_vis(pg)
        print('DEFAULT_VIEW', vis0, flush=True)
        vis = await pan_until_reachable(pg)
        print('AFTER_PAN', vis, flush=True)
        if not vis or vis['frac'] < 0.85:
            fail(f'bench still not reachable after panning: {vis}')
        await pg.screenshot(path=str(OUT / 'reach_play_before_sit.png'), animations='disabled')

        ids = await two_kids_in_yard(pg)
        # After moving dolls, keep the bench in view if a fit snapped the camera
        vis = await pan_until_reachable(pg)
        await pg.wait_for_timeout(200)
        # Tap the visible part of the bench to sit the first kid, then the second.
        for i, cid in enumerate(ids):
            await select_kid(pg, cid)
            vis = await bench_vis(pg)
            if not vis:
                fail('bench missing before tap')
                break
            await pg.mouse.click(vis['tapX'], vis['tapY'])
            await pg.wait_for_timeout(400)
        seated = await seats_of(pg, ids)
        print('SEATED', seated, flush=True)
        ok_sit = all(s.get('pose') == 'sit' and s.get('seat') and s['seat'].get('item') == 'yard-bench-1' for s in seated)
        if not ok_sit:
            # Retry by tapping each kid onto a left/right point on the bench (still a real tap/drag).
            vis = await bench_vis(pg)
            if vis:
                for i, cid in enumerate(ids):
                    await select_kid(pg, cid)
                    kid = await pg.evaluate("""(cid) => {
                      const el = document.querySelector('.char[data-cid="' + cid + '"]');
                      if (!el) return null;
                      const r = el.getBoundingClientRect();
                      return { x: r.left + r.width/2, y: r.top + r.height*0.6 };
                    }""", cid)
                    if not kid: continue
                    tx = vis['left'] + vis['visW'] * (0.3 if i == 0 else 0.7)
                    ty = vis['top'] + (vis['bottom'] - vis['top']) * 0.6
                    await pg.mouse.move(kid['x'], kid['y'])
                    await pg.mouse.down()
                    await pg.mouse.move(tx, ty, steps=12)
                    await pg.mouse.up()
                    await pg.wait_for_timeout(400)
            seated = await seats_of(pg, ids)
            print('SEATED_RETRY', seated, flush=True)
            ok_sit = all(s.get('pose') == 'sit' and s.get('seat') and s['seat'].get('item') == 'yard-bench-1' for s in seated)
        if not ok_sit:
            fail(f'two kids did not sit on the bench: {seated}')
        await pg.screenshot(path=str(OUT / 'reach_play_two_sit.png'), animations='disabled')

        # Decorate: drag the bench. A kid's pan must stick across the mode switch/fit().
        await pg.click('#modeDecorate')
        await pg.wait_for_timeout(400)
        vis = await pan_until_reachable(pg)
        before = await pg.evaluate("""() => {
          const b = __store.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
          return { x: b.x, y: b.y };
        }""")
        box = await bench_vis(pg)
        if not box:
            fail('bench missing in Decorate')
        else:
            start = (box['left'] + box['visW'] * 0.5, box['top'] + (box['bottom'] - box['top']) * 0.55)
            end = (max(80, start[0] - 90), start[1] + 30)
            await pg.mouse.move(*start)
            await pg.mouse.down()
            await pg.mouse.move(*end, steps=16)
            await pg.mouse.up()
            await pg.wait_for_timeout(400)
        after = await pg.evaluate("""() => {
          const b = __store.get().rooms.backyard.items.find(i => i.kind === 'yard-bench');
          return { x: b.x, y: b.y };
        }""")
        print('DRAG', before, '->', after, flush=True)
        if abs(after['x'] - before['x']) < 8 and abs(after['y'] - before['y']) < 8:
            fail(f'Decorate drag did not move the bench: {before} -> {after}')
        await pg.screenshot(path=str(OUT / 'reach_decorate_dragged.png'), animations='disabled')
        await ctx.close(); await browser.close()

    if problems:
        print(f'REACH {len(problems)} failed', flush=True)
        sys.exit(1)
    print('REACH PASS', flush=True)

asyncio.run(run())
