import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import heroImage from "@/assets/hero-workbench.jpg";

/**
 * Cinematisk hero: fullbreddsbild från verkstadsbordet med en mörk radial-wash
 * (.hero-wash) som lägger ett lugnt fält i mitten – texten får kontrast,
 * kanterna får lämna rum åt bilden. Inga pill-tags, inga flytande badges.
 *
 * Animeringen (.hero-rise) är ren CSS med fyllningsläge "both", så den spelar
 * direkt i SSR-html:en – och stängs helt av vid prefers-reduced-motion.
 * Nyckelbilderna och kurvan bor i src/styles.css tillsammans med övriga
 * rörelsetokens, inte i ett inline-<style>-block här.
 *
 * "Verkstads-stacken" nere till höger är två produkt-detaljer från demo-bild-
 * manifestet (glas/ek-familjen + smycke-familjen) i lutande guldramar. Ren
 * dekoration: pointer-events-none, bakom texten i z-ordning, dold på små
 * skärmar – CTA-knapparna får alltid företräde.
 */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-ink">
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
      <div aria-hidden="true" className="hero-wash absolute inset-0" />
      {/* Mjuk övergång ner mot pappret så hero inte kapas hårt av nästa sektion */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-background"
      />

      {/* Verkstads-stack: två detaljer i lutande guldramar, staplade med offset.
          Rotationen ligger på bilden i stället för på den animerade wrappern –
          hero-rise slutar på transform: none och skulle annars nolla rotationen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-10 z-0 hidden select-none md:block lg:right-10"
      >
        <div className="hero-rise absolute bottom-8 right-0 [animation-delay:650ms]">
          <img
            src="/images/products/korgar_bord_H0a665.webp"
            alt="Graverad detalj i ek från verkstaden"
            width={700}
            height={700}
            loading="lazy"
            decoding="async"
            className="h-36 w-36 rotate-2 rounded-2xl border border-gold/40 object-cover shadow-soft lg:h-40 lg:w-40"
          />
        </div>
        <div className="hero-rise absolute bottom-4 right-28 [animation-delay:780ms] lg:right-32">
          <img
            src="/images/products/halshalsband_bord_H1880.webp"
            alt="Graverat smycke från verkstaden"
            width={700}
            height={700}
            loading="lazy"
            decoding="async"
            className="h-32 w-32 -rotate-3 rounded-2xl border border-gold/40 object-cover shadow-soft lg:h-36 lg:w-36"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
        <p className="gold-accent hero-rise font-inscription text-sm md:text-base">
          lasergravyr &amp; personliga presenter, gjorda för hand i Småland
        </p>
        <h1 className="hero-rise mt-5 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06] tracking-tight text-ink-foreground [animation-delay:130ms]">
          Personliga presenter med <span className="gold-accent">gravyr</span> – gjorda för hand i
          Småland
        </h1>
        <p className="hero-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/85 [animation-delay:260ms]">
          Namn, datum eller en rad bara ni två förstår – jag lasergraverar din text i trä, läder,
          glas och metall. Allt tillverkas för hand efter din beställning, och du får alltid en
          digital skiss att godkänna innan lasern startar.
        </p>

        <div className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:390ms]">
          <Button asChild size="lg">
            <Link to="/sortiment">Se sortimentet</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-ink-foreground">
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
