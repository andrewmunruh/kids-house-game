"""Hairline seams at scene-tile joins (tiles=1).

For ranch and park, each strip join is scrolled on screen. A 1-px column at or
next to the join is a seam if its colour differs from *both* neighbouring
columns by more than the painting's local adjacent-column variance, measured
on nearby non-join columns. A CSS gap > 0.5px at the join is also a seam.

usage:
  scene_seam_test.py URL [WxH=820x1180] [--dpr 2] [--browser chromium]
                     [--scenes ranch,park] [--shots DIR] [--negative]
"""
import argparse, asyncio, io, json, os, sys
from pathlib import Path
from PIL import Image, ImageDraw

from playwright.async_api import async_playwright

INIT = "localStorage.setItem('cozy-whatsnew','999'); localStorage.setItem('avatar-intro','1');"
HIDE = ("#layer .item, #layer .char, .kid, .avatar, .toast, #ranchWorld .animal, "
        ".pspot *, .ambFx, .rprop, .horse, .plot, .savatars, .pet-dog "
        "{ visibility: hidden !important; } "
        "*, *::before, *::after { animation: none !important; transition: none !important; }")

# 2x painting coords of each join (strip i | strip i+1).
JOINS = {
    'ranch': {'scroll': 'ranchScroll', 'world': 'ranchWorld', 'logical_w': 3600, 'art_w': 7200,
              'art_joins': [1200, 2400, 3600, 4800, 6000]},
    'park':  {'scroll': 'parkScroll',  'world': 'parkWorld',  'logical_w': 2900, 'art_w': 5800,
              'art_joins': [1200, 2400, 3600, 4800]},
}

def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument('url')
    p.add_argument('size', nargs='?', default='820x1180')
    p.add_argument('--dpr', type=int, default=2)
    p.add_argument('--browser', default='chromium', choices=('chromium', 'webkit'))
    p.add_argument('--scenes', default='ranch,park')
    p.add_argument('--shots', default='')
    p.add_argument('--negative', action='store_true',
                   help='Force a 2px gap at the first ranch join and expect a seam (control).')
    p.add_argument('--json-out', default='')
    return p.parse_args()

def ok(rows, name, passed, extra=''):
    rows.append({'name': name, 'ok': bool(passed), 'extra': extra})
    print(('PASS ' if passed else 'FAIL ') + name + (f'  [{extra}]' if extra != '' else ''), flush=True)

async def dismiss(pg):
    await pg.wait_for_function("() => !!document.getElementById('stage')")
    await pg.wait_for_timeout(1200)
    await pg.evaluate("() => { for (const s of ['#phoneOk', '#wnGo']) { const e = document.querySelector(s); if (e && e.offsetParent) e.click(); } }")

async def open_scene(pg, place):
    await pg.evaluate("() => { if (!document.body.classList.contains('view-map')) document.getElementById('btnMap').click(); }")
    await pg.wait_for_function("() => !!document.querySelector('body.view-map #mapWorld .mapSpot')")
    await pg.wait_for_timeout(300)
    await pg.evaluate("(p) => document.querySelector('[data-go=' + JSON.stringify(p) + ']').click()", place)
    host = '#ranchWorld' if place == 'ranch' else '#parkWorld'
    await pg.wait_for_function("(h) => { const e = document.querySelector(h); return e && e.getBoundingClientRect().width > 2; }", arg=host)
    await pg.wait_for_timeout(500)
    try:
        await pg.wait_for_function("() => !!document.querySelector('.sceneArtOn')", timeout=12000)
    except Exception:
        pass
    await pg.wait_for_timeout(400)
    await pg.add_style_tag(content=HIDE)
    return host

