import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { GiftBundles } from "@/components/GiftBundles";
import { TrustedMarquee } from "@/components/TrustedMarquee";
import { TrustFaq } from "@/components/TrustFaq";
import { IdeaBand } from "@/components/IdeaBand";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryBento } from "@/components/home/CategoryBento";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StorySection } from "@/components/home/StorySection";
import { FinalCta } from "@/components/home/FinalCta";

import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/")({
  component: Index,
  // Produkterna hämtas i loadern och följer med i första HTML:en – inga
  // grå platshållare som ligger kvar medan webbläsaren hämtar i efterhand.
  loader: async () => {
    // Transient Storefront-fel: låt startsidan rendera tomt i stället för
    // att dö till roten – sidan visar ett väntande-meddelande i butikssektionen.
    try {
      return { products: await fetchProducts(50) };
    } catch {
      return { products: [], failed: true };
    }
  },
  head: () => ({
    meta: [
      { title: "Personliga presenter med gravyr – handgjort i Småland | TaggaDet" },
      { rel: "canonical", href: SITE_URL },
      {
        name: "description",
        content:
          "Personliga presenter med gravyr: nyckelringar med namn, graverade glas till bröllop, skärbrädor till farsdagen och julklappar med eget namn. Handgjort på beställning i Småland – digital skiss innan jag graverar.",
      },
      {
        property: "og:title",
        content: "Personliga presenter med gravyr – handgjort i Småland | TaggaDet",
      },
      {
        property: "og:description",
        content:
          "Nyckelringar, glas, skärbrädor och julklappar – graverade med namn, datum eller egen text. Handgjort på beställning i Småland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const { products = [], failed } = Route.useLoaderData() as {
    products: ShopifyProduct[];
    failed?: boolean;
  };
  const isError = !!failed;

  const bestsellers = products.filter((p) => p.node.tags?.includes("bastsaljare"));
  const news = products.filter((p) => p.node.tags?.includes("nyhet"));

  return (
    <>
      {/* ATTENTION – cinematisk hero med fullbreddsbild och mörk radial-wash */}
      <HomeHero />

      {/* Primär navigation: produkttyps-ikoner (renderas som den är) */}
      <CategoryIconRow />

      {/* INTEREST – tillfällen i tätslutande bento (ersätter gamla tillfällesrutnätet) */}
      <CategoryBento />

      {(bestsellers.length > 0 || news.length > 0) && (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            {/* Två lättrörliga produktvyer sida-vid-sida – vardera 2×2.
                Renderar halva fullbredd om bara den ena listan har produkter. */}
            <div className="grid gap-12 lg:grid-cols-2">
              {bestsellers.length > 0 && (
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-script text-2xl text-primary-deep">de som beställs mest</p>
                      <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
                        Mest älskade just nu
                      </h2>
                    </div>
                    <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                      <Link to="/kategori/$slug" params={{ slug: "bastsaljare" }}>
                        Se alla favoriter <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Presenterna jag graverar oftast – de fyller veckans tillverkning snabbast, så
                    beställ i god tid.
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {bestsellers.slice(0, 4).map((p, i) => (
                      <ProductCard key={p.node.id} product={p} priority={i < 2} />
                    ))}
                  </div>
                </div>
              )}

              {news.length > 0 && (
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-script text-2xl text-primary-deep">
                        färskt från arbetsbänken
                      </p>
                      <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
                        Nytt i verkstaden
                      </h2>
                    </div>
                    <Button asChild variant="outline" size="sm" className="rounded-full px-5">
                      <Link to="/kategori/$slug" params={{ slug: "nyheter" }}>
                        Se alla nyheter <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nya idéer i små serier. När materialet tar slut dröjer det några veckor innan
                    jag kan göra fler.
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {news.slice(0, 4).map((p) => (
                      <ProductCard key={p.node.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section id="butiken" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-script text-2xl text-primary-deep">hela sortimentet</p>
            <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight">Allt jag gör</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Varje produkt kan personaliseras med namn, datum eller din egen hälsning – och du får
              alltid en skiss innan jag graverar.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-full px-5">
            <Link to="/sortiment">
              Visa allt <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {isError ? (
          <p className="py-16 text-center text-muted-foreground">
            Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
          </p>
        ) : products.length === 0 ? (
          <div className="mt-8 rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
            <p className="font-serif text-xl font-bold">Butiken fylls på just nu</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sortimentet växer för varje vecka. Har du redan en presentidé? Skriv till mig – jag
              gör gärna något helt eget.
            </p>
            <Button asChild className="mt-6 rounded-full px-6">
              <Link to="/kontakt">Hör av dig med din idé</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((p, i) => (
              <ProductCard key={p.node.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}

        {products.length > 8 && (
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/sortiment">
                Se hela sortimentet <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* DESIRE – mörkt processkapitel: från din rad till presentklart paket */}
      <ProcessSection />

      {/* Desire del 2 – presentpaket klara att ge bort */}
      <GiftBundles />

      {/* Desire del 3 – om mig + kundvägg (socialt bevis) */}
      <StorySection />

      {/* Fånga den som inte hittar rätta presenten (renderas som den är) */}
      <IdeaBand />

      <TrustedMarquee />

      <TrustFaq />

      {/* ACTION – avslutande mörkt CTA-kapitel */}
      <FinalCta />
    </>
  );
}
