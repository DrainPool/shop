import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "taggat@linsochlager.net";

/** Enkel pragmatisk e-postkontroll – inte en RFC-monsterregel, men fångar
 * stavfel som saknar @ eller domän så närmast fältet som möjligt. */
function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * E-postinsamling utan backend: formuläret öppnar ett förifyllt mejl.
 * När Cloud/nyhetsbrevstjänst kopplas på byts submit-logiken ut.
 */
export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError(
        "Kolla adressen – den ser inte riktigt komplett ut (den behöver både @ och en domän, t.ex. din@epost.se).",
      );
      return;
    }
    setError(null);
    const subject = encodeURIComponent("Jag vill ha nyhetsbrevet");
    const body = encodeURIComponent(
      `Hej! Lägg gärna till mig i nyhetsbrevet.\n\nE-post: ${trimmed}\n`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className={cn("rounded-3xl bg-cream p-7", className)}>
      {/* h2 – sektionstiteln ska nås via rubriknavigering, inte bara visuellt */}
      <h2 className="flex items-center gap-2 font-serif text-xl">
        <Mail className="h-5 w-5 text-primary-deep" aria-hidden="true" />
        Nyheter och presenttips först
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Några mejl om året – nya produkter, säsongens presenttips och när tillverkningen börjar bli
        fullbokad inför jul. Ingen spam, avsluta när du vill.
      </p>

      {sent ? (
        <div className="mt-4 text-sm" role="status">
          <p className="font-semibold text-primary-deep">
            Tack! Skicka mejlet som öppnades så lägger jag till dig.
          </p>
          {/* mailto öppnar ingen mejlklient på alla mobilsystem – visa
              adressen som synlig reservväg så anmälan inte försvinner tyst. */}
          <p className="mt-2 text-muted-foreground">
            Öppnades inget mejl? Skicka ett vanligt mejl till{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-primary-deep transition-colors duration-300 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            så lägger jag till dig ändå.
          </p>
        </div>
      ) : (
        // noValidate + egen feltext: webbläsarens egna bubblor hamnar långt
        // från fältet och ser annorlunda ut – här syns felet precis under.
        <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-2">
          <label htmlFor="newsletter-email" className="text-sm font-medium">
            Din e-postadress
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="din@epost.se"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-email-error" : undefined}
              className="bg-background"
            />
            <Button
              type="submit"
              className="rounded-full transition-[color,background-color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              Anmäl mig
            </Button>
          </div>
          {error && (
            <p
              id="newsletter-email-error"
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
