# Bottom clamp and back-door layering at every review size, plus the bedroom
# night-arch clip and the bud-vase glass tint.
# A floor piece stored at y=600 must draw about 12px higher (the stage border
# clips that strip) without the save changing. The living-room door stays above
# a sofa and a rug that cover its tap target, and a tap still opens the yard.
# The starter lamp stays in front of that door. Sit, the kenneled dog, and the
# speech bubble use the drawn y, not the stored one. So does the Decorate toolbar.
import asyncio, io, os, sys
from PIL import Image
from playwright.async_api import async_playwright

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

WEB_PORT = opt('--web-port', 'WEB_PORT', opt('--port', 'PORT', '5173'))
URL = f'http://127.0.0.1:{WEB_PORT}/kids-house-game/'
SIZES = [(820, 1180), (1180, 820), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)]
ROOMS = [
    ('living', 'plant'),
    ('bedroom', 'plant'),
    ('kitchen', 'plant'),
    ('salon', 'plant'),
    ('nursery', 'plant'),
    ('backyard', 'pack:fire-pit'),
]

problems = []
def fail(msg):
    problems.append(msg)
    print('FAIL', msg, flush=True)

def pixel(png, x, y):
    im = Image.open(io.BytesIO(png)).convert('RGB')
    return im.getpixel((max(0, min(im.width - 1, int(x))), max(0, min(im.height - 1, int(y)))))

def night_sky(rgb):
    r, g, b = rgb
    return r < 90 and b > r + 20 and b > g

async def dismiss(pg):
    await pg.wait_for_selector('#stage', timeout=20000)
    await pg.wait_for_timeout(300)
    await pg.evaluate("""() => {
      const note = document.querySelector('#phoneOk');
      if (note && note.offsetParent) note.click();
      document.querySelector('#wnGo')?.click();
      if (window.__sky) { __sky.freeze(null); __sky.setChoice('day'); }
    }""")
    await pg.wait_for_timeout(150)

async def check_floor(pg, tag):
    for room, kind in ROOMS:
        data = await pg.evaluate("""([room, kind]) => {
          const s = __store;
          s.dispatch({type:'room/switch', room});
          const id = 'qa-low-' + room;
          if (!s.get().rooms[room].items.some(i => i.id === id))
            s.dispatch({type:'item/add', room, item:{id, kind, x:1400, y:600, flip:false, z:1, scale:1}});
          const mid = 'qa-mid-' + room;
          if (!s.get().rooms[room].items.some(i => i.id === mid))
            s.dispatch({type:'item/add', room, item:{id:mid, kind, x:1700, y:480, flip:false, z:1, scale:1}});
          const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
          __cam.set(1400 - viewW / 2);
          const kid = s.get().characters[0];
          if (kid) s.dispatch({type:'char/move', id:kid.id, room, x:2000, y:520});
          const measure = (el) => {
            if (!el) return null;
            const stage = document.querySelector('.stage');
            const st = stage.getBoundingClientRect();
            const view = parseFloat(stage.style.width) || 1;
            const sc = st.width / view;
            const border = 6 * sc;
            const b = el.getBoundingClientRect();
            const stored = __store.get().rooms[room].items.find(i => i.id === el.dataset.id);
            return {
              storedY: stored ? stored.y : null,
              worldBottom: (b.bottom - (st.top + border)) / sc,
              past: b.bottom - (st.bottom - border),
              onScreen: b.width > 8 && b.bottom > 0 && b.top < innerHeight,
            };
          };
          return { low: measure(document.querySelector('.item[data-id="' + id + '"]')), mid: measure(document.querySelector('.item[data-id="' + mid + '"]')) };
        }""", [room, kind])
        await pg.wait_for_timeout(80)
        # Re-read after paint. The first read can land before the camera settles.
        data = await pg.evaluate("""(room) => {
          const measure = (id) => {
            const el = document.querySelector('.item[data-id="' + id + '"]');
            if (!el) return null;
            const stage = document.querySelector('.stage');
            const st = stage.getBoundingClientRect();
            const view = parseFloat(stage.style.width) || 1;
            const sc = st.width / view;
            const border = 6 * sc;
            const b = el.getBoundingClientRect();
            const stored = __store.get().rooms[room].items.find(i => i.id === id);
            return {
              storedY: stored ? stored.y : null,
              worldBottom: (b.bottom - (st.top + border)) / sc,
              past: b.bottom - (st.bottom - border),
            };
          };
          return { low: measure('qa-low-' + room), mid: measure('qa-mid-' + room) };
        }""", room)
        low, mid = data['low'], data['mid']
        if not low:
            fail(f'{tag} {room} low piece missing')
            continue
        if low['storedY'] != 600:
            fail(f"{tag} {room} stored y {low['storedY']} (save must stay 600)")
        if abs(low['worldBottom'] - 588) > 2.5:
            fail(f"{tag} {room} drawn bottom {low['worldBottom']:.1f} want 588")
        if low['past'] > 1.25:
            fail(f"{tag} {room} still clipped by {low['past']:.1f}px")
        if not mid or abs(mid['worldBottom'] - 480) > 2.5:
            fail(f"{tag} {room} mid piece moved {None if not mid else round(mid['worldBottom'],1)}")

