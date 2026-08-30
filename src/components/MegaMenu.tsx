import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { occasions, productTypes } from "@/lib/categories";

type Group = { label: string; slugs: string[]; note: string };

const GROUPS: Group[] = [
  {
    label: "Smycken & Accessoarer",
    slugs: ["smycken", "nyckelringar", "lader"],
    note: "Gravyr i silver, stål och läder – till dop, bröllop och vardag.",
  },
  {
    label: "Gravyr i trä & läder",
    slugs: ["skarbrador", "lader", "glas"],
    note: "Massiv ek, läder och glas med djup gravyr. Populärt till farsdag och jakt.",
  },
  {
    label: "Dryck & Prylar",
    slugs: ["muggar", "tumblers", "glas", "stickers"],
    note: "Muggar, tumblers och dekaler med namn, logga eller eget motiv.",
  },
  {
    label: "Kläder & Profil",
    slugs: ["t-shirt", "hoodies", "kepsar"],
    note: "Tryck och broderi från ett plagg och uppåt – till laget och företaget.",
  },
  {
    label: "Foto & 3D",
    slugs: ["fototavlor", "3d-utskrifter"],
    note: "Jag fotograferar också – bilden blir tavla, smycke eller 3D-detalj.",
  },
];

const OCCASION_SLUGS = ["brollop", "dop", "foretag", "farsdag", "barn", "gravyr"];

function findType(slug: string) {
  return productTypes.find((c) => c.slug === slug);
}

export function MegaMenu() {
  return (
    <div className="group/menu relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary"
        aria-haspopup="true"
      >
        Sortiment <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="invisible absolute top-full left-1/2 z-50 w-[860px] max-w-[92vw] -translate-x-1/2 pt-4 opacity-0 transition-opacity group-hover/menu:visible group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:opacity-100">
        <div className="grid gap-6 rounded-3xl border border-border bg-card p-7 shadow-lift md:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p className="font-serif text-lg font-bold">{g.label}</p>
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
                        className="hover:text-primary hover:underline"
                      >
                        {c.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl bg-cream p-5">
            <p className="font-serif text-lg font-bold">Passar till</p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm">
              {OCCASION_SLUGS.map((slug) => {
                const c = occasions.find((o) => o.slug === slug);
                if (!c) return null;
                return (
                  <li key={slug}>
                    <Link
                      to="/kategori/$slug"
                      params={{ slug: c.slug }}
                      className="hover:text-primary hover:underline"
                    >
                      {c.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              href="https://linsochlager.net/foto"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Boka fotografering →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
