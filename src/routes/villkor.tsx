import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";
import { DELIVERY_PROMISE } from "@/lib/delivery";

export const Route = createFileRoute("/villkor")({
  head: () => ({
    meta: [
      { title: "Allmänna villkor | Taggat" },
      {
        name: "description",
        content:
          "Villkor för köp hos Taggat: beställning och skiss, priser och betalning, leveranstid, reklamationsrätt och att ångerrätten inte gäller personligt tillverkade varor.",
      },
      { property: "og:title", content: "Allmänna villkor | Taggat" },
      {
        property: "og:description",
        content:
          "Villkor för köp hos Taggat: skiss, betalning, leverans, ångerrätt och reklamation.",
      },
      { property: "og:type", content: "website" },
    ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/villkor` },
      ]
  }),
  component: TermsPage,
});

/** Stycken kan vara ren text eller JSX med länkar (se "Tillverkning & leverans") */
const sections: { title: string; body: ReactNode[] }[] = [
  {
    title: "Allmänt",
    body: [
      "Dessa villkor gäller när du beställer varor från Taggat (enskild firma, org.nummer 870624-2453, Aneby, Sverige). Genom att slutföra ett köp i butiken godkänner du villkoren nedan. Vanliga beställningar lägger du här i butiken. Vill du ha något skräddarsytt löser vi det enkelt via e-post.",
    ],
  },
  {
    title: "Beställning & digital skiss",
    body: [
      "Alla produkter tillverkas för hand efter dina önskemål. Innan tillverkningen börjar får du alltid en digital skiss att godkänna. Kontrollera därför stavning, datum och detaljer noga i skissen och i din beställning – du ansvarar för att texterna du anger är korrekta.",
      "Efter ditt godkännande av skissen påbörjas tillverkningen, och produkten kan därefter inte ändras.",
    ],
  },
  {
    title: "Priser & betalning",
    body: [
      `Alla priser anges i svenska kronor inklusive moms. Eventuella fraktkostnader visas i kassan innan du fullföljer köpet – fri frakt vid beställning över ${FREE_SHIPPING_LIMIT} kr.`,
      "Betalning sker tryggt i Shopifys kassa med kort och Klarna beroende på vad som är aktivt i butiken vid köptillfället. Jag reserverar mig för att en produkt kan vara slutsåld och för att prisändringar eller felskrivningar kan förekomma – då kontaktar jag dig alltid innan jag levererar.",
    ],
  },
  {
    title: "Tillverkning & leverans",
    body: [
      `${DELIVERY_PROMISE} Ange gärna ett önskat leveransdatum om du beställer till ett bestämt tillfälle – kontakta mig först om datumet är nära förestående.`,
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
      "Har du beställt en produkt utan personlig anpassning gäller 14 dagars ångerrätt från det att du fick varan. Varan ska då vara oanvänd och i originalförpackning. Kontakta mig via e-post innan du returnerar.",
    ],
  },
  {
    title: "Reklamation",
    body: [
      "Enligt konsumentköplagen har du rätt att reklamera fel på varan i tre år från köpet. Skulle varan skadas under transporten eller inte motsvara den godkända skissen – hör av dig inom rimlig tid, gärna med foton, så löser jag det: ny tillverkning, lagning eller återbetalning beroende på vad som passar dig bäst.",
    ],
  },
  {
    title: "Tvist",
    body: [
      "Jag följer Konsumentverkets rekommendationer och försöker alltid lösa eventuella tvister i samförstånd. Kan vi inte komma överens kan du ta tvisten till Allmänna reklamationsnämnden (ARN).",
    ],
  },
];

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Allmänna villkor" }]} />

      <Kicker className="mt-8">ärliga &amp; tydliga villkor</Kicker>
      <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Allmänna villkor</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Senast uppdaterad: augusti 2026. Kort sagt: du får alltid godkänna en skiss innan jag
        tillverkar, och jag håller vad jag lovar.
      </p>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {sections.map((s) => (
          <section key={s.title} className="py-6">
            <h2 className="font-serif text-2xl">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