async def check_window(pg, tag):
    await pg.evaluate("""() => {
      __store.dispatch({type:'room/switch', room:'bedroom'});
      const win = __store.get().rooms.bedroom.items.find(i => i.kind === 'window');
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(win.x - viewW / 2);
      __sky.freeze(null);
      __sky.setChoice('day');
    }""")
    await pg.wait_for_timeout(200)
    spot = await pg.evaluate("""() => {
      const item = document.querySelector('#layer .item[data-kind="window"]');
      const plate = item && item.querySelector('.artnight');
      if (!item || !plate) return null;
      const r = item.getBoundingClientRect();
      const cp = getComputedStyle(plate).clipPath || '';
      return {
        shoulderX: r.left + r.width * 0.30, shoulderY: r.top + r.height * 0.10,
        glassX: r.left + r.width * 0.40, glassY: r.top + r.height * 0.55,
        lowX: r.left + r.width * 0.40, lowY: r.top + r.height * 0.78,
        frameX: r.left + r.width * 0.18, frameY: r.top + r.height * 0.78,
        sillX: r.left + r.width * 0.40, sillY: r.top + r.height * 0.86,
        clip: cp.slice(0, 12),
        vw: innerWidth, vh: innerHeight,
      };
    }""")
    if not spot or not (8 < spot['glassX'] < spot['vw'] - 8):
        fail(f'{tag} window off screen')
        return
    if 'polygon' not in (spot['clip'] or ''):
        fail(f"{tag} night plate clip {spot['clip']}")
    shot = await pg.screenshot()
    day_s = pixel(shot, spot['shoulderX'], spot['shoulderY'])
    day_g = pixel(shot, spot['glassX'], spot['glassY'])
    day_low = pixel(shot, spot['lowX'], spot['lowY'])
    day_frame = pixel(shot, spot['frameX'], spot['frameY'])
    day_sill = pixel(shot, spot['sillX'], spot['sillY'])
    await pg.evaluate("() => __sky.setChoice('night')")
    await pg.wait_for_function("""() => {
      const plate = document.querySelector('#layer .item[data-kind="window"] .artnight');
      return plate && parseFloat(getComputedStyle(plate).opacity) > 0.99;
    }""", timeout=3000)
    shot = await pg.screenshot()
    night_s = pixel(shot, spot['shoulderX'], spot['shoulderY'])
    night_g = pixel(shot, spot['glassX'], spot['glassY'])
    night_low = pixel(shot, spot['lowX'], spot['lowY'])
    night_frame = pixel(shot, spot['frameX'], spot['frameY'])
    night_sill = pixel(shot, spot['sillX'], spot['sillY'])
    if night_sky(night_s):
        fail(f'{tag} night square corner still sky {night_s}')
    # WebKit's night veil shifts this highlight by about 20. A real clip leak goes much further.
    if max(abs(day_s[i] - night_s[i]) for i in range(3)) > 28:
        fail(f'{tag} arch shoulder changed at night {day_s} -> {night_s}')
    if not night_sky(night_g) or sum(day_g) < sum(night_g) + 40:
        fail(f'{tag} arch glass did not go night {day_g} -> {night_g}')
    if not night_sky(night_low) or sum(day_low) < sum(night_low) + 40:
        fail(f'{tag} lower pane still daylight {day_low} -> {night_low}')
    if night_sky(night_frame) or max(abs(day_frame[i] - night_frame[i]) for i in range(3)) > 18:
        fail(f'{tag} night clip ate the frame {day_frame} -> {night_frame}')
    if night_sky(night_sill) or max(abs(day_sill[i] - night_sill[i]) for i in range(3)) > 18:
        fail(f'{tag} night clip ate the sill {day_sill} -> {night_sill}')
    await pg.evaluate("() => __sky.setChoice('day')")

