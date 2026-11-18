# B18 item 1: need-met celebration in the house.
# Short (<=1.5s), never blocks input, no stacking, reduced-motion still glow,
# and (when HOOD is set) both iPads see it within 1s.
# usage: WEB=http://127.0.0.1:5350/kids-house-game [HOOD=http://127.0.0.1:5351] python tests/need_celebrate_ingame_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

WEB = os.environ.get('WEB', 'http://localhost:5350').rstrip('/')
if not WEB.endswith('/kids-house-game'):
    # allow either the site root or the game path
    pass
HOOD = os.environ.get('HOOD', '').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True

def check(name, ok, extra=''):
    global ok_all
    ok_all &= bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + str(extra)) if extra else ''), flush=True)

READY = """() => !!(window.__store && document.getElementById('btnMenu') && (document.querySelector('.char[data-cid]') || !document.body.classList.contains('view-street')))"""

SETUP = """() => {
  const S = __store;
  S.dispatch({ type: 'room/switch', room: 'kitchen' });
  const c = S.get().characters[0]; if (!c) return null;
  const fr = S.get().rooms.kitchen.items.find(i => /fridge/.test(i.kind));
  const tub = S.get().rooms.bathroom.items.find(i => /tub/.test(i.kind));
  // Drop her to a wish, then we'll meet it.
  for (const n of ['hungry', 'sleepy', 'playful', 'clean']) {
    const lv = ((c.needs || {})[n] ?? 3);
    for (let i = lv; i > 0; i--) S.dispatch({ type: 'need/drift', id: c.id, need: n });
  }
  S.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x: fr.x + 70, y: Math.max(fr.y, 520) });
  if (window.__cam) __cam.set(Math.max(0, fr.x - 340));
  return { id: c.id, fridge: { id: fr.id, x: fr.x, y: fr.y }, tub: tub && { id: tub.id, x: tub.x, y: tub.y } };
}"""

MEET = """(need) => {
  const c = __store.get().characters[0];
  __store.dispatch({ type: 'need/meet', id: c.id, need });
}"""

CELE_STATE = """() => {
  const el = document.querySelector('.char[data-cid]');
  if (!el) return { n: 0 };
  const bursts = [...el.querySelectorAll(':scope > .need-burst')];
  const vis = bursts.filter(b => {
    const s = getComputedStyle(b);
    return s.visibility !== 'hidden' && s.display !== 'none';
  });
  const glow = el.classList.contains('need-glow');
  const pe = getComputedStyle(el).pointerEvents;
  const peBurst = vis[0] ? getComputedStyle(vis[0]).pointerEvents : 'none';
  return {
    n: bursts.length, vis: vis.length, glow,
    need: el.dataset.needCele || (vis[0] && vis[0].dataset.needCele) || null,
    pe, peBurst,
    hopping: !!(el.querySelector(':scope > .inner.need-hop')),
  };
}"""

async def wait_ready(pg, timeout=20000):
    # Dismiss first-run OK if it appears, then wait for the house or the store.
    try:
        await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test((b.textContent||'').trim()) && b.offsetParent) b.click(); }")
    except Exception:
        pass
    await pg.wait_for_function(READY, timeout=timeout)
    # If we landed on the map after a reload, go back into the house.
    try:
        gone = await pg.evaluate("() => document.body.classList.contains('view-map')")
        if gone:
            await pg.evaluate("""() => {
              const mine = document.querySelector('#mapWorld .mapHouse.mine, #mapWorld .mapHouse');
              if (mine) mine.click();
            }""")
            await pg.wait_for_function("() => document.getElementById('btnMenu') && window.__store && document.querySelector('.char[data-cid]')", timeout=10000)
    except Exception:
        pass

async def goto_game(pg, extra=''):
    url = WEB
    if '/kids-house-game' not in url:
        url = url.rstrip('/') + '/kids-house-game'
    q = ['needsqa=1']
    if HOOD:
        q.append('hood=' + HOOD)
    if extra:
        q.append(extra)
    await pg.goto(url + '/?' + '&'.join(q), wait_until='domcontentloaded')
    await pg.wait_for_timeout(600)
    await wait_ready(pg)


async def close_sheet(pg):
    await pg.evaluate("""() => {
      const s = document.getElementById('sheet');
      if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click();
      document.querySelectorAll('button').forEach(b => /^OK/.test((b.textContent||'').trim()) && b.offsetParent && b.click());
      document.querySelectorAll('[class*=welcome], [class*=toast], .hello').forEach(e => { e.style.display='none'; });
    }""")
    await pg.wait_for_timeout(200)

