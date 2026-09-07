import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FREE_SHIPPING_LIMIT, type ShopifyProduct } from "@/lib/shopify";

export type SortValue = "popular" | "price-asc" | "price-desc" | "name";

const TAG_LABELS: Record<string, string> = {
  tra: "Trä",
  lader: "Läder",
  smycken: "Smycken",
  gravyr: "Gravyr",
  "3d": "3D-utskrift",
  stickers: "Stickers",
  foto: "Foto",
  brollop: "Bröllop",
  dop: "Dop",
  barn: "Barn",
  foretag: "Företag",
  farsdag: "Farsdag",
  halloween: "Halloween",
  student: "Student",
  morsdag: "Mors dag",
  hjartansdag: "Alla hjärtans dag",
  arsdag: "Årsdag",
  konfirmation: "Konfirmation",
  pension: "Pension",
  "nytt-hem": "Nytt hem",
  jakt: "Jakt",
  bastsaljare: "Bästsäljare",
  nyhet: "Nyhet",
  nyckelring: "Nyckelring",
  glas: "Glas",
  keps: "Keps",
  tshirt: "T-shirt",
  hoodie: "Hoodie",
  mugg: "Mugg",
  tumbler: "Tumbler",
  skarbrada: "Skärbräda",
};

/** Taggar som räknas som produkttyp (egen filtergrupp) */
const TYPE_TAGS = [
  "nyckelring",
  "glas",
  "keps",
  "tshirt",
  "hoodie",
  "mugg",
  "tumbler",
  "smycken",
  "skarbrada",
  "lader",
  "stickers",
  "foto",
  "3d",
];

const PRICE_BUCKETS = [
  { id: "0-199", label: "Under 200 kr", min: 0, max: 199.99 },
  { id: "200-499", label: "200–499 kr", min: 200, max: 499.99 },
  { id: "500-799", label: "500–799 kr", min: 500, max: 799.99 },
  {
    id: "800",
    label: `${FREE_SHIPPING_LIMIT} kr och uppåt (fri frakt)`,
    min: FREE_SHIPPING_LIMIT,
    max: Infinity,
  },
];

function priceOf(p: ShopifyProduct) {
  return parseFloat(p.node.priceRange.minVariantPrice.amount);
}

export function useProductFilters(products: ShopifyProduct[], hiddenTags: string[] = []) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [bucket, setBucket] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>("popular");

  const availableTags = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) =>
      (p.node.tags || []).forEach((t) => {
        if (hiddenTags.includes(t)) return;
        counts.set(t, (counts.get(t) || 0) + 1);
      }),
    );
    return [...counts.entries()]
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count, label: TAG_LABELS[tag] || tag }));
  }, [products, hiddenTags]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const tags = p.node.tags || [];
      const tagOk = activeTags.every((t) => tags.includes(t));
      const b = PRICE_BUCKETS.find((x) => x.id === bucket);
      const priceOk = !b || (priceOf(p) >= b.min && priceOf(p) <= b.max);
      return tagOk && priceOk;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-desc") list.sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === "name") list.sort((a, b) => a.node.title.localeCompare(b.node.title, "sv"));
    if (sort === "popular")
      list.sort(
        (a, b) =>
          Number((b.node.tags || []).includes("bastsaljare")) -
          Number((a.node.tags || []).includes("bastsaljare")),
      );
    return list;
  }, [products, activeTags, bucket, sort]);

  const activeCount = activeTags.length + (bucket ? 1 : 0);

  return {
    filtered,
    availableTags,
    activeTags,
    bucket,
    sort,
    setSort,
    activeCount,
    toggleTag: (tag: string) =>
      setActiveTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      ),
    setBucket: (id: string) => setBucket((prev) => (prev === id ? null : id)),
    clear: () => {
      setActiveTags([]);
      setBucket(null);
      setSort("popular");
    },
  };
}

type FiltersProps = ReturnType<typeof useProductFilters> & { total: number };

export function ProductFilters(props: FiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    // mt-4 på mobil: filtret ska inte skjuta första produktraden
    // under en skärmhöjd (mt-10 blev för mycket luft på telefonen).
    <div className="mt-4 rounded-3xl border border-border bg-card p-4 shadow-soft md:mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={open ? "default" : "secondary"}
            size="sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filter-panel"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtrera
            {props.activeCount > 0 && (
              <span className="ml-2 rounded-full bg-gold px-2 text-xs text-ink">
                {props.activeCount}
              </span>
            )}
          </Button>
          <span className="text-sm text-muted-foreground">
            {props.filtered.length} av {props.total} produkter
          </span>
          {props.activeCount > 0 && (
            <button
              type="button"
              onClick={props.clear}
              className="inline-flex items-center gap-1 py-2 text-sm font-medium text-primary-deep hover:underline"
            >
              <X className="h-3.5 w-3.5" /> Rensa
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span id="sort-label">Sortera</span>
          <Select value={props.sort} onValueChange={(v) => props.setSort(v as SortValue)}>
            <SelectTrigger
              aria-labelledby="sort-label"
              className="h-11 rounded-full border-border bg-background px-4 text-sm text-foreground md:h-9"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Mest älskade</SelectItem>
              <SelectItem value="price-asc">Lägsta pris</SelectItem>
              <SelectItem value="price-desc">Högsta pris</SelectItem>
              <SelectItem value="name">Namn A–Ö</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {props.activeCount > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {props.activeTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => props.toggleTag(tag)}
              className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-medium hover:text-primary-deep"
            >
              {TAG_LABELS[tag] || tag}
              <X className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Ta bort filter</span>
            </button>
          ))}
          {props.bucket && (
            <button
              type="button"
              onClick={() => props.setBucket(props.bucket as string)}
              className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-medium hover:text-primary-deep"
            >
              {PRICE_BUCKETS.find((b) => b.id === props.bucket)?.label}
              <X className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Ta bort prisfilter</span>
            </button>
          )}
        </div>
      )}

      {open && (
        <div
          id="filter-panel"
          className="mt-5 grid gap-6 border-t border-border pt-5 sm:grid-cols-3"
        >
          {(
            [
              ["Produkttyp", props.availableTags.filter((t) => TYPE_TAGS.includes(t.tag))],
              ["Passar till", props.availableTags.filter((t) => !TYPE_TAGS.includes(t.tag))],
            ] as const
          ).map(([groupTitle, tags]) =>
            tags.length === 0 ? null : (
              <div key={groupTitle}>
                <p className="text-sm font-semibold">{groupTitle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button
                      key={t.tag}
                      type="button"
                      onClick={() => props.toggleTag(t.tag)}
                      aria-pressed={props.activeTags.includes(t.tag)}
                      className={cn(
                        // min-h-11: 44 px tryckyta – tummens minimimått
                        "min-h-11 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        props.activeTags.includes(t.tag)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary",
                      )}
                    >
                      {t.label} <span className="opacity-60">({t.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            ),
          )}

          <div>
            <p className="text-sm font-semibold">Prisläge</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRICE_BUCKETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => props.setBucket(b.id)}
                  aria-pressed={props.bucket === b.id}
                  className={cn(
                    "min-h-11 rounded-full border px-3 py-1.5 text-sm transition-colors",
                    props.bucket === b.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:border-primary",
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
