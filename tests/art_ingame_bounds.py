# In-game size check for painted items (App Builder's QA method, artnc133-qa/n.py).
# Each item is placed in a room, everything else is hidden, and the item is
# screenshotted twice: ?art=v1 (SVG, shadow ellipse hidden) and the raster. The
# alpha>0 box of each (out to the faintest visible pixel) is compared.
# usage: python tests/art_ingame_bounds.py <base url> <room> [kind ...]  [TOL=2.0, WARN_TOL=3.0 (%), ALPHA=0, SKY=day|night]
#   e.g.  npx vite --port 5191 --strictPort &  python tests/art_ingame_bounds.py http://localhost:5191/kids-house-game/ nursery
# Prints dw/dh (% raster vs SVG), feet (bottom-edge offset) and cx (centre offset), both in % of item width.
import asyncio, io, json, os, sys
from PIL import Image
from playwright.async_api import async_playwright

LAYOUTS = {'nursery': [
    ('cloud-rug', 1450, 595, -5), ('crib-mobile', 1100, 230, 0), ('moon-art', 1300, 250, 0), ('nursery-curtains', 1650, 300, 0),
    ('toy-bin', 880, 560, 1), ('crib', 1110, 545, 1), ('changing-table', 1420, 540, 1), ('nursery-dresser', 1720, 540, 1),
    ('nursery-lamp', 1720, 402, 2), ('rocker', 1960, 565, 2), ('play-mat', 1420, 595, -5), ('night-light', 880, 585, 1),
    ('baby-shelf', 1010, 540, 1), ('music-box', 1110, 595, 2), ('bassinet', 1230, 560, 1), ('rattle', 1310, 598, 3),
    ('doll-rose', 1370, 585, 3), ('doll-honey', 1450, 585, 3), ('doll-cocoa', 1530, 585, 3), ('baby-bottle', 1590, 598, 3),
    ('rocking-horse', 1700, 570, 2), ('bunny-plush', 1820, 585, 3), ('stacking-rings', 1900, 588, 3), ('blocks', 1970, 585, 3)]}
HIDE = ("html,body,#app,.stage,#stage,#stage *{background:transparent!important} body *{visibility:hidden!important} "
        ".item.qa-show,.item.qa-show *{visibility:visible!important} .item.qa-show .artshade{visibility:hidden!important} "
        ".item.qa-show svg ellipse[fill=\"#000\"]{display:none!important} "
        ".item.qa-show .inner{filter:none!important;animation:none!important;transform:none!important}")
TOL = float(os.environ.get('TOL', '2.0'))       # pass within ±TOL
WARN_TOL = float(os.environ.get('WARN_TOL', '3.0'))  # WARN above TOL up to ±WARN_TOL, FAIL beyond
TH = int(os.environ.get('ALPHA', '0'))
# The room's sky follows the browser clock (src/sky.ts), and night/golden filters change what
# is drawn, so the clock and timezone are pinned: SKY=day (default, 12:00) or SKY=night (23:00),
# both in UTC, whatever the host clock or TZ says.
SKY = os.environ.get('SKY', 'day')
SKY_TIME = {'day': '2026-06-15T12:00:00Z', 'night': '2026-06-15T23:00:00Z'}[SKY]
# At night the hidden neighbours' night-ink filter leaks faint alpha into each clip, so it is
# switched off for every item and pet; lights (.is-light) glow over their whole clip on both
# sides, so at night they are listed as not measurable instead of compared.
NIGHT_HIDE = " .item .inner,.pet .inner{filter:none!important}" if SKY == 'night' else ""


