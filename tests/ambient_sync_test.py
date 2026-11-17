# M1 ambient sync: two new iPads + one un-updated 7e32067 iPad in the same house, LOCAL worker only.
# usage: python tests/ambient_sync_test.py   (env WEB=http://localhost:4274, OLDWEB=http://localhost:4275, HOOD=http://localhost:8788)
import asyncio, os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:4274').rstrip('/')
OLDWEB = os.environ.get('OLDWEB', '').rstrip('/')
HOOD = os.environ.get('HOOD', 'http://localhost:8789').rstrip('/')
assert 'workers.dev' not in HOOD, 'local worker only'
SHOT = os.environ.get('AMB_SHOTS', 'shots/'); os.makedirs(SHOT, exist_ok=True)
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)

async def join(pg, code, nick_i, bring):
    await pg.evaluate("document.querySelector('#btnHood').click()"); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.click(f'.nicks button[data-nick="{nick_i}"]')
    await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=10000)

DANCERS = """() => [...document.querySelectorAll('.char.amb-dance')].map(e => e.dataset.id || e.dataset.cid || e.id).sort()"""
PHASE = """() => { const e = document.querySelector('.char.amb-dance[data-id="amb-d1"]') || document.querySelector('.char.amb-dance'); if (!e) return null;
  const an = e.getAnimations({subtree: true}).find(a => /amb/.test(a.animationName || '')) || e.getAnimations({subtree: true})[0]; if (!an) return null;
  const t = an.effect.getComputedTiming(); const P = t.duration; const loc = ((t.currentIteration || 0) + t.progress) * P;
  return (((loc - Date.now()) % P) + P) % P / P; }"""
ON = "id => !!(__store.get().rooms.living.items.find(i => i.id === id) || {}).on"


