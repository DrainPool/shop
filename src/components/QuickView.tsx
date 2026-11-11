import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

  // DialogTrigger (i stället för egen onClick) ser till att fokus återgår
  // till snabbtitt-knappen när dialogen stängs – annars tappas den till body.

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="absolute top-14 right-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-background/90 shadow-soft transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-background focus-visible:-translate-y-0.5 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100 pointer-coarse:opacity-100"
          aria-label={`Snabbtitt på ${node.title}`}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
      </DialogTrigger>

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
                loading="lazy"
                decoding="async"
                width={700}
                height={700}
                className="aspect-square w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="flex items-baseline gap-2">
              {/* Marcellus är 400-only – ingen viktklass på font-serif. */}
              <span className="font-serif text-2xl text-primary-deep">
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
            <p className="text-xs text-muted-foreground">Personaliseringen ingår i priset</p>
            <p className="mt-3 line-clamp-6 text-sm text-muted-foreground">{node.description}</p>
            <div className="mt-auto space-y-2 pt-5">
              {/* Knappbasen (rounded-full + shadow-soft) räcker. */}
              <Button asChild className="w-full">
                <Link to="/produkt/$handle" params={{ handle: node.handle }}>
                  {hasOptions ? "Välj variant" : "Personalisera"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
