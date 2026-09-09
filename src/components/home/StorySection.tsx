import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";
import { CustomerShowcase } from "@/components/CustomerShowcase";
import storyHands from "@/assets/story-hands.jpg";

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
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-script text-2xl text-primary-deep md:text-3xl">
            allt började med kameran
          </p>
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Hej – jag heter Fredrik, och jag står bakom varje gravyr
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Verkstaden ligger i Aneby, i Småland, och dit tog vägen om via kameran: det började med
            bröllopsfotona, med paren och med alla de där stunderna som förtjänar något att spara.
            Idag gör jag samma minnen fast i material man kan hålla i – graverade med namn, datum
            och rader som betyder något.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Varje beställning tillverkas för hand av mig, och du pratar alltid direkt med mig – från
            din första rad till skissen du godkänner. Skriv om personen som ska få presenten, så
            hittar jag på något som landar rätt.
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

      {/* Socialt bevis: kundväggen (fylls med riktiga bidrag allteftersom) */}
      <Reveal className="mt-24 border-t border-border pt-14">
        <CustomerShowcase />
      </Reveal>
    </section>
  );
}
