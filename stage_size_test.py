# The room stage must match commit 1f0aa5c at the sizes QA measured.
# Prod is a static build. This client is the preview. Neither talks to the live worker.
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import K

PROD = os.environ.get('PROD_URL', 'http://127.0.0.1:4194/kids-house-game/')
NEW = os.environ.get('NEW_URL', 'http://localhost:4173/kids-house-game/')
SIZES = [(1180, 820), (1024, 768), (820, 1180), (844, 390), (375, 667)]

def check(name, ok, extra=''):
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
    return bool(ok)

async def measure(browser, url, w, h):
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=(w < 900 or h < 500), device_scale_factor=1)
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
    pg = await ctx.new_page()
    await pg.goto(url, wait_until='networkidle')
    await pg.wait_for_selector('#stage')
    if await pg.locator('#phoneOk').count() and await pg.locator('#phoneOk').is_visible():
        await pg.click('#phoneOk', force=True)
        await pg.wait_for_timeout(80)
    if await pg.locator('.whatsNew .wnGo').count() and await pg.locator('.whatsNew .wnGo').is_visible():
        await pg.click('.whatsNew .wnGo', force=True)
        await pg.wait_for_timeout(80)
    box = await pg.evaluate("""() => {
      const b = document.querySelector('.stage').getBoundingClientRect();
      return { w: Math.round(b.width), h: Math.round(b.height) };
    }""")
    await ctx.close()
    return box

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        failed = 0
        for w, h in SIZES:
            prod = await measure(browser, PROD, w, h)
            cur = await measure(browser, NEW, w, h)
            ok = abs(prod['w'] - cur['w']) <= 2 and abs(prod['h'] - cur['h']) <= 2
            if not check(f'stage {w}x{h} matches 1f0aa5c', ok, f"prod {prod['w']}x{prod['h']} now {cur['w']}x{cur['h']}"):
                failed += 1
        await browser.close()
    if failed:
        sys.exit(1)
    print('STAGE SIZE ok', flush=True)

asyncio.run(main())
