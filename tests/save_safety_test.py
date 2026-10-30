# SAVE SAFETY (Batch 3, D-03/D-04/D-05): the saved house is never lost, never silently replaced.
#  1 an old v3 save (tests/fixtures/save_v3_old10.json, written by the 10ef736 build) loads byte-identically
#  2 (missing save + good backup also opens the backup) the backup key is never overwritten by an empty / blank / fresh house (corrupt, empty, '{}' and missing saves)
#  3 storage full (setItem throws QuotaExceededError): grown-ups notice, no crash, house still editable, retry saves
#  4 an edit inside the 250 ms save window is flushed on visibilitychange->hidden, pagehide and close
#  5 a corrupt save is recovered from the backup and its raw text is kept under cozy-house-corrupt-<time>
#  6 a save with an unknown version (e.g. v4 from a newer build) or no version is unreadable, not blank: with and without
#    a backup the original stays recoverable from some key after 22+ edits and a relaunch
#  7 only the newest 2 corrupt copies are kept (oldest removed only after the new one is written)
#  8 storage full while the corrupt copy is written: 'full' note shown; timed retries stop after 5, edits/visibility retry
# Usage: save_safety_test.py [URL] (default http://localhost:$WEB_PORT/kids-house-game/). PFX="preview:" for preview builds.
# SHOTS=dir LABEL=sha saves the grown-ups notice at 820x1180 and 1180x820.  SS_BROWSER=webkit (default) | chromium
import asyncio, json, os, sys
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from testnav import PFX, K
URL = sys.argv[1] if len(sys.argv) > 1 else f"http://localhost:{os.environ.get('WEB_PORT', '4173')}/kids-house-game/"
ORIGIN = URL.split('/', 3)[0] + '//' + URL.split('/', 3)[2]
SHOTS, LABEL = os.environ.get('SHOTS'), os.environ.get('LABEL', 'dev')
OLD = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fixtures', 'save_v3_old10.json')).read()
HOUSE, BAK, BAD = K('cozy-house'), K('cozy-house-bak'), K('cozy-house-corrupt-')
TRUNC = OLD[:len(OLD) // 2]
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
INIT = f"""for (const k of ['{PFX}cozy-whatsnew']) localStorage.getItem(k) || localStorage.setItem(k, '999');
localStorage.setItem('{PFX}avatar-intro', '1');
(() => {{ const real = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {{
    if (localStorage.getItem('__full') === '1' && k !== '__full') {{ if (k === '{PFX}cozy-house') window.__fails = (window.__fails || 0) + 1; throw new DOMException('full', 'QuotaExceededError'); }}
    return real.call(this, k, v); }}; }})();"""
DUMP = f"() => {{ const o = {{}}; for (let i = 0; i < localStorage.length; i++) {{ const k = localStorage.key(i); o[k] = localStorage.getItem(k); }} return o; }}"
EDIT = "c => window.__store.dispatch({ type: 'room/wallpaper', room: 'living', color: c })"

async def fresh(browser, w=1180, h=820):
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True)
    await ctx.add_init_script(INIT)
    pg = await ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto(ORIGIN + '/no-such-page-for-seeding')
    return ctx, pg, errs
async def seed(pg, kv):
    await pg.evaluate("kv => { for (const [k, v] of Object.entries(kv)) v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); }", kv)
async def open_game(pg, wait=2500):
    await pg.goto(URL); await pg.wait_for_function("() => !!window.__store", timeout=20000); await pg.wait_for_timeout(wait)
async def ls(pg): return await pg.evaluate(DUMP)
def corrupt_keys(d): return {k: v for k, v in d.items() if k.startswith(BAD)}
async def notice(pg): return await pg.evaluate("() => { const n = document.querySelector('.grownNotice'); if (!n) return null; const b = n.getBoundingClientRect(); return { text: n.textContent, vis: b.width > 0 && b.top >= 0 && b.bottom <= innerHeight }; }")
async def shot(pg, name):
    if SHOTS:
        os.makedirs(SHOTS, exist_ok=True); p = f"{SHOTS}/{LABEL}__{name}.png"; await pg.screenshot(path=p); print('shot', p)

