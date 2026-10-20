# Yard guard. The stage, the starter set, and the staged play scene at every review size.
# Fails when the yard stage drifts from the living room, a piece leaves the stage,
# the kid spawns on the bench or a landmark (swing, sandbox, tree) is off stage,
# a pet stands on the fence, the swing seat, or the door, the Kennel chip covers a pet,
# an arrow covers something, any text is under 13px, or the door is not the top tap target.
import asyncio, os, sys
from playwright.async_api import async_playwright

def opt(flag, env, default):
    if flag in sys.argv:
        i = sys.argv.index(flag)
        if i + 1 < len(sys.argv): return sys.argv[i + 1]
    return os.environ.get(env, default)

WEB_PORT = opt('--web-port', 'WEB_PORT', opt('--port', 'PORT', '5173'))
URL = f'http://127.0.0.1:{WEB_PORT}/kids-house-game/'
SIZES = [(820, 1180), (1180, 820), (1024, 768), (390, 844), (375, 667), (430, 932), (844, 390)]

READ = r"""
() => {
  const stage = document.querySelector('.stage');
  const st = stage.getBoundingClientRect();
  const viewW = parseFloat(stage.style.width) || 1;
  const sc = st.width / viewW;
  const border = 6 * sc;
  const cam = (window.__cam && __cam.get()) || 0;
  const originX = st.left + border;
  const originY = st.top + border;
  const worldOf = (b) => ({
    x: (b.left - originX) / sc + cam,
    y: (b.top - originY) / sc,
    r: (b.right - originX) / sc + cam,
    b: (b.bottom - originY) / sc,
  });
  const box = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    if (b.width < 1 || b.height < 1) return null;
    return { x: b.left, y: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height };
  };
  const items = [...document.querySelectorAll('#layer .item')].map(el => ({
    kind: el.dataset.kind || '', id: el.dataset.id || '', box: box(el),
  })).filter(i => i.box);
  const pets = [...document.querySelectorAll('#layer .pet')].map(el => ({
    kind: el.classList.contains('pet-cat') ? 'cat' : 'dog', box: box(el), world: null,
  })).filter(p => p.box);
  for (const p of pets) p.world = worldOf(p.box);
  const seat = box(document.querySelector('#layer .swingSeat'));
  const kid = box(document.querySelector('#layer .char'));
  const tree = box(document.getElementById('yardTree'));
  const kennel = box(document.querySelector('.kennelBtn'));
  const secrets = box(document.getElementById('secrets'));
  const doorEl = document.querySelector('.yardDoor');
  const door = box(doorEl);
  const label = box(document.querySelector('.yardHintLabel'));
  const arrows = ['nudgeL', 'nudgeR'].map(id => {
    const n = document.getElementById(id);
    const b = box(n);
    const off = !n || n.classList.contains('off') || n.offsetParent === null;
    return { id, off, box: off ? null : b };
  });
  const texts = [];
  const root = document.getElementById('app') || document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const raw = (node.textContent || '').replace(/\s+/g, ' ').trim();
    if (!raw) continue;
    const el = node.parentElement;
    if (!el) continue;
    if (el.closest('.hidden, .phoneNote, script, style')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
    const b = el.getBoundingClientRect();
    if (b.width < 1 || b.height < 1) continue;
    if (b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth) continue;
    const px = parseFloat(cs.fontSize) || 0;
    if (px < 13) texts.push({ px: Math.round(px * 10) / 10, text: raw.slice(0, 32), tag: el.tagName });
  }
  let top = null;
  if (door) {
    const cx = (door.x + door.r) / 2, cy = (door.y + door.b) / 2;
    const hit = document.elementFromPoint(cx, cy);
    top = { cx, cy, tag: hit ? hit.tagName : '', cls: hit ? String(hit.className).slice(0, 80) : '', door: !!(hit && hit.closest && hit.closest('.yardDoor')) };
  }
  return {
    stage: { x: st.left, y: st.top, r: st.right, b: st.bottom, w: st.width, h: st.height },
    viewW, sc, cam, room: document.body.dataset.room || (__store && __store.get().currentRoom),
    items, pets, seat, kid, tree, kennel, secrets, door, label, arrows, texts, top,
  };
}
"""

