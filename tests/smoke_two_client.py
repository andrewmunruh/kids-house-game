# tests/smoke_two_client.py BROWSER OLDURL [SIZES]  (env NEWURL, OLD_DIST)
# Two-client street smoke: a new client (NEWURL) and an old 10ef736 client (OLDURL, served from
# OLD_DIST via route interception of the github.io origin) share one street at each size.
# Moved into the repo from /workspace/t-batch3/smoke2.py in Batch 9 and de-flaked:
#  - the What's-new seen flag is always written (never "only if missing") for both key prefixes, and
#    a What's-new / phone-ok popup that still shows is dismissed before any step, so it cannot cover
#    the page (390x844 WebKit "no enabled .nicks button" flake);
#  - each roster suggestion tap waits for the roster to grow before the next tap, so the street really
#    has two names and the second client always gets an enabled nickname button;
#  - join waits for an ENABLED nickname button instead of any button.
import asyncio, sys, re, os
from playwright.async_api import async_playwright
BR, OLD = sys.argv[1], sys.argv[2]
HOSTS = set()
ODIST = os.environ.get('OLD_DIST', '/workspace/t-batchB-old10/dist')
import os; NEW = os.environ["NEWURL"]
SK = "for (const p of ['','preview:']) { localStorage.setItem(p+'cozy-whatsnew','999'); localStorage.setItem(p+'avatar-intro','1'); }"
async def clear_popups(pg):
    # Belt and braces: if a What's-new or phone-ok card still shows, close it before the next step.
    for sel in ('#wnGo', '#phoneOk'):
        try:
            if await pg.locator(sel).is_visible(): await pg.click(sel, force=True); await pg.wait_for_timeout(300)
        except Exception: pass
STEP=['']
async def tap(pg, s):
    STEP[0]=s
    await pg.evaluate("s => document.querySelector(s).click()", s)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); await pg.wait_for_timeout(300); q = await pg.get_attribute('.adultCard .q', 'data-q')
    for d in q: await tap(pg, f'.adultCard [data-k="{d}"]')
    await tap(pg, '.adultCard [data-k="OK"]')
async def join(pg, code, bring):
    print('join', pg.url[:40], flush=True)
    await clear_popups(pg)
    await tap(pg, '#btnHood'); await tap(pg, '[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await tap(pg, '#codeForm button')
    STEP[0]='nicks'; await clear_popups(pg); await pg.wait_for_selector('.nicks button:not([disabled])', timeout=15000); await tap(pg, '.nicks button:not([disabled])')
    if await pg.locator('[data-m="bring"]').count(): await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    STEP[0]='map'; await pg.wait_for_selector('body.view-map .mapHouse', timeout=15000)

ROOMS=['living','kitchen','bedroom','bathroom','nursery','salon']
async def jsgo(pg, place):
    await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
    await pg.wait_for_selector('#mapWorld [data-go]', timeout=8000); await pg.wait_for_timeout(400)
    if not await pg.locator(f'#mapWorld [data-go="{place}"]').count(): return False
    await pg.evaluate("p => document.querySelector(`#mapWorld [data-go=\"${p}\"]`).click()", place); await pg.wait_for_timeout(1800); return True
async def tour(pg):
    out = {}
    async def art(): return await pg.evaluate("() => [...document.querySelectorAll('.sceneArtOn')].map(e=>(e.id||e.className.split(' ')[0])+':'+(e.dataset.sceneArt||'')).join('|') || '-'")
    try:
        await pg.evaluate("() => { const b = document.getElementById('btnHome'); if (b) b.click(); else document.querySelector('#mapWorld .mapHouse.mine').click(); }")
        await pg.wait_for_function("() => document.getElementById('street').classList.contains('hidden')", timeout=15000); await pg.wait_for_timeout(800)
        out['view'] = await pg.evaluate("document.body.className")
        for r in ROOMS:
            ok = await pg.evaluate("r => { const b=document.querySelector(`[data-room=\"${r}\"]`); if(!b) return false; b.click(); return true; }", r)
            await pg.wait_for_timeout(1300); out[r] = (await art()) if ok else 'n/a'
        await pg.evaluate("() => document.querySelector('[data-room=\"living\"]')?.click()"); await pg.wait_for_timeout(800)
        ok = await pg.evaluate("""() => { const d = document.querySelector('#layer .yardDoor'); if (!d) return false; const r = d.getBoundingClientRect();
            const o = { bubbles: true, button: 0, pointerId: 7, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
            d.dispatchEvent(new PointerEvent('pointerdown', o)); window.dispatchEvent(new PointerEvent('pointerup', o)); return true; }""")
        await pg.wait_for_timeout(1800); out['backyard'] = (await art()) if ok else 'n/a'
        await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }"); await pg.wait_for_timeout(1800); out['map'] = await art()
        for pl in ['park','ranch','gameroom']:
            out[pl] = (await art()) if await jsgo(pg, pl) else 'n/a'
            if pl == 'ranch' and out[pl] != 'n/a':
                if await pg.locator('.barnDoor').count():
                    await pg.evaluate("() => document.querySelector('.barnDoor').dispatchEvent(new MouseEvent('click',{bubbles:true}))"); await pg.wait_for_timeout(1800)
                    out['barn'] = (await art()) + (' in-barn' if await pg.evaluate("document.body.classList.contains('in-barn')") else ' NOT-in-barn')
                else: out['barn'] = 'n/a'
    except Exception as e: out['exc'] = str(e).splitlines()[0][:100]
    return out
