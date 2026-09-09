import { Link } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

/**
 * Visuellt kategorikort – länkar till kategorisidan med ikon, kicker
 * och beskrivning. Används av sortimentets produkttyps- och
 * tillfällesrader samt kategorisidornas "Passar också till"-rad.
 *
 * Data-driven: renderar precis det som finns i Category-kartan; saknar
 * kategorin ikon (fler ikoner läggs till i assets allteftersom) visas
 * en neutral stämpel-ikon i sepia så kortet aldrig ser halvfärdigt ut.
 * Hela kortet är länken – stor tryckyta långt över 44 px.
 */
export function CategoryCard({
  category,
  /** Kompakt radvariant (utan ikon och beskrivning) – till tillfällena */
  compact = false,
}: {
  category: Category;
  compact?: boolean;
}) {
  return (
    <Link
      to="/kategori/$slug"
      params={{ slug: category.slug }}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-[box-shadow,transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift motion-reduce:transition-none motion-reduce:transform-none",
        compact
          ? "flex min-h-11 flex-col items-start justify-center gap-1 p-4"
          : "flex h-full flex-col gap-4",
      )}
    >
      {!compact && (
        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream transition-colors duration-500 group-hover:bg-gold/25">
          {category.icon ? (
            <img
              src={category.icon}
              alt=""
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
              className="h-9 w-9 object-contain transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          ) : (
            <Stamp
              className="h-7 w-7 text-primary-deep/80 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              aria-hidden="true"
            />
          )}
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-script text-lg leading-none text-primary-deep">
          {category.kicker}
        </span>
        <span className="mt-1.5 font-serif text-lg font-bold tracking-tight text-foreground">
          {category.short ?? category.title}
        </span>
        {!compact && (
          <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </span>
        )}
      </span>
    </Link>
  );
}