def almost(a, b, tol=1.25):
    return abs(a - b) <= tol

def overlaps(a, b, slop=1.0):
    if not a or not b: return False
    return a['x'] < b['r'] - slop and a['r'] > b['x'] + slop and a['y'] < b['b'] - slop and a['b'] > b['y'] + slop

def inside(a, stage, slop=1.25):
    return a['x'] >= stage['x'] - slop and a['y'] >= stage['y'] - slop and a['r'] <= stage['r'] + slop and a['b'] <= stage['b'] + slop

def fence_hit(world):
    # Picket run: x 846–2130, peaks at y 258, bottoms at y 372.
    return world['x'] < 2130 and world['r'] > 846 and world['y'] < 372 - 1 and world['b'] > 258

async def dismiss(pg):
    note = pg.locator('#phoneOk')
    if await note.count() and await note.is_visible():
        await note.click(force=True)
        await pg.wait_for_timeout(150)

async def read(pg):
    await pg.wait_for_timeout(350)
    return await pg.evaluate(READ)

async def open_size(p, w, h):
    phone = min(w, h) < 500 or (w > h and h <= 500)
    ctx = await p.new_context(viewport={'width': w, 'height': h}, has_touch=phone, is_mobile=min(w, h) < 500, device_scale_factor=1)
    await ctx.add_init_script("localStorage.setItem('cozy-whatsnew','999')")
    pg = await ctx.new_page()
    return ctx, pg

def judge(tag, data, living, problems):
    st, lv = data['stage'], living['stage']
    for key in ('x', 'y', 'w', 'h'):
        if not almost(st[key], lv[key]):
            problems.append(f'{tag} stage {key} yard {st[key]:.1f} living {lv[key]:.1f}')
            break
    for it in data['items']:
        if not inside(it['box'], st):
            problems.append(f"{tag} piece {it['kind']} outside")
    if not data['kid'] or not inside(data['kid'], st):
        problems.append(f'{tag} kid spawn outside')
    if data['tree'] and not inside(data['tree'], st):
        problems.append(f'{tag} tree outside')
    elif not data['tree']:
        problems.append(f'{tag} tree missing')
    bench = next((i['box'] for i in data['items'] if i['kind'] == 'yard-bench'), None)
    tulips = next((i['box'] for i in data['items'] if i['kind'] == 'tulip-bed'), None)
    if data['kid'] and bench and overlaps(data['kid'], bench):
        problems.append(f'{tag} kid spawn covers the bench')
    if data['kid'] and tulips and overlaps(data['kid'], tulips):
        problems.append(f'{tag} kid spawn covers the tulips')
    swing = next((i['box'] for i in data['items'] if i['kind'] == 'yard-swing'), None)
    sand = next((i['box'] for i in data['items'] if i['kind'] == 'sandbox'), None)
    if swing and sand:
        if overlaps(swing, sand):
            problems.append(f'{tag} swing overlaps sandbox')
        elif swing['x'] < sand['r'] and swing['r'] > sand['x']:
            gap = (sand['y'] - swing['b']) if sand['y'] >= swing['b'] else (swing['y'] - sand['b'])
            if data['sc'] and gap / data['sc'] < 20:
                problems.append(f'{tag} swing and sandbox gap {gap / data["sc"]:.0f}')
    if data['kennel']:
        for pet in data['pets']:
            if overlaps(data['kennel'], pet['box']):
                problems.append(f"{tag} kennel chip covers {pet['kind']}")
        sec = data['secrets']
        if sec and overlaps(sec, st) and overlaps(data['kennel'], sec):
            problems.append(f'{tag} kennel chip covers surprises')
    door_zone = data['door']
    for pet in data['pets']:
        if fence_hit(pet['world']):
            problems.append(f"{tag} {pet['kind']} on fence y {pet['world']['y']:.0f}-{pet['world']['b']:.0f}")
        if data['seat'] and overlaps(pet['box'], data['seat']):
            problems.append(f"{tag} {pet['kind']} on swing seat")
        if door_zone and overlaps(pet['box'], door_zone):
            problems.append(f"{tag} {pet['kind']} on door")
        for it in data['items']:
            if overlaps(pet['box'], it['box']):
                problems.append(f"{tag} {pet['kind']} overlaps {it['kind']}")
        other = [p for p in data['pets'] if p is not pet]
        for o in other:
            if overlaps(pet['box'], o['box']):
                problems.append(f"{tag} {pet['kind']} overlaps {o['kind']}")
    if data['kid'] and data['door'] and overlaps(data['kid'], data['door']):
        problems.append(f'{tag} kid overlaps door')
    for arrow in data['arrows']:
        if not arrow['box']: continue
        for it in data['items']:
            if overlaps(arrow['box'], it['box']):
                problems.append(f"{tag} {arrow['id']} overlaps {it['kind']}")
        if data['kid'] and overlaps(arrow['box'], data['kid']):
            problems.append(f"{tag} {arrow['id']} overlaps kid")
        if data['tree'] and overlaps(arrow['box'], data['tree']):
            problems.append(f"{tag} {arrow['id']} overlaps tree")
        if data['door'] and overlaps(arrow['box'], data['door']):
            problems.append(f"{tag} {arrow['id']} overlaps door")
        if data['label'] and overlaps(arrow['box'], data['label']):
            problems.append(f"{tag} {arrow['id']} overlaps label")
    for t in data['texts']:
        problems.append(f"{tag} text {t['px']}px '{t['text']}'")
    if not data['top'] or not data['top']['door']:
        problems.append(f"{tag} door not top target {data['top']}")

