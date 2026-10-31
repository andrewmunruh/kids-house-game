"""Batch 4 (MP-1/2/3/7) heartbeat, wake, re-send, idle drop and offline chat.
usage: heartbeat_test.py CLIENT SERVER [OUT.json]
  CLIENT: pr | base | old   (built dists: PR, base 2dea54f, old 10ef736)
  SERVER: pr | base         (server/node.ts from the PR tree or the base tree = production core)
Starts its own web + hood servers (ports 6940-6949), kills them by exact PID. Run under flock /workspace/surprise/gate.lock.
"""
import asyncio, json, os, sys, time, subprocess, tempfile, signal
sys.path.insert(0, '/workspace/t-qa-C'); sys.path.insert(0, '/workspace/qa-review/2026-10-30/messaging-multiplayer/tools')
from playwright.async_api import async_playwright
from testnav import tap, SKIP_WN, to_map
from common import adult, join, wait_js
DISTS = {'pr': os.environ.get('DIST_PR', '/workspace/t-batch4/dist-pr'), 'base': '/workspace/t-batch3/dist-pr', 'old': '/workspace/t-batchB-old10/dist'}
TREES = {'pr': '/workspace/t-batch4/wt', 'base': '/workspace/t-batch3/wt'}
WEB = {'pr': 6940, 'base': 6941, 'old': 6942}; HOOD = 6943; PX = 6944; PX2 = 6945
CL, SV = sys.argv[1], sys.argv[2]; OUTF = sys.argv[3] if len(sys.argv) > 3 else f'/workspace/t-batch4/hb-{CL}-{SV}.json'
SH = os.environ.get('SH', '/workspace/t-batch4/shots/'); os.makedirs(SH, exist_ok=True)
rows = []
def rec(scn, ok, notes=''):
    r = ok if isinstance(ok, str) else ('PASS' if ok else 'FAIL')
    rows.append((scn, r, str(notes))); print(r, scn, notes, flush=True); json.dump(rows, open(OUTF, 'w'), indent=1)

class Proxy:
    """TCP proxy. mode: normal | refuse. Per-connection freeze: 'both' (silent, half-open), 'up' (client->server held), 'down' (server->client held)."""
    def __init__(s, lport, rport): s.lport, s.rport = lport, rport; s.mode = 'normal'; s.pairs = {}; s.last_up = {}
    async def start(s): s.srv = await asyncio.start_server(s.handle, '127.0.0.1', s.lport)
    def freeze(s, how):
        for k in s.pairs: s.pairs[k] = how
    def kill_all(s):
        for (a, b) in list(s.pairs):
            for w in (a, b):
                try: w.transport.abort()
                except Exception: pass
        s.pairs.clear()
    async def pump(s, key, r, w, up):
        q = asyncio.Queue()
        async def writer():
            while True:
                data = await q.get()
                if data is None: break
                while s.pairs.get(key) in ('both', 'up' if up else 'down'): await asyncio.sleep(0.05)
                if key not in s.pairs: break
                try:
                    w.write(data); await w.drain()
                    if up: s.last_up[key] = time.monotonic()
                except Exception: break
        wt = asyncio.create_task(writer())
        try:
            while True:
                d = await r.read(65536)
                if not d: break
                await q.put(d)
        except Exception: pass
        # a frozen pair stays half-open: do not pass the close on
        while s.pairs.get(key) in ('both', 'up' if up else 'down'): await asyncio.sleep(0.05)
        await q.put(None); await wt
        try: w.close()
        except Exception: pass
    async def handle(s, cr, cw):
        if s.mode == 'refuse': cw.transport.abort(); return
        try: sr, sw = await asyncio.open_connection('127.0.0.1', s.rport)
        except Exception: cw.close(); return
        key = (cw, sw); s.pairs[key] = None
        await asyncio.gather(s.pump(key, cr, sw, True), s.pump(key, sr, cw, False))
        s.pairs.pop(key, None)

procs = []
def start_servers():
    data = tempfile.mkdtemp()
    for name, d in DISTS.items():
        root = tempfile.mkdtemp(); os.symlink(d, root + '/kids-house-game')
        procs.append(subprocess.Popen(['python3', '-m', 'http.server', str(WEB[name]), '--bind', '127.0.0.1'], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL))
    env = dict(os.environ, PORT=str(HOOD), HOOD_DATA=data)
    procs.append(subprocess.Popen([TREES[SV] + '/node_modules/.bin/tsx', 'server/node.ts'], cwd=TREES[SV], env=env, stdout=open(data + '.log', 'w'), stderr=subprocess.STDOUT, start_new_session=True))
    time.sleep(4)
