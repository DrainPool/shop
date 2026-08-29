import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Clock, Truck, MapPin } from "lucide-react";

export const Route = createFileRoute("/frakt-leverans")({
  head: () => ({
    meta: [
      { title: "Frakt & leveranstid – Lins & Lager" },
      {
        name: "description",
        content:
          "Så levererar vi dina personliga produkter: fraktkostnader, tillverkningstid och leveransalternativ hos Lins & Lager.",
      },
      { property: "og:title", content: "Frakt & leveranstid – Lins & Lager" },
      {
        property: "og:description",
        content: "Fraktkostnader, tillverkningstid och leveransalternativ hos Lins & Lager.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-hand text-2xl text-primary">Bra att veta</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Frakt & leveranstid</h1>
      <p className="mt-4 text-muted-foreground">
        Allt hos Lins &amp; Lager tillverkas för hand efter din beställning. Därför består
        leveranstiden alltid av två delar: <strong>tillverkningstid</strong> +{" "}
        <strong>frakttid</strong>.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <Truck className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl font-semibold">Frakt</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Fri frakt på beställningar över 800 kr</li>
            <li>• PostNord brev/varubrev: 39 kr</li>
            <li>• Spårbar paketleverans: 69 kr</li>
            <li>• Fraktalternativ väljs i kassan innan betalning</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl font-semibold">Leveranstid</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Tillverkning: 3–7 arbetsdagar</li>
            <li>• Frakt inom Sverige: 2–4 arbetsdagar</li>
            <li>• Totalt: räkna med 5–11 arbetsdagar</li>
            <li>• Vid brådska (t.ex. bröllop eller dop) – hör av dig, vi löser det ofta!</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <Package className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl font-semibold">Emballage</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Varje beställning packas omsorgsfullt – smycken i presentask, gravyrer och
            3D-utskrifter i skyddande emballage. Klart att ge bort direkt.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl font-semibold">Leveransområde</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Vi levererar i hela Sverige. Vid beställning fyller du i din fraktadress direkt i
            kassan och ser exakt fraktkostnad innan du betalar.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Frågor om din leverans? Maila{" "}
        <a href="mailto:hej@linsochlager.se" className="text-primary underline">
          hej@linsochlager.se
        </a>{" "}
        så återkommer vi snabbast möjligt. Se även våra villkor för{" "}
        <Link to="/retur" className="text-primary underline">
          retur & reklamation
        </Link>{" "}
        och{" "}
        <Link to="/garanti" className="text-primary underline">
          garanti
        </Link>
        .
      </p>
    </article>
  );
}
