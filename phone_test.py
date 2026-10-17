# Phone layout. iPad sizes must not match the phone gate. Local preview only.
import asyncio, os, sys
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/kids-house-game/?hood=http://localhost:8787'
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/phone/'
os.makedirs(SHOT, exist_ok=True)
PHONES = [(390, 844), (844, 390), (375, 667), (667, 375)]
IPADS = [(1180, 820), (1024, 768), (820, 1180)]
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def box_ok(b, vw, vh, min_side=44):
    if not b: return False
    return (b['x'] >= -1 and b['y'] >= -1 and b['x'] + b['width'] <= vw + 1 and b['y'] + b['height'] <= vh + 1
            and b['width'] >= min_side and b['height'] >= min_side)

async def dismiss_note(pg):
    if await pg.locator('#phoneOk').is_visible():
        await pg.click('#phoneOk', force=True)

async def layout(pg):
    return await pg.evaluate("""() => {
      const vw = innerWidth, vh = innerHeight;
      const r = el => { const b = el.getBoundingClientRect(); return {x:b.x,y:b.y,w:b.width,h:b.height,r:b.right,b:b.bottom}; };
      const vis = el => !!(el && el.offsetParent);
      const top = [...document.querySelectorAll('.top button, .top .tab, .top .minimap')].filter(vis).map(el => ({id: el.id || el.className.toString().slice(0,24), ...r(el)}));
      const shelf = r(document.querySelector('.shelf'));
      const drawer = r(document.querySelector('.drawer'));
      const stage = r(document.querySelector('.stage'));
      const wrap = r(document.querySelector('.stageWrap'));
      return {
        phone: document.body.classList.contains('phone'),
        portrait: document.body.classList.contains('phone-portrait'),
        scrollW: document.documentElement.scrollWidth, vw, vh,
        top, shelf, drawer, stage, wrap,
        note: getComputedStyle(document.getElementById('phoneNote')).display !== 'none' && !document.getElementById('phoneNote').classList.contains('hidden'),
      };
    }""")

def tops_ok(info):
    bad = []
    for t in info['top']:
        if t['x'] < -1 or t['y'] < -1 or t['r'] > info['vw'] + 1 or t['b'] > info['vh'] + 1:
            bad.append('off:' + t['id'])
        if t['w'] < 44 or t['h'] < 44:
            bad.append('small:' + t['id'] + f" {t['w']:.0f}x{t['h']:.0f}")
    return bad

async def card_ok(pg):
    return await pg.evaluate("""() => {
      const card = document.querySelector('.sheet:not(.hidden) .card');
      if (!card) return {ok:false, why:'no card'};
      const r = card.getBoundingClientRect();
      const fs = [...card.querySelectorAll('input')].map(el => parseFloat(getComputedStyle(el).fontSize));
      return {ok: r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1
        && card.scrollWidth <= card.clientWidth + 2, w: Math.round(r.width), h: Math.round(r.height), fs};
    }""")

async def shot(pg, name):
    await pg.screenshot(path=SHOT + name + '.png')

