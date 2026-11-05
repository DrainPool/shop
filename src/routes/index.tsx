import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIconRow } from "@/components/CategoryIconRow";
import { GiftBundles } from "@/components/GiftBundles";
import { TrustFaq } from "@/components/TrustFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryBento } from "@/components/home/CategoryBento";
import { GuideTeaser } from "@/components/home/GuideTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { StorySection } from "@/components/home/StorySection";
import { SeoIntro } from "@/components/home/SeoIntro";
import { PhotoEngravingTeaser } from "@/components/home/PhotoEngravingTeaser";
import { SeasonCampaign } from "@/components/home/SeasonCampaign";
import { ProductLifestyleSection } from "@/components/home/ProductLifestyleSection";
import { ProcessSection } from "@/components/home/ProcessSection";

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
      return { products: await fetchProducts() };
    } catch {
      return { products: [], failed: true };
    }
  },
  head: () => ({
    meta: [
      { title: "Personliga presenter med gravyr – handgjort i Småland | Taggat" },
      {
        name: "description",
        content:
          "Personliga presenter med gravyr: nyckelringar med namn, graverade glas till bröllop, skärbrädor till farsdagen och julklappar med eget namn. Handgjort på beställning i Småland – digital skiss innan jag graverar.",
      },
      {
        property: "og:title",
        content: "Personliga presenter med gravyr – handgjort i Småland | Taggat",
      },
      {
        property: "og:description",
        content:
          "Nyckelringar, glas, skärbrädor och julklappar – graverade med namn, datum eller egen text. Handgjort på beställning i Småland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
      links: [
        { rel: "canonical", href: SITE_URL },
      ]
  }),
});

function Index() {
  const { products = [], failed } = Route.useLoaderData() as {
    products: ShopifyProduct[];
    failed?: boolean;
  };
  const isError = !!failed;

  const featured = [
    ...products.filter((p) => p.node.tags?.includes("bastsaljare")),
    ...products.filter((p) => p.node.tags?.includes("nyhet")),
  ]
    .filter(
      (product, index, list) =>
        list.findIndex((item) => item.node.id === product.node.id) === index,
    )
    .slice(0, 8);

  return (
    <>
      {/* ATTENTION – cinematisk hero med fullbreddsbild och mörk radial-wash */}
      <HomeHero />

      {/* En enda, självstyrd kategoriväg direkt efter introduktionen. */}
      <CategoryIconRow />

      {/* Säsongskampanj enligt schemat i lib/seasons.ts (jul, fars dag …) */}
      <SeasonCampaign />

      {/* INTEREST – tillfällen i tätslutande bento (ersätter gamla tillfällesrutnätet) */}
      <CategoryBento />
      <GuideTeaser />
      <PhotoEngravingTeaser />

      {/* Riktiga presentpaket från Shopify, när sådana finns. */}
      <GiftBundles />

      {/* Egen idé – specialbeställning lyft högre upp (inspirerat av Stoor of Lappland). */}
      <FinalCta />

      {/* Om produkterna inte kunde hämtas: säg det i stället för att visa
          en tyst tom butik. (Körs bara när båda listorna ovan är tomma.) */}
      {featured.length === 0 && (isError || products.length === 0) && (
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

      {featured.length > 0 && (
        <section id="butiken" className="scroll-mt-28 bg-cream py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div>
              <Kicker>utvalt från verkstaden</Kicker>
              <h2 className="mt-1 font-serif text-3xl tracking-tight">Personliga favoriter</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Ett litet urval av omtyckta och nya presenter. Allt går att anpassa med din egen
                text.
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, index) => (
                <ProductCard key={product.node.id} product={product} priority={index < 4} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/sortiment">
                  Se hela sortimentet <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Köptvekan är störst direkt efter produkterna – svara här. */}
      <ProductLifestyleSection products={products} />
      {/* "Så funkar det" – mörkt Desire-kapitel med processens fyra steg
          (ProcessSection), direkt följt av trygghets-FAQ som fångar tvekan. */}
      <ProcessSection />
      <TrustFaq />

      {/* Desire – om mig + verkstaden avslutar sidan varmt */}
      <StorySection />
      <SeoIntro />
    </>
  );
}