def stop_servers():
    for p in procs:
        try: os.killpg(p.pid, signal.SIGTERM) if p.args[0].endswith('tsx') else p.terminate()
        except Exception: pass
    for p in procs:
        try: p.wait(5)
        except Exception: p.kill()
    out = subprocess.run(['ss', '-ltnpH', f'sport = :{HOOD}'], capture_output=True, text=True).stdout
    import re
    for pid in set(re.findall(r'pid=(\d+)', out)): os.kill(int(pid), signal.SIGTERM)

def url(cl, port): return f'http://localhost:{WEB[cl]}/kids-house-game/?hood=http://localhost:{port}'
VX = "([h,id]) => __hood().view(h)?.rooms.living.items.find(i=>i.id===id)?.x ?? null"
REC = """() => { window.__rx = []; const h = __hood(); const hook = () => h.ws && h.ws.addEventListener('message', ev => window.__rx.push(ev.data));
  hook(); h.on('welcome', hook); window.__bub = []; h.on('bubble', (pid, b) => window.__bub.push(b && b.v)); }"""
async def setup(p, a_cl, a_via_proxy, b_browser='webkit', third=None):
    cb = await p.chromium.launch(); wb = await p.webkit.launch(); errs = {}
    async def mk(br, name, cl, port):
        c = await br.new_context(viewport={'width': 1180, 'height': 820}); await c.add_init_script(SKIP_WN)
        pg = await c.new_page(); errs[name] = []
        pg.on('pageerror', lambda e: errs[name].append(str(e)[:200]))
        await pg.goto(url(cl, port)); await pg.wait_for_timeout(700); return pg
    B = await mk(wb if b_browser == 'webkit' else cb, 'B', 'pr', HOOD)   # friend: always the PR client, direct
    A = await mk(cb, 'A', a_cl, PX if a_via_proxy else HOOD)
    await tap(B, '#btnHood'); await B.click('[data-m="create"]'); await adult(B)
    await B.wait_for_selector('#newCode'); await B.click('[data-m="setup"]'); await B.wait_for_selector('#pCode')
    for n in ('Reagan', 'Chloe', 'Sloane'): await B.click(f'.sugg button:has-text("{n}")'); await B.wait_for_timeout(200)
    code = (await B.inner_text('#pCode')).strip(); await B.click('.hoodSheet [data-m="close"]')
    await join(B, code, 'Chloe', True); await join(A, code, 'Reagan', True)
    T = None
    if third:
        T = await mk(cb, 'T', third, PX2 if a_via_proxy else HOOD); await join(T, code, 'Sloane', True)
    hid = await A.evaluate("__hood().myHouseId()")
    for pg in (A, B) + ((T,) if T else ()):
        await to_map(pg); await pg.click(f'[data-go="house:{hid}"]'); await pg.wait_for_timeout(1500)
    for pg in (A, B): await pg.evaluate(REC)
    items = await A.evaluate("(h) => __hood().view(h).rooms.living.items.map(i => i.id)", hid)
    return cb, wb, A, B, T, hid, items, errs
ST = "() => __hood().status"
async def wait_status(pg, want, t): return await wait_js(pg, f"() => __hood().status === '{want}'", None, t)
def cnt(rx, pat): return sum(1 for m in rx if pat in m)

