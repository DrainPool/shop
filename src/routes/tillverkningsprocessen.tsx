import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ClipboardCheck,
  Gift,
  Hammer,
  Heart,
  Mail,
  PencilRuler,
  Search,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import katGravyr from "@/assets/kat-gravyr.jpg";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

export const Route = createFileRoute("/tillverkningsprocessen")({
  head: () => ({
    meta: [
      { title: "Tillverkningsprocessen | TaggaDet" },
      { rel: "canonical", href: `${SITE_URL}/tillverkningsprocessen` },
      {
        name: "description",
        content:
          "Så tillverkas din personliga present hos TaggaDet: digital skiss, handgravyr i verkstaden och presentklar leverans. Följ varje steg från idé till gåva.",
      },
      { property: "og:title", content: "Tillverkningsprocessen | TaggaDet" },
      {
        property: "og:description",
        content:
          "Från din idé till färdig present: skiss, handgjort hantverk och presentklar leverans – varje steg förklarat.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProcessPage,
});

interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface Phase {
  n: string;
  title: string;
  intro: string;
  steps: Step[];
}

const phases: Phase[] = [
  {
    n: "Fas 1",
    title: "Förberedelser",
    intro: "Innan något graveras läggs grunden – noggrant och utan stress.",
    steps: [
      {
        icon: ClipboardCheck,
        title: "Din beställning granskas",
        body: "När din beställning kommer in kontrollerar jag varje detalj: namn, datum och dina önskemål. Är något oklart hör jag av mig innan jag börjar – inget lämnas åt slumpen.",
      },
      {
        icon: PencilRuler,
        title: "Digital skiss att godkänna",
        body: "Du får alltid en skiss på graveringen. Först när du bekräftat stavningen och detaljerna börjar tillverkningen.",
      },
      {
        icon: Search,
        title: "Material plockas",
        body: "Ek, läder, stål eller PLA – materialet för just din produkt plockas från lagret och kontrolleras.",
      },
    ],
  },
  {
    n: "Fas 2",
    title: "Jag skapar din produkt",
    intro: "Här sker hantverket – för hand, i min verkstad i Småland.",
    steps: [
      {
        icon: Hammer,
        title: "Tillverkning",
        body: "Gravyr, snickeri, tryck eller 3D-utskrift beroende på produkt. Varje steg tas i lugn takt – det är därför jag tar in ett begränsat antal beställningar per vecka.",
      },
      {
        icon: Sparkles,
        title: "Detaljer & finjustering",
        body: "Djupet i gravyren, kantfinishen, montering av smyckesdelar – små detaljer som avgör om något är fint eller riktigt fint.",
      },
      {
        icon: Check,
        title: "Slutkontroll",
        body: "Innan något packas jämför jag resultatet mot din godkända skiss. Motsvarar det inte den – börjar jag om.",
      },
    ],
  },
  {
    n: "Fas 3",
    title: "Du får din present",
    intro: "Packad för att ge bort – inte för att packa upp.",
    steps: [
      {
        icon: Gift,
        title: "Presentklar förpackning",
        body: "Din produkt skickas ompaketerat, redo att ge bort. Har du önskat ett personligt kort följer det med.",
      },
      {
        icon: Truck,
        title: "Spårbar leverans",
        body: `Du får spårningsnummer så fort paketet är på väg. Fri frakt över ${FREE_SHIPPING_LIMIT} kr.`,
      },
      {
        icon: Heart,
        title: "Ögonblicket",
        body: "Nu är det upp till mottagaren – det är därför jag gör det här.",
      },
    ],
  },
];

function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Tillverkningsprocessen" }]} />

      <Kicker className="mt-8">från idé till present</Kicker>
      <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
        Tillverkningsprocessen
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Varje produkt hos TaggaDet tillverkas för hand efter din beställning. Här följer du resan
        genom verkstaden – från din beställning till att presenten packas och skickas hem.
      </p>

      <img
        src={katGravyr}
        alt="Handgraverad ekbricka under tillverkning i verkstaden"
        width={1200}
        height={1200}
        fetchPriority="high"
        className="mt-10 -rotate-1 rounded-3xl border-4 border-ink shadow-lift"
      />

      <div className="mt-12 space-y-12">
        {phases.map((phase) => (
          <section key={phase.n}>
            <div className="flex items-baseline gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                {phase.n}
              </span>
              <h2 className="font-serif text-3xl tracking-tight">{phase.title}</h2>
            </div>
            <p className="mt-2 text-muted-foreground">{phase.intro}</p>

            <ol className="mt-6 space-y-4">
              {phase.steps.map((s) => (
                <li key={s.title} className="flex gap-4 card-shop p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream">
                    <s.icon className="h-5 w-5 text-primary-deep" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-3xl bg-cream p-8 md:p-10">
        <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
          Redo att skapa något personligt?
        </h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Beställ innan söndag 23:59 så ryms din present i veckans tillverkning. Du får alltid en
          skiss att godkänna innan jag börjar.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7 text-base">
            <Link to="/sortiment">Se hela sortimentet</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-2 px-7 text-base"
          >
            <a href="mailto:hej@linsochlager.se">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> Ställ en fråga
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
