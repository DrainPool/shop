import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircleQuestion } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";
import { DELIVERY_PROMISE } from "@/lib/delivery";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | Taggat" },
      { rel: "canonical", href: `${SITE_URL}/kontakt` },
      {
        name: "description",
        content:
          "Kontakta Taggat i Aneby: e-post, svarstider och företagsuppgifter. Frågor om beställning, skisser eller egna presentidéer – hör av dig.",
      },
      { property: "og:title", content: "Kontakt | Taggat" },
      {
        property: "og:description",
        content: "Kontakta Taggat – svar inom 24 timmar vardagar. E-post, adress och svarstider.",
      },
      { property: "og:type", content: "website" },
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
            href="mailto:taggat@linsochlager.net?subject=Fr%C3%A5ga%20till%20Taggat"
            className="mt-4 inline-block font-semibold text-primary-deep hover:underline"
          >
            taggat@linsochlager.net
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
          <p className="mt-3 text-sm text-muted-foreground">{DELIVERY_PROMISE}</p>
        </div>

        <div className="card-shop p-8">
          <MapPin className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">Verkstaden</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Taggat, Aneby i Småland
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
    </div>
  );
}
