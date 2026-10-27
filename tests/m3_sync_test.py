# M3 social sync QA, LOCAL servers only: two new iPads (one with reduced motion) + an un-updated 10ef736 iPad in one house.
# Reactions are worked out locally from synced positions + the wall clock, so every new client must agree on who
# reacts to whom, and nothing new may go over the wire.
# usage: WEB=http://localhost:5650 OLDWEB=http://localhost:5651 HOOD=http://localhost:5658 python tests/m3_sync_test.py
import asyncio, os, sys, json, random
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5650').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', 'http://localhost:5651').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5658').rstrip('/')
assert 'workers.dev' not in HOOD, 'local server only'
SHOT = os.environ.get('M3_SHOTS', 'shots/m3/'); os.makedirs(SHOT, exist_ok=True)
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)

SPY_T = """(() => { window.__sent = []; const o = WebSocket.prototype.send;
  WebSocket.prototype.send = function (d) { if (!this.url.includes(__HOODHOST__)) return o.call(this, d); try { window.__sent.push(JSON.parse(d)); } catch { window.__sent.push({raw: String(d)}); } return o.call(this, d); };
  window.__osc = 0; for (const C of [window.AudioContext, window.webkitAudioContext]) if (C) { const f = C.prototype.createOscillator; C.prototype.createOscillator = function () { window.__osc++; return f.call(this); }; } })()"""
SPY = None
# Deterministic part of what a client shows: doll social/ambient classes (the 1.8s arrival greet is local and left out),
# where the pets stand (room px), and whether the baby coos.
SNAP = """() => { const L = document.querySelector('#stage .layer') || document.querySelector('.layer'); if (!L) return null;
  const k = L.offsetWidth / 2400 || 1; const d = {};
  L.querySelectorAll('.char').forEach(e => { const id = e.dataset.id || e.dataset.cid; if (!id || !id.startsWith('q')) return;
    const c = [...e.classList].filter(c => /^(soc-(hop|heart|duet|baby|l|r)|amb-[a-z]+)$/.test(c) && c !== 'amb-l' && c !== 'amb-r');
    d[id] = e.dataset.soc && e.dataset.soc.startsWith('soc-wave') ? 'greet' : c.sort().join(' '); });
  const p = {}; L.querySelectorAll(':scope > .pet').forEach(e => { if (!e.classList.contains('kenneled')) p[e.classList.contains('pet-cat') ? 'cat' : (e.dataset.dog || '?')] = e.classList.contains('soc-snug') ? 'snug@' + Math.round(((e.offsetLeft + e.offsetWidth / 2) + parseFloat(e.dataset.socDx || '0')) / k / 60) : 'free'; }); // where she settles (who she goes to), not her mid-walk offset: her wander is clock-driven
  const b = L.querySelector(':scope > .baby'); return {d, p, coo: b ? b.classList.contains('soc-coo') : null}; }"""
POS = "() => Object.fromEntries(__store.get().characters.filter(c => c.id.startsWith('q')).map(c => [c.id, [Math.round(c.x), Math.round(c.y)]]))"
def same(a, b):
    """Greets are local; compare everything else."""
    if a is None or b is None: return False
    if a['p'] != b['p'] or (a['coo'] is not None and b['coo'] is not None and a['coo'] != b['coo']): return False
    for k in set(a['d']) | set(b['d']):
        x, y = a['d'].get(k, ''), b['d'].get(k, '')
        if 'greet' in (x, y): continue
        if x != y: return False
    return True

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)

