import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TITLE = "Vanliga frågor om gravyr, leverans och personliga presenter | Lins & Lager";
const DESCRIPTION =
  "Svar på de vanligaste frågorna: leveranstid, material, korrektur, gravyr, returer på personliga varor och hur du beställer till bröllop, dop och företag.";

const FAQ = [
  {
    q: "Hur lång är leveranstiden?",
    a: "Tillverkningen tar normalt 3–7 arbetsdagar eftersom allt görs efter din beställning. Med frakten är du oftast framme inom 5–11 arbetsdagar. Har du ett datum som måste hållas – skriv det i beställningen så säger jag ärligt om det går.",
  },
  {
    q: "Får jag se hur graveringen blir innan ni tillverkar?",
    a: "Vid större beställningar och all företagsgravyr skickar jag korrektur för godkännande. På enklare namngravyr följer jag texten du skrivit exakt, så dubbelkolla stavning och versaler.",
  },
  {
    q: "Kan jag lämna tillbaka en personlig produkt?",
    a: "Nej. Personligt tillverkade varor omfattas inte av ångerrätt eller öppet köp, eftersom de görs unikt till dig. Reklamationsrätten gäller alltid vid fel på varan eller om jag gjort fel mot din beställning.",
  },
  {
    q: "Säljer ni paket till hela bröllopet?",
    a: "Ja, det är det vanligaste sättet att beställa: graverade tostglas till toasten, glas- eller flaskeetiketter till gästerna och gåvor till brudparet – allt i samma stil med era namn och ert datum. Berätta om antal gäster och datum så får du ett paketpris med digital skiss innan jag börjar.",
  },
  {
    q: "Han har redan allt – vad ska jag ge honom?",
    a: "Min vanligaste utmaning: mannen som styrt verkstaden, garaget eller jaktpasset i 40–80 år och aldrig ber om något. Klassikerna som alltid landar rätt: skärbräda i ek med familjens favoritrecept graverat, tumbler med namn, garageskylt med hans bil eller en fototavla från ett gammalt fotografi. Berätta en mening om honom så skissar jag på förslag.",
  },
  {
    q: "Kan jag få paketet skickat som present direkt till mottagaren?",
    a: "Ja. Skriv mottagarens adress som leveransadress och att det är en present i beställningen – så packar jag det presentklart. Vill du ha en graverad hälsning med i paketet löser vi det också.",
  },
  {
    q: "Kan ni gravera på föremål jag redan har?",
    a: "Ofta – det beror på materialet. Trä, läder, glas och de flesta metaller går bra, medan vissa ytbehandlingar och lacker är svårare. Skicka en bild och en beskrivning så säger jag ärligt vad som är möjligt innan du skickar in något.",
  },
  {
    q: "Kan jag få en nyckelring eller skylt med mitt registreringsnummer?",
    a: "Ja – skriv reg-numret i beställningen så graverar jag det i bilskyltens stil. Observera att dekorativa skyltar bara får användas som dekoration (till exempel i garaget), inte på bilen i trafik – de är inte godkända av Transportstyrelsen.",
  },
  {
    q: "Hinner ni klart innan jul eller farsdagen?",
    a: "Allt tillverkas efter beställning, normalt på 3–7 arbetsdagar plus frakt, så ju tidigare du beställer desto säkrare. Har du ett viktigt datum – skriv det i beställningen så svarar jag ärligt om jag hinner innan dess.",
  },
  {
    q: "Vilka material jobbar du med?",
    a: "Massiv ek och björk, äkta läder, rostfritt stål, silver, glas, keramik och 3D-utskrifter i PLA/PETG. Berätta hur produkten ska användas så rekommenderar jag material som håller.",
  },
  {
    q: "Gör ni företagsbeställningar och större serier?",
    a: "Ja – namnbrickor, presenter till kunder och profilprodukter. Från tio enheter får du offert med staffelpris, och du kan få faktura.",
  },
  {
    q: "Kan ni fotografera också?",
    a: "Ja. Jag fotograferar bröllop, dop, familj och produkter och kan göra bilden till en fototavla, ett smycke eller en graverad detalj i samma flöde.",
  },
  {
    q: "Hur betalar jag?",
    a: "Kassan hanteras säkert av Shopify. Där kan du betala med kort, Klarna och Swish beroende på vad som är aktivt i butiken vid köptillfället.",
  },
  {
    q: "Vad kostar frakten?",
    a: "Frakten räknas ut i kassan utifrån vikt och leveranssätt. Vid köp över 800 kr bjuder jag på frakten inom Sverige.",
  },
];

export const Route = createFileRoute("/vanliga-fragor")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vanliga-fragor" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/vanliga-fragor" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-script text-2xl text-primary">Fråga på</p>
      <h1 className="mt-1 font-serif text-4xl font-black tracking-tight">Vanliga frågor</h1>
      <p className="mt-3 text-muted-foreground">
        Hittar du inte svaret? Skriv till mig – du får svar av samma person som tillverkar din
        produkt.
      </p>

      <Accordion type="single" collapsible className="mt-8">
        {FAQ.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10 rounded-3xl bg-cream p-8">
        <p className="font-serif text-xl font-bold">Fortfarande osäker?</p>
        <p className="mt-2 text-muted-foreground">
          Berätta vad du vill ge bort så föreslår jag material, text och leveransupplägg.
        </p>
        <Link
          to="/kontakt"
          className="mt-4 inline-block font-semibold text-primary hover:underline"
        >
          Kontakta mig →
        </Link>
      </div>
    </div>
  );
}
