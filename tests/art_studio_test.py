# Art Studio slice 1: paint, hang, zoom, persist; all 7 sizes; street sync; un-updated 10ef736 client keeps paintings.
# usage: python tests/art_studio_test.py  (env WEB=http://localhost:5851, OLDWEB=http://localhost:5852, HOOD=http://localhost:5850)
import re, asyncio, os, sys
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

def pdata(c):
    # a valid painting blob: the whole paper one palette color (same run-length codec as src/shared/paint.ts)
    import base64
    n, out = 256 * 192, []
    while n > 0:
        k = min(n, 2056)
        if k <= 8: out.append(((k - 1) << 4) | c)
        else: r = k - 9; out += [0x80 | ((r >> 8) << 4) | c, r & 255]
        n -= k
    return 'P1' + base64.b64encode(bytes(out)).decode()
TOASTS = "() => [...document.querySelectorAll('.toast')].map(t => t.textContent)"
ARROWS = """id => { const e = document.querySelector(`.item[data-id="${id}"]`); if (!e) return 'missing'; const a = e.getBoundingClientRect();
  return ['nudgeL', 'nudgeR'].filter(n => { const el = document.getElementById(n); if (!el || el.classList.contains('off')) return false; const b = el.getBoundingClientRect();
    return b.width > 0 && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top; }); }"""
UX = """() => { const r = e => e.getBoundingClientRect();
  const tools = [...document.querySelectorAll('.stuTool')].map(e => Math.round(r(e).height));
  const labels = [...document.querySelectorAll('.stuTool span')].every(s => r(s).width > 8 && s.textContent.trim().length > 2);
  const c = r(document.querySelector('.studio canvas')), t = r(document.querySelector('.stuTool'));
  return {tools: Math.min(...tools), labels, band: Math.round(t.top - c.bottom), portrait: innerHeight > innerWidth}; }"""
STAMPFIT = """() => { const W = innerWidth, H = innerHeight, bad = [], rows = {}; let min = 999;
  for (const el of document.querySelectorAll('.stuStamp')) { const r = el.getBoundingClientRect(); min = Math.min(min, r.width, r.height);
    rows[Math.round(r.top)] = (rows[Math.round(r.top)] || 0) + 1;
    if (r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1 || !el.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2))) bad.push(el.getAttribute('aria-label')); }
  return {min: Math.round(min), rows: Object.values(rows), bad}; }"""

