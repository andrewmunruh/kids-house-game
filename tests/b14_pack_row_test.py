# B14 item 4: a single pack row at the original (c2327fe) stage size. It scrolls
# horizontally with a soft right-edge fade; every pack is reachable; a tap selects
# and must not start a scroll. Play/Decorate stay pinned in the dock.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
REF_URL = os.environ.get('REF_URL')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
# 820x1180 is under 900px so the row still wraps, as on c2327fe. The other three scroll.
SIZES = [(1024, 768), (1180, 820), (820, 1180), (1366, 1024)]
SCROLLS = {(1024, 768), (1180, 820), (1366, 1024)}
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

STAGE = """() => {
  const b = document.getElementById('stage').getBoundingClientRect();
  return {w: Math.round(b.width), h: Math.round(b.height)};
}"""

MEASURE = """() => {
  const top = document.querySelector('.drawerTop');
  const bar = document.getElementById('drawerBar');
  const cs = getComputedStyle(top);
  const packs = [...document.querySelectorAll('#cats button.cat.pack')].map(el => {
    const b = el.getBoundingClientRect();
    const name = (el.querySelector('.packname')?.textContent || el.getAttribute('aria-label') || el.textContent || '').replace(/\\s+/g,' ').trim();
    return {name, l:b.left, r:b.right, t:b.top, b:b.bottom, w:b.width};
  });
  const modes = ['modePlay', 'modeDecorate'].map(id => {
    const el = document.getElementById(id);
    const b = el.getBoundingClientRect();
    return {id, l:b.left, r:b.right, t:b.top, b:b.bottom,
      onScreen: b.width > 2 && b.left >= -1 && b.right <= innerWidth + 1 && b.top >= -1 && b.bottom <= innerHeight + 1};
  });
  const overflow = top.scrollWidth - top.clientWidth;
  return {
    scrollW: top.scrollWidth, clientW: top.clientWidth, scrollL: top.scrollLeft, overflow,
    wrap: cs.flexWrap, touch: cs.touchAction, overflowX: cs.overflowX,
    more: bar.classList.contains('more'),
    mask: (cs.webkitMaskImage || cs.maskImage || '').length > 8,
    cue: (() => { const c = document.getElementById('chipCue'); if (!c) return false;
      const d = getComputedStyle(c).display; return d !== 'none' && d !== ''; })(),
    packs, modes,
  };
}"""

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    await pg.wait_for_timeout(400)
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      document.querySelector('.whatsNew .wnGo')?.click();
    }""")

async def open(browser, url, w, h):
    phone = min(w, h) <= 500
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=phone, service_workers='block')
    await ctx.add_init_script(SKIP_WN + ";localStorage.setItem('avatar-intro','1');localStorage.setItem('cozy-welcome','1');")
    pg = await ctx.new_page()
    await pg.goto(url, wait_until='domcontentloaded')
    await dismiss(pg)
    await pg.evaluate("() => document.getElementById('modeDecorate')?.click()")
    await pg.wait_for_timeout(500)
    return ctx, pg

async def run(bname, browser, w, h):
    tag = f'{bname} {w}x{h}'
    ctx, pg = await open(browser, URL, w, h)
    m = await pg.evaluate(MEASURE)
    if (w, h) in SCROLLS:
        rec(m['wrap'] == 'nowrap' and m['overflowX'] in ('auto', 'scroll'),
            f'{tag} pack row is a single scrolling row',
            f"wrap={m['wrap']} overflowX={m['overflowX']} touch={m['touch']}")
        rec(m['overflow'] > 8 or len(m['packs']) <= 2,
            f'{tag} row can scroll (or every pack already fits)',
            f"overflow={m['overflow']} packs={len(m['packs'])}")
        if m['overflow'] > 8:
            rec(m['more'] and (m['mask'] or m['cue']),
                f'{tag} soft right-edge fade or peek when there is more',
                f"more={m['more']} mask={m['mask']} cue={m['cue']}")
        packs = pg.locator('#cats button.cat.pack')
        n = await packs.count()
        rec(n >= 2, f'{tag} several packs exist to scroll among', n)
        for i in range(n):
            await pg.evaluate("() => { const t=document.querySelector('.drawerTop'); t.scrollLeft=0; t.dispatchEvent(new Event('scroll')); }")
            await pg.wait_for_timeout(60)
            el = packs.nth(i)
            name = (await el.get_attribute('aria-label')) or f'#{i}'
            await el.evaluate("el => el.scrollIntoView({inline:'nearest', block:'nearest'})")
            await pg.wait_for_timeout(80)
            box = await el.bounding_box()
            rec(bool(box) and box['x'] >= -2 and box['x'] + box['width'] <= w + 2,
                f'{tag} pack {name} reachable by scrolling', box)
            sl0 = await pg.evaluate("() => document.querySelector('.drawerTop').scrollLeft")
            await el.tap()
            await pg.wait_for_timeout(80)
            sl1 = await pg.evaluate("() => document.querySelector('.drawerTop').scrollLeft")
            on = await el.evaluate("el => el.classList.contains('on')")
            rec(abs(sl1 - sl0) <= 2, f'{tag} tap {name} does not start a scroll', f'sl0={sl0} sl={sl1}')
            rec(on, f'{tag} tap {name} selects the pack')
    else:
        rec(m['wrap'] == 'wrap' or m['overflow'] <= 8,
            f'{tag} portrait pack row still wraps or already fits (c2327fe behaviour)',
            f"wrap={m['wrap']} overflow={m['overflow']}")
        for pack in m['packs']:
            rec(pack['l'] >= -2 and pack['r'] <= w + 2,
                f'{tag} {pack["name"]} on screen without a required side scroll', pack)
    for mode in m['modes']:
        rec(mode['onScreen'], f'{tag} {mode["id"]} pinned on screen', mode)

    if REF_URL:
        rctx, rpg = await open(browser, REF_URL, w, h)
        ref = await rpg.evaluate(STAGE)
        cur = await pg.evaluate(STAGE)
        rec(abs(ref['w'] - cur['w']) <= 2 and abs(ref['h'] - cur['h']) <= 2,
            f'{tag} stage size matches c2327fe', f"ref {ref['w']}x{ref['h']} now {cur['w']}x{cur['h']}")
        await rctx.close()
    await ctx.close()

async def main():
    os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')
    async with async_playwright() as p:
        for bname in BROWSERS:
            browser = await getattr(p, bname).launch()
            try:
                for w, h in SIZES:
                    await run(bname, browser, w, h)
            finally:
                await browser.close()
    print(f'RESULT {passes} pass {fails} fail', flush=True)
    sys.exit(1 if fails else 0)

asyncio.run(main())
