# Fresh ink placement against a baseline revision.
# stdin: JSON list of {kind, vb1, v1, vb2, v2, w, h}
# Prints one JSON line and exits 1 when any anchor drifts more than 4%
# or either axis changes size by more than 12%, or the current SVG spills
# past its viewBox by more than the baseline.
import json
import sys
from playwright.sync_api import sync_playwright

JS = r'''
(items) => {
  const out = [];
  const host = document.body;
  const strip = (body) => body
    .replace(/<ellipse\b[^>]*opacity="0?\.(?:0\d*|1[0-4]\d*)"[^>]*\/?>/gi, '')
    .replace(/<ellipse\b[^>]*fill="#000(?:000)?"[^>]*\/?>/gi, '');
  for (const it of items) {
    const measure = (vb, body, dropShadow) => {
      const src = dropShadow ? strip(body) : body;
      const bw = it.w || 100;
      const bh = it.h || bw;
      const boxW = 400;
      const boxH = 400 * bh / bw;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', vb);
      svg.setAttribute('width', String(boxW));
      svg.setAttribute('height', String(boxH));
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.innerHTML = src;
      svg.appendChild(g);
      host.appendChild(svg);
      let box = null;
      try { box = g.getBBox(); } catch (e) { box = null; }
      const parts = vb.trim().split(/[\s,]+/).map(Number);
      const x = parts[0], y = parts[1], w = parts[2], h = parts[3];
      svg.remove();
      if (!box || !isFinite(box.width) || !w || !h) return null;
      const scale = Math.min(boxW / w, boxH / h);
      const ox = (boxW - w * scale) / 2;
      const oy = (boxH - h * scale) / 2;
      const left = ox + (box.x - x) * scale;
      const top = oy + (box.y - y) * scale;
      const pw = box.width * scale;
      const ph = box.height * scale;
      const spill = {
        l: Math.max(0, x - box.x),
        t: Math.max(0, y - box.y),
        r: Math.max(0, (box.x + box.width) - (x + w)),
        b: Math.max(0, (box.y + box.height) - (y + h)),
      };
      return {
        x: box.x, y: box.y, w: box.width, h: box.height,
        ax: (left + pw / 2) / boxW,
        ay: (top + ph) / boxH,
        sw: pw / boxW,
        sh: ph / boxH,
        spill,
      };
    };
    const worse = (v1s, v2s) => ['l', 't', 'r', 'b'].some(k => v2s[k] > Math.max(4.5, v1s[k] + 1.25));
    const a = measure(it.vb1, it.v1, true);
    const b = measure(it.vb2, it.v2, true);
    const raw1 = measure(it.vb1, it.v1, false);
    const raw2 = measure(it.vb2, it.v2, false);
    if (!a || !b || !raw1 || !raw2) { out.push({ kind: it.kind, bad: true }); continue; }
    const dax = Math.abs(b.ax - a.ax);
    const day = Math.abs(b.ay - a.ay);
    const dw = a.sw ? Math.abs(b.sw - a.sw) / a.sw : 0;
    const dh = a.sh ? Math.abs(b.sh - a.sh) / a.sh : 0;
    out.push({
      kind: it.kind, dax, day, dw, dh, out: worse(raw1.spill, raw2.spill), bad: false,
    });
  }
  return out;
}
'''

def main():
    pairs = json.load(sys.stdin)
    html = '<!doctype html><meta charset=utf-8><body></body>'
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html)
        for i in range(0, len(pairs), 40):
            results.extend(page.evaluate(JS, pairs[i:i + 40]))
        browser.close()
    bad = []
    for r in results:
        if r.get('bad') or r['dax'] > 0.04 or r['day'] > 0.04 or r['dw'] > 0.12 or r['dh'] > 0.12 or r['out']:
            bad.append(r)
    json.dump({'checked': len(results), 'bad': bad}, sys.stdout)
    sys.stdout.write('\n')
    return 1 if bad else 0

if __name__ == '__main__':
    sys.exit(main())