async def join(pg, code, nick_i, bring):
    # Picnic-style: #btnHood lives in a hidden menu row, so Playwright visibility clicks miss it.
    await close_sheet(pg)
    await pg.evaluate("document.querySelector('#btnHood')?.click()")
    await pg.wait_for_timeout(200)
    await pg.evaluate("document.querySelector('[data-m=join]')?.click()")
    await pg.wait_for_selector("#codeInput", timeout=10000)
    await pg.fill("#codeInput", code.lower())
    await pg.evaluate("document.querySelector('#codeForm button')?.click()")
    await pg.wait_for_selector(".nicks button:not([disabled])", timeout=15000)
    await pg.evaluate("""(nick) => {
      const exact = document.querySelector('.nicks button[data-nick="'+nick+'"]:not([disabled])');
      const btns = [...document.querySelectorAll('.nicks button:not([disabled])')];
      (exact || btns[nick] || btns[0])?.click();
    }""", str(nick_i))
    await pg.wait_for_timeout(300)
    taken = await pg.evaluate("() => /already signed in/i.test(document.body.innerText)")
    if taken:
        await pg.evaluate("""(nick) => {
          const btns = [...document.querySelectorAll('.nicks button:not([disabled])')];
          const next = btns.find(b => b.dataset.nick !== String(nick)) || btns[1] || btns[0];
          next?.click();
        }""", str(nick_i))
        await pg.wait_for_timeout(300)
    await pg.wait_for_function("""(bring) => {
      const b = document.querySelector(bring ? '[data-m=bring]' : '[data-m=fresh]') || document.querySelector('[data-m=bring], [data-m=fresh]');
      return !!(b && b.offsetParent);
    }""", arg=bring, timeout=10000)
    await pg.evaluate("""(bring) => {
      const b = document.querySelector(bring ? '[data-m=bring]' : '[data-m=fresh]') || document.querySelector('[data-m=bring], [data-m=fresh]');
      if (b) b.click();
    }""", bring)
    await pg.wait_for_selector("body.view-map .mapHouse", timeout=20000)

async def enter_own(pg):
    await pg.wait_for_function("() => !!document.querySelector('#mapWorld .mapHouse.mine')", timeout=15000)
    last = None
    for _ in range(3):
        await pg.evaluate("document.querySelector('#mapWorld .mapHouse.mine')?.click()")
        try:
            await pg.wait_for_function("() => !document.body.classList.contains('view-street') && (__store.get().characters||[]).length > 0", timeout=8000)
            await close_sheet(pg)
            return
        except Exception as e:
            last = e
            await pg.wait_for_timeout(400)
    raise last

async def visit(pg, hid):
    last = None
    for _ in range(3):
        await pg.evaluate("""(h) => {
          const el = h && document.querySelector('#mapWorld .mapHouse[data-go="house:'+h+'"]');
          const mine = document.querySelector('#mapWorld .mapHouse.mine');
          const other = [...document.querySelectorAll('#mapWorld .mapHouse')].find(e => e !== mine);
          (el || other)?.click();
        }""", hid)
        try:
            await pg.wait_for_function("() => !document.body.classList.contains('view-street') && (__store.get().characters||[]).length > 0", timeout=8000)
            await close_sheet(pg)
            return
        except Exception as e:
            last = e
            await pg.wait_for_timeout(400)
    raise last