async def scroll_join_on_screen(pg, place, art_x, art_w):
    """Center the join (art_x in 2x painting px) in the street scroller."""
    info = JOINS[place]
    return await pg.evaluate(
        """({scroll, world, artX, artW}) => {
          const s = document.getElementById(scroll), w = document.getElementById(world);
          if (!s || !w) return null;
          const wr = w.getBoundingClientRect();
          const joinCss = wr.left + (artX / artW) * wr.width;
          s.scrollLeft += joinCss - (s.getBoundingClientRect().left + s.clientWidth / 2);
          return true;
        }""",
        {'scroll': info['scroll'], 'world': info['world'], 'artX': art_x, 'artW': art_w},
    )

def join_tile_indices(art_x):
    """Strip i meets strip i+1 at art_x (strips are 1200px in the 2x painting)."""
    right = int(round(art_x / 1200.0))
    return right - 1, right


async def wait_join_tiles(pg, art_x, art_w, world, timeout=15000):
    """Both tiles that meet at art_x must be decoded and visible.

    Match by data-tile, not getBoundingClientRect: a still-loading strip is
    `hidden` (display:none) so its rect is 0 and a mid-point test misses it.
    """
    left_i, right_i = join_tile_indices(art_x)
    try:
        await pg.wait_for_function(
            """({world, leftI, rightI}) => {
              const root = document.querySelector(world);
              if (!root) return false;
              const L = root.querySelector('img.sceneTile[data-tile="'+leftI+'"]');
              const R = root.querySelector('img.sceneTile[data-tile="'+rightI+'"]');
              if (!L || !R) return false;
              const lr = L.getBoundingClientRect(), rr = R.getBoundingClientRect();
              return L.dataset.state === 'ok' && R.dataset.state === 'ok'
                && !L.hidden && !R.hidden && lr.width > 2 && rr.width > 2;
            }""",
            arg={'world': world, 'leftI': left_i, 'rightI': right_i},
            timeout=timeout,
        )
        await pg.wait_for_timeout(200)
        return True
    except Exception:
        return False

async def join_metrics(pg, art_x, art_w, world):
    return await pg.evaluate(
        """({artX, artW, world}) => {
          const el = document.querySelector(world);
          if (!el) return null;
          const wr = el.getBoundingClientRect();
          const vw = window.innerWidth, vh = window.innerHeight;
          const joinCss = wr.left + (artX / artW) * wr.width;
          const leftI = Math.round(artX / 1200) - 1, rightI = leftI + 1;
          const box = (node) => {
            if (!node) return null;
            const r = node.getBoundingClientRect();
            return { left: r.left, right: r.right, top: r.top, bottom: r.bottom,
                     state: node.dataset.state || '', hidden: !!node.hidden, tile: node.dataset.tile };
          };
          const imgs = [...el.querySelectorAll('img.sceneTile')].map(box).sort((a, b) => a.left - b.left);
          let L = box(el.querySelector('img.sceneTile[data-tile="'+leftI+'"]'));
          let R = box(el.querySelector('img.sceneTile[data-tile="'+rightI+'"]'));
          // Fall back to rect matching if a strip has no data-tile (shouldn't happen).
          if (!L || !R) {
            const lefts = imgs.filter(t => Math.abs(t.right - joinCss) < 8 || (t.left < joinCss && t.right >= joinCss - 8));
            const rights = imgs.filter(t => Math.abs(t.left - joinCss) < 8 || (t.left <= joinCss + 8 && t.right > joinCss));
            L = L || lefts.sort((a,b) => Math.abs(a.right - joinCss) - Math.abs(b.right - joinCss))[0];
            R = R || rights.sort((a,b) => Math.abs(a.left - joinCss) - Math.abs(b.left - joinCss))[0];
          }
          const gap = (L && R) ? (R.left - L.right) : null;
          const y0 = Math.max(0, wr.top, L ? L.top : wr.top, R ? R.top : wr.top);
          const y1 = Math.min(vh, wr.bottom, L ? L.bottom : wr.bottom, R ? R.bottom : wr.bottom);
          return { joinCss, gap, y0, y1, vw, vh, wr: {left: wr.left, right: wr.right, top: wr.top, bottom: wr.bottom},
                   L, R, nTiles: imgs.length };
        }""",
        {'artX': art_x, 'artW': art_w, 'world': world},
    )

