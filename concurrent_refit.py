"""Two new clients load the same unmigrated street house at once.

The Worker persists the one-time seed-bench nudge on load. Clients only adopt
that house. This test rewinds a stored house to 1122,372 with no flag, restarts
the Worker, and has two new clients enter that house at the same time. The
final save must have the bench at 1420 once, yardBenchRefit=1, both views
agreeing, and no item/move on the wire.

Do not wait for #stage to be visible before the client is in a house:
body.view-street (the map) sets #stage { visibility: hidden }.
"""
import asyncio, json, os, shutil, signal, subprocess, sys, time, tempfile
from pathlib import Path

from playwright.async_api import TimeoutError as PlaywrightTimeout, async_playwright

TREE = os.environ.get('TREE_PR', '/workspace/t-bench-refit')
sys.path.insert(0, TREE)
from testnav import go

NEW_DIST = os.environ.get('NEW_DIST', '/workspace/t-bench-refit/dist-trial')
PORT_WEB = int(os.environ.get('PORT_WEB', '5306'))
PORT_HOOD = int(os.environ.get('PORT_HOOD', '5307'))
TRIALS = int(os.environ.get('TRIALS', '5'))
BROWSERS = [x for x in os.environ.get('BROWSERS', 'webkit,chromium').split(',') if x]
URL = f'http://127.0.0.1:{PORT_WEB}/kids-house-game/'
HOOD = f'http://127.0.0.1:{PORT_HOOD}'
# Landscape iPad-like; the same size the migrated shots used successfully.
VIEW = {'width': 1180, 'height': 820}

def stop(pr):
    if not pr:
        return
    try:
        os.killpg(pr.pid, signal.SIGTERM)
    except Exception:
        try:
            pr.terminate()
        except Exception:
            pass
    try:
        pr.wait(timeout=3)
    except Exception:
        try:
            os.killpg(pr.pid, signal.SIGKILL)
        except Exception:
            pass

def wait_port(port, t=20):
    import socket
    end = time.time() + t
    while time.time() < end:
        try:
            socket.create_connection(('127.0.0.1', port), 0.5).close()
            return True
        except OSError:
            time.sleep(0.15)
    return False

