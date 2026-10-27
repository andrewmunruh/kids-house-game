# M3 screenshots + checks (solo mode, LOCAL vite only): new ambient items, friends, duet, pets, baby,
# reduced motion, and an rAF sample with 4 dolls + 2 pets.  usage: WEB=http://localhost:5650 SIZE=820x1180 python tests/m3_shots.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5650').rstrip('/') + '/kids-house-game/'
SHOT = os.environ.get('M3_SHOTS', 'shots/m3/'); os.makedirs(SHOT, exist_ok=True)
W, H = map(int, os.environ.get('SIZE', '820x1180').split('x'))
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name + (' ' + str(extra) if extra else ''), flush=True)
# name, items [(kind,x,y,on)], dolls [(x,y,seat_item_index or None)], extra js, expected classes
SCENES = [
  ('piano-play', [('pack:piano', 540, 560, False)], [(560, 600, None), (760, 620, None)], "tapKeys(0)", ['amb-play', 'amb-listen']),
  ('keyboard-play', [('pack:keyboard', 540, 560, False)], [(620, 580, None)], "tapKeys(0)", ['amb-play']),
  ('stove-stir', [('stove', 540, 540, False)], [(600, 600, None)], "openItem(0)", ['amb-stir']),
  ('aquarium-look', [('pack:aquarium', 540, 540, False)], [(420, 620, None), (690, 620, None)], "", ['amb-look']),
  ('fountain-look', [('pack:pink-fountain', 540, 560, False)], [(420, 620, None)], "", ['amb-look']),
  ('dollhouse-kneel', [('pack:doll-house', 540, 600, False)], [(600, 620, None)], "", ['amb-kneel']),
  ('swing', [('pack:cc-macrame-swing', 540, 560, False)], [(545, 565, None)], "", ['amb-swing']),
  ('slide', [('little-slide', 540, 600, False)], [(560, 610, None)], "", ['amb-slide']),
  ('friends', [], [(470, 620, None), (590, 620, None)], "pairOn()", ['soc-']),
  ('duet', [('pack:cute-speaker', 540, 560, True)], [(470, 620, None), (590, 620, None)], "", ['soc-duet']),
  ('cat-snuggle', [('sofa', 500, 560, False)], [(500, 560, 0)], "cat(900)", ['soc-snug']),
  ('pet-trot-sleeping-doll', [('bed', 520, 600, False)], [(520, 600, 0)], "cat(900)", ['soc-snug']),
  ('dolls-wave', [], [(470, 620, None), (1300, 620, None)], "arrive()", ['soc-wave']),
  ('baby-coo', [], [(520, 620, None)], "baby(600, 620)", ['soc-coo']),
]
SETUP = """([items, dolls]) => { const s = __store, st = s.get(), room = 'living';
  st.characters.forEach(c => s.dispatch({type:'char/delete', id:c.id}));
  (st.rooms[room].items || []).filter(i => i.id.startsWith('m3-')).forEach(i => s.dispatch({type:'item/delete', room, id:i.id}));
  if (st.cat) s.dispatch({type:'cat/set', cat:null});
  if (st.currentRoom !== room) s.dispatch({type:'room/switch', room});
  items.forEach(([kind, x, y, on], i) => { s.dispatch({type:'item/add', room, item:{id:'m3-' + i, kind, x, y, flip:false, z:40 + i, scale:1}}); if (on) s.dispatch({type:'item/power', room, id:'m3-' + i, on:true}); });
  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
  dolls.forEach(([cx, cy, seat], i) => s.dispatch({type:'char/add', char:{...base, id:'m3d' + i, x:cx, y:cy, hairStyle:i % 4, shirt:['#ff7eb3','#7ec8ff','#b48cff','#ffd166'][i % 4], ...(seat !== null ? {seat:{item:'m3-' + seat, pose: items[seat][0] === 'bed' ? 'lie' : 'sit', n:0}} : {})}}));
  __cam.set(150);
  window.tapKeys = window.openItem = i => setTimeout(() => { const el = document.querySelector('.item[data-id="m3-' + i + '"]'); const r = el.getBoundingClientRect(); const o = {bubbles:true, clientX:r.left + r.width / 2, clientY:r.top + r.height / 2, pointerId:1, isPrimary:true, pointerType:'touch'};
    el.dispatchEvent(new PointerEvent('pointerdown', o)); el.dispatchEvent(new PointerEvent('pointerup', o)); }, 300);
  window.__pinCat = null;
  // hold her where we put her (her wander is clock-driven and can carry her out of reach)
  window.cat = x => { s.dispatch({type:'cat/set', cat:{name:'Mimi', coat:1, room, x}}); window.__pinCat = {x}; };
  window.baby = (x, y) => { if (!s.get().baby) s.dispatch({type:'baby/meet', now: Date.now()}); s.dispatch({type:'baby/place', room, x, y, spot:'mat', bed:null, seat:null, now: Date.now()}); };
  window.pairOn = () => {};
  window.arrive = () => setTimeout(() => s.dispatch({type:'char/move', id:'m3d1', room, x:600, y:620}), 1500);
}"""
CLS = "() => [...document.querySelectorAll('.layer .char, .layer > .pet, .layer > .baby, .layer .item[data-id^=m3-]')].map(e => [...e.classList].filter(c => /^(amb|soc)-/.test(c)).join(' ')).filter(Boolean)"

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for rm in (False, True):
            c = await b.new_context(viewport={'width': W, 'height': H}, device_scale_factor=2, has_touch=True, reduced_motion='reduce' if rm else 'no-preference')
            await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(WEB); await pg.wait_for_selector('#stage')
            if os.environ.get('INJECT'): await pg.add_style_tag(content=os.environ['INJECT']); await pg.wait_for_timeout(600)
            await pg.click('#modePlay')
            for name, items, dolls, js, want in [x for x in (SCENES if not rm else [SCENES[0], SCENES[9], SCENES[10], SCENES[11]]) if not os.environ.get("ONLY") or x[0] in os.environ["ONLY"].split(",")]:
                await pg.evaluate(SETUP, [items, dolls])
                if js: await pg.evaluate(js)
                got = []
                for _ in range(14 if name == 'friends' else 6):
                    await pg.wait_for_timeout(1000)
                    got = await pg.evaluate(CLS)
                    if all(any(w in g for g in got) for w in want): break
                await pg.wait_for_timeout(500)
                tag = '-reduced-motion' if rm else ''
                await pg.screenshot(path=f"{SHOT}{name}{tag}-{W}x{H}.png")
                check(f"{name}{tag} shows {want}", all(any(w in g for g in got) for w in want), got)
            if rm:
                running = await pg.evaluate("() => document.getAnimations().filter(a => /^(soc|amb)/.test(a.animationName || '') && a.playState === 'running' && !/Note|Bub|Steam|Ripple|Heart|Flicker|Flame/.test(a.animationName)).length")
                check('reduced motion: no doll/pet/baby motion running', running == 0, running)
            else:
                # 4 dolls + 2 pets (cat + kennel-less dog is per-hood; use cat + a second room cat stand-in is not possible), stereo on
                await pg.evaluate(SETUP, [[('pack:cute-speaker', 540, 560, True), ('sofa', 820, 560, False)], [(450, 620, None), (560, 620, None), (640, 620, None), (820, 560, 1)]])
                await pg.evaluate("cat(1000)"); await pg.evaluate("baby(380, 620)")
                await pg.wait_for_timeout(2500)
                fps = await pg.evaluate("""() => new Promise(r => { let n = 0, worst = 0, last = performance.now(); const t0 = last; const f = () => { const t = performance.now(); worst = Math.max(worst, t - last); last = t; n++; if (t - t0 < 4000) requestAnimationFrame(f); else r([n / 4, worst]); }; requestAnimationFrame(f); })""")
                await pg.screenshot(path=f"{SHOT}busy-4dolls-pet-baby-{W}x{H}.png")
                check('rAF with 4 dolls + cat + baby + stereo (headless webkit)', fps[0] >= 55, fps)
                # dragging away mid-reaction: move a dancer out of reach -> dance ends
                await pg.evaluate("__store.dispatch({type:'char/move', id:'m3d0', room:'living', x:1500, y:620})"); await pg.wait_for_timeout(1300)
                cl = await pg.evaluate("() => [...document.querySelector('.char[data-cid=\"m3d0\"]')?.classList || []].filter(c => /^(amb|soc)-/.test(c))")
                check('moved out of reach mid-dance: reactions end', cl == [], cl)
            check(f'no page errors{" (reduced)" if rm else ""}', not errs, errs)
            await c.close()
        await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f"\n{len(res) - len(bad)}/{len(res)} passed", bad)
    sys.exit(1 if bad else 0)
asyncio.run(main())
