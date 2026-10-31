# B-02 / B-05 / B-06 / B-10: contrast of pink / lilac selected states and labels, 44px touch targets,
# and the Menu close X clear of the first row. WebKit. usage: ui_contrast_touch_test.py URL
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import go, SKIP_WN, tap
from playwright.async_api import async_playwright

URL = sys.argv[1]
SIZES = [(820, 1180), (1180, 820), (390, 844), (844, 390), (667, 280)]
SCAN = r"""(extra) => {
  const rgba = (s) => { const m = s.match(/[\d.]+/g); if (!m) return null; return [+m[0], +m[1], +m[2], m.length > 3 ? +m[3] : 1]; };
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const hsl = (c) => { const r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
    const l = (mx + mn) / 2, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0; return [h, s, l]; };
  const pinkish = (c) => { const [h, s] = hsl(c); return s > 0.25 && (h >= 265 || h <= 5); };
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!direct) continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    let bg = null, n = el, bgEl = null;
    while (n && n.nodeType === 1) { const s = getComputedStyle(n); const c = rgba(s.backgroundColor);
      if (s.backgroundImage !== 'none' && !c) break;
      if (c && c[3] > 0.9) { bg = c; bgEl = n; break; } n = n.parentElement; }
    if (!bg) continue;
    const fg = rgba(cs.color); if (!fg || fg[3] < 0.5) continue;
    const sel = el.closest('.on, [aria-pressed="true"], [aria-selected="true"], .sure');
    const cta = el.closest(extra.cta);
    const label = el.closest(extra.labels);
    const rr = ratio(fg, bg);
    if (((sel || cta) && pinkish(bg)) || label) out.push({ txt: el.textContent.trim().slice(0, 24), cls: el.className && el.className.baseVal === undefined ? el.className : '', r: +rr.toFixed(2), kind: label ? 'label' : 'pink', fs: parseFloat(cs.fontSize) });
  }
  return out;
}"""
EXTRA = {'cta': '.stuHang, .stuAskYes, .typed button, .codeForm button, .pHouse button, .pAdd button, .del.sure',
         'labels': '.menuGroup, .stuGroup > b, .grSolo, .stuTool span'}
BALLDBG = """() => { const r = document.getElementById('ball').getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  return [[0,0],[21.5,0],[-21.5,0],[0,21.5],[0,-21.5]].map(([dx, dy]) => { const e = document.elementFromPoint(cx + dx, cy + dy); return e ? (e.id || e.className.baseVal || e.className || e.tagName) : null; }).concat([Math.round(cx), Math.round(cy)]); }"""
# The ball's tap pad must not steal taps meant for park hotspots, pets or the chat button: sample a grid inside each
# of them (outside the ball's own drawn box) and require elementFromPoint not to be the ball.
STEAL = """() => { const ball = document.getElementById('ball'); const br = ball.getBoundingClientRect(); const out = [];
  const els = [...document.querySelectorAll('#parkWorld .pspot, #parkWorld .pet, #parkWorld button:not(#ball), #btnChat')];
  for (const el of els) { const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    for (let i = 0; i <= 6; i++) for (let j = 0; j <= 6; j++) { const x = r.left + 2 + (r.width - 4) * i / 6, y = r.top + 2 + (r.height - 4) * j / 6;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      if (x >= br.left && x <= br.right && y >= br.top && y <= br.bottom) continue;
      const top = document.elementFromPoint(x, y); if (!top || !top.closest('#ball')) continue;
      if (!el.contains(top) && document.elementsFromPoint(x, y).includes(el)) out.push((el.id || el.getAttribute('aria-label') || el.className) + '@' + Math.round(x) + ',' + Math.round(y)); } }
  return { n: els.length, stolen: [...new Set(out)].slice(0, 12), count: out.length }; }"""
fails = passes = 0
def check(name, ok, extra=''):
    global fails, passes
    if ok: passes += 1
    else: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def page(b, w, h):
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, service_workers='block')
    await ctx.add_init_script(SKIP_WN); pg = await ctx.new_page()
    await pg.goto(URL); await pg.wait_for_selector('#stage')
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.first.is_visible(): await loc.first.click(force=True)
    await pg.wait_for_timeout(1800)
    return ctx, pg

async def scan(pg, where):
    for it in await pg.evaluate(SCAN, EXTRA):
        check(f'{where} contrast {it["kind"]} "{it["txt"]}"', it['r'] >= 4.5, f'{it["r"]}:1')
        if it['kind'] == 'label' and ('stu' in where or 'menu' in where): check(f'{where} label size "{it["txt"]}"', it['fs'] >= 14, f'{it["fs"]}px')

