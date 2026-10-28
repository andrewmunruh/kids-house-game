# Phone layout. iPad sizes must not match the phone gate. Local preview only.
import asyncio, os, sys
from playwright.async_api import async_playwright
from testnav import (
    tap, K, NOTE_VS_TABLE_JS, SLAY_PINK_3, about_slay_card, dim_card_contrast, face_chroma,
    inject_slay_hand, read_slay_hand, read_wait_style, read_secrets, read_door_hint, read_paddock,
)

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)
def positionals():
    skip = False
    out = []
    valued = {'--web-port', '--hood-port', '--port'}
    for a in sys.argv[1:]:
        if skip:
            skip = False
            continue
        if a in valued:
            skip = True
            continue
        if a.startswith('--'):
            continue
        out.append(a)
    return out
WEB_PORT = opt('--web-port', 'WEB_PORT', opt('--port', 'PORT', '4173'))
HOOD_PORT = opt('--hood-port', 'HOOD_PORT', '8787')
_pos = positionals()
URL = _pos[0] if _pos and _pos[0].startswith('http') else f'http://localhost:{WEB_PORT}/kids-house-game/?hood=http://localhost:{HOOD_PORT}'
SHOT = _pos[1] if _pos and _pos[0].startswith('http') and len(_pos) > 1 else (_pos[0] if _pos and not _pos[0].startswith('http') else 'screens/phone/')
os.makedirs(SHOT, exist_ok=True)
PHONES = [(390, 844), (844, 390), (375, 667), (667, 375), (932, 430)]
# Short heights stand in for iPhone landscape with Safari's tab bar showing.
SHORT = [(844, 300), (667, 280), (932, 340)]
# Stage area on ac722af at 844×300 before this pass (210×126).
OLD_STAGE_AREA_844x300 = 210 * 126
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

async def tabs_fit(pg, tag):
    """Six room tabs on one row, each a 44px target, clear of the minimap. Map stays on screen."""
    data = await pg.evaluate("""() => {
      const vis = el => !!(el && el.offsetParent);
      const tabs = [...document.querySelectorAll('.tab')].filter(vis);
      const mini = document.querySelector('.minimap');
      const mb = vis(mini) ? mini.getBoundingClientRect() : null;
      const boxes = tabs.map(el => {
        const b = el.getBoundingClientRect();
        return {name: (el.getAttribute('aria-label') || el.textContent || '').trim(), x: b.x, y: b.y, r: b.right, b: b.bottom, w: b.width, h: b.height,
          font: parseFloat(getComputedStyle(el).fontSize), clipped: el.scrollWidth > el.clientWidth + 1};
      });
      const tools = [...document.querySelectorAll('.tools .round')].filter(vis).map(el => {
        const b = el.getBoundingClientRect();
        return {id: el.id, x: b.x, r: b.right, y: b.y, b: b.bottom, w: b.width, h: b.height};
      });
      const overlap = (a, box) => {
        if (!box) return false;
        const ox = Math.min(a.r, box.right) - Math.max(a.x, box.left);
        const oy = Math.min(a.b, box.bottom) - Math.max(a.y, box.top);
        return ox > 1 && oy > 1;
      };
      const ys = boxes.map(t => t.y);
      return {n: boxes.length, names: boxes.map(t => t.name), boxes,
        oneRow: boxes.length > 0 && Math.max(...ys) - Math.min(...ys) < 10,
        overlap: boxes.some(t => overlap(t, mb)), tools, vw: innerWidth, vh: innerHeight,
        mini: mb && {w: mb.width, h: mb.height}};
    }""")
    names = data['names']
    small = [t['name'] for t in data['boxes'] if t['w'] < 44 or t['h'] < 44]
    clipped = [t['name'] for t in data['boxes'] if t['clipped']]
    off = [t['name'] for t in data['boxes'] if t['x'] < -1 or t['r'] > data['vw'] + 1 or t['y'] < -1 or t['b'] > data['vh'] + 1]
    tools_bad = [t['id'] for t in data['tools'] if t['w'] < 44 or t['h'] < 44 or t['x'] < -1 or t['r'] > data['vw'] + 1]
    check(f'{tag} six tabs on one row, 44px, clear of the minimap',
          data['n'] == 6 and names[-1] == 'Bathroom' and 'Nursery' in names and 'Living Room' in names and data['oneRow']
          and not small and not clipped and not off and not data['overlap']
          and not tools_bad and any(t['id'] == 'btnMap' for t in data['tools']),
          str({'names': names, 'small': small, 'clipped': clipped, 'off': off, 'overlap': data['overlap'], 'tools': tools_bad,
               'boxes': [{k: round(t[k]) if isinstance(t[k], float) else t[k] for k in ('name', 'x', 'w', 'r')} for t in data['boxes']]}))

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