def col_diff(pix, w, h, c0, c1, y0, y1):
    """Mean max-channel abs diff between columns c0 and c1 over y in [y0, y1)."""
    if c0 < 0 or c1 < 0 or c0 >= w or c1 >= w or y1 <= y0:
        return 0.0
    acc = 0.0
    n = 0
    for y in range(y0, y1):
        a, b = pix[c0, y], pix[c1, y]
        acc += max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2]))
        n += 1
    return acc / n if n else 0.0

def local_threshold(pix, w, h, join_x, y0, y1, other_joins):
    """Adjacent-column diffs on non-join columns in a window around the join."""
    samples = []
    lo = max(1, int(join_x - 48))
    hi = min(w - 1, int(join_x + 48))
    forbidden = []
    for j in [join_x, *other_joins]:
        forbidden.append((j - 3, j + 3))
    def near_join(c):
        return any(a <= c <= b for a, b in forbidden)
    for c in range(lo, hi):
        if near_join(c) or near_join(c - 1):
            continue
        samples.append(col_diff(pix, w, h, c - 1, c, y0, y1))
    if len(samples) < 4:
        # Widen the window if the viewport is tight around the join.
        for c in range(max(1, int(join_x - 120)), min(w - 1, int(join_x + 120))):
            if near_join(c) or near_join(c - 1):
                continue
            samples.append(col_diff(pix, w, h, c - 1, c, y0, y1))
    if not samples:
        return 24.0, []
    samples.sort()
    mean = sum(samples) / len(samples)
    var = sum((s - mean) ** 2 for s in samples) / len(samples)
    std = var ** 0.5
    p90 = samples[int(0.90 * (len(samples) - 1))]
    # Floor 16: ignore tiny AA. Scale with this painting's own local contrast.
    T = max(16.0, p90 * 2.0, mean + 4.0 * std)
    return T, samples

def side_mean_diff(pix, w, h, c, y0, y1, span=8, gap=3):
    """Max-channel |mean(left cols) - mean(right cols)|, away from column c.

    Large values mean the painting itself changes at this x (a vertical edge in
    the art). Small values mean the painting is continuous across c (sky, flat
    grass) — those are the bands where a hairline seam would show.
    """
    accL = [0, 0, 0]
    accR = [0, 0, 0]
    nL = nR = 0
    for x in range(c - gap - span, c - gap):
        if 0 <= x < w:
            for y in range(y0, y1):
                p = pix[x, y]
                accL[0] += p[0]; accL[1] += p[1]; accL[2] += p[2]
                nL += 1
    for x in range(c + gap + 1, c + gap + 1 + span):
        if 0 <= x < w:
            for y in range(y0, y1):
                p = pix[x, y]
                accR[0] += p[0]; accR[1] += p[1]; accR[2] += p[2]
                nR += 1
    if not nL or not nR:
        return 0.0
    return max(abs(accL[i] / nL - accR[i] / nR) for i in range(3))


