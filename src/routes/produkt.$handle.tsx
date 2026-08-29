import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  Heart,
  Loader2,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CutoffCountdown } from "@/components/FomoBanner";
import { ProductCard } from "@/components/ProductCard";
import { ProductCustomizer } from "@/components/ProductCustomizer";
import { productTypes } from "@/lib/categories";
import { fetchProductByHandle, fetchProducts, formatPrice } from "@/lib/shopify";

export const Route = createFileRoute("/produkt/$handle")({
  component: ProductPage,
  head: ({ params }) => {
    const name = params.handle.replace(/-/g, " ");
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

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
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

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Tillbaka till butiken
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
          <p className="mt-4 text-2xl font-medium text-primary">
            {formatPrice(minPrice.amount, minPrice.currencyCode)}
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

          <ProductCustomizer product={product} />

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

      <RelatedProducts tags={product.node.tags || []} handle={handle} />
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
