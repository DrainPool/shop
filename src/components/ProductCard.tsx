import { Link } from "@tanstack/react-router";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const node = product.node;
  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.find((v) => v.node.availableForSale)?.node
    ?? node.variants?.edges?.[0]?.node;
  const hasOptions = (node.variants?.edges?.length ?? 0) > 1;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Tillagd i varukorgen", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/produkt/$handle"
        params={{ handle: node.handle }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {node.tags?.includes("bastsaljare") && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
              Mest älskad
            </span>
          )}
          {node.tags?.includes("nyhet") && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink shadow-soft">
              Nyhet i verkstaden
            </span>
          )}
          {parseFloat(node.priceRange.minVariantPrice.amount) >= 800 && (
            <span className="rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-ink-foreground shadow-soft">
              Fri frakt
            </span>
          )}
        </div>
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Bild kommer snart
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <Link to="/produkt/$handle" params={{ handle: node.handle }}>
          <h3 className="font-serif text-xl leading-tight font-semibold hover:text-primary">
            {node.title}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{node.description}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Graveras med din text – digital skiss innan jag börjar
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="font-medium">
            {hasOptions ? "Från " : ""}
            {formatPrice(
              node.priceRange.minVariantPrice.amount,
              node.priceRange.minVariantPrice.currencyCode,
            )}
          </span>
          {hasOptions ? (
            <Button asChild size="sm" variant="secondary">
              <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                Välj variant
              </Link>
            </Button>
          ) : (
            <Button size="sm" onClick={handleAddToCart} disabled={isLoading || !variant}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="mr-1 h-4 w-4" /> Lägg i korg
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
