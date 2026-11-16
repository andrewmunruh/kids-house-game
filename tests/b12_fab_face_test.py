# Batch 12: the Art Studio "Paint" button must never sit on a doll's face.
# Nov 16 audit: on a phone at Rainbow Ranch (390x844) the Paint pill covered the doll's face, and in the
# Park it floated mid-scene. The button is meant for the house only (renderArtFab), so outdoors it has to
# be gone, and in the house it must not cover a face either.
# For each viewport and place: is the button showing, and does it overlap the head (top 45% of the doll's
# box) of any doll on screen? Writes a full shot and a 2x crop around the dolls' heads and the button.
# Usage: b12_fab_face_test.py URL BROWSER SHOTDIR LABEL
import sys, os, json
from PIL import Image
from playwright.sync_api import sync_playwright

URL, BN, SHOTS, LABEL = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
os.makedirs(SHOTS + '/crops', exist_ok=True)
VPS = [(390, 844), (375, 667), (430, 932), (844, 390), (820, 1180), (1024, 1366), (1366, 1024)]
PLACES = [('house', None), ('park', '.mapPark'), ('ranch', '.mapRanch'), ('clubhouse', '.mapClub')]
res = []; rows = []
def ok(name, cond, extra=''):
    res.append(bool(cond)); print(('PASS ' if cond else 'FAIL ') + name + (f'  [{extra}]' if extra else ''), flush=True)

MEASURE = r'''() => {
  const vis = e => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 4 && r.height > 4 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth; };
  const f = document.getElementById('artFab'); const fr = f.getBoundingClientRect();
  const fab = vis(f) ? { x: fr.left, y: fr.top, w: fr.width, h: fr.height } : null;
  const heads = [...document.querySelectorAll('.char, .savatar')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { cls: e.className.toString().split(' ').slice(0, 2).join('.'), x: r.left, y: r.top, w: r.width, h: r.height * 0.45 }; });
  const over = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return { fab, heads, cover: fab ? heads.map(h => Math.round(100 * over(fab, h) / (h.w * h.h))) : [], view: document.body.className };
}'''

with sync_playwright() as p:
    b = getattr(p, BN).launch()
    for w, h in VPS:
        vn = f'{w}x{h}'
        ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True,
                            is_mobile=(BN == 'chromium' and ((w < 900 and h < 900) or h < 500)), service_workers='block')
        ctx.route('**/*workers.dev*', lambda r: r.abort())
        pg = ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)[:160]))
        pg.goto(URL); pg.wait_for_selector('#stage'); pg.wait_for_timeout(1500)
        for s in ['#phoneOk', '#wnGo', '#phoneOk']:
            if pg.locator(s).count() and pg.locator(s).first.is_visible(): pg.locator(s).first.click(force=True); pg.wait_for_timeout(400)
        if pg.locator('#modePlay').count(): pg.locator('#modePlay').first.click(force=True); pg.wait_for_timeout(500)
        for place, sel in PLACES:
            if sel:
                pg.locator('#btnMap').first.click(force=True); pg.wait_for_timeout(900)
                if not pg.locator(sel).count():
                    ok(f'{BN} {vn} {place}: map spot found', False); continue
                pg.locator(sel).first.click(force=True); pg.wait_for_timeout(1800)
            m = pg.evaluate(MEASURE)
            full = f'{SHOTS}/{LABEL}_{BN}_{vn}_{place}.png'; pg.screenshot(path=full)
            # crop: union of the heads and the button (padded), at 2x
            boxes = [(hd['x'], hd['y'], hd['w'], hd['h'] / 0.45) for hd in m['heads']] + ([(m['fab']['x'], m['fab']['y'], m['fab']['w'], m['fab']['h'])] if m['fab'] else [])
            if boxes:
                x0 = max(0, min(bx[0] for bx in boxes) - 20); y0 = max(0, min(bx[1] for bx in boxes) - 20)
                x1 = min(w, max(bx[0] + bx[2] for bx in boxes) + 20); y1 = min(h, max(bx[1] + bx[3] for bx in boxes) + 20)
                if x1 - x0 > 8 and y1 - y0 > 8:
                    Image.open(full).crop((int(x0 * 2), int(y0 * 2), int(x1 * 2), int(y1 * 2))).save(f'{SHOTS}/crops/{LABEL}_{BN}_{vn}_{place}_crop.png')
            worst = max(m['cover'] or [0])
            rows.append({'vp': vn, 'place': place, 'fab': bool(m['fab']), 'face_cover_pct': worst, 'heads': len(m['heads'])})
            ok(f'{BN} {vn} {place}: no doll face under the Paint button', worst == 0, f"fab={'shown' if m['fab'] else 'hidden'} heads={len(m['heads'])} cover%={m['cover']}")
            if place != 'house':
                ok(f'{BN} {vn} {place}: Paint button is not shown outdoors', not m['fab'])
            else:
                ok(f'{BN} {vn} house: Paint button still offered in the house', bool(m['fab']))
        ok(f'{BN} {vn}: no page errors', not errs, str(errs[:2]))
        ctx.close()
    b.close()
json.dump(rows, open(f'{SHOTS}/{LABEL}_{BN}_fab_rows.json', 'w'), indent=1)
n = len(res); f = res.count(False)
print(f'B12_FAB_FACE {BN}: {n - f}/{n} passed' + (' (SOME FAILED)' if f else ' ALL OK'))
sys.exit(1 if f else 0)