# Swatches can sit closer than 44px apart (row pitch 40px at 667x280), so a tap 21.5px out must land on a dot
# that is the nearest one within 3px (no dead gap; ties near the midline may go either way).
NEAR = """() => { const all = [...document.querySelectorAll('.stuColor')].filter(e => e.getBoundingClientRect().width); const c = (e) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  let bad = 0, pitch = 99; const why = []; for (const el of all) { const [cx, cy] = c(el);
    for (const o of all) if (o !== el) { const [ox, oy] = c(o); if (Math.abs(oy - cy) < 2) pitch = Math.min(pitch, Math.abs(ox - cx)); }
    for (const [dx, dy] of [[21.5,0],[-21.5,0],[0,21.5],[0,-21.5]]) { const x = cx + dx, y = cy + dy; if (y < 0 || y > innerHeight || x < 0 || x > innerWidth) continue; const hit = document.elementFromPoint(x, y); const sw = hit && hit.closest('.stuColor');
      const d = (e) => { const [a, b] = c(e); return Math.hypot(a - x, b - y); };
      const best = Math.min(...all.map(d)); const edge = !all.some(o => o !== el && d(o) < 30);
      if (sw ? d(sw) > best + 3 : !edge) { bad++; why.push([Math.round(x), Math.round(y), hit ? (hit.className || hit.tagName) : null]); } } }
  return { n: all.length, bad, why: why.slice(0, 4), pitch: Math.round(pitch), dot: all[0] ? Math.round(all[0].getBoundingClientRect().width) : 0 }; }"""
PAD = """(sel) => { const out = []; for (const el of document.querySelectorAll(sel)) { const r = el.getBoundingClientRect(); if (!r.width) continue;
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2; let ok = true;
  for (const [dx, dy] of [[21.5,0],[-21.5,0],[0,21.5],[0,-21.5]]) { const hit = document.elementFromPoint(cx + dx, cy + dy); if (!hit || hit.closest(sel) !== el) ok = false; }
  out.push({ ok, w: Math.round(r.width), h: Math.round(r.height) }); } return out; }"""

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for w, h in SIZES:
            sz = f'{w}x{h}'
            ctx, pg = await page(b, w, h)
            await pg.evaluate("() => document.querySelector('#tabs .tab:not(.on)')?.click()"); await pg.wait_for_timeout(600)
            await scan(pg, f'{sz} tabs')
            await pg.click('#btnMenu', force=True); await pg.wait_for_selector('#menuPop:not(.hidden)'); await pg.wait_for_timeout(500)
            await scan(pg, f'{sz} menu')
            m = await pg.evaluate("""() => { const x = document.getElementById('menuClose').getBoundingClientRect();
              const row = [...document.querySelectorAll('#menuPop .menuRow, #menuPop .menuSlot')].find(e => e.getBoundingClientRect().height > 0).getBoundingClientRect();
              const sky = document.querySelector('#menuPop .skyBtn'); const s = sky && sky.getBoundingClientRect();
              return { gap: row.top - x.bottom, ov: Math.max(0, Math.min(x.right, row.right) - Math.max(x.left, row.left)) > 0 && x.bottom > row.top, sky: s && s.width ? [s.width, s.height] : null }; }""")
            check(f'{sz} menu close X clear of first row', not m['ov'], f"gap {m['gap']:.0f}px")
            if m['sky']: check(f'{sz} sky button >= 44px', min(m['sky']) >= 44, str(m['sky']))
            await ctx.close()
            ctx, pg = await page(b, w, h)
            await tap(pg, '#btnDress'); await pg.wait_for_timeout(900)
            await pg.evaluate("() => { const o = [...document.querySelectorAll('.avOpt:not(.on)')].find(e => e.getBoundingClientRect().width); o && o.click(); }"); await pg.wait_for_timeout(400)
            await scan(pg, f'{sz} characters')
            await ctx.close()
            ctx, pg = await page(b, w, h)
            await tap(pg, '#btnStudio'); await pg.wait_for_selector('.studio canvas'); await pg.wait_for_timeout(600)
            await scan(pg, f'{sz} studio')
            nr = await pg.evaluate(NEAR)
            check(f'{sz} studio swatches: 44px taps land on the nearest dot, no dead gap', nr['n'] and nr['bad'] == 0, str(nr))
            x = await pg.evaluate("() => { const r = document.querySelector('.stuX').getBoundingClientRect(); return [r.width, r.height]; }")
            check(f'{sz} studio close >= 44px', min(x) >= 43.5, str(x))
            ov = await pg.evaluate("() => [...document.querySelectorAll('.stuTool span')].filter(s => s.scrollWidth > s.parentElement.clientWidth + 1).map(s => s.textContent)")
            check(f'{sz} studio tool labels fit', not ov, str(ov))
            await ctx.close()
            if min(w, h) >= 500 or w == 390:
                ctx, pg = await page(b, w, h)
                try:
                    await go(pg, 'park'); await pg.wait_for_timeout(600)
                    await pg.evaluate("() => document.getElementById('ball').scrollIntoView({block: 'center', inline: 'center'})"); await pg.wait_for_timeout(500)
                    bp = await pg.evaluate(PAD, '#ball')
                    if not all(x['ok'] for x in bp): print('  ball hits', await pg.evaluate(BALLDBG), flush=True)
                    check(f'{sz} park ball 44px hit box', bp and all(x['ok'] for x in bp), str(bp))
                    st = await pg.evaluate(STEAL)
                    check(f'{sz} park ball pad does not cover hotspots / chat', st['n'] > 0 and st['count'] == 0, str(st))
                except Exception as e: check(f'{sz} park nav', False, str(e).splitlines()[0][:120])
                await ctx.close()
        await b.close()
    print(f'RESULT {passes} pass {fails} fail', flush=True); sys.exit(1 if fails else 0)
asyncio.run(main())
