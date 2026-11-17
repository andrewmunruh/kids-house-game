# B14 item 2: at 1024-wide (and 820 portrait), the opening clubhouse view fits the left plant,
# first Slay table, its chairs, and the poster at x≈980. Do not require a scroll.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
SIZES = [(1024, 768), (1024, 1366), (820, 1180)]
PAD = 2
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

MEASURE = """() => {
  const portEl = document.getElementById('grScroll') || document.getElementById('gameroom');
  const port = portEl.getBoundingClientRect();
  const box = el => { if (!el) return null; const b = el.getBoundingClientRect(); return {l:b.left,r:b.right,t:b.top,b:b.bottom,w:b.width,h:b.height}; };
  const inside = (b, pad=2) => !!(b && b.l >= port.left - pad && b.r <= port.right + pad && b.t >= port.top - pad && b.b <= port.bottom + pad);
  const svg = document.querySelector('#grWorld svg.grScene, #grWorld svg');
  const plant = svg && [...svg.querySelectorAll('g')].find(g => /^translate\\(40\\b/.test((g.getAttribute('transform') || '').trim()));
  const poster = svg && [...svg.querySelectorAll('.photoFrame')].find(g => /translate\\(980\\b/.test(g.getAttribute('transform') || ''));
  const table = document.querySelector('.grTable[data-tb="0"]');
  const chairs = [...document.querySelectorAll('.grChair[data-tb="0"]')].map(box);
  return {
    scrollL: portEl && 'scrollLeft' in portEl ? portEl.scrollLeft : 0,
    plant: box(plant), poster: box(poster), table: box(table), chairs,
    plantIn: inside(box(plant)), posterIn: inside(box(poster)), tableIn: inside(box(table)),
    chairsIn: chairs.length > 0 && chairs.every(c => inside(c)),
    nChairs: chairs.length,
    port: {l:port.left,r:port.right,t:port.top,b:port.bottom,w:port.width,h:port.height},
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
    await go(pg, 'gameroom')
    await pg.wait_for_timeout(900)
    m = await pg.evaluate(MEASURE)
    rec(abs(m['scrollL']) < 1, f'{tag} clubhouse opens at scroll 0', m['scrollL'])
    rec(m['plantIn'], f'{tag} left plant fully on screen', m.get('plant'))
    rec(m['tableIn'], f'{tag} first Slay table fully on screen', m.get('table'))
    rec(m['chairsIn'] and m['nChairs'] >= 4, f'{tag} first table chairs fully on screen', {'n': m['nChairs'], 'chairs': m['chairs']})
    rec(m['posterIn'], f'{tag} poster at x≈980 fully on screen', m.get('poster'))
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
