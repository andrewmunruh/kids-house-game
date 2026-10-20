# The production build emits paintings as /assets/<name>-<hash>.webp.
# The service worker must serve that URL cache-first. A dev server still
# has /assets/art/, so this check builds nothing itself: it serves a finished
# vite build and counts real network hits with caching turned off.
import json
import mimetypes
import os
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

from playwright.sync_api import sync_playwright

mimetypes.add_type('image/webp', '.webp')
OUT = os.path.abspath(sys.argv[1])
# The build is made with vite base /kids-house-game/ unless VITE_BASE overrides it.
# Serve the dist under that prefix so the SW scope and asset URLs match production.
BASE = '/' + (sys.argv[2] if len(sys.argv) > 2 else os.environ.get('VITE_BASE', '/kids-house-game/')).strip('/') + '/'
BASE = '/' if BASE == '//' else BASE
counts = {}
lock = threading.Lock()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUT, **kwargs)

    def translate_path(self, path):
        if BASE != '/' and path.startswith(BASE):
            path = '/' + path[len(BASE):]
        return super().translate_path(path)

    def do_GET(self):
        path = self.path.split('?', 1)[0]
        if BASE != '/' and path.startswith(BASE):
            path = '/' + path[len(BASE):]
        with lock:
            counts[path] = counts.get(path, 0) + 1
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        return


def main():
    assets = os.path.join(OUT, 'assets')
    webps = sorted(n for n in os.listdir(assets) if n.endswith('.webp'))
    scripts = sorted(n for n in os.listdir(assets) if n.endswith('.js'))
    fails = 0

    def ok(name, cond, extra=''):
        nonlocal fails
        line = ('PASS ' if cond else 'FAIL ') + name + ((' ' + extra) if extra else '')
        print(line, flush=True)
        if not cond:
            fails += 1

    ok('the production build emits a hashed painting', any(n.startswith('ball-') and n != 'ball.webp' for n in webps), ' '.join(webps[:4]))
    httpd = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{port}'
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()
            seen = set()
            page.on('request', lambda r: seen.add(r.url.split('?', 1)[0]))
            page.set_default_timeout(15000)
            page.goto(origin + BASE, wait_until='domcontentloaded')
            page.wait_for_function('() => window.__store')
            controlled = page.evaluate('''async () => {
              if (!navigator.serviceWorker) return false;
              const ready = navigator.serviceWorker.ready.then(() => true);
              const timed = new Promise(res => setTimeout(() => res(false), 5000));
              if (!await Promise.race([ready, timed])) return false;
              if (!navigator.serviceWorker.controller) {
                await new Promise(res => {
                  const timer = setTimeout(res, 4000);
                  navigator.serviceWorker.addEventListener('controllerchange', () => { clearTimeout(timer); res(1); }, { once: true });
                });
              }
              return !!navigator.serviceWorker.controller;
            }''')
            ok('the production service worker controls the page', controlled is True)
            fresh = [n for n in webps if f'{origin}{BASE}assets/{n}' not in seen]
            ok('a built painting was not already fetched', len(fresh) > 0, str(len(fresh)))
            if fresh and controlled:
                name = next((n for n in fresh if n.startswith('ball-')), fresh[0])
                path = f'/assets/{name}'
                url = BASE.rstrip('/') + path
                ok('the built painting is not under /assets/art/', '/assets/art/' not in path and path.endswith('.webp'))
                with lock:
                    before = counts.get(path, 0)
                result = page.evaluate('''async (url) => {
                  const a = await fetch(url);
                  const buf = await a.arrayBuffer();
                  const b = await fetch(url);
                  return {
                    a: a.status, b: b.status, bytes: buf.byteLength,
                    head: Array.from(new Uint8Array(buf.slice(0, 4))),
                  };
                }''', url)
                with lock:
                    hits = counts.get(path, 0) - before
                ok('a built painting is cache-first', hits == 1 and result['a'] == 200 and result['b'] == 200 and result['bytes'] > 1000, json.dumps({'hits': hits, **{k: result[k] for k in ('a', 'b', 'bytes')}}))
                ok('the cached painting is a webp', result['head'] == [82, 73, 70, 70])
            if scripts and controlled:
                script = f'/assets/{scripts[0]}'
                surl = BASE.rstrip('/') + script
                with lock:
                    before = counts.get(script, 0)
                page.evaluate('''async (url) => { await fetch(url); await fetch(url); }''', surl)
                with lock:
                    hits = counts.get(script, 0) - before
                ok('a built script stays network-first', hits == 2, f'hits {hits}')
            browser.close()
    finally:
        httpd.shutdown()
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
