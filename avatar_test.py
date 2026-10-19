# Avatar v2 in the browser. Customizer layout, first-run, Surprise me, two-client sync,
# a held teddy, a chibi rider, and 6 kids animating under 4x CPU throttle.
# Needs the preview on :4173. The hood comes from the page URL (?hood=) or HOOD.
# There is no silent default of :8787 for the old client, so a worker run cannot join the node hood.
# If /tmp/prod-dist exists, an old build is served on a free port so a 1f0aa5c client can see the new kids.
import asyncio, os, socket, subprocess, sys, tempfile, time
from urllib.parse import parse_qs, urlparse
from playwright.async_api import async_playwright
from testnav import tap, SKIP_WN, go, local_page

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = os.environ.get('ARTIFACT_DIR') or tempfile.mkdtemp(prefix='avatar-artifacts-')
KIT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tests', 'fixtures', 'chibi')
OLD_DIST = '/tmp/prod-dist'

def hood_for(page_url: str) -> str:
    got = (parse_qs(urlparse(page_url).query).get('hood') or [''])[0].strip()
    if not got:
        got = os.environ.get('HOOD', '').strip()
    if not got:
        raise SystemExit('avatar_test: pass ?hood= on the page URL or set HOOD')
    return got.rstrip('/')

def free_port() -> int:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def serve_old():
    www = '/tmp/avatar-old-www'
    os.makedirs(www, exist_ok=True)
    link = www + '/kids-house-game'
    if os.path.islink(link) or os.path.exists(link):
        os.remove(link) if not os.path.islink(link) else os.unlink(link)
    os.symlink(OLD_DIST, link)
    port = free_port()
    code = ("import http.server, functools\n"
            "class H(http.server.SimpleHTTPRequestHandler):\n"
            "    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
            "    def log_message(self, *a): pass\n"
            f"http.server.ThreadingHTTPServer(('127.0.0.1', {port}), functools.partial(H, directory='{www}')).serve_forever()")
    pr = subprocess.Popen([sys.executable, '-c', code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    end = time.time() + 10
    while time.time() < end:
        try:
            socket.create_connection(('127.0.0.1', port), 0.4).close()
            return pr, port
        except OSError:
            time.sleep(0.2)
    raise SystemExit('old client page did not start')

LINEUP = r"""() => {
  const base = (hair, hairC, skin, top, topC, bottom, bottomC, dress, dressC, shoes, acc) => ({
    v: 1, hair, hairC, skin, eyes: 'sparkle', eyeC: '#3d7ec4', freckles: true, blush: true,
    top, topC, bottom, bottomC, dress, dressC, shoes, shoesC: '#ffffff', acc, accC: '#ffd166'
  });
  const looks = [
    base('puffs', '#2b1d16', '#c68642', 'hoodie', '#ff7aa8', 'skirt', '#5aa9e6', '', '#ff7aa8', 'sneakers', ['glasses', 'bow']),
    base('pony', '#ff8fab', '#f1c27d', 'stripes', '#ffd166', 'jeans', '#3d4a6b', '', '#ffd166', 'boots', ['flower']),
    base('braids', '#1d1416', '#8d5524', 'classic', '#c9a0dc', 'pants', '#c9a0dc', 'party', '#c9a0dc', 'maryjanes', ['bow']),
    base('buns', '#f4d58d', '#ffe0c4', 'classic', '#80ed99', 'shorts', '#ff9f68', '', '#80ed99', 'sandals', ['flower']),
    base('afro', '#5b3a29', '#5c3a1e', 'jersey', '#ef6b6b', 'joggers', '#5a3d5c', '', '#ef6b6b', 'slippers', ['cap']),
    base('locs', '#7a4b32', '#a86b3c', 'cardigan', '#7ec8c3', 'leggings', '#3d4a6b', '', '#7ec8c3', 'lightup', ['headband']),
  ];
  const sizes = ['kid', 'little', 'kid', 'adult', 'kid', 'little'];
  const xs = [780, 980, 1180, 1380, 1580, 1780];
  const a = __avatar;
  looks.forEach((L, i) => {
    const clean = a.sanitizeLook2(L);
    const patch = Object.assign({ size: sizes[i], look2: clean }, a.legacyFromLook2(clean));
    if (i === 0) __store.dispatch({ type: 'char/update', id: 'c1', patch });
    else {
      const leg = a.legacyFromLook2(a.sanitizeLook2(L));
      __store.dispatch({ type: 'char/add', char: Object.assign({
        id: 'k' + i, name: 'Kid' + i, room: 'living', x: xs[i], y: 540, flip: i % 2 === 1, size: sizes[i],
        held: { left: null, right: null }, look2: a.sanitizeLook2(L)
      }, leg) });
    }
  });
  __store.dispatch({ type: 'char/move', id: 'c1', room: 'living', x: xs[0], y: 540 });
  __cam.set(700);
  return __store.get().characters.length;
}"""

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def open_look(pg):
    if await pg.locator('#phoneOk').is_visible():
        await pg.click('#phoneOk')
    await tap(pg, '#btnDress')
    await pg.wait_for_selector('#sheet:not(.hidden) .avLook')
    await pg.wait_for_timeout(450)

async def sheet_info(pg):
    return await pg.evaluate("""() => {
      const card = document.querySelector('.card');
      const look = document.querySelector('.avLook');
      const stage = document.querySelector('.avStage');
      const opt = document.querySelector('.avOpt');
      const sw = document.querySelector('.avSw');
      const tab = document.querySelector('.avTab');
      const box = el => el ? el.getBoundingClientRect() : null;
      const inputs = document.querySelectorAll('#sheet input, #sheet textarea').length;
      return {
        phone: document.body.classList.contains('phone'),
        dir: look ? getComputedStyle(look).flexDirection : '',
        title: (document.querySelector('#sheet h2') || {}).textContent || '',
        inputs,
        cardW: card ? card.scrollWidth : 0,
        cardClient: card ? card.clientWidth : 0,
        optH: opt ? opt.getBoundingClientRect().height : 0,
        swH: sw ? sw.getBoundingClientRect().height : 0,
        tabH: tab ? tab.getBoundingClientRect().height : 0,
        tabsFit: (() => {
          const row = document.querySelector('.avTabs');
          const tabs = [...document.querySelectorAll('.avTab')];
          if (!row || tabs.length < 5) return false;
          const fontOk = tabs.every(t => parseFloat(getComputedStyle(t).fontSize) >= 13 && t.getBoundingClientRect().height >= 44);
          return fontOk && row.scrollWidth <= row.clientWidth + 2;
        })(),
        tabNames: [...document.querySelectorAll('.avTab')].map(t => (t.textContent || '').trim()).join(','),
        stage: box(stage),
        closeFirst: document.querySelector('#sheet button') === document.querySelector('#sheet .close'),
      };
    }""")

async def customizer(b):
    pages = [
        ('customizer-ipad-1180.png', 1180, 820, False, 'row'),
        ('customizer-ipad-1024.png', 1024, 768, False, 'row'),
        ('customizer-ipad-820.png', 820, 1180, False, 'row'),
        ('customizer-iphone-390.png', 390, 844, True, 'column'),
        ('customizer-iphone-375.png', 375, 667, True, 'column'),
        ('customizer-iphone-844.png', 844, 390, True, 'column'),
        ('customizer-iphone-430.png', 430, 932, True, 'column'),
    ]
    for name, w, h, mobile, direction in pages:
        ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=mobile)
        await ctx.add_init_script(SKIP_WN)
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e, bucket=errs: bucket.append(str(e)))
        await pg.goto(URL)
        await pg.wait_for_selector('#stage .char')
        classic = await pg.evaluate("""() => { const svg = document.querySelector('#stage .char svg'); return svg ? svg.getAttribute('data-chibi') : 'missing'; }""")
        check(f'{w}x{h} starter kid is the classic avatar', classic is None, str(classic))
        await open_look(pg)
        info = await sheet_info(pg)
        await pg.screenshot(path=f'{SHOT}/{name}')
        fits = info['cardW'] <= info['cardClient'] + 2 and info['inputs'] == 0 and info['title'] == 'Make your look!'
        targets = info['optH'] >= 44 and info['swH'] >= 44 and info['tabH'] >= 44 and info['tabsFit'] and info['tabNames'] == 'Hair,Face,Clothes,Shoes,Extras' and info['closeFirst']
        tall = info['optH'] >= 70 if w == 820 else True
        phone = info['phone'] if mobile else not info['phone']
        check(f'{w}x{h} customizer layout', fits and targets and tall and phone and info['dir'] == direction and not errs,
              f"dir {info['dir']} opt {info['optH']:.0f} sw {info['swH']:.0f} tabs {info['tabsFit']} {info['tabNames']} card {info['cardW']}/{info['cardClient']} phone {info['phone']} {errs[:1]}")
        await ctx.close()

