"""D-T1 memory soak (Batch 6, D-01/D-02/D-17): a scripted scene tour for N minutes in Chromium,
measuring after every cycle (forced GC first): JS heap, Blink DOM node + document counters,
renderer/GPU PSS, decoded bytes of painted scenes held in the DOM, and the shelf cache size.
Each cycle: 6 rooms (pan across each), drawer tabs, backyard, map, park, ranch, barn, clubhouse, home.
usage: memory_soak_test.py URL [minutes=20] [out.json]
Asserts (the plateau D-01 asks for): renderer PSS grows < 6 MB/min over the second half,
documents stay <= 8, scene bitmaps held in the DOM stay <= 24 MB, shelf cache <= 60.
Headless Chromium on Linux is not an iPad: numbers are relative (before vs after), not device numbers.
"""
import asyncio, json, os, subprocess, sys, time
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]; sys.path.insert(0, str(ROOT))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
URL = sys.argv[1]; MIN = float(sys.argv[2]) if len(sys.argv) > 2 else 20.0
OUT = sys.argv[3] if len(sys.argv) > 3 else None
ROOMS = ['living', 'kitchen', 'bedroom', 'bathroom', 'nursery', 'salon']

def pss(root):
    rows = subprocess.run(['ps', '-eo', 'pid,ppid,args'], capture_output=True, text=True).stdout.splitlines()[1:]
    kids, args = {}, {}
    for l in rows:
        p, pp, a = (l.split(None, 2) + [''])[:3]; kids.setdefault(int(pp), []).append(int(p)); args[int(p)] = a
    seen, st = [], [root]
    while st: x = st.pop(); seen.append(x); st += kids.get(x, [])
    def tot(sel):
        t = 0
        for p in seen:
            if sel not in args.get(p, ''): continue
            try:
                for l in open(f'/proc/{p}/smaps_rollup'):
                    if l.startswith('Pss:'): t += int(l.split()[1])
            except Exception: pass
        return t // 1024
    return tot('--type=renderer'), tot('--type=gpu-process')

DOM_JS = """() => { let scene = 0, all = 0; for (const i of document.images) { if (!i.isConnected || !i.complete || !i.naturalWidth) continue;
  const b = i.naturalWidth * i.naturalHeight * 4; all += b; if (i.classList.contains('sceneArt')) scene += b; }
  return { sceneMB: +(scene / 1048576).toFixed(1), imgMB: +(all / 1048576).toFixed(1), live: document.getElementsByTagName('*').length,
           shelf: window.__shelfCache ? window.__shelfCache() : -1 }; }"""

# Navigation by in-page clicks only: Playwright's pg.click()/wait_for_selector() keep ElementHandles
# alive, and a handle to an old map button retains that whole replaced map tree (~850 Blink nodes per
# visit) - that, not the game, was most of the "node growth" in the first D-01 measurement.
WAIT = {'park': 'body.view-park #parkWorld .pspot', 'ranch': 'body.view-ranch #ranchWorld .ranchScene', 'gameroom': 'body.view-gameroom #grWorld .grScene',
        'barn': 'body.in-barn #ranchWorld .barnScene', 'home': 'body:not(.view-street) #stage', 'map': 'body.view-map #mapWorld .mapSpot'}
async def wait_sel(pg, sel, ms=8000):
    await pg.wait_for_function("(s) => !!document.querySelector(s)", arg=sel, timeout=ms)
async def go(pg, place):
    if place == 'barn':
        await go(pg, 'ranch'); await pg.evaluate("() => document.querySelector('.barnDoor').click()"); await wait_sel(pg, WAIT['barn']); await pg.wait_for_timeout(500); return
    await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
    await wait_sel(pg, WAIT['map']); await pg.wait_for_timeout(450)
    await pg.evaluate("(p) => document.querySelector('[data-go=' + JSON.stringify(p) + ']').click()", place)
    await wait_sel(pg, WAIT[place]); await pg.wait_for_timeout(500)

