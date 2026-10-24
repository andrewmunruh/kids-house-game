# Screenshots of each M1 reaction (solo mode, iPad 10th gen 820x1180) + a frame-rate sample + reduced motion.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:4274').rstrip('/') + '/kids-house-game/'
SHOT = os.environ.get('AMB_SHOTS', 'shots/'); os.makedirs(SHOT, exist_ok=True)
SCENES = [  # name, room, item kind, item x/y, power?, doll spots (stage framed like the hood test: cam 150)
  ('tv-watch', 'living', 'tv', 560, 540, True, [(400, 620), (700, 620)]),
  ('fireplace-warm', 'living', 'pack:fireplace', 540, 540, True, [(400, 620), (690, 620)]),
  ('woodstove-warm', 'living', 'pack:wc-woodstove', 540, 540, True, [(410, 620), (680, 620)]),
  ('music-box-sway', 'living', 'music-box', 540, 600, True, [(430, 625), (660, 625)]),
  ('record-player-dance', 'living', 'pack:cc-record-player', 540, 560, True, [(380, 640), (700, 640), (470, 585)]),
  ('ball-bounce', 'living', 'ball', 520, 630, False, [(520, 635)]),
  ('teddy-hug', 'living', 'teddy', 520, 630, False, [(520, 635)]),
]
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch(); out = {}
        for rm in (False, True):
            c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True, reduced_motion='reduce' if rm else 'no-preference')
            await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto(WEB); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(600)
            await pg.click('#modePlay')
            for name, room, kind, x, y, power, spots in (SCENES if not rm else SCENES[4:5]):
                await pg.evaluate("""([room, kind, x, y, power, spots]) => { const s = __store, st = s.get();
                  st.characters.forEach(c => s.dispatch({type:'char/delete', id:c.id}));
                  (st.rooms[room].items || []).filter(i => i.id.startsWith('m1-')).forEach(i => s.dispatch({type:'item/delete', room, id:i.id}));
                  if (st.currentRoom !== room) s.dispatch({type:'room/switch', room});
                  s.dispatch({type:'item/add', room, item:{id:'m1-' + kind.replace(':','-'), kind, x, y, flip:false, z:40, scale:1}});
                  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
                  spots.forEach(([cx, cy], i) => s.dispatch({type:'char/add', char:{...base, id:'m1d' + i, x:cx, y:cy, hairStyle:i, shirt:['#ff7eb3','#7ec8ff','#b48cff'][i]}}));
                  if (power) s.dispatch({type:'item/power', room, id:'m1-' + kind.replace(':','-'), on:true});
                  __cam.set(150); }""", [room, kind, x, y, power, spots])
                await pg.wait_for_timeout(1600)
                cls = await pg.evaluate("() => [...document.querySelectorAll('.char')].map(e => [...e.classList].filter(c => c.startsWith('amb-')).join(' '))")
                await pg.screenshot(path=f"{SHOT}{name}{'-reduced-motion' if rm else ''}-820x1180.png")
                if rm:
                    running = await pg.evaluate("() => document.getAnimations().filter(a => /amb/.test(a.animationName || '') && a.playState === 'running').length")
                    print('reduced-motion running amb animations:', running, cls)
                else: print(name, cls)
            if not rm:
                fps = await pg.evaluate("""() => new Promise(r => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 3000) requestAnimationFrame(f); else r(n / 3); }; requestAnimationFrame(f); })""")
                print('rAF fps with record-player dance (headless webkit):', round(fps, 1))
            print('errors', errs); await c.close()
        await b.close()
asyncio.run(main())
