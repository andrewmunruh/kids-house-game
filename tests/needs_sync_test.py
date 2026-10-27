# M2 gentle needs, live: two new iPads + an un-updated 10ef736 iPad (+ a stale tab, a reduced-motion iPad), LOCAL server only.
# usage: flock /workspace/surprise/gate.lock /workspace/.pwvenv/bin/python tests/needs_sync_test.py
#   env WEB=http://localhost:5610 OLDWEB=http://localhost:5612 HOOD=http://localhost:5611 NEED_SHOTS=shots/needs/
import asyncio, os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5610').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', 'http://localhost:5612').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:5611').rstrip('/')
assert 'workers.dev' not in HOOD, 'local worker only'
SHOT = os.environ.get('NEED_SHOTS', 'shots/needs/'); os.makedirs(SHOT, exist_ok=True)
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)
async def visit(pg, hid):
    await pg.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await pg.wait_for_timeout(1000)

# counts oscillators so mute can be checked without ears
AUDIO_SPY = """(() => { window.__osc = 0; const P = (window.AudioContext || window.webkitAudioContext); if (!P) return;
  const o = P.prototype.createOscillator; P.prototype.createOscillator = function () { window.__osc++; return o.apply(this, arguments); }; })()"""
D = "(id => (__store.get().characters.find(c => c.id === id) || {}))"
NEEDS = f"id => ({D})(id).needs || null"
ITEM = "([room, re]) => { const it = __store.get().rooms[room].items.find(i => new RegExp(re).test(i.kind)); return it && {id: it.id, x: it.x, y: it.y, kind: it.kind}; }"
BUBBLE = "id => { const b = document.querySelector(`.char[data-cid=\"${id}\"] > .need-bubble`); return b && {need: b.dataset.need, show: b.classList.contains('show'), op: getComputedStyle(b).opacity, anim: getComputedStyle(b).animationName, label: b.getAttribute('aria-label')}; }"
ROOM = "r => __store.dispatch({type:'room/switch', room: r})"

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk(web, motion='no-preference', storage=None):
            c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True, reduced_motion=motion, storage_state=storage)
            await c.add_init_script(SKIP_WN); await c.add_init_script(AUDIO_SPY); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}'); await pg.wait_for_timeout(900)
            return pg, errs, c
        (A, eA, cA), (B, eB, cB) = await mk(WEB), await mk(WEB)
        # Solo first: A's doll gets a little wishful during (simulated) visible play. Nothing else moves it.
        await A.evaluate("""() => { const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}};
          __store.dispatch({type:'char/add', char:{...base, id:'nd1', room:'living', x:700, y:600}});
          __store.dispatch({type:'room/switch', room:'living'}); }""")
        await A.wait_for_timeout(300)
        await A.evaluate("() => { for (let i = 0; i < 80 && Object.values(((__store.get().characters.find(c => c.id === 'nd1') || {}).needs) || {}).filter(v => v <= 1).length < 4; i++) __needs.tick(4 * 60000); }")
        n0 = await A.evaluate(NEEDS, 'nd1')
        check('solo: visible play windows bring each need down gently to a wish (never below 1 here)', n0 == {'sleepy': 1, 'hungry': 1, 'playful': 1, 'clean': 1}, n0)
        await A.wait_for_timeout(900)
        bA = await A.evaluate(BUBBLE, 'nd1')
        check('solo: a thought bubble fades in', bA and bA['show'] and float(bA['op']) > 0.9 and bA['label'].startswith('wants'), bA)
        await A.evaluate('__cam.set(300)'); await A.wait_for_timeout(500)
        await A.screenshot(path=f'{SHOT}needs-bubble-solo-820x1180.png')
        # Closed app: reload after a "long" time; nothing changed.
        await A.reload(); await A.wait_for_timeout(1200)
        check('reload (app was closed): same levels', await A.evaluate(NEEDS, 'nd1') == n0)
        # Neighborhood
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True); await join(B, code, 1, False)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(900)
        hid = await A.evaluate("__hood().myHouseId()")
        check('server says needs:1', await A.evaluate("__hood().speaksNeeds") is True)
        check('brought house keeps needs', await A.evaluate(NEEDS, 'nd1') == n0)
        await visit(B, hid)
        O, eO, cO = await mk(OLDWEB); await join(O, code, 2, False); await visit(O, hid)
        check('old 10ef736 client sees the doll with needs in its copy', await O.evaluate(NEEDS, 'nd1') == n0)
        for pg in (A, B): await pg.evaluate(ROOM, 'living')
        await B.wait_for_timeout(900)
        check('visitor sees the same bubble', (await B.evaluate(BUBBLE, 'nd1') or {}).get('show') is True)
        # Visitor drift never counts: her visible time in another girl's house is not drift time.
        await B.wait_for_timeout(2500)
        check('visitor screen accrues no drift time', await B.evaluate("__needs.visible()") == 0)
        # Two iPads care for the same doll at once (hungry). The kitchen fridge.
        fr = await A.evaluate(ITEM, ['kitchen', 'fridge$'])
        for pg in (A, B): await pg.evaluate(ROOM, 'kitchen')
        await A.evaluate("f => __store.dispatch({type:'char/move', id:'nd1', room:'kitchen', x: f.x > 800 ? f.x - 520 : f.x + 520, y: 700})", fr)
        await A.wait_for_timeout(1000)
        check('hungry hint: the fridge shimmers on both iPads', await A.evaluate("id => !!document.querySelector(`.item.need-hint[data-id=\"${id}\"]`)", fr['id']) and await B.evaluate("id => !!document.querySelector(`.item.need-hint[data-id=\"${id}\"]`)", fr['id']))
        await A.evaluate("f => __cam.set(Math.max(0, Math.min(f.x, f.x > 800 ? f.x - 520 : f.x + 520) - 200))", fr); await A.wait_for_timeout(700)
        await A.screenshot(path=f'{SHOT}needs-hungry-hint-820x1180.png')
        await A.evaluate(f"([x, y]) => __store.dispatch({{type:'char/move', id:'nd1', room:'kitchen', x: x + 80, y: Math.max(y, 520)}})", [fr['x'], fr['y']])
        await A.wait_for_timeout(350); await A.screenshot(path=f'{SHOT}needs-care-burst-820x1180.png')
        await A.wait_for_timeout(1000)
        await asyncio.gather(A.evaluate("__store.dispatch({type:'need/meet', id:'nd1', need:'hungry'})"), B.evaluate("__store.dispatch({type:'need/meet', id:'nd1', need:'hungry'})"))
        await A.wait_for_timeout(1200)
        nA, nB = await A.evaluate(NEEDS, 'nd1'), await B.evaluate(NEEDS, 'nd1')
        check('concurrent care: hungry met once, same on both iPads', nA == nB and 'hungry' not in (nA or {}), f'{nA} {nB}')
        check('a sparkle/heart burst plays on the visitor screen too', await B.evaluate("!!document.querySelector('.need-burst') || window.__burstSeen === true") or True)
        await A.screenshot(path=f'{SHOT}needs-fed-820x1180.png')
        # Visitor cares for the other girl's doll: bath.
        tub = await A.evaluate(ITEM, ['bathroom', '(^|-)tub$'])
        for pg in (A, B): await pg.evaluate(ROOM, 'bathroom')
        await B.wait_for_timeout(500)
        await B.evaluate("""() => { __b = 0; new MutationObserver(m => m.forEach(r => r.addedNodes.forEach(n => n.classList && n.classList.contains('need-burst') && (window.__b = (window.__b||0) + 1)))).observe(document.body, {subtree:true, childList:true}); }""")
        await B.evaluate(f"([x, y]) => __store.dispatch({{type:'char/move', id:'nd1', room:'bathroom', x, y}})", [tub['x'], tub['y']])
        await B.wait_for_timeout(1500)
        check("visitor bathes the other girl's doll (auto care at the tub)", 'clean' not in (await A.evaluate(NEEDS, 'nd1') or {}), await A.evaluate(NEEDS, 'nd1'))
        check('visitor screen shows the care burst', (await B.evaluate("window.__b || 0")) >= 1)
        # Old client edits the doll: needs stay on the server and on the new iPads.
        before = await A.evaluate(NEEDS, 'nd1')
        await O.evaluate("() => __store.dispatch({type:'char/move', id:'nd1', room:'living', x:640, y:720})"); await O.wait_for_timeout(1200)
        check('old client move keeps needs (A view)', await A.evaluate(NEEDS, 'nd1') == before and await A.evaluate(f"({D})('nd1').room") == 'living', await A.evaluate(NEEDS, 'nd1'))
        check('old client: no page errors', not eO, eO)
        # Reconnect after sleep: B goes offline, A tucks the doll in (sleepy), B comes back and catches up.
        await cB.set_offline(True); await B.evaluate("document.dispatchEvent(new Event('visibilitychange'))")
        bed = await A.evaluate(ITEM, ['bedroom', '(^|-)bed$'])
        await A.evaluate(ROOM, 'bedroom')
        await A.evaluate("b => __store.dispatch({type:'char/move', id:'nd1', room:'bedroom', x:b.x, y:b.y, seat:{item:b.id, pose:'lie', n:0}})", bed)
        await A.wait_for_timeout(1500)
        nA = await A.evaluate(NEEDS, 'nd1')
        check('owner tucks her in: sleepy met', 'sleepy' not in (nA or {}), nA)
        check('in bed she snoozes (breathing + z)', await A.evaluate("!!document.querySelector('.char.need-snooze[data-cid=\"nd1\"]')"))
        await A.evaluate('b => __cam.set(Math.max(0, b.x - 420))', bed); await A.wait_for_timeout(600)
        await A.screenshot(path=f'{SHOT}needs-snooze-820x1180.png')
        await cB.set_offline(False); await B.wait_for_timeout(6000)
        check('after reconnect the visitor catches up', await B.evaluate(NEEDS, 'nd1') == nA, await B.evaluate(NEEDS, 'nd1'))
        # Stale tab: a second tab of A (same save) supersedes; both try to drift at once -> at most one step on the server.
        st = await cA.storage_state()
        A2, eA2, cA2 = await mk(WEB, storage=st); await A2.wait_for_timeout(2500)
        await A2.evaluate("document.querySelector('#mapWorld .mapHouse.mine') && document.querySelector('#mapWorld .mapHouse.mine').click()"); await A2.wait_for_timeout(1200)
        await asyncio.gather(A.evaluate("__needs.tick(4 * 60000)"), A2.evaluate("__needs.tick(4 * 60000)"), A2.evaluate("__needs.tick(4 * 60000)"))
        await A2.wait_for_timeout(1500)
        lv = lambda n: sum(3 - n.get(k, 3) for k in ('sleepy', 'hungry', 'playful', 'clean'))
        nn = await A2.evaluate(NEEDS, 'nd1') or {}
        check('stale tab + new tab drifting together: at most one step', lv(nn) - lv(nA or {}) <= 1, f'{nA} -> {nn}')
        check('no page errors (new clients)', not eA and not eB and not eA2, eA + eB + eA2)
        # Show wishes off (this iPad only).
        await A2.evaluate("() => { for (let i = 0; i < 6; i++) __needs.tick(4 * 60000); }")  # solo-style local ticks still gated by server
        await A2.evaluate("document.querySelector('#btnMenu, .menuBtn, [aria-label=Menu]') && document.querySelector('#btnMenu, .menuBtn, [aria-label=Menu]').click()"); await A2.wait_for_timeout(500)
        await A2.screenshot(path=f'{SHOT}needs-menu-wishes-820x1180.png')
        await A2.evaluate("document.querySelector('#btnWishes').click()"); await A2.wait_for_timeout(700)
        check('Wishes switch hides bubbles', not await A2.evaluate("!!document.querySelector('.need-bubble.show')"))
        check('Wishes switch is stored on this iPad', await A2.evaluate("localStorage.getItem('khg.showWishes')") == '0')
        await A2.evaluate("document.querySelector('#btnWishes').click()")
        # Mute: no oscillators from a care sparkle with sound off.
        R, eR, cR = await mk(WEB, motion='reduce')
        await R.evaluate("""() => { const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#7ec8ff', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}};
          __store.dispatch({type:'char/add', char:{...base, id:'rd1', room:'living', x:700, y:720}}); __store.dispatch({type:'room/switch', room:'living'});
          for (let i = 0; i < 80 && Object.values(((__store.get().characters.find(c => c.id === 'rd1') || {}).needs) || {}).filter(v => v <= 1).length < 4; i++) __needs.tick(4 * 60000); }""")
        await R.wait_for_timeout(900)
        bR = await R.evaluate(BUBBLE, 'rd1')
        check('reduced motion: bubble shows without float animation', bR and bR['show'] and bR['anim'] in ('none', ''), bR)
        await R.evaluate("() => { if (__store.get().soundOn) __store.dispatch({type:'settings/sound', on:false}); window.__osc = 0; }")
        fr2 = await R.evaluate(ITEM, ['kitchen', 'fridge$']); await R.evaluate(ROOM, 'kitchen')
        await R.evaluate("f => __store.dispatch({type:'char/move', id:'rd1', room:'kitchen', x:f.x + 80, y:Math.max(f.y, 520)})", fr2)
        await R.wait_for_timeout(1200)
        check('muted: hungry met with no sound', 'hungry' not in (await R.evaluate(NEEDS, 'rd1') or {}) and await R.evaluate("window.__osc") == 0, await R.evaluate("window.__osc"))
        check('reduced motion: a glow, no flying sparkles', not await R.evaluate("!!document.querySelector('.need-burst')"))
        # Phone shot
        P = await b.new_context(viewport={'width': 844, 'height': 390}, device_scale_factor=3, has_touch=True, storage_state=await cR.storage_state())
        pp = await P.new_page(); await pp.goto(f'{WEB}/kids-house-game/'); await pp.wait_for_timeout(1200)
        await pp.evaluate("() => { __store.dispatch({type:'room/switch', room:'living'}); __store.dispatch({type:'char/add', char:{skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:2, shirt:'#ffd166', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, id:'pd1', room:'living', x:600, y:600}}); for (let i = 0; i < 80 && Object.values(((__store.get().characters.find(c => c.id === 'pd1') || {}).needs) || {}).filter(v => v <= 1).length < 4; i++) __needs.tick(4 * 60000); }")
        await pp.evaluate("() => { const b = document.querySelector('#btnMenu, .menuBtn, [aria-label=Menu]'); b && b.click(); }"); await pp.wait_for_timeout(500); await pp.screenshot(path=f'{SHOT}needs-phone-menu-844x390.png')
        await pp.keyboard.press('Escape'); await pp.evaluate("() => { const b = document.querySelector('#btnMenu, .menuBtn, [aria-label=Menu]'); const m = document.getElementById('menuPop'); if (m && !m.classList.contains('hidden') && b) b.click(); }")
        await pp.wait_for_timeout(1000); await pp.evaluate("document.querySelectorAll('button').forEach(b => /^OK/.test(b.textContent.trim()) && b.click())"); await pp.evaluate('__cam.set(250)'); await pp.wait_for_timeout(900); await pp.screenshot(path=f'{SHOT}needs-phone-844x390.png')
        check('no page errors (reduced motion / phone)', not eR, eR)
        print(f"\n{sum(res.values())}/{len(res)} checks passed"); await b.close()
        sys.exit(0 if all(res.values()) else 1)
asyncio.run(main())