async def phone_pass(b, w, h, save):
    tag = f'{w}x{h}'
    # Welcome + the turn-sideways hint, on a fresh save.
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='domcontentloaded')
    try:
        await pg.wait_for_selector('.whatsNew .card', timeout=4000)
    except Exception:
        pass
    if await pg.locator('.whatsNew .card').count():
        c = await card_ok(pg)
        check(f'{tag} welcome card fits', c['ok'], str(c))
        if save: await shot(pg, f'welcome-{tag}')
        await pg.click('#wnGo', force=True)
        await pg.wait_for_timeout(200)
    else:
        check(f'{tag} welcome card fits', False, 'welcome did not show')
    note = await pg.locator('#phoneNote').is_visible()
    portrait = h > w
    check(f'{tag} turn-sideways hint ' + ('shows' if portrait else 'stays hidden'), note if portrait else not note)
    if note and save: await shot(pg, f'note-{tag}')
    if note: await dismiss_note(pg)
    check(f'{tag} hint dismisses', not await pg.locator('#phoneNote').is_visible())
    await ctx.close()

    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
    pg = await ctx.new_page()
    pg.on('pageerror', lambda e: check(f'{tag} no page error', False, str(e)))
    await pg.goto(URL, wait_until='networkidle')
    await pg.add_style_tag(content='*, *::before, *::after { animation: none !important; transition: none !important; }')
    await pg.wait_for_selector('#stage .char')
    await dismiss_note(pg)
    info = await layout(pg)
    check(f'{tag} phone gate on', info['phone'] and info['portrait'] == portrait)
    check(f'{tag} no horizontal overflow', info['scrollW'] <= info['vw'] + 1, f"scroll {info['scrollW']}")
    bad = tops_ok(info)
    check(f'{tag} top buttons on screen and >= 44', bad == [], str(bad))
    check(f'{tag} drawer and shelf on screen', info['drawer']['x'] >= -1 and info['drawer']['r'] <= w + 1 and info['drawer']['b'] <= h + 1
          and info['shelf']['h'] >= 60 and info['shelf']['y'] >= 0 and info['shelf']['b'] <= h + 1,
          f"shelf h {info['shelf']['h']:.0f}")
    check(f'{tag} room is not a sliver', info['stage']['h'] >= 140 and info['wrap']['h'] >= 160, f"stage {info['stage']['h']:.0f} wrap {info['wrap']['h']:.0f}")
    if save: await shot(pg, f'house-{tag}')

    # Full own-house tool row (lock, chat, and the rest).
    await pg.evaluate("() => { document.body.classList.add('mode-hood','own-house'); window.dispatchEvent(new Event('resize')); }")
    await pg.wait_for_timeout(40)
    info = await layout(pg)
    bad = tops_ok(info)
    ids = [t['id'] for t in info['top']]
    check(f'{tag} own-house tools fit', bad == [] and 'btnLock' in ids and 'btnChat' in ids and 'btnMap' in ids, str(bad or ids))

    await pg.evaluate("""() => {
      const c = document.querySelector('#layer .char');
      const d = document.createElement('div'); d.className = 'bubble'; d.textContent = 'Hi friend! Want to play?';
      c.appendChild(d); window.dispatchEvent(new Event('resize'));
    }""")
    bub = await pg.evaluate("""() => {
      const b = document.querySelector('.bubble').getBoundingClientRect();
      const s = document.querySelector('.stage').getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(document.querySelector('.bubble')).fontSize);
      const fit = parseFloat(getComputedStyle(document.getElementById('stage')).getPropertyValue('--fit')) || 1;
      return {inside: b.left >= s.left - 1 && b.right <= s.right + 1 && b.top >= s.top - 1 && b.bottom <= s.bottom + 1,
              visual: fs * fit};
    }""")
    check(f'{tag} chat bubble on screen', bub['inside'] and bub['visual'] >= 15, str(bub))
    if save: await shot(pg, f'bubble-{tag}')
    await pg.evaluate("() => document.querySelector('#layer .bubble')?.remove()")
    await pg.evaluate("() => { document.body.classList.remove('mode-hood','own-house'); window.dispatchEvent(new Event('resize')); }")

    for name, click, sel in (
        ('paint', '#btnPaint', '#sheet:not(.hidden) h2'),
        ('characters', '#btnDress', '#sheet:not(.hidden) .dress'),
        ('pets', '#btnPets', '.petTabs'),
        ('neighborhood', '#btnHood', '.hoodSheet h2'),
    ):
        await pg.click(click)
        await pg.wait_for_selector(sel)
        c = await card_ok(pg)
        check(f'{tag} {name} sheet fits', c['ok'], str(c))
        if save: await shot(pg, f'{name}-{tag}')
        await pg.locator('.sheet:not(.hidden) .close').first.click()
        await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await pg.click('#btnHood')
    await pg.click('[data-m="join"]')
    await pg.wait_for_selector('#codeInput')
    c = await card_ok(pg)
    fs = await pg.evaluate("parseFloat(getComputedStyle(document.getElementById('codeInput')).fontSize)")
    ih = (await pg.locator('#codeInput').bounding_box())['height']
    check(f'{tag} join code input is 16px and tappable', c['ok'] and fs >= 16 and ih >= 44, f'fs {fs} h {ih}')
    await pg.locator('.sheet:not(.hidden) .close').first.click()
    await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await pg.click('#btnHood')
    await pg.click('[data-m="create"]')
    await pg.wait_for_selector('.adultCard')
    c = await card_ok(pg)
    check(f'{tag} grown-up sheet fits', c['ok'], str(c))
    if save: await shot(pg, f'grownup-{tag}')
    await pg.click('.adult [data-k="x"]')
    await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")

    await pg.evaluate("""() => {
      const t = document.getElementById('chatTray');
      t.classList.remove('hidden');
      t.innerHTML = `<div class="chatHead"><span>1 friend nearby can hear you</span><button class="close">✕</button></div>
        <form class="typed"><input id="chatProbe" placeholder="Type a message…"/><button type="button">Send</button></form>`;
    }""")
    tray = await pg.evaluate("""() => {
      const t = document.getElementById('chatTray').getBoundingClientRect();
      const inp = document.getElementById('chatProbe');
      const ir = inp.getBoundingClientRect();
      return {inside: t.left >= -1 && t.right <= innerWidth + 1 && t.bottom <= innerHeight + 1,
              fs: parseFloat(getComputedStyle(inp).fontSize), h: ir.height};
    }""")
    check(f'{tag} chat tray fits and input is 16px', tray['inside'] and tray['fs'] >= 16 and tray['h'] >= 44, str(tray))
    if save: await shot(pg, f'chat-{tag}')
    await pg.evaluate("() => { const t = document.getElementById('chatTray'); t.classList.add('hidden'); t.innerHTML=''; }")

    await pg.evaluate("""() => { document.body.classList.add('is-preview'); if (!document.querySelector('.previewRibbon')) { const d = document.createElement('div'); d.className = 'previewRibbon'; d.textContent = 'PREVIEW'; document.body.appendChild(d); } }""")
    rib = await pg.evaluate("""() => {
      const rib = document.querySelector('.previewRibbon').getBoundingClientRect();
      let hit = false;
      for (const c of [...document.querySelectorAll('.cat, .rf')].filter(e => e.offsetParent)) {
        const r = c.getBoundingClientRect();
        const ix = Math.max(0, Math.min(rib.right, r.right) - Math.max(rib.left, r.left));
        const iy = Math.max(0, Math.min(rib.bottom, r.bottom) - Math.max(rib.top, r.top));
        if (ix > 2 && iy > 2) hit = true;
      }
      return {x: rib.x, y: rib.y, hit, on: rib.right <= innerWidth + 1 && rib.top >= -1};
    }""")
    check(f'{tag} preview ribbon misses the filters', rib['on'] and not rib['hit'], str(rib))
    await pg.evaluate("() => { document.body.classList.remove('is-preview'); document.querySelector('.previewRibbon')?.remove(); }")

    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.wait_for_timeout(200)
    info = await layout(pg)
    bad = tops_ok(info)
    house = await pg.evaluate("""() => {
      const b = document.querySelector('.mapHouse');
      const r = b.getBoundingClientRect();
      const hit = (x, y) => { const e = document.elementFromPoint(x, y); return !!(e && e.closest('.mapHouse')); };
      return {w: r.width, h: r.height, slop: hit(r.left - 8, r.top + r.height / 2) && hit(r.left + r.width / 2, r.top - 8)};
    }""")
    check(f'{tag} map chrome fits', bad == [] and info['scrollW'] <= info['vw'] + 1, str(bad))
    check(f'{tag} map house tap target reaches 44', house['w'] + 16 >= 44 and house['h'] + 16 >= 44 and house['slop'], str(house))
    if save: await shot(pg, f'map-{tag}')
    await pg.click('[data-go="park"]')
    await pg.wait_for_selector('body.view-park .parkScene')
    info = await layout(pg)
    check(f'{tag} park fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1)
    if save: await shot(pg, f'park-{tag}')
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="ranch"]')
    await pg.wait_for_selector('body.view-ranch .ranchScene')
    info = await layout(pg)
    check(f'{tag} ranch fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1)
    if save: await shot(pg, f'ranch-{tag}')
    await pg.click('.barnDoor')
    await pg.wait_for_selector('body.in-barn .barnScene')
    info = await layout(pg)
    check(f'{tag} barn fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1)
    if save: await shot(pg, f'barn-{tag}')
    await ctx.close()

async def ipad_pass(b, w, h):
    tag = f'ipad {w}x{h}'
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=1)
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='networkidle')
    await pg.wait_for_selector('#stage .char')
    info = await layout(pg)
    check(f'{tag} is not a phone', not info['phone'] and not info['note'] and info['scrollW'] <= info['vw'] + 1)
    await ctx.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in IPADS:
            await ipad_pass(b, w, h)
        for w, h in PHONES:
            save = (w, h) in ((390, 844), (844, 390))
            await phone_pass(b, w, h, save)
        await b.close()
    failed = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(failed)}/{len(res)} passed', flush=True)
    if failed:
        print('FAILED:', *failed, sep='\n  ')
        sys.exit(1)

asyncio.run(main())
