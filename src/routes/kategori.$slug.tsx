import { withBase } from "@/lib/basePath";
import { GlassTypes } from "@/components/category/GlassTypes";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Camera, PawPrint, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductFilters, useProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { CategoryHero } from "@/components/category/CategoryHero";
import { RelatedCategoryCards } from "@/components/category/RelatedCategoryCards";
import { ServicePricingSection } from "@/components/category/ServicePricingSection";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { getCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

export const Route = createFileRoute("/kategori/$slug")({
  component: CategoryPage,
  // Loadern vämer produktcachen (samma queryKey som useQuery nedan) så
  // produkterna följer med i första SSR-HTML:en – i stället för att vänta
  // på hydrering + klientanrop. Körs på servern vid förstagångsbesöket.
  loader: async ({ params, context }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    let products: ShopifyProduct[] = [];
    try {
      // ensureQueryData löser ut själva datan – spara den så att head()
      // kan bygga ItemList-JSON-LD av samma produkter som värmts upp.
      products = await context.queryClient.ensureQueryData({
        queryKey: ["products", "tag", category.tag],
        queryFn: () => fetchProducts(Infinity, `tag:${category.tag}`),
      });
    } catch (error) {
      // Transient Storefront-fel i SSR: låt sidan rendera med skeleton i
      // stället för att dö till roten — klientens useQuery plockar upp
      // samma queryKey och visar isError-grenen vid bestående fel.
      console.error("Kategori-loader: kunde inte värma produktcachen", error);
    }
    // Produkterna i loaderData är bara till för head()s ItemList –
    // sidan själv renderar fortfarande via useQuery (samma queryKey).
    return { category, products };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Kategorin hittades inte – Taggat" },
          { name: "robots", content: "noindex" },
        ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/kategori/${slug}` },
      ]
      };
    }
    const { title, description, slug } = loaderData.category;
    const pageTitle = `${title} – Taggat`;
    // BreadcrumbList skrivs av Breadcrumbs-komponenten (absoluta URL:er) –
    // ett block per sida räcker, två blir motströmmande för crawlers.
    const jsonLd: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: `${SITE_URL}/kategori/${slug}`,
      },
    ];
    // ItemList av de produkter som faktiskt renderas i rutnätet. Tomt
    // resultat (tjänstekategori, avpublicerade produkter eller misslyckad
    // uppvärmning) → ingen ItemList alls, aldrig en tom lista för robots.
    if (loaderData.products?.length) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: loaderData.products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.node.title,
          url: `${SITE_URL}/produkt/${p.node.handle}`,
        })),
      });
    }
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
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
      <h1 className="font-serif text-4xl tracking-tight">Kategorin finns inte</h1>
      <p className="mt-3 text-muted-foreground">
        Kika runt i sortimentet, eller hör av dig – så hittar vi rätt present tillsammans.
      </p>
      <Link to="/" className="mt-6 inline-block font-semibold text-primary-deep hover:underline">
        Till startsidan
      </Link>
    </div>
  );
}

function CategoryPage() {
  const { category, products: loaderProducts } = Route.useLoaderData();
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", "tag", category.tag],
    queryFn: () => fetchProducts(Infinity, `tag:${category.tag}`),
    initialData: loaderProducts,
    initialDataUpdatedAt: 0,
  });

  const filters = useProductFilters(products, [category.tag]);
  // Tjänstekategorier (pricing-block i kategorikartan) har inga färdiga
  // produkter – deras sida byggs av about-text + prislista i stället.
  const isService = Boolean(category.pricing?.[0]);

  return (
    <>
      <CategoryHero category={category}>
        <Breadcrumbs
          items={[{ label: "Sortiment", to: "/sortiment" }, { label: category.title }]}
        />
      </CategoryHero>

      <div className="mx-auto max-w-7xl px-5 py-8 md:py-10">
        {/* Butikens löften syns redan i den globala löfte-raden under
            menyn – inget band här som upprepar samma rader en gång till. */}

        {/* Tjänstekategorier: berättelse + prislista i samma hierarki
            som en produktsida (bild/text vänster, pris höger). */}
        {isService && <ServicePricingSection category={category} />}
        {category.slug === "glas" && <GlassTypes products={products} />}

        <section
          id="produkter"
          className={isService ? "mt-12 scroll-mt-24 md:mt-14" : "mt-10 scroll-mt-24"}
          aria-labelledby={isService ? undefined : "utbud-heading"}
        >
          {!isService && (
            <>
              <h2 id="utbud-heading" className="sr-only">
                Produkter i {category.title}
              </h2>
            </>
          )}

          {isPending ? (
            <ProductGridSkeleton count={8} />
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">
              Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
            </p>
          ) : products.length === 0 ? (
            isService ? (
              /* Tom-läget för tjänstekategorier: det är inte en produkt som
                 saknas – tjänsten säljs via kontakt. */
              <div className="rounded-3xl border-2 border-dashed border-border bg-cream p-10 text-center md:p-12">
                <p className="font-serif text-xl">Gravyr i det du redan äger</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Du lämnar in dina saker hos mig i Aneby – eller bokar in mig på plats. Skriv vad
                  du vill ha märkt och hur många det gäller, så svarar jag med en skiss och ett pris
                  att godkänna innan lasern startar.
                </p>
                {/* Tjänstekategorin säljs via skissen – CTA:n får säga det,
                    inte samma formulering som överallt annars. */}
                <Button asChild className="mt-6 rounded-full px-6">
                  <Link to="/kontakt">Be om en skiss</Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
                <p className="font-serif text-xl">Fler produkter är på gång hit</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Jag tillverkar efter önskemål – hör av dig så skissar jag något personligt till
                  just ditt tillfälle.
                </p>
                <Button asChild className="mt-6 rounded-full px-6">
                  <Link to="/kontakt">Skriv din text till mig</Link>
                </Button>
              </div>
            )
          ) : (
            <>
              <ProductFilters {...filters} total={products.length} />
              {filters.filtered.length === 0 ? (
                <div className="mt-8 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
                  <p className="font-serif text-xl">Inget matchade ditt filter</p>
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
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Svårt att välja?{" "}
            <Link to="/presentguide" className="font-semibold text-foreground underline">
              Hitta rätt med presentguiden
            </Link>
          </p>
        </section>

        {/* Intern länkflod: related-kategorierna som kort, data-driven
            (sektionen renderas inte när related saknas). */}
        <RelatedCategoryCards slugs={category.related ?? []} currentSlug={category.slug} />

        {category.slug === "jul" && (
          <section className="mt-12 rounded-3xl bg-ink p-8 text-ink-foreground md:mt-14 md:p-10">
            <p className="font-inscription text-sm text-gold md:text-base">julklappsguiden</p>
            <h2 className="mt-1 font-serif text-3xl tracking-tight">Vem ska du överraska i år?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "Han som har allt",
                  d: "Tumbler med namn, garageskylt med hans bil eller skärbräda med favoritreceptet graverat.",
                },
                {
                  t: "Barn & ungdomar",
                  d: "Namnskylt till barnrummet, nyckelring med första reg-numret eller dopring som följer dig genom livet.",
                },
                {
                  t: "Kollegor & värdar",
                  d: "Graverade glas, julgranskulor med årtalet och små presenter som känns personliga utan att kosta skjortan.",
                },
              ].map((g) => (
                <div key={g.t} className="rounded-2xl bg-ink-foreground/5 p-5">
                  <h3 className="font-serif text-lg">{g.t}</h3>
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

        {/* Djupporträtt: före/efter med ett riktigt exempel (frallans tax)
            – bara på denna kategori, samma mönster som jul-sektionen. */}
        {category.slug === "djupportratt" && (
          <section className="mt-12 rounded-3xl bg-cream p-8 md:mt-14 md:p-10">
            <Kicker>så funkar det</Kicker>
            <h2 className="mt-1 font-serif text-3xl tracking-tight">
              Ett mobilfoto in. <em className="italic">En hel kollektion ut.</em>
            </h2>
            <div className="mt-6 grid items-start gap-4 md:grid-cols-3">
              <figure className="card-shop p-3">
                <img
                  src={withBase("/images/djupportratt/djupportratt_fore.webp")}
                  alt="Originalfoto: långhårig röd tax i kvällsljus"
                  width={1024}
                  height={819}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-2 flex items-center gap-1.5 px-1 pb-1 text-xs text-muted-foreground">
                  <Camera className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Ditt foto — ett vanligt mobilfoto räcker
                </figcaption>
              </figure>
              <figure className="card-shop p-3">
                <img
                  src={withBase("/images/djupportratt/djupportratt_rosett.webp")}
                  alt="Porträtt av samma tax, studioljus med gul rosett"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-2 flex items-center gap-1.5 px-1 pb-1 text-xs text-muted-foreground">
                  <PawPrint className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Porträttet — studioprosett med personlighet
                </figcaption>
              </figure>
              <figure className="card-shop p-3">
                <img
                  src={withBase("/images/djupportratt/djupportratt_konstverk.webp")}
                  alt="Illustrerat porträtt av samma tax mot mörkgrön botten"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-2 flex items-center gap-1.5 px-1 pb-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Alter egon — samma djur, nya stilar
                </figcaption>
              </figure>
            </div>
            <p className="mt-6 flex items-center gap-2 rounded-2xl bg-ink-foreground/5 p-4 text-sm">
              <PawPrint className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              Exemplen ovan är testgenererade i verkstaden från ett riktigt hundfoto. Ditt djur blir
              nästa — och den skiss du godkänner är den som graveras.
            </p>
          </section>
        )}

        <section className="mt-12 rounded-3xl bg-cream p-8 md:mt-14 md:p-10">
          <h2 className="font-serif text-2xl">
            {isService ? "Bra att veta" : `Om ${category.title.toLowerCase()}`}
          </h2>
          {/* Tjänstekategorier har redan sin about-text i tjänste-sektionen
              ovan – undvik samma text två gånger på samma sida. */}
          {!isService && (
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {category.about ??
                `Här samlar jag det jag för tillfället gör inom ${category.title.toLowerCase()}. Allt tillverkas för hand i verkstaden i Småland, efter din beställning. Hittar du inte precis det du söker skissar jag gärna något helt eget – skriv några rader om vem presenten är till, så föreslår jag ett upplägg.`}
            </p>
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
            <Link to="/kontakt" className="text-primary-deep hover:underline">
              Fråga mig direkt
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
