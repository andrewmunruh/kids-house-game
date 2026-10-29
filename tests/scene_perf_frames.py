# scene_perf_frames.py URL OUT.json : Chromium, CPU throttled 6x, rAF frame times entering the park (map -> park)
# and panning its full 5800 px width (scrollLeft stepped every frame, like a finger drag), at 820x1180 and 1180x820.
import asyncio, sys, json, os
sys.path.insert(0, os.getcwd())
from playwright.async_api import async_playwright
from testnav import SKIP_WN, to_map
REC = """() => { window.__ft = []; let last = performance.now(); window.__ftOn = true;
  const f = t => { window.__ft.push(t - last); last = t; if (window.__ftOn) requestAnimationFrame(f); }; requestAnimationFrame(f); }"""
PAN = """async () => { const s = document.getElementById('parkScroll'); const max = s.scrollWidth - s.clientWidth; s.scrollLeft = 0;
  const t0 = performance.now(), D = 3000; await new Promise(r => { const f = t => { const k = Math.min(1, (t - t0) / D); s.scrollLeft = max * k; k < 1 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); });
  return max; }"""
def stats(a):
    a = sorted(a[1:]) or [0]; n = len(a)
    return {'frames': n, 'median_ms': round(a[n // 2], 1), 'p95_ms': round(a[int(n * .95)], 1), 'max_ms': round(a[-1], 1),
            'over_16.7': sum(x > 17.5 for x in a), 'over_33': sum(x > 34 for x in a)}
async def main():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in ((820, 1180), (1180, 820)):
            ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2)
            await ctx.add_init_script(SKIP_WN + "; localStorage.setItem('avatar-intro','1')")
            pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg)
            await pg.goto(URL := sys.argv[1]); await pg.wait_for_timeout(2500)
            for sel in ('#phoneOk', '#wnGo'):
                loc = pg.locator(sel)
                if await loc.count() and await loc.is_visible(): await loc.click(force=True)
            await to_map(pg); await pg.wait_for_timeout(1500)
            await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 6})
            await pg.evaluate(REC)
            await pg.evaluate("() => document.querySelector('#mapWorld [data-go=park]').click()")
            await pg.wait_for_timeout(2500)
            await pg.evaluate("() => window.__ftOn = false"); enter = await pg.evaluate("() => window.__ft")
            painted = await pg.evaluate("() => !!document.querySelector('#parkWorld.sceneArtOn')")
            await pg.evaluate(REC); mx = await pg.evaluate(PAN); await pg.evaluate("() => window.__ftOn = false"); pan = await pg.evaluate("() => window.__ft")
            out[f'{w}x{h}'] = {'painted': painted, 'pan_px': mx, 'enter_2.5s': stats(enter), 'pan_3s': stats(pan)}
            print(f'{w}x{h}', json.dumps(out[f'{w}x{h}']), flush=True)
            await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 1}); await ctx.close()
        await b.close()
    json.dump(out, open(sys.argv[2], 'w'), indent=1)
asyncio.run(main())
