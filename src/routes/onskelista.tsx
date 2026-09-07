import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WishlistRow } from "@/components/WishlistRow";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/onskelista")({
  head: () => ({
    meta: [
      { title: "Min önskelista – Lins & Lager" },
      {
        name: "description",
        content:
          "Dina sparade favoriter hos Lins & Lager – samla presentidéer och maila listan till dig själv.",
      },
      // Personlig sida baserad på localStorage – ska inte indexeras
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items } = useWishlist();
  // Listan lever i localStorage – rendera den först efter montering
  // så servern och klienten hydrerar samma markup
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasItems = mounted && items.length > 0;

  // Maila listan till sig själv: titlar + länkar som kropptext
  const mailLink = hasItems
    ? `mailto:?subject=${encodeURIComponent("Min önskelista hos Lins & Lager")}&body=${encodeURIComponent(
        items.map((p) => `• ${p.title}\nhttps://linsochlager.net/produkt/${p.handle}`).join("\n\n"),
      )}`
    : null;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Breadcrumbs items={[{ label: "Min önskelista" }]} />
      <p className="mt-6 font-script text-2xl text-primary-deep">Sparat i hjärtat</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Min önskelista</h1>

      {!hasItems ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-10 text-center">
          <Heart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <p className="max-w-md text-muted-foreground">
            Tryck på hjärtat på en produkt så samlas den här – en egen lista av presentidéer som
            finns kvar nästa gång du tittar in.
          </p>
          <Button asChild>
            <Link to="/sortiment">Bläddra i sortimentet</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <WishlistRow removable />

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={mailLink ?? "#"}>
                <Mail className="mr-2 h-4 w-4" />
                Maila min lista till mig själv
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sortiment">Bläddra i sortimentet</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Listan sparas i din webbläsare – mejlet är ett enkelt sätt att spara den utanför den här
            enheten.
          </p>
        </div>
      )}
    </article>
  );
}
