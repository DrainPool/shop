import { Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/shopify";
import { useWishlist } from "@/lib/wishlist";

/**
 * Gemensam rad med sparade önskelisteprodukter – används i varukorgen
 * (kompakt, max 3 rader) och på själva önskelista-sidan (full lista,
 * med ta bort-knappar).
 */
export function WishlistRow({
  limit,
  onNavigate,
  removable = false,
}: {
  limit?: number;
  onNavigate?: () => void;
  removable?: boolean;
}) {
  const { items, remove } = useWishlist();
  if (items.length === 0) return null;

  const shown = limit ? items.slice(0, limit) : items;

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4 text-left">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Heart className="h-4 w-4 fill-primary text-primary-deep" aria-hidden="true" />
        {limit ? "Dina sparade favoriter" : "Sparade favoriter"} ({items.length})
      </p>
      <ul className="mt-3 space-y-2">
        {shown.map((p) => (
          <li key={p.handle} className="flex items-center gap-3">
            <Link
              to="/produkt/$handle"
              params={{ handle: p.handle }}
              onClick={onNavigate}
              className="group flex min-w-0 flex-1 items-center gap-3"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
              )}
              <span className="min-w-0 truncate text-sm font-medium group-hover:text-primary-deep">
                {p.title}
              </span>
              <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatPrice(p.price, p.currency)}
              </span>
            </Link>
            {removable && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => remove(p.handle)}
                aria-label={`Ta bort ${p.title} från önskelistan`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
      {limit && items.length > limit && (
        <p className="mt-2 text-xs text-muted-foreground">+ {items.length - limit} till</p>
      )}
      {limit && (
        <Link
          to="/onskelista"
          onClick={onNavigate}
          className="mt-3 inline-flex text-xs font-medium text-primary-deep hover:underline"
        >
          Visa hela listan
        </Link>
      )}
    </div>
  );
}
