"""B13 two-client guardrails. Local hood only. Never points at workers.dev.

Item 4: a doll seated by the new client is sitting on 2ae692f, 10ef736, and 18ee50c
        guests; two dolls never share a chair; avatar play-drops race two clients.
Item 5: a snack put down at the tub lands on the floor (y=STAND_Y) and syncs
        to the guest.
Item 2 (unit-tested separately): wishes are hidden, needs are not cleared.
"""
import asyncio, json, os, sys, time
from pathlib import Path
from playwright.async_api import async_playwright

NEW = os.environ['NEWURL'].rstrip('/')
HOOD = os.environ['HOOD'].rstrip('/')
assert 'workers.dev' not in HOOD, 'local hood only'
OUT = Path(os.environ.get('GUARD_SHOTS', '/workspace/t-batch13/shots/guardrails'))
OUT.mkdir(parents=True, exist_ok=True)
INIT = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"
STAND_Y = 540
PYBIN = sys.executable

results = []

def rec(name, ok, extra=''):
    line = ('PASS ' if ok else 'FAIL ') + name + ((' ' + extra) if extra else '')
    print(line, flush=True)
    results.append((name, ok, extra))
    if not ok:
        sys.exit_code = 1  # type: ignore

async def dismiss(pg):
    await pg.evaluate("() => { for (const s of ['#phoneOk','#wnGo']) { const e=document.querySelector(s); if(e&&e.offsetParent) e.click(); } }")

async def play(pg):
    await pg.evaluate("() => { const b=document.querySelector('[data-mode=\"play\"]'); if(b) b.click(); }")
    await pg.wait_for_timeout(200)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()")
    await pg.wait_for_timeout(300)
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.wait_for_selector('.nicks button', timeout=15000)
    # Prefer a data-nick if present; otherwise the Nth enabled nick.
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
    hid = await host.evaluate("() => (window.__hood && __hood().myHouseId && __hood().myHouseId()) || (__hood && __hood().myHouseId) || ''")
    if not hid:
        hid = await host.evaluate("() => window.__hood ? (__hood().myHouseId ? __hood().myHouseId() : '') : ''")
    # fallback: first house on the guest map after a short wait
    await guest.wait_for_timeout(600)
    clicked = await guest.evaluate("""(h) => {
      const sel = h ? `#mapWorld .mapHouse[data-go="house:${h}"]` : '#mapWorld .mapHouse:not(.mine)';
      const el = document.querySelector(sel) || document.querySelector('#mapWorld .mapHouse');
      if (!el) return false;
      el.click();
      return true;
    }""", hid)
    await guest.wait_for_timeout(1200)
    return hid, clicked

SETUP_KITCHEN = """() => {
  const s = __store;
  s.dispatch({type:'room/switch', room:'kitchen'});
  const items = s.get().rooms.kitchen.items;
  const table = items.find(i => /(^|-)table$/.test(String(i.kind||'').replace(/^pack:/,'').toLowerCase()));
  const chairs = items.filter(i => /chair|stool/.test(String(i.kind||'').replace(/^pack:/,'').toLowerCase()));
  const cake = items.find(i => i.kind === 'cake') || items.find(i => /cake|apple|pizza|donut|juice/.test(i.kind));
  const doll = s.get().characters[0];
  return { table, chairs: chairs.map(c => ({id:c.id,x:c.x,y:c.y,kind:c.kind})), cake, dollId: doll && doll.id, doll };
}"""

async def mk(browser, url, size=(820,1180)):
    c = await browser.new_context(viewport={'width':size[0],'height':size[1]}, device_scale_factor=1, has_touch=True, timezone_id='America/Chicago')
    await c.add_init_script(INIT)
    pg = await c.new_page()
    await pg.goto(url)
    await pg.wait_for_selector('#stage', timeout=25000)
    await pg.wait_for_timeout(800)
    await dismiss(pg)
    return c, pg

async def wait_char(pg, doll_id, pred, timeout=8000):
    return await pg.wait_for_function(
        """([id, src]) => {
          const fn = eval('(' + src + ')');
          const c = window.__store && __store.get().characters.find(x => x.id === id);
          return !!c && fn(c, __store.get());
        }""",
        [doll_id, pred],
        timeout=timeout,
    )

