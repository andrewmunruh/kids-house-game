// Street mailbox: write a short letter, and the owner opens it.
import { FILTER_MSG, PHRASES, cleanMailText } from './shared/hood';
import { MAIL_COLOR, MAIL_COLORS, MAIL_MAX, MAIL_STICKERS, friendlyWhen, type Letter } from './shared/mail';

const O = '#5a3d5c';
const st = `stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

const STICKER = [
  `<svg viewBox="0 0 48 48"><path d="M24 40 C16 32 6 26 10 16 C14 8 24 12 24 20 C24 12 34 8 38 16 C42 26 32 32 24 40 Z" fill="#ff6b9a" ${st}/></svg>`,
  `<svg viewBox="0 0 48 48"><path d="M24 6 l5 12 13 1 -10 8 3 13 -11 -7 -11 7 3 -13 -10 -8 13 -1z" fill="#ffd166" ${st}/></svg>`,
  `<svg viewBox="0 0 48 48"><circle cx="24" cy="22" r="6" fill="#ff8fab" ${st}/>${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${24 + Math.cos(a * Math.PI / 180) * 12}" cy="${22 + Math.sin(a * Math.PI / 180) * 12}" r="5" fill="#ffd166" ${st}/>`).join('')}<path d="M24 34 V44" ${st}/></svg>`,
  `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="30" rx="14" ry="10" fill="#ffb26b" ${st}/><circle cx="34" cy="20" r="8" fill="#ffc46b" ${st}/><path d="M28 14 L30 6 L36 14" fill="#ffb26b" ${st}/><circle cx="32" cy="19" r="1.4" fill="${O}"/><circle cx="37" cy="19" r="1.4" fill="${O}"/></svg>`,
  `<svg viewBox="0 0 48 48">${['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7'].map((c, i) => `<path d="M8 ${30 - i * 4} Q24 ${10 - i * 3} 40 ${30 - i * 4}" fill="none" stroke="${c}" stroke-width="4"/>`).join('')}</svg>`,
  `<svg viewBox="0 0 48 48"><path d="M24 6 l3 10 10 1 -8 6 3 10 -8 -5 -8 5 3 -10 -8 -6 10 -1z" fill="#fff3b0" ${st}/><circle cx="12" cy="34" r="3" fill="#ff8fab" ${st}/><circle cx="36" cy="36" r="2.4" fill="#bde0fe" ${st}/></svg>`,
];

/** A little mailbox that stands in front of a house. Flag up when she has unread mail. */
export function mailboxArt(flagUp: boolean): string {
  const flag = flagUp
    ? `<g class="flag"><path d="M30 16 V6" ${st}/><path d="M30 6 H42 L38 11 L42 16 H30 Z" fill="#ff6b6b" ${st}/></g>`
    : `<g class="flag"><path d="M18 28 H28" ${st}/><path d="M18 22 H28 L25 25 L28 28 H18 Z" fill="#ffd166" ${st}/></g>`;
  return `<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="68" rx="18" ry="3" fill="#000" opacity=".12"/>
    <rect x="30" y="40" width="5" height="26" rx="2" fill="#c99366" ${st}/>
    <path d="M8 40 V22 Q8 8 32 8 Q56 8 56 22 V40 Z" fill="#8ecae6" ${st}/>
    <path d="M8 28 H56" ${st}/>
    <rect x="14" y="32" width="36" height="16" rx="4" fill="#fff6e6" ${st}/>
    <circle cx="32" cy="40" r="3" fill="${O}"/>
    ${flag}
  </svg>`;
}

export function letterOk(raw: string, roster: string[] = []): { ok: true; text: string } | { ok: false; msg: string } {
  const f = cleanMailText(raw, roster);
  if (!f.ok) return { ok: false, msg: f.reason === 'empty' ? 'Write a little note!' : (FILTER_MSG[f.reason] || 'Oops, try different words!') };
  return { ok: true, text: f.text };
}

const FAIL: Record<string, string> = {
  ...FILTER_MSG,
  empty: 'Write a little note!',
  slow: "Let's wait a moment!",
  full: 'This mailbox is full!',
  notyours: 'Only she can open her mail.',
  nohouse: 'That house is not on the street.',
  gone: 'That letter is already gone.',
  toobig: 'The mailbox is too full!',
  presetsOnly: 'Typing is turned off: pick a phrase!',
  unread: 'She still has your letters! Wait until she reads them.',
};

export function failMsg(reason: string): string { return FAIL[reason] || "Let's try that again!"; }

export interface MailCtl {
  open: (houseId: string, houseName: string, mine: boolean, letters: Letter[]) => void;
  fail: (reason: string) => void;
  refresh: () => void;
  syncCue: (show: boolean) => void;
}

