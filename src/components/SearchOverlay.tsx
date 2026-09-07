import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/stores/uiStore";
import { productTypes } from "@/lib/categories";
import { formatPrice, searchProducts } from "@/lib/shopify";

const POPULAR = ["nyckelring", "smycken", "skärbräda", "mugg", "gravyr"];

/** tag → kort produktypsnamn, för träffraderna */
const TAG_TO_TYPE = new Map(productTypes.map((c) => [c.tag, c.short || c.title]));

export function SearchOverlay() {
  // Öppet-läge i uiStore så ⌘K i headern kan öppna söket
  const open = useUiStore((s) => s.searchOpen);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(term), 250);
    return () => clearTimeout(t);
  }, [term]);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => searchProducts(debounced, 8),
    enabled: debounced.trim().length >= 2,
  });

  // Matchar söktermen en produkttyp? Då bjuder vi in till kategorisidan direkt.
  const matchedCategory = useMemo(() => {
    const t = debounced.trim().toLowerCase();
    if (t.length < 2) return null;
    return (
      productTypes.find(
        (c) =>
          c.tag.toLowerCase() === t ||
          c.title.toLowerCase().includes(t) ||
          c.slug.toLowerCase().includes(t) ||
          (c.short?.toLowerCase().includes(t) ?? false),
      ) ?? null
    );
  }, [debounced]);

  const close = (v: boolean) => {
    setSearchOpen(v);
    if (!v) setTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 w-9 gap-2 rounded-full px-3 md:w-auto"
          aria-label="Sök i butiken"
        >
          <Search className="h-5 w-5" />
          <kbd className="hidden pointer-events-none rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-muted-foreground md:inline">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Vad letar du efter?</DialogTitle>
          <DialogDescription>
            Sök på produkt, material eller tillfälle – till exempel &quot;nyckelring&quot; eller
            &quot;bröllop&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Sök i butiken…"
            aria-label="Sök i butiken"
            className="pl-9"
          />
        </div>

        <div aria-live="polite">
          {debounced.trim().length < 2 ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Populära sökningar</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTerm(p)}
                      className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Bläddra i sortimentet</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {productTypes.slice(0, 8).map((c) => (
                    <Link
                      key={c.slug}
                      to="/kategori/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-full bg-cream px-3 py-1.5 text-sm hover:text-primary-deep"
                    >
                      {c.short}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : isFetching ? (
            <div className="flex justify-center py-8" role="status">
              <Loader2 className="h-5 w-5 animate-spin text-primary-deep" aria-hidden="true" />
              <span className="sr-only">Söker…</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Hittade inget på &quot;{debounced}&quot; – men det är ofta just här det egna uppdraget
              börjar.{" "}
              <Link
                to="/kontakt"
                onClick={() => setSearchOpen(false)}
                className="font-semibold text-primary-deep underline underline-offset-4"
              >
                Skriv till mig så gör jag något eget åt dig
              </Link>
            </div>
          ) : (
            <>
              {matchedCategory && (
                <Link
                  to="/kategori/$slug"
                  params={{ slug: matchedCategory.slug }}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between gap-2 rounded-full border border-gold/50 bg-gold/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gold/25"
                >
                  Gå till {matchedCategory.short || matchedCategory.title}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              )}
              <ul className="max-h-80 space-y-2 overflow-y-auto">
                {results.map((p) => {
                  const img = p.node.images?.edges?.[0]?.node;
                  const typeName = (p.node.tags || []).map((t) => TAG_TO_TYPE.get(t)).find(Boolean);
                  return (
                    <li key={p.node.id}>
                      <Link
                        to="/produkt/$handle"
                        params={{ handle: p.node.handle }}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-cream"
                      >
                        <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                          {img && (
                            <img
                              src={img.url}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{p.node.title}</span>
                          <span className="block text-sm text-muted-foreground">
                            {typeName && <>{typeName} · </>}
                            <span className="tabular-nums">
                              {formatPrice(
                                p.node.priceRange.minVariantPrice.amount,
                                p.node.priceRange.minVariantPrice.currencyCode,
                              )}
                            </span>
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between gap-2 border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">
                  Visade {results.length} {results.length === 1 ? "träff" : "träffar"}
                </span>
                <Link
                  to="/sortiment"
                  onClick={() => setSearchOpen(false)}
                  className="font-medium text-primary-deep hover:underline"
                >
                  Bläddra i hela sortimentet
                </Link>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
