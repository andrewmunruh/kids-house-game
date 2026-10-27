# Photo Booth in WebKit: snapshot matches the screen, no network beyond the app's own files, Save/Close work.
import asyncio, os, sys, base64
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from party_shots import SETUP, SPOTS
WEB = os.environ.get('WEB', 'http://localhost:5770').rstrip('/') + '/kids-house-game/'
SHOT = os.environ.get('PARTY_SHOTS', '/workspace/t-party-shots/'); os.makedirs(SHOT, exist_ok=True)
EDGE = """() => { const s = __store, room = s.get().currentRoom, stage = document.getElementById('stage'), wr = document.getElementById('world').getBoundingClientRect();
  const sr = stage.getBoundingClientRect(), wrap = stage.parentElement.getBoundingClientRect(), right = Math.min(sr.right, wrap.right, innerWidth);
  const x = Math.round((right - wr.left) * 2400 / wr.width) - 70;
  s.dispatch({type:'char/add', char:{skin:'#c98e64', hair:'#2b1d14', hairStyle:2, shirt:'#ffd166', pants:'#6b8cff', size:'kid', acc:0, flip:true, held:{left:null, right:null}, room, id:'ptedge', x, y:588}}); }"""
# Every doll she can partly see on screen must be fully inside the visible stage (what the photo captures).
INFRAME = """() => { const stage = document.getElementById('stage'), sr = stage.getBoundingClientRect(), w = stage.parentElement.getBoundingClientRect();
  const v = {l: Math.max(sr.left, w.left, 0), t: Math.max(sr.top, w.top, 0), r: Math.min(sr.right, w.right, innerWidth), b: Math.min(sr.bottom, w.bottom, innerHeight)};
  const out = [...document.querySelectorAll('.char')].map(e => [e.dataset.cid, e.getBoundingClientRect()]).filter(([, r]) => r.right > v.l && r.left < v.r)
    .filter(([, r]) => r.left < v.l - 1 || r.right > v.r + 1 || r.top < v.t - 1 || r.bottom > v.b + 1).map(([id, r]) => [id, Math.round(r.right - v.r), Math.round(r.bottom - v.b)]);
  // The edge doll stands at the right/bottom of the play area she can see: it must be wholly on screen (so wholly in the photo).
  // Others past the screen edge are cut on screen too (the room scrolls); the photo matches the screen, so they are listed only.
  const edge = !!document.querySelector('.char[data-cid="ptedge"]'); return {ok: !out.some(([id]) => id === 'ptedge'), edge, cut: out}; }"""
def check_photo(photo, screen):
    """flush: the picture meets the frame with no pale strip; diff: the picture matches the on-screen stage."""
    from PIL import Image, ImageChops, ImageStat
    im = Image.open(photo).convert('RGB'); W, H = im.size
    # Scene rect inside the frame: scan the middle row and column for the plum stage border.
    plum = lambda p: abs(p[0] - 90) < 14 and abs(p[1] - 61) < 14 and abs(p[2] - 92) < 14
    # framePhoto: pad = round(26k), foot = round(64k), k = scene width / 600.
    sw = next(w for w in range(W, 0, -1) if w + 2 * round(26 * w / 600) == W); k = sw / 600
    pad, foot = round(26 * k), round(64 * k); l, t, r, b = pad, pad, W - pad - 1, H - foot - 1
    # Just outside each picture corner (diagonally past the rounded border) must be frame gradient, not a pale page strip.
    def pale(p): return min(p) > 200 and max(p) - min(p) < 40 and not (p[0] > 240 and p[2] < 225)
    ok = True
    # Inside the scene rect but outside its rounded corner, the frame gradient must show through: compare with a frame pixel just outside.
    # Walk each corner's diagonal inward from the scene rect's corner: every pixel before the plum border must be frame gradient
    # (like the frame pixel just outside), never a pale strip of page behind the rounded corner.
    for (x0, y0, sx, sy) in [(r, t, -1, 1), (r, b, -1, -1), (l, b, 1, -1), (l, t, 1, 1)]:
        ref = im.getpixel((x0 - sx * 4, y0 - sy * 4))
        for i in range(0, 60):
            a = im.getpixel((x0 + sx * i, y0 + sy * i))
            if plum(a) or sum(abs(a[j] - ref[j]) for j in range(3)) > 40 and i > 2 and plum(im.getpixel((x0 + sx * (i + 2), y0 + sy * (i + 2)))): break
            if sum(abs(a[j] - ref[j]) for j in range(3)) > 40: ok = False; print('  strip at corner', (x0, y0), 'step', i, a, 'vs frame', ref); break
    sc = Image.open(screen).convert('RGB').resize((r - l + 1, b - t + 1)); pic = im.crop((l, t, r + 1, b + 1))
    diff = sum(ImageStat.Stat(ImageChops.difference(sc, pic)).mean) / 3
    return ok, diff