async def s_resend(p, px):
    """Silent drop (half-open, up direction held): edits made on the dead socket are re-sent once; a friend's newer edit wins."""
    cb, wb, A, B, _, hid, it, errs = await setup(p, CL, True)
    px.freeze('up'); t0 = time.monotonic()
    await A.evaluate("([h,a,b]) => { __hood().dispatch(h, {type:'item/move', room:'living', id:a, x:555, y:300}); __hood().dispatch(h, {type:'item/move', room:'living', id:b, x:333, y:300}) }", [hid, it[0], it[1]])
    await asyncio.sleep(1)
    await B.evaluate("([h,b]) => __hood().dispatch(h, {type:'item/move', room:'living', id:b, x:700, y:300})", [hid, it[1]])
    off = await wait_js(A, "() => __hood().status !== 'online'", None, 35)
    rec(f'[{CL}/{SV}] silent drop detected (no close event)', off is not None and off < 27, f'left online after {None if off is None else round(off + 1, 1)} s (heartbeat 10 s + two 5 s waits)')
    px.kill_all()  # the old half-open pair dies; new sockets pass
    on = await wait_status(A, 'online', 20); await asyncio.sleep(3)
    xa = [await pg.evaluate(VX, [hid, it[0]]) for pg in (A, B)]; xb = [await pg.evaluate(VX, [hid, it[1]]) for pg in (A, B)]
    rxB = await B.evaluate("window.__rx")
    rec(f'[{CL}/{SV}] edit on dead socket re-sent after reconnect, exactly once', xa == [555, 555] and cnt(rxB, '"x":555') == 1, f'reconnected {on and round(on,1)} s; item A x on A,B={xa}; friend saw x:555 {cnt(rxB, chr(34)+"x"+chr(34)+":555")}x')
    rec(f'[{CL}/{SV}] conflict: friend moved the same item meanwhile -> her newer server copy wins, no stale overwrite', xb == [700, 700] and cnt(rxB, '"x":333') == 0, f'item B x on A,B={xb}; stale x:333 reached friend {cnt(rxB, chr(34)+"x"+chr(34)+":333")}x')
    await A.screenshot(path=SH + f'resend-{CL}-{SV}.png')
    # ack lost: server got the edits, client never heard back
    await B.evaluate("() => window.__rx.length = 0"); px.freeze('down')
    await A.evaluate("([h,a]) => { __hood().dispatch(h, {type:'item/move', room:'living', id:a, x:444, y:300}); __hood().dispatch(h, {type:'item/add', room:'living', item:{id:'qahb1', kind:'plant', x:200, y:300}}) }", [hid, it[2]])
    await wait_js(A, "() => __hood().status !== 'online'", None, 25); px.kill_all(); await wait_status(A, 'online', 20); await asyncio.sleep(3)
    rxB = await B.evaluate("window.__rx"); x4 = [await pg.evaluate(VX, [hid, it[2]]) for pg in (A, B)]
    n1 = [await pg.evaluate("(h) => __hood().view(h).rooms.living.items.filter(i=>i.id==='qahb1').length", hid) for pg in (A, B)]
    rec(f'[{CL}/{SV}] ack lost (edit landed): no double apply after reconnect', x4 == [444, 444] and n1 == [1, 1] and cnt(rxB, '"x":444') == 1 and cnt(rxB, 'qahb1') == 1, f'x on A,B={x4}; qahb1 count A,B={n1}; friend saw move {cnt(rxB, chr(34)+"x"+chr(34)+":444")}x add {cnt(rxB, "qahb1")}x')
    rec(f'[{CL}/{SV}] resend errors', 'INFO' if not any(errs.values()) else 'FAIL', json.dumps(errs)[:400])
    await cb.close(); await wb.close()

async def s_wake(p, px):
    """WebKit-safe wake: the socket died silently, then the page gets 'online' / visibility back. Reconnect within ~4 s."""
    cb, wb, A, B, _, hid, it, errs = await setup(p, CL, True)
    px.freeze('both'); await asyncio.sleep(1)
    await A.evaluate("() => { window.dispatchEvent(new Event('online')) }")
    t0 = time.monotonic(); px_new = asyncio.get_event_loop()
    # new sockets pass (only the old pair is frozen)
    on = await wait_js(A, "() => __hood().status !== 'online'", None, 8)
    back = await wait_status(A, 'online', 8) if on is not None else None
    rec(f'[{CL}/{SV}] wake event after silent drop -> fresh socket', on is not None and back is not None and on < 5, f'dropped after {on and round(on,1)} s, online again {back and round(back,1)} s later')
    px.kill_all(); await cb.close(); await wb.close()

