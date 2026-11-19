# B18 item 4: two pets at one bed overlap neither the doll's face nor each other.
# Measured at 820x1180 and 1180x820. Stored cat.x stays unchanged.
# usage: WEB=http://127.0.0.1:5350/kids-house-game python tests/pet_foot_ingame_test.py
import asyncio, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from playwright.async_api import async_playwright
from testnav import SKIP_WN

WEB = os.environ.get('WEB', 'http://localhost:5350').rstrip('/')
assert 'workers.dev' not in WEB
ok_all = True

def check(name, ok, extra=''):
    global ok_all
    ok_all &= bool(ok)
    print(('PASS ' if ok else 'FAIL ') + name + ((' ' + str(extra)) if extra else ''), flush=True)

def hit(a, b, pad=0):
    return a['l'] < b['r'] - pad and b['l'] < a['r'] - pad and a['t'] < b['b'] - pad and b['t'] < a['b'] - pad

READY = """() => !!(window.__store && document.getElementById('btnMenu') && document.querySelector('.char[data-cid]'))"""

SETUP = """() => {
  const S = __store;
  S.dispatch({ type: 'room/switch', room: 'bedroom' });
  const s = S.get();
  const bed = s.rooms.bedroom.items.find(i => i.kind === 'bed');
  const c = s.characters[0];
  S.dispatch({ type: 'char/move', id: c.id, room: 'bedroom', x: bed.x, y: bed.y, seat: { item: bed.id, pose: 'lie', n: 0 } });
  if (!s.cat) S.dispatch({ type: 'cat/set', cat: { name: 'Clover', coat: 0, room: 'bedroom', x: bed.x } });
  else S.dispatch({ type: 'cat/move', room: 'bedroom', x: bed.x });
  const catX = S.get().cat.x;
  if (!s.dog) S.dispatch({ type: 'dog/set', dog: { name: 'Sunny', breed: 0, owner: c.id } });
  // Pin the cat near the bed so we do not wait on the wander clock.
  window.__pinCat = { x: bed.x, y: Math.max(520, bed.y) };
  if (window.__cam) __cam.set(Math.max(0, bed.x - 340));
  return { id: c.id, bed: { id: bed.id, x: bed.x, y: bed.y }, catX };
}"""

