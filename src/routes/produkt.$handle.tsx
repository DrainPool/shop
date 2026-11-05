import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Kicker } from "@/components/Kicker";
// Personaliseringen (formuläret, förslagen, kassa-logiken) behövs inte förrän
// kunden scrollat ner – dela upp den i ett eget chunk som laddas lazy.
// Ref-diven runt om står kvar utanför Suspensen så IntersectionObserver-
// vakten (som döljer den fasta mobilraden) får ett element direkt.
const ProductCustomizer = lazy(() =>
  import("@/components/ProductCustomizer").then((m) => ({ default: m.ProductCustomizer })),
);
import { ProductGallery, type GalleryBadge } from "@/components/product/ProductGallery";
import { useTrackRecentlyViewed } from "@/components/RecentlyViewed";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { ReviewSection } from "@/components/ReviewSection";
import { PaymentLogos } from "@/components/PaymentLogos";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { productTypes } from "@/lib/categories";
import { PRODUCT_SPECS } from "@/lib/productSpecs";
import {
  fetchProductByHandle,
  fetchProducts,
  formatPrice,
  FREE_SHIPPING_LIMIT,
  getPricing,
} from "@/lib/shopify";
import { SITE_URL, GOOGLE_MAPS_URL } from "@/lib/siteUrls";
import { DELIVERY_SHORT, SKETCH_TIME, SPECIAL_ORDER_TIME, STOCK_ITEM_TIME } from "@/lib/delivery";

const MERGED_KEYRINGS = [
  "nyckelring-med-reg-nummer",
  "nyckelring-i-ek-om-jag-tappar-den-ar-den-inte-min",
  "nyckelring-i-ek-med-djupportratt",
  "nyckelring-med-koordinater-i-rostfritt-stal",
  "nyckelring-i-lader-med-initialer",
];

