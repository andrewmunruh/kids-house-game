# M3 frame-rate check: 4 dolls + cat + kennel dog + baby + stereo (dancing duet), branch vs base, several rounds.
# usage: NEW=http://localhost:5650 BASE=http://localhost:5651 ROUNDS=5 python tests/m3_fps.py   (LOCAL vite only)
# Engines: headless WebKit at 820x1180, and Chromium at 820x1180 with a 4x CPU throttle (iPad-class stand-in).
import asyncio, os, sys, statistics, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN
NEW = os.environ.get('NEW', 'http://localhost:5650').rstrip('/') + '/kids-house-game/'
BASE = os.environ.get('BASE', 'http://localhost:5651').rstrip('/') + '/kids-house-game/'
ROUNDS = int(os.environ.get('ROUNDS', '5'))
SCENE = """() => { const s = __store, st = s.get(), room = 'living';
  st.characters.forEach(c => s.dispatch({type:'char/delete', id:c.id}));
  if (st.currentRoom !== room) s.dispatch({type:'room/switch', room});
  const add = (id, kind, x, y) => s.dispatch({type:'item/add', room, item:{id, kind, x, y, flip:false, z:40, scale:1}});
  add('f-st', 'pack:cute-speaker', 540, 560); s.dispatch({type:'item/power', room, id:'f-st', on:true});
  add('f-so', 'sofa', 820, 560); add('f-k', 'kennel', 1150, 620);
  const base = {skin:'#f2c9a0', hair:'#5a3d2b', hairStyle:1, shirt:'#ff7eb3', pants:'#6b8cff', size:'kid', acc:0, flip:false, held:{left:null, right:null}, room};
  [[450,620],[560,620],[640,620],[820,560]].forEach(([x, y], i) => s.dispatch({type:'char/add', char:{...base, id:'f' + i, x, y, hairStyle:i, ...(i === 3 ? {seat:{item:'f-so', pose:'sit', n:0}} : {})}}));
  s.dispatch({type:'cat/set', cat:{name:'Mimi', coat:1, room, x:1000}});
  s.dispatch({type:'dog/set', dog:{name:'Biscuit', breed:1}}); s.dispatch({type:'dog/kennel', item:'f-k'});
  if (!s.get().baby) s.dispatch({type:'baby/meet', now: Date.now()}); s.dispatch({type:'baby/place', room, x:380, y:620, spot:'mat', bed:null, seat:null, now: Date.now()});
  __cam.set(150); }"""
RAF = """() => new Promise(r => { const ts = []; const t0 = performance.now(); const f = t => { ts.push(t); if (t - t0 < 5000) requestAnimationFrame(f); else {
  const d = ts.slice(1).map((t, i) => t - ts[i]); r([ (ts.length - 1) / ((ts[ts.length - 1] - ts[0]) / 1000), Math.max(...d), d.filter(x => x > 25).length ]); } }; requestAnimationFrame(f); })"""
async def one(b, url, engine):
    c = await b.new_context(viewport={'width': 820, 'height': 1180}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN); pg = await c.new_page()
    await pg.goto(url); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(800)
    await pg.click('#modePlay'); await pg.evaluate(SCENE); await pg.wait_for_timeout(2500)
    pets = await pg.evaluate("document.querySelectorAll('.layer > .pet').length")
    if engine == 'chromium':
        cdp = await c.new_cdp_session(pg); await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4}); await pg.wait_for_timeout(500)
    v = await pg.evaluate(RAF); await c.close(); return v + [pets]
async def main():
    out = {}
    async with async_playwright() as p:
        for engine in ('webkit', 'chromium'):
            b = await getattr(p, engine).launch()
            for r in range(ROUNDS):
                for tag, url in (('base', BASE), ('new', NEW)) if r % 2 == 0 else (('new', NEW), ('base', BASE)):
                    v = await one(b, url, engine); out.setdefault((engine, tag), []).append(v)
                    print(engine, tag, r, [round(v[0], 1), round(v[1], 1), v[2], v[3]], flush=True)
            await b.close()
    ok = True
    for engine in ('webkit', 'chromium'):
        mb = statistics.median(x[0] for x in out[(engine, 'base')]); mn = statistics.median(x[0] for x in out[(engine, 'new')])
        jb = statistics.median(x[2] for x in out[(engine, 'base')]); jn = statistics.median(x[2] for x in out[(engine, 'new')])
        good = mn >= mb - 2 and (engine != 'webkit' or mn >= 55)
        ok &= good
        print(('PASS ' if good else 'FAIL ') + f'{engine}: median fps new {mn:.1f} vs base {mb:.1f}; median long frames (>25ms) new {jn} vs base {jb}; pets {out[(engine, "new")][0][3]}', flush=True)
    sys.exit(0 if ok else 1)
asyncio.run(main())
