# Phone layout. iPad sizes must not match the phone gate. Local preview only.
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import K

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
    # Preview builds prefix every key (PFX=preview:). Production leaves PFX empty.
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
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
    char = await pg.evaluate("""() => {
      const c = document.querySelector('#layer .char').getBoundingClientRect();
      const s = document.querySelector('.stage').getBoundingClientRect();
      return { inside: c.left >= s.left + 6 && c.right <= s.right - 6 && c.top >= s.top - 1 && c.bottom <= s.bottom + 1,
               gapR: Math.round(s.right - c.right), gapL: Math.round(c.left - s.left), cw: Math.round(c.width) };
    }""")
    check(f'{tag} character fully in the room', char['inside'] and char['cw'] > 24, str(char))
    if (w, h) == (375, 667): await room_clears_tools(pg, tag, 'house')
    if portrait: await check_framed(pg, tag, 'house')
    if save: await shot(pg, f'house-{tag}')

    # Full own-house tool row (lock, chat, and the rest). Those buttons wrap onto
    # their own line at 375px and used to leave the room at the previous size.
    await pg.evaluate("() => { document.body.classList.add('mode-hood','own-house'); }")
    await pg.wait_for_timeout(80)
    if (w, h) == (375, 667): await room_clears_tools(pg, tag, 'own-house tool row')
    await pg.evaluate("() => window.dispatchEvent(new Event('resize'))")
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
    if portrait: await check_framed(pg, tag, 'park')
    if save: await shot(pg, f'park-{tag}')
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="ranch"]')
    await pg.wait_for_selector('body.view-ranch .ranchScene')
    info = await layout(pg)
    check(f'{tag} ranch fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1)
    if portrait: await check_framed(pg, tag, 'ranch')
    if save: await shot(pg, f'ranch-{tag}')
    await pg.click('.barnDoor')
    await pg.wait_for_selector('body.in-barn .barnScene')
    info = await layout(pg)
    check(f'{tag} barn fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1)
    if save: await shot(pg, f'barn-{tag}')

    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="gameroom"]')
    await pg.wait_for_selector('body.view-gameroom .grScene')
    await pg.wait_for_timeout(400)
    info = await layout(pg)
    club = await pg.evaluate("""() => {
      const kid = document.querySelector('#gavatars .savatar');
      const port = document.getElementById('grScroll').getBoundingClientRect();
      const k = kid ? kid.getBoundingClientRect() : null;
      const solo = document.getElementById('grSolo').getBoundingClientRect();
      const page = document.documentElement.scrollWidth <= innerWidth + 1;
      return {
        kid: !!(k && k.width > 20 && k.left >= port.left - 1 && k.right <= port.right + 1 && k.top >= port.top - 2 && k.bottom <= port.bottom + 2),
        soloIn: solo.width > 0 && solo.left >= -1 && solo.right <= innerWidth + 1 && solo.bottom <= innerHeight + 1,
        page, kw: k && Math.round(k.width), gapR: k && Math.round(port.right - k.right)
      };
    }""")
    check(f'{tag} clubhouse fits', tops_ok(info) == [] and info['scrollW'] <= info['vw'] + 1 and club['soloIn'] and club['page'], str(club))
    check(f'{tag} clubhouse character on screen', club['kid'], str(club))
    if portrait: await check_framed(pg, tag, 'gameroom')
    if save: await shot(pg, f'clubhouse-{tag}')

    def inside(b):
        return b and b['x'] >= -1 and b['y'] >= -1 and b['r'] <= w + 1 and b['b'] <= h + 1

    await pg.evaluate("""() => {
      const root = document.getElementById('tableOverlay');
      root.classList.remove('hidden');
      const cards = Array.from({length: 8}, (_, i) => `<button type="button" class="slayCard ${i % 2 ? 'can' : 'dim'}" style="background:#fff;border:3px solid #5a3d5c;border-radius:12px">C</button>`).join('');
      root.innerHTML = `<div class="tblCard game-slay"><div class="tblTop"><h2>Slay</h2></div>
        <div class="slayFelt"><div class="whose yours">Your turn!</div>
        <div class="slayOpps"><div class="slayOpp"><b>Mia</b><span class="cnt">7</span></div></div>
        <div class="slayPile"><button type="button" class="slayDeck"></button><div class="slayDiscard"></div><div class="nowColor"></div></div>
        <div id="slayHand" class="slayHand isTurn">${cards}</div>
        <button type="button" id="slayCall" class="slayCall">SLAY!</button></div>
        <div class="tblBar"><button type="button" id="tblBack">Back to room</button><button type="button" id="tblLeave">Leave table</button></div></div>`;
    }""")
    await pg.wait_for_timeout(50)
    slay = await pg.evaluate("""() => {
      const r = el => { const b = el.getBoundingClientRect(); return {x:b.x,y:b.y,w:b.width,h:b.height,r:b.right,b:b.bottom}; };
      const hand = document.getElementById('slayHand');
      const card = hand.querySelector('.slayCard');
      const back = document.getElementById('tblBack');
      const leave = document.getElementById('tblLeave');
      const tf = getComputedStyle(card).transform;
      return { hand: r(hand), card: r(card), back: r(back), leave: r(leave),
        scrolls: hand.scrollWidth > hand.clientWidth + 2, wrap: getComputedStyle(hand).flexWrap,
        transform: tf, page: document.documentElement.scrollWidth };
    }""")
    slay_in = inside(slay['hand']) and inside(slay['back']) and inside(slay['leave']) and slay['card']['w'] >= 44 and slay['card']['h'] >= 44 and slay['back']['h'] >= 44 and slay['leave']['h'] >= 44 and slay['page'] <= w + 1
    if portrait:
        slay_ok = slay_in and slay['scrolls'] and slay['wrap'] == 'nowrap'
    else:
        slay_ok = slay_in and slay['transform'] not in ('none', 'matrix(1, 0, 0, 1, 0, 0)')
    check(f'{tag} slay hand and table buttons fit', slay_ok, str(slay))
    if save: await shot(pg, f'slay-{tag}')

    await pg.evaluate("""() => {
      const cols = Array.from({length: 7}, (_, c) => `<button type="button" class="fourCol" data-col="${c}">${Array.from({length: 6}, () => '<span class="fourCell"></span>').join('')}<span class="dropHint">▼</span></button>`).join('');
      document.getElementById('tableOverlay').innerHTML = `<div class="tblCard game-four"><div class="tblTop"><h2>Four in a Row</h2></div>
        <div class="fourPlay"><div class="whose yours">Your turn!</div>
        <div class="fourChips"><div class="playerChip"><b>You ♥</b></div><div class="playerChip"><b>Mia ★</b></div></div>
        <p class="fourLegend">You are pink hearts</p><div class="fourBoard" id="fourBoard">${cols}</div></div>
        <div class="tblBar"><button type="button" id="tblBack">Back to room</button><button type="button" id="tblLeave">Leave table</button></div></div>`;
    }""")
    await pg.wait_for_timeout(50)
    four = await pg.evaluate("""() => {
      const r = el => { const b = el.getBoundingClientRect(); return {x:b.x,y:b.y,w:b.width,h:b.height,r:b.right,b:b.bottom}; };
      const board = document.getElementById('fourBoard');
      const back = document.getElementById('tblBack');
      const leave = document.getElementById('tblLeave');
      return { board: r(board), back: r(back), leave: r(leave), cols: board.querySelectorAll('.fourCol').length,
        page: document.documentElement.scrollWidth, boardScroll: board.scrollWidth };
    }""")
    four_ok = inside(four['board']) and inside(four['back']) and inside(four['leave']) and four['cols'] == 7 and four['back']['h'] >= 44 and four['leave']['w'] >= 44 and four['page'] <= w + 1 and four['boardScroll'] <= four['board']['w'] + 2
    check(f'{tag} four in a row board and buttons fit', four_ok, str(four))

    await pg.evaluate("""() => { document.getElementById('tableOverlay').classList.add('hidden'); document.getElementById('tableOverlay').innerHTML = ''; document.getElementById('elsewhere').classList.remove('hidden'); }""")
    else_card = await pg.evaluate("""() => {
      const card = document.querySelector('#elsewhere .card');
      const btn = document.getElementById('elsewhereGo');
      const r = card.getBoundingClientRect(), b = btn.getBoundingClientRect();
      return { x: r.x, y: r.y, r: r.right, b: r.bottom, bw: b.width, bh: b.height, page: document.documentElement.scrollWidth };
    }""")
    check(f'{tag} another-screen card fits', inside(else_card) and else_card['bh'] >= 44 and else_card['page'] <= w + 1, str(else_card))
    if save and portrait: await shot(pg, f'elsewhere-{tag}')
    await pg.evaluate("() => document.getElementById('elsewhere').classList.add('hidden')")
    if (w, h) == (375, 667):
        # Already in the clubhouse. Rotate away from home, then come back.
        await rotate_away_and_home(pg, tag, 'clubhouse')
        await pg.click('#btnMap', force=True)
        await pg.wait_for_selector('body.view-map .mapSpot')
        await pg.click('[data-go="ranch"]', force=True)
        await pg.wait_for_selector('body.view-ranch .ranchScene')
        await rotate_away_and_home(pg, tag, 'ranch')
    await ctx.close()

async def room_clears_tools(pg, tag, label):
    """The room panel must not cover the round tool row, and Map must be fully tappable."""
    data = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const tools = document.querySelector('.tools').getBoundingClientRect();
      const map = document.getElementById('btnMap').getBoundingClientRect();
      const ix = Math.max(0, Math.min(stage.right, tools.right) - Math.max(stage.left, tools.left));
      const iy = Math.max(0, Math.min(stage.bottom, tools.bottom) - Math.max(stage.top, tools.top));
      const overlap = ix > 0.5 && iy > 0.5 ? iy : 0;
      const vw = innerWidth, vh = innerHeight;
      const onScreen = map.width >= 44 && map.height >= 44 && map.left >= -1 && map.top >= -1
        && map.right <= vw + 1 && map.bottom <= vh + 1;
      // Round buttons: the square's corners sit outside the circle, so sample the disc.
      const pts = [[map.left + map.width / 2, map.top + 6], [map.left + map.width / 2, map.bottom - 6],
        [map.left + 6, map.top + map.height / 2], [map.right - 6, map.top + map.height / 2],
        [map.left + map.width / 2, map.top + map.height / 2]];
      const tap = pts.every(([x, y]) => { const hit = document.elementFromPoint(x, y); return !!(hit && hit.closest('#btnMap')); });
      return {overlap: Math.round(overlap), onScreen, tap, stageTop: Math.round(stage.top), toolsBottom: Math.round(tools.bottom)};
    }""")
    check(f'{tag} {label}: room clears tools and Map is tappable', data['overlap'] == 0 and data['onScreen'] and data['tap'], str(data))

async def rotate_away_and_home(pg, tag, where):
    await pg.set_viewport_size({'width': 667, 'height': 375})
    await pg.wait_for_timeout(150)
    await pg.set_viewport_size({'width': 375, 'height': 667})
    await pg.wait_for_timeout(200)
    await dismiss_note(pg)
    await pg.click('#btnHome', force=True)
    await pg.wait_for_selector('.tab', state='visible')
    await pg.wait_for_timeout(80)
    await room_clears_tools(pg, tag, f'home after {where} rotate')

async def check_framed(pg, tag, scene):
    """Portrait: shove her off the right edge, then her body and name tag must come back inside the viewport."""
    await pg.evaluate("""(scene) => {
      const kid = scene === 'house' ? document.querySelector('#layer .char')
        : document.querySelector(scene === 'park' ? '#pavatars .savatar.mine, #pavatars .savatar'
        : scene === 'ranch' ? '#ravatars .savatar.mine, #ravatars .savatar'
        : '#gavatars .savatar.mine, #gavatars .savatar');
      if (!kid.querySelector('.nametag')) {
        const d = document.createElement('div'); d.className = 'nametag'; d.textContent = 'Sunny Bunny'; kid.appendChild(d);
      }
      if (scene === 'house') window.__cam.set(0);
      else document.getElementById(scene === 'park' ? 'parkScroll' : scene === 'ranch' ? 'ranchScroll' : 'grScroll').scrollLeft = 0;
      window.__phoneShowKids();
    }""", scene)
    await pg.wait_for_timeout(80)
    data = await pg.evaluate("""(scene) => {
      const kid = scene === 'house' ? document.querySelector('#layer .char')
        : document.querySelector(scene === 'park' ? '#pavatars .savatar.mine, #pavatars .savatar'
        : scene === 'ranch' ? '#ravatars .savatar.mine, #ravatars .savatar'
        : '#gavatars .savatar.mine, #gavatars .savatar');
      const name = kid && kid.querySelector('.nametag');
      const port = (scene === 'house' ? document.querySelector('.stage')
        : document.getElementById(scene === 'park' ? 'parkScroll' : scene === 'ranch' ? 'ranchScroll' : 'grScroll')).getBoundingClientRect();
      const box = el => { const b = el.getBoundingClientRect(); return {l:b.left, t:b.top, r:b.right, b:b.bottom, w:b.width, h:b.height}; };
      const kb = kid && box(kid), tb = name && box(name);
      const vw = innerWidth, vh = innerHeight;
      const inside = (b, minH) => !!(b && b.w > 20 && b.h > minH
        && b.l >= -1 && b.t >= -1 && b.r <= vw + 1 && b.b <= vh + 1
        && b.l >= port.left - 1 && b.r <= port.right + 1 && b.t >= port.top - 1 && b.b <= port.bottom + 1);
      const round = b => b && {l:Math.round(b.l), t:Math.round(b.t), r:Math.round(b.r), b:Math.round(b.b), w:Math.round(b.w)};
      return {ok: inside(kb, 40) && inside(tb, 12), kid: round(kb), tag: round(tb), text: name && name.textContent, vw, vh};
    }""", scene)
    check(f'{tag} {scene} character and name tag inside portrait viewport', data['ok'], str(data))

async def ipad_pass(b, w, h):
    tag = f'ipad {w}x{h}'
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=1)
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
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
