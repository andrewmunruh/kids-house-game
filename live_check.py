import asyncio
from playwright.async_api import async_playwright
URL = 'https://andrewmunruh.github.io/kids-house-game/'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True)
        pg = await ctx.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
        bad=[]; pg.on('response', lambda r: r.status >= 400 and bad.append((r.status, r.url)))
        r = await pg.goto(URL); await pg.wait_for_timeout(1500)
        c0 = await pg.evaluate("__cam.get()")
        await pg.mouse.move(300,150); await pg.mouse.down(); await pg.mouse.move(800,160, steps=12); await pg.mouse.up(); await pg.wait_for_timeout(900)
        info = await pg.evaluate("({ver: __store.get().version, rooms: document.querySelectorAll('.tab').length, chars: document.querySelectorAll('.char').length, packItems: Object.keys(__items).length, imgsBroken: [...document.querySelectorAll('img')].filter(i=>i.complete && !i.naturalWidth).length})")
        await pg.click('[data-room="bedroom"]'); await pg.click('[data-rf="bedroom"]'); await pg.wait_for_timeout(800)
        broken = await pg.evaluate("[...document.querySelectorAll('img')].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src.slice(-40))")
        print('status', r.status, info, 'cam', c0, '->', round(await pg.evaluate("__cam.get()")), 'broken imgs (bedroom drawer):', broken, 'http errors:', bad, 'errors:', errs)
        await pg.screenshot(path='screens/07-live-site-panned.png'); await b.close()
asyncio.run(main())
