import { useId } from "react";
import { Heart, Truck, Sparkles } from "lucide-react";
import { FREE_SHIPPING_LIMIT } from "@/lib/shopify";

/** Tape-variant av 21st.dev "Footer Taped Design" (radu, id 4448) — dekortejp i sepia. */
function Tape({ className }: { className?: string }) {
  const sheenId = useId();
  return (
    <svg viewBox="0 0 95 40" fill="none" aria-hidden="true" className={className}>
      <path d="M4 12 L91 4 L88 30 L2 34 Z" fill="currentColor" opacity="0.85" />
      <path d="M4 12 L91 4 L88 30 L2 34 Z" fill={`url(#${sheenId})`} />
      <defs>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const promises = [
  {
    icon: Truck,
    title: `Fri frakt över ${FREE_SHIPPING_LIMIT} kr`,
    text: "Spårbar leverans inom Sverige.",
  },
  { icon: Sparkles, title: "Skapas efter din order", text: "Digital skiss innan tillverkning." },
  { icon: Heart, title: "Handgjort i Småland", text: "Små serier, stor omtanke." },
];

/**
 * Butikens tre löften — flyttad från sidfoten till raden direkt under
 * menyn (frallans önskan, sep 2026): de ska synas innan kunden scrollar.
 */
export function TrustPromises() {
  return (
    <div className="relative border-b border-border bg-cream">
      {/* Tepan hänger från bandets övre kant men inuti — den sticky
          headern ligger ovanpå i z-ordningen och skulle annars klippa den. */}
      <Tape className="absolute top-1 left-6 h-7 w-16 -rotate-6 text-gold/70" />
      <Tape className="absolute -bottom-3 right-8 h-7 w-16 rotate-3 text-gold/70" />
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 sm:grid-cols-3 sm:gap-6 sm:py-8">
        {promises.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep" />
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
