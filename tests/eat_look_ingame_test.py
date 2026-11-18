# B18 item 2: fridge open is derived and agrees on both iPads; nibble at the table;
# nothing stuck after leave, hold end, reload, or rejoin. An old visitor sees today's behavior.
# usage: WEB=... [HOOD=...] [OLDWEB=...] python tests/eat_look_ingame_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

WEB = os.environ.get('WEB', 'http://localhost:5350').rstrip('/')
HOOD = os.environ.get('HOOD', '').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', '').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True

def check(name, ok, extra=''):
    global ok_all
    ok_all &= bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + str(extra)) if extra else ''), flush=True)

READY = """() => !!(window.__store && document.getElementById('btnMenu') && document.querySelector('.char[data-cid]'))"""

FRIDGE_STATE = """() => {
  const s = __store.get();
  const fr = s.rooms.kitchen.items.find(i => /fridge/.test(i.kind));
  const el = fr && document.querySelector(`.item[data-id="${fr.id}"]`);
  const c = s.characters[0];
  return {
    id: fr && fr.id, x: fr && fr.x, y: fr && fr.y, on: !!(fr && fr.on),
    opened: !!(el && el.classList.contains('opened')),
    fx: !!(el && el.querySelector('.ambFx.fx-fridge')),
    held: !!(c && ((c.held && c.held.left) || (c.held && c.held.right))),
    nibble: !!(document.querySelector('.char[data-cid].amb-nibble')),
    room: s.currentRoom,
  };
}"""

async def wait_ready(pg):
    try:
        await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test((b.textContent||'').trim()) && b.offsetParent) b.click(); }")
    except Exception:
        pass
    await pg.wait_for_function(READY, timeout=20000)

def game_url(web, extra=''):
    url = web if '/kids-house-game' in web else web.rstrip('/') + '/kids-house-game'
    q = []
    if HOOD:
        q.append('hood=' + HOOD)
    if extra:
        q.append(extra)
    return url + ('/?' + '&'.join(q) if q else '/')

async def goto_game(pg, web=None, extra=''):
    await pg.goto(game_url(web or WEB, extra), wait_until='domcontentloaded')
    await pg.wait_for_timeout(600)
    await wait_ready(pg)

async def go_kitchen(pg):
    await pg.evaluate("""() => {
      __store.dispatch({ type: 'room/switch', room: 'kitchen' });
      const fr = __store.get().rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      if (window.__cam && fr) __cam.set(Math.max(0, fr.x - 340));
    }""")
    await pg.wait_for_timeout(200)

async def move_to_fridge(pg, near=True):
    await pg.wait_for_function("() => (__store.get().characters||[]).length > 0 && ((__store.get().rooms.kitchen||{}).items||[]).some(i => /fridge/.test(i.kind))", timeout=15000)
    return await pg.evaluate("""near => {
      const s = __store.get();
      const c = s.characters[0];
      const fr = s.rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      if (!c || !fr) throw new Error('missing char or fridge');
      const x = near ? fr.x + 50 : fr.x + 400;
      __store.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x, y: Math.max(fr.y, 520), seat: null });
      return { id: c.id, x, fridge: fr.id };
    }""", near)

async def sit_at_table(pg):
    return await pg.evaluate("""() => {
      const s = __store.get();
      const c = s.characters[0];
      const table = s.rooms.kitchen.items.find(i => /(^|-)table$/.test(i.kind.replace(/^pack:/,'')));
      const chair = s.rooms.kitchen.items.find(i => /chair/.test(i.kind));
      const cake = s.rooms.kitchen.items.find(i => i.kind === 'cake');
      const seatItem = chair || table;
      __store.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x: (chair||table).x, y: (chair||table).y, seat: { item: seatItem.id, pose: 'sit', n: 0 } });
      if (window.__cam && table) __cam.set(Math.max(0, table.x - 340));
      return { table: table && table.id, cake: cake && cake.id, chair: chair && chair.id };
    }""")

