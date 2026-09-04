import { useState, useEffect } from "react";
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
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Heart } from "lucide-react";
import { LiquidLoader } from "@/components/ui/liquid-loader";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { useWishlist } from "@/lib/wishlist";

const FREE_SHIPPING_LIMIT = 800;

/** Spara-tips: sparade produkter från önskelistan när varukorgen är tom. */
function WishlistStrip({ onDone }: { onDone: () => void }) {
  const { items } = useWishlist();
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4 text-left">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Heart className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
        Dina sparade favoriter ({items.length})
      </p>
      <ul className="mt-3 space-y-2">
        {items.slice(0, 3).map((p) => (
          <li key={p.handle} className="flex items-center gap-3">
            <Link
              to="/produkt/$handle"
              params={{ handle: p.handle }}
              onClick={onDone}
              className="group flex min-w-0 flex-1 items-center gap-3"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
              )}
              <span className="min-w-0 truncate text-sm font-medium group-hover:text-primary">
                {p.title}
              </span>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {formatPrice(p.price, p.currency)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {items.length > 3 && (
        <p className="mt-2 text-xs text-muted-foreground">+ {items.length - 3} till</p>
      )}
    </div>
  );
}

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode || "SEK";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Öppna varukorgen</span>
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
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
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
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-cream px-4 py-2 text-sm font-medium hover:text-primary"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
              <WishlistStrip onDone={() => setIsOpen(false)} />
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
                            alt={item.product.node.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium">{item.product.node.title}</h3>
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
                        <p className="font-semibold">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.lineKey)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.lineKey, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.lineKey, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 border-t bg-background pt-4 pb-4">
                <div className="rounded-2xl bg-cream p-4">
                  {totalPrice >= FREE_SHIPPING_LIMIT ? (
                    <p className="text-sm font-semibold text-primary">
                      Grattis – du har fri frakt inom Sverige!
                    </p>
                  ) : (
                    <p className="text-sm">
                      Handla för{" "}
                      <span className="font-semibold text-primary">
                        {formatPrice(FREE_SHIPPING_LIMIT - totalPrice, currency)}
                      </span>{" "}
                      till så bjuder jag på frakten.
                    </p>
                  )}
                  <Progress
                    className="mt-2 h-2"
                    value={Math.min(100, (totalPrice / FREE_SHIPPING_LIMIT) * 100)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Summa</span>
                  <span className="font-serif text-2xl font-semibold">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <Link to="/frakt-leverans" className="underline hover:text-primary">
                    Fraktalternativ och leveranstid
                  </Link>{" "}
                  väljs i kassan – personlig gravyrtext bekräftas där.
                </p>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <LiquidLoader size="sm" variant="light" label="Förbereder kassan" />
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Till kassan
                    </>
                  )}
                </Button>
                <PaymentLogos className="justify-center" />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