def start_web(www):
    code = (
        "import http.server, functools\n"
        "class H(http.server.SimpleHTTPRequestHandler):\n"
        "    def end_headers(self):\n"
        "        self.send_header('Cache-Control', 'no-store'); super().end_headers()\n"
        "    def log_message(self, *a): pass\n"
        f"http.server.ThreadingHTTPServer(('127.0.0.1', {PORT_WEB}), functools.partial(H, directory={www!r})).serve_forever()"
    )
    return subprocess.Popen([sys.executable, '-c', code], start_new_session=True,
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def start_hood(data):
    env = dict(os.environ, PORT=str(PORT_HOOD), HOOD_DATA=data)
    return subprocess.Popen(
        ['./node_modules/.bin/tsx', 'server/node.ts'],
        cwd=TREE, env=env, start_new_session=True,
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )

def street_files(data):
    return [p for p in Path(data).glob('*.json') if p.name != '_codes.json']

def house_records(data):
    out = []
    for p in street_files(data):
        blob = json.loads(p.read_text())
        for k, v in blob.items():
            if k.startswith('house:') and isinstance(v, dict) and isinstance(v.get('state'), dict):
                out.append((p, k, v))
    return out

def rewind_owner(data, hid):
    """Restore only the owner's stored backyard bench to the pre-B16 seed pose."""
    n = 0
    for p, k, h in house_records(data):
        if h.get('id') != hid and k != 'house:' + hid:
            continue
        st = h['state']
        st.pop('yardBenchRefit', None)
        yard = (st.get('rooms') or {}).get('backyard') or {}
        for it in yard.get('items') or []:
            if it.get('kind') == 'yard-bench' and it.get('id') == 'yard-bench-1':
                it['x'], it['y'] = 1122, 372
                it['flip'] = False
                it['scale'] = 1
                it.pop('size', None)
                n += 1
        blob = json.loads(p.read_text())
        blob[k] = h
        p.write_text(json.dumps(blob))
    return n

def owner_final(data, hid):
    for p, k, h in house_records(data):
        if h.get('id') != hid and k != 'house:' + hid:
            continue
        st = h['state']
        benches = [i for i in ((st.get('rooms') or {}).get('backyard') or {}).get('items') or []
                   if i.get('kind') == 'yard-bench']
        flag = st.get('yardBenchRefit')
        xs = [(i.get('id'), i.get('x'), i.get('y')) for i in benches]
        ok = flag == 1 and len(benches) == 1 and benches[0].get('x') == 1420 and benches[0].get('y') == 372
        return ok, f'{k}: flag={flag} benches={xs}'
    return False, f'owner house {hid} missing from disk'

# Skip What's new / welcome. Spy on item/move before any socket is opened.
INIT = r"""
localStorage.setItem('cozy-whatsnew','999');
localStorage.setItem('avatar-intro','1');
localStorage.setItem('cozy-welcome','1');
window.__itemMoves = [];
(function() {
  const orig = WebSocket.prototype.send;
  WebSocket.prototype.send = function(data) {
    try {
      const s = typeof data === 'string' ? data : String(data);
      const m = JSON.parse(s);
      if (m && m.t === 'act' && m.action && m.action.type === 'item/move') {
        window.__itemMoves.push(m.action);
      }
    } catch (e) {}
    return orig.apply(this, arguments);
  };
})();
"""

async def boot(pg):
    """Land far enough to click chrome.

    Do not wait for #stage or #btnMap to be visible: body.view-street hides
    #stage, and body.view-map sets #btnMap { display: none }. #btnHood lives
    in the closed menu, so it is also not visible. #btnMenu stays in the
    chrome on the map and in a house, which is how other tests tell the
    client has booted. Reconnect can already be on the map; that is fine.
    """
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      document.querySelector('.whatsNew .wnGo')?.click();
    }""")
    await pg.wait_for_function(
        """() => {
          const menu = document.getElementById('btnMenu');
          const menuOn = !!(menu && menu.getClientRects().length);
          const hoodBtn = document.getElementById('btnHood');
          const onMap = document.body.classList.contains('view-map')
            && document.querySelectorAll('#mapWorld .mapHouse, #mapWorld .mapSpot').length > 0;
          const ready = !!(window.__test && (window.__test.store || window.__store || window.__hood));
          return (menuOn && hoodBtn) || onMap || ready;
        }""",
        timeout=25000,
    )
    await pg.evaluate("""() => {
      document.querySelector('#phoneOk')?.click();
      document.querySelector('#wnGo')?.click();
      document.querySelector('.whatsNew .wnGo')?.click();
    }""")
    await pg.wait_for_timeout(200)

async def dump(pg, label):
    try:
        info = await pg.evaluate("""() => ({
          href: location.href, body: document.body.className,
          stageVis: !!(document.getElementById('stage') && document.getElementById('stage').offsetParent),
          mapHouses: document.querySelectorAll('#mapWorld .mapHouse').length,
          hasHood: typeof __hood === 'function' && !!__hood(),
        })""")
        print(f'DBG {label} {info}', flush=True)
    except Exception as e:
        print(f'DBG {label} (no evaluate) {e}', flush=True)

async def join(pg, code, nick, bring=False):
    await pg.evaluate("document.querySelector('#btnHood').click()")
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.wait_for_selector('.nicks button', timeout=20000)
    btn = pg.locator(f'.nicks button[data-nick="{nick}"]')
    if await btn.count():
        await btn.click()
    else:
        await pg.locator('.nicks button:not([disabled])').nth(int(nick)).click()
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=20000)

async def enter_owner_yard(pg, hid):
    """Open the owner's house from the map, then switch to the backyard. Not an item/move."""
    # testnav.go('house:<id>'): map click, then wait for the house stage (not the map-hidden one).
    await go(pg, f'house:{hid}')
    await pg.evaluate("""() => {
      if (__store.get().currentRoom !== 'backyard') {
        __store.dispatch({type:'room/switch', room:'backyard'});
      }
      document.getElementById('modePlay')?.click();
    }""")
    await pg.wait_for_function("() => __store.get().currentRoom === 'backyard'", timeout=10000)
    await pg.wait_for_timeout(200)
    return await pg.evaluate("""() => {
      const s = __store.get();
      const b = s.rooms.backyard.items.find(i => i.kind === 'yard-bench');
      const body = document.body.className;
      const inHouse = !document.body.classList.contains('view-street') && !!document.getElementById('stage')?.offsetParent;
      return {
        x: b && b.x, y: b && b.y, flag: s.yardBenchRefit || null, id: b && b.id,
        room: s.currentRoom, inHouse, body,
        itemMoves: (window.__itemMoves || []).slice(),
      };
    }""")

