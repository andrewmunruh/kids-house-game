# Game Room: 3 simulated iPads play Slay to the end, then Four in a Row, against the local server.
# Legal moves are chosen by reading each kid's own `view`. Moves themselves go through the table UI.
# GR_BROWSER=webkit|chromium picks the engine (chromium when unset).
import asyncio, os, shutil, sys, traceback
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from testnav import (
    tap, SKIP_WN, K, to_map, go, local_page, NOTE_VS_TABLE_JS, about_slay_card, dim_card_contrast, face_chroma,
    inject_slay_hand, read_slay_hand, read_wait_style, read_secrets, read_door_hint, read_paddock,
)
BROWSER = os.environ.get('GR_BROWSER', 'chromium').strip().lower()

URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/gameroom/'
ART = '/opt/cursor/artifacts/screenshots'
# The page itself is andrewmunruh.github.io. Only the production Worker host counts.
PROD_WORKER = 'cozy-hood.andrewmunruh.workers.dev'
def hits_prod(url):
    try: return (urlparse(url).hostname or '') == PROD_WORKER
    except Exception: return False
os.makedirs(SHOT, exist_ok=True)
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

async def also_portrait(pg, name):
    await pg.set_viewport_size({'width': 820, 'height': 1180})
    await pg.wait_for_timeout(280)
    await pg.screenshot(path=SHOT + name)
    await pg.set_viewport_size({'width': 1024, 'height': 768})
    await pg.wait_for_timeout(180)

async def adult(pg):
    await pg.wait_for_selector('.adultCard .q')
    q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q):
        await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')

async def join(pg, code, nth, bring):
    await tap(pg, '#btnHood')
    await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower())
    await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None:
        await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)

async def snap(pg, tb=0):
    return await pg.evaluate("""(tb) => {
      const h = window.__hood && __hood();
      const t = h && h.tables && h.tables.get(tb);
      if (!t) return null;
      return JSON.parse(JSON.stringify({ phase: t.phase, you: t.you, seq: t.seq, host: t.host, seats: t.seats, players: t.players, pid: h.pid, status: h.status, view: t.view }));
    }""", tb)

def turn_brief(infos):
    return [(s.get('you') if s else None, (s.get('view') or {}).get('turn') if s else None, s.get('seq') if s else None, s.get('status') if s else None) for s in infos]

def same_table(infos):
    if not infos or any(s is None for s in infos):
        return False
    return len({s['seq'] for s in infos}) == 1 and len({s['phase'] for s in infos}) == 1 and len({(s.get('view') or {}).get('turn') for s in infos}) == 1

# How often WebKit's snapshot was a broadcast behind, and a later read caught up.
sync_splits = 0

async def snap_all(pages, tb=0, settle=25):
    """Read every iPad. A table broadcast can land on one WebKit page before another, so wait until seq/turn match."""
    global sync_splits
    infos = [await snap(pg, tb) for pg in pages]
    if same_table(infos):
        return infos
    sync_splits += 1
    print(f'  turn-sync: split {turn_brief(infos)}', flush=True)
    for poll in range(1, settle):
        await pages[0].wait_for_timeout(100)
        infos = [await snap(pg, tb) for pg in pages]
        if same_table(infos):
            print(f'  turn-sync: agreed after {poll} polls seq={infos[0]["seq"]} turn={(infos[0].get("view") or {}).get("turn")}', flush=True)
            return infos
    print(f'  turn-sync: still split {turn_brief(infos)}', flush=True)
    return infos

async def wait_seq(pg, tb, prev, timeout=6):
    for _ in range(timeout * 10):
        s = await snap(pg, tb)
        if s and s['seq'] != prev:
            return s
        await pg.wait_for_timeout(100)
    raise TimeoutError('table seq stayed ' + str(prev))

async def sit(pg, tb, seat):
    if (await pg.evaluate('__ui().view')) != 'gameroom':
        await go(pg, 'gameroom')
    if await pg.locator('#tableOverlay:not(.hidden)').count():
        await pg.click('#tblBack')
    chair = pg.locator(f'.grChair[data-tb="{tb}"][data-seat="{seat}"]')
    await chair.scroll_into_view_if_needed()
    await chair.click()
    for _ in range(40):
        s = await snap(pg, tb)
        if s and s['seats'][seat] == s['pid']:
            await pg.wait_for_selector('#tableOverlay:not(.hidden)', timeout=4000)
            return s
        await pg.wait_for_timeout(100)
    raise TimeoutError(f'sit tb={tb} seat={seat} failed')

