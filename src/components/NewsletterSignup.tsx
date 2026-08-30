import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "hej@linsochlager.se";

/**
 * E-postinsamling utan backend: formuläret öppnar ett förifyllt mejl.
 * När Cloud/nyhetsbrevstjänst kopplas på byts submit-logiken ut.
 */
export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Jag vill ha nyhetsbrevet");
    const body = encodeURIComponent(
      `Hej! Lägg gärna till mig i nyhetsbrevet.\n\nE-post: ${email}\n`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className={cn("rounded-3xl bg-cream p-7", className)}>
      <p className="flex items-center gap-2 font-serif text-xl font-bold">
        <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
        Nyheter, tips och släpp först
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Några mejl om året – nya produkter, säsongens presenttips och när tillverkningen börjar bli
        fullbokad inför jul. Ingen spam, avsluta när du vill.
      </p>

      {sent ? (
        <p className="mt-4 text-sm font-semibold text-primary">
          Tack! Skicka mejlet som öppnades så lägger jag till dig.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Din e-postadress
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.se"
            className="bg-background"
          />
          <Button type="submit">Håll mig uppdaterad</Button>
        </form>
      )}
    </div>
  );
}
