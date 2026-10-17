# Rainbow Ranch: solo play + 3 simulated iPads (and one "older app" socket) against a neighborhood server.
import asyncio, sys, json, time
from playwright.async_api import async_playwright
from testnav import PFX, SKIP_WN, K, to_map, go
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/?hood=http://localhost:8787'
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/ranch/'
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nth, bring):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)
async def center(loc):
    b = await loc.bounding_box(); return (b['x'] + b['width'] / 2, b['y'] + b['height'] / 2)
async def scroll_to(pg, x):  # world x into view
    await pg.evaluate(f"(() => {{ const s = document.getElementById('ranchScroll'); s.scrollLeft = {x} * (document.getElementById('ranch').clientHeight / 600) - s.clientWidth / 2; }})()"); await pg.wait_for_timeout(250)
async def drag_feed(pg, feed, target):
    t0 = await center(pg.locator(target)); cands = [await center(pg.locator(f'.bucket[data-feed="{feed}"]').nth(i)) for i in range(await pg.locator(f'.bucket[data-feed="{feed}"]').count())]
    a = min(cands, key=lambda c: abs(c[0] - t0[0]))  # the nearest feed station
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(a[0] - 40, a[1] - 60, steps=5)
    t = await center(pg.locator(target)); await pg.mouse.move(*t, steps=8); t = await center(pg.locator(target)); await pg.mouse.move(*t, steps=2); await pg.mouse.up(); await pg.wait_for_timeout(300)
