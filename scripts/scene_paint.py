#!/usr/bin/env python3
"""Compose a ROOM-SHELL scene painting on the exact vector geometry (no drift by construction).

usage: scene_paint.py RECIPE.json
RECIPE keys (paths relative to the recipe file):
  geom        <scene>__geom.json from scripts/scene_guide.py (logical px)
  out         output .webp (opaque, 2x logical)
  wall        AI wall texture (flat, straight-on); wall_crop [x0,y0,x1,y1] optional
  wall_flatten/wall_blend  false/0 for a texture that already tiles at its pattern period
  wall_tile_h logical px of the wall that one texture tile height covers (default = wall height)
  wall_color  target mean colour (hex) — the room's vector wallpaper one step darker
  floor, floor_crop, floor_tile_w (logical px of one texture width), floor_color
  door        AI door painting on flat cream; fitted into geom.door exactly (optional)
  base        baseboard fill hex (default #fbefe4); ink #5b3d5c lines top+bottom (4 logical px)
  max_kb      size budget in decimal KB (default 150 = 150,000 B)
  preview     optional PNG path for a full-size review copy
Every texture is made horizontally seamless (edge crossfade) and tiled, recoloured to the
target mean in Lab, then lit softly from the upper left with a gentle vignette.
"""
import json, sys, os, io
import numpy as np
from PIL import Image, ImageFilter

S = 2  # output scale over logical px
INK = np.array([0x5b, 0x3d, 0x5c], float)

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

def recolor(img, target, keep=0.85):
    a = np.asarray(img.convert('RGB'), float); lab = rgb2lab(a)
    t = rgb2lab(hexrgb(target)[None, None, :])[0, 0]
    m = lab.reshape(-1, 3).mean(0)
    lab = (lab - m) * keep + t
    return Image.fromarray(lab2rgb(lab).astype(np.uint8))

def flatten(img, radius=None):
    """Remove low-frequency light falloff from a generated texture so tiles do not band."""
    w, h = img.size; r = radius or max(w, h) / 10
    a = np.asarray(img, float); b = np.asarray(img.filter(ImageFilter.GaussianBlur(r)), float)
    return Image.fromarray(np.clip(a / np.maximum(b, 1) * a.reshape(-1, 3).mean(0), 0, 255).astype(np.uint8))

def seamless_h(img, frac=0.12):
    w, h = img.size; b = max(8, int(w * frac))
    a = np.asarray(img, float); core = a[:, :w - b].copy()
    ramp = np.linspace(0, 1, b)[None, :, None]
    core[:, :b] = a[:, w - b:] * (1 - ramp) + a[:, :b] * ramp
    return Image.fromarray(core.astype(np.uint8))

def tile_fill(tex, W, H, tile_w=None, tile_h=None):
    tw, th = tex.size
    if tile_h: sc = tile_h / th
    elif tile_w: sc = tile_w / tw
    else: sc = H / th
    tex = tex.resize((max(1, round(tw * sc)), max(1, round(th * sc))), Image.LANCZOS)
    tw, th = tex.size
    out = Image.new('RGB', (W, H))
    y0 = max(0, (th - H) // 2)
    for x in range(0, W, tw):
        for y in range(-y0, H, th):
            out.paste(tex, (x, y))
    return out

def fit_door(path, w, h):
    im = Image.open(path).convert('RGB'); a = np.asarray(im, float)
    bg = np.median(np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)]), 0)
    diff = np.abs(a - bg).sum(-1) > 40
    ys, xs = np.where(diff)
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    crop = im.crop(box).resize((w, h), Image.LANCZOS)
    ca = np.asarray(crop, float); m = (np.abs(ca - bg).sum(-1) > 40).astype(float)
    mask = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
    return crop, mask

def light(img, strength=0.07, vign=0.06):
    W, H = img.size; a = np.asarray(img, float)
    yy, xx = np.mgrid[0:H, 0:W]
    # Soft light from above, a little warmer toward the upper left; smooth everywhere (no
    # per-view resets that would leave a seam).
    lx = xx / W; ly = yy / H
    lit = 1 + strength * (0.5 - ly) + strength * 0.25 * np.cos(lx * np.pi * 2.4)
    v = 1 - vign * (ly ** 2)
    return Image.fromarray(np.clip(a * (lit * v)[..., None], 0, 255).astype(np.uint8))

