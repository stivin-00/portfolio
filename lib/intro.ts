/**
 * Coordination between the opening title card (IntroSequence) and the hero.
 *
 * A tiny inline script in app/layout.tsx sets `data-intro="play"` on <html>
 * before first paint when the title card should run (first visit to "/" in
 * this session, motion allowed). Everything that animates the hero waits for
 * the card's iris-wipe instead of guessing with a fixed delay, and starts
 * immediately when there is no card.
 *
 * States on <html data-intro>: "play" (card on screen) → "reveal" (iris-wipe
 * running, hero revealing) → "done". Absent when the card is skipped.
 */
export const INTRO_REVEAL_EVENT = "intro:reveal";

export function introIsPlaying(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "play";
}

/** Calls `cb` once the hero should reveal. Returns a cleanup function. */
export function onHeroReveal(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (introIsPlaying()) {
    const handler = () => cb();
    window.addEventListener(INTRO_REVEAL_EVENT, handler, { once: true });
    return () => window.removeEventListener(INTRO_REVEAL_EVENT, handler);
  }

  const id = window.requestAnimationFrame(() => cb());
  return () => window.cancelAnimationFrame(id);
}

/**
 * Inline boot script, run in <head> before paint:
 * - `data-js` lets CSS hide content that GSAP will reveal (so it stays
 *   visible when JavaScript is off or fails),
 * - `data-intro="play"` shows the title card only when it will actually run.
 */
export const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{if(location.pathname==='/'&&!sessionStorage.getItem('intro-seen')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-intro','play');}}catch(e){}})();`;
