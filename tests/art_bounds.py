# Drawn (alpha) bounds of each living-room WebP vs the SVG getBBox, same bottom-center anchor.
# The item box is square and the WebP is square at 2×w, so object-fit: contain paints the
# bitmap 1:1. Alpha fractions of the file are the on-screen fractions.
import base64
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path('/workspace')
TOL = 0.03
LIMIT = 40 * 1024

JS = r'''async ({ b64, svg, vb }) => {
  const img = new Image();
  img.src = 'data:image/webp;base64,' + b64;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  let l = c.width, t = c.height, r = -1, b = -1, clear = 0;
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    if (data[i + 3] > 12) {
      const x = p % c.width, y = (p / c.width) | 0;
      if (x < l) l = x;
      if (y < t) t = y;
      if (x > r) r = x;
      if (y > b) b = y;
    } else clear++;
  }
  const host = document.createElement('div');
  host.innerHTML = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  const el = host.firstElementChild;
  el.setAttribute('width', '1000');
  el.setAttribute('height', '1000');
  document.body.appendChild(el);
  const bb = el.getBBox();
  const box = el.viewBox.baseVal;
  el.remove();
  return {
    nw: img.naturalWidth, nh: img.naturalHeight, clear,
    ax: l, ay: t, aw: r - l + 1, ah: b - t + 1,
    sx: bb.x, sy: bb.y, sw: bb.width, sh: bb.height,
    vx: box.width, vy: box.height,
  };
}'''


def main():
    items = json.loads(Path(sys.argv[1]).read_text())
    fails = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content('<!doctype html><meta charset="utf-8"><body></body>')
        for it in items:
            path = ROOT / 'assets' / 'art' / 'living' / f"{it['kind']}.webp"
            size = path.stat().st_size
            b64 = base64.b64encode(path.read_bytes()).decode()
            m = page.evaluate(JS, {'b64': b64, 'svg': it['svg'], 'vb': it['vb']})
            side = it['w'] * 2
            notes = []
            if m['nw'] != side or m['nh'] != side or it['h'] != it['w']:
                notes.append(f"size {m['nw']}x{m['nh']} want {side} (h {it['h']})")
            if size > LIMIT:
                notes.append(f'{size}B over 40KB')
            if m['clear'] <= 0:
                notes.append('no transparent pixels')
            sw, sh = m['sw'] / m['vx'], m['sh'] / m['vy']
            sx, sy = m['sx'] / m['vx'], m['sy'] / m['vy']
            rw, rh = m['aw'] / m['nw'], m['ah'] / m['nh']
            rx, ry = m['ax'] / m['nw'], m['ay'] / m['nh']
            # Feet / base: bottom center of the drawn rect. Wall pieces use that same point.
            dax = abs((rx + rw / 2) - (sx + sw / 2)) / sw
            day = abs((ry + rh) - (sy + sh)) / sh
            dw, dh = abs(rw - sw) / sw, abs(rh - sh) / sh
            worst = max(dw, dh, dax, day)
            flag = 'OK' if worst <= TOL and not notes else 'FAIL'
            if flag == 'FAIL':
                fails += 1
            extra = (' ' + '; '.join(notes)) if notes else ''
            print(
                f"{flag} {it['kind']:10} {size:6}B  "
                f"w={dw:.3f} h={dh:.3f} ax={dax:.3f} ay={day:.3f}{extra}",
                flush=True,
            )
        browser.close()
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
