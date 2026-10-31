# D-14: testnav.go() must work in iPad portrait and on a second park entry. WebKit.
# usage: testnav_portrait_test.py URL
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import go, SKIP_WN
from playwright.async_api import async_playwright
async def main():
    bad = 0
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for w, h in [(820, 1180), (1180, 820), (390, 844)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, service_workers='block')
            await ctx.add_init_script(SKIP_WN); pg = await ctx.new_page()
            await pg.goto(sys.argv[1]); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(2500)
            for pl in ['park', 'home', 'ranch', 'home', 'park', 'gameroom', 'home']:
                try: await go(pg, pl); print('PASS', w, h, pl, flush=True)
                except Exception as e: bad += 1; print('FAIL', w, h, pl, str(e).splitlines()[0][:200], flush=True)
            await ctx.close()
    print('RESULT', 'fail' if bad else 'ok', bad); sys.exit(1 if bad else 0)
asyncio.run(main())
