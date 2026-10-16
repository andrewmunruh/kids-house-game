import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True)
        pg = await ctx.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        r = await pg.goto('https://andrewmunruh.github.io/kids-house-game/'); await pg.wait_for_timeout(1500)
        print(r.status, await pg.locator('.item').count(), await pg.locator('.thing').count(), errs)
        await pg.screenshot(path='screens/07-live-site.png'); await b.close()
asyncio.run(main())
