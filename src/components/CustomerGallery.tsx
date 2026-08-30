import { Instagram, Camera, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * "Hela Sverige skapar personligt" — UGC-sektion inspirerad av personliga.se.
 *
 * ÄRLIGHETS-RAM (viktigt!): Innehållet nedan är MILJÖBILDER från vår
 * verkstadsfotografering (genererade produkterbilder i verkstadsmiljö) —
 * de presenteras som produktpresentation, INTE som kundfoton.
 * När riktiga kundbilder finns: byt bilderna + lägg @-handel i CARDS.
 */

const CARDS = [
  {
    id: "nyckelringar",
    image: "/images/ugc/nyckelringar.webp",
    tag: "Nyckelringar",
    alt: "Tränyckelringar klara för gravyr i verkstaden",
  },
  {
    id: "minnesaskar",
    image: "/images/ugc/minnesaskar.webp",
    tag: "Minnesaskar",
    alt: "Handgjorda träaskar i verkstaden",
  },
  {
    id: "smycken",
    image: "/images/ugc/smycken.webp",
    tag: "Personliga smycken",
    alt: "Graverade halsband och hängen",
  },
  {
    id: "skarbrador",
    image: "/images/ugc/skarbrador.webp",
    tag: "Skärbrädor",
    alt: "Skärbräda i ek under tillverkning",
  },
  {
    id: "barhalsband",
    image: "/images/ugc/barhalsband.webp",
    tag: "Graverade presenter",
    alt: "Graverade bar-halsband",
  },
];

export function CustomerGallery() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-primary">pågående i verkstaden</p>
          <h2 className="mt-2 font-serif text-4xl font-black tracking-tight">
            Hela Sverige skapar personligt
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            En skymt från arbetsbänken – produkter som just nu graveras, snickras och packas för
            att överraska någon.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CARDS.map((c) => (
            <figure
              key={c.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.alt}
                  width={480}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-ink-foreground backdrop-blur-sm">
                  {c.tag}
                </span>
                <span className="rounded-full bg-background/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/tillverkningsprocessen"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Se hur dina presenter skapas
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Har du fått något gjort av mig? Tagga{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Instagram className="h-3.5 w-3.5" aria-hidden="true" /> @linsochlager
            </span>{" "}
            – dina bilder kan hamna här.
          </p>
        </div>
      </div>
    </section>
  );
}