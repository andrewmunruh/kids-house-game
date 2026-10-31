# Built-in living-room window (no Window placed): painted any/window.webp vs the vector one,
# same method as art_ingame_bounds.py (everything else hidden, alpha>0 box, ?art=v1 for the vector).
# usage: python tests/scene_window_bounds.py <base url>  [SKY=day|night] [TOL=3.0]
import asyncio, io, os, sys
from PIL import Image
from playwright.async_api import async_playwright
SKY = os.environ.get('SKY', 'day'); TOL = float(os.environ.get('TOL', '3.0'))
T = {'day': '2026-06-15T12:00:00Z', 'night': '2026-06-15T23:00:00Z'}[SKY]
HIDE = ("html,body,#app,.stage,#stage,#stage *{background:transparent!important} body *{visibility:hidden!important} "
        ".sceneWin,.sceneWin *{visibility:visible!important} .sceneWin::after{display:none!important} .sceneWin .artnight{display:none!important}")
async def box(b, url):
    ctx = await b.new_context(viewport={'width': 1180, 'height': 820}, device_scale_factor=2, timezone_id='UTC')
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999');")
    pg = await ctx.new_page(); await pg.clock.set_fixed_time(T)
    await pg.goto(url); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(1500)
    await pg.evaluate("()=>{const s=__store,R='living'; s.dispatch({type:'room/switch',room:R}); for(const it of [...s.get().rooms[R].items]) if(/window|curtain/.test(it.kind)) s.dispatch({type:'item/delete',room:R,id:it.id});}")
    await pg.wait_for_timeout(1500)
    cls = await pg.evaluate("()=>document.querySelector('.sceneWin')?.className")
    await pg.add_style_tag(content=HIDE); await pg.wait_for_timeout(300)
    r = await pg.evaluate("()=>{const b=document.querySelector('.sceneWin').getBoundingClientRect(); return {x:b.left-40,y:b.top-40,width:b.width+80,height:b.height+80}}")
    im = Image.open(io.BytesIO(await pg.screenshot(clip=r, omit_background=True))).convert('RGBA')
    await ctx.close(); return cls, im.split()[-1].point(lambda a: 255 if a > 0 else 0).getbbox()
async def main():
    base = sys.argv[1]; sep = '&' if '?' in base else '?'
    async with async_playwright() as p:
        b = await p.webkit.launch()
        cv, v = await box(b, base + sep + 'art=v1'); cp, r = await box(b, base); await b.close()
    vw, vh, rw, rh = v[2]-v[0], v[3]-v[1], r[2]-r[0], r[3]-r[1]
    dw, dh = (rw/vw-1)*100, (rh/vh-1)*100; feet = (r[3]-v[3])/vw*100; cx = ((r[0]+r[2])-(v[0]+v[2]))/2/vw*100
    print(f'vector {cv} {v}  painted {cp} {r}')
    ok = 'painted' in (cp or '') and 'painted' not in (cv or '')
    print(f"{'OK' if ok and abs(dw)<=TOL and abs(dh)<=TOL else 'FAIL'} scene window sky={SKY} dw={dw:+.1f}% dh={dh:+.1f}% feet={feet:+.1f}% cx={cx:+.1f}%")
    sys.exit(0 if ok and abs(dw) <= TOL and abs(dh) <= TOL else 1)
asyncio.run(main())
