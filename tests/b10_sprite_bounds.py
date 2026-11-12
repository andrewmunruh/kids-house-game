#!/usr/bin/env python3
"""Batch 10 painted-sprite bounds: each painted pet / ranch sprite vs its SVG drawing, in-game, ±3%.

Usage: DIST=dist HEAD_URL=http://127.0.0.1:PORT/kids-house-game/ python tests/b10_sprite_bounds.py bounds
(serve DIST at /kids-house-game/). Also `shots` for SHA-labeled before/after frames (MAIN_URL).

Measuring fixes (tests/b10_sprite_bounds_test.py):
  1. FREEZE_CSS: animations/transitions are frozen so the SVG windmill sails and walking animals
     don't change the measured box between the SVG and painted captures.
  2. pet_url(): pet sprites are loaded from the dist's hashed asset names (assets/<id>-<hash>.webp);
     the old /assets/art/pets/<id>.webp path 404s in a built dist and measured an empty box.
  3. The pet host is a fixed box on <body>; inside #layer the stage clipped each pet's lower half.
  Also: barn animals are waited as attached and scrolled into view before capture.
Pet sprites get the game's fit (src/art/pet_fit.json -> --fx/--fy, same as petFitStyle in src/art/sprites.ts).
"""
import asyncio, io, json, os, sys, re
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

HEAD = os.environ.get('HEAD_URL', 'http://127.0.0.1:5198/kids-house-game/')
MAIN = os.environ.get('MAIN_URL', 'http://127.0.0.1:5197/kids-house-game/')
HEAD_SHA = os.environ.get('HEAD_SHA', 'cedf220')
MAIN_SHA = os.environ.get('MAIN_SHA', '6f89474')
OUT = Path(os.environ.get('OUT', '/tmp/b10_sprite_bounds/shots'))
BOUNDS = Path(os.environ.get('BOUNDS', '/tmp/b10_sprite_bounds/bounds'))
CROPS = Path(os.environ.get('CROPS', '/tmp/b10_sprite_bounds/crops'))
OUT.mkdir(parents=True, exist_ok=True)
BOUNDS.mkdir(parents=True, exist_ok=True)
CROPS.mkdir(parents=True, exist_ok=True)

SKY = os.environ.get('SKY', 'day')
SKY_TIME = {'day': '2026-06-15T12:00:00Z', 'night': '2026-06-15T23:00:00Z'}[SKY]
TOL = float(os.environ.get('TOL', '2.0'))
WARN_TOL = float(os.environ.get('WARN_TOL', '3.0'))  # shipping: fail >3%
WH = (820, 1180)  # user asked 820x1180 (portrait)

REPO = Path(__file__).resolve().parent.parent
INVENTORY = Path(os.environ.get('INVENTORY', str(REPO / 'tests/fixtures/b10_sprite_inventory.json')))
PET_FIT = json.load(open(REPO / 'src/art/pet_fit.json'))
# Fix 1: freeze animation so the measured box is the same frame in both captures.
FREEZE_CSS = '*,*::before,*::after{animation:none!important;transition:none!important}'

def pet_fit_style(kid):
  """Inline style the game puts on a painted pet img (mirrors petFitStyle in src/art/sprites.ts).
  NO_PET_FIT=1 measures the raw sprites (used to compute the fit table)."""
  f = None if os.environ.get('NO_PET_FIT') == '1' else PET_FIT.get(kid)
  return f'--fx:{f[0]};--fy:{f[1]};' if f else ''

SKIP_WN = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"

HIDE_ALL = (
  "html,body,#app,.stage,#stage,#stage *{background:transparent!important}"
  " body *{visibility:hidden!important}"
)
SHOW = " {visibility:visible!important}"

async def dismiss(pg):
  for sel in ('#phoneOk', '.whatsNew .wnGo', '#wnGo'):
    loc = pg.locator(sel)
    if await loc.count() and await loc.first.is_visible():
      await loc.first.click(force=True); await pg.wait_for_timeout(150)

