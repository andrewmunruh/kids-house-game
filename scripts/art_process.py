# Raster item art post-process (pilot style, 3x).
# usage: python scripts/art_process.py <items.json from dump-art-items.mjs> <rawdir> <group> kind [kind...]
# raw/<kind, ':' as '~'>.jpg  ->  assets/art/<group>/<kind, ':' as '~'>.webp
#
# The raws are painted on a flat pale-cream card. The cutout is a background key:
# cream connected to the card's border is removed (that also removes the painted
# floor shadow; CSS .artshade draws the contact shadow). Anything enclosed by the
# drawing stays solid, so glass, white enamel and pale cushions are never punched
# out. Cream fully enclosed by the drawing (a gap between stems, rungs, strings)
# stays open and is ringed by the plum contour the bounds lint treats as "between
# parts"; a tiny enclosed fleck is filled. Specks are dropped, separate big parts
# are joined with a thin plum bridge. The drawn box is fitted onto the SVG's visible
# art box (shadow ellipse excluded) on a round(3w) x round(3h) canvas, and then the
# shipped living-room contour is laid at final size (plum_contour): a thick, soft
# plum #5b3d5c band CONTOUR_PX deep from every alpha edge, whose outer RAMP pixels
# fade in alpha (measured from the 14 shipped WebPs at 8a12495).
import io, json, os, re, sys
import numpy as np, cairosvg
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLUM = np.array([90, 61, 92], float)
OUTLINE = np.array([91, 61, 92], float)  # #5b3d5c, measured on the shipped living room (8a12495)
CONTOUR_PX = 9      # canvas px (3 CSS px) of solid plum + ramp, from the outer alpha edge inward
RAMP = [27, 70, 132, 194, 234, 251]   # alpha at depth 1..6 px (median of the shipped 14)
GUARD_PX = 6        # px beyond CONTOUR_PX where near-cream paint is shaded below the lint's cream test
BLEND_PX = 2        # px beyond CONTOUR_PX where the plum fades into the paint
KEY = 40      # colour distance from the card counted as background
LIMIT = 58000


BOXES = json.load(open('/tmp/art-boxes.json')) if os.path.exists('/tmp/art-boxes.json') else {}


def svg_box(it):
    if it['kind'] in BOXES:   # same measurement as tests/art_bounds.py
        W, H = round(it['w'] * 3), round(it['h'] * 3)
        fx, fy, fw, fh = BOXES[it['kind']]
        return W, H, (round(fx * W), round(fy * H), round((fx + fw) * W), round((fy + fh) * H))
    def drop(m):
        op = re.search(r'opacity="([\d.]+)"', m.group(0))
        return '' if op and float(op.group(1)) < .5 else m.group(0)
    body = re.sub(r'<ellipse\b[^>]*fill="#000"[^>]*/>', drop, it['svg'])
    W, H = round(it['w'] * 3), round(it['h'] * 3)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{it["vb"]}" width="{W}" height="{H}">{body}</svg>'
    a = np.array(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert('RGBA'))[..., 3]
    ys, xs = np.where(a > 12)
    return W, H, (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)