async def main():
    problems = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for w, h in SIZES:
            ctx, pg = await open_size(browser, w, h)
            await pg.goto(URL, wait_until='networkidle')
            await dismiss(pg)
            living = await read(pg)
            door = pg.locator('.yardDoor')
            await door.click(force=True)
            await pg.wait_for_timeout(400)
            fresh = await read(pg)
            kinds = sorted(i['kind'] for i in fresh['items'])
            if kinds != ['tulip-bed', 'yard-bench']:
                problems.append(f'{w}x{h} fresh pieces {kinds}')
            judge(f'{w}x{h} fresh', fresh, living, problems)
            await ctx.close()

            ctx, pg = await open_size(browser, w, h)
            await pg.goto(URL + '?yard=1&shot=play', wait_until='networkidle')
            await dismiss(pg)
            await pg.wait_for_selector('body[data-yard="ready"]')
            await pg.wait_for_timeout(500)
            staged = await read(pg)
            want = {'lemonade-cart', 'picnic-blanket', 'sandbox', 'tulip-bed', 'yard-bench', 'yard-swing'}
            got = {i['kind'] for i in staged['items']}
            if not want <= got:
                problems.append(f'{w}x{h} staged missing {sorted(want - got)}')
            if len(staged['pets']) < 2:
                problems.append(f"{w}x{h} staged pets {len(staged['pets'])}")
            # Play mode hides the shelf in every room. Compare the yard to the living room in that same mode.
            await pg.evaluate("() => __store.dispatch({type:'room/switch', room:'living'})")
            await pg.wait_for_timeout(300)
            play_living = await read(pg)
            await pg.evaluate("() => __store.dispatch({type:'room/switch', room:'backyard'})")
            await pg.wait_for_timeout(400)
            staged = await read(pg)
            judge(f'{w}x{h} staged', staged, play_living, problems)
            await ctx.close()
            print(f'{w}x{h} checked', flush=True)
        await browser.close()
    if problems:
        print(f'FAIL {len(problems)}')
        for line in problems:
            print(' -', line)
        sys.exit(1)
    print(f'PASS yard guard {len(SIZES)} sizes, fresh and staged')

if __name__ == '__main__':
    asyncio.run(main())
