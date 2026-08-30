import { Heart } from "lucide-react";

/**
 * Skrollande "trusted by"-band enligt planen (ersätter marquee-logo-scroller).
 * Visar tillfällen/produkttyper i dämpade sepia-toner.
 *
 * VILL DU HA RIKTIGA FÖRETAGSHÄR? Lägg bara in namnen i ITEMS nedan
 * (t.ex. "Nordanå Konferens", "Tranås Bröllopsstudio") så skrollar de
 * som textlogotyper. Ändra inget annat.
 */

const ITEMS = [
  "Bröllop",
  "Dop",
  "Företagsgåvor",
  "Farsdag & jakt",
  "Namnbrickor",
  "Skärbrädor",
  "Fototavlor",
  "3D-utskrifter",
  "Stickers",
  "Smycken",
];

export function TrustedMarquee() {
  // Duplicera listan för en sömlös slinga (animationen flyttar -50%)
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section aria-label="Tillfällen och produkter" className="overflow-hidden border-y border-border/70 bg-cream py-6">
      <p className="mb-5 text-center font-serif text-lg font-semibold text-muted-foreground">
        Hantverk till livets tillfällen – <span className="text-primary">sedan 2016</span>
      </p>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div
        className="marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="marquee-track" aria-hidden="true">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 font-serif text-xl text-ink/75"
            >
              {item}
              <Heart className="h-3.5 w-3.5 fill-gold/70 text-gold/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}