async def paint(pg, frame=2, fab=False):
    if fab: await pg.locator('#artFab').click()
    else: await tap(pg, '#btnStudio')
    await pg.wait_for_selector('.studio canvas')
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
            await c.add_init_script(SKIP_WN); await c.route(re.compile(r'workers\.dev|github\.io'), lambda r: r.abort()); pg = await c.new_page()
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
        check('hang: clear of the room arrows 820x1180', await P.evaluate(ARROWS, ps[0]['id']) == [], await P.evaluate(ARROWS, ps[0]['id']))
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
        if not z:  # camera may still be easing after the mode switch: settle, re-measure, tap again
            await P.wait_for_timeout(800); bb = await el.bounding_box()
            await P.touchscreen.tap(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await P.wait_for_timeout(400)
            z = await P.locator('.paintZoom').count()
        if z:
            await P.screenshot(path=SHOT + 'zoom_820x1180.png')
            check('zoom: no hanger wire over the room', await P.evaluate("document.querySelector('.paintZoom svg').getAttribute('viewBox')") == '4 16 92 74')
        hit = await P.evaluate("([x, y]) => { const e = document.elementFromPoint(x, y); return e ? (e.closest('.item')?.getAttribute('data-id') || e.className?.baseVal || e.className || e.tagName) : null }", [bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2])
        check('tap a hung painting zooms it big', z == 1, [bb, hit, await P.evaluate("document.body.className")])
        if z: await P.locator('.paintZoom').click(); await P.wait_for_timeout(300)
        check('solo: no page errors', not eP, eP[:3])
        # 1b. every tool, read back from the paper's pixels
        T, eT = await mk(820, 1180)
        await tap(T, '#btnStudio'); await T.wait_for_selector('.studio canvas')
        PX = """([fx, fy]) => { const c = document.querySelector('.stuPaper canvas'); const d = c.getContext('2d').getImageData(Math.floor(fx * c.width), Math.floor(fy * c.height), 1, 1).data; return [d[0], d[1], d[2]]; }"""
        SUM = "() => { const c = document.querySelector('.stuPaper canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let h = 0; for (let i = 0; i < d.length; i += 4) h = (h * 31 + d[i] + d[i+1] * 7 + d[i+2] * 13) | 0; return h; }"
        INK = "() => { const c = document.querySelector('.stuPaper canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i+1] + d[i+2] < 760) n++; return n; }"
        STROKE = """([type, fy, id]) => { const c = document.querySelector('.stuPaper canvas'); const r = c.getBoundingClientRect();
          const ev = (k, fx) => c.dispatchEvent(new PointerEvent(k, {pointerId: id, pointerType: type, isPrimary: true, bubbles: true, cancelable: true, clientX: r.left + r.width * fx, clientY: r.top + r.height * fy, pressure: .5}));
          ev('pointerdown', .1); for (let i = 1; i <= 10; i++) ev('pointermove', .1 + i * .03); ev('pointerup', .4); }"""
        W = [255, 255, 255]
        await T.locator('.stuColor').nth(2).click(); await T.locator('.stuSize').nth(0).click()
        await T.evaluate(STROKE, ['pen', .2, 11])
        check('tools: Apple Pencil (pen) stroke draws', await T.evaluate(PX, [.25, .2]) != W)
        small = await T.evaluate(INK)
        await T.evaluate(STROKE, ['touch', .4, 12])
        check('tools: finger (touch) stroke draws', await T.evaluate(PX, [.25, .4]) != W)
        await T.locator('.stuSize').nth(3).click(); await T.evaluate(STROKE, ['touch', .6, 13])
        big = await T.evaluate(INK) - 2 * small
        check('tools: brush sizes differ (big stroke has much more ink)', big > small * 3, [small, big])
        check('tools: 3-4 brush sizes, 12-16 colors', 3 <= await T.locator('.stuSize').count() <= 4 and 12 <= await T.locator('.stuColor').count() <= 16)
        await T.locator('.stuTool[data-tool="eraser"]').click(); await T.evaluate(STROKE, ['pen', .6, 14])
        check('tools: eraser clears to paper', await T.evaluate(PX, [.25, .6]) == W)
        await T.locator('.stuUndo').click()
        check('tools: undo brings the stroke back', await T.evaluate(PX, [.25, .6]) != W)
        await T.locator('.stuColor').nth(6).click(); await T.locator('.stuTool[data-tool="fill"]').click()
        pressed = await T.evaluate("() => [...document.querySelectorAll('.stuTool[data-tool], .stuColor, .stuSize')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.getAttribute('aria-label'))")
        check('tools: one clear selected tool, color and size', sorted(pressed) == ['Fill', 'Green', 'Size 4'], pressed)
        icons = await T.evaluate("() => { const q = t => document.querySelector(`.stuTool[data-tool=${t}]`); return [q('fill').textContent.trim(), q('eraser').textContent.trim(), q('fill').querySelector('svg').innerHTML !== q('eraser').querySelector('svg').innerHTML]; }")
        check('tools: fill and eraser are labeled and look different', icons == ['Fill', 'Eraser', True], icons)
        box = await T.locator('.stuPaper canvas').bounding_box(); await T.mouse.click(box['x'] + box['width'] * .9, box['y'] + box['height'] * .95)
        filled = await T.evaluate(PX, [.95, .05])
        check('tools: fill floods the paper', filled != W and filled == await T.evaluate(PX, [.05, .95]), filled)
        await T.locator('.stuTool[data-tool="stamp"]').click(); await T.locator('.stuStamp').nth(1).click()
        before = await T.evaluate(SUM); await T.mouse.click(box['x'] + box['width'] * .8, box['y'] + box['height'] * .8); await T.wait_for_timeout(400)
        check('tools: stamps come from the game art', await T.locator('.stuStamp').count() >= 6 and await T.evaluate(SUM) != before)
        await T.wait_for_timeout(200)
        check('frames: each frame choice shows her painting', await T.locator('.stuFrame image').count() == 4)
        ink0 = await T.evaluate(INK)
        await T.locator('.stuClear').click()
        check('clear: asks first', await T.locator('.stuAsk:not(.hidden)').count() == 1 and await T.evaluate(INK) == ink0)
        await T.locator('.stuAskNo').click()
        check('clear: Keep it keeps the picture', await T.evaluate(INK) == ink0 and await T.locator('.stuAsk:not(.hidden)').count() == 0)
        await T.locator('.stuClear').click(); await T.locator('.stuAskYes').click()
        check('tools: clear makes white paper', await T.evaluate(INK) == 0)
        await T.locator('.stuUndo').click()
        check('tools: undo after clear restores', await T.evaluate(INK) > 0)
        check('tools: no page errors', not eT, eT[:3])
        await T.context.close()
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
            ux = await pg.evaluate(UX)
            check(f'studio: tools >= 56px, labeled, no empty band {w}x{h}', ux['tools'] >= 56 and ux['labels'] and (not ux['portrait'] or 0 <= ux['band'] <= 40), ux)
            await pg.locator('.stuTool[data-tool="stamp"]').click(); await pg.wait_for_timeout(150)
            sf = await pg.evaluate(STAMPFIT)
            check(f'studio: stamps in a clean grid {w}x{h}', not sf['bad'] and sf['min'] >= 36 and len(set(sf['rows'])) == 1, sf)
            if (w, h) == (844, 390): await pg.screenshot(path=SHOT + f'stamps_{w}x{h}.png')
            await pg.locator('.stuX').click(); await pg.wait_for_timeout(200)
            check(f'studio closes {w}x{h}', await pg.locator('.studio').count() == 0)
            if (w, h) in [(390, 844), (844, 390)]:
                await paint(pg, 3); await pg.screenshot(path=SHOT + f'studio_{w}x{h}.png')
                await pg.locator('.stuHang').click(); await pg.wait_for_timeout(500)
                pid = (await pg.evaluate(PAINTINGS))[0]['id']
                check(f'hang: clear of the room arrows {w}x{h}', await pg.evaluate(ARROWS, pid) == [], await pg.evaluate(ARROWS, pid))
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
        HREF = "id => { const e = document.querySelector(`.item[data-id=\"${id}\"] image`); return e ? e.getAttribute('href') : null }"
        ha = await A.evaluate(HREF, pa[0]['id']); hb = await B.evaluate(HREF, pa[0]['id'])
        check('street: A and B draw identical pixels', ha and ha == hb, (len(ha or ''), len(hb or '')))
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
        await street_more(mk, join, A, B, hid, eA, eB)
        await wall_piece(mk)
        check('street: no page errors', not eA and not eB, (eA + eB)[:3])
        await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(bad)}/{len(res)} passed' + (' FAILED: ' + ', '.join(bad) if bad else '')); sys.exit(1 if bad else 0)
