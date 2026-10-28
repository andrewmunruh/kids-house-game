#!/usr/bin/env python3
"""Paint an OUTDOOR / big scene (ranch, barn, ...) straight ON its vector guide render, so nothing can drift.

usage: scene_paint_guide.py RECIPE.json [--attempt A]
The guide (scripts/scene_guide.py, 2x, ?art=v1, faces removed) gives every shape, edge and line at
its exact pixel. This script never moves a pixel of geometry; it only re-paints colour and texture:
  1. whole palette one step darker in the same hue (Lab L* - dL), so painted items still pop;
  2. region textures (AI gouache sky / grass / wood / straw, GenerateImage) laid in as Lab detail
     (texture minus its own mean) inside colour-matched masks of the guide, tiled horizontally seamless;
  3. paper grain everywhere; soft contact shade down-right of every plum line (light from upper left);
  4. smooth top light, fine grain; opaque WebP <= max_kb (quality search 86 -> 22).
RECIPE keys: guide, out, dL, paper_k, ao, light, grain, max_kb, regions: [{tex, match: [hex..],
  tol, y0, y1 (logical), k, tile_w (logical px per texture width), chroma}], attempts: {A: {...overrides}}
"""
import json, sys, os, io
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
S = 2
INK = np.array([0x5a, 0x3d, 0x5c], float)

def hexrgb(h): h = h.lstrip('#'); return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], float)
def rgb2lab(a):
    a = a / 255.0; a = np.where(a > 0.04045, ((a + 0.055) / 1.055) ** 2.4, a / 12.92)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = a @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)
def lab2rgb(l):
    fy = (l[..., 0] + 16) / 116; fx = fy + l[..., 1] / 500; fz = fy - l[..., 2] / 200
    f = np.stack([fx, fy, fz], -1)
    xyz = np.where(f ** 3 > 0.008856, f ** 3, (f - 16 / 116) / 7.787) * np.array([0.95047, 1.0, 1.08883])
    M = np.array([[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]])
    a = xyz @ M.T; a = np.where(a > 0.0031308, 1.055 * np.clip(a, 0, None) ** (1 / 2.4) - 0.055, 12.92 * a)
    return np.clip(a * 255, 0, 255)

def seamless_h(img, frac=0.12):
    w, h = img.size; b = max(8, int(w * frac)); a = np.asarray(img, float); core = a[:, :w - b].copy()
    ramp = np.linspace(0, 1, b)[None, :, None]; core[:, :b] = a[:, w - b:] * (1 - ramp) + a[:, :b] * ramp
    return Image.fromarray(core.astype(np.uint8))
def flatten(img):
    w, h = img.size; a = np.asarray(img, float); b = np.asarray(img.filter(ImageFilter.GaussianBlur(max(w, h) / 10)), float)
    return Image.fromarray(np.clip(a / np.maximum(b, 1) * a.reshape(-1, 3).mean(0), 0, 255).astype(np.uint8))
BLUR = [0.0]
def tex_detail(path, W, H, tile_w):
    """Lab detail (texture - its mean), tiled seamlessly across W x H; softened by BLUR px (keeps WebP small)."""
    t = seamless_h(flatten(Image.open(path).convert('RGB')))
    t = seamless_h(t.transpose(Image.Transpose.TRANSPOSE)).transpose(Image.Transpose.TRANSPOSE)  # vertical seam too
    if BLUR[0]: t = t.filter(ImageFilter.GaussianBlur(BLUR[0]))
    sc = tile_w / t.width; t = t.resize((max(1, round(t.width * sc)), max(1, round(t.height * sc))), Image.LANCZOS)
    out = Image.new('RGB', (W, H))
    for x in range(0, W, t.width):
        for y in range(0, H, t.height): out.paste(t, (x, y))
    lab = rgb2lab(np.asarray(out, float)); return lab - lab.reshape(-1, 3).mean(0)

