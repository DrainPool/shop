import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Gift,
  Heart,
  Loader2,
  MessageCircle,
  Paintbrush,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIconRow } from "@/components/CategoryIconRow";

import { TrustedMarquee } from "@/components/TrustedMarquee";
import { CustomerGallery } from "@/components/CustomerGallery";
import { WorkshopGallery } from "@/components/WorkshopGallery";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import { fetchProducts } from "@/lib/shopify";
import heroImage from "@/assets/hero-workbench.jpg";
import storyImage from "@/assets/story-hands.jpg";
import katBarn from "@/assets/kat-barn.jpg";
import katSmycken from "@/assets/kat-smycken.jpg";
import katGravyr from "@/assets/kat-gravyr.jpg";
import katFoto from "@/assets/kat-foto.jpg";
import katBrollop from "@/assets/kat-brollop.jpg";
import tillBrollop2 from "@/assets/till-brollop-2.jpg";
import tillDop2 from "@/assets/till-dop-2.jpg";
import tillForetag2 from "@/assets/till-foretag-2.jpg";
import tillFarsdag2 from "@/assets/till-farsdag-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lins & Lager – personliga smycken, gravyr & 3D-utskrifter" },
      {
        name: "description",
        content:
          "Handgjorda presenter med personlig gravyr: smycken till bröllop och dop, namnbrickor för företag, skärbrädor för jägare, 3D-utskrifter, foto och stickers.",
      },
      { property: "og:title", content: "Lins & Lager – personligt hantverk" },
      {
        property: "og:description",
        content:
          "Personliga smycken, lädergravyr, skärbrädor, 3D-utskrifter och stickers – handgjort på beställning i Småland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const categories = [
  { title: "Till barnen", text: "Dopsmycken, personliga halsband", image: katBarn, slug: "barn" },
  { title: "Personliga smycken", text: "Gravyr i silver & guld", image: katSmycken, slug: "smycken" },
  { title: "Gravyr i trä & läder", text: " Ge pappa en personlig present- En present för generationer", image: katGravyr, slug: "gravyr" },
  { title: "Fototavlor & 3D", text: "Minnen du vill hänga upp", image: katFoto, slug: "fototavlor" },
  { title: "Till bröllopet", text: "Toastglas, ringaskar & detaljer", image: katBrollop, slug: "brollop" },
];

const occasions = [
  {
    title: "Bröllop",
    text: "Graverade tostglas, ringaskar, glas-etiketter till gästerna och gåvor till brudparet.",
    images: [katBrollop, tillBrollop2],
    slug: "brollop",
  },
  {
    title: "Dop",
    text: "Graverade smycken, minnesask och namnskylt till den nya lilla.",
    images: [katBarn, tillDop2],
    slug: "dop",
  },
  {
    title: "Företag",
    text: "Namnbrickor, skyltar och personliga gåvor till kunder och personal.",
    images: [katGravyr, tillForetag2],
    slug: "foretag",
  },
  {
    title: "Farsdag & jakt",
    text: "Skärbrädor, läderdetaljer och trofédetaljer med namn och datum.",
    images: [katFoto, tillFarsdag2],
    slug: "farsdag",
  },
];


