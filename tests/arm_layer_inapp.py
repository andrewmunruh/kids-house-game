"""In-app arm-layer shots: builder (every item), Play + Decorate (every pose), Photo Booth card, 4 sizes, WebKit + Chromium.
usage: arm_layer_inapp.py WEB_URL OUT_DIR   (WEB_URL like http://localhost:6142/kids-house-game/)"""
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, tap
WEB, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
SIZES = [(820, 1180), (1180, 820), (844, 390), (390, 844)]
TOPS = ['classic', 'stripes', 'hoodie', 'sweater', 'tank', 'puff', 'ruffle', 'button', 'jersey', 'cardigan', 'bib', 'raincoat']
DRESSES = ['twirl', 'sundress', 'party', 'pinafore', 'jumper', 'ballet', 'nightgown', 'raindress']
BOTTOMS = ['pants', 'jeans', 'shorts', 'skirt', 'tutu', 'leggings', 'overalls', 'joggers']
# pose -> classes on the .char (real game CSS does the swing)
POSES = [('idle', ''), ('walk', 'chibi-move'), ('sit', 'pose-sit'), ('lie', 'pose-lie'), ('dance', 'chibi-move amb-dance'), ('wave', 'chibi-move amb-hug'), ('warm', 'chibi-move amb-warm')]
LOOKS = ['hoodie', 'classic', 'sweater', 'puff', 'tank', 'raincoat', 'stripes']
ADD = """(arg) => { const [poses, looks] = arg; const s = __store, st = s.get(), room = st.currentRoom;
  st.characters.forEach(c => s.dispatch({type:'char/delete', id:c.id}));
  poses.forEach((p, i) => s.dispatch({type:'char/add', char:{skin:'#c9956c', hair:'#2b1d16', hairStyle:1, shirt:'#5aa9e6', pants:'#ff7aa8', size:'kid', acc:0, flip:false,
    held:{left:null, right:null}, room, id:'al' + i, x: 260 + i * 120, y: 560,
    look2:{skin:'#c9956c', hair:'buns', hairC:'#5b3a29', eye:'round', eyeC:'#5a321c', top: looks[i % looks.length], topC:'#5aa9e6', bottom:'pants', bottomC:'#ff7aa8', dress:'', dressC:'#c9a0dc', shoes:'sneakers', shoesC:'#ffffff', acc:'', accC:'#ff7aa8'}}}));
  try { __cam.set(150); } catch (e) {} }"""
POSE = """(poses) => { poses.forEach(([n, cls], i) => { const el = document.querySelector('.char[data-cid="al' + i + '"]'); if (!el) return;
  el.classList.remove('chibi-move','pose-sit','pose-lie','amb-dance','amb-hug','amb-warm'); if (cls) cls.split(' ').forEach(c => el.classList.add(c)); });
  return document.querySelectorAll('.char[data-cid^="al"]').length; }"""
PEAK = "() => { document.getAnimations().forEach(a => { try { a.pause(); const d = a.effect.getTiming().duration; a.currentTime = (typeof d === 'number' ? d : 760) * 0.999; } catch (e) {} }); }"

async def ok_tip(pg):
    b = pg.locator('button:has-text("OK")')
    if await b.count() and await b.first.is_visible(): await b.first.click(); await pg.wait_for_timeout(200)

async def run(p, eng):
    b = await getattr(p, eng).launch()
    for (w, h) in SIZES:
        tag = f'{eng}_{w}x{h}'
        c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
        await c.add_init_script(SKIP_WN); pg = await c.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(WEB); await pg.wait_for_selector('#stage'); await pg.wait_for_timeout(700); await ok_tip(pg)
        n = await pg.evaluate(ADD, [POSES, LOOKS]); await pg.wait_for_timeout(400)
        for mode in ('Decorate', 'Play'):
            await pg.click(f'#mode{mode}'); await pg.wait_for_timeout(400)
            cnt = await pg.evaluate(POSE, POSES); await pg.wait_for_timeout(250); await pg.evaluate(PEAK); await pg.wait_for_timeout(100)
            await pg.screenshot(path=f'{OUT}/{tag}_{mode.lower()}_poses.png')
        # Photo Booth card (Play)
        try:
            await tap(pg, '#btnPhoto'); await pg.wait_for_selector('.pbCard', timeout=6000); await pg.wait_for_timeout(600)
            await pg.locator('.pbCard').screenshot(path=f'{OUT}/{tag}_photobooth.png'); await pg.click('.pbClose'); await pg.wait_for_timeout(300)
        except Exception as e: print(tag, 'photobooth', e)
        # Builder: Characters sheet on the first kid, walk swing paused at its peak
        await pg.evaluate(POSE, [(n0, '') for n0, _ in POSES])
        await pg.click('.char[data-cid="al0"]', force=True); await pg.wait_for_timeout(300)
        if not await pg.locator('#sheet:not(.hidden) .avStage').count():
            await tap(pg, '#btnDress'); await pg.wait_for_timeout(400)
        await pg.evaluate(PEAK); await pg.screenshot(path=f'{OUT}/{tag}_builder.png')
        if (w, h) == (820, 1180):
            tabs = await pg.evaluate("() => [...document.querySelectorAll('[data-act=av-tab]')].map(b => b.dataset.v)")
            for t in tabs:
                await pg.click(f'[data-act="av-tab"][data-v="{t}"]'); await pg.wait_for_timeout(150)
                acts = await pg.evaluate("() => [...document.querySelectorAll('[data-act=av-top],[data-act=av-dress],[data-act=av-bottom],[data-act=av-costume]')].map(b => [b.dataset.act, b.dataset.v])")
                for act, v in acts:
                    if act == 'av-dress' and not v: continue
                    await pg.click(f'[data-act="{act}"][data-v="{v}"]'); await pg.wait_for_timeout(120); await pg.evaluate(PEAK)
                    await pg.locator('#sheet .avStage').screenshot(path=f'{OUT}/{eng}_item_{act[3:]}_{v or "none"}.png')
                    if act == 'av-dress': await pg.click('[data-act="av-dress"][data-v=""]'); await pg.wait_for_timeout(80)
                    if act == 'av-costume': await pg.click('[data-act="av-costume"][data-v=""]'); await pg.wait_for_timeout(80)
        print(tag, 'kids', n, 'errors', len(errs), errs[:2]); await c.close()
    await b.close()

async def main():
    async with async_playwright() as p:
        for eng in ('webkit', 'chromium'): await run(p, eng)
asyncio.run(main())
