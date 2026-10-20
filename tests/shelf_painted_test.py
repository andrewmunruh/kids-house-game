# Decorate shelf: a thumbnail uses the item's painting whenever one exists.
# SVG only when there is no painting (yard bench, tulip bed). Both review sizes.
# usage: python tests/shelf_painted_test.py <base url>
import asyncio, sys
from pathlib import Path
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173/kids-house-game/'
ROOT = Path(__file__).resolve().parents[1]
ROOMS = ['living', 'bedroom', 'kitchen', 'salon', 'nursery', 'backyard']
SIZES = [(820, 1180), (390, 844)]
PAINTED = set()
for f in (ROOT / 'assets' / 'art').glob('*/*.webp'):
    kind = f.stem.replace('~', ':')
    if kind and not kind.startswith('_'):
        PAINTED.add(kind)

res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

# Scroll each card into the tray and wait until a painting has decoded.
# Offscreen cards stay on the SVG placeholder until then, same as a finger flick.
LOAD_SHELF = r"""async () => {
  const s = document.getElementById('shelf');
  if (!s) return false;
  const cards = [...s.querySelectorAll('button.thing')];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const t0 = performance.now();
    let ready = false;
    while (performance.now() - t0 < 5000) {
      if (card.dataset.artq !== '1') { ready = true; break; }
      await new Promise(r => setTimeout(r, 30));
    }
    if (!ready) return false;
  }
  return true;
}"""

READ = r"""() => {
  const shelf = document.getElementById('shelf');
  const sh = shelf ? Math.round(shelf.getBoundingClientRect().height) : 0;
  const rows = [...document.querySelectorAll('#shelf .thing')].map(el => {
    const img = el.querySelector('img');
    const src = img ? (img.currentSrc || img.src || '') : '';
    const box = el.getBoundingClientRect();
    return {
      kind: el.dataset.kind || '',
      svg: !!el.querySelector('svg'),
      src,
      art: !!(img && img.classList.contains('artimg') && !img.classList.contains('artpending')),
      pending: !!el.querySelector('img.artpending'),
      nw: img ? img.naturalWidth : 0,
      w: Math.round(box.width),
      h: Math.round(box.height),
    };
  });
  return { sh, rows };
}"""

def paint_ok(row):
    src = row['src'].lower().split('?')[0]
    return row['art'] and src.endswith('.webp') and '.svg' not in src and row['nw'] > 0 and not row['svg'] and not row['pending']

def svg_ok(row):
    src = row['src'].lower().split('?')[0]
    return (row['svg'] or src.endswith('.svg')) and not src.endswith('.webp') and not row['art']

async def dismiss(page):
    note = page.locator('#phoneOk')
    if await note.count() and await note.is_visible():
        await note.click(force=True)
    go = page.locator('#wnGo')
    if await go.count() and await go.is_visible():
        await go.click(force=True)

async def settle(page):
    return await page.evaluate(LOAD_SHELF)

async def open_size(browser, w, h):
    phone = min(w, h) < 500
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=phone, device_scale_factor=1)
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
    page = await ctx.new_page()
    return ctx, page

# Every animation frame, every shelf card must show something: an inline SVG, a
# static (non-WebP) image, or a painting that has fully loaded. Never a blank card.
WATCH = r"""() => {
  window.__shelfEmpty = [];
  window.__shelfFrames = 0;
  const tick = () => {
    const s = document.getElementById('shelf');
    if (s) {
      window.__shelfFrames++;
      const cards = s.querySelectorAll('button.thing');
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (c.querySelector('svg')) continue;
        const imgs = [...c.querySelectorAll('img')];
        const ok = imgs.some(im => {
          const src = (im.getAttribute('src') || '').toLowerCase();
          if (!src) return false;
          if (src.indexOf('.webp') < 0) return true;
          return im.complete && im.naturalWidth > 0;
        });
        if (!ok && window.__shelfEmpty.length < 50) window.__shelfEmpty.push((c.dataset.kind || '?') + ' @' + window.__shelfFrames);
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}"""

async def slow_art(route):
    await asyncio.sleep(0.7)
    await route.continue_()

