# B14 item 4: on iPad landscape, pack chips (including Cozy Cottage and Winter Cheer) are fully
# visible with no required horizontal scroll. Play/Decorate stay pinned on screen.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
SIZES = [(1180, 820), (1366, 1024), (1024, 768)]
NEED = ('Cozy Cottage', 'Winter Cheer')
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

MEASURE = """() => {
  const top = document.querySelector('.drawerTop');
  const tb = top.getBoundingClientRect();
  const packs = [...document.querySelectorAll('.cat.pack')].map(el => {
    const b = el.getBoundingClientRect();
    const name = (el.querySelector('.packname')?.textContent || el.getAttribute('aria-label') || '').trim();
    const onScreen = b.left >= -1 && b.right <= innerWidth + 1 && b.top >= -1 && b.bottom <= innerHeight + 1;
    const inRow = b.left >= tb.left - 2 && b.right <= tb.right + 2;
    return {name, l:b.left, r:b.right, t:b.top, b:b.bottom, w:b.width, h:b.height, onScreen, inRow};
  });
  const modes = ['modePlay', 'modeDecorate'].map(id => {
    const el = document.getElementById(id);
    const b = el.getBoundingClientRect();
    return {id, l:b.left, r:b.right, t:b.top, b:b.bottom, onScreen: b.width > 2 && b.left >= -1 && b.right <= innerWidth + 1 && b.top >= -1 && b.bottom <= innerHeight + 1};
  });
  return {
    scrollW: top.scrollWidth, clientW: top.clientWidth, scrollL: top.scrollLeft,
    packs, modes,
    wrap: getComputedStyle(top).flexWrap,
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

async def run(bname, browser, w, h):
    tag = f'{bname} {w}x{h}'
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=False, service_workers='block')
    await ctx.add_init_script(SKIP_WN + ";localStorage.setItem('avatar-intro','1');localStorage.setItem('cozy-welcome','1');")
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='domcontentloaded')
    await dismiss(pg)
    await pg.evaluate("() => document.getElementById('modeDecorate')?.click()")
    await pg.wait_for_timeout(500)
    m = await pg.evaluate(MEASURE)
    rec(m['scrollW'] <= m['clientW'] + 1, f'{tag} pack row needs no horizontal scroll',
        f"scrollW={m['scrollW']} clientW={m['clientW']} wrap={m['wrap']}")
    for want in NEED:
        hit = next((p for p in m['packs'] if want in p['name']), None)
        rec(bool(hit and hit['onScreen'] and hit['inRow']), f'{tag} {want} fully visible', hit)
    for mode in m['modes']:
        rec(mode['onScreen'], f'{tag} {mode["id"]} pinned on screen', mode)
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
