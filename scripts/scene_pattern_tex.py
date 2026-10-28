#!/usr/bin/env python3
"""Attempt-C wall texture: the room's EXACT vector wallpaper pattern (src/main.ts PATTERNS), painted
softly at 2x and carrying the paper/brush grain of an AI gouache texture, sized to a whole number of
pattern periods so it tiles with no crossfade (recipe: wall_blend 0, wall_flatten false, wall_tile_h).

usage: scene_pattern_tex.py PATTERN(1 dots|2 stripes|3 checks) WALL_HEX GRAIN.jpg OUT.png
prints the logical tile height to put in the recipe."""
import sys
import numpy as np
from PIL import Image, ImageFilter

pat, hexc, grain_p, out = int(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]
period, k = {1: (44, 7), 2: (52, 6), 3: (60, 5)}[pat]
T = period * k; S = 2; N = T * S
yy, xx = (np.mgrid[0:N, 0:N] + 0.5) / S
c = np.array([int(hexc[i:i + 2], 16) for i in (1, 3, 5)], float)
if pat == 1:   # radial-gradient(circle, white .55 7px, transparent 8px), 44px cells
    d = np.hypot((xx % period) - period / 2, (yy % period) - period / 2)
    a = 0.55 * np.clip(8 - d, 0, 1)
elif pat == 2:  # repeating 90deg: white .4 0-26px, transparent 26-52px
    a = 0.4 * ((xx % period) < period / 2)
else:           # two 45deg gradient layers (0,0) and (30,30), white .35
    def layer(ox, oy):
        u = (xx - ox) % period; v = (yy - oy) % period
        t = (u + (period - v)) / (2 * period)
        return 0.35 * ((t < .25) | (t > .75))
    a1, a2 = layer(0, 0), layer(period / 2, period / 2)
    a = 1 - (1 - a1) * (1 - a2)
a = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)), float) / 255
img = c * (1 - a[..., None]) + 255 * a[..., None]
g = Image.open(grain_p).convert('L').resize((N, N), Image.LANCZOS)
ga = np.asarray(g, float); hp = ga - np.asarray(g.filter(ImageFilter.GaussianBlur(6)), float)
img = img + np.clip(hp, -14, 14)[..., None] * 0.8
# make the grain wrap: crossfade a band of the opposite edges so tiles meet cleanly
b = 24
for ax in (0, 1):
    img = np.moveaxis(img, ax, 0)
    r = np.linspace(0, 1, b)[:, None, None]
    head = img[:b].copy(); tail = img[-b:].copy()
    img[:b] = head * (0.5 + 0.5 * r) + tail * (0.5 - 0.5 * r)
    img[-b:] = tail * (1 - 0.5 * r) + head * 0.5 * r
    img = np.moveaxis(img, 0, ax)
Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(out)
print(T)