async def new_page(browser, extra_init=''):
    ctx = await browser.new_context(viewport=VIEW, device_scale_factor=1, has_touch=True, service_workers='block')
    await ctx.add_init_script(INIT + extra_init)
    pg = await ctx.new_page()
    await pg.goto(f'{URL}?hood={HOOD}', wait_until='domcontentloaded')
    await boot(pg)
    return ctx, pg

async def seed_street(p, engine):
    browser = await p.webkit.launch() if engine == 'webkit' else await p.chromium.launch()
    try:
        ctx, pg = await new_page(browser)
        code = (await pg.evaluate(f"fetch('{HOOD}/api/create', {{method:'POST'}}).then(r => r.json())"))['code']
        await join(pg, code, '0', False)
        hid = await pg.evaluate("() => __hood().myHouseId()")
        cfg = await pg.evaluate("() => { try { return JSON.parse(localStorage.getItem('cozy-hood') || 'null'); } catch (e) { return null; } }")
        await ctx.close()
    finally:
        await browser.close()
    if not hid or not cfg or not cfg.get('token'):
        raise RuntimeError(f'seed did not save a hood token/house: hid={hid} cfg={cfg}')
    return code, hid, cfg

async def two_clients(p, engine, code, hid, cfg):
    browser = await p.webkit.launch() if engine == 'webkit' else await p.chromium.launch()
    async def owner():
        payload = json.dumps(cfg)
        ctx, pg = await new_page(browser, f"localStorage.setItem('cozy-hood', {json.dumps(payload)});")
        # Auto-reconnect lands on the map; #stage is hidden there. Wait for the map, not the stage.
        await pg.wait_for_selector('body.view-map #mapWorld .mapHouse', timeout=20000)
        return ctx, pg
    async def visitor():
        ctx, pg = await new_page(browser)
        await join(pg, code, '1', False)
        return ctx, pg
    try:
        t0 = time.time()
        (ctx0, pg0), (ctx1, pg1) = await asyncio.gather(owner(), visitor())
        views = list(await asyncio.gather(enter_owner_yard(pg0, hid), enter_owner_yard(pg1, hid)))
        elapsed = time.time() - t0
        await asyncio.sleep(1.2)  # Worker flush
        return views, elapsed
    except Exception:
        for pg in (locals().get('pg0'), locals().get('pg1')):
            if pg:
                await dump(pg, 'fail')
        raise
    finally:
        for ctx in (locals().get('ctx0'), locals().get('ctx1')):
            if ctx:
                try:
                    await ctx.close()
                except Exception:
                    pass
        await browser.close()

def is_harness(err):
    msg = str(err)
    return isinstance(err, PlaywrightTimeout) or 'Timeout' in msg or 'wait_for_selector' in msg or 'wait_for_function' in msg

def real_fail(views, disk_ok, note):
    """A reached-the-house assertion failure, not a navigation timeout."""
    if not views or len(views) != 2:
        return False, 'incomplete views'
    moves = [v.get('itemMoves') or [] for v in views]
    reasons = []
    if not all(v.get('inHouse') and v.get('room') == 'backyard' for v in views):
        reasons.append(f'not in backyard: {[(v.get("inHouse"), v.get("room"), v.get("body")) for v in views]}')
    if not all(v.get('x') == 1420 and v.get('y') == 372 and v.get('flag') == 1 for v in views):
        reasons.append(f'views disagree or not 1420+flag: {views}')
    if any(m for m in moves):
        reasons.append(f'item/move on the wire: {moves}')
    if not disk_ok:
        reasons.append(f'disk {note}')
    return (len(reasons) > 0), '; '.join(reasons) or 'ok'