async def check_vase(pg, tag):
    await pg.evaluate("""() => {
      __store.dispatch({type:'room/switch', room:'salon'});
      if (!__store.get().rooms.salon.items.some(i => i.id === 'qa-vase'))
        __store.dispatch({type:'item/add', room:'salon', item:{id:'qa-vase', kind:'pack:bud-vase', x:1200, y:480, flip:false, z:1, scale:3}});
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1200 - viewW / 2);
      __sky.setChoice('day');
    }""")
    await pg.wait_for_function("""() => {
      const img = document.querySelector('.item[data-id="qa-vase"] img');
      return img && img.complete && img.naturalWidth > 0;
    }""", timeout=5000)
    spot = await pg.evaluate("""() => {
      const r = document.querySelector('.item[data-id="qa-vase"]').getBoundingClientRect();
      return {
        lipX: r.left + r.width * 0.50, lipY: r.top + r.height * 0.55,
        bodyX: r.left + r.width * 0.50, bodyY: r.top + r.height * 0.72,
        bloomX: r.left + r.width * 0.38, bloomY: r.top + r.height * 0.14,
        vw: innerWidth, vh: innerHeight,
      };
    }""")
    if not (8 < spot['bodyX'] < spot['vw'] - 8):
        fail(f'{tag} bud vase off screen')
        return
    png = await pg.screenshot()
    lip, body, bloom = pixel(png, spot['lipX'], spot['lipY']), pixel(png, spot['bodyX'], spot['bodyY']), pixel(png, spot['bloomX'], spot['bloomY'])
    def blue_glass(rgb):
        r, g, b = rgb
        return b > r + 18 and b + 6 >= g and g > r
    if not blue_glass(body):
        fail(f'{tag} bud vase body not clear blue {body}')
    if not blue_glass(lip):
        fail(f'{tag} bud vase lip still grey {lip}')
    if not (bloom[0] > bloom[1] + 15 and bloom[0] > bloom[2]):
        fail(f'{tag} bud vase bloom changed {bloom}')

