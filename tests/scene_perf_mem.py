# perf_mem.py URL OUTJSON : per-scene memory in Chromium (one scene at a time) + img.sceneArt state
import asyncio, sys, json, os, re, subprocess, time
sys.path.insert(0, os.getcwd())
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go, to_map
URL = sys.argv[1]
STATE = r"""() => [...document.querySelectorAll('img.sceneArt')].map(i => ({ host: i.parentElement.id || i.parentElement.className, src: (i.getAttribute('src')||'').split('/').pop().replace(/-[\w-]{6,}\.webp/,'.webp'), hidden: i.hidden, shown: !!i.offsetParent, w: i.naturalWidth, h: i.naturalHeight }))"""
def pss(pids):
    t = 0
    for p in pids:
        try:
            for l in open(f'/proc/{p}/smaps_rollup'):
                if l.startswith('Pss:'): t += int(l.split()[1])
        except Exception: pass
    return t // 1024
def procs(root):
    out = subprocess.run(['ps', '-eo', 'pid,ppid,args'], capture_output=True, text=True).stdout.splitlines()[1:]
    kids = {}; args = {}
    for l in out:
        p, pp, a = l.split(None, 2); kids.setdefault(int(pp), []).append(int(p)); args[int(p)] = a
    seen, st = [], [root]
    while st:
        x = st.pop(); seen.append(x); st += kids.get(x, [])
    ren = [p for p in seen if '--type=renderer' in args.get(p, '')]
    gpu = [p for p in seen if '--type=gpu-process' in args.get(p, '')]
    return ren, gpu
async def main():
    rows = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 1180, 'height': 820})
        await ctx.add_init_script(SKIP_WN + "; localStorage.setItem('avatar-intro','1')")
        pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg)
        bpid = None
        # browser root pid: parent of renderer processes owned by this playwright
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        for sel in ('#phoneOk', '#wnGo'):
            loc = pg.locator(sel)
            if await loc.count() and await loc.is_visible(): await loc.click(force=True)
        out = subprocess.run(['pgrep', '-n', '-f', 'chrome.*--remote-debugging-pipe'], capture_output=True, text=True).stdout.split()
        bpid = int(out[0])
        async def snap(name):
            await pg.wait_for_timeout(1500)
            await cdp.send('HeapProfiler.collectGarbage'); await pg.wait_for_timeout(800)
            ren, gpu = procs(bpid)
            st = await pg.evaluate(STATE)
            live = [s for s in st if s['src']]
            dec = sum(s['w'] * s['h'] * 4 for s in live) / 1e6
            rows.append({'step': name, 'renderer_pss_mb': pss(ren), 'gpu_pss_mb': pss(gpu), 'imgs_with_src': [(s['host'], s['src'], 'shown' if s['shown'] else 'hidden') for s in live], 'retained_decoded_mb_max': round(dec, 1)})
            print(json.dumps(rows[-1]), flush=True)
        async def room(r):
            await pg.evaluate("(r) => document.querySelector(`[data-room=\"${r}\"]`)?.click()", r)
        await snap('room-living')
        for r in ('bedroom', 'kitchen', 'salon', 'nursery', 'bathroom', 'living'):
            await room(r); await snap('room-' + r)
        await to_map(pg); await snap('map')
        await go(pg, 'park'); await snap('park')
        await go(pg, 'ranch'); await snap('ranch')
        await pg.click('.barnDoor'); await pg.wait_for_selector('body.in-barn #ranchWorld .barnScene'); await snap('barn')
        await go(pg, 'gameroom'); await snap('clubhouse')
        await go(pg, 'home'); await snap('home (living)')
        await room('bedroom'); await snap('room-bedroom again')
        # Is the growth only reclaimable cache? Ask Chromium to purge as it would under OS memory pressure.
        await cdp.send('Memory.simulatePressureNotification', {'level': 'critical'}); await snap('after critical memory-pressure purge (bedroom shown)')
        await b.close()
    json.dump(rows, open(sys.argv[2], 'w'), indent=1)
asyncio.run(main())