async def main():
    os.environ.setdefault('GIO_MODULE_DIR', '/workspace/tools/gio-mods')
    if os.path.isdir('/workspace/tools/wkdeps'):
        os.environ.setdefault('LD_LIBRARY_PATH',
                              '/workspace/tools/wkdeps' + (':' + os.environ['LD_LIBRARY_PATH'] if os.environ.get('LD_LIBRARY_PATH') else ''))
    www = tempfile.mkdtemp(prefix='refit-conc-www-')
    os.symlink(NEW_DIST, os.path.join(www, 'kids-house-game'))
    web = start_web(www)
    rows = []
    failed = 0
    try:
        if not wait_port(PORT_WEB):
            print('FAIL web port', PORT_WEB); sys.exit(2)
        async with async_playwright() as p:
            for engine in BROWSERS:
                for trial in range(1, TRIALS + 1):
                    last_err = None
                    # One harness retry per trial. A real assertion failure stops the suite.
                    for attempt in (1, 2):
                        data = tempfile.mkdtemp(prefix=f'refit-conc-{engine}-{trial}-{attempt}-')
                        hood = start_hood(data)
                        try:
                            if not wait_port(PORT_HOOD):
                                raise RuntimeError('hood port')
                            code, hid, cfg = await seed_street(p, engine)
                            stop(hood); time.sleep(0.4)
                            n = rewind_owner(data, hid)
                            if n < 1:
                                raise RuntimeError(f'no seed bench to rewind for {hid} in {data}')
                            hood = start_hood(data)
                            if not wait_port(PORT_HOOD):
                                raise RuntimeError('hood restart')
                            views, elapsed = await two_clients(p, engine, code, hid, cfg)
                            disk_ok, note = owner_final(data, hid)
                            is_real, why = real_fail(views, disk_ok, note)
                            if is_real:
                                print('REAL FAIL', engine, f'trial {trial}/{TRIALS}', why, flush=True)
                                rows.append({'engine': engine, 'trial': trial, 'ok': False, 'real': True, 'why': why, 'views': views, 'disk': note})
                                Path(os.environ.get('OUT', '/workspace/t-bench-refit/logs/concurrent_refit.json')).write_text(
                                    json.dumps({'failed': True, 'stopped': 'real', 'rows': rows}, indent=2, default=str))
                                sys.exit(1)
                            print('PASS', engine, f'trial {trial}/{TRIALS}', note, 'views',
                                  [{k: v[k] for k in ('x', 'y', 'flag', 'room', 'inHouse', 'itemMoves') if k in v} for v in views],
                                  flush=True)
                            rows.append({'engine': engine, 'trial': trial, 'ok': True, 'disk': note, 'views': views, 's': round(elapsed, 2), 'rewound': n, 'attempt': attempt})
                            last_err = None
                            break
                        except Exception as e:
                            last_err = e
                            print(('HARNESS' if is_harness(e) else 'REAL FAIL'), engine, f'trial {trial}/{TRIALS} attempt {attempt}', e, flush=True)
                            if not is_harness(e):
                                rows.append({'engine': engine, 'trial': trial, 'ok': False, 'real': True, 'error': str(e)})
                                Path(os.environ.get('OUT', '/workspace/t-bench-refit/logs/concurrent_refit.json')).write_text(
                                    json.dumps({'failed': True, 'stopped': 'real', 'rows': rows}, indent=2, default=str))
                                sys.exit(1)
                            if attempt == 2:
                                failed += 1
                                rows.append({'engine': engine, 'trial': trial, 'ok': False, 'harness': True, 'error': str(e)})
                        finally:
                            stop(hood)
                            shutil.rmtree(data, ignore_errors=True)
                    if last_err and is_harness(last_err) and not any(r.get('engine') == engine and r.get('trial') == trial and r.get('ok') for r in rows):
                        # already counted
                        pass
    finally:
        stop(web)
        shutil.rmtree(www, ignore_errors=True)
    out = Path(os.environ.get('OUT', '/workspace/t-bench-refit/logs/concurrent_refit.json'))
    out.parent.mkdir(parents=True, exist_ok=True)
    total = TRIALS * len(BROWSERS)
    passed = sum(1 for r in rows if r.get('ok'))
    out.write_text(json.dumps({'failed': failed, 'passed': passed, 'total': total, 'rows': rows}, indent=2, default=str))
    print(f'CONCURRENT {passed}/{total} passed, failed={failed}', flush=True)
    sys.exit(0 if failed == 0 and passed == total else 1)

asyncio.run(main())
