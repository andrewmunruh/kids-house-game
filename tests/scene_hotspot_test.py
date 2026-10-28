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
# usage: python tests/scene_hotspot_test.py URL
import asyncio, io, os, sys, importlib.util
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go, to_map

GEOM_JS = (ROOT / 'scripts' / 'scene_geom.js').read_text()
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:6400/kids-house-game/'
SEP = '&' if '?' in URL else '?'
SCENES = sorted(f.stem for f in (ROOT / 'assets' / 'art' / 'scene').glob('*.webp'))
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

# Negative self-check: SCENE_SHIFT=12 moves the painting 12 px right / 10 px down before the edge checks
# (every edge check must then FAIL; run it once by hand, see BATCHB_*_STATUS.md).
SHIFT = int(os.environ.get('SCENE_SHIFT', '0'))

def shifted(L):
    if not SHIFT: return L
    out = Image.new('L', L.size, 128); out.paste(L, (SHIFT, round(SHIFT * 10 / 12))); return out

def chroma(path):
    """Green-minus-blue: outdoors the sky and the far lawn have the same brightness but not the same hue."""
    r, g, b = Image.open(path).convert('RGB').split()
    from PIL import ImageChops
    return ImageChops.add(ImageChops.subtract(g, b, 1, 128), ImageChops.subtract(b, b))

def paint_checks(scene, L, geom, path=None):
    L = shifted(L)
    S = L.width / geom['logical'][0]
    if geom.get('baseboard'):
        bx, by, bw, bh = geom['baseboard']
        y0 = round(by * S); band = 4 * round(S)
        rows = row_profile(L, 40, L.width - 40)
        cand = [(sum(rows[y:y + band]) / band, y) for y in range(y0 - 16, y0 + 17)]
        got = min(cand)[1]
        check(f'{scene}: baseboard ink line at y={y0}', abs(got - y0) <= TOL, f'(painted {got})')
    for ln in geom.get('lines', []):
        # outdoor horizon / floor trim: the strongest horizontal step near the vector's line
        x0, x1 = [round(v * S) for v in ln.get('x', [20, geom['logical'][0] - 20])]
        y0 = round(ln['y'] * S)
        C = shifted(chroma(path)) if path and geom.get('baseboard') is None else L
        e = edge_at(row_profile(C, x0, x1), y0)
        check(f"{scene}: {ln['name']} at y={y0}", abs(e + 1 - y0) <= TOL, f'(painted {e + 1})')
    if geom.get('door'):
        dx, dy, dw, dh = [v * S for v in geom['door']]
        prof = col_profile(L, round(dy + dh * 0.3), round(dy + dh * 0.7))
        for nm, want in (('left', round(dx)), ('right', round(dx + dw))):
            e = edge_at(prof, want)
            check(f'{scene}: door {nm} edge at x={want}', abs(e - want) <= TOL, f'(painted {e})')
        # +-12: just past the frame's ink is the next strong step (the clubhouse door's MAP plate)
        e = edge_at(row_profile(L, round(dx + dw * 0.3), round(dx + dw * 0.7)), round(dy), 12)
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

CLUB_HIT_JS = r"""() => {
  const out = [];
  document.querySelectorAll('#grWorld .grDoor, #grWorld .grTable, #grWorld .grChair').forEach(el => { const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2, onScreen = x >= 0 && y >= 0 && x < innerWidth && y < innerHeight;
    const h = onScreen ? document.elementFromPoint(x, y) : null;
    out.push({ name: el.className + ' ' + (el.dataset.tb ?? '') + '/' + (el.dataset.seat ?? ''), box: [r.left, r.top, r.width, r.height].map(v => Math.round(v * 10) / 10), hit: onScreen ? (!!h && (h === el || el.contains(h))) : null }); });
  const img = document.querySelector('#grSceneArt img.sceneArt');
  return { on: !!document.querySelector('#grWorld.sceneArtOn'), img: !!img && img.complete && img.naturalWidth > 0 && !img.hidden,
    passThrough: !img || getComputedStyle(img).pointerEvents === 'none', spots: out };
}"""