MEASURE = """() => {
  const box = el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height };
  };
  // Painted body only (object-fit: contain, bottom centre). The CSS box includes
  // transparent padding, which would make two on-mattress pets look overlapped.
  // Fractions are the opaque bbox of cat-*-nap (360x300) and dog-*-sleep (390x300).
  const FRAC = {
    nap: { nw: 360, nh: 300, l: 61, t: 145, r: 339, b: 300 },
    sleep: { nw: 390, nh: 300, l: 58, t: 58, r: 288, b: 287 },
  };
  const opaque = (sel, pose) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const img = el.querySelector('img.petsprite, img, svg');
    const host = img || el;
    const br = host.getBoundingClientRect();
    if (br.width < 2 || br.height < 2) return null;
    const fr = FRAC[pose];
    if (fr) {
      const scale = Math.min(br.width / fr.nw, br.height / fr.nh);
      const dw = fr.nw * scale, dh = fr.nh * scale;
      const ox = br.left + (br.width - dw) / 2;
      const oy = br.bottom - dh;
      return { l: ox + fr.l * scale, t: oy + fr.t * scale, r: ox + fr.r * scale, b: oy + fr.b * scale };
    }
    return { l: br.left, t: br.top, r: br.right, b: br.bottom };
  };
  const cat = document.querySelector('.pet.pet-cat');
  const dog = document.querySelector('.pet.pet-dog:not(.kenneled)');
  const doll = document.querySelector('.char[data-cid]');
  const head = doll && doll.querySelector('.dollhead');
  const bedEl = document.querySelector('.item[data-kind="bed"]');
  const bedBox = box(bedEl);
  let mat = null;
  if (bedBox) {
    const flip = !!(bedEl && (bedEl.classList.contains('flipped') || bedEl.dataset.flip === '1'));
    const mx = 0.36, my = 0.34, mw = 0.36, mh = 0.16;
    let l = bedBox.l + mx * bedBox.w;
    let rr = bedBox.l + (mx + mw) * bedBox.w;
    const t = bedBox.t + my * bedBox.h;
    const b = bedBox.t + (my + mh) * bedBox.h;
    if (flip) {
      const cx = (bedBox.l + bedBox.r) / 2;
      const nl = cx - (rr - cx), nr = cx - (l - cx);
      l = nl; rr = nr;
    }
    mat = { l, t, r: rr, b };
  }
  // Painted foot of the bedspread (pet-foot.ts FOOT_MAT_FRAC), not the hip-target mat.
  let foot = null;
  if (bedBox) {
    const flip = !!(bedEl && (bedEl.classList.contains('flipped') || bedEl.dataset.flip === '1'));
    const fx = 0.28, fy = 0.52, fw = 0.50, fh = 0.26;
    let l = bedBox.l + fx * bedBox.w;
    let rr = bedBox.l + (fx + fw) * bedBox.w;
    const t = bedBox.t + fy * bedBox.h;
    const b = bedBox.t + (fy + fh) * bedBox.h;
    if (flip) {
      const cx = (bedBox.l + bedBox.r) / 2;
      const nl = cx - (rr - cx), nr = cx - (l - cx);
      l = nl; rr = nr;
    }
    foot = { l, t, r: rr, b };
  }
  // Lie-body region on the bed: pillow through mid-torso, not the foot. Used so
  // "does not overlap the doll" means her painted body, not only .dollhead.
  let body = null;
  if (bedBox) {
    const flip = !!(bedEl && (bedEl.classList.contains('flipped') || bedEl.dataset.flip === '1'));
    let l = bedBox.l + 0.10 * bedBox.w;
    let rr = bedBox.l + 0.54 * bedBox.w;
    const t = bedBox.t + 0.28 * bedBox.h;
    const b = bedBox.t + 0.56 * bedBox.h;
    if (flip) {
      const cx = (bedBox.l + bedBox.r) / 2;
      const nl = cx - (rr - cx), nr = cx - (l - cx);
      l = nl; rr = nr;
    }
    body = { l, t, r: rr, b };
  }
  // Painted bedspread inside the rails/footboard (pet-foot.ts MAT_INNER_FRAC).
  let matInner = null;
  if (bedBox) {
    const flip = !!(bedEl && (bedEl.classList.contains('flipped') || bedEl.dataset.flip === '1'));
    const ix = 0.16, iy = 0.42, iw = 0.62, ih = 0.38;
    let l = bedBox.l + ix * bedBox.w;
    let rr = bedBox.l + (ix + iw) * bedBox.w;
    const t = bedBox.t + iy * bedBox.h;
    const b = bedBox.t + (iy + ih) * bedBox.h;
    if (flip) {
      const cx = (bedBox.l + bedBox.r) / 2;
      const nl = cx - (rr - cx), nr = cx - (l - cx);
      l = nl; rr = nr;
    }
    matInner = { l, t, r: rr, b };
  }
  // Pillow-end painted face. The rotated .dollhead AABB reaches toward the foot.
  let facePaint = null;
  if (bedBox) {
    const flip = !!(bedEl && (bedEl.classList.contains('flipped') || bedEl.dataset.flip === '1'));
    let l = bedBox.l + 0.08 * bedBox.w;
    let rr = bedBox.l + 0.38 * bedBox.w;
    const t = bedBox.t + 0.18 * bedBox.h;
    const b = bedBox.t + 0.45 * bedBox.h;
    if (flip) {
      const cx = (bedBox.l + bedBox.r) / 2;
      const nl = cx - (rr - cx), nr = cx - (l - cx);
      l = nl; rr = nr;
    }
    facePaint = { l, t, r: rr, b };
  }
  const stageEl = document.getElementById('stage');
  const stageBox = box(stageEl);
  const poseOf = el => {
    if (!el) return null;
    const img = el.querySelector('img[src]');
    const src = (img && img.getAttribute('src')) || '';
    if (/-nap/.test(src) || el.querySelector('svg.nap')) return 'nap';
    if (/-sleep/.test(src) || el.querySelector('svg.sleep')) return 'sleep';
    if (/-sit/.test(src)) return 'sit';
    if (/-stand/.test(src)) return 'stand';
    return el.dataset.mood || null;
  };
  const catPose = poseOf(cat);
  const dogPose = poseOf(dog);
  return {
    cat: opaque('.pet.pet-cat', catPose) || box(cat),
    dog: opaque('.pet.pet-dog:not(.kenneled)', dogPose) || box(dog),
    face: box(head),
    doll: box(doll),
    mat,
    foot,
    body,
    matInner,
    facePaint,
    stage: stageBox,
    catPose,
    dogPose,
    catStored: (__store.get().cat || {}).x,
    footClass: !!(cat && cat.classList.contains('soc-foot')) || !!(dog && dog.classList.contains('soc-foot')),
    catT: cat && cat.style.translate,
    dogT: dog && dog.style.translate,
  };
}"""

