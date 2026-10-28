"""Render arm_layer_cases JSON in WebKit/Chromium and build a labelled contact sheet."""
import json, sys, io
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
src, out_prefix = sys.argv[1], sys.argv[2]
cases = json.load(open(src))
poses = []
for c in cases:
    if c['pose'] not in poses: poses.append(c['pose'])
rows = []
for c in cases:
    k = (c['kind'], c['item'])
    if k not in rows: rows.append(k)
W, H = 120, 192
with sync_playwright() as p:
    for eng in ('webkit', 'chromium'):
        b = getattr(p, eng).launch(); pg = b.new_page(viewport={'width': W, 'height': H})
        sheet = Image.new('RGB', (150 + W * len(poses), 20 + H * len(rows)), 'white')
        d = ImageDraw.Draw(sheet)
        for i, po in enumerate(poses): d.text((150 + i * W + 40, 4), po, fill='black')
        for c in cases:
            pg.set_content(f'<html><body style="margin:0;background:#fdf3e1"><div style="width:{W}px;height:{H}px">' + c['svg'].replace('<svg', '<svg width="120" height="192"', 1) + '</div></body></html>')
            img = Image.open(io.BytesIO(pg.screenshot()))
            r = rows.index((c['kind'], c['item'])); ci = poses.index(c['pose'])
            sheet.paste(img, (150 + ci * W, 20 + r * H))
            if ci == 0: d.text((6, 20 + r * H + 90), f"{c['kind']}: {c['item']}", fill='black')
        sheet.save(f'{out_prefix}_{eng}.png'); b.close(); print('saved', eng)
