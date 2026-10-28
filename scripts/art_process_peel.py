# art_process.py with a per-asset PEEL option (Batch A backyard). Behaviour for any
# kind not listed in PEEL is identical to art_process.py.
# PEEL=kind[:extra],...  After the usual DEBAND, keep stripping silhouette rings that
# are >=PEEL_FRAC the generator's own border (dark plum line, or a low-saturation
# lavender halo), then erode `extra` raw px (default 2) so no part of the painter's
# border survives under the 9 px plum contour. Pink/rose paint (high saturation) is
# never peeled.
# usage: PEEL=a,b:3 python scripts/art_process_peel.py <items.json> <rawdir> <group> kind...
import os, sys
import numpy as np
from scipy import ndimage as ndi
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import art_process as ap

PEEL = {}
for tok in filter(None, os.environ.get('PEEL', '').split(',')):
    k, _, n = tok.partition(':')
    PEEL[k] = int(n or 2)
PEEL_FRAC = float(os.environ.get('PEEL_FRAC', '0.35'))
_cur = {'kind': None}
_deband = ap.deband


def border_px(rgb):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = rgb.mean(2)
    sat = rgb.max(2) - rgb.min(2)
    line = (lum < 150) & (b > g + 5) & (r > g + 5)
    halo = (lum >= 150) & (lum < 235) & (b > g + 8) & (r > g + 4) & (sat < 75)
    return line | halo


def peel(rgb, obj, max_px=40):
    obj = _deband(rgb, obj)
    bp = border_px(rgb)
    for _ in range(max_px):
        ring = obj & ~ndi.binary_erosion(obj)
        if bp[ring].mean() < PEEL_FRAC:
            break
        obj = obj & ~(ring & bp)
        obj = ndi.binary_opening(obj, iterations=1)
    n = PEEL[_cur['kind']]
    if n:
        obj = ndi.binary_erosion(obj, iterations=n)
    return obj


def deband(rgb, obj, max_px=40):
    return peel(rgb, obj, max_px) if _cur['kind'] in PEEL else _deband(rgb, obj, max_px)


ap.deband = deband

# SMOOTH=kind[:r],...  Morphological open (radius r, default 8 raw px) of the keyed
# silhouette, so jagged leaf tips are trimmed and the plum band follows a smooth edge.
SMOOTH = {}
for _t in filter(None, os.environ.get('SMOOTH', '').split(',')):
    _k, _, _r = _t.partition(':'); SMOOTH[_k] = int(_r or 8)
_key = ap.key
def key(rgb, see_through=False, band=False):
    out_rgb, solid, opening = _key(rgb, see_through, band)
    r = SMOOTH.get(_cur['kind'])
    if r:
        from scipy import ndimage as _ndi
        yy, xx = np.ogrid[-r:r + 1, -r:r + 1]
        disk = xx * xx + yy * yy <= r * r
        solid = _ndi.binary_closing(_ndi.binary_opening(solid, disk), disk) & solid | _ndi.binary_opening(solid, disk)
    return out_rgb, solid, opening
ap.key = key
_build = ap.build


def build(it, raw, group):
    _cur['kind'] = it['kind']
    if it['kind'] in PEEL:   # PEEL implies the deband path
        os.environ['DEBAND'] = ','.join(set(os.environ.get('DEBAND', '').split(',')) | {it['kind']})
    return _build(it, raw, group)


if __name__ == '__main__':
    import json
    items = {i['kind']: i for i in json.load(open(sys.argv[1]))}
    rawdir, group = sys.argv[2], sys.argv[3]
    for k in sys.argv[4:]:
        out, size, st = build(items[k], os.path.join(rawdir, k.replace(':', '~') + '.jpg'), group)
        print(f'{k} {size}B stretch {st:.2f}' + (' STRETCH' if abs(st - 1) > 0.18 else ''), flush=True)
