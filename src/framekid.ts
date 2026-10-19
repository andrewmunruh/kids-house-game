// Keep a kid (and the name tag measured with them) inside the stage.
// Pan the camera by the overflow. When the camera is already at the end of the
// room, the leftover is how far the kid herself still has to step inward.

export function resolveFrame(o: {
  cam: number;
  maxCam: number;
  kidX: number;
  overflowL: number;
  overflowR: number;
  scale: number;
  nudgeX: boolean;
}): { cam: number; kidX: number } {
  const scale = o.scale || 1;
  let screen = 0;
  if (o.overflowR > 1 && o.overflowL > 1) screen = -o.overflowL;
  else if (o.overflowR > 1) screen = o.overflowR;
  else if (o.overflowL > 1) screen = -o.overflowL;
  const want = o.cam + screen / scale;
  const cam = Math.max(0, Math.min(o.maxCam, want));
  const unapplied = want - cam;
  const kidX = o.nudgeX && Math.abs(unapplied) > 0.5 ? o.kidX - unapplied : o.kidX;
  return { cam, kidX };
}
