import { cn } from "@/lib/utils";

// Bara metoder som Shopify-kassan med säkerhet erbjuder i Sverige.
// Swish och Apple Pay finns i Shopify-kassan först med extra aktivering –
// lägg tillbaka dem när de är verifierade mot riktiga kassan vid lansering.
// (Ärlighetsprincipen: utlova inget kassan inte levererar.)
const METHODS = ["Klarna", "Visa", "Mastercard"];

/** Betalsätt som textbadges – tydligt utan att låna in externa logotypfiler. */
export function PaymentLogos({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Betalsätt">
      {METHODS.map((m) => (
        <li
          key={m}
          className="rounded-md border border-border bg-background/90 px-2.5 py-1.5 text-xs font-semibold tracking-wide text-foreground"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}
