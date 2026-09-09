import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Loader2, Search } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { IdeaBand } from "@/components/IdeaBand";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Reveal } from "@/components/category/Reveal";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/uiStore";
import { occasions, productTypes } from "@/lib/categories";
import { fetchProducts } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/sortiment")({
  component: SortimentPage,
  // Värm produktcachen före SSR (samma queryKey som useQuery nedan).
  // Transient Storefront-fel: låt sidan rendera och visa felgrenen i stället
  // för att dö till roten.
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["products"],
        queryFn: () => fetchProducts(50),
      });
    } catch (error) {
      console.error("Sortiment-loadern: kunde inte värma produktcachen", error);
    }
  },
  head: () => ({
    meta: [
      { title: "Hela sortimentet – TaggaDet" },
      { rel: "canonical", href: `${SITE_URL}/sortiment` },
      {
        name: "description",
        content:
          "Alla handgjorda presenter på ett ställe: smycken, gravyr i trä och läder, skärbrädor, muggar, stickers, fototavlor och 3D-utskrifter. Filtrera och hitta din present.",
      },
      { property: "og:title", content: "Hela sortimentet – TaggaDet" },
      {
        property: "og:description",
        content:
          "Handgjorda personliga presenter – smycken, gravyr, 3D-utskrifter, stickers och fototavlor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SortimentPage() {
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts(50) });

  const filters = useProductFilters(products);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);

  return (
    <>
      <CategoryIconRow />
      {/* Hero-kapitel: säljer bredden och visar två vägar in – sök
          (primär) eller skrolla till utbudet (sekundär). */}
      <header className="border-b border-border/60 bg-cream">
        <div className="mx-auto max-w-6xl px-5 pt-6 pb-16 md:pt-8 md:pb-20">
          <Breadcrumbs items={[{ label: "Hela sortimentet" }]} />
          <p className="mt-8 font-script text-2xl text-primary-deep md:mt-10">hela sortimentet</p>
          <h1 className="mt-1 font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl">
            Allt jag gör
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Varje produkt kan personaliseras med namn, datum eller din egen hälsning – och du får
            alltid en skiss innan jag graverar.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="min-h-11 rounded-full px-6"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Sök i sortimentet
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-11 rounded-full px-6">
              <a href="#sortiment">
                Se hela utbudet
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        {/* Kapitel: produkttyper – datadrivet från kategorikartan, så nya
            kategorier syns här utan att sidan behöver röras. */}
        <section aria-labelledby="produkttyper-heading">
          <Reveal>
            <p className="font-script text-2xl text-primary-deep">vad vill du gravera på?</p>
            <h2
              id="produkttyper-heading"
              className="mt-1 font-serif text-3xl font-bold tracking-tight"
            >
              Välj utifrån sak
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Glas, trä, läder, metall och tryck – varje sak har sin egen gravyr, och texten är
              alltid din egen.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((category, i) => (
              <Reveal key={category.slug} className="h-full" delay={(i % 3) * 60}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Kapitel: tillfällen – kompaktare kort, fortfarande datadrivet. */}
        <section className="mt-20" aria-labelledby="tillfallen-heading">
          <Reveal>
            <p className="font-script text-2xl text-primary-deep">eller utifrån tillfälle</p>
            <h2
              id="tillfallen-heading"
              className="mt-1 font-serif text-3xl font-bold tracking-tight"
            >
              Fira något
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Presenter sorterade på kalaset i stället för saken – bröllop, dop, födelsedagen och
              alla årets stora dagar.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-flow-dense gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((category, i) => (
              <Reveal key={category.slug} className="h-full" delay={(i % 3) * 60}>
                <CategoryCard category={category} compact />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Kapitel: hela utbudet med filter – sidans kärna. */}
        <section
          id="sortiment"
          className="mt-20 scroll-mt-24 border-t border-border pt-12"
          aria-labelledby="utbud-heading"
        >
          <p className="font-script text-2xl text-primary-deep">allt på en plats</p>
          <h2 id="utbud-heading" className="mt-1 font-serif text-3xl font-bold tracking-tight">
            Hela utbudet
          </h2>

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
              <p className="font-serif text-xl font-bold">Inga produkter ännu</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Här visas dina produkter så fort de finns i butiken.
              </p>
            </div>
          ) : (
            <>
              <ProductFilters {...filters} total={products.length} />
              {filters.filtered.length === 0 ? (
                <div className="mt-8 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
                  <p className="font-serif text-xl font-bold">Inget matchade ditt filter</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Rensa filtret – eller{" "}
                    <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
                      skriv till mig
                    </Link>
                    , jag gör gärna något helt eget åt dig.
                  </p>
                </div>
              ) : (
                <ProductGrid products={filters.filtered} resetKey="sortiment" />
              )}
            </>
          )}
        </section>

        <RecentlyViewed />
      </div>

      <IdeaBand />
    </>
  );
}
