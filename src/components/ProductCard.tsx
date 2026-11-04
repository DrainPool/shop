import { Link } from "@tanstack/react-router";
import { WishlistHeart } from "@/components/WishlistHeart";
import { formatPrice, getPricing, type ShopifyProduct } from "@/lib/shopify";
import { badgeTone } from "@/lib/badgeTone";

export function ProductCard({
  product,
  priority = false,
}: {
  product: ShopifyProduct;
  /** true för de första korten i ett rutnät – de ligger överst i viewporten
   * vid SSR och ska inte vänta på lazy-laddning (LCP-kandidater). */
  priority?: boolean;
}) {
  const node = product.node;
  const image = node.images?.edges?.[0]?.node;
  // Andra bilden för crossfade vid hover – demo-läget mappar extraImages
  // in i images.edges, så edges[1] fungerar i båda lägena (undefined = inget lager).
  const secondImage = node.images?.edges?.[1]?.node;
  const hasOptions = (node.variants?.edges?.length ?? 0) > 1;
  const { price, compare, onSale, currency, discountPercent } = getPricing(product);
  // Prisintervall när varianterna har olika pris (t.ex. 229 kr – 269 kr).
  const maxPrice = Math.max(
    price,
    ...(node.variants?.edges ?? []).map((v: any) => parseFloat(v.node.price?.amount ?? "0") || 0),
  );
  const soldOut = node.variants?.edges?.length
    ? !node.variants.edges.some((v) => v.node.availableForSale)
    : false;

  // Kortet länkar till produktsidan istället för snabbköp – personaliseringen
  // (gravyrtext, digital skiss) är butikens kärnvärde och ska aldrig kringgås.

  return (
    <article className="card-shop group relative flex flex-col overflow-hidden">
      {/* Önskelistehjärtat ligger som syskon till (inte inuti) bildlänken —
          knapp i länk är ogiltig HTML och stör tangentbord/skärmläsare. */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistHeart
          item={{
            handle: node.handle,
            title: node.title,
            image: image?.url,
            price: node.priceRange.minVariantPrice.amount,
            currency: node.priceRange.minVariantPrice.currencyCode,
          }}
        />
      </div>
      <Link
        to="/produkt/$handle"
        params={{ handle: node.handle }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        {/* Max tva badges: "Tillfalligt slut" ersatter allt, annars rea +
            en av "Mast alskad"/"Nyhet" (aldrig bada). Fri frakt-ingar -
            trskeln syns redan i varukorgen. */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {soldOut ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.ink}`}
            >
              Tillfälligt slut
            </span>
          ) : onSale ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.primary}`}
            >
              −{discountPercent}%
            </span>
          ) : node.tags?.includes("bastsaljare") ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.primary}`}
            >
              Mest älskad
            </span>
          ) : (
            node.tags?.includes("nyhet") && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.gold}`}
              >
                Nyhet i verkstaden
              </span>
            )
          )}
          {!soldOut && node.tags?.includes("fotogravyr") && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.gold}`}
            >
              Fotogravyr möjlig
            </span>
          )}
        </div>
        {image ? (
          <>
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              // Demo-bilderna är 700×700 – width/height reserverar platsen
              // och hjälper webbläsaren prioritera hämtningen.
              width={700}
              height={700}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {/* Crossfade-lager: bara renderat när en andra bild finns —
                annars syns en tom yta vid hover. Lazy-hämtad, den syns
                först vid hover och får inte störa LCP-bilden. */}
            {secondImage && (
              <img
                src={secondImage.url}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                width={700}
                height={700}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:hidden"
              />
            )}
            {/* Mjuk botten-gradient – ger vit text/badges fotfästa och lugnar
                övergång mot kortets textdel. Pekar aldrig (decorativ). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/30 to-transparent"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Bild kommer snart
          </div>
        )}
      </Link>

      {/* p-4 i stället för p-5 – tätare kort i rutnätet utan att designen ändras */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/produkt/$handle" params={{ handle: node.handle }}>
          {/* Marcellus är 400-only – viktklasser här är död vikt. */}
          <h3 className="line-clamp-2 min-h-[2.5em] font-serif text-xl leading-tight transition-colors duration-300 hover:text-primary-deep">
            {node.title}
          </h3>
        </Link>
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <span className="flex flex-wrap items-baseline gap-1.5 font-medium">
            <span className={onSale ? "text-primary-deep tabular-nums" : "tabular-nums"}>
              {maxPrice > price && !onSale
                ? `${formatPrice(price, currency)} – ${formatPrice(maxPrice, currency)}`
                : `${hasOptions ? "Från " : ""}${formatPrice(price, currency)}`}
            </span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(compare, currency)}
              </span>
            )}
          </span>
          <span className="text-sm font-semibold text-primary-deep">
            {soldOut ? "Fråga om nytt" : "Visa produkt"}
          </span>
        </div>
      </div>
    </article>
  );
}
