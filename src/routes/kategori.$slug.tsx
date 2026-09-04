import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { CutoffCountdown } from "@/components/FomoBanner";
import { fetchProducts } from "@/lib/shopify";
import { getCategory } from "@/lib/categories";


export const Route = createFileRoute("/kategori/$slug")({
  component: CategoryPage,
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Kategorin hittades inte – Lins & Lager" }, { name: "robots", content: "noindex" }] };
    }
    const { title, description } = loaderData.category;
    const pageTitle = `${title} – Lins & Lager`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl font-black tracking-tight">Kategorin finns inte</h1>
      <p className="mt-3 text-muted-foreground">Kika i sortimentet så hittar vi rätt present ihop.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-primary hover:underline">
        Till startsidan
      </Link>
    </div>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", "tag", category.tag],
    queryFn: () => fetchProducts(50, `tag:${category.tag}`),
  });

  const filters = useProductFilters(products, [category.tag]);

  return (
    <>
      <CategoryIconRow activeSlug={category.slug} />
      <div className="mx-auto max-w-6xl px-5 py-14">
      <Breadcrumbs items={[{ label: "Sortiment", to: "/sortiment" }, { label: category.title }]} />

      <p className="mt-6 font-script text-2xl text-primary">{category.kicker}</p>

      <h1 className="mt-1 font-serif text-4xl font-black tracking-tight md:text-5xl">
        {category.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{category.description}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          "Tillverkas här hemma efter din beställning",
          "Digital skiss på gravyren innan jag börjar",
          "Fri frakt inom Sverige över 800 kr",
        ].map((t) => (
          <p key={t} className="flex items-start gap-2 rounded-2xl bg-cream p-4 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{t}</span>
          </p>
        ))}
      </div>

      <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>
          Beställ inom <CutoffCountdown className="text-primary" /> så ryms din present i veckans
          tillverkning – annars blir det nästa vecka.
        </span>
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
          <p className="font-serif text-xl font-bold">Inga produkter här ännu</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Hör av dig så tar vi fram något personligt till just ditt tillfälle.
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
            <ProductGrid products={filters.filtered} resetKey={category.slug} />
          )}
        </>
      )}

      <RecentlyViewed />

      <section className="mt-16 rounded-3xl bg-cream p-8">

        <h2 className="font-serif text-2xl font-bold">Om {category.title.toLowerCase()}</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {category.description} Allt tillverkas i min egen verkstad – gravyr, tryck och montering –
          och jag fotograferar dessutom bröllop, dop och produkter, så bilden du älskar kan bli både
          tavla och graverat minne. Vet du inte vilket material som passar? Skriv några rader om vem
          presenten är till, så föreslår jag ett upplägg som håller i många år.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <Link to="/vanliga-fragor" className="text-primary hover:underline">
            Vanliga frågor
          </Link>
          <a
            href="https://linsochlager.net/foto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Boka fotografering
          </a>
          <Link to="/kontakt" className="text-primary hover:underline">
            Fråga mig direkt
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
