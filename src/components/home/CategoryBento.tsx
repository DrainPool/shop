import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/Reveal";
import tillDop from "@/assets/tillfalle-dop.jpg";
import tillBrollop from "@/assets/tillfalle-brollop.jpg";
import tillJul from "@/assets/tillfalle-julkulor.jpg";
import tillMorsdag from "@/assets/tillfalle-morsdag.jpg";
import tillFarsdag from "@/assets/tillfalle-farsdag.jpg";
import tillForetag from "@/assets/tillfalle-foretag.jpg";
import { Kicker } from "@/components/Kicker";
import { seasonFor } from "@/lib/seasons";

/**
 * Tillfälles-bento (Interest-steget i AIDA): sex tillfällen i ett tätslutande
 * rutnät med grid-flow-dense.
 *
 * Cellmatematiken (lg, 3 kolumner × 3 rader = 9 celler – ingen tom ruta):
 *   Bröllop col-span-2 (r1 c1–2) · Jul row-span-2 (r1–2 c3) ·
 *   Dop (r2 c1) · Mors dag (r2 c2) · Fars dag col-span-2 (r3 c1–2) ·
 *   Företag (r3 c3). Summa: 2+2+1+1+2+1 = 9 exakt.
 * Under lg är alla kort 1×1 (mobil: 1 kol, sm: 2 kol) – också exakt.
 */
type BentoCard = {
  slug: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  /** Extra span som bara gäller lg – se cellräkningen ovan */
  span?: string;
};

const CARDS: BentoCard[] = [
  {
    slug: "brollop",
    title: "Bröllop",
    text: "Glas, ringaskar och detaljer med era namn och datum.",
    image: tillBrollop,
    alt: "AI-genererad inspirationsbild för bröllop: champagneglas och ringask i trä på dukat bord",
    span: "lg:col-span-2",
  },
  {
    slug: "jul",
    title: "Jul",
    text: "Julklappar med namn, datum eller en egen hälsning.",
    image: tillJul,
    alt: "AI-genererad inspirationsbild för jul: personliga julkulor och genomskinlig glaskula med namn och julhälsning i granen",
    span: "lg:row-span-2",
  },
  {
    slug: "dop",
    title: "Dop",
    text: "Minnesask, dopsmycke och namnskylt till den nya lilla.",
    image: tillDop,
    alt: "AI-genererad inspirationsbild för dop: minnesask i trä, silverhänge och liten stickad babysko",
  },
  {
    slug: "morsdag",
    title: "Mors dag",
    text: "Smycken med barnens namn och minnen hon inte skulle köpa själv.",
    image: tillMorsdag,
    alt: "AI-genererad inspirationsbild för mors dag: silverhalsband i träask bredvid rosa tulpaner",
  },
  {
    slug: "farsdag",
    title: "Fars dag & jakt",
    text: "Graverat i trä, läder eller metall till pappa som har allt.",
    image: tillFarsdag,
    alt: "AI-genererad inspirationsbild för fars dag och jakt: skärbräda med hjortmotiv, termos och lädernyckelring",
    span: "lg:col-span-2",
  },
  {
    slug: "foretag",
    title: "Företag",
    text: "Namnbrickor, skyltar och gåvor till kunder och personalen.",
    image: tillForetag,
    alt: "AI-genererad inspirationsbild för företagsgåvor: stålmugg, lädernyckelring och namnbricka på träbricka",
  },
];

/**
 * Id-bindning: SiteHeaderns mobil-länk "Vem ska du överraska?" pekar på
 * #tillfallen – behåll id och scroll-marginal här.
 */
// Säsongens tillfälle (schemat i lib/seasons.ts) får det stora första kortet.
const featuredSlug = () => seasonFor(new Date()).slug;
// Spannen är positionella så cellmatematiken (9 celler) alltid håller.
const SPANS = CARDS.map((c) => c.span);

export function CategoryBento() {
  // SSR och första rendering använder standardordningen – säsongen byts
  // in efter hydrering så att html:en inte skiljer sig.
  const [featured, setFeatured] = useState<string | null>(null);
  useEffect(() => setFeatured(featuredSlug()), []);
  const ordered = featured
    ? [
        ...CARDS.filter((c) => c.slug === featured),
        ...CARDS.filter((c) => c.slug !== featured),
      ].map((c, i) => ({ ...c, span: SPANS[i] }))
    : CARDS;

  return (
    <section id="tillfallen" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-12 md:py-14">
      <Reveal className="max-w-2xl">
        <Kicker>vem ska du överraska?</Kicker>
        <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Presenter för livets stora dagar
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Varje tillfälle har sina klassiker – och allihop går att göra helt personliga med namn,
          datum eller en rad bara ni förstår.
        </p>
      </Reveal>

      {/* Lägre radhöjd (13rem) och tätare gap – bento:n tar mindre vertikalt
          utrymme utan att hover-dramatiken eller cellmatessen rubbas. */}
      <div className="mt-8 grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[11rem] lg:grid-flow-dense lg:grid-cols-3">
        {ordered.map((card, i) => (
          <Reveal key={card.slug} delay={i * 90} className={cn("h-full", card.span)}>
            <Link
              to="/kategori/$slug"
              params={{ slug: card.slug }}
              hash="produkter"
              // Butikens kortspec (.card-shop): border, skugga och guld-hairline
              // vid hover kommer härifrån – fokusmarkeringen sköts av global
              // :focus-visible-outline i styles.css.
              className="card-shop group relative block aspect-[4/3] h-full overflow-hidden lg:aspect-auto"
            >
              <img
                src={card.image}
                alt={card.alt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Mörk botten-gradient: texten får minst 4.5:1 mot ink.
                  Dramalager 1: en djupare gradient tonas in över basen vid
                  hover (mjukare än att hoppa i gradientstopp som inte går
                  att animera). */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                {/* Dramalager 2: guld-understrecket under kategorinamnet drar
                    fram från vänster vid hover (statiskt vid reduced motion). */}
                <h3 className="font-inscription text-2xl text-ink-foreground">
                  <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold/70 after:transition-[width] after:duration-500 after:ease-out group-hover:after:w-full motion-reduce:after:w-full motion-reduce:after:transition-none">
                    {card.title}
                  </span>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-foreground/85">
                  {card.text}
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-foreground">
                  Se presenter
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
