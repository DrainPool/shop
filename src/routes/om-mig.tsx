import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Hammer, Mail, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/siteUrls";
import storyImage from "@/assets/story-hands.jpg";

// Person-schema – riktiga uppgifter från frallan (sep 2026)
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fredrik Arvidsson",
  url: `${SITE_URL}/om-mig`,
  jobTitle: "Grundare av Lins & Lager",
  worksFor: { "@type": "Organization", name: "Lins & Lager" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aneby",
    addressCountry: "SE",
  },
};

export const Route = createFileRoute("/om-mig")({
  head: () => ({
    meta: [
      { title: "Om mig – Lins & Lager" },
      { rel: "canonical", href: `${SITE_URL}/om-mig` },
      {
        name: "description",
        content:
          "Möt Fredrik Arvidsson i Aneby – verkstaden bakom Lins & Lager: handgjorda personliga presenter med gravyr, 3D-utskrift och foto, tillverkade i Småland sedan 2016.",
      },
      { property: "og:title", content: "Om mig – Lins & Lager" },
      {
        property: "og:description",
        content:
          "Handgjorda personliga presenter med gravyr, 3D-utskrift och foto – tillverkade i Småland sedan 2016.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(PERSON_JSON_LD),
      },
    ],
  }),
  component: AboutPage,
});

const workflow = [
  {
    icon: PencilRuler,
    title: "Digital skiss",
    text: "Du beskriver din idé och får alltid en skiss att godkänna innan jag börjar graverar.",
  },
  {
    icon: Hammer,
    title: "Handgjort i verkstaden",
    text: "Allt tillverkas för hand i min verkstad i Aneby – inga halvfabrikat, ingen stress.",
  },
  {
    icon: Gift,
    title: "Presentklart",
    text: "Skickas ompaketerat, redo att ge bort. Personlig hälsning på kortet? Inga problem.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Om mig" }]} />

      <div className="mt-8 grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-script text-3xl text-primary-deep">hej, och välkommen in!</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] font-bold tracking-tight md:text-6xl">
            Bakom Lins &amp; Lager står jag
          </h1>
          <p className="mt-7 max-w-md text-lg text-muted-foreground">
            Jag heter Fredrik Arvidsson och driver verkstaden hemma i Aneby, här i Småland. Det
            började med kameran. Jag fotograferade bröllop och dop – och märkte att det fina minnet
            ofta hamnade i en låda. Jag ville göra minnen som går att hålla i, varje dag.
          </p>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Därför kom gravyren till, sedan 3D-printern och Cricut-maskinen. Idag tillverkar jag
            smycken, skärbrädor, namnbrickor, foto och stickers till samma familjer, företag och
            tillfällen – med namn, datum och en massa kärlek.
          </p>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Varje beställning tillverkas för hand när den kommer in. Därför tar jag in ett begränsat
            antal per vecka – kvalitet går alltid före kvantitet.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-7 text-base">
            <a href="mailto:hej@linsochlager.se?subject=Min presentid%C3%A9">
              <Mail className="mr-2 h-4 w-4" /> Skriv till mig
            </a>
          </Button>
        </div>
        <img
          src={storyImage}
          alt="Händer som håller en handgraverad träask i en ljus verkstad"
          width={1200}
          height={1200}
          fetchPriority="high"
          className="-rotate-1 rounded-3xl border-4 border-ink shadow-lift"
        />
      </div>

      <section className="mt-20">
        <p className="font-script text-2xl text-primary-deep">så jobbar jag</p>
        <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight">Från idé till present</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {workflow.map((w) => (
            <div key={w.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream">
                <w.icon className="h-5 w-5 text-primary-deep" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Vill du se hela resan – från skiss till presentklart paket?{" "}
          <Link
            to="/tillverkningsprocessen"
            className="font-semibold text-primary-deep hover:underline"
          >
            Läs om tillverkningsprocessen
          </Link>
          .
        </p>
      </section>

      <section className="mt-20 rounded-3xl bg-cream p-10 text-center md:p-14">
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Har du en presentidé i åtanke?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Skriv några rader om tillfället, namnen och känslan du vill fånga – du får ett förslag med
          skiss innan vi börjar tillverka.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 text-base">
            <a href="mailto:hej@linsochlager.se?subject=Min presentid%C3%A9">
              <Mail className="mr-2 h-4 w-4" /> Skriv till mig
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-2 px-7 text-base"
          >
            <Link to="/sortiment">Se hela sortimentet</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
