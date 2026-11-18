"""Late cache.write from the real shipped worker, delayed by a slow network response.

usage: sw_lateput_test.py --late LATE --kill KILL --hood URL [--browser chromium|webkit]
         [--port 5353] [--runs 5] [--expect clean|dirty]

LATE must be the unchanged shipped public/sw.js (42b8fd4, byte-identical to 2e4c878).
No injected timer. The test server holds one app-asset response for ~5.5s so the
outgoing fetch handler's respondWith stays open, then its caches.open+put can
land after kill has activated and wiped.

KILL is the shipped kill worker (expect dirty) or the B15 kill worker (expect clean).
"""
import argparse, json, os, socket, sys, threading, time, difflib, re
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument('--late', required=True)
ap.add_argument('--kill', required=True)
ap.add_argument('--hood', required=True)
ap.add_argument('--browser', default='chromium')
ap.add_argument('--port', type=int, default=5353)
ap.add_argument('--runs', type=int, default=5)
ap.add_argument('--expect', choices=('clean', 'dirty'), required=True)
ap.add_argument('--orig-sw', default='', help='unstamped shipped public/sw.js for the fixture-diff check')
A = ap.parse_args()

PROD = '/kids-house-game/'
SLOW = PROD + 'slow.js'
HOLD = 5.5
STATE = {'dirs': {PROD: A.late}, 'down': False}
DIAG_HTML = b'<!doctype html><title>lateput</title><body>lateput</body>'
SLOW_BODY = b'/* slow app asset */\n'
TYPES = {'.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
         '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.css': 'text/css',
         '.html': 'text/html', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2'}

class H(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_GET(self):
        if STATE['down']:
            try: self.connection.shutdown(socket.SHUT_RDWR)
            except OSError: pass
            self.close_connection = True; return
        p = urlparse(self.path).path
        if p == SLOW or p == SLOW + '/':
            time.sleep(HOLD)
            body = SLOW_BODY
            self.send_response(200)
            self.send_header('Content-Type', 'text/javascript')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body))); self.end_headers()
            self.wfile.write(body); return
        if p == PROD + 'diag.html' or p == PROD + 'diag.html/':
            body = DIAG_HTML
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body))); self.end_headers()
            self.wfile.write(body); return
        if not p.startswith(PROD):
            self.send_error(404); return
        rel = p[len(PROD):] or 'index.html'
        f = os.path.join(STATE['dirs'][PROD], rel)
        if os.path.isdir(f): f = os.path.join(f, 'index.html')
        if not os.path.isfile(f):
            self.send_error(404); return
        body = open(f, 'rb').read()
        self.send_response(200)
        self.send_header('Content-Type', TYPES.get(os.path.splitext(f)[1], 'application/octet-stream'))
        self.send_header('Cache-Control', 'no-cache'); self.send_header('Content-Length', str(len(body))); self.end_headers()
        self.wfile.write(body)

def strip_build(s):
    return re.sub(r"const BUILD = '[^']+';", "const BUILD = '__COZY_BUILD__';", s, count=1)

def check_fixture():
    late = open(os.path.join(A.late, 'sw.js'), encoding='utf-8').read()
    if 'mayCache' in late:
        return False, 'fixture contains mayCache (must be the unchanged shipped sw.js)'
    if 'SW_REV' in late:
        return False, 'fixture contains SW_REV (must be the unchanged shipped sw.js)'
    if 'setTimeout(ok, 2000)' in late:
        return False, 'fixture has an injected 2s put delay (must be unchanged shipped sw.js)'
    orig_path = A.orig_sw or '/workspace/t-batch15/wt-base/public/sw.js'
    if not os.path.isfile(orig_path):
        orig_path = '/workspace/t-batch15/sw-2e4c878.js'
    orig = open(orig_path, encoding='utf-8').read()
    got, exp = strip_build(late), strip_build(orig)
    if got != exp:
        d = ''.join(difflib.unified_diff(exp.splitlines(True), got.splitlines(True), 'shipped', 'fixture', n=2))
        return False, 'fixture is not the unchanged shipped sw.js:\n' + d[:2000]
    return True, 'unchanged shipped public/sw.js (no injected delay)'

fx_ok, fx_msg = check_fixture()
print(('PASS ' if fx_ok else 'FAIL ') + 'late-put fixture is the unchanged shipped sw.js  [' + fx_msg.split('\n')[0] + ']', flush=True)
if not fx_ok:
    print(fx_msg, flush=True)
    sys.exit(1)

