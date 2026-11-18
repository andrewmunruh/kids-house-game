# B14 item 5: a sitting or lying doll stays inside the room's inner frame when the bed is
# at the left or right edge. Saved bed.x must not change. Flip the bed for the right edge.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL = os.environ.get('URL') or (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5370/kids-house-game/')
BROWSERS = [b for b in os.environ.get('BROWSERS', 'chromium,webkit').split(',') if b]
SIZES = [(820, 1180), (1180, 820)]
INSET = 10
TOL = 2
fails = passes = 0

def rec(ok, name, extra=''):
    global fails, passes
    if ok: passes += 1; print('PASS', name, extra, flush=True)
    else: fails += 1; print('FAIL', name, extra, flush=True)

SETUP = """({side, pose, flip}) => {
  const s = __store.get();
  __store.dispatch({type:'room/switch', room:'bedroom'});
  document.getElementById('modePlay')?.click();
  const bed = s.rooms.bedroom.items.find(i => i.kind === 'bed' || /(^|:)bed$/.test(i.kind) || String(i.kind).includes('bed'));
  if (!bed) return {ok:false, why:'no bed'};
  const el = document.querySelector(`.item[data-id="${bed.id}"]`);
  const st = document.getElementById('stage');
  const viewW = parseFloat(st.style.width) || 1000;
  const sc = st.getBoundingClientRect().width / viewW;
  const w = el && sc ? el.getBoundingClientRect().width / sc : 300;
  const ROOM_W = 2400;
  const half = w / 2;
  // Same clamp the drag path uses: center may sit 0.6*half from the world edge.
  const x = side === 'left' ? Math.round(half * 0.6) : Math.round(ROOM_W - half * 0.6);
  if (!!bed.flip !== !!flip) __store.dispatch({type:'item/flip', room:'bedroom', id:bed.id});
  __store.dispatch({type:'item/move', room:'bedroom', id:bed.id, x, y: bed.y});
  const savedX = __store.get().rooms.bedroom.items.find(i => i.id === bed.id).x;
  const doll = __store.get().characters[0];
  if (doll) {
    __store.dispatch({type:'char/move', id:doll.id, room:'bedroom', x, y:bed.y, seat:{item:bed.id, pose, n:0}});
  }
  const view = parseFloat(st.style.width) || 1000;
  __cam.set(side === 'left' ? 0 : Math.max(0, ROOM_W - view));
  return {ok:true, bedId:bed.id, wantX:x, savedX, y:bed.y, kind:bed.kind, w, flip:!!__store.get().rooms.bedroom.items.find(i => i.id === bed.id).flip};
}"""

MEASURE = """() => {
  const stage = document.getElementById('stage').getBoundingClientRect();
  const pad = 10;
  const inner = {l: stage.left + pad, r: stage.right - pad, t: stage.top + pad, b: stage.bottom - pad};
  const dolls = [...document.querySelectorAll('#layer .char, #layer .avatar, #layer .savatar')];
  const boxes = dolls.map(el => {
    const bits = [el, ...el.querySelectorAll('svg, img, canvas, .inner')];
    const all = bits.map(n => n.getBoundingClientRect()).filter(b => b.width > 2 && b.height > 2);
    if (!all.length) return null;
    const l = Math.min(...all.map(b => b.left)), r = Math.max(...all.map(b => b.right));
    const t = Math.min(...all.map(b => b.top)), bt = Math.max(...all.map(b => b.bottom));
    const overflow = {
      L: Math.max(0, Math.round((inner.l - l) * 10) / 10),
      R: Math.max(0, Math.round((r - inner.r) * 10) / 10),
      T: Math.max(0, Math.round((inner.t - t) * 10) / 10),
      B: Math.max(0, Math.round((bt - inner.b) * 10) / 10),
    };
    return {l, r, t, b:bt, overflow, pose: [...el.classList].filter(c => c.startsWith('pose-'))};
  }).filter(Boolean);
  const seat = __store.get().characters[0]?.seat;
  const bedIt = seat && __store.get().rooms.bedroom.items.find(i => i.id === seat.item);
  return {boxes, bedX: bedIt && bedIt.x, bedFlip: !!(bedIt && bedIt.flip), seat};
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
    for side in ('left', 'right'):
        for pose in ('lie', 'sit'):
            flip = (side == 'right')
            info = await pg.evaluate(SETUP, {'side': side, 'pose': pose, 'flip': flip})
            rec(info.get('ok') and abs(info['savedX'] - info['wantX']) < 1,
                f'{tag} {side} {pose} bed placed at edge', info)
            await pg.wait_for_timeout(500)
            m = await pg.evaluate(MEASURE)
            rec(m.get('bedX') == info.get('savedX'),
                f'{tag} {side} {pose} saved bed.x unchanged',
                {'saved': info.get('savedX'), 'now': m.get('bedX')})
            rec(m.get('seat') and m['seat'].get('pose') == pose,
                f'{tag} {side} {pose} seat pose', m.get('seat'))
            if not m['boxes']:
                rec(False, f'{tag} {side} {pose} doll sprite found', m)
                continue
            worst = max(max(b['overflow'].values()) for b in m['boxes'])
            rec(worst <= TOL, f'{tag} {side} {pose} sprite inside inner stage (±{TOL}px)',
                {'worst': worst, 'boxes': m['boxes']})
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
