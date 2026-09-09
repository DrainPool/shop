import { useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryBadge {
  label: string;
  tone: "primary" | "gold" | "ink";
}

export interface GalleryImage {
  url: string;
  altText: string | null;
}

const badgeTone: Record<GalleryBadge["tone"], string> = {
  primary: "bg-primary text-primary-foreground",
  gold: "bg-gold text-ink",
  ink: "bg-ink/85 text-ink-foreground",
};

/**
 * Produktsidans bildsektion: huvudbild med badges + miniatyrsrad.
 * Bilder och alt-texter kommer rakt från Shopify-noden; badges räknas
 * ut i rutefilen (taggarna är säljcopy, inte bilddata).
 *
 * Miniatyrerna får mjuk hover-skala (grupp + overflow-hidden) –
 * motion-reduce stänger av transformen helt.
 */
export function ProductGallery({
  images,
  title,
  badges,
}: {
  images: GalleryImage[];
  title: string;
  badges: GalleryBadge[];
}) {
  const [active, setActive] = useState(0);
  const image = images[active] || images[0];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-muted shadow-soft">
        {badges.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold shadow-soft",
                  badgeTone[badge.tone],
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
        {image ? (
          <img
            src={image.url}
            alt={image.altText || title}
            // width/height = demo-bildernas 700×700 – ger rätt
            // platsreservation i html:en (aspect-square räcker inte
            // alltid för CLS innan filen svarar).
            width={700}
            height={700}
            // Största bilden i viewporten = LCP-målet: hämta den
            // högprioriterat, men avkoda utan att blockera renderingen.
            fetchPriority="high"
            decoding="async"
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-muted-foreground">
            Bild kommer snart
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Visa bild ${i + 1} av ${title}`}
              aria-pressed={i === active}
              className={cn(
                "group h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                i === active ? "border-primary" : "border-border hover:border-primary/50",
              )}
            >
              <img
                src={img.url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
