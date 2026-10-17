import asyncio, sys, json
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
V1 = {"version":1,"houseId":"local","currentRoom":"living","soundOn":True,
  "rooms":{"living":{"wallpaper":"#cfe8ff","floor":"#c99366","pattern":2,"items":[{"id":"sofa-1","kind":"sofa","x":470,"y":470,"flip":False,"z":1,"scale":1},{"id":"cat-9","kind":"cat","x":900,"y":520,"flip":True,"z":2,"scale":1}]},
           "bedroom":{"wallpaper":"#d9ccff","floor":"#f2d0a4","pattern":2,"items":[]},"kitchen":{"wallpaper":"#cdf3dc","floor":"#ffe7a8","pattern":3,"items":[]}},
  "character":{"skin":"#c68642","hair":"#ff8fab","hairStyle":2,"shirt":"#80ed99","pants":"#c9a0dc","room":"living","x":300,"y":540,"flip":False}}
st = lambda pg: pg.evaluate("window.__store.get()")
async def drag(pg, a, b, steps=15, hold=0):
    await pg.mouse.move(*a); await pg.mouse.down(); await pg.mouse.move(*b, steps=steps)
    if hold: await pg.wait_for_timeout(hold)
    await pg.mouse.up(); await pg.wait_for_timeout(450)
async def center(loc, scroll=False):
    if scroll: await loc.scroll_into_view_if_needed(); await loc.page.wait_for_timeout(150)
    b = await loc.bounding_box(); return (b['x']+b['width']/2, b['y']+b['height']/2)
