import asyncio, sys, json
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
V1 = {"version":1,"houseId":"local","currentRoom":"living","soundOn":True,
  "rooms":{"living":{"wallpaper":"#cfe8ff","floor":"#c99366","pattern":2,"items":[{"id":"sofa-1","kind":"sofa","x":470,"y":470,"flip":False,"z":1,"scale":1},{"id":"cat-9","kind":"cat","x":900,"y":520,"flip":True,"z":2,"scale":1}]},
           "bedroom":{"wallpaper":"#d9ccff","floor":"#f2d0a4","pattern":2,"items":[]},"kitchen":{"wallpaper":"#cdf3dc","floor":"#ffe7a8","pattern":3,"items":[]}},
  "character":{"skin":"#c68642","hair":"#ff8fab","hairStyle":2,"shirt":"#80ed99","pants":"#c9a0dc","room":"living","x":300,"y":540,"flip":False}}
async def drag(pg, a, b, steps=15, hold=0):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps)
    if hold: await pg.wait_for_timeout(hold)
    await pg.mouse.up(); await pg.wait_for_timeout(400)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True)
        pg = await ctx.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
        # --- migration test: load a v1 save ---
        await pg.goto(URL); await pg.evaluate(f"localStorage.clear(); localStorage.setItem('cozy-house-v1', {json.dumps(json.dumps(V1))})")
        await pg.reload(); await pg.wait_for_timeout(700)
        st = await pg.evaluate("window.__store.get()")
        print('migrated version', st['version'], 'sofa x', st['rooms']['living']['items'][0]['x'], 'char x', st['character']['x'], 'cam', await pg.evaluate("__cam.get()"))
        await pg.screenshot(path='screens/08-migrated-v1-save.png')
        # --- fresh state ---
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(700)
        await pg.screenshot(path='screens/01-living-room.png')
        # pan by swiping the empty wall (mouse == one finger)
        c0 = await pg.evaluate("__cam.get()")
        await drag(pg, (800, 150), (250, 160), steps=12); await pg.wait_for_timeout(900)
        c1 = await pg.evaluate("__cam.get()"); print('pan right: cam', c0, '->', c1)
        await pg.screenshot(path='screens/09-panned-right.png')
        await pg.click('#nudgeL'); await pg.click('#nudgeL'); await pg.click('#nudgeL'); await pg.wait_for_timeout(900)
        print('after nudges left cam', await pg.evaluate("__cam.get()"))
        await pg.screenshot(path='screens/10-panned-left-edge.png')
        # minimap jump to center
        mm = await pg.locator('#minimap').bounding_box()
        await pg.mouse.click(mm['x']+mm['width']/2, mm['y']+mm['height']/2); await pg.wait_for_timeout(900)
        # drag an item from drawer, then edge auto-scroll by holding it at right edge
        th = pg.locator('.thing').nth(1); bb = await th.bounding_box()
        await drag(pg, (bb['x']+40, bb['y']+40), (500, 420))
        st = await pg.evaluate("window.__store.get()"); new = st['rooms']['living']['items'][-1]; print('added', new['kind'], round(new['x']))
        el = pg.locator(f'[data-id="{new["id"]}"]'); eb = await el.bounding_box()
        camA = await pg.evaluate("__cam.get()")
        await drag(pg, (eb['x']+eb['width']/2, eb['y']+eb['height']/2), (1000, 420), steps=10, hold=1200)
        st = await pg.evaluate("window.__store.get()"); it = [i for i in st['rooms']['living']['items'] if i['id']==new['id']][0]
        print('edge autoscroll cam', round(camA), '->', round(await pg.evaluate("__cam.get()")), 'item x', round(new['x']), '->', round(it['x']))
        await pg.screenshot(path='screens/02-item-selected-toolbar.png')
        # character drag still works
        ch = await pg.locator('.char').bounding_box()
        if ch: 
            await drag(pg, (ch['x']+ch['width']/2, ch['y']+ch['height']/2), (ch['x']-150, ch['y']+ch['height']/2))
            print('char x', round((await pg.evaluate("window.__store.get()"))['character']['x']))
        await pg.click('[data-room="bedroom"]'); await pg.click('[data-rf="bedroom"]'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='screens/03-bedroom-room-filter.png')
        await pg.click('#btnPaint'); await pg.wait_for_timeout(500); await pg.screenshot(path='screens/04-paint-panel.png')
        await pg.click('.close'); await pg.click('#btnDress'); await pg.wait_for_timeout(300)
        await pg.click('.dot[data-act="hs"][data-v="2"]'); await pg.wait_for_timeout(400)
        await pg.screenshot(path='screens/05-character-creator.png'); await pg.click('.close')
        await pg.click('[data-room="kitchen"]'); await pg.click('[data-rf="kitchen"]'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='screens/06-kitchen.png')
        # two-finger pan via CDP touch events
        cdp = await ctx.new_cdp_session(pg); c0 = await pg.evaluate("__cam.get()")
        pts = lambda dx: [{'x':600+dx,'y':300,'id':1},{'x':650+dx,'y':360,'id':2}]
        await cdp.send('Input.dispatchTouchEvent', {'type':'touchStart','touchPoints':pts(0)})
        for i in range(1,11): await cdp.send('Input.dispatchTouchEvent', {'type':'touchMove','touchPoints':pts(-30*i)})
        await cdp.send('Input.dispatchTouchEvent', {'type':'touchEnd','touchPoints':[]}); await pg.wait_for_timeout(300)
        print('two-finger pan cam', round(c0), '->', round(await pg.evaluate("__cam.get()")))
        print('errors:', errs)
        await b.close()
asyncio.run(main())