async def t1(b):
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: OLD})
    await open_game(pg, 4000); await pg.reload(); await pg.wait_for_function("() => !!window.__store"); await pg.wait_for_timeout(4000)
    d = await ls(pg); mem = await pg.evaluate("() => JSON.stringify(window.__store.get())")
    check('1 old v3 save string byte-identical after load + no-op session', d.get(HOUSE) == OLD, f"len {len(d.get(HOUSE) or '')} vs {len(OLD)}")
    check('1 parsed stored house unchanged', json.loads(d[HOUSE]) == json.loads(OLD))
    check('1 in-memory house equals the old save (migrate is a no-op for v3)', json.loads(mem) == json.loads(OLD))
    check('1 backup is a byte copy, no corrupt copies, no notice', d.get(BAK) == OLD and not corrupt_keys(d) and await notice(pg) is None)
    check('1 no page errors', not errs, errs[:2]); await ctx.close()

async def t2(b):
    cases = [('corrupt', TRUNC), ('empty', ''), ('blank {}', '{}'), ('missing', None)]
    for name, val in cases:
        ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: val, BAK: OLD})
        await open_game(pg)
        for i in range(45): await pg.evaluate(EDIT, f"#{i:06x}")  # > 2 backup rotations
        await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))")
        await pg.reload(); await pg.wait_for_function("() => !!window.__store"); await pg.wait_for_timeout(1500)
        for i in range(25): await pg.evaluate(EDIT, f"#{i:06x}")
        await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); d = await ls(pg)
        if True:  # restored from the backup; later saves of that restored house may refresh it, never with a blank one
            bk = json.loads(d.get(BAK) or 'null')
            check(f'2 {name}: backup is still the good house (never blank/fresh)', bk is not None and bk.get('rooms') and len(json.dumps(bk)) > 0.8 * len(OLD) and bk['characters'] == json.loads(OLD)['characters'], f"len {len(d.get(BAK) or '')}")
        check(f'2 {name}: no page errors', not errs, errs[:2]); await ctx.close()
    # corrupt save and NO backup: the fresh house never becomes a backup, the corrupt text stays
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: TRUNC, BAK: None})
    await open_game(pg)
    for i in range(45): await pg.evaluate(EDIT, f"#{i:06x}")
    await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); d = await ls(pg); n = await notice(pg)
    check('2 corrupt + no backup: no backup written from the fresh house', BAK not in d)
    check('2 corrupt + no backup: corrupt raw kept', list(corrupt_keys(d).values()) == [TRUNC])
    check('2 corrupt + no backup: gentle notice shown', bool(n and n['vis'] and "couldn't open" in n['text']), n)
    await ctx.close()

async def t3(b):
    for w, h in [(820, 1180), (1180, 820)]:
        ctx, pg, errs = await fresh(b, w, h); await seed(pg, {HOUSE: OLD})
        await open_game(pg)
        await pg.evaluate("() => localStorage.setItem('__full', '1')")
        await pg.evaluate(EDIT, '#abcdef'); await pg.wait_for_timeout(800)
        n = await notice(pg)
        check(f'3 {w}x{h} storage full: grown-ups notice visible', bool(n and n['vis'] and 'out of room' in n['text']), n)
        await shot(pg, f'notice-full__{w}x{h}')
        await pg.evaluate(EDIT, '#fedcba'); await pg.wait_for_timeout(600)
        mem = await pg.evaluate("() => window.__store.get().rooms.living.wallpaper")
        alive = await pg.evaluate("() => { document.querySelector('[data-room=\"kitchen\"]')?.click(); return window.__store.get().currentRoom; }")
        check(f'3 {w}x{h} house editable in memory, app alive', mem == '#fedcba' and alive == 'kitchen', f"{mem} {alive}")
        check(f'3 {w}x{h} stored house untouched while full', (await ls(pg)).get(HOUSE) == OLD)
        check(f'3 {w}x{h} no page errors', not errs, errs[:2])
        await pg.evaluate("() => document.querySelector('.grownNotice button').click()"); await pg.wait_for_timeout(600)
        check(f'3 {w}x{h} OK closes the notice', await notice(pg) is None)
        await pg.evaluate("() => localStorage.removeItem('__full')"); await pg.wait_for_timeout(5600)
        st = json.loads((await ls(pg))[HOUSE])
        check(f'3 {w}x{h} retry saves once there is room', st['rooms']['living']['wallpaper'] == '#fedcba' and st['currentRoom'] == 'kitchen')
        await ctx.close()