ITEM = "id => { const it = Object.values(__store.get().rooms).flatMap(r => r?.items||[]).find(i => i.id === id); return it ? {x: Math.round(it.x), art: it.art || null, kind: it.kind} : null }"
GO_HOUSE = "h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()"
SAVE12 = """([data, n, hang]) => { const hid = __hood().myHouseId(), s = __store.get(), room = s.currentRoom, ids = [];
  for (let i = 0; i < n; i++) { const id = 'a' + Date.now().toString(36) + 'f' + i.toString(36).padStart(2, '0'); ids.push(id); __hood().saveArt(hid, id, data);
    if (hang) __store.dispatch({type: 'item/add', room, item: {id: 'picture-f' + i + Date.now().toString(36), kind: 'picture', x: 200 + i * 90, y: 200, flip: false, z: 0, scale: .6, art: id}}); }
  return ids; }"""

async def hang_ui(pg, frame=0):
    await paint(pg, frame); await pg.locator('.stuHang').click(); await pg.wait_for_timeout(1500)

ITEMS = "id => { const it = Object.values(__store.get().rooms).flatMap(r => r?.items||[]).find(i => i.id === id); return it ? {x: Math.round(it.x), y: Math.round(it.y), size: it.size || 1, art: it.art || null} : null }"
RECT = "id => { const e = document.querySelector(`.item[data-id=\"${id}\"]`); if (!e) return null; const b = e.getBoundingClientRect(); return {w: b.width, h: b.height, l: b.left, t: b.top, vw: innerWidth}; }"
PEN = """([x0, y0, x1, y1]) => { const g = document.getElementById('artGrip'); const o = {pointerType: 'pen', pointerId: 7, isPrimary: true, bubbles: true, pressure: .5};
  g.dispatchEvent(new PointerEvent('pointerdown', {...o, clientX: x0, clientY: y0}));
  for (let i = 1; i <= 10; i++) window.dispatchEvent(new PointerEvent('pointermove', {...o, clientX: x0 + (x1 - x0) * i / 10, clientY: y0 + (y1 - y0) * i / 10}));
  window.dispatchEvent(new PointerEvent('pointerup', {...o, clientX: x1, clientY: y1})); }"""

