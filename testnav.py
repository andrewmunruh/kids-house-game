# Shared helpers for the Playwright tests: map navigation + the localStorage prefix of the build under test.
# PFX="preview:" for the preview build (its keys are prefixed so it never touches the real save); "" for production.
import os
PFX = os.environ.get('PFX', '')
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
    sel = {'park': 'body.view-park #parkWorld .parkScene', 'ranch': 'body.view-ranch #ranchWorld .ranchScene'}.get(place, 'body:not(.view-street) #stage')
    await pg.wait_for_selector(sel, timeout=8000); await pg.wait_for_timeout(500)
