// When kids stand close, their name tags stack into a few lanes.
// Past that, the extras shrink to initials so the pile stays readable.

/** x: center. y/h (optional): bottom edge in lane 0 and the lane step, so tags at different heights don't stack into each other. */
export type TagBox = { id: string; x: number; w: number; y?: number; h?: number };
export type TagLane = { id: string; lane: number; initials: boolean };

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function assignLanes(items: TagBox[], maxLanes = 3): TagLane[] {
  const sorted = [...items].sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
  const placed: { x: number; w: number; lane: number; y?: number; h?: number }[] = [];
  const out: TagLane[] = [];
  const same = (p: { lane: number; y?: number; h?: number }, lane: number, y?: number, h?: number) => {
    if (y === undefined || h === undefined || p.y === undefined || p.h === undefined) return p.lane === lane;
    return Math.abs((y - lane * h) - (p.y - p.lane * p.h)) < (h + p.h) / 2;
  };
  const hits = (x: number, w: number, lane: number, y?: number, h?: number) =>
    placed.some(p => same(p, lane, y, h) && Math.abs(p.x - x) < (p.w + w) / 2 + 8);
  const pending: TagBox[] = [];
  for (const it of sorted) {
    let lane = -1;
    for (let L = 0; L < maxLanes; L++) if (!hits(it.x, it.w, L, it.y, it.h)) { lane = L; break; }
    if (lane < 0) pending.push(it);
    else { placed.push({ x: it.x, w: it.w, lane, y: it.y, h: it.h }); out.push({ id: it.id, lane, initials: false }); }
  }
  for (const it of pending) {
    const w = Math.min(it.w, 44);
    let lane = 0;
    for (let L = 0; L < maxLanes; L++) if (!hits(it.x, w, L, it.y, it.h)) { lane = L; break; }
    placed.push({ x: it.x, w, lane, y: it.y, h: it.h });
    out.push({ id: it.id, lane, initials: true });
  }
  return out;
}

let tagSeq = 0;

/** Measure on-screen name tags and park overlapping ones in lanes (or initials). */
export function layoutNameTags(root: ParentNode = document) {
  const tags = [...root.querySelectorAll<HTMLElement>('.nametag')].filter(el => {
    const b = el.getBoundingClientRect();
    return b.width > 2 && b.height > 2;
  });
  if (!tags.length) return;
  const boxes = tags.map(el => {
    if (!el.dataset.tagId) el.dataset.tagId = 'tg' + (++tagSeq).toString(36);
    if (!el.dataset.full) el.dataset.full = (el.textContent || '').trim();
    if (!el.classList.contains('is-initials')) el.dataset.fullW = String(el.getBoundingClientRect().width);
    const b = el.getBoundingClientRect();
    const w = Number(el.dataset.fullW) || b.width;
    // Undo this tag's current lane lift so every tag is compared from where it would sit in lane 0.
    const step = (parseFloat(getComputedStyle(el).fontSize) || 16) * 1.35;
    const lane = Number(el.style.getPropertyValue('--tag-lane')) || 0;
    return { id: el.dataset.tagId, x: b.left + b.width / 2, w, y: b.bottom + lane * step, h: Math.max(step, b.height) };
  });
  const lanes = new Map(assignLanes(boxes).map(r => [r.id, r]));
  for (const el of tags) {
    const row = lanes.get(el.dataset.tagId || '');
    if (!row) continue;
    const full = el.dataset.full || '';
    const next = row.initials ? initials(full) : full;
    if (el.textContent !== next) el.textContent = next;
    el.classList.toggle('is-initials', row.initials);
    el.style.setProperty('--tag-lane', String(row.lane));
  }
}
