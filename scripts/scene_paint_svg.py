#!/usr/bin/env python3
"""Paint a NON-ROOM scene (backyard, clubhouse) from its vector layers (scripts/scene_layers.py).

usage: scene_paint_svg.py RECIPE.json
Each layer PNG is the vector part at its exact place (2x). Per layer the recipe gives:
  tex   gouache texture whose luminance detail is laid into the layer (AI, flat; optional)
  amt   strength of that detail in L* units (default 4)
  soft  blur radius (2x px) on the layer colour before texturing: flat vector fills become washes
  med   median filter size (odd) for a dabbed, hand-painted edge inside the shape (optional)
  prop  optional AI prop painting (on flat cream) fitted into this layer's alpha bbox instead
The whole scene is then shifted ONE STEP DARKER in Lab (dL, default -6), vector ink #5a3d5c lines
become plum #5b3d5c, soft upper-left light, fine grain; the door (geom.door) is fitted from an
AI door painting like the room pilot. Alpha (silhouettes) is never moved, so no edge drifts.
Keys: geom, layers_dir, scene, layers {name: {...}}, door, dL, light, grain, max_kb, out, preview.
"""
import json, sys, os
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location('sp', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'scene_paint_lib.py'))
sp = importlib.util.module_from_spec(spec); spec.loader.exec_module(sp)

def detail(tex_path, W, H, tile_w, dblur=3):
    t = Image.open(tex_path).convert('L')
    t = Image.fromarray(np.asarray(sp.seamless_h(t.convert('RGB')))).convert('L')
    sc = tile_w / t.width; t = t.resize((max(1, round(t.width * sc)), max(1, round(t.height * sc))), Image.LANCZOS)
    out = Image.new('L', (W, H))
    for x in range(0, W, t.width):
        for y in range(0, H, t.height): out.paste(t, (x, y))
    a = np.asarray(out, float); b = np.asarray(out.filter(ImageFilter.GaussianBlur(tile_w / 12)), float)
    d = a - b; d = d / max(d.std(), 1e-3)
    # low-pass: broad brush dabs, not pixel noise (keeps the WebP small)
    return np.asarray(Image.fromarray(np.clip(d * 32 + 128, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(dblur)), float) / 32 - 4

def main():
    rp = sys.argv[1]; base = os.path.dirname(os.path.abspath(rp)); R = json.load(open(rp))
    P = lambda v: os.path.join(base, v)
    g = json.load(open(P(R['geom']))); LW, LH = g['logical']; W, H = LW * 2, LH * 2
    canvas = np.zeros((H, W, 3), float); canvas[:] = sp.hexrgb(R.get('bg', '#f0d8c0'))
    for name, L in R['layers'].items():
        im = Image.open(P(f"{R['layers_dir']}/{R['scene']}__L_{name}.png")).convert('RGBA')
        a = np.asarray(im, float); al = a[..., 3:] / 255; rgb = a[..., :3]
        if L.get('prop'):
            ys, xs = np.where(al[..., 0] > 0.5); box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
            crop, mask = sp.fit_door(P(L['prop']), box[2] - box[0], box[3] - box[1])
            c = Image.fromarray(canvas.astype(np.uint8)); c.paste(crop, box[:2], mask); canvas = np.asarray(c, float); continue
        ink = (np.abs(rgb - sp.hexrgb('#5a3d5c')).sum(-1) < 60)[..., None]
        if L.get('soft'):
            pre = Image.fromarray(np.dstack([rgb * al, al * 255]).astype(np.uint8)[..., :3])
            bl = np.asarray(pre.filter(ImageFilter.GaussianBlur(L['soft'])), float)
            ba = np.asarray(Image.fromarray((al[..., 0] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(L['soft'])), float)[..., None] / 255
            soft = bl / np.maximum(ba, 1e-3)
            rgb = np.where(ink, rgb, soft * L.get('soft_mix', 1) + rgb * (1 - L.get('soft_mix', 1)))
        if L.get('med'):
            rgb = np.asarray(Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(L['med'])), float)
            rgb = np.where(ink, sp.hexrgb('#5a3d5c'), rgb)
        if L.get('tex'):
            lab = sp.rgb2lab(np.clip(rgb, 0, 255)); d = detail(P(L['tex']), W, H, L.get('tile_w', 1200), L.get('dblur', 3))
            lab[..., 0] += d * L.get('amt', 4) * (~ink[..., 0])
            rgb = sp.lab2rgb(lab)
        canvas = canvas * (1 - al) + rgb * al
    lab = sp.rgb2lab(canvas)
    ink = (np.abs(canvas - sp.hexrgb('#5a3d5c')).sum(-1) < 40)
    lab[..., 0] += R.get('dL', -6) * (~ink); lab[..., 1:] *= R.get('chroma', 1.04)
    canvas = sp.lab2rgb(lab); canvas[ink] = sp.INK
    img = sp.grain(sp.light(Image.fromarray(canvas.astype(np.uint8)), R.get('light', 0.07), R.get('vign', 0.04)), R.get('grain', 1))
    if R.get('door') and g.get('door'):
        dx, dy, dw, dh = [round(v * 2) for v in g['door']]
        door, mask = sp.fit_door(P(R['door']), dw, dh); img.paste(door, (dx, dy), mask)
    if R.get('preview'): img.save(R['preview'])
    data, q = sp.encode(img, R.get('max_kb', 150))
    open(P(R['out']), 'wb').write(data)
    if R.get('preview'): img.save(R['preview'])
    print(json.dumps({'out': R['out'], 'size': [W, H], 'bytes': len(data), 'quality': q}))

main()
