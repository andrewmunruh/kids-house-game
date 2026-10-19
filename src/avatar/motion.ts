// Full limb animation is the default on Reagan's iPad (iPadOS 26, CSS nesting).
// Safari 16 cannot nest CSS, so that floor only swings the kid you are playing
// and bobs everyone else. The silhouettes and the idle tilt stay either way.

export function richAvatars(): boolean {
  try {
    return typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(&)');
  } catch {
    return false;
  }
}

/** animate: this kid is the one the player is moving. Ignored when the device can play every kid. */
export function stampAvatar(el: HTMLElement, look: { look2?: unknown } | null | undefined, animate: boolean): void {
  const chibi = !!(look && look.look2);
  el.classList.toggle('chibi', chibi);
  const rich = chibi && richAvatars();
  el.classList.toggle('chibi-move', chibi && (rich || animate));
  el.classList.toggle('chibi-bob', chibi && !rich && !animate);
}