async def check_lamp(pg, tag):
    """Starter living room: the floor lamp stays in front of the back door."""
    hit = await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({type:'room/switch', room:'living'});
      __sky.setChoice('day');
      const kid = s.get().characters[0];
      s.dispatch({type:'char/move', id:kid.id, room:'living', x:1030, y:540});
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1030 - viewW / 2);
      const lamp = s.get().rooms.living.items.find(i => i.kind === 'lamp');
      s.dispatch({type:'item/move', room:'living', id:lamp.id, x:lamp.x, y:lamp.y});
      const door = document.querySelector('.yardDoor');
      const art = door && door.querySelector('.doorArt');
      const lampEl = document.querySelector('#layer .item[data-kind="lamp"]');
      const sofa = document.querySelector('#layer .item[data-kind="sofa"]');
      const rug = document.querySelector('#layer .item[data-kind="rug"]');
      if (!door || !art || !lampEl) return null;
      const overlap = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
      const tap = door.getBoundingClientRect();
      const lr = lampEl.getBoundingClientRect();
      const ar = art.getBoundingClientRect();
      const z = (el) => parseInt(getComputedStyle(el).zIndex, 10) || 0;
      const owner = (x, y) => {
        const top = document.elementFromPoint(x, y);
        if (!top || !top.closest) return '';
        if (top.closest('.yardDoor')) return 'door';
        const item = top.closest('.item');
        return item ? item.dataset.kind || 'item' : '';
      };
      let doorOnLamp = false;
      const ix0 = Math.max(lr.left, tap.left), ix1 = Math.min(lr.right, tap.right);
      const iy0 = Math.max(lr.top, tap.top), iy1 = Math.min(lr.bottom, tap.bottom);
      if (ix1 - ix0 > 2 && iy1 - iy0 > 2) {
        for (let y = iy0 + 1; y < iy1; y += 3) {
          for (let x = ix0 + 1; x < ix1; x += 4) {
            if (owner(x, y) === 'door') doorOnLamp = true;
          }
        }
      }
      let shade = '';
      const spots = [[0.50, 0.16], [0.42, 0.22], [0.58, 0.20], [0.50, 0.30]];
      for (const [fx, fy] of spots) {
        const who = owner(lr.left + lr.width * fx, lr.top + lr.height * fy);
        if (who === 'door') doorOnLamp = true;
        if (!shade && who) shade = who;
        if (who === 'lamp') shade = 'lamp';
      }
      return {
        doorOnLamp, shade,
        doorZ: z(door), lampZ: z(lampEl),
        sofaOn: !!(sofa && overlap(sofa.getBoundingClientRect(), tap)),
        rugOn: !!(rug && overlap(rug.getBoundingClientRect(), tap)),
        lampOn: overlap(lr, tap),
      };
    }""")
    await pg.wait_for_timeout(80)
    if not hit:
        fail(f'{tag} starter lamp missing')
        return
    if hit['sofaOn'] or hit['rugOn']:
        fail(f"{tag} starter sofa/rug already cover the door")
    if hit['doorZ'] >= hit['lampZ']:
        fail(f"{tag} starter door z {hit['doorZ']} covers lamp {hit['lampZ']}")
    if hit['doorOnLamp']:
        fail(f'{tag} door paints over the starter lamp')
    if hit['shade'] != 'lamp':
        fail(f"{tag} lampshade top is {hit['shade']}")

async def check_anchors(pg, tag):
    """Sit, the kenneled dog, and the speech bubble follow the drawn y."""
    await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({type:'room/switch', room:'living'});
      document.querySelector('#modePlay')?.click();
      __sky.setChoice('day');
      if (!s.get().rooms.living.items.some(i => i.id === 'qa-seat'))
        s.dispatch({type:'item/add', room:'living', item:{id:'qa-seat', kind:'chair', x:1600, y:600, flip:false, z:1, scale:1}});
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1600 - viewW / 2);
      const kid = s.get().characters[0];
      s.dispatch({type:'char/move', id:kid.id, room:'living', x:2000, y:520});
    }""")
    await pg.wait_for_timeout(180)
    seat = await pg.evaluate("""() => {
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1600 - viewW / 2);
      const seat = __store.get().rooms.living.items.find(i => i.id === 'qa-seat');
      if (seat) __store.dispatch({type:'item/move', room:'living', id:seat.id, x:seat.x, y:seat.y});
      const el = document.querySelector('.item[data-id="qa-seat"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2, vw: innerWidth, vh: innerHeight };
    }""")
    if not seat or not (8 < seat['x'] < seat['vw'] - 8):
        fail(f'{tag} seat off screen')
        return
    await pg.mouse.click(seat['x'], seat['y'])
    await pg.wait_for_timeout(200)
    sit = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage');
      const st = stage.getBoundingClientRect();
      const view = parseFloat(stage.style.width) || 1;
      const sc = st.width / view;
      const origin = st.top + 6 * sc;
      const world = (py) => (py - origin) / sc;
      const item = document.querySelector('.item[data-id="qa-seat"]');
      const kid = document.querySelector('.char');
      if (!item || !kid) return null;
      const stored = __store.get().rooms.living.items.find(i => i.id === 'qa-seat');
      kid.querySelector('.bubble')?.remove();
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = 'Hello';
      bubble.style.animation = 'none';
      kid.appendChild(bubble);
      const ir = item.getBoundingClientRect();
      const kr = kid.getBoundingClientRect();
      const br = bubble.getBoundingClientRect();
      return {
        storedY: stored ? stored.y : null,
        itemBottom: world(ir.bottom),
        itemH: ir.height / sc,
        kidBottom: world(kr.bottom),
        bubbleBottom: world(br.bottom),
        kidH: kr.height / sc,
        pose: kid.classList.contains('pose-sit'),
      };
    }""")
    if not sit:
        fail(f'{tag} sit target missing')
        return
    if sit['storedY'] != 600:
        fail(f"{tag} seat stored y {sit['storedY']}")
    drawn = sit['itemBottom']
    # Chair sit anchor: dy -0.48 of the drawn height, measured from the drawn foot.
    want = drawn - 0.48 * sit['itemH']
    stored_sit = 600 - 0.48 * sit['itemH']
    if abs(sit['kidBottom'] - want) > 2.5:
        fail(f"{tag} sit feet {sit['kidBottom']:.1f} want {want:.1f}")
    if abs(stored_sit - want) > 6 and abs(sit['kidBottom'] - stored_sit) < 4:
        fail(f"{tag} sit still uses stored y {sit['kidBottom']:.1f}")
    bubble_want = want - sit['kidH'] - 34
    if abs(sit['bubbleBottom'] - bubble_want) > 3:
        fail(f"{tag} sit bubble {sit['bubbleBottom']:.1f} want {bubble_want:.1f}")
    await pg.evaluate("""() => {
      const s = __store;
      if (!s.get().dog) s.dispatch({type:'dog/set', dog:{name:'Pip', breed:0, owner:s.get().characters[0].id}});
      if (!s.get().rooms.living.items.some(i => i.id === 'qa-kennel'))
        s.dispatch({type:'item/add', room:'living', item:{id:'qa-kennel', kind:'kennel', x:1900, y:600, flip:false, z:1, scale:1}});
      if (s.get().dogKennel?.item !== 'qa-kennel') s.dispatch({type:'dog/kennel', item:'qa-kennel'});
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1900 - viewW / 2);
      const kid = s.get().characters[0];
      s.dispatch({type:'char/move', id:kid.id, room:'living', x:2100, y:520});
    }""")
    await pg.wait_for_timeout(180)
    await pg.evaluate("""() => {
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(1900 - viewW / 2);
      const kennel = __store.get().rooms.living.items.find(i => i.id === 'qa-kennel');
      if (kennel) __store.dispatch({type:'item/move', room:'living', id:kennel.id, x:kennel.x, y:kennel.y});
    }""")
    try:
        await pg.wait_for_selector('.pet.kenneled', timeout=3000)
    except Exception:
        fail(f'{tag} kennel dog missing')
        return
    await pg.wait_for_timeout(80)
    dog = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage');
      const st = stage.getBoundingClientRect();
      const view = parseFloat(stage.style.width) || 1;
      const sc = st.width / view;
      const origin = st.top + 6 * sc;
      const world = (py) => (py - origin) / sc;
      const item = document.querySelector('.item[data-id="qa-kennel"]');
      const pet = document.querySelector('.pet.kenneled');
      if (!item || !pet) return null;
      const stored = __store.get().rooms.living.items.find(i => i.id === 'qa-kennel');
      const ir = item.getBoundingClientRect();
      const pr = pet.getBoundingClientRect();
      return {
        storedY: stored ? stored.y : null,
        itemBottom: world(ir.bottom),
        dogBottom: world(pr.bottom),
        peek: pet.classList.contains('peek'),
        x: (pr.left + pr.right) / 2,
        y: pr.top + pr.height * 0.45,
        vw: innerWidth, vh: innerHeight,
      };
    }""")
    if not dog:
        fail(f'{tag} kennel measure missing')
        return
    if dog['storedY'] != 600:
        fail(f"{tag} kennel stored y {dog['storedY']}")
    off = 24 if dog['peek'] else 2
    dog_want = dog['itemBottom'] - off
    stored_dog = 600 - off
    if abs(dog['dogBottom'] - dog_want) > 2.5:
        fail(f"{tag} kennel dog {dog['dogBottom']:.1f} want {dog_want:.1f}")
    if abs(stored_dog - dog_want) > 6 and abs(dog['dogBottom'] - stored_dog) < 4:
        fail(f"{tag} kennel dog still uses stored y {dog['dogBottom']:.1f}")
    if not (8 < dog['x'] < dog['vw'] - 8 and 8 < dog['y'] < dog['vh'] - 8):
        fail(f'{tag} kennel dog off screen')
        return
    await pg.mouse.click(dog['x'], dog['y'])
    await pg.wait_for_timeout(450)
    bub = await pg.evaluate("""() => {
      const stage = document.querySelector('.stage');
      const st = stage.getBoundingClientRect();
      const view = parseFloat(stage.style.width) || 1;
      const sc = st.width / view;
      const origin = st.top + 6 * sc;
      const world = (py) => (py - origin) / sc;
      const pet = document.querySelector('.pet.kenneled');
      const bubble = pet && pet.querySelector('.bubble');
      if (!pet || !bubble) return null;
      const pr = pet.getBoundingClientRect();
      const br = bubble.getBoundingClientRect();
      return { bubbleBottom: world(br.bottom), dogH: pr.height / sc, dogBottom: world(pr.bottom) };
    }""")
    if not bub:
        fail(f'{tag} kennel speech bubble missing')
        return
    bub_want = bub['dogBottom'] - bub['dogH'] - 34
    if abs(bub['bubbleBottom'] - bub_want) > 3.5:
        fail(f"{tag} kennel bubble {bub['bubbleBottom']:.1f} want {bub_want:.1f}")
    # The bubble rides the drawn dog. A stored-y dog would put it about 12px lower.
    stored_bub = (600 - off) - bub['dogH'] - 34
    if abs(stored_bub - bub_want) > 6 and abs(bub['bubbleBottom'] - stored_bub) < 4:
        fail(f"{tag} kennel bubble still follows stored y {bub['bubbleBottom']:.1f}")
    await pg.evaluate("() => document.querySelector('#modeDecorate')?.click()")

