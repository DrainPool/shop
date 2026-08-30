import { cn } from "@/lib/utils";

const METHODS = ["Klarna", "Swish", "Visa", "Mastercard", "Apple Pay"];

/** Betalsätt som textbadges – tydligt utan att låna in externa logotypfiler. */
export function PaymentLogos({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Betalsätt">
      {METHODS.map((m) => (
        <li
          key={m}
          className="rounded-md border border-current/20 bg-background/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-ink"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}
