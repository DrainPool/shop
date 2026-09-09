import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PaymentLogos } from "@/components/PaymentLogos";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { LiquidLoader } from "@/components/ui/liquid-loader";
import { WishlistRow } from "@/components/WishlistRow";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { isDemoMode } from "@/lib/demoProducts";
import { FREE_SHIPPING_LIMIT, formatPrice, SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";
import type { CartItem } from "@/stores/cartStore";

export function CartDrawer() {
  // Öppet-läge ligger i uiStore så toastens "Öppna varukorgen" kan nå den
  const isOpen = useUiStore((s) => s.cartOpen);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const {
    items,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    addItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode || "SEK";

  // Kort scale-puls när antalet ändras — transform-only och avstängd vid reduced-motion
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(totalItems);
  useEffect(() => {
    if (totalItems === prevCount.current) return;
    prevCount.current = totalItems;
    if (totalItems === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBounce(true);
    const id = setTimeout(() => setBounce(false), 150);
    return () => clearTimeout(id);
  }, [totalItems]);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  // I demoläget finns ingen riktig kassa – berätta det istället för att
  // öppna den fejkade URL:en (demo.checkout.invalid ger bara DNS-fel).
  // isDemoMode importeras statiskt så window.open sker i samma
  // event-loop-svar som klicket – en await emellan blockerar popups i Safari.
  const handleCheckout = () => {
    if (isDemoMode()) {
      toast.info("Kassan är avstängd i demoläget", {
        description:
          "Butiken körs just nu med exempelprodukter. När riktiga produkter finns i Shopify kopplas kassan på automatiskt.",
        position: "top-center",
      });
      return;
    }
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      // Värna mot en persistad demo-kassa (demo.checkout.invalid) som kan
      // ligga kvar i localStorage från demoläget – aldrig skicka kunden dit.
      let host: string | null = null;
      try {
        host = new URL(checkoutUrl).hostname;
      } catch {
        host = null;
      }
      const shopHost = host?.endsWith(".myshopify.com") || host === SHOPIFY_STORE_PERMANENT_DOMAIN;
      if (!shopHost) {
        toast.info("Kassan är avstängd i demoläget", {
          description:
            "Butiken körs just nu med exempelprodukter. När riktiga produkter finns i Shopify kopplas kassan på automatiskt.",
          position: "top-center",
        });
        return;
      }
      // Samma flik: kunden ska inte komma tillbaka till en varukorg som
      // ser oköpt ut (window.open lämnade drawern öppen bakom kassan).
      window.location.href = checkoutUrl;
    } else {
      toast.error("Kassan kunde inte öppnas", {
        description: "Prova igen, eller skriv till mig så hjälper jag dig.",
        position: "top-center",
      });
    }
  };

  // Ta bort en rad och erbjud ångra – ett misstag raderar annars hela den
  // färdigkonfigurerade graveringen utan återvändo.
  const handleRemove = async (item: CartItem) => {
    await removeItem(item.lineKey);
    // Visa ångra-toasten bara om raden verkligen försvann – misslyckades
    // Shopify-anropet finns den kvar och fel-toasten har redan visats.
    if (!useCartStore.getState().items.some((i) => i.lineKey === item.lineKey)) {
      toast.success("Borttagen från varukorgen", {
        description: item.product.node.title,
        position: "bottom-right",
        action: {
          label: "Ångra",
          onClick: () => {
            void addItem({
              product: item.product,
              variantId: item.variantId,
              variantTitle: item.variantTitle,
              price: item.price,
              quantity: item.quantity,
              selectedOptions: item.selectedOptions,
              attributes: item.attributes,
            });
          },
        },
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      {/* Skärmläsare får antalet meddelat när det ändras – siffran i
          badge-rutan syns bara visuellt (aria-label täcker knappen). */}
      <span role="status" aria-live="polite" className="sr-only">
        {totalItems === 0
          ? "Varukorgen är tom"
          : `${totalItems} ${totalItems === 1 ? "vara" : "varor"} i varukorgen`}
      </span>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          // h-11 w-11 på mobil: 44 px tryckyta (tummens minimimått)
          className="relative h-11 w-11 rounded-full md:h-9 md:w-9"
          aria-label={
            totalItems > 0
              ? `Öppna varukorgen, ${totalItems} ${totalItems === 1 ? "vara" : "varor"}`
              : "Öppna varukorgen"
          }
        >
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          {totalItems > 0 && (
            <Badge
              className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs transition-transform duration-150 ${
                bounce ? "scale-125" : "scale-100"
              }`}
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-serif text-2xl">Din varukorg</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Varukorgen är tom just nu"
              : `${totalItems} ${totalItems === 1 ? "vara" : "varor"} redo att packas`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-4 pt-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center gap-4 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
              <p className="text-muted-foreground">Här dyker dina utvalda favoriter upp.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { slug: "bastsaljare", label: "Mest älskade" },
                  { slug: "nyheter", label: "Nyheter" },
                  { slug: "smycken", label: "Smycken" },
                  { slug: "skarbrador", label: "Skärbrädor" },
                  { slug: "bil", label: "Till bilen" },
                ].map((c) => (
                  <Link
                    key={c.slug}
                    to="/kategori/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setCartOpen(false)}
                    className="min-h-11 rounded-full bg-cream px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary-deep md:min-h-9 md:py-1.5"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
              <WishlistRow limit={3} onNavigate={() => setCartOpen(false)} />
              <PaymentLogos className="justify-center" />
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.lineKey} className="flex gap-4 rounded-lg bg-cream/60 p-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={
                              item.product.node.images.edges[0].node.altText ||
                              item.product.node.title
                            }
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium">
                          <Link
                            to="/produkt/$handle"
                            params={{ handle: item.product.node.handle }}
                            onClick={() => setCartOpen(false)}
                            className="transition-colors duration-300 hover:text-primary-deep"
                          >
                            {item.product.node.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map((o) => o.value).join(" • ")}
                        </p>
                        {item.attributes?.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                            {item.attributes.map((a) => (
                              <li key={a.key}>
                                <span className="font-medium text-foreground">{a.key}:</span>{" "}
                                {a.value}
                              </li>
                            ))}
                          </ul>
                        )}
                        <p className="font-semibold tabular-nums">
                          {item.quantity > 1 && (
                            <span className="font-normal text-muted-foreground">
                              {item.quantity} ×{" "}
                              {formatPrice(item.price.amount, item.price.currencyCode)}{" "}
                            </span>
                          )}
                          {formatPrice(
                            parseFloat(item.price.amount) * item.quantity,
                            item.price.currencyCode,
                          )}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 transition-[color,background-color,transform] duration-200 hover:text-destructive active:scale-95 motion-reduce:active:scale-100 md:h-9 md:w-9"
                          onClick={() => handleRemove(item)}
                          aria-label={`Ta bort ${item.product.node.title} från varukorgen`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 transition-[color,background-color,transform] duration-200 active:scale-95 motion-reduce:active:scale-100 md:h-9 md:w-9"
                            onClick={() => updateQuantity(item.lineKey, -1)}
                            aria-label={`Minska antal ${item.product.node.title} till ${item.quantity - 1}`}
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <span className="w-8 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 transition-[color,background-color,transform] duration-200 active:scale-95 motion-reduce:active:scale-100 md:h-9 md:w-9"
                            onClick={() => updateQuantity(item.lineKey, 1)}
                            aria-label={`Öka antal ${item.product.node.title} till ${item.quantity + 1}`}
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 border-t bg-background pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                <div className="rounded-2xl bg-cream p-4">
                  {totalPrice >= FREE_SHIPPING_LIMIT ? (
                    <p className="text-sm font-semibold text-primary-deep">
                      Grattis – du har fri frakt inom Sverige!
                    </p>
                  ) : (
                    <p className="text-sm">
                      Handla för{" "}
                      <span className="font-semibold text-primary-deep">
                        {formatPrice(FREE_SHIPPING_LIMIT - totalPrice, currency)}
                      </span>{" "}
                      till så bjuder jag på frakten.
                    </p>
                  )}
                  <Progress
                    className="mt-2 h-2"
                    value={Math.min(100, (totalPrice / FREE_SHIPPING_LIMIT) * 100)}
                    aria-label={
                      totalPrice >= FREE_SHIPPING_LIMIT
                        ? "Fri frakt uppnått"
                        : "Framsteg mot fri frakt"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Summa</span>
                  <span className="font-serif text-2xl font-semibold tabular-nums">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <Link to="/frakt-leverans" className="underline hover:text-primary-deep">
                    Fraktalternativ och leveranstid
                  </Link>{" "}
                  väljs i kassan – dina gravyrtexter följer med i beställningen.
                </p>

                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-full transition-[color,background-color,transform] duration-200 active:scale-[0.98] motion-reduce:active:scale-100"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <LiquidLoader size="sm" variant="light" label="Förbereder kassan" />
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      Till kassan
                    </>
                  )}
                </Button>
                {/* Skiss-löftet vid sista steget – stillar stavnings- och
                    personoron precis före främmande kassa. */}
                <p className="text-center text-xs text-muted-foreground">
                  Du får alltid en skiss på gravyren att godkänna innan jag börjar tillverka – skriv
                  till mig när som helst om du känner dig tveksam.
                </p>
                <PaymentLogos className="justify-center" />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