async def check_toolbar(pg, tag, touch=False):
    """The Decorate toolbar above a selected floor piece follows the drawn y.
    The same chair at stored y=500 and y=600: the toolbar must move 88px (600 draws at 588), not 100."""
    tops = {}
    for y in (500, 600):
        pos = await pg.evaluate("""(y) => {
          const s = __store;
          s.dispatch({type:'room/switch', room:'living'});
          document.querySelector('#modeDecorate')?.click();
          if (!s.get().rooms.living.items.some(i => i.id === 'qa-seat'))
            s.dispatch({type:'item/add', room:'living', item:{id:'qa-seat', kind:'chair', x:1600, y, flip:false, z:1, scale:1}});
          // Put the chair in the visible window (phones do not always follow __cam.set), clear of the kid.
          const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
          const x = Math.round(__cam.get() + viewW * 0.66);
          s.dispatch({type:'item/front', room:'living', id:'qa-seat'});
          s.dispatch({type:'item/move', room:'living', id:'qa-seat', x, y});
          const el = document.querySelector('.item[data-id="qa-seat"]');
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
        }""", y)
        if not pos:
            fail(f'{tag} toolbar seat missing')
            return
        await pg.wait_for_timeout(120)
        # Tap a point that actually hits the chair (another piece may overlap its box).
        pos = await pg.evaluate("""() => {
          const el = document.querySelector('.item[data-id="qa-seat"]'); const r = el.getBoundingClientRect();
          for (let fy = 0.5; fy < 0.95; fy += 0.1) for (let fx = 0.5; fx > 0.05; fx -= 0.1) for (const sx of [fx, 1 - fx]) {
            const x = r.left + r.width * sx, y = r.top + r.height * fy;
            const h = document.elementFromPoint(x, y);
            if (h && h.closest('.item') === el) return { x, y };
          }
          return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
        }""")
        if touch:
            await pg.touchscreen.tap(pos['x'], pos['y'])
        else:
            await pg.mouse.click(pos['x'], pos['y'])
        await pg.wait_for_timeout(150)
        top = await pg.evaluate("""() => {
          const t = document.getElementById('toolbar');
          if (!t || t.classList.contains('hidden')) return null;
          return parseFloat(t.style.top) / 100 * 600;
        }""")
        if top is None:
            # One retry: a tap right after a re-render can land as the end of the previous gesture.
            await pg.wait_for_timeout(250)
            if touch:
                await pg.touchscreen.tap(pos['x'], pos['y'])
            else:
                await pg.mouse.click(pos['x'], pos['y'])
            await pg.wait_for_timeout(200)
            top = await pg.evaluate("""() => {
              const t = document.getElementById('toolbar');
              if (!t || t.classList.contains('hidden')) return null;
              return parseFloat(t.style.top) / 100 * 600;
            }""")
        if top is None:
            hit = await pg.evaluate("(p) => { const h = document.elementFromPoint(p.x, p.y); return h ? (h.tagName + '.' + h.className + ' ' + ((h.closest('[data-id]') || {}).dataset || {}).id) : null; }", pos)
            fail(f'{tag} toolbar not shown for y={y} hit {hit} at {pos}')
            return
        tops[y] = top
    d = tops[600] - tops[500]
    if abs(d - 88) > 0.6:
        fail(f'{tag} toolbar moved {d:.1f} between y=500 and y=600, want 88 (drawn y)')
    await pg.evaluate("() => { const s = __store; const seat = s.get().rooms.living.items.find(i => i.id === 'qa-seat'); if (seat) s.dispatch({type:'item/move', room:'living', id:'qa-seat', x:seat.x, y:600}); }")

