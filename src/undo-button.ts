// Undo button. One mount node, shown only in Decorate, so the menu branch can move it.
export interface UndoHandle {
  refresh: () => void;
}

/**
 * `shown` is read from the body classes the game already sets:
 * Decorate in a house is the absence of mode-play and view-street.
 */
export function mountUndoButton(host: HTMLElement, opts: { depth: () => number; undo: () => void }): UndoHandle {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'undoBtn';
  btn.textContent = 'Undo';
  btn.setAttribute('aria-label', 'Undo');
  host.appendChild(btn);

  const decorate = () => !document.body.classList.contains('mode-play') && !document.body.classList.contains('view-street');

  const refresh = () => {
    const show = decorate();
    host.hidden = !show;
    const ready = show && opts.depth() > 0;
    btn.classList.toggle('is-empty', !ready);
    btn.setAttribute('aria-disabled', ready ? 'false' : 'true');
  };

  btn.addEventListener('click', () => {
    if (btn.getAttribute('aria-disabled') === 'true') return;
    opts.undo();
    refresh();
  });

  new MutationObserver(refresh).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  refresh();
  return { refresh };
}
