/**
 * Platshållare med samma mått som ProductCard (rounded-3xl, aspect-square,
 * tre textrader) – ger ingen layoutyck när riktiga produkter ritas in.
 * Pulsen stängs av vid prefers-reduced-motion.
 */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      <div className="aspect-square w-full animate-pulse bg-muted motion-reduce:animate-none" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        <div className="h-3 w-full animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

/** Rutnät med skeletons – antal anger hur många kort som väntas. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
