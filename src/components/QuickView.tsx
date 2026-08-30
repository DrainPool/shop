import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getPricing, type ShopifyProduct } from "@/lib/shopify";

export function QuickView({ product }: { product: ShopifyProduct }) {
  const [open, setOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const node = product.node;
  const image = node.images?.edges?.[0]?.node;
  const variant =
    node.variants?.edges?.find((v) => v.node.availableForSale)?.node ??
    node.variants?.edges?.[0]?.node;
  const hasOptions = (node.variants?.edges?.length ?? 0) > 1;
  const { price, compare, onSale, currency } = getPricing(product);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Tillagd i varukorgen", { description: node.title, position: "top-center" });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute top-3 right-3 z-10 hidden rounded-full bg-background/90 p-2 shadow-soft transition-colors hover:bg-background group-hover:block"
        aria-label={`Snabbtitt på ${node.title}`}
      >
        <Eye className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{node.title}</DialogTitle>
            <DialogDescription>Snabbtitt – personaliseringen väljer du på produktsidan.</DialogDescription>
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
                <span className="font-serif text-2xl font-semibold text-primary">
                  {formatPrice(price, currency)}
                </span>
                {onSale && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(compare, currency)}
                  </span>
                )}
              </p>
              <p className="mt-3 line-clamp-6 text-sm text-muted-foreground">{node.description}</p>
              <div className="mt-auto space-y-2 pt-5">
                {hasOptions ? (
                  <Button asChild className="w-full">
                    <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                      Välj variant
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleAdd} disabled={isLoading || !variant}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="mr-1 h-4 w-4" /> Lägg i korgen
                      </>
                    )}
                  </Button>
                )}
                <Button asChild variant="outline" className="w-full">
                  <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                    Till produktsidan
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
