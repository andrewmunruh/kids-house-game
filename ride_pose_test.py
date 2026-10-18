# Mounted pose + riding behavior at Rainbow Ranch (solo, local preview).
# Measures the shirt hem against the saddle at every character size, checks hands and depth,
# and covers galloping to another horse, dismount, the dog, and the pond.
import asyncio, sys, math, os
from playwright.async_api import async_playwright
from testnav import SKIP_WN, go

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173/kids-house-game/'
SHOT = sys.argv[2] if len(sys.argv) > 2 else '/tmp/ride-after/'
POND = (2265, 520, 110, 34)
res = {}

def check(name, ok, extra=''):
    res[name] = bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name, extra, flush=True)

def leg_shape(info):
    """Pants-colored thigh along the saddle, bent knee, shin and shoe down by the front legs."""
    thigh, shin, shoe, knee = info['thigh'], info['shin'], info['shoe'], info['knee']
    forward = shoe['x'] < knee['x'] - 0.04 if info['flipped'] else shoe['x'] > knee['x'] + 0.04
    return (info['cloth'] == info['pants'] and info['cloth'] != info['skin']
            and thigh['w'] > thigh['h'] and shin['h'] > shin['w']
            and shoe['y'] > 0.74 and shoe['y'] < 0.93 and shoe['y'] > knee['y'] + 0.15
            and forward and (shoe['x'] < 0.42 if info['flipped'] else shoe['x'] > 0.58))

def in_pond(x, y, pad=0):
    dx = (x - POND[0]) / (POND[2] + pad)
    dy = (y - POND[1]) / (POND[3] + pad)
    return dx * dx + dy * dy < 1

async def scroll_to(pg, x):
    await pg.evaluate("""(x) => {
      const s = document.getElementById('ranchScroll');
      const sc = document.getElementById('ranch').clientHeight / 600;
      s.scrollLeft = x * sc - s.clientWidth / 2;
    }""", x)
    await pg.wait_for_timeout(160)

async def world_box(pg):
    box = await pg.locator('#ranchWorld').bounding_box()
    return box, box['height'] / 600

async def click_world(pg, x, y):
    await scroll_to(pg, x)
    box, sc = await world_box(pg)
    await pg.mouse.click(box['x'] + x * sc, box['y'] + y * sc)

async def me(pg):
    return (await pg.evaluate('__ranch()'))['me']

async def set_size(pg, size):
    await pg.evaluate("""(size) => {
      const s = __store.get();
      __store.dispatch({ type: 'char/update', id: s.characters[0].id, patch: { size } });
    }""", size)
    await pg.wait_for_timeout(80)

async def pose(pg):
    """Stroke-adjusted gap: getBoundingClientRect is the fill box; the painted hem/saddle edge is half a stroke past it."""
    return await pg.evaluate("""() => {
      const av = document.querySelector('.savatar.riding.mine');
      const shirt = av.querySelector('.shirt');
      const saddle = av.querySelector('.saddle');
      const svg = av.querySelector('.inner svg');
      const horse = av.querySelector('svg.horsesvg');
      const sr = shirt.getBoundingClientRect(), sad = saddle.getBoundingClientRect();
      const svgH = svg.getBoundingClientRect().height, horseH = horse.getBoundingClientRect().height;
      const hem = sr.bottom + (3.5 / 2) / 160 * svgH;
      const top = sad.top - (3 / 2) / 130 * horseH;
      const hands = [...av.querySelectorAll('.inner .hand')].map(h => {
        const r = h.getBoundingClientRect();
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const hit = document.elementFromPoint(cx, cy);
        return { w: r.width, h: r.height, op: getComputedStyle(h).opacity, onHand: !!(hit && (hit === h || h.contains(hit))) };
      });
      const leg = av.querySelector('.rideleg').getBoundingClientRect();
      const standLegs = [...av.querySelectorAll('.inner .leg')];
      const mount = av.querySelector('.mount').getBoundingClientRect();
      const rider = svg.getBoundingClientRect();
      const hb = horse.getBoundingClientRect();
      const rel = (sel) => {
        const r = av.querySelector(sel).getBoundingClientRect();
        return { x: (r.x + r.width / 2 - hb.x) / hb.width, y: (r.y + r.height / 2 - hb.y) / hb.height, w: r.width, h: r.height };
      };
      const look = __store.get().characters[0];
      return {
        gap: hem - top,
        hands,
        legH: leg.height,
        legsHidden: standLegs.length === 2 && standLegs.every(el => getComputedStyle(el).opacity === '0'),
        avZ: +getComputedStyle(av).zIndex,
        mountW: mount.width, mountH: mount.height, riderW: rider.width, riderH: rider.height,
        cloth: av.querySelector('.thigh.cloth').getAttribute('stroke'),
        pants: look.pants, skin: look.skin, shirt: look.shirt,
        thigh: rel('.thigh.cloth'), shin: rel('.shin.cloth'), shoe: rel('.shoe'), knee: rel('.knee'),
        flipped: av.classList.contains('flipped'),
      };
    }""")

