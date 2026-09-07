import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWishlist, type WishItem } from "@/lib/wishlist";

/**
 * Hjärtn knapp för önskelistan. Kan vara "lägen" (stor, på produktsidan)
 * eller kompakt ikon (på produktkort) via variant-propen.
 */
export function WishlistHeart({
  item,
  variant = "icon",
}: {
  item: WishItem;
  variant?: "icon" | "labeled";
}) {
  const { isInWishlist, toggle } = useWishlist();
  const saved = isInWishlist(item.handle);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggle(item);
    toast.success(nowSaved ? "Sparad i din lista" : "Borttagen från listan", {
      description: item.title,
      position: "bottom-right",
    });
  };

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={
          saved ? `Ta bort ${item.title} från önskelistan` : `Spara ${item.title} i önskelistan`
        }
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors",
          saved
            ? "border-primary bg-primary/10 text-primary-deep"
            : "border-border text-foreground hover:border-primary/50",
        )}
      >
        <Heart
          className={cn("h-4 w-4", saved && "fill-primary text-primary-deep")}
          aria-hidden="true"
        />
        {saved ? "Sparad" : "Spara i min lista"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={
        saved ? `Ta bort ${item.title} från önskelistan` : `Spara ${item.title} i önskelistan`
      }
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-soft backdrop-blur transition-all hover:scale-110",
        saved ? "text-primary-deep" : "text-muted-foreground hover:text-primary-deep",
      )}
    >
      <Heart className={cn("h-4.5 w-4.5", saved && "fill-primary")} aria-hidden="true" />
    </button>
  );
}
