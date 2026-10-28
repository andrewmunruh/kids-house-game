# C2 Halloween costumes: two new iPads + one un-updated 10ef736 iPad in one house, LOCAL hood only.
# usage: WEB=http://localhost:5810 OLDWEB=http://localhost:5812 HOOD=http://localhost:5811 python tests/costume_sync_test.py
# OLDWEB is the 10ef736 build (git worktree + `vite build`). Without it the old-client checks are skipped and the run fails.
import asyncio, os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5810').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', '').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5811').rstrip('/')
assert 'workers.dev' not in HOOD, 'local hood only'
SHOT = os.environ.get('COS_SHOTS', '/tmp/costume-sync-shots/'); os.makedirs(SHOT, exist_ok=True)
ENGINE = os.environ.get('ENGINE', 'webkit')
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)

async def close_sheet(pg):
    await pg.evaluate("() => { const s = document.getElementById('sheet'); if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click(); }")
    await pg.wait_for_timeout(200)

async def wear(pg, cos, solo=False):
    """Pick a costume through the avatar editor, the way a kid does it: ME on the street, the house doll when solo."""
    await close_sheet(pg)
    if solo:
        await pg.click('#stage .char'); await pg.evaluate("document.getElementById('btnDress').click()")
    else:
        await pg.evaluate("document.querySelector('.cat[data-cat=\"__people\"]')?.click()"); await pg.wait_for_timeout(200)
        await pg.click('.thing.person.me')
    await pg.wait_for_selector('#sheet:not(.hidden) .avTabs')
    await pg.click('[data-act="av-tab"][data-v="costume"]')
    await pg.click(f'[data-act="av-costume"][data-v="{cos}"]'); await pg.wait_for_timeout(150)
    await pg.click('.avDone'); await pg.wait_for_timeout(900)

# The other kid's avatar as seen on this iPad: costume id, nametag text, and whether the tag overlaps the costume headwear.
SEE = """(nick) => { const els = [...document.querySelectorAll('#layer .char.avatar:not(.mine)')];
  const el = els.find(e => (e.querySelector('.nametag')?.textContent || '').trim() === nick); if (!el) return null;
  const svg = el.querySelector('.inner svg'); const tag = el.querySelector('.nametag'); const hat = el.querySelector('[data-layer=costume-head]');
  let overlap = null;
  if (tag && hat) { const a = tag.getBoundingClientRect(), b = hat.getBoundingClientRect(); overlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) * (Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) > 0 ? 1 : 0); }
  return { cos: svg ? (svg.getAttribute('data-costume') || '') : null, tag: tag && tag.textContent.trim(), overlap, chibi: !!(svg && svg.hasAttribute('data-chibi')) }; }"""