async def pan_room(pg):
    await pg.evaluate("""async () => { const c = window.__cam; if (!c) return; for (let i = 0; i <= 8; i++) { c.set(i * 400); await new Promise(r => setTimeout(r, 120)); } c.set(0); }""")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1180, 'height': 820}, device_scale_factor=2)
        await ctx.add_init_script(SKIP_WN + "; localStorage.setItem('avatar-intro','1')")
        pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:160]))
        await pg.goto(URL); await wait_sel(pg, '#stage', 20000); await pg.wait_for_timeout(2500)
        for sel in ('#phoneOk', '#wnGo'):
            await pg.evaluate("(s) => { const e = document.querySelector(s); if (e && e.offsetParent) e.click(); }", sel)
        root = int(subprocess.run(['pgrep', '-n', '-f', 'chrom.*--remote-debugging-pipe'], capture_output=True, text=True).stdout.split()[0])
        t0 = time.time(); rows = []; navfail = 0; peak_scene = 0.0
        async def sample(cyc):
            await cdp.send('HeapProfiler.collectGarbage'); await pg.wait_for_timeout(300)
            h = await cdp.send('Runtime.getHeapUsage'); m = await cdp.send('Memory.getDOMCounters'); r, g = pss(root)
            d = await pg.evaluate(DOM_JS)
            row = {'cycle': cyc, 't_s': round(time.time() - t0), 'heap_MB': round(h['usedSize'] / 1e6, 1), 'nodes': m['nodes'], 'documents': m['documents'],
                   'renderer_PSS_MB': r, 'gpu_PSS_MB': g, **d}
            rows.append(row); print(json.dumps(row), flush=True)
        await sample(0); cyc = 0
        while time.time() - t0 < MIN * 60:
            cyc += 1
            for room in ROOMS:
                try:
                    await pg.evaluate("(r) => document.querySelector('[data-room=' + JSON.stringify(r) + ']')?.click()", room); await pg.wait_for_timeout(700)
                    peak_scene = max(peak_scene, (await pg.evaluate(DOM_JS))['sceneMB']); await pan_room(pg)
                    peak_scene = max(peak_scene, (await pg.evaluate(DOM_JS))['sceneMB'])
                except Exception: navfail += 1
            try:  # drawer tabs: fills the shelf cache (D-17)
                await pg.evaluate("""async () => { const t = document.getElementById('modeToggle'); const cats = () => [...document.querySelectorAll('#cats .cat')];
                  if (!cats().length && t) { t.click(); await new Promise(r => setTimeout(r, 400)); }
                  for (const c of cats()) { c.click(); await new Promise(r => setTimeout(r, 250)); } }""")
            except Exception: navfail += 1
            for place in ('park', 'ranch', 'barn', 'gameroom', 'home'):
                try: await go(pg, place); await pg.wait_for_timeout(900); peak_scene = max(peak_scene, (await pg.evaluate(DOM_JS))['sceneMB'])
                except Exception: navfail += 1
            await sample(cyc)
        await b.close()
    half = [r for r in rows if r['t_s'] >= rows[-1]['t_s'] / 2]
    slope = (half[-1]['renderer_PSS_MB'] - half[0]['renderer_PSS_MB']) / max(1e-6, (half[-1]['t_s'] - half[0]['t_s']) / 60) if len(half) > 1 else 0
    summ = {'url': URL, 'minutes': MIN, 'cycles': cyc, 'navfail': navfail, 'errors': errs[:5], 'first': rows[0], 'last': rows[-1],
            'peak_renderer_PSS_MB': max(r['renderer_PSS_MB'] for r in rows), 'peak_gpu_PSS_MB': max(r['gpu_PSS_MB'] for r in rows),
            'peak_scene_MB_in_dom': peak_scene, 'pss_slope_2nd_half_MB_per_min': round(slope, 2),
            'max_documents': max(r['documents'] for r in rows), 'max_shelf': max(r['shelf'] for r in rows)}
    print('SUMMARY', json.dumps(summ))
    if OUT: Path(OUT).write_text(json.dumps({'summary': summ, 'rows': rows}, indent=1))
    checks = [('renderer PSS plateau (< 6 MB/min, 2nd half)', slope < 6), ('documents <= 8', summ['max_documents'] <= 8),
              ('scene bitmaps in the DOM <= 24 MB at any stop', peak_scene <= 24), ('shelf cache <= 60', summ['max_shelf'] <= 60),
              ('tour ran (>= 2 cycles, < 10% nav fails)', cyc >= 2 and navfail <= cyc), ('no page errors', not errs)]
    for n, ok in checks: print(('PASS ' if ok else 'FAIL ') + n)
    f = sum(1 for _, ok in checks if not ok); print(f'MEMORY_SOAK: {len(checks) - f}/{len(checks)} pass'); sys.exit(1 if f else 0)
asyncio.run(main())
