# Screenshots for the PR: room with Paint button, studio, hung, selected (resize handle), resized, portrait toolbar.
# usage: ART_SHOTS=dir/ python tests/art_studio_shots.py   (solo, WEB=http://localhost:5851)
import asyncio, os, re
src = open(os.path.join(os.path.dirname(__file__), 'art_studio_test.py')).read().replace('asyncio.run(main())', '')
exec(src)
OUT = os.environ.get('ART_SHOTS', 'shots/art-pr/'); os.makedirs(OUT, exist_ok=True)
async def run():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        br = await p.chromium.launch()
        for w, h in [(820, 1180), (1180, 820), (844, 390), (390, 844)]:
            t = f'{w}x{h}'
            ctx = await br.new_context(viewport={'width': w, 'height': h}, has_touch=True); await ctx.add_init_script(SKIP_WN); await ctx.route(re.compile(r'workers\.dev|github\.io'), lambda r: r.abort()); pg = await ctx.new_page()
            await pg.goto(f'{WEB}/kids-house-game/'); await pg.wait_for_selector('#stage .char'); await pg.wait_for_timeout(800)
            if await pg.locator('#phoneOk').is_visible(): await pg.click('#phoneOk'); await pg.wait_for_timeout(300)
            await pg.screenshot(path=OUT + f'1_paint_button_{t}.png')
            await paint(pg, 2, fab=await pg.locator('#artFab').is_visible()); await pg.wait_for_timeout(300)
            await pg.screenshot(path=OUT + f'2_studio_{t}.png')
            await pg.locator('.stuHang').click(); await pg.wait_for_timeout(1500)
            pid = (await pg.evaluate(PAINTINGS))[-1]['id']; await into_view(pg, pid)
            await pg.screenshot(path=OUT + f'3_hung_{t}.png')
            if await pg.evaluate("document.body.classList.contains('mode-play')"): await pg.click('#modeDecorate'); await pg.wait_for_timeout(300)
            bb = await pg.locator(f'.item[data-id="{pid}"]').bounding_box(); await pg.mouse.click(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); await pg.wait_for_timeout(400)
            print(t, 'grip', await pg.evaluate(GRIPCHK, pid))
            await pg.wait_for_timeout(3200)  # let the first-pick glow finish
            await pg.screenshot(path=OUT + f'4_selected_handle_{t}.png')
            g = await pg.locator('#artGrip').bounding_box(); gx, gy = g['x'] + g['width'] / 2, g['y'] + g['height'] / 2
            await pg.mouse.move(gx, gy); await pg.mouse.down()
            for i in range(1, 11): await pg.mouse.move(gx + i * 6, gy + i * 5); await pg.wait_for_timeout(16)
            await pg.wait_for_timeout(300); await pg.screenshot(path=OUT + f'6_mid_resize_{t}.png')  # finger still down
            await pg.mouse.up(); await pg.wait_for_timeout(800)
            print(t, 'size', (await pg.evaluate(ITEMS, pid))['size'], 'toolbar', await pg.locator('#toolbar').is_visible())
            if not await pg.locator('#toolbar').is_visible():
                bb = await pg.locator(f'.item[data-id="{pid}"]').bounding_box(); await pg.mouse.click(bb['x'] + bb['width'] * .3, bb['y'] + bb['height'] * .3); await pg.wait_for_timeout(400)
            print(t, 'grip after', await pg.evaluate(GRIPCHK, pid))
            await pg.screenshot(path=OUT + f'5_resized_toolbar_{t}.png')
            g = await pg.locator('#artGrip').bounding_box(); gx, gy = g['x'] + g['width'] / 2, g['y'] + g['height'] / 2
            await pg.mouse.move(gx, gy); await pg.mouse.down()
            for i in range(1, 16): await pg.mouse.move(gx - i * 4, gy - i * 3); await pg.wait_for_timeout(16)
            await pg.mouse.up(); await pg.wait_for_timeout(800)
            print(t, 'small size', (await pg.evaluate(ITEMS, pid))['size'], 'grip', await pg.evaluate(GRIPCHK, pid))
            await pg.screenshot(path=OUT + f'7_small_painting_{t}.png')
            await ctx.close()
        await br.close()
asyncio.run(run())