export function installMail(opts: {
  send: (houseId: string, text: string, color: number, sticker: number) => void;
  read: (houseId: string, id: string) => void;
  drop: (houseId: string, id: string) => void;
  houseOf: (pid: string) => string;
  houseName: (houseId: string) => string;
  lettersOf: (houseId: string) => Letter[];
  mine: (houseId: string) => boolean;
  toast: (m: string) => void;
  openOwn: () => void;
  /** True when a grown-up still allows typed letters. Preset phrases otherwise. */
  freeType: () => boolean;
}): MailCtl {
  let openId = '';
  let readingId = '';
  let writing = false;
  let replyTo = '';
  let color = 0;
  let sticker = 0;
  let phrase = -1;
  let err = '';
  let confirmDrop = '';
  const cue = () => document.getElementById('mailCue');
  cue()?.addEventListener('click', () => { opts.openOwn(); });

  function close() { openId = ''; readingId = ''; document.getElementById('mailSheet')?.remove(); }
  function sheet(): HTMLElement {
    let el = document.getElementById('mailSheet');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mailSheet';
      el.className = 'sheet mailSheet';
      el.innerHTML = '<div class="card" id="mailCard"></div>';
      document.body.appendChild(el);
      el.addEventListener('click', e => {
        const t = e.target as HTMLElement;
        if (t === el || t.closest('[data-m="close"]')) { close(); return; }
        onClick(t);
      });
      el.addEventListener('input', e => {
        const area = e.target as HTMLTextAreaElement;
        if (area.id !== 'mailText') return;
        const n = document.getElementById('mailCount');
        if (n) n.textContent = `${area.value.length}/${MAIL_MAX}`;
      });
    }
    return el;
  }

  function draw() {
    if (!openId) return;
    const draft = sheet().querySelector<HTMLTextAreaElement>('#mailText')?.value ?? '';
    const mine = opts.mine(openId);
    const letters = opts.lettersOf(openId);
    const name = opts.houseName(openId);
    const card = sheet().querySelector('#mailCard')!;
    if (readingId && mine && !writing) {
      const letter = letters.find(l => l.id === readingId);
      if (letter && letter.text) { renderOpen(letter); return; }
      readingId = '';
    }
    if (writing || !mine) {
      const free = opts.freeType();
      const title = replyTo ? `Reply to ${opts.houseName(replyTo) || 'your friend'}` : (mine ? 'Leave a letter' : `Letter for ${name}`);
      const words = free
        ? `<textarea id="mailText" class="mailBox" maxlength="${MAIL_MAX}" placeholder="Hi! Come play!"></textarea>
        <div class="mailCount" id="mailCount">0/${MAIL_MAX}</div>`
        : `<h3>Phrase</h3><div class="phrases mailPhrases">${PHRASES.map((p, i) => `<button type="button" data-phrase="${i}" class="${i === phrase ? 'on' : ''}">${esc(p)}</button>`).join('')}</div>`;
      card.innerHTML = `<button class="close" data-m="close">✕</button><h2>${esc(title)}</h2>
        <p class="hint">${free ? 'A short note. Your name goes on it for you.' : 'Pick a phrase. Your name goes on it for you.'}</p>
        ${words}
        <h3>Paper</h3><div class="mailRow">${MAIL_COLOR.map((c, i) => `<button class="swatch ${i === color ? 'on' : ''}" data-color="${i}" style="background:${c}" aria-label="Paper ${i + 1}"></button>`).join('')}</div>
        <h3>Sticker</h3><div class="mailRow">${STICKER.slice(0, MAIL_STICKERS).map((s, i) => `<button class="stick ${i === sticker ? 'on' : ''}" data-sticker="${i}" aria-label="Sticker ${i + 1}">${s}</button>`).join('')}</div>
        ${err ? `<p class="mailErr" id="mailErr">${esc(err)}</p>` : ''}
        <button class="mailSend" id="mailSend" type="button">Send</button>
        ${mine && letters.length ? '<button class="mailRow" data-act="back" type="button" style="margin-top:8px">Back to my mail</button>' : ''}`;
      const area = sheet().querySelector<HTMLTextAreaElement>('#mailText');
      if (area && draft) { area.value = draft; const n = document.getElementById('mailCount'); if (n) n.textContent = `${draft.length}/${MAIL_MAX}`; }
      return;
    }
    const rows = letters.length ? letters.slice().reverse().map(l => {
      if (!l.text) return `<div class="letter" style="background:${MAIL_COLOR[l.color] ?? MAIL_COLOR[0]}"><span class="who">Your letter</span><span class="when">${esc(friendlyWhen(l.at))}</span><span class="statusChip ${l.read ? 'read' : ''}">${l.read ? 'Read' : 'Delivered'}</span></div>`;
      return `<button type="button" class="letter ${l.read ? '' : 'fresh'}" data-letter="${esc(l.id)}" style="background:${MAIL_COLOR[l.color] ?? MAIL_COLOR[0]}">
        <span class="sticker">${STICKER[l.sticker] ?? STICKER[0]}</span>
        <span class="who">${esc(l.from)}</span><span class="when">${esc(friendlyWhen(l.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${st}/><path d="M4 8 L40 24 L76 8" fill="${MAIL_COLOR[l.color] ?? '#fff'}" ${st}/></svg>
      </button>`;
    }).join('') : '<p class="hint">No letters yet. Your flag pops up when one arrives!</p>';
    card.innerHTML = `<button class="close" data-m="close">✕</button><h2>${esc(name)} mailbox</h2>${rows}
      <div class="mailRow"><button type="button" data-act="write">Write a letter</button></div>
      ${err ? `<p class="mailErr">${esc(err)}</p>` : ''}`;
  }

  function onClick(t: HTMLElement) {
    const phraseBtn = t.closest<HTMLElement>('.mailPhrases [data-phrase]');
    if (phraseBtn) { phrase = +phraseBtn.dataset.phrase!; err = ''; draw(); return; }
    const colorBtn = t.closest<HTMLElement>('[data-color]');
    if (colorBtn) { color = +colorBtn.dataset.color!; draw(); return; }
    const stickBtn = t.closest<HTMLElement>('[data-sticker]');
    if (stickBtn) { sticker = +stickBtn.dataset.sticker!; draw(); return; }
    if (t.closest('#mailSend')) return send();
    const act = t.closest<HTMLElement>('[data-act]')?.dataset.act;
    if (act === 'write') { writing = true; replyTo = ''; readingId = ''; err = ''; draw(); return; }
    if (act === 'back') { writing = false; replyTo = ''; readingId = ''; err = ''; draw(); return; }
    if (act === 'reply') {
      const hid = opts.houseOf(t.closest<HTMLElement>('[data-from]')?.dataset.from ?? '');
      if (!hid) { opts.toast('They are not on the street anymore.'); return; }
      replyTo = hid; writing = true; readingId = ''; err = ''; openId = hid; draw(); return;
    }
    if (act === 'drop') {
      const id = t.closest<HTMLElement>('[data-id]')?.dataset.id ?? '';
      if (confirmDrop !== id) { confirmDrop = id; opts.toast('Tap again to throw it away'); return; }
      confirmDrop = ''; opts.drop(openId, id); return;
    }
    const letterEl = t.closest<HTMLElement>('[data-letter]');
    if (!letterEl) return;
    const id = letterEl.dataset.letter!;
    const letters = opts.lettersOf(openId);
    const letter = letters.find(l => l.id === id);
    if (!letter) return;
    if (!opts.mine(openId) || !letter.text) return;
    if (!letter.read) opts.read(openId, id);
    readingId = id;
    renderOpen(letter);
  }

  /** The open letter, shown as read. A later mailbox push redraws this instead of the list. */
  function renderOpen(letter: Letter) {
    const safe = showText(letter.text);
    const card = sheet().querySelector('#mailCard')!;
    card.innerHTML = `<button class="close" data-m="close">✕</button>
      <div class="letter open read" style="background:${MAIL_COLOR[letter.color] ?? MAIL_COLOR[0]}" data-id="${esc(letter.id)}" data-from="${esc(letter.fromPid)}">
        <span class="sticker">${STICKER[letter.sticker] ?? STICKER[0]}</span>
        <span class="who">${esc(letter.from)}</span><span class="when">${esc(friendlyWhen(letter.at))}</span>
        <svg class="envelope" viewBox="0 0 80 36"><path d="M4 8 H76 V32 H4 Z" fill="#fff" ${st}/><path class="flap" d="M4 8 L40 24 L76 8" fill="#fff" ${st}/></svg>
        <p class="words">${esc(safe ?? '')}</p>
        <span class="mailRow"><button type="button" data-act="reply">Reply</button><button type="button" class="throw" data-act="drop">${confirmDrop === letter.id ? 'Tap again' : 'Throw away'}</button></span>
      </div>
      <button type="button" data-act="back">All my mail</button>
      ${err ? `<p class="mailErr">${esc(err)}</p>` : ''}`;
  }

  function send() {
    let text = '';
    if (!opts.freeType()) {
      if (phrase < 0 || phrase >= PHRASES.length) { err = 'Pick a phrase!'; draw(); return; }
      text = PHRASES[phrase];
    } else {
      const raw = sheet().querySelector<HTMLTextAreaElement>('#mailText')?.value ?? '';
      const f = letterOk(raw);
      if (!f.ok) { err = f.msg; draw(); const area = sheet().querySelector<HTMLTextAreaElement>('#mailText'); if (area) area.value = raw; return; }
      text = f.text;
    }
    const target = replyTo || openId;
    err = '';
    opts.send(target, text, color, sticker);
    opts.toast('On its way!');
    if (opts.mine(target)) { writing = false; replyTo = ''; openId = target; draw(); }
    else close();
  }

  return {
    open(houseId, _houseName, mine, _letters) {
      openId = houseId; readingId = ''; writing = !mine; replyTo = ''; err = ''; confirmDrop = ''; color = 0; sticker = 0; phrase = -1;
      draw();
    },
    fail(reason) { err = failMsg(reason); if (openId) draw(); else opts.toast(err); },
    refresh() { if (openId) draw(); },
    syncCue(show) { cue()?.classList.toggle('show', show); },
  };
}

function showText(text: string): string | null {
  if (!text) return null;
  // A letter that was accepted stays readable, words unchanged apart from the same whitespace trim as sending.
  const clean = text.normalize('NFKC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, '').replace(/\s+/g, ' ').trim();
  if (!clean || clean.length > MAIL_MAX) return null;
  return clean;
}
function esc(t: string) { return t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)); }
