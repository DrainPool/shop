import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { occasions, productTypes, recipients } from "@/lib/categories";
import { cn } from "@/lib/utils";

const featuredOccasions = ["brollop", "dop", "fodelsedag", "farsdag", "jul", "foretag"];

export function MegaMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="group/menu relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node))
            setOpen(false);
        }}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary-deep",
          open && "text-primary-deep",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="megameny-panel"
      >
        Sortiment
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        id="megameny-panel"
        className={cn(
          "invisible absolute top-full left-0 z-50 w-[min(680px,92vw)] pt-3 opacity-0 transition-opacity",
          "group-hover/menu:visible group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:opacity-100",
          open && "visible opacity-100",
        )}
      >
        <div className="rounded-2xl border border-border bg-card shadow-lift">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="font-serif text-lg">Hitta rätt present</p>
            <Link
              to="/sortiment"
              className="text-sm font-semibold text-primary-deep hover:underline"
            >
              Se hela sortimentet
            </Link>
          </div>
          <div className="grid gap-0 sm:grid-cols-3 sm:divide-x sm:divide-border">
            <nav aria-label="Produkttyper" className="p-6">
              <p className="flex items-center gap-2 font-serif text-lg">
                Produkter
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </p>
              <ul className="mt-4 space-y-1 text-sm">
                {productTypes.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to="/kategori/$slug"
                      params={{ slug: category.slug }}
                      hash="produkter"
                      className="-mx-2 block rounded-lg px-2 py-1.5 transition-colors hover:bg-cream hover:text-primary-deep"
                    >
                      {category.short || category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Presenter till" className="border-t border-border p-6 sm:border-t-0">
              <p className="flex items-center gap-2 font-serif text-lg">
                Presenter till
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </p>
              <ul className="mt-4 space-y-1 text-sm">
                {recipients.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to="/kategori/$slug"
                      params={{ slug: category.slug }}
                      hash="produkter"
                      className="-mx-2 block rounded-lg px-2 py-1.5 transition-colors hover:bg-cream hover:text-primary-deep"
                    >
                      {category.slug === "presenter" ? "Alla presenter" : category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Tillfällen" className="border-t border-border p-6 sm:border-t-0">
              <p className="flex items-center gap-2 font-serif text-lg">
                Tillfällen
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </p>
              <ul className="mt-4 space-y-1 text-sm">
                {featuredOccasions.map((slug) => {
                  const category = occasions.find((item) => item.slug === slug);
                  if (!category) return null;
                  return (
                    <li key={slug}>
                      <Link
                        to="/kategori/$slug"
                        params={{ slug }}
                        hash="produkter"
                        className="-mx-2 block rounded-lg px-2 py-1.5 transition-colors hover:bg-cream hover:text-primary-deep"
                      >
                        {category.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
