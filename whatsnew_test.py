# What's new popup: welcome on brand-new device, changelog once after an update, then never again.
import asyncio, os, sys, json
from playwright.async_api import async_playwright
from testnav import PFX, SKIP_WN, K
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/?hood=http://localhost:8787'
WN_DIR = os.environ.get('WHATSNEW_SHOTS', os.path.join('screens', 'pets'))
os.makedirs(WN_DIR, exist_ok=True)
res = {}
def check(n, ok, x=''): res[n] = ok; print(('PASS ' if ok else 'FAIL ') + n, x)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        mk = lambda: b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
        # brand-new device
        c = await mk(); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_selector('.whatsNew', timeout=5000); await pg.wait_for_timeout(1200)
        check('new device: short welcome (not the changelog)', 'Welcome' in await pg.inner_text('.whatsNew .wnTitle') and await pg.locator('.whatsNew.welcome').count() == 1)
        await pg.screenshot(path=os.path.join(WN_DIR, '10-welcome-new-device.png'))
        await pg.click('#wnGo', force=True); await pg.wait_for_timeout(300)
        check('Let\'s play! closes it', await pg.locator('.whatsNew').count() == 0)
        await pg.reload(); await pg.wait_for_timeout(1200)
        check('new device: not shown again', await pg.locator('.whatsNew').count() == 0)
        # existing device from before the update: has a saved house, no seen-version yet
        old = await c.new_page(); await old.goto(URL); await old.wait_for_timeout(300)
        save = await old.evaluate("localStorage.getItem('" + K('cozy-house') + "')")
        c2 = await mk(); await c2.add_init_script("if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x','1'); localStorage.clear(); localStorage.setItem('" + K('cozy-house') + "', " + json.dumps(save) + "); }")
        pg2 = await c2.new_page(); pg2.on('pageerror', lambda e: errs.append(str(e)))
        await pg2.goto(URL); await pg2.wait_for_selector('.whatsNew', timeout=5000); await pg2.wait_for_timeout(1500)
        t = await pg2.inner_text('.whatsNew')
        tl = t.lower()
        check('updated device: nursery news first, then the clubhouse (capped at 5 lines)', 'new nursery' in tl and 'crib' in tl and 'slay' in tl and 'real patterns' not in tl and 'find her' not in tl and 'barn' not in tl and await pg2.locator('.wnLine').count() == 5)
        check('big Let\'s play! button', await pg2.locator('#wnGo:has-text("Let\'s play!")').count() == 1)
        await pg2.screenshot(path=os.path.join(WN_DIR, '11-whats-new.png'))
        await pg2.click('#wnGo', force=True); await pg2.reload(); await pg2.wait_for_timeout(1200)
        check('updated device: only once', await pg2.locator('.whatsNew').count() == 0)
        check('save still intact', await pg2.evaluate("localStorage.getItem('" + K('cozy-house') + "') !== null && __store.get().characters.length > 0"))
        # a device that already saw the pets update (v2) gets only the ranch news
        c3 = await mk(); await c3.add_init_script("if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x','1'); localStorage.clear(); localStorage.setItem('" + K('cozy-whatsnew') + "','2'); localStorage.setItem('" + K('cozy-house') + "', " + json.dumps(save) + "); }")
        pg3 = await c3.new_page(); pg3.on('pageerror', lambda e: errs.append(str(e)))
        await pg3.goto(URL); await pg3.wait_for_selector('.whatsNew', timeout=5000); await pg3.wait_for_timeout(1200)
        check('device that saw v2: nursery news newest, then the clubhouse', 'new nursery' in (await pg3.inner_text('.wnTitle')).lower() and 'crib' in (await pg3.inner_text('.whatsNew')).lower() and 'slay' in (await pg3.inner_text('.whatsNew')).lower() and await pg3.locator('.wnLine').count() == 5)
        c4 = await mk(); await c4.add_init_script("if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x','1'); localStorage.clear(); localStorage.setItem('" + K('cozy-whatsnew') + "','4'); localStorage.setItem('" + K('cozy-house') + "', " + json.dumps(save) + "); }")
        pg4 = await c4.new_page(); pg4.on('pageerror', lambda e: errs.append(str(e)))
        await pg4.goto(URL); await pg4.wait_for_selector('.whatsNew', timeout=5000); await pg4.wait_for_timeout(800)
        check('device that saw v4: nursery, then the clubhouse', 'new nursery' in (await pg4.inner_text('.wnTitle')).lower() and 'crib' in (await pg4.inner_text('.whatsNew')).lower() and 'slay' in (await pg4.inner_text('.whatsNew')).lower() and await pg4.locator('.wnLine').count() == 5 and 'map of our neighborhood' not in (await pg4.inner_text('.whatsNew')).lower())
        c5 = await mk(); await c5.add_init_script("if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x','1'); localStorage.clear(); localStorage.setItem('" + K('cozy-whatsnew') + "','5'); localStorage.setItem('" + K('cozy-house') + "', " + json.dumps(save) + "); }")
        pg5 = await c5.new_page(); pg5.on('pageerror', lambda e: errs.append(str(e)))
        await pg5.goto(URL); await pg5.wait_for_selector('.whatsNew', timeout=5000); await pg5.wait_for_timeout(800)
        check('device that saw v5: nursery, then two clubhouse lines', 'new nursery' in (await pg5.inner_text('.wnTitle')).lower() and 'crib' in (await pg5.inner_text('.whatsNew')).lower() and 'slay' in (await pg5.inner_text('.whatsNew')).lower() and await pg5.locator('.wnLine').count() == 5 and 'cozier' not in (await pg5.inner_text('.whatsNew')).lower() and 'real patterns' not in (await pg5.inner_text('.whatsNew')).lower())
        check('no JS errors', not errs, '; '.join(errs[:3]))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
