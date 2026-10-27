"""Strict contract for Spooky Cute (Halloween) paintings.

Old fbd04db kinds stay on art_catalog_test's equality checks. These slugs are new,
so they are held to the shipped raster rules instead: exact 3x canvas, under 60KB,
one alpha island, and the plum contour. Patterns are 512 squares that tile.
"""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 60000
PLUM = np.array([91, 61, 92])
bad = []


def fail(msg):
    bad.append(msg)
    print('FAIL', msg)


man = json.load(open(os.path.join(ROOT, 'assets/items/manifest.json')))
items = [e for e in man if e.get('type') == 'item' and str(e.get('slug', '')).startswith('hw-')]
if len(items) != 11:
    fail(f'expected 11 halloween items, found {len(items)}')

for e in items:
    slug = e['slug']
    w = e['gameW']
    ratio = e['heightUnits'] / e['widthUnits']
    h = round(w * min(4, max(0.2, ratio)))
    tw, th = round(3 * w), round(3 * h)
    art = os.path.join(ROOT, 'assets/art/halloween', f'pack~{slug}.webp')
    pack = os.path.join(ROOT, 'assets/items/packs/halloween', f'{slug}.webp')
    if not os.path.exists(art) or not os.path.exists(pack):
        fail(f'{slug} missing webp')
        continue
    if open(art, 'rb').read() != open(pack, 'rb').read():
        fail(f'{slug} pack file differs from art file')
    if os.path.getsize(art) >= LIMIT:
        fail(f'{slug} {os.path.getsize(art)}B')
    im = np.array(Image.open(art).convert('RGBA'))
    if im.shape[1] != tw or im.shape[0] != th:
        fail(f'{slug} {im.shape[1]}x{im.shape[0]} wanted {tw}x{th}')
        continue
    a = im[..., 3]
    solid = a > 0
    lab, n = ndi.label(solid)
    if n:
        sizes = ndi.sum(solid, lab, range(1, n + 1))
        islands = int((sizes >= 64).sum())
        if islands != 1:
            fail(f'{slug} islands {islands}')
    d = ndi.distance_transform_edt(solid)
    band = (d >= 4) & (d <= 8) & (a > 180)
    if band.sum() < 40:
        fail(f'{slug} no plum band')
    else:
        dist = np.abs(im[..., :3][band].astype(int) - PLUM).max(1)
        if (dist < 36).mean() < 0.6:
            fail(f'{slug} plum {(dist < 36).mean():.2f}')
    # accidental pinholes: enclosed holes under 60px
    holes = ~solid
    hl, hn = ndi.label(holes)
    border = set(np.unique(np.concatenate([hl[0], hl[-1], hl[:, 0], hl[:, -1]])))
    pin = sum(int((hl == i).sum()) < 60 for i in range(1, hn + 1) if i not in border)
    if pin:
        fail(f'{slug} pinholes {pin}')
    # ink bounds: the alpha>0 box fills the canvas within 3% on each axis
    ys, xs = np.where(solid)
    iw, ih = (xs.max() - xs.min() + 1) / tw, (ys.max() - ys.min() + 1) / th
    if abs(iw - 1) > 0.03 or abs(ih - 1) > 0.03:
        fail(f'{slug} ink bounds {iw:.3f}x{ih:.3f}')

if bad:
    print(len(bad), 'failed')
    sys.exit(1)
print('halloween art ok', len(items), 'items')
