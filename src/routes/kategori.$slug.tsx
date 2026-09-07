import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/shopify";
import { getCategory } from "@/lib/categories";
import { FOTOGRAFERING_URL, SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/kategori/$slug")({
  component: CategoryPage,
  // Loadern vämer produktcachen (samma queryKey som useQuery nedan) så
  // produkterna följer med i första SSR-HTML:en – i stället för att vänta
  // på hydrering + klientanrop. Körs på servern vid förstagångsbesöket.
  loader: async ({ params, context }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    await context.queryClient.ensureQueryData({
      queryKey: ["products", "tag", category.tag],
      queryFn: () => fetchProducts(50, `tag:${category.tag}`),
    });
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Kategorin hittades inte – Lins & Lager" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { title, description, slug } = loaderData.category;
    const pageTitle = `${title} – Lins & Lager`;
    // BreadcrumbList skrivs av Breadcrumbs-komponenten (absoluta URL:er) –
    // ett block per sida räcker, två blir motströmmande för crawlers.
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: `${SITE_URL}/kategori/${slug}`,
      },
    ];
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
        { rel: "canonical", href: `${SITE_URL}/kategori/${slug}` },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl font-bold tracking-tight">Kategorin finns inte</h1>
      <p className="mt-3 text-muted-foreground">
        Kika i sortimentet så hittar vi rätt present ihop.
      </p>
      <Link to="/" className="mt-6 inline-block font-semibold text-primary-deep hover:underline">
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
        <Breadcrumbs
          items={[{ label: "Sortiment", to: "/sortiment" }, { label: category.title }]}
        />

        <p className="mt-6 font-script text-2xl text-primary-deep">{category.kicker}</p>

        <h1 className="mt-1 font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {category.title}
        </h1>
        <p className="mt-3 line-clamp-2 max-w-2xl text-lg text-muted-foreground md:line-clamp-none">
          {category.description}
        </p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to="/kategori/$slug"
                params={{ slug: sub.slug }}
                className="rounded-full bg-cream px-4 py-2 text-sm font-medium transition-colors hover:text-primary-deep"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}

        {/* Ett kompakt trust-band – dolt på mobil (headerns rad säger samma
            sak) så första produktradan syns inom en skärmshöjd. */}
        <div className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl bg-cream p-4 text-sm sm:flex">
          {[
            "Tillverkas här hemma efter din beställning",
            "Digital skiss på gravyren innan jag börjar",
            "Fri frakt inom Sverige över 800 kr",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>

        {isPending ? (
          <ProductGridSkeleton count={8} />
        ) : isError ? (
          <p className="py-16 text-center text-muted-foreground">
            Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
          </p>
        ) : products.length === 0 ? (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-xl font-bold">Fler produkter är på gång hit</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jag tillverkar efter önskemål – hör av dig så skissar jag något personligt till just
              ditt tillfälle.
            </p>
            <Button asChild className="mt-6 rounded-full px-6">
              <Link to="/kontakt">Fråga mig direkt</Link>
            </Button>
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
              <ProductGrid products={filters.filtered} resetKey={category.slug} />
            )}
          </>
        )}

        <RecentlyViewed />

        {category.slug === "jul" && (
          <section className="mt-16 rounded-3xl bg-ink p-8 text-ink-foreground md:p-10">
            <p className="font-script text-2xl text-gold">julklappsguiden</p>
            <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
              Vem ska du överraska i år?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "Han som har allt",
                  d: "Tumbler med namn, garageskylt med hans bil eller skärbräda med favoritreceptet graverat.",
                },
                {
                  t: "Barn & ungdomar",
                  d: "Namnskylt till barnrummet, nyckelring med första reg-numret eller dopring som följer genom livet.",
                },
                {
                  t: "Kollegor & värdar",
                  d: "Graverade glas, julgranskulor med årtalet och små presenter som känns personliga utan att kosta skjortan.",
                },
              ].map((g) => (
                <div key={g.t} className="rounded-2xl bg-ink-foreground/5 p-5">
                  <h3 className="font-serif text-lg font-bold">{g.t}</h3>
                  <p className="mt-1.5 text-sm opacity-80">{g.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-2 rounded-2xl bg-ink-foreground/5 p-4 text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              Beställ senast i början av december så hinner jag med – skriv ”framme till jul” i
              beställningen så prioriterar jag den.
            </p>
          </section>
        )}

        <section className="mt-16 rounded-3xl bg-cream p-8">
          <h2 className="font-serif text-2xl font-bold">Om {category.title.toLowerCase()}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            {category.about ??
              `Här samlar jag det jag just nu gör inom ${category.title.toLowerCase()}. Allt tillverkas för hand i verkstaden i Småland, efter din beställning. Hittar du inte precis det du söker skissar jag gärna något helt eget – skriv några rader om vem presenten är till, så föreslår jag ett upplägg.`}
          </p>
          {category.related && category.related.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Passar också till:</span>
              {category.related.map((slug) => {
                const rel = getCategory(slug);
                if (!rel) return null;
                return (
                  <Link
                    key={slug}
                    to="/kategori/$slug"
                    params={{ slug }}
                    className="rounded-full bg-cream px-4 py-1.5 font-medium transition-colors hover:text-primary-deep"
                  >
                    {rel.title}
                  </Link>
                );
              })}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <Link to="/vanliga-fragor" className="text-primary-deep hover:underline">
              Vanliga frågor
            </Link>
            <Link to="/garanti" className="text-primary-deep hover:underline">
              Om garantin
            </Link>
            <Link to="/tillverkningsprocessen" className="text-primary-deep hover:underline">
              Så tillverkas det
            </Link>
            <a
              href={FOTOGRAFERING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-deep hover:underline"
            >
              Boka fotografering
            </a>
            <Link to="/kontakt" className="text-primary-deep hover:underline">
              Fråga mig direkt
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
