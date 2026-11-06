"""D-09 (Batch 6): when the page is hidden the game goes quiet, and it comes back when shown.
Checks: every AudioContext the game made is suspended while hidden and running again when shown;
no DOM work happens while hidden (MutationObserver over 6 s); script time while hidden is reported
(CDP ScriptDuration) for a before/after comparison. Hidden is simulated by overriding
document.hidden/visibilityState and firing visibilitychange (headless tabs never really hide).
usage: hidden_pause_test.py URL"""
import asyncio, sys
from playwright.async_api import async_playwright
URL = sys.argv[1]; R = []
def ok(n, c, x=''): R.append(bool(c)); print(('PASS ' if c else 'FAIL ') + n + (f'  [{x}]' if x != '' else ''), flush=True)
INIT = """localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');
window.__ctxs = []; for (const k of ['AudioContext', 'webkitAudioContext']) { const C = window[k]; if (!C) continue;
  window[k] = class extends C { constructor(...a) { super(...a); window.__ctxs.push(this); } }; }
let __hid = false; Object.defineProperty(document, 'hidden', { configurable: true, get: () => __hid });
Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => __hid ? 'hidden' : 'visible' });
window.__setHidden = (h) => { __hid = h; document.dispatchEvent(new Event('visibilitychange')); };"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        ctx = await b.new_context(viewport={'width': 1180, 'height': 820}); await ctx.add_init_script(INIT)
        pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg); await cdp.send('Performance.enable'); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
        await pg.goto(URL); await pg.wait_for_function("() => !!document.getElementById('stage')"); await pg.wait_for_timeout(2500)
        await pg.evaluate("() => { for (const s of ['#phoneOk', '#wnGo']) { const e = document.querySelector(s); if (e && e.offsetParent) e.click(); } }")
        # make some sound (a tap plays a click) so the game has a running AudioContext
        box = await pg.evaluate("() => { const r = document.querySelector('[data-room=\"kitchen\"]').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }")
        await pg.mouse.click(*box); await pg.wait_for_timeout(800)
        st0 = await pg.evaluate("() => window.__ctxs.map(c => c.state)")
        ok('the game made a running AudioContext', 'running' in st0, st0)
        async def script_s():
            m = {x['name']: x['value'] for x in (await cdp.send('Performance.getMetrics'))['metrics']}; return m.get('ScriptDuration', 0)
        await pg.evaluate("() => { window.__mut = 0; window.__mo = new MutationObserver(l => { window.__mut += l.length; }); window.__mo.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true }); }")
        vs0 = await script_s(); await pg.wait_for_timeout(6000); vs1 = await script_s(); vis_mut = await pg.evaluate("() => window.__mut")
        await pg.evaluate("() => window.__setHidden(true)"); await pg.wait_for_timeout(600)
        st1 = await pg.evaluate("() => window.__ctxs.map(c => c.state)")
        ok('hidden: every running AudioContext is suspended', st1 and all(s != 'running' for s in st1), st1)
        await pg.evaluate("() => { window.__mut = 0; }")
        hs0 = await script_s(); await pg.wait_for_timeout(6000); hs1 = await script_s(); hid_mut = await pg.evaluate("() => window.__mut")
        ok('hidden: no DOM work for 6 s', hid_mut == 0, f'{hid_mut} mutations hidden vs {vis_mut} visible')
        print(f'INFO script time per 6 s: visible {1000*(vs1-vs0):.1f} ms, hidden {1000*(hs1-hs0):.1f} ms', flush=True)
        await pg.evaluate("() => window.__setHidden(false)"); await pg.wait_for_timeout(800)
        st2 = await pg.evaluate("() => window.__ctxs.map(c => c.state)")
        ok('shown again: audio running again', 'running' in st2, st2)
        await pg.evaluate("() => { window.__mut = 0; }"); await pg.wait_for_timeout(2500)
        ok('shown again: the game is live (sky/needs/ambient update)', await pg.evaluate("() => window.__mut") > 0 or vis_mut == 0)
        ok('no page errors', not errs, errs[:2]); await b.close()
    f = R.count(False); print(f'HIDDEN_PAUSE: {len(R) - f}/{len(R)} pass'); sys.exit(1 if f else 0)
asyncio.run(main())