async def load_race(browser, w, h):
    """Paintings arrive slowly; the kid scrolls in the first second. Scroll must hold, cards never blank."""
    tag = f'{w}x{h}'
    ctx, page = await open_size(browser, w, h)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    await ctx.route(lambda u: '/assets/art/' in u or u.split('?')[0].endswith('.webp'), slow_art)
    await page.add_init_script(f'({WATCH})()')
    await page.goto(URL, wait_until='domcontentloaded')
    await page.wait_for_selector('#stage')
    await dismiss(page)
    await page.click('#modeDecorate', force=True)
    await page.evaluate("() => __store.dispatch({type:'room/switch', room:'bedroom'})")
    await page.locator('#cats button[data-cat="pack:cottage"]').click()
    await page.wait_for_timeout(60)
    target = await page.evaluate("""() => {
      const s = document.getElementById('shelf');
      const max = s.scrollWidth - s.clientWidth;
      s.scrollLeft = Math.round(max * 0.6);
      return { max, left: s.scrollLeft, pending: s.querySelectorAll('[data-artq="1"]').length };
    }""")
    check(f'{tag} race: shelf scrolls and has paintings still loading', target['max'] > 50 and target['left'] > 0 and target['pending'] > 0, str(target))
    lows = []
    for _ in range(40):
        await page.wait_for_timeout(100)
        lows.append(await page.evaluate("() => document.getElementById('shelf').scrollLeft"))
    # Let the near cards finish, then read again.
    await page.wait_for_function("""() => {
      const s = document.getElementById('shelf'); const r = s.getBoundingClientRect();
      return [...s.querySelectorAll('button.thing[data-artq="1"]')].every(c => { const b = c.getBoundingClientRect(); return b.right < r.left || b.left > r.right; });
    }""", timeout=15000)
    final = await page.evaluate("() => document.getElementById('shelf').scrollLeft")
    check(f'{tag} race: scroll position kept while paintings load', all(abs(v - target['left']) <= 1 for v in lows) and abs(final - target['left']) <= 1, f"want {target['left']} min {min(lows)} final {final}")
    shown = await page.evaluate("""() => { const s = document.getElementById('shelf'); const r = s.getBoundingClientRect();
      return [...s.querySelectorAll('button.thing')].filter(c => { const b = c.getBoundingClientRect(); return b.right > r.left && b.left < r.right; })
        .map(c => { const im = c.querySelector('img.artimg'); return !!(im && im.complete && im.naturalWidth > 0); }); }""")
    check(f'{tag} race: visible cards swapped to their painting', len(shown) > 0 and any(shown), str(shown))
    # Flick back and forth while more paintings arrive.
    for frac in (0.0, 1.0, 0.3, 0.8, 0.0):
        await page.evaluate("(f) => { const s = document.getElementById('shelf'); s.scrollLeft = Math.round((s.scrollWidth - s.clientWidth) * f); }", frac)
        await page.wait_for_timeout(250)
    for tab in ('pack:cottage',):
        await page.locator(f'#cats button[data-cat="{tab}"]').click()
        await page.wait_for_timeout(1500)
    empty = await page.evaluate("() => ({ frames: window.__shelfFrames, empty: window.__shelfEmpty })")
    check(f'{tag} race: no empty shelf card in any frame', empty['frames'] > 30 and not empty['empty'], str(empty)[:300])
    # Cached paintings: load every card on the tab, switch away and back. The first
    # frame after the switch (the DOM right after the click, before any paint) and the
    # next 10 frames must show each painted card's decoded painting, never the SVG.
    await settle(page)
    other = await page.evaluate("""() => [...document.querySelectorAll('#cats button[data-cat]')].map(b => b.dataset.cat).find(id => id && id !== 'pack:cottage' && id !== '__people' && id !== 'secrets')""")
    await page.locator(f'#cats button[data-cat="{other}"]').click()
    await page.wait_for_timeout(200)
    back = await page.evaluate("""(painted) => new Promise(done => {
      const look = () => [...document.querySelectorAll('#shelf button.thing')].filter(c => painted.includes(c.dataset.kind)).map(c => {
        const im = c.querySelector('img.artimg');
        return { k: c.dataset.kind, svg: !!c.querySelector('svg') || !!c.querySelector('img:not(.artimg)'), ok: !!(im && im.complete && im.naturalWidth > 0) };
      });
      document.querySelector('#cats button[data-cat="pack:cottage"]').click();
      const frames = [look()];
      let n = 0;
      const tick = () => { frames.push(look()); if (++n < 10) requestAnimationFrame(tick); else done(frames); };
      requestAnimationFrame(tick);
    })""", sorted(PAINTED))
    bad = [f"f{i}:{r['k']}" for i, fr in enumerate(back) for r in fr if r['svg'] or not r['ok']]
    check(f'{tag} cached: switching back shows paintings on the first frame, no SVG frame', len(back[0]) > 5 and not bad, f"cards {len(back[0])} bad {bad[:6]}")
    check(f'{tag} race: no page errors', not errors, '; '.join(errors[:3]))
    await ctx.close()

