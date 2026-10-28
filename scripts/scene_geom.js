(scene) => {
  if (scene === 'ranch' || scene === 'barn') {
    // Rainbow Ranch yard / barn: logical = the scene SVG viewBox (RW x 600), rects from the live DOM.
    const world = document.getElementById('ranchWorld'), svg = world.querySelector(':scope > svg.ranchScene');
    const [, , LW, LH] = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const r0 = world.getBoundingClientRect(), sx = LW / r0.width, sy = LH / r0.height;
    const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
    const spots = [...world.querySelectorAll('[data-r], .plot, .horse, .animal, .bucket')].map(e => ({ name: (e.dataset.r ? 'r:' + e.dataset.r : e.className.split(' ')[0] + ':' + (e.dataset.plot ?? e.dataset.horse ?? e.dataset.animal ?? e.dataset.feed + (e.style.left || ''))), box: box(e) }));
    const fence = world.querySelector(':scope > svg.fenceLayer');
    const g = { scene, logical: [LW, LH], spots, fence: fence ? box(fence) : null };
    if (scene === 'ranch') Object.assign(g, { floorLine: 410, door: [365, 330, 140, 140], doorTap: box(world.querySelector('.barnDoor')), fenceRails: [2400, 3080, 424, 459] });
    else Object.assign(g, { floorLine: 440, door: [24, 200, 206, 244], doorTap: box(world.querySelector('.barnExit')) });
    return g;
  }
  const world = document.getElementById('world');
  const r0 = world.getBoundingClientRect();
  const sx = 2400 / r0.width, sy = 600 / r0.height;
  const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round((r.left - r0.left) * sx * 10) / 10, Math.round((r.top - r0.top) * sy * 10) / 10, Math.round(r.width * sx * 10) / 10, Math.round(r.height * sy * 10) / 10]; };
  const door = document.querySelector('#layer .yardDoor');
  return {
    scene, logical: [2400, 600],
    wall: box(document.getElementById('wall')), floor: box(document.getElementById('floor')),
    baseboard: box(document.querySelector('#world .baseboard')),
    door: door ? box(door.querySelector('.doorArt') || door) : null,
    doorTap: door ? box(door) : null,
    sceneWin: box(document.querySelector('#scenery .sceneWin')),
    eggs: [...document.querySelectorAll('#world .eggspot')].filter(e => e.offsetParent).map(e => ({ name: e.dataset.egg, box: box(e) })),
  };
}
