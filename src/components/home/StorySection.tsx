import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";
import storyHands from "@/assets/story-hands.jpg";
import { Kicker } from "@/components/Kicker";

/**
 * Desire-steget, del 2: om-frallan + socialt bevis. Varm förstapersonscopy
 * bredvid bilden från bänken, och kundväggen (CustomerShowcase, ärlighetsram:
 * tom tills riktiga bidrag finns) som egen del under.
 *
 * Fakta i copyn: Aneby/Småland, fotografiursprunget och "sedan 2016" –
 * samma uppgifter som Organisation-schema och marquee-bandet, inga nya.
 */
export function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker>allt började med kameran</Kicker>
          <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
            Hej – det är jag Fredrik, jag står bakom varje gravyr
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Verkstaden ligger i garaget hemma i Aneby. Genom fönstret ser jag skogen och de böljande
            bergen, och när lasern tystnar hörs bäcken som porlar nedanför. Allt började med kameran
            och bröllopsfotona – idag gör jag samma minnen fast i material man kan hålla i.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Träet kommer från Småland, och resten av materialet köper jag inom EU. Här gör man saker
            ordentligt och slänger inget i onödan – en present ska hålla länge. Du pratar alltid
            direkt med mig, från din första rad till skissen du godkänner.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-8 h-12 rounded-full px-7 text-base"
          >
            <Link to="/om-mig">Läs mer om mig</Link>
          </Button>
        </Reveal>

        <Reveal delay={150}>
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
        </Reveal>
      </div>
    </section>
  );
}
