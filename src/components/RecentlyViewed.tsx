import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/shopify";

const STORAGE_KEY = "nyligen-visade";
const MAX_ITEMS = 8;

export interface ViewedProduct {
  handle: string;
  title: string;
  image?: string | undefined;
  price: string;
  currency: string;
}

function read(): ViewedProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Sparar produkten i "nyligen visade" när produktsidan öppnas. */
export function useTrackRecentlyViewed(product: ViewedProduct | null) {
  const handle = product?.handle;
  useEffect(() => {
    if (!product || !handle) return;
    try {
      const next = [product, ...read().filter((p) => p.handle !== handle)].slice(0, MAX_ITEMS);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* localStorage kan vara blockerad – då hoppar vi över */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);
}

/** Rad med de produkter kunden nyss tittat på. Renderas bara om det finns några. */
export function RecentlyViewed({
  excludeHandle,
  title = "Nyligen visade",
}: {
  excludeHandle?: string;
  title?: string;
}) {
  const [items, setItems] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    setItems(read().filter((p) => p.handle !== excludeHandle));
  }, [excludeHandle]);

  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      <ul className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <li key={p.handle} className="w-40 shrink-0 snap-start">
            <Link to="/produkt/$handle" params={{ handle: p.handle }} className="group block">
              <div className="aspect-square overflow-hidden rounded-2xl bg-cream">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium group-hover:text-primary">
                {p.title}
              </p>
              <p className="text-sm text-muted-foreground">{formatPrice(p.price, p.currency)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