# Geometry adapters for non-room scenes: how to get there, which hit list, which mark shows the painting.
async def enter(pg, scene):
    if scene.startswith('room-'): await to_room(pg, scene.split('-', 1)[1]); return HIT_JS, '#stage.sceneArtOn'
    if scene == 'backyard':
        await pg.wait_for_timeout(500)
        await pg.evaluate("""() => { const d = document.querySelector('#layer .yardDoor'), r = d.getBoundingClientRect();
          const o = { bubbles: true, button: 0, pointerId: 7, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
          d.dispatchEvent(new PointerEvent('pointerdown', o)); window.dispatchEvent(new PointerEvent('pointerup', o)); }""")
        await pg.wait_for_selector('#stage.room-yard', timeout=8000); await pg.wait_for_timeout(700)
        return HIT_JS, '#stage.sceneArtOn[data-scene-art="backyard"]'
    if scene == 'clubhouse':
        # WebKit 820x1180: the stage overlaps the Map button on base dda1839 too; open the map by its own click.
        await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
        await go(pg, 'gameroom'); return CLUB_HIT_JS, '#grWorld.sceneArtOn[data-scene-art="clubhouse"]'
    return None, None
ADAPTED = lambda scene: scene.startswith('room-') or scene in ('backyard', 'clubhouse')

async def main():
    check('at least one painted scene', len(SCENES) > 0, str(SCENES))
    async with async_playwright() as p:
        for bname in ('chromium', 'webkit'):
            b = await getattr(p, bname).launch()
            for scene in SCENES:
                if not ADAPTED(scene):
                    check(f'[{bname}] {scene}: has a geometry adapter', False, 'add one to scene_hotspot_test.py (see SCENE_RECIPE.md)'); continue
                ctx, pg = await page(b, 1180, 820, True); hit_js, mark = await enter(pg, scene)
                geom = await pg.evaluate(GEOM_JS, scene)
                v1 = await pg.evaluate(hit_js)
                check(f'[{bname}] {scene}: ?art=v1 shows the vector', not v1['on'] and not v1['img'])
                await ctx.close()
                if bname == 'chromium':
                    paint_checks(scene, lum(ROOT / 'assets' / 'art' / 'scene' / f'{scene}.webp'), geom, ROOT / 'assets' / 'art' / 'scene' / f'{scene}.webp')
                ctx, pg = await page(b, 1180, 820, False); await enter(pg, scene)
                try: await pg.wait_for_selector(mark, timeout=8000)
                except Exception: pass
                pa = await pg.evaluate(hit_js)
                if scene == 'backyard': pa['on'] = pa['on'] and await pg.evaluate("() => document.getElementById('stage').dataset.sceneArt === 'backyard'")
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
                check(f'{tag} backyard shows no living painting', await pg.evaluate("() => document.getElementById('stage').dataset.sceneArt !== 'room-living' && document.querySelectorAll('#sceneArt > img.sceneArt').length <= 1"))
                ok = await tap_door(pg)
                if ok:
                    try: await pg.wait_for_selector('#stage.sceneArtOn:not(.room-yard)', timeout=8000)
                    except Exception: ok = False
                check(f'{tag} backyard door returns to the painted living room', ok)
                # At 820x1180 in desktop WebKit the stage already overlaps the Map button on base dda1839
                # too (same with ?art=v1), so open the map by its button's own click there.
                if not await pg.evaluate("() => { const m = document.getElementById('btnMap').getBoundingClientRect(); const h = document.elementFromPoint(m.left + m.width / 2, m.top + m.height / 2); return !!h && !!h.closest('#btnMap'); }"):
                    print(f'NOTE {tag} Map button covered by the stage (pre-existing on base)')
                # Playwright's own hit test can still see the stage over the button edge in WebKit at
                # 820x1180 (same on base): open the map by the button's click either way; the places are what's tested.
                await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
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
                    if good and place == 'gameroom' and 'clubhouse' in SCENES:
                        try: await pg.wait_for_selector('#grWorld.sceneArtOn', timeout=8000)
                        except Exception: good = False
                    check(f'{tag} tap {place}', good)
                await ctx.close()
            await b.close()
    bad = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(bad)} passed, {len(bad)} failed')
    sys.exit(1 if bad else 0)

asyncio.run(main())
