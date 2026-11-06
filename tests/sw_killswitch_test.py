"""Batch 8 (D-06/D-T3): service worker updates and the kill switch, against local builds only.

usage: sw_killswitch_test.py --old OLD_DIST --new NEW --new2 NEW2 --kill KILL --off OFF --hood http://localhost:PORT
         [--browser chromium|webkit] [--port 7471]
OLD  = a build with the pre-Batch-8 worker ('cozy-v1' forever), e.g. main 12cdfdc or prod 10ef736
NEW/NEW2 = two builds of the branch (different COZY_BUILD); KILL = COZY_SW_KILL=1 build;
OFF  = NEW with sw-switch.json {"sw":"off"}.
One tiny local web server swaps which build it serves at /kids-house-game/ (Cache-Control: no-cache),
and can go "offline" (drops connections). Every page is opened with ?hood=<local hood>; any request
to a host other than localhost fails the test.
"""
import argparse, json, os, socket, sys, threading, time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
for a in ('old', 'new', 'new2', 'kill', 'off', 'hood'): ap.add_argument('--' + a, required=True)
ap.add_argument('--browser', default='chromium'); ap.add_argument('--port', type=int, default=7471)
ap.add_argument('--only', default='')
A = ap.parse_args()
STATE = {'dir': A.old, 'down': False}
PREFIX = '/kids-house-game/'
TYPES = {'.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp',
         '.svg': 'image/svg+xml', '.png': 'image/png', '.css': 'text/css', '.html': 'text/html', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2'}

class H(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if STATE['down']:
            try: self.connection.shutdown(socket.SHUT_RDWR)
            except OSError: pass
            self.close_connection = True; return
        p = urlparse(self.path).path
        if not p.startswith(PREFIX): self.send_error(404); return
        rel = p[len(PREFIX):] or 'index.html'
        f = os.path.join(STATE['dir'], rel)
        if os.path.isdir(f): f = os.path.join(f, 'index.html')
        if not os.path.isfile(f): self.send_error(404); return
        body = open(f, 'rb').read()
        self.send_response(200)
        self.send_header('Content-Type', TYPES.get(os.path.splitext(f)[1], 'application/octet-stream'))
        self.send_header('Cache-Control', 'no-cache'); self.send_header('Content-Length', str(len(body))); self.end_headers()
        self.wfile.write(body)

srv = ThreadingHTTPServer(('127.0.0.1', A.port), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://localhost:{A.port}{PREFIX}?hood={A.hood}'
RES = []; FOREIGN = []
def ok(name, cond, extra=''):
    RES.append(bool(cond)); print(('PASS ' if cond else 'FAIL ') + name + (f'  [{extra}]' if extra else ''), flush=True)

WAIT_CTL = """async (ms) => { const sw = navigator.serviceWorker; if (!sw) return false; if (sw.controller) return true;
  return await new Promise(r => { const t = setTimeout(() => r(!!sw.controller), ms); sw.addEventListener('controllerchange', () => { clearTimeout(t); r(true); }, { once: true }); }); }"""
INFO = """async () => ({ ctl: !!navigator.serviceWorker.controller, ctlUrl: navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : '',
  regs: (await navigator.serviceWorker.getRegistrations()).length, caches: await caches.keys(),
  stage: !!document.getElementById('stage') && document.getElementById('stage').getBoundingClientRect().width > 100,
  save: localStorage.getItem('cozy-house') })"""

def poll(page, js, pred, secs=20):
    end = time.time() + secs; v = None
    while time.time() < end:
        try: v = page.evaluate(js)
        except Exception as e: v = {'err': str(e)}
        if isinstance(v, dict) and 'err' not in v and pred(v): return v, True
        time.sleep(0.4)
    return v, False

def items(save):
    try: s = json.loads(save or 'null'); return json.dumps([s['rooms'], s['soundOn'], sorted(c.get('id', '') for c in s.get('characters', []))], sort_keys=True)
    except Exception: return None

def fresh(pw, bname):
    br = getattr(pw, bname).launch()
    ctx = br.new_context(viewport={'width': 1180, 'height': 820})
    ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
    def watch(r):
        h = urlparse(r.url).hostname
        if h and h not in ('localhost', '127.0.0.1'): FOREIGN.append(r.url)
    ctx.on('request', watch)
    page = ctx.new_page(); errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    return br, ctx, page, errs

def load_controlled(page, d):
    STATE['dir'] = d; STATE['down'] = False
    page.goto(URL, wait_until='load'); page.evaluate(WAIT_CTL, 15000)
    rl(page); page.wait_for_timeout(1500)  # second load goes through the worker (cached for offline)
    return page.evaluate(INFO)

def rl(page):
    """Reload; a worker-driven navigation may race it, so settle on whatever page ends up loaded."""
    for _ in range(3):
        try: page.reload(wait_until='load', timeout=20000); break
        except Exception as e: print('  (reload raced:', str(e).splitlines()[0], ')'); page.wait_for_timeout(1500)
    try: page.wait_for_load_state('load', timeout=15000)
    except Exception: pass

def put_house(page):
    """Give the save something to lose: drop a known item through the store when the store allows it."""
    page.wait_for_function("() => window.__store", timeout=15000)
    page.evaluate("() => window.__store.dispatch({ type: 'settings/sound', on: false })")
    page.wait_for_timeout(1500)
    s = page.evaluate("() => localStorage.getItem('cozy-house')")
    ok('setup: a saved house exists (sound off)', s is not None and json.loads(s).get('soundOn') is False)
    return s

SC = [s for s in A.only.split(',') if s]
def want(s): return not SC or s in SC

with sync_playwright() as pw:
    # A. Old worker (cozy-v1) -> kill-switch build: unregistered, caches gone, game loads from network, save kept.
    if want('kill'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.old); save0 = put_house(page)
        ok('kill: old build is controlled by its worker', i0['ctl'] and i0['regs'] >= 1, str(i0['caches']))
        STATE['dir'] = A.kill
        rl(page)
        i1, gone = poll(page, INFO, lambda v: v['regs'] == 0 and not any(k == 'cozy-v1' or k.startswith('cozy:') for k in v['caches']), 25)
        ok('kill: old worker unregistered and its caches deleted', gone, str({k: i1.get(k) for k in ('regs', 'caches', 'ctl')}))
        rl(page); page.wait_for_timeout(2500)
        i2 = page.evaluate(INFO)
        ok('kill: page is no longer controlled after the next load', not i2['ctl'] and i2['regs'] == 0, str(i2['regs']))
        ok('kill: game renders straight from the network', i2['stage'])
        ok('kill: saved house unchanged', items(i2['save']) == items(save0)  and items(save0) is not None)
        ok('kill: no page errors', not errs, '; '.join(errs[:3])); br.close()

    # B. Old worker -> new build: normal update path, legacy cache removed, save kept.
    if want('upgrade'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.old); save0 = put_house(page)
        ok('upgrade: old build caches into cozy-v1', 'cozy-v1' in i0['caches'], str(i0['caches']))
        STATE['dir'] = A.new
        rl(page)
        i1, up = poll(page, INFO, lambda v: v['ctl'] and 'cozy-v1' not in v['caches'], 25)
        ok('upgrade: new worker took over, cozy-v1 deleted', up, str(i1.get('caches')))
        rl(page); page.wait_for_timeout(2000); i2 = page.evaluate(INFO)
        ok('upgrade: pages now cached per build and per scope', any(k.startswith('cozy:/kids-house-game/:app:') for k in i2['caches']) and 'cozy-v1' not in i2['caches'], str(i2['caches']))
        ok('upgrade: controlled by the new worker and renders', i2['ctl'] and i2['stage'])
        ok('upgrade: saved house unchanged', items(i2['save']) == items(save0)  and items(save0) is not None)
        ok('upgrade: no page errors', not errs, '; '.join(errs[:3])); br.close()

    # C. New -> newer build while the tab stays open: "New stuff! Tap to refresh", old app cache deleted, tap loads new build.
    if want('update'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.new); save0 = put_house(page)
        apps0 = [k for k in i0['caches'] if ':app:' in k]
        ok('update: first build controlled, one app cache', i0['ctl'] and len(apps0) == 1, str(i0['caches']))
        page.wait_for_timeout(1500)
        ok('update: no refresh note on a fresh install', page.locator('.updateNote').count() == 0)
        STATE['dir'] = A.new2
        page.evaluate("async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); }")
        try: page.wait_for_selector('.updateNote', timeout=20000); shown = True
        except Exception: shown = False
        ok('update: open tab shows "New stuff! Tap to refresh"', shown and 'New stuff! Tap to refresh' in (page.locator('.updateNote').inner_text() if shown else ''))
        if shown:
            with page.expect_navigation(timeout=15000): page.locator('.updateNote button').click()
            page.wait_for_timeout(2000)
        page.wait_for_timeout(3500); i2 = page.evaluate(INFO); apps1 = [k for k in i2['caches'] if ':app:' in k]
        ok('update: previous build cache deleted, one app cache left', len(apps1) == 1 and apps1 != apps0, f'{apps0} -> {apps1}')
        ok('update: after the tap the page runs and no note is left', i2['stage'] and page.locator('.updateNote').count() == 0)
        ok('update: saved house unchanged', items(i2['save']) == items(save0)  and items(save0) is not None)
        ok('update: no page errors', not errs, '; '.join(errs[:3])); br.close()

    # D. Switch flipped off on the server: this build removes its own worker and caches, reloads once, keeps working.
    if want('off'):
        br, ctx, page, errs = fresh(pw, A.browser)
        navs = []; page.on('framenavigated', lambda f: navs.append(time.time()) if f == page.main_frame else None)
        i0 = load_controlled(page, A.new); save0 = put_house(page)
        ok('off: controlled before the switch', i0['ctl'])
        STATE['dir'] = A.off; n0 = len(navs)
        rl(page)
        i1, gone = poll(page, INFO, lambda v: v['regs'] == 0 and not v['ctl'] and not any(k.startswith('cozy:') or k == 'cozy-v1' for k in v['caches']), 25)
        page.wait_for_timeout(3000); i1 = page.evaluate(INFO)
        ok('off: worker unregistered, caches deleted, page uncontrolled', gone and i1['regs'] == 0, str({k: i1.get(k) for k in ('regs', 'ctl', 'caches')}))
        ok('off: at most one automatic reload (no loop)', len(navs) - n0 <= 2, str(len(navs) - n0))
        ok('off: game renders and save unchanged', i1['stage'] and items(i1['save']) == items(save0)  and items(save0) is not None)
        ok('off: no page errors', not errs, '; '.join(errs[:3])); br.close()

    # E. Switch on, offline: the switch fetch fails -> no-op, game still opens from the cache; hood never cached.
    if want('offline'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.new); save0 = put_house(page)
        STATE['down'] = True
        try: page.reload(wait_until='load', timeout=20000)
        except Exception as e: print('reload:', e)
        page.wait_for_timeout(3000)
        try: i1 = page.evaluate(INFO)
        except Exception as e: i1 = {'stage': False, 'ctl': False, 'regs': 0, 'caches': [], 'save': None, 'err': str(e)}
        ok('offline: game opens from the cache', i1['stage'], str(i1.get('err', '')))
        ok('offline: worker kept (switch unreadable = on)', i1['ctl'] and i1['regs'] >= 1)
        ok('offline: saved house unchanged', items(i1['save']) == items(save0)  and items(save0) is not None)
        hood_cached = page.evaluate("async (h) => { for (const k of await caches.keys()) { const c = await caches.open(k); for (const r of await c.keys()) if (r.url.startsWith(h) || r.url.includes('sw-switch.json')) return r.url; } return ''; }", A.hood)
        ok('offline: no hood server or switch response in any cache', hood_cached == '', hood_cached)
        STATE['down'] = False; br.close()

ok('no request left localhost', not FOREIGN, ' '.join(FOREIGN[:3]))
srv.shutdown()
n = len(RES); f = RES.count(False)
print(f'SW_KILLSWITCH {A.browser}: {n - f}/{n} pass, {f} fail'); sys.exit(1 if f else 0)
