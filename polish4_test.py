# Polish batch 4 checks. Needs the preview (default :4173) and a hood (HOOD, default :8787).
#   python polish4_test.py [--web-port N]
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = sys.argv[sys.argv.index('--web-port') + 1] if '--web-port' in sys.argv else '4173'
HOOD = os.environ.get('HOOD', 'http://localhost:8787').rstrip('/')
URL = f'http://localhost:{WEB}/kids-house-game/?hood={HOOD}'
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
CLEAR = "document.querySelectorAll('.whatsNew').forEach(e=>e.remove());document.getElementById('phoneOk')?.click()"
MAILHIT = """(()=>{const e=document.querySelector('#street .mapMail');if(!e)return -1;const r=e.getBoundingClientRect();const cx=r.x+r.width/2,cy=r.y+r.height/2;let n=0;
for(const [dx,dy] of [[-21,0],[21,0],[0,-21],[0,21]]){const t=document.elementFromPoint(cx+dx,cy+dy);if(t&&(t===e||e.contains(t)||t.closest('.mapFace.mine')))n++}return n})()"""
async def page(b, w, h, wn=True):
    ctx = await b.new_context(viewport={'width': w, 'height': h}, is_mobile=w < 600 or h < 500, has_touch=True)
    if wn: await ctx.add_init_script(SKIP_WN)
    pg = await ctx.new_page(); await pg.goto(URL); await pg.wait_for_timeout(1200); return ctx, pg
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in [(1180, 820), (1024, 768)]:
            ctx, pg = await page(b, w, h); await pg.evaluate(CLEAR)
            x0 = await pg.evaluate("document.getElementById('modePlay').getBoundingClientRect().x")
            await pg.evaluate("const c=[...document.querySelectorAll('#cats .cat.pack')];c[c.length-1].click();c[c.length-1].scrollIntoView({inline:'end'})"); await pg.wait_for_timeout(400)
            x1 = await pg.evaluate("document.getElementById('modePlay').getBoundingClientRect().x")
            rf = await pg.evaluate("document.getElementById('roomFilter').getBoundingClientRect().x")
            check(f'{w}x{h} Play/Decorate and All rooms stay put after the last pack', abs(x1 - x0) < 1 and rf > 0, f'play {x0}->{x1} rooms {rf}')
            await ctx.close()
        ctx, pg = await page(b, 820, 1180); await pg.evaluate(CLEAR)
        par = await pg.evaluate("document.getElementById('modeToggle').parentElement.className")
        check('820x1180 keeps Play/Decorate leading the wrapping chip row', 'drawerTop' in par, par)
        await ctx.close()
        ctx, pg = await page(b, 390, 844); await pg.evaluate(CLEAR)
        await pg.evaluate("document.getElementById('modePlay').click()"); await pg.wait_for_timeout(800)
        sh = await pg.evaluate("document.getElementById('stage').getBoundingClientRect().height")
        check('390x844 Play stage uses the tall box', sh >= 450, f'h={sh:.0f}')
        await pg.evaluate("document.getElementById('modeDecorate').click()"); await pg.wait_for_timeout(400)
        await pg.evaluate("const r=document.querySelector('.drawerTop');r.scrollLeft=r.scrollWidth;r.dispatchEvent(new Event('scroll'))"); await pg.wait_for_timeout(300)
        mask = await pg.evaluate("getComputedStyle(document.querySelector('.drawerTop')).webkitMaskImage||getComputedStyle(document.querySelector('.drawerTop')).maskImage")
        check('phone pack row fades the left edge once scrolled', 'gradient' in mask, mask[:40])
        await pg.evaluate("document.getElementById('btnMenu')?.click()"); await pg.wait_for_timeout(300)
        heads = await pg.evaluate("[...document.querySelectorAll('#menuPop .menuGroup')].map(e=>e.textContent)")
        check('Menu has no iPad-only heading on a phone', not any('ipad' in t.lower() for t in heads), heads)
        await ctx.close()
        ctx, pg = await page(b, 390, 844, wn=False); await pg.wait_for_timeout(300)
        txt = await pg.evaluate("document.body.innerText")
        check('welcome card points at the Menu for pets', 'Tap the paw' not in txt and 'Open the Menu' in txt)
        await ctx.close()
        for w, h in [(390, 844), (820, 1180), (844, 390)]:
            ctx, pg = await page(b, w, h); await pg.evaluate(CLEAR + ";document.getElementById('btnMap').click()"); await pg.wait_for_timeout(1200)
            n = await pg.evaluate(MAILHIT)
            check(f'{w}x{h} mailbox tap pad reaches 21px each way', n == 4, f'{n}/4')
            await ctx.close()
        await b.close()
    ok = sum(res.values()); print(f'{ok}/{len(res)} checks passed'); sys.exit(0 if ok == len(res) else 1)
asyncio.run(main())
