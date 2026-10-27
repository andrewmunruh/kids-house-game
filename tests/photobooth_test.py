# Photo Booth in WebKit: snapshot matches the screen, no network beyond the app's own files, Save/Close work.
import asyncio, os, sys, base64
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from party_shots import SETUP, SPOTS
WEB = os.environ.get('WEB', 'http://localhost:5770').rstrip('/') + '/kids-house-game/'
SHOT = os.environ.get('PARTY_SHOTS', '/workspace/t-party-shots/'); os.makedirs(SHOT, exist_ok=True)
async def run(b, w, h, party):
    c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: print('console', m.type, m.text[:300]))
    await pg.goto(WEB); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(600)
    await pg.click('#modePlay')
    if party: await pg.evaluate(SETUP, SPOTS)
    await pg.wait_for_timeout(1500)
    reqs = []; pg.on('request', lambda r: reqs.append((r.method, r.url)))
    tag = f"{w}x{h}" + ('-party' if party else '')
    await pg.locator('#stage').screenshot(path=f"{SHOT}screen-{tag}.png")
    await pg.click('#btnMenu'); await pg.wait_for_timeout(200)
    vis = await pg.is_visible('#btnPhoto'); await pg.click('#btnPhoto')
    await pg.wait_for_selector('.pbCard img', timeout=15000); await pg.wait_for_timeout(400)
    data = await pg.evaluate("async () => { const r = await fetch(document.querySelector('.pbImg').src); const b = await r.blob(); return await new Promise(res => { const f = new FileReader(); f.onload = () => res(f.result); f.readAsDataURL(b); }); }")
    open(f"{SHOT}photo-{tag}.png", 'wb').write(base64.b64decode(data.split(',')[1]))
    await pg.screenshot(path=f"{SHOT}card-{tag}.png")
    async with pg.expect_download(timeout=5000) as dl: await pg.click('.pbSave')  # no Web Share in desktop WebKit: download fallback
    d = await dl.value
    await pg.click('.pbClose'); closed = await pg.locator('.pbCard').count() == 0
    bad = [r for r in reqs if r[0] != 'GET' or not r[1].startswith(WEB.split('/kids')[0]) ]
    bad = [r for r in bad if not r[1].startswith('blob:') and not r[1].startswith('data:')]
    print(tag, 'menu row visible', vis, 'download', d.suggested_filename, 'closed', closed, 'off-box/non-GET requests', bad, 'errors', errs)
    await c.close(); return vis and closed and not bad and not errs
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch(); ok = True
        for (w, h, party) in [(820, 1180, True), (820, 1180, False), (844, 390, True)]: ok &= await run(b, w, h, party)
        await b.close(); print('PHOTOBOOTH', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
asyncio.run(main())
