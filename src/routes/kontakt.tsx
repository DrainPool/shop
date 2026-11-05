import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircleQuestion } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";
import { Button } from "@/components/ui/button";
import { DELIVERY_PROMISE } from "@/lib/delivery";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | Taggat" },
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
      links: [
        { rel: "canonical", href: `${SITE_URL}/kontakt` },
      ]
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ namn: "", epost: "", meddelande: "" });
  const [skickat, setSkickat] = useState(false);

  function skicka(e: React.FormEvent) {
    e.preventDefault();
    // Ingen backend än – förifyllt mail ger mig namn, epost och frågan
    // i ett svep, och kunden slipper skriva om allt.
    const subject = encodeURIComponent(`Fråga till Taggat från ${form.namn || "besökare"}`);
    const body = encodeURIComponent(
      `Hej!\n\n${form.meddelande}\n\n— ${form.namn}\nSvara gärna till: ${form.epost}`,
    );
    window.location.href = `mailto:taggat@linsochlager.net?subject=${subject}&body=${body}`;
    setSkickat(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />

      <Kicker className="mt-8">jag finns bara ett mejl bort</Kicker>
      <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Kontakt</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Fråga om en beställning, bolla en presentidé eller bara säga hej – jag svarar personligen,
        aldrig ett callcenter.
      </p>

      <div className="card-shop mt-8 p-8">
        <h2 className="font-serif text-2xl">Skriv till mig direkt</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fyll i rutorna – ditt e-postprogram öppnas med allt förifyllt, klart att skickas.
        </p>
        <form className="mt-6 space-y-4" onSubmit={skicka}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Ditt namn</span>
              <input
                type="text"
                required
                value={form.namn}
                onChange={(e) => setForm({ ...form, namn: e.target.value })}
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary-deep focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Anna Andersson"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Din e-post</span>
              <input
                type="email"
                required
                value={form.epost}
                onChange={(e) => setForm({ ...form, epost: e.target.value })}
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary-deep focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="anna@example.se"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Vad vill du fråga om?</span>
            <textarea
              required
              rows={5}
              value={form.meddelande}
              onChange={(e) => setForm({ ...form, meddelande: e.target.value })}
              className="mt-1 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm transition-colors focus:border-primary-deep focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Hej! Jag undrar om…"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" className="transition-[color,background-color,transform] duration-200 hover:scale-[1.02] active:scale-95 motion-reduce:transition-none">
              Skicka frågan
            </Button>
            {skickat && (
              <p className="text-sm text-primary-deep" role="status">
                Ditt e-postprogram öppnades – tryck på skicka där så når frågan mig!
              </p>
            )}
          </div>
        </form>
      </div>

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