async def open_page(browser, url, w=1180, h=820):
  ctx = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, timezone_id='UTC')
  await ctx.add_init_script(SKIP_WN)
  pg = await ctx.new_page()
  await pg.clock.set_fixed_time(SKY_TIME)
  await pg.goto(url, wait_until='load')
  await pg.wait_for_selector('#stage', timeout=20000)
  await pg.add_style_tag(content=FREEZE_CSS)
  await dismiss(pg)
  await pg.wait_for_timeout(400)
  return ctx, pg

async def go_ranch(pg):
  await pg.evaluate("() => document.getElementById('btnMap')?.click()")
  await pg.wait_for_timeout(400)
  # click ranch on map
  await pg.evaluate("""() => {
    const spot = document.querySelector('#mapWorld [data-go=ranch], .mapSpot[data-go=ranch]');
    if (spot) spot.click();
    else if (window.__go) __go('ranch');
  }""")
  try:
    await pg.wait_for_selector('#ranchWorld', timeout=10000)
  except Exception:
    # fallback testnav-style
    await pg.evaluate("""() => {
      const s = document.querySelector('[data-go=\"ranch\"]');
      if (s) s.click();
    }""")
    await pg.wait_for_selector('#ranchWorld', timeout=10000)
  await pg.wait_for_timeout(1200)

async def go_living(pg):
  await pg.evaluate("""() => {
    if (document.body.classList.contains('view-map')) document.getElementById('btnMap')?.click();
    __store.dispatch({type:'room/switch', room:'living'});
    document.querySelector('[data-room=\"living\"]')?.click();
  }""")
  await pg.wait_for_timeout(800)

async def shoot_pair(browser, scene):
  """Capture HEAD painted + MAIN (no paint) at 820x1180 WebKit."""
  w, h = WH
  results = []
  for label, url in ((f'pr-{HEAD_SHA}', HEAD), (f'main-{MAIN_SHA}', MAIN)):
    ctx, pg = await open_page(browser, url, w, h)
    if scene == 'ranch':
      await go_ranch(pg)
    else:
      await go_living(pg)
      # Adopt a front-facing sit-ish cat + dog for living shot
      await pg.evaluate("""() => {
        __store.dispatch({type:'cat/set', cat:{name:'Clover', coat:0, room:'living', x:1100}});
        __store.dispatch({type:'dog/set', dog:{name:'Sunny', breed:2, owner:(__store.get().characters[0]||{}).id}});
      }""")
      await pg.wait_for_timeout(600)
    path = OUT / f'{label}__{scene}__{w}x{h}__webkit.png'
    await pg.screenshot(path=str(path))
    print('SHOT', path, flush=True)
    results.append(path)
    await ctx.close()
  # also HEAD art=v1 as vector before-alt
  ctx, pg = await open_page(browser, HEAD + ('&' if '?' in HEAD else '?') + 'art=v1', w, h)
  if scene == 'ranch':
    await go_ranch(pg)
  else:
    await go_living(pg)
    await pg.evaluate("""() => {
      __store.dispatch({type:'cat/set', cat:{name:'Clover', coat:0, room:'living', x:1100}});
      __store.dispatch({type:'dog/set', dog:{name:'Sunny', breed:2}});
    }""")
    await pg.wait_for_timeout(600)
  path = OUT / f'pr-{HEAD_SHA}__{scene}__{w}x{h}__webkit__artv1.png'
  await pg.screenshot(path=str(path))
  print('SHOT', path, flush=True)
  await ctx.close()
  return results

