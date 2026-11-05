import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterCatalog } from "@/lib/catalogSearch";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { occasions, productTypes, recipients } from "@/lib/categories";
import { fetchProducts } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

const SORTIMENT_TITLE = "Alla personliga presenter med gravyr – hela sortimentet | Taggat";

/**
 * ItemList-schema för de kategorikort som faktiskt renderas på sidan
 * (produkttyper + tillfällen) – ger Google en komplett katalogbild utan
 * att något påhittas: samma kategorier, samma ordning som på sidan.
 */
const CATEGORY_ITEM_LIST_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [...productTypes, ...recipients, ...occasions].map((category, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: category.title,
    url: `${SITE_URL}/kategori/${category.slug}`,
  })),
};

export const Route = createFileRoute("/sortiment")({
  validateSearch: (search: Record<string, unknown>): { q?: string; category?: string } => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : "",
  }),
  component: SortimentPage,
  // Värm produktcachen före SSR (samma queryKey som useQuery nedan).
  // Transient Storefront-fel: låt sidan rendera och visa felgrenen i stället
  // för att dö till roten.
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
      });
    } catch (error) {
      console.error("Sortiment-loadern: kunde inte värma produktcachen", error);
    }
  },
  head: () => ({
    meta: [
      { title: SORTIMENT_TITLE },
      {
        name: "description",
        content:
          "Alla handgjorda presenter: smycken, gravyr i trä och läder, skärbrädor, muggar, stickers, fototavlor och 3D-utskrifter. Filtrera och hitta din present.",
      },
      { property: "og:title", content: SORTIMENT_TITLE },
      {
        property: "og:description",
        content:
          "Handgjorda personliga presenter – smycken, gravyr, 3D-utskrifter, stickers och fototavlor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/sortiment` },
      ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(CATEGORY_ITEM_LIST_JSON_LD),
      },
    ],
  }),
});

function SortimentPage() {
  const { q = "", category = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });

  const selectedCategory = productTypes.find((item) => item.slug === category);
  const searchedProducts = filterCatalog(products, q, selectedCategory?.tag);
  const filters = useProductFilters(searchedProducts);
  const updateSearch = (values: { q?: string; category?: string }) => {
    void navigate({
      search: (prev) => ({ ...prev, ...values }),
      replace: true,
      resetScroll: false,
    });
  };
  return (
    <>
      <header className="border-b border-border/60 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-8 md:py-10">
          <Breadcrumbs items={[{ label: "Hela sortimentet" }]} />
          <Kicker className="mt-6">hela sortimentet</Kicker>
          <h1 className="mt-1 font-serif text-4xl tracking-tight text-balance md:text-5xl">
            Allt jag gör
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Varje produkt kan personaliseras med namn, datum eller din egen hälsning – och du får
            alltid en skiss innan jag graverar.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:py-10">
        <section id="sortiment" className="scroll-mt-24" aria-labelledby="utbud-heading">
          <h2 id="utbud-heading" className="sr-only">
            Alla produkter
          </h2>

          <div
            role="search"
            aria-label="Sök och filtrera sortimentet"
            className="grid items-end gap-4 border-b border-border pb-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)_auto]"
          >
            <div>
              <label htmlFor="catalog-search" className="mb-2 block text-sm font-semibold">
                Sök produkter
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="catalog-search"
                  type="search"
                  value={q}
                  onChange={(event) => updateSearch({ q: event.target.value })}
                  placeholder="Produkt, material eller tillfälle…"
                  className="h-11 pl-10"
                />
              </div>
            </div>
            <div className="min-w-0">
              <span id="category-filter-label" className="mb-2 block text-sm font-semibold">
                Kategori
              </span>
              <Select
                value={selectedCategory?.slug || "all"}
                onValueChange={(value) => updateSearch({ category: value === "all" ? "" : value })}
              >
                <SelectTrigger
                  aria-labelledby="category-filter-label"
                  className="h-11 w-full min-w-0 bg-background"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  {productTypes
                    .filter(
                      (item) =>
                        products.some((p) => p.node.tags?.includes(item.tag)),
                    )
                    .map((item) => (
                      <SelectItem key={item.slug} value={item.slug}>
                        {item.short || item.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {(q || category || filters.activeCount > 0) && (
              <Button
                variant="ghost"
                className="h-11"
                onClick={() => {
                  updateSearch({ q: "", category: "" });
                  filters.clear();
                }}
              >
                <X aria-hidden="true" className="h-4 w-4" />
                Rensa alla
              </Button>
            )}
          </div>

          {isPending ? (
            <div className="flex justify-center py-16" role="status">
              <Loader2 className="h-6 w-6 animate-spin text-primary-deep" aria-hidden="true" />
              <span className="sr-only">Hämtar produkterna…</span>
            </div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">
              Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
            </p>
          ) : products.length === 0 ? (
            <div className="mt-8 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
              <p className="font-serif text-xl">Inga produkter ännu</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Här visas dina produkter så fort de finns i butiken.
              </p>
            </div>
          ) : (
            <>
              <ProductFilters {...filters} total={products.length} />
              {filters.filtered.length === 0 ? (
                <div className="mt-8 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
                  <p className="font-serif text-xl">Inga produkter matchade dina val</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Rensa filtret – eller{" "}
                    <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
                      skriv till mig
                    </Link>
                    , jag gör gärna något helt eget åt dig.
                  </p>
                </div>
              ) : (
                <ProductGrid
                  products={filters.filtered}
                  resetKey={`${q}:${category}:${filters.activeTags.join(",")}:${filters.bucket}:${filters.sort}`}
                />
              )}
            </>
          )}
        </section>

        <section className="mt-12 border-t border-border pt-8" aria-labelledby="hitta-heading">
          <h2 id="hitta-heading" className="font-serif text-2xl">
            Hitta på ditt sätt
          </h2>
          <div className="mt-5 grid gap-7 md:grid-cols-3">
            {[
              { title: "Produkttyp", items: productTypes },
              { title: "Mottagare", items: recipients },
              { title: "Tillfälle", items: occasions },
            ].map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {group.items.map((category) => (
                    <li key={category.slug}>
                      <Link
                        to="/kategori/$slug"
                        params={{ slug: category.slug }}
                        hash="produkter"
                        className="hover:text-primary-deep hover:underline"
                      >
                        {category.short || category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
