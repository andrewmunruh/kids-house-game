import asyncio, sys
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        # icons
        pg = await b.new_page()
        svg = open('public/icon.svg').read()
        for n in (180, 192, 512):
            await pg.set_viewport_size({'width': n, 'height': n})
            await pg.set_content(f'<style>body{{margin:0}}svg{{width:{n}px;height:{n}px;display:block}}</style>{svg}')
            await pg.screenshot(path=f'public/icon-{n}.png')
        ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg = await ctx.new_page()
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(800)
        await pg.screenshot(path='screens/01-living-room.png')
        # drag an item from the drawer into the room
        th = pg.locator('.thing').nth(1); bb = await th.bounding_box()
        await pg.mouse.move(bb['x']+40, bb['y']+40); await pg.mouse.down()
        await pg.mouse.move(800, 400, steps=10); await pg.mouse.up(); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/02-item-selected-toolbar.png')
        await pg.click('[data-room="bedroom"]'); await pg.click('[data-cat="pets"]'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='screens/03-bedroom-pets.png')
        await pg.click('#btnPaint'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/04-paint-panel.png')
        await pg.click('.dot[data-v="#cfe8ff"]'); await pg.click('.close'); 
        await pg.click('#btnDress'); await pg.wait_for_timeout(300)
        await pg.click('.dot[data-act="hs"][data-v="2"]'); await pg.click('.dot[data-act="shirt"][data-v="#ffd166"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/05-character-creator.png')
        await pg.click('.close'); await pg.click('[data-room="kitchen"]'); await pg.click('[data-cat="food"]'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='screens/06-kitchen.png')
        await pg.reload(); await pg.wait_for_timeout(600)
        saved = await pg.evaluate("JSON.parse(localStorage.getItem('cozy-house-v1')).currentRoom")
        print('errors:', errs, 'persisted room:', saved)
        await b.close()
asyncio.run(main())
