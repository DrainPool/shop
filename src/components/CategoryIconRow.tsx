import { Link } from "@tanstack/react-router";
import { Car } from "lucide-react";
import { productTypes } from "@/lib/categories";
import { cn } from "@/lib/utils";

/**
 * Ikonrad med produkttyper – primär navigation.
 * Horisontellt scrollbar på mobil, centrerad på större skärmar.
 */
export function CategoryIconRow({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav aria-label="Produkttyper" className="border-b border-border/70 bg-background">
      <ul className="mx-auto flex max-w-6xl snap-x justify-start gap-1 overflow-x-auto px-5 py-6 sm:gap-2">
        {productTypes.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <li key={c.slug} className="shrink-0 snap-start">
              <Link
                to="/kategori/$slug"
                params={{ slug: c.slug }}
                className="group flex w-[74px] flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-cream transition-colors group-hover:bg-gold/25",
                    active && "bg-gold/30",
                  )}
                >
                  {c.icon ? (
                    <img
                      src={c.icon}
                      alt=""
                      width={512}
                      height={512}
                      loading="lazy"
                      className="h-10 w-10 object-contain opacity-80"
                    />
                  ) : (
                    <Car className="h-7 w-7 text-primary/80" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs text-muted-foreground underline-offset-4 group-hover:text-foreground group-hover:underline",
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
    </nav>
  );
}
