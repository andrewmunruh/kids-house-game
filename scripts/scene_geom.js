(scene) => {
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
