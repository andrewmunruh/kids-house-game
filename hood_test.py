# Multi-client neighborhood test: 3 simulated iPads against the local server.
import asyncio, re, sys
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
SHOT = 'screens/hood/'
res = {}
def check(name, ok, extra=''):
    res[name] = ok; print(('PASS ' if ok else 'FAIL ') + name, extra)

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nick, bring):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button:text-is("{nick}")'); await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-street .house', timeout=8000)
async def drag(pg, a, b, steps=12):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps); await pg.mouse.up(); await pg.wait_for_timeout(300)
async def center(loc):
    b = await loc.bounding_box(); return (b['x'] + b['width'] / 2, b['y'] + b['height'] / 2)
items = lambda pg: pg.evaluate("__store.get().rooms.living.items.map(i => i.id)")

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        mk = lambda: b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
        P, K2, K3 = [await (await mk()).new_page() for _ in range(3)]
        errs = {}
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []; pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and errs[n].append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(600)
        # ---- parent creates the street on the family iPad, then joins as a kid bringing the local house ----
        await P.click('#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        await P.wait_for_selector('#newCode'); code = (await P.inner_text('#newCode')).strip()
        check('create neighborhood + invite code', bool(re.fullmatch(r'[A-Z0-9]{6}', code)), code)
        await P.screenshot(path=SHOT + '01-parent-created-code.png')
        await P.click('[data-m="joinhere"]'); await P.click('.nicks button:text-is("Sunny Bunny")'); await P.click('[data-m="bring"]')
        await P.wait_for_selector('body.view-street .house')
        await join(K2, code, 'Zippy Fox', False)
        await join(K3, code, 'Cozy Koala', True)
        await P.wait_for_timeout(800)
        n_houses = await P.locator('#streetWorld .house').count(); check('3 houses on the street', n_houses == 3, str(n_houses))
        await P.screenshot(path=SHOT + '02-street-three-houses.png')
        # nickname collision is rejected
        K4 = await (await mk()).new_page(); await K4.goto(URL); await K4.wait_for_timeout(400)
        await K4.click('#btnHood'); await K4.click('[data-m="join"]'); await K4.fill('#codeInput', code); await K4.click('#codeForm button')
        await K4.click('.nicks button:text-is("Zippy Fox")'); await K4.click('[data-m="fresh"]'); await K4.wait_for_timeout(800)
        check('duplicate nickname refused', await K4.locator('.err:has-text("already")').count() == 1); await K4.context.close()
        # bad codes
        # ---- P goes home; K2 walks over and goes in ----
        await P.click('#streetWorld .house.mine'); await P.wait_for_timeout(600)
        pid_home = await P.evaluate("__hood().myHouseId()")
        me_av = K2.locator('#streetWorld .savatar.mine'); a = await center(me_av)
        await drag(K2, a, (a[0] + 250, a[1] + 10))
        await K2.click(f'#streetWorld .house[data-hid="{pid_home}"]'); await K2.wait_for_timeout(800)
        k2_ui = await K2.evaluate("__ui()"); check('K2 entered Sunny Bunny house', k2_ui['currentHouseId'] == pid_home and k2_ui['view'] == 'house')
        await P.wait_for_timeout(500)
        check('P sees K2 avatar inside', await P.locator('.char.avatar.other').count() == 1)
        # ---- K2 decorates P's house live ----
        before = await items(P)
        await K2.click('.cat[data-cat="pets"]'); th = K2.locator('.shelf .thing').first
        await drag(K2, await center(th), (560, 560)); await P.wait_for_timeout(700)
        after = await items(P); check('K2 adds item -> P sees it live', len(after) == len(before) + 1, f'{len(before)}->{len(after)}')
        newid = [i for i in after if i not in before][0] if len(after) > len(before) else None
        if newid:  # P moves it, K2 sees the move
            el = P.locator(f'.item[data-id="{newid}"]'); c = await center(el); await drag(P, c, (c[0] - 200, c[1]))
            await K2.wait_for_timeout(600)
            xs = await asyncio.gather(*(pg.evaluate(f"__store.get().rooms.living.items.find(i => i.id === '{newid}').x") for pg in (P, K2)))
            check('P moves it -> K2 converges', abs(xs[0] - xs[1]) < 0.01, str(xs))
        await P.screenshot(path=SHOT + '03-P-sees-visitor-and-new-item.png'); await K2.screenshot(path=SHOT + '04-K2-visiting-decorating.png')
        # ---- proximity chat ----
        await K2.click('#btnChat'); await K2.wait_for_timeout(300)
        near = await K2.inner_text('#chatNear'); check('K2 sees friend nearby', 'nearby' in near, near)
        await K2.click('.phrases button:text-is("Hi!")'); await P.wait_for_timeout(500)
        check('P gets phrase bubble from K2', await P.locator('.char.avatar.other .bubble:has-text("Hi!")').count() == 1)
        check('K3 (on street) does not get it', await K3.locator('.bubble').count() == 0)
        await K2.fill('#chatInput', 'call me 555 123 4567'); await K2.click('#chatForm button'); await K2.wait_for_timeout(200)
        warn = await K2.inner_text('#chatWarn'); check('phone number blocked client-side', 'secret' in warn, warn)
        await K2.fill('#chatInput', 'go to www.example.com'); await K2.click('#chatForm button'); await K2.wait_for_timeout(200)
        check('link blocked', 'link' in (await K2.inner_text('#chatWarn')).lower())
        # bypass the client filter: server must still refuse
        await K2.evaluate("__hood().say({kind:'text', v:'my email is kid@example.com'})"); await K2.wait_for_timeout(400)
        check('server refuses email even if client is bypassed', await P.locator('.bubble:has-text("example")').count() == 0)
        await K2.fill('#chatInput', 'Your house is so cute!'); await K2.click('#chatForm button'); await P.wait_for_timeout(500)
        check('typed message delivered nearby', await P.locator('.bubble:has-text("so cute")').count() == 1, str(await P.locator('.bubble').all_inner_texts()) + ' K2warn=' + await K2.inner_text('#chatWarn') + ' K2bub=' + str(await K2.locator('.bubble').all_inner_texts()))
        await P.click('#btnChat'); await P.click('.emotes button >> nth=3'); await K2.wait_for_timeout(400)
        check('P emote reaches K2', await K2.locator('.char.avatar.other .bubble.emote').count() == 1)
        await P.screenshot(path=SHOT + '05-P-chat-bubbles.png'); await K2.screenshot(path=SHOT + '06-K2-chat-tray.png')
        await K2.click('[data-chat="close"]'); await P.click('[data-chat="close"]')
        # ---- owner locks the house ----
        await P.click('#btnLock'); await K2.wait_for_timeout(600)
        check('K2 sees locked house', await K2.evaluate("document.body.classList.contains('locked')"))
        before = await items(P)
        it = K2.locator('.item').first; c = await center(it); await drag(K2, c, (c[0] + 150, c[1]))
        await K2.evaluate(f"__hood().dispatch('{pid_home}', {{type:'item/delete', room:'living', id:'{before[0]}'}})"); await K2.wait_for_timeout(800)
        after = await items(P); k2v = await items(K2)
        check('locked: forced delete refused by server, K2 rolled back', after == before and k2v == before, f'{len(before)} {len(after)} {len(k2v)}')
        await K2.screenshot(path=SHOT + '07-K2-locked-house-look-only.png')
        await P.click('#btnLock'); await K2.wait_for_timeout(500)
        check('unlock restores editing', not await K2.evaluate("document.body.classList.contains('locked')"))
        # ---- grown-up screen (on P) ----
        await P.click('#btnStreet'); await P.wait_for_timeout(400); await P.click('#btnParent'); await adult(P)
        await P.wait_for_selector('#pCode'); check('parent screen shows code', (await P.inner_text('#pCode')).strip() == code)
        await P.click('#pFree'); await K2.wait_for_timeout(500)
        await K2.click('#btnChat'); await K2.wait_for_timeout(200)
        check('free typing off -> K2 presets only', await K2.locator('#chatInput').count() == 0 and await K2.locator('.presetsOnly').count() == 1)
        await K2.evaluate("__hood().say({kind:'text', v:'hello there'})"); await P.wait_for_timeout(300)
        await K2.click('[data-chat="close"]')
        k3_house = await K3.evaluate("__hood().myHouseId()")
        await P.fill(f'input[data-hid="{k3_house}"]', 'Koala Castle'); await P.click(f'[data-p="rename"][data-hid="{k3_house}"]'); await P.wait_for_timeout(500)
        check('rename visible to K3', await K3.locator('.sign:has-text("Koala Castle")').count() == 1)
        await P.screenshot(path=SHOT + '08-parent-screen.png')
        k3_pid = await K3.evaluate("__hood().pid")
        rm = P.locator(f'[data-p="remove"][data-pid="{k3_pid}"]'); await rm.click(); await rm.click(); await K3.wait_for_timeout(800)
        k3ui = await K3.evaluate("__ui()"); check('removed player K3 is back in solo mode', k3ui['mode'] == 'solo', str(k3ui))
        check('K2 street now has 2 houses', await K2.evaluate("__hood().houses.size") == 2)
        # offline still works for K3
        await K3.screenshot(path='/tmp/k3-removed.png'); n0 = len(await items(K3)); await K3.click('.cat[data-cat="food"]'); await drag(K3, await center(K3.locator('.shelf .thing').first), (250, 560))
        check('solo play still works after removal', len(await items(K3)) == n0 + 1, f'{n0} -> {len(await items(K3))} ' + str(await K3.evaluate("document.body.className")))
        await K3.screenshot(path=SHOT + '09-K3-removed-back-to-solo.png')
        await P.click('.hoodSheet [data-m="close"]')
        # reload: P reconnects to the street automatically
        await P.reload(); await P.wait_for_timeout(1500)
        check('reload reconnects automatically', (await P.evaluate("__ui()"))['view'] == 'street')
        await K2.click('#btnStreet'); await K2.wait_for_timeout(600)
        await K2.screenshot(path=SHOT + '10-K2-street-after-changes.png')
        print('errors:', errs)
        print(f"\n{sum(res.values())}/{len(res)} checks passed")
        await b.close()
asyncio.run(main())
