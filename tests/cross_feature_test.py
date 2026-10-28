# X1 cross-feature QA: party (R1) + reactions (M3) + needs (M2) + costumes + photo booth + trick-or-treat together.
# Three new iPads (A owner, B visitor, C visitor with reduced motion) + one un-updated 10ef736 iPad (O), LOCAL servers only.
# usage: flock /workspace/surprise/gate.lock /workspace/.pwvenv/bin/python tests/cross_feature_test.py
#   env WEB=http://localhost:5960 OLDWEB=http://localhost:5962 HOOD=http://localhost:5961 X_SHOTS=/workspace/t-cross-shots/
import asyncio, os, sys, json, base64
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5960').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', 'http://localhost:5962').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5961').rstrip('/')
assert 'workers.dev' not in HOOD + WEB + OLDWEB, 'local servers only'
SHOT = os.environ.get('X_SHOTS', '/workspace/t-cross-shots/'); os.makedirs(SHOT, exist_ok=True)
SIZES = [(820, 1180), (844, 390), (390, 844)]
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra)[:600] if extra != '' else ''), flush=True)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)
async def visit(pg, hid):
    await pg.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await pg.wait_for_timeout(1000)
    await close_sheet(pg)
async def close_sheet(pg):
    await pg.evaluate("() => { const s = document.getElementById('sheet'); if (s && !s.classList.contains('hidden')) s.querySelector('[data-act=close]')?.click(); }")
    await pg.wait_for_timeout(200)
async def wear(pg, cos):
    await close_sheet(pg); await pg.evaluate("document.getElementById('modeDecorate').click()"); await pg.wait_for_timeout(300)
    await pg.evaluate("document.querySelector('.cat[data-cat=\"__people\"]')?.click()"); await pg.wait_for_timeout(200)
    await pg.click('.thing.person.me')
    await pg.wait_for_selector('#sheet:not(.hidden) .avTabs')
    await pg.click('[data-act="av-tab"][data-v="costume"]')
    await pg.click(f'[data-act="av-costume"][data-v="{cos}"]'); await pg.wait_for_timeout(150)
    await pg.click('.avDone'); await pg.wait_for_timeout(900)
    await pg.click('#modePlay'); await pg.wait_for_timeout(300)
async def dismiss_tips(pg):
    await pg.evaluate("document.querySelectorAll('button').forEach(b => /^OK/.test(b.textContent.trim()) && b.offsetParent && b.click())")

SPY = """(() => { window.__osc = 0; for (const C of [window.AudioContext, window.webkitAudioContext]) if (C) { const f = C.prototype.createOscillator; C.prototype.createOscillator = function () { window.__osc++; return f.apply(this, arguments); }; }
  window.__bursts = 0; window.__glows = 0;
  addEventListener('DOMContentLoaded', () => new MutationObserver(m => m.forEach(r => { r.addedNodes.forEach(n => n.classList && n.classList.contains('need-burst') && window.__bursts++);
    if (r.type === 'attributes' && r.target.classList && r.target.classList.contains('need-glow')) window.__glows++; })).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['class']})); })()"""
D = "(id => (__store.get().characters.find(c => c.id === id) || {}))"
NEEDS = f"id => ({D})(id).needs || null"
POS = "() => Object.fromEntries(__store.get().characters.filter(c => c.id.startsWith('x')).map(c => [c.id, [Math.round(c.x), Math.round(c.y), c.room]]))"
# What each new client shows that must agree: doll social/ambient classes (arrival greet is local), party on, bubbles.
SNAP = """() => { const d = {}; document.querySelectorAll('#layer .char[data-cid^="x"]').forEach(e => {
    const c = [...e.classList].filter(c => /^(soc-(hop|heart|duet|baby|l|r)|amb-[a-z]+)$/.test(c) && c !== 'amb-l' && c !== 'amb-r');
    d[e.dataset.cid] = e.classList.contains('soc-wave') ? 'greet' : c.sort().join(' '); });
  const bub = [...document.querySelectorAll('#layer .char[data-cid^="x"] > .need-bubble.show')].map(b => b.parentElement.dataset.cid + ':' + b.dataset.need).sort();
  return {d, party: document.body.classList.contains('party-on'), bub}; }"""