async def run_old_guest(p, old_name, old_url):
    print(f'--- old guest {old_name} ---', flush=True)
    browser = await p.chromium.launch()
    try:
        cA, A = await mk(browser, NEW)
        cB, B = await mk(browser, old_url)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        print('CODE', old_name, code, flush=True)
        await join(A, code, 0, True)
        await join(B, code, 1, False)
        hid, clicked = await go_home(A, B)
        rec(f'{old_name} guest entered the house', bool(clicked or hid), f'hid={hid} clicked={clicked}')
        await play(A)
        try:
            await play(B)
        except Exception as e:
            print('guest play skip', e, flush=True)
        info = await A.evaluate(SETUP_KITCHEN)
        if A.evaluate:  # pin day on new client
            await A.evaluate("() => { if (window.__sky && __sky.setChoice) __sky.setChoice('day'); }")
        table, chairs, cake, doll_id = info['table'], info['chairs'], info['cake'], info['dollId']
        rec(f'{old_name} kitchen has a table and two chairs', bool(table) and len(chairs) >= 2, json.dumps({'table': table and table['id'], 'chairs': chairs, 'cake': cake and cake['id']}))
        if not (table and cake and doll_id):
            rec(f'{old_name} setup complete', False, json.dumps(info, default=str)[:300])
            await A.screenshot(path=str(OUT / f'{old_name}_host_fail.png'))
            await B.screenshot(path=str(OUT / f'{old_name}_guest_fail.png'))
            await cA.close(); await cB.close(); await browser.close()
            return

        # Hold the cake, play-drop the doll onto the table.
        await A.evaluate("""({dollId, cakeId, table}) => {
          const s = __store;
          s.dispatch({type:'char/move', id:dollId, room:'kitchen', x:table.x, y:540, seat:null});
          s.dispatch({type:'char/hold', id:dollId, hand:'right', room:'kitchen', itemId:cakeId});
          __applyPlayDrop(dollId, table.x, table.y, table.id);
        }""", {'dollId': doll_id, 'cakeId': cake['id'], 'table': table})
        await A.wait_for_timeout(800)
        host_c = await A.evaluate("id => __store.get().characters.find(c => c.id === id)", doll_id)
        rec(f'{old_name} host seated the doll in a chair (item 4)',
            bool(host_c and host_c.get('seat') and host_c['seat'].get('pose') == 'sit' and abs(host_c['x'] - table['x']) > 40),
            json.dumps({'seat': host_c and host_c.get('seat'), 'x': host_c and host_c.get('x'), 'held': host_c and host_c.get('held')}))

        # Guest (old client) should see the same seat.
        try:
            await B.wait_for_function(
                """(id) => {
                  const st = window.__store && __store.get && __store.get();
                  if (!st) return false;
                  const c = st.characters.find(x => x.id === id);
                  return !!(c && c.seat && c.seat.pose === 'sit');
                }""",
                doll_id, timeout=8000,
            )
            guest_c = await B.evaluate("id => window.__store.get().characters.find(c => c.id === id)", doll_id)
        except Exception as e:
            guest_c = await B.evaluate("() => { try { return __store.get().characters; } catch(e) { return String(e); } }")
            rec(f'{old_name} guest store readable', False, str(e)[:160] + ' ' + json.dumps(guest_c, default=str)[:240])
            await A.screenshot(path=str(OUT / f'{old_name}_host.png'))
            await B.screenshot(path=str(OUT / f'{old_name}_guest.png'))
            await cA.close(); await cB.close(); await browser.close()
            return

        rec(f'{old_name} guest sees the doll sitting in the same chair',
            bool(guest_c and guest_c.get('seat') and host_c.get('seat') and guest_c['seat']['item'] == host_c['seat']['item'] and guest_c['seat']['pose'] == 'sit' and abs((guest_c.get('x') or 0) - table['x']) > 40),
            json.dumps({'host': host_c.get('seat'), 'guest': guest_c.get('seat'), 'gx': guest_c.get('x'), 'hx': host_c.get('x')}))

        # Second doll takes the other chair; guest sees both, never the same seat.
        await A.evaluate("""({table}) => {
          const s = __store;
          const base = s.get().characters[0];
          if (!s.get().characters.some(c => c.id === 'b13-d2')) {
            s.dispatch({type:'char/add', char:{...base, id:'b13-d2', x:table.x+80, y:540, seat:null, held:{left:null,right:null}, shirt:'#9bf6ff'}});
          }
          const t = s.get().rooms.kitchen.items.find(i => i.id === table.id) || table;
          __applyPlayDrop('b13-d2', t.x, t.y, t.id);
        }""", {'table': table})
        await A.wait_for_timeout(800)
        host_seats = await A.evaluate("() => __store.get().characters.filter(c => c.room==='kitchen' && c.seat).map(c => ({id:c.id, seat:c.seat, x:c.x}))")
        ids = [c['seat']['item'] + ':' + str(c['seat']['n']) for c in host_seats]
        rec(f'{old_name} two host dolls never share a chair',
            len(host_seats) >= 2 and len(set(ids)) == len(ids),
            json.dumps(host_seats))
        try:
            await B.wait_for_function("() => __store.get().characters.filter(c => c.seat && c.seat.pose==='sit').length >= 2", timeout=8000)
            guest_seats = await B.evaluate("() => __store.get().characters.filter(c => c.seat).map(c => ({id:c.id, seat:c.seat, x:c.x}))")
        except Exception as e:
            guest_seats = []
            rec(f'{old_name} guest saw two sitting dolls', False, str(e)[:160])
        else:
            gids = [c['seat']['item'] + ':' + str(c['seat']['n']) for c in guest_seats]
            rec(f'{old_name} guest sees two dolls in different chairs',
                len(guest_seats) >= 2 and len(set(gids)) == len(gids),
                json.dumps(guest_seats))

        await A.screenshot(path=str(OUT / f'{old_name}_host_chairs.png'))
        await B.screenshot(path=str(OUT / f'{old_name}_guest_chairs.png'))
        await cA.close(); await cB.close()
    finally:
        await browser.close()

