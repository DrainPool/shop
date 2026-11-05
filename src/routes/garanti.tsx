import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Gem, Wrench } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

export const Route = createFileRoute("/garanti")({
  head: () => ({
    meta: [
      { title: "Garanti | Taggat" },
      {
        name: "description",
        content:
          "Kvalitetsgaranti på alla handgjorda produkter från Taggat – material, gravyr och utförande.",
      },
      { property: "og:title", content: "Garanti | Taggat" },
      {
        property: "og:description",
        content:
          "Kvalitetsgaranti på material, gravyr och utförande – alla produkter kontrolleras innan leverans.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/garanti` },
      ]
  }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Breadcrumbs items={[{ label: "Garanti" }]} />
      <Kicker className="mt-6">Mitt löfte</Kicker>
      <h1 className="mt-2 font-serif text-4xl">Garanti</h1>
      <p className="mt-4 text-muted-foreground">
        Varje produkt som lämnar verkstaden kontrolleras för hand innan den packas. Står jag inte
        bakom den, skickar jag den inte.
      </p>

      <div className="mt-10 space-y-6">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-primary-deep" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-xl">2 års garanti på utförande</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Jag garanterar att gravyrer, 3D-utskrifter och montering håller för normal
                användning i minst 2 år. Lossnar en gravyrplåt, spricker en 3D-utskrift vid normal
                hantering eller släpper en fog – lagar jag eller tillverkar om utan kostnad.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <Gem className="mt-1 h-6 w-6 shrink-0 text-primary-deep" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-xl">Materialgaranti</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Jag använder noga utvalda material – äkta trä, vegetabiliskt garvat läder, rostfritt
                stål och silver. Trä och läder är naturmaterial och kan variera i ådring och nyans;
                det är en del av charmen och räknas inte som fel. Synliga materialdefekter täcks
                alltid av garantin.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <Wrench className="mt-1 h-6 w-6 shrink-0 text-primary-deep" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-xl">Vad garantin inte täcker</h2>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Normalt slitage (repor, patina på läder, blekning)</li>
                <li>• Skador orsakade av felaktig skötsel eller olyckshändelse</li>
                <li>• Textfel som står kvar i den skiss du godkänt</li>
                <li>• Produktens naturliga åldring</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Behöver du nyttja garantin? Maila{" "}
        <a href="mailto:taggat@linsochlager.net" className="text-primary-deep underline">
          taggat@linsochlager.net
        </a>{" "}
        med ordernummer och foto. Se även{" "}
        <Link to="/retur" className="text-primary-deep underline">
          retur & reklamation
        </Link>{" "}
        och{" "}
        <Link to="/frakt-leverans" className="text-primary-deep underline">
          frakt & leveranstid
        </Link>
        .
      </p>
    </article>
  );
}