export const Route = createFileRoute("/produkt/$handle")({
  component: ProductPage,
  // ?gravyr= kommer från presentguiden och förifyller gravyrtexten.
  validateSearch: (search: Record<string, unknown>): { gravyr?: string } =>
    typeof search["gravyr"] === "string" && search["gravyr"].trim()
      ? { gravyr: search["gravyr"].replace(/[<>]/g, "").slice(0, 40) }
      : {},
  // Produkten hämtas i loadern så Product-JSON-LD och meta finns
  // med i SSR-HTML:en – robotar kör inget klient-JS.
  loader: async ({ params }) => {
    const product = await fetchProductByHandle(params.handle);
    if (!product) {
      // Sammanslagna nyckelringar: gamla motivprodukter går till den gemensamma produkten
      if (MERGED_KEYRINGS.includes(params.handle))
        throw redirect({ to: "/produkt/$handle", params: { handle: "nyckelring-i-ek-med-eget-namn" }, statusCode: 301 });
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Produkten hittades inte – Taggat" },
          { name: "robots", content: "noindex" },
        ],
      links: [
        { rel: "canonical", href: url },
      ]
      };
    }
    const node = loaderData.product.node;
    const title = `${node.title} – Taggat`;
    const description = klippMetaBeskrivning(
      node.description ||
        `${node.title} – personligt hantverk, graverat i verkstaden på beställning.`,
    );
    const url = `${SITE_URL}/produkt/${node.handle}`;
    const { price, currency } = getPricing(loaderData.product);
    const variants = node.variants?.edges ?? [];
    const inStock = variants.length === 0 || variants.some((v) => v.node.availableForSale);
    // priceValidUntil ska vara ett framtida datum vid SSR – därför
    // beräknas det här (per anrop), inte vid modul-laddning.
    const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    // Butiksfrågan (PRODUCT_FIELDS i shopify.ts) hämtar ingen sku – läs
    // den ändå försiktigt ifall fältet läggs till, fall tillbaka på
    // handlen som unik artikelidentifikator.
    const sku = (variants[0]?.node as { sku?: string } | undefined)?.sku || node.handle;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: node.title,
      description: node.description,
      sku,
      image: node.images.edges.map((e) => e.node.url),
      brand: { "@type": "Brand", name: "Taggat" },
      offers: {
        "@type": "Offer",
        url,
        price: price.toFixed(2),
        priceCurrency: currency,
        priceValidUntil,
        itemCondition: "https://schema.org/NewCondition",
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(node.images.edges[0]?.node?.url?.startsWith("https://")
          ? [
              { property: "og:image", content: node.images.edges[0].node.url },
              { name: "twitter:image", content: node.images.edges[0].node.url },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl">Produkten hittades inte</h1>
      <p className="mt-3 text-muted-foreground">
        Den här produkten finns inte längre i sortimentet.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Till butiken</Link>
      </Button>
    </div>
  );
}

/**
 * Meta-beskrivning för produktsidan. Shopify-beskrivningar kan innehålla
 * HTML – taggar strippas först (radbrytande taggar byts mot mellanslag så
 * meningarna inte går ihop). Klipper sedan vid senaste meningsgränsen
 * (punkt/utropstecken/frågetecken) före ~160 tecken – aldrig mitt i en
 * mening. Saknas meningsgräns klipps vid senaste mellanslag + ellips.
 */
function klippMetaBeskrivning(beskrivning: string): string {
  const text = beskrivning
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 160) return text;
  const klipp = text.slice(0, 160);
  const meningsgräns = Math.max(
    klipp.lastIndexOf(". "),
    klipp.lastIndexOf("! "),
    klipp.lastIndexOf("? "),
  );
  // +1: ta med skiljetecknet. 40 tecken: alltför tidig gräns ger en
  // bisarr kort beskrivning – hellre ett avklippt ord än en strimma.
  if (meningsgräns >= 40) return klipp.slice(0, meningsgräns + 1).trim();
  const mellanslag = klipp.lastIndexOf(" ");
  return `${(mellanslag > 0 ? klipp.slice(0, mellanslag) : klipp).trimEnd()}…`;
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { gravyr } = Route.useSearch();
  const { product } = Route.useLoaderData();

  // Göm den fasta mobil-radern medan gravyrsektionen syns – annars
  // skymmer den formuläret och sammanfattningen den leder till.
  const [barHidden, setBarHidden] = useState(false);
  const personaliseringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = personaliseringRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setBarHidden(entry?.isIntersecting ?? false),
      {
        rootMargin: "-70px 0px -40% 0px",
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useTrackRecentlyViewed({
    handle: product.node.handle,
    title: product.node.title,
    image: product.node.images?.edges?.[0]?.node?.url,
    price: product.node.priceRange.minVariantPrice.amount,
    currency: product.node.priceRange.minVariantPrice.currencyCode,
  });

  const node = product.node;
  const images = node.images.edges.map((e) => e.node);
  const minPrice = node.priceRange.minVariantPrice;
  const tags = node.tags || [];
  const freeShipping = parseFloat(minPrice.amount) >= FREE_SHIPPING_LIMIT;
  const { price, compare, onSale, currency, discountPercent } = getPricing(product);
  const variants = node.variants?.edges ?? [];
  const inStock = variants.length === 0 || variants.some((v) => v.node.availableForSale);
  // "Från"-prefix när varianterna har olika pris – annars är priset entydigt
  // och prefixet bara stör.
  const fromPrice = new Set(variants.map((v) => v.node.price.amount)).size > 1;

  const typeCategory = productTypes.find((t) => tags.includes(t.tag));
  const spec = typeCategory ? PRODUCT_SPECS[typeCategory.tag] : undefined;

  // Badges på huvudbilden – säljcopy styrd av taggarna, inte bilddata.
  const badges: GalleryBadge[] = [
    ...(tags.includes("bastsaljare")
      ? [{ label: "Mest älskad just nu", tone: "primary" as const }]
      : []),
    ...(tags.includes("nyhet") ? [{ label: "Nyhet i verkstaden", tone: "gold" as const }] : []),
    ...(freeShipping ? [{ label: "Fri frakt ingår", tone: "ink" as const }] : []),
  ];

  // All information som inte behövs för själva köpet samlas efter knappen.
  const produktinformation: FaqItem[] = [
    {
      q: "Om produkten",
      a: <span className="whitespace-pre-line">{node.description}</span>,
    },
    ...(spec
      ? [
          { q: "Material", a: spec.material },
          { q: "Skötsel", a: spec.skotsel },
        ]
      : []),
    {
      q: "Så tillverkas den",
      a: "Allt görs här i verkstaden efter din beställning. Du får en digital skiss på gravyren innan jag börjar, och jag hör av mig om något i texten ser konstigt ut.",
    },
    {
      q: "Leverans & leveranstid",
      a: `Du får en digital skiss ${SKETCH_TIME}. Specialbeställningar tillverkas ${SPECIAL_ORDER_TIME}, medan lagervaror med namn eller enkel gravyr hanteras ${STOCK_ITEM_TIME}. Därefter skickas beställningen spårbart med PostNord. Fri frakt inom Sverige vid köp över ${FREE_SHIPPING_LIMIT} kr.`,
    },
    {
      q: "Retur & reklamation",
      a: (
        <>
          Personligt tillverkade varor har ingen ångerrätt, eftersom de görs unikt till dig. Blir
          något fel på min sida gör jag om den – utan diskussion.{" "}
          <Link to="/retur" className="font-semibold text-primary-deep hover:underline">
            Läs om retur och garanti
          </Link>
        </>
      ),
    },
    {
      q: "Beställer du 10 eller fler?",
      a: (
        <>
          Till företag, bröllop, föreningar och lag gör jag gärna större upplagor. Skriv hur många
          du behöver och vilken text, så återkommer jag med en offert.{" "}
          <Link to="/foretag" className="font-semibold text-primary-deep hover:underline">
            Begär offert
          </Link>
        </>
      ),
    },
    ...(!spec
      ? [{ q: "Skötsel", a: "Skötselråd för just din produkt följer med beställningen." }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 pb-28 md:px-5 md:py-8 md:pb-10">
      {/* Synlig brödsmula + BreadcrumbList-schema (JSON-LD sätts av
          komponenten) – Google får stig: Butik › Kategori › Produkt. */}
      {typeCategory && (
        <Breadcrumbs
          items={[
            { label: "Butik", to: "/sortiment" },
            { label: typeCategory.title, slug: typeCategory.slug },
            { label: node.title },
          ]}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
        {/* Galleriet följer med när köpkolumnen scrollar (sticky inom
            gridytan – self-start behövs för att sticky överhuvudtaget
            ska kunna glida i raden). */}
        <div className="min-w-0 md:sticky md:top-20 md:self-start">
          <ProductGallery images={images} title={node.title} badges={badges} tags={tags} handle={node.handle} />
        </div>

        <div className="min-w-0">
          <h1 className="font-serif text-3xl leading-tight tracking-tight text-balance md:text-4xl">
            {node.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <p className="font-serif text-3xl tabular-nums text-primary-deep">
              {fromPrice && "Från "}
              {formatPrice(price, currency)}
            </p>
            {onSale && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(compare, currency)}
                </span>
                <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  Du sparar {discountPercent}%
                </span>
              </>
            )}
          </div>
          <p className="mt-2 text-sm font-medium text-primary-deep">
            {inStock ? (
              <span>Gravyr ingår · skiss {SKETCH_TIME} · snabb tillverkning</span>
            ) : (
              <span className="text-muted-foreground">
                Tillfälligt slut – hör av dig, så säger jag när nästa omgång är klar
              </span>
            )}
          </p>

          {/* scroll-mt-28: sticky headern (~70 px) täcker annars sektionens
              topp när den fasta mobilraden hoppar hit. */}
          <div id="personalisering" ref={personaliseringRef} className="scroll-mt-28">
            <Suspense
              fallback={
                /* Minsta höjd ≈ formulärets – annars hoppar layouten när
                   chunken landar (CLS i mobilradens dolda/visade läge). */
                <div className="mt-8 min-h-72 animate-pulse rounded-2xl border border-border bg-card/60" />
              }
            >
              <ProductCustomizer product={product} initialText={gravyr ?? ""} />
            </Suspense>
            <p className="mt-4 text-sm text-muted-foreground">
              Tillverkas i min verkstad i Aneby, Småland.{" "}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-deep hover:underline"
              >
                Hitta verkstaden på Google
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-6">
        <h2 className="font-serif text-2xl">Produktinformation</h2>
        <FaqAccordion items={produktinformation} />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ReviewSection reviews={[]} />
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
          Tryggt att handla – välj betalsätt i kassan
        </p>
        <PaymentLogos className="justify-center" />
      </div>

      <RelatedProducts tags={product.node.tags || []} handle={handle} />

      {/* Fast köprad på mobil – doljs när gravyrsektionen är synlig,
          safe-area skyddar knappen från iPhonens hemfältssvep. */}
      {!barHidden && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-lift backdrop-blur md:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{node.title}</span>
              <span className="flex items-baseline gap-2">
                <span className="text-sm font-semibold tabular-nums text-primary-deep">
                  {fromPrice && "Från "}
                  {formatPrice(price, currency)}
                </span>
                {onSale && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(compare, currency)}
                  </span>
                )}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {inStock ? DELIVERY_SHORT : "Tillfälligt slut"}
              </span>
            </span>
            <Button asChild size="lg" className="rounded-full">
              <a href="#personalisering">Personalisera &amp; köp</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedProducts({ tags, handle }: { tags: string[]; handle: string }) {
  const typeTag = productTypes.find((t) => tags.includes(t.tag));
  const tag = typeTag?.tag || tags[0];

  const { data = [] } = useQuery({
    queryKey: ["related", tag],
    queryFn: () => fetchProducts(8, tag ? `tag:${tag}` : undefined),
    enabled: Boolean(tag),
  });

  const related = data.filter((p) => p.node.handle !== handle).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <Kicker>mer i samma stil</Kicker>
          <h2 className="mt-1 font-serif text-3xl tracking-tight">
            {typeTag ? typeTag.title : "Liknande presenter"}
          </h2>
        </div>
        {/* CTA tillbaka till kategorin – det interna flödet ska inte
            behöva gå via headern. */}
        {typeTag && (
          <Link
            to="/kategori/$slug"
            params={{ slug: typeTag.slug }}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary-deep hover:underline"
          >
            Se hela kategorin
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
}
