# Before/after shots of a painted scene, labelled by build.
# usage: python tests/scene_shots.py URL LABEL OUT_DIR [scene=room-living]
#   LABEL is cur-<sha> or pr-<sha>; files: <LABEL>__<scene>__<WxH>__<browser>[__artv1].png
import asyncio, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

URL, LABEL, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
SCENE = sys.argv[4] if len(sys.argv) > 4 else 'room-living'
SIZES = [tuple(map(int, x.split('x'))) for x in os.environ.get('SIZES', '820x1180,844x390,390x844').split(',')]
BROWSERS = os.environ.get('BROWSERS', 'chromium,webkit').split(',')

async def shoot(b, name, w, h, v1):
    phone = min(w, h) < 500
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=phone and name == 'chromium', device_scale_factor=2)
    await ctx.add_init_script(SKIP_WN)
    pg = await ctx.new_page()
    sep = '&' if '?' in URL else '?'
    await pg.goto(URL + (sep + 'art=v1' if v1 else ''))
    await pg.wait_for_selector('#stage', timeout=15000)
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.is_visible(): await loc.click(force=True)
    try:
        await pg.wait_for_function("() => !!document.querySelector('#stage.sceneArtOn') || !document.querySelector('#sceneArt')", timeout=6000 if not v1 else 1500)
    except Exception: pass
    await pg.wait_for_timeout(1200)
    on = await pg.evaluate("() => !!document.querySelector('#stage.sceneArtOn')")
    f = f"{OUT}/{LABEL}__{SCENE}__{w}x{h}__{name}{'__artv1' if v1 else ''}.png"
    await pg.screenshot(path=f)
    print(f, 'painted' if on else 'vector', flush=True)
    await ctx.close()

async def main():
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        for name in BROWSERS:
            b = await getattr(p, name).launch()
            for w, h in SIZES:
                await shoot(b, name, w, h, False)
                if LABEL.startswith('pr-'): await shoot(b, name, w, h, True)
            await b.close()
asyncio.run(main())
