import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import PFX, SKIP_WN, K, local_page
URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
EGG_DIR = os.environ.get('EGGS_SHOTS', 'screens')
os.makedirs(EGG_DIR, exist_ok=True)
SHOT = os.environ.get('EGG_ARTIFACTS', '/opt/cursor/artifacts/screenshots')
os.makedirs(SHOT, exist_ok=True)
EGGS = [('Cada','Living Room',3,'L'),('Sloane','Living Room',3,'R'),('Chloe','Bedroom',5,'R'),('Quinn','Kitchen',4,'L'),('Reagan','Salon',5,'R')]
ROOMS = ['living', 'bedroom', 'kitchen', 'salon', 'nursery']
# iPad 10th gen, the other iPads, and a phone stood up and on its side.
SIZES = [(820, 1180, False), (1024, 768, False), (1180, 820, False), (390, 844, True), (844, 390, True)]
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

# Tap point of every on-screen surprise. elementFromPoint must not be the mode toggle.
HIT = """() => {
  const names = [];
  const bad = [];
  for (const el of document.querySelectorAll('.eggspot')) {
    if (el.style.display === 'none') continue;
    const b = el.getBoundingClientRect();
    const x = b.left + b.width / 2, y = b.top + b.height / 2;
    if (b.width < 2 || b.height < 2 || x < 1 || y < 1 || x > innerWidth - 1 || y > innerHeight - 1) continue;
    names.push(el.dataset.egg);
    const hit = document.elementFromPoint(x, y);
    if (hit && hit.closest('#modeToggle')) bad.push(el.dataset.egg);
  }
  return {names, bad};
}"""

async def egg_clearance(browser):
    for w, h, mobile in SIZES:
        tag = f'{w}x{h}'
        ctx = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=mobile)
        await ctx.add_init_script(SKIP_WN)
        pg = await ctx.new_page()
        await pg.goto(URL)
        await pg.wait_for_selector('#stage .eggspot', timeout=8000)
        if await pg.locator('#phoneOk').is_visible():
            await pg.click('#phoneOk', force=True)
        await pg.wait_for_timeout(250)
        for room in ROOMS:
            await pg.click(f'.tab[data-room="{room}"]')
            await pg.wait_for_timeout(200)
            present = await pg.evaluate("""() => [...document.querySelectorAll('.eggspot')].filter(el => el.style.display !== 'none').map(el => el.dataset.egg)""")
            seen = set()
            bad = []
            for cam in (0, 100000):
                await pg.evaluate('(cam) => __cam.set(cam)', cam)
                await pg.wait_for_timeout(40)
                info = await pg.evaluate(HIT)
                seen.update(info['names'])
                bad.extend(info['bad'])
                if (w, h) == (820, 1180) and room == 'kitchen' and cam == 0:
                    path = os.path.join(SHOT, 'kitchen-egg-toggle-820x1180.png')
                    await pg.screenshot(path=path)
                    print('SHOT', path, flush=True)
            missing = [n for n in present if n not in seen]
            check(f'{tag} {room} egg tap is not under the mode toggle', not bad and not missing, f'bad={bad} missing={missing} seen={sorted(seen)}')
        await ctx.close()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        await egg_clearance(b)
        ctx = await b.new_context(viewport={'width':1024,'height':768}, device_scale_factor=2, has_touch=True); await ctx.add_init_script(SKIP_WN)  # skip the What's new popup
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
            if i in (0, 2): await pg.screenshot(path=os.path.join(EGG_DIR, f'egg-{i+1}-reveal.png'))
            after = await pg.evaluate('__eggs()')
            print(name, 'ok' if before==i and mid==i and name in after['found'] else 'FAIL', await pg.inner_text('#secrets'))
            await pg.wait_for_timeout(3000)
        await pg.click('[data-cat="secrets"]'); await pg.wait_for_timeout(400)
        print('secret drawer items:', await pg.locator('.shelf .thing').count())
        await pg.screenshot(path=os.path.join(EGG_DIR, 'egg-secret-drawer.png'))
        await pg.reload(); await pg.wait_for_timeout(800); print('after reload:', await pg.inner_text('#secrets'))
        print('errors:', errs); await b.close()
    failed = [k for k, v in res.items() if not v]
    print('EGG CLEAR', 'ok' if not failed else 'FAILED ' + ', '.join(failed), flush=True)
    if failed or errs:
        sys.exit(1)
asyncio.run(main())
