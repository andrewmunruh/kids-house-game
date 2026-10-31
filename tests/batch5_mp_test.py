# Batch 5 in the browser: friend move notes, nack toasts, roster lines, one first-run card, smooth friend glide.
# usage: python tests/batch5_mp_test.py   (WEB_PORT / HOOD_PORT from run.sh)
import asyncio, os, sys, json, random, time
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, tap, to_map
WP = os.environ.get('WEB_PORT', '4173'); HP = os.environ.get('HOOD_PORT', '8787')
URL = f'http://localhost:{WP}/kids-house-game/?hood=http://localhost:{HP}'
SHOTS = os.environ.get('B5_SHOTS', '/tmp/b5-shots'); os.makedirs(SHOTS, exist_ok=True)
fails = []
def check(n, ok, x=''):
    print(('PASS ' if ok else 'FAIL ') + n, x, flush=True)
    if not ok: fails.append(n)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nick):
    await tap(pg, '#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    if await pg.locator('[data-m="bring"]').count(): await pg.click('[data-m="bring"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)
async def toasts(pg): return await pg.evaluate("[...document.querySelectorAll('.toast')].map(e => e.innerText)")
async def wait_toast(pg, text, t=4.0):
    t0 = time.monotonic()
    while time.monotonic() - t0 < t:
        if any(text in s for s in await toasts(pg)): return True
        await asyncio.sleep(0.05)
    return False

FIRST = """() => { const vis = el => !!el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
  return { wn: [...document.querySelectorAll('.whatsNew')].filter(vis).length, phone: vis(document.getElementById('phoneNote')) ? 1 : 0, hint: [...document.querySelectorAll('.modeHint')].filter(vis).length }; }"""

async def first_run(b):
    # Brand-new phone (portrait): welcome card, "turn sideways" note, and mode tip must come one at a time.
    c = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, has_touch=True, is_mobile=True)
    pg = await c.new_page(); await pg.goto(URL)
    peak = 0; seen = []
    for _ in range(40):
        s = await pg.evaluate(FIRST); seen.append(s); peak = max(peak, s['wn'] + s['phone'] + s['hint']); await asyncio.sleep(0.05)
    check('first run: a welcome card shows', any(s['wn'] for s in seen))
    await pg.screenshot(path=f'{SHOTS}/b5-01-first-run-welcome.png')
    await pg.click('#wnGo', force=True); await pg.wait_for_timeout(300)
    for _ in range(20):
        s = await pg.evaluate(FIRST); seen.append(s); peak = max(peak, s['wn'] + s['phone'] + s['hint']); await asyncio.sleep(0.05)
    check('first run: never more than one card or tip at a time', peak <= 1, json.dumps(seen[-1]))
    check('first run: after the welcome, the "turn sideways" note comes alone', seen[-1]['phone'] == 1 and seen[-1]['hint'] == 0, json.dumps(seen[-1]))
    await pg.screenshot(path=f'{SHOTS}/b5-02-first-run-after-welcome.png')
    await pg.click('#phoneOk'); await pg.wait_for_timeout(400)
    s = await pg.evaluate(FIRST)
    check('first run: the mode tip comes last, on its own', s == {'wn': 0, 'phone': 0, 'hint': 1}, json.dumps(s))
    await pg.screenshot(path=f'{SHOTS}/b5-02b-first-run-tip.png')
    await c.close()

