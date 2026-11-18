# B14 item 3: on a 390x844 phone in Play, the stage fills the wrap (no ~120px letterbox gap).
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
SIZES = [(390, 844)]
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

MEASURE = """() => {
  const stage = document.getElementById('stage').getBoundingClientRect();
  const wrap = document.getElementById('stageWrap').getBoundingClientRect();
  return {
    stage: {x:stage.x,y:stage.y,w:stage.width,h:stage.height},
    wrap: {x:wrap.x,y:wrap.y,w:wrap.width,h:wrap.height},
    dy: Math.round(stage.y - wrap.y),
    dh: Math.round(wrap.height - stage.height),
    play: document.body.classList.contains('mode-play'),
    portrait: document.body.classList.contains('phone-portrait'),
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
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, service_workers='block')
    await ctx.add_init_script(SKIP_WN + ";localStorage.setItem('avatar-intro','1');localStorage.setItem('cozy-welcome','1');")
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='domcontentloaded')
    await dismiss(pg)
    await pg.evaluate("""() => {
      __store.dispatch({type:'room/switch', room:'living'});
      document.getElementById('modePlay')?.click();
    }""")
    await pg.wait_for_timeout(800)
    m = await pg.evaluate(MEASURE)
    rec(m['play'] and m['portrait'], f'{tag} Play phone portrait', m)
    rec(abs(m['dy']) <= 16, f'{tag} stage.y within 16px of wrap.y', m)
    rec(m['stage']['h'] >= m['wrap']['h'] - 24, f'{tag} stage fills wrap height (−24px)', m)
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