def key(rgb):
    edge = np.concatenate([rgb[:8].reshape(-1, 3), rgb[-8:].reshape(-1, 3), rgb[:, :8].reshape(-1, 3), rgb[:, -8:].reshape(-1, 3)])
    bg = np.median(edge, 0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(2))
    # Card colour, or the card darkened by a painted floor shadow (same hue).
    lum = rgb.sum(2) / max(bg.sum(), 1)
    cos = (rgb * bg).sum(2) / (np.linalg.norm(rgb, axis=2) * np.linalg.norm(bg) + 1e-6)
    near = (dist < KEY) | ((cos > 0.996) & (lum > 0.70))
    lab, _ = ndi.label(near)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    outside = np.isin(lab, border[border > 0])
    obj = ~outside
    obj = ndi.binary_opening(obj, iterations=1)
    lab, n = ndi.label(obj)
    if n > 1:
        sizes = ndi.sum(obj, lab, range(1, n + 1))
        obj = np.isin(lab, 1 + np.where(sizes >= sizes.max() * 0.03)[0])
        lab, n = ndi.label(obj)
        if n > 1:
            # join each separate part to the main body with a thin outline-colour
            # stroke at the closest point (closing would fill the gaps between)
            sizes = ndi.sum(obj, lab, range(1, n + 1))
            main = lab == 1 + int(np.argmax(sizes))
            rgb = rgb.copy()
            for _ in range(n - 1):
                d, (iy, ix) = ndi.distance_transform_edt(~main, return_indices=True)
                rest = obj & ~main
                if not rest.any():
                    break
                rl, _ = ndi.label(rest)
                ys, xs = np.where(rest)
                j = int(np.argmin(d[ys, xs]))
                y0, x0 = ys[j], xs[j]
                y1, x1 = iy[y0, x0], ix[y0, x0]
                steps = int(max(abs(y1 - y0), abs(x1 - x0))) + 1
                for t in np.linspace(0, 1, steps):
                    yy, xx = int(round(y0 + (y1 - y0) * t)), int(round(x0 + (x1 - x0) * t))
                    obj[max(0, yy - 2):yy + 3, max(0, xx - 2):xx + 3] = True
                    rgb[max(0, yy - 2):yy + 3, max(0, xx - 2):xx + 3] = OUTLINE
                main = main | (rl == rl[y0, x0]) | obj & ~rest & ~main
                lab2, _ = ndi.label(obj)
                main = lab2 == lab2[y1, x1]
    # enclosed cream: openings stay open, flecks are filled
    filled = ndi.binary_fill_holes(obj)
    gaps = filled & near & ~outside
    gl, gn = ndi.label(gaps)
    opening = np.zeros_like(obj)
    if gn:
        sizes = ndi.sum(gaps, gl, range(1, gn + 1))
        md = ndi.median(dist, gl, range(1, gn + 1))
        # only true card colour opens: white enamel or cream petals stay painted
        thick = np.asarray(ndi.maximum(ndi.distance_transform_edt(gaps), gl, range(1, gn + 1)))
        md = np.asarray(md)
        # a real opening is card colour and at least ~12px across at the raw size;
        # thin cream networks (mortar, seams) are painted detail and stay
        big = 1 + np.where((sizes >= 30) & (md < 9) & (thick >= 6))[0]
        speck = 1 + np.where((md < 9) & (thick < 6) & (sizes < 400))[0]
        biggap = np.isin(gl, big)
        fleck = np.isin(gl, speck)
        if fleck.any():
            idx = ndi.distance_transform_edt(fleck, return_distances=False, return_indices=True)
            rgb = rgb.copy(); rgb[fleck] = rgb[idx[0][fleck], idx[1][fleck]]
        opening = biggap
        rim = ndi.binary_dilation(biggap, iterations=2) & ~biggap & (dist < 60)  # anti-aliased cream around the gap
        rgb = rgb.copy(); rgb[rim] = PLUM
    solid = filled & ~opening
    return rgb, solid, opening


