import { Link } from "@tanstack/react-router";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/Kicker";
import { DELIVERY_PROMISE } from "@/lib/delivery";

/**
 * "Trygghet + FAQ" – sista sektionen på startsidan, direkt efter
 * "Så funkar det". Fångar den som hittat en present men tvekar:
 * hinner den fram, vad om det blir fel, kan jag ångra mig?
 *
 * ÄRLIGHETS-RAM: svaren är kortversioner av /vanliga-fragor – samma
 * fakta, inga nya löften. Skissen skickas på ALLA beställningar
 * (frallans beslut sep 2025).
 */

const HOME_FAQ: FaqItem[] = [
  {
    q: "Hinner presenten fram i tid?",
    a: (
      <>
        {DELIVERY_PROMISE} Därefter tillkommer frakttiden. Har du ett datum som måste hållas, skriv
        det i beställningen så säger jag ärligt om det går.{" "}
        <Link to="/frakt-leverans" className="font-semibold text-primary-deep hover:underline">
          Läs om frakt och leverans
        </Link>
      </>
    ),
  },
  {
    q: "Vad händer om graveringen blir fel?",
    a: (
      <>
        Innan jag börjar skickar jag alltid en digital skiss på gravyren som du godkänner – så
        hinner stavfel och tvivel ikapp innan något graveras. Blir det ändå fel mot din beställning
        står jag för det: 2 års garanti på gravyr och utförande.{" "}
        <Link to="/garanti" className="font-semibold text-primary-deep hover:underline">
          Om garantin
        </Link>
      </>
    ),
  },
  {
    q: "Kan jag ångra mig?",
    a: "Ärligt svar: nej. Personligt graverade varor är gjorda bara för dig, så ångerrätt och öppet köp gäller inte. Däremot gäller reklamationsrätten alltid – blir något tokigt på varan eller graveringen löser jag det.",
  },
];

export function TrustFaq() {
  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-28 px-5 py-12">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
        <div>
          <Kicker>du kan fråga mig vad som helst</Kicker>
          <h2 className="mt-1 font-serif text-4xl tracking-tight">
            Vad de flesta undrar innan de beställer...
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tre raka svar före din beställning. Resten finns samlat på frågesidan.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link to="/vanliga-fragor">Se alla vanliga frågor</Link>
            </Button>
          </div>
        </div>

        {/* Höger: FAQ-accordion */}
        <div>
          <FaqAccordion className="mt-2" items={HOME_FAQ} />
        </div>
      </div>
    </section>
  );
}
