# Release B0 (fbd04db) saves and a mixed street against avatar B1.
# Needs /tmp/b0tree (worktree at fbd04db), /tmp/b0-dist, and /tmp/new-dist.
# A mailbox written by B0 must survive the B1 server, and a B0 client on the
# same street must not see look2, must be able to use the mailbox, and must
# not wipe look2 or the mailbox when she edits. A legacy char/update keeps look2.
import asyncio, json, os, shutil, signal, subprocess, sys, time
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
M = '/tmp/b0mig'
WWW_B0 = M + '/www-b0'
WWW_B1 = M + '/www-b1'
PORT_B0 = 4195
PORT_B1 = 4196
PORT_HOOD = 8799
B0_TREE = '/tmp/b0tree'
B0_DIST = '/tmp/b0-dist'
B1_DIST = '/tmp/new-dist'
DATA = M + '/data'
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def server(cwd, data):
    env = dict(os.environ, PORT=str(PORT_HOOD), HOOD_DATA=data)
    return subprocess.Popen(['npx', 'tsx', 'server/node.ts'], cwd=cwd, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, start_new_session=True)

def wait_port(port, t=30):
    import socket
    end = time.time() + t
    while time.time() < end:
        try:
            socket.create_connection(('127.0.0.1', port), 0.5).close()
            return True
        except OSError:
            time.sleep(0.3)
    return False

def stop(pr):
    if not pr:
        return
    try:
        os.killpg(pr.pid, signal.SIGTERM)
    except Exception:
        pass

def serve(www, dist, port):
    os.makedirs(www, exist_ok=True)
    link = www + '/kids-house-game'
    if os.path.islink(link) or os.path.exists(link):
        os.unlink(link)
    os.symlink(dist, link)
    code = (
        "import http.server, functools\n"
        "class H(http.server.SimpleHTTPRequestHandler):\n"
        "    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
        "    def log_message(self, *a): pass\n"
        f"http.server.ThreadingHTTPServer(('', {port}), functools.partial(H, directory='{www}')).serve_forever()"
    )
    return subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)

def url(port):
    return f'http://localhost:{port}/kids-house-game/?hood=http://localhost:{PORT_HOOD}'

SNAP = """(() => { const h = __hood(); if (!h) return null;
  const houses = {}; for (const [id, x] of h.houses) houses[id] = { meta: { name: x.meta.name, ownerId: x.meta.ownerId, locked: x.meta.locked }, view: h.view(id) };
  const players = {}; for (const [pid, p] of h.players) players[pid] = { nickname: p.nickname, houseId: p.houseId, look: p.look };
  return { pid: h.pid, myHouse: h.myHouseId(), houses, players }; })()"""

def body(view):
    return {k: v for k, v in (view or {}).items() if k != 'rooms'}

def strict(a, b):
    bad = []
    ha, hb = a.get('houses') or {}, b.get('houses') or {}
    if set(ha) != set(hb):
        bad.append('houses')
    for hid in ha:
        if hid not in hb:
            continue
        va, vb = ha[hid]['view'], hb[hid]['view']
        if body(va) != body(vb):
            bad.append('body:' + hid[-4:])
        ra, rb = (va.get('rooms') or {}), (vb.get('rooms') or {})
        if ra != rb:
            bad.append('rooms:' + hid[-4:])
    return bad

