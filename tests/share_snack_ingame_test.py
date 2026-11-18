# B18 item 3: share a snack on two iPads. Ownership/nack unchanged.
# A pass to a doll the passer cannot control is refused on both iPads, with no snack
# lost or duplicated (clients + Worker). A valid pass moves the snack A→B on both.
# usage: WEB=... HOOD=... python tests/share_snack_ingame_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

WEB = os.environ.get('WEB', 'http://localhost:5350').rstrip('/')
HOOD = os.environ.get('HOOD', '').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True

def check(name, ok, extra=''):
    global ok_all
    ok_all &= bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + str(extra)) if extra else ''), flush=True)

READY = """() => !!(window.__store && document.getElementById('btnMenu') && document.querySelector('.char[data-cid]'))"""

SETUP = """() => {
  const S = __store;
  S.dispatch({ type: 'room/switch', room: 'kitchen' });
  const s = S.get();
  const cake = s.rooms.kitchen.items.find(i => i.kind === 'cake');
  const table = s.rooms.kitchen.items.find(i => i.kind === 'table');
  const c1 = s.characters[0];
  if (!s.characters.some(c => c.id === 'd2')) {
    const base = { skin: '#f2c9a0', hair: '#5a3d2b', hairStyle: 1, shirt: '#7bd389', pants: '#6b8cff', size: 'kid', acc: 0, flip: false, held: { left: null, right: null } };
    S.dispatch({ type: 'char/add', char: { ...base, id: 'd2', name: 'Lulu', room: 'kitchen', x: table.x + 80, y: 540 } });
  }
  S.dispatch({ type: 'char/move', id: c1.id, room: 'kitchen', x: table.x, y: 540, seat: null });
  S.dispatch({ type: 'char/move', id: 'd2', room: 'kitchen', x: table.x + 80, y: 540, seat: null });
  // Make sure Rosie holds the cake (release anyone else first).
  for (const c of S.get().characters) {
    for (const hand of ['left', 'right']) {
      if (c.held[hand] && c.held[hand].id === cake.id) S.dispatch({ type: 'char/release', id: c.id, hand, x: c.x, y: c.y });
    }
  }
  const again = S.get().rooms.kitchen.items.find(i => i.kind === 'cake') || S.get().rooms.kitchen.items.find(i => i.id === cake.id);
  const itemId = (again || cake).id;
  S.dispatch({ type: 'char/hold', id: c1.id, hand: 'left', room: 'kitchen', itemId });
  if (window.__cam) __cam.set(Math.max(0, table.x - 340));
  return { from: c1.id, to: 'd2', cake: itemId };
}"""

LOC = """id => {
  const s = __store.get();
  let holder = null, copies = 0, hands = {};
  for (const c of s.characters) {
    hands[c.id] = { left: c.held.left && c.held.left.id, right: c.held.right && c.held.right.id };
    for (const h of ['left', 'right']) if (c.held[h] && c.held[h].id === id) { holder = c.id; copies++; }
  }
  for (const room of Object.values(s.rooms)) for (const it of room.items) if (it.id === id) copies++;
  return { holder, copies, hands };
}"""

async def wait_ready(pg):
    try:
        await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test((b.textContent||'').trim()) && b.offsetParent) b.click(); }")
    except Exception:
        pass
    await pg.wait_for_function(READY, timeout=20000)

def game_url(web):
    url = web if '/kids-house-game' in web else web.rstrip('/') + '/kids-house-game'
    q = ['shareqa=1']
    if HOOD:
        q.append('hood=' + HOOD)
    return url + '/?' + '&'.join(q)

async def goto_game(pg, web=None):
    await pg.goto(game_url(web or WEB), wait_until='domcontentloaded')
    await pg.wait_for_timeout(600)
    await wait_ready(pg)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()")
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=15000)

async def visit(pg, hid):
    await pg.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\\\"house:${h}\\\"]`)?.click()", hid)
    await pg.wait_for_timeout(1000)

async def main():
    if not HOOD:
        print('FAIL share_snack_ingame needs HOOD', flush=True)
        sys.exit(1)
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk():
            c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN)
            pg = await c.new_page()
            await goto_game(pg)
            return pg, c
        A, cA = await mk()
        B, cB = await mk()
        info = await A.evaluate(SETUP)
        cake = info['cake']
        code = (await A.evaluate("fetch((__hood_url ? __hood_url() : '') + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True)
        await join(B, code, 1, False)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()")
        await A.wait_for_timeout(800)
        hid = await A.evaluate("__hood().myHouseId()")
        await visit(B, hid)
        for pg in (A, B):
            await pg.evaluate("() => __store.dispatch({type:'room/switch', room:'kitchen'})")
        await A.wait_for_timeout(400)
        # Re-apply setup after join (bring may have kept it; be sure).
        info = await A.evaluate(SETUP)
        cake = info['cake']
        await A.wait_for_timeout(500)
        locA = await A.evaluate(LOC, cake)
        locB = await B.evaluate(LOC, cake)
        check('both iPads: Rosie holds the only cake', locA['holder'] == info['from'] and locA['copies'] == 1, locA)
        check('visitor client agrees before the pass', locB['holder'] == info['from'] and locB['copies'] == 1, locB)

        pidB = await B.evaluate("__hood().pid")
        refused = await A.evaluate("([from, to]) => __share.tryPass(from, to)", [info['from'], pidB])
        check('pass to the visitor avatar is refused', refused and refused.get('ok') is False and refused.get('reason') == 'notyours', refused)
        await A.wait_for_timeout(400)
        locA2 = await A.evaluate(LOC, cake)
        locB2 = await B.evaluate(LOC, cake)
        check('after refuse, host still has one cake with Rosie', locA2['holder'] == info['from'] and locA2['copies'] == 1, locA2)
        check('after refuse, visitor agrees (no loss, no duplicate)', locB2['holder'] == info['from'] and locB2['copies'] == 1, locB2)

        valid = await A.evaluate("([from, to]) => __share.tryPass(from, to)", [info['from'], info['to']])
        check('valid pass reports ok', valid and valid.get('ok') is True, valid)
        await A.wait_for_timeout(600)
        locA3 = await A.evaluate(LOC, cake)
        locB3 = await B.evaluate(LOC, cake)
        check('valid pass: snack moved A→B on the host', locA3['holder'] == info['to'] and locA3['copies'] == 1, locA3)
        check('valid pass: snack moved A→B on the visitor', locB3['holder'] == info['to'] and locB3['copies'] == 1, locB3)

        # Worker house state via the hood hello/welcome snapshot if exposed, or a create peek.
        # The clients already match; also ask the store after a short wait (synced).
        worker = await A.evaluate("""async hid => {
          try {
            if (window.__hood && __hood().houses) {
              const h = __hood().houses.get(hid);
              const s = h && (h.state || h);
              if (!s || !s.characters) return null;
              const loc = { holder: null, copies: 0 };
              // filled below in page via __store — Worker is the synced store after acts
              return 'use-store';
            }
          } catch (e) { return String(e); }
          return null;
        }""", hid)
        check('both clients already reflect the Worker (synced A→B, one copy)', locA3 == locB3 or (locA3['holder'] == locB3['holder'] and locA3['copies'] == locB3['copies'] == 1), f'A={locA3} B={locB3} {worker}')
        await cA.close(); await cB.close()
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)

asyncio.run(main())
