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
from testnav import tap, to_map, go
ROOT = os.path.dirname(os.path.abspath(__file__)); M = '/tmp/migr'; WWW = M + '/www'; PORT_WEB = 4190; PORT_HOOD = 8795; PORT_PREV = 8796
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
def free_ports(*ports):  # leftovers from an aborted run would answer instead of this run's servers
    import re
    out = subprocess.run(['ss', '-ltnp'], capture_output=True, text=True).stdout
    for line in out.splitlines():
        if any(re.search(rf':{p}\b', line) for p in ports):
            for pid in re.findall(r'pid=(\d+)', line):
                try: os.killpg(os.getpgid(int(pid)), signal.SIGTERM)
                except Exception:
                    try: os.kill(int(pid), signal.SIGTERM)
                    except Exception: pass
    time.sleep(1)
def serve_build(dist):  # "deploy": swap what the web server serves at /kids-house-game/
    link = WWW + '/kids-house-game'
    if os.path.islink(link): os.unlink(link)
    os.symlink(dist, link)
WN_LATEST = __import__('re').search(r'CHANGELOG: ChangeEntry\[\] = \[\s*\{\s*v:\s*(\d+)', open(__import__('os').path.dirname(__import__('os').path.abspath(__file__)) + '/src/whatsnew.ts').read()).group(1)
OLD_MAIN = open('/tmp/prodtree/src/main.ts').read()
OLD_HAS_MAP = 'id="btnMap"' in OLD_MAIN  # map era (1b33280+): joining lands on the map, the ranch is reached from the map
WN_OLD = __import__('re').search(r'CHANGELOG: ChangeEntry\[\] = \[\s*\{\s*v:\s*(\d+)', open('/tmp/prodtree/src/whatsnew.ts').read()).group(1)  # old (production) build's latest What's new
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join_prod(pg, code, nick, bring):
    await tap(pg, '#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map #mapWorld .mapHouse' if OLD_HAS_MAP else 'body.view-street .house', timeout=8000)
SNAP = """(() => { const h = __hood(); if (!h) return null;
  const houses = {}; for (const [id, x] of h.houses) houses[id] = { meta: x.meta, view: h.view(id) };
  const players = {}; for (const [pid, p] of h.players) players[pid] = { nickname: p.nickname, houseId: p.houseId, look: p.look, dog: p.dog ?? null, basket: p.basket ?? null };
  return { pid: h.pid, myHouse: h.myHouseId(), houses, players, plots: h.ranch ? h.ranch.plots : null, settings: h.settings }; })()"""
LS = "Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)]))"
OLD_ROOMS = ('living', 'bedroom', 'kitchen', 'salon')
BOTH_ROOMS = ('living', 'bedroom', 'kitchen', 'salon', 'nursery', 'backyard')
STARTER_KINDS = ['cloud-rug', 'crib', 'crib-mobile', 'rocker']
def items_of(snap, rooms=None):
    return {hid: sorted((r, i['id'], i['kind'], round(i['x']), round(i['y'])) for r, room in h['view']['rooms'].items() if rooms is None or r in rooms for i in room['items']) for hid, h in snap['houses'].items()}
def house_body(view):
    """Every house field except rooms. A missing kennel link is the same as null."""
    body = {k: v for k, v in view.items() if k != 'rooms'}
    body['dogKennel'] = body.get('dogKennel') or None
    return body
def cat_towers(view):
    found = []
    for room, data in (view.get('rooms') or {}).items():
        for i in data.get('items') or []:
            if i.get('kind') == 'cat-tower':
                found.append((room, i.get('id'), round(i.get('x') or 0), round(i.get('y') or 0), i.get('z'), bool(i.get('flip')), i.get('scale')))
    return sorted(found, key=str)
def strict_house(a, b):
    """Shared rooms (including nursery and backyard when both sides have them), characters, cat, pets, kennel, and every other field."""
    ba, bb = house_body(a), house_body(b)
    fields = []
    for k in sorted(set(ba) | set(bb)):
        av = ba.get('dogKennel') if k == 'dogKennel' else ba.get(k, None)
        bv = bb.get('dogKennel') if k == 'dogKennel' else bb.get(k, None)
        if k == 'dogKennel':
            av, bv = av or None, bv or None
        if k not in ba or k not in bb or av != bv:
            fields.append(k)
    ar, br = a.get('rooms') or {}, b.get('rooms') or {}
    shared = [r for r in BOTH_ROOMS if r in ar and r in br]
    rooms = [r for r in shared if ar[r] != br[r]]
    if set(OLD_ROOMS) - set(shared):
        rooms.append('missing-original')
    towers = cat_towers(a) != cat_towers(b)
    return fields, rooms, towers, shared
