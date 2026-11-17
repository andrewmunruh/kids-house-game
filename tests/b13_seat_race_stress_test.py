# B13 item 4 stress: two new clients race a kitchen chair.
# 20 iterations on chromium and on webkit. Near-simultaneous drops, plus one
# client delayed / on a slow network. Merged, host, and guest views must agree
# with no double-booking.
import asyncio, json, os, sys, time
from playwright.async_api import async_playwright

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

WEB = opt('--web-port', 'WEB_PORT', '5370')
HOOD = opt('--hood-port', 'HOOD_PORT', '5371')
NEW = opt('--url', 'NEWURL', f'http://127.0.0.1:{WEB}/kids-house-game/')
HOOD_URL = opt('--hood', 'HOOD', f'http://127.0.0.1:{HOOD}')
assert 'workers.dev' not in HOOD_URL, 'local hood only'
URL = NEW.rstrip('/') + ('/' if 'kids-house-game' in NEW else '/kids-house-game/')
if 'hood=' not in URL:
    URL = URL + ('&' if '?' in URL else '?') + f'hood={HOOD_URL}'
ITERS = int(opt('--iters', 'SEAT_RACE_ITERS', '20'))
BROWSERS = [b for b in opt('--browsers', 'BROWSERS', 'chromium,webkit').split(',') if b]
INIT = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"
os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')

results = []

def rec(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + extra) if extra else ''), flush=True)
    results.append((name, bool(ok), extra))

async def dismiss(pg):
    await pg.evaluate("() => { for (const s of ['#phoneOk','#wnGo','.whatsNew .wnGo']) { const e=document.querySelector(s); if(e&&e.offsetParent) e.click(); } }")

async def play(pg):
    await pg.evaluate("() => document.getElementById('modePlay')?.click()")
    await pg.wait_for_timeout(200)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()")
    await pg.wait_for_timeout(300)
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.wait_for_selector('.nicks button', timeout=15000)
    n = await pg.locator(f'.nicks button[data-nick="{nick_i}"]').count()
    if n:
        await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    else:
        await pg.locator('.nicks button:not([disabled])').nth(nick_i).click()
    await pg.wait_for_timeout(400)
    if await pg.locator('[data-m="bring"]').count():
        await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=20000)

async def go_home(host, guest):
    await host.evaluate("() => { const m=document.querySelector('#mapWorld .mapHouse.mine'); if(m) m.click(); }")
    await host.wait_for_timeout(900)
    hid = await host.evaluate("() => (window.__hood && __hood().myHouseId && __hood().myHouseId()) || ''")
    await guest.wait_for_timeout(400)
    clicked = await guest.evaluate("""(h) => {
      const sel = h ? `#mapWorld .mapHouse[data-go="house:${h}"]` : '#mapWorld .mapHouse:not(.mine)';
      const el = document.querySelector(sel) || document.querySelector('#mapWorld .mapHouse');
      if (!el) return false;
      el.click();
      return true;
    }""", hid)
    await guest.wait_for_timeout(1200)
    return hid, clicked

READ = """() => {
  const h = __hood();
  const norm = (seat) => seat ? {item: seat.item || seat.id, pose: seat.pose, n: seat.n} : null;
  const rows = [];
  const add = (pid, p) => {
    if (!p || p.where !== 'house') return;
    rows.push({pid, room:p.room, x:Math.round(p.x), y:Math.round(p.y), seat: norm(p.seat)});
  };
  if (h.presence && h.presence.forEach) h.presence.forEach((p, pid) => { if (pid !== h.pid) add(pid, p); });
  const me = (window.__myPres && __myPres()) || null;
  if (h.pid && me) add(h.pid, me);
  return {pid: h.pid, rows};
}"""

def seat_key(row):
    s = row.get('seat')
    if not s or not (s.get('item') or s.get('id')): return None
    return f"{s.get('item') or s.get('id')}:{s.get('n', 0)}"

def views_ok(host, guest):
    by_h = {r['pid']: r for r in (host or {}).get('rows') or []}
    by_g = {r['pid']: r for r in (guest or {}).get('rows') or []}
    pids = set(by_h) | set(by_g)
    if len(pids) < 2:
        return False, 'need two people', by_h, by_g
    if set(by_h) != set(by_g):
        return False, 'pid sets differ', by_h, by_g
    keys = []
    for pid in pids:
        a, b = by_h[pid], by_g[pid]
        if seat_key(a) != seat_key(b) or a.get('room') != b.get('room'):
            return False, f'views disagree on {pid}', by_h, by_g
        k = seat_key(a)
        if k: keys.append((pid, k))
    taken = [k for _, k in keys]
    if len(taken) != len(set(taken)):
        return False, 'double-booked', by_h, by_g
    return True, 'ok', by_h, by_g