async def zoom(pg, path, pad=36, include_dog=False):
    await scroll_to(pg, (await me(pg))['x'])
    box = await pg.evaluate("""(dog) => {
      const el = document.querySelector('.savatar.mine');
      const bits = [el.getBoundingClientRect()];
      const m = el.querySelector('.mount'); if (m) bits.push(m.getBoundingClientRect());
      const svg = el.querySelector('.inner svg'); if (svg) bits.push(svg.getBoundingClientRect());
      if (dog) { const d = document.querySelector('.pet-dog'); if (d) bits.push(d.getBoundingClientRect()); }
      const horse = document.querySelector('#ranchWorld .horse.trotting');
      if (horse) bits.push(horse.getBoundingClientRect());
      const l = Math.min(...bits.map(b => b.left)), t = Math.min(...bits.map(b => b.top));
      const r = Math.max(...bits.map(b => b.right)), btm = Math.max(...bits.map(b => b.bottom));
      return { l, t, r, b: btm };
    }""", include_dog)
    vp = pg.viewport_size
    x = max(0, box['l'] - pad); y = max(0, box['t'] - 24)
    w = min(vp['width'] - x, max(380, box['r'] - box['l'] + pad * 2))
    h = min(vp['height'] - y, max(300, box['b'] - box['t'] + pad + 16))
    await pg.screenshot(path=path, clip={'x': x, 'y': y, 'width': w, 'height': h})

async def drag_feet(pg, x, y):
    await scroll_to(pg, (x + (await me(pg))['x']) / 2)
    start = await pg.evaluate("""() => {
      const svg = document.querySelector('.savatar.mine .inner svg').getBoundingClientRect();
      return { x: svg.x + svg.width / 2, y: svg.y + svg.height * 0.28 };
    }""")
    cur = await me(pg)
    box, sc = await world_box(pg)
    nx = start['x'] + (x - cur['x']) * sc
    ny = start['y'] + (y - cur['y']) * sc
    await pg.mouse.move(start['x'], start['y'])
    await pg.mouse.down()
    await pg.mouse.move(nx, ny, steps=10)
    await pg.mouse.up()
    await pg.wait_for_timeout(120)

async def wait_near(pg, x, y, tol=28, ms=7000):
    steps = ms // 80
    last = None
    for _ in range(steps):
        last = await me(pg)
        if last and abs(last['x'] - x) <= tol and abs(last['y'] - y) <= tol:
            return last
        await pg.wait_for_timeout(80)
    return last

