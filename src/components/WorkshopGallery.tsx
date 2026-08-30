import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import manifest from "@/lib/galleryManifest.json";

/**
 * Verkstadsgalleri — en klickbar produktbild per produkt.
 * I lightboxen bläddrar besökaren mellan produktens alla bilder.
 * Bilderna är produktpresentationer i miljö (genererade), presenterade ärligt.
 */

const CAT_LABELS: Record<string, string> = {
  alla: "Alla",
  nyckelringar: "Nyckelringar",
  minnesaskar: "Minnesaskar",
  kors: "Kors-hängen",
  hjartan: "Hjärten",
  barhalsband: "Bar-halsband",
  halshalsband: "Halsband",
  charms: "Charms",
  armband: "Armband",
  korgar: "Korgar",
  kedjor: "Kedjor",
  beslag: "Beslag",
};

type Entry = { cat: string; miljo: string; file: string; promptkey: string };
type Product = { cat: string; images: Entry[] };

export function WorkshopGallery() {
  const [cat, setCat] = useState("alla");
  const [lightbox, setLightbox] = useState<Product | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const products = useMemo<Product[]>(() => {
    const byCat = new Map<string, Entry[]>();
    for (const m of manifest) {
      const list = byCat.get(m.cat) ?? [];
      list.push(m);
      byCat.set(m.cat, list);
    }
    return [...byCat.entries()].map(([c, images]) => ({ cat: c, images }));
  }, []);

  const cats = useMemo(() => ["alla", ...products.map((p) => p.cat)], [products]);

  const shown = cat === "alla" ? products : products.filter((p) => p.cat === cat);

  const open = (p: Product) => {
    setLightbox(p);
    setImgIdx(0);
  };

  const step = (dir: number) => {
    if (!lightbox) return;
    setImgIdx((i) => (i + dir + lightbox.images.length) % lightbox.images.length);
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-3xl text-primary">ditt hantverk, upp nära</p>
        <h2 className="mt-2 font-serif text-4xl font-black tracking-tight">
          Verkstadsgalleri
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Klicka på en produkt för att se flera bilder av den — i olika vinklar och miljöer.
        </p>
      </div>

      {/* Filter per produkt */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:border-primary",
            )}
          >
            {CAT_LABELS[c] || c}
          </button>
        ))}
      </div>

      {/* Grid — en bild per produkt */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <button
            key={p.cat}
            type="button"
            onClick={() => open(p)}
            className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <img
              src={`/images/products/${p.images[0]!.file}`}
              alt={CAT_LABELS[p.cat] || p.cat}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="font-serif text-sm font-bold">
                {CAT_LABELS[p.cat] || p.cat}
              </span>
              <span className="text-xs text-muted-foreground">
                {p.images.length} bilder
              </span>
            </div>
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">Inga produkter matchar filtret.</p>
      )}

      {/* Lightbox med bläddring mellan produktens bilder */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/images/products/${lightbox.images[imgIdx]!.file}`}
              alt={CAT_LABELS[lightbox.cat] || lightbox.cat}
              className="max-h-[80vh] w-auto rounded-2xl border-2 border-ink object-contain"
            />

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 rounded-full bg-ink p-2 text-ink-foreground shadow-lift"
              aria-label="Stäng"
            >
              <X className="h-4 w-4" />
            </button>

            {lightbox.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-ink p-2 text-ink-foreground shadow-lift"
                  aria-label="Föregående bild"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full bg-ink p-2 text-ink-foreground shadow-lift"
                  aria-label="Nästa bild"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="mt-3 flex items-center justify-center gap-3">
              <p className="font-serif text-lg font-bold text-background">
                {CAT_LABELS[lightbox.cat] || lightbox.cat}
              </p>
              {lightbox.images.length > 1 && (
                <div className="flex gap-1.5">
                  {lightbox.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImgIdx(i)}
                      aria-label={`Bild ${i + 1}`}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        i === imgIdx ? "bg-background" : "bg-background/40",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
