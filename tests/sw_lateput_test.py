"""Force a late cache.put from the real shipped worker (only a 2s delay added around put).

usage: sw_lateput_test.py --late LATE --kill KILL --hood URL [--browser chromium|webkit]
         [--port 5353] [--runs 5] [--expect clean|dirty]

LATE must be the shipped public/sw.js (42b8fd4, byte-identical to 2e4c878) with only a 2s delay around cache.put (no mayCache).
KILL is either the shipped kill worker (expect dirty) or the B15 kill worker (expect clean).

The delay is in front of caches.open+put, not just put on an already-open handle:
both browsers refuse to recreate a deleted cache from a stale Cache object. On this
Playwright Chromium/WebKit, the outgoing worker's first-fetch 3s waitUntil also
delays the kill worker's activation until after the 2s write, so the wipe lands
after the put and the base still ends clean. See REPORT.md. Do not fake a dirty fail.
"""
import argparse, json, os, socket, sys, threading, time, hashlib, difflib
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
STATE = {'dirs': {PROD: A.late}, 'down': False}
DIAG_HTML = b'<!doctype html><title>lateput</title><body>lateput</body>'
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

# --- fixture must be the shipped sw.js plus only a 2s delay around put ---
def strip_build(s):
    import re
    return re.sub(r"const BUILD = '[^']+';", "const BUILD = '__COZY_BUILD__';", s, count=1)

def check_fixture():
    late = open(os.path.join(A.late, 'sw.js'), encoding='utf-8').read()
    if 'mayCache' in late:
        return False, 'fixture contains mayCache (must be unmodified shipped sw.js plus delay only)'
    if 'SW_REV' in late:
        return False, 'fixture contains SW_REV (must be unmodified shipped sw.js plus delay only)'
    if late.count('setTimeout(ok, 2000)') < 1:
        return False, 'fixture is missing the 2s put delay'
    orig_path = A.orig_sw or '/workspace/t-batch15/wt-base/public/sw.js'
    if not os.path.isfile(orig_path):
        orig_path = '/workspace/t-batch15/sw-2e4c878.js'
    orig = open(orig_path, encoding='utf-8').read()
    # Compare the late worker to the shipped source, allowing only the delay and a possible BUILD stamp.
    got = strip_build(late)
    # Reconstruct what we expect: orig with the two delay injections.
    exp = orig
    art = 'if (r && r.ok) { await cache.put(req, r.clone()); trimArt(cache); }'
    art2 = 'if (r && r.ok) { const c = r.clone(); new Promise(ok => setTimeout(ok, 2000)).then(() => caches.open(ART).then(x => x.put(req, c).then(() => trimArt(x)))); }'
    app = 'caches.open(APP).then(x => x.put(nav ? SCOPE : req, c)).catch(() => {});'
    app2 = 'new Promise(ok => setTimeout(ok, 2000)).then(() => caches.open(APP).then(x => x.put(nav ? SCOPE : req, c))).catch(() => {});'
    if art not in exp or app not in exp:
        return False, 'shipped source put sites not found'
    exp = exp.replace(art, art2, 1).replace(app, app2, 1)
    if got != exp:
        # show a short diff
        d = ''.join(difflib.unified_diff(exp.splitlines(True), got.splitlines(True), 'shipped+delay', 'fixture', n=2))
        return False, 'fixture is not shipped sw.js with only a 2s put delay:\n' + d[:2000]
    return True, 'shipped public/sw.js + 2s delay around put only'

fx_ok, fx_msg = check_fixture()
print(('PASS ' if fx_ok else 'FAIL ') + 'late-put fixture is shipped sw.js with only a 2s put delay  [' + fx_msg.split('\n')[0] + ']', flush=True)
if not fx_ok:
    print(fx_msg, flush=True)
    sys.exit(1)

srv = ThreadingHTTPServer(('127.0.0.1', A.port), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{A.port}{PROD}diag.html'
FOREIGN = []
INFO = """async () => {
  const regs = await navigator.serviceWorker.getRegistrations();
  const cachesNames = await caches.keys();
  return {
    ctl: !!navigator.serviceWorker.controller,
    regs: regs.length,
    scopes: regs.map(r => new URL(r.scope).pathname),
    caches: cachesNames,
    stage: !!document.getElementById('stage') && document.getElementById('stage').getBoundingClientRect().width > 100,
    save: localStorage.getItem('cozy-house')
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
    ctx = br.new_context(viewport={'width': 1180, 'height': 820})
    ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
    def watch(r):
        h = urlparse(r.url).hostname
        if h and h not in ('localhost', '127.0.0.1'): FOREIGN.append(r.url)
    ctx.on('request', watch)
    page = ctx.new_page()
    STATE['dirs'][PROD] = A.late; STATE['down'] = False
    page.goto(URL, wait_until='load')
    # This page has no startSW: #69 is the kill *worker* leaving a late cache on a
    # tab whose page JS does not also wipe. Register the late worker ourselves.
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
    # Arm a late write: the 2s delay sits in front of caches.open+put, because a
    # put on a Cache handle opened *before* the wipe does not recreate the cache
    # (confirmed in both browsers). Do not await the fetch.
    page.evaluate("() => { fetch(location.href, { cache: 'no-store' }).catch(() => {}); }")
    page.wait_for_timeout(150)
    STATE['dirs'][PROD] = A.kill
    t0 = time.time()
    # register/update pulls in kill.js. diag.html does not run startSW, so a
    # kill-driven navigate will not do a second, client-side cache wipe.
    try:
        page.evaluate("""async () => {
          const r = await navigator.serviceWorker.register('sw.js', { scope: '/kids-house-game/' });
          await r.update();
        }""")
    except Exception as e:
        print('  (kill pull:', str(e).splitlines()[0], ')')
    TL = []
    # Watch long enough for the 2s late put AND the 3s second wipe (plus margin).
    end = time.time() + 10
    last = None
    while time.time() < end:
        try: v = page.evaluate(INFO)
        except Exception as e: v = {'err': str(e), 'caches': [], 'regs': -1}
        if 'err' not in v:
            key = (v['regs'], tuple(v['caches']))
            if key != last:
                TL.append((round(time.time() - t0, 2), list(v['caches']), v['regs']))
                last = key
        time.sleep(0.3)
    # One more sample after the window
    try: fin = page.evaluate(INFO)
    except Exception as e: fin = {'caches': [], 'regs': -1, 'ctl': True, 'stage': False, 'err': str(e)}
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
for i, cls in enumerate(results, 1):
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
