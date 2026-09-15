import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

const PAGE_SIZE = 12;

/** Produktrutnät med "Visa fler" istället för oändlig lista. */
export function ProductGrid({
  products,
  resetKey,
}: {
  products: ShopifyProduct[];
  resetKey?: string;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [resetKey, products.length]);

  const shown = products.slice(0, visible);

  const loadMore = () => {
    const next = visible + PAGE_SIZE;
    setVisible(next);
    // När knappen försvinner (sista sidan laddad) tappas annars fokus till
    // body – lägg den istället på rutnätet. Tidigare kort behåller sin
    // position i tab-ordningen.
    if (next >= products.length) {
      gridRef.current?.focus();
    }
  };

  return (
    <>
      {/* Två kolumner redan på mobil, tre på mellanstora skärmar och fyra
          på desktop – tätare rutnät ger kortare sidor och bättre överblick. */}
      <div
        ref={gridRef}
        tabIndex={-1}
        className="mt-6 grid grid-cols-2 gap-3 focus:outline-none sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {shown.map((p, i) => (
          // De fyra första korten syns direkt i viewporten vid SSR –
          // hämta deras bilder högprioriterat (LCP-kandidater).
          <ProductCard key={p.node.id} product={p} priority={i < 4} />
        ))}
      </div>
      {/* Meddelar nya korten för skärmläsare – annars är utökningen tyst. */}
      <p role="status" aria-live="polite" className="sr-only">
        Visar {Math.min(visible, products.length)} av {products.length} produkter
      </p>
      {visible < products.length && (
        <div className="mt-8 text-center">
          {/* Basen ger redan rounded-full – bara extra luft behövs. */}
          <Button variant="outline" size="lg" className="px-8" onClick={loadMore}>
            Visa fler ({products.length - visible} kvar)
          </Button>
        </div>
      )}
    </>
  );
}