async def lineup_and_perf(b):
    ctx = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1, has_touch=True)
    await ctx.add_init_script(SKIP_WN)
    pg = await ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto(URL)
    await pg.wait_for_selector('#stage .char')
    n = await pg.evaluate(LINEUP)
    await pg.wait_for_timeout(400)
    await pg.screenshot(path=f'{SHOT}/street-5-kids.png')
    bodies = await pg.evaluate("""() => ({
      n: document.querySelectorAll('#stage .char svg[data-chibi="1"]').length,
      tilt: !!document.querySelector('#stage .char svg g[transform*="rotate"]'),
      rich: __avatar.richAvatars(),
      move: document.querySelectorAll('#stage .char.chibi-move').length,
      bob: document.querySelectorAll('#stage .char.chibi-bob').length,
      arm: getComputedStyle(document.querySelector('#stage .char.chibi .arm.l')).animationName,
    })""")
    check('five different kids stand in the room', n >= 5 and bodies['n'] >= 5 and bodies['tilt'], str(bodies))
    moving = bodies['move'] >= 6 if bodies['rich'] else bodies['move'] >= 1 and bodies['bob'] >= 5
    check('full-quality limbs play on every kid in this browser' if bodies['rich'] else 'Safari-16 floor animates one kid and bobs the rest',
          moving and bodies['arm'] not in ('none', ''), str(bodies))
    cdp = await ctx.new_cdp_session(pg)
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})
    perf = await pg.evaluate("""() => new Promise(resolve => {
      const times = [];
      let last = 0, n = 0;
      const frame = (t) => {
        if (last) times.push(t - last);
        last = t; n++;
        if (n < 60) requestAnimationFrame(frame);
        else {
          times.sort((a, b) => a - b);
          const sum = times.reduce((s, x) => s + x, 0);
          resolve({ n: times.length, mean: sum / times.length, p95: times[Math.floor(times.length * 0.95)] || 0, max: times[times.length - 1] || 0 });
        }
      };
      requestAnimationFrame(frame);
    })""")
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 1})
    print(f"PERF 6 kids, CPU throttle 4x, {perf['n']} frames: mean {perf['mean']:.2f}ms p95 {perf['p95']:.2f}ms max {perf['max']:.2f}ms (16.6ms is 60fps; this is a VM, not an A14)", flush=True)
    check('6 kids keep drawing under 4x CPU throttle', perf['n'] >= 50 and perf['mean'] < 100 and not errs, str(perf) + ' ' + '; '.join(errs[:2]))
    held = await pg.evaluate("""() => {
      __store.dispatch({ type: 'char/move', id: 'c1', room: 'bedroom', x: 900, y: 540 });
      __store.dispatch({ type: 'char/hold', id: 'c1', hand: 'right', room: 'bedroom', itemId: 'teddy-3' });
      __store.dispatch({ type: 'room/switch', room: 'bedroom' });
      __cam.set(700);
      const c = __store.get().characters.find(x => x.id === 'c1');
      return { kind: c && c.held.right && c.held.right.kind, chibi: !!c.look2 };
    }""")
    await pg.wait_for_timeout(300)
    await pg.screenshot(path=f'{SHOT}/kid-holding.png')
    vis = await pg.evaluate("""() => document.querySelectorAll('#stage .char .held').length""")
    check('a chibi kid holds the teddy', held['kind'] == 'teddy' and held['chibi'] and vis >= 1, str(held) + ' shown ' + str(vis))
    modes = await pg.evaluate("""() => {
      const p = document.querySelector('#modePlay').getBoundingClientRect();
      const d = document.querySelector('#modeDecorate').getBoundingClientRect();
      return { ph: Math.round(p.height), dh: Math.round(d.height), words: (document.querySelector('#modePlay').innerText + ' ' + document.querySelector('#modeDecorate').innerText) };
    }""")
    check('Play and Decorate render beside the chibi kids', 'Play' in modes['words'] and 'Decorate' in modes['words'] and modes['ph'] >= 40 and modes['dh'] >= 40, str(modes))
    await ctx.close()

