# Contact sheet: SVG | painting per item, on a white and a black card.
# usage: python scripts/art_sheet.py <items.json> <out-prefix> kind [kind...]
import io, json, os, sys, glob
import cairosvg
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
items = {i['kind']: i for i in json.load(open(sys.argv[1]))}
kinds = sys.argv[3:]
C, cols = 200, 5
for bgname, bg, ink in (('white', '#ffffff', '#5a3d36'), ('black', '#000000', '#f6efe2')):
    rows = (len(kinds) + cols - 1) // cols
    sh = Image.new('RGB', (C * 2 * cols, (C + 22) * rows), bg)
    d = ImageDraw.Draw(sh)
    for n, k in enumerate(kinds):
        it = items[k]
        x, y = (n % cols) * 2 * C, (n // cols) * (C + 22)
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{it["vb"]}" width="{round(it["w"]*3)}" height="{round(it["h"]*3)}">{it["svg"]}</svg>'
        sv = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert('RGBA')
        f = glob.glob(os.path.join(ROOT, 'assets/art/*', k.replace(':', '~') + '.webp'))[0]
        ra = Image.open(f).convert('RGBA')
        for j, im in enumerate((sv, ra)):
            im = im.copy(); im.thumbnail((C - 12, C - 12))
            sh.paste(im, (x + j * C + 6 + (C - 12 - im.width) // 2, y + 6 + (C - 12 - im.height)), im)
        d.text((x + 6, y + C + 4), f"{k.replace('pack:', '')}  {it['w']:g}x{it['h']:g}  SVG | paint {os.path.getsize(f)//1024}KB", fill=ink)
    sh.save(f'{sys.argv[2]}-{bgname}.png')
    print(f'{sys.argv[2]}-{bgname}.png')