def run(R, base, over):
    R = {**R, **over}
    BLUR[0] = R.get('detail_blur', 0)
    P = lambda p: os.path.join(base, p)
    G = np.asarray(Image.open(P(R['guide'])).convert('RGB'), float); H, W = G.shape[:2]
    lab = rgb2lab(G)
    ink = (np.abs(G - INK).sum(-1) < R.get('ink_tol', 70))
    yy = np.arange(H)[:, None] / S
    for rg in R.get('regions', []):
        m = np.zeros((H, W), bool)
        for hx in rg['match']: m |= np.abs(G - hexrgb(hx)).sum(-1) < rg.get('tol', 30)
        for hx in rg.get('exclude', []): m &= np.abs(G - hexrgb(hx)).sum(-1) >= 12
        if 'y0' in rg: m &= yy >= rg['y0']
        if 'y1' in rg: m &= yy < rg['y1']
        mf = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)), float) / 255 * rg.get('k', 1)
        d = tex_detail(P(rg['tex']), W, H, rg.get('tile_w', 600) * S)
        d[..., 1:] *= rg.get('chroma', 0.6)
        lab += d * mf[..., None]
    if R.get('paper_k'):
        d = tex_detail(P(R['paper']), W, H, R.get('paper_tile_w', 900) * S); lab += d * R['paper_k']
    if R.get('brush_k'):  # procedural gouache dabs: oriented blurred noise, no AI texture
        rng = np.random.default_rng(R.get('seed', 3)); n = rng.normal(0, 1, (H // 4, W // 4))
        n = np.asarray(Image.fromarray(((n * 40) + 128).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC).filter(ImageFilter.BoxBlur(3)), float)
        lab[..., 0] += (n - 128) / 40 * R['brush_k']
    lab[..., 0] -= R.get('dL', 5) * (~ink)          # one step darker, ink untouched
    lab[..., 1:] *= np.where(ink, 1, R.get('chroma_mul', 1.0))[..., None]
    out = lab2rgb(lab)
    if R.get('edge_k'):  # watercolour edge darkening at colour boundaries (not on ink)
        L = Image.fromarray(G.mean(-1).astype(np.uint8)); e = np.asarray(L.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(2.5)), float) / 255
        out *= (1 - np.clip(e * R['edge_k'], 0, .25) * (~ink))[..., None]
    if R.get('ao'):  # contact shade down-right of plum lines (light from upper left)
        a = Image.fromarray((ink * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6 * S / 2))
        a = np.roll(np.roll(np.asarray(a, float) / 255, 4 * S // 2, 0), 3 * S // 2, 1)
        out *= (1 - R['ao'] * a * (~ink))[..., None]
    lx = np.arange(W)[None, :] / W; ly = yy / (H / S)
    vw = R.get('view_w', 1180) * S
    lit = 1 + R.get('light', .06) * (0.5 - ly) + R.get('light', .06) * 0.3 * np.cos(np.arange(W)[None, :] / vw * np.pi * 2)
    out = out * lit[..., None]
    rng = np.random.default_rng(7); g = np.asarray(Image.fromarray(rng.normal(128, 40, (H, W)).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0)), float)
    out += ((g - 128) / 40 * R.get('grain', 2))[..., None]
    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    mk = R.get('max_kb', 150)
    for q in range(86, 20, -4):
        b = io.BytesIO(); img.save(b, 'WEBP', quality=q, method=6)
        if b.tell() <= mk * 1024: break
    else: raise SystemExit('cannot fit')
    return img, b.getvalue(), q

def main():
    rp = sys.argv[1]; base = os.path.dirname(os.path.abspath(rp)); R = json.load(open(rp))
    att = sys.argv[sys.argv.index('--attempt') + 1] if '--attempt' in sys.argv else R.get('pick', 'A')
    img, data, q = run({k: v for k, v in R.items() if k != 'attempts'}, base, R.get('attempts', {}).get(att, {}))
    out = sys.argv[sys.argv.index('--out') + 1] if '--out' in sys.argv else os.path.join(base, R['out'])
    open(out, 'wb').write(data)
    print(json.dumps({'out': out, 'attempt': att, 'size': list(img.size), 'bytes': len(data), 'quality': q}))
main()
