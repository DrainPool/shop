import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Kicker } from "@/components/Kicker";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * "Mest älskade"-slider: horisontell produktbild-karusell med de
 * bäst säljande produkterna (taggen bastsaljare). Bilder från Shopify-CDN.
 *
 * Varför bilder här och ikoner i CategoryIconRow: bilder säljer känslan
 * ("vad fint, jag vill ha något sånt"), ikoner svarar på navigering
 * ("var finns nyckelringarna"). Nordic Crafts startsida gjorde samma
 * uppdelning — text-/ikonkategorierna övert, bildkorten under.
 */
export function FeaturedSlider() {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProducts(50)
      .then((all) => {
        if (cancelled) return;
        // Bästsäljare först, resten som utfyllnad upp till 10 kort
        const best = all.filter((p) => (p.node.tags || []).includes("bastsaljare"));
        const others = all.filter((p) => !best.includes(p));
        setProducts([...best, ...others].slice(0, 10));
      })
      .catch(() => setProducts([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const hasProducts = products !== null && products.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-16" aria-labelledby="featured-heading">
      <Kicker>mest älskade i verkstaden</Kicker>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <h2 id="featured-heading" className="font-serif text-3xl tracking-tight md:text-4xl">
          Presenter som gör intryck
        </h2>
        <Link
          to="/sortiment"
          className="text-sm font-semibold text-primary-deep transition-colors hover:underline"
        >
          Se hela sortimentet
        </Link>
      </div>

      {!hasProducts ? (
        // Skeletons medan Shopify svarar (eller tyst om tomt)
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products === null ? (
            Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : null}
        </div>
      ) : (
        <Carousel
          className="mt-8"
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((p, i) => (
              <CarouselItem
                key={p.node.id}
                className="pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard product={p} priority={i < 3} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" aria-label="Föregående produkter" />
          <CarouselNext className="right-1" aria-label="Nästa produkter" />
        </Carousel>
      )}
    </section>
  );
}