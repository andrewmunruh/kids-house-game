# The sit and lie mockups keep each kid on the seat, with every drawn part inside her box.
# Run after: npx tsx docs/mockups/render.ts
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / 'docs' / 'mockups' / 'html'
PNG = ROOT / 'docs' / 'mockups'
SHOTS = [
    ('sit-sofa-820x1180', 820, 1180, 2, 'sofa.webp'),
    ('sit-sofa-390x844', 390, 844, 2, 'sofa.webp'),
    ('sit-chair-820x1180', 820, 1180, 1, 'chair.webp'),
    ('sit-chair-390x844', 390, 844, 1, 'chair.webp'),
    ('lie-bed-820x1180', 820, 1180, 1, None),
    ('lie-bed-390x844', 390, 844, 1, None),
]

fails = 0

def check(name, ok, extra=''):
    global fails
    print(('PASS ' if ok else 'FAIL ') + name, extra)
    if not ok:
        fails += 1

PROBE = r'''
() => {
  const slop = 2;
  const avatars = [...document.querySelectorAll('div.avatar')];
  const out = [];
  for (const av of avatars) {
    const box = av.getBoundingClientRect();
    const id = av.dataset.anchor;
    const mark = document.querySelector('i.anchor[data-anchor="' + id + '"]');
    const m = mark ? mark.getBoundingClientRect() : null;
    const parts = [...av.querySelectorAll('g.avatar path, g.avatar ellipse, g.avatar circle, g.avatar rect, g.avatar polygon')];
    let outside = 0;
    let sample = '';
    for (const part of parts) {
      const r = part.getBoundingClientRect();
      if (r.width < 0.5 && r.height < 0.5) continue;
      const pad = slop;
      if (r.left < box.left - pad || r.top < box.top - pad || r.right > box.right + pad || r.bottom > box.bottom + pad) {
        outside += 1;
        if (!sample) sample = part.tagName + ' ' + Math.round(r.left) + ',' + Math.round(r.top) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height);
      }
    }
    out.push({
      id,
      box: { l: box.left, t: box.top, r: box.right, b: box.bottom, w: box.width, h: box.height },
      anchor: m ? { x: m.left + m.width / 2, y: m.top + m.height / 2 } : null,
      parts: parts.length,
      outside,
      sample,
    });
  }
  return out;
}
'''

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
        for name, w, h, kids, art in SHOTS:
            page = browser.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
            page.goto((HTML / f'{name}.html').as_uri())
            page.wait_for_timeout(80)
            rows = page.evaluate(PROBE)
            check(f'{name} has {kids} kids', len(rows) == kids, str(len(rows)))
            if art:
                srcs = page.eval_on_selector_all('img.art', 'els => els.map(e => e.getAttribute("src"))')
                check(f'{name} uses the painting', any(art in (s or '') for s in srcs), ' '.join(srcs))
            for row in rows:
                a = row['anchor']
                b = row['box']
                inside = a and b['l'] - 1 <= a['x'] <= b['r'] + 1 and b['t'] - 1 <= a['y'] <= b['b'] + 1
                check(f'{name} kid {row["id"]} covers the seat anchor', bool(inside),
                      '' if inside else f'anchor {a} box {b}')
                check(f'{name} kid {row["id"]} keeps every part in the avatar', row['outside'] == 0 and row['parts'] > 8,
                      f'outside {row["outside"]} of {row["parts"]} {row["sample"]}')
            page.screenshot(path=str(PNG / f'{name}.png'))
            page.close()
        browser.close()
    if fails:
        sys.exit(1)
    print(f'all {len(SHOTS)} mockups passed')

if __name__ == '__main__':
    os.chdir(ROOT)
    main()