def playable(card, view):
    if view.get('drawn') is not None and card['id'] != view['drawn']:
        return False
    top = view['top']
    return card['c'] == 4 or card['c'] == view['color'] or (card['v'] == top['v'] and top['c'] != 4)

def best_color(hand):
    n = [0, 0, 0, 0]
    for c in hand:
        if c['c'] < 4:
            n[c['c']] += 1
    return n.index(max(n))

async def play_card(pg, card, hand, shots):
    btn = pg.locator(f'#slayHand [data-card="{card["id"]}"]')
    await btn.scroll_into_view_if_needed()
    await btn.click()
    if card['c'] == 4:
        await pg.wait_for_selector('#crownPick', timeout=3000)
        if not shots['crown']:
            await pg.wait_for_timeout(200)
            await pg.screenshot(path=SHOT + '05-crown-picker.png')
            await also_portrait(pg, '05b-crown-portrait.png')
            shots['crown'] = True
        await pg.locator(f'#crownPick [data-color="{best_color(hand)}"]').click()

async def slay_act(pg, info, shots):
    """One UI action for this kid. Returns 'wait' when it is not her moment."""
    v = info['view'] or {}
    you = info['you']
    hand = v.get('hand') or []
    if info['phase'] != 'play' or you is None:
        return 'wait'
    flags = v.get('slay') or []
    if 0 < len(hand) <= 2 and you < len(flags) and not flags[you] and v.get('turn', -1) >= 0:
        btn = pg.locator('#slayCall')
        if await btn.count() and await btn.is_enabled():
            prev = info['seq']
            await btn.click()
            await wait_seq(pg, 0, prev)
            return 'slay'
    if v.get('turn') != you:
        return 'wait'
    choices = [c for c in hand if playable(c, v)]
    wilds = [c for c in choices if c['c'] == 4]
    plain = [c for c in choices if c['c'] != 4]
    prev = info['seq']
    if v.get('drawn') is not None:
        drawn = next((c for c in hand if c['id'] == v['drawn']), None)
        if drawn and playable(drawn, v):
            await play_card(pg, drawn, hand, shots)
        else:
            await pg.locator('#slayPass').click()
        await wait_seq(pg, 0, prev)
        return 'drawn'
    # A Crown is only required when this deal actually put a playable one in her hand.
    if wilds and not shots.get('crown'):
        shots['offered'] = True
    pick = (wilds[0] if wilds and not shots['crown'] else None) or (plain[0] if plain else None) or (wilds[0] if wilds else None)
    if pick:
        await play_card(pg, pick, hand, shots)
        await wait_seq(pg, 0, prev)
        return 'play'
    deck = pg.locator('#slayDeck')
    if await deck.is_enabled():
        await deck.click()
        await wait_seq(pg, 0, prev)
        return 'draw'
    return 'stuck'

async def hidden_hands(pages, label):
    bad = []
    for i, pg in enumerate(pages):
        r = await pg.evaluate("""() => {
          const t = __hood().tables.get(0);
          if (!t || !t.view || !Array.isArray(t.view.hand)) return { skip: true };
          const mine = new Set(t.view.hand.map(c => String(c.id)));
          const shown = [...document.querySelectorAll('[data-card]')].map(e => e.getAttribute('data-card'));
          const leaked = shown.filter(id => !mine.has(id));
          const oppCards = [...document.querySelectorAll('.slayOpp')].some(e => e.querySelector('[data-card], [data-c], [data-v]'));
          const html = document.body.innerHTML;
          return { leaked, oppCards, nHand: mine.size, nShown: shown.length, htmlHasBackdoor: [...mine].some(id => html.split('data-card="' + id + '"').length > 2) };
        }""")
        if r.get('skip') or r['leaked'] or r['oppCards'] or r['nShown'] != r['nHand']:
            bad.append(f'p{i}:{r}')
    check(label, not bad, ' '.join(bad)[:300])

def four_wins(b, c, r):
    p = b[c][r]
    for dc, dr in ((1, 0), (0, 1), (1, 1), (1, -1)):
        run = 1
        for sgn in (1, -1):
            k = 1
            while k < 4:
                x, y = c + dc * k * sgn, r + dr * k * sgn
                if x < 0 or x >= 7 or y < 0 or y >= len(b[x]) or b[x][y] != p:
                    break
                run += 1
                k += 1
        if run >= 4:
            return True
    return False

def four_col(board, me):
    opp = 1 - me
    def trial(col, p):
        if len(board[col]) >= 6:
            return False
        nb = [c[:] for c in board]
        nb[col].append(p)
        return four_wins(nb, col, len(nb[col]) - 1)
    for c in range(7):
        if trial(c, me):
            return c
    for c in range(7):
        if trial(c, opp):
            return c
    for c in (3, 2, 4, 1, 5, 0, 6):
        if len(board[c]) < 6:
            return c
    return None

