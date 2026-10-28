# M2 needs screenshots (solo, LOCAL static server only): hint bubble + glowing spot, care burst, Wishes switch.
# usage: flock /workspace/surprise/gate.lock /workspace/.pwvenv/bin/python tests/needs_shots.py   env WEB=http://localhost:5610 NEED_SHOTS=shots/needs/
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
WEB = os.environ.get('WEB', 'http://localhost:5610').rstrip('/')
SHOT = os.environ.get('NEED_SHOTS', 'shots/needs/'); os.makedirs(SHOT, exist_ok=True)
ok_all = True
def check(name, ok):
    global ok_all; ok_all &= bool(ok); print(('PASS ' if ok else 'FAIL ') + name, flush=True)
SETUP = """([room, re, need]) => { const S = __store; S.dispatch({type:'room/switch', room});
  const it = S.get().rooms[room].items.find(i => new RegExp(re).test(i.kind));
  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}};
  if (!S.get().characters.some(c => c.id === 'sh1')) S.dispatch({type:'char/add', char:{...base, id:'sh1', room, x: 100, y: 640}});
  const fx = it.x > 700 ? it.x - 360 : it.x + 360;
  S.dispatch({type:'char/move', id:'sh1', room, x: fx, y: 660});
  for (let i = 0; i < 3; i++) S.dispatch({type:'need/drift', id:'sh1', need});
  __cam.set(Math.max(0, Math.min(it.x, fx) - 120));
  return {id: it.id, x: it.x, y: it.y, kind: it.kind}; }"""
async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for tag, w, h in (('820x1180', 820, 1180), ('phone-390x844', 390, 844), ('phone-844x390', 844, 390)):
            c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); pg = await c.new_page()
            await pg.goto(f'{WEB}/kids-house-game/'); await pg.wait_for_timeout(1500)
            await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test(b.textContent.trim()) && b.offsetParent) b.click(); }"); await pg.wait_for_timeout(400)
            for need, room, re in (('hungry', 'kitchen', 'fridge'), ('sleepy', 'bedroom', 'bed$')):
                it = await pg.evaluate(SETUP, [room, re, need]); await pg.wait_for_timeout(1400)
                bub = await pg.evaluate("() => { const b = document.querySelector('.char[data-cid=\"sh1\"] > .need-bubble'); return b && b.dataset.need + ':' + b.classList.contains('show'); }")
                glow = await pg.evaluate("id => !!document.querySelector(`.item.need-hint[data-id=\"${id}\"]`)", it['id'])
                check(f'{tag} {need}: bubble shows and the {it["kind"]} glows', bub == f'{need}:true' and glow)
                await pg.screenshot(path=f'{SHOT}shot-{need}-hint-glow-{tag}.png')
                await pg.evaluate("([room, x, y, need]) => __store.dispatch({type:'char/move', id:'sh1', room, x: x + (need === 'hungry' ? 70 : 0), y: Math.max(y, 560)" + "})", [room, it['x'], it['y'], need])
                await pg.evaluate("x => __cam.set(Math.max(0, x - 240))", it['x'])
                try:
                    await pg.wait_for_selector('.need-burst', state='attached', timeout=1500); await pg.wait_for_timeout(250); burst = True
                except Exception: burst = False
                if need == 'sleepy':  # tuck her in properly so the bed meet fires
                    await pg.evaluate("([room, id]) => { const it = __store.get().rooms[room].items.find(i => i.id === id); __store.dispatch({type:'char/move', id:'sh1', room, x: it.x, y: it.y, seat:{item: id, pose:'lie', n:0}}); }", [room, it['id']])
                    try:
                        await pg.wait_for_selector('.need-burst', state='attached', timeout=1500); await pg.wait_for_timeout(250); burst = True
                    except Exception: pass
                check(f'{tag} {need}: care burst plays', burst)
                await pg.screenshot(path=f'{SHOT}shot-{need}-care-burst-{tag}.png'); await pg.wait_for_timeout(1500)
            await pg.evaluate("document.getElementById('btnMenu').click()"); await pg.wait_for_timeout(500)
            await pg.evaluate("document.getElementById('btnWishes').scrollIntoView({block:'center'})"); await pg.wait_for_timeout(200)
            check(f'{tag}: Wishes switch is in the Menu', await pg.is_visible('#btnWishes'))
            await pg.screenshot(path=f'{SHOT}shot-menu-wishes-{tag}.png')
            await c.close()
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)
asyncio.run(main())
