import { PenLine, Palette, Zap, PackageCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/Reveal";

/**
 * Desire-steget: "Så funkar det" som mörkt kapitel mitt på sidan – en paus
 * mellan produktvyerna och berättelsen. Fyra steg i diagonal kaskad
 * (ökat lyft per kort) i stället för vänster-höger-vänster.
 *
 * Id-bindning: toppmenyns "Så funkar det" pekar på #sa-gar-det-till.
 */
const STEPS = [
  {
    n: "1",
    icon: PenLine,
    title: "Skriv din text",
    text: "Välj presenten och skriv namnet, datumet eller raden du vill ha graverad. Osäker på formuleringen? Jag hittar på ihop med dig.",
  },
  {
    n: "2",
    icon: Palette,
    title: "Godkänn skissen",
    text: "Innan något graveras skickar jag en digital skiss på hur gravyren kommer att se ut. Ingenting sätts igång förrän du sagt ja.",
  },
  {
    n: "3",
    icon: Zap,
    title: "Jag graverar för hand",
    text: "I verkstaden i Småland graverar jag din text med lasern inställd efter just ditt material – trä, läder, glas eller metall.",
  },
  {
    n: "4",
    icon: PackageCheck,
    title: "Presentklart hem",
    text: "Omsorgsfullt inpackat och skickat till dörren – klart att ge bort dagen paketet landar. Skriv att det är present, så håller jag prislappar borta.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="sa-gar-det-till"
      className="relative scroll-mt-28 overflow-hidden bg-ink py-24 text-ink-foreground md:py-36"
    >
      {/* Mjuk övergång ner mot pappret – samma fadespråk som heron, så
          de mörka kapitlen känns som bokmärken i stället för hårda kap. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background md:h-36"
      />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="font-script text-2xl text-gold md:text-3xl">enklare än du tror</p>
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Så graverar jag din present
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-foreground/80">
            Fyra steg från din rad till klar gravyr – och du är med på varenda ett.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delay={i * 120}
              className={cn(
                "h-full",
                i === 1 && "lg:mt-6",
                i === 2 && "lg:mt-12",
                i === 3 && "lg:mt-18",
              )}
            >
              <div className="flex h-full flex-col rounded-3xl border border-ink-foreground/15 bg-ink-foreground/[0.06] p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-5xl font-bold text-gold" aria-hidden="true">
                    {step.n}
                  </span>
                  <step.icon className="h-6 w-6 text-gold/80" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/80">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
