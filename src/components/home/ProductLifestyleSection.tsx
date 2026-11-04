import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Kicker } from "@/components/Kicker";
import { MOBILE_PRODUCT_PHOTOS } from "@/lib/productLifestyle";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductLifestyleSection({ products }: { products: ShopifyProduct[] }) {
  const selected = products.filter((p) => MOBILE_PRODUCT_PHOTOS[p.node.handle]).slice(0, 4);
  if (selected.length === 0) return null;
  return (
    <section aria-labelledby="vardag-rubrik" className="border-y border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <Kicker>små saker, personliga stunder</Kicker>
        <h2 id="vardag-rubrik" className="mt-2 font-serif text-2xl md:text-3xl">Presenter i vardagen</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">AI-visualiseringar i mobilkamerastil – inte kundbilder. Produktens form och gravyr kan skilja sig från bilden.</p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
          {selected.map(({ node }) => {
            const image = MOBILE_PRODUCT_PHOTOS[node.handle];
            if (!image) return null;
            return (
              <figure key={node.handle} className="min-w-0">
                <Link to="/produkt/$handle" params={{ handle: node.handle }} className="group block" aria-label={`Se ${node.title}`}>
                  <img src={image.url} alt={image.altText} loading="lazy" decoding="async" width={768} height={1024} className="aspect-[3/4] w-full rounded-lg object-cover" />
                  <figcaption className="mt-3 flex items-start justify-between gap-2 text-sm">
                    <span>{node.title}</span><ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary-deep" aria-hidden="true" />
                  </figcaption>
                </Link>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}