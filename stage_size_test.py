# The room stage must match commit 1f0aa5c at the sizes QA measured.
# Prod is a static build. This client is the preview. Neither talks to the live worker.
# URLs come from argv or env. There is no hardcoded :4194 default (that port was often unserved).
#   stage_size_test.py [NEW_URL] [PROD_URL]
#   stage_size_test.py --new URL --prod URL
#   stage_size_test.py --web-port 5311 --prod-port 5310
#   env NEW_URL / PROD_URL, or WEB_PORT / PROD_PORT
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import K

def _flag(name, env=None):
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv) and not sys.argv[i + 1].startswith('-'):
            return sys.argv[i + 1]
    return os.environ.get(env) if env else None

def _game_url(url_or_none, port_flag, port_env):
    raw = url_or_none or (_flag(port_flag, port_env) and f'http://127.0.0.1:{_flag(port_flag, port_env)}/')
    if not raw:
        return None
    u = raw.strip()
    if '://' not in u:
        u = f'http://127.0.0.1:{u}/'
    u = u.rstrip('/') + '/'
    if 'kids-house-game' not in u:
        u = u + 'kids-house-game/'
    return u

_pos = [a for a in sys.argv[1:] if not a.startswith('-')]
NEW = _game_url(_flag('--new', 'NEW_URL') or (_pos[0] if len(_pos) > 0 else None), '--web-port', 'WEB_PORT')
PROD = _game_url(_flag('--prod', 'PROD_URL') or (_pos[1] if len(_pos) > 1 else None), '--prod-port', 'PROD_PORT')
if not NEW or not PROD:
    sys.stderr.write(
        'usage: stage_size_test.py [NEW_URL] [PROD_URL]\n'
        '   or  --new URL --prod URL\n'
        '   or  --web-port N --prod-port N\n'
        '   or  env NEW_URL/PROD_URL or WEB_PORT/PROD_PORT\n'
    )
    sys.exit(2)
print(f'STAGE_SIZE URLs new={NEW} prod={PROD}', flush=True)
# iPad stage must stay pixel-identical to 1f0aa5c. Phone chrome collapsed, so the
# phone stage is allowed to grow and must not shrink.
IPAD = {(1180, 820), (1024, 768), (820, 1180)}
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
            if (w, h) in IPAD:
                ok = abs(prod['w'] - cur['w']) <= 2 and abs(prod['h'] - cur['h']) <= 2
                name = f'stage {w}x{h} matches 1f0aa5c'
            else:
                ok = cur['w'] + 2 >= prod['w'] and cur['h'] + 2 >= prod['h']
                name = f'stage {w}x{h} did not shrink'
            if not check(name, ok, f"prod {prod['w']}x{prod['h']} now {cur['w']}x{cur['h']}"):
                failed += 1
        await browser.close()
    if failed:
        sys.exit(1)
    print('STAGE SIZE ok', flush=True)

asyncio.run(main())
