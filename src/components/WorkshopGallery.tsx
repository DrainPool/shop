import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import manifest from "@/lib/galleryManifest.json";

/**
 * Verkstadsgalleri — alla produktbilder i olika miljör (hall/handla/hem/bord).
 * Bilderna är produkt­presentationer i miljö (genererade), presenterade ärligt.
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

const MILJO_LABELS: Record<string, string> = {
  alla: "Alla miljör",
  hall: "I handen",
  handla: "I butiken",
  hem: "Hemma",
  bord: "På bordet",
};

type Entry = { cat: string; miljo: string; file: string; promptkey: string };

export function WorkshopGallery() {
  const [cat, setCat] = useState("alla");
  const [miljo, setMiljo] = useState("alla");
  const [lightbox, setLightbox] = useState<Entry | null>(null);

  const cats = useMemo(() => {
    const set = new Set(manifest.map((m) => m.cat));
    return ["alla", ...set];
  }, []);

  const miljos = useMemo(() => {
    const set = new Set(manifest.filter((m) => cat === "alla" || m.cat === cat).map((m) => m.miljo));
    return ["alla", ...set];
  }, [cat]);

  const shown = manifest.filter(
    (m) => (cat === "alla" || m.cat === cat) && (miljo === "alla" || m.miljo === miljo),
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-script text-3xl text-primary">ditt hantverk, miljör runt om</p>
        <h2 className="mt-2 font-serif text-4xl font-black tracking-tight">
          Verkstadsgalleri — {manifest.length} bilder
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Samma produkter fotograferade i olika miljör: i handen, i butiken, hemma och på bordet.
        </p>
      </div>

      {/* Filter */}
      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCat(c); setMiljo("alla"); }}
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
        <div className="flex flex-wrap justify-center gap-2">
          {miljos.map((mj) => (
            <button
              key={mj}
              type="button"
              onClick={() => setMiljo(mj)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                miljo === mj
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary",
              )}
            >
              {MILJO_LABELS[mj] || mj}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((m) => (
          <button
            key={m.file}
            type="button"
            onClick={() => setLightbox(m)}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <img
              src={`/images/products/${m.file}`}
              alt={`${CAT_LABELS[m.cat] || m.cat} i ${MILJO_LABELS[m.miljo] || m.miljo}`}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">Inga bilder matchar filtret.</p>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={`/images/products/${lightbox.file}`}
              alt={`${CAT_LABELS[lightbox.cat]} ${MILJO_LABELS[lightbox.miljo]}`}
              className="max-h-[85vh] w-auto rounded-2xl border-2 border-ink object-contain"
            />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 rounded-full bg-ink p-2 text-ink-foreground shadow-lift"
              aria-label="Stäng"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center font-serif text-lg font-bold text-background">
              {CAT_LABELS[lightbox.cat] || lightbox.cat} · {MILJO_LABELS[lightbox.miljo] || lightbox.miljo}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}