async def s_idle(p, px, third):
    global px2
    """Sleep with wifi off: every socket through the proxy goes silent (half-open at the server) and new sockets are refused.
    (CDP Page.setWebLifecycleState=frozen does not stop timers in headless Chromium, so it cannot model sleep.)
    hb:1 sockets are dropped by the server at 40 s; clients without hb never are. Wake rejoins cleanly."""
    cb, wb, A, B, T, hid, it, errs = await setup(p, CL, True, third=third)
    pids = {'A': await A.evaluate("__hood().pid")}
    if T: pids['T'] = await T.evaluate("__hood().pid")
    lastA = await A.evaluate("() => 1")  # sync
    px.freeze('both'); px.mode = 'refuse'; px2.freeze('both'); px2.mode = 'refuse'
    t0 = time.monotonic(); gone = {}; live = [px.last_up[k] for k in px.pairs if k in px.last_up]; last_up = max(live) if live else t0; nlive = len(px.pairs)
    while time.monotonic() - t0 < 55:
        for k, pid in pids.items():
            if k not in gone and await B.evaluate("(id) => !__hood().players.get(id)?.online", pid): gone[k] = (round(time.monotonic() - t0, 1), round(time.monotonic() - last_up, 1))
        await asyncio.sleep(0.25)
    for k, pid in pids.items():
        exp = (CL == 'pr' if k == 'A' else False) and SV == 'pr'
        who = CL if k == 'A' else third
        if exp: rec(f'[{CL}/{SV}] idle drop: frozen hb:1 client marked away at ~40 s', k in gone and 40 <= gone[k][1] <= 46, f'away {gone.get(k, (None,None))[1]} s after her last byte reached the server ({gone.get(k, (None,None))[0]} s after wifi went silent; 40 s limit + 5 s sweep; {nlive} socket(s) on her proxy)')
        else: rec(f'[{CL}/{SV}] idle drop: frozen {who} client on {SV} server is never dropped', k not in gone, f'away after {gone.get(k)} s (55 s silent)')
    px.mode = 'normal'; px2.mode = 'normal'
    await A.evaluate("() => { document.dispatchEvent(new Event('visibilitychange')); window.dispatchEvent(new PageTransitionEvent('pageshow', {persisted:true})) }")
    back = await wait_js(B, "(id) => __hood().players.get(id)?.online", pids['A'], 15)
    await asyncio.sleep(2.5)
    pidA = await A.evaluate("__hood().pid"); hidA = await A.evaluate("__hood().myHouseId()")
    plist = await B.evaluate("() => [...__hood().players.values()].map(p => p.nickname + ':' + p.online)")
    avs = await B.evaluate("(id) => document.querySelectorAll(`.char.avatar[data-pid=\"${id}\"]`).length", pidA)
    avA = await A.evaluate("() => document.querySelectorAll('.char.avatar.mine').length")
    rec(f'[{CL}/{SV}] wake: clean rejoin (same girl, same house, one avatar)', back is not None and pidA == pids['A'] and hidA == hid and avs == 1 and avA == 1 and sum(1 for x in plist if x.startswith('Reagan')) == 1,
        f'online at friend {back and round(back,1)} s after wake; pid same={pidA == pids["A"]}; house same={hidA == hid}; friend draws her {avs}x; own avatar {avA}x; players={plist}')
    # still editing after wake
    await A.evaluate("([h,a]) => __hood().dispatch(h, {type:'item/move', room:'living', id:a, x:612, y:300})", [hid, it[0]]); await asyncio.sleep(2)
    rec(f'[{CL}/{SV}] edit after wake reaches friend', await B.evaluate(VX, [hid, it[0]]) == 612, '')
    await B.screenshot(path=SH + f'rejoin-friend-{CL}-{SV}.png')
    rec(f'[{CL}/{SV}] idle/wake errors', 'INFO' if not any(errs.values()) else 'FAIL', json.dumps(errs)[:400])
    await cb.close(); await wb.close()

async def s_chat(p, px):
    """MP-7: a line said while offline is dropped once it is 10 s old; a fresh one still goes."""
    cb, wb, A, B, _, hid, it, errs = await setup(p, CL, True)
    px.mode = 'refuse'; px.kill_all()
    await wait_js(A, "() => __hood().status !== 'online'", None, 8)
    await A.evaluate("() => __hood().say({kind:'text', v:'STALE1'})"); await asyncio.sleep(11.5)
    await A.evaluate("() => __hood().say({kind:'text', v:'FRESH1'})"); px.mode = 'normal'
    await A.evaluate("() => window.dispatchEvent(new Event('online'))")
    await wait_status(A, 'online', 30); await asyncio.sleep(2.5)
    bub = await B.evaluate("window.__bub")
    rec(f'[{CL}/{SV}] offline chat: 11 s old line dropped, fresh line delivered', 'FRESH1' in bub and 'STALE1' not in bub, f'friend saw {bub}')
    await cb.close(); await wb.close()

