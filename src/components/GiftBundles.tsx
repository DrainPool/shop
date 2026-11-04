import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Gift, PackageCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/home/Reveal";
import { Kicker } from "@/components/Kicker";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";

/**
 * Presentpaket – höjer snittordern genom att föreslå kombinationer
 * i stället för en ensam liten produkt.
 *
 * Hyllkänsla: tre täta kort i en rad (max-w-7xl), en gemensam
 * vänsterställd rubrikrad, målgruppsordet som font-inscription-etikett med
 * guld-understreck som drar fram vid hover, och innehållet som en
 * "innehållsförteckning" (guld-tick + hairline-rader i stället för
 * punktlista). Hover "packar upp" paketet: .card-shop lyfter kortet medan
 * lista och knappar glider in ett par pixlar.
 *
 * IdeaBand (egna designer + foto-cross-sell) renderas som en avslutande
 * del i samma kapitel – färre, större sektioner på startsidan.
 *
 * ÄRLIGHETS-RAM: inga påhittade fasta paketpriser. Varje paket pekar på
 * riktiga kategorier i butiken; slutpriset sätter jag i offerten (eller
 * som en riktig paketprodukt i Shopify när den finns).
 */

type Bundle = {
  icon: typeof Gift;
  kicker: string;
  title: string;
  text: string;
  includes: string[];
  slug: string;
};

const BUNDLES: Bundle[] = [
  {
    icon: Sparkles,
    kicker: "till stora dagen",
    title: "Bröllopspaketet",
    text: "Allt det graverade till bröllopet i en och samma beställning – samma stil och typsnitt hela vägen.",
    includes: ["Graverade toastglas", "Ringask i trä", "Namnbrickor till borden"],
    slug: "brollop",
  },
  {
    icon: Gift,
    kicker: "till den nya lilla",
    title: "Doppaketet",
    text: "Smycket att spara, asken att förvara minnena i och namnskylten till rummet.",
    includes: ["Graverat smycke", "Minnesask", "Namnskylt"],
    slug: "dop",
  },
  {
    icon: PackageCheck,
    kicker: "till kontoret",
    title: "Företagspaketet",
    text: "Namnbrickor till personalen och personliga gåvor till kunderna – med din logotyp graverad.",
    includes: ["Namnbrickor", "Kundgåvor med logotyp", "Skyltar"],
    slug: "foretag",
  },
];

export function GiftBundles() {
  // Finns paketen som riktiga produkter i butiken (tagg: presentpaket) visas de
  // med bild, innehåll och verkligt Shopify-pris. Saknas de behålls
  // offertkorten nedan – aldrig ett påhittat paketpris.
  const [packages, setPackages] = useState<ShopifyProduct[]>([]);
  useEffect(() => {
    let alive = true;
    fetchProducts(6, "tag:presentpaket")
      .then((list) => {
        if (alive) setPackages(list ?? []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      {/* En gemensam rubrikrad, vänsterställd: kicker + rubrik till vänster,
          ingressen som egen kolumn till höger (samma rhythm som ProcessSection). */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <Kicker>paket som hör ihop</Kicker>
          <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">Presentpaket</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-md text-muted-foreground lg:pb-1">
            Ska du överraska ordentligt blir det finare – och ofta snålsammare – att ge flera saker
            i samma stil. Jag håller typsnitt och gravyr från första till sista detaljen, packar
            allt som ett paket och hör av mig med ett samlat pris innan jag sätter igång.
          </p>
        </Reveal>
      </div>

      {packages.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => {
            const node = p.node;
            const image = node.images?.edges?.[0]?.node;
            const price = node.priceRange?.minVariantPrice;
            return (
              <Reveal key={node.id} delay={i * 100} className="h-full">
                <Link
                  to="/produkt/$handle"
                  params={{ handle: node.handle }}
                  className="card-shop group flex h-full flex-col overflow-hidden"
                >
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || node.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-2xl">{node.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">
                      {node.description}
                    </p>
                    <p className="mt-auto pt-4 font-semibold tabular-nums">
                      {price && formatPrice(price.amount, price.currencyCode)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-deep">
                      Personifiera paketet <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(packages.length > 0 ? [] : BUNDLES).map((b, i) => (
          <Reveal key={b.title} delay={i * 100} className="h-full">
            <div className="card-shop group flex h-full flex-col p-5">
              {/* Ikonen i samma cream-cirkel som CategoryCard – enhetlig kortgrammatik */}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream">
                <b.icon
                  className="h-5 w-5 text-primary-deep motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-rotate-6"
                  aria-hidden="true"
                />
              </span>
              {/* Målgruppsordet som graverad etikett – guld-understrecket drar
                  fram när paketet hoveras (statisk under motion-reduce). */}
              <p className="mt-3 font-inscription text-[11px] text-primary-deep">
                <span className="relative inline-block">
                  {b.kicker}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 motion-reduce:scale-x-100"
                  />
                </span>
              </p>
              <h3 className="mt-2 font-serif text-2xl">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
              {/* Innehållsförteckning: tick + hairline-rader i stället för punktlista */}
              <ul className="mt-4 text-sm motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5">
                {b.includes.map((item, j) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 border-t border-border/70 py-2 first:border-t-0 first:pt-0"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5">
                <Button asChild size="sm" className="rounded-full px-4">
                  <Link to="/kategori/$slug" params={{ slug: b.slug }}>
                    Se produkterna <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full px-4">
                  <Link to="/kontakt">Be om paketpris</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
