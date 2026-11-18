"""Force a late cache.put from the real 2e4c878 worker (only a 2s delay added around put).

usage: sw_lateput_test.py --late LATE --kill KILL --hood URL [--browser chromium|webkit]
         [--port 5353] [--runs 5] [--expect clean|dirty]

LATE must be 2e4c878's public/sw.js with only a 2s delay around cache.put (no mayCache).
KILL is either the 2e4c878 kill worker (expect dirty) or the B15 kill worker (expect clean).
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
ap.add_argument('--orig-sw', default='', help='unstamped 2e4c878 public/sw.js for the fixture-diff check')
A = ap.parse_args()

PROD = '/kids-house-game/'
STATE = {'dirs': {PROD: A.late}, 'down': False}
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

# --- fixture must be 2e4c878 sw.js plus only a 2s delay around put ---
def strip_build(s):
    import re
    return re.sub(r"const BUILD = '[^']+';", "const BUILD = '__COZY_BUILD__';", s, count=1)

def check_fixture():
    late = open(os.path.join(A.late, 'sw.js'), encoding='utf-8').read()
    if 'mayCache' in late:
        return False, 'fixture contains mayCache (must be unmodified 2e4c878 plus delay only)'
    if 'SW_REV' in late:
        return False, 'fixture contains SW_REV (must be unmodified 2e4c878 plus delay only)'
    if late.count('setTimeout(ok, 2000)') < 1:
        return False, 'fixture is missing the 2s put delay'
    orig_path = A.orig_sw or '/workspace/t-batch15/wt-base/public/sw.js'
    if not os.path.isfile(orig_path):
        orig_path = '/tmp/sw-2e4c878.js'
    orig = open(orig_path, encoding='utf-8').read()
    # Compare the late worker to 2e4c878 source, allowing only the delay and a possible BUILD stamp.
    got = strip_build(late)
    # Reconstruct what we expect: orig with the two delay injections.
    exp = orig
    art = 'if (r && r.ok) { await cache.put(req, r.clone()); trimArt(cache); }'
    art2 = 'if (r && r.ok) { await new Promise(ok => setTimeout(ok, 2000)); await cache.put(req, r.clone()); trimArt(cache); }'
    app = 'caches.open(APP).then(x => x.put(nav ? SCOPE : req, c)).catch(() => {});'
    app2 = 'caches.open(APP).then(x => new Promise(ok => setTimeout(ok, 2000)).then(() => x.put(nav ? SCOPE : req, c))).catch(() => {});'
    if art not in exp or app not in exp:
        return False, '2e4c878 source put sites not found'
    exp = exp.replace(art, art2, 1).replace(app, app2, 1)
    if got != exp:
        # show a short diff
        d = ''.join(difflib.unified_diff(exp.splitlines(True), got.splitlines(True), '2e4c878+delay', 'fixture', n=2))
        return False, 'fixture is not 2e4c878 sw.js with only a 2s put delay:\n' + d[:2000]
    return True, '2e4c878 public/sw.js + 2s delay around put only'

fx_ok, fx_msg = check_fixture()
print(('PASS ' if fx_ok else 'FAIL ') + 'late-put fixture is 2e4c878 sw.js with only a 2s put delay  [' + fx_msg.split('\n')[0] + ']', flush=True)
if not fx_ok:
    print(fx_msg, flush=True)
    sys.exit(1)

srv = ThreadingHTTPServer(('127.0.0.1', A.port), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{A.port}{PROD}?hood={A.hood}'
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
    page.evaluate(WAIT_CTL, 15000)
    # Second load goes through the late-put worker so a 2s put is armed, then we
    # switch to kill immediately — before that timer fires.
    page.reload(wait_until='load', timeout=20000)
    try: page.wait_for_function("() => window.__store", timeout=15000)
    except Exception: pass
    # Arm one more in-flight put (an art or document fetch) just before the kill takeover.
    try:
        page.evaluate("""async () => {
          const im = document.querySelector('img');
          const jobs = [fetch(location.href.split('#')[0])];
          if (im && im.src) jobs.push(fetch(im.src));
          await Promise.all(jobs.map(p => p.catch(() => {})));
        }""")
    except Exception:
        pass
    page.wait_for_timeout(200)  # let the fetch reach the SW and start the 2s timer; do not wait the full 2s
    STATE['dirs'][PROD] = A.kill
    t0 = time.time()
    try: page.reload(wait_until='load', timeout=20000)
    except Exception as e: print('  (reload raced:', str(e).splitlines()[0], ')')
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
        ok = (cls == 'clean') if expect_clean else (cls != 'clean')
        print(('PASS ' if ok else 'FAIL ') + f'lateput {A.browser} run {n}/{A.runs} class={cls} expect={A.expect}', flush=True)

srv.shutdown()
fails = 0
for i, cls in enumerate(results, 1):
    expect_clean = (A.expect == 'clean')
    if (cls == 'clean') != expect_clean:
        fails += 1
if FOREIGN:
    print('FAIL request left localhost ' + ' '.join(FOREIGN[:3]), flush=True)
    fails += 1
print(f'LATEPUT {A.browser} expect={A.expect}: {A.runs - fails}/{A.runs}  results=' + ','.join(results), flush=True)
sys.exit(1 if fails else 0)
