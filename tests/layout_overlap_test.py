# B-01 / B-28: the room stage must never sit on the room tabs, the top bar or the drawer,
# at load and after Decorate <-> Play (drawer open / closed), at the six QA sizes. WebKit.
# usage: layout_overlap_test.py URL   (exit 1 on any overlap)
import asyncio, sys
from playwright.async_api import async_playwright

URL = sys.argv[1]
SIZES = [(390, 844), (844, 390), (820, 1180), (1180, 820), (768, 1024), (1024, 768)]
TOL = 1.0
MEASURE = """() => {
  const r = (el) => { if (!el) return null; const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') return null;
    const b = el.getBoundingClientRect(); return b.width && b.height ? {l:b.left,t:b.top,r:b.right,b:b.bottom} : null; };
  return { stage: r(document.getElementById('stage')), wrap: r(document.getElementById('stageWrap')),
    tabs: r(document.getElementById('tabs')), top: r(document.querySelector('.top')), drawer: r(document.querySelector('.drawer')),
    scale: (document.getElementById('stage').style.transform.match(/scale\\(([0-9.]+)/) || [])[1] || '',
    viewW: document.getElementById('stage').style.width };
}"""

def inter(a, b):
    if not a or not b: return 0.0
    w = min(a['r'], b['r']) - max(a['l'], b['l']); h = min(a['b'], b['b']) - max(a['t'], b['t'])
    return h if w > 0 and h > 0 else 0.0

def problems(m):
    out = []
    for k in ('tabs', 'top', 'drawer'):
        o = inter(m['stage'], m[k])
        if o > TOL: out.append(f'stage overlaps {k} by {o:.0f}px')
    s, w = m['stage'], m['wrap']
    if s and w:
        if s['t'] < w['t'] - TOL or s['b'] > w['b'] + TOL: out.append(f"stage y {s['t']:.0f}-{s['b']:.0f} outside wrap {w['t']:.0f}-{w['b']:.0f}")
    return out

async def main():
    fails = passes = 0
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for w, h in SIZES:
            phone = min(w, h) < 500
            ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, service_workers='block')
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999');localStorage.setItem('preview:cozy-whatsnew','999')")
            pg = await ctx.new_page()
            await pg.goto(URL); await pg.wait_for_selector('#stage')
            for sel in ('#phoneOk', '#wnGo', '.whatsNew .wnGo'):
                loc = pg.locator(sel)
                if await loc.count() and await loc.first.is_visible(): await loc.first.click(force=True)
            await pg.wait_for_timeout(3000)
            steps = [('load-decorate', None), ('play', '#modePlay'), ('decorate-again', '#modeDecorate')]
            for name, sel in steps:
                if sel:
                    await pg.evaluate(f"() => document.querySelector('{sel}').click()"); await pg.wait_for_timeout(1200)
                m = await pg.evaluate(MEASURE)
                bad = problems(m)
                # Decision (Andy / App Builder): an upright iPad fills the screen, no letterbox.
                if (w, h) == (820, 1180) and not (float(m['scale'] or 0) > 1.3): bad.append(f"820x1180 letterboxed (scale {m['scale']})")
                tag = f'{w}x{h} {name} (VIEW_W {m["viewW"]} scale {m["scale"]})'
                if bad: fails += 1; print('FAIL', tag, '; '.join(bad), flush=True)
                else: passes += 1; print('PASS', tag, flush=True)
            await ctx.close()
        await b.close()
    print(f'RESULT {passes} pass {fails} fail', flush=True)
    sys.exit(1 if fails else 0)

asyncio.run(main())
