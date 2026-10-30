# Batch 1 regression (A-01/02/03/12/19, A-10): copies of an item's art follow its painting.
# Base: qa-review art/tools front_dom.py, hold_swap.py, hold_dom.py, pose2.py.
# usage: python tests/art_copy_test.py <url>   [SIZES=820x1180,1180x820] [ONLY=seat,hold,reuse,tabs] [SHOTS=dir]
# Cold first sit on every painted seat with a front layer (sofa / bench / chair / bed) and
# cold first hold of every painted holdable: once the placed item shows its painting, the seat
# front and the held copy must show the same painting (no .svg, no inline <svg>).
import asyncio, json, os, sys
from playwright.async_api import async_playwright

URL = sys.argv[1]
SIZES = [tuple(map(int, s.split('x'))) for s in os.environ.get('SIZES', '820x1180,1180x820').split(',')]
ONLY = os.environ.get('ONLY', 'seat,hold,reuse,tabs').split(',')
SHOTS = os.environ.get('SHOTS', '')
SKIP = "localStorage.getItem('cozy-whatsnew') || localStorage.setItem('cozy-whatsnew','999')"

KINDS = """() => { const NOT=/crib|bassinet|high-?chair|cat-bed|pet-bed|dog-bed|kennel|ottoman|window-seat/;
 const lie=k=>k==='bed'||/bunk/.test(k)||/daybed/.test(k)||/(^|[-_:])bed$/.test(k);
 const seat=k=>{k=k.toLowerCase(); if(NOT.test(k))return null; if(lie(k))return 'lie'; if(/sofa|couch|loveseat|armchair|bench|stool|rocker|chair/.test(k))return 'sit'; return null;};
 return Object.entries(__items).filter(([k])=>k.startsWith('pack:')).map(([k,v])=>({kind:k, holdable:!!v.holdable, seat:seat(k), img:v.img||''})); }"""
FR = """(k)=>{k=k.toLowerCase(); if(/sofa|couch|loveseat/.test(k))return [[-0.18,-0.33],[0.18,-0.33]]; if(/armchair/.test(k))return [[0,-0.32]]; if(/bench/.test(k))return [[-0.22,-0.30],[0.22,-0.30]]; if(/stool|rocker/.test(k))return [[0,-0.38]]; return [[0,-0.48]];}"""
KID = "{skin:'#c9956c',hair:'#2b1d16',hairStyle:1,shirt:'#5aa9e6',pants:'#ff7aa8',size:'kid',acc:0,flip:false,held:{left:null,right:null}}"
CLEAR = "const s=__store,room='living'; if(s.get().currentRoom!==room) s.dispatch({type:'room/switch',room}); s.get().rooms[room].items.slice().forEach(i=>s.dispatch({type:'item/delete',room,id:i.id})); s.get().characters.slice().forEach(c=>s.dispatch({type:'char/delete',id:c.id}));"
SEAT = """({kind,pose,fr,uid}) => { """ + CLEAR + """
 const x=900,y=560,b=__lie.box(kind),iid='s'+uid; s.dispatch({type:'item/add',room,item:{id:iid,kind,x,y,flip:false,z:40,scale:1}});
 let A=[]; if(pose==='lie'){const art=__lie.bedArt(kind); if(art){const h=__lie.lieOffset('head',false); A=[[x+(art.head.x-0.5)*b.w-h.x,y+(art.head.y-1)*b.h-h.y]];}} else A=fr.map(([dx,dy])=>[x+dx*b.w,y+dy*b.h]);
 A.forEach(([ax,ay],n)=>{const id='c'+uid+'_'+n; s.dispatch({type:'char/add',char:{...""" + KID + """,room,id,x:ax,y:ay}}); s.dispatch({type:'char/move',id,room,x:ax,y:ay,seat:{item:iid,pose,n}});});
 const vw=parseFloat(document.querySelector('.stage')?.style.width)||1000; try{__cam.set(x-vw/2);}catch(e){} return iid; }"""
HOLD = """({kind,cid,iid}) => { """ + CLEAR + """
 s.dispatch({type:'char/add',char:{...""" + KID + """,room,id:cid,x:900,y:600}});
 s.dispatch({type:'item/add',room,item:{id:iid,kind,x:900,y:600,flip:false,z:40,scale:1}}); s.dispatch({type:'char/hold',id:cid,hand:'right',room,itemId:iid});
 const vw=parseFloat(document.querySelector('.stage')?.style.width)||1000; try{__cam.set(900-vw/2);}catch(e){} return !!s.get().characters.find(c=>c.id===cid)?.held.right; }"""
# what an element draws: painted / vector, plus the painting's kind
ART = """(sel)=>{const e=document.querySelector(sel); if(!e) return null; const svg=e.querySelectorAll('svg').length; const im=[...e.querySelectorAll('img')];
 return {svg, vec: im.filter(i=>/\\.svg(\\?|$)/.test(i.getAttribute('src')||'')).length, art: im.filter(i=>i.classList.contains('artimg')).map(i=>[i.dataset.kind||'', i.getAttribute('src')||''])}; }"""
ITEMPAINTED = """(id)=>!!document.querySelector('.item[data-id="'+id+'"] .inner img.artimg')"""

def painted(a, kind=None):
    return bool(a) and a['svg'] == 0 and a['vec'] == 0 and len(a['art']) > 0 and (kind is None or all(k == kind for k, _ in a['art']))

