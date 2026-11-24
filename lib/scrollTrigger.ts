import gsap from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

let promise: Promise<typeof ScrollTriggerType> | null = null;

/**
 * Loads and registers GSAP's ScrollTrigger once, as its own chunk, so it
 * doesn't add to the JavaScript evaluated before first paint.
 */
export function loadScrollTrigger(): Promise<typeof ScrollTriggerType> {
  if (!promise) {
    promise = import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger;
    });
  }
  return promise;
}
