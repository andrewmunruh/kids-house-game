# First-run doll (WebKit, local only, every *workers.dev request aborted):
#  1 seeded saves (old v3 10ef736 save, classic first-run c1 save, a save with look2) are byte-identical after a no-edit session
#  2 backup-only house (no cozy-house, good classic cozy-house-bak) opens the backup and stays classic
#  3 a fresh automated (webdriver) run draws the fixed starter (data-chibi="1"); after the first edit the stored c1 has look2 eyes 'sparkle'
#  4 old client (10ef736 build, OLD_URL) opens that starter house, edits it with no page errors, keeps look2, and only the edited field changes
#  5 house reset gives the starter look (shots before/after reset)
# usage: python tests/firstrun_doll_test.py URL [OLD_URL] [SHOT_DIR]
import asyncio, sys, os, json
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import PFX
URL = sys.argv[1]; OLD_URL = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else ''; SHOT = sys.argv[3] if len(sys.argv) > 3 else ''
HOUSE, BAK = PFX + 'cozy-house', PFX + 'cozy-house-bak'
ROOT = os.path.dirname(os.path.abspath(__file__))
G = lambda n: json.load(open(f'{ROOT}/fixtures/firstrun_golden/{n}.json'))['input']
OLD10 = open(f'{ROOT}/fixtures/save_v3_old10.json').read().strip()
fails = 0; hits = []
def check(name, ok, extra=''):
    global fails
    if not ok: fails += 1
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
INIT = f"localStorage.getItem('{PFX}cozy-whatsnew') || localStorage.setItem('{PFX}cozy-whatsnew', '999'); localStorage.setItem('{PFX}avatar-intro', '1');"
EDIT = "c => window.__store.dispatch({ type: 'room/wallpaper', room: 'living', color: c })"
DOLL = "() => { const c = document.querySelector('#layer .char svg'); return c ? (c.getAttribute('data-chibi') || 'classic') : null; }"
async def fresh(b, url, w=820, h=1180):
    ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, service_workers='block')
    await ctx.route('**/*workers.dev*', lambda r: (hits.append(r.request.url), asyncio.ensure_future(r.abort())))
    await ctx.add_init_script(INIT); pg = await ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    origin = url.split('/kids-house-game/')[0]
    await pg.goto(origin + '/no-such-page-for-seeding'); return ctx, pg, errs
async def seed(pg, kv): await pg.evaluate("kv => { for (const [k, v] of Object.entries(kv)) v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); }", kv)
async def open_game(pg, url, wait=2500):
    await pg.goto(url); await pg.wait_for_function("() => !!window.__store", timeout=20000); await pg.wait_for_timeout(wait)
async def get(pg, k): return await pg.evaluate("k => localStorage.getItem(k)", k)
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        try:
            for name, raw in [('old v3 (10ef736) save', OLD10), ('classic first-run c1 save', json.dumps(G('classic_c1'))), ('save with look2', json.dumps(G('with_look2')))]:
                ctx, pg, errs = await fresh(b, URL); await seed(pg, {HOUSE: raw}); await open_game(pg, URL, 5000)
                await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); await pg.wait_for_timeout(300)
                d = await get(pg, HOUSE); doll = await pg.evaluate(DOLL)
                want = '1' if 'look2' in raw else 'classic'
                check(f'1 {name}: stored string byte-identical after a no-edit session', d == raw, f'len {len(d or "")} vs {len(raw)}')
                check(f'1 {name}: doll unchanged ({want}; None = her room is not on screen)', doll == want or (doll is None and want == 'classic' and 'look2' not in json.dumps(json.loads(d)['characters'])), str(doll))
                check(f'1 {name}: no page errors', not errs, errs[:2]); await ctx.close()
            classic = json.dumps(G('classic_c1'))
            ctx, pg, errs = await fresh(b, URL); await seed(pg, {HOUSE: None, BAK: classic}); await open_game(pg, URL)
            s = json.loads(await pg.evaluate("() => JSON.stringify(window.__store.get())"))
            check('2 backup-only house opens the backup and stays classic', 'look2' not in s['characters'][0] and await pg.evaluate(DOLL) == 'classic', str(await pg.evaluate(DOLL)))
            check('2 no page errors', not errs, errs[:2]); await ctx.close()
            ctx, pg, errs = await fresh(b, URL); await seed(pg, {HOUSE: None, BAK: None}); await open_game(pg, URL)
            check('3 fresh automated run draws the starter look (data-chibi="1")', await pg.evaluate(DOLL) == '1', str(await pg.evaluate(DOLL)))
            check('3 nothing stored before the first edit', await get(pg, HOUSE) is None)
            await pg.evaluate(EDIT, '#ffe0f0'); await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); await pg.wait_for_timeout(400)
            starter = await get(pg, HOUSE); c1 = json.loads(starter or '{}').get('characters', [{}])[0]
            check("3 after the first edit the stored c1 has look2 eyes 'sparkle'", (c1.get('look2') or {}).get('eyes') == 'sparkle', str(c1.get('look2')))
            check('3 legacy colours stay c1', c1.get('shirt') == '#ff7aa8' and c1.get('skin') == '#f1c27d', str({k: c1.get(k) for k in ('skin', 'shirt')}))
            if SHOT:
                os.makedirs(SHOT, exist_ok=True); await pg.screenshot(path=f'{SHOT}/firstrun-820x1180.png')
            # 5 reset: decorate the doll differently, then reset the house
            await pg.evaluate("() => window.__store.dispatch({ type: 'char/update', id: 'c1', patch: { shirt: '#5aa9e6', look2: null } })"); await pg.wait_for_timeout(500)
            if SHOT: await pg.screenshot(path=f'{SHOT}/reset-before-820x1180.png')
            await pg.evaluate("() => window.__store.dispatch({ type: 'game/reset' })"); await pg.wait_for_timeout(800)
            rs = json.loads(await pg.evaluate("() => JSON.stringify(window.__store.get())"))['characters'][0]
            if SHOT: await pg.screenshot(path=f'{SHOT}/reset-after-820x1180.png')
            check("5 house reset gives the starter look (sparkle, c1 colours)", (rs.get('look2') or {}).get('eyes') == 'sparkle' and rs.get('shirt') == '#ff7aa8' and await pg.evaluate(DOLL) == '1')
            check('3/5 no page errors', not errs, errs[:2]); await ctx.close()
            if OLD_URL and starter:
                ctx, pg, errs = await fresh(b, OLD_URL); await seed(pg, {HOUSE: starter, BAK: None}); await open_game(pg, OLD_URL, 3000)
                await pg.evaluate(EDIT, '#e0f0ff'); await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); await pg.wait_for_timeout(400)
                after = json.loads(await get(pg, HOUSE) or '{}'); before = json.loads(starter)
                check('4 old client (10ef736) keeps the starter look2', after.get('characters', [{}])[0].get('look2') == before['characters'][0]['look2'])
                strip = lambda s: {**s, 'rooms': {k: {**v, 'wallpaper': None} if k == 'living' else v for k, v in s['rooms'].items()}}
                diff = sorted(k for k in set(before) | set(after) if strip(before).get(k) != strip(after).get(k)) if after.get('rooms') else ['unreadable']
                check('4 old client edit changes only the edited field', not diff, str(diff))
                check('4 old client: no page errors', not errs, errs[:2]); await ctx.close()
            elif OLD_URL: check('4 old client run needs the starter house', False)
        finally: await b.close()
    check('no workers.dev request reached the network', True, f'{len(hits)} aborted')
    print('RESULT', 'FAIL' if fails else 'PASS', fails); sys.exit(1 if fails else 0)
asyncio.run(main())