async def main():
    async with async_playwright() as p:
        b = await getattr(p, ENGINE).launch()
        async def mk(web, vp=(820, 1180), date=None):
            c = await b.new_context(viewport={'width': vp[0], 'height': vp[1]}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN)
            if date: await c.add_init_script(f"globalThis.__costumeDate = '{date}'")
            pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}'); await pg.wait_for_timeout(800)
            return pg, errs
        (A, eA), (B, eB) = await mk(WEB), await mk(WEB, (390, 844))
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True); await join(B, code, 1, False)
        nickA = await A.evaluate("__hood().nickname || (__hood().me && __hood().me.nickname) || ''")
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(800)
        hid = await A.evaluate("__hood().myHouseId()")
        async def visit(pg):
            await pg.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await pg.wait_for_timeout(1000)
            await close_sheet(pg)
        await visit(B)
        check('B visits A house', (await B.evaluate("__ui()"))['currentHouseId'] == hid)
        if not nickA:
            seen = await B.evaluate("[...document.querySelectorAll('#layer .char.avatar:not(.mine) .nametag')].map(e => e.textContent.trim())")
            nickA = seen[0] if seen else ''
        before = await B.evaluate(SEE, nickA)
        check('no costume: B sees plain A', before and before['cos'] == '', before)
        for cos in ('witch', 'helper-mint', 'ghost', 'cat', 'skeleton', 'bat'):
            await wear(A, cos)
            mine = await A.evaluate("document.querySelector('#layer .char.avatar.mine .inner svg')?.getAttribute('data-costume')")
            seen = await B.evaluate(SEE, nickA)
            check(f'{cos}: A sees own costume', mine == cos, mine)
            check(f'{cos}: B (phone) sees it with A nametag clear', seen and seen['cos'] == cos and seen['tag'] == nickA and not seen['overlap'], seen)
            await B.screenshot(path=f'{SHOT}B-phone-sees-{cos}.png')
        await A.screenshot(path=f'{SHOT}A-ipad-bat.png')
        # A seen sitting: nametag still clears the hat
        await wear(A, 'witch')
        if OLDWEB:
            (O, eO) = await mk(OLDWEB); await join(O, code, 2, False); await visit(O)
            o = await O.evaluate(SEE, nickA)
            check('old 10ef736 client sees plain A (no costume drawn)', o and o['cos'] == '' and o['tag'] == nickA, o)
            await O.screenshot(path=f'{SHOT}old-client-sees-plain.png')
            # the old client edits its own look; the server keeps A's costume and B still sees it
            await O.wait_for_timeout(500)
            seen = await B.evaluate(SEE, nickA)
            check('after old client joins, B still sees witch', seen and seen['cos'] == 'witch', seen)
            check('old client: no page errors', not eO, eO)
            # old client keeps the costume field in a save it loads and writes back
            ctx = await b.new_context(viewport={'width': 820, 'height': 1180}); await ctx.add_init_script(SKIP_WN)
            S = await ctx.new_page(); se = []; S.on('pageerror', lambda e: se.append(str(e)))
            await S.goto(f'{WEB}/kids-house-game/'); await S.wait_for_selector('#stage .char'); await S.wait_for_timeout(500)
            await wear(S, 'ghost', solo=True); await S.wait_for_timeout(600)
            saved = json.loads(await S.evaluate("localStorage.getItem('cozy-house')"))
            await S.goto(f'{OLDWEB}/kids-house-game/')  # different origin: copy the save over
            await S.evaluate("s => localStorage.setItem('cozy-house', s)", json.dumps(saved)); await S.reload(); await S.wait_for_selector('#stage .char'); await S.wait_for_timeout(600)
            plain = await S.evaluate("document.querySelector('#stage .char .inner svg')?.getAttribute('data-costume')")
            check('old client draws the plain avatar', plain is None, plain)
            await S.screenshot(path=f'{SHOT}old-client-own-save-plain.png')
            await S.evaluate("__store.dispatch({type:'char/move', id:'c1', room:'living', x:900, y:540})"); await S.wait_for_timeout(700)
            back = json.loads(await S.evaluate("localStorage.getItem('cozy-house')"))
            check('old client write keeps costume field, save v3', back['characters'][0].get('costume') == 'ghost' and back.get('version') == 3, back['characters'][0].get('costume'))
            check('old client save: no page errors', not se, se)
        else:
            check('OLDWEB set (old-client test)', False)
        # outside Oct 24 - Nov 2 a new client draws the plain kid; the field is kept
        (C, eC) = await mk(WEB, date='2026-07-04'); await join(C, code, 3, False); await visit(C)
        c = await C.evaluate(SEE, nickA)
        check('off-season client draws plain A', c and c['cos'] == '', c)
        await wear(A, '')
        seen = await B.evaluate(SEE, nickA)
        check('no costume again: B sees plain A', seen and seen['cos'] == '', seen)
        check('new clients: no page errors', not eA and not eB and not eC, (eA, eB, eC))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} checks passed")
    sys.exit(0 if res and all(res.values()) else 1)
asyncio.run(main())
