import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CreditCard, Heart, Menu, Package, Paintbrush, Sparkles } from "lucide-react";
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
import { FomoBanner } from "@/components/FomoBanner";

const trustItems = [
  { icon: Package, text: "Fri frakt över 800 kr" },
  { icon: Paintbrush, text: "Tillverkas efter din beställning" },
  { icon: CreditCard, text: "Trygg betalning med Klarna & Swish" },
];

const navLinks = [
  { label: "Hem", href: "/" },
  { label: "Mest älskade", slug: "bastsaljare" },
  { label: "Nyheter", slug: "nyheter" },
  { label: "Alla produkter", hash: "butiken" },
  { label: "Vem ska du överraska?", hash: "tillfallen" },
  { label: "Så funkar det", hash: "sa-gar-det-till" },
  // Info-/förtroende-sidor: bara i mobilmeny + footer (håller topp-menyn ren)
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

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2.5 text-xs font-medium sm:text-sm">
          {trustItems.map((item, i) => (
            <span key={item.text} className="flex items-center gap-6">
              {i > 0 && <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />}
              <span className="flex items-center gap-1.5">
                <item.icon className="h-4 w-4 text-gold" aria-hidden="true" />
                {item.text}
              </span>
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-semibold tracking-tight">Lins &amp; Lager</span>
            <Heart className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {primaryLinks.map((l) => (
              <NavItem key={l.label} link={l} className="transition-colors hover:text-primary" />
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
                <nav className="flex flex-col gap-1 px-4 pb-8" aria-label="Huvudmeny">
                  {navLinks.map((l) => (
                    <NavItem
                      key={l.label}
                      link={l}
                      onNavigate={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-semibold transition-colors hover:bg-cream hover:text-primary"
                    />
                  ))}
                </nav>
                <p className="mt-auto px-6 pb-6 text-sm text-muted-foreground">
                  Frågor? Skriv till{" "}
                  <a href="mailto:hej@linsochlager.se" className="font-medium text-primary hover:underline">
                    hej@linsochlager.se
                  </a>
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <FomoBanner floating />
    </>
  );
}