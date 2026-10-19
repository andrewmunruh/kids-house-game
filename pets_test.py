# Pets + park: 3 simulated iPads (and one "old app" socket) against a neighborhood server.
import asyncio, re, sys, json
from playwright.async_api import async_playwright
from testnav import tap, PFX, SKIP_WN, K, to_map, go, local_page
URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/pets/'
res = {}
def check(name, ok, extra=''):
    res[name] = ok; print(('PASS ' if ok else 'FAIL ') + name, extra)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nth, bring):
    await tap(pg, '#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)
async def drag(pg, a, b, steps=14):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps); await pg.mouse.up(); await pg.wait_for_timeout(300)
async def center(loc):
    b = await loc.bounding_box(); return (b['x'] + b['width'] / 2, b['y'] + b['height'] / 2)
async def see_hearts(pg, timeout_ms=2500):
    # Hearts last ~1.8s. Poll instead of one fixed sleep, so a slow purr relay still counts.
    for _ in range(timeout_ms // 100):
        if await pg.locator('.pet.pet-cat .heart').count() > 0: return True
        await pg.wait_for_timeout(100)
    return False
async def adopt(pg, tab, swatch, name=None, typed=None):
    await tap(pg, '#btnPets'); await pg.wait_for_selector('.pets .petTabs')
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
            await c.add_init_script(SKIP_WN)  # skip the What's new popup
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
        # The bigger cat's box covers a character's feet. Pin her there and drag the character.
        cid = await P.evaluate("""() => {
          const s = __store.get();
          const c = s.characters.find(ch => ch.room === s.currentRoom) || s.characters[0];
          window.__pinCat = { x: c.x };
          return c.id;
        }""")
        await P.wait_for_timeout(300)
        hit = await P.evaluate("""() => {
          const ch = document.querySelector('#layer .char');
          const cat = document.querySelector('.pet.pet-cat');
          const cb = ch.getBoundingClientRect(), kb = cat.getBoundingClientRect();
          const ix = Math.min(cb.right, kb.right) - Math.max(cb.left, kb.left);
          const iy = Math.min(cb.bottom, kb.bottom) - Math.max(cb.top, kb.top);
          const x = cb.left + cb.width / 2, y = cb.top + cb.height / 2;
          const top = document.elementFromPoint(x, y);
          return { ix, iy, charZ: +ch.style.zIndex, catZ: +cat.style.zIndex, onChar: !!(top && top.closest('.char')) };
        }""")
        check('cat overlapping her feet stays under the character', hit['ix'] > 40 and hit['iy'] > 40 and hit['charZ'] > hit['catZ'] and hit['onChar'], json.dumps(hit))
        x0 = await P.evaluate(f"() => __store.get().characters.find(c => c.id === {json.dumps(cid)}).x")
        ch = P.locator('#layer .char').first
        c0 = await center(ch)
        await drag(P, c0, (c0[0] + 250, c0[1]))
        x1 = await P.evaluate(f"() => __store.get().characters.find(c => c.id === {json.dumps(cid)}).x")
        check('dragging the character works while the cat overlaps her', x1 - x0 > 120, f'{x0} -> {x1}')
        await P.evaluate('window.__pinCat = null')
        # cat behaves deterministically: two iPads with the same cat agree
        x1 = await P.evaluate("(() => { const c = __store.get().cat; return document.querySelector('.pet.pet-cat').style.left; })()")
        before = (await pets(P))['dogPos']['solo']
        ch = P.locator('#layer .char').first; c0 = await center(ch); await drag(P, c0, (c0[0] + 250, c0[1])); await P.wait_for_timeout(1500)
        after = (await pets(P))['dogPos']['solo']; check('solo: dog heels after her character', after['x'] - before['x'] > 150, f'{before} -> {after}')
        await P.click('.pet.pet-dog'); await P.wait_for_timeout(300)
        check('dog trick on tap (sit bubble)', 'sits' in (await P.inner_text('.pet.pet-dog .bubble')))
        await P.evaluate("document.querySelector('.pet.pet-cat').click()")
        check('cat purrs with hearts on tap', await see_hearts(P))
        await P.screenshot(path=SHOT + '02-solo-purr-and-trick.png')
        # ---------- dog kennel + cat tower ----------
        await P.evaluate("""() => __store.dispatch({type:'item/add', room:__store.get().currentRoom, item:{id:'solo-kennel', kind:'kennel', x:700, y:520, flip:false, z:1, scale:1}})""")
        await P.wait_for_timeout(200)
        await tap(P, '#btnPets'); await P.click('.petTabs [data-pt="dog"]'); await P.click('#kennelDog'); await P.wait_for_timeout(500)
        pp = await pets(P)
        kx = await P.evaluate("() => __store.get().characters.find(c => c.room === __store.get().currentRoom).x")
        check('kennel: dog stops following and rests in the kennel', pp.get('dogKennel') and pp['dogKennel']['item'] == 'solo-kennel' and 'solo' not in pp['dogs'] and pp.get('kennel') and pp['kennel']['name'] == 'Rocket', json.dumps(pp))
        await P.evaluate("""() => { const s = __store.get(); const c = s.characters.find(ch => ch.room === s.currentRoom); __store.dispatch({type:'char/move', id:c.id, room:s.currentRoom, x:c.x + 400, y:c.y}); }""")
        await P.wait_for_timeout(400)
        stayed = await P.evaluate("() => ({ x: __store.get().characters.find(c => c.room === __store.get().currentRoom).x, pets: __pets() })")
        check('kennel: dog stays put while her kid moves', stayed['x'] - kx > 80 and 'solo' not in stayed['pets']['dogs'] and abs(stayed['pets']['kennel']['x'] - 700) < 5, json.dumps(stayed))
        await P.screenshot(path=SHOT + '12-ipad-kennel-dog.png')
        await P.evaluate("""() => __store.dispatch({type:'item/move', room:__store.get().currentRoom, id:'solo-kennel', x:1400, y:520})""")
        await P.wait_for_timeout(400)
        moved = (await pets(P))['kennel']
        check('kennel: moving the kennel moves the dog', moved and abs(moved['x'] - 1400) < 5, json.dumps(moved))
        await P.evaluate("""() => __store.dispatch({type:'item/delete', room:__store.get().currentRoom, id:'solo-kennel'})""")
        await P.wait_for_timeout(500)
        back = await pets(P)
        check('kennel: deleting it brings the dog back', not back.get('dogKennel') and not back.get('kennel') and 'solo' in back['dogs'] and (await P.evaluate("__store.get().dog.name")) == 'Rocket', json.dumps(back))
        await P.evaluate("""() => __store.dispatch({type:'item/add', room:__store.get().currentRoom, item:{id:'solo-kennel', kind:'kennel', x:700, y:520, flip:false, z:1, scale:1}})""")
        await P.wait_for_timeout(250)
        await P.evaluate("""() => { const el = document.querySelector('.item[data-kind="kennel"]'); const r = el.getBoundingClientRect(); const x = r.left + 8, y = r.top + r.height * 0.55; const o = {clientX:x, clientY:y, pointerId:1, bubbles:true, pointerType:'mouse'}; el.dispatchEvent(new PointerEvent('pointerdown', o)); window.dispatchEvent(new PointerEvent('pointerup', o)); }""")
        await P.wait_for_timeout(400)
        check('kennel: tapping the kennel puts the dog in', (await pets(P)).get('kennel') and (await pets(P))['kennel']['name'] == 'Rocket')
        await P.evaluate("() => document.querySelector('.kennelBtn').click()"); await P.wait_for_timeout(400)
        check('kennel: Out lets the dog follow again', 'solo' in (await pets(P))['dogs'] and not (await pets(P)).get('kennel'))
        await P.evaluate("""() => __store.dispatch({type:'item/delete', room:__store.get().currentRoom, id:'solo-kennel'})""")
        await P.evaluate("""() => __store.dispatch({type:'item/add', room:__store.get().currentRoom, item:{id:'solo-tower', kind:'cat-tower', x:820, y:530, flip:false, z:4, scale:1}})""")
        await P.wait_for_timeout(200)
        perched = None
        for _ in range(35):
            perched = await pets(P)
            if perched.get('cat') and perched['cat'].get('perch') in (1, 2): break
            await P.wait_for_timeout(200)
        check('cat tower: the cat climbs on', perched.get('cat') and perched['cat'].get('perch') in (1, 2), json.dumps(perched.get('cat')))
        await P.screenshot(path=SHOT + '13-ipad-cat-tower.png')
        await P.evaluate("""() => { const el = document.querySelector('.item[data-kind="cat-tower"]'); const r = el.getBoundingClientRect(); const x = r.left + 8, y = r.top + r.height - 12; const o = {clientX:x, clientY:y, pointerId:1, bubbles:true, pointerType:'mouse'}; el.dispatchEvent(new PointerEvent('pointerdown', o)); window.dispatchEvent(new PointerEvent('pointerup', o)); }""")
        await P.wait_for_timeout(180)
        leapt = (await pets(P))['cat']
        check('cat tower: a tap sends her to the top', leapt and leapt.get('leap') and leapt.get('perch') == 2, json.dumps(leapt))
        await P.evaluate("""() => __store.dispatch({type:'item/move', room:__store.get().currentRoom, id:'solo-tower', x:1500, y:530})""")
        retarget = None
        for _ in range(30):
            await P.wait_for_timeout(200)
            retarget = (await pets(P)).get('cat')
            if retarget and retarget.get('perch') in (1, 2) and abs(retarget.get('x', 0) - 1500) < 40: break
        check('cat tower: moving it re-targets the cat', retarget and retarget.get('perch') in (1, 2) and abs(retarget.get('x', 0) - 1500) < 40, json.dumps(retarget))
        await P.evaluate("""() => { __store.dispatch({type:'cat/move', room:'bedroom', x:900}); __store.dispatch({type:'room/switch', room:'bedroom'}); }""")
        await P.wait_for_timeout(400)
        away = await pets(P)
        check('cat tower: a cat in another room is fine', away.get('cat') and away['cat'].get('name') == 'Mochi' and away['cat'].get('perch') == 0 and not away['cat'].get('leap'), json.dumps(away.get('cat')))
        await P.evaluate("""() => { __store.dispatch({type:'cat/move', room:'living', x:900}); __store.dispatch({type:'room/switch', room:'living'}); __store.dispatch({type:'item/delete', room:'living', id:'solo-tower'}); }""")
        await P.wait_for_timeout(300)
        # ---------- solo park ----------
        await go(P, 'park'); await P.wait_for_timeout(400)
        pp = await pets(P); check('solo park: walker + dog in the park', await P.locator('#pavatars .savatar').count() == 1 and 'solo' in pp['dogs'])
        await P.screenshot(path=SHOT + '03-solo-park-entrance.png')
        await P.evaluate("document.getElementById('parkScroll').scrollLeft = 200"); await P.wait_for_timeout(200)
        await P.click('[data-spot="0"]'); await P.wait_for_timeout(1200)
        check('solo park: swinging', await P.locator('#pavatars .savatar.pose-swing').count() == 1 and await P.locator('.swing.swinging').count() == 1)
        await P.screenshot(path=SHOT + '04-solo-swing.png')
        await go(P, 'home')
        check('solo: map -> home with the save intact', await P.evaluate("!document.body.classList.contains('view-park') && !document.body.classList.contains('view-street') && __store.get().cat.name === 'Mochi'"))
        await to_map(P)
        # ---------- neighborhood ----------
        await tap(P, '#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        await P.wait_for_selector('#newCode'); code = (await P.inner_text('#newCode')).strip(); await P.click('.hoodSheet [data-m="close"]')
        await join(P, code, 0, True); await join(K2, code, 1, False); await join(K3, code, 2, False)
        await P.wait_for_timeout(800)
        p_house = await P.evaluate('__hood().myHouseId()')
        check('hood: her cat came along with her house', (await P.evaluate(f"__hood().view('{p_house}').cat"))['name'] == 'Mochi')
        check('hood: her dog came along', (await K2.evaluate(f"__hood().players.get('{await P.evaluate('__hood().pid')}').dog"))['name'] == 'Rocket')
        await adopt(K2, 'dog', 1, name='Coco'); await K2.wait_for_timeout(500)
        check('hood: K2 adopts a poodle, synced to others', (await P.evaluate(f"__hood().players.get('{await K2.evaluate('__hood().pid')}').dog"))['name'] == 'Coco')
        check('map: everyone shows as a face on the map', await P.locator('#mapFaces .mapFace').count() == 3)
        await P.screenshot(path=SHOT + '05-street-with-dogs.png')
        # K2 cannot change someone else's cat (server validation)
        await K2.evaluate(f"__hood().dispatch('{p_house}', {{type:'cat/set', cat:{{name:'Stolen', coat:1, room:'living', x:900}}}})"); await K2.wait_for_timeout(700)
        check('server refuses cat changes by visitors', (await P.evaluate(f"__hood().view('{p_house}').cat"))['name'] == 'Mochi')
        # visitors see the cat in her house
        await go(P, f'house:{p_house}'); await go(K2, f'house:{p_house}'); await K2.wait_for_timeout(400)
        check('visitor sees her cat', (await pets(K2))['cat'] is not None and (await pets(K2))['cat']['name'] == 'Mochi')
        mood_p, mood_k = (await pets(P))['cat']['mood'], (await pets(K2))['cat']['mood']
        check('cat behaves the same on both iPads', mood_p == mood_k, f'{mood_p}/{mood_k}')
        await K2.evaluate("document.querySelector('.pet.pet-cat').click()")
        check('visitor pets the cat -> owner sees hearts', await see_hearts(P))
        await K2.screenshot(path=SHOT + '06-visitor-sees-cat.png')
        # owner calls the cat
        await tap(P, '#btnPets'); await P.click('#callCat'); await P.wait_for_timeout(500)
        check('"Here, kitty!" moves the cat (synced)', (await K2.evaluate(f"__hood().view('{p_house}').cat.x")) == (await P.evaluate('__store.get().cat.x')))
        # ---------- park ----------
        old = await K3.evaluate("""(async () => { const cfg = JSON.parse(localStorage.getItem('""" + K('cozy-hood') + """'));
          const ws = new WebSocket(cfg.url.replace(/^http/,'ws') + '/ws/' + (cfg.id ?? cfg.code)); window.__oldMsgs = [];
          await new Promise(r => ws.onopen = r); ws.onmessage = e => window.__oldMsgs.push(JSON.parse(e.data));
          ws.send(JSON.stringify({t:'join', nickname:'Lucky Lamb', look:{}})); window.__oldWs = ws; return true; })()""")
        await go(P, 'park'); await go(K2, 'park'); await go(K3, 'park'); await P.wait_for_timeout(800)
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
        await P.click('#btnMap'); await P.wait_for_timeout(600)
        check('leave park -> back on the map', await P.evaluate("document.body.classList.contains('view-street') && !document.body.classList.contains('view-park')"))
        await K2.wait_for_timeout(300)
        check('others see her leave the park', await K2.locator('#pavatars .savatar').count() == 2)
        for k, v in errs.items():
            v = [e for e in v if '429' not in e]
            check(f'no JS errors ({k})', not v, '; '.join(v[:3]))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