async def run_solo(browser, reduced=False):
    tag = 'reduce' if reduced else 'motion'
    ctx_kw = dict(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True,
                  reduced_motion='reduce' if reduced else 'no-preference')
    c = await browser.new_context(**ctx_kw)
    await c.add_init_script(SKIP_WN)
    pg = await c.new_page()
    await goto_game(pg)
    info = await pg.evaluate(SETUP)
    await pg.wait_for_timeout(400)
    check(f'{tag}: house is ready', bool(info and info.get('id')), info)

    # Meet hungry and watch the celebration.
    t0 = await pg.evaluate('Date.now()')
    await pg.evaluate(MEET, 'hungry')
    # paint is sync via subscribe, but burst is in the same turn
    await pg.wait_for_timeout(80)
    st = await pg.evaluate(CELE_STATE)
    if reduced:
        check(f'{tag}: still glow is on', st['glow'] is True, st)
        check(f'{tag}: no visible flying particles', st['vis'] == 0, st)
        check(f'{tag}: no hop', st['hopping'] is False, st)
    else:
        check(f'{tag}: a celebration is on screen', st['glow'] or st['vis'] >= 1, st)
        check(f'{tag}: at most one burst (no stack)', st['n'] <= 1, st)
        check(f'{tag}: burst never captures pointer', st['peBurst'] == 'none', st)

    # Tap during the celebration: open the menu, then close it. Input must work.
    try:
        await pg.click('#btnMenu', timeout=2000)
        await pg.wait_for_timeout(150)
        menu = await pg.evaluate("() => { const m = document.getElementById('menu') || document.querySelector('.menu, #menuPanel, #menuBox'); return !!(m && (m.offsetParent || getComputedStyle(m).display !== 'none')); }")
        # Some builds use body.menu-open or #menuSheet
        opened = await pg.evaluate("""() => {
          if (document.body.classList.contains('menu-open') || document.body.classList.contains('show-menu')) return true;
          const m = document.getElementById('menu') || document.querySelector('#menuSheet, #menuBox, .menuSheet, .menuOpen');
          if (m) {
            const s = getComputedStyle(m);
            return s.display !== 'none' && s.visibility !== 'hidden' && (m.offsetParent !== null || s.position === 'fixed');
          }
          // The wishes row is in the menu; if it is visible the menu opened.
          const w = document.getElementById('btnWishes');
          return !!(w && w.offsetParent);
        }""")
        check(f'{tag}: tap during celebration opens the menu', opened, st)
        # close: tap the same button or an overlay
        await pg.evaluate("""() => {
          const b = document.getElementById('btnMenu'); if (b) b.click();
        }""")
        await pg.wait_for_timeout(100)
    except Exception as e:
        check(f'{tag}: tap during celebration opens the menu', False, str(e))

    # A second meet while the first is playing must not stack a second burst.
    await pg.evaluate(MEET, 'playful')
    await pg.wait_for_timeout(60)
    st2 = await pg.evaluate(CELE_STATE)
    check(f'{tag}: a second meet during the first does not stack bursts', st2['n'] <= 1, st2)

    # Wait until the celebration is gone; it must not last more than ~1.5s from t0.
    gone = False
    elapsed = 0
    for _ in range(24):
        await pg.wait_for_timeout(100)
        st3 = await pg.evaluate(CELE_STATE)
        elapsed = await pg.evaluate('t0 => Date.now() - t0', t0)
        if not st3['glow'] and st3['vis'] == 0 and not st3['hopping']:
            gone = True
            break
    check(f'{tag}: celebration ends', gone, f'{elapsed}ms {st3}')
    check(f'{tag}: lasted no more than about 1.5s', elapsed <= 1700, f'{elapsed}ms')
    await c.close()

async def run_two_client(browser):
    if not HOOD:
        print('SKIP two-iPad: no HOOD', flush=True)
        return
    async def mk():
        c = await browser.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
        await c.add_init_script(SKIP_WN)
        pg = await c.new_page()
        await goto_game(pg)
        return pg, c
    A, cA = await mk()
    B, cB = await mk()
    info = await A.evaluate(SETUP)
    code = (await A.evaluate("fetch((__hood_url ? __hood_url() : '') + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
    await join(A, code, 0, True)
    await join(B, code, 1, False)
    await enter_own(A)
    hid = await A.evaluate("async () => { for (let i=0;i<50 && !(__hood() && __hood().myHouseId && __hood().myHouseId()); i++) await new Promise(r=>setTimeout(r,100)); return __hood().myHouseId(); }")
    await visit(B, hid)
    for pg in (A, B):
        await pg.evaluate("() => __store.dispatch({type:'room/switch', room:'kitchen'})")
    await A.wait_for_timeout(400)
    # Make sure she is hungry again (join may have kept or reset).
    await A.evaluate("""() => {
      const chars = __store.get().characters || [];
      const c = chars[0]; if (!c) throw new Error('no characters after join');
      const fr = __store.get().rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      const lv = ((c.needs || {}).hungry ?? 3);
      for (let i = lv; i > 0; i--) __store.dispatch({ type: 'need/drift', id: c.id, need: 'hungry' });
      __store.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x: fr.x + 70, y: Math.max(fr.y, 520) });
    }""")
    await A.wait_for_timeout(400)
    await A.wait_for_timeout(400)
    await A.evaluate(MEET, 'hungry')
    # Both iPads should show the celebration within 1s.
    seenA = seenB = False
    for i in range(10):
        await asyncio.sleep(0.1)
        sa = await A.evaluate(CELE_STATE)
        sb = await B.evaluate(CELE_STATE)
        if sa['glow'] or sa['vis'] >= 1: seenA = True
        if sb['glow'] or sb['vis'] >= 1: seenB = True
        if seenA and seenB:
            check('two iPads: celebration visible on both within 1s', True, f'{(i+1)*100}ms A={sa} B={sb}')
            break
    else:
        check('two iPads: celebration visible on both within 1s', False, f'A={sa} B={sb}')
    await cA.close(); await cB.close()

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        await run_solo(b, reduced=False)
        await run_solo(b, reduced=True)
        await run_two_client(b)
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)

asyncio.run(main())