async def hand(pg, cid, h):
    # screen position of a character's hand, from the same geometry the game uses
    return await pg.evaluate("""([cid,h]) => { const c = __store.get().characters.find(c=>c.id===cid); const el=document.querySelector(`.char[data-cid="${cid}"]`).getBoundingClientRect();
      let hx = h==='left'?15:85; if (c.flip) hx = 100-hx; return [el.left + hx/100*el.width, el.top + 113/160*el.height]; }""", [cid, h])
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True); await ctx.add_init_script("localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew', '999')")  # skip the What's new popup
        pg = await ctx.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
        # --- migrate a v1 save (single character, 1000-wide room) ---
        await pg.goto(URL); await pg.evaluate(f"localStorage.clear(); localStorage.setItem('cozy-house-v1', {json.dumps(json.dumps(V1))})")
        await pg.reload(); await pg.wait_for_timeout(700); s = await st(pg)
        print('migrated: version', s['version'], 'sofa x', s['rooms']['living']['items'][0]['x'], 'chars', [(c['id'], c['x'], c['skin']) for c in s['characters']], 'rooms', list(s['rooms']))
        await pg.screenshot(path='screens/08-migrated-v1-save.png')
        # --- fresh state ---
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(700)
        await pg.screenshot(path='screens/01-living-room.png')
        c0 = await pg.evaluate("__cam.get()")
        await drag(pg, (800, 150), (250, 160), steps=12); await pg.wait_for_timeout(900)
        print('pan: cam', c0, '->', await pg.evaluate("__cam.get()"))
        await pg.screenshot(path='screens/09-panned-right.png')
        for _ in range(3): await pg.click('#nudgeL')
        await pg.wait_for_timeout(1000); print('nudged left cam', await pg.evaluate("__cam.get()"))
        await pg.screenshot(path='screens/10-panned-left-edge.png')
        mm = await pg.locator('#minimap').bounding_box(); await pg.mouse.click(mm['x']+mm['width']*0.45, mm['y']+mm['height']/2); await pg.wait_for_timeout(900)
        # edge auto-scroll while dragging an item
        th = pg.locator('.thing').nth(1); await drag(pg, await center(th), (500, 420))
        new = (await st(pg))['rooms']['living']['items'][-1]; camA = await pg.evaluate("__cam.get()")
        await drag(pg, await center(pg.locator(f'.item[data-id="{new["id"]}"]')), (1000, 420), steps=10, hold=1200)
        it = [i for i in (await st(pg))['rooms']['living']['items'] if i['id']==new['id']][0]
        print('edge autoscroll cam', round(camA), '->', round(await pg.evaluate("__cam.get()")), 'item x', round(new['x']), '->', round(it['x']))
        await pg.screenshot(path='screens/02-item-selected-toolbar.png')
        await pg.evaluate("__cam.set(700)"); await pg.wait_for_timeout(200)
        # --- multiple characters: People tab, + twice ---
        await pg.click('[data-cat="__people"]')
        for i in range(2):
            await pg.click('.thing.add'); await pg.wait_for_timeout(300)
            await pg.click(f'.dot.sz[data-v="{["adult","little"][i]}"]'); await pg.click(f'.dot.hs[data-act="acc"][data-v="{[3,1][i]}"]'); await pg.wait_for_timeout(200)
            if i == 1: await pg.screenshot(path='screens/05-character-creator.png')
            await pg.click('.close'); await pg.wait_for_timeout(300)
        chars = (await st(pg))['characters']; print('characters:', [(c['id'][:6], c['size'], c['acc'], c['room']) for c in chars])
        # spread them out by dragging people cards into the room
        cards = pg.locator('.thing.person')
        for i, x in enumerate([330, 560, 790]):
            await drag(pg, await center(cards.nth(i)), (x, 520))
        # --- holding: teddy into hand of char 0, cake into the other hand, cat onto char 1 ---
        await pg.click('[data-cat="decor"]'); await pg.wait_for_timeout(200)
        cid0, cid1 = chars[0]['id'], chars[1]['id']
        teddy = pg.locator('.thing[aria-label="Teddy"]')
        await drag(pg, await center(teddy, True), tuple(await hand(pg, cid0, 'right')))
        await pg.click('[data-cat="food"]'); await pg.wait_for_timeout(200)
        await drag(pg, await center(pg.locator('.thing[aria-label="Cake"]'), True), tuple(await hand(pg, cid0, 'left')))
        catEl = pg.locator('.item[data-id="cat-5"]')
        cc = await center(catEl); hh = await hand(pg, cid1, 'left')
        print('cat center', cc, 'hit', await pg.evaluate(f"document.elementFromPoint({cc[0]},{cc[1]})?.closest('[data-id],[data-cid],.toolbar,.sheet,.stage')?.className"), 'adult hand', hh)
        await drag(pg, cc, tuple(hh))
        s = await st(pg); held = {c['id']: {h: (c['held'][h] or {}).get('kind') for h in ('left','right')} for c in s['characters']}
        print('held:', held)
        await pg.screenshot(path='screens/12-multiple-characters-holding.png')
        # move char 0 left so held items follow + flip
        c0el = pg.locator(f'.char[data-cid="{cid0}"]'); a = await center(c0el)
        await drag(pg, a, (a[0]-120, a[1]+10)); await pg.wait_for_timeout(300)
        await pg.screenshot(path='screens/13-held-items-follow-and-flip.png')
        # walk char 0 to the Salon by dropping on the tab -> items travel along
        await drag(pg, await center(c0el), await center(pg.locator('[data-room="salon"]')), steps=20)
        s = await st(pg); c = [c for c in s['characters'] if c['id']==cid0][0]
        print('char0 room', c['room'], 'still holding', c['held']['left'] and c['held']['left']['kind'], c['held']['right'] and c['held']['right']['kind'])
        await pg.click('[data-room="salon"]'); await pg.wait_for_timeout(700)
        await pg.screenshot(path='screens/14-salon-with-traveller.png')
        # drag a held item off to put it down
        h = pg.locator(f'.char[data-cid="{cid0}"] .held[data-hand="right"]')
        await drag(pg, await center(h), (300, 540))
        s = await st(pg); c = [c for c in s['characters'] if c['id']==cid0][0]
        print('after drag-off right hand:', c['held']['right'], 'salon has teddy:', any(i['kind']=='teddy' for i in s['rooms']['salon']['items']))
        await pg.click('[data-room="bedroom"]'); await pg.click('[data-rf="bedroom"]'); await pg.click('[data-cat="furniture"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/03-bedroom-room-filter.png')
        await pg.click('#btnPaint'); await pg.wait_for_timeout(400); await pg.screenshot(path='screens/04-paint-panel.png'); await pg.click('.close')
        await pg.click('[data-room="kitchen"]'); await pg.click('[data-rf="kitchen"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/06-kitchen.png')
        cdp = await ctx.new_cdp_session(pg); c0 = await pg.evaluate("__cam.get()")
        pts = lambda dx: [{'x':600+dx,'y':300,'id':1},{'x':650+dx,'y':360,'id':2}]
        await cdp.send('Input.dispatchTouchEvent', {'type':'touchStart','touchPoints':pts(0)})
        for i in range(1,11): await cdp.send('Input.dispatchTouchEvent', {'type':'touchMove','touchPoints':pts(-30*i)})
        await cdp.send('Input.dispatchTouchEvent', {'type':'touchEnd','touchPoints':[]}); await pg.wait_for_timeout(300)
        print('two-finger pan cam', round(c0), '->', round(await pg.evaluate("__cam.get()")))
        # --- Graphic Artist batch 1: place all 10 via the drawer, per room ---
        async def place(name, x, y):
            for cat in await pg.locator('.cat').evaluate_all("els => els.map(e => e.dataset.cat)"):
                await pg.click(f'.cat[data-cat="{cat}"]')
                loc = pg.locator(f'.thing[aria-label="{name}"]')
                if await loc.count():
                    await drag(pg, await center(loc, True), (x, y)); return cat
            return None
        plan = {'living': [('Comfy Chair', 300, 470), ('Daisy Rug', 560, 600), ('Monstera Plant', 820, 470)],
                'bedroom': [('Canopy Bed', 520, 470), ('Cat Bed', 250, 590), ('Moon Night Light', 760, 420), ('Dino Plush', 830, 590)],
                'kitchen': [('Happy Fridge', 250, 460), ('Toaster', 560, 420), ('Fruit Bowl', 700, 420)]}
        names = {e['name']: e['slug'] for e in json.load(open('assets/items/manifest.json'))}
        for room, items in plan.items():
            await pg.click(f'[data-room="{room}"]'); await pg.wait_for_timeout(400); await pg.evaluate("__cam.set(1300)"); await pg.click(f'[data-rf="{room}"]')
            for n, x, y in items:
                n2 = n if n in names else {'Monstera Plant': 'Big Leaf Plant', 'Moon Night Light': 'Moon Night-Light', 'Dino Plush': 'Dino Plushie'}.get(n, n)
                print('  placed', n2, 'via tab', await place(n2, x, y))
            await pg.click('.cat[data-cat="furniture"]') if room != 'kitchen' else None
            await pg.mouse.click(600, 150); await pg.wait_for_timeout(300)
            await pg.screenshot(path=f'screens/15-artist-items-{room}.png')
        s = await st(pg); print('pack items in rooms:', sorted(i['kind'] for r in s['rooms'].values() for i in r['items'] if i['kind'].startswith('pack:')))
        print('holdable flags:', await pg.evaluate("Object.fromEntries(Object.entries(window.__items||{}).map(([k,v])=>[k,v]))"))
        # persistence of characters + held items
        await pg.wait_for_timeout(400); await pg.reload(); await pg.wait_for_timeout(600); s = await st(pg)
        print('after reload: chars', len(s['characters']), 'held', [(c['held']['left'] or {}).get('kind') for c in s['characters']])
        print('errors:', errs)
        await b.close()
asyncio.run(main())
