import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import heroImage from "@/assets/hero-workbench.jpg";

/**
 * Cinematisk hero: fullbreddsbild från verkstadsbordet med en mörk radial-wash
 * som lägger ett lugnt fält i mitten – texten får kontrast, kanterna får lämna
 * rum åt bilden. Inga pill-tags, inga flytande badges, inga metainstruktioner.
 *
 * Animeringen är ren CSS (keyframes, fyllningsläge "both") så den spelar direkt
 * i SSR-html:en – och stängs helt av vid prefers-reduced-motion.
 */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-ink">
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: none; }
        }
        .hero-rise {
          animation: hero-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { animation: none; }
        }
      `}</style>

      {/* Bakgrundsbild + mörk radial-wash: mörkast där texten sitter,
          ljusare mot kanterna där verkstaden får synas. */}
      <img
        src={heroImage}
        alt="Graverad skärbräda, personligt smycke och detaljer från verkstaden på arbetsbordet"
        width={1600}
        height={1104}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 46%, oklch(0.16 0.012 30 / 0.85), oklch(0.16 0.012 30 / 0.45) 68%, oklch(0.16 0.012 30 / 0.78) 100%)",
        }}
      />
      {/* Mjuk övergång ner mot pappret så hero inte kapas hårt av nästa sektion */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
        <p className="hero-rise font-script text-2xl text-[oklch(0.83_0.09_82)] md:text-3xl">
          lasergravyr &amp; personliga presenter, gjorda för hand i Småland
        </p>
        <h1 className="hero-rise mt-5 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.04] font-bold tracking-tight text-ink-foreground [animation-delay:130ms]">
          Ge bort en present som verkligen{" "}
          <span className="text-[oklch(0.83_0.09_82)]">betyder något</span>
        </h1>
        <p className="hero-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/85 [animation-delay:260ms]">
          Namn, datum eller en rad bara ni två förstår – jag lasergraverar din text i trä, läder,
          glas och metall. Allt tillverkas för hand efter din beställning, och du får alltid en
          digital skiss att godkänna innan lasern startar.
        </p>

        <div className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:390ms]">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-semibold">
            <Link to="/sortiment">Se sortimentet</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-ink-foreground/50 bg-transparent px-8 text-base font-semibold text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
          >
            <a href="#sa-gar-det-till">
              Så graverar jag
              <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <p className="hero-rise mt-10 text-sm font-medium text-ink-foreground/75 [animation-delay:520ms]">
          Fri frakt över {FREE_SHIPPING_LIMIT} kr · digital skiss på varje beställning ·
          presentklart inpackat
        </p>
      </div>
    </section>
  );
}