async def run_solo(browser):
    c = await browser.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN)
    pg = await c.new_page()
    await goto_game(pg)
    await go_kitchen(pg)
    st0 = await pg.evaluate(FRIDGE_STATE)
    check('solo: fridge starts closed and has no item.on', (not st0['opened']) and (not st0['on']), st0)

    await move_to_fridge(pg, True)
    await pg.wait_for_timeout(400)
    st1 = await pg.evaluate(FRIDGE_STATE)
    check('solo: fridge opens when she walks up', st1['opened'] is True, st1)
    check('solo: still no item.on flag', st1['on'] is False, st1)

    await move_to_fridge(pg, False)
    await pg.wait_for_timeout(400)
    st2 = await pg.evaluate(FRIDGE_STATE)
    check('solo: fridge closes when she leaves', st2['opened'] is False, st2)

    # Hold food at the fridge, then drop it and walk away — nothing stays open.
    await pg.evaluate("""() => {
      const s = __store.get();
      const c = s.characters[0];
      const fr = s.rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      const cake = s.rooms.kitchen.items.find(i => i.kind === 'cake');
      __store.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x: fr.x + 50, y: Math.max(fr.y, 520) });
      if (cake) __store.dispatch({ type: 'char/hold', id: c.id, hand: 'left', room: 'kitchen', itemId: cake.id });
    }""")
    await pg.wait_for_timeout(300)
    stH = await pg.evaluate(FRIDGE_STATE)
    check('solo: fridge open while she holds food there', stH['opened'] is True and stH['held'] is True, stH)
    await pg.evaluate("""() => {
      const c = __store.get().characters[0];
      const fr = __store.get().rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      __store.dispatch({ type: 'char/release', id: c.id, hand: 'left', room: 'kitchen', x: fr.x + 400, y: 540 });
      __store.dispatch({ type: 'char/move', id: c.id, room: 'kitchen', x: fr.x + 400, y: 540, seat: null });
    }""")
    await pg.wait_for_timeout(400)
    st3 = await pg.evaluate(FRIDGE_STATE)
    check('solo: fridge closes when the hold ends and she leaves', (not st3['opened']) and (not st3['held']), st3)

    # Reload while she is away: still closed.
    await pg.reload(wait_until='domcontentloaded')
    await pg.wait_for_timeout(700)
    await wait_ready(pg)
    await go_kitchen(pg)
    # After reload she may be wherever the save put her; move her away to be sure, then check a mid-fridge reload.
    await move_to_fridge(pg, False)
    await pg.wait_for_timeout(250)
    st4 = await pg.evaluate(FRIDGE_STATE)
    check('solo: after reload, away from the fridge, it is closed', (not st4['opened']) and (not st4['on']), st4)

    await move_to_fridge(pg, True)
    await pg.wait_for_timeout(250)
    await pg.reload(wait_until='domcontentloaded')
    await pg.wait_for_timeout(700)
    await wait_ready(pg)
    await go_kitchen(pg)
    st5 = await pg.evaluate(FRIDGE_STATE)
    # If the save kept her at the fridge, it may open again (derived). Either way, no item.on, and if she's not there it's closed.
    at = await pg.evaluate("""() => {
      const s = __store.get(); const c = s.characters[0];
      const fr = s.rooms.kitchen.items.find(i => /fridge/.test(i.kind));
      return Math.hypot(c.x - fr.x, c.y - fr.y);
    }""")
    if at <= 130:
        check('solo: reload while still at the fridge opens it (derived, no on flag)', st5['opened'] is True and st5['on'] is False, f'{st5} dist={at}')
    else:
        check('solo: reload with her elsewhere keeps the fridge closed', st5['opened'] is False and st5['on'] is False, f'{st5} dist={at}')

    await sit_at_table(pg)
    await pg.wait_for_timeout(500)
    st6 = await pg.evaluate(FRIDGE_STATE)
    check('solo: seated at the table with cake, she nibbles', st6['nibble'] is True, st6)
    await c.close()

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