async def ride_shot(b, name, dress):
    ctx = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1, has_touch=True)
    await ctx.add_init_script(SKIP_WN)
    pg = await ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto(URL)
    await pg.wait_for_selector('#stage .char')
    await pg.evaluate("""(dress) => {
      const L = { v: 1, hair: 'puffs', hairC: '#2b1d16', skin: '#c68642', eyes: 'round', eyeC: '#7b4fb8', freckles: false, blush: true, top: 'classic', topC: '#ff7aa8', bottom: 'pants', bottomC: '#5aa9e6', dress: dress, dressC: '#f4a3c8', shoes: 'boots', shoesC: '#5a3d5c', acc: ['bow'], accC: '#ffd166' };
      const clean = __avatar.sanitizeLook2(L);
      __store.dispatch({ type: 'char/update', id: 'c1', patch: Object.assign({ size: 'kid', look2: clean }, __avatar.legacyFromLook2(clean)) });
    }""", dress)
    await go(pg, 'ranch')
    await pg.evaluate("""() => {
      const s = document.getElementById('ranchScroll');
      const sc = document.getElementById('ranch').clientHeight / 600;
      s.scrollLeft = 2990 * sc - s.clientWidth / 2;
    }""")
    await pg.locator('.horse[data-horse="4"]').click(force=True)
    await pg.wait_for_timeout(500)
    await pg.evaluate("""() => {
      const av = document.querySelector('.savatar.riding.mine');
      const s = document.getElementById('ranchScroll');
      if (!av || !s) return;
      const r = av.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      s.scrollLeft += (r.left + r.width / 2) - (sr.left + sr.width / 2);
    }""")
    await pg.wait_for_timeout(250)
    path = f'{SHOT}/{name}'
    await pg.screenshot(path=path)
    zoom = path.replace('.png', '-zoom.png')
    clip = await pg.evaluate("""() => {
      const av = document.querySelector('.savatar.riding.mine');
      const mount = av && av.querySelector('.mount');
      if (!av || !mount) return null;
      const a = av.getBoundingClientRect(), m = mount.getBoundingClientRect();
      const left = Math.max(0, Math.min(a.left, m.left) - 12);
      const top = Math.max(0, Math.min(a.top, m.top) - 12);
      const right = Math.min(window.innerWidth, Math.max(a.right, m.right) + 12);
      const bottom = Math.min(window.innerHeight, Math.max(a.bottom, m.bottom) + 12);
      return { x: left, y: top, width: right - left, height: bottom - top };
    }""")
    if clip and clip['width'] > 40 and clip['height'] > 40:
        raw = '/tmp/ride-zoom-raw.png'
        await pg.screenshot(path=raw, clip=clip)
        subprocess.check_call(['ffmpeg', '-y', '-i', raw, '-vf', 'scale=iw*2:ih*2', '-frames:v', '1', zoom], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        check(name.replace('.png', '') + ' zoom covers the rider', os.path.getsize(zoom) > 8000)
    pose = await pg.evaluate("""() => {
      const av = document.querySelector('.savatar.riding.mine');
      if (!av) return null;
      const box = av.getBoundingClientRect();
      const horse = av.querySelector('.mount');
      const hb = horse ? horse.getBoundingClientRect() : null;
      const legs = [...av.querySelectorAll('.inner .leg')].map(el => getComputedStyle(el).opacity);
      const ride = av.querySelector('.rideleg');
      return {
        chibi: !!av.querySelector('svg[data-chibi]'),
        legs: legs,
        thigh: ride ? !!ride.querySelector('.thigh') : false,
        drape: ride ? !!ride.querySelector('.dress') : false,
        hands: av.querySelectorAll('.inner .hand').length,
        tall: Math.max(box.height, hb ? hb.height : 0),
        wide: Math.max(box.width, hb ? hb.width : 0),
        inView: box.top > -20 && box.bottom < 1200 && (hb ? hb.top > -20 && hb.bottom < 1200 : false),
      };
    }""")
    hidden = pose and all(op == '0' for op in pose['legs']) and len(pose['legs']) >= 2
    size = os.path.getsize(path)
    check(f'{name} shows the whole kid on the horse', pose and pose['chibi'] and pose['thigh'] and pose['hands'] >= 2 and hidden and pose['inView'] and pose['tall'] > 140 and size > 20000 and not errs,
          f"{pose} bytes {size} {errs[:1]}")
    if dress:
        check('a dress drapes over the saddle', bool(pose and pose['drape']), str(pose))
    else:
        check('pants stay on the riding thigh', bool(pose and not pose['drape']), str(pose))
    await ctx.close()

async def riding(b):
    await ride_shot(b, 'kid-riding-dress.png', 'twirl')
    await ride_shot(b, 'kid-riding-pants.png', '')

async def proofs(b):
    needed = ['kid-maya-v2.svg', 'kid-ivy-v2.svg', 'kid-zara-v2.svg', 'kid-lily-v2.svg']
    if not all(os.path.isfile(os.path.join(KIT, name)) for name in needed):
        print('SKIP side-by-side proof (no chibi fixtures)', flush=True)
        return
    html = os.path.join(SHOT, 'avatar-proof.html')
    env = dict(os.environ, CHIBI_KIT=KIT, AVATAR_PROOF_HTML=html)
    subprocess.check_call(['npx', 'tsx', 'tests/avatar_proof.ts'], cwd=os.path.dirname(os.path.abspath(__file__)), env=env)
    ctx = await b.new_context(viewport={'width': 1200, 'height': 800}, device_scale_factor=1)
    pg = await ctx.new_page()
    await pg.goto('file://' + html)
    await pg.locator('#compare').screenshot(path=f'{SHOT}/side-by-side.png')
    await pg.locator('#hats').screenshot(path=f'{SHOT}/hat-hair-grid.png')
    check('side-by-side and hat grid were captured', os.path.getsize(f'{SHOT}/side-by-side.png') > 20000 and os.path.getsize(f'{SHOT}/hat-hair-grid.png') > 20000)
    await ctx.close()

async def street(b):
    ctxp = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
    ctxk = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
    await ctxp.add_init_script(SKIP_WN + "; window.__forceAvatarIntro = true;")
    await ctxk.add_init_script(SKIP_WN)
    P, K2 = await ctxp.new_page(), await ctxk.new_page()
    errs = []
    for pg in (P, K2):
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL)
        await pg.wait_for_timeout(400)
    await tap(P, '#btnHood')
    await P.click('[data-m="create"]')
    await adult(P)
    await P.wait_for_selector('#newCode')
    code = (await P.inner_text('#newCode')).strip()
    await P.click('[data-m="setup"]')
    await P.wait_for_selector('#pCode')
    for n in ('Reagan', 'Quinn', 'Chloe'):
        await P.click(f'.sugg button:has-text("{n}")')
        await P.wait_for_timeout(150)
    await P.click('.hoodSheet [data-m="close"]')
    await tap(P, '#btnHood')
    await P.click('[data-m="join"]')
    await P.fill('#codeInput', code)
    await P.click('#codeForm button')
    await P.click('.nicks button:has-text("Reagan")')
    await P.click('[data-m="bring"]')
    await P.wait_for_selector('#sheet:not(.hidden) h2:has-text("Make your look!")', timeout=8000)
    check('first street join opens Make your look', await P.locator('#sheet:not(.hidden) .avSurprise').count() == 1)
    before = await P.evaluate("""() => JSON.stringify((__hood().players.get(__hood().pid) || {}).look || {})""")
    changed = None
    for _ in range(4):
        await P.click('.avSurprise')
        await P.wait_for_timeout(200)
        changed = await P.evaluate("""() => { const L = (__hood().players.get(__hood().pid) || {}).look || {}; return { raw: JSON.stringify(L), hair: L.look2 && L.look2.hair }; }""")
        if changed['raw'] != before and changed['hair']:
            break
    check('Surprise me picks a new allow-listed look', changed and changed['raw'] != before and changed['hair'], str(changed and changed['hair']))
    await P.click('[data-act="av-hair"][data-v="puffs"]')
    await P.click('[data-act="av-hairC"][data-v="#2b1d16"]')
    await P.wait_for_timeout(300)
    await P.click('.avDone')
    await P.wait_for_function("document.getElementById('sheet').classList.contains('hidden')")
    await P.click('#mapWorld .mapHouse.mine')
    await P.wait_for_timeout(700)
    await tap(K2, '#btnHood')
    await K2.click('[data-m="join"]')
    await K2.fill('#codeInput', code)
    await K2.click('#codeForm button')
    await K2.click('.nicks button:has-text("Quinn")')
    await K2.click('[data-m="fresh"]')
    await K2.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=8000)
    pid = await P.evaluate("__hood().pid")
    seen = await K2.evaluate("""(pid) => { const L = (__hood().players.get(pid) || {}).look; return L ? { hair: L.look2 && L.look2.hair, legacy: L.hair } : null; }""", pid)
    check('a friend sees the puffs look', seen and seen.get('hair') == 'puffs' and seen.get('legacy') == '#2b1d16', str(seen))
    house = await P.evaluate("__hood().myHouseId()")
    await K2.click(f'.mapHouse[data-go="house:{house}"]')
    await K2.wait_for_timeout(800)
    drawn = await K2.evaluate("""() => { const svg = document.querySelector('.char.avatar.other svg'); return svg ? svg.getAttribute('data-chibi') : 'missing'; }""")
    check('the friend draws the new kid as a chibi', drawn == '1' and not errs, str(drawn) + ' ' + '; '.join(errs[:2]))
    if os.path.isdir(OLD_DIST):
        old, old_port = serve_old()
        try:
            hood = hood_for(URL)
            ctxo = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=1, has_touch=True)
            await ctxo.add_init_script("localStorage.setItem('cozy-whatsnew', '999')")
            O = await ctxo.new_page()
            oerrs = []
            O.on('pageerror', lambda e: oerrs.append(str(e)))
            await O.goto(f'http://127.0.0.1:{old_port}/kids-house-game/?hood={hood}')
            await O.wait_for_timeout(500)
            await tap(O, '#btnHood')
            await O.click('[data-m="join"]')
            await O.fill('#codeInput', code)
            await O.click('#codeForm button')
            await O.click('.nicks button:has-text("Chloe")')
            await O.click('[data-m="fresh"]')
            await O.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=8000)
            await O.wait_for_timeout(600)
            old_face = await O.evaluate("""(pid) => { const el = document.querySelector('.mapFace[data-pid="' + pid + '"] svg'); return el ? el.getAttribute('data-chibi') : 'missing'; }""", pid)
            await O.screenshot(path=f'{SHOT}/old-client-view.png')
            check('baseline client draws the new kid as a chibi', old_face == '1' and not oerrs, str(old_face) + ' ' + '; '.join(oerrs[:2]))
            await ctxo.close()
        finally:
            try:
                os.killpg(old.pid, 15)
            except Exception:
                pass
    else:
        check('baseline client draws the new kid as a chibi', False, 'missing /tmp/prod-dist')
    await ctxp.close()
    await ctxk.close()

