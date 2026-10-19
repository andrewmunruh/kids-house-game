// When kids stand close, their name tags stack into a few lanes.
// Past that, the extras shrink to initials so the pile stays readable.

export type TagBox = { id: string; x: number; w: number };
export type TagLane = { id: string; lane: number; initials: boolean };

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function assignLanes(items: TagBox[], maxLanes = 3): TagLane[] {
  const sorted = [...items].sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
  const placed: { x: number; w: number; lane: number }[] = [];
  const out: TagLane[] = [];
  const hits = (x: number, w: number, lane: number) =>
    placed.some(p => p.lane === lane && Math.abs(p.x - x) < (p.w + w) / 2 + 8);
  const pending: TagBox[] = [];
  for (const it of sorted) {
    let lane = -1;
    for (let L = 0; L < maxLanes; L++) if (!hits(it.x, it.w, L)) { lane = L; break; }
    if (lane < 0) pending.push(it);
    else { placed.push({ x: it.x, w: it.w, lane }); out.push({ id: it.id, lane, initials: false }); }
  }
  for (const it of pending) {
    const w = Math.min(it.w, 44);
    let lane = 0;
    for (let L = 0; L < maxLanes; L++) if (!hits(it.x, w, L)) { lane = L; break; }
    placed.push({ x: it.x, w, lane });
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
    return { id: el.dataset.tagId, x: b.left + b.width / 2, w };
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