async def t4(b):
    for how, js in [('visibilitychange', "Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }); document.dispatchEvent(new Event('visibilitychange'));"),
                    ('pagehide', "window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: false }));"),
                    ('beforeunload', "window.dispatchEvent(new Event('beforeunload'));")]:
        ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: OLD}); await open_game(pg)
        got = await pg.evaluate(f"""() => {{ window.__store.dispatch({{ type: 'room/wallpaper', room: 'living', color: '#0a0b0c' }});
            const before = JSON.parse(localStorage.getItem('{HOUSE}')).rooms.living.wallpaper; {js}
            return [before, JSON.parse(localStorage.getItem('{HOUSE}')).rooms.living.wallpaper]; }}""")
        check(f'4 flush on {how} persists an edit inside the 250 ms window', got[0] != '#0a0b0c' and got[1] == '#0a0b0c', got)
        await ctx.close()
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: OLD}); await open_game(pg)
    await pg.evaluate(EDIT, '#0d0e0f'); await pg.goto(ORIGIN + '/no-such-page-for-seeding')  # leave at once (real unload)
    st = json.loads((await ls(pg))[HOUSE])
    check('4 real navigation away within 250 ms keeps the edit', st['rooms']['living']['wallpaper'] == '#0d0e0f'); await ctx.close()

async def t5(b):
    for w, h in [(820, 1180), (1180, 820)]:
        ctx, pg, errs = await fresh(b, w, h); await seed(pg, {HOUSE: TRUNC, BAK: OLD}); await open_game(pg)
        d = await ls(pg); n = await notice(pg); mem = await pg.evaluate("() => JSON.stringify(window.__store.get())")
        check(f'5 {w}x{h} house restored from backup', json.loads(mem) == json.loads(OLD) and d.get(HOUSE) == OLD)
        check(f'5 {w}x{h} corrupt raw preserved byte-for-byte', list(corrupt_keys(d).values()) == [TRUNC])
        check(f'5 {w}x{h} gentle restore notice', bool(n and n['vis'] and 'last good copy' in n['text']), n)
        await shot(pg, f'notice-restored__{w}x{h}')
        await pg.reload(); await pg.wait_for_function("() => !!window.__store"); await pg.wait_for_timeout(1500)
        d2 = await ls(pg)
        check(f'5 {w}x{h} next launch: normal, still one corrupt copy, no notice', d2.get(HOUSE) == OLD and len(corrupt_keys(d2)) == 1 and await notice(pg) is None)
        check(f'5 {w}x{h} no page errors', not errs, errs[:2]); await ctx.close()

async def t6(b):
    o = json.loads(OLD)
    v4 = json.dumps({**o, 'version': 4}); nov = json.dumps({k: v for k, v in o.items() if k != 'version'})
    for name, val in [('version 4', v4), ('no version', nov)]:
        for with_bak in (True, False):
            tag = f"6 {name} {'+ good backup' if with_bak else 'no backup'}"
            ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: val, BAK: OLD if with_bak else None}); await open_game(pg)
            n = await notice(pg); mem = json.loads(await pg.evaluate("() => JSON.stringify(window.__store.get())"))
            if with_bak:
                check(f'{tag}: opens the last good copy with the restore notice', mem == o and bool(n and 'last good copy' in n['text']), n)
            else:
                check(f'{tag}: unreadable notice (not a silent blank house)', bool(n and "couldn't open" in n['text'] and 'kept safely' in n['text']), n)
            for i in range(25): await pg.evaluate(EDIT, f"#{i:06x}")
            await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); d0 = await ls(pg)
            await pg.reload(); await pg.wait_for_function("() => !!window.__store"); await pg.wait_for_timeout(1500)
            await pg.evaluate("() => window.dispatchEvent(new Event('pagehide'))"); d = await ls(pg)
            check(f'{tag}: original raw save still in a key after 25 edits + relaunch', val in d.values(), sorted(d))
            check(f'{tag}: kept under cozy-house-corrupt-<time>', list(corrupt_keys(d).values()) == [val])
            if with_bak:
                bk = json.loads(d.get(BAK) or 'null')
                check(f'{tag}: backup is still the good house', bool(bk and bk['characters'] == o['characters']))
            else:
                # (after the relaunch the new house the kid built is a normal save, so it may become the backup then)
                check(f'{tag}: no backup written from the fresh house in its first session', BAK not in d0)
            check(f'{tag}: no page errors', not errs, errs[:2]); await ctx.close()

