#!/usr/bin/env python3
"""Tests for the measuring fixes in tests/b10_sprite_bounds.py and the pet refit table.

  1. FREEZE_CSS stops animation, so two captures of an animated SVG measure the same box
     (without it the spinning windmill sails moved the box between captures).
  2. pet_url() finds the dist's hashed pet sprite (assets/<id>-<hash>.webp) and doesn't
     take a longer id's file; without it the measured img 404'd and the box was empty.
  2b. the pet host sits on <body> (fixed), not in #layer where the stage clipped each pet's lower half.
  3. src/art/pet_fit.json only names real pet sprites, is scale-only near 1, and the harness
     applies it exactly as the game does (petFitStyle in src/art/sprites.ts).
Run: /workspace/.pwvenv/bin/python tests/b10_sprite_bounds_test.py   (chromium, ~5 s)
"""
import asyncio, json, os, re, sys, tempfile
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import b10_sprite_bounds as H
from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent
R = []
def check(name, ok, info=''):
  R.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + name + (f'  [{info}]' if info != '' else ''), flush=True)

# --- 2. hashed pet urls -------------------------------------------------------
with tempfile.TemporaryDirectory() as d:
  os.makedirs(os.path.join(d, 'assets'))
  for f in ('cat-tabby-sit-B7tDFMBk.webp', 'dog-pup-sit-C5m3xi_T.webp', 'dog-pup-sit-extra-Ab12Cd34.webp'):
    open(os.path.join(d, 'assets', f), 'w').close()
  check('pet_url: hashed cat sprite found', H.pet_url(d, 'cat-tabby-sit') == '/kids-house-game/assets/cat-tabby-sit-B7tDFMBk.webp', H.pet_url(d, 'cat-tabby-sit'))
  check('pet_url: a longer id with the same prefix is not taken', H.pet_url(d, 'dog-pup-sit') == '/kids-house-game/assets/dog-pup-sit-C5m3xi_T.webp', H.pet_url(d, 'dog-pup-sit'))
  check('pet_url: falls back to the source path when the dist has no file', H.pet_url(d, 'cat-calico-nap') == '/kids-house-game/assets/art/pets/cat-calico-nap.webp')

# --- 3. pet fit table -----------------------------------------------------------
fit = json.load(open(REPO / 'src/art/pet_fit.json'))
pets = {p.stem for p in (REPO / 'assets/art/pets').glob('*.webp')}
check('pet_fit: every entry is a shipped pet sprite', set(fit) <= pets, sorted(set(fit) - pets))
check('pet_fit: scale only, each axis within 0.95..1.10', all(len(v) == 2 and all(0.95 <= x <= 1.10 for x in v) for v in fit.values()), fit)
sprites_ts = (REPO / 'src/art/sprites.ts').read_text()
check('pet_fit: the game reads the same table (sprites.ts imports pet_fit.json, --fx/--fy)', "from './pet_fit.json'" in sprites_ts and '--fx:${f[0]};--fy:${f[1]}' in sprites_ts)
css = (REPO / 'src/style.css').read_text()
check('pet_fit: style.css scales img.petsprite by --fx/--fy from the bottom centre', re.search(r'img\.petsprite\s*\{\s*transform:\s*scale\(var\(--fx, 1\), var\(--fy, 1\)\);\s*transform-origin:\s*50% 100%', css) is not None)
k = next(iter(fit))
check('pet_fit: harness style matches the game', H.pet_fit_style(k) == f'--fx:{fit[k][0]};--fy:{fit[k][1]};' and H.pet_fit_style('no-such-pet') == '', H.pet_fit_style(k))

# --- 1. animation freeze --------------------------------------------------------
PAGE = """<style>body{margin:0;background:transparent} #m{position:absolute;left:100px;top:100px;width:200px;height:200px}
#s{transform-origin:100px 100px;animation:spin 1.3s linear infinite} @keyframes spin{to{transform:rotate(360deg)}}</style>
<svg id=m viewBox="0 0 200 200"><g id=s><rect x=95 y=10 width=10 height=90 fill=#000 /><rect x=100 y=95 width=90 height=10 fill=#000 /></g></svg>"""
async def freeze_case():
  async with async_playwright() as p:
    br = await p.chromium.launch(); out = {}
    for frozen in (False, True):
      pg = await br.new_page(viewport={'width': 400, 'height': 400})
      await pg.set_content(PAGE)
      if frozen: await pg.add_style_tag(content=H.FREEZE_CSS)
      boxes = []
      for _ in range(3):
        boxes.append(H.alpha_bbox(await pg.screenshot(clip={'x': 80, 'y': 80, 'width': 240, 'height': 240}, omit_background=True)))
        await pg.wait_for_timeout(330)
      out[frozen] = boxes; await pg.close()
    await br.close(); return out
b = asyncio.run(freeze_case())
check('freeze: without FREEZE_CSS the spinning sails move the measured box (the old bug)', len({json.dumps(x, sort_keys=True) for x in b[False]}) > 1, b[False])
check('freeze: with FREEZE_CSS every capture measures the same box', len({json.dumps(x, sort_keys=True) for x in b[True]}) == 1, b[True][0])
src = (REPO / 'tests/b10_sprite_bounds.py').read_text()
check('pet host: fixed box on <body>, not inside the clipped #layer', "position:fixed;left:300px;top:200px" in src and 'document.body.appendChild(host)' in src and "top:520px" not in src)
check('freeze: open_page injects FREEZE_CSS', 'add_style_tag(content=FREEZE_CSS)' in (REPO / 'tests/b10_sprite_bounds.py').read_text())

print(f'B10_SPRITE_BOUNDS_TEST: {sum(R)}/{len(R)} passed', flush=True)
sys.exit(0 if all(R) else 1)