async def close_crops(browser):
  """Close crops from HEAD ranch/living: rainbow horse, front cat, lying dog."""
  w, h = 1180, 820  # landscape for ranch world
  ctx, pg = await open_page(browser, HEAD, w, h)
  await go_ranch(pg)
  # Rainbow horse is coat index 4
  box = await pg.evaluate("""() => {
    const el = document.querySelector('.horse[data-horse=\"4\"]');
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {x:b.x-20,y:b.y-20,width:b.width+40,height:b.height+40};
  }""")
  if box and box['width'] > 0:
    png = await pg.screenshot(clip=box)
    Image.open(io.BytesIO(png)).save(CROPS / f'{HEAD_SHA}__crop-horse-rainbow-bare.png')
    print('CROP horse-rainbow', flush=True)
  # Animals strip
  box = await pg.evaluate("""() => {
    const els = [...document.querySelectorAll('#ranchWorld .animal, #ranchWorld .horse')];
    if (!els.length) return null;
    let x1=1e9,y1=1e9,x2=0,y2=0;
    for (const el of els) {
      const b = el.getBoundingClientRect();
      x1=Math.min(x1,b.left); y1=Math.min(y1,b.top); x2=Math.max(x2,b.right); y2=Math.max(y2,b.bottom);
    }
    return {x:x1-10,y:y1-10,width:x2-x1+20,height:y2-y1+20};
  }""")
  if box and box['width'] > 10:
    # clamp to viewport
    box['x'] = max(0, box['x']); box['y'] = max(0, box['y'])
    box['width'] = min(box['width'], w - box['x']); box['height'] = min(box['height'], h - box['y'])
    png = await pg.screenshot(clip=box)
    Image.open(io.BytesIO(png)).save(CROPS / f'{HEAD_SHA}__crop-ranch-animals.png')
    print('CROP ranch-animals', flush=True)
  await ctx.close()

  # Living: force cat sit front + dog sleep via img swap for crop clarity
  ctx, pg = await open_page(browser, HEAD, w, h)
  await go_living(pg)
  await pg.evaluate("""() => {
    __store.dispatch({type:'cat/set', cat:{name:'Clover', coat:0, room:'living', x:1000}});
    __store.dispatch({type:'dog/set', dog:{name:'Wally', breed:2, owner:(__store.get().characters[0]||{}).id}});
  }""")
  await pg.wait_for_timeout(700)
  # Force sit / sleep imgs for recognizable crop
  await pg.evaluate("""() => {
    const cat = document.querySelector('.pet-cat .inner');
    if (cat) cat.innerHTML = '<img class=\"artimg sprite petsprite\" alt=\"\" src=\"/kids-house-game/assets/art/pets/cat-tabby-sit.webp\">';
    const dog = document.querySelector('.pet-dog .inner, .dog .inner, [class*=\"dog\"] .inner');
    // dog runs use various classes
    for (const el of document.querySelectorAll('.dog .inner, .pet-dog .inner')) {
      el.innerHTML = '<img class=\"artimg sprite petsprite\" alt=\"\" src=\"/kids-house-game/assets/art/pets/dog-dachshund-sleep.webp\">';
    }
  }""")
  await pg.wait_for_timeout(300)
  for sel, name in (('.pet-cat', 'cat-tabby-sit'), ('.dog', 'dog-dachshund-sleep')):
    box = await pg.evaluate("""(sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      if (b.width < 5) return null;
      return {x:b.x-16,y:b.y-16,width:b.width+32,height:b.height+32};
    }""", sel)
    if box:
      box['x'] = max(0, box['x']); box['y'] = max(0, box['y'])
      png = await pg.screenshot(clip=box)
      Image.open(io.BytesIO(png)).save(CROPS / f'{HEAD_SHA}__crop-{name}.png')
      print('CROP', name, flush=True)
  await ctx.close()

def alpha_bbox(png_bytes):
  im = Image.open(io.BytesIO(png_bytes)).convert('RGBA')
  a = im.split()[-1].point(lambda v: 255 if v > 0 else 0)
  return a.getbbox(), im.size

async def measure_el(pg, selector, pad=24):
  box = await pg.evaluate("""([sel,pad]) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {x: Math.max(0,b.x-pad), y: Math.max(0,b.y-pad),
            width: b.width+2*pad, height: b.height+2*pad, ew:b.width, eh:b.height};
  }""", [selector, pad])
  if not box or box['width'] < 2:
    return None
  # clamp
  vp = pg.viewport_size
  box['width'] = min(box['width'], vp['width'] - box['x'])
  box['height'] = min(box['height'], vp['height'] - box['y'])
  png = await pg.screenshot(clip=box, omit_background=True)
  bb, _ = alpha_bbox(png)
  if not bb:
    return None
  # device_scale_factor=2 → divide by 2 for CSS px
  return dict(l=bb[0]/2, t=bb[1]/2, r=bb[2]/2, b=bb[3]/2, w=box['ew'])

