import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Clock, Truck, MapPin } from "lucide-react";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";
import { DELIVERY_PROMISE, SKETCH_TIME, SPECIAL_ORDER_TIME, STOCK_ITEM_TIME } from "@/lib/delivery";

export const Route = createFileRoute("/frakt-leverans")({
  head: () => ({
    meta: [
      { title: "Frakt & leveranstid | Taggat" },
      {
        name: "description",
        content:
          "Så levererar jag dina personliga produkter: fraktkostnader, tillverkningstid och leveransalternativ hos Taggat.",
      },
      { property: "og:title", content: "Frakt & leveranstid | Taggat" },
      {
        property: "og:description",
        content: "Fraktkostnader, tillverkningstid och leveransalternativ hos Taggat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/frakt-leverans` },
      ]
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Breadcrumbs items={[{ label: "Frakt & leveranstid" }]} />
      <Kicker className="mt-6">Bra att veta</Kicker>
      <h1 className="mt-2 font-serif text-4xl">Frakt & leveranstid</h1>
      <p className="mt-4 text-muted-foreground">
        Allt hos Taggat tillverkas för hand efter din beställning. Därför består leveranstiden
        alltid av två delar: <strong>tillverkningstid</strong> + <strong>frakttid</strong>.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <Truck className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl">Frakt</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Fri frakt på beställningar över {FREE_SHIPPING_LIMIT} kr</li>
            <li>• Brev och spårbar paketleverans via PostNord</li>
            <li>• Exakt fraktkostnad visas i kassan innan betalning</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <Clock className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl">Leveranstid</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Digital skiss: {SKETCH_TIME}</li>
            <li>• Specialbeställningar: tillverkas {SPECIAL_ORDER_TIME}</li>
            <li>• Lagervaror med namn eller enkel gravyr: hanteras {STOCK_ITEM_TIME}</li>
            <li>• Frakt inom Sverige: 2–4 arbetsdagar</li>
            <li>• Vid brådska (t.ex. bröllop eller dop) – hör av dig, jag löser det ofta!</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <Package className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl">Emballage</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Varje beställning packas omsorgsfullt – smycken i presentask, gravyrer och 3D-utskrifter
            i skyddande emballage. Klart att ge bort direkt.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <MapPin className="h-6 w-6 text-primary-deep" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-xl">Leveransområde</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Jag levererar i hela Sverige. Vid beställning fyller du i din fraktadress direkt i
            kassan och ser exakt fraktkostnad innan du betalar.
          </p>
        </section>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">{DELIVERY_PROMISE}</p>

      <p className="mt-10 text-sm text-muted-foreground">
        Frågor om din leverans? Maila{" "}
        <a href="mailto:taggat@linsochlager.net" className="text-primary-deep underline">
          taggat@linsochlager.net
        </a>{" "}
        så återkommer jag snabbast möjligt. Se även villkoren för{" "}
        <Link to="/retur" className="text-primary-deep underline">
          retur & reklamation
        </Link>{" "}
        och{" "}
        <Link to="/garanti" className="text-primary-deep underline">
          garanti
        </Link>
        .
      </p>
    </article>
  );
}