async def boxes(b, base, room, layout):
    ctx = await b.new_context(viewport={'width': 1180, 'height': 820}, device_scale_factor=2, timezone_id='UTC')
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999');")
    pg = await ctx.new_page()
    await pg.clock.set_fixed_time(SKY_TIME)
    await pg.goto(base, wait_until='load'); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(600)
    for sel in ['#phoneOk', '.whatsNew .wnGo']:
        if await pg.locator(sel).count() and await pg.locator(sel).first.is_visible():
            await pg.locator(sel).first.click(force=True); await pg.wait_for_timeout(150)
    await pg.evaluate("""([R,L])=>{const s=__store; s.dispatch({type:'room/switch',room:R});
      for(const it of [...s.get().rooms[R].items]) s.dispatch({type:'item/delete',room:R,id:it.id});
      for(const [k,x,y,z] of L) s.dispatch({type:'item/add',room:R,item:{id:'qa-'+k,kind:k,x,y,flip:false,z,scale:1}});}""",
                      [room, [list(t) for t in layout]])
    await pg.wait_for_timeout(1200)
    # Pack items draw their SVG through <img class="packimg">, so the CSS rule that hides the
    # floor-shadow ellipse cannot reach inside it. Swap each pack SVG for a copy without it
    # (the raster side hides .artshade, so both sides are measured without a shadow).
    await pg.evaluate(r"""async()=>{for(const im of document.querySelectorAll('.item img.packimg')){
      if(!/\.svg(\?|$)/.test(im.src)) continue;
      const t=await (await fetch(im.src)).text();
      const c=t.replace(/<ellipse[^>]*fill="#000"[^>]*\/?>(<\/ellipse>)?/g,'');
      await new Promise(r=>{im.onload=r;im.onerror=r;im.src=URL.createObjectURL(new Blob([c],{type:'image/svg+xml'}));});}}""")
    await pg.add_style_tag(content=HIDE + NIGHT_HIDE)
    out = {}
    for k, x, y, z in layout:
        await pg.evaluate(f"__cam.set({x}-500)"); await pg.wait_for_timeout(250)
        el = pg.locator(f'.item[data-id="qa-{k}"]')
        await el.evaluate("e=>e.classList.add('qa-show')"); await pg.wait_for_timeout(100)
        light = await el.evaluate("e=>e.classList.contains('is-light')")
        bx = await el.bounding_box()
        png = await pg.screenshot(clip={'x': bx['x'] - 20, 'y': bx['y'] - 40, 'width': bx['width'] + 40, 'height': bx['height'] + 60}, omit_background=True)
        bb = Image.open(io.BytesIO(png)).convert('RGBA').split()[3].point(lambda v: 255 if v > TH else 0).getbbox()
        out[k] = dict(l=bb[0] / 2, r=bb[2] / 2, t=bb[1] / 2, b=bb[3] / 2, w=bx['width'], light=light)
        await el.evaluate("e=>e.classList.remove('qa-show')")
    await ctx.close()
    return out


async def main():
    base, room = sys.argv[1], sys.argv[2]
    if room in LAYOUTS:
        layout = LAYOUTS[room]
        if sys.argv[3:]:
            layout = [t for t in layout if t[0] in sys.argv[3:]]
    else:   # any other room: list the kinds; each is placed and measured on its own
        layout = [(k, 1100 + 150 * (i % 6), 560, 1) for i, k in enumerate(sys.argv[3:])]
    async with async_playwright() as p:
        b = await p.chromium.launch()
        svg = await boxes(b, base + '?art=v1', room, layout)
        ai = await boxes(b, base, room, layout)
        await b.close()
    fails, warns, rows, skipped = 0, 0, [], []
    for k, *_ in layout:
        s, a = svg[k], ai[k]
        if SKY == 'night' and (s['light'] or a['light']):
            skipped.append(k)
            rows.append(dict(kind=k, status='SKIP', reason='light glow at night'))
            print(f"SKIP {k:18} light: its glow fills the clip at night (not measurable)", flush=True)
            continue
        dw = ((a['r'] - a['l']) / (s['r'] - s['l']) - 1) * 100
        dh = ((a['b'] - a['t']) / (s['b'] - s['t']) - 1) * 100
        feet = (a['b'] - s['b']) / s['w'] * 100
        cx = ((a['l'] + a['r']) / 2 - (s['l'] + s['r']) / 2) / s['w'] * 100
        worst = max(round(abs(dw), 1), round(abs(dh), 1))   # exactly ±TOL passes, exactly ±WARN_TOL warns
        status = 'OK' if worst <= TOL else 'WARN' if worst <= WARN_TOL else 'FAIL'
        fails += status == 'FAIL'; warns += status == 'WARN'
        rows.append(dict(kind=k, dw=round(dw, 1), dh=round(dh, 1), feet=round(feet, 1), cx=round(cx, 1), ok=status == 'OK', status=status))
        print(f"{status} {k:18} dw={dw:+5.1f}% dh={dh:+5.1f}% feet={feet:+4.1f}% cx={cx:+4.1f}%", flush=True)
    if os.environ.get('JSON'):
        json.dump(rows, open(os.environ['JSON'], 'w'), indent=1)
    n = len(rows) - len(skipped)
    print(f"pass {n - fails - warns}, warn {warns}, fail {fails} of {n} measured (pass ±{TOL}%, warn ±{WARN_TOL}%) at alpha>{TH} sky={SKY}"
          + (f"; not measurable at night (lights): {len(skipped)} {' '.join(skipped)}" if skipped else ''))
    return 1 if fails else 0

if __name__ == '__main__':
    sys.exit(asyncio.run(main()))
