import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { fetchProducts } from "@/lib/shopify";

export const Route = createFileRoute("/sortiment")({
  component: SortimentPage,
  head: () => ({
    meta: [
      { title: "Hela sortimentet – Lins & Lager" },
      {
        name: "description",
        content:
          "Alla handgjorda presenter på ett ställe: smycken, gravyr i trä och läder, skärbrädor, muggar, stickers, fototavlor och 3D-utskrifter. Filtrera och hitta din present.",
      },
      { property: "og:title", content: "Hela sortimentet – Lins & Lager" },
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

  return (
    <>
      <CategoryIconRow />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Hem
          </Link>
          <span className="px-2">/</span>
          <span>Hela sortimentet</span>
        </nav>

        <p className="mt-6 font-script text-2xl text-primary">hela sortimentet</p>
        <h1 className="mt-1 font-serif text-4xl font-black tracking-tight md:text-5xl">
          Allt jag gör
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Varje produkt kan personaliseras med namn, datum eller din egen hälsning – och du får
          alltid en skiss innan jag graverar.
        </p>

        {isPending ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <p className="py-16 text-center text-muted-foreground">
            Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
          </p>
        ) : products.length === 0 ? (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
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
                  Rensa filtret – eller skriv till mig, jag gör gärna något helt eget åt dig.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filters.filtered.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
