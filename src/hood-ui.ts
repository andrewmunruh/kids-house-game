// Small, self-contained UI helpers for the neighborhood: house exteriors, adult check, toasts, icons.
const O = '#5a3d5c';
const s = `stroke="${O}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

const PALETTES = [
  { body: '#ffd6e0', roof: '#ff7aa8', door: '#8fd3ff', trim: '#fff6e6' },
  { body: '#d9f2ff', roof: '#5aa9e6', door: '#ffd166', trim: '#ffffff' },
  { body: '#e3f9d9', roof: '#5cc985', door: '#ff9f68', trim: '#fffbe6' },
  { body: '#fff1b8', roof: '#ff9f43', door: '#c9a0dc', trim: '#ffffff' },
  { body: '#eadcff', roof: '#9b7bd8', door: '#80ed99', trim: '#fff6fb' },
  { body: '#ffe0c7', roof: '#e07a5f', door: '#5fb0d8', trim: '#fffaf0' },
  { body: '#d8f5ef', roof: '#2fb3a3', door: '#ff8fab', trim: '#ffffff' },
  { body: '#fde2f3', roof: '#e879c6', door: '#ffd166', trim: '#fff' },
];

/** Original cute house exterior. viewBox 0 0 320 300, ground at y=292. */
export function houseSVG(style: number, opts: { lit?: boolean } = {}) {
  const p = PALETTES[((style % PALETTES.length) + PALETTES.length) % PALETTES.length];
  const round = style % 2 === 1;
  const glow = opts.lit ? '#fff3b0' : '#cfe8ff';
  const roof = round
    ? `<path d="M22 138 Q22 36 160 30 Q298 36 298 138 Z" fill="${p.roof}" ${s}/><path d="M60 110 Q70 60 120 50" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`
    : `<path d="M14 140 L160 26 L306 140 Z" fill="${p.roof}" ${s}/><path d="M70 110 L140 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".45"/>`;
  return `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="160" cy="294" rx="150" ry="8" fill="#000" opacity=".12"/>
  <rect x="${round ? 232 : 220}" y="${round ? 36 : 44}" width="30" height="56" rx="6" fill="${p.trim}" ${s}/>
  <rect x="44" y="124" width="232" height="168" rx="20" fill="${p.body}" ${s}/>
  ${roof}
  <circle cx="160" cy="${round ? 92 : 98}" r="18" fill="${glow}" ${s}/><path d="M160 ${round ? 74 : 80} V${round ? 110 : 116} M142 ${round ? 92 : 98} H178" ${s}/>
  <rect x="62" y="160" width="62" height="58" rx="18" fill="${glow}" ${s}/><path d="M93 160 V218 M62 189 H124" ${s}/>
  <rect x="196" y="160" width="62" height="58" rx="18" fill="${glow}" ${s}/><path d="M227 160 V218 M196 189 H258" ${s}/>
  <rect x="56" y="216" width="74" height="16" rx="8" fill="${p.trim}" ${s}/><rect x="190" y="216" width="74" height="16" rx="8" fill="${p.trim}" ${s}/>
  <circle cx="72" cy="212" r="7" fill="#ff8fab" ${s}/><circle cx="92" cy="208" r="7" fill="#ffd166" ${s}/><circle cx="112" cy="212" r="7" fill="#ff8fab" ${s}/>
  <circle cx="208" cy="212" r="7" fill="#c9a0dc" ${s}/><circle cx="228" cy="208" r="7" fill="#80ed99" ${s}/><circle cx="248" cy="212" r="7" fill="#c9a0dc" ${s}/>
  <path d="M132 292 V226 Q132 196 160 196 Q188 196 188 226 V292 Z" fill="${p.door}" ${s}/>
  <circle cx="176" cy="250" r="5" fill="${O}"/><path d="M146 222 Q160 212 174 222" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>
  <rect x="118" y="286" width="84" height="10" rx="5" fill="${p.trim}" ${s}/>
</svg>`;
}

