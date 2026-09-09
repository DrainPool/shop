import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CreditCard, Heart, Menu, Package, Paintbrush } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/CartDrawer";
import { CutoffInline } from "@/components/FomoBanner";
import { MegaMenu } from "@/components/MegaMenu";
import { SearchOverlay } from "@/components/SearchOverlay";
import { occasions } from "@/lib/categories";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";
import { FOTOGRAFERING_URL } from "@/lib/siteUrls";
import { useWishlist } from "@/lib/wishlist";
import { useUiStore } from "@/stores/uiStore";

const trustItems = [
  { icon: Package, text: `Fri frakt över ${FREE_SHIPPING_LIMIT} kr` },
  { icon: Paintbrush, text: "Tillverkas efter din beställning" },
  { icon: CreditCard, text: "Trygg betalning med Klarna & Swish" },
];

// Sidor vars syfte är att stilla oro – där ska ingen nedräkning ticka
const COUNTDOWN_FREE_PATHS = ["/retur", "/garanti", "/vanliga-fragor"];

const navLinks = [
  { label: "Hem", href: "/" },
  { label: "Mest älskade", slug: "bastsaljare" },
  { label: "Nyheter", slug: "nyheter" },
  { label: "Fotografering", external: FOTOGRAFERING_URL },
  { label: "Alla produkter", hash: "butiken" },
  { label: "Så funkar det", hash: "sa-gar-det-till" },
  // Info-/förtroende-sidor: bara i mobilmeny + footer (håller topp-menyn ren)
  { label: "Vem ska du överraska?", hash: "tillfallen", mobileOnly: true },
  { label: "Vanliga frågor", href: "/vanliga-fragor", mobileOnly: true },
  { label: "Om mig", href: "/om-mig", mobileOnly: true },
  { label: "Så tillverkas det", href: "/tillverkningsprocessen", mobileOnly: true },
  { label: "Kontakt", href: "/kontakt", mobileOnly: true },
  { label: "Frakt & leverans", href: "/frakt-leverans", mobileOnly: true },
] as const;

const primaryLinks = navLinks.filter((l) => !("mobileOnly" in l && l.mobileOnly));

function NavItem({
  link,
  className,
  onNavigate,
}: {
  link: (typeof navLinks)[number];
  className?: string;
  onNavigate?: () => void;
}) {
  if ("slug" in link) {
    return (
      <Link
        to="/kategori/$slug"
        params={{ slug: link.slug }}
        className={className}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    );
  }
  if ("external" in link) {
    return (
      <a
        href={link.external}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }
  if ("hash" in link) {
    return (
      <a href={`/#${link.hash}`} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

/** Önskeliste-hjärta med räknare – länkar till /onskelista. */
function WishlistHeaderButton() {
  const { items } = useWishlist();
  // localStorage finns inte på servern – räkna ut antalet först efter montering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? items.length : 0;

  return (
    <Button asChild variant="outline" size="icon" className="relative rounded-full">
      <Link
        to="/onskelista"
        aria-label={count > 0 ? `Önskelista (${count} sparade)` : "Önskelista"}
      >
        <Heart
          className={`h-5 w-5 ${count > 0 ? "fill-primary text-primary-deep" : "text-foreground"}`}
          aria-hidden="true"
        />
        {count > 0 && (
          <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
            {count}
          </Badge>
        )}
      </Link>
    </Button>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const pathname = useLocation().pathname;

  // ⌘K / Ctrl-K öppnar söket (pekplattor har redan sökknappen i headern)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setSearchOpen]);

  return (
    <>
      {/* Trygghet + nedräkning i samma mörka rad – toppen ska inte äta
          hela första skärmen. */}
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2.5 text-xs font-medium sm:text-sm">
          {trustItems.map((item) => (
            <span key={item.text} className="flex items-center gap-1.5">
              <item.icon className="h-4 w-4 text-gold" aria-hidden="true" />
              {item.text}
            </span>
          ))}
          {!COUNTDOWN_FREE_PATHS.includes(pathname) && <CutoffInline />}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Lins &amp; Lager
            </span>
            <Heart className="h-5 w-5 fill-primary text-primary-deep" aria-hidden="true" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <MegaMenu />
            {primaryLinks.map((l) => (
              <NavItem
                key={l.label}
                link={l}
                className="transition-colors hover:text-primary-deep"
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchOverlay />
            <WishlistHeaderButton />
            <CartDrawer />

            {/* Mobilmeny – syns under lg */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full lg:hidden"
                  aria-label="Öppna menyn"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-72 flex-col sm:w-80">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="font-serif text-2xl">Meny</SheetTitle>
                  <SheetDescription>Hitta rätt present snabbt</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 pb-4" aria-label="Huvudmeny">
                  {navLinks.map((l) => (
                    <NavItem
                      key={l.label}
                      link={l}
                      onNavigate={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-semibold transition-colors hover:bg-cream hover:text-primary-deep"
                    />
                  ))}
                </nav>

                {/* Tillfällen – samma urval som dator-megamenyns "Passar till" */}
                <nav className="mt-2 border-t border-border/60 px-4 pt-4" aria-label="Passar till">
                  <p className="px-3 font-serif text-sm font-bold text-muted-foreground">
                    Passar till
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {occasions.map((o) => (
                      <li key={o.slug}>
                        <Link
                          to="/kategori/$slug"
                          params={{ slug: o.slug }}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm leading-snug font-medium transition-colors hover:bg-cream hover:text-primary-deep"
                        >
                          {o.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <p className="mt-auto px-6 pb-6 text-sm text-muted-foreground">
                  Frågor? Skriv till{" "}
                  <a
                    href="mailto:hej@linsochlager.se"
                    className="font-medium text-primary-deep hover:underline"
                  >
                    hej@linsochlager.se
                  </a>
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

    </>
  );
}
