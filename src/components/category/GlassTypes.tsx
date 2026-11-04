import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import olglas from "@/assets/glas/olglas.jpg";
import vinglas from "@/assets/glas/vinglas.jpg";
import whiskyglas from "@/assets/glas/whiskyglas.jpg";

const TYPES = [
  { label: "Ölglas", match: "ölglas", image: olglas, alt: "AI-visualisering: ölglas med graverat namn på ett ekbord" },
  { label: "Vinglas", match: "vinglas", image: vinglas, alt: "AI-visualisering: två vinglas med graverat datum i levande ljus" },
  { label: "Whiskyglas", match: "whiskyglas", image: whiskyglas, alt: "AI-visualisering: whiskyglas med graverade initialer" },
];

/** Glastyper med prisintervall räknat från Shopify-produkterna – inga hårdkodade priser. */
export function GlassTypes({ products }: { products: ShopifyProduct[] }) {
  const cards = TYPES.map((t) => {
    const prices = products
      .filter((p) => p.node.title.toLocaleLowerCase("sv").includes(t.match))
      .flatMap((p) => p.node.variants?.edges?.map((v: any) => parseFloat(v.node.price.amount)) ?? []);
    return { ...t, min: prices.length ? Math.min(...prices) : null, max: prices.length ? Math.max(...prices) : null };
  }).filter((t) => t.min !== null);
  if (!cards.length) return null;

  return (
    <section aria-labelledby="glastyper-heading" className="mb-10">
      <h2 id="glastyper-heading" className="font-serif text-2xl">Välj glas</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {cards.map((t) => (
          <Link
            key={t.label}
            to="/sortiment"
            search={{ q: t.match, category: "glas" }}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
          >
            <img src={t.image} alt={t.alt} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <h3 className="font-serif text-lg">{t.label}</h3>
              <p className="text-sm text-muted-foreground">
                {t.min === t.max ? formatPrice(t.min!) : `${formatPrice(t.min!)} – ${formatPrice(t.max!)}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
