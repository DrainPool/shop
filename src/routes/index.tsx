import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { GiftBundles } from "@/components/GiftBundles";
import { TrustedMarquee } from "@/components/TrustedMarquee";
import { TrustFaq } from "@/components/TrustFaq";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryBento } from "@/components/home/CategoryBento";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StorySection } from "@/components/home/StorySection";
import { FinalCta } from "@/components/home/FinalCta";

import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import { Kicker } from "@/components/Kicker";

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

      {/* Bandet "Foto & hantverk till livets tillfällen" – flyttat hit
          från sidans botten (frallans önskan: högre upp) */}
      <TrustedMarquee />

      {/* Primär navigation: produkttyps-ikoner (renderas som den är) */}
      <CategoryIconRow />

      {/* INTEREST – tillfällen i tätslutande bento (ersätter gamla tillfällesrutnätet) */}
      <CategoryBento />

      {/* Om produkterna inte kunde hämtas: säg det i stället för att visa
          en tyst tom butik. (Körs bara när båda listorna ovan är tomma.) */}
      {bestsellers.length === 0 && news.length === 0 && (isError || products.length === 0) && (
        <section className="mx-auto max-w-6xl px-5 pb-8">
          {isError ? (
            <p className="py-10 text-center text-muted-foreground">
              Kunde inte hämta produkterna just nu. Försök gärna igen om en stund.
            </p>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-border bg-cream p-12 text-center">
              <p className="font-serif text-xl">Butiken fylls på just nu</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Sortimentet växer för varje vecka. Har du redan en presentidé? Skriv till mig – jag
                gör gärna något helt eget.
              </p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link to="/kontakt">Hör av dig med din idé</Link>
              </Button>
            </div>
          )}
        </section>
      )}

      {(bestsellers.length > 0 || news.length > 0) && (
        <section id="butiken" className="scroll-mt-28 bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            {/* Två lättrörliga produktvyer sida-vid-sida – vardera 2×2.
                Renderar halva fullbredd om bara den ena listan har produkter. */}
            <div className="grid gap-10 lg:grid-cols-2">
              {bestsellers.length > 0 && (
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <Kicker>de som beställs mest</Kicker>
                      <h2 className="mt-1 font-serif text-3xl tracking-tight">
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
                      <Kicker>färskt från arbetsbänken</Kicker>
                      <h2 className="mt-1 font-serif text-3xl tracking-tight">Nytt i verkstaden</h2>
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

            {/* Hela sortimentet är en klick bort – den tidigare separat-
                visade produktlistan var samma produkter en gång till. */}
            <div className="mt-10 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/sortiment">
                  Se hela sortimentet <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* DESIRE – mörkt processkapitel: från din rad till presentklart paket */}
      <ProcessSection />

      {/* Desire del 2 – presentpaket + egna designer/foto (IdeaBand ingår) */}
      <GiftBundles />

      {/* Desire del 3 – om mig + kundvägg (socialt bevis) */}
      <StorySection />

      <TrustFaq />

      {/* Nyhetsbrevet – flyttat från sidfoten till en egen sektion före CTA:n */}
      <section className="mx-auto max-w-2xl px-5 pb-16">
        <NewsletterSignup />
      </section>

      {/* ACTION – avslutande mörkt CTA-kapitel */}
      <FinalCta />
    </>
  );
}