async def check_door(pg, tag):
    await pg.evaluate("""() => {
      const s = __store;
      s.dispatch({type:'room/switch', room:'living'});
      __sky.setChoice('day');
      const viewW = parseFloat(document.querySelector('.stage').style.width) || 1000;
      __cam.set(824 - viewW / 2);
      const sofa = s.get().rooms.living.items.find(i => i.kind === 'sofa');
      const rug = s.get().rooms.living.items.find(i => i.kind === 'rug');
      const kid = s.get().characters[0];
      s.dispatch({type:'char/move', id:kid.id, room:'living', x:1100, y:540});
      // Moves repaint the door after the camera is in place, so a hint slide from the old view does not stick.
      s.dispatch({type:'item/move', room:'living', id:sofa.id, x:824, y:470});
      s.dispatch({type:'item/move', room:'living', id:rug.id, x:824, y:530});
      s.dispatch({type:'item/front', room:'living', id:rug.id});
      s.dispatch({type:'item/front', room:'living', id:sofa.id});
    }""")
    await pg.wait_for_timeout(200)
    # The chair check leaves Decorate's toolbar up. On a narrow phone that bar
    # can sit on the door, which is not what this layering check is measuring.
    wall = await pg.evaluate("""() => {
      const s = document.querySelector('.stage').getBoundingClientRect();
      return { x: s.left + 28, y: s.top + 28 };
    }""")
    await pg.mouse.click(wall['x'], wall['y'])
    await pg.wait_for_timeout(200)
    hit = await pg.evaluate("""() => {
      const door = document.querySelector('.yardDoor');
      const art = door && door.querySelector('.doorArt');
      const sofa = document.querySelector('#layer .item[data-kind="sofa"]');
      const rug = document.querySelector('#layer .item[data-kind="rug"]');
      if (!door || !art || !sofa || !rug) return null;
      const overlap = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
      const ar = art.getBoundingClientRect();
      const cx = (ar.left + ar.right) / 2, cy = (ar.top + ar.bottom) / 2;
      const top = document.elementFromPoint(cx, cy);
      const z = (el) => parseInt(getComputedStyle(el).zIndex, 10) || 0;
      return {
        parent: door.parentElement && door.parentElement.id,
        inScenery: !!document.querySelector('#scenery .yardDoor'),
        sofaOn: overlap(sofa.getBoundingClientRect(), ar),
        rugOn: overlap(rug.getBoundingClientRect(), ar),
        doorZ: z(door), sofaZ: z(sofa), rugZ: z(rug),
        onDoor: !!(top && top.closest && top.closest('.yardDoor')),
        top: top ? (top.className && top.className.baseVal !== undefined ? 'svg' : String(top.className).slice(0, 40)) : '',
        cx, cy, vw: innerWidth, vh: innerHeight,
      };
    }""")
    if not hit:
        fail(f'{tag} door markup missing')
        return
    if hit['parent'] != 'layer' or hit['inScenery']:
        fail(f"{tag} door parent {hit['parent']} scenery {hit['inScenery']}")
    if not hit['sofaOn'] or not hit['rugOn']:
        fail(f"{tag} furniture does not cover the door sofa {hit['sofaOn']} rug {hit['rugOn']}")
    if not (hit['doorZ'] > hit['sofaZ'] and hit['doorZ'] > hit['rugZ']):
        fail(f"{tag} door z {hit['doorZ']} sofa {hit['sofaZ']} rug {hit['rugZ']}")
    if not hit['onDoor']:
        fail(f"{tag} door not the top tap {hit['top']}")
    if not (8 < hit['cx'] < hit['vw'] - 8 and 8 < hit['cy'] < hit['vh'] - 8):
        fail(f'{tag} door center off screen')
        return
    await pg.mouse.click(hit['cx'], hit['cy'])
    await pg.wait_for_timeout(400)
    room = await pg.evaluate("() => __store.get().currentRoom")
    if room != 'backyard':
        fail(f'{tag} tap on the covered door stayed in {room}')

