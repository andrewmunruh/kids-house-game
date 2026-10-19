# Drawn (alpha) bounds of each living-room WebP vs the SVG's visible art.
# The contact-shadow ellipse is not part of that box; the stroke is.
# The item box is square and the WebP is square at 3×w, so object-fit: contain
# paints the bitmap 1:1. Alpha fractions of the file are the on-screen fractions.
import base64
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else Path(__file__).resolve().parents[1]
TOL = 0.03
LIMIT = 60 * 1024
SCALE = 3

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
  const solid = new Uint8Array(c.width * c.height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    if (data[i + 3] > 12) {
      solid[p] = 1;
      const x = p % c.width, y = (p / c.width) | 0;
      if (x < l) l = x;
      if (y < t) t = y;
      if (x > r) r = x;
      if (y > b) b = y;
    } else clear++;
  }
  const seen = new Uint8Array(c.width * c.height);
  const qx = new Int32Array(c.width * c.height);
  const qy = new Int32Array(c.width * c.height);
  let islands = 0;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const start = y * c.width + x;
      if (!solid[start] || seen[start]) continue;
      islands++;
      let head = 0, tail = 0;
      qx[tail] = x; qy[tail] = y; tail++;
      seen[start] = 1;
      while (head < tail) {
        const cx = qx[head], cy = qy[head]; head++;
        const nb = [cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1];
        for (let k = 0; k < nb.length; k += 2) {
          const nx = nb[k], ny = nb[k + 1];
          if (nx < 0 || ny < 0 || nx >= c.width || ny >= c.height) continue;
          const np = ny * c.width + nx;
          if (!solid[np] || seen[np]) continue;
          seen[np] = 1;
          qx[tail] = nx; qy[tail] = ny; tail++;
        }
      }
    }
  }
  const host = document.createElement('div');
  host.innerHTML = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  const el = host.firstElementChild;
  el.setAttribute('width', '1000');
  el.setAttribute('height', '1000');
  document.body.appendChild(el);
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  for (const n of el.querySelectorAll('*')) {
    const fill = (n.getAttribute('fill') || '').toLowerCase();
    const op = parseFloat(n.getAttribute('opacity') || '1');
    if (n.localName === 'ellipse' && fill === '#000' && op < 0.5) continue;
    const bb = n.getBBox();
    if (!(bb.width || bb.height)) continue;
    const sw = parseFloat(n.getAttribute('stroke-width') || '0');
    const pad = sw / 2;
    minX = Math.min(minX, bb.x - pad);
    minY = Math.min(minY, bb.y - pad);
    maxX = Math.max(maxX, bb.x + bb.width + pad);
    maxY = Math.max(maxY, bb.y + bb.height + pad);
  }
  const box = el.viewBox.baseVal;
  el.remove();
  minX = Math.max(0, minX); minY = Math.max(0, minY);
  maxX = Math.min(box.width, maxX); maxY = Math.min(box.height, maxY);
  return {
    nw: img.naturalWidth, nh: img.naturalHeight, clear, islands,
    ax: l, ay: t, aw: r - l + 1, ah: b - t + 1,
    sx: minX, sy: minY, sw: maxX - minX, sh: maxY - minY,
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
            path = ROOT / 'assets' / 'art' / 'any' / f"{it['kind']}.webp"
            size = path.stat().st_size
            b64 = base64.b64encode(path.read_bytes()).decode()
            m = page.evaluate(JS, {'b64': b64, 'svg': it['svg'], 'vb': it['vb']})
            side = it['w'] * SCALE
            notes = []
            if m['nw'] != side or m['nh'] != side or it['h'] != it['w']:
                notes.append(f"size {m['nw']}x{m['nh']} want {side} (h {it['h']})")
            if size > LIMIT:
                notes.append(f'{size}B over 60KB')
            if m['clear'] <= 0:
                notes.append('no transparent pixels')
            if m['islands'] != 1:
                notes.append(f"{m['islands']} alpha islands")
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