async def pet_targets(pg, tag, save, w, h):
    """Kennel, cat tower, and their buttons stay at least 44px on a phone."""
    await pg.evaluate("""() => {
      const s = __store;
      const room = s.get().currentRoom;
      const owner = s.get().characters[0].id;
      s.dispatch({type:'dog/set', dog:{name:'Pip', breed:0, owner}});
      s.dispatch({type:'item/add', room, item:{id:'phone-kennel', kind:'kennel', x:420, y:520, flip:false, z:1, scale:1}});
      s.dispatch({type:'item/add', room, item:{id:'phone-tower', kind:'cat-tower', x:680, y:530, flip:false, z:2, scale:1}});
      s.dispatch({type:'dog/kennel', item:'phone-kennel'});
    }""")
    await pg.wait_for_timeout(400)
    await pg.click('.cat[data-cat="pets"]')
    await pg.wait_for_timeout(80)
    await pg.evaluate("""() => {
      for (const name of ['Dog Kennel', 'Cat Tower']) document.querySelector('.shelf [aria-label="' + name + '"]')?.scrollIntoView({inline:'center', block:'nearest'});
    }""")
    boxes = await pg.evaluate("""() => {
      const r = el => { if (!el) return null; const b = el.getBoundingClientRect(); return {w: Math.round(b.width), h: Math.round(b.height)}; };
      return {
        shelfKennel: r(document.querySelector('.shelf [aria-label="Dog Kennel"]')),
        shelfTower: r(document.querySelector('.shelf [aria-label="Cat Tower"]')),
        placedKennel: r(document.querySelector('.item[data-kind="kennel"]')),
        placedTower: r(document.querySelector('.item[data-kind="cat-tower"]')),
        out: r(document.querySelector('.kennelBtn')),
      };
    }""")
    sized = lambda b: b and b['w'] >= 44 and b['h'] >= 44
    check(f'{tag} kennel and cat tower are at least 44px', sized(boxes['shelfKennel']) and sized(boxes['shelfTower']) and sized(boxes['placedKennel']) and sized(boxes['placedTower']) and sized(boxes['out']), str(boxes))
    await tap(pg, '#btnPets')
    await pg.click('.petTabs [data-pt="dog"]')
    await pg.wait_for_selector('#kennelDog')
    await pg.evaluate("() => document.getElementById('kennelDog').scrollIntoView({block:'nearest'})")
    btn = await pg.locator('#kennelDog').bounding_box()
    check(f'{tag} kennel button is at least 44px', btn and btn['width'] >= 44 and btn['height'] >= 44, str(btn))
    if (w, h) == (390, 844):
        await pg.locator('.sheet:not(.hidden) .close').first.click()
        await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
        # Far apart so each shot is of one pet, not the same frame of both.
        await pg.evaluate("""() => {
          const s = __store, room = s.get().currentRoom;
          s.dispatch({type:'item/move', room, id:'phone-kennel', x:280, y:520});
          s.dispatch({type:'item/move', room, id:'phone-tower', x:1900, y:530});
          s.dispatch({type:'cat/set', cat:{name:'Mochi', coat:2, room, x:1900}});
          __cam.set(280 - 180);
        }""")
        await pg.wait_for_timeout(250)
        await shot(pg, 'kennel-dog-iphone')
        for _ in range(25):
            cat = await pg.evaluate('__pets().cat')
            if cat and cat.get('perch') in (1, 2): break
            await pg.wait_for_timeout(200)
        await pg.evaluate("__cam.set(1900 - 180)")
        await pg.wait_for_timeout(200)
        await shot(pg, 'cat-tower-iphone')
        await tap(pg, '#btnPets')
        await pg.click('.petTabs [data-pt="dog"]')
    await pg.locator('.sheet:not(.hidden) .close').first.click()
    await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await pg.evaluate("""() => {
      const s = __store, room = s.get().currentRoom;
      s.dispatch({type:'dog/kennel', item:null});
      s.dispatch({type:'item/delete', room, id:'phone-kennel'});
      s.dispatch({type:'item/delete', room, id:'phone-tower'});
      s.dispatch({type:'dog/set', dog:null});
      s.dispatch({type:'cat/set', cat:null});
    }""")

# These viewports were shipping 36px Play/Decorate buttons. The tap has to be 44px
# and the catalog row has to stay 44px so the room does not shrink.
TAP_SIZES = {(375, 667), (390, 844), (844, 390), (932, 430)}

async def no_undo_gap(pg, tag):
    """Undo is gone. Play/Decorate must sit against the next control, with no empty slot."""
    gap = await pg.evaluate("""() => {
      const undo = document.querySelector('#undoMount, #decorateUndoSlot, #menuUndoSlot, .undoBtn, .undoSlot, [aria-label="Undo"]');
      const word = [...document.querySelectorAll('button')].some(b => (b.textContent || '').trim() === 'Undo');
      const toggle = document.getElementById('modeToggle');
      const parent = toggle.parentElement;
      const tr = toggle.getBoundingClientRect();
      const next = [...parent.children].find(el => el !== toggle && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 1);
      const hole = next ? Math.round(Math.max(0, next.getBoundingClientRect().left - tr.right)) : 0;
      const menu = document.getElementById('menuPop');
      const wasHidden = menu.classList.contains('hidden');
      menu.classList.remove('hidden');
      const day = document.getElementById('menuDaySlot');
      const after = day ? day.nextElementSibling : null;
      const slot = !!(after && after.classList.contains('menuSlot'));
      const afterH = after ? Math.round(after.getBoundingClientRect().height) : 0;
      if (wasHidden) menu.classList.add('hidden');
      return { undo: !!(undo || word), hole, slot, afterH, afterId: after ? (after.id || after.className) : '', parent: parent.id || parent.className };
    }""")
    check(f'{tag} undo is gone and leaves no gap', not gap['undo'] and gap['hole'] <= 12 and not gap['slot'], str(gap))