async def dismiss_note(pg):
    if await pg.locator('#phoneOk').is_visible():
        await pg.click('#phoneOk', force=True)

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

async def polish_pass(b):
    """Layout checks that do not belong inside the three-iPad game."""
    for w, h in ((1024, 768), (1180, 820), (820, 1180)):
        ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, device_scale_factor=1)
        await ctx.add_init_script(SKIP_WN)
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until='networkidle')
        await pg.wait_for_selector('#stage .char')
        tag = f'{w}x{h}'
        await check_wait_fade(pg, tag)
        await check_long_hand(pg, tag, two_row=True, center=(w, h) == (820, 1180))
        await ctx.close()

    async def phone(w, h):
        ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=True, is_mobile=True, device_scale_factor=1)
        await ctx.add_init_script(f"localStorage.setItem('{K('cozy-whatsnew')}','999')")
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until='networkidle')
        await pg.wait_for_selector('#stage .char')
        await dismiss_note(pg)
        return ctx, pg

    tag = '390x844'
    ctx, pg = await phone(390, 844)
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="ranch"]')
    await pg.wait_for_selector('body.view-ranch .ranchScene')
    await pg.wait_for_timeout(300)
    data = await read_paddock(pg)
    heights = data.get('heights') or []
    check(f'{tag} paddock horses are about kid height and leave room to walk',
          data.get('dom') == 5 and data.get('n') == 3 and data.get('open', 0) > data.get('horse', 0)
          and data.get('minGap', 0) >= 8 and bool(heights) and min(heights) >= 128 and max(heights) <= 155 and data.get('mounts'),
          str(data))
    moved = False
    tap = data.get('tap')
    if tap and data.get('me'):
        await pg.mouse.click(tap['x'], tap['y'])
        await pg.wait_for_timeout(700)
        after = await pg.evaluate("() => { const m = __ranch().me; return m && {x: m.x, ride: m.ride == null ? null : m.ride}; }")
        moved = bool(after) and abs(after['x'] - data['me']['x']) > 12 and after['ride'] is None
    check(f'{tag} a ground tap near a horse walks the kid', moved, str({'tap': tap, 'from': data.get('me')}))
    await check_wait_fade(pg, tag)
    await check_long_hand(pg, tag, two_row=False)
    await ctx.close()

    tag = '844x390'
    ctx, pg = await phone(844, 390)
    pill = await read_secrets(pg)
    check(f'{tag} Surprises stays off the stage', not pill['on'] and not pill['overlap'], str(pill))
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="ranch"]')
    await pg.wait_for_selector('body.view-ranch .ranchScene')
    await pg.wait_for_timeout(700)
    hint = await read_door_hint(pg)
    check(f'{tag} petting zoo label is at least 12px',
          hint.get('fs', 0) >= 12 and hint.get('on') and 'Petting zoo' in (hint.get('text') or ''), str(hint))
    await check_wait_fade(pg, tag)
    await check_long_hand(pg, tag, two_row=False)
    await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map .mapSpot')
    await pg.click('[data-go="gameroom"]')
    await pg.wait_for_selector('.grTable')
    await pg.wait_for_timeout(300)
    table = await pg.locator('.grTable').first.bounding_box()
    check(f'{tag} clubhouse table is a tap target', table is not None and table['width'] >= 44 and table['height'] >= 44, str(table))
    await ctx.close()

    for w, h in ((844, 300), (667, 280)):
        tag = f'{w}x{h}'
        ctx, pg = await phone(w, h)
        pill = await read_secrets(pg)
        check(f'{tag} Surprises stays off the stage', not pill['on'] and not pill['overlap'], str(pill))
        await pg.click('#btnMap')
        await pg.wait_for_selector('body.view-map .mapSpot')
        await pg.click('[data-go="ranch"]')
        await pg.wait_for_selector('body.view-ranch .ranchScene')
        await pg.wait_for_timeout(700)
        hint = await read_door_hint(pg)
        check(f'{tag} petting zoo label is at least 12px',
              hint.get('fs', 0) >= 12 and hint.get('on') and 'Petting zoo' in (hint.get('text') or ''), str(hint))
        await ctx.close()

