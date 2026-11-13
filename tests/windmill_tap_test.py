"""Windmill tap whirl regression test (ranch).
Bug on ced205f: the tap "whirl" reused the `sails` keyframes, so it only spun when the idle animation
was < 3 s old, and after a whirl ended the sails stayed stopped until the ranch re-rendered.
Usage: python tests/windmill_tap_test.py URL [browser ...]   (env MILL_SHOTS=dir/ MILL_LABEL=x for shots)
Checks (each browser): idle spin; tap after >3 s whirls fast; sails keep spinning after the whirl ends;
a second tap after the spin whirls again. Exit 1 on any FAIL."""
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import go
from playwright.async_api import async_playwright
URL = sys.argv[1]; BROWSERS = sys.argv[2:] or ['chromium', 'webkit']
SHOTS = os.environ.get('MILL_SHOTS'); LABEL = os.environ.get('MILL_LABEL', 'run')
fails = 0
def check(name, ok, info=''):
    global fails
    print(('PASS ' if ok else 'FAIL ') + name, info, flush=True); fails += 0 if ok else 1
# Whirl probe: in one JS task, read the visible sails angle and every running animation. The whirl is on when a running
# animation with a 0.5 s iteration exists and the visible angle matches its progress (so the whirl, not the idle spin, drives
# the sails). Sampled 5x; rAF-rate independent (headless frame rate can be low under load, which aliases a speed measure).
WHIRL = """async () => { const s = document.querySelector('.rprop.windmill .sails'); const out = [];
  for (let i = 0; i < 5; i++) { const t = getComputedStyle(s).transform; const m = t && t !== 'none' && t.match(/matrix\\(([^,]+),\\s*([^,]+)/);
    const ang = m ? ((Math.atan2(+m[2], +m[1]) * 180 / Math.PI) + 360) % 360 : null;
    const w = s.getAnimations().find(a => a.playState === 'running' && Number(a.effect.getComputedTiming().duration) === 500);
    let match = false; if (w && ang !== null) { const exp = (Number(w.currentTime) % 500) / 500 * 360; let d = Math.abs(ang - exp) % 360; d = Math.min(d, 360 - d); match = d < 20; }
    out.push({ang: ang === null ? null : Math.round(ang), exp: w ? Math.round((Number(w.currentTime) % 500) / 500 * 360) : null, ct: w ? Math.round(Number(w.currentTime)) : null, whirl: !!w, name: w ? w.animationName : null, match});
    await new Promise(r => setTimeout(r, 90)); }
  return {ok: out.every(o => o.whirl && o.match), samples: out}; }"""
# Angular speed of the sails in deg/s, measured over consecutive animation frames (unwrapped).
SPEED = """ms => new Promise(res => { const s = document.querySelector('.rprop.windmill .sails');
  const ang = () => { const t = getComputedStyle(s).transform; if (!t || t === 'none') return null;
    const m = t.match(/matrix\\(([^,]+),\\s*([^,]+)/); return m ? Math.atan2(+m[2], +m[1]) * 180 / Math.PI : null; };
  let last = ang(), t0 = performance.now(), tot = 0, nulls = last === null ? 1 : 0;
  const step = () => { const a = ang(); if (a === null) nulls++; else if (last !== null) { let d = a - last; while (d < -180) d += 360; while (d > 180) d -= 360; tot += d; }
    last = a; if (performance.now() - t0 < ms) requestAnimationFrame(step); else res({speed: Math.round(tot / ((performance.now() - t0) / 1000)), nulls,
      anims: s.getAnimations().map(x => x.animationName + ':' + x.playState).join(',')}); };
  requestAnimationFrame(step); })"""
async def shot(pg, name):
    if not SHOTS: return
    os.makedirs(SHOTS + 'crops', exist_ok=True)
    full = f'{SHOTS}{LABEL}_{name}_820x1180.png'; await pg.screenshot(path=full)
    bb = await pg.locator('.rprop.windmill').bounding_box()
    if bb:
        pad = 30; clip = {'x': max(0, bb['x'] - pad), 'y': max(0, bb['y'] - pad), 'width': bb['width'] + 2 * pad, 'height': bb['height'] + 2 * pad}
        await pg.screenshot(path=f'{SHOTS}crops/{LABEL}_{name}_windmill.png', clip=clip)
    print('SHOT', full, flush=True)
async def run(p, brn):
    b = await getattr(p, brn).launch()
    ctx = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2)
    await ctx.add_init_script("for (const p of ['','preview:']) { localStorage.setItem(p+'cozy-whatsnew','999'); localStorage.setItem(p+'avatar-intro','1'); }")
    pg = await ctx.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto(URL); await pg.wait_for_selector('#stage', state='attached'); await pg.wait_for_timeout(900)
    await go(pg, 'ranch'); await pg.wait_for_timeout(300)
    await pg.evaluate("(() => { const s = document.getElementById('ranchScroll'); s.scrollLeft = 1540 * (document.getElementById('ranch').clientHeight / 600) - s.clientWidth / 2; })()")
    idle = await pg.evaluate(SPEED, 400)
    check(f'{brn}: sails idle-spin (~60 deg/s)', 30 <= idle['speed'] <= 120 and idle['nulls'] == 0, idle)
    await pg.wait_for_timeout(3500)            # idle animation now > 3 s old
    await pg.click('.rprop.windmill', force=True); await pg.wait_for_timeout(120)
    w1 = await pg.evaluate(WHIRL)
    check(f'{brn}: tap after 3 s whirls (0.5 s turns drive the sails)', w1['ok'], w1)
    await shot(pg, f'{brn}_tap-after-3s')
    await pg.wait_for_timeout(3300)            # whirl (6 x .5 s) is over
    after = await pg.evaluate(SPEED, 400)
    check(f'{brn}: sails keep spinning after the whirl ends', 30 <= after['speed'] <= 120 and after['nulls'] == 0, after)
    await pg.click('.rprop.windmill', force=True); await pg.wait_for_timeout(120)
    w2 = await pg.evaluate(WHIRL)
    check(f'{brn}: second tap after a spin whirls again', w2['ok'], w2)
    await shot(pg, f'{brn}_second-tap-after-spin')
    check(f'{brn}: no page errors', not errs, errs[:3])
    await b.close()
async def main():
    async with async_playwright() as p:
        for brn in BROWSERS: await run(p, brn)
    print(f'MILLTAP {"ALL OK" if not fails else f"{fails} FAILED"}', flush=True)
    sys.exit(1 if fails else 0)
asyncio.run(main())
