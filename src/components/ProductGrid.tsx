import { useEffect, useState } from "react";
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

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [resetKey, products.length]);

  const shown = products.slice(0, visible);

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
      {visible < products.length && (
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Visa fler ({products.length - visible} kvar)
          </Button>
        </div>
      )}
    </>
  );
}
