"""Batch 8 (D-06/D-T3): service worker updates and the kill switch, against local builds only.

usage: sw_killswitch_test.py --old OLD_DIST --new NEW --new2 NEW2 --kill KILL --off OFF --hood http://localhost:PORT
         [--browser chromium|webkit] [--port 7471]
OLD  = a build with the pre-Batch-8 worker ('cozy-v1' forever), e.g. main 12cdfdc or prod 10ef736
NEW/NEW2 = two builds of the branch (different COZY_BUILD); KILL = COZY_SW_KILL=1 build;
OFF  = NEW with sw-switch.json {"sw":"off"}.
One tiny local web server swaps which build it serves at /kids-house-game/ and optionally /cozy-preview/
(Cache-Control: no-cache),
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
# Preview-base builds for the dual-scope isolation case (same origin, /cozy-preview/).
ap.add_argument('--prev-new', default=''); ap.add_argument('--prev-kill', default=''); ap.add_argument('--prev-off', default='')
A = ap.parse_args()
PROD = '/kids-house-game/'
PREV = '/cozy-preview/'
# dirs maps URL prefix -> dist directory. Single-prefix scenarios only set PROD.
STATE = {'dirs': {PROD: A.old}, 'down': False}
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
        prefix = None
        for pref in sorted(STATE['dirs'], key=len, reverse=True):
            if p.startswith(pref):
                prefix = pref; break
        if not prefix: self.send_error(404); return
        rel = p[len(prefix):] or 'index.html'
        f = os.path.join(STATE['dirs'][prefix], rel)
        if os.path.isdir(f): f = os.path.join(f, 'index.html')
        if not os.path.isfile(f): self.send_error(404); return
        body = open(f, 'rb').read()
        self.send_response(200)
        self.send_header('Content-Type', TYPES.get(os.path.splitext(f)[1], 'application/octet-stream'))
        self.send_header('Cache-Control', 'no-cache'); self.send_header('Content-Length', str(len(body))); self.end_headers()
        self.wfile.write(body)

srv = ThreadingHTTPServer(('127.0.0.1', A.port), H); threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = f'http://localhost:{A.port}{PROD}?hood={A.hood}'
PREV_URL = f'http://localhost:{A.port}{PREV}?hood={A.hood}'
RES = []; FOREIGN = []
def ok(name, cond, extra=''):
    RES.append(bool(cond)); print(('PASS ' if cond else 'FAIL ') + name + (f'  [{extra}]' if extra else ''), flush=True)

WAIT_CTL = """async (ms) => { const sw = navigator.serviceWorker; if (!sw) return false; if (sw.controller) return true;
  return await new Promise(r => { const t = setTimeout(() => r(!!sw.controller), ms); sw.addEventListener('controllerchange', () => { clearTimeout(t); r(true); }, { once: true }); }); }"""
INFO = """async () => {
  const regs = await navigator.serviceWorker.getRegistrations();
  const cachesNames = await caches.keys();
  let v1urls = [];
  if (cachesNames.includes('cozy-v1')) {
    const c = await caches.open('cozy-v1');
    v1urls = (await c.keys()).map(r => new URL(r.url).pathname);
  }
  return {
    ctl: !!navigator.serviceWorker.controller,
    ctlUrl: navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : '',
    regs: regs.length,
    scopes: regs.map(r => new URL(r.scope).pathname),
    caches: cachesNames,
    v1urls,
    stage: !!document.getElementById('stage') && document.getElementById('stage').getBoundingClientRect().width > 100,
    save: localStorage.getItem('cozy-house')
  };
}"""

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

def load_controlled(page, d, prefix=PROD, url=None):
    STATE['dirs'][prefix] = d; STATE['down'] = False
    page.goto(url or (PREV_URL if prefix == PREV else URL), wait_until='load'); page.evaluate(WAIT_CTL, 15000)
    rl(page); page.wait_for_timeout(1500)  # second load goes through the worker (cached for offline)
    return page.evaluate(INFO)

def set_dir(prefix, d):
    STATE['dirs'][prefix] = d

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
        stacks = []
        page.on('pageerror', lambda e: stacks.append({'name': getattr(e, 'name', ''), 'message': getattr(e, 'message', str(e)), 'stack': getattr(e, 'stack', '')}))
        i0 = load_controlled(page, A.old); save0 = put_house(page)
        ok('kill: old build is controlled by its worker', i0['ctl'] and i0['regs'] >= 1, str(i0['caches']))
        set_dir(PROD, A.kill); t_kill = time.time()
        rl(page)
        # Timeline poll: record every distinct cache set so a disappear->reappear is visible.
        TL = []; end = time.time() + 25; i1 = None; gone = False
        while time.time() < end:
            try: v = page.evaluate(INFO)
            except Exception as e: v = {'err': str(e)}
            if isinstance(v, dict) and 'err' not in v:
                key = (v['regs'], tuple(v['caches']))
                if not TL or TL[-1][1] != key: TL.append((round(time.time() - t_kill, 2), key))
                i1 = v
                if v['regs'] == 0 and not any(k == 'cozy-v1' or k.startswith('cozy:') for k in v['caches']):
                    gone = True; break
            time.sleep(0.4)
        i1 = i1 or {}
        ok('kill: old worker unregistered and its caches deleted', gone, str({k: i1.get(k) for k in ('regs', 'caches', 'ctl')}))
        print('  TIMELINE ' + json.dumps(TL), flush=True)
        NAV = "() => { const n = performance.getEntriesByType('navigation')[0]; return n ? {transferSize: n.transferSize, workerStart: n.workerStart, type: n.type} : null; }"
        def safety(tag):
            rl(page); page.wait_for_timeout(2500)
            i = page.evaluate(INFO); nav = page.evaluate(NAV)
            net = bool(nav) and nav['workerStart'] == 0 and not i['ctl']
            s = (not i['ctl']) and i['regs'] == 0 and i['scopes'] == [] and i['stage'] and net and items(i['save']) == items(save0) and items(save0) is not None
            print('  SAFETY[' + tag + '] ' + json.dumps({'ctl': i['ctl'], 'regs': i['regs'], 'scopes': i['scopes'], 'stage': i['stage'], 'nav': nav, 'save_ok': items(i['save']) == items(save0), 'caches': i['caches']}), flush=True)
            return i, s
        i2, s2 = safety('followup')
        ok('kill: page is no longer controlled after the next load', not i2['ctl'] and i2['regs'] == 0, str(i2['regs']))
        ok('kill: game renders straight from the network', i2['stage'])
        ok('kill: saved house unchanged', items(i2['save']) == items(save0)  and items(save0) is not None)
        ok('kill: FOLLOWUP SAFETY (uncontrolled, no scopes, network nav, save intact)', s2)
        # Second sweep: 15 s later, without and then with a reload, must stay clean.
        page.wait_for_timeout(15000); sa = page.evaluate(INFO)
        i3, s3 = safety('sweep2')
        ok('kill: SWEEP2 SAFETY still clean after 15 s + reload', s3)
        cz = lambda c: sorted(k for k in c if k == 'cozy-v1' or k.startswith('cozy:'))
        at1, at2, atA, at3 = cz(i1.get('caches', [])), cz(i2['caches']), cz(sa['caches']), cz(i3['caches'])
        ever_clean = any(not [k for k in key[1] if k == 'cozy-v1' or k.startswith('cozy:')] for _, key in TL)
        cls = 'clean' if not (at2 or atA or at3) and gone else ('reappeared' if ever_clean and (at2 or atA or at3) else ('lingering' if (at1 or at2 or atA or at3) else 'clean'))
        print('  SWEEP ' + json.dumps({'class': cls, 'at_poll_end': at1, 'at_followup': at2, 'at_15s': atA, 'at_sweep2_reload': at3}), flush=True)
        ok('kill: post-kill caches stay gone (no lingering/reappeared)', cls == 'clean', cls)
        ok('kill: no page errors', not errs, '; '.join(errs[:3]))
        for st in stacks: print('  PAGEERROR_STACK ' + json.dumps(st), flush=True)
        br.close()

    # B. Old worker -> new build: normal update path, legacy cache removed, save kept.
    if want('upgrade'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.old); save0 = put_house(page)
        ok('upgrade: old build caches into cozy-v1', 'cozy-v1' in i0['caches'], str(i0['caches']))
        set_dir(PROD, A.new)
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
        set_dir(PROD, A.new2)
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
        set_dir(PROD, A.off); n0 = len(navs)
        rl(page)
        i1, gone = poll(page, INFO, lambda v: v['regs'] == 0 and not v['ctl'] and not any(k.startswith('cozy:') or k == 'cozy-v1' for k in v['caches']), 25)
        page.wait_for_timeout(3000); i1 = page.evaluate(INFO)
        ok('off: worker unregistered, caches deleted, page uncontrolled', gone and i1['regs'] == 0, str({k: i1.get(k) for k in ('regs', 'ctl', 'caches')}))
        ok('off: at most one automatic reload (no loop)', len(navs) - n0 <= 2, str(len(navs) - n0))
        n1 = len(navs)
        page.wait_for_timeout(5000)
        ok('off: no further automatic reload in the next 5 s', len(navs) == n1, str(len(navs) - n1))
        i1b = page.evaluate(INFO)
        ok('off: still uncontrolled and rendered after the settle', (not i1b['ctl']) and i1b['regs'] == 0 and i1b['stage'])
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


    # F. Same origin, two scopes: preview Batch 8 must not wipe production's cozy-v1 or its registration.
    # Requires --prev-new/--prev-kill/--prev-off (VITE_BASE=/cozy-preview/ builds).
    if want('scopes'):
        if not (A.prev_new and A.prev_kill and A.prev_off):
            if 'scopes' in SC:
                ok('scopes: preview dists provided (--prev-new/--prev-kill/--prev-off)', False, 'missing args')
            # else skip when running the full suite without preview dists
        else:
            br, ctx, page, errs = fresh(pw, A.browser)
            # Populate production-style cozy-v1 from the old client at /kids-house-game/.
            i0 = load_controlled(page, A.old, PROD, URL)
            ok('scopes: prod old controlled with cozy-v1', i0['ctl'] and 'cozy-v1' in i0['caches'] and PROD in i0['scopes'], str(i0.get('caches')))
            ok('scopes: cozy-v1 holds production URLs', any(u.startswith(PROD) for u in i0.get('v1urls', [])), str(i0.get('v1urls', [])[:5]))

            def assert_prod_untouched(label, info):
                ok(f'scopes/{label}: cozy-v1 still present', 'cozy-v1' in info['caches'], str(info.get('caches')))
                ok(f'scopes/{label}: production URLs still in cozy-v1', any(u.startswith(PROD) for u in info.get('v1urls', [])), str(info.get('v1urls', [])[:5]))
                ok(f'scopes/{label}: production registration still present', PROD in info.get('scopes', []), str(info.get('scopes')))

            # F1: preview NEW worker activates — must not delete cozy-v1.
            set_dir(PREV, A.prev_new)
            prev = ctx.new_page()
            i1 = load_controlled(prev, A.prev_new, PREV, PREV_URL)
            ok('scopes/new: preview controlled under /cozy-preview/', i1['ctl'] and PREV in i1.get('scopes', []), str(i1.get('scopes')))
            i1b = page.evaluate(INFO)
            assert_prod_untouched('new', i1b)
            ok('scopes/new: preview has scoped caches', any(k.startswith('cozy:' + PREV) for k in i1b['caches']), str(i1b['caches']))
            prev.close()

            # F2: preview KILL worker — cleans preview scope only.
            set_dir(PREV, A.prev_kill)
            prev = ctx.new_page()
            prev.goto(PREV_URL, wait_until='load')
            i2, done = poll(prev, INFO, lambda v: PREV not in v.get('scopes', []) and 'cozy-v1' in v.get('caches', []), 25)
            ok('scopes/kill: preview registration gone', done and PREV not in i2.get('scopes', []), str(i2.get('scopes')))
            i2b = page.evaluate(INFO)
            assert_prod_untouched('kill', i2b)
            prev.close()

            # Re-seed preview NEW so switch-off has a worker to remove.
            set_dir(PREV, A.prev_new)
            prev = ctx.new_page()
            load_controlled(prev, A.prev_new, PREV, PREV_URL)
            prev.close()

            # F3: preview switch-off (page JS killSW) — must not delete cozy-v1.
            set_dir(PREV, A.prev_off)
            prev = ctx.new_page()
            prev.goto(PREV_URL, wait_until='load')
            # Soft-kill reloads once; settle then poll. Broken-pipe races are OK as long as
            # the preview registration ends up gone and production cozy-v1 is untouched.
            try: prev.wait_for_timeout(2000)
            except Exception: pass
            i3, done = poll(prev, INFO, lambda v: isinstance(v, dict) and 'err' not in v and PREV not in v.get('scopes', []) and 'cozy-v1' in v.get('caches', []), 35)
            scopes3 = (i3 or {}).get('scopes') if isinstance(i3, dict) else None
            ok('scopes/off: preview registration gone after switch-off', bool(done) and isinstance(scopes3, list) and PREV not in scopes3, str(scopes3))
            i3b = page.evaluate(INFO)
            assert_prod_untouched('off', i3b)
            prev.close()

            ok('scopes: no page errors (isolation browser)', not errs, '; '.join(errs[:3]))
            br.close()

            # F4 reverse in a fresh browser: production NEW still cleans its own cozy-v1.
            # Kept separate from the isolation browser so sessionStorage / multi-scope residue
            # cannot leave the tab uncontrolled (seen as ctl=False, caches=[] after a long F1–F3).
            br2, ctx2, page2, errs2 = fresh(pw, A.browser)
            i_seed = load_controlled(page2, A.old, PROD, URL)
            ok('scopes/prod-seed: cozy-v1 present before upgrade', 'cozy-v1' in i_seed.get('caches', []), str(i_seed.get('caches')))
            set_dir(PROD, A.new)
            rl(page2)
            i4a, cleaned = poll(page2, INFO, lambda v: v['ctl'] and 'cozy-v1' not in v.get('caches', []), 25)
            ok('scopes/prod: production Batch 8 deletes cozy-v1', cleaned, str({k: i4a.get(k) for k in ('ctl', 'caches', 'scopes')}))
            rl(page2); page2.wait_for_timeout(2000)
            i4 = page2.evaluate(INFO)
            ok('scopes/prod: production scoped app cache present', any(k.startswith('cozy:' + PROD + ':app:') for k in i4.get('caches', [])), str(i4.get('caches')))
            ok('scopes: no page errors (prod reverse)', not errs2, '; '.join(errs2[:3]))
            br2.close()



    # G. Mid-session update: a finger is down, so the note waits, the tab does not reload, and play state is kept.
    if want('midsession'):
        br, ctx, page, errs = fresh(pw, A.browser)
        navs = []; page.on('framenavigated', lambda f: navs.append(time.time()) if f == page.main_frame else None)
        i0 = load_controlled(page, A.new); save0 = put_house(page)
        play = page.evaluate("""() => {
          const s = window.__store;
          s.dispatch({ type: 'room/switch', room: 'bedroom' });
          const id = 'ms-pillow';
          s.dispatch({ type: 'item/add', room: 'bedroom', item: { id, kind: 'story-pillow', x: 900, y: 520, flip: false, z: 40, scale: 1 } });
          return { room: s.get().currentRoom, ids: s.get().rooms.bedroom.items.map(i => i.id) };
        }""")
        ok('midsession: started on the first build', i0['ctl'] and play.get('room') == 'bedroom' and 'ms-pillow' in play.get('ids', []), str(play))
        # Snapshot after the pillow is in the store so a persisted add is not a false "save changed".
        page.wait_for_timeout(400)
        save0 = page.evaluate("() => localStorage.getItem('cozy-house')")
        # Dispatch on an Element (not document): game code calls event.target.closest().
        page.evaluate("""() => {
          const el = document.getElementById('stage') || document.body;
          el.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 99, bubbles: true, cancelable: true, pointerType: 'touch', clientX: 120, clientY: 160 }));
        }""")
        n0 = len(navs)
        set_dir(PROD, A.new2)
        page.evaluate("async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); }")
        page.wait_for_timeout(4000)
        note_while = page.locator('.updateNote').count()
        play1 = page.evaluate("""() => {
          const s = window.__store.get();
          return { room: s.currentRoom, ids: (s.rooms.bedroom.items || []).map(i => i.id), stage: !!document.getElementById('stage') };
        }""")
        i1 = page.evaluate(INFO)
        ok('midsession: no refresh note while a finger is down', note_while == 0, 'notes=' + str(note_while))
        ok('midsession: no reload while a finger is down', len(navs) == n0, str(len(navs) - n0))
        ok('midsession: play state kept (bedroom + pillow)', play1.get('room') == 'bedroom' and 'ms-pillow' in play1.get('ids', []) and play1.get('stage'), str(play1))
        ok('midsession: saved house unchanged while waiting', items(i1['save']) == items(save0) and items(save0) is not None)
        page.evaluate("""() => {
          const el = document.getElementById('stage') || document.body;
          el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 99, bubbles: true, cancelable: true, pointerType: 'touch', clientX: 120, clientY: 160 }));
        }""")
        try:
            page.wait_for_selector('.updateNote', timeout=8000); shown = True
        except Exception:
            shown = False
        ok('midsession: note appears after the finger is released', shown and 'New stuff! Tap to refresh' in (page.locator('.updateNote').inner_text() if shown else ''), 'shown=' + str(shown))
        ok('midsession: still no automatic reload after the note appears', len(navs) == n0, str(len(navs) - n0))
        ok('midsession: no page errors', not errs, '; '.join(errs[:3])); br.close()

    # H. Kill on, then off again within 15 s: the delayed second wipe must not eat the new worker or its caches.
    if want('killtoggle'):
        br, ctx, page, errs = fresh(pw, A.browser)
        i0 = load_controlled(page, A.new); save0 = put_house(page)
        apps0 = [k for k in i0['caches'] if ':app:' in k]
        ok('killtoggle: good worker is in control before kill', i0['ctl'] and len(apps0) == 1, str(i0['caches']))
        set_dir(PROD, A.kill); t0 = time.time()
        rl(page)
        i1, gone = poll(page, INFO, lambda v: v['regs'] == 0 and not v['ctl'], 15)
        ok('killtoggle: kill unregistered the outgoing worker', gone, str({k: (i1 or {}).get(k) for k in ('regs', 'ctl', 'caches')}))
        # Flip back to the good build (switch ON) quickly, so a new worker re-registers inside the 3 s second wipe.
        set_dir(PROD, A.new)
        rl(page)
        i2, back = poll(page, INFO, lambda v: v['ctl'] and any(k.startswith('cozy:/kids-house-game/:app:') for k in v.get('caches', [])), 15)
        ok('killtoggle: good worker re-registered while the delayed wipe is still pending', back and (time.time() - t0) < 15, str({k: (i2 or {}).get(k) for k in ('regs', 'ctl', 'caches')}) + f' at={time.time()-t0:.2f}s')
        # Arm a fresh art/app write, then wait out the rest of the delayed wipe (3 s from kill activate, plus margin).
        try:
            page.evaluate("""async () => {
              const img = document.querySelector('img, image, .item img');
              if (img && img.src) await fetch(img.src).catch(() => {});
              await fetch(location.href.split('#')[0]).catch(() => {});
            }""")
        except Exception:
            pass
        wait_more = max(0, 8 - (time.time() - t0))
        page.wait_for_timeout(int(wait_more * 1000) + 2000)
        i3 = page.evaluate(INFO)
        apps3 = [k for k in i3.get('caches', []) if k.startswith('cozy:/kids-house-game/:app:')]
        ok('killtoggle: good worker still registered and in control', i3['ctl'] and i3['regs'] >= 1 and 'kids-house-game' in ''.join(i3.get('scopes', [])), str({k: i3.get(k) for k in ('regs', 'ctl', 'scopes', 'caches')}))
        ok('killtoggle: new app cache was not deleted by the delayed wipe', len(apps3) >= 1, str(i3.get('caches')))
        ok('killtoggle: game still rendered and save intact', i3['stage'] and items(i3['save']) == items(save0) and items(save0) is not None)
        ok('killtoggle: no page errors', not errs, '; '.join(errs[:3])); br.close()


ok('no request left localhost', not FOREIGN, ' '.join(FOREIGN[:3]))
srv.shutdown()
n = len(RES); f = RES.count(False)
print(f'SW_KILLSWITCH {A.browser}: {n - f}/{n} pass, {f} fail'); sys.exit(1 if f else 0)
