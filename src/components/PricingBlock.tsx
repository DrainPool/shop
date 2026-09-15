import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingBlock as PricingBlockType } from "@/lib/categories";

export function PricingBlock({ block }: { block: PricingBlockType }) {
  const hasContact = block.rows.some(
    (r) => r.price.toLowerCase().includes("kontakta") || r.price.toLowerCase().includes("offert"),
  );

  return (
    <div className="mt-8 rounded-2xl border border-primary/25 bg-cream p-6 shadow-soft">
      {block.title && <p className="font-inscription text-xs text-primary-deep">{block.title}</p>}

      <div className="mt-5 space-y-1">
        {block.rows.map((row, i) => {
          const isContact =
            row.price.toLowerCase().includes("kontakta") ||
            row.price.toLowerCase().includes("offert");

          return (
            <div
              key={i}
              className={cn(
                "flex items-baseline justify-between rounded-xl px-4 py-3",
                // bg-card/70 i stället för off-token-vitt: bränner inte i mörkt läge
                isContact ? "bg-gold/15 text-primary-deep" : "bg-card/70 text-muted-foreground",
              )}
            >
              <span className="font-medium">{row.label}</span>
              <span
                className={cn(
                  "font-serif text-lg tracking-tight",
                  // primary-deep i stället för gold på ljus guld-yta: bättre kontrast
                  isContact ? "text-primary-deep" : "text-foreground",
                )}
              >
                {row.price}
              </span>
            </div>
          );
        })}
      </div>

      {hasContact && (
        <div className="mt-5 flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <Link
            to="/kontakt"
            className="font-medium text-primary-deep underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Begär offert för större volymer eller hela set
          </Link>
        </div>
      )}

      {block.note && <p className="mt-4 text-xs text-muted-foreground">{block.note}</p>}
    </div>
  );
}