async def mode_tap(pg, tag):
    box = await pg.evaluate("""() => {
      const t = document.getElementById('modeToggle');
      const row = document.querySelector('.drawerTop');
      const cat = document.querySelector('.cat');
      const tb = t.getBoundingClientRect();
      const rb = row.getBoundingClientRect();
      const cb = cat ? cat.getBoundingClientRect() : null;
      const btns = [...t.querySelectorAll('button')].map(b => {
        const r = b.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), label: (b.querySelector('.modeWord') || b).textContent.trim() };
      });
      return { th: Math.round(tb.height), rh: Math.round(rb.height), catH: cb ? Math.round(cb.height) : 0, btns };
    }""")
    tall = len(box['btns']) == 2 and all(b['h'] >= 44 for b in box['btns'])
    row_ok = box['th'] <= 44 and box['rh'] <= max(44, box['catH'])
    check(f'{tag} play and decorate taps are at least 44px', tall and row_ok, str(box))

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
        if h <= w: await lets_play_visible(pg, tag)
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
    await tabs_fit(pg, f'{tag} solo')
    min_shelf = 90 if portrait else 44
    check(f'{tag} drawer and shelf on screen', info['drawer']['x'] >= -1 and info['drawer']['r'] <= w + 1 and info['drawer']['b'] <= h + 1
          and info['shelf']['h'] >= min_shelf and info['shelf']['y'] >= 0 and info['shelf']['b'] <= h + 1,
          f"shelf h {info['shelf']['h']:.0f}")
    check(f'{tag} room is not a sliver', info['stage']['h'] >= 140 and info['wrap']['h'] >= 160, f"stage {info['stage']['h']:.0f} wrap {info['wrap']['h']:.0f}")
    if (w, h) in TAP_SIZES: await mode_tap(pg, tag)
    await no_undo_gap(pg, tag)
    char = await pg.evaluate("""() => {
      const c = document.querySelector('#layer .char').getBoundingClientRect();
      const s = document.querySelector('.stage').getBoundingClientRect();
      return { inside: c.left >= s.left + 6 && c.right <= s.right - 6 && c.top >= s.top - 1 && c.bottom <= s.bottom + 1,
               gapR: Math.round(s.right - c.right), gapL: Math.round(c.left - s.left), cw: Math.round(c.width) };
    }""")
    check(f'{tag} character fully in the room', char['inside'] and char['cw'] > 24, str(char))
    if (w, h) == (375, 667): await room_clears_tools(pg, tag, 'house')
    if portrait: await check_framed(pg, tag, 'house')
    if (w, h) == (375, 667): await check_portrait_kid(pg, tag)
    if not portrait: await stage_fill(pg, tag, w, h)
    if not portrait: await check_secrets(pg, tag, short=False)
    if (w, h) in ((390, 844), (844, 390)):
        pf = await pg.evaluate("""async () => {
          const row = document.querySelector('.drawerTop'); const bar = document.getElementById('drawerBar');
          if (!row || !bar) return null;
          const raf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
          const mask = () => getComputedStyle(row).webkitMaskImage || getComputedStyle(row).maskImage || '';
          const over = row.scrollWidth > row.clientWidth + 1;
          row.scrollLeft = 0; row.dispatchEvent(new Event('scroll')); await raf();
          const start = { more: bar.classList.contains('more'), mask: mask() };
          row.scrollLeft = row.scrollWidth; row.dispatchEvent(new Event('scroll')); await raf();
          const rb = row.getBoundingClientRect();
          const chips = [...row.querySelectorAll('button')].filter(b => b.offsetParent);
          const last = chips[chips.length - 1]?.getBoundingClientRect();
          const end = { back: bar.classList.contains('back'), more: bar.classList.contains('more'), mask: mask(),
            lastIn: !!last && last.right <= rb.right + 2, lastHit: !!last && document.elementFromPoint(last.left + last.width / 2, last.top + last.height / 2)?.closest('button') === chips[chips.length - 1] };
          row.scrollLeft = 0; row.dispatchEvent(new Event('scroll')); await raf();
          return { over, start, end };
        }""")
        ok = pf is not None and (not pf['over'] or (
            (not pf['start']['more'] or '56px' in pf['start']['mask']) and
            (not pf['end']['back'] or '60px' in pf['end']['mask']) and pf['end']['lastIn'] and pf['end']['lastHit']))
        check(f'{tag} pack row wide edge fade, last chip still tappable at the end', ok, str(pf))
    if (w, h) in ARROW_SIZES: await check_indoor_arrows(pg, tag)
    if (w, h) in ((390, 844), (844, 390)): await check_yard_door(pg, tag)
    if w in (375, 667): await living_room_one_line(pg, tag)
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
    check(f'{tag} own-house tools fit', bad == [] and 'btnMenu' in ids and 'btnChat' in ids and 'btnMap' in ids, str(bad or ids))
    await tabs_fit(pg, f'{tag} own-house')

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
        await tap(pg, click)
        await pg.wait_for_selector(sel)
        c = await card_ok(pg)
        check(f'{tag} {name} sheet fits', c['ok'], str(c))
        if save: await shot(pg, f'{name}-{tag}')
        await pg.locator('.sheet:not(.hidden) .close').first.click()
        await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await pet_targets(pg, tag, save, w, h)
    await tap(pg, '#btnHood')
    await pg.click('[data-m="join"]')
    await pg.wait_for_selector('#codeInput')
    c = await card_ok(pg)
    fs = await pg.evaluate("parseFloat(getComputedStyle(document.getElementById('codeInput')).fontSize)")
    ih = (await pg.locator('#codeInput').bounding_box())['height']
    check(f'{tag} join code input is 16px and tappable', c['ok'] and fs >= 16 and ih >= 44, f'fs {fs} h {ih}')
    await pg.locator('.sheet:not(.hidden) .close').first.click()
    await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await tap(pg, '#btnHood')
    await pg.click('[data-m="create"]')
    await pg.wait_for_selector('.adultCard')
    c = await card_ok(pg)
    check(f'{tag} grown-up sheet fits', c['ok'], str(c))
    if save: await shot(pg, f'grownup-{tag}')
    await pg.click('.adult [data-k="x"]')
    await pg.wait_for_function("() => !document.querySelector('.sheet:not(.hidden)')")
    await roster_targets(pg, tag)

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
    signs = await pg.evaluate("""() => [...document.querySelectorAll('.mapSign')].map(el => parseFloat(getComputedStyle(el).fontSize))""")
    check(f'{tag} map signs at least 11px', len(signs) >= 3 and min(signs) >= 11, str([round(s, 1) for s in signs]))
    badge = await pg.evaluate("""() => { const el = document.querySelector('.mapHouse .homeBadge'); return el ? parseFloat(getComputedStyle(el).fontSize) : 0; }""")
    check(f'{tag} home badge is at least 13px', badge >= 13, str(round(badge, 1)))
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
    if portrait and (w, h) in ((375, 667), (390, 844)):
        await check_paddock(pg, tag, tall=(w, h) == (390, 844))
    if not portrait:
        await check_zoo_hint(pg, tag)
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
    await check_wait_fade(pg, tag)
    await check_long_hand(pg, tag, two_row=False)

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

