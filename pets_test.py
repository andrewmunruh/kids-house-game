# Pets + park: 3 simulated iPads (and one "old app" socket) against a neighborhood server.
import asyncio, re, sys, json
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/pets/'
res = {}
def check(name, ok, extra=''):
    res[name] = ok; print(('PASS ' if ok else 'FAIL ') + name, extra)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nth, bring):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-street .house', timeout=8000)
async def drag(pg, a, b, steps=14):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps); await pg.mouse.up(); await pg.wait_for_timeout(300)
async def center(loc):
    b = await loc.bounding_box(); return (b['x'] + b['width'] / 2, b['y'] + b['height'] / 2)
async def adopt(pg, tab, swatch, name=None, typed=None):
    await pg.click('#btnPets'); await pg.wait_for_selector('.pets .petTabs')
    await pg.click(f'.petTabs [data-pt="{tab}"]')
    await pg.click(f'.swatches [data-{"coat" if tab == "cat" else "breed"}="{swatch}"]')
    if name: await pg.click(f'.nameChips button:has-text("{name}")')
    if typed is not None: await pg.fill('#petName', typed)
    await pg.click('#adoptBtn'); await pg.wait_for_timeout(400)
pets = lambda pg: pg.evaluate('__pets()')

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def mk():
            c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
            await c.add_init_script("localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew', '999')")  # skip the What's new popup
            return c
        P, K2, K3 = [await (await mk()).new_page() for _ in range(3)]
        errs = {}
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []; pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and errs[n].append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(600)
        # ---------- solo play: adopt a cat + a dog ----------
        await adopt(P, 'cat', 2, typed='kid@mail')
        check('bad pet name refused', await P.locator('#petErr').count() == 1)
        await P.fill('#petName', ''); await P.click('.nameChips button:has-text("Mochi")'); await P.click('#adoptBtn'); await P.wait_for_timeout(500)
        st = await P.evaluate('__store.get().cat'); check('solo: cat adopted into the house state', st and st['name'] == 'Mochi' and st['coat'] == 2, json.dumps(st))
        await adopt(P, 'dog', 3, name='Rocket'); await P.wait_for_timeout(600)
        d = await P.evaluate('__store.get().dog'); check('solo: dog adopted', d and d['name'] == 'Rocket' and d['breed'] == 3)
        pp = await pets(P); check('solo: cat + dog shown in the house', pp['cat'] is not None and 'solo' in pp['dogs'], json.dumps(pp))
        await P.screenshot(path=SHOT + '01-solo-house-cat-and-dog.png')
        # cat behaves deterministically: two iPads with the same cat agree
        x1 = await P.evaluate("(() => { const c = __store.get().cat; return document.querySelector('.pet.pet-cat').style.left; })()")
        before = (await pets(P))['dogPos']['solo']
        ch = P.locator('#layer .char').first; c0 = await center(ch); await drag(P, c0, (c0[0] + 250, c0[1])); await P.wait_for_timeout(1500)
        after = (await pets(P))['dogPos']['solo']; check('solo: dog heels after her character', after['x'] - before['x'] > 150, f'{before} -> {after}')
        await P.click('.pet.pet-dog'); await P.wait_for_timeout(300)
        check('dog trick on tap (sit bubble)', 'sits' in (await P.inner_text('.pet.pet-dog .bubble')))
        await P.evaluate("document.querySelector('.pet.pet-cat').click()"); await P.wait_for_timeout(300)
        check('cat purrs with hearts on tap', await P.locator('.pet.pet-cat .heart').count() > 0)
        await P.screenshot(path=SHOT + '02-solo-purr-and-trick.png')
        # ---------- solo park ----------
        await P.click('#btnPark'); await P.wait_for_selector('body.view-park #parkWorld .parkScene'); await P.wait_for_timeout(900)
        pp = await pets(P); check('solo park: walker + dog in the park', await P.locator('#pavatars .savatar').count() == 1 and 'solo' in pp['dogs'])
        await P.screenshot(path=SHOT + '03-solo-park-entrance.png')
        await P.evaluate("document.getElementById('parkScroll').scrollLeft = 200"); await P.wait_for_timeout(200)
        await P.click('[data-spot="0"]'); await P.wait_for_timeout(1200)
        check('solo park: swinging', await P.locator('#pavatars .savatar.pose-swing').count() == 1 and await P.locator('.swing.swinging').count() == 1)
        await P.screenshot(path=SHOT + '04-solo-swing.png')
        await P.click('#btnLeavePark'); await P.wait_for_timeout(500)
        check('solo: leaving park returns home with the save intact', await P.evaluate("!document.body.classList.contains('view-park') && __store.get().cat.name === 'Mochi'"))
        # ---------- neighborhood ----------
        await P.click('#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        await P.wait_for_selector('#newCode'); code = (await P.inner_text('#newCode')).strip(); await P.click('.hoodSheet [data-m="close"]')
        await join(P, code, 0, True); await join(K2, code, 1, False); await join(K3, code, 2, False)
        await P.wait_for_timeout(800)
        p_house = await P.evaluate('__hood().myHouseId()')
        check('hood: her cat came along with her house', (await P.evaluate(f"__hood().view('{p_house}').cat"))['name'] == 'Mochi')
        check('hood: her dog came along', (await K2.evaluate(f"__hood().players.get('{await P.evaluate('__hood().pid')}').dog"))['name'] == 'Rocket')
        await adopt(K2, 'dog', 1, name='Coco'); await K2.wait_for_timeout(500)
        check('hood: K2 adopts a poodle, synced to others', (await P.evaluate(f"__hood().players.get('{await K2.evaluate('__hood().pid')}').dog"))['name'] == 'Coco')
        check('street: dogs follow on the street', len((await pets(P))['dogs']) == 2, json.dumps((await pets(P))['dogs']))
        await P.screenshot(path=SHOT + '05-street-with-dogs.png')
        # K2 cannot change someone else's cat (server validation)
        await K2.evaluate(f"__hood().dispatch('{p_house}', {{type:'cat/set', cat:{{name:'Stolen', coat:1, room:'living', x:900}}}})"); await K2.wait_for_timeout(700)
        check('server refuses cat changes by visitors', (await P.evaluate(f"__hood().view('{p_house}').cat"))['name'] == 'Mochi')
        # visitors see the cat in her house
        await P.locator(f'.house[data-hid="{p_house}"]').click(); await P.wait_for_timeout(600)
        await K2.locator(f'.house[data-hid="{p_house}"]').click(); await K2.wait_for_timeout(900)
        check('visitor sees her cat', (await pets(K2))['cat'] is not None and (await pets(K2))['cat']['name'] == 'Mochi')
        mood_p, mood_k = (await pets(P))['cat']['mood'], (await pets(K2))['cat']['mood']
        check('cat behaves the same on both iPads', mood_p == mood_k, f'{mood_p}/{mood_k}')
        await K2.evaluate("document.querySelector('.pet.pet-cat').click()"); await P.wait_for_timeout(500)
        check('visitor pets the cat -> owner sees hearts', await P.locator('.pet.pet-cat .heart').count() > 0)
        await K2.screenshot(path=SHOT + '06-visitor-sees-cat.png')
        # owner calls the cat
        await P.click('#btnPets'); await P.click('#callCat'); await P.wait_for_timeout(500)
        check('"Here, kitty!" moves the cat (synced)', (await K2.evaluate(f"__hood().view('{p_house}').cat.x")) == (await P.evaluate('__store.get().cat.x')))
        # ---------- park ----------
        old = await K3.evaluate("""(async () => { const cfg = JSON.parse(localStorage.getItem('cozy-hood'));
          const ws = new WebSocket(cfg.url.replace(/^http/,'ws') + '/ws/' + (cfg.id ?? cfg.code)); window.__oldMsgs = [];
          await new Promise(r => ws.onopen = r); ws.onmessage = e => window.__oldMsgs.push(JSON.parse(e.data));
          ws.send(JSON.stringify({t:'join', nickname:'Lucky Lamb', look:{}})); window.__oldWs = ws; return true; })()""")
        await P.click('#btnStreet'); await P.wait_for_timeout(400)
        await P.evaluate("document.getElementById('streetScroll').scrollLeft = 1e5"); await P.wait_for_timeout(300)
        await P.click('.parkGate'); await K2.click('#btnPark'); await K3.click('#btnPark'); await P.wait_for_timeout(1200)
        n = [await pg.locator('#pavatars .savatar').count() for pg in (P, K2, K3)]
        check('park: everyone sees all 3 kids live', n == [3, 3, 3], str(n))
        check('park: both dogs in the park', len((await pets(K3))['dogs']) == 2)
        await K2.click('[data-spot="1"]'); await P.wait_for_timeout(700)
        check('park: K2 swinging seen by P', await P.locator(f'#pavatars .savatar[data-pid="{await K2.evaluate("__hood().pid")}"].pose-swing').count() == 1)
        await K3.click('[data-spot="1"]'); await K3.wait_for_timeout(300)
        check('park: taken swing refused', 'already' in (await K3.inner_text('body')))
        await K3.evaluate("document.getElementById('parkScroll').scrollLeft = 1500"); await K3.wait_for_timeout(200)
        await K3.click('[data-spot="4"]'); await P.wait_for_timeout(600)
        check('park: K3 sits on bench, seen by K2', await K2.locator(f'#pavatars .savatar[data-pid="{await K3.evaluate("__hood().pid")}"].pose-sit').count() == 1)
        await P.evaluate("__hood().setPresence({where:'park', x:2120, y:575, flip:false})"); await P.evaluate("document.getElementById('parkScroll').scrollLeft = 1500"); await P.wait_for_timeout(400)
        await K3.evaluate("__hood().say({kind:'text', v:'hi from the bench'})"); await P.wait_for_timeout(500)
        check('park: chat bubble shows for others', await P.locator('#pavatars .bubble:has-text("hi from the bench")').count() == 1)
        await P.screenshot(path=SHOT + '07-park-swing-bench-chat.png')
        await K2.screenshot(path=SHOT + '08-park-k2-view.png')
        # trick seen by others
        k2pid = await K2.evaluate('__hood().pid')
        await P.evaluate(f"document.getElementById('parkScroll').scrollLeft = 0"); await P.wait_for_timeout(400)
        await P.click(f'.pet.pet-dog[data-dog="{k2pid}"]', force=True); await K2.wait_for_timeout(300)
        check('trick on K2\'s dog is seen on K2\'s iPad', await K2.locator(f'.pet.pet-dog[data-dog="{k2pid}"] .bubble').count() == 1)
        # fetch at the dog area
        for pg in (P, K2): await pg.evaluate("document.getElementById('parkScroll').scrollLeft = 1e5")
        await P.wait_for_timeout(300)
        await K2.click('#ball'); await P.wait_for_timeout(300)
        check('fetch: ball throw seen by P', (await pets(P))['fetch'] is not None)
        await P.wait_for_timeout(1500); await P.screenshot(path=SHOT + '09-fetch.png')
        for _ in range(30):
            if (await pets(P))['fetch'] is None and (await pets(K2))['fetch'] is None: break
            await P.wait_for_timeout(300)
        check('fetch: dogs bring the ball back', (await pets(P))['fetch'] is None)
        await P.click('[data-act="splash"]', force=True) if await P.locator('[data-act="splash"]').is_visible() else None
        # old app protection
        await P.evaluate("__hood().fx({k:'purr'})"); await P.wait_for_timeout(500)
        msgs = await K3.evaluate('window.__oldMsgs')
        types = sorted(set(m.get('t') for m in msgs))
        check('old app never gets fx or cat actions', 'welcome' in types and not any(m.get('t') == 'fx' or (m.get('t') == 'act' and m['action']['type'].startswith('cat/')) for m in msgs), str(types))
        # leaving the park
        await P.click('#btnLeavePark'); await P.wait_for_timeout(500)
        check('leave park -> back on the street next to the gate', await P.evaluate("document.body.classList.contains('view-street') && !document.body.classList.contains('view-park')"))
        await K2.wait_for_timeout(300)
        check('others see her leave the park', await K2.locator('#pavatars .savatar').count() == 2)
        for k, v in errs.items():
            v = [e for e in v if '429' not in e]
            check(f'no JS errors ({k})', not v, '; '.join(v[:3]))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
