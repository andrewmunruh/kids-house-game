# Trick-or-treat on a throwaway street of 3 houses: two new iPads + one un-updated 10ef736 iPad.
# LOCAL servers only. usage: python tests/trick_or_treat_sync_test.py
#   env WEB=http://localhost:5701 OLDWEB=http://localhost:5702 HOOD=http://localhost:5700 TOT_SHOTS=shots/
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5701').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', '').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5700').rstrip('/')
assert 'workers.dev' not in HOOD and 'workers.dev' not in WEB, 'local only'
SHOT = os.environ.get('TOT_SHOTS', 'shots/'); os.makedirs(SHOT, exist_ok=True)
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)

BUCKET = "() => { const b = document.querySelector('#candyBucket b'); return b ? Number(b.textContent) : null; }"
TOASTS = "() => document.querySelector('#toastLane')?.textContent || ''"

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk(web, vp=(820, 1180), q='&halloween=1'):
            c = await b.new_context(viewport={'width': vp[0], 'height': vp[1]}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}{q}'); await pg.wait_for_timeout(800)
            return pg, errs
        (A, eA), (B, eB) = await mk(WEB), await mk(WEB)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, False); await join(B, code, 1, False)
        Old = eOld = None
        if OLDWEB:
            Old, eOld = await mk(OLDWEB); await join(Old, code, 2, False)
        await B.wait_for_timeout(900)
        hA = await A.evaluate("__hood().myHouseId()")
        n_houses = await B.evaluate("document.querySelectorAll('#mapWorld .mapHouse').length")
        check('throwaway street has 2-3 houses', n_houses == (3 if OLDWEB else 2), n_houses)
        n_knock = await B.evaluate("document.querySelectorAll('#mapWorld .mapKnock').length")
        check('a knock pumpkin on every neighbor, none on her own house', n_knock == n_houses - 1 and await B.evaluate("!document.querySelector('.mapHouse.mine + .mapMail + .mapKnock')"), n_knock)
        start = await B.evaluate(BUCKET)
        check('candy bucket shows on the street', start == 0, start)
        await B.screenshot(path=f'{SHOT}tot-street-820x1180.png')
        sel = f'#mapWorld .mapKnock[data-knock="{hA}"]'
        for i in range(3):
            await B.click(sel); await B.wait_for_timeout(250)
        check('every knock gives a treat (3 knocks -> 3)', await B.evaluate(BUCKET) == 3, await B.evaluate(BUCKET))
        await A.wait_for_timeout(700)
        t = await A.evaluate(TOASTS)
        check('the neighbor sees "... came trick-or-treating!" once, not stacked', t.count('came trick-or-treating!') == 1, t)
        await A.screenshot(path=f'{SHOT}tot-owner-note-820x1180.png')
        check('the knocker stays on the street (no failure, no detour)', await B.evaluate("document.body.classList.contains('view-map')"))
        await B.screenshot(path=f'{SHOT}tot-after-knocks-820x1180.png')
        if Old:
            hOld = await Old.evaluate("__hood().myHouseId()")
            await B.click(f'#mapWorld .mapKnock[data-knock="{hOld}"]'); await B.wait_for_timeout(800)
            check('knocking at the old client still gives a treat', await B.evaluate(BUCKET) == 4)
            check('the old client gets no note and no error', 'trick-or-treating' not in await Old.evaluate(TOASTS) and not eOld, eOld)
            check('the old client still loads the street and has no bucket', await Old.evaluate("!!document.querySelector('.mapHouse') && !document.querySelector('#candyBucket')"))
        await B.reload(); await B.wait_for_timeout(1500)
        check('the bucket count stays after a reload', await B.evaluate(BUCKET) == (4 if Old else 3))
        await B.evaluate(f"document.querySelector('#mapWorld .mapHouse[data-go=\"house:{hA}\"]').click()"); await B.wait_for_timeout(900)
        check('tapping the house itself still opens it', (await B.evaluate("__ui()"))['currentHouseId'] == hA)
        # phone size, solo throwaway street
        P, eP = await mk(WEB, (390, 844), '&halloween=1')
        await P.goto(f'{WEB}/kids-house-game/?halloween=1'); await P.wait_for_timeout(800)
        await P.evaluate("document.querySelector('#btnMap').click()"); await P.wait_for_timeout(700)
        await P.evaluate("__mapFake(3)"); await P.wait_for_timeout(600)
        if await P.is_visible('#phoneOk'): await P.click('#phoneOk'); await P.wait_for_timeout(300)
        await P.screenshot(path=f'{SHOT}tot-street-390x844.png')
        check('phone: bucket and knock pumpkins render', await P.evaluate("!!document.querySelector('#candyBucket') && document.querySelectorAll('.mapKnock').length >= 1"))
        Off, _ = await mk(WEB, q='&halloween=0')
        await Off.evaluate("document.querySelector('#btnMap').click()"); await Off.wait_for_timeout(700); await Off.evaluate("__mapFake(3)")
        check('out of season: no pumpkins, no bucket', await Off.evaluate("!document.querySelector('.mapKnock') && !document.querySelector('#candyBucket')"))
        check('no page errors on new clients', not eA and not eB and not eP, eA + eB + eP)
        await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f"\n{len(res) - len(bad)}/{len(res)} checks passed"); sys.exit(1 if bad else 0)

asyncio.run(main())
