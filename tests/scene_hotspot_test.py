# Scene paintings must not drift from the vector scene they replace.
# For EVERY painted scene in assets/art/scene/:
#   1. render the vector (?art=v1) and read the live geometry (door, floor line, baseboard, eggs);
#   2. find those edges IN THE PAINTING itself (door frame left/right/top, baseboard ink line) and
#      fail if any is more than TOL px (2x) away from the vector;
#   3. with the painting shown, the door tap box and every egg hotspot are where the vector put
#      them, and the point under each one's centre still hits it (the painting never eats taps).
# Then, with the painting present, tap the living-room door (to the backyard and back) and every
# place on the map (park, ranch, barn door, clubhouse, home) and check each one opens.
# ?art=v1 must show the vector scene (no painting).
# Town scenes (map, map-portrait, park): see town_scene() below.
# usage: python tests/scene_hotspot_test.py URL [scene ...]   (optional: only these scenes)
import asyncio, io, os, sys, importlib.util
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go, to_map

GEOM_JS = (ROOT / 'scripts' / 'scene_geom.js').read_text()
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:6400/kids-house-game/'
SEP = '&' if '?' in URL else '?'
SCENES = sorted(f.stem for f in (ROOT / 'assets' / 'art' / 'scene').glob('*.webp'))
if len(sys.argv) > 2: SCENES = [s for s in SCENES if s in sys.argv[2:]]
TOL = 4  # px at 2x = 2 logical px
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def lum(path):
    return Image.open(path).convert('L')

def col_profile(L, y0, y1):
    """Mean brightness of each column between rows y0..y1."""
    return list(L.crop((0, y0, L.width, y1)).resize((L.width, 1), Image.BOX).tobytes())

def row_profile(L, x0, x1):
    return list(L.crop((x0, 0, x1, L.height)).resize((1, L.height), Image.BOX).tobytes())

def edge_at(profile, want, search=24):
    """Index of the strongest step in a 1-D profile near `want`."""
    lo = max(0, want - search); hi = min(len(profile) - 1, want + search)
    return max(range(lo, hi), key=lambda i: abs(profile[i + 1] - profile[i]))

def paint_checks(scene, L, geom):
    S = L.width / geom['logical'][0]
    bx, by, bw, bh = geom['baseboard']
    y0 = round(by * S); band = 4 * round(S)
    rows = row_profile(L, 40, L.width - 40)
    cand = [(sum(rows[y:y + band]) / band, y) for y in range(y0 - 16, y0 + 17)]
    got = min(cand)[1]
    check(f'{scene}: baseboard ink line at y={y0}', abs(got - y0) <= TOL, f'(painted {got})')
    if geom.get('door'):
        dx, dy, dw, dh = [v * S for v in geom['door']]
        prof = col_profile(L, round(dy + dh * 0.3), round(dy + dh * 0.7))
        for nm, want in (('left', round(dx)), ('right', round(dx + dw))):
            e = edge_at(prof, want)
            check(f'{scene}: door {nm} edge at x={want}', abs(e - want) <= TOL, f'(painted {e})')
        e = edge_at(row_profile(L, round(dx + dw * 0.3), round(dx + dw * 0.7)), round(dy))
        check(f'{scene}: door top edge at y={round(dy)}', abs(e - round(dy)) <= TOL, f'(painted {e})')

HIT_JS = r"""() => {
  const out = [];
  const add = (name, el) => { if (!el || !el.offsetParent) return; const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const onScreen = x >= 0 && y >= 0 && x < innerWidth && y < innerHeight;
    const h = onScreen ? document.elementFromPoint(x, y) : null;
    // Off-screen (camera elsewhere): the box must still match; the painting's pointer-events:none covers taps.
    out.push({ name, box: [r.left, r.top, r.width, r.height].map(v => Math.round(v * 10) / 10), hit: onScreen ? (!!h && (h === el || el.contains(h))) : null }); };
  add('door', document.querySelector('#layer .yardDoor'));
  document.querySelectorAll('#world .eggspot').forEach(e => add('egg ' + e.dataset.egg, e));
  const img = document.querySelector('#sceneArt img.sceneArt');
  return { on: !!document.querySelector('#stage.sceneArtOn'), img: !!img && img.complete && img.naturalWidth > 0,
    passThrough: !img || getComputedStyle(img).pointerEvents === 'none', spots: out };
}"""