export const ICONS = {
  // Friends / a street to share — not a house, so it isn't mistaken for Home.
  street: `<svg viewBox="0 0 48 48"><circle cx="16" cy="15" r="7" fill="#ffd166" stroke="${O}" stroke-width="3"/><circle cx="32" cy="15" r="7" fill="#ff8fab" stroke="${O}" stroke-width="3"/><circle cx="13.5" cy="14.5" r="1.2" fill="${O}"/><circle cx="18.5" cy="14.5" r="1.2" fill="${O}"/><circle cx="29.5" cy="14.5" r="1.2" fill="${O}"/><circle cx="34.5" cy="14.5" r="1.2" fill="${O}"/><path d="M13 18 q3 2.2 6 0 M29 18 q3 2.2 6 0" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/><path d="M8 40 Q16 28 24 33 Q32 38 40 28" fill="none" stroke="#5cc985" stroke-width="4" stroke-linecap="round"/><circle cx="16" cy="36" r="2.2" fill="#fff" stroke="${O}" stroke-width="1.5"/><circle cx="32" cy="32" r="2.2" fill="#fff" stroke="${O}" stroke-width="1.5"/></svg>`,
  home: `<svg viewBox="0 0 48 48"><path d="M8 22 L24 8 L40 22 V40 H8 Z" fill="#ffd166" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M20 40 V28 H28 V40" fill="#fff" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="20" r="2.4" fill="${O}"/></svg>`,
  lockOn: `<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q33 7 33 16 V22" fill="none" stroke="${O}" stroke-width="4"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#ffd166" stroke="${O}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${O}"/></svg>`,
  lockOff: `<svg viewBox="0 0 48 48"><path d="M15 22 V16 Q15 7 24 7 Q31 7 32.5 13" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/><rect x="10" y="21" width="28" height="21" rx="7" fill="#b6f0a8" stroke="${O}" stroke-width="3"/><circle cx="24" cy="31" r="3.5" fill="${O}"/></svg>`,
  chat: `<svg viewBox="0 0 48 48"><path d="M8 12 Q8 6 14 6 H34 Q40 6 40 12 V26 Q40 32 34 32 H22 L13 40 V32 Q8 32 8 26 Z" fill="#fff3b0" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><circle cx="17" cy="19" r="2.5" fill="${O}"/><circle cx="24" cy="19" r="2.5" fill="${O}"/><circle cx="31" cy="19" r="2.5" fill="${O}"/></svg>`,
  shield: `<svg viewBox="0 0 48 48"><path d="M24 5 L39 11 V23 Q39 36 24 43 Q9 36 9 23 V11 Z" fill="#c9a0dc" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M17 24 L22 29 L31 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  solo: `<svg viewBox="0 0 48 48"><path d="M8 24 L24 9 L40 24 V41 H8 Z" fill="#ffd166" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><rect x="19" y="28" width="10" height="13" rx="4" fill="#fff" stroke="${O}" stroke-width="2.5"/><path d="M33 7 l2 4 4 .5 -3 3 .7 4 -3.7-2 -3.7 2 .7-4 -3-3 4-.5z" fill="#ff8fab" stroke="${O}" stroke-width="1.5"/></svg>`,
};

export function toast(msg: string, ms = 2600) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  const lane = document.getElementById('toastLane');
  (lane ?? document.body).appendChild(t); setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 400);
}

/** Simple grown-up gate: a multiplication question answered on a number pad. Resolves true when solved. */
export function adultCheck(): Promise<boolean> {
  return new Promise(resolve => {
    let a = 0, b = 0, input = '', tries = 0;
    const wrap = document.createElement('div'); wrap.className = 'sheet adult'; wrap.innerHTML = `<div class="card adultCard"></div>`;
    document.body.appendChild(wrap);
    const card = wrap.firstElementChild as HTMLElement;
    const next = () => { a = 6 + Math.floor(Math.random() * 4); b = 3 + Math.floor(Math.random() * 7); input = ''; draw(); };
    const draw = () => {
      card.innerHTML = `<button class="close" data-k="x">✕</button><h2>Grown-ups only</h2><p class="q" data-q="${a * b}">What is ${a} × ${b}?</p>
        <div class="ans">${input || '&nbsp;'}</div>
        <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, 'OK'].map(k => `<button data-k="${k}">${k}</button>`).join('')}</div>`;
    };
    const done = (ok: boolean) => { wrap.remove(); resolve(ok); };
    card.addEventListener('click', e => {
      const k = (e.target as HTMLElement).closest<HTMLElement>('[data-k]')?.dataset.k; if (!k) return;
      if (k === 'x') return done(false);
      if (k === '⌫') input = input.slice(0, -1);
      else if (k === 'OK') { if (+input === a * b) return done(true); if (++tries >= 3) return done(false); card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 400); next(); return; }
      else if (input.length < 3) input += k;
      draw();
    });
    wrap.addEventListener('click', e => { if (e.target === wrap) done(false); });
    next();
  });
}