async def run_engine(p, name):
    try:
        browser = await getattr(p, name).launch()
    except Exception as e:
        print(f'{name} unavailable: {e}', flush=True)
        return False
    try:
        for w, h in SIZES:
            tag = f'{name} {w}x{h}'
            phone = min(w, h) < 500 or (w > h and h <= 500)
            ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=min(w, h) < 500, device_scale_factor=1)
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e, tag=tag: fail(f'{tag} pageerror {e}'))
            await pg.goto(URL, wait_until='networkidle')
            await dismiss(pg)
            await check_floor(pg, tag)
            await check_window(pg, tag)
            await check_vase(pg, tag)
            await check_lamp(pg, tag)
            await check_anchors(pg, tag)
            await check_toolbar(pg, tag, phone)
            await check_door(pg, tag)
            await ctx.close()
            print(f'{tag} checked', flush=True)
    finally:
        await browser.close()
    return True

async def main():
    async with async_playwright() as p:
        saw = False
        for name in ('chromium', 'webkit'):
            if await run_engine(p, name):
                saw = True
        if not saw:
            fail('no browser engine launched')
    if problems:
        print(f'FAIL {len(problems)}')
        sys.exit(1)
    print(f'PASS small followups {len(SIZES)} sizes')

if __name__ == '__main__':
    asyncio.run(main())