def same(a, b):
    if a['party'] != b['party']: return False
    for k in set(a['d']) | set(b['d']):
        x, y = a['d'].get(k, ''), b['d'].get(k, '')
        if 'greet' in (x, y): continue
        if x != y: return False
    return True
async def agree(pages, secs, label, need=None):
    run = worst = 0; seen = set(); bubs = set()
    for _ in range(int(secs * 4)):
        snaps = await asyncio.gather(*[pg.evaluate(SNAP) for pg in pages])
        ok = all(same(snaps[0], s) for s in snaps[1:])
        for v in snaps[0]['d'].values(): seen.update(v.split())
        for s in snaps: bubs.add(tuple(s['bub']))
        run = 0 if ok else run + 1; worst = max(worst, run)
        if not ok and run == 7: print('  split', label, json.dumps(snaps)[:800], flush=True)
        await asyncio.sleep(0.25)
    check(f'{label}: all new clients agree (longest split {worst * 250}ms)', worst <= 6)
    if need: check(f'{label}: shows {need}', all(n in seen for n in need), sorted(seen))
    return seen

# Overlap of bubbles / name tags / costume hats, in screen px; fraction of the smaller box that is covered.
OVERLAP = """() => { const R = e => e.getBoundingClientRect(); const box = [];
  document.querySelectorAll('#layer .need-bubble.show .nb-cloud').forEach(e => box.push(['bubble:' + e.closest('.char').dataset.cid, R(e)]));
  document.querySelectorAll('#layer .char .nametag').forEach(e => { const r = R(e); if (r.width && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none') box.push(['tag:' + e.textContent.trim(), r]); });
  document.querySelectorAll('#layer [data-layer=costume-head]').forEach(e => box.push(['hat:' + (e.closest('.char')?.dataset.cid || '?'), R(e)]));
  const out = []; for (let i = 0; i < box.length; i++) for (let j = i + 1; j < box.length; j++) { const [na, a] = box[i], [nb, b] = box[j];
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (w > 0 && h > 0) { const f = w * h / Math.min(a.width * a.height, b.width * b.height); if (f > 0.15) out.push([na, nb, Math.round(f * 100)]); } }
  return {n: box.length, names: box.map(b => b[0]), out}; }"""
RUNNING = """re => document.getAnimations().filter(a => new RegExp(re).test(a.animationName || '') && a.playState === 'running').map(a => a.animationName)"""

async def shots(pg, name, cam=None):
    for (w, h) in SIZES:
        await pg.set_viewport_size({'width': w, 'height': h}); await pg.wait_for_timeout(600); await dismiss_tips(pg)
        if cam is not None: await pg.evaluate(f'__cam.set({cam})')
        await pg.wait_for_timeout(400)
        ov = await pg.evaluate(OVERLAP)
        if ov['out']: print(f'  overlaps {name} {w}x{h}:', ov['out'], flush=True)
        await pg.screenshot(path=f'{SHOT}{name}-{w}x{h}.png')
    await pg.set_viewport_size({'width': 820, 'height': 1180}); await pg.wait_for_timeout(400)

def check_photo(photo):
    from PIL import Image, ImageStat
    im = Image.open(photo).convert('RGB'); W, H = im.size
    sw = next(w for w in range(W, 0, -1) if w + 2 * round(26 * w / 600) == W); k = sw / 600
    pad, foot = round(26 * k), round(64 * k); l, t, r, b = pad, pad, W - pad - 1, H - foot - 1
    plum = lambda p: abs(p[0] - 90) < 14 and abs(p[1] - 61) < 14 and abs(p[2] - 92) < 14
    flush = True
    for (x0, y0, sx, sy) in [(r, t, -1, 1), (r, b, -1, -1), (l, b, 1, -1), (l, t, 1, 1)]:
        ref = im.getpixel((x0 - sx * 4, y0 - sy * 4))
        for i in range(0, 60):
            a = im.getpixel((x0 + sx * i, y0 + sy * i))
            if plum(a) or sum(abs(a[j] - ref[j]) for j in range(3)) > 40 and i > 2 and plum(im.getpixel((x0 + sx * (i + 2), y0 + sy * (i + 2)))): break
            if sum(abs(a[j] - ref[j]) for j in range(3)) > 40: flush = False; break
    st = ImageStat.Stat(im.crop((l, t, r + 1, b + 1)))
    return flush, sum(st.stddev) / 3, (W, H)