async def main():
    fails_art = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for w, h in SIZES:
            ctx, page = await open_size(browser, w, h)
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            await page.goto(URL, wait_until='load')
            await page.wait_for_selector('#stage')
            await dismiss(page)
            await page.click('#modeDecorate', force=True)
            await page.wait_for_function("""() => {
              const img = document.querySelector('#layer img.artimg');
              return img && img.complete && img.naturalWidth > 0;
            }""")
            phone = min(w, h) < 500
            want = (76, 76, 96) if phone else (96, 96, 112)
            tag = f'{w}x{h}'
            for room in ROOMS:
                await page.evaluate("(room) => __store.dispatch({type:'room/switch', room})", room)
                await page.wait_for_timeout(200)
                tabs = await page.evaluate("""() => [...document.querySelectorAll('#cats button[data-cat]')]
                  .map(b => b.dataset.cat).filter(id => id && id !== '__people' && id !== 'secrets')""")
                check(f'{tag} {room} opens shelf tabs', len(tabs) > 0, ' '.join(tabs))
                for tab in tabs:
                    await page.locator(f'#cats button[data-cat="{tab}"]').click()
                    await page.wait_for_timeout(40)
                    ok = await settle(page)
                    data = await page.evaluate(READ)
                    if not ok:
                        fails_art.append(f'{tag} {room} {tab} did not settle')
                    for row in data['rows']:
                        kind = row['kind']
                        if not kind:
                            fails_art.append(f'{tag} {room} {tab} card missing kind')
                            continue
                        if row['w'] != want[0] or row['h'] != want[1]:
                            fails_art.append(f'{tag} {kind} size {row["w"]}x{row["h"]}')
                        if kind in PAINTED:
                            if not paint_ok(row):
                                fails_art.append(f'{tag} {room} {tab} {kind} not painting svg={row["svg"]} src={row["src"][-80:]} nw={row["nw"]}')
                        elif not svg_ok(row):
                            fails_art.append(f'{tag} {room} {tab} {kind} expected svg src={row["src"][-80:]}')
                    if data['rows'] and data['sh'] != want[2]:
                        fails_art.append(f'{tag} {room} {tab} shelf height {data["sh"]}')
            # Drag-to-place still drops the card, and the room uses the same painting.
            await page.evaluate("() => __store.dispatch({type:'room/switch', room:'bedroom'})")
            await page.locator('#cats button[data-cat="pack:cottage"]').click()
            await settle(page)
            card = page.locator('#shelf button[data-kind="pack:cc-cloud-beanbag"]')
            await card.scroll_into_view_if_needed()
            bb = await card.bounding_box()
            stage = await page.evaluate("""() => { const r = document.querySelector('.stage').getBoundingClientRect(); return {x:r.x, y:r.y, w:r.width, h:r.height}; }""")
            await page.mouse.move(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2)
            await page.mouse.down()
            await page.mouse.move(stage['x'] + stage['w'] * 0.55, stage['y'] + stage['h'] * 0.62, steps=10)
            await page.mouse.up()
            await page.wait_for_timeout(400)
            placed = await page.evaluate("""() => {
              const el = document.querySelector('#layer .item[data-kind="pack:cc-cloud-beanbag"]');
              const img = el && el.querySelector('img.artimg');
              const src = img ? (img.currentSrc || img.src || '') : '';
              return { n: document.querySelectorAll('#layer .item[data-kind="pack:cc-cloud-beanbag"]').length, svg: !!(el && el.querySelector('svg')), webp: src.toLowerCase().indexOf('.webp') >= 0, nw: img ? img.naturalWidth : 0 };
            }""")
            check(f'{tag} drag-to-place uses the painting', placed['n'] == 1 and placed['webp'] and not placed['svg'] and placed['nw'] > 0, str(placed))
            check(f'{tag} no page errors', not errors, '; '.join(errors[:3]))
            await ctx.close()

        for w, h in SIZES:
            await load_race(browser, w, h)

        # ?art=v1 keeps the SVG, including a painted item.
        ctx, page = await open_size(browser, 820, 1180)
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        join = '&' if '?' in URL else '?'
        await page.goto(URL + join + 'art=v1', wait_until='load')
        await page.wait_for_selector('#stage')
        await dismiss(page)
        await page.click('#modeDecorate', force=True)
        await page.locator('#cats button[data-cat="pack:cottage"]').click()
        await page.wait_for_timeout(300)
        forced = await page.evaluate("""() => {
          const el = document.querySelector('#shelf [data-kind="pack:cc-cloud-beanbag"]');
          const img = el && el.querySelector('img');
          const src = img ? (img.currentSrc || img.src || '') : '';
          return { svgFile: src.toLowerCase().indexOf('.svg') >= 0, webp: src.toLowerCase().indexOf('.webp') >= 0, art: !!(img && img.classList.contains('artimg')) };
        }""")
        check('art=v1 shelf stays on the svg', forced['svgFile'] and not forced['webp'] and not forced['art'], str(forced))
        check('art=v1 no page errors', not errors, '; '.join(errors[:3]))
        await ctx.close()
        await browser.close()
    check('every painted shelf card is the webp', not fails_art, '; '.join(fails_art[:8]))
    if fails_art:
        for line in fails_art[:40]:
            print(' -', line, flush=True)
    # Yard pieces with no file stay SVG. They are part of the shelf walk above.
    check('bench and tulip bed have no painting file', 'yard-bench' not in PAINTED and 'tulip-bed' not in PAINTED)
    print(f"\n{sum(res.values())}/{len(res)} passed", flush=True)
    if not all(res.values()):
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())