async def lets_play_visible(pg, tag):
    """The Let's play button is in the viewport, not scrolled below the card."""
    data = await pg.evaluate("""() => {
      const btn = document.getElementById('wnGo');
      if (!btn) return {ok: false, why: 'no button'};
      const b = btn.getBoundingClientRect();
      const card = btn.closest('.card').getBoundingClientRect();
      return {ok: b.height >= 44 && b.width >= 44 && b.top >= -1 && b.bottom <= innerHeight + 1
          && b.left >= -1 && b.right <= innerWidth + 1
          && b.top >= card.top - 1 && b.bottom <= card.bottom + 1,
        top: Math.round(b.top), bot: Math.round(b.bottom), h: Math.round(b.height), ih: innerHeight,
        cardBot: Math.round(card.bottom)};
    }""")
    check(f"{tag} Let's play is visible without scrolling", data['ok'], str(data))

async def stage_fill(pg, tag, w, h):
    """Landscape stage uses the free box, and every on-screen tool stays 44px and unclipped."""
    data = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const wrap = document.querySelector('.stageWrap').getBoundingClientRect();
      const bad = [];
      const tools = [...document.querySelectorAll('.top .tab, .top .round, .top .minimap, .drawer .cat, .drawer .rf, .shelf .thing, .nudge')]
        .filter(el => el.offsetParent && !el.classList.contains('off') && getComputedStyle(el).visibility !== 'hidden');
      for (const el of tools) {
        const b = el.getBoundingClientRect();
        const name = el.id || (el.getAttribute('aria-label') || el.className || '').toString().slice(0, 24);
        const scroller = el.classList.contains('thing') || el.classList.contains('cat') || el.classList.contains('rf');
        if (b.width < 1 || b.height < 1) continue;
        if (scroller && (b.right < 4 || b.left > innerWidth - 4)) continue;
        const horiz = b.left < -1 || b.right > innerWidth + 1;
        const vert = b.top < -1 || b.bottom > innerHeight + 1;
        if (scroller && horiz) continue;
        if (b.width < 44 || b.height < 44) bad.push('small ' + name + ' ' + Math.round(b.width) + 'x' + Math.round(b.height));
        if (vert || horiz) bad.push('clip ' + name);
      }
      const shelf = document.querySelector('.shelf').getBoundingClientRect();
      const drawer = document.querySelector('.drawer').getBoundingClientRect();
      const top = document.querySelector('.top').getBoundingClientRect();
      if (shelf.top < -1 || shelf.bottom > innerHeight + 1) bad.push('shelf clip');
      if (drawer.bottom > innerHeight + 1 || top.top < -1) bad.push('chrome clip');
      return {sw: stage.width, sh: stage.height, ww: wrap.width, wh: wrap.height,
        fillW: stage.width / wrap.width, fillH: stage.height / wrap.height, area: stage.width * stage.height, bad};
    }""")
    fill = data['fillW'] >= 0.85 or data['fillH'] >= 0.85
    check(f'{tag} stage fills the free box', fill and data['bad'] == [],
          f"stage {data['sw']:.0f}x{data['sh']:.0f} fill {data['fillW']:.2f}/{data['fillH']:.2f} {data['bad']}")
    if (w, h) == (844, 300):
        check(f'{tag} stage is about 2x the old Safari-chrome size', data['area'] >= OLD_STAGE_AREA_844x300 * 2,
              f"area {data['area']:.0f} old {OLD_STAGE_AREA_844x300}")

async def living_room_one_line(pg, tag):
    data = await pg.evaluate("""() => {
      const tab = [...document.querySelectorAll('.tab')].find(t => (t.getAttribute('aria-label') || t.textContent || '').trim() === 'Living Room');
      if (!tab) return {ok: false};
      const text = [...tab.childNodes].reverse().find(n => n.nodeType === 3 && (n.textContent || '').trim());
      const range = document.createRange();
      range.selectNodeContents(text || tab);
      const lines = range.getClientRects().length;
      const b = tab.getBoundingClientRect();
      return {lines, sw: tab.scrollWidth, cw: tab.clientWidth, w: Math.round(b.width), h: Math.round(b.height),
        font: parseFloat(getComputedStyle(tab).fontSize),
        on: b.left >= -1 && b.right <= innerWidth + 1 && b.top >= -1 && b.bottom <= innerHeight + 1};
    }""")
    check(f'{tag} Living Room stays on one line', data.get('lines') == 1 and data.get('sw', 9) <= data.get('cw', 0) + 1 and data.get('on') and data.get('font', 0) >= 13, str(data))

async def roster_targets(pg, tag):
    data = await pg.evaluate("""() => {
      const sheet = document.getElementById('sheet');
      const card = document.getElementById('card');
      const prev = sheet.className;
      sheet.className = 'sheet parent';
      card.className = 'card adultCard';
      card.innerHTML = `<h2>Grown-up screen</h2><div class="roster">
        <span class="rName claimed"><b>Cada</b><i>signed in</i><button data-p="unclaim">Reset</button></span>
        <span class="rName"><b>Chloe</b><button class="x" aria-label="Remove name">×</button></span>
        <span class="rName"><b>Quinn</b><button class="x" aria-label="Remove name">×</button></span>
      </div>`;
      const box = el => { const b = el.getBoundingClientRect(); return {w: Math.round(b.width), h: Math.round(b.height)}; };
      const reset = box(card.querySelector('[data-p="unclaim"]'));
      const xs = [...card.querySelectorAll('button.x')].map(box);
      sheet.className = 'sheet hidden';
      card.className = 'card';
      card.innerHTML = '';
      return {reset, xs};
    }""")
    ok = data['reset']['w'] >= 44 and data['reset']['h'] >= 44 and len(data['xs']) == 2 and all(x['w'] >= 44 and x['h'] >= 44 for x in data['xs'])
    check(f'{tag} roster Reset and remove are 44px', ok, str(data))

async def check_portrait_kid(pg, tag):
    """375×667: she is centred between the arrows, legs clear of Surprises, name tag clear of ›."""
    await pg.evaluate("() => window.__phoneShowKids()")
    await pg.wait_for_timeout(40)
    data = await pg.evaluate("""() => {
      const kid = document.querySelector('#layer .char');
      const name = kid && kid.querySelector('.nametag');
      if (!kid || !name) return {ok: false};
      const kb = kid.getBoundingClientRect(), tb = name.getBoundingClientRect();
      const pill = document.getElementById('secrets').getBoundingClientRect();
      const nr = document.getElementById('nudgeR').getBoundingClientRect();
      const nl = document.getElementById('nudgeL').getBoundingClientRect();
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const area = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
        * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const legs = {left: kb.left, right: kb.right, top: kb.top + kb.height * 0.55, bottom: kb.bottom};
      const safeL = Math.max(stage.left, nl.right);
      const safeR = Math.min(stage.right, nr.left);
      const mid = (Math.min(kb.left, tb.left) + Math.max(kb.right, tb.right)) / 2;
      return {legsOnPill: Math.round(area(legs, pill)), tagOnArrow: Math.round(area(tb, nr)),
        gap: Math.round(nr.left - tb.right), offCenter: Math.round(Math.abs(mid - (safeL + safeR) / 2))};
    }""")
    check(f'{tag} portrait room centres on the kid',
          data.get('legsOnPill') == 0 and data.get('tagOnArrow') == 0 and data.get('gap', -1) >= 4 and data.get('offCenter', 99) <= 28,
          str(data))

async def check_paddock(pg, tag, tall=False):
    """Portrait ranch: horses about a kid tall, with ground left to walk on."""
    data = await read_paddock(pg)
    heights = data.get('heights') or []
    if tall:
        tall_ok = bool(heights) and min(heights) >= 128 and max(heights) <= 155
    else:
        tall_ok = bool(heights) and min(heights) >= 100 and max(heights) <= 130
    check(f'{tag} paddock horses are about kid height and leave room to walk',
          data.get('dom') == 5 and data.get('n') == 3 and data.get('open', 0) > data.get('horse', 0)
          and data.get('minGap', 0) >= 8 and tall_ok and data.get('mounts'),
          str(data))
    moved = False
    tap = data.get('tap')
    if tap and data.get('me'):
        await pg.mouse.click(tap['x'], tap['y'])
        await pg.wait_for_timeout(700)
        after = await pg.evaluate("() => { const m = __ranch().me; return m && {x: m.x, ride: m.ride == null ? null : m.ride}; }")
        moved = bool(after) and abs(after['x'] - data['me']['x']) > 12 and after['ride'] is None
    check(f'{tag} a ground tap near a horse walks the kid', moved, str({'tap': tap, 'from': data.get('me')}))
    idle = await pg.evaluate("""() => {
      const horses = [...document.querySelectorAll('#ranchWorld .horse')].filter(el => getComputedStyle(el).display !== 'none' && !el.classList.contains('stallOff'));
      const h = horses[0]; if (!h) return null;
      const sc = document.getElementById('ranchScroll');
      sc.scrollLeft = h.offsetLeft - sc.clientWidth / 2 + h.offsetWidth / 2;
      const b = h.getBoundingClientRect();
      return {w: b.width, h: b.height, x: b.left + b.width / 2, y: b.top + b.height * 0.45};
    }""")
    mounted = None
    if idle:
        await pg.mouse.click(idle['x'], idle['y'])
        await pg.wait_for_timeout(400)
        mounted = await pg.evaluate("""() => {
          const m = document.querySelector('#ravatars .mount');
          if (!m) return null;
          const b = m.getBoundingClientRect();
          return {w: b.width, h: b.height};
        }""")
        hop = pg.locator('#btnHopOff')
        if await hop.count():
            await hop.click(force=True)
            await pg.wait_for_timeout(200)
    ratio = (mounted['w'] / idle['w']) if idle and mounted else 0
    check(f'{tag} mounted horse stays close to the idle horse',
          idle and mounted and 1.05 <= ratio <= 1.35 and mounted['h'] / idle['h'] <= 1.35,
          str({'idle': idle, 'mounted': mounted, 'ratio': round(ratio, 3)}))

async def check_zoo_hint(pg, tag):
    await pg.wait_for_timeout(700)
    hint = await read_door_hint(pg)
    check(f'{tag} petting zoo label is at least 12px',
          hint.get('fs', 0) >= 12 and hint.get('on') and 'Petting zoo' in (hint.get('text') or ''),
          str(hint))

def yard_door_js():
    return """() => {
      const b = document.querySelector('.yardDoor');
      const a = b && b.querySelector('.doorArt');
      const hint = b && b.querySelector('.yardHintLabel');
      if (!b || !a || !hint) return null;
      const r = b.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const hr = hint.getBoundingClientRect();
      const stageEl = document.querySelector('.stage');
      const stage = stageEl.getBoundingClientRect();
      const sc = stage.width / (stageEl.offsetWidth || 1);
      const inside = (box, host) => box.width > 8 && box.height > 8 && box.left >= host.left - 1 && box.right <= host.right + 1 && box.top >= host.top - 1 && box.bottom <= host.bottom + 1;
      const arrows = [...document.querySelectorAll('.nudge')].filter(n => !n.classList.contains('off') && n.offsetParent);
      const overlap = (box, o) => box.left < o.right - 1 && box.right > o.left + 1 && box.top < o.bottom - 1 && box.bottom > o.top + 1;
      const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
      const top = document.elementFromPoint(cx, cy);
      return {
        w: Math.round(r.width), h: Math.round(r.height), aw: Math.round(ar.width),
        doorIn: inside(r, stage), artIn: inside(ar, stage), hintIn: inside(hr, stage),
        clear: arrows.every(n => !overlap(r, n.getBoundingClientRect()) && !overlap(ar, n.getBoundingClientRect())),
        onDoor: !!(top && top.closest('.yardDoor')),
        fs: Math.round(parseFloat(getComputedStyle(hint).fontSize) * sc * 10) / 10,
        label: (hint.textContent || '').trim(),
        cx, cy,
      };
    }"""

# Indoor pan arrows, measured the way cfc0e4a draws them. iPad: top 230px inside the stage.
# Phone: centred on the stage. Seven sizes: three iPads and four phones.
ARROW_SIZES = {(1180, 820), (820, 1180), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)}

async def check_indoor_arrows(pg, tag):
    """Living room arrows stay at the cfc0e4a position. The yard may slide its door; it does not move these."""
    data = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const mid = (stage.top + stage.bottom) / 2;
      const arrows = ['nudgeL', 'nudgeR'].map(id => {
        const n = document.getElementById(id);
        const b = n.getBoundingClientRect();
        return { top: getComputedStyle(n).top, inline: n.style.top, cy: (b.top + b.bottom) / 2 };
      });
      return { phone: document.body.classList.contains('phone'), room: __store.get().currentRoom, mid, arrows };
    }""")
    if data['phone']:
        ok = data['room'] != 'backyard' and all(abs(a['cy'] - data['mid']) <= 4 for a in data['arrows'])
    else:
        ok = data['room'] != 'backyard' and all(a['top'] == '230px' and a['inline'] == '' for a in data['arrows'])
    check(f'{tag} indoor pan arrows match production', ok, str(data))

