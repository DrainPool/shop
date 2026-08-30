import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
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
import { productTypes } from "@/lib/categories";
import { formatPrice, searchProducts } from "@/lib/shopify";

const POPULAR = ["nyckelring", "smycken", "skärbräda", "mugg", "gravyr"];

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
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

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTerm("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Sök i butiken">
          <Search className="h-5 w-5" />
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
            className="pl-9"
          />
        </div>

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
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-cream px-3 py-1.5 text-sm hover:text-primary"
                  >
                    {c.short}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : isFetching ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : results.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Hittade inget på &quot;{debounced}&quot;. Skriv till mig så gör jag något eget åt dig.
          </p>
        ) : (
          <ul className="max-h-80 space-y-2 overflow-y-auto">
            {results.map((p) => {
              const img = p.node.images?.edges?.[0]?.node;
              return (
                <li key={p.node.id}>
                  <Link
                    to="/produkt/$handle"
                    params={{ handle: p.node.handle }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-cream"
                  >
                    <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {img && (
                        <img
                          src={img.url}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{p.node.title}</span>
                      <span className="block text-sm text-muted-foreground">
                        {formatPrice(
                          p.node.priceRange.minVariantPrice.amount,
                          p.node.priceRange.minVariantPrice.currencyCode,
                        )}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
