import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { occasions, productTypes } from "@/lib/categories";

import { cn } from "@/lib/utils";

type Group = { label: string; slugs: string[]; note: string; tint: TintKey };

// Färgkod per grupp — hela klasssträngarna står här (literal) så att
// Tailwind hittar dem vid kompilering.
type TintKey = "rose" | "wood" | "teal" | "steel" | "forest" | "plum" | "gold";
const TINTS: Record<TintKey, { card: string; dot: string; heading: string }> = {
  rose: {
    card: "border-menu-rose/40 bg-menu-rose/10 hover:bg-menu-rose/15",
    dot: "bg-menu-rose",
    heading: "text-menu-rose",
  },
  wood: {
    card: "border-menu-wood/40 bg-menu-wood/10 hover:bg-menu-wood/15",
    dot: "bg-menu-wood",
    heading: "text-menu-wood",
  },
  teal: {
    card: "border-menu-teal/40 bg-menu-teal/10 hover:bg-menu-teal/15",
    dot: "bg-menu-teal",
    heading: "text-menu-teal",
  },
  steel: {
    card: "border-menu-steel/40 bg-menu-steel/10 hover:bg-menu-steel/15",
    dot: "bg-menu-steel",
    heading: "text-menu-steel",
  },
  forest: {
    card: "border-menu-forest/40 bg-menu-forest/10 hover:bg-menu-forest/15",
    dot: "bg-menu-forest",
    heading: "text-menu-forest",
  },
  plum: {
    card: "border-menu-plum/40 bg-menu-plum/10 hover:bg-menu-plum/15",
    dot: "bg-menu-plum",
    heading: "text-menu-plum",
  },
  gold: {
    card: "border-gold/50 bg-gold/10 hover:bg-gold/15",
    dot: "bg-gold",
    heading: "text-primary-deep",
  },
};

// Varje slug ingår i exakt EN grupp – samma kategori två
// gånger i samma dropdown läses autogenererat ut.
const GROUPS: Group[] = [
  {
    label: "Smycken & Accessoarer",
    slugs: ["smycken", "nyckelringar", "lader"],
    note: "Gravyr i silver, stål och läder – till dop, bröllop och vardag.",
    tint: "rose",
  },
  {
    label: "Gravyr i trä & glas",
    slugs: ["skarbrador", "glas"],
    note: "Massiv ek och sandblästrat glas med djup gravyr. Populärt till farsdag och jakt.",
    tint: "wood",
  },
  {
    label: "Dryck & Prylar",
    slugs: ["muggar", "tumblers", "stickers"],
    note: "Muggar, tumblers och dekaler med namn, logga eller eget motiv.",
    tint: "teal",
  },
  {
    label: "Kläder & Profil",
    slugs: ["t-shirt", "hoodies", "kepsar"],
    note: "Tryck och broderi från ett plagg och uppåt – till laget och företaget.",
    tint: "steel",
  },
  {
    label: "Till bilen & Garaget",
    slugs: ["bil"],
    note: "Nyckelring med reg.nr, garageskylt och graverade prylar till bilentusiasten.",
    tint: "forest",
  },
  {
    label: "Foto & 3D",
    slugs: ["fototavlor", "3d-utskrifter"],
    note: "Jag fotograferar också – bilden blir tavla, smycke eller 3D-detalj.",
    tint: "plum",
  },
];

// Kurerat urval till megamenyn (mobilmenyn listar alla tillfällen
// automatiskt) — säsongssidorna först, sedan de stora tillfällena.
const OCCASION_SLUGS = [
  "jul",
  "halloween",
  "alla-hjartans-dag",
  "brollop",
  "dop",
  "konfirmation",
  "fodelsedag",
  "arsdag",
  "foretag",
  "pension",
  "farsdag",
  "barn",
];

function findType(slug: string) {
  return productTypes.find((c) => c.slug === slug);
}

export function MegaMenu() {
  const [open, setOpen] = useState(false);

  // Esc stänger menyn — klick-togglingen gör den dessutom användbar på pekplatta
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="group/menu relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={(e) => {
          // Stäng när fokus lämnar hela menyn (klick ut ur komponenten täcks av toggle)
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
        }}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary-deep",
          open && "text-primary-deep",
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Sortiment{" "}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 z-50 w-[min(860px,92vw)] pt-4 opacity-0 transition-opacity",
          // Hover/fokus öppnar på desktop som innan; klick-toggling läggs ovanpå
          "invisible group-hover/menu:visible group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:opacity-100",
          open && "visible opacity-100",
        )}
      >
        <div className="grid gap-3 rounded-3xl border border-border bg-card p-4 shadow-lift md:grid-cols-3">
          {GROUPS.map((g) => {
            const t = TINTS[g.tint];
            return (
              <div
                key={g.label}
                className={cn(
                  "rounded-2xl border p-4 transition-colors",
                  t.card,
                )}
              >
                <p className="flex items-center gap-2 font-serif text-base font-bold">
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", t.dot)}
                    aria-hidden="true"
                  />
                  {g.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{g.note}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {g.slugs.map((slug) => {
                    const c = findType(slug);
                    if (!c) return null;
                    return (
                      <li key={`${g.label}-${slug}`}>
                        <Link
                          to="/kategori/$slug"
                          params={{ slug: c.slug }}
                          className={cn("font-medium hover:underline", t.heading)}
                        >
                          {c.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div
            className={cn(
              "rounded-2xl border p-4 transition-colors md:col-span-3",
              TINTS.gold.card,
            )}
          >
            <p className="flex items-center gap-2 font-serif text-base font-bold">
              <span
                className={cn("h-2.5 w-2.5 rounded-full", TINTS.gold.dot)}
                aria-hidden="true"
              />
              Passar till
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm sm:grid-cols-4 lg:grid-cols-6">
              {OCCASION_SLUGS.map((slug) => {
                const c = occasions.find((o) => o.slug === slug);
                if (!c) return null;
                return (
                  <li key={slug}>
                    <Link
                      to="/kategori/$slug"
                      params={{ slug: c.slug }}
                      className="font-medium text-primary-deep hover:underline"
                    >
                      {c.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