async def check_yard_door(pg, tag):
    """The whole door and its label sit on the stage, clear of the pan arrows."""
    box = await pg.evaluate(yard_door_js())
    check(f'{tag} back door is fully on stage',
          box and box['w'] >= 44 and box['h'] >= 44 and box['aw'] >= 44
          and box['doorIn'] and box['artIn'] and box['hintIn'] and box['clear'] and box['onDoor'] and box['fs'] >= 13,
          str(box))

async def tap_yard_door(pg, tag):
    """A real click, not a dispatched event, and the kid is in the yard afterwards."""
    await pg.evaluate("""() => { if (__store.get().currentRoom !== 'living') __store.dispatch({type:'room/switch', room:'living'}); }""")
    await pg.wait_for_timeout(280)
    box = await pg.evaluate(yard_door_js())
    check(f'{tag} back door is fully on stage',
          box and box['doorIn'] and box['artIn'] and box['hintIn'] and box['clear'] and box['onDoor'] and box['fs'] >= 13 and box['w'] >= 44,
          str({k: box[k] for k in box if k not in ('cx', 'cy')} if box else None))
    if not box: return
    # Touch, not a mouse click. Portrait phones drop the click if the door moves mid-gesture.
    await pg.locator('.yardHintLabel').tap()
    await pg.wait_for_timeout(350)
    room = await pg.evaluate("() => __store.get().currentRoom")
    check(f'{tag} a real touch on the door label opens the yard', room == 'backyard', str(room))
    await pg.locator('.yardHintLabel').tap()
    await pg.wait_for_timeout(350)
    room = await pg.evaluate("() => __store.get().currentRoom")
    check(f'{tag} a real touch on Back inside returns', room == 'living', str(room))
    await pg.locator('.yardDoor').tap()
    await pg.wait_for_timeout(350)
    room = await pg.evaluate("() => __store.get().currentRoom")
    check(f'{tag} a real touch on the back door opens the yard', room == 'backyard', str(room))
    back = await pg.evaluate(yard_door_js())
    check(f'{tag} Back inside is fully on stage',
          back and back['label'] == 'Back inside' and back['hintIn'] and back['doorIn'] and back['fs'] >= 13,
          str({k: back[k] for k in ('label', 'hintIn', 'doorIn', 'fs', 'w')} if back else None))
    # A cat posed on the door must not eat the tap. She is pinned across the label and the door.
    await pg.evaluate("""() => {
      __store.dispatch({ type: 'cat/set', cat: { name: 'Clover', coat: 0, room: 'backyard', x: 996 } });
      window.__pinCat = { x: 996, y: 220 };
    }""")
    await pg.wait_for_timeout(250)
    cover = await pg.evaluate("""() => {
      const cat = document.querySelector('.pet-cat');
      const hint = document.querySelector('.yardHintLabel');
      const door = document.querySelector('.yardDoor');
      if (!cat || !hint || !door) return null;
      const hit = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
      const cr = cat.getBoundingClientRect();
      return { hint: hit(cr, hint.getBoundingClientRect()), door: hit(cr, door.getBoundingClientRect()),
        top: (document.elementFromPoint((hint.getBoundingClientRect().left + hint.getBoundingClientRect().right) / 2, (hint.getBoundingClientRect().top + hint.getBoundingClientRect().bottom) / 2) || {}).className || '' };
    }""")
    check(f'{tag} a pet sits on the back door', cover and cover['hint'] and cover['door'], str(cover))
    await pg.locator('.yardHintLabel').tap()
    await pg.wait_for_timeout(350)
    room = await pg.evaluate("() => __store.get().currentRoom")
    check(f'{tag} a real touch on Back inside still works with a pet on the door', room == 'living', str(room))
    await pg.evaluate("() => { window.__pinCat = null; }")

