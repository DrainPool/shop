import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";

/** Avskalad produktrad: kunden kan gå tillbaka eller öppna varukorgen. */
export function MinimalProductHeader() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    void router.navigate({ to: "/sortiment" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-5">
        <Button variant="ghost" size="sm" onClick={goBack} className="-ml-2 min-h-11 gap-2 px-3">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Tillbaka
        </Button>
        <CartDrawer />
      </div>
    </header>
  );
}
