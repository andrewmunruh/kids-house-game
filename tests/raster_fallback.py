# One dummy 2× WebP: it loads, ?art=v1 ignores it, and a broken URL falls back to the SVG.
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1]
JS = r'''async () => {
  const a = window.__art;
  const notes = [];
  const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
  ok('switch defaults on', a.ART_RASTER === true);
  ok('dummy is not an item id', a.ids.length === 1 && a.ids[0] === '_probe');
  ok('sofa has no raster of its own', a.rasterUrl('sofa') == null);
  const probe = a.rasterUrl('_probe');
  ok('dummy url is lazy-loaded', typeof probe === 'string' && probe.indexOf('_probe') >= 0);
  const img = new Image();
  const decoded = await new Promise(res => { img.onload = () => res(true); img.onerror = () => res(false); img.src = probe; });
  ok('dummy is a 64px 2x webp', decoded === true && img.naturalWidth === 64 && img.naturalHeight === 64);
  a.rememberRaster('sofa', probe);
  ok('art=v1 forces the svg', a.setArtFromSearch('?art=v1') === false && a.svgOf(a.sofa).indexOf('<svg') === 0);
  a.setArtFromSearch('');
  const markup = a.svgOf(a.sofa);
  ok('default can use the webp', markup.indexOf('artimg') >= 0 && markup.indexOf('_probe') >= 0);
  a.rememberRaster('sofa', '/no-such-art.webp');
  document.body.innerHTML = a.svgOf(a.sofa);
  const fell = await new Promise(res => {
    const start = Date.now();
    const tick = () => {
      const svg = document.querySelector('svg');
      if (svg) res(svg.outerHTML.indexOf('ff8fab') >= 0);
      else if (Date.now() - start > 4000) res(false);
      else requestAnimationFrame(tick);
    };
    tick();
  });
  ok('a broken webp falls back to the svg', fell === true);
  return notes;
}'''

def main():
    fails = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.on('pageerror', lambda e: print('PAGEERROR', e, flush=True))
        page.goto(URL, wait_until='domcontentloaded')
        page.wait_for_function('window.__artReady === true', timeout=20000)
        notes = page.evaluate(JS)
        browser.close()
    for line in notes:
        print(line, flush=True)
        if line.startswith('FAIL'):
            fails += 1
    return 1 if fails else 0

if __name__ == '__main__':
    sys.exit(main())