async def check_secrets(pg, tag, short):
    """Surprises lives in the Menu. Closed, it must not cover the room."""
    del short
    closed = await read_secrets(pg)
    check(f'{tag} Surprises stays off the stage until the Menu opens',
          not closed['on'] and not closed['overlap'], str(closed))
    await pg.click('#btnMenu')
    await pg.wait_for_selector('#menuPop:not(.hidden)')
    await pg.locator('#secrets').scroll_into_view_if_needed()
    row = await pg.evaluate("""() => {
      const el = document.getElementById('secrets');
      const b = el.getBoundingClientRect();
      const count = el.querySelector('.secCount');
      const fs = parseFloat(getComputedStyle(count || el).fontSize);
      const label = (el.textContent || '').replace(/\\s+/g, ' ').trim();
      return {w: Math.round(b.width), h: Math.round(b.height), fs, label,
        on: b.width >= 44 && b.height >= 44 && b.left >= -1 && b.top >= -1 && b.right <= innerWidth + 1 && b.bottom <= innerHeight + 1};
    }""")
    check(f'{tag} Surprises is a Menu row',
          row['on'] and 'Surprises' in row['label'] and row['fs'] >= 13, str(row))
    await pg.click('#menuClose')
    await pg.wait_for_function("() => document.getElementById('menuPop').classList.contains('hidden')")

