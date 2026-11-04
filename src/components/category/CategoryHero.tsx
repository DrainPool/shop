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
      <div className="relative overflow-hidden bg-cream">
        {/* Dekorativ guldradial (aldrig textbotten) – eget lager under
            innehållet, samma klass som FinalCta använder. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-8 md:py-10">
          <p className="font-inscription text-sm text-primary-deep md:text-base">
            {category.kicker}
          </p>
          <h1 className="mt-1 max-w-3xl font-serif text-4xl tracking-tight text-balance md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {category.description}
          </p>
          {category.subcategories && category.subcategories.length > 0 && (
            <nav aria-label="Underkategorier" className="mt-5 flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to="/kategori/$slug"
                  params={{ slug: sub.slug }}
                  className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-sm transition-colors hover:border-primary-deep hover:text-primary-deep"
                >
                  {sub.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
