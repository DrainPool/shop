import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Heart, Mail, MapPin, MessageCircleQuestion } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

const faq = [
  {
    q: "Hur snabbt får jag svar?",
    a: "Inom 24 timmar på vardagar – oftast mycket snabbare. Beställer du till ett nära förestående datum, skriv det tydligt i ämnesraden så prioriterar jag.",
  },
  {
    q: "Kan jag beställa något som inte finns i butiken?",
    a: "Ja! Beskriv din idé – material, motiv och tillfälle. Du får ett förslag med digital skiss och pris innan du bestämmer dig.",
  },
  {
    q: "Jag har stavat fel i min beställning – vad gör jag?",
    a: "Skriv direkt! Om tillverkningen inte påbörjats ändrar jag gratis. Har du godkänt skissen och jag börjat gravera kan jag tyvärr inte ändra – men hör ändå av dig, jag hittar ofta en lösning.",
  },
];

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | TaggaDet" },
      { rel: "canonical", href: `${SITE_URL}/kontakt` },
      {
        name: "description",
        content:
          "Kontakta TaggaDet i Aneby: e-post, svarstider och företagsuppgifter. Frågor om beställning, skisser eller egna presentidéer – hör av dig.",
      },
      { property: "og:title", content: "Kontakt | TaggaDet" },
      {
        property: "og:description",
        content: "Kontakta TaggaDet – svar inom 24 timmar vardagar. E-post, adress och svarstider.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />

      <Kicker className="mt-8">jag finns bara ett mejl bort</Kicker>
      <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Kontakt</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Fråga om en beställning, bolla en presentidé eller bara säga hej – jag svarar personligen,
        aldrig ett callcenter.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="card-shop p-8">
          <Mail className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">E-post</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Snabbast svar – och bäst för skisser och bilder.
          </p>
          <a
            href="mailto:hej@linsochlager.se?subject=Fr%C3%A5ga%20fr%C3%A5n%20webshopen"
            className="mt-4 inline-block font-semibold text-primary-deep hover:underline"
          >
            hej@linsochlager.se
          </a>
        </div>

        <div className="card-shop p-8">
          <Clock className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">Svarstider</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Vardagar: svar inom 24 timmar
            <br />
            Helger: svar kan dröja till måndagen
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Läs gärna om{" "}
            <Link to="/tillverkningsprocessen" className="text-primary-deep hover:underline">
              hur din produkt tillverkas
            </Link>{" "}
            – från skiss till presentklart paket.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tillverkning sker veckovis – beställ innan söndag 23:59.
          </p>
        </div>

        <div className="card-shop p-8">
          <MapPin className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">Verkstaden</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TaggaDet, Aneby i Småland
            <br />
            org.nummer: <span className="tabular-nums">870624-2453</span>
            <br />
            Besök endast enligt överenskommelse.
          </p>
        </div>

        <div className="card-shop p-8">
          <MessageCircleQuestion className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">Snabbast hjälp</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link to="/vanliga-fragor" className="text-primary-deep hover:underline">
              Vanliga frågor
            </Link>{" "}
            ·{" "}
            <Link to="/frakt-leverans" className="text-primary-deep hover:underline">
              Frakt &amp; leverans
            </Link>{" "}
            ·{" "}
            <Link to="/tillverkningsprocessen" className="text-primary-deep hover:underline">
              Tillverkningsprocessen
            </Link>{" "}
            ·{" "}
            <Link to="/retur" className="text-primary-deep hover:underline">
              Retur &amp; reklamation
            </Link>{" "}
            ·{" "}
            <Link to="/garanti" className="text-primary-deep hover:underline">
              Garanti
            </Link>
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl tracking-tight">Vanliga frågor</h2>
        <div className="mt-5 space-y-4">
          {faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card shadow-soft"
            >
              <summary className="cursor-pointer list-none p-6 font-serif text-lg">
                {f.q}
                <span className="float-right text-primary-deep transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-cream p-8 md:p-10">
        <Heart className="h-6 w-6 text-primary-deep" aria-hidden="true" />
        <h2 className="mt-3 font-serif text-2xl tracking-tight">Redan klar över din idé?</h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Skicka den direkt så startar jag med en skiss – du får förslaget innan något graveras.
        </p>
        <a
          href="mailto:hej@linsochlager.se?subject=Min%20presentid%C3%A9"
          className="mt-5 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Skriv till mig
        </a>
      </section>
    </div>
  );
}