async def s_compat(p, px):
    """Two-way edit, chat and mail between this client and a PR client on this server."""
    cb, wb, A, B, _, hid, it, errs = await setup(p, CL, False)
    await A.evaluate("([h,a]) => __hood().dispatch(h, {type:'item/move', room:'living', id:a, x:250, y:300})", [hid, it[0]]); await asyncio.sleep(2)
    await B.evaluate("([h,a]) => __hood().dispatch(h, {type:'item/move', room:'living', id:a, x:640, y:300})", [hid, it[1]]); await asyncio.sleep(2)
    e = [await pg.evaluate(VX, [hid, it[0]]) for pg in (A, B)] + [await pg.evaluate(VX, [hid, it[1]]) for pg in (A, B)]
    rec(f'[{CL}/{SV}] compat: two-way edit', e == [250, 250, 640, 640], str(e))
    await A.evaluate("() => __hood().say({kind:'text', v:'HI FROM A'})"); await B.evaluate("() => __hood().say({kind:'text', v:'HI FROM B'})"); await asyncio.sleep(2)
    ba, bb = await A.evaluate("window.__bub"), await B.evaluate("window.__bub")
    rec(f'[{CL}/{SV}] compat: two-way chat', 'HI FROM B' in ba and 'HI FROM A' in bb, f'A heard {ba}; B heard {bb}')
    hB = await B.evaluate("__hood().myHouseId()")
    await A.evaluate("(h) => __hood().sendMail(h, 'from A', 0, 0)", hB); await B.evaluate("(h) => __hood().sendMail(h, 'from B', 0, 0)", hid); await asyncio.sleep(2.5)
    ma = await A.evaluate("(h) => (__hood().view(h)?.mailbox?.letters||[]).map(l=>l.text)", hid)
    await to_map(B); await B.click(f'[data-go="house:{hB}"]'); await B.wait_for_timeout(1500)
    mb = await B.evaluate("(h) => (__hood().view(h)?.mailbox?.letters||[]).map(l=>l.text)", hB)
    rec(f'[{CL}/{SV}] compat: two-way mail', 'from B' in ma and 'from A' in mb, f'A mailbox {ma}; B mailbox {mb}')
    rx = await A.evaluate("window.__rx"); pings = await A.evaluate("() => 0")
    rec(f'[{CL}/{SV}] compat: page errors', not any(errs.values()), json.dumps(errs)[:400])
    await cb.close(); await wb.close()

