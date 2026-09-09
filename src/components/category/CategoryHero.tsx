import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/categories";

/**
 * Kategorisidans hero-kapitel: brödsmulor (via children), kicker,
 * rubrik, full beskrivning och ev. underkategorier. Körs som ett
 * cream-band med kantlinje så första skärmen talar om var kunden
 * landat – och beskrivningen (SEO-texten) visas hela, inte klippt.
 *
 * Hero-bandet ersätter ingen SEO-data: CollectionPage-JSON-LD skrivs
 * fortfarande av route-headern och BreadcrumbList av Breadcrumbs.
 */
export function CategoryHero({ category, children }: { category: Category; children?: ReactNode }) {
  return (
    <header className="border-b border-border/60 bg-cream">
      <div className="mx-auto max-w-6xl px-5 pt-6 pb-16 md:pt-8 md:pb-20">
        {children}
        <p className="mt-8 font-script text-2xl text-primary-deep md:mt-10">{category.kicker}</p>
        <h1 className="mt-1 max-w-3xl font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        {category.subcategories && category.subcategories.length > 0 && (
          <nav aria-label="Underkategorier" className="mt-7 flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to="/kategori/$slug"
                params={{ slug: sub.slug }}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary-deep"
              >
                {sub.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