async def run_two_and_mixed(browser):
    if not HOOD:
        print('SKIP two-iPad / mixed: no HOOD', flush=True)
        return
    async def mk(web):
        ctx = await browser.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
        await ctx.add_init_script(SKIP_WN)
        pg = await ctx.new_page()
        await goto_game(pg, web)
        return pg, ctx
    A, cA = await mk(WEB)
    B, cB = await mk(WEB)
    await go_kitchen(A)
    code = (await A.evaluate("fetch((__hood_url ? __hood_url() : '') + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
    await join(A, code, 0, True)
    await join(B, code, 1, False)
    await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine')?.click()")
    hid = await A.evaluate("async () => { for (let i=0;i<50 && !(__hood() && __hood().myHouseId && __hood().myHouseId()); i++) await new Promise(r=>setTimeout(r,100)); return __hood().myHouseId(); }")
    await A.wait_for_function("() => document.body.classList.contains('view-house') && (__store.get().characters||[]).length > 0", timeout=15000)
    await visit(B, hid)
    await B.wait_for_function("() => document.body.classList.contains('view-house') && (__store.get().characters||[]).length > 0", timeout=15000)
    for pg in (A, B):
        await pg.evaluate("() => __store.dispatch({type:'room/switch', room:'kitchen'})")
    await A.wait_for_timeout(300)
    await move_to_fridge(A, True)
    await A.wait_for_timeout(600)
    sa, sb = await A.evaluate(FRIDGE_STATE), await B.evaluate(FRIDGE_STATE)
    check('two iPads: fridge open on the host', sa['opened'] is True, sa)
    check('two iPads: fridge open on the visitor', sb['opened'] is True, sb)
    check('two iPads: neither wrote item.on', (not sa['on']) and (not sb['on']), f'A={sa} B={sb}')
    await move_to_fridge(A, False)
    await A.wait_for_timeout(600)
    sa2, sb2 = await A.evaluate(FRIDGE_STATE), await B.evaluate(FRIDGE_STATE)
    check('two iPads: fridge closes on both when she leaves', (not sa2['opened']) and (not sb2['opened']), f'A={sa2} B={sb2}')

    # Rejoin: visitor reloads, fridge stays closed if she is away.
    await B.reload(wait_until='domcontentloaded')
    await B.wait_for_timeout(800)
    await wait_ready(B)
    try:
        # may land on the map
        await visit(B, hid)
    except Exception:
        pass
    try:
        await B.wait_for_function("() => document.body.classList.contains('view-house') && (__store.get().characters||[]).length > 0", timeout=10000)
    except Exception:
        pass
    await B.evaluate("() => { if (window.__store) __store.dispatch({type:'room/switch', room:'kitchen'}); }")
    await B.wait_for_timeout(400)
    sb3 = await B.evaluate(FRIDGE_STATE)
    check('rejoin: visitor fridge is not stuck open', (not sb3['opened']) and (not sb3['on']), sb3)

    if not OLDWEB:
        print('SKIP mixed old/new: no OLDWEB', flush=True)
        await cA.close(); await cB.close()
        return
    O, cO = await mk(OLDWEB)
    await join(O, code, 2, False)
    await visit(O, hid)
    await O.evaluate("() => { if (window.__store) __store.dispatch({type:'room/switch', room:'kitchen'}); }")
    await A.wait_for_timeout(300)
    await move_to_fridge(A, True)
    await A.wait_for_timeout(700)
    so = await O.evaluate(FRIDGE_STATE)
    sa4 = await A.evaluate(FRIDGE_STATE)
    check('mixed: new client opens the fridge (derived)', sa4['opened'] is True and sa4['on'] is False, sa4)
    # Old client has today's behavior: local .opened only, so it stays closed, and no item.on arrived.
    check('mixed: old client has no item.on (today\'s behavior)', so['on'] is False, so)
    check('mixed: old client does not inherit a stuck-open fridge', so['opened'] is False, so)
    await move_to_fridge(A, False)
    await A.wait_for_timeout(500)
    so2 = await O.evaluate(FRIDGE_STATE)
    check('mixed: after she leaves, old client still closed, no on flag', (not so2['opened']) and (not so2['on']), so2)
    await cA.close(); await cB.close(); await cO.close()

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        await run_solo(b)
        await run_two_and_mixed(b)
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)

asyncio.run(main())