async def go_kitchen(A, B):
    await A.evaluate("() => __store.dispatch({type:'room/switch', room:'kitchen'})")
    await B.evaluate("() => { const t=document.querySelector('[data-room=\"kitchen\"]'); if(t) t.click(); else __store.dispatch({type:'room/switch', room:'kitchen'}); }")
    await A.wait_for_timeout(300)
    await B.wait_for_timeout(200)

async def stand_up(pg):
    await pg.evaluate("() => { if (window.__applyAvatarPlayDrop) __applyAvatarPlayDrop(520, 540, null); }")

async def table_of(pg):
    return await pg.evaluate("() => __store.get().rooms.kitchen.items.find(i => /(^|-)table$/.test(String(i.kind||'').replace(/^pack:/,'').toLowerCase()))")

async def wait_agree(A, B, timeout=3.5):
    last = (None, None)
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        ha, hb = await A.evaluate(READ), await B.evaluate(READ)
        last = (ha, hb)
        ok, why, _, _ = views_ok(ha, hb)
        if ok:
            return True, why, ha, hb
        await asyncio.sleep(0.1)
    why = views_ok(last[0], last[1])[1]
    return False, why, last[0], last[1]

async def slow_chromium(page, on):
    try:
        sess = await page.context.new_cdp_session(page)
        if on:
            await sess.send('Network.enable')
            await sess.send('Network.emulateNetworkConditions', {
                'offline': False, 'latency': 250, 'downloadThroughput': 40 * 1024, 'uploadThroughput': 20 * 1024,
            })
        else:
            await sess.send('Network.emulateNetworkConditions', {
                'offline': False, 'latency': 0, 'downloadThroughput': -1, 'uploadThroughput': -1,
            })
        return True
    except Exception:
        return False

async def run_browser(p, bname):
    browser = await getattr(p, bname).launch()
    try:
        cA = await browser.new_context(viewport={'width': 820, 'height': 1180}, has_touch=True, device_scale_factor=1)
        cB = await browser.new_context(viewport={'width': 820, 'height': 1180}, has_touch=True, device_scale_factor=1)
        await cA.add_init_script(INIT)
        await cB.add_init_script(INIT)
        A = await cA.new_page()
        B = await cB.new_page()
        await A.goto(URL, wait_until='domcontentloaded')
        await B.goto(URL, wait_until='domcontentloaded')
        await A.wait_for_selector('#stage', timeout=25000)
        await B.wait_for_selector('#stage', timeout=25000)
        await dismiss(A); await dismiss(B)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True)
        await join(B, code, 1, False)
        hid, clicked = await go_home(A, B)
        rec(f'{bname} guests entered', bool(hid) and clicked, f'hid={hid} clicked={clicked}')
        await play(A); await play(B)
        await go_kitchen(A, B)
        table = await table_of(A)
        rec(f'{bname} kitchen has a table', bool(table), json.dumps(table, default=str)[:200])
        if not table:
            return
        for i in range(ITERS):
            kind = 'simultaneous' if i % 4 == 0 else 'a-first' if i % 4 == 1 else 'b-first' if i % 4 == 2 else 'slow-b'
            await stand_up(A); await stand_up(B)
            await A.wait_for_timeout(250)
            slowed = False
            if kind == 'slow-b' and bname == 'chromium':
                slowed = await slow_chromium(B, True)
            if kind == 'simultaneous':
                await asyncio.gather(
                    A.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table),
                    B.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table),
                )
            elif kind == 'a-first':
                await A.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
                await asyncio.sleep(0.04)
                await B.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
            elif kind == 'b-first':
                await B.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
                await asyncio.sleep(0.04)
                await A.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
            else:
                await A.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
                await asyncio.sleep(0.2)
                await B.evaluate("(t) => __applyAvatarPlayDrop(t.x, t.y, t.id)", table)
            ok, why, ha, hb = await wait_agree(A, B, timeout=4.0)
            by = {}
            for row in ((ha or {}).get('rows') or []) + ((hb or {}).get('rows') or []):
                by[row['pid']] = row
            rec(f'{bname} iter {i+1}/{ITERS} {kind} views agree, no double-book',
                ok, json.dumps({'why': why, 'merged': by, 'hostView': ha, 'guestView': hb, 'slowed': slowed}, default=str)[:700])
            if kind == 'slow-b' and slowed:
                await slow_chromium(B, False)
        await cA.close(); await cB.close()
    finally:
        await browser.close()

async def main():
    async with async_playwright() as p:
        for bname in BROWSERS:
            await run_browser(p, bname)
    fails = [r for r in results if not r[1]]
    print('RESULT', sum(1 for r in results if r[1]), 'pass', len(fails), 'fail', flush=True)
    sys.exit(1 if fails else 0)

if __name__ == '__main__':
    asyncio.run(main())