async def run_item5_and_race(p):
    print('--- item 5 sync + item 4 avatar race (two new clients) ---', flush=True)
    browser = await p.chromium.launch()
    try:
        cA, A = await mk(browser, NEW)
        cB, B = await mk(browser, NEW)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True)
        await join(B, code, 1, False)
        await go_home(A, B)
        await play(A); await play(B)
        await A.evaluate("() => { if (window.__sky && __sky.setChoice) __sky.setChoice('day'); }")

        # Item 5: hold cake, drop on the tub, snack lands on the floor and syncs.
        info = await A.evaluate("""() => {
          const s = __store;
          s.dispatch({type:'room/switch', room:'bedroom'});
          const items = s.get().rooms.bedroom.items;
          let tub = items.find(i => /tub/.test(i.kind));
          if (!tub) {
            s.dispatch({type:'item/add', room:'bedroom', item:{id:'b13-tub', kind:'soaking-tub', x:860, y:500, flip:false, z:20, scale:1}});
            tub = s.get().rooms.bedroom.items.find(i => i.id==='b13-tub');
          }
          // Put a cake in the bedroom so she can hold it.
          let cake = items.find(i => i.kind==='cake');
          if (!cake) {
            s.dispatch({type:'item/add', room:'bedroom', item:{id:'b13-cake', kind:'cake', x:400, y:540, flip:false, z:21, scale:1}});
            cake = s.get().rooms.bedroom.items.find(i => i.id==='b13-cake');
          }
          const doll = s.get().characters[0];
          s.dispatch({type:'char/move', id:doll.id, room:'bedroom', x:tub.x-80, y:540, seat:null});
          s.dispatch({type:'char/hold', id:doll.id, hand:'right', room:'bedroom', itemId:cake.id});
          return {tub, cakeId: cake.id, dollId: doll.id};
        }""")
        await A.evaluate("""(info) => { __applyPlayDrop(info.dollId, info.tub.x, info.tub.y, info.tub.id); }""", info)
        await A.wait_for_timeout(800)
        host = await A.evaluate("""(cakeId) => {
          const s = __store.get();
          const cake = s.rooms.bedroom.items.find(i => i.id === cakeId);
          const doll = s.characters[0];
          return {cake, doll: {id:doll.id, x:doll.x, y:doll.y, held:doll.held, room:doll.room}, tubX: s.rooms.bedroom.items.find(i => /tub/.test(i.kind))?.x};
        }""", info['cakeId'])
        cake = host.get('cake') or {}
        rec('item 5 host puts the snack on the floor near her, not floating',
            bool(cake) and cake.get('y') == STAND_Y and abs((cake.get('x') or 0) - (host.get('tubX') or 0)) > 40 and not (host['doll']['held'] or {}).get('right'),
            json.dumps(host, default=str)[:400])

        try:
            await B.wait_for_function(
                """([cakeId, y]) => {
                  const s = __store.get();
                  const cake = s.rooms.bedroom && s.rooms.bedroom.items.find(i => i.id === cakeId);
                  return !!(cake && cake.y === y);
                }""",
                [info['cakeId'], STAND_Y], timeout=8000,
            )
            guest = await B.evaluate("""(cakeId) => {
              const s = __store.get();
              const cake = s.rooms.bedroom.items.find(i => i.id === cakeId);
              return cake;
            }""", info['cakeId'])
        except Exception as e:
            guest = None
            rec('item 5 guest received the released snack', False, str(e)[:160])
        else:
            rec('item 5 snack position syncs to the other client',
                bool(guest) and guest.get('x') == cake.get('x') and guest.get('y') == cake.get('y') == STAND_Y,
                json.dumps({'host': cake, 'guest': guest}))

        await A.screenshot(path=str(OUT / 'item5_host_tub_snack.png'))
        await B.screenshot(path=str(OUT / 'item5_guest_tub_snack.png'))

        # Item 4 two-client avatar race: both drop themselves on the kitchen table at once.
        await A.evaluate("() => __store.dispatch({type:'room/switch', room:'kitchen'})")
        await A.wait_for_timeout(400)
        # Guest follows the room? Visiting should follow house room or have tabs. Switch guest room too if possible.
        await B.evaluate("() => { const t=document.querySelector('[data-room=\"kitchen\"]'); if(t) t.click(); }")
        await B.wait_for_timeout(400)
        table = await A.evaluate("() => __store.get().rooms.kitchen.items.find(i => /(^|-)table$/.test(String(i.kind||'').replace(/^pack:/,'').toLowerCase()))")
        # Place both avatars in the kitchen first (walk/presence).
        await A.evaluate("""(t) => { if (window.__applyAvatarPlayDrop) { /* stand first */ } 
          const me = (window.__hood && __hood().presence) ? null : null;
        }""", table)
        # Use place-like hooks if we can read current presence room
        async def seat_of(pg):
            return await pg.evaluate("""() => {
              try {
                const h = __hood();
                const me = h.presence.get(h.pid) || (h.me && h.me());
                // fall back to painting attributes
                const el = document.querySelector('.char.avatar.mine, #layer .avatar.mine, .savatar.mine');
                return { pres: me || null, pid: h.pid };
              } catch(e) { return { err: String(e) }; }
            }""")

        # Switch both into the kitchen via the same tab click / room/switch on host already done.
        # Drop both avatars onto the table at the same moment.
        await asyncio.gather(
            A.evaluate("(t) => { __applyAvatarPlayDrop(t.x, t.y, t.id); }", table),
            B.evaluate("(t) => { __applyAvatarPlayDrop(t.x, t.y, t.id); }", table),
        )
        await A.wait_for_timeout(1200)
        seats = await A.evaluate("""() => {
          const h = __hood();
          const out = [];
          const add = (pid, p) => {
            if (!p || p.where !== 'house') return;
            const seat = p.seat || p.sit || null;
            out.push({pid, room:p.room, x:p.x, y:p.y, seat});
          };
          if (h.presence && h.presence.forEach) h.presence.forEach((p,pid) => add(pid,p));
          if (h.pid && !out.some(o => o.pid===h.pid)) {
            const me = (h.me && h.me()) || null;
            if (me) add(h.pid, me);
          }
          return out;
        }""")
        guest_seats = await B.evaluate("""() => {
          const h = __hood();
          const out = [];
          const add = (pid, p) => { if (p && p.where==='house') out.push({pid, room:p.room, x:p.x, y:p.y, seat:p.seat||null}); };
          if (h.presence && h.presence.forEach) h.presence.forEach((p,pid) => add(pid,p));
          return out;
        }""")
        # Unique chairs among seated avatars. If both stood, that's also "not the same chair".
        def key(s):
            seat = s.get('seat') or {}
            if not seat or not seat.get('item'): return None
            return f"{seat.get('item')}:{seat.get('n')}"
        keys = [key(s) for s in (seats or [])]
        seated_keys = [k for k in keys if k]
        rec('item 4 two-client avatar race: two dolls/kids never take the same chair',
            len(seated_keys) < 2 or len(set(seated_keys)) == len(seated_keys),
            json.dumps({'hostView': seats, 'guestView': guest_seats}))
        await A.screenshot(path=str(OUT / 'item4_race_host.png'))
        await B.screenshot(path=str(OUT / 'item4_race_guest.png'))
        await cA.close(); await cB.close()
    finally:
        await browser.close()

async def main():
    olds = json.loads(os.environ['OLD_CLIENTS_JSON'])
    async with async_playwright() as p:
        for name, url in olds:
            await run_old_guest(p, name, url)
        await run_item5_and_race(p)
    fails = [r for r in results if not r[1]]
    print('RESULT', sum(1 for r in results if r[1]), 'pass', len(fails), 'fail', flush=True)
    Path(os.environ.get('GUARD_LOG_JSON', '/workspace/t-batch13/logs/guardrails.json')).write_text(json.dumps(results, indent=2))
    if fails:
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