async def letter_shot(b):
    """An open letter on the street, with chibi kids standing around it."""
    names = ['Reagan', 'Quinn', 'Chloe', 'Cada', 'Sloane']
    ctxs = []
    pages = []
    for _ in names:
        ctx = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1, has_touch=True)
        await ctx.add_init_script(SKIP_WN)
        ctxs.append(ctx)
        pages.append(await ctx.new_page())
    errs = []
    for pg in pages:
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL)
        await pg.wait_for_timeout(300)
    P = pages[0]
    await tap(P, '#btnHood')
    await P.click('[data-m="create"]')
    await adult(P)
    await P.wait_for_selector('#newCode')
    code = (await P.inner_text('#newCode')).strip()
    await P.click('[data-m="setup"]')
    await P.wait_for_selector('#pCode')
    for n in names:
        await P.click(f'.sugg button:has-text("{n}")')
        await P.wait_for_timeout(120)
    await P.click('.hoodSheet [data-m="close"]')
    async def join(pg, nick):
        await tap(pg, '#btnHood')
        await pg.click('[data-m="join"]')
        await pg.fill('#codeInput', code)
        await pg.click('#codeForm button')
        await pg.click(f'.nicks button:has-text("{nick}")')
        await pg.click('[data-m="fresh"]')
        await pg.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=8000)
    for pg, nick in zip(pages, names):
        await join(pg, nick)
        await pg.evaluate("""() => {
          const look2 = __avatar.sanitizeLook2(__avatar.randomLook2());
          const legacy = __avatar.legacyFromLook2(look2);
          __hood().setLook(Object.assign({ size: 'kid' }, legacy, { look2: look2 }));
        }""")
    await P.wait_for_timeout(600)
    house = await P.evaluate('__hood().myHouseId()')
    await pages[1].evaluate("""(id) => __hood().sendMail(id, 'Come see my Ring Light!', 2, 1)""", house)
    await P.wait_for_function("""(id) => { const L = (__hood().view(id).mailbox || {}).letters; return L && L[0] && L[0].text.indexOf('Ring Light') >= 0; }""", arg=house, timeout=8000)
    who = await P.evaluate("""(id) => (__hood().view(id).mailbox.letters[0] || {}).from""", house)
    check('the letter sender is the kid who wrote it', who == 'Quinn', str(who))
    await P.click('.mapMail.up, .mapHouse.mine .mapMail, .mapMail')
    await P.wait_for_selector('#mailSheet .letter', timeout=5000)
    await P.click('#mailSheet .letter')
    await P.wait_for_selector('#mailSheet .letter.open .words', timeout=5000)
    faces = await P.evaluate("""() => document.querySelectorAll('.mapFace svg[data-chibi="1"]').length""")
    words = await P.inner_text('#mailSheet .letter.open .words')
    shown = await P.inner_text('#mailSheet .letter.open .who')
    check('the open letter shows her words and the chibi kids stay on the street', 'Ring Light' in words and shown == 'Quinn' and faces >= 5 and not errs, f'faces={faces} who={shown} errs={errs[:2]}')
    await P.screenshot(path=f'{SHOT}/letter-chibi-820.png')
    await P.click('#mailSheet [data-m="close"]')
    await P.wait_for_timeout(200)
    await tap(P, '#btnParent')
    await adult(P)
    await P.wait_for_selector('#parentMail', timeout=5000)
    grown = await P.inner_text('#parentMail')
    check('the grown-up mail view shows the letter', 'Ring Light' in grown and 'Quinn' in grown and not errs, grown[:180])
    for ctx in ctxs:
        await ctx.close()

async def main():
    os.makedirs(SHOT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        await proofs(b)
        await customizer(b)
        await lineup_and_perf(b)
        await riding(b)
        await letter_shot(b)
        await street(b)
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} checks passed", flush=True)
    if not all(res.values()):
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
