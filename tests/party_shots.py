# Dance Party in WebKit (iPad 10th gen 820x1180): 4 dolls + teddy + cat at a record player; fps; reduced motion; stereo off fade.
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5770').rstrip('/') + '/kids-house-game/'
SHOT = os.environ.get('PARTY_SHOTS', '/workspace/t-party-shots/'); os.makedirs(SHOT, exist_ok=True)
VPS = [(820, 1180), (844, 390)]
SETUP = """(spots) => { const s = __store, st = s.get(), room = 'living';
  st.characters.forEach(c => s.dispatch({type:'char/delete', id:c.id}));
  if (st.currentRoom !== room) s.dispatch({type:'room/switch', room});
  s.dispatch({type:'item/add', room, item:{id:'pt-rp', kind:'pack:cc-record-player', x:540, y:560, flip:false, z:40, scale:1}});
  s.dispatch({type:'item/add', room, item:{id:'pt-ted', kind:'teddy', x:820, y:640, flip:false, z:41, scale:1}});
  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
  spots.forEach(([cx, cy], i) => s.dispatch({type:'char/add', char:{...base, id:'ptd' + i, x:cx, y:cy, hairStyle:i, shirt:['#ff7eb3','#7ec8ff','#b48cff','#8ee08e'][i]}}));
  s.dispatch({type:'item/power', room, id:'pt-rp', on:true}); __cam.set(150); }"""
SPOTS = [(380, 640), (700, 640), (470, 585), (620, 590)]
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch(); ok = True
        for rm in (False, True):
            for (w, h) in (VPS if not rm else VPS[:1]):
                c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, reduced_motion='reduce' if rm else 'no-preference')
                await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
                await pg.goto(WEB); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(600)
                await pg.click('#modePlay'); await pg.evaluate(SETUP, SPOTS); await pg.wait_for_timeout(1800)
                st = await pg.evaluate("""() => ({ on: document.body.classList.contains('party-on'),
                  delays: [...document.querySelectorAll('.char.amb-dance')].map(e => e.style.getPropertyValue('--amb-delay')),
                  bounce: [...document.querySelectorAll('.item.party-bounce')].map(e => e.dataset.id),
                  running: document.getAnimations().filter(a => /party/.test(a.animationName || '') && a.playState === 'running').length })""")
                tag = f"{w}x{h}" + ('-reduced-motion' if rm else '')
                await pg.screenshot(path=f"{SHOT}party-{tag}.png"); print(tag, st)
                dl = st['delays']; ok &= st['on'] and len(dl) == 4 and len(set(dl)) <= 2 and st['bounce'] == ['pt-ted']
                if rm: ok &= st['running'] == 0
                if not rm and w == 820:
                    fps = await pg.evaluate("""() => new Promise(r => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 3000) requestAnimationFrame(f); else r(n / 3); }; requestAnimationFrame(f); })""")
                    print('rAF fps, 4-doll party (headless webkit):', round(fps, 1))
                    await pg.evaluate("() => __store.dispatch({type:'item/power', room:'living', id:'pt-rp', on:false})"); await pg.wait_for_timeout(1500)
                    off = await pg.evaluate("() => [document.body.classList.contains('party-on'), getComputedStyle(document.getElementById('partyFx')).opacity]")
                    print('stereo off ->', off); ok &= (not off[0]) and float(off[1]) < 0.05
                print('errors', errs); ok &= not errs; await c.close()
        await b.close(); print('PARTY', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
if __name__ == "__main__": asyncio.run(main())
