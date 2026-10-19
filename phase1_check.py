from testnav import tap, local_page
import asyncio, sys
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True); await ctx.add_init_script("localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew', '999')")  # skip the What's new popup
        pg = await ctx.new_page(); logs=[]; bad=[]
        pg.on('console', lambda m: m.type in ('warning','error') and logs.append(m.type+': '+m.text)); pg.on('pageerror', lambda e: logs.append('ERR '+str(e)))
        pg.on('response', lambda r: r.status >= 400 and bad.append((r.status, r.url)))
        await pg.goto(URL); await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(800)
        n = await pg.evaluate("Object.keys(__items).length"); print('image items loaded:', n)
        # 218 image items, plus 36 in the Cozy Cottage pack.
        if n != 254: raise SystemExit(f'expected 254 pack items, got {n}')
        print('tabs:', await pg.locator('.cat').evaluate_all("e=>e.map(x=>x.dataset.cat)"))
        # walk every tab under "All" and check every drawer image decodes
        broken = []; total = 0
        for cat in await pg.locator('.cat').evaluate_all("e=>e.map(x=>x.dataset.cat)"):
            await pg.click(f'.cat[data-cat="{cat}"]'); await pg.wait_for_timeout(150)
            await pg.evaluate("Promise.all([...document.querySelectorAll('.shelf img')].map(i => i.decode().catch(()=>{})))")
            res = await pg.evaluate("[...document.querySelectorAll('.shelf img')].map(i => [i.alt, i.naturalWidth > 0])")
            total += len(res); broken += [a for a, ok in res if not ok]
        print('drawer images checked:', total, 'broken:', broken)
        # patterns
        await pg.click('[data-room="salon"]'); await pg.wait_for_timeout(400)
        await pg.click('.cat[data-cat="pack:glossy"]'); await pg.wait_for_timeout(600)
        await pg.screenshot(path='screens/18-pack-tab-glossy-salon.png')
        await tap(pg, '#btnPaint'); await pg.wait_for_timeout(500)
        walls = await pg.locator('.dot.tile[data-act="wtile"]').count()
        floors = await pg.locator('.dot.tile[data-act="ftile"]').count()
        print('wall tiles:', walls, 'floor tiles:', floors)
        # 9 wallpapers + 6 floors, plus Cozy Cottage's 6 wallpapers and 4 floors.
        if walls != 15 or floors != 10: raise SystemExit(f'expected 15 wall / 10 floor tiles, got {walls} / {floors}')
        await pg.click('.dot.tile[data-v="glossy/pink-hearts"]'); await pg.click('.dot.tile[data-v="glossy/pink-check-floor"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/19-paint-panel-pack-patterns.png')
        await pg.click('.close'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/20-salon-glossy-wallpaper.png')
        await pg.click('[data-room="bedroom"]'); await pg.wait_for_timeout(300); await tap(pg, '#btnPaint')
        await pg.click('.dot.tile[data-v="sunny-vibes/sky-clouds"]'); await pg.click('.dot.tile[data-v="sunny-vibes/butter-check-floor"]'); await pg.click('.close')
        await pg.click('.cat[data-cat="pack:sunny-vibes"]'); await pg.wait_for_timeout(300)
        # place a few sunny-vibes items and a wall item dropped low (should snap up onto the wall)
        things = pg.locator('.shelf .thing')
        for i, (x, y) in enumerate([(300, 520), (520, 540), (760, 520)]):
            bb = await things.nth(i).bounding_box(); await pg.mouse.move(bb['x']+40, bb['y']+40); await pg.mouse.down(); await pg.mouse.move(x, y, steps=8); await pg.mouse.up(); await pg.wait_for_timeout(250)
        await pg.click('[data-cat="decor"]'); await pg.wait_for_timeout(300)
        wl = pg.locator('.shelf .thing[aria-label="Pin Board"]')
        if await wl.count():
            await wl.scroll_into_view_if_needed(); bb = await wl.bounding_box()
            await pg.mouse.move(bb['x']+40, bb['y']+40); await pg.mouse.down(); await pg.mouse.move(640, 560, steps=8); await pg.mouse.up(); await pg.wait_for_timeout(300)
            it = (await pg.evaluate("__store.get()"))['rooms']['bedroom']['items'][-1]; print('wall item', it['kind'], 'dropped low -> y', round(it['y']))
        await pg.mouse.click(600, 120); await pg.click('.cat[data-cat="pack:sunny-vibes"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/21-bedroom-sunny-vibes-pack.png')
        await pg.click('[data-room="living"]'); await pg.click('.cat[data-cat="pack:welcome-home"]'); await pg.wait_for_timeout(500)
        await pg.screenshot(path='screens/22-pack-tab-welcome-home.png')
        print('http errors:', bad); print('console warnings/errors:', logs)
        await b.close()
asyncio.run(main())
