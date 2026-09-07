import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Cookie, Lock, Mail, Truck, UserCheck } from "lucide-react";

export const Route = createFileRoute("/integritetspolicy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy – Lins & Lager" },
      {
        name: "description",
        content:
          "Hur Lins & Lager behandlar dina personuppgifter: vilka uppgifter som samlas in, varför, hur länge de sparas och dina rättigheter enligt GDPR.",
      },
      { property: "og:title", content: "Integritetspolicy – Lins & Lager" },
      {
        property: "og:description",
        content:
          "Hur dina personuppgifter behandlas när du handlar hos Lins & Lager – kortfattat och begripligt.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Sammanfattning först",
    body: [
      "Jag behandlar bara de uppgifter som behövs för att du ska kunna beställa, och jag skickar aldrig nyhetsbrev eller delar dina uppgifter med tredje part för marknadsföring. Betalningen hanteras helt av Klarna och Shopify — jag ser aldrig ditt kortnummer.",
    ],
  },
  {
    title: "Vilka uppgifter samlas in?",
    body: [
      "Vid beställning: namn, leveransadress, e-post, telefonnummer och dina personliga texter till gravyren (t.ex. namn och datum) — det behövs för att kunna tillverka och leverera din produkt.",
      "Vid kontakt via e-post: de uppgifter du själv väljer att skicka i meddelandet.",
    ],
  },
  {
    title: "Varför (rättslig grund)",
    body: [
      "Uppgifterna används för att uppfylla köpeavtalet med dig — tillverka, packa och leverera din beställning, samt för bokföring enligt bokföringslagen (redovisningskrav). Detta kallas 'avtalsuppfyllelse' respektive 'rättslig förpliktelse' i GDPR.",
      "Om du skickar bilder eller historier som jag får i uppdrag att gravera gör jag detta enligt ditt samtycke; uppgifterna används bara för din beställning.",
    ],
  },
  {
    title: "Klarna & Shopify",
    body: [
      "Vid betalning via Klarna behandlar Klarna Bank AB (Sveavägen 46, Stockholm) dina uppgifter, bl.a. för identifikation och riskbedömning. Läs Klarnas integritetspolicy på klarna.se för fullständig information.",
      "Webshoppen drivs med teknisk plattform Shopify International Ltd. Dina orderuppgifter lagras hos Shopify, enligt deras GDPR-policy. Läs mer på shopify.com/legal/privacy.",
    ],
  },
  {
    title: "Hur länge sparas uppgifterna?",
    body: [
      "Orderuppgifter sparas i 7 år enligt bokföringslagen. Dina gravyrtexter och din godkända skiss sparas med beställningen — detta för att du ska kunna beställa samma produkt igen eller reklamera med underlag. E-postkorrespondens sparas tills ärendet är avslutat.",
    ],
  },
  {
    title: "Dina rättigheter",
    body: [
      "Du har rätt att få veta vilka uppgifter jag har om dig (registerutdrag), begära rättelse av felaktiga uppgifter och begära radering av uppgifter jag inte har laglig skyldighet att spara. Kontakta mig på e-post nedan — jag svarar alltid inom 30 dagar, oftast mycket snabbare.",
      "Om du är missnöjd med min behandling av dina personuppgifter kan du klagomälra till Integritetsskyddsmyndigheten (IMY), imy.se.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Webshoppen använder tekniska cookies som krävs för att varukorgen och kassan ska fungera. Inga spårande cookies för reklam används, och ingen cookie-samtyckesruta behövs därför förutom Shopifys standardlösning.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Integritetspolicy" }]} />

      <p className="mt-8 font-script text-3xl text-primary-deep">dina uppgifter är skyddade</p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        Integritetspolicy
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Senast uppdaterad: augusti 2026. Kort, begripligt och utan juridik-jargong.
      </p>

      <div className="mt-10 space-y-4">
        {sections.map((s) => (
          <details
            key={s.title}
            className="group rounded-2xl border border-border bg-card shadow-soft"
            open={s.title.startsWith("Sammanfattning")}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-serif text-xl font-bold">
              {s.title}
              <span className="text-primary-deep transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="space-y-3 px-7 pb-6">
              {s.body.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>

      <section className="mt-12 rounded-3xl bg-cream p-8 text-center">
        <Mail className="mx-auto h-6 w-6 text-primary-deep" aria-hidden="true" />
        <p className="mt-3 text-muted-foreground">
          Frågor om dina uppgifter? Skriv till mig — jag ansvarar för dem.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hej@linsochlager.se"
            className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            hej@linsochlager.se
          </a>
          <Link
            to="/kontakt"
            className="inline-block rounded-full border-2 border-border px-6 py-3 font-semibold transition-colors hover:border-primary"
          >
            Kontaktsidan
          </Link>
        </div>
      </section>
    </div>
  );
}