async def page(b, w, h, v1):
    phone = min(w, h) < 500
    ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=phone,
                              is_mobile=phone and b.browser_type.name == 'chromium')
    await ctx.add_init_script(SKIP_WN)
    pg = await ctx.new_page()
    await pg.goto(URL + (SEP + 'art=v1' if v1 else ''))
    await pg.wait_for_selector('#stage', timeout=15000)
    for sel in ('#phoneOk', '#wnGo'):
        loc = pg.locator(sel)
        if await loc.count() and await loc.is_visible(): await loc.click(force=True)
    return ctx, pg

async def tap_door(pg):
    """Tap the door where it is drawn (no scrolling), the way a finger would."""
    c = await pg.evaluate("""() => { const el = document.querySelector('#layer .yardDoor'); if (!el) return null;
      const r = el.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height * 0.6;
      const h = document.elementFromPoint(x, y); return { x, y, hit: !!h && (h === el || el.contains(h)) }; }""")
    if not c or not c['hit']: return False
    await pg.mouse.click(c['x'], c['y']); return True

async def to_room(pg, room):
    if room != 'living':
        await pg.evaluate("(r) => document.querySelector(`[data-room=\"${r}\"]`)?.click()", room)
    await pg.wait_for_timeout(700)


# ---- Town scenes (map, map-portrait, park): geometry adapter -------------------------------
# The painting fills the map card (.mapClip) or the park world. Drift check: the plum ink in the
# painting must line up with the ink of the live vector SVG (re-rendered at 2x) - best shift within
# TOL px - and a deliberately shifted painting (12/10 px) must fail it. Every map place, house,
# mailbox, knock pumpkin and park hotspot keeps the same box painted vs ?art=v1 and is tappable.
TOWN = {'map': ('#mapWorld .mapClip', (1180, 820)), 'map-portrait': ('#mapWorld .mapClip', (390, 844)), 'park': ('#parkWorld', (1180, 820))}
TOWN_HIT_JS = r"""([host, sel]) => {
  const h0 = document.querySelector(host); const img = h0 && h0.querySelector(':scope > img.sceneArt');
  const out = [...document.querySelectorAll(sel)].filter(e => e.offsetParent).map(el => { const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2; const on = x >= 0 && y >= 0 && x < innerWidth && y < innerHeight;
    const h = on ? document.elementFromPoint(x, y) : null;
    return { name: el.dataset.go || (el.dataset.mail && 'mail:' + el.dataset.mail) || (el.dataset.knock && 'knock:' + el.dataset.knock) || el.dataset.act || ('spot' + el.dataset.spot),
      box: [r.left, r.top, r.width, r.height].map(v => Math.round(v * 10) / 10), hit: on ? (!!h && (h === el || el.contains(h))) : null }; });
  return { on: !!h0 && h0.classList.contains('sceneArtOn'), img: !!img && !img.hidden && img.complete && img.naturalWidth > 0,
    passThrough: !img || getComputedStyle(img).pointerEvents === 'none', vector: !!h0 && !!h0.querySelector(':scope > svg'), spots: out };
}"""
TOWN_SEL = {'park': '#parkWorld .pspot', 'map': '#mapWorld [data-go], #mapWorld .mapMail, #mapWorld .mapKnock'}

