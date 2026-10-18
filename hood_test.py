# Multi-client neighborhood test: 3 simulated iPads against the local server.
import asyncio, os, re, sys, random, traceback
from playwright.async_api import async_playwright
from testnav import PFX, SKIP_WN, K, to_map, go, local_page
URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = os.environ.get('HOOD_SHOTS', 'screens/hood/')
if not SHOT.endswith('/'): SHOT += '/'
os.makedirs(SHOT, exist_ok=True)
res = {}

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nick, bring):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)
async def drag(pg, a, b, steps=12):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps); await pg.mouse.up(); await pg.wait_for_timeout(300)
async def center(loc):
    b = await loc.bounding_box(); return (b['x'] + b['width'] / 2, b['y'] + b['height'] / 2)
items = lambda pg: pg.evaluate("__store.get().rooms.living.items.map(i => i.id)")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def mk():
            c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN)  # skip the What's new popup
            return c
        P, K2, K3 = [await (await mk()).new_page() for _ in range(3)]
        errs = {}
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []; pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and errs[n].append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(600)
        async def snap():
            out = {}
            for n, pg in (('P', P), ('K2', K2), ('K3', K3)):
                try:
                    out[n] = await pg.evaluate("""() => {
                      let h = null, ui = null;
                      try { h = __hood(); } catch (e) {}
                      try { ui = __ui(); } catch (e) {}
                      const ws = h && h.ws;
                      return { status: h && h.status, ready: ws ? ws.readyState : null, pid: h && h.pid, view: ui && ui.view, mode: ui && ui.mode, reconnecting: document.body.classList.contains('reconnecting') };
                    }""")
                except Exception as e:
                    out[n] = 'err:' + str(e).split('\n')[0][:180]
            return out
        async def check(name, ok, extra=''):
            res[name] = bool(ok)
            line = ('PASS ' if ok else 'FAIL ') + name
            if extra: line += ' ' + str(extra)
            if not ok:
                try: line += ' conn=' + str(await snap())
                except Exception as e: line += ' conn_err=' + str(e)
            print(line, flush=True)
        try:
            await run(P, K2, K3, mk, errs, check)
        except Exception:
            traceback.print_exc()
            try: print('conn', await snap(), flush=True)
            except Exception as e: print('conn_err', e, flush=True)
            print('errors:', errs, flush=True)
            raise
        print('errors:', errs)
        print(f"\n{sum(res.values())}/{len(res)} checks passed")
        await b.close()

