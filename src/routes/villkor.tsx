import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  FileQuestion,
  Hammer,
  MessageCircleWarning,
  Package,
  PenLine,
  Scale,
} from "lucide-react";

export const Route = createFileRoute("/villkor")({
  head: () => ({
    meta: [
      { title: "Allmänna villkor – Lins & Lager" },
      {
        name: "description",
        content:
          "Villkor för köp hos Lins & Lager: beställning och skiss, priser och betalning, leveranstid, ångerrätt för personligt tillverkade varor och reklamationsrätt.",
      },
      { property: "og:title", content: "Allmänna villkor – Lins & Lager" },
      {
        property: "og:description",
        content:
          "Villkor för köp hos Lins & Lager: skiss, betalning, leverans, ångerrätt och reklamation.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsPage,
});

/** Stycken kan vara ren text eller JSX med länkar (se "Tillverkning & leverans") */
const sections: { title: string; body: ReactNode[] }[] = [
  {
    title: "Allmänt",
    body: [
      "Dessa villkor gäller när du beställer varor från Lins & Lager (enskild firma, org.nummer 870624-2453, Aneby, Sverige). Genom att slutföra ett köp i webshoppen godkänner du villkoren nedan. Beställningar lägger du i webshopen; för skräddarsydda uppdrag kan vi även komma överens via e-post.",
    ],
  },
  {
    title: "Beställning & digital skiss",
    body: [
      "Alla produkter tillverkas för hand efter dina önskemål. Innan tillverkningen börjar får du alltid en digital skiss att godkänna. Kontrollera därför stavning, datum och detaljer noga i skissen och i din beställning – du ansvarar för att texterna du anger är korrekta.",
      "Efter din godkännande av skissen påbörjas tillverkningen, och produkten kan därefter inte ändras.",
    ],
  },
  {
    title: "Priser & betalning",
    body: [
      "Alla priser anges i svenska kronor inklusive moms. Eventuella fraktkostnader visas i kassan innan du fullföljer köpet – fri frakt vid beställning över 800 kr.",
      "Betalning sker tryggt i Shopifys kassa med kort, Klarna och Swish beroende på vad som är aktivt i butiken vid köptillfället. Vi reserverar oss för att en produkt har blivit slutsåld och prisändringar eller felskrivningar kan förekomma – då kontaktar vi dig alltid innan vi levererar.",
    ],
  },
  {
    title: "Tillverkning & leverans",
    body: [
      "Ordertid: beställningar som läggs innan söndag 23:59 tillverkas och skickas under följande vecka. Ange gärna ett önskad leveransdatum om du beställer till ett bestämt tillfälle – anstränger mig alltid att hinna, men kontakta mig först om datumet är nära förestående.",
      "Leverans sker med spårbar frakt inom Sverige. Läs mer om leveranstider på sidan ",
      <Link to="/frakt-leverans" className="text-primary-deep underline">
        Frakt &amp; leverans
      </Link>,
      ".",
    ],
  },
  {
    title: "Ångerrätt",
    body: [
      "Varor som tillverkas, graveras eller annars anpassas särskilt efter dina önskemål omfattas inte av ångerrätten. Enligt 2 kap. 11 § lagen (2005:59) om distansavtal och avtal utanför affärslokaler gäller inte ångerrätten för varor som har tillverkats enligt konsumentens anvisningar eller som annars har fått en tydlig personlig prägel. Det gäller samtliga produkter med personlig gravyr, tryck eller annat eget önskemål.",
      "Har du beställt en produkt utan personlig anpassning gäller 14 dagars öppet köp från det att du mottagit varan. Varan ska då vara oanvänd och i originalförpackning. Kontakta mig via e-post innan du returnerar.",
    ],
  },
  {
    title: "Reklamation",
    body: [
      "Enligt konsumentköplagen har du rätt att reklamera fel på varan i tre år från köpet. Skulle något skadas under transport eller inte motsvara den godkända skissen – hör av dig inom rimlig tid, gärna med foton, så löser vi det: ny tillverkning, lagning eller återbetalning beroende på vad som passar dig bäst.",
    ],
  },
  {
    title: "Tvist",
    body: [
      "Vi följer Konsumentverkets rekommendationer och försöker alltid lösa eventuella tvister i samförstånd. Kan vi inte komma överens kan du ta tvisten till Allmänna reklamationsnämnden (ARN).",
    ],
  },
];

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Allmänna villkor" }]} />

      <p className="mt-8 font-script text-3xl text-primary-deep">ärliga &amp; tydliga villkor</p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        Allmänna villkor
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Senast uppdaterad: augusti 2026. Kort sagt: du får alltid godkänna en skiss innan jag
        tillverkar, och jag håller vad jag lovar.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section
            key={s.title}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft"
          >
            <h2 className="font-serif text-2xl font-bold">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-3xl bg-cream p-8 text-center">
        <p className="text-muted-foreground">
          Frågor om villkoren? Hör av dig så förklarar jag gärna.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            to="/kontakt"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Kontakta mig
          </Link>
          <Link
            to="/retur"
            className="rounded-full border-2 border-border px-6 py-3 font-semibold transition-colors hover:border-primary"
          >
            Retur &amp; reklamation
          </Link>
        </div>
      </section>
    </div>
  );
}
