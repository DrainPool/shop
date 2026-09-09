import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal utan nya beroenden: IntersectionObserver + CSS-transition.
 *
 * Två grundregler:
 * 1. SSR-ärlighet – servern renderar allt synligt ("shown"). Först på klienten
 *    göms element som ligger under den första viewporten, så fungerar sidan
 *    helt utan JavaScript och synliga sektioner blinkar aldrig.
 * 2. prefers-reduced-motion – då göms ingenting alls, allt visas direkt.
 */

type RevealState = "shown" | "hidden" | "revealed";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>("shown");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ingen animering alls för den som bett webbläsaren om lugn.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Synligt redan vid sidladdning (hero-nära innehåll): låt det vara.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("revealed");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, state };
}
