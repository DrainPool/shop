import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { productTypes } from "@/lib/categories";
import { cn } from "@/lib/utils";

/**
 * Ikonrad med produkttyper – primär navigation.
 * Horisontellt scrollbar på mobil, centrerad på större skärmar.
 * Höger gradient-fade visas bara när raden faktiskt överstickar.
 */
export function CategoryIconRow({ activeSlug }: { activeSlug?: string }) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setCanScroll(el.scrollWidth > el.clientWidth + 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <nav aria-label="Produkttyper" className="relative border-b border-border/70 bg-background">
      <ul
        ref={scrollRef}
        className="mx-auto flex max-w-6xl snap-x justify-start gap-1 overflow-x-auto px-5 py-6 sm:gap-2"
      >
        {productTypes.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <li key={c.slug} className="shrink-0 snap-start">
              <Link
                to="/kategori/$slug"
                params={{ slug: c.slug }}
                aria-current={active ? "page" : undefined}
                className="group flex w-[74px] flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-cream transition-colors group-hover:bg-gold/25",
                    active && "bg-gold/40 ring-2 ring-primary-deep",
                  )}
                >
                  {c.icon ? (
                    <img
                      src={c.icon}
                      alt=""
                      width={512}
                      height={512}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-10 w-10 object-contain transition-opacity",
                        active ? "opacity-100" : "opacity-80",
                      )}
                    />
                  ) : (
                    <Car className="h-7 w-7 text-primary-deep/80" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap text-xs text-muted-foreground underline-offset-4 group-hover:text-foreground group-hover:underline",
                    active && "font-semibold text-foreground underline",
                  )}
                >
                  {c.short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Antyder att raden går att scrolla – bara när den verkligen gör det */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity",
          canScroll ? "opacity-100" : "opacity-0",
        )}
      />
    </nav>
  );
}