def disk_letter(data, text):
    for fn in os.listdir(data):
        if not fn.endswith('.json') or fn.startswith('_'):
            continue
        blob = json.load(open(os.path.join(data, fn)))
        if not isinstance(blob, dict):
            continue
        for v in blob.values():
            if not isinstance(v, dict):
                continue
            state = v.get('state')
            if not isinstance(state, dict):
                continue
            letters = ((state.get('mailbox') or {}).get('letters') or [])
            if any(text in (L.get('text') or '') for L in letters):
                return state
    return None

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def join(pg, code, nick, bring):
    await pg.click('#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code)
    await pg.click('#codeForm button')
    await pg.click(f'.nicks button:has-text("{nick}")')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

async def main():
    for path, label in ((B0_TREE, 'b0 tree'), (B0_DIST, 'b0 dist'), (B1_DIST, 'b1 dist')):
        if not os.path.isdir(path):
            print('missing', label, path)
            sys.exit(2)
    shutil.rmtree(M, ignore_errors=True)
    os.makedirs(DATA)
    web_b0 = serve(WWW_B0, B0_DIST, PORT_B0)
    hood = server(B0_TREE, DATA)
    if not (wait_port(PORT_HOOD) and wait_port(PORT_B0)):
        print('b0 servers did not start')
        stop(web_b0); stop(hood); sys.exit(2)
    web_b1 = None
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            async def ctx(port_skip=True):
                c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
                await c.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
                return c
            P = await (await ctx()).new_page()
            K = await (await ctx()).new_page()
            errs = []
            P.on('pageerror', lambda e: errs.append('P ' + str(e)))
            K.on('pageerror', lambda e: errs.append('K ' + str(e)))
            await P.goto(url(PORT_B0))
            await K.goto(url(PORT_B0))
            await P.wait_for_timeout(400)
            await P.click('#btnHood')
            await P.click('[data-m="create"]')
            await adult(P)
            await P.wait_for_selector('#newCode')
            code = (await P.inner_text('#newCode')).strip()
            await P.click('[data-m="setup"]')
            await P.wait_for_selector('#pCode')
            for n in ('Reagan', 'Quinn'):
                await P.click(f'.sugg button:has-text("{n}")')
                await P.wait_for_timeout(150)
            await P.click('.hoodSheet [data-m="close"]')
            await join(P, code, 'Reagan', True)
            await join(K, code, 'Quinn', False)
            k_house = await K.evaluate('__hood().myHouseId()')
            await P.evaluate("(id) => __hood().sendMail(id, 'Come play in the yard!', 1, 2)", k_house)
            await K.wait_for_function("(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L[0] && L[0].text.indexOf('yard') >= 0; }", arg=k_house, timeout=8000)
            await K.wait_for_timeout(800)
            before = await K.evaluate(SNAP)
            saved = disk_letter(DATA, 'yard')
            check('fbd04db wrote a mailbox into the save', bool(saved) and before and 'yard' in json.dumps(before), '')
            stop(hood)
            time.sleep(1)
            hood = server(ROOT, DATA)
            if not wait_port(PORT_HOOD):
                check('B1 server reopened the B0 save', False, 'port')
                return
            # Same origin, so the iPads keep their sign-in. Swap the files the web server is pointing at.
            serve_link = WWW_B0 + '/kids-house-game'
            if os.path.islink(serve_link) or os.path.exists(serve_link):
                os.unlink(serve_link)
            os.symlink(B1_DIST, serve_link)
            await P.goto(url(PORT_B0))
            await K.goto(url(PORT_B0))
            try:
                await K.wait_for_selector('body.view-map .mapHouse', timeout=12000)
                await P.wait_for_selector('body.view-map .mapHouse', timeout=12000)
            except Exception:
                info = await K.evaluate("() => document.body.className + ' ' + (document.body.innerText || '').slice(0, 180)")
                await K.screenshot(path='/tmp/b0-reload.png')
                check('fbd04db mailbox save migrates strictly onto B1', False, 'no map ' + info + ' ' + '; '.join(errs[:3]))
                return
            await K.wait_for_timeout(600)
            after = await K.evaluate(SNAP)
            diff = strict(before, after) if before and after else ['nosnap']
            letters = (((after or {}).get('houses') or {}).get(k_house) or {}).get('view', {}).get('mailbox', {}).get('letters') or []
            check('fbd04db mailbox save migrates strictly onto B1', not diff and any('yard' in (L.get('text') or '') for L in letters) and not errs, str(diff) + ' ' + '; '.join(errs[:2]))
            k_before = (((before or {}).get('houses') or {}).get(k_house) or {}).get('view') or {}
            k_after = (((after or {}).get('houses') or {}).get(k_house) or {}).get('view') or {}
            yb = (k_before.get('rooms') or {}).get('backyard') or {}
            ya = (k_after.get('rooms') or {}).get('backyard') or {}
            check('an fbd04db empty yard stays empty, and nursery, kennel, mailbox, and look2 match',
                  (yb.get('items') or []) == [] and (ya.get('items') or []) == []
                  and ya.get('wallpaper') == yb.get('wallpaper') and ya.get('floor') == yb.get('floor')
                  and (k_after.get('rooms') or {}).get('nursery') == (k_before.get('rooms') or {}).get('nursery')
                  and k_after.get('dogKennel') == k_before.get('dogKennel')
                  and k_after.get('mailbox') == k_before.get('mailbox')
                  and k_after.get('characters') == k_before.get('characters'),
                  'yard=' + json.dumps(ya.get('items')))
            # A local copy of that save, opened on B1, keeps the mailbox when she edits and when she adds a look.
            solo = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1, has_touch=True)
            payload = json.dumps(saved)
            await solo.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('cozy-house', " + json.dumps(payload) + ");")
            sp = await solo.new_page()
            serrs = []
            sp.on('pageerror', lambda e: serrs.append(str(e)))
            await sp.goto(f'http://localhost:{PORT_B0}/kids-house-game/')
            await sp.wait_for_selector('#stage .char', timeout=8000)
            await sp.evaluate("""() => {
              __store.dispatch({type:'room/wallpaper', room:'living', color:'#ddeeff'});
              const look2 = __avatar.sanitizeLook2({ v:1, hair:'puffs', hairC:'#2b1d16', skin:'#f1c27d', eyes:'round', eyeC:'#5a321c', freckles:false, blush:true, top:'classic', topC:'#ff7aa8', bottom:'pants', bottomC:'#5aa9e6', dress:'', dressC:'#ff7aa8', shoes:'classic', shoesC:'#5a3d5c', acc:['bow'], accC:'#ffd166' });
              const legacy = __avatar.legacyFromLook2(look2);
              __store.dispatch({ type:'char/update', id: __store.get().characters[0].id, patch: Object.assign({ look2: look2 }, legacy) });
            }""")
            await sp.wait_for_timeout(400)
            kept = await sp.evaluate("""() => { const s = JSON.parse(localStorage.getItem('cozy-house')); const L = (s.mailbox && s.mailbox.letters || [])[0]; const c = s.characters[0]; return { wall: s.rooms.living.wallpaper, mail: L && L.text, from: L && L.from, hair: c.look2 && c.look2.hair, chibi: document.querySelector('#stage .char svg') && document.querySelector('#stage .char svg').getAttribute('data-chibi') }; }""")
            check('a B0 save with a mailbox keeps the letter when B1 adds a look', kept['wall'] == '#ddeeff' and kept['mail'] == 'Come play in the yard!' and kept['from'] == 'Reagan' and kept['hair'] == 'puffs' and kept['chibi'] == '1' and not serrs, str(kept) + ' ' + '; '.join(serrs[:2]))
            await solo.close()

            # Mixed street: this B1 build and the fbd04db build, one hood. Fresh iPads, two origins.
            if os.path.islink(serve_link) or os.path.exists(serve_link):
                os.unlink(serve_link)
            os.symlink(B0_DIST, serve_link)
            web_b1 = serve(WWW_B1, B1_DIST, PORT_B1)
            if not wait_port(PORT_B1):
                check('B1 page is up', False)
                return
            B1 = await (await ctx()).new_page()
            B0 = await (await ctx()).new_page()
            merrs = []
            B1.on('pageerror', lambda e: merrs.append('B1 ' + str(e)))
            B0.on('pageerror', lambda e: merrs.append('B0 ' + str(e)))
            await B1.goto(url(PORT_B1))
            await B0.goto(url(PORT_B0))
            await B1.wait_for_timeout(300)
            await B1.click('#btnHood')
            await B1.click('[data-m="create"]')
            await adult(B1)
            await B1.wait_for_selector('#newCode')
            code2 = (await B1.inner_text('#newCode')).strip()
            await B1.click('[data-m="setup"]')
            await B1.wait_for_selector('#pCode')
            for n in ('Chloe', 'Sloane'):
                await B1.click(f'.sugg button:has-text("{n}")')
                await B1.wait_for_timeout(150)
            await B1.click('.hoodSheet [data-m="close"]')
            await join(B1, code2, 'Chloe', False)
            await B1.evaluate("""() => {
              const look2 = { v:1, hair:'buns', hairC:'#5b3a29', skin:'#f1c27d', eyes:'sparkle', eyeC:'#3d7ec4', freckles:true, blush:true, top:'hoodie', topC:'#ff7aa8', bottom:'skirt', bottomC:'#5aa9e6', dress:'', dressC:'#ff7aa8', shoes:'sneakers', shoesC:'#ffffff', acc:['glasses'], accC:'#ffd166' };
              const legacy = __avatar.legacyFromLook2(__avatar.sanitizeLook2(look2));
              __hood().setLook(Object.assign({ size:'kid' }, legacy, { look2: __avatar.sanitizeLook2(look2) }));
            }""")
            await join(B0, code2, 'Sloane', False)
            await B0.wait_for_timeout(700)
            b1pid = await B1.evaluate('__hood().pid')
            b1house = await B1.evaluate('__hood().myHouseId()')
            invisible = await B0.evaluate("""(pid) => { const el = document.querySelector('.mapFace[data-pid="' + pid + '"] svg'); return el ? el.getAttribute('data-chibi') : 'missing'; }""", b1pid)
            visible = await B1.evaluate("""() => { const el = document.querySelector('.mapFace.mine svg'); return el ? el.getAttribute('data-chibi') : 'missing'; }""")
            check('look2 is invisible to the fbd04db client and drawn by B1', invisible is None and visible == '1', f'old={invisible} new={visible}')
            await B0.evaluate("(id) => __hood().sendMail(id, 'Hi from the old iPad', 0, 0)", b1house)
            await B1.wait_for_function("(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L.some(x => x.text.indexOf('old iPad') >= 0 && x.from === 'Sloane'); }", arg=b1house, timeout=8000)
            b0house = await B0.evaluate('__hood().myHouseId()')
            await B1.evaluate("(id) => __hood().sendMail(id, 'Hi from the new iPad', 3, 2)", b0house)
            await B0.wait_for_function("(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L.some(x => x.text.indexOf('new iPad') >= 0 && x.from === 'Chloe'); }", arg=b0house, timeout=8000)
            check('the mailbox works for the old client and the new one', True)
            await B0.evaluate("""(id) => { const h = __hood(); const kind = Object.keys(__items)[0]; h.dispatch(id, {type:'item/add', room:'living', item:{id:'b0-keep', kind, x:420, y:520, flip:false}}); }""", b1house)
            await B0.evaluate("""() => { const L = __hood().players.get(__hood().pid).look; __hood().setLook({ skin:L.skin, hair:L.hair, hairStyle:L.hairStyle, shirt:'#80ed99', pants:L.pants, size:L.size, acc:L.acc }); }""")
            await B1.wait_for_timeout(900)
            kept_mix = await B1.evaluate("""(id) => {
              const me = __hood().players.get(__hood().pid).look || {};
              const L = ((__hood().view(id).mailbox || {}).letters || []).map(x => x.text);
              const edit = __hood().view(id).rooms.living.items.some(i => i.id === 'b0-keep');
              return { hair: me.look2 && me.look2.hair, mail: L, edit };
            }""", b1house)
            disk = disk_letter(DATA, 'old iPad')
            check('an fbd04db edit keeps look2 and the mailbox', kept_mix and kept_mix.get('hair') == 'buns' and kept_mix.get('edit') and any('old iPad' in t for t in kept_mix.get('mail') or []) and disk and not merrs, str(kept_mix) + ' ' + '; '.join(merrs[:3]))
            # Her house kid already has a chibi look. The cached fbd04db page sends only the legacy colors.
            await B1.evaluate("""(id) => {
              const look2 = __avatar.sanitizeLook2({ v:1, hair:'puffs', hairC:'#2b1d16', skin:'#f1c27d', eyes:'round', eyeC:'#5a321c', freckles:false, blush:true, top:'classic', topC:'#ff7aa8', bottom:'pants', bottomC:'#5aa9e6', dress:'', dressC:'#ff7aa8', shoes:'classic', shoesC:'#5a3d5c', acc:['bow'], accC:'#ffd166' });
              const legacy = __avatar.legacyFromLook2(look2);
              __hood().dispatch(id, { type:'char/update', id:'c1', patch: Object.assign({ size:'kid' }, legacy, { look2 }) });
            }""", b1house)
            await B1.wait_for_function("""(id) => { const c = (__hood().view(id).characters || []).find(x => x.id === 'c1'); return c && c.look2 && c.look2.hair === 'puffs'; }""", arg=b1house, timeout=8000)
            # wait for the server round-trip: the fbd04db page must have received the B1 update before it edits (else last-writer-wins reorders)
            await B0.wait_for_function("""(id) => { const c = ((__hood().view(id) || {}).characters || []).find(x => x.id === 'c1'); return c && c.shirt === '#ff7aa8'; }""", arg=b1house, timeout=8000, polling=250)
            await B0.evaluate("""(id) => {
              __hood().dispatch(id, { type:'char/update', id:'c1', patch: { skin:'#f1c27d', hair:'#2b1d16', hairStyle:2, shirt:'#80ed99', pants:'#5aa9e6', size:'kid', acc:1 } });
            }""", b1house)
            await B1.wait_for_function("""(id) => { const c = (__hood().view(id).characters || []).find(x => x.id === 'c1'); return c && c.shirt === '#80ed99'; }""", arg=b1house, timeout=8000)
            kept_kid = await B1.evaluate("""(id) => { const c = (__hood().view(id).characters || []).find(x => x.id === 'c1') || {}; return { hair: c.look2 && c.look2.hair, shirt: c.shirt }; }""", b1house)
            check('an old client look update keeps her chibi look', kept_kid and kept_kid.get('hair') == 'puffs' and kept_kid.get('shirt') == '#80ed99' and not merrs, str(kept_kid) + ' ' + '; '.join(merrs[:3]))
            # Yard case beside the mailbox and look2 cases. The fbd04db client is the old iPad.
            rooms_before = await B1.evaluate("""(id) => {
              const r = __hood().view(id).rooms;
              const other = {};
              for (const k of ['living','bedroom','kitchen','salon','nursery']) other[k] = JSON.stringify(r[k]);
              return { other, yard: ((r.backyard || {}).items || []).length };
            }""", b1house)
            await B1.evaluate("""(id) => {
              const h = __hood();
              h.dispatch(id, {type:'item/add', room:'backyard', item:{id:'yard-swing-1', kind:'yard-swing', x:1160, y:548, flip:false, z:1, scale:1}});
              h.dispatch(id, {type:'item/add', room:'backyard', item:{id:'tulip-1', kind:'tulip-bed', x:900, y:560, flip:false, z:1, scale:1}});
            }""", b1house)
            await B1.wait_for_timeout(800)
            placed = await B1.evaluate("""(id) => {
              const r = __hood().view(id).rooms;
              const other = {};
              for (const k of ['living','bedroom','kitchen','salon','nursery']) other[k] = JSON.stringify(r[k]);
              return { ids: (r.backyard.items || []).map(i => i.id), other };
            }""", b1house)
            check('the new client places a swing and a tulip bed without changing the other rooms',
                  rooms_before and rooms_before.get('yard') == 0 and placed
                  and sorted(placed['ids']) == ['tulip-1', 'yard-swing-1'] and placed['other'] == rooms_before['other'],
                  str(None if not placed else placed['ids']))
            await B0.click(f'#mapWorld .mapHouse[data-go="house:{b1house}"]')
            await B1.click('#mapWorld .mapHouse.mine')
            await B0.wait_for_function("() => !document.body.classList.contains('view-map') && !!document.querySelector('#layer')", timeout=8000)
            await B1.wait_for_function("() => !document.body.classList.contains('view-map') && !!document.querySelector('#layer')", timeout=8000)
            await B0.wait_for_timeout(500)
            old_ui = await B0.evaluate("""() => ({
              tabs: document.querySelectorAll('#tabs .tab').length,
              door: document.querySelectorAll('.yardDoor, .backDoor').length,
              swing: document.querySelectorAll('.item[data-kind="yard-swing"], .item[data-kind="tulip-bed"]').length,
            })""")
            check('the fbd04db client has five tabs, no back door, and does not draw the swing',
                  old_ui['tabs'] == 5 and old_ui['door'] == 0 and old_ui['swing'] == 0 and not merrs, str(old_ui) + ' ' + '; '.join(merrs[:2]))
            await B1.evaluate("""(id) => { const kind = Object.keys(__items)[0]; __hood().dispatch(id, {type:'item/add', room:'living', item:{id:'b1-keep', kind, x:560, y:520, flip:false, z:1, scale:1}}); }""", b1house)
            await B0.wait_for_function("(id) => ((__hood().view(id).rooms.living || {}).items || []).some(i => i.id === 'b1-keep')", arg=b1house, timeout=8000)
            both_ways = await B1.evaluate("""(id) => {
              const items = __hood().view(id).rooms.living.items;
              return { old: items.some(i => i.id === 'b0-keep'), neu: items.some(i => i.id === 'b1-keep'), yard: __hood().view(id).rooms.backyard.items.map(i => i.id) };
            }""", b1house)
            check('a living-room edit syncs both ways and the swing stays on the new iPad',
                  both_ways and both_ways.get('old') and both_ways.get('neu') and 'yard-swing-1' in (both_ways.get('yard') or []) and 'tulip-1' in (both_ways.get('yard') or []),
                  str(both_ways))
            await B0.evaluate("""(id) => {
              __hood().dispatch(id, { type:'char/update', id:'c1', patch: { skin:'#f1c27d', hair:'#2b1d16', hairStyle:2, shirt:'#c9a0dc', pants:'#5aa9e6', size:'kid', acc:1 } });
            }""", b1house)
            await B1.wait_for_function("""(id) => { const c = (__hood().view(id).characters || []).find(x => x.id === 'c1'); return c && c.shirt === '#c9a0dc'; }""", arg=b1house, timeout=8000)
            kept_yard = await B1.evaluate("""(id) => {
              const c = (__hood().view(id).characters || []).find(x => x.id === 'c1') || {};
              return { hair: c.look2 && c.look2.hair, yard: (__hood().view(id).rooms.backyard.items || []).map(i => i.id) };
            }""", b1house)
            on_disk = False
            for fn in os.listdir(DATA):
                if not fn.endswith('.json') or fn.startswith('_'): continue
                if 'yard-swing-1' in open(os.path.join(DATA, fn)).read():
                    on_disk = True
                    break
            check('a legacy look update keeps look2 and the yard items',
                  kept_yard and kept_yard.get('hair') == 'puffs' and 'yard-swing-1' in (kept_yard.get('yard') or []) and on_disk and not merrs,
                  str(kept_yard) + ' disk=' + str(on_disk))
            await B1.evaluate("""() => __store.dispatch({type:'room/switch', room:'backyard'})""")
            await B0.wait_for_timeout(700)
            friend_here = await B0.evaluate("""(pid) => document.querySelectorAll('.char[data-pid="' + pid + '"]').length""", b1pid)
            check('a friend whose room is the yard is not standing in the living room', friend_here == 0 and not merrs, 'drawn=' + str(friend_here))
            await B1.evaluate("""(id) => { const h = __hood(); h.dispatch(id, {type:'cat/move', room:'backyard', x:940}); }""", b1house)
            await B0.wait_for_timeout(600)
            cat_drawn = await B0.evaluate("() => document.querySelectorAll('.pet-cat').length")
            check('a cat whose home is the yard does not throw and is not drawn in the living room', cat_drawn == 0 and not merrs, 'cats=' + str(cat_drawn))
            await b.close()
    finally:
        for pr in (web_b0, web_b1, hood):
            stop(pr)
        time.sleep(0.5)
    failed = [k for k, v in res.items() if not v]
    print(f"\n{sum(res.values())}/{len(res)} passed", flush=True)
    if failed:
        print('FAILED ' + ', '.join(failed), flush=True)
        sys.exit(1)

asyncio.run(main())
