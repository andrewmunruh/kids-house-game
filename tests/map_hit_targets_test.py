# Map tap targets: every tappable thing on the street map (houses, mailboxes, 'You' and friends'
# faces, park/ranch/clubhouse, pumpkins) must take a tap over at least 44x44 CSS px at the four
# target viewports. The hit area is MEASURED with elementFromPoint (so invisible pads count, and
# anything covering the target or clipping it off-screen counts against it), not read from the box.
# usage: python tests/map_hit_targets_test.py URL [SHOT_DIR]   (solo + fake street; aborts *workers.dev)
import asyncio, sys, os, json
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import SKIP_WN, to_map
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
SHOT = sys.argv[2] if len(sys.argv) > 2 else os.environ.get('HIT_SHOTS', '')
MIN = 44
SIZES = [(820, 1180), (1180, 820), (390, 844), (844, 390)]
if os.environ.get('HIT_SIZES'): SIZES = [tuple(int(v) for v in s.split('x')) for s in os.environ['HIT_SIZES'].split(',')]
fails = 0
def check(name, ok, extra=''):
    global fails
    if not ok: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
MEASURE = """(min) => {
  const sel = '#mapWorld button, #mapWorld [data-go], #mapWorld [data-mail], #mapWorld [data-knock]';
  const els = [...new Set(document.querySelectorAll(sel))].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; });
  const tag = h => !h ? 'offscreen' : (h.closest('button,[data-go]')?.getAttribute('aria-label') || h.className?.baseVal || h.className || h.tagName);
  return els.map(el => {
    const r = el.getBoundingClientRect(), pad = 30, st = 1;
    const x0 = Math.floor(r.left - pad), y0 = Math.floor(r.top - pad);
    const nx = Math.ceil((r.width + 2 * pad) / st), ny = Math.ceil((r.height + 2 * pad) / st);
    const own = [], block = {};
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (let j = 0; j < ny; j++) { const row = []; for (let i = 0; i < nx; i++) {
      const x = x0 + i * st, y = y0 + j * st, h = (x >= 0 && y >= 0 && x < innerWidth && y < innerHeight) ? document.elementFromPoint(x, y) : null;
      const o = !!h && (h === el || el.contains(h)); row.push(o ? 1 : 0);
      if (o) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
      else if ((x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) || (h && h.closest(sel))) { const t = tag(h); block[t] = (block[t] || 0) + 1; }
    } own.push(row); }
    // largest fully-owned square (dynamic programming over the 2px grid)
    let best = 0; const dp = own.map(r => r.map(() => 0));
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) if (own[j][i]) { dp[j][i] = (i && j) ? 1 + Math.min(dp[j-1][i], dp[j][i-1], dp[j-1][i-1]) : 1; best = Math.max(best, dp[j][i]); }
    const name = (el.getAttribute('aria-label') || el.className || el.tagName) + (el.dataset.mail ? ' [mail]' : '');
    const blockers = Object.entries(block).sort((a, b) => b[1] - a[1]).slice(0, 2).map(e => e[0]).join('|');
    return { name, box: [Math.round(r.width), Math.round(r.height)], w: maxX < minX ? 0 : maxX - minX + 1, h: maxY < minY ? 0 : maxY - minY + 1, sq: (best - 1) * st + 1, blockers };
  });
}"""
async def main():
    hits = []
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for (w, h) in SIZES:
            for fake in (0, 6):
                ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=(w < 900 and h < 900) or h < 500, device_scale_factor=2, service_workers='block')
                await ctx.route('**/*workers.dev*', lambda r: (hits.append(r.request.url), asyncio.ensure_future(r.abort())))
                pg = await ctx.new_page(); await pg.add_init_script(SKIP_WN)
                await pg.goto(URL); await pg.wait_for_timeout(1200)
                for s in ['#phoneOk', '#wnGo']:
                    if await pg.locator(s).count() and await pg.locator(s).first.is_visible(): await pg.click(s, force=True); await pg.wait_for_timeout(300)
                await to_map(pg)
                if fake: await pg.evaluate(f'__mapFake({fake})'); await pg.wait_for_timeout(500)
                await pg.wait_for_timeout(700)
                res = await pg.evaluate(MEASURE, MIN)
                tag = f'{w}x{h}' + (f' fake{fake}' if fake else ' solo')
                check(f'{tag} has targets', len(res) >= 5, f'n={len(res)}')
                for t in res:
                    ok = t['sq'] >= MIN
                    check(f"{tag} {t['name']}", ok, f"hit-square={t['sq']}px span={t['w']}x{t['h']} box={t['box'][0]}x{t['box'][1]}" + (f" blocked-by={t['blockers']}" if t['blockers'] else ''))
                if SHOT: os.makedirs(SHOT, exist_ok=True); await pg.screenshot(path=os.path.join(SHOT, f'map-{w}x{h}-{"fake" if fake else "solo"}.png'))
                await ctx.close()
        await b.close()
    check('no workers.dev request', not hits, str(hits[:3]))
    print('RESULT', 'FAIL' if fails else 'PASS', 'fails=', fails)
    sys.exit(1 if fails else 0)
asyncio.run(main())
