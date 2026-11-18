# B14 item 1: in iPad portrait Play, the Backyard label must not float on empty wallpaper.
# Hidden when the painted door is off-stage; on the door after a pan that brings it on-stage.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
SIZES = [(820, 1180), (1024, 1366)]
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

MEASURE = """() => {
  const stage = document.getElementById('stage').getBoundingClientRect();
  const door = document.querySelector('.yardDoor');
  const art = door && door.querySelector('.doorArt');
  const hint = door && door.querySelector('.yardHintLabel');
  const box = el => { if (!el) return null; const b = el.getBoundingClientRect(); return {l:b.left,r:b.right,t:b.top,b:b.bottom,w:b.width,h:b.height}; };
  const overlapW = (a, b) => Math.min(a.r, b.r) - Math.max(a.l, b.l);
  const overlapH = (a, b) => Math.min(a.b, b.b) - Math.max(a.t, b.t);
  const stageBox = {l:stage.left,r:stage.right,t:stage.top,b:stage.bottom};
  const onStageEnough = b => !!(b && overlapW(b, stageBox) > Math.max(16, b.w * 0.3) && overlapH(b, stageBox) > 20);
  const vis = hint && getComputedStyle(hint).visibility !== 'hidden' && getComputedStyle(hint).display !== 'none'
    && (parseFloat(getComputedStyle(hint).opacity) || 1) > 0.05;
  const artB = box(art) || box(door), hintB = box(hint);
  // The pill sits just above the door (bottom: 100% + 6px), so it may not overlap the art box.
  const cx = b => (b.l + b.r) / 2;
  const labelOnDoor = !!(vis && hintB && artB
    && Math.abs(cx(hintB) - cx(artB)) <= Math.max(24, artB.w * 0.6)
    && hintB.b <= artB.t + 24 && hintB.b >= artB.t - 80);
  return {
    doorOnStage: onStageEnough(artB),
    labelShown: !!(vis && hintB && overlapW(hintB, stageBox) > 8 && overlapH(hintB, stageBox) > 8),
    labelOnDoor,
    labelVis: hint ? getComputedStyle(hint).visibility : null,
    room: __store.get().currentRoom,
    play: document.body.classList.contains('mode-play'),
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
    phone = min(w, h) <= 500
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=phone, service_workers='block')
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
    rec(m['play'] and m['room'] == 'living', f'{tag} Play living', m)
    if not m['doorOnStage']:
        rec(not m['labelShown'] and m['labelVis'] == 'hidden', f'{tag} label hidden while door is off-stage', m)
    else:
        rec(m['labelShown'] and m['labelOnDoor'], f'{tag} label already on the on-stage door', m)
    await pg.evaluate("""() => {
      const kid = __store.get().characters[0];
      if (kid) __store.dispatch({type:'char/move', id:kid.id, room:'living', x:824, y:400, seat:null});
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(824 - viewW / 2);
    }""")
    await pg.wait_for_timeout(500)
    m2 = await pg.evaluate(MEASURE)
    rec(m2['doorOnStage'] and m2['labelShown'] and m2['labelOnDoor'],
        f'{tag} label sits on the door after pan', m2)
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