def disk_room_names(folder):
    out = {}
    for fn in os.listdir(folder):
        if not fn.endswith('.json') or fn.startswith('_'): continue
        blob = json.load(open(f'{folder}/{fn}'))
        for k, v in blob.items():
            if isinstance(v, dict) and isinstance(v.get('state'), dict) and isinstance(v['state'].get('rooms'), dict):
                out[k] = sorted(v['state']['rooms'])
    return out

async def main():
    shutil.rmtree(M, ignore_errors=True); os.makedirs(WWW); os.makedirs(M + '/data')
    os.symlink('/tmp/preview-dist', WWW + '/cozy-preview')
    free_ports(PORT_WEB, PORT_HOOD, PORT_PREV)
    serve_build('/tmp/prod-dist')
    # static web server like GitHub Pages, but with no-cache so the "update" is picked up right away (Pages caches up to 10 min)
    code = ("import http.server, functools\n"
            "class H(http.server.SimpleHTTPRequestHandler):\n"
            "    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
            "    def log_message(self, *a): pass\n"
            "    def send_head(self):\n        self.headers.replace_header('If-Modified-Since', '') if self.headers.get('If-Modified-Since') else None\n        return super().send_head()\n"
            f"http.server.ThreadingHTTPServer(('', {PORT_WEB}), functools.partial(H, directory='{WWW}')).serve_forever()")
    web = subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    prod = server('/tmp/prodtree', M + '/data', PORT_HOOD); wait_port(PORT_HOOD); wait_port(PORT_WEB)
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            ctxs = [await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True) for _ in range(3)]
            for c in ctxs: await c.add_init_script(f"localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew', '{WN_OLD}')")  # they've seen the old build's latest popup
            P, K2, K3 = [await c.new_page() for c in ctxs]
            P.on("response", lambda r: print("NET", r.status, r.url[-60:], r.from_service_worker) if ("/api/" in r.url or r.request.resource_type == "document") else None); P.on("requestfailed", lambda r: print("NETFAIL", r.url, r.failure) if "/api/" in r.url else None); P.on("console", lambda m: print("CON", m.text[:200]) if m.type == "error" else None)
            errs = []
            for pg in (P, K2, K3): pg.on('pageerror', lambda e: errs.append(str(e))); await pg.goto(URL); await pg.wait_for_timeout(700)
            # ================= Phase A: production =================
            if OLD_HAS_MAP:
                old_home = 'id="btnHome"' in OLD_MAIN
                home_note = 'home button in the old tree' if old_home else 'no home button in the old tree'
                check('phase A runs the production build (map era: map button, ' + home_note + ')', await P.locator('#btnMap').count() == 1 and await P.locator('#btnHome').count() == (1 if old_home else 0))
            else: check('phase A runs the production build (street, no map)', await P.locator('#btnMap').count() == 0 and await P.locator('#btnPark').count() == 1)
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
                await tap(P, '#btnHood'); await P.click('[data-m="create"]'); await adult(P)
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
            if OLD_HAS_MAP: await go(K2, 'ranch')
            else: await K2.click('#btnRanch'); await K2.wait_for_timeout(600)
            await K2.evaluate("__hood().ranchOp({op:'egg'}); __hood().ranchOp({op:'plant', i:0, seed:'carrot'}); __hood().ranchOp({op:'water', i:0})"); await K2.wait_for_timeout(500)
            if OLD_HAS_MAP: await to_map(K2)
            else: await K2.click('#btnLeavePark'); await K2.wait_for_timeout(400)
            await tap(P, '#btnParent'); await adult(P); await P.wait_for_selector('.pHouse, input[data-hid]')
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
            new_js = [f for f in os.listdir('/tmp/new-dist/assets') if f.startswith('index-') and f.endswith('.js')][0]
            for i, pg in enumerate((P, K2, K3)):
                for attempt in range(4):
                    await pg.goto(URL); await pg.wait_for_timeout(300)
                    if new_js in await pg.evaluate("[...document.scripts].map(s => s.src).join()"): break
                    print('DBG iPad', i, 'still had the old page (offline fallback); reloading', attempt)
            for i, pg in enumerate((P, K2, K3)):
                try: await pg.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=10000)
                except Exception:
                    await pg.screenshot(path=f'/tmp/migB{i}.png'); print('DBG', i, await pg.evaluate("document.body.className"), await pg.evaluate("[...document.scripts].map(s=>s.src).join(',')"), await pg.evaluate("localStorage.getItem('cozy-hood')")); raise
            await P.wait_for_timeout(1500)
            expect_wn = 1 if int(WN_LATEST) > int(WN_OLD) else 0  # a release with no new What's new entry must not show the popup
            check("updated iPads see the What's new popup once" if expect_wn else "no What's new popup when the version did not change",
                  all([await pg.locator('.whatsNew').count() == expect_wn for pg in (P, K2, K3)]), f'old v{WN_OLD} -> new v{WN_LATEST}')
            for pg in (P, K2, K3): await pg.wait_for_timeout(500); await pg.evaluate("document.querySelector('#wnGo')?.click()"); await pg.wait_for_timeout(300)
            check('phase B runs the new build: every iPad reconnects on its own and lands on the map', await P.locator('#btnMap').count() == 1 and all([await pg.evaluate("document.body.classList.contains('view-map')") for pg in (P, K2, K3)]))
            ids_b = [await pg.evaluate("[__hood().pid, __hood().myHouseId()]") for pg in (P, K2, K3)]
            check('street membership + sign-in: same player ids and same houses on every iPad', ids_a == ids_b, json.dumps(ids_b))
            snap_b = await P.evaluate(SNAP)
            check('every house is identical (name, owner, style, slot, lock)', {k: v['meta'] for k, v in snap_a['houses'].items()} == {k: v['meta'] for k, v in snap_b['houses'].items()})
            room_notes = []
            rooms_ok = True
            for hid, ha in snap_a['houses'].items():
                fields, rooms, towers, shared = strict_house(ha['view'], snap_b['houses'][hid]['view'])
                if fields or rooms or towers or set(OLD_ROOMS) - set(shared):
                    rooms_ok = False
                    room_notes.append(f'{hid}: fields={fields} rooms={rooms} towers={towers}')
            gained = all(
                h['view']['rooms'].get('nursery') and [i['kind'] for i in h['view']['rooms']['nursery']['items']] == STARTER_KINDS
                and h['view']['rooms'].get('backyard', {}).get('items') == []
                and (h['view'].get('dogKennel') or None) is None
                for h in snap_b['houses'].values()) and all('nursery' not in h['view']['rooms'] and 'backyard' not in h['view']['rooms'] for h in snap_a['houses'].values())
            check('every room is identical (items, positions, flips, paint, characters, cats, pets, kennel, cat tower)',
                  rooms_ok and gained, ('; '.join(room_notes) + f' {n_items_a} items').strip())
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
            opened = await P.evaluate("""() => { const rooms = __store.get().rooms; return { ids: Object.fromEntries(Object.entries(rooms).map(([k, r]) => [k, r.items.map(i => i.id)])), nursery: rooms.nursery.items.map(i => i.kind), cat: (__store.get().cat || {}).name }; }""")
            mine_rooms = snap_a['houses'][ids_a[0][1]]['view']['rooms']
            mine_ok = all(sorted(opened['ids'].get(r, [])) == sorted(i['id'] for i in mine_rooms[r]['items']) for r in OLD_ROOMS)
            check('her house opens from the map with all its items', mine_ok and opened['nursery'] == STARTER_KINDS and opened['cat'] == 'Mochi', str({r: len(opened['ids'].get(r, [])) for r in list(OLD_ROOMS) + ['nursery']}))
            k2house = ids_a[1][1]
            await P.click('#btnMap'); await P.wait_for_timeout(500); await P.click(f'.mapHouse[data-go="house:{k2house}"]'); await P.wait_for_timeout(900)
            friend = await P.evaluate("""() => { const rooms = __store.get().rooms; return { old: Object.fromEntries(['living','bedroom','kitchen','salon'].map(r => [r, rooms[r].items.map(i => i.id)])), nursery: rooms.nursery.items.map(i => i.kind) }; }""")
            friend_a = {r: [i[1] for i in items_of(snap_a)[k2house] if i[0] == r] for r in OLD_ROOMS}
            check("a friend's decorated house opens from the map, all items there", all(sorted(friend['old'][r]) == sorted(friend_a[r]) for r in OLD_ROOMS) and friend['nursery'] == STARTER_KINDS)
            await P.click('#btnMap'); await P.wait_for_timeout(500)
            await tap(P, '#btnParent'); await adult(P); await P.wait_for_timeout(700)
            roster_b = sorted(await P.locator('.rName').all_inner_texts()) if await P.locator('.rName').count() else None
            check('roster + grown-up key still work (parent screen)', roster_a == roster_b and roster_b is not None, json.dumps(roster_b))
            await P.click('.hoodSheet [data-m="close"]')
            check('production data files were never modified (new server ran on a copy)', all(open(f'{M}/data/{f}').read() == v for f, v in files_a.items()))
            check('an old stored house stays without a nursery on disk until the first edit', all('nursery' not in names and 'backyard' not in names for names in disk_room_names(M + '/data-new').values()) and disk_room_names(M + '/data-new') == disk_room_names(M + '/data'))
            # solo save from the old build, opened by the new build (not signed in)
            solo_ctx = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
            await solo_ctx.add_init_script("if (!sessionStorage.getItem('solo-set')) { sessionStorage.setItem('solo-set','1'); localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('cozy-house', " + json.dumps(json.dumps(solo_a)) + "); }")
            solo = await solo_ctx.new_page(); solo.on('pageerror', lambda e: errs.append('solo ' + str(e)))
            await solo.goto(f'{BASE}/kids-house-game/?hood=http://localhost:{PORT_HOOD}'); await solo.wait_for_selector('#stage .char'); await solo.wait_for_timeout(400)
            solo_now = await solo.evaluate("""() => { const s = __store.get(); return { v: s.version, old: Object.fromEntries(['living','bedroom','kitchen','salon'].map(r => [r, s.rooms[r].items.map(i => i.id)])), nursery: s.rooms.nursery.items.map(i => i.kind), tabs: [...document.querySelectorAll('.tab')].map(t => t.textContent.trim()) }; }""")
            solo_old = {r: [i['id'] for i in solo_a['rooms'][r]['items']] for r in solo_a['rooms']}
            check('an old solo save gains a nursery with starter pieces and loses nothing', solo_now['v'] == 3 and solo_now['nursery'] == STARTER_KINDS and all(sorted(solo_now['old'][r]) == sorted(solo_old[r]) for r in solo_old) and solo_now['tabs'][-1] == 'Nursery')
            follow = await solo.evaluate("""() => { const s = __store.get(); const p = __pets(); return { kennel: s.dogKennel || null, name: s.dog && s.dog.name, following: p.dogs.indexOf('solo') >= 0, shown: p.kennel }; }""")
            check('an old save loads with the dog following', not follow['kennel'] and follow['name'] == 'Rocket' and follow['following'] and not follow['shown'], str(follow))
            await solo.evaluate("""() => __store.dispatch({type:'item/add', room:'nursery', item:{id:'solo-round', kind:'bunny-plush', x:420, y:500, flip:false}})""")
            await solo.wait_for_timeout(500); await solo.reload(); await solo.wait_for_selector('#stage .char'); await solo.wait_for_timeout(300)
            solo_back = await solo.evaluate("""() => { const s = JSON.parse(localStorage.getItem('cozy-house')); return { nursery: s.rooms.nursery.items.map(i => i.id), living: s.rooms.living.items.map(i => i.id) }; }""")
            check('a nursery edit round-trips in the solo save', 'solo-round' in solo_back['nursery'] and all(i in solo_back['nursery'] for i in ('cloud-rug-0', 'crib-1', 'crib-mobile-2', 'rocker-3')) and sorted(solo_back['living']) == sorted(i['id'] for i in solo_a['rooms']['living']['items']))
            await solo_ctx.close()
            # street: first nursery edit writes the filled room, and the other iPad sees it
            k2house = ids_a[1][1]
            if not await P.evaluate("document.body.classList.contains('view-house') && __ui().currentHouseId === " + json.dumps(k2house)):
                await P.click('#btnMap'); await P.wait_for_timeout(400); await P.click(f'.mapHouse[data-go="house:{k2house}"]'); await P.wait_for_timeout(800)
            if (await K2.evaluate("__ui()")).get('currentHouseId') != k2house:
                await K2.click('#btnMap'); await K2.wait_for_timeout(400); await K2.click('#mapWorld .mapHouse.mine'); await K2.wait_for_timeout(800)
            before_items = {r: [i['id'] for i in snap_a['houses'][k2house]['view']['rooms'][r]['items']] for r in OLD_ROOMS}
            await K2.evaluate("""() => { const h = __hood(), id = h.myHouseId(); h.dispatch(id, {type:'item/add', room:'nursery', item:{id:'friend-nur', kind:'night-light', x:300, y:460, flip:false}}); h.dispatch(id, {type:'room/wallTile', room:'nursery', tile:'nursery/cloud-sky'}); }""")
            await K2.wait_for_timeout(800)
            seen = await P.evaluate("""() => { const n = __store.get().rooms.nursery; return { ids: n.items.map(i => i.id), tile: n.wallTile }; }""")
            check("a friend's nursery edit shows up on the other iPad", 'friend-nur' in seen['ids'] and seen['tile'] == 'nursery/cloud-sky' and all(i in seen['ids'] for i in ('cloud-rug-0', 'crib-1', 'crib-mobile-2', 'rocker-3')))
            await K2.wait_for_timeout(400)
            disk_after = None
            for fn in os.listdir(M + '/data-new'):
                if not fn.endswith('.json') or fn.startswith('_'): continue
                blob = json.load(open(f'{M}/data-new/{fn}'))
                for v in blob.values():
                    if isinstance(v, dict) and v.get('id') == k2house and isinstance(v.get('state'), dict):
                        disk_after = v['state']
            check('the first edit writes the nursery onto the old stored house without dropping items',
                  disk_after and any(i['id'] == 'friend-nur' for i in disk_after['rooms']['nursery']['items'])
                  and [i['kind'] for i in disk_after['rooms']['nursery']['items'] if i['id'] != 'friend-nur'] == STARTER_KINDS
                  and all(sorted(i['id'] for i in disk_after['rooms'][r]['items']) == sorted(before_items[r]) for r in OLD_ROOMS))
            # Kennel the dog on the new build, then an old client edits the same house.
            await K2.evaluate("""() => { const h = __hood(), id = h.myHouseId();
              h.dispatch(id, {type:'item/add', room:'living', item:{id:'keep-kennel', kind:'kennel', x:1100, y:520, flip:false, z:1, scale:1}});
              h.dispatch(id, {type:'dog/kennel', item:'keep-kennel'}); }""")
            await K2.wait_for_timeout(900)
            # A new client publishes a full look. Friends see look2 plus the legacy colors an old iPad can draw.
            pid_p = ids_a[0][0]
            await P.evaluate("""() => {
              const look2 = { v: 1, hair: 'puffs', hairC: '#2b1d16', skin: '#f1c27d', eyes: 'sparkle', eyeC: '#3d7ec4', freckles: true, blush: true, top: 'hoodie', topC: '#ff7aa8', bottom: 'skirt', bottomC: '#5aa9e6', dress: '', dressC: '#ff7aa8', shoes: 'sneakers', shoesC: '#ffffff', acc: ['glasses', 'bow'], accC: '#ffd166' };
              const legacy = __avatar.legacyFromLook2(look2);
              __hood().setLook(Object.assign({ size: 'kid' }, legacy, { look2: look2 }));
            }""")
            await P.wait_for_timeout(800)
            synced = await K2.evaluate("""(pid) => { const L = (__hood().players.get(pid) || {}).look; return L ? { hair: L.hair, style: L.look2 && L.look2.hair, acc: L.acc } : null; }""", pid_p)
            check('new look2 syncs to another iPad with a legacy hair color', synced and synced.get('style') == 'puffs' and synced.get('hair') == '#2b1d16' and synced.get('acc') == 2, str(synced))
            await P.evaluate("""(id) => { __hood().sendMail(id, 'Come play in the yard!', 1, 2); }""", k2house)
            await P.wait_for_timeout(900)
            mailed = await K2.evaluate("""(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L[0] && L[0].text.indexOf('yard') >= 0 && !!L[0].from; }""", k2house)
            check('a letter lands in her mailbox', mailed)
            # old client (27cfcac) against this new server, visiting the house that now has a nursery
            serve_build('/tmp/prod-dist')
            old_errs = []
            P.on('pageerror', lambda e: old_errs.append(str(e)))
            await P.goto(URL); await P.wait_for_timeout(1500)
            try: await P.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=10000)
            except Exception:
                await P.screenshot(path='/tmp/mig-old-client.png'); raise
            old_tabs = await P.locator('.tab').all_inner_texts()
            check('old client shows four tabs and does not draw the nursery', len(old_tabs) == 4 and not any('Nursery' in t for t in old_tabs), str(old_tabs))
            face = await P.evaluate("""() => { const svg = document.querySelector('.mapFace.mine svg'); return svg ? svg.getAttribute('data-chibi') : 'missing'; }""")
            check('old client draws the new kid without the chibi avatar', face is None and not old_errs, str(face) + ' ' + '; '.join(old_errs[:2]))
            os.makedirs('/opt/cursor/artifacts', exist_ok=True)
            await P.click('#mapWorld .mapHouse.mine'); await P.wait_for_timeout(900)
            body = await P.evaluate("""() => { const svg = document.querySelector('.char.avatar.mine svg'); return svg ? svg.getAttribute('data-chibi') : 'missing'; }""")
            check('old client house body has no chibi markup', body is None and not old_errs, str(body))
            await P.screenshot(path='/opt/cursor/artifacts/old-client-view.png')
            await P.click('#btnMap'); await P.wait_for_timeout(500)
            check('old client does not show mailboxes', await P.locator('.mapMail').count() == 0)
            await P.evaluate("""() => {
              const L = __hood().players.get(__hood().pid).look;
              __hood().setLook({ skin: L.skin, hair: L.hair, hairStyle: L.hairStyle, shirt: '#80ed99', pants: L.pants, size: L.size, acc: L.acc });
            }""")
            await P.wait_for_timeout(800)
            dropped = await K2.evaluate("""(pid) => { const L = (__hood().players.get(pid) || {}).look || {}; return { shirt: L.shirt, look2: Object.prototype.hasOwnProperty.call(L, 'look2') ? L.look2 : 'absent' }; }""", pid_p)
            check('old client edit drops look2 and keeps the new shirt', dropped and dropped.get('shirt') == '#80ed99' and dropped.get('look2') in (None, 'absent') and not old_errs, str(dropped) + ' ' + '; '.join(old_errs[:2]))
            await P.click(f'.mapHouse[data-go="house:{k2house}"]'); await P.wait_for_timeout(900)
            await P.evaluate("""() => { const h = __hood(), id = """ + json.dumps(k2house) + """; const kind = Object.keys(__items)[0]; h.dispatch(id, {type:'item/add', room:'living', item:{id:'old-client-edit', kind, x:440, y:520, flip:false}}); }""")
            await P.wait_for_timeout(900)
            k2_sees = await K2.evaluate("""() => { const s = __hood().view(""" + json.dumps(k2house) + """); return { edit: s.rooms.living.items.some(i => i.id === 'old-client-edit'), nursery: s.rooms.nursery.items.map(i => i.id) }; }""")
            await K2.wait_for_timeout(500)
            disk_old = None
            for fn in os.listdir(M + '/data-new'):
                if not fn.endswith('.json') or fn.startswith('_'): continue
                blob = json.load(open(f'{M}/data-new/{fn}'))
                for v in blob.values():
                    if isinstance(v, dict) and v.get('id') == k2house and isinstance(v.get('state'), dict):
                        disk_old = v['state']
            check('old client edit syncs and the server copy keeps the nursery', k2_sees['edit'] and 'friend-nur' in k2_sees['nursery'] and disk_old and any(i['id'] == 'friend-nur' for i in disk_old['rooms']['nursery']['items']) and any(i['id'] == 'old-client-edit' for i in disk_old['rooms']['living']['items']) and not old_errs, str(k2_sees) + ' ' + '; '.join(old_errs[:2]))
            check('old client round-trip keeps the kennel state', bool(disk_old and disk_old.get('dogKennel') and disk_old['dogKennel'].get('item') == 'keep-kennel' and any(i['id'] == 'keep-kennel' for i in disk_old['rooms']['living']['items']) and not old_errs), str(None if not disk_old else disk_old.get('dogKennel')))
            kept_mail = [L for L in ((disk_old or {}).get('mailbox') or {}).get('letters') or [] if 'yard' in (L.get('text') or '')]
            k2_mail = await K2.evaluate("""(id) => { const L = ((__hood().view(id).mailbox || {}).letters || [])[0]; return L && L.text; }""", k2house)
            check('old client edit keeps the mail', bool(kept_mail) and k2_mail and 'yard' in k2_mail and await K2.locator('.mapMail').count() >= 1, str(kept_mail)[:160] + ' k2=' + str(k2_mail))
            # rollback: old client opens a save that already contains a nursery
            rolled = json.loads(json.dumps(solo_a))
            rolled['rooms']['nursery'] = {'wallpaper': '#d6f3ff', 'floor': '#f3ddc4', 'pattern': 1, 'items': [{'id': 'keep-crib', 'kind': 'crib', 'x': 100, 'y': 200, 'flip': False, 'z': 1, 'scale': 1}]}
            rolled['rooms']['backyard'] = {'wallpaper': '#c5ecff', 'floor': '#b6e3a8', 'pattern': 0, 'items': [{'id': 'keep-yard', 'kind': 'plant', 'x': 80, 'y': 400, 'flip': False, 'z': 1, 'scale': 1}]}
            rolled['currentRoom'] = 'living'
            rolled['dogKennel'] = {'item': 'keep-kennel'}
            rolled['rooms']['living']['items'].append({'id': 'keep-kennel', 'kind': 'kennel', 'x': 400, 'y': 500, 'flip': False, 'z': 2, 'scale': 1})
            rolled['mailbox'] = {'letters': [{'id': 'mkeepmail01', 'from': 'Quinn', 'fromPid': 'poldclient', 'text': 'Hi from the mailbox', 'color': 1, 'sticker': 2, 'at': int(time.time() * 1000)}]}
            rb = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
            await rb.add_init_script("localStorage.setItem('cozy-whatsnew','6'); localStorage.setItem('cozy-house', " + json.dumps(json.dumps(rolled)) + ");")
            rpg = await rb.new_page(); rpg.on('pageerror', lambda e: old_errs.append('rollback ' + str(e)))
            await rpg.goto(f'{BASE}/kids-house-game/?hood=http://localhost:{PORT_HOOD}'); await rpg.wait_for_selector('#stage .char'); await rpg.wait_for_timeout(400)
            await rpg.evaluate("""() => __store.dispatch({type:'room/wallpaper', room:'living', color:'#ddeeff'})""")
            await rpg.wait_for_timeout(500)
            kept = await rpg.evaluate("""() => { const s = JSON.parse(localStorage.getItem('cozy-house')); const mail = (s.mailbox && s.mailbox.letters || [])[0]; return { tabs: [...document.querySelectorAll('.tab')].length, nursery: (s.rooms.nursery.items || []).map(i => i.id), yard: (s.rooms.backyard.items || []).map(i => i.id), wall: s.rooms.living.wallpaper, kennel: s.dogKennel || null, kennelItem: (s.rooms.living.items || []).some(i => i.id === 'keep-kennel'), mail: mail && mail.text, boxes: document.querySelectorAll('.mapMail').length }; }""")
            check('old client keeps a nursery that was already in the save', kept['tabs'] == 4 and kept['nursery'] == ['keep-crib'] and kept['yard'] == ['keep-yard'] and kept['wall'] == '#ddeeff' and kept['kennel'] and kept['kennel']['item'] == 'keep-kennel' and kept['kennelItem'] and kept['mail'] == 'Hi from the mailbox' and kept['boxes'] == 0 and not any(e.startswith('rollback') for e in old_errs), str(kept))
            await rb.close()
            serve_build('/tmp/new-dist')
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
