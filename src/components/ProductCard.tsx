import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickView } from "@/components/QuickView";
import { WishlistHeart } from "@/components/WishlistHeart";
import { formatPrice, getPricing, type ShopifyProduct } from "@/lib/shopify";

// Korta, varma craft-rader som varierar per produkttyp så korten inte upprepar
// samma text. Nycklarna är de faktiska taggarna i categories.ts (singular för
// produkttyper) plus occasion-taggarna — annars matchar inget och raderna dör.
const CRAFT_LINES: Record<string, string> = {
  gravyr: "Handgraverad med omsorg",
  smycken: "Varje detalj handgjord",
  brollop: "Till din dag – varaktigt vackert",
  dop: "En gåva att sparas livet ut",
  foretag: "Proffsigt och personligt",
  foto: "Dina minnen, vackert inramade",
  nyckelring: "En liten påminnelse att bära med dig",
  mugg: "Gjord för morgonbeställningen",
  glas: "Formad för stunden",
  keps: "Profil med personlig prägel",
  tshirt: "Tryckt på beställning",
  hoodie: "Mjuk och personlig",
  tumbler: "Håller värmen – och minnet",
  stickers: "Färgstark och din egen",
  skarbrada: "Skuren för ditt kök",
  lader: "Åldras vackert med gravyren",
  "3d": "Skriven lager för lager",
  tra: "Massivt trä, graverat för hand",
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
  const hasOptions = (node.variants?.edges?.length ?? 0) > 1;
  const { price, compare, onSale, currency, discountPercent } = getPricing(product);
  const soldOut = node.variants?.edges?.length
    ? !node.variants.edges.some((v) => v.node.availableForSale)
    : false;

  // Kortet länkar till produktsidan istället för snabbköp – personaliseringen
  // (gravyrtext, digital skiss) är butikens kärnvärde och ska aldrig kringgås.

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
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
            <span className="rounded-full bg-ink/90 px-3 py-1 text-xs font-semibold text-ink-foreground shadow-soft">
              Tillfälligt slut
            </span>
          ) : (
            <>
              {onSale && (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
                  −{discountPercent}%
                </span>
              )}
              {node.tags?.includes("bastsaljare") ? (
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
                  Mest älskad
                </span>
              ) : (
                node.tags?.includes("nyhet") && (
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink shadow-soft">
                    Nyhet i verkstaden
                  </span>
                )
              )}
            </>
          )}
        </div>
        {image ? (
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
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Bild kommer snart
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <Link to="/produkt/$handle" params={{ handle: node.handle }}>
          <h3 className="font-serif text-xl leading-tight font-semibold transition-colors duration-300 hover:text-primary-deep">
            {node.title}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{node.description}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-primary-deep">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {craftLine(node.tags)}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
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
          {soldOut ? (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="rounded-full transition-[color,background-color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              <Link to="/kontakt">Fråga om nytt</Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="rounded-full transition-[color,background-color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100"
            >
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
