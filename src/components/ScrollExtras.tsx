import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Kombinerad scroll-progress-bar (tunn sepia-linje överst) + flytande
 * "till toppen"-knapp som visas först efter att sidan scrollats en bit.
 * motion-reduce: animationerna stängs av, funktionaliteten kvarstår.
 */
export function ScrollExtras() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      setProgress(p);
      setShowTop(window.scrollY > 600);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Läsframsteg – tunn linje i toppen, pekar framåt utan att skriva över headern */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-primary-deep/80 transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Till toppen – synlig först när det finns något att vinna */}
      {showTop && (
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
          aria-label="Tillbaka till toppen"
          className="fixed right-4 bottom-20 z-40 h-11 w-11 rounded-full border-border bg-background/95 shadow-lift backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transition-none md:bottom-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}
    </>
  );
}