async def check_wait_fade(pg, tag):
    await inject_slay_hand(pg, 4, 'wait')
    await pg.wait_for_timeout(40)
    st = await read_wait_style(pg)
    png = await pg.locator('#slayHand .slayCard.wait').first.screenshot()
    chroma, rgb = face_chroma(png)
    check(f'{tag} waiting Slay cards keep their colors',
          st.get('allWait') and 0.35 <= st.get('opacity', 0) <= 0.55
          and 'grayscale' not in (st.get('filter') or '') and chroma >= 25,
          f'chroma={chroma} rgb={rgb} {st}')

async def check_long_hand(pg, tag, two_row, center=False):
    await inject_slay_hand(pg, 10, 'turn')
    await pg.wait_for_timeout(40)
    hand = await read_slay_hand(pg)
    rows_ok = hand['rows'] == 2 if two_row else hand['rows'] == 1 and abs(hand['margin']) < 1
    check(f'{tag} 9+ card Slay hand can be tapped and SLAY! stays on the table',
          hand['n'] == 10 and hand['bad'] == [] and hand['callIn'] and hand['callHit'] and rows_ok,
          str(hand))
    if two_row and center:
        check(f'{tag} Slay table uses the tall panel',
              hand['above'] > 80 and hand['below'] > 80 and abs(hand['above'] - hand['below']) < 80,
              str(hand))
    elif two_row:
        check(f'{tag} landscape Slay table stays at the top', hand['above'] < 48, str(hand))

async def short_chrome_pass(b, w, h):
    """Safari-chrome heights: welcome button, stage fill (≥2× at 844×300), tools stay tappable."""
    tag = f'{w}x{h}'
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='domcontentloaded')
    try:
        await pg.wait_for_selector('.whatsNew .card', timeout=4000)
    except Exception:
        pass
    if await pg.locator('.whatsNew .card').count():
        await lets_play_visible(pg, tag)
    else:
        check(f"{tag} Let's play is visible without scrolling", False, 'welcome did not show')
    await ctx.close()

    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='networkidle')
    await pg.wait_for_selector('#stage .char')
    await dismiss_note(pg)
    await pg.wait_for_timeout(60)
    info = await layout(pg)
    check(f'{tag} phone gate on', info['phone'] and not info['portrait'])
    await tabs_fit(pg, f'{tag} solo')
    await stage_fill(pg, tag, w, h)
    if w in (375, 667): await living_room_one_line(pg, tag)
    await pg.evaluate("() => { document.body.classList.add('mode-hood','own-house'); }")
    await pg.wait_for_timeout(40)
    await tabs_fit(pg, f'{tag} own-house')
    await pg.evaluate("() => { document.body.classList.remove('mode-hood','own-house'); window.dispatchEvent(new Event('resize')); }")
    await pg.wait_for_timeout(40)
    char = await pg.evaluate("""() => {
      const c = document.querySelector('#layer .char').getBoundingClientRect();
      const s = document.querySelector('.stage').getBoundingClientRect();
      return {inside: c.left >= s.left - 1 && c.right <= s.right + 1 && c.bottom <= s.bottom + 1, cw: Math.round(c.width)};
    }""")
    check(f'{tag} character still readable in the room', char['inside'] and char['cw'] >= 24, str(char))
    await check_secrets(pg, tag, short=True)
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="ranch"]')
    await pg.wait_for_selector('body.view-ranch .ranchScene')
    await check_zoo_hint(pg, tag)
    await ctx.close()

