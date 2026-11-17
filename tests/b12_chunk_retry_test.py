# Batch 12: a failed dynamic-import JS chunk is retried with backoff (0.6, 1.8, 4.5 s).
# The production incident was a one-off GitHub Pages 503 on assets/armchair-*.js.
#   once   = first request 503, later ones 200 — the chunk (and painting) should appear
#   always = every request 503 — the house stays playable (SVG, no blank screen), a gentle
#            #artRetryNote is shown, and the page must not loop-reload.
# Usage: b12_chunk_retry_test.py URL DIST [chromium webkit]
import re, sys, glob, os, time
from playwright.sync_api import sync_playwright

URL = sys.argv[1]; DIST = sys.argv[2]
BROWSERS = sys.argv[3:] or ['chromium', 'webkit']
CHUNKS = [os.path.basename(p) for p in glob.glob(os.path.join(DIST, 'assets', 'armchair-*.js'))
          if os.path.basename(p).startswith('armchair-')]
CHUNK = CHUNKS[0] if CHUNKS else ''
PATTERN = r'/assets/armchair-[^/]*\.js$'
CHAIR = '#layer .item[data-kind="armchair"]'
results = []

def ok(name, cond, extra=''):
    results.append(bool(cond)); print(('PASS ' if cond else 'FAIL ') + name + (f'  [{extra}]' if extra else ''), flush=True)

def chair_state(pg):
    return pg.evaluate(f'''() => {{ const it = document.querySelector('{CHAIR}'); if (!it) return 'missing';
      const img = it.querySelector('img.artimg');
      if (img) return (img.complete && img.naturalWidth > 0) ? 'painted' : 'img-not-loaded';
      return it.querySelector('svg') ? 'svg' : 'empty'; }}''')

def broken_imgs(pg):
    return pg.evaluate('''() => [...document.querySelectorAll('#stage img')].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src') && getComputedStyle(i).visibility !== 'hidden' && i.getClientRects().length).map(i => (i.getAttribute('src')||'').split('/').pop())''')

def painted(pg, timeout):
    try:
        pg.wait_for_function(f'''() => {{ const i = document.querySelector('{CHAIR} img.artimg'); return !!(i && i.complete && i.naturalWidth > 0); }}''', timeout=timeout)
        return True
    except Exception:
        return False

def run(p, bn, mode):
    b = getattr(p, bn).launch()
    ctx = b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=1, has_touch=True, service_workers='block')
    ctx.route('**/*workers.dev*', lambda r: r.abort())
    hits = []
    def h(route):
        hits.append(time.time())
        if mode == 'always' or len(hits) == 1:
            route.fulfill(status=503, body='Service Unavailable')
        else:
            route.continue_()
    ctx.route(re.compile(PATTERN), h)
    pg = ctx.new_page()
    loads = []
    pg.on('load', lambda _: loads.append(time.time()))
    pg.goto(URL)
    pg.wait_for_selector('#stage', timeout=20000)
    for s in ['#phoneOk', '#wnGo', '#phoneOk']:
        if pg.locator(s).count() and pg.locator(s).first.is_visible():
            pg.locator(s).first.click(force=True); pg.wait_for_timeout(300)
    try:
        if mode == 'once':
            got = painted(pg, 15000)
            ok(f'{bn} chunk 503 once: armchair painting loads after a retry', got, f'requests={len(hits)} state={chair_state(pg)}')
            ok(f'{bn} chunk 503 once: one retry, no more', len(hits) == 2, str(len(hits)))
            ok(f'{bn} chunk 503 once: the page did not reload', len(loads) == 1, f'loads={len(loads)}')
            ok(f'{bn} chunk 503 once: no broken images, stage still there', bool(pg.query_selector('#stage')) and not broken_imgs(pg), str(broken_imgs(pg)))
        else:
            # First try is immediate; give the SVG fallback a moment, then wait out 0.6+1.8+4.5s.
            pg.wait_for_timeout(1500)
            ok(f'{bn} chunk 503 always: armchair shows its drawing (SVG) while retrying', chair_state(pg) == 'svg', chair_state(pg))
            ok(f'{bn} chunk 503 always: the house is not blank', bool(pg.query_selector('#stage')) and bool(pg.query_selector('#layer')), 'no stage')
            pg.wait_for_timeout(9000)
            ok(f'{bn} chunk 503 always: gives up after 1 try + 3 retries', len(hits) == 4, str(len(hits)))
            ok(f'{bn} chunk 503 always: armchair keeps its SVG, no broken image', chair_state(pg) == 'svg' and not broken_imgs(pg), f'{chair_state(pg)} {broken_imgs(pg)}')
            note = pg.query_selector('#artRetryNote')
            ok(f'{bn} chunk 503 always: gentle kid-safe note, not a blank screen', bool(note) and 'still play' in (note.inner_text() if note else '').lower(), note.inner_text() if note else 'missing')
            ok(f'{bn} chunk 503 always: the page did not loop-reload', len(loads) == 1, f'loads={len(loads)}')
            n = len(hits)
            pg.wait_for_timeout(3000)
            ok(f'{bn} chunk 503 always: no requests after giving up', len(hits) == n, f'{n}->{len(hits)}')
            ok(f'{bn} chunk 503 always: stage still playable', bool(pg.query_selector('#stage')) and chair_state(pg) in ('svg', 'painted'))
    finally:
        b.close()

def main():
    ok('armchair JS chunk is in the dist', bool(CHUNK), CHUNK or 'none')
    with sync_playwright() as p:
        for bn in BROWSERS:
            run(p, bn, 'once')
            run(p, bn, 'always')
    bad = sum(1 for x in results if not x)
    print(f'\n{sum(1 for x in results if x)} passed, {bad} failed')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