async def wait_item(pg, iid, ms=8000):
    for _ in range(ms // 100):
        if await pg.evaluate(ITEMPAINTED, iid): return True
        await pg.wait_for_timeout(100)
    return False

async def main():
    res = {'pass': 0, 'fail': 0, 'skip': 0}; fails = []
    def rec(ok, name, info=''):
        res['pass' if ok else 'fail'] += 1
        print(('PASS ' if ok else 'FAIL ') + name + ('' if ok else ' ' + json.dumps(info)[:300]), flush=True)
        if not ok: fails.append(name)
    async with async_playwright() as p:
        b = await p.webkit.launch()
        for w, h in SIZES:
            tag = f'{w}x{h}'
            async def page():
                ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, service_workers='block')
                await ctx.add_init_script(SKIP); pg = await ctx.new_page(); errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
                await pg.goto(URL); await pg.wait_for_selector('#stage', timeout=20000); await pg.wait_for_timeout(1500)
                await pg.evaluate("()=>{document.querySelector('#phoneOk')?.click(); document.querySelector('#wnGo')?.click(); if(window.__sky){__sky.setChoice?.('day');}}")
                await pg.click('#modePlay', force=True); await pg.wait_for_timeout(300)
                return ctx, pg, errs
            ctx, pg, errs = await page()
            kinds = await pg.evaluate(KINDS)
            uid = 0
            if 'seat' in ONLY:
                for k in [k for k in kinds if k['seat']]:
                    uid += 1
                    fr = await pg.evaluate(FR, k['kind'])
                    iid = await pg.evaluate(SEAT, {'kind': k['kind'], 'pose': k['seat'], 'fr': fr, 'uid': uid})
                    await pg.wait_for_timeout(50)
                    if not await pg.evaluate("(id)=>!!document.querySelector('.seatFront[data-id=\"'+id+'\"]')", iid):
                        res['skip'] += 1; continue          # no front layer for this kind (A-13, out of scope)
                    if not await wait_item(pg, iid):
                        res['skip'] += 1; continue          # no painting for this kind
                    await pg.wait_for_timeout(800)
                    a = await pg.evaluate(ART, f'.seatFront[data-id="{iid}"] .inner')
                    rec(painted(a, k['kind']), f'{tag} cold-sit front painted {k["kind"]} ({k["seat"]})', a)
                    if SHOTS and k['kind'] == 'pack:cream-sofa':
                        await pg.screenshot(path=f'{SHOTS}__cold-sit-sofa__{tag}.png')
            if 'hold' in ONLY:
                for k in [k for k in kinds if k['holdable']]:
                    uid += 1; iid = 'i' + str(uid)
                    if not await pg.evaluate(HOLD, {'kind': k['kind'], 'cid': 'h' + str(uid), 'iid': iid}):
                        rec(False, f'{tag} hold {k["kind"]}', 'not held'); continue
                    # the held item left the room, so its painting is known once the URL exists: wait for any artimg
                    ok = False
                    for _ in range(80):
                        a = await pg.evaluate(ART, '.char .held')
                        if painted(a, k['kind']): ok = True; break
                        await pg.wait_for_timeout(100)
                    if not ok:  # is there a painting at all? place a copy and see
                        await pg.evaluate("(k)=>{const s=__store; s.dispatch({type:'item/add',room:'living',item:{id:'probe'+k,kind:k,x:600,y:600,flip:false,z:41,scale:1}});}", k['kind'])
                        if not await wait_item(pg, 'probe' + k['kind'], 3000): res['skip'] += 1; continue
                        await pg.wait_for_timeout(600); a = await pg.evaluate(ART, '.char .held'); ok = painted(a, k['kind'])
                    rec(ok, f'{tag} cold-hold painted {k["kind"]}', a)
                    if SHOTS and k['kind'] == 'pack:globe':
                        await pg.screenshot(path=f'{SHOTS}__hold-globe-cold__{tag}.png')
                if SHOTS:  # warm re-hold of the globe on a page where it is cached
                    await pg.evaluate(HOLD, {'kind': 'pack:globe', 'cid': 'hw', 'iid': 'iw'}); await pg.wait_for_timeout(1500)
                    await pg.screenshot(path=f'{SHOTS}__hold-globe-warm__{tag}.png')
            await ctx.close()
            if 'reuse' in ONLY:  # A-03: same char id and item id, re-added holding another kind
                ctx, pg, errs2 = await page()
                seq = ['pack:toy-car', 'pack:dino-plush', 'pack:globe', 'pack:toy-car']
                for n, kind in enumerate(seq):
                    await pg.evaluate(HOLD, {'kind': kind, 'cid': 'qh', 'iid': f'qa-h{n}'})
                    ok = False
                    for _ in range(60):
                        a = await pg.evaluate(ART, '.char .held')
                        if painted(a, kind): ok = True; break
                        await pg.wait_for_timeout(100)
                    rec(ok, f'{tag} reuse id #{n} holds {kind}', a)
                errs += errs2; await ctx.close()
            if 'tabs' in ONLY:
                ctx, pg, errs3 = await page()
                for room, want in [('backyard', []), ('living', ['living']), ('backyard', []), ('kitchen', ['kitchen'])]:
                    await pg.evaluate("(r)=>__store.dispatch({type:'room/switch',room:r})", room); await pg.wait_for_timeout(500)
                    on = await pg.evaluate("()=>[...document.querySelectorAll('#tabs .tab.on')].map(t=>t.dataset.room)")
                    rec(on == want, f'{tag} tab highlight in {room} = {want}', on)
                    if SHOTS and room == 'backyard' and not os.path.exists(f'{SHOTS}__backyard-tabs__{tag}.png'):
                        await pg.screenshot(path=f'{SHOTS}__backyard-tabs__{tag}.png')
                errs += errs3; await ctx.close()
            rec(not errs, f'{tag} no page errors', errs)
        await b.close()
    print(f"RESULT pass={res['pass']} fail={res['fail']} skip={res['skip']}")
    if fails: print('FAILED:', *fails, sep='\n  ')
    sys.exit(1 if res['fail'] else 0)

asyncio.run(main())