async def main():
    if BROWSER not in ('chromium', 'webkit'):
        raise SystemExit('GR_BROWSER must be webkit or chromium')
    async with async_playwright() as p:
        b = await getattr(p, BROWSER).launch()
        prod = []
        errs = {}
        async def mk(w=1024, h=768):
            c = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN)
            return c
        ctxs = [await mk() for _ in range(3)]
        pages = [await c.new_page() for c in ctxs]
        P, K2, K3 = pages
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []
            pg.set_default_timeout(8000)
            pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and 'favicon' not in m.text and errs[n].append(m.text))
            pg.on('request', lambda r: prod.append(r.url) if hits_prod(r.url) else None)
            await pg.goto(URL)
            await pg.wait_for_timeout(500)
        try:
            await polish_pass(b)
            # ---------- solo clubhouse ----------
            await to_map(P)
            check('solo map shows the clubhouse', await P.locator('[data-go="gameroom"]').count() == 1 and 'Clubhouse' in await P.inner_text('#mapWorld'))
            check('solo map still has one house, the park and the ranch',
                  await P.locator('.mapHouse').count() == 1 and await P.locator('[data-go="park"]').count() == 1 and await P.locator('[data-go="ranch"]').count() == 1 and await P.locator('.mapFace.mine').count() == 1)
            lay = [await P.evaluate(f'__mapLayout({n})') for n in range(1, 13)]
            check('map layout 1..12 still clears the clubhouse', all(l['inside'] and l['minSpot'] > -5 and (l['n'] == 1 or l['minHouse'] > 88) for l in lay),
                  str([(l['n'], round(l['minHouse']), round(l['minSpot'])) for l in lay]))
            await P.screenshot(path=SHOT + '01-map-clubhouse.png')
            await also_portrait(P, '01b-map-portrait.png')
            await go(P, 'gameroom')
            solo_txt = (await P.inner_text('#grSolo')).strip()
            solo_cls = await P.get_attribute('#grSolo', 'class') or ''
            check('solo clubhouse says Play with friends on your street', solo_txt == 'Play with friends on your street' and 'hidden' not in solo_cls.split(), solo_txt)
            await P.screenshot(path=SHOT + '02-gameroom.png')
            await P.locator('.grTable').first.click()
            await P.wait_for_timeout(250)
            check('tapping a table alone repeats that message', 'Play with friends on your street' in ' '.join(await P.locator('.toast').all_inner_texts()))
            await P.set_viewport_size({'width': 820, 'height': 1180})
            await P.wait_for_timeout(300)
            await P.screenshot(path=SHOT + '02b-gameroom-portrait.png')
            box = await P.locator('.grChair').first.bounding_box()
            check('portrait chair is a large touch target', box is not None and box['width'] >= 56 and box['height'] >= 56, str(box))
            await P.set_viewport_size({'width': 1024, 'height': 768})
            hb = await P.locator('#btnHome').bounding_box()
            mb = await P.locator('#btnMap').bounding_box()
            check('clubhouse Home button matches the other round tools', hb is not None and mb is not None and abs(hb['width'] - mb['width']) < 2 and abs(hb['height'] - mb['height']) < 2 and await P.locator('#btnHome.homeBtn').is_visible(), str(hb))
            await P.click('#btnHome')
            await P.wait_for_timeout(400)
            check('Home from the clubhouse goes back to her house', await P.evaluate("!document.body.classList.contains('view-gameroom') && !document.body.classList.contains('view-street')"))

            # ---------- three kids on a street ----------
            await tap(P, '#btnHood')
            await P.click('[data-m="create"]')
            await adult(P)
            await P.wait_for_selector('#newCode', timeout=8000)
            code = (await P.inner_text('#newCode')).strip()
            await P.click('.hoodSheet [data-m="close"]')
            await join(P, code, 0, True)
            await join(K2, code, 1, False)
            await join(K3, code, 2, False)
            await P.wait_for_timeout(600)
            names = [await pg.evaluate('__hood().players.get(__hood().pid).nickname') for pg in pages]
            check('three kids joined', len(set(names)) == 3, str(names))
            for pg in pages:
                await go(pg, 'gameroom')
            await P.wait_for_timeout(400)
            check('friends in the clubhouse hide the solo message', 'hidden' in ((await P.get_attribute('#grSolo', 'class')) or ''))
            # Everyone walks in at the door, so they are near enough to talk. The bubble has to sit on her character.
            k2pid = await K2.evaluate('__hood().pid')
            await K2.click('#btnChat'); await K2.click('.phrases button >> nth=0'); await P.wait_for_timeout(500)
            bub = await P.evaluate("""(pid) => {
              const av = document.querySelector('#gavatars .savatar[data-pid="' + pid + '"]');
              const b = av && av.querySelector('.bubble');
              if (!av || !b) return null;
              const ar = av.getBoundingClientRect(), br = b.getBoundingClientRect();
              return { text: b.textContent, above: br.bottom <= ar.top + 12, over: br.left < ar.right - 8 && br.right > ar.left + 8 };
            }""", k2pid)
            check("clubhouse: a friend's chat bubble shows over her character", bub and bub['text'] == 'Hi!' and bub['above'] and bub['over'], str(bub))
            await P.evaluate("""() => { const sc = document.getElementById('gameroom').clientHeight / 600; document.getElementById('grScroll').scrollLeft = Math.max(0, 280 * sc - innerWidth / 2); }""")
            await P.wait_for_timeout(200)
            await P.screenshot(path=SHOT + '02e-clubhouse-chat.png')
            await K2.click('[data-chat="close"]')
            await P.evaluate("""() => { const sc = document.getElementById('gameroom').clientHeight / 600; document.getElementById('grScroll').scrollLeft = Math.max(0, 720 * sc - innerWidth / 2); }""")
            await P.wait_for_timeout(200)
            await P.screenshot(path=SHOT + '02c-gameroom-with-friends.png')

            # ---------- Slay lobby ----------
            await sit(P, 0, 0)
            await P.wait_for_selector('#needFriend', timeout=4000)
            check('one kid at the table is asked to play with friends', (await P.inner_text('#needFriend')).strip() == 'Play with friends on your street')
            for w, h in ((1024, 768), (1180, 820), (820, 1180)):
                await P.set_viewport_size({'width': w, 'height': h})
                await P.wait_for_timeout(180)
                note = await P.evaluate(NOTE_VS_TABLE_JS)
                check(f'{w}x{h} play-with-friends note does not overlap the table', note.get('overlap') is False and note.get('gap', 0) >= 40, str(note))
            await P.set_viewport_size({'width': 1024, 'height': 768})
            await P.wait_for_timeout(180)
            await P.screenshot(path=SHOT + '03-slay-lobby-waiting.png')
            await sit(K2, 0, 1)
            await sit(K3, 0, 2)
            await P.wait_for_selector('#tblStart', timeout=4000)
            lobby = await P.inner_text('#tableOverlay')
            check('lobby lists the three kids and Start for the host', all(n in lobby for n in names) and 'Start' in lobby and await K2.locator('#tblStart').count() == 0, lobby[:180])
            await P.screenshot(path=SHOT + '03b-slay-lobby.png')
            await also_portrait(P, '03c-lobby-portrait.png')
            await P.click('#tblBack')
            await P.evaluate("""() => { const sc = document.getElementById('gameroom').clientHeight / 600; document.getElementById('grScroll').scrollLeft = Math.max(0, 650 * sc - innerWidth / 2); }""")
            await P.wait_for_timeout(250)
            await P.screenshot(path=SHOT + '02d-seated-at-slay.png')
            pe = await P.evaluate("""() => { const el = document.querySelector('#gavatars .savatar.seated'); return el ? getComputedStyle(el).pointerEvents : 'missing'; }""")
            check('seated avatar does not eat table taps', pe == 'none', pe)
            await P.locator('.grTable[data-tb="0"]').click()
            await P.click('#tblStart')
            for pg in pages:
                for _ in range(50):
                    s = await snap(pg, 0)
                    if s and s['phase'] == 'play' and s['view'] and len(s['view'].get('hand') or []) >= 1:
                        break
                    await pg.wait_for_timeout(100)
                else:
                    raise TimeoutError('deal never arrived')
            await P.wait_for_selector('#slayHand .slayCard')
            await P.wait_for_selector('#slayCall')
            async def slay_hand_size(tag):
                hand_box = await P.locator('#slayHand .slayCard').first.bounding_box()
                call_box = await P.locator('#slayCall').bounding_box()
                check(f'{tag} Slay hand cards are about 90x130', about_slay_card(hand_box), str(hand_box))
                check(f'{tag} SLAY! button stays a big touch target',
                      call_box and call_box['height'] >= 56 and call_box['width'] >= 120, str(call_box))
                return hand_box, call_box
            hand_box, call_box = await slay_hand_size('1024x768')
            dim = P.locator('#slayHand .slayCard.dim')
            if await dim.count() == 0:
                await P.evaluate("""() => {
                  const src = document.querySelector('#slayHand .slayCard');
                  const c = src.cloneNode(true);
                  c.className = 'slayCard dim'; c.disabled = true; c.id = 'dimProbe';
                  src.parentElement.appendChild(c);
                }""")
                dim = P.locator('#dimProbe')
            dim_style = await P.evaluate("""() => {
              const el = document.querySelector('#slayHand .slayCard.dim');
              const s = getComputedStyle(el);
              const shape = el.querySelector('svg rect, svg path, svg circle');
              return { opacity: Number(s.opacity), border: parseFloat(s.borderTopWidth), filter: shape ? getComputedStyle(shape).filter : '' };
            }""")
            png = await dim.first.screenshot()
            if await P.locator('#dimProbe').count():
                await P.evaluate("() => document.getElementById('dimProbe')?.remove()")
            ratio, ink, face = dim_card_contrast(png)
            check('dim Slay card text contrast is at least 3:1',
                  ratio >= 3 and dim_style['opacity'] >= 0.9 and dim_style['border'] >= 2 and 'grayscale' in dim_style['filter'],
                  f'{ratio:.2f} ink={ink} face={face} {dim_style}')
            waiter = None
            for pg in pages:
                s = await snap(pg, 0)
                if s and s.get('view') and s.get('you') is not None and s['view'].get('turn') != s['you']:
                    waiter = pg
                    break
            check('a kid is waiting out the Slay turn', waiter is not None)
            if waiter:
                await waiter.wait_for_selector('#slayHand .slayCard.wait')
                st = await read_wait_style(waiter)
                png = await waiter.locator('#slayHand .slayCard.wait').first.screenshot()
                chroma, rgb = face_chroma(png)
                check('waiting Slay hand keeps card colors in the live game',
                      st.get('allWait') and st.get('opacity', 0) >= 0.35 and st.get('opacity', 1) <= 0.55
                      and 'grayscale' not in (st.get('filter') or '') and chroma >= 15,
                      f'chroma={chroma} rgb={rgb} {st}')
            await P.screenshot(path=SHOT + '04-slay-midgame.png')
            for w, h in ((1180, 820), (820, 1180)):
                await P.set_viewport_size({'width': w, 'height': h})
                await P.wait_for_timeout(200)
                await slay_hand_size(f'{w}x{h}')
            await P.set_viewport_size({'width': 1024, 'height': 768})
            await P.wait_for_timeout(150)
            await hidden_hands(pages, 'dealt hands stay on their own iPad')
            await P.set_viewport_size({'width': 820, 'height': 1180})
            await P.wait_for_timeout(300)
            pbox = await P.locator('#slayCall').bounding_box()
            check('portrait SLAY! button stays tappable', pbox and pbox['height'] >= 56 and pbox['width'] >= 120, str(pbox))
            await P.screenshot(path=SHOT + '04b-slay-portrait.png')
            await P.set_viewport_size({'width': 1024, 'height': 768})
            await P.wait_for_timeout(200)

            # ---------- reconnect mid-game ----------
            before = sorted(c['id'] for c in (await snap(K2, 0))['view']['hand'])
            state = await ctxs[1].storage_state()
            await ctxs[1].close()
            await asyncio.sleep(0.4)
            ctxs[1] = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True, storage_state=state)
            await ctxs[1].add_init_script(SKIP_WN)
            K2 = await ctxs[1].new_page()
            pages[1] = K2
            errs['K2b'] = []
            K2.set_default_timeout(8000)
            K2.on('pageerror', lambda e: errs['K2b'].append(str(e)))
            K2.on('console', lambda m: m.type == 'error' and 'favicon' not in m.text and errs['K2b'].append(m.text))
            K2.on('request', lambda r: prod.append(r.url) if hits_prod(r.url) else None)
            await K2.goto(URL)
            for _ in range(80):
                online = await K2.evaluate("""() => { try { const h = __hood(); const t = h && h.tables && h.tables.get(0); return !!(h && h.status === 'online' && t && t.phase === 'play' && t.view && t.view.hand); } catch (e) { return false; } }""")
                if online:
                    break
                await K2.wait_for_timeout(100)
            else:
                raise TimeoutError('reconnect did not resume the table')
            after = sorted(c['id'] for c in (await snap(K2, 0))['view']['hand'])
            check('reconnect keeps the same cards', before == after, str(before) + ' -> ' + str(after))
            await go(K2, 'gameroom')
            await K2.locator('.grTable[data-tb="0"]').click()
            await K2.wait_for_selector('#slayHand .slayCard')
            dom_ids = sorted(int(x) for x in await K2.eval_on_selector_all('#slayHand [data-card]', 'els => els.map(e => e.getAttribute("data-card"))'))
            check('reconnected iPad shows her own hand again', dom_ids == before, str(dom_ids))
            await hidden_hands(pages, 'after reconnect, other hands stay off the screen')

            # ---------- she closes her tab on her turn; nobody else taps ----------
            infos = [await snap(pg, 0) for pg in pages]
            turn = infos[0]['view']['turn']
            away_i = next(i for i, info in enumerate(infos) if info and info['you'] == turn)
            watcher = pages[(away_i + 1) % 3]
            if not await watcher.locator('#tableOverlay:not(.hidden)').count():
                await watcher.locator('.grTable[data-tb="0"]').click()
                await watcher.wait_for_selector('#slayHand')
            away_state = await ctxs[away_i].storage_state()
            await ctxs[away_i].close()
            saw_badge = False
            found = False
            for _ in range(26):
                if await watcher.locator('.awayBadge').count():
                    saw_badge = True
                if await watcher.locator('#tblNudge').count():
                    found = True
                    break
                await watcher.wait_for_timeout(1000)
            check('away badge shows on her seat after she leaves', saw_badge)
            check('Play for her appears within 25s with no other taps', found)
            ctxs[away_i] = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True, storage_state=away_state)
            await ctxs[away_i].add_init_script(SKIP_WN)
            back = await ctxs[away_i].new_page()
            pages[away_i] = back
            P, K2, K3 = pages
            errs['awayBack'] = []
            back.set_default_timeout(8000)
            back.on('pageerror', lambda e: errs['awayBack'].append(str(e)))
            back.on('console', lambda m: m.type == 'error' and 'favicon' not in m.text and errs['awayBack'].append(m.text))
            back.on('request', lambda r: prod.append(r.url) if hits_prod(r.url) else None)
            await back.goto(URL)
            for _ in range(80):
                online = await back.evaluate("""() => { try { const h = __hood(); const t = h && h.tables && h.tables.get(0); return !!(h && h.status === 'online' && t && t.phase === 'play'); } catch (e) { return false; } }""")
                if online:
                    break
                await back.wait_for_timeout(100)
            else:
                raise TimeoutError('away player did not reconnect')
            await go(back, 'gameroom')
            await back.locator('.grTable[data-tb="0"]').click()
            await back.wait_for_selector('#slayHand .slayCard')

            # ---------- play Slay to the end ----------
            shots = {'crown': False, 'offered': False}
            moves = 0
            phase = 'play'
            while phase != 'over' and moves < 450:
                infos = await snap_all(pages, 0)
                phase = infos[0]['phase'] if infos[0] else 'missing'
                if phase == 'over':
                    break
                acted = False
                for pg, info in zip(pages, infos):
                    if not info:
                        continue
                    kind = await slay_act(pg, info, shots)
                    if kind != 'wait':
                        moves += 1
                        acted = True
                        if moves % 40 == 0:
                            counts = (await snap(pages[0], 0))['view']['counts']
                            print(f'  slay move {moves} ({kind}) counts={counts}', flush=True)
                        break
                if not acted:
                    dump = turn_brief(infos)
                    raise TimeoutError('nobody could move ' + str(dump))
            final = await snap_all(pages, 0)
            check('Slay finishes', all(s and s['phase'] == 'over' for s in final), f'moves={moves} phase={final[0]["phase"] if final[0] else None}')
            check('someone played a Crown (color picker appeared)', shots['crown'] or not shots.get('offered'),
                  'picker shown' if shots['crown'] else 'no playable Crown in this deal')
            banners = []
            for pg in pages:
                if await pg.locator('#winBanner').count():
                    banners.append((await pg.inner_text('#winBanner')).strip())
            check('winner celebration says You slayed!', any(t == 'You slayed!' for t in banners), str(banners))
            check('finished Slay hides the turn bar and the SLAY! button', await pages[0].locator('#slayCall').count() == 0 and await pages[0].locator('#whoseTurn').count() == 0)
            winner_pg = None
            for pg in pages:
                if await pg.locator('#winBanner').count() and (await pg.inner_text('#winBanner')).strip() == 'You slayed!':
                    winner_pg = pg
                    break
            if winner_pg:
                await winner_pg.wait_for_timeout(400)
                await winner_pg.screenshot(path=SHOT + '06-you-slayed.png')
                await also_portrait(winner_pg, '06b-slayed-portrait.png')
            await hidden_hands(pages, 'finished game still hides other hands')

            # ---------- Four in a Row ----------
            await sit(P, 1, 0)
            await sit(K2, 1, 1)
            await P.wait_for_selector('#tblStart', timeout=4000)
            await P.screenshot(path=SHOT + '07-four-lobby.png')
            await P.click('#tblStart')
            for _ in range(50):
                s = await snap(P, 1)
                if s and s['phase'] == 'play':
                    break
                await P.wait_for_timeout(100)
            else:
                raise TimeoutError('four did not start')
            shot_four = False
            fmoves = 0
            while fmoves < 50:
                a, b2 = await snap(P, 1), await snap(K2, 1)
                if not a or a['phase'] == 'over':
                    break
                who, pg = (a, P) if a['view']['turn'] == a['you'] else (b2, K2)
                if who['view']['turn'] != who['you']:
                    await pg.wait_for_timeout(150)
                    continue
                board = who['view']['b']
                if not shot_four and any(board[c] for c in range(7)) and fmoves >= 1:
                    await pg.wait_for_timeout(150)
                    await pg.screenshot(path=SHOT + '08-four-midgame.png')
                    await also_portrait(pg, '08b-four-portrait.png')
                    shot_four = True
                col = four_col(board, who['you'])
                prev = who['seq']
                cell = pg.locator(f'#fourBoard .fourCol[data-col="{col}"]')
                await cell.click()
                await wait_seq(pg, 1, prev)
                fmoves += 1
            fa, fb = await snap(P, 1), await snap(K2, 1)
            check('Four in a Row finishes', fa and fb and fa['phase'] == 'over' and fb['phase'] == 'over', f'moves={fmoves} phase={fa["phase"] if fa else None}')
            if not shot_four and fa and fa['phase'] == 'over':
                await P.screenshot(path=SHOT + '08-four-midgame.png')
            fbanners = []
            for pg in (P, K2):
                if await pg.locator('#winBanner').count():
                    fbanners.append((await pg.inner_text('#winBanner')).strip())
            check('Four in a Row announces a winner or a tie', any(('four' in t.lower()) or ('tie' in t.lower()) for t in fbanners), str(fbanners))
            hearts = await P.locator('.fourCell.heart').count() + await K2.locator('.fourCell.heart').count()
            stars = await P.locator('.fourCell.star').count() + await K2.locator('.fourCell.star').count()
            check('board shows pink hearts and aqua stars', hearts > 0 and stars > 0, f'hearts={hearts} stars={stars}')
            colb = await P.locator('.fourCol').first.bounding_box()
            check('Four in a Row columns are big touch targets', colb and colb['width'] >= 60 and colb['height'] >= 80, str(colb))
            endp = P if any('four' in t.lower() and t.lower().startswith('you') for t in fbanners) else P
            for pg in (P, K2):
                if await pg.locator('#winBanner').count() and 'you' in (await pg.inner_text('#winBanner')).lower():
                    endp = pg
                    break
            chips = ' | '.join(await endp.locator('.playerChip b').all_inner_texts())
            check('Four chips show a first name and a heart or star', '♥' in chips and '★' in chips and 'Hearts' not in chips and 'Stars' not in chips, chips)
            check('finished Four hides the empty turn bar', await endp.locator('#whoseTurn').count() == 0)
            backb = await endp.locator('#tblBack').bounding_box()
            leaveb = await endp.locator('#tblLeave').bounding_box()
            vp_h = (endp.viewport_size or {'height': 768})['height']
            on_screen = bool(backb and leaveb and backb['y'] >= 0 and leaveb['y'] >= 0 and backb['y'] + backb['height'] <= vp_h + 1 and leaveb['y'] + leaveb['height'] <= vp_h + 1)
            check('Four in a Row Back and Leave stay on screen in landscape', on_screen, f'back={backb} leave={leaveb} h={vp_h}')
            await endp.screenshot(path=SHOT + '09-four-done.png')
            await also_portrait(endp, '09b-four-done-portrait.png')

            print(f'  turn-sync splits: {sync_splits}', flush=True)
            check('tests never called the production Worker', not prod, str(prod[:3]))
            flat = [f'{n}: {e}' for n, es in errs.items() for e in es]
            check('no JS errors', not flat, ' | '.join(flat[:4]))
        except Exception:
            traceback.print_exc()
            flat_err = [f'{n}: {e}' for n, es in errs.items() for e in es]
            if flat_err:
                print('JS errors during failure:', ' | '.join(flat_err[:8]), flush=True)
            check('suite ran to completion', False, 'exception above')
            try:
                await P.screenshot(path=SHOT + '99-debug.png')
            except Exception:
                pass
        finally:
            try:
                os.makedirs(ART, exist_ok=True)
                for fn in os.listdir(SHOT):
                    if fn.endswith('.png'):
                        shutil.copy(os.path.join(SHOT, fn), os.path.join(ART, 'glam-' + fn))
            except OSError as e:
                print('artifact copy skipped:', e, flush=True)
            print(f"\n{sum(res.values())}/{len(res)} checks passed", flush=True)
            await b.close()
    if not all(res.values()):
        sys.exit(1)

asyncio.run(main())