async def main():
    os.makedirs(SHOT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        c = await b.new_context(viewport={'width': 1180, 'height': 820}, device_scale_factor=1, has_touch=True)
        await c.add_init_script(SKIP_WN)
        pg = await c.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(500)
        await pg.click('#btnPets'); await pg.wait_for_selector('.pets .petTabs')
        await pg.click('.petTabs [data-pt="dog"]')
        await pg.click('.nameChips button:has-text("Buddy")')
        await pg.click('#adoptBtn'); await pg.wait_for_timeout(250)
        await go(pg, 'ranch')

        await scroll_to(pg, 2990)
        await pg.locator('.horse[data-horse="4"]').click(force=True)
        await pg.wait_for_timeout(350)
        m0 = await me(pg)
        check('mount rainbow pony', m0 and m0.get('ride') == 4 and abs(m0['x'] - 2990) < 5, str(m0))
        toast = await pg.evaluate("""() => [...document.querySelectorAll('.toast')].map(t => ({ top: getComputedStyle(t).top, text: t.textContent }))""")
        riding = next((t for t in toast if t['text'] and 'riding' in t['text']), None)
        check('riding toast sits at the top', riding and riding['top'] == '76px', str(toast))

        # dog was left at the gate; while riding it should close a long gap faster than a walk
        d0 = (await pg.evaluate('__pets()'))['dogPos'].get('solo')
        await pg.wait_for_timeout(320)
        d1 = (await pg.evaluate('__pets()'))['dogPos'].get('solo')
        if d0 and d1:
            dist = math.hypot(d1['x'] - d0['x'], d1['y'] - d0['y'])
            speed = dist / 0.32
            check('dog keeps up while riding (faster than a walk)', speed > 500, f'{speed:.0f} u/s from {d0} to {d1}')
        else:
            check('dog keeps up while riding (faster than a walk)', False, f'missing dog {d0} {d1}')

        for _ in range(40):
            rider, dog = await me(pg), (await pg.evaluate('__pets()'))['dogPos'].get('solo')
            if dog and abs(abs(dog['x'] - rider['x']) - 200) < 45:
                break
            await pg.wait_for_timeout(100)
        dog = (await pg.evaluate('__pets()'))['dogPos'].get('solo')
        rider = await me(pg)
        gap = abs(dog['x'] - rider['x']) if dog else 0
        check('dog follows behind the horse, not on the tail', dog and 150 <= gap <= 250, f'gap {gap:.0f} dog {dog} rider {rider["x"]:.0f}')
        await zoom(pg, SHOT + '04-dog-following.png', pad=70, include_dog=True)

        gaps = {}
        for size in ('little', 'kid', 'adult'):
            await set_size(pg, size)
            info = await pose(pg)
            gaps[size] = info['gap']
            hands_ok = len(info['hands']) == 2 and all(h['w'] > 4 and h['op'] == '1' and h['onHand'] for h in info['hands'])
            scale_ok = info['mountW'] > info['riderW'] * 1.4 and info['mountH'] > info['riderH'] * 0.9
            leg_ok = leg_shape(info)
            check(f'pose {size}: hem on saddle, hands out, horse bigger than rider',
                  abs(info['gap']) < 3 and hands_ok and info['legsHidden'] and info['legH'] > 24 and scale_ok and leg_ok,
                  f'gap {info["gap"]:.2f} hands {info["hands"]} leg {info["legH"]:.0f} horse {info["mountW"]:.0f}x{info["mountH"]:.0f} rider {info["riderW"]:.0f}x{info["riderH"]:.0f} cloth {info["cloth"]} shoe {info["shoe"]}')
            if size == 'kid':
                await zoom(pg, SHOT + '01-mounted-rainbow.png', pad=28)
            if size == 'adult':
                await zoom(pg, SHOT + '02-adult-mounted.png', pad=28)
        check('pose gap stays a few px at every size', all(abs(g) < 3 for g in gaps.values()), str({k: round(v, 2) for k, v in gaps.items()}))

        await set_size(pg, 'kid')
        await click_world(pg, 1800, 560)
        await pg.wait_for_timeout(180)
        turned = await pose(pg)
        check('riding leg turns with her and still hangs by the front legs', turned['flipped'] and leg_shape(turned), f'shoe {turned["shoe"]} knee {turned["knee"]}')
        await pg.evaluate("""() => {
          const s = __store.get(); const c = s.characters[0];
          __store.dispatch({ type: 'char/update', id: c.id, patch: { pants: c.shirt } });
        }""")
        await pg.wait_for_timeout(80)
        dress = await pose(pg)
        check('bottom color follows her pants, including a dress-colored outfit', dress['cloth'] == dress['pants'] == dress['shirt'] and dress['pants'] != dress['skin'] and leg_shape(dress), f'cloth {dress["cloth"]} pants {dress["pants"]} shirt {dress["shirt"]}')
        await pg.evaluate("""() => {
          const s = __store.get();
          __store.dispatch({ type: 'char/update', id: s.characters[0].id, patch: { pants: '#5aa9e6' } });
        }""")
        await pg.wait_for_timeout(80)
        await drag_feet(pg, 2730, 470)
        placed = await me(pg)
        depth = await pg.evaluate("""() => {
          const av = document.querySelector('.savatar.mine');
          const fence = document.querySelector('.fenceLayer');
          const horses = [...document.querySelectorAll('#ranchWorld .horse:not(.away)')].map(h => ({
            id: h.dataset.horse, z: +getComputedStyle(h).zIndex
          }));
          const avZ = +getComputedStyle(av).zIndex, fenceZ = +getComputedStyle(fence).zIndex;
          const hb = document.querySelector('.horse[data-horse="3"]').getBoundingClientRect();
          const bits = [av.querySelector('.inner svg').getBoundingClientRect(), av.querySelector('.mount').getBoundingClientRect()];
          let horseHits = 0, riderHits = 0, samples = 0;
          for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) {
            const x = hb.left + hb.width * i / 8, y = hb.top + hb.height * j / 8;
            const over = bits.some(b => x >= b.left && x <= b.right && y >= b.top && y <= b.bottom);
            if (!over) continue;
            samples++;
            const hit = document.elementFromPoint(x, y);
            if (!hit) continue;
            if (hit.closest('.horse')) horseHits++;
            else if (hit.closest('.savatar')) riderHits++;
          }
          return { avZ, fenceZ, horses, horseHits, riderHits, samples, savZ: getComputedStyle(document.getElementById('ravatars')).zIndex };
        }""")
        behind = placed and abs(placed['y'] - 470) < 8 and depth['avZ'] < depth['fenceZ'] and all(depth['avZ'] < h['z'] for h in depth['horses'])
        check('depth: rider behind the fence and the horses in front',
              behind and depth['savZ'] == 'auto' and depth['samples'] > 0 and depth['horseHits'] > 0 and depth['riderHits'] == 0,
              f'at {placed} {depth}')
        await scroll_to(pg, 2760)
        box, sc = await world_box(pg)
        vp = pg.viewport_size
        l = max(0, box['x'] + 2380 * sc - 16)
        t = max(0, box['y'] + 330 * sc - 10)
        r = min(vp['width'], box['x'] + 3140 * sc + 16)
        btm = min(vp['height'], box['y'] + 590 * sc + 16)
        await pg.screenshot(path=SHOT + '03-along-fence-behind-horses.png', clip={'x': l, 'y': t, 'width': r - l, 'height': btm - t})

        # tapping another horse gallops there (same mount) and the straight line would cross the pond
        ride_before = (await me(pg))['ride']
        x_before = (await me(pg))['x']
        await scroll_to(pg, 2470)
        await pg.locator('.horse[data-horse="0"]').click(force=True)
        samples = []
        arrived = None
        for _ in range(50):
            cur = await me(pg)
            samples.append((cur['x'], cur['y'], cur.get('ride')))
            if abs(cur['x'] - 2470) < 24 and abs(cur['y'] - 548) < 24:
                arrived = cur
                break
            await pg.wait_for_timeout(80)
        splashed = [s for s in samples if in_pond(s[0], s[1])]
        check('tap another horse rides there instead of swapping',
              arrived and arrived.get('ride') == ride_before == 4 and x_before > 2600,
              f'from {x_before:.0f} to {arrived}')
        check('that gallop routes around the pond', arrived and not splashed, f'splashes {splashed[:4]} n={len(samples)}')

        # a target in the water is refused
        hold = await me(pg)
        await click_world(pg, POND[0], POND[1])
        await pg.wait_for_timeout(450)
        held = await me(pg)
        body = await pg.inner_text('body')
        check('pond targets are refused',
              held and abs(held['x'] - hold['x']) < 20 and abs(held['y'] - hold['y']) < 20 and 'pond' in body.lower(),
              f'{hold} -> {held}')

        # dismount in the field; the loose horse trots back to her stall instead of snapping home
        horse_at = await me(pg)
        await pg.click('#btnHopOff')
        await pg.wait_for_timeout(80)
        landed = await me(pg)
        spot = await pg.evaluate("""() => {
          const el = document.querySelector('#ranchWorld .horse[data-horse="4"]');
          const sc = document.getElementById('ranch').clientHeight / 600;
          return { x: parseFloat(el.style.left) / sc + 75, y: parseFloat(el.style.top) / sc + 122,
                   trot: el.classList.contains('trotting'), away: el.classList.contains('away') };
        }""")
        dist_land = math.hypot(landed['x'] - horse_at['x'], landed['y'] - horse_at['y']) if landed else 0
        dist_horse = math.hypot(spot['x'] - 2990, spot['y'] - 540)
        check('dismount lands in the field, off the horse and out of the pond',
              landed and landed.get('ride') is None and 70 < dist_land < 220
              and 470 <= landed['y'] <= 590 and not in_pond(landed['x'], landed['y'], 8),
              f'land {landed} from {horse_at} dist {dist_land:.0f}')
        check('loose horse starts trotting home instead of snapping to the stall',
              spot['trot'] and not spot['away'] and dist_horse > 300,
              f'horse {spot} from stall {dist_horse:.0f}')
        await zoom(pg, SHOT + '05-dismount.png', pad=80)
        home = None
        for _ in range(40):
            home = await pg.evaluate("""() => {
              const el = document.querySelector('#ranchWorld .horse[data-horse="4"]');
              const sc = document.getElementById('ranch').clientHeight / 600;
              return { x: parseFloat(el.style.left) / sc + 75, y: parseFloat(el.style.top) / sc + 122, trot: el.classList.contains('trotting') };
            }""")
            if not home['trot'] and abs(home['x'] - 2990) < 20:
                break
            await pg.wait_for_timeout(100)
        check('horse arrives back in her stall', home and not home['trot'] and abs(home['x'] - 2990) < 20 and abs(home['y'] - 540) < 8, str(home))
        check('no page errors', not errs, str(errs)[:300])
        await b.close()
    failed = [k for k, v in res.items() if not v]
    print(f'\n{len(res) - len(failed)}/{len(res)} passed', flush=True)
    if failed:
        print('FAILED:', ', '.join(failed), flush=True)
        sys.exit(1)

asyncio.run(main())