async def frame_stereo(pg):
    """Keep the stereo on-screen. __cam.set alone is not enough on iPad portrait:
    an auto-refit (fitCutPiece) can slide the camera unless the room is marked panned."""
    info = None
    for _ in range(10):
        info = await pg.evaluate("""() => {
          const it = (__store.get().rooms.living.items || []).find(i => i.id === 'amb-stereo');
          const el = document.querySelector('.item[data-id="amb-stereo"]');
          const stage = document.getElementById('stage');
          if (!it || !el || !stage || !window.__cam) return null;
          const sr = stage.getBoundingClientRect();
          const b = el.getBoundingClientRect();
          stage.dispatchEvent(new WheelEvent('wheel', {deltaX: 0.4, bubbles: true, cancelable: true}));
          const c0 = __cam.get();
          __cam.set(c0 + 8);
          const b1 = el.getBoundingClientRect();
          const screenPerWorld = (b1.x - b.x) / 8;
          __cam.set(c0);
          if (!screenPerWorld) return { ok: false, box: {x:b.x, y:b.y, w:b.width, h:b.height} };
          const want = sr.left + sr.width / 2;
          const got = b.x + b.width / 2;
          __cam.set(c0 + (want - got) / screenPerWorld);
          const b2 = el.getBoundingClientRect();
          const hit = document.elementFromPoint(b2.x + b2.width/2, b2.y + b2.height*0.6);
          const on = b2.x >= sr.left + 8 && (b2.x + b2.width) <= sr.right - 8
                    && b2.y >= sr.top && (b2.y + b2.height) <= sr.bottom + 20
                    && !!(hit && hit.closest && hit.closest('.item[data-id="amb-stereo"]'));
          return { ok: on, box: {x:b2.x, y:b2.y, w:b2.width, h:b2.height}, cam: __cam.get() };
        }""")
        if info and info.get('ok'):
            return info
        await pg.wait_for_timeout(80)
    return info

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        async def mk(web):
            c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page()
            errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(f'{web}/kids-house-game/?hood={HOOD}'); await pg.wait_for_timeout(800)
            return pg, errs
        (A, eA), (B, eB) = await mk(WEB), await mk(WEB)
        code = (await A.evaluate("fetch(__hood_url() + '/api/create', {method:'POST'}).then(r => r.json())"))['code']
        await join(A, code, 0, True); await join(B, code, 1, False)
        await A.evaluate("document.querySelector('#mapWorld .mapHouse.mine').click()"); await A.wait_for_timeout(800)
        hid = await A.evaluate("__hood().myHouseId()")
        await B.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await B.wait_for_timeout(900)
        check('B visits A house', (await B.evaluate("__ui()"))['currentHouseId'] == hid)
        # a stereo in the living room with up to 3 dolls standing next to it
        await A.evaluate("""() => {
          const s = __store, st = s.get(), room = 'living';
          s.dispatch({type:'item/add', room, item:{id:'amb-stereo', kind:'pack:cute-speaker', x:520, y:640, flip:false, z:50, scale:1}});
          const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
          ['amb-d1','amb-d2','amb-d3'].forEach((id, i) => s.dispatch({type:'char/add', char:{...base, id, x:[370, 680, 400][i], y:[720, 720, 640][i], hairStyle:i}}));
        }""")
        await A.wait_for_timeout(900)
        if os.environ.get('AMB_DEBUG'): print(await A.evaluate("() => ({keys: Object.keys(__store.get()), nch: (__store.get().characters||[]).length, amb: __hood().speaksAmb, h: Object.keys(__hood()), items: __store.get().rooms.living.items.slice(-2)})"))
        n = await A.evaluate("Object.values(__store.get().characters || __store.get().chars || {}).filter(c => c.room === 'living').length")
        check('dolls placed near the stereo', n >= 1, n)
        await A.click('#modePlay')
        await A.wait_for_timeout(400)
        framed = await frame_stereo(A)
        bb = (framed or {}).get('box')
        if os.environ.get('AMB_DEBUG'): print('framed', framed, await A.evaluate("__ui()"))
        check('stereo is on-screen for the tap', bool(framed and framed.get('ok') and bb), framed)
        if framed and framed.get('ok') and bb:
            px, py = bb['x'] + bb['w']/2, bb['y'] + bb['h']*0.6
            await A.mouse.click(px, py)
            await A.wait_for_timeout(1000)
            dA, dB = await A.evaluate(DANCERS), await B.evaluate(DANCERS)
            check('A taps stereo -> on in both stores within 1s', await A.evaluate(ON, 'amb-stereo') and await B.evaluate(ON, 'amb-stereo'))
            check('both iPads show the same dancers within 1s', len(dA) >= 1 and dA == dB, f'{dA} {dB}')
            pa, pb = await asyncio.gather(A.evaluate(PHASE), B.evaluate(PHASE))
            check('dance phase in step across iPads (wall clock)', pa is not None and pb is not None and min(abs(pa - pb), 1 - abs(pa - pb)) < 0.08, f'{pa} {pb}')
        else:
            print('SKIP A taps stereo (stereo off-screen; not a sync failure)', flush=True)
        for i in range(4):
            await A.screenshot(path=f'{SHOT}stereo-dance-{i+1}-820x1180.png'); await A.wait_for_timeout(225)
        await frame_stereo(B)
        await B.screenshot(path=f'{SHOT}stereo-dance-visitor-820x1180.png')
        # simultaneous toggles from both iPads settle the same
        await B.click('#modePlay'); await B.wait_for_timeout(200)
        await asyncio.gather(A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:false})"),
                             B.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:true})"))
        await A.wait_for_timeout(1000)
        oa, ob = await A.evaluate(ON, 'amb-stereo'), await B.evaluate(ON, 'amb-stereo')
        check('simultaneous on/off settles the same on both', oa == ob, f'{oa} {ob}')
        await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:true})"); await A.wait_for_timeout(700)
        # old client joins as a third kid, visits, writes; `on` survives
        if OLDWEB:
            O, eO = await mk(OLDWEB); await join(O, code, 2, False)
            await O.evaluate("h => document.querySelector(`#mapWorld .mapHouse[data-go=\"house:${h}\"]`).click()", hid); await O.wait_for_timeout(1200)
            o_on = await O.evaluate("(__store.get().rooms.living.items.find(i => i.id === 'amb-stereo') || {}).on")
            check('old 7e32067 client keeps on in its copy', o_on is True, o_on)
            await O.evaluate("""() => { const it = __store.get().rooms.living.items.find(i => i.id === 'amb-stereo');
              __store.dispatch({type:'item/move', room:'living', id:it.id, x:it.x + 20, y:it.y}); }""")
            await A.wait_for_timeout(900)
            x = await A.evaluate("__store.get().rooms.living.items.find(i => i.id === 'amb-stereo')")
            check('old client write keeps on (A view)', x and x.get('on') is True and abs(x['x'] - 540) < 1, json.dumps(x))
            await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:false})"); await A.wait_for_timeout(500)
            await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:true})"); await A.wait_for_timeout(700)
            check('old client: no page errors from new acts', not eO, eO)
        # drag a dancer out of range -> she stops on both
        cid = (await A.evaluate(DANCERS))[0] if await A.evaluate(DANCERS) else None
        await A.evaluate("id => __store.dispatch({type:'char/move', id, room:'living', x:1500, y:700})", cid)
        await A.wait_for_timeout(1500)
        check('dragging a dancer out stops her on both', cid and cid not in await A.evaluate(DANCERS) and cid not in await B.evaluate(DANCERS), cid)
        await A.evaluate("__store.dispatch({type:'item/power', room:'living', id:'amb-stereo', on:false})"); await A.wait_for_timeout(800)
        check('stereo off -> nobody dances', not await A.evaluate(DANCERS) and not await B.evaluate(DANCERS))
        check('no page errors (new clients)', not eA and not eB, eA + eB)
        print(f"\n{sum(res.values())}/{len(res)} checks passed"); await b.close()
        sys.exit(0 if all(res.values()) else 1)
asyncio.run(main())