async def run(b, w, h, party):
    c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: print('console', m.type, m.text[:300]))
    await pg.goto(WEB); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(600)
    ok_btn = pg.get_by_text('OK!', exact=True)
    if await ok_btn.count() and await ok_btn.first.is_visible(): await ok_btn.first.click(); await pg.wait_for_timeout(300)  # 'Turn sideways' tip on portrait phones
    await pg.click('#modePlay')
    if party:
        await pg.evaluate(SETUP, SPOTS); await pg.wait_for_timeout(300)
        # One more doll at the right/bottom of what she can see: feet on the floor's last row (ROOM_H = 600).
        await pg.evaluate(EDGE)
    await pg.wait_for_timeout(1500)
    inframe = await pg.evaluate(INFRAME)
    reqs = []; pg.on('request', lambda r: reqs.append((r.method, r.url)))
    tag = f"{w}x{h}" + ('-party' if party else '')
    await pg.locator('#stage').screenshot(path=f"{SHOT}screen-{tag}.png")
    await pg.click('#btnMenu'); await pg.wait_for_timeout(200)
    vis = await pg.is_visible('#btnPhoto'); await pg.click('#btnPhoto')
    await pg.wait_for_selector('.pbCard img', timeout=15000); await pg.wait_for_timeout(400)
    data = await pg.evaluate("async () => { const r = await fetch(document.querySelector('.pbImg').src); const b = await r.blob(); return await new Promise(res => { const f = new FileReader(); f.onload = () => res(f.result); f.readAsDataURL(b); }); }")
    open(f"{SHOT}photo-{tag}.png", 'wb').write(base64.b64decode(data.split(',')[1]))
    await pg.screenshot(path=f"{SHOT}card-{tag}.png")
    flush, diff = check_photo(f"{SHOT}photo-{tag}.png", f"{SHOT}screen-{tag}.png")
    async with pg.expect_download(timeout=5000) as dl: await pg.click('.pbSave')  # no Web Share in desktop WebKit: download fallback
    d = await dl.value
    await pg.click('.pbClose'); closed = await pg.locator('.pbCard').count() == 0
    bad = [r for r in reqs if r[0] != 'GET' or not r[1].startswith(WEB.split('/kids')[0]) ]
    bad = [r for r in bad if not r[1].startswith('blob:') and not r[1].startswith('data:')]
    print(tag, 'dolls in frame', inframe, 'flush', flush, 'photo-vs-screen diff', round(diff, 1))
    print(tag, 'menu row visible', vis, 'download', d.suggested_filename, 'closed', closed, 'off-box/non-GET requests', bad, 'errors', errs)
    await c.close(); return vis and closed and not bad and not errs and (inframe['ok'] and inframe['edge'] if party else True) and flush and diff < 18
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch(); ok = True
        for (w, h, party) in [(820, 1180, True), (820, 1180, False), (844, 390, True), (390, 844, True)]: ok &= await run(b, w, h, party)
        await b.close(); print('PHOTOBOOTH', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
asyncio.run(main())
