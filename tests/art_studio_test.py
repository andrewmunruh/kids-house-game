# Art Studio slice 1: paint, hang, zoom, persist; all 7 sizes; street sync; un-updated 10ef736 client keeps paintings.
# usage: python tests/art_studio_test.py  (env WEB=http://localhost:5851, OLDWEB=http://localhost:5852, HOOD=http://localhost:5850)
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, tap
WEB = os.environ.get('WEB', 'http://localhost:5851').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', '').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5850').rstrip('/')
assert 'workers.dev' not in HOOD, 'local worker only'
SHOT = os.environ.get('ART_SHOTS', 'shots/art/'); os.makedirs(SHOT, exist_ok=True)
SIZES = [(820, 1180), (1024, 768), (1180, 820), (390, 844), (844, 390), (375, 667), (430, 932)]
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)
PAINTINGS = "() => Object.values(__store.get().rooms).flatMap(r => (r && r.items || []).filter(i => i.art)).map(i => ({id: i.id, art: i.art, frame: i.frame||0}))"

async def paint(pg, frame=2):
    await tap(pg, '#btnStudio'); await pg.wait_for_selector('.studio canvas')
    box = await pg.locator('.stuPaper canvas').bounding_box()
    X = lambda f: box['x'] + box['width'] * f; Y = lambda f: box['y'] + box['height'] * f
    await pg.locator('.stuColor').nth(4).click()
    await pg.mouse.move(X(.1), Y(.2)); await pg.mouse.down()
    for i in range(20): await pg.mouse.move(X(.1 + i * .04), Y(.2 + (i % 5) * .05))
    await pg.mouse.up()
    await pg.locator('.stuColor').nth(9).click(); await pg.locator('.stuTool[data-tool="fill"]').click()
    await pg.mouse.click(X(.5), Y(.85))
    await pg.locator('.stuTool[data-tool="stamp"]').click(); await pg.locator('.stuStamp').nth(0).click()
    await pg.mouse.click(X(.75), Y(.4))
    await pg.locator('.stuFrame').nth(frame).click()

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk(w, h, web=WEB, hood=False):
            c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/' + (f'?hood={HOOD}' if hood else '')); await pg.wait_for_selector('#stage .char'); await pg.wait_for_timeout(500)
            return pg, errs
        # 1. solo: paint, hang, persist, zoom
        P, eP = await mk(820, 1180)
        await paint(P)
        await P.screenshot(path=SHOT + 'studio_820x1180.png')
        await P.locator('.stuUndo').click(); await P.locator('.stuTool[data-tool="stamp"]').click()
        box = await P.locator('.stuPaper canvas').bounding_box(); await P.mouse.click(box['x'] + box['width'] * .75, box['y'] + box['height'] * .4)
        await P.locator('.stuHang').click(); await P.wait_for_timeout(500)
        ps = await P.evaluate(PAINTINGS)
        check('solo: painting hung as framed picture', len(ps) == 1 and ps[0]['frame'] == 2, ps)
        check('studio closed after hanging', await P.locator('.studio').count() == 0)
        await P.evaluate("() => { const b = document.querySelector('#btnDone, .doneBtn'); b && b.click(); }")
        await P.wait_for_timeout(600); await P.reload(); await P.wait_for_selector('#stage .char'); await P.wait_for_timeout(800)
        ps2 = await P.evaluate(PAINTINGS)
        check('solo: painting survives reload', ps2 == ps, ps2)
        img = await P.evaluate("id => { const e = document.querySelector(`.item[data-id=\"${id}\"] image`); return e ? (e.getAttribute('href') || '').slice(0, 22) : null }", ps[0]['id'])
        check('solo: hung painting shows the bitmap', img and img.startswith('data:image/png'), img)
        await P.evaluate("id => { const it = __store.get().rooms[__store.get().currentRoom].items.find(i => i.id === id); __cam.set(it.x - 450); }", ps[0]['id']); await P.wait_for_timeout(300)
        el = P.locator(f'.item[data-id="{ps[0]["id"]}"]')
        await P.screenshot(path=SHOT + 'hung_820x1180.png')
        # play-mode tap zooms
        if not await P.evaluate("document.body.classList.contains('mode-play')"): await P.click('#modePlay'); await P.wait_for_selector('body.mode-play')
        await P.wait_for_timeout(300)
        bb = await el.bounding_box()
        await P.touchscreen.tap(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await P.wait_for_timeout(400)
        z = await P.locator('.paintZoom').count()
        if z: await P.screenshot(path=SHOT + 'zoom_820x1180.png')
        check('tap a hung painting zooms it big', z == 1)
        if z: await P.locator('.paintZoom').click(); await P.wait_for_timeout(300)
        check('solo: no page errors', not eP, eP[:3])
        # 2. every test size: studio fits, every control on screen
        for (w, h) in SIZES:
            pg, e = await mk(w, h)
            await tap(pg, '#btnStudio'); await pg.wait_for_selector('.studio canvas'); await pg.wait_for_timeout(200)
            fit = await pg.evaluate("""() => { const W = innerWidth, H = innerHeight; const bad = [];
              for (const el of document.querySelectorAll('.studio canvas, .stuTool, .stuSize, .stuColor, .stuFrame, .stuHang, .stuX, .stuUndo, .stuClear')) {
                const r = el.getBoundingClientRect(); if (r.width < 18 || r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1 || !el.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2))) bad.push(el.className + ' ' + Math.round(r.left) + ',' + Math.round(r.top) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }
              const c = document.querySelector('.studio canvas').getBoundingClientRect();
              return {bad, canvas: [Math.round(c.width), Math.round(c.height)], ta: getComputedStyle(document.querySelector('.studio canvas')).touchAction}; }""")
            check(f'studio fits {w}x{h}', not fit['bad'] and fit['canvas'][0] >= 200 and fit['ta'] == 'none', fit)
            await pg.locator('.stuX').click(); await pg.wait_for_timeout(200)
            check(f'studio closes {w}x{h}', await pg.locator('.studio').count() == 0)
            if (w, h) in [(390, 844), (844, 390)]:
                await paint(pg, 3); await pg.screenshot(path=SHOT + f'studio_{w}x{h}.png')
                await pg.locator('.stuHang').click(); await pg.wait_for_timeout(500)
                pid = (await pg.evaluate(PAINTINGS))[0]['id']
                await pg.locator(f'.item[data-id="{pid}"]').scroll_into_view_if_needed(); await pg.screenshot(path=SHOT + f'hung_{w}x{h}.png')
            check(f'no page errors {w}x{h}', not e, e[:3])
            await pg.context.close()
        # 3. street: A paints at home, B (new) sees it, old 10ef736 client keeps it
        A, eA = await mk(820, 1180, hood=True); B, eB = await mk(820, 1180, hood=True)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        async def join(pg, nick_i, bring):
            await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
            await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
            await pg.click(f'.nicks button[data-nick="{nick_i}"]')
            await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
            await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)
        await join(A, 0, False); await join(B, 1, False)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(800)
        hid = await A.evaluate("__hood().myHouseId()")
        await paint(A, 1); await A.locator('.stuHang').click(); await A.wait_for_timeout(900)
        pa = await A.evaluate(PAINTINGS); check('street: A hung a painting', len(pa) == 1, pa)
        await B.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await B.wait_for_timeout(1500)
        src = await B.evaluate("id => { const e = document.querySelector(`.item[data-id=\"${id}\"] image`); return e ? (e.getAttribute('href') || '').slice(0, 22) : null }", pa[0]['id'])
        check('street: B sees the painting bitmap', src and src.startswith('data:image/png'), src)
        if OLDWEB:
            O, eO = await mk(820, 1180, web=OLDWEB, hood=True)
            await join(O, 2, False)
            await O.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await O.wait_for_timeout(1200)
            # A opens the door so the old client can move things (owner moves it while old client watches is the real-world case)
            await A.evaluate("id => { const s = __store; const r = s.get().currentRoom; const it = s.get().rooms[r].items.find(i => i.id === id); s.dispatch({type:'item/move', room: r, id, x: it.x + 40, y: it.y}); }", pa[0]['id'])
            await O.wait_for_timeout(800)
            oi = await O.evaluate("id => { const it = Object.values(__store.get().rooms).flatMap(r => r?.items||[]).find(i => i.id === id); return it ? {kind: it.kind, art: it.art, frame: it.frame} : null }", pa[0]['id'])
            check('old client: painting arrives as a picture with art kept', oi and oi['kind'] == 'picture' and oi['art'] == pa[0]['art'], oi)
            shown = await O.evaluate("id => !!document.querySelector(`.item[data-id=\"${id}\"]`)", pa[0]['id'])
            check('old client: shows a placeholder picture', shown)
            check('old client: no page errors', not eO, eO[:3])
            await O.close(); await A.wait_for_timeout(800)
            # old client gone: A reloads, painting and its art still there
            await A.reload(); await A.wait_for_timeout(2500)
            if not await A.evaluate("document.body.classList.contains('view-house') || __ui().view === 'house'"):
                await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine')?.click()"); await A.wait_for_timeout(1200)
            pa2 = await A.evaluate(PAINTINGS)
            check('after old client: save keeps art id', [x['art'] for x in pa2] == [pa[0]['art']], pa2)
        check('street: no page errors', not eA and not eB, (eA + eB)[:3])
        await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(bad)}/{len(res)} passed' + (' FAILED: ' + ', '.join(bad) if bad else '')); sys.exit(1 if bad else 0)
asyncio.run(main())
