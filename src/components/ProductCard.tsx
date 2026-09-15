import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickView } from "@/components/QuickView";
import { WishlistHeart } from "@/components/WishlistHeart";
import { formatPrice, getPricing, type ShopifyProduct } from "@/lib/shopify";
import { badgeTone } from "@/lib/badgeTone";

// Korta, varma craft-rader som varierar per produkttyp så korten inte upprepar
// samma text. Nycklarna är de faktiska taggarna i categories.ts (singular för
// produkttyper) plus occasion-taggarna — annars matchar inget och raderna dör.
const CRAFT_LINES: Record<string, string> = {
  gravyr: "Graverad med omsorg",
  smycken: "Varje detalj handgjord",
  brollop: "Till er dag – graverat att spara",
  dop: "En gåva att sparas livet ut",
  foretag: "Proffsigt och personligt",
  foto: "Dina minnen, vackert inramade",
  nyckelring: "En liten påminnelse att bära med dig",
  mugg: "Gjord för morgonkaffet",
  glas: "Formad för stunden",
  tumbler: "Håller värmen – och minnet",
  stickers: "Färgstark och din egen",
  skarbrada: "Skuren för ditt kök",
  lader: "Åldras vackert med gravyren",
  "3d": "Skriven lager för lager",
  tra: "Massivt trä, graverat i verkstaden",
  presentkort: "Mottagaren väljer själv",
  namnbrickor: "Ditt namn, snyggt satt",
  barn: "Söt och trygg – till de små",
};

function craftLine(tags: string[] | undefined): string {
  if (tags) {
    for (const tag of tags) {
      const key = tag.toLowerCase();
      if (CRAFT_LINES[key]) return CRAFT_LINES[key];
    }
  }
  return "Handgjord i min verkstad";
}

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
  const soldOut = node.variants?.edges?.length
    ? !node.variants.edges.some((v) => v.node.availableForSale)
    : false;

  // Kortet länkar till produktsidan istället för snabbköp – personaliseringen
  // (gravyrtext, digital skiss) är butikens kärnvärde och ska aldrig kringgås.

  return (
    <article className="card-shop group relative flex flex-col overflow-hidden">
      <QuickView product={product} />
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
          ) : (
            <>
              {onSale && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${badgeTone.primary}`}
                >
                  −{discountPercent}%
                </span>
              )}
              {node.tags?.includes("bastsaljare") ? (
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
            </>
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
          <h3 className="font-serif text-xl leading-tight transition-colors duration-300 hover:text-primary-deep">
            {node.title}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{node.description}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-primary-deep">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {craftLine(node.tags)}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <span className="flex flex-wrap items-baseline gap-1.5 font-medium">
            <span className={onSale ? "text-primary-deep tabular-nums" : "tabular-nums"}>
              {hasOptions ? "Från " : ""}
              {formatPrice(price, currency)}
            </span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(compare, currency)}
              </span>
            )}
          </span>
          {/* Knappbasen (rounded-full + shadow-soft) räcker – inga manuella patchar. */}
          {soldOut ? (
            <Button asChild size="sm" variant="secondary">
              <Link to="/kontakt">Fråga om nytt</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                Personalisera
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