async def main():
    async with async_playwright() as p:
        br = await p.webkit.launch()
        async def mk(web, rm=False, q='&needsqa=1&halloween=1'):
            c = await br.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True, reduced_motion='reduce' if rm else 'no-preference')
            await c.add_init_script(SKIP_WN); await c.add_init_script(SPY); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}{q}'); await pg.wait_for_timeout(900)
            return c, pg, errs
        (cA, A, eA), (cB, B, eB), (cC, C, eC) = await mk(WEB), await mk(WEB), await mk(WEB, rm=True)
        cO, O, eO = await mk(OLDWEB, q='&halloween=1')
        # The old iPad has its own save with a doll before it ever joins.
        await O.evaluate("""() => { __store.dispatch({type:'char/add', char:{skin:'#c98e64', hair:'#2b1d14', hairStyle:2, shirt:'#ffd166', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, id:'old-own', room:'living', x:500, y:560}}); }""")
        await O.wait_for_timeout(600)
        # Living room: record player (party), teddy far away (a toy, for playful), a bed; four dolls dancing distance.
        await A.evaluate("""() => { const s = __store, room = 'living';
          s.dispatch({type:'room/switch', room});
          s.dispatch({type:'item/add', room, item:{id:'x-rp', kind:'pack:cc-record-player', x:440, y:560, flip:false, z:40, scale:1}});
          s.dispatch({type:'item/add', room, item:{id:'x-ted', kind:'teddy', x:1500, y:560, flip:false, z:41, scale:1}});
          s.dispatch({type:'item/add', room, item:{id:'x-bed', kind:'bed', x:1000, y:600, flip:false, z:42, scale:1}});
          const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
          [['x1', 300, 545], ['x2', 560, 550], ['x3', 390, 520], ['x4', 470, 530]].forEach(([id, x, y], i) => s.dispatch({type:'char/add', char:{...base, id, x, y, hairStyle:i, shirt:['#ff7eb3','#7ec8ff','#b48cff','#8ee08e'][i]}})); }""")
        await A.wait_for_timeout(600)
        # Drift happens solo, before she brings her house (the server lets only one drift step through per window).
        await A.evaluate("() => { const lo = id => Object.values(((__store.get().characters.find(c => c.id === id) || {}).needs) || {}).some(v => v <= 1); for (let i = 0; i < 120 && !['x1','x2','x3','x4'].every(lo); i++) __needs.tick(4 * 60000); }")
        nd = {i: await A.evaluate(NEEDS, i) for i in ('x1', 'x2', 'x3', 'x4')}
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True); await join(B, code, 1, False); await join(C, code, 3, False); await join(O, code, 2, True)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(900); await close_sheet(A)
        hid = await A.evaluate("__hood().myHouseId()"); hO = await O.evaluate("__hood().myHouseId()")
        check('server speaks needs:1 to the new owner', await A.evaluate("__hood().speaksNeeds") is True)
        for pg in (B, C, O): await visit(pg, hid)
        nd2 = {i: await A.evaluate(NEEDS, i) for i in ('x1', 'x2', 'x3', 'x4')}
        check('setup: every doll has a wish, kept when she brings her house', all(nd2.values()) and nd2 == nd, (nd, nd2))
        check("all four iPads are in A's house", all([(await pg.evaluate("__ui()"))['currentHouseId'] == hid for pg in (A, B, C, O)]))
        for pg in (A, B, C, O):
            await pg.evaluate("() => { if (__store.get().currentRoom !== 'living') __store.dispatch({type:'room/switch', room:'living'}); }")
            await pg.click('#modePlay'); await pg.evaluate('__cam.set(100)')
        await A.wait_for_timeout(1500)
        # ---- (1) Dance Party while reactions play ----
        await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'x-rp', on:true})"); await A.wait_for_timeout(1800)
        check('(1) party lights on every new iPad', all([await pg.evaluate("document.body.classList.contains('party-on')") for pg in (A, B, C)]))
        seen = await agree([A, B, C], 12, '(1) party + reactions', need=['amb-dance'])
        check('(1) dolls also react to each other (soc-l/r/duet/hop/heart seen)', any(c.startswith('soc-') for c in seen), sorted(seen))
        bubs = await A.evaluate("() => [...document.querySelectorAll('#layer .need-bubble.show')].length")
        check('(1) wish bubbles still show over dancing dolls', bubs >= 1, bubs)
        check('(1) no page errors so far', not (eA or eB or eC or eO), (eA + eB + eC + eO)[:3])
        await shots(A, 'x1-party-reactions', 100); await shots(C, 'x1-party-reactions-C-reduced', 100)
        # ---- (2) Costumed avatars + need bubbles + glow/burst + reactions ----
        await wear(A, 'witch'); await wear(B, 'helper-yellow')
        cosA = await A.evaluate("document.querySelector('#layer .char.avatar.mine .inner svg')?.getAttribute('data-costume')")
        cosB_onA = await A.evaluate("[...document.querySelectorAll('#layer .char.avatar:not(.mine) .inner svg')].map(s => s.getAttribute('data-costume') || '')")
        check('(2) A wears witch, A sees B as Yellow Helper', cosA == 'witch' and 'helper-yellow' in cosB_onA, (cosA, cosB_onA))
        for pg in (A, B, C): await pg.evaluate('__cam.set(100)')
        await A.wait_for_timeout(800)
        ov = await A.evaluate(OVERLAP)
        bad = [o for o in ov['out'] if (o[0].startswith('tag') or o[1].startswith('tag')) and o[2] >= 50]
        check('(2) name tags are not badly hidden by bubbles/hats (<50% covered)', not bad, ov)
        bb = [o for o in ov['out'] if o[0].startswith('bubble') and o[1].startswith('bubble') and o[2] >= 50]
        check('(2) wish bubbles do not mostly cover each other (<50%)', not bb, bb)
        await shots(A, 'x2-costumes-bubbles', 100); await shots(B, 'x2-costumes-bubbles-B', 100)
        # ---- (7) visitor B cares for A's doll (playful at the teddy) while the party plays ----
        pick = await A.evaluate("() => ['x1','x2','x3','x4'].find(id => ((__store.get().characters.find(c => c.id === id) || {}).needs || {}).playful <= 2)")
        if not pick:
            await A.evaluate("() => { for (let i = 0; i < 40 && !(((__store.get().characters.find(c => c.id === 'x2') || {}).needs || {}).playful <= 2); i++) __needs.tick(4 * 60000); }")
            pick = 'x2'
        before = await A.evaluate(NEEDS, pick)
        for pg in (A, B, C): await pg.evaluate("() => { window.__bursts = 0; window.__glows = 0; }")
        await B.evaluate("id => __store.dispatch({type:'char/move', id, room:'living', x:1440, y:560})", pick)
        for pg in (A, B, C): await pg.evaluate('__cam.set(1050)')
        await B.wait_for_timeout(350); await B.screenshot(path=f'{SHOT}x7-care-burst-B-820x1180.png')
        await B.wait_for_timeout(1500)
        after = await A.evaluate(NEEDS, pick); afterB = await B.evaluate(NEEDS, pick)
        check(f"(7) visitor B plays with A's doll {pick} at the teddy: playful met on A and B", 'playful' not in (after or {}) and after == afterB, f'{before} -> {after} / B {afterB}')
        check('(7) party keeps playing on every iPad', all([await pg.evaluate("document.body.classList.contains('party-on')") for pg in (A, B, C)]))
        bA, bB, gC, bC = await A.evaluate("window.__bursts"), await B.evaluate("window.__bursts"), await C.evaluate("window.__glows"), await C.evaluate("window.__bursts")
        check('(7) care burst on A and B; reduced-motion C gets a glow and no flying burst', bA >= 1 and bB >= 1 and gC >= 1 and bC == 0, (bA, bB, gC, bC))
        await shots(A, 'x7-visitor-care-party', 1050)
        for pg in (A, B, C): await pg.evaluate('__cam.set(100)')
        # ---- (3) Photo Booth with bubble + party lights + reaction ----
        await A.wait_for_timeout(1200)
        state = await A.evaluate("() => ({bub: document.querySelectorAll('#layer .need-bubble.show').length, party: document.body.classList.contains('party-on'), soc: document.querySelectorAll('#layer .char[class*=soc-], #layer .char.amb-dance').length})")
        check('(3) before the photo: a bubble, party lights and a reaction/dance are visible', state['bub'] >= 1 and state['party'] and state['soc'] >= 1, state)
        for (w, h) in SIZES:
            await A.set_viewport_size({'width': w, 'height': h}); await A.wait_for_timeout(700); await dismiss_tips(A); await A.evaluate('__cam.set(100)'); await A.wait_for_timeout(400)
            reqs = []; A.on('request', lambda r: reqs.append((r.method, r.url)))
            await A.click('#btnMenu'); await A.wait_for_timeout(200); await A.click('#btnPhoto')
            await A.wait_for_selector('.pbCard img', timeout=15000); await A.wait_for_timeout(400)
            data = await A.evaluate("async () => { const r = await fetch(document.querySelector('.pbImg').src); const b = await r.blob(); return await new Promise(res => { const f = new FileReader(); f.onload = () => res(f.result); f.readAsDataURL(b); }); }")
            fn = f'{SHOT}x3-photo-{w}x{h}.png'; open(fn, 'wb').write(base64.b64decode(data.split(',')[1]))
            await A.screenshot(path=f'{SHOT}x3-photo-card-{w}x{h}.png')
            flush, sd, size = check_photo(fn)
            await A.click('.pbClose'); await A.wait_for_timeout(300)
            off = [r for r in reqs if (r[0] != 'GET' or not (r[1].startswith(WEB) or r[1].startswith(HOOD.replace('http', 'ws')) or r[1].startswith(HOOD))) and not r[1].startswith(('blob:', 'data:'))]
            check(f'(3) photo {w}x{h}: not blank, flush frame, no off-box requests', sd > 12 and flush and not off, dict(sd=round(sd, 1), flush=flush, size=size, off=off[:3]))
        await A.set_viewport_size({'width': 820, 'height': 1180})
        # ---- (5) mute and reduced motion ----
        await A.evaluate("() => { __store.dispatch({type:'settings/sound', on:false}); window.__osc = 0; }")
        await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'x-rp', on:false})"); await A.wait_for_timeout(400)
        await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'x-rp', on:true})")
        await A.evaluate("() => __store.dispatch({type:'char/move', id:'x1', room:'living', x:1450, y:560})"); await A.wait_for_timeout(2500)
        osc = await A.evaluate("window.__osc")
        check('(5) muted A: party restart + care sparkle start no oscillator', osc == 0, osc)
        await A.evaluate("__store.dispatch({type:'settings/sound', on:true})")
        runC = await C.evaluate(RUNNING, '^(soc|amb|party|need|nb-|pb)')
        check('(5) reduced-motion C: no reaction/dance/party/need motion running', not [n for n in runC if 'Heart' not in n], runC)
        bubC = await C.evaluate("() => { const b = document.querySelector('#layer .need-bubble.show'); return b && getComputedStyle(b).animationName; }")
        check('(5) reduced-motion C: bubbles show without float', bubC in (None, 'none', ''), bubC)
        await shots(C, 'x5-reduced-motion-C', 100)
        # ---- (4) trick-or-treat while needs are active and a doll is asleep ----
        await A.evaluate("() => __store.dispatch({type:'char/move', id:'x3', room:'living', x:1000, y:600, seat:{item:'x-bed', pose:'lie', n:0}})"); await A.wait_for_timeout(1200)
        check('(4) x3 is asleep in bed (snooze) on A', await A.evaluate("!!document.querySelector('.char.need-snooze[data-cid=\"x3\"]')"))
        saveA0 = await A.evaluate("() => JSON.stringify({c: __store.get().characters, r: __store.get().rooms})")
        await B.evaluate("document.querySelector('#btnMap').click()"); await B.wait_for_timeout(1200); await close_sheet(B)
        sel = f'#mapWorld .mapKnock[data-knock="{hid}"]'
        nk = await B.evaluate("document.querySelectorAll('#mapWorld .mapKnock').length")
        check('(4) B on the street sees knock pumpkins', nk >= 1, nk)
        start = await B.evaluate("() => { const b = document.querySelector('#candyBucket b'); return b ? Number(b.textContent) : null; }")
        for _ in range(3): await B.click(sel); await B.wait_for_timeout(250)
        end = await B.evaluate("() => { const b = document.querySelector('#candyBucket b'); return b ? Number(b.textContent) : null; }")
        check('(4) three knocks -> three treats', start is not None and end == start + 3, (start, end))
        await A.wait_for_timeout(900)
        t = await A.evaluate("() => document.querySelector('#toastLane')?.textContent || ''")
        check('(4) owner A (inside, party on, doll asleep) gets one "came trick-or-treating!" note', t.count('came trick-or-treating!') == 1, t)
        await shots(A, 'x4-tot-owner-note', 700)
        await B.screenshot(path=f'{SHOT}x4-tot-street-B-820x1180.png')
        saveA1 = await A.evaluate("() => JSON.stringify({c: __store.get().characters, r: __store.get().rooms})")
        check('(4) knocks store nothing in the house save', saveA0 == saveA1 and 'candy' not in saveA1.lower() and 'trick' not in saveA1.lower())
        check('(4) still asleep, wishes still showing after the knocks', await A.evaluate("!!document.querySelector('.char.need-snooze[data-cid=\"x3\"]') && document.querySelectorAll('#layer .need-bubble.show').length >= 1"))
        await visit(B, hid); await B.evaluate("() => { if (__store.get().currentRoom !== 'living') __store.dispatch({type:'room/switch', room:'living'}); }"); await B.click('#modePlay')
        # ---- (6) old client ----
        await O.evaluate("() => __store.dispatch({type:'char/move', id:'x4', room:'living', x:520, y:560})"); await O.wait_for_timeout(1500)
        n4A = await A.evaluate(NEEDS, 'x4'); n4O = await O.evaluate(NEEDS, 'x4')
        check('(6) old client moves a doll: needs kept (A view == old copy)', n4A is not None and n4A == n4O and await A.evaluate(f"({D})('x4').x") == 520, (n4A, n4O))
        onO = await O.evaluate("(__store.get().rooms.living.items.find(i => i.id === 'x-rp') || {}).on")
        check('(6) old client copy keeps the record player on', onO is True, onO)
        await O.evaluate("document.querySelector('#btnMap').click()"); await O.wait_for_timeout(1000)
        await O.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await O.wait_for_timeout(1200)
        own = await O.evaluate("() => (__store.get().characters || []).some(c => c.id === 'old-own')")
        check("(6) old client's own house save still has its doll", own)
        await O.reload(); await O.wait_for_timeout(1500)
        own2 = await O.evaluate("() => (__store.get().characters || []).some(c => c.id === 'old-own')")
        check("(6) old client's save survives a reload", own2)
        check('(6) old client: no page errors', not eO, eO[:3])
        pa, pb, pc = await A.evaluate(POS), await B.evaluate(POS), await C.evaluate(POS)
        check('final: positions agree on all new iPads', pa == pb == pc, (pa, pb, pc))
        check('final: no page errors on new iPads', not (eA or eB or eC), (eA + eB + eC)[:3])
        print(f"\n{sum(res.values())}/{len(res)} checks passed", [k for k, v in res.items() if not v]); await br.close()
        sys.exit(0 if all(res.values()) else 1)
asyncio.run(main())
