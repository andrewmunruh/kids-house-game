# Living-room WebPs load by item id. ?art=v1 ignores them, a clear pixel is not a hit,
# and a broken URL falls back to the SVG. The tray, outfit tab, and room tabs never
# render a contact shadow; only a floor piece on the stage does.
# Night ink on the item wrapper has to dim a painting the same way it dims an SVG.
import io
import sys
from PIL import Image
from playwright.sync_api import sync_playwright

URL = sys.argv[1]
JS = r'''async () => {
  const a = window.__art;
  const notes = [];
  const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
  ok('switch defaults on', a.ART_RASTER === true);
  const living = ['armchair','ball','balloon','bookshelf','chair','clock','lamp','picture','plant','rug','sofa','table','tv','window'];
  ok('one placed item does not pull the whole catalog', a.ids.length === 1 && a.ids[0] === 'sofa' && !a.rasterUrl('ball') && !a.rasterUrl('tv'));
  const rest = await a.loadAllArt();
  a.ids = rest;
  ok('no probe id is loaded', a.ids.indexOf('_probe') < 0);
  ok('each living raster is a real item', living.every(k => a.ids.indexOf(k) >= 0 && a.has(k) === true));
  ok('sofa has its own raster', typeof a.rasterUrl('sofa') === 'string' && a.rasterUrl('sofa').indexOf('sofa') >= 0);
  a.setArtFromSearch('');
  const sofa = a.svgOf(a.sofa, true);
  ok('a floor raster gets a contact shadow', sofa.indexOf('artshade') >= 0 && sofa.indexOf('artimg') >= 0);
  ok('a tray thumbnail has no contact shadow', a.svgOf(a.sofa).indexOf('artshade') < 0 && a.svgOf(a.sofa).indexOf('artimg') >= 0);
  ok('a wall raster does not', a.svgOf(a.window, true).indexOf('artshade') < 0 && a.svgOf(a.window).indexOf('artimg') >= 0);
  ok('a painted window carries a night plate', a.svgOf(a.window).indexOf('artnight') >= 0 && a.svgOf(a.sofa).indexOf('artnight') < 0);
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
  ok('art=v1 window keeps the moon and stars', a.svgOf(a.window).indexOf('winNight') >= 0 && a.svgOf(a.window).indexOf('artnight') < 0);
  a.setArtFromSearch('');
  const markup = a.svgOf(a.sofa);
  ok('default can use the webp', markup.indexOf('artimg') >= 0 && markup.indexOf('sofa') >= 0);
  a.rememberRaster('sofa', '/no-such-art.webp');
  document.body.innerHTML = a.svgOf(a.sofa, true);
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

# The catalog tray, the outfit tab, and the room tabs must not draw a contact shadow.
# Only a floor piece on the stage does.
TRAY = r'''async () => {
  const notes = [];
  const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
  const n = (sel) => document.querySelectorAll(sel).length;
  const chrome = '#shelf .artshade, #cats .artshade, #tabs .artshade, #sheet .artshade, .ghost .artshade';
  const waitArt = () => new Promise(res => {
    const start = Date.now();
    const tick = () => {
      const imgs = [...document.querySelectorAll('#layer img.artimg')];
      if (imgs.length >= 5 && imgs.every(i => i.complete && i.naturalWidth > 0)) res(true);
      else if (Date.now() - start > 8000) res(false);
      else requestAnimationFrame(tick);
    };
    tick();
  });
  ok('paintings are on the stage', await waitArt());
  const shaded = [...document.querySelectorAll('#layer .artshade')].map(el => el.closest('.item')?.dataset.kind).sort();
  ok('the tray, category tabs, and room tabs have no contact shadow', n(chrome) === 0);
  // b1: the default house's cat and tree are living-room floor pieces, now painted too
  ok('stage shadows sit only on the floor pieces', shaded.join(',') === 'armchair,bookshelf,cat,lamp,plant,rug,sofa,tree');
  ok('the window on the stage has no contact shadow', n('#layer .item[data-kind="window"] .artshade') === 0);
  document.querySelector('#cats button[data-cat="decor"]')?.click();
  ok('decor thumbnails have no contact shadow', n('#shelf .artshade') === 0 && n('#shelf img.artimg') > 0);
  document.querySelector('#cats button[data-cat="__people"]')?.click();
  ok('the outfit tab has no contact shadow', n(chrome) === 0 && n('#shelf .thing.person') > 0);
  document.querySelector('#btnDress')?.click();
  await new Promise(r => setTimeout(r, 250));
  ok('the outfit sheet has no contact shadow', n('#sheet .artshade') === 0 && !document.querySelector('#sheet')?.classList.contains('hidden'));
  document.querySelector('#sheet [data-act="close"]')?.click();
  document.querySelector('#tabs button[data-room="bedroom"]')?.click();
  await new Promise(r => setTimeout(r, 400));
  ok('a room tab keeps the tray free of contact shadows', n('#shelf .artshade, #cats .artshade, #tabs .artshade') === 0);
  ok('the bedroom lamp keeps its stage shadow', n('#layer .item[data-kind="lamp"] .artshade') === 1);
  ok('the bedroom window stays unshaded', n('#layer .item[data-kind="window"] .artshade') === 0);
  document.querySelector('#cats button[data-cat="furniture"]')?.click();
  ok('bedroom furniture thumbnails have no contact shadow', n('#shelf .artshade') === 0 && n('#shelf .thing img.artimg') > 0);
  return notes;
}'''

SW = r'''async () => {
  const notes = [];
  const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
  await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) {
    await new Promise(res => {
      const timer = setTimeout(res, 2000);
      navigator.serviceWorker.addEventListener('controllerchange', () => { clearTimeout(timer); res(1); }, { once: true });
    });
  }
  ok('the service worker is controlling the page', !!navigator.serviceWorker.controller);
  let missingStatus = 0;
  try {
    const missing = await fetch('/assets/art/any/does-not-exist.webp');
    missingStatus = missing.status;
  } catch (e) {
    missingStatus = -1;
  }
  ok('a missing painting does not throw in the service worker (status ' + missingStatus + ')', missingStatus === 404);
  const first = await fetch('/assets/art/any/lamp.webp');
  const second = await fetch('/assets/art/any/lamp.webp');
  ok('a painting can be read back from the service worker', first.ok === true && second.ok === true && first.status === 200);
  return notes;
}'''

# Center of the opaque paint, mapped through object-fit: contain and object-position: 50% 100%.
PAINT_AT = r'''(kind) => {
  const img = document.querySelector(`#layer .item[data-kind="${kind}"] img.artimg`);
  if (!img || !img.naturalWidth) return null;
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const w = c.width, h = c.height, data = ctx.getImageData(0, 0, w, h).data;
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > 220) {
      if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX) return null;
  const sx = Math.round((minX + maxX) / 2), sy = Math.round((minY + maxY) / 2);
  const r = img.getBoundingClientRect();
  const scale = Math.min(r.width / w, r.height / h);
  const dw = w * scale, dh = h * scale;
  const ox = r.left + (r.width - dw) * 0.5;
  const oy = r.top + (r.height - dh);
  const i = (sy * w + sx) * 4;
  return {
    src: [data[i], data[i + 1], data[i + 2]],
    x: ox + sx * scale, y: oy + sy * scale,
    light: img.closest('.item').classList.contains('is-light'),
    vw: window.innerWidth, vh: window.innerHeight,
  };
}'''

def _pixel(png, x, y):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    return im.getpixel((int(round(x)), int(round(y))))

def night_dim_notes(page):
    """The night colour matrix on .inner has to reach the WebP, and leave lamps alone."""
    notes = []
    def ok(name, cond):
        notes.append(('PASS ' if cond else 'FAIL ') + name)
    page.evaluate("() => { window.__sky.freeze(null); window.__sky.setChoice('day'); }")
    page.wait_for_timeout(150)
    page.wait_for_function('''() => {
      const img = document.querySelector('#layer img.artimg');
      return img && img.complete && img.naturalWidth > 0;
    }''')
    chosen = None
    for kind in ('sofa', 'picture', 'rug', 'plant', 'table', 'armchair', 'bookshelf', 'chair'):
        info = page.evaluate(PAINT_AT, kind)
        if not info or info['light']:
            continue
        if not (8 < info['x'] < info['vw'] - 8 and 8 < info['y'] < info['vh'] - 8):
            continue
        day = _pixel(page.screenshot(), info['x'], info['y'])
        if max(abs(day[i] - info['src'][i]) for i in range(3)) <= 30:
            chosen = (kind, info, day)
            break
    ok('a raster painting is on screen for the night check', chosen is not None)
    if chosen:
        kind, info, day = chosen
        page.evaluate("() => window.__sky.setChoice('night')")
        page.wait_for_timeout(150)
        night = _pixel(page.screenshot(), info['x'], info['y'])
        # Same matrix as #skyNightInk: 72% of the pixel, plus a step toward #2a2350.
        exp = tuple(round(0.72 * c + off * 255) for c, off in zip(day, (0.046, 0.038, 0.088)))
        ok(f'night ink dims the {kind} painting', max(abs(night[i] - exp[i]) for i in range(3)) <= 8)
    lamp = page.evaluate(PAINT_AT, 'lamp')
    if lamp and 8 < lamp['x'] < lamp['vw'] - 8 and 8 < lamp['y'] < lamp['vh'] - 8:
        page.evaluate("() => window.__sky.setChoice('day')")
        page.wait_for_timeout(100)
        day = _pixel(page.screenshot(), lamp['x'], lamp['y'])
        page.evaluate("() => window.__sky.setChoice('night')")
        page.wait_for_timeout(100)
        night = _pixel(page.screenshot(), lamp['x'], lamp['y'])
        ok('a lamp painting stays undimmed at night', max(abs(day[i] - night[i]) for i in range(3)) <= 12)
    else:
        ok('a lamp painting stays undimmed at night', False)
    page.evaluate("() => window.__sky.setChoice('day')")
    return notes

def window_night_notes(page):
    """The painted bedroom window covers its sunny glass with the night plate."""
    notes = []
    def ok(name, cond):
        notes.append(('PASS ' if cond else 'FAIL ') + name)
    page.evaluate("""() => {
      document.querySelector('#tabs button[data-room="bedroom"]')?.click();
      window.__sky.freeze(null);
      window.__sky.setChoice('day');
    }""")
    page.wait_for_function("""() => {
      const plate = document.querySelector('#layer .item[data-kind="window"] .artnight');
      return plate && parseFloat(getComputedStyle(plate).opacity) < 0.05;
    }""", timeout=3000)
    spot = page.evaluate("""() => {
      const item = document.querySelector('#layer .item[data-kind="window"]');
      const plate = item && item.querySelector('.artnight');
      const img = item && item.querySelector('img.artimg');
      if (!item || !plate || !img) return null;
      const r = item.getBoundingClientRect();
      return {
        glassX: r.left + r.width * 0.388, glassY: r.top + r.height * 0.62,
        curtainX: r.left + r.width * 0.08, curtainY: r.top + r.height * 0.40,
        dayOp: parseFloat(getComputedStyle(plate).opacity),
        vw: window.innerWidth, vh: window.innerHeight, w: r.width, h: r.height,
        ready: img.complete && img.naturalWidth > 0,
      };
    }""")
    on_screen = bool(spot and spot['ready'] and spot['w'] > 40 and 8 < spot['glassX'] < spot['vw'] - 8 and 8 < spot['glassY'] < spot['vh'] - 8)
    ok('the bedroom window is on screen', on_screen)
    if not on_screen:
        return notes
    day = _pixel(page.screenshot(), spot['glassX'], spot['glassY'])
    curtain_day = _pixel(page.screenshot(), spot['curtainX'], spot['curtainY'])
    page.evaluate("() => window.__sky.setChoice('night')")
    page.wait_for_function("""() => {
      const plate = document.querySelector('#layer .item[data-kind="window"] .artnight');
      return plate && parseFloat(getComputedStyle(plate).opacity) > 0.95;
    }""", timeout=3000)
    night = _pixel(page.screenshot(), spot['glassX'], spot['glassY'])
    curtain_night = _pixel(page.screenshot(), spot['curtainX'], spot['curtainY'])
    ok('day hides the night plate and night shows it', spot['dayOp'] < 0.05)
    ok('the painted glass goes from daylight to a night sky', sum(day) > sum(night) + 80 and night[2] > night[0] and night[0] < 90)
    ok('the curtains stay put at night', max(abs(curtain_day[i] - curtain_night[i]) for i in range(3)) <= 18)
    page.evaluate("() => window.__sky.setChoice('day')")
    return notes

def main():
    fails = 0
    notes = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        context.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
        page = context.new_page()
        page.on('pageerror', lambda e: print('PAGEERROR', e, flush=True))
        page.goto(URL, wait_until='domcontentloaded')
        page.wait_for_function('window.__artReady === true', timeout=20000)
        notes.extend(page.evaluate(JS))
        origin = URL.split('/tests/')[0] + '/'
        art_hits = []
        def track(r):
            path = r.url.split('?')[0]
            if '/assets/art/' in path and path.endswith('.webp') and r.resource_type in ('image', 'fetch'):
                art_hits.append(r.url)
        page.on('request', track)
        page.goto(origin, wait_until='domcontentloaded')
        notes.extend(night_dim_notes(page))
        notes.extend(page.evaluate(TRAY))
        notes.extend(window_night_notes(page))
        def hits(kind):
            return [u for u in art_hits if f'/{kind}.webp' in u.split('?')[0]]
        notes.append(('PASS ' if len(hits('ball')) == 0 else 'FAIL ') + 'a fresh house does not fetch the ball')
        notes.append(('PASS ' if len(hits('balloon')) == 0 and len(hits('tv')) == 0 else 'FAIL ') + 'a fresh house does not fetch unplaced catalog art')
        notes.append(('PASS ' if len(hits('sofa')) == 1 and len(hits('chair')) == 1 else 'FAIL ') + f"save art is fetched once (sofa {len(hits('sofa'))}, chair {len(hits('chair'))})")
        notes.extend(page.evaluate(r'''async () => {
          const notes = [];
          const ok = (name, cond) => notes.push((cond ? 'PASS ' : 'FAIL ') + name);
          const room = window.__store.get().currentRoom;
          window.__store.dispatch({ type: 'item/add', room, item: { id: 'ball-probe', kind: 'ball', x: 900, y: 520, flip: false, z: 50, scale: 1 } });
          const shown = await new Promise(res => {
            const start = Date.now();
            const tick = () => {
              const img = document.querySelector('.item[data-kind="ball"] img.artimg');
              if (img && img.complete && img.naturalWidth > 0) res(true);
              else if (Date.now() - start > 4000) res(false);
              else requestAnimationFrame(tick);
            };
            tick();
          });
          ok('placing a new item loads its painting', shown === true);
          return notes;
        }'''))
        sw_page = context.new_page()
        sw_errors = []
        sw_page.on('pageerror', lambda e: sw_errors.append(str(e)))
        sw_page.on('console', lambda msg: sw_errors.append(msg.text) if msg.type == 'error' else None)
        def on_worker(worker):
            worker.on('console', lambda msg: sw_errors.append(msg.text) if msg.type == 'error' else None)
        context.on('serviceworker', on_worker)
        sw_page.goto(origin, wait_until='domcontentloaded')
        context.route('**/does-not-exist.webp', lambda route: route.abort('failed'))
        notes.extend(sw_page.evaluate(SW))
        noisy = [e for e in sw_errors if 'Failed to execute' in e or 'Cache' in e]
        notes.append(('PASS ' if not noisy else 'FAIL ') + 'the service worker stays quiet when an image is missing' + ((' ' + noisy[0]) if noisy else ''))
        browser.close()
    for line in notes:
        print(line, flush=True)
        if line.startswith('FAIL'):
            fails += 1
    return 1 if fails else 0

if __name__ == '__main__':
    sys.exit(main())
