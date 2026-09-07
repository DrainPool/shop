import { Link } from "@tanstack/react-router";
import { Gift, ShieldCheck, Truck } from "lucide-react";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/button";

/**
 * "Trygghet + FAQ" – sista sektionen på startsidan, direkt efter
 * "Så funkar det". Fångar den som hittat en present men tvekar:
 * hinner den fram, vad om det blir fel, kan jag ångra mig?
 *
 * ÄRLIGHETS-RAM: svaren är kortversioner av /vanliga-fragor – samma
 * fakta, inga nya löften. Skissen skickas på ALLA beställningar
 * (frallans beslut sep 2025).
 */

type TrustCard = {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
  to?: "/garanti" | "/frakt-leverans";
  linkLabel?: string;
};

const TRUST_CARDS: TrustCard[] = [
  {
    icon: ShieldCheck,
    title: "2 års garanti",
    text: "På gravyr och utförande. Gör jag fel mot din beställning rättar jag till det.",
    to: "/garanti",
    linkLabel: "Om garantin",
  },
  {
    icon: Truck,
    title: "Leverans 5–11 arbetsdagar",
    text: "Tillverkning på 3–7 dagar, sedan frakt. Skriv ditt datum i beställningen, så säger jag ärligt om det håller.",
    to: "/frakt-leverans",
    linkLabel: "Läs om frakt och leverans",
  },
  {
    icon: Gift,
    title: "Presentklart hela vägen",
    text: "Omsorgsfullt inpackat, klart att ge bort. Skriv att det är en present, så håller jag prislappar borta.",
  },
];

const HOME_FAQ: FaqItem[] = [
  {
    q: "Hinner presenten fram i tid?",
    a: (
      <>
        Tillverkningen tar normalt 3–7 arbetsdagar eftersom allt görs först när du beställt – med
        frakt är du oftast framme inom 5–11 arbetsdagar. Har du ett datum som måste hållas, skriv
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
  {
    q: "Kan jag beställa något som inte finns i butiken?",
    a: (
      <>
        Absolut – det är den roligaste sortens beställning. Beskriv din idé med material, motiv och
        tillfälle, så skickar jag ett förslag med digital skiss och pris innan något tillverkas.
        Ofta kan jag dessutom gravera på saker du redan äger.{" "}
        <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
          Hör av dig med din idé
        </Link>
      </>
    ),
  },
  {
    q: "Packas det presentklart?",
    a: "Ja. Allt packas omsorgsfullt – smycken i presentask – klart att ge bort direkt. Skriv att det är en present i beställningen, så kan jag skicka den rakt till mottagaren med en hälsning med i paketet.",
  },
];

export function TrustFaq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        {/* Vänster: intro + trygghetskort + CTA */}
        <div>
          <p className="font-script text-2xl text-primary-deep">du kan fråga mig vad som helst</p>
          <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight">
            De flesta undrar innan de beställer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Allt jag gör görs för hand, först när du beställt – och det är precis så det ska vara.
            Men på vägen till en personlig present dyker det oftast upp frågor. Här svarar jag
            ärligt på de jag hör oftast. Hittar du inte ditt svar hör du bara av dig – jag svarar
            själv.
          </p>

          <div className="mt-8 space-y-4">
            {TRUST_CARDS.map((card) => (
              <div key={card.title} className="rounded-2xl bg-cream p-5">
                <div className="flex items-center gap-2">
                  <card.icon className="h-5 w-5 text-primary-deep" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-bold">{card.title}</h3>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{card.text}</p>
                {card.to && card.linkLabel && (
                  <Link
                    to={card.to}
                    className="mt-2 inline-block text-sm font-semibold text-primary-deep hover:underline"
                  >
                    {card.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link to="/kontakt">Hör av dig med din fråga</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/vanliga-fragor">Se alla vanliga frågor</Link>
            </Button>
          </div>
        </div>

        {/* Höger: FAQ-accordion */}
        <div>
          <FaqAccordion className="mt-2" items={HOME_FAQ} />
          <p className="mt-4 text-sm text-muted-foreground">
            Hittar du inte din fråga?{" "}
            <Link to="/vanliga-fragor" className="font-semibold text-primary-deep hover:underline">
              Se alla svar
            </Link>{" "}
            eller{" "}
            <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
              skriv till mig
            </Link>{" "}
            – jag svarar alltid själv.
          </p>
        </div>
      </div>
    </section>
  );
}
