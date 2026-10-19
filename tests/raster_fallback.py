# Living-room WebPs load by item id. ?art=v1 ignores them, a clear pixel is not a hit,
# and a broken URL falls back to the SVG.
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1]
JS = r'''async () => {
  const a = window.__art;
  const notes = [];
  const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
  ok('switch defaults on', a.ART_RASTER === true);
  const living = ['armchair','ball','balloon','bookshelf','chair','clock','lamp','picture','plant','rug','sofa','table','tv','window'];
  ok('no probe id is loaded', a.ids.indexOf('_probe') < 0);
  ok('each living raster is a real item', living.every(k => a.ids.indexOf(k) >= 0 && a.has(k) === true));
  ok('sofa has its own raster', typeof a.rasterUrl('sofa') === 'string' && a.rasterUrl('sofa').indexOf('sofa') >= 0);
  a.setArtFromSearch('');
  const sofa = a.svgOf(a.sofa);
  ok('a floor raster gets a contact shadow', sofa.indexOf('artshade') >= 0 && sofa.indexOf('artimg') >= 0);
  ok('a wall raster does not', a.svgOf(a.window).indexOf('artshade') < 0 && a.svgOf(a.window).indexOf('artimg') >= 0);
  const img = new Image();
  img.style.cssText = 'position:absolute;left:0;top:0';
  const src = a.rasterUrl('lamp');
  const decoded = await new Promise(res => { img.onload = () => res(true); img.onerror = () => res(false); img.src = src; });
  document.body.appendChild(img);
  img.style.width = img.naturalWidth + 'px';
  img.style.height = img.naturalHeight + 'px';
  const r = img.getBoundingClientRect();
  ok('lamp image decoded', decoded === true && img.naturalWidth === 270);
  ok('clear corner is not a hit', a.artSolid(img, r.left + 1, r.top + 1) === false);
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  let sx = 0, sy = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 24) { const p = (i - 3) / 4; sx = p % c.width; sy = (p / c.width) | 0; break; }
  }
  ok('a painted pixel is a hit', a.artSolid(img, r.left + sx + 0.5, r.top + sy + 0.5) === true);
  ok('art=v1 forces the svg', a.setArtFromSearch('?art=v1') === false && a.svgOf(a.sofa).indexOf('<svg') === 0 && a.svgOf(a.sofa).indexOf('artshade') < 0);
  a.setArtFromSearch('');
  const markup = a.svgOf(a.sofa);
  ok('default can use the webp', markup.indexOf('artimg') >= 0 && markup.indexOf('sofa') >= 0);
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
