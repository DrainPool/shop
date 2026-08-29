import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";
import { FomoBanner } from "@/components/FomoBanner";

const trustItems = [
  "🚚 Fri frakt över 800 kr",
  "🎨 Tillverkas efter din beställning",
  "💳 Trygg betalning med Klarna & Swish",
];

const navLinks = [
  { label: "Hem", href: "/" },
  { label: "Mest älskade", href: "/kategori/bastsaljare" },
  { label: "Nyheter", href: "/kategori/nyheter" },
  { label: "Alla produkter", href: "/#butiken" },
  { label: "Vem ska du överraska?", href: "/#tillfallen" },
  { label: "Så funkar det", href: "/#sa-gar-det-till" },
  { label: "Om mig", href: "/#om-mig" },
  { label: "Frakt & leverans", href: "/frakt-leverans" },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2.5 text-xs font-medium sm:text-sm">
          {trustItems.map((item, i) => (
            <span key={item} className="flex items-center gap-6">
              {i > 0 && <span className="text-gold">✦</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-semibold tracking-tight">Lins &amp; Lager</span>
            <span className="text-xl text-primary">♥</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CartDrawer />
          </div>
        </div>
      </header>

      <FomoBanner />
    </>
  );
}