async def ipad_pass(b, w, h):
    tag = f'ipad {w}x{h}'
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=1)
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
    pg = await ctx.new_page()
    await pg.goto(URL, wait_until='networkidle')
    await pg.wait_for_selector('#stage .char')
    info = await layout(pg)
    check(f'{tag} is not a phone', not info['phone'] and not info['note'] and info['scrollW'] <= info['vw'] + 1)
    await no_undo_gap(pg, tag)
    await tabs_fit(pg, f'{tag} solo')
    await pg.evaluate("() => { document.body.classList.add('mode-hood','own-house'); }")
    await pg.wait_for_timeout(40)
    await tabs_fit(pg, f'{tag} own-house')
    if (w, h) == (820, 1180):
        mini = await pg.evaluate("""() => {
          const b = document.querySelector('.minimap').getBoundingClientRect();
          const tools = [...document.querySelectorAll('.tools .round')].filter(el => el.offsetParent).map(el => el.id);
          return { w: Math.round(b.width), h: Math.round(b.height), tools };
        }""")
        check('ipad 820x1180 minimap is at least 100px wide', mini['w'] >= 100 and mini['h'] >= 44, str(mini))
        check('ipad 820x1180 house shows Chat, Menu, and Map',
              sorted(mini['tools']) == ['btnChat', 'btnMap', 'btnMenu'], str(mini['tools']))
        tabs = await pg.evaluate("""() => [...document.querySelectorAll('.tab')].map(el => ({
          label: el.getAttribute('aria-label'), shown: (el.textContent || '').replace(/\\s+/g, ' ').trim(),
          font: parseFloat(getComputedStyle(el).fontSize), clipped: el.scrollWidth > el.clientWidth + 1
        }))""")
        check('ipad 820x1180 room tabs are at least 14px',
              tabs and all(t['font'] >= 14 and not t['clipped'] for t in tabs) and any(t['label'] == 'Living Room' and 'Living' in t['shown'] for t in tabs),
              str(tabs))
    if (w, h) in ARROW_SIZES: await check_indoor_arrows(pg, tag)
    if (w, h) in ((820, 1180), (1180, 820)): await check_yard_door(pg, tag)
    if (w, h) == (1024, 768):
        chips = await pg.evaluate("""async () => {
          const row = document.querySelector('.drawerTop');
          const bar = document.getElementById('drawerBar');
          const chip = [...document.querySelectorAll('.cat.pack')].find(el => (el.textContent || '').includes('Cozy Cottage'));
          const cueOn = () => bar.classList.contains('more') && getComputedStyle(document.getElementById('chipCue')).display !== 'none';
          const rb = row.getBoundingClientRect(), cb = chip.getBoundingClientRect();
          const clipped = cb.right > rb.right + 1 || cb.left < rb.left - 1;
          const before = cueOn();
          row.scrollLeft = row.scrollWidth;
          await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
          const atEnd = !cueOn();
          const cb2 = chip.getBoundingClientRect();
          const visibleEnd = cb2.right <= rb.right + 2 && cb2.left >= rb.left - 2;
          row.scrollLeft = 0;
          return { clipped, before, atEnd, visibleEnd, chip: Math.round(cb.width), row: Math.round(rb.width) };
        }""")
        fits = not chips['clipped']
        check('ipad 1024 drawer chips fit or show a scroll cue', fits or (chips['before'] and chips['clipped']), str(chips))
        check('ipad 1024 scroll cue disappears at the end', fits or (chips['atEnd'] and chips['visibleEnd']), str(chips))
    await pg.evaluate("() => { document.body.classList.remove('mode-hood','own-house'); }")
    await pg.evaluate("""(svg) => {
      const root = document.getElementById('tableOverlay');
      root.classList.remove('hidden');
      const seats = [1,2,3,4,5,6].map(i => `<div class="lobbySeat ${i===1?'filled me':''}"><span>${i}</span><b>${i===1?'Cara':'Empty'}</b>${i===1?'<i>host</i><i>you</i>':''}</div>`).join('');
      root.innerHTML = `<div class="tblCard game-slay"><div class="tblTop"><h2>Slay</h2></div>
        <div id="tblStage"><div class="lobby">${seats}</div></div>
        <div class="tblBar"><button type="button" id="tblBack">Back to room</button><button type="button" id="tblLeave">Leave table</button></div>
        <p class="tblWait" id="needFriend">Play with friends on your street</p></div>`;
    }""", SLAY_PINK_3)
    await pg.wait_for_timeout(40)
    note = await pg.evaluate(NOTE_VS_TABLE_JS)
    check(f'{tag} play-with-friends note does not overlap the table', note.get('overlap') is False and note.get('gap', 0) >= 40, str(note))
    await pg.evaluate("""(svg) => {
      const cards = Array.from({length: 7}, (_, i) => `<button type="button" class="slayCard ${i % 2 ? 'can' : 'dim'}" ${i % 2 ? '' : 'disabled'}>${svg}</button>`).join('');
      document.getElementById('tableOverlay').innerHTML = `<div class="tblCard game-slay"><div class="tblTop"><h2>Slay</h2></div>
        <div id="tblStage"><div class="slayFelt"><div class="whose yours">Your turn!</div>
        <div id="slayHand" class="slayHand isTurn">${cards}</div>
        <button type="button" id="slayCall" class="slayCall">SLAY!</button></div></div>
        <div class="tblBar"><button type="button" id="tblBack">Back to room</button><button type="button" id="tblLeave">Leave table</button></div></div>`;
    }""", SLAY_PINK_3)
    await pg.wait_for_timeout(40)
    card = await pg.locator('#slayHand .slayCard.dim').first.bounding_box()
    check(f'{tag} Slay hand cards are about 90x130', about_slay_card(card), str(card))
    dim_style = await pg.evaluate("""() => {
      const el = document.querySelector('#slayHand .slayCard.dim');
      const s = getComputedStyle(el);
      const shape = el.querySelector('svg rect');
      return { opacity: Number(s.opacity), border: parseFloat(s.borderTopWidth), filter: shape ? getComputedStyle(shape).filter : '' };
    }""")
    png = await pg.locator('#slayHand .slayCard.dim').first.screenshot()
    ratio, ink, face = dim_card_contrast(png)
    check(f'{tag} dim Slay card text contrast is at least 3:1',
          ratio >= 3 and dim_style['opacity'] >= 0.9 and dim_style['border'] >= 2 and 'grayscale' in dim_style['filter'],
          f'{ratio:.2f} ink={ink} face={face} {dim_style}')
    await check_wait_fade(pg, tag)
    await check_long_hand(pg, tag, two_row=True, center=(w, h) == (820, 1180))
    await ctx.close()

DOOR_TAPS = [(390, 844), (375, 667), (430, 932)]

async def yard_door_pass(browser, engine, w, h):
    tag = f'{engine} {w}x{h}'
    ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
    await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
    pg = await ctx.new_page()
    pg.on('pageerror', lambda e: check(f'{tag} no page error', False, str(e)))
    await pg.goto(URL, wait_until='networkidle')
    await pg.wait_for_selector('#stage .char')
    await dismiss_note(pg)
    if (w, h) in ARROW_SIZES: await check_indoor_arrows(pg, tag)
    await tap_yard_door(pg, tag)
    await ctx.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w, h in IPADS:
            await ipad_pass(b, w, h)
        for w, h in PHONES:
            save = (w, h) in ((390, 844), (844, 390))
            await phone_pass(b, w, h, save)
        for w, h in SHORT:
            await short_chrome_pass(b, w, h)
        for w, h in DOOR_TAPS:
            await yard_door_pass(b, 'chromium', w, h)
        await b.close()
        try:
            wb = await p.webkit.launch()
        except Exception as e:
            check('webkit back door tap', False, 'webkit did not launch: ' + str(e))
            wb = None
        if wb:
            for w, h in DOOR_TAPS:
                await yard_door_pass(wb, 'webkit', w, h)
            await wb.close()
    failed = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(failed)}/{len(res)} passed', flush=True)
    if failed:
        print('FAILED:', *failed, sep='\n  ')
        sys.exit(1)

asyncio.run(main())
