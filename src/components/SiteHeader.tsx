import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { MegaMenu } from "@/components/MegaMenu";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Wordmark } from "@/components/Wordmark";
import { occasions, recipients } from "@/lib/categories";
import { FOTOGRAFERING_URL } from "@/lib/siteUrls";
import { useWishlist } from "@/lib/wishlist";
import { useUiStore } from "@/stores/uiStore";

const navLinks = [
  { label: "Presenter", slug: "presenter" },
  { label: "Alla produkter", href: "/sortiment" },
  { label: "Presentguide", href: "/presentguide" },
  { label: "För företag", href: "/foretag" },
  // Info-/förtroende-sidor: bara i mobilmeny + footer (håller topp-menyn ren)
  { label: "Hem", href: "/", mobileOnly: true },
  { label: "Fotografering", external: FOTOGRAFERING_URL, mobileOnly: true },
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
        hash="produkter"
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
    <Button
      asChild
      variant="outline"
      size="icon"
      // h-11 w-11 på mobil: 44 px tryckyta (tummens minimimått)
      className="relative h-11 w-11 rounded-full md:h-9 md:w-9"
    >
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);

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
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" aria-label="Taggat – till startsidan">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
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
                  // h-11 w-11 på mobil: 44 px tryckyta (tummens minimimått)
                  className="h-11 w-11 rounded-full md:h-9 md:w-9 lg:hidden"
                  aria-label="Öppna menyn"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              {/* overflow-y-auto: menyn (länkar + tillfällen) blir högre än
                  skärmen på små telefoner och måste kunna scrollas. */}
              <SheetContent side="right" className="flex w-72 flex-col overflow-y-auto sm:w-80">
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

                <nav
                  className="mt-2 border-t border-border/60 px-4 pt-4"
                  aria-label="Presenter till"
                >
                  <p className="px-3 font-serif text-sm text-muted-foreground">Presenter till</p>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {recipients.map((recipient) => (
                      <li key={recipient.slug}>
                        <Link
                          to="/kategori/$slug"
                          params={{ slug: recipient.slug }}
                          hash="produkter"
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm leading-snug font-medium transition-colors hover:bg-cream hover:text-primary-deep"
                        >
                          {recipient.slug === "presenter" ? "Alla presenter" : recipient.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Tillfällen – samma urval som dator-megamenyns "Passar till" */}
                <nav className="mt-2 border-t border-border/60 px-4 pt-4" aria-label="Passar till">
                  <p className="px-3 font-serif text-sm text-muted-foreground">Passar till</p>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {occasions.map((o) => (
                      <li key={o.slug}>
                        <Link
                          to="/kategori/$slug"
                          params={{ slug: o.slug }}
                          hash="produkter"
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
                    href="mailto:taggat@linsochlager.net"
                    className="font-medium text-primary-deep hover:underline"
                  >
                    taggat@linsochlager.net
                  </a>
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="border-b border-border bg-background">
        <form
          role="search"
          aria-label="Sök i hela butiken"
          className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            void navigate({
              to: "/sortiment",
              search: { q: searchTerm.trim(), category: "" },
              hash: "sortiment",
            });
          }}
        >
          <div className="relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              aria-label="Sök produkter i butiken"
              placeholder="Sök produkter…"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-11 pl-10"
            />
          </div>
          <Button type="submit" className="h-11">
            <Search aria-hidden="true" className="h-4 w-4" />
            Sök
          </Button>
        </form>
      </div>
    </>
  );
}
