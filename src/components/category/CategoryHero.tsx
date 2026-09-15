import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/categories";

/**
 * Kategorisidans hero-kapitel, i samma mörka grammatik som startsidans
 * hero: brödsmulorna får en egen ljus list ovanför, själva kapitlet
 * ligger på ink-botten med FinalCta:s mjuka guldglow och mjuk övergång
 * ner mot pappret. Kicker i guld, rubriken i Marcellus 400 (storleken
 * bär vikten) och beskrivningen – SEO-texten – visas hela, inte klippt.
 *
 * Hero-bandet ersätter ingen SEO-data: CollectionPage-JSON-LD skrivs
 * fortfarande av route-headern och BreadcrumbList av Breadcrumbs.
 */
export function CategoryHero({ category, children }: { category: Category; children?: ReactNode }) {
  return (
    <header>
      {/* Breadcrumbs ritar egna token-färger (mörk text) – ge den en ljus
          list i stället för att placera den på den mörka kapitelbotten. */}
      {children && (
        <div className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-7xl px-5 pt-4 pb-3">{children}</div>
        </div>
      )}
      <div className="relative overflow-hidden bg-ink text-ink-foreground">
        {/* Dekorativ guldradial (aldrig textbotten) – eget lager under
            innehållet, samma klass som FinalCta använder. */}
        <div
          aria-hidden="true"
          className="cta-glow pointer-events-none absolute inset-x-0 top-0 h-72"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-20 text-center md:pt-14 md:pb-24">
          <p className="font-inscription text-sm text-gold md:text-base">{category.kicker}</p>
          <h1 className="mx-auto mt-2 max-w-3xl font-serif text-4xl tracking-tight text-balance md:text-5xl">
            {category.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-foreground/85">
            {category.description}
          </p>
          {category.subcategories && category.subcategories.length > 0 && (
            <nav aria-label="Underkategorier" className="mt-7 flex flex-wrap justify-center gap-2">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to="/kategori/$slug"
                  params={{ slug: sub.slug }}
                  className="inline-flex min-h-11 items-center rounded-full border border-ink-foreground/40 bg-transparent px-5 text-sm text-ink-foreground transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {sub.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        {/* Mjuk övergång ner mot pappret, som i startsidans hero – kapitlet
            ska inte kapas av en hård kant mot nästa sektion. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background"
        />
      </div>
    </header>
  );
}
