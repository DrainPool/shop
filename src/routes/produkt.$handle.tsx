import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
// Personaliseringen (formuläret, förslagen, kassa-logiken) behövs inte förrän
// kunden scrollat ner – dela upp den i ett eget chunk som laddas lazy.
// Ref-diven runt om står kvar utanför Suspensen så IntersectionObserver-
// vakten (som döljer den fasta mobilraden) får ett element direkt.
const ProductCustomizer = lazy(() =>
  import("@/components/ProductCustomizer").then((m) => ({ default: m.ProductCustomizer })),
);
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery, type GalleryBadge } from "@/components/product/ProductGallery";
import { SpecBand } from "@/components/product/SpecBand";
import { RecentlyViewed, useTrackRecentlyViewed } from "@/components/RecentlyViewed";
import { WishlistHeart } from "@/components/WishlistHeart";
import { PaymentLogos } from "@/components/PaymentLogos";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { productTypes } from "@/lib/categories";
import { addWorkdays, PRODUCT_SPECS } from "@/lib/productSpecs";
import {
  fetchProductByHandle,
  fetchProducts,
  formatPrice,
  FREE_SHIPPING_LIMIT,
  getPricing,
} from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/produkt/$handle")({
  component: ProductPage,
  // Produkten hämtas i loadern så Product-JSON-LD och meta finns
  // med i SSR-HTML:en – robotar kör inget klient-JS.
  loader: async ({ params }) => {
    const product = await fetchProductByHandle(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Produkten hittades inte – TaggaDet" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const node = loaderData.product.node;
    const title = `${node.title} – TaggaDet`;
    const description = (
      node.description || `${node.title} – personligt hantverk, graverat för hand på beställning.`
    ).slice(0, 158);
    const url = `${SITE_URL}/produkt/${node.handle}`;
    const { price, currency } = getPricing(loaderData.product);
    const variants = node.variants?.edges ?? [];
    const inStock = variants.length === 0 || variants.some((v) => v.node.availableForSale);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: node.title,
      description: node.description,
      image: node.images.edges.map((e) => e.node.url),
      brand: { "@type": "Brand", name: "TaggaDet" },
      offers: {
        "@type": "Offer",
        url,
        price: price.toFixed(2),
        priceCurrency: currency,
        availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { rel: "canonical", href: url },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(node.images.edges[0]?.node?.url
          ? [{ property: "og:image", content: node.images.edges[0].node.url }]
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
      <h1 className="font-serif text-3xl font-bold">Produkten hittades inte</h1>
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
 * "Beställer du idag är den hos dig ca {datum}" – räknas ut på klienten
 * (ogiltigt på servern, och vi vill inte riskera SSR-mismatch).
 * 7 arbetsdagar tillverkning + 3 dagar spårbar frakt.
 */
function DeliveryEstimate() {
  const [dateText, setDateText] = useState<string | null>(null);
  useEffect(() => {
    const delivery = addWorkdays(new Date(), 7);
    delivery.setDate(delivery.getDate() + 3);
    setDateText(
      new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long" }).format(delivery),
    );
  }, []);
  // Reservera radens höjd medan datumet räknas ut på klienten – annars
  // knuffas allt under sammanfattningen ner ett stycke när texten dyker
  // upp efter mount (layout-shift/CLS).
  if (!dateText) return <span className="mt-1 block min-h-6" aria-hidden="true" />;
  return (
    <span className="mt-1 block text-muted-foreground">
      Beställer du idag är den hos dig ca den {dateText}.
    </span>
  );
}

/** Dela-knapp – Web Share API på mobil, kopierad länk som fallback. */
function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Avbröts av användaren – inget att rapportera
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Klippminnet otillgängligt – länken syns i adressfältet ändå
    }
  };
  return (
    <Button variant="outline" size="sm" className="rounded-full" onClick={share}>
      <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
      {copied ? "Länk kopierad!" : "Dela presentidén"}
    </Button>
  );
}

function ProductPage() {
  const { handle } = Route.useParams();
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

  // Köpnära frågor – samma mekanism som vanliga-fragor-sidan.
  // Material och skötsel ligger i SpecBand ovanför när produkttypen
  // har en spec – FAQ:n fyller i det som saknas i stället för att upprepa.
  const braAttVeta: FaqItem[] = [
    {
      q: "Så tillverkas den",
      a: "Allt görs här i verkstaden efter din beställning. Du får en digital skiss på gravyren innan jag börjar, och jag hör av mig om något i texten ser konstigt ut.",
    },
    {
      q: "Leverans & leveranstid",
      a: `Tillverkning 3–7 arbetsdagar, därefter spårbar frakt med PostNord. Fri frakt inom Sverige vid köp över ${FREE_SHIPPING_LIMIT} kr. Har du ett datum som måste hållas – skriv det i beställningen.`,
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
    ...(spec
      ? []
      : [
          {
            q: "Skötselråd",
            a: "Trä torkas av för hand och oljas då och då. Smycken tål vardag men mår bäst utan parfym och klor. Läder blir vackrare med åren.",
          },
        ]),
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 pb-28 md:pb-12">
      <Breadcrumbs
        items={[
          { label: "Sortiment", to: "/sortiment" },
          ...(typeCategory ? [{ label: typeCategory.title, slug: typeCategory.slug }] : []),
          { label: node.title },
        ]}
      />
      <Link
        to="/sortiment"
        className="mt-4 mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-deep"
      >
        <ArrowLeft className="h-4 w-4" /> Tillbaka till sortimentet
      </Link>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {/* Galleriet följer med när köpkolumnen scrollar (sticky inom
            gridytan – self-start behövs för att sticky överhuvudtaget
            ska kunna glida i raden). */}
        <div className="md:sticky md:top-24 md:self-start">
          <ProductGallery images={images} title={node.title} badges={badges} />
        </div>

        <div>
          <h1 className="font-serif text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl">
            {node.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <p className="font-serif text-3xl font-bold tabular-nums text-primary-deep">
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
          <p className="mt-2 text-sm font-medium">
            {inStock ? (
              <span className="text-primary-deep">
                Plats kvar i veckans tillverkning – tillverkas efter din beställning
              </span>
            ) : (
              <span className="text-muted-foreground">
                Tillfälligt slut – hör av dig så bokar vi in nästa tillverkning
              </span>
            )}
          </p>

          {/* Spara/dela direkt vid prisraden – de som inte är redo att köpa
              idag ska inte lämna sidan utan spår. */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <WishlistHeart
              variant="labeled"
              item={{
                handle: node.handle,
                title: node.title,
                image: images[0]?.url,
                price: minPrice.amount,
                currency: minPrice.currencyCode,
              }}
            />
            <ShareButton title={node.title} />
          </div>

          <ul className="mt-6 space-y-2.5 text-sm">
            {[
              "Handgjord av mig – aldrig massproducerad",
              "Gravyren ingår i priset – inga dolda tillägg",
              "Du får en digital skiss innan jag graverar, helt utan kostnad",
              freeShipping
                ? "Fri frakt och presentklar förpackning ingår"
                : `Presentklar förpackning ingår – fri frakt över ${FREE_SHIPPING_LIMIT} kr`,
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Ingen nedrakning har – FomoBanner i headern visar redan
              veckans cutoff; dubbel FOMO i samma vy kanns som hard säljpress. */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-cream p-4 text-sm">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
            <p>
              Jag tar in ett begränsat antal beställningar per vecka – beställer du idag börjar jag
              med din redan denna vecka, klar och skickad inom 3–7 arbetsdagar.
              <DeliveryEstimate />
            </p>
          </div>

          <p className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">
            {node.description}
          </p>

          {/* Material & skötsel från PRODUCT_SPECS via produkttypens
              tagg – synligt i stället för gömt i en dragspel. */}
          {spec && <SpecBand spec={spec} />}

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
              <ProductCustomizer product={product} />
            </Suspense>
          </div>

          <div className="mt-8 grid grid-flow-dense gap-3 sm:grid-cols-3">
            {(
              [
                {
                  icon: Truck,
                  title: "Skickas med PostNord",
                  text: "2–4 dagar i Sverige, alternativen visas i kassan",
                },
                {
                  icon: ShieldCheck,
                  title: "2 års garanti",
                  text: "På gravyr och utförande",
                  to: "/garanti" as const,
                },
                { icon: Heart, title: "Personlig kontakt", text: "Du pratar alltid med mig" },
              ] satisfies { icon: typeof Truck; title: string; text: string; to?: "/garanti" }[]
            ).map((b) => (
              <div key={b.title} className="rounded-xl bg-cream p-4 text-sm">
                <b.icon className="h-4 w-4 text-primary-deep" />
                <p className="mt-2 font-medium text-foreground">
                  {b.to ? (
                    <Link to={b.to} className="hover:text-primary-deep hover:underline">
                      {b.title}
                    </Link>
                  ) : (
                    b.title
                  )}
                </p>
                <p className="text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-cream p-5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-gold" /> Personlig touch ingår
            </p>
            <p className="mt-2">
              Namn, datum eller en liten hälsning – fyll i din text ovan, så hör jag av mig med en
              skiss innan jag sätter igång. Vill du ha något helt eget?{" "}
              <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
                Skriv till mig
              </Link>
              , jag säger sällan nej.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-bold">Bra att veta</h2>
          <FaqAccordion items={braAttVeta} />
          <PaymentLogos className="mt-6" />
        </div>
        {/* Sociala bevis växer fram med de första riktiga beställningarna –
            tills dess visas hantverket här i stället för tomma stjärnor. */}
        <div className="rounded-2xl bg-cream p-6">
          <h2 className="font-serif text-2xl font-bold">Så går det till</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Din present graveras för hand här i verkstaden, och du får en digital skiss att godkänna
            innan jag sätter igång. Inga överraskningar, inga dolda val – och jag har skapat
            personliga presenter sedan 2016.
          </p>
          <Link
            to="/tillverkningsprocessen"
            className="mt-4 inline-block font-semibold text-primary-deep hover:underline"
          >
            Se hur tillverkningen går till →
          </Link>
        </div>
      </div>

      <RelatedProducts tags={product.node.tags || []} handle={handle} />

      <RecentlyViewed excludeHandle={handle} />

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
                {inStock ? "Tillverkas efter beställning · 3–7 arbetsdagar" : "Tillfälligt slut"}
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
    <section className="mt-20 border-t border-border pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-script text-2xl text-primary-deep">mer i samma stil</p>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
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
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
}
