import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, Gift, Heart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { CategoryIconRow } from "@/components/CategoryIconRow";

import { TrustedMarquee } from "@/components/TrustedMarquee";
import { CustomerShowcase } from "@/components/CustomerShowcase";
import { TrustFaq } from "@/components/TrustFaq";
import { IdeaBand } from "@/components/IdeaBand";
import { fetchProducts } from "@/lib/shopify";
import { SITE_URL } from "@/lib/siteUrls";
import heroImage from "@/assets/hero-workbench.jpg";
import katBarn from "@/assets/kat-barn.jpg";
import katGravyr from "@/assets/kat-gravyr.jpg";
import katFoto from "@/assets/kat-foto.jpg";
import katBrollop from "@/assets/kat-brollop.jpg";
import katSmycken from "@/assets/kat-smycken.jpg";
import prodGlas from "@/assets/prod-glas.jpg";
import prodKeps from "@/assets/prod-keps.jpg";
import prodTumbler from "@/assets/prod-tumbler.jpg";
import prodNyckelring from "@/assets/prod-nyckelring.jpg";
import tillBrollop2 from "@/assets/till-brollop-2.jpg";
import tillDop2 from "@/assets/till-dop-2.jpg";
import tillForetag2 from "@/assets/till-foretag-2.jpg";
import tillFarsdag2 from "@/assets/till-farsdag-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  // Värm produktcachen före SSR – produkterna följer med i första HTML:en
  // i stället för att vänta på hydrering + klientanrop.
  beforeLoad: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["products"],
      queryFn: () => fetchProducts(50),
    }),
  head: () => ({
    meta: [
      { title: "Personliga presenter med gravyr – handgjort i Småland | Lins & Lager" },
      { rel: "canonical", href: SITE_URL },
      {
        name: "description",
        content:
          "Personliga presenter med gravyr: nyckelringar med namn, graverade glas till bröllop, skärbrädor till farsdagen och julklappar med eget namn. Handgjort på beställning i Småland – digital skiss innan jag graverar.",
      },
      {
        property: "og:title",
        content: "Personliga presenter med gravyr – handgjort i Småland | Lins & Lager",
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

const occasions = [
  {
    title: "Jul",
    text: "Julklappar med eget namn, julgranskulor graverade i trä och gåvor till hela listan.",
    images: [katGravyr, katFoto],
    alt: "Graverad julklapp i trä från verkstaden – exempel på personliga julpresenter",
    slug: "jul",
  },
  {
    title: "Bröllop",
    text: "Graverade tostglas, ringaskar, glas-etiketter till gästerna och gåvor till brudparet.",
    images: [katBrollop, tillBrollop2],
    alt: "Graverade bröllopsglas och ringask med namn – bröllopspresenter från verkstaden",
    slug: "brollop",
  },
  {
    title: "Dop",
    text: "Graverade smycken, minnesask och namnskylt till den nya lilla.",
    images: [katBarn, tillDop2],
    alt: "Doppresent med graverat namn – minnesask och smycke från verkstaden",
    slug: "dop",
  },
  {
    title: "Företag",
    text: "Namnbrickor, skyltar och personliga gåvor till kunder och personal.",
    images: [katGravyr, tillForetag2],
    alt: "Graverad namnbricka och företagsgåvor med logotyp från verkstaden",
    slug: "foretag",
  },
  {
    title: "Farsdag & jakt",
    text: "Skärbrädor, läderdetaljer och trofédetaljer med namn och datum.",
    images: [katFoto, tillFarsdag2],
    alt: "Skärbräda i ek med gravyr – present till farsdagen och jägaren",
    slug: "farsdag",
  },
  {
    title: "Mors dag",
    text: "Smycken med barnens namn, fototavlor och små minnen hon inte skulle köpa själv.",
    images: [katSmycken, prodGlas],
    alt: "Graverat smycke med namn – present till mors dag från verkstaden",
    slug: "morsdag",
  },
  {
    title: "Student",
    text: "Mugg till mottagningen, nyckelring till resan och graverat glas till festen.",
    images: [prodKeps, prodTumbler],
    alt: "Keps och tumbler med egen text – studentpresenter med gravyr",
    slug: "student",
  },
  {
    title: "Nytt hem",
    text: "Namnskylt till dörren, skärbräda till första middagen och korg till nycklarna.",
    images: [prodNyckelring, prodGlas],
    alt: "Graverad nyckelring och glas – inflyttningspresent till nya hemmet",
    slug: "nytt-hem",
  },
];

function RotatingImage({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Lugnt tempo: byt bild var 8:e sekund, pausa vid hover/fokus.
    // Med prefers-reduced-motion står bilden still — crossfaden är också avstängd.
    if (paused || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 8000);
    return () => clearInterval(id);
  }, [paused, images.length]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          width={800}
          height={800}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

const steps = [
  {
    n: "1",
    title: "Välj din produkt",
    text: "Allt i butiken går att kombinera – smycke, gravyr och sticker i samma paket.",
  },
  {
    n: "2",
    title: "Skriv din text",
    text: "Namn, datum eller en hälsning. Du får en digital skiss att godkänna innan jag börjar graverar.",
  },
  {
    n: "3",
    title: "Handgjort & skickat",
    text: "Tillverkas för hand i min verkstad i Småland och skickas presentklart, redo att ge bort.",
  },
];

function Index() {
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts(50) });

  const bestsellers = products.filter((p) => p.node.tags?.includes("bastsaljare"));
  const news = products.filter((p) => p.node.tags?.includes("nyhet"));

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Heron andas hantverk: inga lånade "showcase"-effekter (grid-mönster,
            glow, guld-understreck) – skuggan och klistermärket får bara rummet. */}
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-script text-3xl text-primary-deep">
              med namn, gravyr &amp; en massa kärlek{" "}
              <Heart className="inline h-5 w-5 fill-primary text-primary-deep" aria-hidden="true" />
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[1.02] font-bold tracking-tight md:text-6xl">
              Ge bort en present som verkligen{" "}
              <span className="text-primary-deep">betyder något</span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">
              Smycken, gravyr i trä och läder, 3D-utskrifter, foto och stickers. Allt tillverkas för
              hand efter din beställning – och skickas hem till dörren, redo att ge bort.
            </p>
            <p className="mt-3 max-w-md text-muted-foreground">
              Bakom allt står jag och min lilla verkstad i Småland – det började med kameran och
              bröllopsfotona, och idag gör jag minnen som går att hålla i.{" "}
              <Link
                to="/om-mig"
                className="font-semibold text-primary-deep underline underline-offset-4 hover:opacity-80"
              >
                Läs om mig
              </Link>
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
              Handgjort i egen verkstad · digital skiss innan gravyr · personlig kontakt hela vägen
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <Link to="/sortiment">
                  <Gift className="mr-2 h-5 w-5" aria-hidden="true" /> Skapa din present
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 px-7 text-base"
              >
                <Link to="/kategori/$slug" params={{ slug: "bastsaljare" }}>
                  Se favoriterna
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Graverad skärbräda, personligt smycke, 3D-utskrifter och stickers på ett arbetsbord"
              width={1600}
              height={1104}
              fetchPriority="high"
              className="rotate-1 rounded-3xl border-2 border-ink shadow-lift"
            />
            <span className="absolute -top-5 -left-4 -rotate-3 rounded-2xl border-2 border-ink bg-card px-4 py-2 font-script text-xl shadow-soft">
              Till <strong className="font-script">Astrid</strong>{" "}
              <Heart
                className="inline h-4 w-4 fill-primary text-primary-deep align-middle"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </section>

      <CategoryIconRow />
      <div className="mx-auto max-w-6xl px-5 pt-4 text-center">
        <Link
          to="/sortiment"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep hover:underline"
        >
          Alla kategorier <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {(bestsellers.length > 0 || news.length > 0) && (
        <section className="bg-cream py-14">
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
                    {bestsellers.slice(0, 4).map((p) => (
                      <ProductCard key={p.node.id} product={p} />
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

      <section id="butiken" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
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

        {isPending ? (
          <ProductGridSkeleton count={4} />
        ) : isError ? (
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
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.node.id} product={p} />
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

      <section id="tillfallen" className="scroll-mt-28 bg-cream py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="font-script text-2xl text-primary-deep">för livets fina dagar</p>
          <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight">
            Speciella tillfällen
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((o) => (
              <Link
                key={o.title}
                to="/kategori/$slug"
                params={{ slug: o.slug }}
                className="group block overflow-hidden rounded-3xl border-2 border-ink/10 bg-background shadow-soft transition-all hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift focus-visible:-translate-y-1 focus-visible:shadow-lift"
              >
                <RotatingImage images={o.images} alt={o.alt} />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold group-hover:text-primary-deep">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-deep">
                    Se produkter <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <IdeaBand />

      <TrustedMarquee />

      {/* Process och kundvägg sida-vid-sida: stegen lodrätt till vänster,
          UGC-väggen till höger – sidan kortas och rytmerna varieras. */}
      <section id="sa-gar-det-till" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="font-script text-2xl text-primary-deep">enklare än du tror</p>
            <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">Så funkar det</h2>
            <ol className="mt-8 space-y-4">
              {steps.map((s) => (
                <li key={s.n} className="flex items-start gap-4 rounded-2xl bg-cream p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <CustomerShowcase />
        </div>
      </section>

      <TrustFaq />
    </>
  );
}