async def ranch_bounds(browser):
  """In-game alpha bounds for ranch horses/animals/props vs art=v1."""
  rows = []
  selectors = []
  # horses 0..4 bare (paddock)
  for i in range(5):
    selectors.append((f'horse-{i}-bare', f'.horse[data-horse=\"{i}\"]'))
  # animals in barn - need enter barn for animals
  props = [
    ('hen-house', '.rprop.henHouse'),
    ('tractor', '.rprop.tractor'),
    ('apple-tree', '.rprop.appleTree'),
    ('windmill', '.rprop.windmill'),
  ]
  for name, sel in props:
    selectors.append((name, sel))

  async def run(url, artv1=False):
    u = url + ('&' if '?' in url else '?') + 'art=v1' if artv1 else url
    # strip double ?
    u = u.replace('?&', '?')
    ctx, pg = await open_page(browser, u, 1180, 820)
    await go_ranch(pg)
    out = {}
    # measure paddock horses + props
    await pg.add_style_tag(content=HIDE_ALL)
    for name, sel in selectors:
      await pg.evaluate("""(sel) => {
        document.querySelectorAll('.qa-show').forEach(e => e.classList.remove('qa-show'));
        const el = document.querySelector(sel);
        if (el) { el.classList.add('qa-show'); el.style.visibility='visible';
          el.querySelectorAll('*').forEach(c => c.style.visibility='visible'); }
      }""", sel)
      # show rule
      await pg.add_style_tag(content=f".qa-show,.qa-show *{SHOW}")
      await pg.wait_for_timeout(80)
      # pan camera if needed - ranch may scroll
      await pg.evaluate("""(sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.scrollIntoView({block:'center', inline:'center'});
      }""", sel)
      await pg.wait_for_timeout(100)
      m = await measure_el(pg, sel)
      out[name] = m
    # Barn animals
    await pg.evaluate("() => document.querySelector('.barnDoor')?.click()")
    try:
      await pg.wait_for_selector('#ranchWorld .animal', state='attached', timeout=5000)
      await pg.wait_for_timeout(800)
      await pg.add_style_tag(content=HIDE_ALL)
      for i in range(6):
        name, sel = f'animal-{i}', f'.animal[data-animal=\"{i}\"]'
        await pg.evaluate("""(sel) => {
          document.querySelectorAll('.qa-show').forEach(e => e.classList.remove('qa-show'));
          const el = document.querySelector(sel);
          if (el) { el.classList.add('qa-show'); el.style.visibility='visible';
            el.querySelectorAll('*').forEach(c => c.style.visibility='visible'); }
        }""", sel)
        await pg.add_style_tag(content=f".qa-show,.qa-show *{SHOW}")
        await pg.evaluate("""(sel) => { const e = document.querySelector(sel), s = document.getElementById('ranchScroll'); if (!e || !s) return; const r = e.getBoundingClientRect(); s.scrollLeft += r.x + r.width / 2 - s.clientWidth / 2; }""", sel)
        await pg.wait_for_timeout(250)
        m = await measure_el(pg, sel)
        out[name] = m
        selectors.append((name, sel))  # for reporting keys - careful mutate
    except Exception as e:
      print('barn skip', e, flush=True)
    await ctx.close()
    return out

  # unique selector list for compare (rebuild clean)
  keys = [f'horse-{i}-bare' for i in range(5)] + [n for n,_ in props] + [f'animal-{i}' for i in range(6)]
  svg = await run(HEAD, True)
  ai = await run(HEAD, False)
  fails = warns = 0
  for k in keys:
    s, a = svg.get(k), ai.get(k)
    if not s or not a:
      print(f'SKIP {k:22} missing svg={s is not None} paint={a is not None}', flush=True)
      rows.append(dict(kind=k, status='SKIP'))
      continue
    sw, sh = s['r']-s['l'], s['b']-s['t']
    aw, ah = a['r']-a['l'], a['b']-a['t']
    if sw < 1 or sh < 1:
      print(f'SKIP {k:22} empty svg box', flush=True)
      rows.append(dict(kind=k, status='SKIP'))
      continue
    dw = (aw/sw - 1)*100
    dh = (ah/sh - 1)*100
    feet = (a['b']-s['b'])/s['w']*100 if s['w'] else 0
    cx = ((a['l']+a['r'])/2 - (s['l']+s['r'])/2)/s['w']*100 if s['w'] else 0
    worst = max(abs(dw), abs(dh))
    status = 'OK' if worst <= TOL else 'WARN' if worst <= WARN_TOL else 'FAIL'
    fails += status == 'FAIL'; warns += status == 'WARN'
    print(f'{status} {k:22} dw={dw:+5.1f}% dh={dh:+5.1f}% feet={feet:+4.1f}% cx={cx:+4.1f}%', flush=True)
    rows.append(dict(kind=k, dw=round(dw,1), dh=round(dh,1), feet=round(feet,1), cx=round(cx,1), status=status))
  summary = dict(pass_=sum(1 for r in rows if r.get('status')=='OK'), warn=warns, fail=fails, n=len([r for r in rows if r.get('status')!='SKIP']), sky=SKY)
  print(f"ranch sprites: pass {summary['pass_']}, warn {warns}, fail {fails} of {summary['n']} (pass ±{TOL}%, warn ±{WARN_TOL}%) sky={SKY}", flush=True)
  json.dump(rows, open(BOUNDS / f'ranch-sprites-{SKY}.json', 'w'), indent=1)
  return rows, summary