def ink_mask(im):
    """Plum ink (#5a3d5c +-40 per channel) as an L mask at 1x."""
    r, g, b = im.convert('RGB').split()
    near = lambda c, v: c.point(lambda x: 255 if abs(x - v) < 40 else 0)
    m = ImageChops.multiply(ImageChops.multiply(near(r, 0x5a), near(g, 0x3d)), near(b, 0x5c))
    return m.resize((im.width // 2, im.height // 2), Image.BOX)

def best_shift(P, V, R=16):
    best = None
    for dy in range(-R, R + 1):
        for dx in range(-R, R + 1):
            sc = ImageStat.Stat(ImageChops.multiply(P, ImageChops.offset(V, dx, dy))).sum[0]
            if best is None or sc > best[0]: best = (sc, dx, dy)
    return best[1] * 2, best[2] * 2  # back to 2x px

async def vector_2x(b, geom):
    w, h = geom['logical']
    pg = await b.new_page(viewport={'width': int(w), 'height': int(h)}, device_scale_factor=2)
    await pg.set_content(f'<body style="margin:0"><div style="position:relative;width:{w}px;height:{h}px">{geom["svg"]}</div><style>svg{{position:absolute;inset:0;width:100%;height:100%;visibility:visible!important}}</style></body>')
    png = await pg.screenshot(clip={'x': 0, 'y': 0, 'width': w, 'height': h}); await pg.close()
    return Image.open(io.BytesIO(png))

async def town_paint_check(b, scene, geom):
    paint = Image.open(ROOT / 'assets' / 'art' / 'scene' / f'{scene}.webp').convert('RGB')
    vec = await vector_2x(b, geom)
    w, h = geom['logical']
    check(f'{scene}: painting is 2x the vector ({w}x{h})', paint.size == (round(w * 2), round(h * 2)), str(paint.size))
    if paint.size != vec.size: vec = vec.resize(paint.size)
    V = ink_mask(vec); dx, dy = best_shift(ink_mask(paint), V)
    check(f'{scene}: painted ink lines up with the vector', abs(dx) <= TOL and abs(dy) <= TOL, f'(best shift {dx},{dy} px at 2x)')
    moved = Image.new('RGB', paint.size); moved.paste(paint, (12, 10))
    mx, my = best_shift(ink_mask(moved), V)
    check(f'{scene}: drift detector catches a 12/10 px shift', abs(mx) > TOL or abs(my) > TOL, f'(found {mx},{my})')

async def town_open(pg, scene, fake=0):
    if scene == 'park':
        await go(pg, 'park')
    else:
        if not await pg.evaluate("() => { const m = document.getElementById('btnMap').getBoundingClientRect(); const h = document.elementFromPoint(m.left + m.width / 2, m.top + m.height / 2); return !!h && !!h.closest('#btnMap'); }"):
            await pg.evaluate("() => document.getElementById('btnMap').click()")
        await to_map(pg)
        if fake: await pg.evaluate('(n) => window.__mapFake(n)', fake); await pg.wait_for_timeout(400)

async def town_scene(b, bname, scene):
    host, (w, h) = TOWN[scene]
    sel = TOWN_SEL.get(scene, TOWN_SEL['map'])
    for fake in ((0,) if scene == 'park' else (0, 6, 12)):
        tag = f'[{bname}] {scene}' + (f' ({fake} houses)' if fake else '')
        ctx, pg = await page(b, w, h, True); await town_open(pg, scene, fake)
        geom = await pg.evaluate(GEOM_JS, scene)
        v1 = await pg.evaluate(TOWN_HIT_JS, [host, sel])
        check(f'{tag}: ?art=v1 shows the vector', not v1['on'] and not v1['img'] and v1['vector'])
        await ctx.close()
        if geom.get('missing'):
            check(f'{tag}: scene opened', False, 'host/svg missing (wrong layout for this viewport?)'); continue
        if bname == 'chromium' and not fake: await town_paint_check(b, scene, geom)
        ctx, pg = await page(b, w, h, False); await town_open(pg, scene, fake)
        try: await pg.wait_for_selector(host + '.sceneArtOn', timeout=8000)
        except Exception: pass
        pa = await pg.evaluate(TOWN_HIT_JS, [host, sel])
        check(f'{tag}: painting shown (vector kept underneath)', pa['on'] and pa['img'] and pa['vector'])
        check(f'{tag}: painting never takes taps (pointer-events none)', pa['passThrough'])
        vb = {}
        for s in v1['spots']: vb.setdefault(s['name'], []).append(s)
        for i, s in enumerate(pa['spots']):
            o = v1['spots'][i] if i < len(v1['spots']) else None
            same = o is not None and o['name'] == s['name'] and max(abs(a - c) for a, c in zip(s['box'], o['box'])) <= 0.5
            # A spot covered by another vector house in ?art=v1 too (crowded fake towns) is not the painting's doing.
            if o is not None and o['hit'] is False and s['hit'] is False: print(f'NOTE {tag}: {s["name"]} covered in ?art=v1 too (pre-existing overlap)')
            check(f'{tag}: {s["name"]} hotspot unchanged and tappable', same and (s['hit'] is not False or (o is not None and o['hit'] is False)), f"{s['box']} vs {o and o['box']}" + (' (off-screen)' if s['hit'] is None else ''))
        check(f'{tag}: same hotspot set', [s['name'] for s in v1['spots']] == [s['name'] for s in pa['spots']], str(len(pa['spots'])))
        # Real taps with the painting on screen.
        if scene == 'park':
            for act in ('slide', 'splash'):
                try: await pg.click(f'#parkWorld .pspot[data-act="{act}"]', timeout=4000); good = True
                except Exception: good = False
                check(f'{tag}: tap {act}', good)
            try:
                await pg.click('#parkWorld .pspot.gate', timeout=4000); await pg.wait_for_selector('body.view-map #mapWorld .mapSpot', timeout=8000); good = True
            except Exception: good = False
            check(f'{tag}: tap park gate back to the map', good)
        elif not fake:
            for place in ('park', 'ranch', 'barn', 'gameroom', 'home'):
                try:
                    await town_open(pg, scene)
                    await pg.wait_for_selector(host + '.sceneArtOn', timeout=8000)
                    await go(pg, place); good = True
                except Exception: good = False
                check(f'{tag}: map painted, tap {place}', good)
        await ctx.close()

async def main():
    check('at least one painted scene', len(SCENES) > 0, str(SCENES))
    async with async_playwright() as p:
        for bname in ('chromium', 'webkit'):
            b = await getattr(p, bname).launch()
            for scene in SCENES:
                if scene in TOWN:
                    await town_scene(b, bname, scene); continue
                if not scene.startswith('room-'):
                    check(f'[{bname}] {scene}: has a geometry adapter', False, 'add one to scene_hotspot_test.py (see SCENE_RECIPE.md)'); continue
                room = scene.split('-', 1)[1]
                ctx, pg = await page(b, 1180, 820, True); await to_room(pg, room)
                geom = await pg.evaluate(GEOM_JS, scene)
                v1 = await pg.evaluate(HIT_JS)
                check(f'[{bname}] {scene}: ?art=v1 shows the vector', not v1['on'] and not v1['img'])
                await ctx.close()
                if bname == 'chromium':
                    paint_checks(scene, lum(ROOT / 'assets' / 'art' / 'scene' / f'{scene}.webp'), geom)
                ctx, pg = await page(b, 1180, 820, False); await to_room(pg, room)
                try: await pg.wait_for_selector('#stage.sceneArtOn', timeout=8000)
                except Exception: pass
                pa = await pg.evaluate(HIT_JS)
                check(f'[{bname}] {scene}: painting shown', pa['on'] and pa['img'])
                check(f'[{bname}] {scene}: painting never takes taps (pointer-events none)', pa['passThrough'])
                vb = {s['name']: s for s in v1['spots']}
                for s in pa['spots']:
                    o = vb.get(s['name'])
                    same = o is not None and max(abs(a - c) for a, c in zip(s['box'], o['box'])) <= 0.5
                    check(f'[{bname}] {scene}: {s["name"]} hotspot unchanged and tappable', same and s['hit'] is not False, f"{s['box']} vs {o and o['box']}" + (' (off-screen)' if s['hit'] is None else ''))
                check(f'[{bname}] {scene}: same hotspot set', sorted(vb) == sorted(s['name'] for s in pa['spots']), str(sorted(vb)))
                await ctx.close()
            # Tap every door and map place with the living-room painting present.
            for w, h in ((820, 1180), (844, 390)):
                ctx, pg = await page(b, w, h, False)
                tag = f'[{bname} {w}x{h}]'
                try: await pg.wait_for_selector('#stage.sceneArtOn', timeout=8000)
                except Exception: pass
                check(f'{tag} living painted before taps', await pg.evaluate("() => !!document.querySelector('#stage.sceneArtOn')"))
                ok = await tap_door(pg)
                try: await pg.wait_for_selector('#stage.room-yard', timeout=6000)
                except Exception: ok = False
                check(f'{tag} living door opens the backyard', ok)
                await pg.wait_for_timeout(500)
                check(f'{tag} backyard shows no living painting', not await pg.evaluate("() => !!document.querySelector('#stage.sceneArtOn')"))
                ok = await tap_door(pg)
                if ok:
                    try: await pg.wait_for_selector('#stage.sceneArtOn:not(.room-yard)', timeout=8000)
                    except Exception: ok = False
                check(f'{tag} backyard door returns to the painted living room', ok)
                # At 820x1180 in desktop WebKit the stage already overlaps the Map button on base dda1839
                # too (same with ?art=v1), so open the map by its button's own click there.
                if not await pg.evaluate("() => { const m = document.getElementById('btnMap').getBoundingClientRect(); const h = document.elementFromPoint(m.left + m.width / 2, m.top + m.height / 2); return !!h && !!h.closest('#btnMap'); }"):
                    print(f'NOTE {tag} Map button covered by the stage (pre-existing on base)')
                    await pg.evaluate("() => document.getElementById('btnMap').click()")
                await to_map(pg)
                places = await pg.evaluate("() => [...new Set([...document.querySelectorAll('#mapWorld [data-go]')].map(e => e.dataset.go))]")
                check(f'{tag} map lists park, ranch, gameroom, home', all(x in places for x in ('park', 'ranch', 'gameroom', 'home')), str(places))
                for place in ('park', 'ranch', 'barn', 'gameroom', 'home'):
                    try:
                        await go(pg, place); good = True
                        if place == 'home':
                            await pg.wait_for_selector('#stage.sceneArtOn', timeout=8000)
                    except Exception as e:
                        good = False
                    check(f'{tag} tap {place}', good)
                await ctx.close()
            await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(bad)} passed, {len(bad)} failed')
    sys.exit(1 if bad else 0)

asyncio.run(main())
