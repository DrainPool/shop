import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Mail, Percent, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/siteUrls";
import katForetag from "@/assets/till-foretag-2.jpg";
import { Kicker } from "@/components/Kicker";

/**
 * Offert-mailet startar ifyllt med exakt de fält sidan ber om –
 * en tom "ämnesrad bara"-länk är en barriär för B2B-kunden.
 */
const OFFERT_MAILTO = `mailto:taggat@linsochlager.net?subject=${encodeURIComponent(
  "Företagsbeställning",
)}&body=${encodeURIComponent(
  "Hej!\n\nJag vill fråga om en offert.\n\nAntal: \nBudget: \nTillfälle/leveransdatum: \nÖnskad produkt/material: \n\nMvh ",
)}`;

export const Route = createFileRoute("/foretag")({
  head: () => ({
    meta: [
      { title: "Företagsgåvor & profilprodukter | Taggat" },
      {
        name: "description",
        content:
          "Personliga företagsgåvor: graverade namnbrickor, kundgåvor och profilprodukter med er logga. Små serier och offert inom 24 timmar.",
      },
      { property: "og:title", content: "Företagsgåvor & profilprodukter | Taggat" },
      {
        property: "og:description",
        content:
          "Graverade namnbrickor, kundgåvor och profilprodukter i små serier – offert inom 24 timmar.",
      },
      { property: "og:type", content: "website" },
    ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/foretag` },
      ]
  }),
  component: BusinessPage,
});

const offerings = [
  {
    title: "Namnbrickor & skyltar",
    text: "Graverade namnbrickor i ek, valnöt eller läder – till receptionen, personalen eller mässmontern.",
  },
  {
    title: "Kund- & medarbetargåvor",
    text: "Personliga tack-gåvor med mottagarens namn – en gåva som slår presentkortet, varje gång.",
  },
  {
    title: "Profilprodukter med er logga",
    text: (
      <>
        <Link
          to="/kategori/$slug"
          params={{ slug: "muggar" }}
          className="text-primary-deep underline underline-offset-2"
        >
          Muggar
        </Link>
        , tumblers och{" "}
        <Link
          to="/kategori/$slug"
          params={{ slug: "stickers" }}
          className="text-primary-deep underline underline-offset-2"
        >
          stickers
        </Link>{" "}
        med er logotyp graverad eller tryckt. Små upplagor från 10 st.
      </>
    ),
  },
  {
    title: "Bilträffar & klubbar",
    text: "Dash-plaketter till deltagarna, klasspriser med gravyr och klubbdekaler – paketpris till arrangören.",
  },
  {
    title: "Golf-event & tävlingar",
    text: (
      <>
        Jag kommer ut till banan med lasern –{" "}
        <Link
          to="/kategori/$slug"
          params={{ slug: "golfklubbar" }}
          className="text-primary-deep underline underline-offset-2"
        >
          golfklubbor graverade på plats
        </Link>{" "}
        under medlemsdagar, företagsevent och tävlingar. Kundgåvor och tävlingspriser med er
        logotyp, märkta medan ronden pågår.
      </>
    ),
  },
  {
    title: "Mäss- & eventmaterial",
    text: "Stickers, brickor och detaljer som gör montern personlig – tillverkat i Småland, levererat i tid.",
  },
];

const process = [
  { n: "1", title: "Berätta om ert behov", text: "Antal, budget och tillfälle – enradigt räcker." },
  {
    n: "2",
    title: "Offert + digital skiss",
    text: "Inom 24 timmar. Alltid fast pris, inga överraskningar.",
  },
  {
    n: "3",
    title: "Leverans i tid",
    text: "Spårbar leverans, presentklart packade per mottagare om önskas.",
  },
];

const benefits = [
  "Fast pris per beställning – ni vet kostnaden innan ni bestämmer er",
  "Digital skiss godkänns innan tillverkning påbörjas",
  "Fakturering mot företag med godkänd kredit (30 dagar)",
  "Leverans presentklart per mottagare – klart att dela ut",
];

function BusinessPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <Breadcrumbs items={[{ label: "För företag" }]} />

      <div className="mt-8 grid items-center gap-12 md:grid-cols-2">
        <div>
          <Kicker>personligt på jobbet också</Kicker>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            Företagsgåvor som verkligen{" "}
            <span className="relative inline-block text-primary-deep">
              betyder något
              <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gold/60" />
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Namnbrickor, graverade kundgåvor och profilprodukter med er logga – handgjorda i
            Småland, i små serier där varje mottagare ser att ni tänkt på just hen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <a href={OFFERT_MAILTO}>
                <Mail className="mr-2 h-5 w-5" aria-hidden="true" /> Be om offert
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 px-7 text-base"
            >
              <Link to="/kontakt">Ställ en fråga</Link>
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Percent className="h-4 w-4 text-primary-deep" aria-hidden="true" />
            Volym 10–150 st · faktura · offert inom 24 timmar
          </p>
          <p className="mt-3 text-sm">
            <Link
              to="/kategori/$slug"
              params={{ slug: "foretag" }}
              className="font-semibold text-primary-deep underline underline-offset-2"
            >
              Se färdiga företagspresenter i sortimentet
            </Link>
          </p>
        </div>
        <img
          src={katForetag}
          alt="Graverade trädetaljer och namnbrickor för företag"
          width={1200}
          height={1200}
          fetchPriority="high"
          className="-rotate-1 rounded-3xl border-4 border-ink shadow-lift"
        />
      </div>

      <section className="mt-12">
        <Kicker>det här kan jag göra</Kicker>
        <h2 className="mt-1 font-serif text-4xl tracking-tight">Vad behöver ert team?</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => (
            <div key={o.title} className="card-shop p-7">
              <Sparkles className="h-6 w-6 text-primary-deep" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl">{o.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
          <div>
            <Kicker>så enkelt går det till</Kicker>
            <h2 className="mt-1 font-serif text-3xl tracking-tight">
              Från förfrågan till leverans
            </h2>
          </div>
          <ol className="space-y-5">
            {process.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-serif text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-cream p-7">
        <h2 className="font-serif text-2xl">Tydligt för inköparen</h2>
        <ul className="mt-5 grid gap-3 text-sm md:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
          Volympris sätts efter motiv, material och antal och framgår alltid före beställning.
        </p>
      </section>
    </div>
  );
}
