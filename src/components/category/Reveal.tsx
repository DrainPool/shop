import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal-wrapper: tonar in + glider upp när sektionen närmar sig
 * viewporten. Bygger på IntersectionObserver – inga beroenden, ingen GSAP.
 *
 * Reduced motion: matchar prefers-reduced-motion och visar allt direkt.
 *
 * SSR-äkerhet: startläget är "synlig" – det dolda läget sätts bara på
 * klienten och bara för element som redan ligger under den första
 * viewporten. Skulle JS aldrig köras syns innehållet ändå (viktigt för
 * SSR-html:en och robotar).
 */
export function Reveal({
  children,
  className,
  /** ms före transitionen startar – ger trappsteg i grid */
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Syns redan i första viewporten: rendera direkt, ingen fade som
    // kan blinka innehåll användaren ser just nu.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setHidden(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
