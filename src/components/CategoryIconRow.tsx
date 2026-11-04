import { Link } from "@tanstack/react-router";
import {
  Car,
  Circle,
  Gift,
  KeyRound,
  PawPrint,
  PenTool,
  Signpost,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { productTypes } from "@/lib/categories";
import { cn } from "@/lib/utils";

/**
 * Reservikoner per kategori när ingen egen ikonbild finns i src/assets.
 * Samma tunna linjestil som Lucide-övrigt, så inga kategorier delar
 * samma fallback (det såg ut som dubletter i raden).
 */
const FALLBACK_ICONS: Record<string, LucideIcon> = {
  nyckelringar: KeyRound,
  glasunderlagg: Circle,
  bil: Car,
  husdjur: PawPrint,
  idrottspriser: Trophy,
  skyltar: Signpost,
  askar: Gift,
  "gravyr-egna-foremal": PenTool,
};

function IconItem({
  c,
  active,
  tabbable,
}: {
  c: (typeof productTypes)[number];
  active: boolean;
  tabbable: boolean;
}) {
  const Fallback = FALLBACK_ICONS[c.slug] ?? KeyRound;
  return (
    <li className="shrink-0" aria-hidden={tabbable ? undefined : true}>
      <Link
        to="/kategori/$slug"
        params={{ slug: c.slug }}
        hash="produkter"
        aria-current={active ? "page" : undefined}
        tabIndex={tabbable ? undefined : -1}
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
                "h-10 w-10 object-contain transition-[opacity,transform] duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none",
                active ? "opacity-100" : "opacity-80",
              )}
            />
          ) : (
            <Fallback
              className="h-7 w-7 text-primary-deep/80 transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none"
              aria-hidden="true"
            />
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
}

/**
 * Ikonrad med produkttyper – primär navigation.
 * Rullar långsamt som ett marquee-band och pausar vid hovring/fokus.
 * Listan dupliceras för en sömlös loop; kopian är aria-hidden och inte tabbbar.
 */
export function CategoryIconRow({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav aria-label="Produkttyper" className="relative border-b border-border/70 bg-background">
      <div className="icon-marquee overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="icon-marquee-track">
          {productTypes.map((c) => (
            <IconItem key={c.slug} c={c} active={c.slug === activeSlug} tabbable />
          ))}
          {/* Slingkopia – bara visuell, inte för skärmläsare/tabbning */}
          {productTypes.map((c) => (
            <IconItem key={`${c.slug}-kopia`} c={c} active={false} tabbable={false} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
