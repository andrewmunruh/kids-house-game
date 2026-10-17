# MIGRATION TEST: production data -> the new (map + barn) build, nothing lost.
#  Phase A  production build (main) + production server code create real data: a rich solo save, a street with a roster,
#           3 kids, houses with items, characters, pets, locks, renames, ranch baskets/garden.
#  Phase B  the SAME iPads (same browser profiles, same origin) get the new build, and the NEW server code starts on a
#           copy of the production data (like deploying the Worker). Every house, item, character, pet, roster name,
#           sign-in token and street membership must be identical.
#  Phase C  the PREVIEW build (prefixed keys) opened on the same origin must not change a single production key.
# Usage: migration_test.py   (needs: /tmp/prodtree = git worktree of main, builds in /tmp/prod-dist, /tmp/new-dist, /tmp/preview-dist)
import asyncio, json, os, shutil, subprocess, time, sys, signal
from playwright.async_api import async_playwright
ROOT = '/workspace/kids-house-game'; M = '/tmp/migr'; WWW = M + '/www'; PORT_WEB = 4190; PORT_HOOD = 8795; PORT_PREV = 8796
BASE = f'http://localhost:{PORT_WEB}'; URL = f'{BASE}/kids-house-game/?hood=http://localhost:{PORT_HOOD}'
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
def server(cwd, data, port):
    env = dict(os.environ, PORT=str(port), HOOD_DATA=data)
    return subprocess.Popen(['npx', 'tsx', 'server/node.ts'], cwd=cwd, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
def wait_port(port, t=30):
    import socket
    end = time.time() + t
    while time.time() < end:
        try: socket.create_connection(('127.0.0.1', port), 0.5).close(); return True
        except OSError: time.sleep(0.3)
    return False
def stop(pr):
    try: os.killpg(pr.pid, signal.SIGTERM)
    except Exception: pass
    time.sleep(1)
def serve_build(dist):  # "deploy": swap what the web server serves at /kids-house-game/
    link = WWW + '/kids-house-game'
    if os.path.islink(link): os.unlink(link)
    os.symlink(dist, link)
WN_LATEST = __import__('re').search(r'CHANGELOG: ChangeEntry\[\] = \[\s*\{\s*v:\s*(\d+)', open(__import__('os').path.dirname(__import__('os').path.abspath(__file__)) + '/src/whatsnew.ts').read()).group(1)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join_prod(pg, code, nick, bring):
    await pg.click('#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-street .house', timeout=8000)
SNAP = """(() => { const h = __hood(); if (!h) return null;
  const houses = {}; for (const [id, x] of h.houses) houses[id] = { meta: x.meta, view: h.view(id) };
  const players = {}; for (const [pid, p] of h.players) players[pid] = { nickname: p.nickname, houseId: p.houseId, look: p.look, dog: p.dog ?? null, basket: p.basket ?? null };
  return { pid: h.pid, myHouse: h.myHouseId(), houses, players, plots: h.ranch ? h.ranch.plots : null, settings: h.settings }; })()"""
LS = "Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)]))"
def items_of(snap):
    return {hid: sorted((r, i['id'], i['kind'], round(i['x']), round(i['y'])) for r, room in h['view']['rooms'].items() for i in room['items']) for hid, h in snap['houses'].items()}

async def main():
    shutil.rmtree(M, ignore_errors=True); os.makedirs(WWW); os.makedirs(M + '/data')
    os.symlink('/tmp/preview-dist', WWW + '/cozy-preview')
    serve_build('/tmp/prod-dist')
    # static web server like GitHub Pages, but with no-cache so the "update" is picked up right away (Pages caches up to 10 min)
    code = ("import http.server, functools\n"
            "class H(http.server.SimpleHTTPRequestHandler):\n"
            "    def end_headers(self): self.send_header('Cache-Control', 'no-cache'); super().end_headers()\n"
            "    def log_message(self, *a): pass\n"
            f"http.server.ThreadingHTTPServer(('', {PORT_WEB}), functools.partial(H, directory='{WWW}')).serve_forever()")
    web = subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    prod = server('/tmp/prodtree', M + '/data', PORT_HOOD); wait_port(PORT_HOOD); wait_port(PORT_WEB)
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            ctxs = [await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True) for _ in range(3)]
            for c in ctxs: await c.add_init_script("localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew', '3')")  # they've seen the ranch popup
            P, K2, K3 = [await c.new_page() for c in ctxs]
            errs = []
            for pg in (P, K2, K3): pg.on('pageerror', lambda e: errs.append(str(e))); await pg.goto(URL); await pg.wait_for_timeout(700)
            # ================= Phase A: production =================
            check('phase A runs the production build (street, no map)', await P.locator('#btnMap').count() == 0 and await P.locator('#btnPark').count() == 1)
            # a rich solo save on the family iPad: 3 characters, items in 3 rooms (one held), paint, cat, dog, ranch basket + garden
            await P.evaluate("""(() => { const s = __store; const now = Date.now();
              s.dispatch({type:'char/add', char:{id:'c-mig2', name:'Bea', room:'bedroom', x:700, y:560, flip:true, skin:'#8d5524', hair:'#ff8fab', hairStyle:2, shirt:'#5aa9e6', pants:'#ffd166', size:'little', acc:1, held:{}}});
              s.dispatch({type:'char/add', char:{id:'c-mig3', name:'Max', room:'kitchen', x:500, y:560, flip:false, skin:'#ffe0c4', hair:'#2b1d16', hairStyle:3, shirt:'#80ed99', pants:'#5a3d5c', size:'adult', acc:3, held:{}}});
              const add = (room, id, kind, x, y) => s.dispatch({type:'item/add', room, item:{id, kind, x, y, flip:false}});
              const kinds = Object.keys(__items); add('living','m-sofa', kinds[0], 520, 560); add('living','m-lamp', kinds[3], 820, 540); add('bedroom','m-bed', kinds[5], 900, 560); add('kitchen','m-k1', kinds[8], 400, 560); add('salon','m-s1', kinds[12], 1100, 560);
              s.dispatch({type:'room/wallpaper', room:'bedroom', color:'#c9a0dc'}); s.dispatch({type:'room/floor', room:'kitchen', color:'#ffd166'});
              s.dispatch({type:'cat/set', cat:{name:'Mochi', coat:2, room:'living', x:900}}); s.dispatch({type:'dog/set', dog:{name:'Rocket', breed:1, owner: s.get().characters[0].id}});
              s.dispatch({type:'ranch/op', op:{op:'egg'}, now}); s.dispatch({type:'ranch/op', op:{op:'egg'}, now: now + 2000}); s.dispatch({type:'ranch/op', op:{op:'plant', i:2, seed:'flower'}, now}); s.dispatch({type:'ranch/op', op:{op:'water', i:2}, now});
              return true; })()""")
            await P.wait_for_timeout(600)
            solo_a = await P.evaluate("JSON.parse(localStorage.getItem('cozy-house'))")
            check('phase A: rich solo save written', len(solo_a['characters']) >= 3 and solo_a['cat']['name'] == 'Mochi' and solo_a['basket']['egg'] == 2 and sum(len(r['items']) for r in solo_a['rooms'].values()) >= 5)
            # grown-up creates the street with a roster + custom code; 3 kids join (the family iPad brings its house)
            for attempt in range(3):
                await P.click('#btnHood'); await P.click('[data-m="create"]'); await adult(P)
                try: await P.wait_for_selector('#newCode', timeout=8000); break
                except Exception:
                    toast = await P.evaluate("[...document.querySelectorAll('.toast')].map(t=>t.textContent).join('|')")
                    print('DBG create retry', attempt, 'toast:', toast); await P.wait_for_timeout(1500)
            await P.click('[data-m="setup"]'); await P.wait_for_selector('#pCode')
            for n in ('Reagan', 'Quinn', 'Chloe', 'Sloane'): await P.click(f'.sugg button:has-text("{n}")'); await P.wait_for_timeout(200)
            custom = 'Migr' + str(int(time.time()) % 100000); await P.fill('#codeEdit', custom); await P.click('[data-p="setcode"]'); await P.wait_for_timeout(400)
            await P.click('.hoodSheet [data-m="close"]')
            await join_prod(P, custom, 'Reagan', True); await join_prod(K2, custom, 'Quinn', False); await join_prod(K3, custom, 'Chloe', False); await P.wait_for_timeout(800)
            # K2 decorates her house, recolors it, dresses up; K3 adopts a dog, locks her house; the parent renames K3's house
            await K2.evaluate("""(() => { const h = __hood(), id = h.myHouseId(), kinds = Object.keys(__items);
              h.dispatch(id, {type:'item/add', room:'living', item:{id:'k2-a', kind:kinds[2], x:600, y:560, flip:false}});
              h.dispatch(id, {type:'item/add', room:'bedroom', item:{id:'k2-b', kind:kinds[6], x:800, y:560, flip:true}});
              h.dispatch(id, {type:'room/wallpaper', room:'living', color:'#80ed99'});
              h.dispatch(id, {type:'cat/set', cat:{name:'Pickles', coat:4, room:'bedroom', x:700}});
              h.setLook({ ...h.players.get(h.pid).look, shirt:'#ffd166', hairStyle: 1 }); return true; })()""")
            await K3.evaluate("""(() => { const h = __hood(); h.setDog({name:'Biscuit', breed:2}); h.lock(h.myHouseId(), true); return true; })()""")
            await K3.wait_for_timeout(300)
            # ranch: K2 collects an egg and plants in the garden (production ranch)
            await K2.click('#btnRanch'); await K2.wait_for_timeout(600)
            await K2.evaluate("__hood().ranchOp({op:'egg'}); __hood().ranchOp({op:'plant', i:0, seed:'carrot'}); __hood().ranchOp({op:'water', i:0})"); await K2.wait_for_timeout(500)
            await K2.click('#btnLeavePark'); await K2.wait_for_timeout(400)
            await P.click('#btnParent'); await adult(P); await P.wait_for_selector('.pHouse, input[data-hid]')
            k3h = await K3.evaluate('__hood().myHouseId()')
            await P.fill(f'input[data-hid="{k3h}"]', 'Koala Castle'); await P.click(f'[data-p="rename"][data-hid="{k3h}"]'); await P.wait_for_timeout(500)
            roster_a = sorted(await P.locator('.rName').all_inner_texts()) if await P.locator('.rName').count() else None
            await P.click('.hoodSheet [data-m="close"]'); await P.wait_for_timeout(300)
            await P.wait_for_timeout(800)
            snap_a = await P.evaluate(SNAP); ids_a = [await pg.evaluate("[__hood().pid, __hood().myHouseId()]") for pg in (P, K2, K3)]
            ls_a = [await pg.evaluate(LS) for pg in (P, K2, K3)]
            dogs_ok = any(pl['dog'] and pl['dog']['name'] == 'Biscuit' for pl in snap_a['players'].values()) and any(pl['dog'] and pl['dog']['name'] == 'Rocket' for pl in snap_a['players'].values())
            check('phase A: production street has 3 houses, items, pets, a lock, a rename, a basket, a garden', len(snap_a['houses']) == 3 and dogs_ok and any(h['meta']['locked'] for h in snap_a['houses'].values()) and any(h['meta']['name'] == 'Koala Castle' for h in snap_a['houses'].values()) and snap_a['plots'] and snap_a['plots'][0], f"items: {sum(len(v) for v in items_of(snap_a).values())}")
            n_items_a = sum(len(v) for v in items_of(snap_a).values())
            # ================= Phase B: ship the new build =================
            stop(prod); time.sleep(1)
            shutil.copytree(M + '/data', M + '/data-new'); files_a = {f: open(f'{M}/data/{f}').read() for f in os.listdir(M + '/data')}
            new = server(ROOT, M + '/data-new', PORT_HOOD); serve_build('/tmp/new-dist'); wait_port(PORT_HOOD)
            for pg in (P, K2, K3): await pg.goto(URL); await pg.wait_for_timeout(300)
            for pg in (P, K2, K3): await pg.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=10000)
            await P.wait_for_timeout(1500)
            check('updated iPads see the What\'s new popup once', all([await pg.locator('.whatsNew').count() == 1 for pg in (P, K2, K3)]))
            for pg in (P, K2, K3): await pg.wait_for_timeout(500); await pg.evaluate("document.querySelector('#wnGo')?.click()"); await pg.wait_for_timeout(300)
            check('phase B runs the new build: every iPad reconnects on its own and lands on the map', await P.locator('#btnMap').count() == 1 and all([await pg.evaluate("document.body.classList.contains('view-map')") for pg in (P, K2, K3)]))
            ids_b = [await pg.evaluate("[__hood().pid, __hood().myHouseId()]") for pg in (P, K2, K3)]
            check('street membership + sign-in: same player ids and same houses on every iPad', ids_a == ids_b, json.dumps(ids_b))
            snap_b = await P.evaluate(SNAP)
            check('every house is identical (name, owner, style, slot, lock)', {k: v['meta'] for k, v in snap_a['houses'].items()} == {k: v['meta'] for k, v in snap_b['houses'].items()})
            check('every room is identical (items, positions, flips, paint, characters, cats)', {k: v['view'] for k, v in snap_a['houses'].items()} == {k: v['view'] for k, v in snap_b['houses'].items()}, f'{n_items_a} items')
            check('every kid identical (name, look, dog, basket, house)', snap_a['players'] == snap_b['players'])
            check('shared garden identical', snap_a['plots'] == snap_b['plots'])
            check('settings identical', snap_a['settings'] == snap_b['settings'])
            ls_b = [await pg.evaluate(LS) for pg in (P, K2, K3)]
            def same_ls(a, b):
                ka = {k: v for k, v in a.items() if k != 'cozy-whatsnew'}; kb = {k: v for k, v in b.items() if k != 'cozy-whatsnew'}
                if ka.keys() != kb.keys(): return False
                return all((json.loads(ka[k]) == json.loads(kb[k])) if k == 'cozy-house' else ka[k] == kb[k] for k in ka)
            check('every iPad\'s saved data unchanged (solo house, sign-in, secrets)', all(same_ls(a, b) for a, b in zip(ls_a, ls_b)), json.dumps([sorted(x.keys()) for x in ls_b]))
            check('the new build announces the update once (What\'s new, latest version)', all(x.get('cozy-whatsnew') == WN_LATEST for x in ls_b))
            signs = sorted(await P.locator('#mapWorld .mapSign:not(.place)').all_inner_texts())
            check("map signs show each house's name from the roster (e.g. Quinn's House; a renamed house keeps its new name)", signs == sorted(["Reagan's House", "Quinn's House", 'Koala Castle']) and signs == sorted(h['meta']['name'] for h in snap_b['houses'].values()), json.dumps(signs))
            # play on the new build: houses render with their items; the parent screen still knows the roster
            await P.click('#mapWorld .mapHouse.mine'); await P.wait_for_timeout(900)
            p_items = await P.evaluate("Object.values(__store.get().rooms).reduce((n, r) => n + r.items.length, 0)")
            mine_a = sum(len(r['items']) for r in snap_a['houses'][ids_a[0][1]]['view']['rooms'].values())
            check('her house opens from the map with all its items', p_items == mine_a and (await P.evaluate("__store.get().cat || {}")).get('name') == 'Mochi', f'{p_items}/{mine_a}')
            k2house = ids_a[1][1]
            await P.click('#btnMap'); await P.wait_for_timeout(500); await P.click(f'.mapHouse[data-go="house:{k2house}"]'); await P.wait_for_timeout(900)
            check("a friend's decorated house opens from the map, all items there", sorted(await P.evaluate("Object.values(__store.get().rooms).flatMap(r => r.items.map(i => i.id))")) == sorted(i[1] for i in items_of(snap_a)[k2house]))
            await P.click('#btnMap'); await P.wait_for_timeout(500)
            await P.click('#btnParent'); await adult(P); await P.wait_for_timeout(700)
            roster_b = sorted(await P.locator('.rName').all_inner_texts()) if await P.locator('.rName').count() else None
            check('roster + grown-up key still work (parent screen)', roster_a == roster_b and roster_b is not None, json.dumps(roster_b))
            await P.click('.hoodSheet [data-m="close"]')
            check('production data files were never modified (new server ran on a copy)', all(open(f'{M}/data/{f}').read() == v for f, v in files_a.items()))
            # ================= Phase C: preview build on the same origin =================
            stop(new); prev_srv = server(ROOT, M + '/data-preview', PORT_PREV); wait_port(PORT_PREV)
            ls_before = await P.evaluate(LS)
            await P.goto(f'{BASE}/cozy-preview/?hood=http://localhost:{PORT_PREV}'); await P.wait_for_timeout(1500)
            prev_state = await P.evaluate("({ hood: !!__hood(), ribbon: !!document.querySelector('.previewRibbon'), popup: !!document.querySelector('.whatsNew'), chars: __store.get().characters.length })")
            await P.evaluate("document.querySelector('#wnGo')?.click()"); await P.wait_for_timeout(300)
            await P.evaluate("__store.dispatch({type:'item/add', room:'living', item:{id:'prev-1', kind:Object.keys(__items)[1], x:500, y:560, flip:false}})"); await P.wait_for_timeout(600)
            ls_after = await P.evaluate(LS)
            prod_after = {k: v for k, v in ls_after.items() if not k.startswith('preview:')}
            check('preview build starts fresh: not signed in, own save, PREVIEW ribbon', not prev_state['hood'] and prev_state['ribbon'] and prev_state['popup'], json.dumps(prev_state))
            check('preview never touches a production key (byte-for-byte)', prod_after == ls_before, json.dumps(sorted(set(ls_after) - set(ls_before))))
            check('preview keys are all prefixed', all(k.startswith('preview:') for k in set(ls_after) - set(ls_before)) and 'preview:cozy-house' in ls_after)
            stop(prev_srv)
            check('no JS errors', not errs, '; '.join(errs[:3]))
            await b.close()
    finally:
        for pr in (web, prod):
            stop(pr)
        subprocess.run("pkill -f 'HOOD_DATA=/tmp/migr' ; true", shell=True)
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