def colour_seams(im, join_css, y0_css, y1_css, dpr, other_css, gap_css):
    """Return (flagged, report, score) for 1-px columns at/next to the join.

    A hairline is a thin column different from *both* neighbours in bands where
    the painting is continuous (left side ≈ right side). A painted vertical
    edge that happens to sit on the join (the ranch barn outline at art x=1200)
    is not a seam: left and right already differ, so those bands are skipped.
    """
    # `dpr` is the measured screenshot-px / CSS-px ratio (webkit can differ from the requested DPR).
    sx = dpr
    jx = join_css * sx
    y0 = max(0, int(round(y0_css * sx)))
    y1 = min(im.height, int(round(y1_css * sx)))
    if y1 - y0 < 8:
        return False, {'reason': 'too little painted height', 'y0': y0, 'y1': y1}, 0.0
    pix = im.load()
    w, h = im.size
    other = [o * sx for o in other_css]
    T_all, samples = local_threshold(pix, w, h, jx, y0, y1, other)
    # Columns at the join and the 1-px neighbours (floor/ceil and ±1).
    candidates = sorted(set([
        int(jx), int(round(jx)), int(jx) - 1, int(jx) + 1,
        int(round(jx)) - 1, int(round(jx)) + 1,
    ]))
    band = max(16, min(32, (y1 - y0) // 8))
    flagged = []
    worst = 0.0
    band_notes = []
    for c in candidates:
        if c < 1 or c >= w - 1:
            continue
        n_cont = 0
        n_hit = 0
        hit_detail = []
        y = y0
        while y < y1:
            yb = min(y + band, y1)
            if yb - y < 8:
                break
            T, _ = local_threshold(pix, w, h, jx, y, yb, other)
            side = side_mean_diff(pix, w, h, c, y, yb)
            # Painted content already changes across this x — not a hairline.
            if side > max(T, 24.0):
                y = yb
                continue
            n_cont += 1
            dL = col_diff(pix, w, h, c, c - 1, y, yb)
            dR = col_diff(pix, w, h, c, c + 1, y, yb)
            if dL > T and dR > T:
                n_hit += 1
                hit_detail.append({'y': y, 'dL': round(dL, 2), 'dR': round(dR, 2), 'T': round(T, 2), 'side': round(side, 2)})
                worst = max(worst, min(dL, dR))
            y = yb
        need = 2 if n_cont >= 2 else n_cont  # require 2+ continuous bands, or all if fewer
        frac = 0.25
        is_seam = n_cont >= 2 and n_hit >= max(need, int(frac * n_cont + 0.999))
        band_notes.append({'col': c, 'continuous': n_cont, 'hit': n_hit, 'hits': hit_detail[:4]})
        if is_seam:
            flagged.append({
                'col': c, 'continuous': n_cont, 'hit': n_hit,
                'bands': hit_detail[:6],
            })
    geom = (gap_css is not None and gap_css > 0.5)
    if geom:
        flagged.append({'col': 'gap', 'gap_css': round(gap_css, 3)})
        worst = max(worst, 100.0)
    report = {
        'join_css': round(join_css, 3), 'join_px': round(jx, 2),
        'gap_css': None if gap_css is None else round(gap_css, 3),
        'T': round(T_all, 2), 'local_n': len(samples),
        'local_mean': round(sum(samples) / len(samples), 2) if samples else None,
        'flagged': flagged, 'bands': band_notes, 'y0': y0, 'y1': y1, 'scale': sx,
    }
    return bool(flagged), report, worst

def crop_join(im, join_css, y0_css, y1_css, scale, path, label, zoom=4):
    sx = scale
    jx = join_css * sx
    y0 = max(0, int(round(y0_css * sx)))
    y1 = min(im.height, int(round(y1_css * sx)))
    pad = int(48 * sx)
    x0 = max(0, int(jx) - pad)
    x1 = min(im.width, int(jx) + pad)
    crop = im.crop((x0, y0, x1, y1))
    if zoom != 1:
        crop = crop.resize((crop.width * zoom, crop.height * zoom), Image.Resampling.NEAREST)
    draw = ImageDraw.Draw(crop)
    line = int((jx - x0) * zoom)
    # red 1-px (in source) marker through the join, 1 zoom-column wide
    if 0 <= line < crop.width:
        draw.line([(line, 0), (line, crop.height - 1)], fill=(255, 0, 0), width=max(1, zoom // 2))
    draw.text((4, 4), label, fill=(255, 0, 0))
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    crop.save(path)
    return path

async def force_gap(pg, art_x, art_w, px=2):
    """Shift the right-hand strip at this join by +px CSS pixels (a visible gap)."""
    return await pg.evaluate(
        """({artX, artW, px}) => {
          const world = document.querySelector('#ranchWorld') || document.querySelector('#parkWorld');
          const wr = world.getBoundingClientRect();
          const joinCss = wr.left + (artX / artW) * wr.width;
          const imgs = [...document.querySelectorAll('img.sceneTile')];
          let right = null, best = 1e9;
          for (const el of imgs) {
            const r = el.getBoundingClientRect();
            const d = Math.abs(r.left - joinCss);
            if (d < best) { best = d; right = el; }
          }
          if (!right) return false;
          const left = right.style.left || '0%';
          right.style.left = 'calc(' + left + ' + ' + px + 'px)';
          return true;
        }""",
        {'artX': art_x, 'artW': art_w, 'px': px},
    )

async def run_place(pg, place, args, rows, crops, scale_holder):
    info = JOINS[place]
    await open_scene(pg, place)
    worst = {'score': -1, 'im': None, 'meta': None, 'place': place, 'art_x': None}
    other_art = info['art_joins']
    for art_x in other_art:
        await scroll_join_on_screen(pg, place, art_x, info['art_w'])
        # wantTiles polls every 200ms; give it a beat after the camera moves.
        await pg.wait_for_timeout(300)
        ready = await wait_join_tiles(pg, art_x, info['art_w'], '#'+info['world'])
        if not ready:
            # Nudge the scroller so the tile watcher re-evaluates, then re-center.
            await pg.evaluate(
                """(id) => { const s = document.getElementById(id); if (s) { s.scrollLeft += 2; s.scrollLeft -= 2; } }""",
                info['scroll'],
            )
            await scroll_join_on_screen(pg, place, art_x, info['art_w'])
            await pg.wait_for_timeout(300)
            ready = await wait_join_tiles(pg, art_x, info['art_w'], '#'+info['world'])
        met = await join_metrics(pg, art_x, info['art_w'], '#'+info['world'])
        png = await pg.screenshot(type='png')
        im = Image.open(io.BytesIO(png)).convert('RGB')
        if not scale_holder['sx']:
            # screenshot px per CSS px
            scale_holder['sx'] = im.width / met['vw'] if met and met['vw'] else args.dpr
        sx = scale_holder['sx']
        name = f"{place} join art={art_x} @ {args.size} dpr={args.dpr} {args.browser}"
        if not ready or not met or not met.get('L') or not met.get('R'):
            ok(rows, name, False, json.dumps({'error': 'tiles not ready', 'met': met}))
            continue
        other_css = [met['wr']['left'] + (a / info['art_w']) * (met['wr']['right'] - met['wr']['left'])
                     for a in other_art if a != art_x]
        flagged, report, score = colour_seams(
            im, met['joinCss'], met['y0'], met['y1'], sx, other_css, met['gap'])
        extra = json.dumps(report, sort_keys=True)
        # --negative is handled by the caller (only the first join, after force_gap)
        ok(rows, name, not flagged, extra)
        if score > worst['score'] or (score == worst['score'] and worst['im'] is None):
            worst = {'score': score, 'im': im.copy(), 'meta': {**report, 'y0_css': met['y0'], 'y1_css': met['y1'],
                     'join_css': met['joinCss']}, 'place': place, 'art_x': art_x, 'sx': sx}
        if flagged and args.shots:
            p = Path(args.shots) / f"SEAM_{place}_{art_x}_{args.browser}_{args.size}_dpr{args.dpr}.png"
            crop_join(im, met['joinCss'], met['y0'], met['y1'], sx, str(p),
                      f"{place} {art_x} {args.browser} {args.size} dpr{args.dpr}")
            crops.append(str(p))
    return worst

async def main():
    args = parse_args()
    W, H = map(int, args.size.lower().split('x'))
    sep = '&' if '?' in args.url else '?'
    url = args.url + sep + 'tiles=1'
    rows = []
    crops = []
    worsts = []
    scale_holder = {'sx': 0}
    shots = Path(args.shots) if args.shots else None
    if shots:
        shots.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await getattr(p, args.browser).launch()
        ctx = await browser.new_context(
            viewport={'width': W, 'height': H},
            device_scale_factor=args.dpr,
            timezone_id='UTC',
        )
        await ctx.add_init_script(INIT)
        pg = await ctx.new_page()
        await pg.clock.set_fixed_time('2026-06-15T12:00:00Z')
        await pg.goto(url)
        await dismiss(pg)

        if args.negative:
            # One forced 2px gap at the first ranch join must be detected.
            await open_scene(pg, 'ranch')
            art_x, art_w = JOINS['ranch']['art_joins'][0], JOINS['ranch']['art_w']
            await scroll_join_on_screen(pg, 'ranch', art_x, art_w)
            ready = await wait_join_tiles(pg, art_x, art_w, '#ranchWorld')
            shifted = await force_gap(pg, art_x, art_w, 2)
            await pg.wait_for_timeout(200)
            met = await join_metrics(pg, art_x, art_w, '#ranchWorld')
            png = await pg.screenshot(type='png')
            im = Image.open(io.BytesIO(png)).convert('RGB')
            sx = im.width / met['vw'] if met and met['vw'] else args.dpr
            flagged, report, score = (False, {}, 0)
            if met and met.get('L') and met.get('R'):
                flagged, report, score = colour_seams(
                    im, met['joinCss'], met['y0'], met['y1'], sx, [], met['gap'])
            extra = json.dumps({'ready': ready, 'shifted': shifted, **(report or {})}, sort_keys=True)
            ok(rows, f'NEGATIVE CONTROL detects a forced 2px gap ({args.browser} {args.size} dpr={args.dpr})',
               bool(flagged), extra)
            if shots:
                pth = shots / f"NEG_ranch_{art_x}_{args.browser}_{args.size}_dpr{args.dpr}.png"
                if met:
                    crop_join(im, met['joinCss'], met['y0'], met['y1'], sx, str(pth),
                              f"NEG gap {args.browser} {args.size} dpr{args.dpr}")
                    crops.append(str(pth))
            await ctx.close()
            await browser.close()
        else:
            for place in [s.strip() for s in args.scenes.split(',') if s.strip()]:
                # Re-enter from the map each time so tile state is clean.
                if place != [s.strip() for s in args.scenes.split(',') if s.strip()][0]:
                    await pg.evaluate("() => { const b = document.getElementById('btnMap'); if (b) b.click(); }")
                    await pg.wait_for_timeout(300)
                w = await run_place(pg, place, args, rows, crops, scale_holder)
                if w and w['im'] is not None:
                    worsts.append(w)
            await ctx.close()
            await browser.close()

    failed = sum(1 for r in rows if not r['ok'])
    print(f'SEAM: {len(rows) - failed}/{len(rows)} pass  {args.browser} {args.size} dpr={args.dpr}', flush=True)
    out = {
        'browser': args.browser, 'size': args.size, 'dpr': args.dpr,
        'pass': len(rows) - failed, 'fail': failed, 'rows': rows,
        'crops': crops,
        'worsts': [{'place': w['place'], 'art_x': w['art_x'], 'score': w['score'],
                    'meta': w['meta']} for w in worsts],
    }
    if args.json_out:
        Path(args.json_out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.json_out).write_text(json.dumps(out, indent=2))
    # Save the worst crop for this invocation (even if it passed) for later picking.
    if shots and not args.negative:
        for w in worsts:
            if w['im'] is None:
                continue
            pth = shots / f"join_{w['place']}_{w['art_x']}_{args.browser}_{args.size}_dpr{args.dpr}.png"
            crop_join(w['im'], w['meta']['join_css'], w['meta']['y0_css'], w['meta']['y1_css'],
                      w['sx'], str(pth),
                      f"{w['place']} {w['art_x']} {args.browser} {args.size} dpr{args.dpr} score={w['score']:.2f}")
            crops.append(str(pth))
    sys.exit(1 if failed else 0)

asyncio.run(main())
