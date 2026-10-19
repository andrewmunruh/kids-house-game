# Current main (1f0aa5c) against this server. She can edit a house, and the letter stays.
# The old page never draws a mailbox. Needs /tmp/dist-1f0aa5c and /tmp/new-dist.
import asyncio, json, os, shutil, signal, subprocess, sys, time
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
M = '/tmp/mailold'
WWW = M + '/www'
PORT_WEB = 4192
PORT_HOOD = 8798
OLD = '/tmp/dist-1f0aa5c'
NEW = '/tmp/new-dist'
BASE = f'http://localhost:{PORT_WEB}'
URL = f'{BASE}/kids-house-game/?hood=http://localhost:{PORT_HOOD}'
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def server(data):
    env = dict(os.environ, PORT=str(PORT_HOOD), HOOD_DATA=data)
    return subprocess.Popen(['npx', 'tsx', 'server/node.ts'], cwd=ROOT, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)

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
    try:
        os.killpg(pr.pid, signal.SIGTERM)
    except Exception:
        pass

def serve(dist):
    link = WWW + '/kids-house-game'
    if os.path.islink(link) or os.path.exists(link):
        os.unlink(link)
    os.symlink(dist, link)

def mailbox_on_disk(data, text):
    for fn in os.listdir(data):
        if not fn.endswith('.json') or fn.startswith('_'):
            continue
        blob = json.load(open(os.path.join(data, fn)))
        if not isinstance(blob, dict):
            continue
        for v in blob.values():
            if not isinstance(v, dict):
                continue
            letters = ((v.get('state') or {}).get('mailbox') or {}).get('letters') or []
            if any(text in (L.get('text') or '') for L in letters):
                return True
    return False

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
    if not os.path.isdir(OLD) or not os.path.isdir(NEW):
        print('missing builds', OLD, NEW)
        sys.exit(2)
    shutil.rmtree(M, ignore_errors=True)
    os.makedirs(WWW)
    os.makedirs(M + '/data')
    serve(NEW)
    code = (
        "import http.server, functools\n"
        "class H(http.server.SimpleHTTPRequestHandler):\n"
        "    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
        "    def log_message(self, *a): pass\n"
        f"http.server.ThreadingHTTPServer(('', {PORT_WEB}), functools.partial(H, directory='{WWW}')).serve_forever()"
    )
    web = subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    hood = server(M + '/data')
    if not (wait_port(PORT_HOOD) and wait_port(PORT_WEB)):
        print('servers did not start')
        stop(web); stop(hood); sys.exit(2)
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch()
            async def ctx():
                c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
                await c.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
                return c
            P = await (await ctx()).new_page()
            K = await (await ctx()).new_page()
            errs = []
            P.on('pageerror', lambda e: errs.append('P ' + str(e)))
            K.on('pageerror', lambda e: errs.append('K ' + str(e)))
            await P.goto(URL)
            await K.goto(URL)
            await P.wait_for_timeout(400)
            await P.click('#btnHood')
            await P.click('[data-m="create"]')
            await adult(P)
            await P.wait_for_selector('#newCode')
            code_txt = (await P.inner_text('#newCode')).strip()
            await P.click('[data-m="setup"]')
            await P.wait_for_selector('#pCode')
            for n in ('Reagan', 'Quinn'):
                await P.click(f'.sugg button:has-text("{n}")')
                await P.wait_for_timeout(200)
            await P.click('.hoodSheet [data-m="close"]')
            await join(P, code_txt, 'Reagan', True)
            await join(K, code_txt, 'Quinn', False)
            k_house = await K.evaluate('__hood().myHouseId()')
            await P.evaluate("(id) => __hood().sendMail(id, 'Come play in the yard!', 1, 2)", k_house)
            await K.wait_for_function("(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L[0] && L[0].text.indexOf('yard') >= 0; }", arg=k_house, timeout=8000)
            serve(OLD)
            await P.goto(URL)
            await P.wait_for_selector('body.view-map .mapHouse', timeout=10000)
            check('1f0aa5c draws no mailbox', await P.locator('.mapMail').count() == 0)
            await P.click(f'.mapHouse[data-go="house:{k_house}"]')
            await P.wait_for_timeout(800)
            await P.evaluate("""(id) => { const h = __hood(); const kind = Object.keys(__items)[0]; h.dispatch(id, {type:'item/add', room:'living', item:{id:'old-main-edit', kind, x:480, y:520, flip:false}}); }""", k_house)
            await P.wait_for_timeout(900)
            still = await K.evaluate("(id) => { const L = ((__hood().view(id).mailbox || {}).letters || [])[0]; return L && L.text; }", k_house)
            check('1f0aa5c edit keeps the letter', still and 'yard' in still and mailbox_on_disk(M + '/data', 'yard') and not errs, str(still) + ' ' + '; '.join(errs[:2]))
            rolled = {
                'version': 3, 'currentRoom': 'living',
                'rooms': {'living': {'wallpaper': '#fff', 'floor': '#eee', 'pattern': 0, 'items': []}},
                'characters': [{'id': 'c1', 'name': 'Reagan', 'size': 'kid', 'x': 400, 'room': 'living', 'skin': '#f1c27d', 'hair': '#6b3f1d', 'hairStyle': 0, 'shirt': '#fff', 'pants': '#88c', 'acc': 0, 'held': {'left': None, 'right': None}}],
                'mailbox': {'letters': [{'id': 'mkeepmail01', 'from': 'Quinn', 'fromPid': 'poldclient', 'text': 'Hi from the mailbox', 'color': 1, 'sticker': 2, 'at': int(time.time() * 1000)}]},
            }
            rb = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
            await rb.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('cozy-house', " + json.dumps(json.dumps(rolled)) + ");")
            rpg = await rb.new_page()
            rb_errs = []
            rpg.on('pageerror', lambda e: rb_errs.append(str(e)))
            await rpg.goto(URL)
            await rpg.wait_for_selector('#stage .char')
            await rpg.wait_for_timeout(400)
            await rpg.evaluate("""() => __store.dispatch({type:'room/wallpaper', room:'living', color:'#ddeeff'})""")
            await rpg.wait_for_timeout(500)
            kept = await rpg.evaluate("""() => { const s = JSON.parse(localStorage.getItem('cozy-house')); const mail = (s.mailbox && s.mailbox.letters || [])[0]; return { wall: s.rooms.living.wallpaper, mail: mail && mail.text, boxes: document.querySelectorAll('.mapMail').length }; }""")
            check('1f0aa5c keeps a mailbox already in the save', kept['wall'] == '#ddeeff' and kept['mail'] == 'Hi from the mailbox' and kept['boxes'] == 0 and not rb_errs, str(kept) + ' ' + '; '.join(rb_errs[:2]))
            await b.close()
    finally:
        stop(web); stop(hood)
    failed = [k for k, v in res.items() if not v]
    print('OLD CLIENT', 'ok' if not failed else 'FAILED ' + ', '.join(failed), flush=True)
    if failed:
        sys.exit(1)

asyncio.run(main())
