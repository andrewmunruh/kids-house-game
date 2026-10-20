# Neighborhood map + barn navigation: solo + 3 simulated iPads against a neighborhood server.
import asyncio, sys, json
from playwright.async_api import async_playwright
from testnav import tap, PFX, SKIP_WN, K, to_map, go, local_page
URL = sys.argv[1] if len(sys.argv) > 1 else local_page()
SHOT = sys.argv[2] if len(sys.argv) > 2 else 'screens/map/'
res = {}
def check(name, ok, extra=''):
    res[name] = bool(ok); print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)
async def adult(pg):
    await pg.wait_for_selector('.adultCard .q'); q = int(await pg.get_attribute('.adultCard .q', 'data-q'))
    for d in str(q): await pg.click(f'.adultCard [data-k="{d}"]')
    await pg.click('.adultCard [data-k="OK"]')
async def join(pg, code, nth, bring):
    await tap(pg, '#btnHood'); await pg.click('[data-m="join"]')
    await pg.fill('#codeInput', code.lower()); await pg.click('#codeForm button')
    await pg.locator('.nicks button').nth(nth).click()
    if bring is not None: await pg.click('[data-m="bring"]' if bring else '[data-m="fresh"]')
    await pg.wait_for_selector('body.view-map .mapHouse', timeout=8000)
UI = lambda pg: pg.evaluate('__ui()')
ME = lambda pg: pg.evaluate('__hood().myPresence()')
async def map_btn_ok(pg):
    b = await pg.locator('#btnMap').bounding_box()
    return b is not None and await pg.locator('#btnMap').is_visible() and b['x'] + b['width'] > 1024 - 70 and b['y'] < 70
async def wait_map_settled(pg):
    """The zoom and the map-in animation move the world. Fit checks wait until it is still."""
    await pg.evaluate("() => { window.__mapFit = null; }")
    await pg.wait_for_function("""() => {
      const w = document.getElementById('mapWorld');
      if (!w) return false;
      if (w.classList.contains('zoomIn')) return false;
      const anims = w.getAnimations ? w.getAnimations() : [];
      if (anims.some(a => a.playState === 'running')) return false;
      const r = w.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return false;
      const prev = window.__mapFit;
      const now = { l: r.left, t: r.top, w: r.width, h: r.height };
      window.__mapFit = now;
      if (!prev) return false;
      return Math.abs(prev.l - now.l) < 0.6 && Math.abs(prev.t - now.t) < 0.6
        && Math.abs(prev.w - now.w) < 0.6 && Math.abs(prev.h - now.h) < 0.6;
    }""", timeout=5000)

