import { Link } from "@tanstack/react-router";
import { Hand, PencilRuler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import storyHands from "@/assets/story-hands.jpg";

/**
 * "Gjord för hand – för just dig": det personliga löftet, placerat efter
 * produktslidern. Nordic Craft skriver "Bara för dig / designade särskilt
 * för dig" — men det är dropshipping-copy. Här är det bokstavligen sant:
 * varje produkt graveras för hand i Aneby efter kundens beställning,
 * och skissen godkänns alltid först. Sanningen är det bättre säljargumentet.
 */
export function HandmadePromise() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-16">
      <div className="grid items-center gap-10 rounded-3xl border border-border bg-cream p-8 shadow-soft md:grid-cols-2 md:p-12">
        <div>
          <Kicker>gjord för hand – för just dig</Kicker>
          <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
            Ingen massproduktion – din produkt tillverkas först när du beställt
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Jag graverar din text i glas, trä, metall och läder. Jag gör även fotokonst,
            hem-inredning och 3D-utskrifter på beställning i verkstaden i Aneby. Du
            godkänner alltid en skiss innan jag börjar – så presenten blir precis
            som du tänkt den, inte nästan.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/sortiment">Gör den till din</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <Link to="/tillverkningsprocessen">Så tillverkas den</Link>
            </Button>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Hand className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              Graverad i Småland
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PencilRuler className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              Skiss du godkänner – alltid
            </span>
          </p>
        </div>

        <figure className="rotate-1">
          <img
            src={storyHands}
            alt="Händer som håller i en nygraverad present från verkstaden i Småland"
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-3xl border-2 border-ink object-cover shadow-lift"
          />
          <figcaption className="mt-4 -rotate-1 text-center text-sm text-muted-foreground">
            Från bänken i Aneby – nygraverat, klart att ge bort.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}