srv = ThreadingHTTPServer(('127.0.0.1', A.port), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{A.port}{PROD}diag.html'
SLOW_URL = f'http://127.0.0.1:{A.port}{SLOW}'
FOREIGN = []
INFO = """async () => {
  const regs = await navigator.serviceWorker.getRegistrations();
  const cachesNames = await caches.keys();
  return {
    ctl: !!navigator.serviceWorker.controller,
    regs: regs.length,
    scopes: regs.map(r => new URL(r.scope).pathname),
    caches: cachesNames
  };
}"""
WAIT_CTL = """async (ms) => { const sw = navigator.serviceWorker; if (!sw) return false; if (sw.controller) return true;
  return await new Promise(r => { const t = setTimeout(() => r(!!sw.controller), ms); sw.addEventListener('controllerchange', () => { clearTimeout(t); r(true); }, { once: true }); }); }"""

def cozy(c):
    return sorted(k for k in c if k == 'cozy-v1' or k.startswith('cozy:'))

def classify(tl, at_end):
    ever_clean = any(not cozy(names) for _, names, _regs in tl)
    now = cozy(at_end.get('caches', []))
    if not now:
        return 'clean'
    return 'reappeared' if ever_clean else 'lingering'

def one_run(pw, n):
    br = getattr(pw, A.browser).launch()
    ctx = br.new_context(viewport={'width': 800, 'height': 600})
    page = ctx.new_page()
    STATE['dirs'][PROD] = A.late; STATE['down'] = False
    page.goto(URL, wait_until='load')
    page.evaluate("""async () => {
      const r = await navigator.serviceWorker.register('sw.js', { scope: '/kids-house-game/' });
      await new Promise(res => {
        const done = () => res(true);
        const t = setTimeout(done, 10000);
        if (r.active && !(r.installing || r.waiting)) { clearTimeout(t); done(); return; }
        const w = r.installing || r.waiting || r.active;
        if (w) w.addEventListener('statechange', ev => {
          if (ev.target && ev.target.state === 'activated') { clearTimeout(t); done(); }
        });
      });
    }""")
    page.evaluate(WAIT_CTL, 8000)
    # First fetch: sw-switch.json is never cached and does not put. That starts the
    # shipped 3s waitUntil. Let it finish so it cannot delay kill activation.
    page.evaluate("() => { fetch(new URL('sw-switch.json?t=' + Date.now(), location.href).href, { cache: 'no-store' }).catch(() => {}); }")
    page.wait_for_timeout(3200)
    # In-flight app fetch: the server holds the body for HOLD seconds. respondWith
    # stays open, which should keep the outgoing worker alive until open+put.
    page.evaluate("""(url) => { window.__slow = fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).catch(() => {}); }""", SLOW_URL)
    page.wait_for_timeout(150)
    STATE['dirs'][PROD] = A.kill
    t0 = time.time()
    try:
        page.evaluate("""async () => {
          const r = await navigator.serviceWorker.register('sw.js', { scope: '/kids-house-game/' });
          await r.update();
        }""")
    except Exception as e:
        print('  (kill pull:', str(e).splitlines()[0], ')')
    TL = []
    # Cover the remaining hold (~5.3s) plus B15's 3s second wipe, with margin.
    end = time.time() + 12
    last = None
    while time.time() < end:
        try: v = page.evaluate(INFO)
        except Exception as e: v = {'err': str(e), 'caches': [], 'regs': -1}
        if 'err' not in v:
            key = (v['regs'], tuple(v['caches']))
            if key != last:
                TL.append((round(time.time() - t0, 2), list(v['caches']), v['regs']))
                last = key
        time.sleep(0.25)
    try: fin = page.evaluate(INFO)
    except Exception as e: fin = {'caches': [], 'regs': -1, 'ctl': True, 'err': str(e)}
    cls = classify([(t, c, r) for t, c, r in TL], fin)
    print('  RUN ' + json.dumps({'n': n, 'class': cls, 't': round(time.time() - t0, 2),
                                 'ctl': fin.get('ctl'), 'regs': fin.get('regs'),
                                 'caches': cozy(fin.get('caches', [])),
                                 'timeline': [(t, cozy(c), r) for t, c, r in TL]}), flush=True)
    br.close()
    return cls

results = []
with sync_playwright() as pw:
    for n in range(1, A.runs + 1):
        cls = one_run(pw, n)
        results.append(cls)
        expect_clean = (A.expect == 'clean')
        ok = (cls == 'clean') if expect_clean else (cls == 'reappeared')
        print(('PASS ' if ok else 'FAIL ') + f'lateput {A.browser} run {n}/{A.runs} class={cls} expect={A.expect}', flush=True)

srv.shutdown()
fails = 0
for cls in results:
    expect_clean = (A.expect == 'clean')
    if expect_clean:
        if cls != 'clean':
            fails += 1
    elif cls != 'reappeared':
        fails += 1
if FOREIGN:
    print('FAIL request left localhost ' + ' '.join(FOREIGN[:3]), flush=True)
    fails += 1
print(f'LATEPUT {A.browser} expect={A.expect}: {A.runs - fails}/{A.runs}  results=' + ','.join(results), flush=True)
sys.exit(1 if fails else 0)