async def place_bar(pg, title):
    """Room tabs stay inside a house. Everywhere else the top bar names the place."""
    data = await pg.evaluate("""(title) => {
      const tabs = document.querySelector('.tabs');
      const titleEl = document.getElementById('streetTitle');
      const tr = titleEl.getBoundingClientRect();
      return {
        hidden: getComputedStyle(tabs).display === 'none',
        title: (titleEl.textContent || '').trim(),
        w: tr.width, h: tr.height, top: tr.top, bottom: tr.bottom
      };
    }""", title)
    return data['hidden'] and data['title'] == title and data['w'] > 40 and data['h'] >= 18 and data['top'] >= -1 and data['bottom'] < 90

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def mk():
            c = await b.new_context(viewport={'width': 1024, 'height': 768}, device_scale_factor=2, has_touch=True)
            await c.add_init_script(SKIP_WN); return c
        P, K2, K3 = [await (await mk()).new_page() for _ in range(3)]
        errs = {}
        for name, pg in (('P', P), ('K2', K2), ('K3', K3)):
            errs[name] = []; pg.on('pageerror', lambda e, n=name: errs[n].append(str(e)))
            pg.on('console', lambda m, n=name: m.type == 'error' and errs[n].append(m.text))
            await pg.goto(URL); await pg.wait_for_timeout(600)
        # ---------------- solo ----------------
        check('map button in the top-right corner of the house', await map_btn_ok(P))
        await P.locator('#btnMap').tap(); await P.wait_for_selector('body.view-map #mapWorld .mapSpot'); await P.wait_for_timeout(500)
        check('solo map: her house, the park, Rainbow Ranch and her face', await P.locator('.mapHouse').count() == 1 and await P.locator('[data-go="park"]').count() == 1 and await P.locator('[data-go="ranch"]').count() == 1 and await P.locator('.mapFace.mine').count() == 1 and 'My House' in await P.inner_text('#mapWorld'))
        check('map hides room tabs and shows the place name', await place_bar(P, 'My Map'))
        await wait_map_settled(P)
        check('map fits the screen (no sideways street scrolling)', await P.evaluate("(() => { const s = document.getElementById('street'), w = document.getElementById('mapWorld').getBoundingClientRect(); return s.scrollWidth <= s.clientWidth + 1 && w.left >= -1 && w.right <= innerWidth + 1 && w.bottom <= innerHeight + 1; })()"))
        await P.screenshot(path=SHOT + '01-solo-map.png')
        await P.locator('[data-go="park"]').tap(); await P.wait_for_timeout(120)
        zoom = await P.evaluate("document.getElementById('mapWorld').classList.contains('zoomIn')")
        await P.wait_for_timeout(450)
        check('tap a place (touch) -> quick zoom transition -> there', zoom and (await UI(P))['view'] == 'park' and await P.locator('#pavatars .savatar').count() == 1)
        check('map button visible in the park', await map_btn_ok(P))
        check('park hides room tabs and names the park', await place_bar(P, 'The Park'))
        await go(P, 'ranch'); check('map button visible at the ranch', await map_btn_ok(P))
        check('ranch hides room tabs and names the ranch', await place_bar(P, 'Rainbow Ranch'))
        await P.click('.barnDoor'); await P.wait_for_selector('body.in-barn .barnScene'); await P.wait_for_timeout(400)
        check('map button + "go outside" button in the barn', await map_btn_ok(P) and await P.locator('#btnLeavePark').is_visible())
        await P.click('#btnLeavePark'); await P.wait_for_timeout(500)
        check('"go outside" leaves the barn into the yard', (await P.evaluate('__ranch()'))['inBarn'] is False and (await UI(P))['view'] == 'ranch')
        await go(P, 'gameroom'); check('clubhouse hides room tabs and names the clubhouse', await place_bar(P, 'The Clubhouse'))
        await go(P, 'home'); check('map -> home again', (await UI(P))['view'] == 'house' and await map_btn_ok(P))
        check('room tabs come back inside the house', await P.evaluate("getComputedStyle(document.querySelector('.tabs')).display !== 'none' && document.querySelectorAll('.tab').length === 5"))
        # house layouts for 1..12 houses (roster max is 12): never on top of each other, the park, ranch or square
        await to_map(P)
        lay = [await P.evaluate(f'__mapLayout({n})') for n in range(1, 13)]
        check('map layout 1..12 houses: no overlaps, all on the map', all(l['inside'] and l['minSpot'] > -5 and (l['n'] == 1 or l['minHouse'] > 88) for l in lay), json.dumps([(l['n'], round(l['minHouse']), round(l['minSpot'])) for l in lay]))
        await go(P, 'home')
        # ---------------- neighborhood ----------------
        await tap(P, '#btnHood'); await P.click('[data-m="create"]'); await adult(P)
        try: await P.wait_for_selector('#newCode', timeout=8000)
        except Exception:
            print('DBG', await P.evaluate("document.body.className"), await P.evaluate("[...document.querySelectorAll('.toast,.hoodSheet,.adultCard')].map(t=>t.className+':'+t.textContent.slice(0,80)).join(' | ')")); await P.screenshot(path='/tmp/dbgfail.png'); raise
        code = (await P.inner_text('#newCode')).strip(); await P.click('.hoodSheet [data-m="close"]')
        await join(P, code, 0, True); await join(K2, code, 1, False); await join(K3, code, 2, False); await P.wait_for_timeout(900)
        names = await P.evaluate("[...__hood().houses.values()].map(h => h.meta.name)")
        signs = await P.locator('.mapSign:not(.place)').all_inner_texts()
        check('street map: every kid\'s house with her name sign', await P.locator('.mapHouse').count() == 3 and all(any(n[:12] in s for s in signs) for n in names), json.dumps(signs))
        offs = await P.evaluate("(() => { const W = innerWidth; return [...document.querySelectorAll('.mapSign')].filter(e => { const r = e.getBoundingClientRect(); return r.left < 0 || r.right > W || e.scrollWidth > e.clientWidth + 1; }).map(e => e.textContent); })()")
        check('every map sign is fully on screen (not cut off)', offs == [], json.dumps(offs))
        async def pois_in_view(pg):
            return await pg.evaluate("""() => {
              const pad = 2, bad = [];
              for (const el of document.querySelectorAll('.mapHouse,.mapPark,.mapRanch,.mapClub,.mapSign,.mapMail,.mapFace,.fname')) {
                const r = el.getBoundingClientRect();
                if (r.width < 1 || r.height < 1) { bad.push('empty ' + (el.className || '')); continue; }
                if (r.left < -pad || r.top < -pad || r.right > innerWidth + pad || r.bottom > innerHeight + pad)
                  bad.push(((el.getAttribute('aria-label') || el.textContent || el.className) + '').trim().slice(0, 28)
                    + '@' + Math.round(r.left) + ',' + Math.round(r.top) + ' ' + Math.round(r.right) + 'x' + Math.round(r.bottom));
                if (el.classList.contains('mapSign') && el.scrollWidth > el.clientWidth + 1) bad.push('cut:' + el.textContent);
              }
              const signs = [...document.querySelectorAll('.mapSign')].map(e => e.getBoundingClientRect());
              for (const m of document.querySelectorAll('.mapMail')) {
                const b = m.getBoundingClientRect();
                for (const s of signs) {
                  if (Math.min(b.right, s.right) - Math.max(b.left, s.left) > 2 && Math.min(b.bottom, s.bottom) - Math.max(b.top, s.top) > 2)
                    bad.push('mailbox-on-' + (s.width ? 'label' : 'sign'));
                }
              }
              return bad;
            }""")
        for w, h in ((1024, 768), (820, 1180), (1180, 820), (390, 844), (375, 667)):
            await P.set_viewport_size({'width': w, 'height': h})
            await wait_map_settled(P)
            bad = await pois_in_view(P)
            check(f'map POIs fit inside {w}x{h}', bad == [], json.dumps(bad))
        await P.set_viewport_size({'width': 1024, 'height': 768})
        await P.wait_for_timeout(700)
        check('everyone shows as a face on every map', [await pg.locator('.mapFace').count() for pg in (P, K2, K3)] == [3, 3, 3])
        k2pid, k3pid, ppid = [await pg.evaluate('__hood().pid') for pg in (K2, K3, P)]
        p_house = await P.evaluate('__hood().myHouseId()')
        await go(K2, 'park'); await P.wait_for_timeout(900)
        check('friend goes to the park -> her face moves there on my map (live)', await P.get_attribute(f'.mapFace[data-pid="{k2pid}"]', 'data-place') == 'park')
        await go(K3, f'house:{p_house}'); await K3.evaluate("document.querySelector('[data-room=\"kitchen\"]').click()"); await P.wait_for_timeout(900)
        check('friend visits my house -> her face at my house', await P.get_attribute(f'.mapFace[data-pid="{k3pid}"]', 'data-place') == f'house:{p_house}')
        await P.screenshot(path=SHOT + '02-street-map-faces.png')
        await P.locator(f'.mapFace[data-pid="{k2pid}"]').tap(); await P.wait_for_timeout(1000)
        me, k2 = await ME(P), await ME(K2)
        check('tap a friend\'s face -> go where she is, next to her', me['where'] == 'park' and abs(me['x'] - k2['x']) < 200, f"{me['x']:.0f} vs {k2['x']:.0f}")
        check('...and she sees me arrive', await K2.locator(f'#pavatars .savatar[data-pid="{ppid}"]').count() == 1)
        await to_map(P); await P.locator(f'.mapFace[data-pid="{k3pid}"]').tap(); await P.wait_for_timeout(1000)
        me = await ME(P)
        check('tap a friend in a house -> same house, same room', me['where'] == 'house' and me['houseId'] == p_house and me['room'] == 'kitchen' and (await UI(P))['currentHouseId'] == p_house, json.dumps(me))
        await P.click('#btnMenu'); await P.wait_for_selector('#menuPop:not(.hidden)')
        lock = await P.evaluate("""() => {
          const row = document.getElementById('btnLock');
          const svg = row.querySelector('svg');
          const r = svg ? svg.getBoundingClientRect() : { width: 0, height: 0 };
          return { show: getComputedStyle(row).display !== 'none', w: r.width, h: r.height, tabs: getComputedStyle(document.querySelector('.tabs')).display };
        }""")
        check('Lock my house has a padlock, and room tabs stay in the house', lock['show'] and lock['w'] >= 24 and lock['h'] >= 24 and lock['tabs'] != 'none', json.dumps(lock))
        await P.click('#menuClose'); await P.wait_for_function("() => document.getElementById('menuPop').classList.contains('hidden')")
        await go(K2, 'barn'); await to_map(P); await P.wait_for_timeout(500)
        check('friend in the barn shows at the ranch on the map', await P.get_attribute(f'.mapFace[data-pid="{k2pid}"]', 'data-place') == 'barn')
        await P.locator(f'.mapFace[data-pid="{k2pid}"]').tap(); await P.wait_for_timeout(1100)
        me = await ME(P)
        check('tap her face -> into the barn with her', me['where'] == 'barn' and await P.locator('.animal').count() == 6 and await P.locator(f'#ravatars .savatar[data-pid="{k2pid}"]').count() == 1)
        await P.screenshot(path=SHOT + '03-found-friend-in-barn.png')
        await P.locator('.animal[data-animal="1"]').click(force=True); await K2.wait_for_timeout(500)
        check('petting in the barn is seen live by a friend in the barn', await K2.locator('.animal[data-animal="1"] .abubble').count() == 1)
        await to_map(K3); await K3.locator(f'.mapFace[data-pid="{ppid}"]').tap(); await K3.wait_for_timeout(1100)
        check('three kids together in the barn', [await pg.locator('#ravatars .savatar').count() for pg in (P, K2, K3)] == [3, 3, 3])
        await to_map(P); await P.locator('.mapFace.mine').tap(); await P.wait_for_timeout(300)
        check('tapping my own face just says hi (no navigation)', (await UI(P))['view'] == 'street')
        # chat on the map: kids on the map can talk (bubbles on faces)
        await to_map(K2); await K2.wait_for_timeout(400)
        await K2.click('#btnChat'); await K2.click('.emotes [data-emote="0"]'); await P.wait_for_timeout(600)
        check('chat on the map: a friend\'s bubble shows on her face', await P.locator(f'.mapFace[data-pid="{k2pid}"] .bubble').count() == 1)
        # storage: only this build's keys are used
        keys = await P.evaluate("Object.keys(localStorage)")
        check(f'localStorage keys all use the build prefix "{PFX}"', all(k.startswith(PFX) for k in keys) if PFX else True, json.dumps(keys))
        for k, v in errs.items():
            v = [e for e in v if '429' not in e]
            check(f'no JS errors ({k})', not v, '; '.join(v[:3]))
        await b.close()
    print(f"\n{sum(res.values())}/{len(res)} passed")
asyncio.run(main())
