import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  Heart,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { LiquidLoader } from "@/components/ui/liquid-loader";
import { Button } from "@/components/ui/button";
import { CutoffCountdown } from "@/components/FomoBanner";
import { ProductCard } from "@/components/ProductCard";
import { ProductCustomizer } from "@/components/ProductCustomizer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecentlyViewed, useTrackRecentlyViewed } from "@/components/RecentlyViewed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReviewSection } from "@/components/ReviewSection";
import { PaymentLogos } from "@/components/PaymentLogos";
import { productTypes } from "@/lib/categories";
import { fetchProductByHandle, fetchProducts, formatPrice, getPricing } from "@/lib/shopify";


export const Route = createFileRoute("/produkt/$handle")({
  component: ProductPage,
  head: ({ params }) => {
    // "regnummers-nyckelring-i-ek" -> "Regnummers-nyckelring-i-ek"
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const name = capitalize(params.handle.replace(/-/g, " "));
    const title = `${name} – Lins & Lager`;
    const description = `${name} – personligt hantverk från Lins & Lager. Gravyr, smycken, 3D-utskrifter och foto, handgjort på beställning.`;
    return {
      meta: [
        { title: title.length > 60 ? `${name} – Lins & Lager` : title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ProductPage() {
  const { handle } = Route.useParams();
  const [activeImage, setActiveImage] = useState(0);


  const { data: product, isPending } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  useTrackRecentlyViewed(
    product
      ? {
          handle: product.node.handle,
          title: product.node.title,
          image: product.node.images?.edges?.[0]?.node?.url,
          price: product.node.priceRange.minVariantPrice.amount,
          currency: product.node.priceRange.minVariantPrice.currencyCode,
        }
      : null,
  );



  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <LiquidLoader size="md" label="Hämtar produkten" />
        <p className="text-sm text-muted-foreground">Hämtar produkten &hellip;</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">Produkten hittades inte</h1>
        <p className="mt-3 text-muted-foreground">
          Den här produkten finns inte längre i sortimentet.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Till butiken</Link>
        </Button>
      </div>
    );
  }

  const node = product.node;
  const images = node.images.edges.map((e) => e.node);
  const image = images[activeImage] || images[0];
  const minPrice = node.priceRange.minVariantPrice;
  const tags = node.tags || [];
  const freeShipping = parseFloat(minPrice.amount) >= 800;
  const { price, compare, onSale, currency, discountPercent } = getPricing(product);
  const variants = node.variants?.edges ?? [];
  const inStock = variants.length === 0 || variants.some((v) => v.node.availableForSale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: node.title,
    description: node.description,
    image: images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Lins & Lager" },
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const typeCategory = productTypes.find((t) => tags.includes(t.tag));

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
        className="mt-4 mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Tillbaka till sortimentet
      </Link>


      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-muted shadow-soft">
            <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
              {tags.includes("bastsaljare") && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Mest älskad just nu
                </span>
              )}
              {tags.includes("nyhet") && (
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                  Nyhet i verkstaden
                </span>
              )}
              {freeShipping && (
                <span className="rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-ink-foreground">
                  Fri frakt ingår
                </span>
              )}
            </div>
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="aspect-square h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-muted-foreground">
                Bild kommer snart
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Visa bild ${i + 1} av ${node.title}`}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                    i === activeImage ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-4xl leading-tight font-semibold">{node.title}</h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl font-medium text-primary">{formatPrice(price, currency)}</p>
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
              <span className="text-primary">I lager – tillverkas efter din beställning</span>
            ) : (
              <span className="text-muted-foreground">
                Tillfälligt slut – hör av dig så bokar vi in nästa tillverkning
              </span>
            )}
          </p>

          <ul className="mt-6 space-y-2.5 text-sm">
            {[
              "Handgjord av mig – aldrig massproducerad",
              "Du får en digital skiss innan jag graverar, helt utan kostnad",
              freeShipping
                ? "Fri frakt och presentklar förpackning ingår"
                : "Presentklar förpackning ingår – fri frakt över 800 kr",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              Jag tar in ett begränsat antal beställningar per vecka. Beställ inom{" "}
              <CutoffCountdown className="text-primary" /> så börjar jag med din redan denna vecka –
              klar och skickad inom 3–7 arbetsdagar.
            </p>
          </div>

          <p className="mt-6 whitespace-pre-line text-muted-foreground">{node.description}</p>

          <div id="personalisering">
            <ProductCustomizer product={product} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, title: "Skickas spårbart", text: "PostNord, 2–4 dagar i Sverige" },
              { icon: ShieldCheck, title: "2 års garanti", text: "På gravyr och utförande" },
              { icon: Heart, title: "Personlig kontakt", text: "Du pratar alltid med mig" },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-cream p-4 text-sm">
                <b.icon className="h-4 w-4 text-primary" />
                <p className="mt-2 font-medium text-foreground">{b.title}</p>
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
              skiss innan jag sätter igång. Vill du ha något helt eget? Skriv till mig, jag säger
              sällan nej.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-bold">Bra att veta</h2>
          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="tillverkning">
              <AccordionTrigger className="text-left font-semibold">
                Så tillverkas den
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Allt görs här i verkstaden efter din beställning. Du får en digital skiss på
                gravyren innan jag börjar, och jag hör av mig om något i texten ser konstigt ut.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="leverans">
              <AccordionTrigger className="text-left font-semibold">
                Leverans &amp; leveranstid
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Tillverkning 3–7 arbetsdagar, därefter spårbar frakt med PostNord. Fri frakt inom
                Sverige vid köp över 800 kr. Har du ett datum som måste hållas – skriv det i
                beställningen.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="retur">
              <AccordionTrigger className="text-left font-semibold">
                Retur &amp; reklamation
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Personligt tillverkade varor har ingen ångerrätt, eftersom de görs unikt till dig.
                Blir något fel på min sida gör jag om den – utan diskussion.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skotsel">
              <AccordionTrigger className="text-left font-semibold">Skötselråd</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Trä torkas av för hand och oljas då och då. Smycken tål vardag men mår bäst utan
                parfym och klor. Läder blir vackrare med åren.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <PaymentLogos className="mt-6" />
        </div>
        <ReviewSection />
      </div>

      <RelatedProducts tags={product.node.tags || []} handle={handle} />

      <RecentlyViewed excludeHandle={handle} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-lift backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{node.title}</span>
            <span className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-primary">
                {formatPrice(price, currency)}
              </span>
              {onSale && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(compare, currency)}
                </span>
              )}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {inStock ? "I lager · 3–7 arbetsdagar" : "Tillfälligt slut"}
            </span>
          </span>
          <Button asChild size="lg" className="rounded-full">
            <a href="#personalisering">Personalisera &amp; köp</a>
          </Button>
        </div>
      </div>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <p className="font-script text-2xl text-primary">mer i samma stil</p>
      <h2 className="mt-1 font-serif text-3xl font-black tracking-tight">
        {typeTag ? typeTag.title : "Liknande presenter"}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
}