async def agree(pages, secs, label, need=None):
    """Sample every client 4x a second. Clients tick on their own 1s heartbeat, so a short split at a boundary is fine;
    a split that lasts longer than 1.5s is a real disagreement."""
    run, worst, samples, seen = 0, 0, 0, set()
    for _ in range(int(secs * 4)):
        snaps = await asyncio.gather(*[pg.evaluate(SNAP) for pg in pages])
        ok = all(same(snaps[0], s) for s in snaps[1:]); samples += 1
        for v in snaps[0]['d'].values():
            for c in v.split(): seen.add(c)
        if snaps[0]['p'] and any(snaps[0]['p'].values()): seen.add('pet-moved')
        run = 0 if ok else run + 1; worst = max(worst, run)
        if not ok and run == 7: print('  split', label, json.dumps(snaps), flush=True)
        await asyncio.sleep(0.25)
    check(f'{label}: all new clients agree (longest split {worst * 250}ms)', worst <= 6)
    if need: check(f'{label}: shows {need}', all(n in seen for n in need), sorted(seen))
    return seen

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk(web, rm=False):
            c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True, reduced_motion='reduce' if rm else 'no-preference')
            await c.add_init_script(SKIP_WN); await c.add_init_script(SPY_T.replace('__HOODHOST__', json.dumps(HOOD.split('//')[1]))); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}'); await pg.wait_for_timeout(800)
            return c, pg, errs
        (cA, A, eA), (cB, B, eB), (cO, O, eO) = await mk(WEB), await mk(WEB, rm=True), await mk(OLDWEB)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True); await join(B, code, 1, False); await join(O, code, 2, False)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(800)
        hid = await A.evaluate("__hood().myHouseId()")
        for pg in (B, O):
            await pg.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await pg.wait_for_timeout(900)
        check("all three iPads are in A's house", all([(await pg.evaluate("__ui()"))['currentHouseId'] == hid for pg in (A, B, O)]))
        await A.evaluate("""() => { const s = __store, room = 'living';
          if (s.get().currentRoom !== room) s.dispatch({type:'room/switch', room});
          s.dispatch({type:'item/add', room, item:{id:'q-st', kind:'pack:cute-speaker', x:1700, y:560, flip:false, z:50, scale:1}});
          s.dispatch({type:'item/add', room, item:{id:'q-bed', kind:'bed', x:600, y:640, flip:false, z:45, scale:1}});
          s.dispatch({type:'item/add', room, item:{id:'q-pi', kind:'pack:piano', x:2150, y:560, flip:false, z:46, scale:1}});
          const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
          [['q1', 420, 640], ['q2', 540, 640], ['q3', 1200, 640], ['q4', 1300, 640]].forEach(([id, x, y], i) => s.dispatch({type:'char/add', char:{...base, id, x, y, hairStyle:i}}));
          s.dispatch({type:'cat/set', cat:{name:'Mimi', coat:1, room, x:900}}); }""")
        for pg in (A, B, O):
            await pg.evaluate("() => { const s = __store; if (s.get().currentRoom !== 'living') s.dispatch({type:'room/switch', room:'living'}); }")
            await pg.click('#modePlay'); await pg.evaluate('__cam.set(150)')
        await A.wait_for_timeout(2500)
        posA, posO = await A.evaluate(POS), await O.evaluate(POS)
        check('old 10ef736 client sees the same dolls in the same spots', posA == posO and len(posA) == 4, f'{posA} {posO}')
        for pg in (A, B, O): await pg.evaluate("window.__sent.length = 0")
        new = [A, B]
        await agree(new, 14, 'two friends standing close', need=['soc-l', 'soc-r'])
        await A.screenshot(path=f'{SHOT}sync-friends-A-820x1180.png'); await B.screenshot(path=f'{SHOT}sync-friends-B-reduced-820x1180.png')
        # passive reactions put nothing on the wire beyond what the old client also sends
        def kinds(lst): return sorted({(m.get('t'), m.get('action', {}).get('type') if isinstance(m.get('action'), dict) else None) for m in lst})
        sA, sO = await A.evaluate("window.__sent"), await O.evaluate("window.__sent")
        check("reactions alone send nothing new (types ⊆ old client's)", set(kinds(sA)) <= set(kinds(sO)) | {('pres', None)}, f'{kinds(sA)} vs old {kinds(sO)} {json.dumps(sA)[:400]}')
        presA = sorted({k for m in sA if m.get('t') == 'pres' for k in (m.get('p') or {})}); presO = sorted({k for m in sO if m.get('t') == 'pres' for k in (m.get('p') or {})})
        check('presence carries the same fields as 10ef736', not presA or not presO or presA == presO, f'{presA} {presO}')
        blob = json.dumps(sA + await B.evaluate("window.__sent"))
        check('no social/ambient words in any message', not any(w in blob for w in ('soc-', 'keysPlaying', '"stir"', '"greet"')))
        # a friend walks up mid-reaction (moved by the visitor), then the first one leaves
        await B.evaluate("__store.dispatch({type:'char/move', id:'q3', room:'living', x:480, y:700})")
        await A.wait_for_timeout(600)
        g = await A.evaluate("() => [...document.querySelectorAll('.char.soc-wave')].length")
        check('arrival: a wave/head-turn plays on A when q3 walks up', g >= 1, g)
        await A.screenshot(path=f'{SHOT}sync-arrival-wave-820x1180.png')
        await A.wait_for_timeout(2000); await agree(new, 8, 'friend entered mid-reaction')
        await A.evaluate("__store.dispatch({type:'char/move', id:'q1', room:'living', x:2000, y:640})"); await A.wait_for_timeout(2200)
        await agree(new, 6, 'friend left mid-reaction')
        # quick position changes from all three iPads, including the old one
        rnd = random.Random(7)
        for i in range(12):
            pg = (A, B, O)[i % 3]; cid = ['q2', 'q3', 'q4'][rnd.randrange(3)]
            await pg.evaluate("([id, x]) => __store.dispatch({type:'char/move', id, room:'living', x, y:640})", [cid, rnd.randrange(350, 900)])
            await asyncio.sleep(0.15)
        await A.wait_for_timeout(2500)
        pa, pb, po = await A.evaluate(POS), await B.evaluate(POS), await O.evaluate(POS)
        check('rapid moves: all three stores settle to the same positions', pa == pb == po, f'{pa} {pb} {po}')
        await agree(new, 8, 'after rapid moves')
        # drag a doll away mid-reaction with a real pointer drag on A
        await A.evaluate("__store.dispatch({type:'char/move', id:'q2', room:'living', x:520, y:640}); __store.dispatch({type:'char/move', id:'q3', room:'living', x:640, y:640})")
        await A.wait_for_timeout(2500)
        el = A.locator('.char[data-cid="q2"]'); bb = await el.bounding_box()
        await A.mouse.move(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] * 0.4); await A.mouse.down()
        await A.mouse.move(bb['x'] + bb['width'] / 2 + 40, bb['y'] + bb['height'] * 0.4 - 60, steps=6); await A.wait_for_timeout(1400)
        held = await A.evaluate("() => { const e = document.querySelector('.char[data-cid=\"q2\"]'); return [e.classList.contains('lifted'), [...e.classList].filter(c => /^soc-|^amb-/.test(c))]; }")
        check('a doll held mid-reaction stops reacting on A', held[0] and held[1] == [], held)
        await A.mouse.move(bb['x'] + 600, bb['y'] + bb['height'] * 0.4, steps=10); await A.mouse.up(); await A.wait_for_timeout(2500)
        sq = await asyncio.gather(*[pg.evaluate(SNAP) for pg in new])
        check('dropped far away: no pair reactions left for her on either', all(not s['d'].get('q2', '').startswith('soc-hop') and 'soc-heart' not in s['d'].get('q2', '') for s in sq), sq)
        await agree(new, 6, 'after drag-away')
        # stereo on: friends near it dance a duet
        await A.evaluate("""() => { const s = __store; s.dispatch({type:'char/move', id:'q3', room:'living', x:1640, y:640}); s.dispatch({type:'char/move', id:'q4', room:'living', x:1780, y:640});
          s.dispatch({type:'item/power', room:'living', id:'q-st', on:true}); }""")
        for pg in (A, B): await pg.evaluate('__cam.set(1250)')
        await A.wait_for_timeout(2500)
        await agree(new, 10, 'duet at the stereo', need=['amb-dance'])
        await A.screenshot(path=f'{SHOT}sync-duet-A-820x1180.png')
        # a doll lies down on the bed: the cat trots over on both
        for pg in (A, B): await pg.evaluate('__cam.set(250)')
        await A.evaluate("__store.dispatch({type:'char/move', id:'q2', room:'living', x:600, y:640, seat:{item:'q-bed', pose:'lie', n:0}})")
        await A.wait_for_timeout(2500)
        sn = await A.evaluate(SNAP); lie = await A.evaluate("(__store.get().characters.find(c => c.id === 'q2') || {}).seat")
        check('doll lies on the bed (synced seat)', bool(lie) and lie.get('pose') == 'lie', lie)
        await agree(new, 6, 'cat and a lying doll', need=['pet-moved'])
        # reconnect (short drop) on B and a stale tab (long sleep) in B's context, while A keeps moving dolls
        S = await cB.new_page(); eS = []; S.on('pageerror', lambda e: eS.append(str(e)))
        await S.goto(f'{WEB}/kids-house-game/?hood={HOOD}'); await S.wait_for_timeout(1500)
        await S.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`)?.click()", hid); await S.wait_for_timeout(1200)
        await S.evaluate("() => { const s = __store; if (s.get().currentRoom !== 'living') s.dispatch({type:'room/switch', room:'living'}); }"); await S.click('#modePlay'); await S.evaluate('__cam.set(250)')
        await cB.set_offline(True)
        # Chromium offline emulation leaves open sockets up, so drop B's socket for real as a network loss would
        await B.evaluate("() => { const ws = __hood().ws; if (ws) ws.close(); }")
        await A.evaluate("__store.dispatch({type:'char/move', id:'q4', room:'living', x:700, y:640}); __store.dispatch({type:'char/move', id:'q3', room:'living', x:760, y:640})")
        await A.wait_for_timeout(4000); await cB.set_offline(False)
        # B and S share one sign-in, so by design the hood keeps only one of them live and the other shows the "elsewhere" card
        live = []
        for _ in range(40):
            live = [P for P in (B, S) if await P.evaluate("() => !__hood().replaced && __hood().status === 'online'")]
            if live and all([await P.evaluate(POS) == await A.evaluate(POS) for P in live]): break
            await A.wait_for_timeout(500)
        poss = {n: await P.evaluate(POS) for n, P in (('A', A), ('B', B), ('S', S))}
        check("reconnect: the live screen of B's sign-in catches up to A's positions", bool(live) and all([await P.evaluate(POS) == poss['A'] for P in live]), poss)
        rep = [P for P in (B, S) if P not in live]
        check("stale tab of the same sign-in is parked behind the elsewhere card, not split", all([await P.evaluate("() => __hood().replaced && !document.getElementById('elsewhere').classList.contains('hidden')") for P in rep]), len(rep))
        await A.wait_for_timeout(2200)
        await agree([A] + live, 8, 'after reconnect (A and the live screen)')
        # mute: the piano plays without sound and sends nothing
        await A.evaluate("__store.dispatch({type:'settings/sound', on:false})"); await A.evaluate("window.__sent.length = 0; window.__osc = 0")
        await A.evaluate("__store.dispatch({type:'char/move', id:'q1', room:'living', x:2140, y:620})"); await A.evaluate('__cam.set(1700)'); await A.wait_for_timeout(1200)
        await A.evaluate("""() => { const el = document.querySelector('.item[data-id="q-pi"]'); const r = el.getBoundingClientRect(); const o = {bubbles:true, clientX:r.left + r.width / 2, clientY:r.top + r.height / 2, pointerId:1, isPrimary:true, pointerType:'touch'};
          el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', o)); }""")
        await A.wait_for_timeout(1500)
        playing = await A.evaluate("() => !!document.querySelector('.char[data-cid=\"q1\"].amb-play')")
        sent = await A.evaluate("window.__sent.filter(m => m.t === 'act')"); osc = await A.evaluate("window.__osc")
        check('muted piano: doll plays, no oscillator started', playing and osc == 0, [playing, osc])
        check('piano tap sends no action (local to this iPad)', not [m for m in sent if m.get('action', {}).get('type') != 'char/move'], sent)
        await A.evaluate("__store.dispatch({type:'settings/sound', on:true})")
        # reduced motion on B: classes agree (checked above) but no reaction motion runs
        rm = await B.evaluate("() => document.getAnimations().filter(a => /^soc/.test(a.animationName || '') && a.playState === 'running' && !/Heart/.test(a.animationName)).length")
        check('reduced motion (B): no social motion running', rm == 0, rm)
        check('old client: still no page errors', not eO, eO[:3])
        oldpos = await O.evaluate(POS)
        check('old client stays in step with every move', oldpos == await A.evaluate(POS), oldpos)
        check('no page errors on new clients', not eA and not eB and not eS, (eA + eB + eS)[:3])
        print(f"\n{sum(res.values())}/{len(res)} checks passed", [k for k, v in res.items() if not v]); await b.close()
        sys.exit(0 if all(res.values()) else 1)
asyncio.run(main())