function RotatingImage({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      setIndex((i) => (i + 1) % images.length);
      timeout = setTimeout(tick, 1000 + Math.random() * 2000);
    };
    timeout = setTimeout(tick, 1000 + Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, [images.length]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          width={800}
          height={800}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

const steps = [
  { n: "1", title: "Välj din produkt", text: "Allt i butiken går att kombinera – smycke, gravyr och sticker i samma paket." },
  { n: "2", title: "Skriv din text", text: "Namn, datum eller en hälsning. Du får en digital skiss innan jag börjar." },
  { n: "3", title: "Handgjort & skickat", text: "Tillverkas i mitt lager och skickas ompaketerat, redo att ge bort." },
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
        {/* Animerat rutnät i sepia-ton (Magic UI AnimatedGridPattern, MIT) */}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.08}
          duration={3}
          className="absolute inset-0 h-full w-full [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] text-ink"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-script text-3xl text-primary">
              med namn, gravyr &amp; en massa kärlek <Heart className="inline h-5 w-5 fill-primary text-primary" aria-label="kärlek" />
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[1.02] font-black tracking-tight md:text-6xl">
              Ge bort en present som verkligen{" "}
              <span className="relative inline-block text-primary">
                betyder något
                <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gold/60" />
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">
              Smycken, gravyr i trä och läder, 3D-utskrifter, foto och stickers. Allt tillverkas för
              hand efter din beställning – och skickas hem till dörren, redo att ge bort.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <a href="#sortiment">
                  <Gift className="mr-2 h-5 w-5" aria-hidden="true" /> Skapa din present
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 px-7 text-base"
              >
                <a href="#butiken">Se favoriterna</a>
              </Button>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
              Handgjort i egen verkstad · digital skiss innan gravyr · personlig kontakt hela vägen
            </p>

          </div>

          <div className="relative">
            <GlowingShadow>
              <img
                src={heroImage}
                alt="Graverad skärbräda, personligt smycke, 3D-utskrifter och stickers på ett arbetsbord"
                width={1600}
                height={1104}
                fetchPriority="high"
                className="rotate-2 rounded-3xl border-4 border-ink shadow-lift"
              />
            </GlowingShadow>
            <span className="absolute -top-5 -left-4 -rotate-3 rounded-2xl border-2 border-ink bg-card px-4 py-2 font-script text-xl shadow-soft">
              Till <strong className="font-script">Astrid</strong>{" "}
              <Heart className="inline h-4 w-4 fill-primary text-primary align-middle" aria-hidden="true" />
            </span>
            <span className="absolute -right-3 -bottom-5 rotate-2 rounded-2xl border-2 border-ink bg-card px-4 py-2 text-sm font-semibold shadow-soft">
              <Paintbrush className="mr-1.5 inline h-4 w-4 align-middle" aria-hidden="true" />
              Skapas efter din beställning
            </span>
          </div>
        </div>
      </section>

      <CategoryIconRow />

      <section id="sortiment" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
        <p className="font-script text-2xl text-primary">vem vill du göra glad idag?</p>
        <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
          Hitta rätt present direkt
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.title}
              to="/kategori/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-3xl border-2 border-ink/10 bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
            >
              <img
                src={c.image}
                alt={c.title}
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="font-serif text-lg font-bold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <section id="om-mig" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
        <div className="grid items-center gap-10 md:grid-cols-[3fr_2fr]">
          <div>
            <p className="font-script text-2xl text-primary">mer än en pryl</p>
            <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
              Tillsammans skapar vi minnen
            </h2>
            <p className="mt-4 text-muted-foreground">
              Jag började med kameran och fotograferade bröllop och dop. Med tiden ville jag att
              minnena skulle gå att hålla i – därför kom gravyren, 3D-printern och Cricut-maskinen.
              Idag gör jag smycken, skärbrädor, namnbrickor och stickers till samma familjer,
              företag och tillfällen.
            </p>
            <p className="mt-4 text-muted-foreground">
              Bröllop, dop, familj och produktbilder. Jag fotograferar dagen och gör sedan tavlan,
              smycket eller graveringen i samma verkstad. Ett samtal, en person, hela vägen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://linsochlager.net/foto"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold/85"
              >
                Läs om fotografering
              </a>
              <Link
                to="/kategori/$slug"
                params={{ slug: "fototavlor" }}
                className="rounded-full border border-ink/20 px-6 py-3 font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Se fototavlor
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4 shrink-0 text-primary" />
              <span>
                Har du en idé som inte finns i butiken?{" "}
                <a
                  href="mailto:hej@linsochlager.se"
                  className="font-semibold text-primary hover:underline"
                >
                  Hör av dig
                </a>
                , så löser vi den tillsammans.
              </span>
            </p>
          </div>
          <img
            src={storyImage}
            alt="Händer som håller en handgraverad träask i en ljus verkstad"
            width={1200}
            height={1200}
            loading="lazy"
            className="-rotate-1 rounded-3xl border-4 border-ink shadow-lift"
          />
        </div>
      </section>

      {bestsellers.length > 0 && (
        <section className="bg-cream py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-script text-2xl text-primary">de som beställs mest</p>
                <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
                  Mest älskade just nu
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Det här är presenterna jag graverar oftast – och de fyller upp veckans
                  tillverkning snabbast. Beställ i god tid inför datumet ni firar.
                </p>
              </div>
              <Link
                to="/kategori/$slug"
                params={{ slug: "bastsaljare" }}
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                Se alla favoriter <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestsellers.slice(0, 4).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-script text-2xl text-primary">färskt från arbetsbänken</p>
              <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
                Nytt i verkstaden
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Nya idéer i små serier. När materialet tar slut dröjer det några veckor innan jag
                kan göra fler.
              </p>
            </div>
            <Link
              to="/kategori/$slug"
              params={{ slug: "nyheter" }}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              Se alla nyheter <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {news.slice(0, 4).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section id="butiken" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-script text-2xl text-primary">hela sortimentet</p>
            <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">Allt jag gör</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Varje produkt kan personaliseras med namn, datum eller din egen hälsning – och du får
              alltid en skiss innan jag graverar.
            </p>
          </div>
          <Link
            to="/sortiment"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Visa allt <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {isPending ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
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
          <p className="font-script text-2xl text-primary">för livets fina dagar</p>
          <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
            Speciella tillfällen
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((o) => (
              <Link
                key={o.title}
                to="/kategori/$slug"
                params={{ slug: o.slug }}
                className="group block overflow-hidden rounded-3xl border-2 border-ink/10 bg-background shadow-soft transition-all hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift"
              >
                <RotatingImage images={o.images} alt={o.title} />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold group-hover:text-primary">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Se produkter <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      <TrustedMarquee />

      <CustomerGallery />

      <WorkshopGallery />

      <section id="sa-gar-det-till" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16">
        <p className="font-script text-2xl text-primary">enklare än du tror</p>
        <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">Så funkar det</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-cream p-7">
              <span className="absolute -top-6 left-7 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-xl font-bold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-5 font-serif text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