async def run(P, K2, K3, mk, errs, check):
        # ---- parent creates the street on the family iPad, then joins as a kid bringing the local house ----
        await P.click('#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        await P.wait_for_selector('#newCode'); code = (await P.inner_text('#newCode')).strip()
        await check('create neighborhood + invite code', bool(re.fullmatch(r'[A-Z0-9]{6}', code)), code)
        await P.screenshot(path=SHOT + '01-parent-created-code.png')
        # ---- grown-up adds the kids' first names and picks a memorable code ----
        await P.click('[data-m="setup"]'); await P.wait_for_selector('#pCode')
        for n in ('Reagan', 'Quinn', 'Chloe'): await P.click(f'.sugg button:has-text("{n}")'); await P.wait_for_timeout(250)
        await P.fill('#rosterInput', 'Sloane2'); await P.click('#rosterForm button'); await P.wait_for_timeout(250)
        await check('roster: suggestions added, non-name refused', await P.locator('.rName').count() == 3 and await P.locator('#pNote').count() == 1)
        await P.fill('#rosterInput', 'Sloane Smith'); await P.click('#rosterForm button'); await P.wait_for_timeout(250)
        roster_names = await P.locator('.rName').all_inner_texts()
        await check('roster refuses a first and last name', 'Sloane Smith' not in roster_names and 'Smith' not in ' '.join(roster_names) and 'first name' in (await P.inner_text('#pNote')).lower(), str(roster_names))
        other = await P.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())")
        await P.fill('#codeEdit', other['code'].lower()); await P.click('[data-p="setcode"]'); await P.wait_for_timeout(300)
        await check('custom code already used by another street is refused', 'already used' in (await P.inner_text('#pNote')))
        custom = 'Reagan' + str(random.randint(10, 9999))
        await P.fill('#codeEdit', custom); await P.click('[data-p="setcode"]'); await P.wait_for_timeout(400)
        code = custom.upper(); await check('custom code set (stored upper-case)', (await P.inner_text('#pCode')).strip() == code, code)
        await P.screenshot(path=SHOT + '00-parent-roster-and-code.png')
        await P.click('.hoodSheet [data-m="close"]')
        await join(P, custom.lower(), 'Reagan', True)
        await join(K2, custom, 'Quinn', False)
        await join(K3, custom.title(), 'Chloe', True)
        await P.wait_for_timeout(800)
        n_houses = await P.locator('#mapWorld .mapHouse').count(); await check('3 houses on the map', n_houses == 3, str(n_houses))
        await P.screenshot(path=SHOT + '02-street-three-houses.png')
        await check('house signs show first names', await P.locator('.mapSign:has-text("Quinn\'s House")').count() == 1)
        # a name already signed in on one iPad can't be picked on another; names not on the list can't join
        K4 = await (await mk()).new_page(); await K4.goto(URL); await K4.wait_for_timeout(400)
        await K4.click('#btnHood'); await K4.click('[data-m="join"]'); await K4.fill('#codeInput', code); await K4.click('#codeForm button')
        await K4.wait_for_selector('.nicks.roster')
        await check('claimed names disabled for a new device', await K4.locator('.nicks button:has-text("Quinn")').is_disabled() and await K4.locator('.nicks button[disabled]').count() == 3)
        bad = await K4.evaluate("(async () => { const ws = new WebSocket(__hood_url().replace(/^http/,'ws') + '/ws/' + __lastLookupId); return await new Promise(r => { ws.onopen = () => ws.send(JSON.stringify({t:'join', nickname:'Quinn', look:{}})); ws.onmessage = e => r(JSON.parse(e.data)); }); })()")
        await check('server refuses a second device for a claimed name', bad.get('code') == 'nickname', str(bad))
        await K4.context.close()
        # bad codes
        # ---- P goes home; K2 walks over and goes in ----
        await P.click('#mapWorld .mapHouse.mine'); await P.wait_for_timeout(800)
        pid_home = await P.evaluate("__hood().myHouseId()")
        await K2.click(f'#mapWorld .mapHouse[data-go="house:{pid_home}"]'); await K2.wait_for_timeout(900)
        k2_ui = await K2.evaluate("__ui()"); await check('K2 entered Sunny Bunny house', k2_ui['currentHouseId'] == pid_home and k2_ui['view'] == 'house')
        await P.wait_for_timeout(500)
        await check('P sees K2 avatar inside', await P.locator('.char.avatar.other').count() == 1)
        # ---- K2 decorates P's house live ----
        before = await items(P)
        await K2.click('.cat[data-cat="pets"]'); th = K2.locator('.shelf .thing').first
        await drag(K2, await center(th), (560, 560)); await P.wait_for_timeout(700)
        after = await items(P); await check('K2 adds item -> P sees it live', len(after) == len(before) + 1, f'{len(before)}->{len(after)}')
        newid = [i for i in after if i not in before][0] if len(after) > len(before) else None
        if newid:  # P moves it, K2 sees the move
            el = P.locator(f'.item[data-id="{newid}"]'); c = await center(el); await drag(P, c, (c[0] - 200, c[1]))
            await K2.wait_for_timeout(600)
            xs = await asyncio.gather(*(pg.evaluate(f"__store.get().rooms.living.items.find(i => i.id === '{newid}').x") for pg in (P, K2)))
            await check('P moves it -> K2 converges', abs(xs[0] - xs[1]) < 0.01, str(xs))
        await P.screenshot(path=SHOT + '03-P-sees-visitor-and-new-item.png'); await K2.screenshot(path=SHOT + '04-K2-visiting-decorating.png')
        # ---- proximity chat ----
        await K2.click('#btnChat'); await K2.wait_for_timeout(300)
        near = await K2.inner_text('#chatNear'); await check('K2 sees friend nearby', 'nearby' in near, near)
        await K2.click('.phrases button:text-is("Hi!")'); await P.wait_for_timeout(500)
        await check('P gets phrase bubble from K2', await P.locator('.char.avatar.other .bubble:has-text("Hi!")').count() == 1)
        await check('K3 (on street) does not get it', await K3.locator('.bubble').count() == 0)
        await K2.fill('#chatInput', 'call me 555 123 4567'); await K2.click('#chatForm button'); await K2.wait_for_timeout(200)
        warn = await K2.inner_text('#chatWarn'); await check('phone number blocked client-side', 'secret' in warn, warn)
        await K2.fill('#chatInput', 'go to www.example.com'); await K2.click('#chatForm button'); await K2.wait_for_timeout(200)
        await check('link blocked', 'link' in (await K2.inner_text('#chatWarn')).lower())
        # bypass the client filter: server must still refuse
        await K2.evaluate("__hood().say({kind:'text', v:'my email is kid@example.com'})"); await K2.wait_for_timeout(400)
        await check('server refuses email even if client is bypassed', await P.locator('.bubble:has-text("example")').count() == 0)
        await K2.fill('#chatInput', 'Your house is so cute!'); await K2.click('#chatForm button'); await P.wait_for_timeout(500)
        await check('typed message delivered nearby', await P.locator('.bubble:has-text("so cute")').count() == 1, str(await P.locator('.bubble').all_inner_texts()) + ' K2warn=' + await K2.inner_text('#chatWarn') + ' K2bub=' + str(await K2.locator('.bubble').all_inner_texts()))
        await P.click('#btnChat'); await P.click('.emotes button >> nth=3'); await K2.wait_for_timeout(400)
        await check('P emote reaches K2', await K2.locator('.char.avatar.other .bubble.emote').count() == 1)
        await P.screenshot(path=SHOT + '05-P-chat-bubbles.png'); await K2.screenshot(path=SHOT + '06-K2-chat-tray.png')
        await K2.click('[data-chat="close"]'); await P.click('[data-chat="close"]')
        # ---- owner locks the house ----
        await P.click('#btnLock'); await K2.wait_for_timeout(600)
        await check('K2 sees locked house', await K2.evaluate("document.body.classList.contains('locked')"))
        before = await items(P)
        it = K2.locator('.item').first; c = await center(it); await drag(K2, c, (c[0] + 150, c[1]))
        await K2.evaluate(f"__hood().dispatch('{pid_home}', {{type:'item/delete', room:'living', id:'{before[0]}'}})"); await K2.wait_for_timeout(800)
        after = await items(P); k2v = await items(K2)
        await check('locked: forced delete refused by server, K2 rolled back', after == before and k2v == before, f'{len(before)} {len(after)} {len(k2v)}')
        await K2.screenshot(path=SHOT + '07-K2-locked-house-look-only.png')
        await P.click('#btnLock'); await K2.wait_for_timeout(500)
        await check('unlock restores editing', not await K2.evaluate("document.body.classList.contains('locked')"))
        # Drop K2's socket and queue a phrase in the same turn (readyState is already CLOSING). It should
        # reconnect on its own and the phrase should arrive once presence is sent again.
        await K2.evaluate("() => { const h = __hood(); h.ws.close(); h.say({kind:'phrase', v:1}); }")
        back = 'offline'
        for _ in range(40):
            back = await K2.evaluate("() => { try { return __hood().status; } catch (e) { return 'gone'; } }")
            if back == 'online': break
            await K2.wait_for_timeout(200)
        bub = 0
        for _ in range(20):
            bub = await P.locator('.char.avatar.other .bubble:has-text("Come over!")').count()
            if bub: break
            await P.wait_for_timeout(200)
        await check('dropped socket reconnects and a queued phrase arrives', back == 'online' and bub == 1, f'status={back} bubbles={bub}')
        # ---- grown-up screen (on P) ----
        await to_map(P); await P.click('#btnParent'); await adult(P)
        await P.wait_for_selector('#pCode'); await check('parent screen shows code', (await P.inner_text('#pCode')).strip() == code)
        await P.click('#pFree'); await K2.wait_for_timeout(500)
        await K2.click('#btnChat'); await K2.wait_for_timeout(200)
        await check('free typing off -> K2 presets only', await K2.locator('#chatInput').count() == 0 and await K2.locator('.presetsOnly').count() == 1)
        await K2.evaluate("__hood().say({kind:'text', v:'hello there'})"); await P.wait_for_timeout(300)
        await K2.click('[data-chat="close"]')
        # reset Quinn's sign-in: her iPad leaves, then signs in again and gets her same house back
        k2_house = await K2.evaluate("__hood().myHouseId()")
        un = P.locator('[data-p="unclaim"][data-name="Quinn"]'); await un.click(); await P.locator('[data-p="unclaim"][data-name="Quinn"]').click(); await K2.wait_for_timeout(800)
        await check('reset claim signs that iPad out', (await K2.evaluate("__ui()"))['mode'] == 'solo')
        await join(K2, code, 'Quinn', None)
        await check('re-sign-in keeps her house', await K2.evaluate("__hood().myHouseId()") == k2_house)
        k3_house = await K3.evaluate("__hood().myHouseId()")
        await P.fill(f'input[data-hid="{k3_house}"]', 'Koala Castle'); await P.click(f'[data-p="rename"][data-hid="{k3_house}"]'); await P.wait_for_timeout(500)
        await check('rename visible to K3', await K3.locator('.mapSign:has-text("Koala Castle")').count() == 1)
        await P.screenshot(path=SHOT + '08-parent-screen.png')
        k3_pid = await K3.evaluate("__hood().pid")
        rm = P.locator(f'[data-p="remove"][data-pid="{k3_pid}"]'); await rm.click(); await rm.click(); await K3.wait_for_timeout(800)
        k3ui = await K3.evaluate("__ui()"); await check('removed player K3 is back in solo mode', k3ui['mode'] == 'solo', str(k3ui))
        await check('K2 street now has 2 houses', await K2.evaluate("__hood().houses.size") == 2)
        # offline still works for K3
        await K3.screenshot(path='/tmp/k3-removed.png'); n0 = len(await items(K3)); await K3.click('#roomFilter [data-rf="all"]'); await K3.click('.cat[data-cat="food"]'); await drag(K3, await center(K3.locator('.shelf .thing').first), (250, 560))
        await check('solo play still works after removal', len(await items(K3)) == n0 + 1, f'{n0} -> {len(await items(K3))} ' + str(await K3.evaluate("document.body.className")))
        await K3.screenshot(path=SHOT + '09-K3-removed-back-to-solo.png')
        await P.click('.hoodSheet [data-m="close"]')
        # Nursery (and the hidden backyard) sync between two iPads. An unknown room is refused.
        if (await P.evaluate("__ui()"))['view'] != 'house':
            await to_map(P); await P.click('#mapWorld .mapHouse.mine'); await P.wait_for_timeout(800)
        pid_home = await P.evaluate("__hood().myHouseId()")
        if (await K2.evaluate("__ui()")).get('currentHouseId') != pid_home:
            await to_map(K2); await K2.click(f'#mapWorld .mapHouse[data-go="house:{pid_home}"]'); await K2.wait_for_timeout(900)
        await P.evaluate("""() => {
          const h = __hood(), id = h.myHouseId(), cid = h.view(id).characters[0].id;
          h.dispatch(id, {type:'item/add', room:'nursery', item:{id:'nur-sync', kind:'crib', x:500, y:480, flip:false}});
          h.dispatch(id, {type:'room/wallTile', room:'nursery', tile:'nursery/cloud-sky'});
          h.dispatch(id, {type:'cat/set', cat:{name:'Pip', coat:1, room:'nursery', x:600}});
          h.dispatch(id, {type:'cat/move', room:'nursery', x:700});
          h.dispatch(id, {type:'char/move', id: cid, room:'nursery', x:640, y:540});
          h.dispatch(id, {type:'item/add', room:'backyard', item:{id:'yard-sync', kind:'plant', x:400, y:500, flip:false}});
        }""")
        await P.wait_for_timeout(900)
        async def nur_view(pg):
            return await pg.evaluate("""() => { const s = __store.get(); return {
              nur: s.rooms.nursery.items.map(i => i.id), tile: s.rooms.nursery.wallTile,
              cat: s.cat && s.cat.room, ch: s.characters[0].room, yard: s.rooms.backyard.items.map(i => i.id) }; }""")
        sp, sk = await nur_view(P), await nur_view(K2)
        await check('nursery edits sync between two iPads',
                    'nur-sync' in sp['nur'] and 'nur-sync' in sk['nur'] and sp['tile'] == 'nursery/cloud-sky' and sk['tile'] == 'nursery/cloud-sky'
                    and sp['cat'] == 'nursery' and sk['cat'] == 'nursery' and sp['ch'] == 'nursery' and sk['ch'] == 'nursery'
                    and 'yard-sync' in sp['yard'] and 'yard-sync' in sk['yard'], str((sp, sk)))
        await P.evaluate("""() => { const h = __hood(); h.dispatch(h.myHouseId(), {type:'item/add', room:'attic', item:{id:'attic-no', kind:'crib', x:100, y:100, flip:false}}); }""")
        await P.wait_for_timeout(700)
        left, left2 = await nur_view(P), await nur_view(K2)
        await check('unknown room is refused and the nursery stays', 'attic-no' not in left['nur'] and 'nur-sync' in left['nur'] and 'nur-sync' in left2['nur'], str(left))
        # reload: P reconnects to the street automatically
        await P.reload(); await P.wait_for_timeout(1500)
        await check('reload reconnects automatically', (await P.evaluate("__ui()"))['view'] == 'street')
        if (await K2.evaluate("__ui()"))['view'] != 'street': await to_map(K2)
        await K2.wait_for_timeout(600)
        await K2.screenshot(path=SHOT + '10-K2-street-after-changes.png')
        # brute force: wrong codes get throttled per IP (run last: it blocks this IP for a few minutes)
        st = await K2.evaluate("(async () => { const out = []; for (let i = 0; i < 10; i++) out.push((await fetch(__hood_url() + '/api/hood/NOPE' + i + 'ZZ')).status); return out; })()")
        await check('wrong-code guessing is rate-limited', 429 in st, str(st))
asyncio.run(main())
