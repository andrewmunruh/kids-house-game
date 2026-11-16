# Batch 12: a failed art load is retried with backoff, and a load that never succeeds falls back cleanly.
# Each case is a fresh first visit (service workers blocked, so nothing is served from a cache) with the
# Worker blocked. Playwright answers chosen requests with 503:
#   once   = the first request gets 503, later ones go through (the preview hiccup from the Nov 16 audit)
#   always = every request gets 503 (a file that is really gone)
# Covers the three ways art loads: the per-item URL chunk (soaking-tub-*.js, the file that 503'd on preview),
# the item painting itself (soaking-tub-*.webp), the room's painted scene (room-bathroom-*.webp), and a pack
# picture <img class="packimg"> (cc-cloud-lamp-*.svg, the other file that 503'd).
# Usage: b12_image_retry_test.py URL DIST [chromium webkit]
import re, sys, glob, os, time
from playwright.sync_api import sync_playwright

URL = sys.argv[1]; DIST = sys.argv[2]
BROWSERS = sys.argv[3:] or ['chromium', 'webkit']
LAMP = os.path.basename((glob.glob(os.path.join(DIST, 'assets', 'cc-cloud-lamp-*.svg')) or [''])[0])
results = []
def ok(name, cond, extra=''):
    results.append(bool(cond)); print(('PASS ' if cond else 'FAIL ') + name + (f'  [{extra}]' if extra else ''), flush=True)

def visit(p, bn, pattern, mode, fn):
    b = getattr(p, bn).launch()
    ctx = b.new_context(viewport={'width': 1366, 'height': 1024}, device_scale_factor=1, has_touch=True, service_workers='block')
    ctx.route('**/*workers.dev*', lambda r: r.abort())
    hits = []
    def h(route):
        hits.append(time.time())
        if mode == 'always' or len(hits) == 1: route.fulfill(status=503, body='Service Unavailable')
        else: route.continue_()
    ctx.route(re.compile(pattern), h)
    pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:160]))
    pg.goto(URL); pg.wait_for_selector('#stage'); pg.wait_for_timeout(1200)
    for s in ['#phoneOk', '#wnGo', '#phoneOk']:
        if pg.locator(s).count() and pg.locator(s).first.is_visible(): pg.locator(s).first.click(force=True); pg.wait_for_timeout(300)
    try: fn(pg, hits, errs)
    finally: b.close()

TUB = '#layer .item[data-kind="soaking-tub"]'
def bathroom(pg):
    pg.locator('#tabs .tab[data-room="bathroom"]').first.click(force=True); pg.wait_for_timeout(300)

def painted(pg, timeout):
    try:
        pg.wait_for_function(f'''() => {{ const i = document.querySelector('{TUB} img.artimg'); return !!(i && i.complete && i.naturalWidth > 0); }}''', timeout=timeout); return True
    except Exception: return False

def tub_state(pg):
    return pg.evaluate(f'''() => {{ const it = document.querySelector('{TUB}'); if (!it) return 'missing';
      const img = it.querySelector('img'); if (img) return img.classList.contains('artimg') ? (img.complete && img.naturalWidth > 0 ? 'painted' : 'img-not-loaded') : 'other-img';
      return it.querySelector('svg') ? 'svg' : 'empty'; }}''')

def broken_imgs(pg):
    return pg.evaluate('''() => [...document.querySelectorAll('#stage img, #shelf img')].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src') && getComputedStyle(i).visibility !== 'hidden' && i.getClientRects().length).map(i => i.getAttribute('src').split('/').pop())''')

CASES = []
def case(pattern, mode):
    def deco(fn): CASES.append((pattern, mode, fn)); return fn
    return deco

# 1. The item's URL chunk (what 503'd on preview)
@case(r'/assets/soaking-tub-[^/]*\.js$', 'once')
def chunk_once(bn, pg, hits, errs):
    bathroom(pg); got = painted(pg, 15000)
    ok(f'{bn} chunk 503 once: the tub painting loads after a retry', got, f'requests={len(hits)} state={tub_state(pg)}')
    ok(f'{bn} chunk 503 once: one retry, no more', len(hits) == 2, f'{len(hits)}')

@case(r'/assets/soaking-tub-[^/]*\.js$', 'always')
def chunk_always(bn, pg, hits, errs):
    bathroom(pg); pg.wait_for_timeout(1500)
    ok(f'{bn} chunk 503 always: the tub shows its drawing (SVG) while retrying', tub_state(pg) == 'svg', tub_state(pg))
    pg.wait_for_timeout(9000)
    ok(f'{bn} chunk 503 always: gives up after 1 try + 3 retries', len(hits) == 4, f'{len(hits)}')
    ok(f'{bn} chunk 503 always: the tub keeps its SVG, no broken image', tub_state(pg) == 'svg' and not broken_imgs(pg), f'{tub_state(pg)} {broken_imgs(pg)}')
    n = len(hits); pg.wait_for_timeout(3000)
    ok(f'{bn} chunk 503 always: no requests after giving up', len(hits) == n, f'{n}->{len(hits)}')