R = lambda pg: pg.evaluate('__ranch()')

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def mk():
            c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN)
            return c
        P, K2, K3 = [await (await mk()).new_page() for _ in range(3)]
        errs = {}
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []; pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and errs[n].append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(600)
        # ================= solo =================
        await go(P, 'ranch')
        check('solo: map -> Rainbow Ranch yard (horses, hen house, garden; no animals outside)', await P.locator('.animal').count() == 0 and await P.locator('.horse').count() == 5 and await P.locator('.henHouse').count() == 1 and await P.locator('.plot').count() == 6 and await P.locator('.bucket').count() == 0 and 'Rainbow Ranch' in await P.inner_text('#streetTitle'))
        await P.screenshot(path=SHOT + '01-ranch-gate-barn.png')
        await P.click('.barnDoor'); await P.wait_for_selector('body.in-barn #ranchWorld .barnScene'); await P.wait_for_timeout(600)
        check('barn door -> barn interior with the 6 animals + feed buckets', await P.locator('.animal').count() == 6 and await P.locator('.bucket').count() == 6 and 'Barn' in await P.inner_text('#streetTitle') and (await R(P))['me']['where'] == 'barn')
        await P.screenshot(path=SHOT + '01b-barn-inside.png')
        await scroll_to(P, 600)
        await P.locator('.animal[data-animal="0"]').click(force=True); await P.wait_for_timeout(300)
        check('petting zoo: tap goat -> reaction + hearts', 'Meh' in await P.inner_text('.animal[data-animal="0"] .abubble') and await P.locator('.animal[data-animal="0"] .heart').count() > 0)
        await scroll_to(P, 1450)
        await drag_feed(P, 'carrot', '.animal[data-animal="5"]')
        check('feeding: carrot dragged onto the cow -> munch', 'Yum' in (await P.inner_text('.animal[data-animal="5"] .abubble')))
        await P.screenshot(path=SHOT + '02-petting-zoo-feeding.png')
        await scroll_to(P, 300); await P.wait_for_timeout(300)
        a = await center(P.locator('.bucket[data-feed="apple"]').first); await P.mouse.move(*a); await P.mouse.down()
        for i in range(1, 9): await P.mouse.move(a[0] + i * 60, a[1] - 60, steps=2)
        await P.mouse.move(1010, a[1] - 80, steps=3); await P.wait_for_timeout(900); sl = await P.evaluate("document.getElementById('ranchScroll').scrollLeft"); await P.mouse.up()
        check('dragging food to the screen edge scrolls the barn', sl > 300, f'scrollLeft {sl:.0f}')
        await scroll_to(P, 300); await P.wait_for_timeout(500)
        await P.click('.barnExit'); await P.wait_for_selector('body.view-ranch:not(.in-barn) #ranchWorld .ranchScene'); await P.wait_for_timeout(400)
        check('barn door back out -> the yard, standing by the barn', (await R(P))['me']['where'] == 'ranch' and abs((await R(P))['me']['x'] - 435) < 5)
        await scroll_to(P, 715)
        await P.click('.henHouse'); await P.wait_for_timeout(200); await P.click('.henHouse'); await P.wait_for_timeout(1700); await P.click('.henHouse'); await P.wait_for_timeout(300)
        bk = (await R(P))['basket']; check('hen house: eggs collected (with a short hen cooldown)', bk['egg'] == 2, json.dumps(bk))
        await scroll_to(P, 3300)
        await P.click('.plot[data-plot="0"]'); await P.click('.seedPick [data-seed="carrot"]'); await P.wait_for_timeout(200)
        await P.click('.plot[data-plot="0"]'); await P.wait_for_timeout(300)
        pl = (await R(P))['plots'][0]; check('garden (solo): plant + water', pl and pl['seed'] == 'carrot' and pl['wet'], json.dumps(pl))
        await P.screenshot(path=SHOT + '03-garden-planted.png')
        await scroll_to(P, 2990)
        await P.click('.horse[data-horse="4"]', force=True); await P.wait_for_timeout(400)
        me = (await R(P))['me']; check('solo: tap the rainbow pony to ride', me.get('ride') == 4 and await P.locator('#btnHopOff').is_visible())
        await P.screenshot(path=SHOT + '04-riding-rainbow-pony.png')
        x0 = me['x']; r = await P.locator('#ranchWorld').bounding_box(); sc = r['height'] / 600
        r = await P.locator('#ranchWorld').bounding_box()
        await P.mouse.click(r['x'] + (x0 - 220) * sc, r['y'] + 582 * sc); await P.wait_for_timeout(250)
        moved = abs((await R(P))['me']['x'] - x0); check('riding is fast (gallop)', moved > 120, f'{moved:.0f} units in 0.25s')
        await P.wait_for_timeout(1500)
        await P.click('#btnHopOff'); await P.wait_for_timeout(300)
        me = (await R(P))['me']; check('hop off button dismounts; pony back in her stall', me.get('ride') is None and await P.locator('.horse[data-horse="4"].away').count() == 0)
        x0 = me['x']; await scroll_to(P, x0); r = await P.locator('#ranchWorld').bounding_box()
        await P.mouse.click(r['x'] + (x0 - 220) * sc, r['y'] + 582 * sc); await P.wait_for_timeout(250)
        walked = abs((await R(P))['me']['x'] - x0); check('walking is slower than riding', 30 < walked < moved * 0.7, f'{walked:.0f} units in 0.25s')
        await go(P, 'home')
        check('basket chip at home', await P.locator('#basketChip').is_visible())
        await P.click('#basketChip'); await P.click('.bRow[data-take="egg"]'); await P.wait_for_timeout(400)
        kinds = await P.evaluate("Object.values(__store.get().rooms).flatMap(r => r.items.map(i => i.kind))")
        check('egg carried home becomes a room item', 'ranch-egg' in kinds and (await R(P))['basket']['egg'] == 1)
        await P.screenshot(path=SHOT + '05-egg-at-home.png')
        # ================= neighborhood =================
        await P.click('#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        try: await P.wait_for_selector('#newCode', timeout=8000)
        except Exception:
            print('DBG', await P.evaluate("document.body.className"), await P.evaluate("[...document.querySelectorAll('.toast,.hoodSheet,.adultCard')].map(t=>t.className+':'+t.textContent.slice(0,80)).join(' | ')")); await P.screenshot(path='/tmp/dbgfail.png'); raise
        code = (await P.inner_text('#newCode')).strip(); await P.click('.hoodSheet [data-m="close"]')
        await join(P, code, 0, True); await join(K2, code, 1, False); await join(K3, code, 2, False); await P.wait_for_timeout(700)
        old = await K3.evaluate("""(async () => { const cfg = JSON.parse(localStorage.getItem('""" + K('cozy-hood') + """'));
          const ws = new WebSocket(cfg.url.replace(/^http/,'ws') + '/ws/' + (cfg.id ?? cfg.code)); window.__oldMsgs = [];
          await new Promise(r => ws.onopen = r); ws.onmessage = e => window.__oldMsgs.push(JSON.parse(e.data));
          ws.send(JSON.stringify({t:'join', nickname:'Lucky Lamb', look:{}, v: 2})); window.__oldWs = ws; return true; })()""")
        await P.screenshot(path=SHOT + '06-street-ranch-gate.png')
        for pg in (P, K2, K3): await go(pg, 'ranch')
        await P.wait_for_timeout(800)
        n = [await pg.locator('#ravatars .savatar').count() for pg in (P, K2, K3)]
        check('map -> ranch; everyone sees all 3 kids live', n == [3, 3, 3], str(n))
        # garden is shared and server-checked
        for pg in (P, K2, K3): await scroll_to(pg, 3300)
        await K2.click('.plot[data-plot="1"]'); await K2.click('.seedPick [data-seed="flower"]'); await P.wait_for_timeout(500)
        pl = (await R(P))['plots'][1]; check('garden: K2 plants a flower, P sees it', pl and pl['seed'] == 'flower', json.dumps(pl))
        await P.click('.plot[data-plot="1"]'); watered_at = time.time(); await K3.wait_for_timeout(500)
        check('garden: P waters it, K3 sees it watered', (await R(K3))['plots'][1]['wet'])
        await K3.evaluate("__hood().ranchOp({op:'pick', i:1})"); await K3.wait_for_timeout(400)
        check('server refuses picking before it has grown', (await R(P))['plots'][1] is not None and (await R(K3))['basket']['flower'] == 0)
        await K3.evaluate("__hood().ranchOp({op:'plant', i:1, seed:'carrot'})"); await K3.wait_for_timeout(300)
        check('server refuses planting on a taken plot', (await R(P))['plots'][1]['seed'] == 'flower')
        await P.screenshot(path=SHOT + '07-shared-garden.png')
        # riding: one rider per horse
        for pg in (P, K2, K3): await scroll_to(pg, 2860)
        await P.click('.horse[data-horse="4"]', force=True); await P.wait_for_timeout(600)
        ppid = await P.evaluate('__hood().pid')
        check('P rides the rainbow pony, K2 sees her riding', await K2.locator(f'#ravatars .savatar.riding[data-pid="{ppid}"] .mount').count() == 1 and await K2.locator('.horse[data-horse="4"].away').count() == 1)
        await K3.click('#ravatars .savatar.riding', force=True) if False else None
        await K3.evaluate("document.querySelector('.horse[data-horse=\"4\"]').click()"); await K3.wait_for_timeout(300)
        check('"Someone is riding!" for a second rider', 'Someone is riding' in await K3.inner_text('body') and (await R(K3))['me'].get('ride') is None)
        await K3.evaluate("__hood().setPresence({where:'ranch', x:2990, y:560, flip:false, ride:4})"); await K3.wait_for_timeout(600)
        check('server enforces one rider per horse', (await R(K3))['me'].get('ride') is None and await P.locator('#ravatars .savatar.riding').count() == 1)
        await K2.click('.horse[data-horse="1"]', force=True); await P.wait_for_timeout(600)
        check('two kids ride different horses', await P.locator('#ravatars .savatar.riding').count() == 2)
        await K2.screenshot(path=SHOT + '08-friends-riding.png')
        await K2.click('#btnHopOff'); await P.wait_for_timeout(500)
        check('dismount seen by others', await P.locator('#ravatars .savatar.riding').count() == 1)
        await K3.evaluate("__hood().setPresence({where:'street', x:900, y:540, flip:false, ride:2})"); await K3.wait_for_timeout(300)
        check('horses never leave the ranch (ride dropped off-ranch)', await P.evaluate(f"(__hood().presence.get('{await K3.evaluate('__hood().pid')}') || {{}}).ride") is None)
        await K3.evaluate("__hood().setPresence({where:'ranch', x:1500, y:560, flip:false})"); await K3.wait_for_timeout(300)
        # petting + feeding are live inside the barn (and only kids in the barn see them)
        await K3.evaluate("__hood().setPresence({where:'ranch', x:600, y:560, flip:false})"); await K3.wait_for_timeout(200)
        await P.click('.barnDoor'); await K2.click('.barnDoor'); await P.wait_for_timeout(700)
        check('barn presence is synced: friends in the barn see each other, the yard does not', await P.locator('#ravatars .savatar').count() == 2 and await K3.locator('#ravatars .savatar').count() == 1)
        await K3.click('.barnDoor'); await K3.wait_for_timeout(700)
        for pg in (P, K2, K3): await scroll_to(pg, 1450)
        await K2.locator('.animal[data-animal="4"]').click(force=True); await P.wait_for_timeout(400)
        check('petting seen live by others', await P.locator('.animal[data-animal="4"] .abubble').count() == 1)
        async def yum():
            for _ in range(10):
                loc = P.locator('.animal[data-animal="5"] .abubble')
                if await loc.count() and 'Yum' in await loc.first.inner_text(): return True
                await P.wait_for_timeout(200)
            return False
        seen = False
        for _ in range(2):
            await scroll_to(K3, 1650); await K3.wait_for_timeout(300)
            await drag_feed(K3, 'hay', '.animal[data-animal="5"]')
            seen = await yum()
            if seen: break
        check('feeding seen live by others (munch)', seen)
        await P.screenshot(path=SHOT + '09-live-zoo.png')
        await K2.evaluate("__hood().fx({k:'honk'})"); await P.wait_for_timeout(300)
        # eggs: per-kid basket, server cooldown (the hen house is outside)
        await K2.evaluate("__hood().ranchOp({op:'egg'})"); await K2.wait_for_timeout(400)
        check('server refuses hen-house eggs from inside the barn', (await R(K2))['basket']['egg'] == 0)
        for pg in (P, K2): await pg.click('.barnExit'); await pg.wait_for_timeout(500)
        await K2.wait_for_timeout(1200)
        for pg in (P, K2): await scroll_to(pg, 715)
        await K2.click('.henHouse'); await K2.wait_for_timeout(500)
        k2b = (await R(K2))['basket']['egg']
        await K2.evaluate("__hood().ranchOp({op:'egg'}); __hood().ranchOp({op:'egg'}); __hood().ranchOp({op:'egg'})"); await K2.wait_for_timeout(500)
        k2b2 = (await R(K2))['basket']['egg']
        check('eggs go in her own basket; server limits spam', k2b == 1 and k2b2 == 1 and (await R(P))['basket']['egg'] == 0, f'{k2b}->{k2b2}')
        await K2.wait_for_timeout(1600); await K2.click('.henHouse'); await K2.wait_for_timeout(500)
        check('next egg after the cooldown', (await R(K2))['basket']['egg'] == 2)
        await K2.evaluate("__hood().ranchOp({op:'take', kind:'egg', id:'hack1', room:'living', x:900})"); await K2.wait_for_timeout(300)
        # old app safety
        msgs = await K3.evaluate('window.__oldMsgs'); types = sorted(set(m.get('t') for m in msgs))
        check('older app never gets ranch messages or ranch effects', 'welcome' in types and not any(m.get('t') in ('ranch', 'ranchFail', 'noride') or (m.get('t') == 'fx' and m['fx']['k'] in ('zoo', 'apple', 'honk', 'hen')) for m in msgs), str(types))
        # off-ranch refusal
        await to_map(K3)
        await K3.evaluate("__hood().ranchOp({op:'egg'})"); await K3.wait_for_timeout(400)
        check('server refuses ranch actions from kids not at the ranch', (await R(K3))['basket']['egg'] == 0)
        check('map button leaves the ranch -> the map', await K3.evaluate("document.body.classList.contains('view-street') && !document.body.classList.contains('view-ranch')"))
        # wait for the flower to grow, then pick + carry home
        wait = 82 - (time.time() - watered_at)
        if wait > 0: await P.wait_for_timeout(int(wait * 1000))
        for pg in (P, K2): await scroll_to(pg, 3300)
        await P.wait_for_timeout(1200)
        check('flower grew (~80s) on every iPad', (await R(P))['plots'][1]['stage'] == 3 and (await R(K2))['plots'][1]['stage'] == 3)
        await P.screenshot(path=SHOT + '10-garden-grown.png')
        await K2.click('.plot[data-plot="1"]'); await P.wait_for_timeout(500)
        check('K2 picks the flower into her basket; plot empties for all', (await R(K2))['basket']['flower'] == 1 and (await R(P))['plots'][1] is None)
        k2house = await K2.evaluate('__hood().myHouseId()')
        await go(K2, f'house:{k2house}')
        await K2.click('#basketChip'); await K2.click('.bRow[data-take="flower"]'); await K2.wait_for_timeout(700)
        kinds = await P.evaluate(f"Object.values(__hood().view('{k2house}').rooms).flatMap(r => r.items.map(i => i.kind))")
        check('flowers carried home: server adds them to her room, friends see it', 'ranch-bouquet' in kinds and (await R(K2))['basket']['flower'] == 0)
        await K2.screenshot(path=SHOT + '11-flowers-at-home.png')
        await K2.evaluate("__hood().ranchOp({op:'take', kind:'flower', id:'hack2', room:'living', x:900})"); await K2.wait_for_timeout(400)
        kinds2 = await P.evaluate(f"Object.values(__hood().view('{k2house}').rooms).flatMap(r => r.items.map(i => i.id))")
        check('server refuses taking from an empty basket', 'hack2' not in kinds2)
        for k, v in errs.items():
            v = [e for e in v if '429' not in e]
            check(f'no JS errors ({k})', not v, '; '.join(v[:3]))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