async def street(cb, wb):
    async def mk(br, w=1180, h=820):
        c = await br.new_context(viewport={'width': w, 'height': h}); await c.add_init_script(SKIP_WN)
        pg = await c.new_page(); await pg.goto(URL); await pg.wait_for_timeout(700); return pg
    P = await mk(cb); K = await mk(wb); X = await mk(cb)
    await tap(P, '#btnHood'); await P.click('[data-m="create"]'); await adult(P)
    await P.wait_for_selector('#newCode'); await P.click('[data-m="setup"]'); await P.wait_for_selector('#pCode')
    for n in ('Reagan', 'Chloe'): await P.click(f'.sugg button:has-text("{n}")'); await P.wait_for_timeout(250)
    await P.fill('#rosterInput', 'chloe'); await P.press('#rosterInput', 'Enter')
    check('MP-8: adding a name twice says so', await wait_toast(P, 'Chloe is already on the list'), await toasts(P))
    await P.screenshot(path=f'{SHOTS}/b5-03-roster-dup.png')
    code = (await P.inner_text('#pCode')).strip(); await P.click('.hoodSheet [data-m="close"]')
    await join(P, code, 'Reagan'); await join(K, code, 'Chloe')
    # MP-9: everyone on the list is playing
    await tap(X, '#btnHood'); await X.click('[data-m="join"]'); await X.fill('#codeInput', code.lower()); await X.click('#codeForm button')
    await X.wait_for_selector('.nicks', timeout=6000); await X.wait_for_timeout(300)
    txt = await X.inner_text('.hoodSheet')
    check('MP-9: all names taken shows a next step', "Everyone's already playing! Ask a grown-up to add your name." in txt, txt[:120])
    await X.screenshot(path=f'{SHOTS}/b5-04-all-signed-in.png')
    hid = await P.evaluate("__hood().myHouseId()")
    for pg in (P, K): await to_map(pg); await pg.click(f'[data-go="house:{hid}"]'); await pg.wait_for_timeout(1500)
    # MP-16: Chloe moves a piece in Reagan's room; Reagan sees a small note
    room = await P.evaluate("__store.get().currentRoom")
    it = await P.evaluate("(r) => { const i = __store.get().rooms[r].items[0]; return i ? {id: i.id, x: i.x, y: i.y} : null }", room)
    await K.evaluate("([h, r, i]) => __hood().dispatch(h, {type: 'item/move', room: r, id: i.id, x: i.x + 40, y: i.y})", [hid, room, it])
    check('MP-16: owner sees "Chloe moved the ..."', await wait_toast(P, 'Chloe moved the'), await toasts(P))
    await P.screenshot(path=f'{SHOTS}/b5-05-chloe-moved.png')
    # MP-5: locked house nack toast for the visitor
    await P.evaluate("(h) => __hood().lock(h, true)", hid); await P.wait_for_timeout(600)
    await K.evaluate("([h, r, i]) => __hood().dispatch(h, {type: 'item/move', room: r, id: i.id, x: i.x + 80, y: i.y})", [hid, room, it])
    check('MP-5: locked house says why', await wait_toast(K, 'This house is locked'), await toasts(K))
    await K.screenshot(path=f'{SHOTS}/b5-06-locked-toast.png')
    await P.evaluate("(h) => __hood().lock(h, false)", hid); await P.wait_for_timeout(400)
    # MP-14: Reagan's updates arrive every 220-300 ms; Chloe's screen should glide, not dash-and-stop.
    pid = await P.evaluate("__hood().pid")
    await K.evaluate("""(id) => { window.__trk = []; const f = () => { const e = document.querySelector(`.char.avatar[data-pid="${id}"]`);
      if (e) __trk.push([performance.now(), e.getBoundingClientRect().x]); if (__trk.length < 4000) requestAnimationFrame(f); }; requestAnimationFrame(f); }""", pid)
    p0 = await P.evaluate("__hood().myPresence()")
    random.seed(5); x = p0['x']; steps = 14
    for i in range(steps):
        x += 39  # world px per update, steady speed
        await P.evaluate("(x) => __hood().setPresence({...__hood().myPresence(), x})", x)
        await asyncio.sleep(random.uniform(0.22, 0.30))
    await asyncio.sleep(0.6)
    trk = await K.evaluate("__trk")
    xs = [(t, v) for t, v in trk]
    moving = [(a, b) for a, b in zip(xs, xs[1:]) if b[0] > a[0]]
    first = next((i for i, (a, b) in enumerate(moving) if abs(b[1] - a[1]) > 0.5), None)
    last = max((i for i, (a, b) in enumerate(moving) if abs(b[1] - a[1]) > 0.5), default=None)
    if first is None:
        check('MP-14: friend glides smoothly', False, 'no movement seen'); return P, K, X
    seg = xs[first:last + 2]; span_t = seg[-1][0] - seg[0][0]; mean = abs(seg[-1][1] - seg[0][1]) / span_t
    peak = 0
    for i in range(len(seg)):
        j = i
        while j < len(seg) and seg[j][0] - seg[i][0] < 60: j += 1
        if j < len(seg): peak = max(peak, abs(seg[j][1] - seg[i][1]) / (seg[j][0] - seg[i][0]))
    still = sum(1 for a, b in zip(seg, seg[1:]) if abs(b[1] - a[1]) < 0.05) / max(1, len(seg) - 1)
    ratio = peak / mean if mean else 99
    check('MP-14: friend glides smoothly (peak/mean speed < 1.6)', ratio < 1.6, f'ratio={ratio:.2f} still_frames={still:.0%} frames={len(seg)}')
    return P, K, X

async def main():
    async with async_playwright() as p:
        cb = await p.chromium.launch(); wb = await p.webkit.launch()
        await first_run(cb)
        await street(cb, wb)
        await cb.close(); await wb.close()
    print('BATCH5_MP', 'FAIL' if fails else 'OK', fails)
    sys.exit(1 if fails else 0)
asyncio.run(main())