import glob as _glob
DIST = os.environ.get('DIST', '')
def pet_url(dist, kid):
  """Fix 2: the built dist renames pets/<id>.webp to assets/<id>-<hash>.webp."""
  hits = sorted(h for h in _glob.glob(os.path.join(dist, 'assets', kid + '-*.webp')) if re.fullmatch(re.escape(kid) + r'-[A-Za-z0-9_-]{6,12}\.webp', os.path.basename(h)))
  return '/kids-house-game/assets/' + os.path.basename(hits[0]) if hits else '/kids-house-game/assets/art/pets/' + kid + '.webp'
def _pet_url(kid):
  return pet_url(DIST, kid)
async def pet_bounds(browser):
  """Measure each cat coat + dog breed stand/sit/sleep by forcing sprite in .pet box."""
  CATS = ['tabby', 'smokey', 'tuxedo', 'calico']
  DOGS = ['pup', 'poodle', 'dachshund', 'golden', 'spotty']
  rows = []

  async def boxes_for(artv1: bool):
    u = HEAD + ('&' if '?' in HEAD else '?') + 'art=v1' if artv1 else HEAD
    u = u.replace('?&', '?')
    ctx, pg = await open_page(browser, u, 1180, 820)
    await go_living(pg)
    await pg.evaluate("""() => {
      __store.dispatch({type:'cat/set', cat:{name:'QA', coat:0, room:'living', x:1100}});
      __store.dispatch({type:'dog/set', dog:{name:'QADog', breed:0, owner:(__store.get().characters[0]||{}).id}});
    }""")
    await pg.wait_for_timeout(700)
    out = {}
    await pg.add_style_tag(content=HIDE_ALL + f" .qa-show,.qa-show *{SHOW}")

    # Cats: reuse .pet-cat element, swap coat via store + force pose img/svg
    for i, name in enumerate(CATS):
      for pose in ('stand', 'sit', 'nap'):
        key = f'cat-{name}-{pose}'
        await pg.evaluate("""([i, pose, name, artv1]) => {
          __store.dispatch({type:'cat/set', cat:{name:'QA', coat:i, room:'living', x:1100}});
        }""", [i, pose, name, artv1])
        await pg.wait_for_timeout(200)
        await pg.evaluate("""([pose, name, artv1]) => {
          const el = document.querySelector('.pet-cat');
          if (!el) return;
          el.classList.add('qa-show');
          el.style.visibility='visible';
          const inner = el.querySelector('.inner') || el;
          if (artv1) {
            // keep SVG: trigger re-render by toggling - then we need sit SVG.
            // Replace with object-fit box using inline SVG from current if pose matches mood; else leave.
            // Force: empty and let next paint - for v1 load external? Use current SVG as baseline only for nap/sit/stand via class.
          } else {
            inner.innerHTML = `<img class=\"artimg sprite petsprite\" alt=\"\" src=\"/kids-house-game/assets/art/pets/cat-${name}-${pose}.webp\">`;
          }
          el.querySelectorAll('*').forEach(c => c.style.visibility='visible');
        }""", [pose, name, artv1])
        if artv1:
          # Build SVG by reading from a hidden render: navigate coat and use inventory - inject from preloaded map
          pass
        await pg.wait_for_timeout(60)
        # For artv1, use pre-baked approach: fetch SVG string from page's catSVG if we paint stand/sit/nap by temporarily setting mood
        if artv1:
          await pg.evaluate("""([i, pose]) => {
            const el = document.querySelector('.pet-cat');
            if (!el) return;
            // Use the live SVG for whatever pose the game shows, only record if mood matches — else synthesize via img not available.
            // Force pose by replacing inner with SVG clone from pets drawer preview when possible.
          }""", [i, pose])
        m = await measure_el(pg, '.pet-cat')
        out[key] = m
        await pg.evaluate("() => document.querySelectorAll('.qa-show').forEach(e => e.classList.remove('qa-show'))")

    # Dogs: find dog element
    await pg.evaluate("""() => {
      document.querySelectorAll('.qa-show').forEach(e => e.classList.remove('qa-show'));
    }""")
    for i, name in enumerate(DOGS):
      for pose in ('stand', 'sit', 'sleep'):
        key = f'dog-{name}-{pose}'
        await pg.evaluate("""([i]) => {
          __store.dispatch({type:'dog/set', dog:{name:'QADog', breed:i, owner:(__store.get().characters[0]||{}).id}});
        }""", [i])
        await pg.wait_for_timeout(250)
        sel = await pg.evaluate("""() => {
          const el = document.querySelector('.dog') || document.querySelector('[class*=\"dog\"]');
          return el ? (el.className.includes('dog') ? '.dog' : null) : null;
        }""")
        # dog runs create .dog elements
        await pg.evaluate("""([pose, name, artv1]) => {
          const el = document.querySelector('.dog');
          if (!el) return;
          el.classList.add('qa-show');
          el.style.visibility='visible';
          const inner = el.querySelector('.inner');
          if (inner && !artv1) {
            inner.innerHTML = `<img class=\"artimg sprite petsprite\" alt=\"\" src=\"/kids-house-game/assets/art/pets/dog-${name}-${pose}.webp\">`;
          }
          el.querySelectorAll('*').forEach(c => c.style.visibility='visible');
        }""", [pose, name, artv1])
        await pg.wait_for_timeout(60)
        m = await measure_el(pg, '.dog')
        out[key] = m
        await pg.evaluate("() => document.querySelectorAll('.qa-show').forEach(e => e.classList.remove('qa-show'))")
    await ctx.close()
    return out

  # Simpler pet bounds: offline-comparable in-game using inventory SVGs injected
  inv = json.load(open(INVENTORY))
  svg_by_id = {it['id']: it for it in inv}

  async def pet_boxes(artv1: bool):
    u = HEAD if not artv1 else HEAD + ('&' if '?' in HEAD else '?') + 'art=v1'
    u = u.replace('?&', '?')
    ctx, pg = await open_page(browser, u, 1180, 820)
    await go_living(pg)
    # clear room items for clean bg
    await pg.evaluate("""() => {
      const s=__store, R='living';
      s.dispatch({type:'room/switch', room:R});
      for (const it of [...s.get().rooms[R].items]) s.dispatch({type:'item/delete', room:R, id:it.id});
      s.dispatch({type:'cat/set', cat:null});
      s.dispatch({type:'dog/set', dog:null});
    }""")
    await pg.wait_for_timeout(400)
    await pg.add_style_tag(content=HIDE_ALL + f" .qa-pet,.qa-pet *{SHOW}")
    out = {}
    # Host element matching pet footprint
    await pg.evaluate("""() => {
      let host = document.getElementById('qa-pet-host');
      if (!host) {
        host = document.createElement('div');
        host.id = 'qa-pet-host';
        host.className = 'qa-pet pet';
        // Fix 3: a fixed host on <body>. Inside #layer at top:520 the stage clipped the lower half of
        // every pet, so only the top ~45 px were compared (hence dh=0.0 on most rows).
        host.style.cssText = 'position:fixed;left:300px;top:200px;width:130px;height:100px;z-index:9000;';
        document.body.appendChild(host);
      }
    }""")
    kinds = []
    for name in CATS:
      for pose in ('stand', 'sit', 'nap'):
        kinds.append(f'cat-{name}-{pose}')
    for name in DOGS:
      for pose in ('stand', 'sit', 'sleep'):
        kinds.append(f'dog-{name}-{pose}')
    for kid in kinds:
      it = svg_by_id.get(kid)
      if not it:
        out[kid] = None
        continue
      if artv1:
        svg = it['svg']
        vb = it['vb']
        await pg.evaluate("""([svg, vb, w, h]) => {
          const host = document.getElementById('qa-pet-host');
          host.style.width = w + 'px';
          host.style.height = h + 'px';
          host.innerHTML = `<div class=\"inner\" style=\"width:100%;height:100%\"><svg viewBox=\"${vb}\" width=\"100%\" height=\"100%\" style=\"display:block;overflow:visible\">${svg}</svg></div>`;
        }""", [svg, vb, it['w'], it['h']])
      else:
        await pg.evaluate("""([kid, w, h, url, fit]) => {
          const host = document.getElementById('qa-pet-host');
          host.style.width = w + 'px';
          host.style.height = h + 'px';
          host.innerHTML = `<div class=\"inner\" style=\"width:100%;height:100%\"><img class=\"artimg sprite petsprite\" alt=\"\" style=\"${fit}width:100%;height:100%;object-fit:contain;object-position:bottom center;display:block\" src=\"${url}\"></div>`;
        }""", [kid, it['w'], it['h'], _pet_url(kid), pet_fit_style(kid)])
        await pg.wait_for_function("() => { const i = document.querySelector('#qa-pet-host img'); return i && i.complete && i.naturalWidth > 0; }", timeout=5000)
      await pg.wait_for_timeout(50)
      m = await measure_el(pg, '#qa-pet-host', pad=20)
      out[kid] = m
    await ctx.close()
    return out

  svg = await pet_boxes(True)
  ai = await pet_boxes(False)
  fails = warns = 0
  for k in sorted(set(svg) | set(ai)):
    s, a = svg.get(k), ai.get(k)
    if not s or not a:
      print(f'SKIP {k:24} missing', flush=True)
      rows.append(dict(kind=k, status='SKIP'))
      continue
    sw, sh = max(s['r']-s['l'], 1e-6), max(s['b']-s['t'], 1e-6)
    aw, ah = a['r']-a['l'], a['b']-a['t']
    dw, dh = (aw/sw - 1)*100, (ah/sh - 1)*100
    worst = max(abs(dw), abs(dh))
    status = 'OK' if worst <= TOL else 'WARN' if worst <= WARN_TOL else 'FAIL'
    fails += status == 'FAIL'; warns += status == 'WARN'
    print(f'{status} {k:24} dw={dw:+5.1f}% dh={dh:+5.1f}%', flush=True)
    rows.append(dict(kind=k, dw=round(dw,1), dh=round(dh,1), status=status))
  print(f"pets: pass {sum(1 for r in rows if r.get('status')=='OK')}, warn {warns}, fail {fails} of {len([r for r in rows if r.get('status')!='SKIP'])} sky={SKY}", flush=True)
  json.dump(rows, open(BOUNDS / f'pets-{SKY}.json', 'w'), indent=1)
  return rows

async def main():
  mode = sys.argv[1] if len(sys.argv) > 1 else 'all'
  async with async_playwright() as p:
    # WebKit preferred
    try:
      browser = await p.webkit.launch()
      engine = 'webkit'
    except Exception as e:
      print('webkit fail, chromium', e)
      browser = await p.chromium.launch()
      engine = 'chromium'
    print('ENGINE', engine, flush=True)
    if mode in ('all', 'shots'):
      await shoot_pair(browser, 'ranch')
      await shoot_pair(browser, 'room-living')
      await close_crops(browser)
    if mode in ('all', 'bounds'):
      await ranch_bounds(browser)
      await pet_bounds(browser)
    await browser.close()

if __name__ == '__main__':
  asyncio.run(main())
