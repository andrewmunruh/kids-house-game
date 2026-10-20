# Bottom clamp and back-door layering at every review size, plus the bedroom
# night-arch clip and the bud-vase glass tint.
# A floor piece stored at y=600 must draw about 12px higher (the stage border
# clips that strip) without the save changing. The living-room door stays above
# a sofa and a rug that cover it, and a tap still opens the yard.
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
        clip: cp.slice(0, 12),
        vw: innerWidth, vh: innerHeight,
      };
    }""")
    if not spot or not (8 < spot['glassX'] < spot['vw'] - 8):
        fail(f'{tag} window off screen')
        return
    if 'polygon' not in (spot['clip'] or ''):
        fail(f"{tag} night plate clip {spot['clip']}")
    day_s = pixel(await pg.screenshot(), spot['shoulderX'], spot['shoulderY'])
    day_g = pixel(await pg.screenshot(), spot['glassX'], spot['glassY'])
    await pg.evaluate("() => __sky.setChoice('night')")
    await pg.wait_for_function("""() => {
      const plate = document.querySelector('#layer .item[data-kind="window"] .artnight');
      return plate && parseFloat(getComputedStyle(plate).opacity) > 0.95;
    }""", timeout=3000)
    night_s = pixel(await pg.screenshot(), spot['shoulderX'], spot['shoulderY'])
    night_g = pixel(await pg.screenshot(), spot['glassX'], spot['glassY'])
    if night_sky(night_s):
        fail(f'{tag} night square corner still sky {night_s}')
    if max(abs(day_s[i] - night_s[i]) for i in range(3)) > 18:
        fail(f'{tag} arch shoulder changed at night {day_s} -> {night_s}')
    if not night_sky(night_g) or sum(day_g) < sum(night_g) + 40:
        fail(f'{tag} arch glass did not go night {day_g} -> {night_g}')
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
    await pg.wait_for_timeout(250)
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

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for w, h in SIZES:
            tag = f'{w}x{h}'
            phone = min(w, h) < 500 or (w > h and h <= 500)
            ctx = await browser.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=min(w, h) < 500, device_scale_factor=1)
            await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');")
            pg = await ctx.new_page()
            pg.on('pageerror', lambda e: fail(f'{tag} pageerror {e}'))
            await pg.goto(URL, wait_until='networkidle')
            await dismiss(pg)
            await check_floor(pg, tag)
            await check_window(pg, tag)
            await check_vase(pg, tag)
            await check_door(pg, tag)
            await ctx.close()
            print(f'{tag} checked', flush=True)
        await browser.close()
    if problems:
        print(f'FAIL {len(problems)}')
        sys.exit(1)
    print(f'PASS small followups {len(SIZES)} sizes')

if __name__ == '__main__':
    asyncio.run(main())
