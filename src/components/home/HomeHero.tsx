import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workbench.jpg";
import taggMarkGold from "@/assets/tagg-mark-gold.png";

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
    <section className="relative flex min-h-[58svh] items-center justify-center overflow-hidden bg-ink md:min-h-[64svh]">
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

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
        {/* Gulden variant av taggmärket: mörk yta, märket får stå först. */}
        <img
          src={taggMarkGold}
          alt=""
          width={512}
          height={512}
          decoding="async"
          className="hero-rise mx-auto mb-5 h-16 w-16 md:h-20 md:w-20"
        />
        <p className="gold-accent hero-rise font-inscription text-sm md:text-base">
          lasergravyr &amp; personliga presenter, gjorda för hand i Småland
        </p>
        <h1 className="hero-rise mt-5 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.06] tracking-tight text-ink-foreground [animation-delay:130ms]">
          Personliga presenter med <span className="gold-accent">gravyr</span> – gjorda för hand i
          Aneby, Småland
        </h1>
        <p className="hero-rise mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/85 [animation-delay:260ms]">
          Jag graverar din text eller ditt foto i glas, trä, metall och läder. Jag gör även
          fotokonst och hem-inredning på beställning – allt i mitt garage med skogen utanför
          fönstret. Du får alltid se en skiss innan jag börjar.
        </p>

        <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-4 [animation-delay:390ms]">
          <Button asChild size="lg">
            <Link to="/sortiment">Se sortimentet</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
