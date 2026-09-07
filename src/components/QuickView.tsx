import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, getPricing, type ShopifyProduct } from "@/lib/shopify";

export function QuickView({ product }: { product: ShopifyProduct }) {
  const [open, setOpen] = useState(false);

  const node = product.node;
  const image = node.images?.edges?.[0]?.node;
  const hasOptions = (node.variants?.edges?.length ?? 0) > 1;
  const { price, compare, onSale, currency } = getPricing(product);

  // Snabbtitten visar bara en förhandskopia – köpet och
  // personaliseringen sker på produktsidan, aldrig här.

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute top-14 right-3 z-10 rounded-full bg-background/90 p-2 shadow-soft transition-all hover:bg-background focus-visible:-translate-y-0.5 sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100 pointer-coarse:opacity-100"
        aria-label={`Snabbtitt på ${node.title}`}
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{node.title}</DialogTitle>
            <DialogDescription>
              Snabbtitt – personaliseringen väljer du på produktsidan.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-muted">
              {image && (
                <img
                  src={image.url}
                  alt={image.altText || node.title}
                  className="aspect-square w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col">
              <p className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-semibold text-primary-deep">
                  {/* "Från" när varianterna skiljer i pris – samma princip som på produktkortet */}
                  {hasOptions ? "Från " : ""}
                  {formatPrice(price, currency)}
                </span>
                {onSale && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(compare, currency)}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">Gravyren ingår i priset</p>
              <p className="mt-3 line-clamp-6 text-sm text-muted-foreground">{node.description}</p>
              <div className="mt-auto space-y-2 pt-5">
                <Button asChild className="w-full rounded-full">
                  <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                    {hasOptions ? "Välj variant" : "Personalisera"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
