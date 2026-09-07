import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/siteUrls";

export interface Crumb {
  label: string;
  /** Kategorisida */
  slug?: string;
  /** Statisk route, t.ex. "/sortiment" */
  to?: string;
}

/** Brödsmulor med JSON-LD för Google. Sista posten är alltid nuvarande sida. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  // schema.org kraver absoluta URL:er
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Hem", url: `${SITE_URL}/` },
      ...items.map((i) => ({
        name: i.label,
        url: i.slug ? `${SITE_URL}/kategori/${i.slug}` : i.to ? `${SITE_URL}${i.to}` : "",
      })),
    ].map((i, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: i.name,
      ...(i.url ? { item: i.url } : {}),
    })),
  };

  return (
    <nav
      aria-label="Brödsmulor"
      className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
    >
      <Link to="/" className="hover:text-primary-deep">
        Hem
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            {last ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : item.slug ? (
              <Link
                to="/kategori/$slug"
                params={{ slug: item.slug }}
                className="hover:text-primary-deep"
              >
                {item.label}
              </Link>
            ) : (
              <Link to={item.to ?? "/"} className="hover:text-primary-deep">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
