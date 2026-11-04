import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

/**
 * "Passar ihop med" i varukorgen – kompletteringsförslag som utgår från
 * det kunden redan lagt i korgen. Förslagen väljs på delade taggar
 * (tillfälle eller mottagare) och aldrig bland produkter som redan ligger
 * i korgen, så det blir hjälp och inte upprepning.
 *
 * Länkar till produktsidan i stället för en direkt "lägg till" – varje
 * present behöver sin egen gravyrtext innan den kan köpas.
 */
export function CartSuggestions({ onNavigate }: { onNavigate?: () => void }) {
  const items = useCartStore((s) => s.items);
  const [all, setAll] = useState<ShopifyProduct[] | null>(null);

  useEffect(() => {
    if (all || items.length === 0) return;
    let cancelled = false;
    fetchProducts(50)
      .then((p) => {
        if (!cancelled) setAll(p);
      })
      // Tyst fel: förslagen är en bonus och får aldrig störa köpet
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [all, items.length]);

  if (!all || items.length === 0) return null;

  const inCart = new Set(items.map((i) => i.product.node.handle));
  // Taggar som beskriver sammanhanget – inte produkttypen, annars föreslås
  // bara ännu ett glas till glaset.
  const contextTags = new Set(
    items.flatMap((i) =>
      (i.product.node.tags || []).filter((t) => t.startsWith("till-") || CONTEXT_TAGS.includes(t)),
    ),
  );

  const suggestions = all
    .filter((p) => !inCart.has(p.node.handle))
    .filter((p) => (p.node.tags || []).some((t) => contextTags.has(t)))
    .slice(0, 2);

  if (suggestions.length === 0) return null;

  return (
    <div className="rounded-2xl bg-cream/60 p-4">
      <p className="font-serif text-base">Passar ihop med det du valt</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Samma tillfälle, samma mottagare – graveras i samma vecka och skickas i ett paket.
      </p>
      <ul className="mt-3 space-y-2">
        {suggestions.map((p) => {
          const image = p.node.images?.edges?.[0]?.node;
          return (
            <li key={p.node.id}>
              <Link
                to="/produkt/$handle"
                params={{ handle: p.node.handle }}
                onClick={onNavigate}
                className="flex min-h-11 items-center gap-3 rounded-xl p-1 transition-colors duration-300 hover:bg-background"
              >
                <span className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || p.node.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.node.title}</span>
                <span className="flex-shrink-0 text-sm tabular-nums text-muted-foreground">
                  {formatPrice(
                    p.node.priceRange.minVariantPrice.amount,
                    p.node.priceRange.minVariantPrice.currencyCode,
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Tillfällestaggar som gör ett förslag relevant. */
const CONTEXT_TAGS = [
  "brollop",
  "dop",
  "foretag",
  "jul",
  "fodelsedag",
  "morsdag",
  "farsdag",
  "arsdag",
  "nytt-hem",
  "present",
];