async def wall_piece(mk):
    # 8. A hung painting is a normal wall piece: Paint button in the room, move, corner resize (finger + Pencil), persist, 3-client + old-client sync, delete.
    A, eA = await mk(820, 1180, hood=True)
    code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
    async def join2(pg, nick_i):
        await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
        await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
        await pg.click(f'.nicks button[data-nick="{nick_i}"]'); await pg.click('[data-m="fresh"]')
        await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)
    await join2(A, 0)
    await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(1000)
    hid = await A.evaluate("__hood().myHouseId()")
    B, eB = await mk(844, 390, hood=True); C, eC = await mk(390, 844, hood=True)
    await join2(B, 1); await join2(C, 2)
    O = eO = None
    if OLDWEB: O, eO = await mk(1180, 820, web=OLDWEB, hood=True); await join2(O, 3)
    for pg in [x for x in (B, C, O) if x]: await pg.evaluate(GO_HOUSE, hid); await pg.wait_for_timeout(1000)
    fab = await A.locator('#artFab').bounding_box()
    check('wall: a Paint button is in the room (not only the menu), big enough', fab and fab['width'] >= 56 and fab['height'] >= 56, fab)
    await paint(A, 1, fab=True); await A.locator('.stuHang').click(); await A.wait_for_timeout(1500)
    ps = await A.evaluate(PAINTINGS); check('wall: Paint button opens the studio and the painting hangs', len(ps) == 1, ps)
    if not ps: return
    pid = ps[0]['id']
    check('wall: new painting lands clear of the room arrows', await A.evaluate(ARROWS, pid) == [], await A.evaluate(ARROWS, pid))
    if await A.evaluate("document.body.classList.contains('mode-play')"): await A.click('#modeDecorate'); await A.wait_for_timeout(300)
    async def select(pg):
        if not await pg.locator('#artGrip').is_visible():
            bb = await pg.locator(f'.item[data-id="{pid}"]').bounding_box(); await pg.mouse.click(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await pg.wait_for_timeout(300)
    await select(A)
    g = await A.locator('#artGrip').bounding_box()
    check('wall: selected painting shows a corner resize handle >= 44px', g and g['width'] >= 44 and g['height'] >= 44, g)
    r0 = await A.evaluate(RECT, pid)
    # finger/mouse: drag the handle out
    gx, gy = g['x'] + g['width'] / 2, g['y'] + g['height'] / 2
    await A.mouse.move(gx, gy); await A.mouse.down()
    for i in range(1, 13): await A.mouse.move(gx + i * 9, gy + i * 7); await A.wait_for_timeout(16)
    await A.mouse.up(); await A.wait_for_timeout(900)
    i1 = await A.evaluate(ITEMS, pid); r1 = await A.evaluate(RECT, pid)
    check('wall: dragging the handle out makes it bigger', i1['size'] > 1 and r1['w'] > r0['w'] * 1.15, [i1, r0, r1])
    check('wall: resize keeps the shape', abs(r1['w'] / r1['h'] - r0['w'] / r0['h']) < .03, [r0, r1])
    await A.screenshot(path=SHOT + 'wallpiece_820x1180.png')
    for pg, nm in [(B, 'iPhone landscape'), (C, 'iPhone portrait')]:
        await pg.wait_for_timeout(300); it = await pg.evaluate(ITEMS, pid)
        check(f'wall: {nm} client sees the new size', it and it['size'] == i1['size'] and it['x'] == i1['x'], [it, i1])
    # Apple Pencil (pointerType pen) at 844x390: drag the handle in
    await A.set_viewport_size({'width': 844, 'height': 390}); await A.wait_for_timeout(900); await select(A)
    g = await A.locator('#artGrip').bounding_box(); gx, gy = g['x'] + g['width'] / 2, g['y'] + g['height'] / 2
    await A.evaluate(PEN, [gx, gy, gx - 70, gy - 50]); await A.wait_for_timeout(800)
    i2 = await A.evaluate(ITEMS, pid)
    check('wall: Pencil drag on the handle makes it smaller', i2['size'] < i1['size'], [i1, i2])
    check('wall: size stays within the kid steps (0.75-1.5)', .75 <= i2['size'] <= 1.5, i2)
    await A.screenshot(path=SHOT + 'wallpiece_844x390.png')
    # move: drag the painting itself (portrait phone), it stays on the wall and off the arrows
    await A.set_viewport_size({'width': 390, 'height': 844}); await A.wait_for_timeout(900)
    if await A.locator('#phoneOk').is_visible(): await A.click('#phoneOk'); await A.wait_for_timeout(300)
    bb = await A.locator(f'.item[data-id="{pid}"]').bounding_box(); cx, cy = bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2
    await A.mouse.move(cx, cy); await A.mouse.down()
    for i in range(1, 16): await A.mouse.move(cx - i * 30, cy + i * 30); await A.wait_for_timeout(16)  # left (it already sits by the right arrow, which would clamp it back) and down onto the floor
    await A.mouse.up(); await A.wait_for_timeout(900)
    i3 = await A.evaluate(ITEMS, pid)
    check('wall: dragging moves it', i3['x'] != i2['x'], [i2, i3])
    check('wall: dropped low, it snaps back onto the wall', i3['y'] <= 375, i3)
    check('wall: dropped by the arrow, it moves out from under it', await A.evaluate(ARROWS, pid) == [], await A.evaluate(ARROWS, pid))
    await select(A); await A.screenshot(path=SHOT + 'wallpiece_390x844.png')
    cov = await A.evaluate("""id => { const a = document.querySelector(`.item[data-id="${id}"]`).getBoundingClientRect(), b = document.getElementById('toolbar').getBoundingClientRect();
      return Math.round(Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) / (a.width * a.height) * 100); }""", pid)
    check('wall 390x844: the toolbar does not cover the selected painting', cov <= 10, f'{cov}% covered')
    await A.set_viewport_size({'width': 1180, 'height': 820}); await A.wait_for_timeout(900); await select(A)
    await A.screenshot(path=SHOT + 'wallpiece_1180x820.png')
    await A.wait_for_timeout(600)
    for pg, nm in [(B, 'second'), (C, 'third')]:
        it = await pg.evaluate(ITEMS, pid)
        check(f'wall: {nm} client has the same spot and size', it == i3, [it, i3])
    if O:
        it = await O.evaluate(ITEMS, pid); rr = await O.evaluate(RECT, pid)
        check('wall: old 10ef736 client follows the move and keeps the art id', it and it['x'] == i3['x'] and it['art'] == ps[0]['art'], [it, i3])
        check('wall: old client draws the plain picture at a sane size', rr and 30 < rr['w'] < rr['vw'] * .6 and .9 < rr['w'] / rr['h'] < 2, rr)
    # persistence: reload, same spot and size
    await A.reload(); await A.wait_for_timeout(2500)
    if not await A.evaluate("__ui().view === 'house'"): await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine')?.click()"); await A.wait_for_timeout(1200)
    i4 = await A.evaluate(ITEMS, pid)
    check('wall: spot and size survive a reload', i4 == i3, [i4, i3])
    # delete with the toolbar: gone everywhere
    if await A.evaluate("document.body.classList.contains('mode-play')"): await A.click('#modeDecorate'); await A.wait_for_timeout(300)
    for _ in range(3):
        if await A.locator('#toolbar button[data-a="delete"]').is_visible(): break
        bb = await A.locator(f'.item[data-id="{pid}"]').bounding_box(); await A.mouse.click(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await A.wait_for_timeout(400)
    await A.locator('#toolbar button[data-a="delete"]').click(); await A.wait_for_timeout(1200)
    gone = [await pg.evaluate(ITEMS, pid) for pg in (A, B, C) + ((O,) if O else ())]
    check('wall: put away on every client (incl. old)', all(x is None for x in gone), gone)
    check('wall: handle hides with nothing selected', await A.locator('#artGrip').is_hidden())
    check('wall: no page errors', not eA and not eB and not eC and not eO, (eA + eB + eC + (eO or []))[:3])
    for pg in [x for x in (A, B, C, O) if x]: await pg.context.close()
    # solo (no street): size and spot persist across a reload too
    S, eS = await mk(1180, 820)
    await paint(S, 0, fab=True); await S.locator('.stuHang').click(); await S.wait_for_timeout(900)
    sid = (await S.evaluate(PAINTINGS))[0]['id']
    if await S.evaluate("document.body.classList.contains('mode-play')"): await S.click('#modeDecorate'); await S.wait_for_timeout(300)
    if await S.locator('#artGrip').is_hidden():
        bb = await S.locator(f'.item[data-id="{sid}"]').bounding_box(); await S.mouse.click(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await S.wait_for_timeout(300)
    g = await S.locator('#artGrip').bounding_box(); gx, gy = g['x'] + g['width'] / 2, g['y'] + g['height'] / 2
    await S.mouse.move(gx, gy); await S.mouse.down()
    for i in range(1, 13): await S.mouse.move(gx + i * 8, gy + i * 6)
    await S.mouse.up(); await S.wait_for_timeout(800)
    s1 = await S.evaluate(ITEMS, sid); await S.reload(); await S.wait_for_selector('#stage .char'); await S.wait_for_timeout(800)
    s2 = await S.evaluate(ITEMS, sid)
    check('wall solo: resized painting keeps size and spot after reload', s1['size'] > 1 and s2 == s1, [s1, s2])
    check('wall solo: no page errors', not eS, eS[:3]); await S.context.close()

async def street_more(mk, join, A, B, hid, eA, eB):
    # 4. Decorate tools on a painting, iPad then phone: move it (re-hang in a new spot), put it away, hang a new one.
    #    B (second client, in A's house) and an un-updated 10ef736 client both follow.
    O2 = None
    if OLDWEB:
        O2, eO2 = await mk(820, 1180, web=OLDWEB, hood=True); await join(O2, 3, False)
        await O2.evaluate(GO_HOUSE, hid); await O2.wait_for_timeout(1200)
    for (vw, vh), how in [((820, 1180), 'toolbar'), ((844, 390), 'bin')]:
        tag = f'{vw}x{vh}'
        await A.set_viewport_size({'width': vw, 'height': vh}); await A.wait_for_timeout(800)
        if await A.evaluate("document.body.classList.contains('mode-play')"): await A.click('#modeDecorate'); await A.wait_for_timeout(300)
        pid = (await A.evaluate(PAINTINGS))[-1]['id']
        await A.evaluate("id => { const it = Object.values(__store.get().rooms).flatMap(r => r?.items||[]).find(i => i.id === id); __cam.set(it.x - 300); }", pid); await A.wait_for_timeout(500)
        x0 = (await A.evaluate(ITEM, pid))['x']
        bb = await A.locator(f'.item[data-id="{pid}"]').bounding_box()
        cx, cy = bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2
        await A.mouse.move(cx, cy); await A.mouse.down()
        for i in range(1, 11): await A.mouse.move(cx - i * 8, cy + i * 2); await A.wait_for_timeout(16)  # toward the middle (settling keeps it off the arrows)
        await A.mouse.up(); await A.wait_for_timeout(900)
        x1 = (await A.evaluate(ITEM, pid))['x']
        check(f'decorate {tag}: drag re-hangs the painting in a new spot', x1 != x0, [x0, x1])
        ib = await B.evaluate(ITEM, pid)
        check(f'decorate {tag}: second client sees the move, art kept', ib and ib['x'] == x1 and ib['art'], ib)
        if O2:
            io = await O2.evaluate(ITEM, pid)
            check(f'decorate {tag}: old client sees the move, art kept', io and io['x'] == x1 and io['art'], io)
        await A.screenshot(path=SHOT + f'decorate_{tag}.png')
        if how == 'toolbar':
            if not await A.locator('#toolbar button[data-a="delete"]').is_visible():
                bb = await A.locator(f'.item[data-id="{pid}"]').bounding_box(); await A.mouse.click(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await A.wait_for_timeout(300)
            await A.locator('#toolbar button[data-a="delete"]').click()
        else:
            bb = await A.locator(f'.item[data-id="{pid}"]').bounding_box(); cx, cy = bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2
            await A.mouse.move(cx, cy); await A.mouse.down(); await A.mouse.move(cx + 10, cy + 10); await A.wait_for_timeout(100)
            bin_ = await A.locator('#bin').bounding_box()
            for i in range(1, 11): await A.mouse.move(cx + (bin_['x'] + bin_['width'] / 2 - cx) * i / 10, cy + (bin_['y'] + bin_['height'] / 2 - cy) * i / 10); await A.wait_for_timeout(16)
            await A.mouse.up()
        await A.wait_for_timeout(1000)
        check(f'decorate {tag}: put away by {how}', await A.evaluate(ITEM, pid) is None)
        check(f'decorate {tag}: second client sees it put away', await B.evaluate(ITEM, pid) is None)
        if O2: check(f'decorate {tag}: old client sees it put away', await O2.evaluate(ITEM, pid) is None)
        before = {p['id'] for p in await A.evaluate(PAINTINGS)}
        await hang_ui(A, 3)
        new = [p for p in await A.evaluate(PAINTINGS) if p['id'] not in before]
        check(f'decorate {tag}: a new painting hangs after putting one away', len(new) == 1, new)
        if new:
            check(f'decorate {tag}: clear of the room arrows', await A.evaluate(ARROWS, new[0]['id']) == [], await A.evaluate(ARROWS, new[0]['id']))
            await B.wait_for_timeout(600)
            src = await B.evaluate("id => { const e = document.querySelector(`.item[data-id=\"${id}\"] image`); return e ? (e.getAttribute('href') || '').slice(0, 22) : null }", new[0]['id'])
            check(f'decorate {tag}: second client sees the new bitmap', src and src.startswith('data:image/png'), src)
            if O2:
                io = await O2.evaluate(ITEM, new[0]['id'])
                check(f'decorate {tag}: old client gets the new painting as a picture', io and io['kind'] == 'picture' and io['art'] == new[0]['art'], io)
    if O2:
        check('decorate: old client no page errors', not eO2, eO2[:3]); await O2.context.close()
    await A.set_viewport_size({'width': 820, 'height': 1180}); await A.wait_for_timeout(500)

    # 5. Offline paintings come along when a house is brought to a street (12 max; the rest stay as placeholders with a toast).
    I, eI = await mk(820, 1180, hood=True)
    await hang_ui(I, 1)
    first = (await I.evaluate(PAINTINGS))[0]
    await I.evaluate("""([n, data]) => { const k = Object.keys(localStorage).find(k => k.includes('cozy-art')); const raw = JSON.parse(localStorage.getItem(k));
      const room = __store.get().currentRoom;
      for (let i = 0; i < n; i++) { const id = 'a' + Date.now().toString(36) + 'off' + i.toString(36).padStart(2, '0'); raw[id] = data;
        __store.dispatch({type: 'item/add', room, item: {id: 'picture-off' + i + Date.now().toString(36), kind: 'picture', x: 150 + i * 80, y: 200, flip: false, z: 0, scale: .6, art: id}}); }
      localStorage.setItem(k, JSON.stringify(raw)); }""", [12, pdata(8)])
    await I.wait_for_timeout(800); await I.reload(); await I.wait_for_selector('#stage .char'); await I.wait_for_timeout(800)
    off = await I.evaluate(PAINTINGS)
    check('offline: 13 paintings at home before joining', len(off) == 13, len(off))
    await I.evaluate("() => { window.__toasts = []; new MutationObserver(() => document.querySelectorAll('.toast').forEach(t => __toasts.includes(t.textContent) || __toasts.push(t.textContent))).observe(document.body, {childList: true, subtree: true}); }")
    await join(I, 4, True); await I.wait_for_timeout(2500)
    ihid = await I.evaluate("__hood().myHouseId()")
    tl = await I.evaluate("window.__toasts")
    check('offline: over-cap import tells her the rest stay home', any('stay safe' in t for t in tl), tl)
    J, eJ = await mk(820, 1180, hood=True); await join(J, 9, False)
    await J.evaluate(GO_HOUSE, ihid); await J.wait_for_timeout(2500)
    shown = await J.evaluate("ids => ids.map(id => { const e = document.querySelector(`.item[data-id=\"${id}\"]`); if (!e) return 'none'; const im = e.querySelector('image'); return im && (im.getAttribute('href') || '').startsWith('data:image/png') ? 'bitmap' : 'placeholder'; })", [p['id'] for p in off])
    check('offline: a friend sees the first 12 brought paintings as bitmaps', shown.count('bitmap') == 12, shown)
    check('offline: the 13th shows the friendly placeholder', shown.count('placeholder') == 1, shown)
    check('offline: the painting she made in the studio came along', shown[[p['id'] for p in off].index(first['id'])] == 'bitmap')
    await J.screenshot(path=SHOT + 'brought_820x1180.png')
    check('offline: no page errors', not eI and not eJ, (eI + eJ)[:3])
    await I.context.close()

    # 6. B2: a refused save leaves no frame on the wall (D's 12 paintings are all hung, so a 13th is refused).
    D, eD = await mk(390, 844, hood=True); await join(D, 5, False)
    await D.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await D.wait_for_timeout(1000)
    await D.evaluate(SAVE12, [pdata(2), 12, True]); await D.wait_for_timeout(1500)
    n0 = len(await D.evaluate(PAINTINGS))
    await D.evaluate("() => { window.__toasts = []; new MutationObserver(() => document.querySelectorAll('.toast').forEach(t => __toasts.includes(t.textContent) || __toasts.push(t.textContent))).observe(document.body, {childList: true, subtree: true}); }")
    await hang_ui(D, 2)
    n1 = len(await D.evaluate(PAINTINGS)); tl = await D.evaluate("window.__toasts")
    check('B2: house full of hung art: no new frame on the wall', n0 == 12 and n1 == 12, [n0, n1])
    check('B2: refusal explains with a toast', any('walls are full' in t for t in tl), tl)
    check('B2: no page errors', not eD, eD[:3])
    await D.context.close()

    # 7. B1 through the UI: other houses fill the street to 60, then new saves still succeed.
    #    So far: A 3 (1 hung), I 12 hung, D 12 hung = 27. B 12 + E 12 + F 9 unhung = 60.
    E, eE = await mk(400, 600, hood=True); await join(E, 6, False)
    F, eF = await mk(400, 600, hood=True); await join(F, 7, False)
    for pg, n, c in [(B, 12, 3), (E, 12, 4), (F, 9, 5)]:
        await pg.evaluate(SAVE12, [pdata(c), n, False]); await pg.wait_for_timeout(400)
    await A.wait_for_timeout(1500)
    before = {p['id'] for p in await A.evaluate(PAINTINGS)}
    await hang_ui(A, 0)
    new = [p for p in await A.evaluate(PAINTINGS) if p['id'] not in before]
    check('B1 UI: full street, owner with unhung art: new painting hangs', len(new) == 1, new)
    H, eH = await mk(820, 1180, hood=True); await join(H, 8, False)
    await H.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await H.wait_for_timeout(1000)
    await H.evaluate("() => { window.__toasts = []; new MutationObserver(() => document.querySelectorAll('.toast').forEach(t => __toasts.includes(t.textContent) || __toasts.push(t.textContent))).observe(document.body, {childList: true, subtree: true}); }")
    await hang_ui(H, 1)
    ph = await H.evaluate(PAINTINGS); tl = await H.evaluate("window.__toasts")
    check('B1 UI: full street, new girl with no art: her painting hangs (oldest unhung elsewhere cleared)', len(ph) == 1 and not any('full' in t for t in tl), [ph, tl])
    if ph:
        K, eK = await mk(820, 1180, hood=True); await join(K, 10, False)
        await K.evaluate(GO_HOUSE, await H.evaluate("__hood().myHouseId()")); await K.wait_for_timeout(2000)
        src = await K.evaluate("id => { const e = document.querySelector(`.item[data-id=\"${id}\"] image`); return e ? (e.getAttribute('href') || '').slice(0, 22) : null }", ph[0]['id'])
        check('B1 UI: a friend sees that painting', src and src.startswith('data:image/png'), src)
        check('B1 UI: friend no page errors', not eK, eK[:3]); await K.context.close()
    check('B1 UI: no page errors', not eE and not eF and not eH and not eJ, (eE + eF + eH + eJ)[:3])
    for pg in (E, F, H, J): await pg.context.close()

asyncio.run(main())