def grain(img, amt=4, seed=7):
    a = np.asarray(img, float); r = np.random.default_rng(seed)
    n = Image.fromarray((r.normal(128, 40, a.shape[:2])).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    n = (np.asarray(n, float) - 128) / 40 * amt
    return Image.fromarray(np.clip(a + n[..., None], 0, 255).astype(np.uint8))

def encode(img, max_kb):
    # Budget is decimal (max_kb * 1000 bytes, e.g. 150,000 B); step 1 so we stay as close to it as possible.
    for q in range(86, 20, -1):
        b = io.BytesIO(); img.save(b, 'WEBP', quality=q, method=6)
        if b.tell() <= max_kb * 1000: return b.getvalue(), q
    raise SystemExit(f'cannot fit {max_kb} KB')

def main():
    rp = sys.argv[1]; base = os.path.dirname(os.path.abspath(rp)); R = json.load(open(rp))
    P = lambda k: os.path.join(base, R[k])
    g = json.load(open(P('geom')))
    LW, LH = g['logical']; W, H = LW * S, LH * S
    wall_h = round(g['wall'][3] * S); floor_y = round(g['floor'][1] * S)
    canvas = Image.new('RGB', (W, H))
    wt = Image.open(P('wall')).convert('RGB')
    if R.get('wall_crop'): wt = wt.crop(tuple(R['wall_crop']))
    wt = flatten(recolor(wt, R['wall_color'], R.get('wall_keep', 0.85))) if R.get('wall_flatten', True) else recolor(wt, R['wall_color'], R.get('wall_keep', 0.85))
    if R.get('wall_blend', 0.12) > 0: wt = seamless_h(wt, R.get('wall_blend', 0.12))  # 0: texture already tiles exactly (pattern period)
    canvas.paste(tile_fill(wt, W, wall_h, tile_h=R.get('wall_tile_h', g['wall'][3]) * S), (0, 0))
    ft = Image.open(P('floor')).convert('RGB')
    if R.get('floor_crop'): ft = ft.crop(tuple(R['floor_crop']))
    ft = seamless_h(flatten(recolor(ft, R['floor_color'], R.get('floor_keep', 0.9))))
    fl = tile_fill(ft, W, H - floor_y, tile_w=R.get('floor_tile_w', 1000) * S)
    fa = np.asarray(fl, float); ramp = np.linspace(0.90, 1.0, 60 * S)[:, None, None]  # soft shade under the baseboard
    fa[:60 * S] *= ramp; canvas.paste(Image.fromarray(fa.astype(np.uint8)), (0, floor_y))
    canvas = grain(light(canvas, R.get('light', 0.07)), R.get('grain', 4))
    a = np.asarray(canvas, float).copy()
    bx, by, bw, bh = [v * S for v in g['baseboard']]; by, bh = round(by), round(bh)
    a[by:by + bh] = hexrgb(R.get('base', '#fbefe4'))
    a[by:by + bh] *= np.linspace(1.0, 0.94, bh)[:, None, None]
    line = 4 * S
    for y0 in (by, by + bh - line):
        a[y0:y0 + line] = INK
    a[by + line:by + line + S] = np.minimum(255, a[by + line:by + line + S] + 10)  # cream highlight under the top line
    canvas = grain(Image.fromarray(a.astype(np.uint8)), 2, seed=11)
    if R.get('door') and g.get('door'):
        dx, dy, dw, dh = [round(v * S) for v in g['door']]
        door, mask = fit_door(P('door'), dw, dh)
        canvas.paste(door, (dx, dy), mask)
    data, q = encode(canvas, R.get('max_kb', 150))
    out = P('out'); open(out, 'wb').write(data)
    if R.get('preview'): canvas.save(P('preview'))  # optional full-size PNG for review
    print(json.dumps({'out': R['out'], 'size': [W, H], 'bytes': len(data), 'quality': q}))

main()
