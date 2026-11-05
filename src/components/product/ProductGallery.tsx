import { useState } from "react";
import { cn } from "@/lib/utils";
import { badgeTone } from "@/lib/badgeTone";
import { useEngravingPreview } from "@/stores/engravingPreviewStore";
import { Button } from "@/components/ui/button";

export interface GalleryBadge {
  label: string;
  tone: "primary" | "gold" | "ink";
}

export interface GalleryImage {
  url: string;
  altText: string | null;
  visualization?: boolean;
}

/**
 * Produktsidans bildsektion: huvudbild med badges + miniatyrsrad.
 * Bilder och alt-texter kommer rakt från Shopify-noden; badges räknas
 * ut i rutefilen (taggarna är säljcopy, inte bilddata).
 *
 * Huvudbilden får mjuk hover-zoom och miniatyrerna mjuk hover-skala
 * (grupp + overflow-hidden) – motion-reduce stänger av transformerna helt.
 */
// Material där gravyren blir ljus/frostad i stället för mörkt bränd.
const LIGHT_TAGS = ["glas", "tumbler", "smycken", "nyckelring-metall", "metall", "mugg"];

export function ProductGallery({
  images,
  title,
  badges,
  tags = [],
}: {
  images: GalleryImage[];
  title: string;
  badges: GalleryBadge[];
  tags?: string[];
  handle?: string;
}) {
  const [active, setActive] = useState(0);
  const galleryImages: GalleryImage[] = images.map((image) => ({
    ...image,
    visualization: image.visualization || /AI-visualisering/i.test(image.altText || "") || /(?:_miljo|_vardag|__\d)\.(?:webp|jpg)/.test(image.url),
  }));

  const image =
    galleryImages[active] ||
    galleryImages[0];
  const preview = useEngravingPreview();
  const hasText = Boolean(preview.line1.trim() || preview.line2.trim());
  const light = tags.some((t) => LIGHT_TAGS.includes(t));
  const len = preview.line1.trim().length;
  const size =
    len > 22 ? "text-xl md:text-2xl" : len > 12 ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl";

  return (
    <div>
      {/* Grupp-here styr huvudbildens mjuka zoom – galleriet behåller
          rounded-2xl enligt designgrunden (kortet är 3xl, galleriet 2xl). */}
      <div className="group relative overflow-hidden rounded-2xl bg-muted shadow-soft">
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
            className="aspect-square h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-muted-foreground">
            Bild kommer snart
          </div>
        )}
        {active === 0 && hasText && !image?.visualization && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 text-center"
          >
            <p
              className={cn(
                "break-words leading-tight",
                size,
                light
                  ? "text-cream/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.45)]"
                  : "text-ink/80 mix-blend-multiply [text-shadow:0_1px_0_rgb(255_255_255/0.25)]",
              )}
              style={preview.fontStyle}
            >
              {preview.line1.trim()}
            </p>
            {preview.line2.trim() && (
              <p
                className={cn(
                  "mt-1 break-words text-lg md:text-xl",
                  light ? "text-cream/90" : "text-ink/80 mix-blend-multiply",
                )}
                style={preview.fontStyle}
              >
                {preview.line2.trim()}
              </p>
            )}
          </div>
        )}
      </div>
      {image?.visualization && (
        <p className="mt-2 text-xs text-muted-foreground">AI-visualisering – inte en kundbild. Produktens form och gravyr kan skilja sig från bilden.</p>
      )}
      {active === 0 && hasText && !image?.visualization && (
        <p className="mt-2 text-xs text-muted-foreground">
          Förhandsvisning – den exakta skissen får du innan jag graverar.
        </p>
      )}

      {galleryImages.length > 1 && (
        // Scroll-snap: med många bilder skrollar raden vågrätt och varje
        // miniatyr snäpper till i startläget i stället för att fastna mitt emellan.
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {galleryImages.map((img, i) => (
            <Button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Visa bild ${i + 1} av ${title}`}
              aria-pressed={i === active}
              variant="ghost"
              className={cn(
                "group h-20 w-20 shrink-0 snap-start overflow-hidden rounded-xl p-0 transition-shadow",
                i === active
                  ? "ring-1 ring-primary-deep"
                  : "ring-1 ring-border hover:ring-primary/50",
              )}
            >
              <img
                src={img.url}
                alt={
                  img.altText?.trim()
                    ? `${img.altText} – ${title}, bild ${i + 1}`
                    : `${title}, bild ${i + 1} av ${galleryImages.length}`
                }
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
