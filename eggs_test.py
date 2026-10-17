import asyncio, sys
from playwright.async_api import async_playwright
from testnav import PFX, SKIP_WN, K
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/?hood=http://localhost:8787'
EGGS = [('Cada','Living Room',3,'L'),('Sloane','Living Room',3,'R'),('Chloe','Bedroom',5,'R'),('Quinn','Kitchen',4,'L'),('Reagan','Salon',5,'R')]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True); await ctx.add_init_script(SKIP_WN)  # skip the What's new popup
        pg = await ctx.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(800)
        print('tracker:', await pg.inner_text('#secrets'), '| secrets tab visible:', await pg.locator('[data-cat="secrets"]').count())
        for i,(name, room, taps, side) in enumerate(EGGS):
            await pg.click(f'.tabs button:has-text("{room}"), button:has-text("{room}")'); await pg.wait_for_timeout(500)
            for _ in range(4): await pg.click('#nudgeL' if side=='L' else '#nudgeR', force=True); await pg.wait_for_timeout(250)
            await pg.wait_for_timeout(600)
            spot = pg.locator(f'.eggspot[data-egg="{name}"]')
            # fewer taps than needed: nothing happens
            for _ in range(taps-1): await spot.click(); await pg.wait_for_timeout(120)
            before = len((await pg.evaluate('__eggs()'))['found'])
            await pg.wait_for_timeout(1700)  # pause resets the count
            await spot.click(); await pg.wait_for_timeout(50)
            mid = len((await pg.evaluate('__eggs()'))['found'])
            for _ in range(taps-1): await spot.click(); await pg.wait_for_timeout(120)
            await pg.wait_for_timeout(450)
            if i in (0, 2): await pg.screenshot(path=f'screens/egg-{i+1}-reveal.png')
            after = await pg.evaluate('__eggs()')
            print(name, 'ok' if before==i and mid==i and name in after['found'] else 'FAIL', await pg.inner_text('#secrets'))
            await pg.wait_for_timeout(3000)
        await pg.click('[data-cat="secrets"]'); await pg.wait_for_timeout(400)
        print('secret drawer items:', await pg.locator('.shelf .thing').count())
        await pg.screenshot(path='screens/egg-secret-drawer.png')
        await pg.reload(); await pg.wait_for_timeout(800); print('after reload:', await pg.inner_text('#secrets'))
        print('errors:', errs); await b.close()
asyncio.run(main())
