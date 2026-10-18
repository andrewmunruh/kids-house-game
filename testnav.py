# Shared helpers for the Playwright tests: map navigation + the localStorage prefix of the build under test.
# PFX="preview:" for the preview build (its keys are prefixed so it never touches the real save); "" for production.
import io, os
from PIL import Image
PFX = os.environ.get('PFX', '')
def local_page():
    """Default game URL. HOOD=http://localhost:8788 points the suite at `npm run worker:dev` (node server is :8787)."""
    hood = os.environ.get('HOOD', 'http://localhost:8787').rstrip('/')
    return f'http://localhost:4173/kids-house-game/?hood={hood}'
SKIP_WN = f"localStorage.getItem('{PFX}cozy-whatsnew') || localStorage.setItem('{PFX}cozy-whatsnew', '999')"  # skip the What's new popup
def K(k): return PFX + k
async def to_map(pg):
    if not await pg.evaluate("document.body.classList.contains('view-map')"):
        await pg.click('#btnMap')
    await pg.wait_for_selector('body.view-map #mapWorld .mapSpot', timeout=8000); await pg.wait_for_timeout(450)
async def go(pg, place):
    """place: 'park' | 'ranch' | 'home' | 'house:<id>' (tap it on the map) or 'barn' (ranch, then the barn door)."""
    if place == 'barn':
        await go(pg, 'ranch'); await pg.click('.barnDoor'); await pg.wait_for_selector('body.in-barn #ranchWorld .barnScene'); await pg.wait_for_timeout(500); return
    await to_map(pg); await pg.click(f'[data-go="{place}"]')
    sel = {'park': 'body.view-park #parkWorld .parkScene', 'ranch': 'body.view-ranch #ranchWorld .ranchScene', 'gameroom': 'body.view-gameroom #grWorld .grScene'}.get(place, 'body:not(.view-street) #stage')
    await pg.wait_for_selector(sel, timeout=8000); await pg.wait_for_timeout(500)

# A pink 3, same paints as the Slay card face, so dim-card contrast is measured on the real number.
SLAY_PINK_3 = '''<svg viewBox="0 0 70 100"><rect x="2" y="2" width="66" height="96" rx="13" fill="#ff7eb3" stroke="#5a3d5c" stroke-width="3"/><rect x="6" y="6" width="58" height="88" rx="10" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><ellipse cx="24" cy="20" rx="16" ry="8" fill="#fff" opacity=".38"/><text x="8" y="16" font-size="13" font-weight="900" fill="#9d174d" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text><text x="62" y="94" font-size="13" font-weight="900" text-anchor="end" fill="#9d174d" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text><text x="35" y="68" text-anchor="middle" font-size="48" font-weight="900" fill="#9d174d" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="Nunito, ui-rounded, system-ui, sans-serif">3</text></svg>'''

def about_slay_card(box, tol=4):
    """iPad hand cards are about 90×130 CSS pixels."""
    return bool(box) and abs(box['width'] - 90) <= tol and abs(box['height'] - 130) <= tol

def _lin(c):
    x = c / 255.0
    return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4

def contrast_ratio(a, b):
    def L(rgb):
        r, g, b = rgb
        return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)
    hi, lo = max(L(a), L(b)), min(L(a), L(b))
    return (hi + 0.05) / (lo + 0.05)

def dim_card_contrast(png):
    """Contrast of the numeral ink against the card face, from a rendered dim card."""
    im = Image.open(io.BytesIO(png)).convert('RGB')
    w, h = im.size
    pix = im.load()
    samples = []
    x0, x1 = int(w * 0.22), max(int(w * 0.22) + 1, int(w * 0.78))
    y0, y1 = int(h * 0.32), max(int(h * 0.32) + 1, int(h * 0.76))
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = pix[x, y]
            samples.append((0.2126 * r + 0.7152 * g + 0.0722 * b, (r, g, b)))
    samples.sort(key=lambda t: t[0])
    n = len(samples)
    ink_ps = [p for _, p in samples[:max(1, n // 14)]]
    face_ps = [p for _, p in samples[int(n * 0.42):int(n * 0.72)]]
    def avg(ps):
        k = max(1, len(ps))
        return tuple(sum(p[i] for p in ps) // k for i in range(3))
    ink, face = avg(ink_ps), avg(face_ps)
    return contrast_ratio(ink, face), ink, face

# The street note must stay off the seat row (the table).
NOTE_VS_TABLE_JS = """() => {
  const note = document.getElementById('needFriend');
  const lobby = document.querySelector('.lobby');
  if (!note || !lobby) return { missing: true };
  const a = note.getBoundingClientRect();
  const hit = (r) => a.left < r.right - 0.5 && a.right > r.left + 0.5 && a.top < r.bottom - 0.5 && a.bottom > r.top + 0.5;
  const seats = [...document.querySelectorAll('.lobbySeat')].map(el => el.getBoundingClientRect());
  const lb = lobby.getBoundingClientRect();
  return { overlap: hit(lb) || seats.some(hit), gap: a.top - lb.bottom };
}"""
