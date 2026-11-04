import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";

import {
  FREE_SHIPPING_LIMIT,
  fetchProducts,
  formatPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

/**
 * Knuff mot fri frakt: när kunden är nära gränsen visar jag en enda produkt
 * som tar hela korgen över den – billigast av dem som räcker, så förslaget
 * aldrig kostar mer än frakten det ersätter.
 *
 * Länkar till produktsidan (inte direkt köp) – varje present behöver sin
 * egen gravyrtext innan den kan läggas i korgen.
 */
export function FreeShippingNudge({ onNavigate }: { onNavigate?: () => void }) {
  const items = useCartStore((s) => s.items);
  const [all, setAll] = useState<ShopifyProduct[] | null>(null);

  const total = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "SEK";
  const missing = FREE_SHIPPING_LIMIT - total;
  const active = items.length > 0 && missing > 0;

  useEffect(() => {
    if (all || !active) return;
    let cancelled = false;
    fetchProducts(50)
      .then((p) => {
        if (!cancelled) setAll(p);
      })
      // Tyst fel: knuffen är en bonus och får aldrig störa köpet
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [all, active]);

  if (!active || !all) return null;

  const inCart = new Set(items.map((i) => i.product.node.handle));
  const candidates = all
    .filter((p) => !inCart.has(p.node.handle))
    .map((p) => ({
      product: p,
      price: parseFloat(p.node.priceRange.minVariantPrice.amount),
    }))
    .filter((c) => c.price >= missing)
    .sort((a, b) => a.price - b.price);

  const pick = candidates[0];
  if (!pick) return null;

  const image = pick.product.node.images?.edges?.[0]?.node;

  return (
    <div className="mb-4 rounded-2xl border border-gold/40 bg-gold/10 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Truck className="h-4 w-4 text-primary-deep" aria-hidden="true" />
        Ett tips som ger fri frakt
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Du är {formatPrice(missing, currency)} från fri frakt – den här tar dig hela vägen.
      </p>
      <Link
        to="/produkt/$handle"
        params={{ handle: pick.product.node.handle }}
        onClick={onNavigate}
        className="mt-3 flex min-h-11 items-center gap-3 rounded-xl bg-background p-2 transition-colors duration-300 hover:bg-cream"
      >
        <span className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          {image && (
            <img
              src={image.url}
              alt={image.altText || pick.product.node.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          )}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {pick.product.node.title}
        </span>
        <span className="flex-shrink-0 text-sm tabular-nums text-muted-foreground">
          {formatPrice(pick.price, currency)}
        </span>
      </Link>
    </div>
  );
}