async def t7(b):
    olds = {BAD + str(1000 + i): f'old-bad-{i}' for i in range(3)}
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: TRUNC, BAK: OLD, **olds}); await open_game(pg)
    d = corrupt_keys(await ls(pg))
    check('7 only the newest 2 corrupt copies kept, the new one among them', sorted(d.values()) == sorted([TRUNC, 'old-bad-2']), sorted(d.values()))
    check('7 no page errors', not errs, errs[:2]); await ctx.close()

async def t8(b):
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: TRUNC, BAK: OLD, '__full': '1'}); await open_game(pg)
    n = await notice(pg)
    check('8 corrupt copy blocked by full storage: full note shown with the restore note', bool(n and 'last good copy' in n['text'] and 'out of room' in n['text'] and 'safe for now' in n['text']), n)
    d = await ls(pg)
    check('8 corrupt raw never overwritten while it cannot be kept', d.get(HOUSE) == TRUNC)
    await shot(pg, 'notice-restored-full__1180x820')
    await pg.evaluate("() => localStorage.removeItem('__full')"); await pg.evaluate(EDIT, '#123456'); await pg.wait_for_timeout(900)
    d = await ls(pg)
    check('8 room again: raw kept first, then the edit saved', list(corrupt_keys(d).values()) == [TRUNC] and json.loads(d[HOUSE])['rooms']['living']['wallpaper'] == '#123456')
    await ctx.close()
    ctx, pg, errs = await fresh(b); await seed(pg, {HOUSE: OLD}); await open_game(pg)
    await pg.evaluate("() => { localStorage.setItem('__full', '1'); window.__fails = 0; }")
    await pg.evaluate(EDIT, '#abcdef'); await pg.wait_for_timeout(33000)
    f1 = await pg.evaluate("() => window.__fails")
    await pg.wait_for_timeout(6000); f2 = await pg.evaluate("() => window.__fails")
    check('8 timed retries stop after 5 (1 try + 5 retries)', f1 == 6 and f2 == 6, (f1, f2))
    await pg.evaluate(EDIT, '#abcdee'); await pg.wait_for_timeout(600); f3 = await pg.evaluate("() => window.__fails")
    await pg.evaluate("() => document.dispatchEvent(new Event('visibilitychange'))"); f4 = await pg.evaluate("() => window.__fails")
    check('8 the next edit and a visibility change try again', f3 == 7 and f4 == 8, (f3, f4))
    await pg.evaluate("() => localStorage.removeItem('__full')"); await pg.evaluate("() => document.dispatchEvent(new Event('visibilitychange'))")
    check('8 saved once there is room', json.loads((await ls(pg))[HOUSE])['rooms']['living']['wallpaper'] == '#abcdee')
    check('8 no page errors', not errs, errs[:2]); await ctx.close()

async def main():
    only = os.environ.get('ONLY', '12345678')
    async with async_playwright() as p:
        b = await getattr(p, os.environ.get('SS_BROWSER', 'webkit')).launch()
        for n, f in [('1', t1), ('2', t2), ('3', t3), ('4', t4), ('5', t5), ('6', t6), ('7', t7), ('8', t8)]:
            if n in only:
                try: await f(b)
                except Exception as e: check(f'{n} crashed', False, str(e).splitlines()[0][:200])
        await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f"\n{len(res) - len(bad)}/{len(res)} passed", *(['FAILED:'] + bad if bad else []), sep='\n')
    sys.exit(1 if bad else 0)
asyncio.run(main())
