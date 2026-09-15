import { Check, PackageCheck, Palette, PenLine, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/Reveal";
import { useReveal } from "@/components/home/useReveal";

/**
 * Desire-steget: "Så funkar det" som mörkt kapitel mitt på sidan – en paus
 * mellan produktvyerna och berättelsen.
 *
 * Designen är en graverad "spår": en sammanhängande guldlinje (SVG-path
 * med stroke-dashoffset, ritad via useReveals IntersectionObserver – inget
 * nytt JS-bibliotek) som löper genom stegens siffermedaljoner på desktop
 * och som lodrät linje på mobil. Siffran sitter som en graverad platta
 * (Marcellus + guld-hairline-ring) halvt över kortets kant, som en
 * hängsedel. Korten är medvetet täta: hover lyfter fram ikon och medaljon
 * i guld, och steg 2 ("Godkänn skissen") får en liten bock-mikrointeraktion.
 *
 * Id-bindning: toppmenyns "Så funkar det" pekar på #sa-gar-det-till.
 */
type Step = {
  n: string;
  icon: typeof PenLine;
  title: string;
  text: string;
  tick?: boolean;
};

const STEPS: Step[] = [
  {
    n: "1",
    icon: PenLine,
    title: "Skriv din text",
    text: "Välj presenten och skriv namnet, datumet eller den rad du vill ha graverad. Fastnar du i formuleringen hittar jag på ihop med dig.",
  },
  {
    n: "2",
    icon: Palette,
    title: "Godkänn skissen",
    text: "Innan lasern startar får du en digital skiss på gravyren. Ingenting graveras förrän du sagt ja.",
    tick: true,
  },
  {
    n: "3",
    icon: Zap,
    title: "Jag graverar för hand",
    text: "I verkstaden i Småland ställer jag in lasern efter just ditt material – trä, läder, glas eller metall.",
  },
  {
    n: "4",
    icon: PackageCheck,
    title: "Presentklart hem",
    text: "Omsorgsfullt inpackat och skickat till dörren. Skriv att det är en present, så håller jag prislapparna borta.",
  },
];

export function ProcessSection() {
  // Samma IntersectionObserver som Reveal bygger på – här för att rita
  // spår-linjen (stroke-dashoffset) när steppen scrollas in.
  const { ref, state } = useReveal<HTMLOListElement>();

  return (
    <section
      id="sa-gar-det-till"
      className="relative scroll-mt-28 overflow-hidden bg-ink py-16 text-ink-foreground md:py-24"
    >
      {/* Mjuk övergång ner mot pappret – samma fadespråk som heron, så
          de mörka kapitlen känns som bokmärken i stället för hårda kap. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background md:h-36"
      />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="font-inscription text-sm text-gold md:text-base">
              från tanke till gravyr
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
              Så graverar jag din present
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md leading-relaxed text-ink-foreground/80 lg:pb-1">
              Fyra steg från din rad till klar gravyr – och du godkänner varenda ett innan lasern
              startar.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-10 grid gap-x-4 gap-y-6 lg:grid-cols-4">
          {/* Spår-linjen, mobil: lodrät genom medaljonerna (vänsterkant).
              Desktop: vågig guldlinje bakom medaljonraden (se SVG:n nedan). */}
          <span
            aria-hidden="true"
            className="absolute left-7 top-6 bottom-10 w-px bg-gold/25 lg:hidden"
          />
          {/* Spår-linjen, desktop: en våg som "graveras" fram (pathLength 1,
              dashoffset 1 -> 0 via useReveal). Ikoneniska medaljoner har solid
              botten och täcker linjen där den passerar – den läser som en
              sammanhängande gravyr mellan stegen. motion-reduce: statisk linje. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-14 w-full lg:block"
            viewBox="0 0 1200 56"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 28 C 200 14, 400 42, 600 28 C 800 14, 1000 42, 1200 28"
              pathLength={1}
              strokeDasharray={1}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              className={cn(
                "stroke-gold/60 motion-safe:transition-[stroke-dashoffset] motion-safe:duration-[1500ms] motion-safe:ease-out",
                state === "hidden"
                  ? "motion-safe:[stroke-dashoffset:1]"
                  : "motion-safe:[stroke-dashoffset:0]",
              )}
            />
          </svg>

          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delay={i * 100}
              className="group relative flex gap-4 lg:flex-col lg:gap-0"
            >
              {/* Siffermedaljongen – "graverad platta" med guld-hairline,
                  halvt över kortkanten på desktop som en hängsedel. */}
              <span
                aria-hidden="true"
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink font-serif text-xl text-gold transition duration-300 group-hover:border-gold group-hover:bg-ink-foreground/10 lg:mx-auto"
              >
                {step.n}
              </span>
              <div className="flex-1 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.06] p-5 transition duration-300 group-hover:border-gold/40 group-hover:bg-ink-foreground/[0.09] lg:-mt-7 lg:pt-10">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg">{step.title}</h3>
                  <div className="flex shrink-0 items-center gap-2 pt-0.5">
                    {/* Mikrointeraktion steg 2: skissen godkänns –
                        guldbocken tänds när kortet hoveras. */}
                    {step.tick && (
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/40"
                      >
                        <Check className="h-3 w-3 text-gold opacity-40 transition duration-300 group-hover:opacity-100 motion-safe:group-hover:scale-110" />
                      </span>
                    )}
                    <step.icon
                      className="h-5 w-5 text-gold/70 transition duration-300 group-hover:text-gold motion-safe:group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/80">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