async def main():
    rows = []
    async with async_playwright() as p:
        b = await getattr(p, BR).launch()
        for w, h in [tuple(map(int,x.split("x"))) for x in (sys.argv[3] if len(sys.argv)>3 else "820x1180,844x390,390x844").split(",")]:
            mob = w < 820 or h < 820; errs = {'new': [], 'old': []}; r = {}
            async def mk(url, who):
                c = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=mob and BR == 'chromium')
                await c.add_init_script(SK); pg = await c.new_page()
                if who == 'old':
                    import os, mimetypes
                    async def serve(route):
                        path = route.request.url.split('?')[0].split('/kids-house-game/', 1)[1] or 'index.html'
                        f = os.path.join(ODIST, path)
                        if os.path.isfile(f): await route.fulfill(path=f, content_type=mimetypes.guess_type(f)[0] or 'application/octet-stream')
                        else: await route.fulfill(status=404, body='')
                    await pg.route('https://andrewmunruh.github.io/kids-house-game/**', serve)
                pg.on('request', lambda q: HOSTS.add(q.url.split('/')[2]) if q.url.startswith('http') or q.url.startswith('ws') else None)
                pg.on('pageerror', lambda e: errs[who].append(str(e)[:120]))
                await pg.goto(url); await pg.wait_for_selector('#stage', timeout=20000); await pg.wait_for_timeout(2500)
                await clear_popups(pg)
                return c, pg
            try:
                cA, A = await mk(NEW, 'new')
                # drawer icons
                if not await A.locator('#cats').is_visible(): await A.click('#modeToggle', force=True); await A.wait_for_timeout(600)
                r['chips_before_touch'] = await A.evaluate("document.querySelectorAll('#cats .cat img.artimg').length")
                await A.dispatch_event('#cats', 'pointerdown'); await A.wait_for_timeout(2500)
                r['chips'] = await A.evaluate("[...document.querySelectorAll('#cats .cat')].filter(b=>b.querySelector('img,svg')).length + '/' + document.querySelectorAll('#cats .cat').length + ' painted=' + document.querySelectorAll('#cats .cat img.artimg').length")
                # backyard
                await A.evaluate("document.querySelector('[data-yard-go=\"backyard\"]')?.click()"); await A.wait_for_timeout(2500)
                r['yard'] = await A.evaluate("document.querySelectorAll('#layer .item img.artimg').length + '/' + document.querySelectorAll('#layer .item').length")
                # secret popup assets: painted popups ship, no faces in egg svg
                # street with old client
                await cA.close(); cA, A = await mk(NEW, 'new')
                await tap(A, '#btnHood'); await tap(A, '[data-m="create"]'); await adult(A)
                STEP[0]='newCode'; await A.wait_for_selector('#newCode'); code = (await A.inner_text('#newCode')).strip()
                await tap(A, '[data-m="setup"]'); await A.wait_for_selector('#pCode')
                STEP[0]='roster'
                for i in range(2):
                    n = await A.locator('.sugg button').count()
                    await A.locator('.sugg button').nth(0).click(force=True)
                    await A.wait_for_function("n => document.querySelectorAll('.sugg button').length < n", arg=n, timeout=10000)
                await tap(A, '.hoodSheet [data-m="close"]'); await A.wait_for_timeout(500); await join(A, code, True)
                cB, B = await mk(OLD, 'old'); await join(B, code, False); await A.wait_for_timeout(4000)
                r['map'] = await A.locator('.mapHouse').count()
                r['tourNew'] = await tour(A); r['tourOld'] = await tour(B)
                r['ok'] = r['map'] >= 2 and not errs['new'] and not errs['old']
                await cA.close(); await cB.close()
            except Exception as e: r['exc'] = STEP[0] + ' :: ' + str(e).splitlines()[0][:120]; r['ok'] = False
            r['errs'] = errs; rows.append((f'{w}x{h}', r)); print(BR, f'{w}x{h}', r, flush=True)
            await (await b.new_context()).close()
        await b.close()
    print(BR, 'hosts', sorted(HOSTS))
asyncio.run(main())