# 2. The painting file itself
@case(r'/assets/soaking-tub-[^/]*\.webp$', 'once')
def webp_once(bn, pg, hits, errs):
    bathroom(pg); got = painted(pg, 15000)
    ok(f'{bn} webp 503 once: the painting comes back after a retry', got, f'requests={len(hits)} state={tub_state(pg)}')
    ok(f'{bn} webp 503 once: the tub stayed visible (SVG, then painting)', got and not broken_imgs(pg), str(broken_imgs(pg)))

@case(r'/assets/soaking-tub-[^/]*\.webp$', 'always')
def webp_always(bn, pg, hits, errs):
    bathroom(pg); pg.wait_for_timeout(1500)
    ok(f'{bn} webp 503 always: the SVG shows at once', tub_state(pg) == 'svg', tub_state(pg))
    pg.wait_for_timeout(10000)
    ok(f'{bn} webp 503 always: retries are bounded (2..5 requests)', 2 <= len(hits) <= 5, f'{len(hits)}')
    ok(f'{bn} webp 503 always: the tub keeps its SVG, no broken image', tub_state(pg) == 'svg' and not broken_imgs(pg), f'{tub_state(pg)} {broken_imgs(pg)}')

# 3. The painted room scene
def scene_on(pg):
    return pg.evaluate("() => { const s = document.getElementById('stage'); const i = document.querySelector('#sceneArt > img.sceneArt'); return [s.dataset.sceneArt || '', !!(i && !i.hidden && i.naturalWidth > 0)]; }")
@case(r'/assets/room-bathroom-[^/]*\.webp$', 'once')
def scene_once(bn, pg, hits, errs):
    bathroom(pg)
    try: pg.wait_for_function("() => document.getElementById('stage').dataset.sceneArt === 'room-bathroom'", timeout=15000); got = True
    except Exception: got = False
    ok(f'{bn} scene 503 once: the painted bathroom shows after a retry', got and scene_on(pg)[1], f'requests={len(hits)} {scene_on(pg)}')

@case(r'/assets/room-bathroom-[^/]*\.webp$', 'always')
def scene_always(bn, pg, hits, errs):
    bathroom(pg); pg.wait_for_timeout(11000)
    st = scene_on(pg)
    ok(f'{bn} scene 503 always: the drawn (vector) room stays, no painting marked on', st[0] == '' and not st[1], str(st))
    ok(f'{bn} scene 503 always: retries are bounded (2..5 requests)', 2 <= len(hits) <= 5, f'{len(hits)}')
    ok(f'{bn} scene 503 always: no broken image left in the stage', not broken_imgs(pg), str(broken_imgs(pg)))

# 4. A pack picture <img class="packimg"> (no SVG behind it)
ADD = """(src) => { const h = document.createElement('div'); h.id = 'b12probe'; h.style.cssText = 'position:fixed;left:10px;top:10px;width:120px;height:120px;z-index:99999';
  h.innerHTML = '<img class="packimg" alt="" src="' + src + '">'; document.body.appendChild(h); }"""
def probe(pg):
    return pg.evaluate("""() => { const h = document.getElementById('b12probe'); const i = h.querySelector('img');
      return { img: !!i, loaded: !!(i && i.complete && i.naturalWidth > 0), wait: !!(i && i.classList.contains('imgwait')), miss: !!h.querySelector('svg.imgmiss') }; }""")
@case(r'/assets/cc-cloud-lamp-[^/]*\.svg$', 'once')
def pack_once(bn, pg, hits, errs):
    pg.evaluate(ADD, 'assets/' + LAMP); pg.wait_for_timeout(300)
    mid = probe(pg)
    ok(f'{bn} pack picture 503 once: hidden while it waits (no broken glyph)', mid['wait'] or mid['loaded'], str(mid))
    try: pg.wait_for_function("() => { const i = document.querySelector('#b12probe img'); return !!(i && i.naturalWidth > 0); }", timeout=10000); got = True
    except Exception: got = False
    end = probe(pg)
    ok(f'{bn} pack picture 503 once: loads after a retry and is visible', got and not end['wait'], f'requests={len(hits)} {end}')

@case(r'/assets/cc-cloud-lamp-[^/]*\.svg$', 'always')
def pack_always(bn, pg, hits, errs):
    pg.evaluate(ADD, 'assets/' + LAMP); pg.wait_for_timeout(10000)
    end = probe(pg)
    ok(f'{bn} pack picture 503 always: becomes the soft placeholder tile', end['miss'] and not end['img'], str(end))
    ok(f'{bn} pack picture 503 always: 1 try + 3 retries', len(hits) == 4, f'{len(hits)}')

with sync_playwright() as P:
    for bn in BROWSERS:
        print(f'== {bn}', flush=True)
        for pattern, mode, fn in CASES:
            def run(pg, hits, errs, fn=fn, bn=bn):
                fn(bn, pg, hits, errs)
                ok(f'{bn} {fn.__name__}: no page errors', not errs, str(errs[:2]))
            visit(P, bn, pattern, mode, run)
n = len(results); f = results.count(False)
print(f'B12_IMAGE_RETRY: {n - f}/{n} passed' + (' (SOME FAILED)' if f else ' ALL OK'))
sys.exit(1 if f else 0)