async def s_safety(p, px):
    """App Builder review fixes. (a) A slow-but-alive socket (one pong late >5 s, e.g. a frozen main thread) is not dropped: two misses needed.
    (b) An add whose ack was lost is not re-sent (a friend may have deleted it). (c) A pet move whose ack was lost does not overwrite a friend's newer move."""
    cb, wb, A, B, _, hid, it, errs = await setup(p, CL, True)
    speaks = await A.evaluate("() => !!__hood().speaksHb")
    if speaks:
        await wait_js(A, "() => !__hood().hbWaitT", None, 12)
        ws0 = await A.evaluate("() => (window.__ws0 = __hood().ws, 1)")
        px.freeze('down'); await A.evaluate("() => __hood().probe(5000)")
        await asyncio.sleep(7); px.freeze(None); await asyncio.sleep(8)
        same = await A.evaluate("() => __hood().ws === window.__ws0 && __hood().status === 'online'")
        rec(f'[{CL}/{SV}] one late pong (7 s) does not drop a live socket (2-miss rule)', same, f'same socket, still online={same}')
    else: rec(f'[{CL}/{SV}] one late pong (7 s) does not drop a live socket (2-miss rule)', 'n/a', 'no hb on this server')
    px.kill_all(); await wait_status(A, 'online', 20); await asyncio.sleep(1.5)
    # (b) add landed, ack lost, friend deletes it before she reconnects
    px.freeze('down')
    await A.evaluate("(h) => __hood().dispatch(h, {type:'item/add', room:'living', item:{id:'qahbz', kind:'plant', x:210, y:300}})", hid)
    seen = await wait_js(B, "(h) => __hood().view(h)?.rooms.living.items.some(i=>i.id==='qahbz')", hid, 8)
    await B.evaluate("(h) => __hood().dispatch(h, {type:'item/delete', room:'living', id:'qahbz'})", hid); await asyncio.sleep(1.5)
    px.kill_all(); await wait_status(A, 'online', 20); await asyncio.sleep(3)
    n = [await pg.evaluate("(h) => __hood().view(h).rooms.living.items.filter(i=>i.id==='qahbz').length", hid) for pg in (A, B)]
    rec(f'[{CL}/{SV}] ack-lost item/add is not re-sent after a friend deleted it', seen is not None and n == [0, 0], f'friend saw add={seen is not None}; count after reconnect A,B={n}')
    # (c) cat: only the owner may move her cat (server nacks friends), so the competing writer is her own other tab/device.
    # Model it at the carry step: her cat/move went out on a socket that died (sent, unacked); the server copy she gets back
    # on reconnect has the cat somewhere else (moved by her other device). Her stale move must be let go.
    await A.evaluate("(h) => __hood().dispatch(h, {type:'cat/set', cat:{name:'Mittens', coat:0, room:'living', x:400}})", hid); await asyncio.sleep(1.5)
    px.freeze('up')
    await A.evaluate("(h) => __hood().dispatch(h, {type:'cat/move', room:'living', x:300})", hid); await asyncio.sleep(0.5)
    kept = await A.evaluate("""(h) => { const c = __hood(), r = c.houses.get(h); const conf = r.confirmed;
      const moved = { ...conf, cat: { ...conf.cat, x: 700 } }; const before = { ...c.resent };
      const out = c.carry(moved, r.pending.filter(p => p.sent)).filter(p => p.action.type === 'cat/move').length;
      const same = c.carry(conf, r.pending.filter(p => p.sent)).filter(p => p.action.type === 'cat/move').length;
      c.resent = before; return [out, same, r.pending.filter(p => p.sent).length]; }""", hid)
    rec(f'[{CL}/{SV}] ack-lost cat/move is not re-sent when the server cat moved meanwhile (kept only if unchanged)', kept[0] == 0 and kept[1] == 1, f'kept when moved={kept[0]}, kept when unchanged={kept[1]}, sent-unacked={kept[2]}')
    px.kill_all(); await wait_status(A, 'online', 20); await asyncio.sleep(3)
    # (d) an unacked cat move whose target did not change is still delivered
    px.freeze('up')
    await A.evaluate("(h) => __hood().dispatch(h, {type:'cat/move', room:'living', x:520})", hid); await asyncio.sleep(1)
    px.kill_all(); await wait_status(A, 'online', 20); await asyncio.sleep(3)
    cx = [await pg.evaluate("(h) => __hood().view(h)?.cat?.x ?? null", hid) for pg in (A, B)]
    rec(f'[{CL}/{SV}] cat/move sent into a dead socket (target unchanged) is still delivered', cx == [520, 520], f'cat x A,B={cx}')
    rec(f'[{CL}/{SV}] safety errors', 'INFO' if not any(errs.values()) else 'FAIL', json.dumps(errs)[:400])
    await cb.close(); await wb.close()

async def main():
    start_servers(); px = Proxy(PX, HOOD); await px.start()
    global px2; px2 = Proxy(PX2, HOOD); await px2.start()
    which = os.environ.get('ONLY', 'resend,wake,idle,chat,compat,safety').split(',')
    try:
        async with async_playwright() as p:
            for name, fn in (('compat', lambda: s_compat(p, px)), ('resend', lambda: s_resend(p, px)), ('wake', lambda: s_wake(p, px)),
                             ('chat', lambda: s_chat(p, px)), ('safety', lambda: s_safety(p, px)), ('idle', lambda: s_idle(p, px, 'old' if CL != 'old' else None))):
                if name not in which: continue
                px.mode = 'normal'; px.kill_all()
                try: await fn()
                except Exception as e:
                    import traceback; rec(f'[{CL}/{SV}] {name} crashed', 'ERR', traceback.format_exc()[-500:])
    finally: stop_servers()
if __name__ == '__main__': asyncio.run(main())