def contour(fg, solid, opening, scale):
    w = max(1, round(3 * scale))
    body = solid
    edge = body & ~ndi.binary_erosion(body, iterations=w, border_value=0)
    fg[edge] = fg[edge] * 0.35 + OUTLINE * 0.65
    outer = body & ~ndi.binary_erosion(body, iterations=max(1, (2 * w) // 3), border_value=0)
    fg[outer] = OUTLINE   # never plum-like, so the outline is a closed frame
    if opening.any():
        rw = max(2, round(w * 0.6))
        ring = ndi.binary_dilation(opening, iterations=rw) & body
        band = ndi.binary_dilation(opening, iterations=rw + max(1, w // 3)) & body & ~ring
        fg[band] = fg[band] * 0.3 + OUTLINE * 0.7
        fg[ring] = PLUM
    return fg


def plumlike(fg):
    ch = fg.max(2) - fg.min(2)
    return (np.abs(fg - PLUM).max(2) < 28) & (ch < 45)


def finish(fg, al, ring):
    """At final size: one island, no transparent pocket unless ringed in plum,
    plum only where it rings a real opening, and a closed outer contour."""
    stray = plumlike(fg) & ~ring
    solid = al > 40
    al[~solid] = 0
    lab, n = ndi.label(solid)
    if n > 1:
        sizes = ndi.sum(solid, lab, range(1, n + 1))
        keep = lab == 1 + int(np.argmax(sizes))
        al[solid & ~keep] = 0
        solid = keep
    pockets = ndi.binary_fill_holes(solid) & ~solid
    pl, pn = ndi.label(pockets)
    plum = plumlike(fg)
    near = ndi.distance_transform_edt(~solid, return_distances=False, return_indices=True)
    for i, sl in enumerate(ndi.find_objects(pl), 1):
        sl2 = tuple(slice(max(0, s.start - 1), s.stop + 1) for s in sl)
        m = pl[sl2] == i
        rim = ndi.binary_dilation(m, structure=np.ones((3, 3))) & ~m & solid[sl2]
        ratio = plum[sl2][rim].mean() if rim.any() else 0
        if m.sum() < 60:
            sub = fg[sl2]; sub[m] = fg[near[0][sl2][m], near[1][sl2][m]]
            al[sl2][m] = 255
        elif ratio < 0.95:
            # a real opening: ring it in plum (1px) instead of filling it
            sub = fg[sl2]; sub[rim] = PLUM; al[sl2][rim] = 255
    return plum_contour(fg, al)


def plum_contour(fg, al):
    """Shipped living-room contour: depth d from the nearest transparent pixel
    (outer edge and ringed openings alike). d <= CONTOUR_PX is solid plum, the
    outer len(RAMP) px fade in alpha, and the next BLEND_PX px blend into the paint."""
    solid = al > 0
    d = ndi.distance_transform_edt(np.pad(solid, 1))[1:-1, 1:-1]
    band = solid & (d <= CONTOUR_PX)
    fg[band] = OUTLINE
    for i in range(1, BLEND_PX + 1):
        m = solid & (d > CONTOUR_PX + i - 1) & (d <= CONTOUR_PX + i)
        t = i / (BLEND_PX + 1)
        fg[m] = fg[m] * t + OUTLINE * (1 - t)
    # Cream paint right inside the band would read as a cream fringe to the
    # bounds lint (the plum band is not a barrier there): shade near-cream within
    # GUARD_PX of the edge just below the lint's near-cream brightness.
    near = solid & (d > CONTOUR_PX) & (d <= CONTOUR_PX + GUARD_PX)
    s = fg[..., :3].sum(2)
    pale = near & (s > 615) & ((fg.max(2) - fg.min(2)) < 42)
    fg[pale] = fg[pale] * (615.0 / s[pale])[:, None]
    # Same reach test as the lint: near-cream reachable from outside through
    # transparent or plum pixels is shaded just below the near-cream brightness.
    for _ in range(3):
        mx, mn = fg.max(2), fg.min(2)
        r_, g_, b_ = fg[..., 0], fg[..., 1], fg[..., 2]
        plumm = (np.abs(fg - PLUM).max(2) < 28) & (mx - mn < 45)
        pink = (r_ > g_ + 40) & (r_ > b_ + 15)
        warm = (r_ + 8 >= g_) & (g_ + 6 >= b_)
        s = fg.sum(2)
        palem = solid & ~plumm & (s > 600) & (mx - mn < 50)  # wider than the lint, to survive WebP
        struct = solid & ~plumm & ~palem
        lab, _ = ndi.label(~struct)
        edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
        bad = palem & np.isin(lab, edge[edge > 0])
        if not bad.any():
            break
        fg[bad] = fg[bad] * (590.0 / s[bad])[:, None]
    for i, a in enumerate(RAMP, 1):
        m = solid & (d > i - 1) & (d <= i)
        al[m] = np.minimum(al[m], a)
    return fg, al


def verify(path):
    a = np.array(Image.open(path).convert('RGBA')).astype(float)
    solid = a[..., 3] > 12
    bad = []
    if ndi.label(solid)[1] != 1:
        bad.append('islands')
    pockets = ndi.binary_fill_holes(solid) & ~solid
    pl, pn = ndi.label(pockets)
    plum = plumlike(a[..., :3])
    for i in range(1, pn + 1):
        m = pl == i
        # same weighting as the lint: every hole pixel counts its 8 neighbours
        k = np.ones((3, 3)); mf = m.astype(float)
        touch = ndi.convolve(mf, k, mode='constant') * solid
        ptouch = (touch * plum).sum()
        if touch.sum() == 0 or ptouch / touch.sum() < 0.9 or m.sum() < 60:
            bad.append(m)
    return bad


FADE_OUT = 3        # px: the RAMP depth where alpha crosses 128 (LINT-FIX abc2639)


def build(it, raw, group):
    rgb = np.array(Image.open(raw).convert('RGB')).astype(float)
    rgb, solid, opening = key(rgb)
    ys, xs = np.where(solid)
    y0s, y1s, x0s, x1s = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    W, H, (x0, y0, x1, y1) = svg_box(it)
    # contour fade straddles the SVG edge: alpha>0 reaches FADE_OUT px past it (abc2639)
    x0, y0, x1, y1 = max(0, x0 - FADE_OUT), max(0, y0 - FADE_OUT), min(W, x1 + FADE_OUT), min(H, y1 + FADE_OUT)
    bw, bh = x1 - x0, y1 - y0
    scale = bw / (x1s - x0s)
    stretch = (bw / bh) / ((x1s - x0s) / (y1s - y0s))
    fg = contour(rgb.copy(), solid, opening, 1 / scale)
    ringsrc = (ndi.binary_dilation(opening, iterations=max(2, round(round(3 / scale) * 0.6))) & solid).astype(float) * 255
    crop = lambda a: a[y0s:y1s, x0s:x1s]
    al = solid.astype(float) * 255
    pm = crop(fg * (al[..., None] / 255))
    def rs(ch):
        return np.array(Image.fromarray(ch.astype('float32'), 'F').resize((bw, bh), Image.LANCZOS)).astype(float)
    al2 = np.clip(rs(crop(al)), 0, 255)
    pm2 = np.dstack([rs(pm[..., c]) for c in range(3)])
    fg2 = np.clip(pm2 / np.clip(al2[..., None] / 255, 1e-3, 1), 0, 255)
    al2[al2 < 13] = 0
    al2[al2 > 242] = 255
    ring2 = rs(crop(ringsrc)) > 100
    fg2, al2 = finish(fg2, al2, ring2)
    im = Image.fromarray(np.dstack([fg2, al2]).astype('uint8'), 'RGBA')
    c = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    c.paste(im, (x0, y0))   # no mask: a masked paste squares alpha and darkens the edge
    name = it['kind'].replace(':', '~')
    out = os.path.join(ROOT, 'assets', 'art', group, name + '.webp')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    for attempt in range(4):
        for q in (86, 80, 72, 64, 56, 48, 40, 32):
            c.save(out, 'WEBP', quality=q, method=6, alpha_quality=100, exact=False)
            if os.path.getsize(out) < LIMIT:
                break
        bad = verify(out)
        if not bad:
            break
        arr = np.array(c)
        for m in bad:
            if isinstance(m, str):
                sol = arr[..., 3] > 12
                lab, n = ndi.label(sol)
                sizes = ndi.sum(sol, lab, range(1, n + 1))
                arr[..., 3][sol & (lab != 1 + int(np.argmax(sizes)))] = 0
            elif m.sum() >= 60:
                rim = ndi.binary_dilation(m, structure=np.ones((3, 3))) & ~m
                arr[rim, :3] = PLUM.astype('uint8'); arr[rim, 3] = 255
            else:
                grow = ndi.binary_dilation(m, iterations=1)
                arr[grow, 3] = 255
                near = ndi.distance_transform_edt(arr[..., 3] < 200, return_distances=False, return_indices=True)
                arr[grow, :3] = arr[near[0][grow], near[1][grow], :3]
        c = Image.fromarray(arr)
    return out, os.path.getsize(out), stretch


if __name__ == '__main__':
    items = {i['kind']: i for i in json.load(open(sys.argv[1]))}
    rawdir, group = sys.argv[2], sys.argv[3]
    for k in sys.argv[4:]:
        raw = os.path.join(rawdir, k.replace(':', '~') + '.jpg')
        out, size, st = build(items[k], raw, group)
        flag = ' STRETCH' if abs(st - 1) > 0.18 else ''
        print(f'{k} {size}B stretch {st:.2f}{flag}', flush=True)