async def wait_ready(pg):
    try:
        await pg.evaluate("() => { for (const b of document.querySelectorAll('button')) if (/^OK!?$/.test((b.textContent||'').trim()) && b.offsetParent) b.click(); }")
    except Exception:
        pass
    await pg.wait_for_function(READY, timeout=20000)

async def goto_game(pg):
    url = WEB if '/kids-house-game' in WEB else WEB.rstrip('/') + '/kids-house-game'
    await pg.goto(url + '/', wait_until='domcontentloaded')
    await pg.wait_for_timeout(600)
    await wait_ready(pg)

async def run_size(browser, w, h):
    tag = f'{w}x{h}'
    c = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True)
    await c.add_init_script(SKIP_WN)
    pg = await c.new_page()
    await goto_game(pg)
    info = await pg.evaluate(SETUP)
    await pg.wait_for_timeout(800)
    # Give the rAF / social paint a moment to slide them to the foot.
    try:
        await pg.wait_for_function("() => document.querySelector('.pet.pet-cat') && document.querySelector('.pet.pet-dog:not(.kenneled)')", timeout=5000)
    except Exception:
        pass
    await pg.wait_for_timeout(600)
    m = await pg.evaluate(MEASURE)
    check(f'{tag}: setup has a bed and a stored cat.x', info and 'catX' in info, info)
    check(f'{tag}: cat is on screen', bool(m.get('cat')), m)
    check(f'{tag}: dog is on screen', bool(m.get('dog')), m)
    check(f'{tag}: doll face (.dollhead) is on screen', bool(m.get('face')), m)
    def on_foot(body, foot, slack=24):
        if not body or not foot:
            return False
        cx = (body['l'] + body['r']) / 2
        cy = (body['t'] + body['b']) / 2
        feet = body['b']
        in_x = foot['l'] - slack <= cx <= foot['r'] + slack
        in_y = foot['t'] - slack <= cy <= foot['b'] + slack
        feet_ok = foot['t'] - slack <= feet <= foot['b'] + slack * 1.5
        return in_x and in_y and feet_ok
    if m.get('cat') and m.get('dog'):
        check(f'{tag}: two pets do not overlap each other', not hit(m['cat'], m['dog']), m)
    face_box = m.get('facePaint') or m.get('face')
    if m.get('cat') and face_box:
        check(f'{tag}: cat does not overlap the doll face', not hit(m['cat'], face_box), {'cat': m['cat'], 'face': face_box})
    if m.get('dog') and face_box:
        check(f'{tag}: dog does not overlap the doll face', not hit(m['dog'], face_box), {'dog': m['dog'], 'face': face_box})
    if m.get('cat') and m.get('body'):
        check(f'{tag}: cat does not overlap the doll body', not hit(m['cat'], m['body'], 4), {'cat': m['cat'], 'body': m['body']})
    else:
        check(f'{tag}: cat does not overlap the doll body', False, m)
    if m.get('dog') and m.get('body'):
        check(f'{tag}: dog does not overlap the doll body', not hit(m['dog'], m['body'], 4), {'dog': m['dog'], 'body': m['body']})
    else:
        check(f'{tag}: dog does not overlap the doll body', False, m)
    if m.get('cat') and m.get('foot'):
        check(f'{tag}: cat is on the mattress at the foot', on_foot(m['cat'], m['foot']), {'cat': m['cat'], 'foot': m['foot'], 'mat': m.get('mat')})
    else:
        check(f'{tag}: cat is on the mattress at the foot', False, m)
    if m.get('dog') and m.get('foot'):
        check(f'{tag}: dog is on the mattress at the foot', on_foot(m['dog'], m['foot']), {'dog': m['dog'], 'foot': m['foot'], 'mat': m.get('mat')})
    else:
        check(f'{tag}: dog is on the mattress at the foot', False, m)
    if m.get('cat') and m.get('dog'):
        dx = abs(((m['cat']['l']+m['cat']['r'])/2) - ((m['dog']['l']+m['dog']['r'])/2))
        dy = abs(((m['cat']['t']+m['cat']['b'])/2) - ((m['dog']['t']+m['dog']['b'])/2))
        check(f'{tag}: second pet is on the other side of the foot', dx > 16 or dy > 16, {'cat': m['cat'], 'dog': m['dog']})
    def inside(body, box, slack=12):
        if not body or not box:
            return False
        return (body['l'] >= box['l'] - slack and body['r'] <= box['r'] + slack
                and body['t'] >= box['t'] - slack and body['b'] <= box['b'] + slack)
    if m.get('cat') and m.get('matInner'):
        check(f'{tag}: cat is inside the mattress and inside the footboard', inside(m['cat'], m['matInner']), {'cat': m['cat'], 'matInner': m['matInner']})
    else:
        check(f'{tag}: cat is inside the mattress and inside the footboard', False, m)
    if m.get('dog') and m.get('matInner'):
        check(f'{tag}: dog is inside the mattress and inside the footboard', inside(m['dog'], m['matInner']), {'dog': m['dog'], 'matInner': m['matInner']})
    else:
        check(f'{tag}: dog is inside the mattress and inside the footboard', False, m)
    def in_stage(body, stage, inset=8):
        if not body or not stage:
            return False
        return (body['l'] >= stage['l'] + inset and body['r'] <= stage['r'] - inset
                and body['t'] >= stage['t'] + inset and body['b'] <= stage['b'] - inset)
    if m.get('cat') and m.get('stage'):
        check(f'{tag}: cat is fully visible in the stage', in_stage(m['cat'], m['stage']), {'cat': m['cat'], 'stage': m['stage']})
    else:
        check(f'{tag}: cat is fully visible in the stage', False, m)
    if m.get('dog') and m.get('stage'):
        check(f'{tag}: dog is fully visible in the stage', in_stage(m['dog'], m['stage']), {'dog': m['dog'], 'stage': m['stage']})
    else:
        check(f'{tag}: dog is fully visible in the stage', False, m)
    check(f'{tag}: cat uses a curled/lying pose', m.get('catPose') in ('nap', 'sleep'), m.get('catPose'))
    check(f'{tag}: dog uses a curled/lying pose', m.get('dogPose') in ('nap', 'sleep'), m.get('dogPose'))
    check(f'{tag}: stored cat.x is unchanged', m.get('catStored') == info.get('catX'), f"before={info.get('catX')} after={m.get('catStored')}")
    await c.close()

async def main():
    async with async_playwright() as p:
        b = await p.webkit.launch()
        await run_size(b, 820, 1180)
        await run_size(b, 1180, 820)
        await b.close()
    print('ALL OK' if ok_all else 'SOME FAILED')
    sys.exit(0 if ok_all else 1)

asyncio.run(main())
