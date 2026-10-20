# Drawn (alpha) bounds of each living-room WebP vs the SVG's visible art.
# The contact-shadow ellipse is not part of that box; the stroke is.
# The WebP is round(3×w) by round(3×h), the item box's own aspect, so object-fit:
# contain paints the bitmap 1:1. Alpha fractions of the file are the on-screen
# fractions. Non-square items and viewBoxes that do not start at 0 0 are handled.
# The SVG box is measured by rendering it (shadow ellipses dropped), so parts
# drawn through a transform are measured where they land.
# usage: art_bounds.py <items.json> [root] [kind ...]  (items from dump-art-items.mjs)
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
  const pale = new Uint8Array(c.width * c.height);
  const structural = new Uint8Array(c.width * c.height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const pr = data[i], pg = data[i + 1], pb = data[i + 2], pa = data[i + 3];
    if (pa > 12) {
      solid[p] = 1;
      const x = p % c.width, y = (p / c.width) | 0;
      if (x < l) l = x;
      if (y < t) t = y;
      if (x > r) r = x;
      if (y > b) b = y;
      const mx = pr > pg ? (pr > pb ? pr : pb) : (pg > pb ? pg : pb);
      const mn = pr < pg ? (pr < pb ? pr : pb) : (pg < pb ? pg : pb);
      const ch = mx - mn;
      const plum = Math.abs(pr - 90) < 28 && Math.abs(pg - 61) < 28 && Math.abs(pb - 92) < 28 && ch < 45;
      const pink = pr > pg + 40 && pr > pb + 15;
      const warm = pr + 8 >= pg && pg + 6 >= pb;
      // Near-cream: a light warm fringe, brighter than a wood highlight.
      if (!plum && pr + pg + pb > 630 && ch < 42 && warm && !pink) pale[p] = 1;
      else if (!plum) structural[p] = 1;
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
  // Interior holes: transparent pixels the border flood cannot reach.
  const holeSeen = new Uint8Array(c.width * c.height);
  let holes = 0;
  const seedHole = (x, y) => {
    const p = y * c.width + x;
    if (solid[p] || holeSeen[p]) return;
    holeSeen[p] = 1;
    qx[0] = x; qy[0] = y;
    let head = 0, tail = 1;
    while (head < tail) {
      const cx = qx[head], cy = qy[head]; head++;
      const nb = [cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1];
      for (let k = 0; k < nb.length; k += 2) {
        const nx = nb[k], ny = nb[k + 1];
        if (nx < 0 || ny < 0 || nx >= c.width || ny >= c.height) continue;
        const np = ny * c.width + nx;
        if (solid[np] || holeSeen[np]) continue;
        holeSeen[np] = 1;
        qx[tail] = nx; qy[tail] = ny; tail++;
      }
    }
  };
  for (let x = 0; x < c.width; x++) { seedHole(x, 0); seedHole(x, c.height - 1); }
  for (let y = 0; y < c.height; y++) { seedHole(0, y); seedHole(c.width - 1, y); }
  // Flag a hole inside one painted shape, including a pinhole under about
  // 12px at 1x (the file is 3x). A gap between leaves or strings is wrapped
  // by the plum outline on its own, and that opening is allowed.
  const SMALL = 12 * 3;
  const holeMark = new Uint8Array(c.width * c.height);
  for (let p = 0; p < solid.length; p++) if (!solid[p] && !holeSeen[p]) holeMark[p] = 1;
  const holeComp = new Uint8Array(c.width * c.height);
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const start = y * c.width + x;
      if (!holeMark[start] || holeComp[start]) continue;
      let head = 0, tail = 0;
      let minX = x, maxX = x, minY = y, maxY = y;
      let plumTouch = 0, solidTouch = 0;
      qx[tail] = x; qy[tail] = y; tail++;
      holeComp[start] = 1;
      while (head < tail) {
        const cx = qx[head], cy = qy[head]; head++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = cx + dx, ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= c.width || ny >= c.height) continue;
            const np = ny * c.width + nx;
            const cardinal = dx === 0 || dy === 0;
            if (cardinal && holeMark[np] && !holeComp[np]) {
              holeComp[np] = 1;
              qx[tail] = nx; qy[tail] = ny; tail++;
            }
            if (!solid[np]) continue;
            solidTouch++;
            const o = np * 4;
            const pr = data[o], pg = data[o + 1], pb = data[o + 2];
            const mx = pr > pg ? (pr > pb ? pr : pb) : (pg > pb ? pg : pb);
            const mn = pr < pg ? (pr < pb ? pr : pb) : (pg < pb ? pg : pb);
            const ch = mx - mn;
            if (Math.abs(pr - 90) < 28 && Math.abs(pg - 61) < 28 && Math.abs(pb - 92) < 28 && ch < 45) plumTouch++;
          }
        }
      }
      const longSide = Math.max(maxX - minX + 1, maxY - minY + 1);
      const betweenParts = solidTouch > 0 && plumTouch / solidTouch >= 0.8;
      const small = longSide < SMALL;
      const insideShape = !betweenParts;
      if (!betweenParts && (small || insideShape)) holes++;
    }
  }
  // Near-cream that can be reached from outside the frame without crossing
  // the object. The plum outline does not count as the frame.
  const reach = new Uint8Array(c.width * c.height);
  const seedOut = (x, y) => {
    const p = y * c.width + x;
    if (structural[p] || reach[p]) return;
    reach[p] = 1;
    qx[0] = x; qy[0] = y;
    let head = 0, tail = 1;
    while (head < tail) {
      const cx = qx[head], cy = qy[head]; head++;
      const nb = [cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1];
      for (let k = 0; k < nb.length; k += 2) {
        const nx = nb[k], ny = nb[k + 1];
        if (nx < 0 || ny < 0 || nx >= c.width || ny >= c.height) continue;
        const np = ny * c.width + nx;
        if (structural[np] || reach[np]) continue;
        reach[np] = 1;
        qx[tail] = nx; qy[tail] = ny; tail++;
      }
    }
  };
  for (let x = 0; x < c.width; x++) { seedOut(x, 0); seedOut(x, c.height - 1); }
  for (let y = 0; y < c.height; y++) { seedOut(0, y); seedOut(c.width - 1, y); }
  const outside = new Uint8Array(c.width * c.height);
  let cream = 0;
  for (let p = 0; p < pale.length; p++) if (pale[p] && reach[p]) { outside[p] = 1; cream++; }
  const creamSeen = new Uint8Array(c.width * c.height);
  let creamBlob = 0;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const start = y * c.width + x;
      if (!outside[start] || creamSeen[start]) continue;
      let head = 0, tail = 0, area = 0;
      qx[tail] = x; qy[tail] = y; tail++;
      creamSeen[start] = 1;
      while (head < tail) {
        const cx = qx[head], cy = qy[head]; head++;
        area++;
        const nb = [cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1];
        for (let k = 0; k < nb.length; k += 2) {
          const nx = nb[k], ny = nb[k + 1];
          if (nx < 0 || ny < 0 || nx >= c.width || ny >= c.height) continue;
          const np = ny * c.width + nx;
          if (!outside[np] || creamSeen[np]) continue;
          creamSeen[np] = 1;
          qx[tail] = nx; qy[tail] = ny; tail++;
        }
      }
      if (area > creamBlob) creamBlob = area;
    }
  }
  // The SVG's visible art box: render the drawing (contact-shadow ellipses
  // dropped) onto a canvas the size of the WebP and take its alpha bounds.
  // Rendering, not getBBox, so transformed parts (translate/scale/rotate,
  // nested groups) are measured where they are drawn, and offset viewBoxes
  // map 1:1 onto the bitmap.
  const host = document.createElement('div');
  host.innerHTML = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
  const el = host.firstElementChild;
  for (const n of [...el.querySelectorAll('ellipse')]) {
    const fill = (n.getAttribute('fill') || '').toLowerCase();
    const op = parseFloat(n.getAttribute('opacity') || '1');
    if (fill === '#000' && op < 0.5) n.remove();
  }
  el.setAttribute('width', String(c.width));
  el.setAttribute('height', String(c.height));
  el.setAttribute('preserveAspectRatio', 'none');
  const sImg = new Image();
  sImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(el.outerHTML);
  await sImg.decode();
  const sc = document.createElement('canvas');
  sc.width = c.width; sc.height = c.height;
  const sctx = sc.getContext('2d');
  sctx.drawImage(sImg, 0, 0, c.width, c.height);
  const sd = sctx.getImageData(0, 0, c.width, c.height).data;
  let sl = c.width, st = c.height, sr = -1, sb = -1;
  for (let i = 3, p = 0; i < sd.length; i += 4, p++) {
    if (sd[i] > 12) {
      const x = p % c.width, y = (p / c.width) | 0;
      if (x < sl) sl = x; if (x > sr) sr = x; if (y < st) st = y; if (y > sb) sb = y;
    }
  }
  const box = el.viewBox.baseVal;
  const kx = box.width / c.width, ky = box.height / c.height;
  const minX = sl * kx, minY = st * ky, maxX = (sr + 1) * kx, maxY = (sb + 1) * ky;
  return {
    nw: img.naturalWidth, nh: img.naturalHeight, clear, islands, holes, cream, creamBlob,
    ax: l, ay: t, aw: r - l + 1, ah: b - t + 1,
    sx: minX, sy: minY, sw: maxX - minX, sh: maxY - minY,
    vx: box.width, vy: box.height,
  };
}'''


def main():
    items = json.loads(Path(sys.argv[1]).read_text())
    only = set(sys.argv[3:])
    files = {f.stem.replace('~', ':'): f for f in (ROOT / 'assets' / 'art').glob('*/*.webp')}
    items = [it for it in items if it['kind'] in files and (not only or it['kind'] in only)]
    fails = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content('<!doctype html><meta charset="utf-8"><body></body>')
        for it in items:
            path = files[it['kind']]
            it.setdefault('h', it['w'])
            it.setdefault('vb', '0 0 100 100')
            size = path.stat().st_size
            b64 = base64.b64encode(path.read_bytes()).decode()
            m = page.evaluate(JS, {'b64': b64, 'svg': it['svg'], 'vb': it['vb']})
            want_w, want_h = round(it['w'] * SCALE), round(it['h'] * SCALE)
            notes = []
            if m['nw'] != want_w or m['nh'] != want_h:
                notes.append(f"size {m['nw']}x{m['nh']} want {want_w}x{want_h}")
            if size > LIMIT:
                notes.append(f'{size}B over 60KB')
            if m['clear'] <= 0:
                notes.append('no transparent pixels')
            if m['islands'] != 1:
                notes.append(f"{m['islands']} alpha islands")
            if m['holes']:
                notes.append(f"{m['holes']} interior holes")
            # A clock crescent or a sill lip is a bright warm fringe outside the
            # frame. Wood highlights on the picture stay under both bars.
            if m['cream'] >= 80 or m['creamBlob'] >= 48:
                notes.append(f"{m['cream']} cream edge px (blob {m['creamBlob']})")
            if it['kind'] == 'rug' and size >= 60000:
                notes.append(f'{size}B rug not under 60000')
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
                f"{flag} {it['kind']:24} {size:6}B  "
                f"w={dw:.3f} h={dh:.3f} ax={dax:.3f} ay={day:.3f}{extra}",
                flush=True,
            )
        browser.close()
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
