import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CalendarClock, Check, Flag, Mail, Percent, Sparkles, Sticker, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import katForetag from "@/assets/till-foretag-2.jpg";
import katGravyr from "@/assets/kat-gravyr.jpg";

export const Route = createFileRoute("/foretag")({
  head: () => ({
    meta: [
      { title: "Företagsgåvor & profilprodukter – Lins & Lager" },
      {
        name: "description",
        content:
          "Personliga företagsgåvor: graverade namnbrickor, kundgåvor med er logga, dash-plaketter och klasspriser för bilträffar. Paketpris till arrangören – offert inom 24 timmar.",
      },
      { property: "og:title", content: "Företagsgåvor & profilprodukter – Lins & Lager" },
      {
        property: "og:description",
        content:
          "Graverade namnbrickor, kundgåvor, bilträff-paket med plaketter och troféer. Små serier, personligt hantverk, offert inom 24 timmar.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BusinessPage,
});

const offerings = [
  {
    title: "Namnbrickor & skyltar",
    text: "Graverade namnbrickor i ek, valnöt eller läder – till receptionen, personalen eller mässmontern.",
  },
  {
    title: "Kund- & medarbetargåvor",
    text: "Personliga tack-gåvor med mottagarens namn – minnets gåva slår presentkortet, varje gång.",
  },
  {
    title: "Profilprodukter med er logga",
    text: "Muggar, tumblers, kepsar och stickers med er logotyp graverad eller tryckt. Små upplagor från 10 st.",
  },
  {
    title: "Bilträffar & klubbar",
    text: "Dash-plaketter till deltagarna, klasspriser med gravyr och klubbdekaler – paketpris till arrangören.",
  },
  {
    title: "Mäss- & eventmaterial",
    text: "Stickers, brickor och detaljer som gör montern personlig – tillverkat i Småland, levererat i tid.",
  },
];

const process = [
  { n: "1", title: "Berätta om ert behov", text: "Antal, budget och tillfälle – enradigt räcker." },
  { n: "2", title: "Offert + digital skiss", text: "Inom 24 timmar. Alltid fast pris, inga överraskningar." },
  { n: "3", title: "Leverans i tid", text: "Spårbar leverans, presentklart packade per mottagare om önskas." },
];

const benefits = [
  "Fast pris per beställning – ni vet kostnaden innan ni bestämmer er",
  "Digital skiss godkänns innan tillverkning påbörjas",
  "Fakturering mot företag med godkänd kredit (30 dagar)",
  "Leverans presentklart per mottagare – klart att dela ut",
];

function BusinessPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Hem
        </Link>
        <span className="px-2">/</span>
        <span>För företag</span>
      </nav>

      <div className="mt-8 grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-script text-3xl text-primary">personligt på jobbet också</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] font-black tracking-tight md:text-6xl">
            Företagsgåvor som verkligen{" "}
            <span className="relative inline-block text-primary">
              betyder något
              <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gold/60" />
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Namnbrickor, graverade kundgåvor och profilprodukter med er logga – handgjorda i
            Småland, i små serier där varje mottagare ser att ni tänkt på just hen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <a href="mailto:hej@linsochlager.se?subject=F%C3%B6retagsbest%C3%A4llning">
                <Mail className="mr-2 h-5 w-5" /> Be om offert
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 px-7 text-base">
              <Link to="/kontakt">Ställ en fråga</Link>
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Percent className="h-4 w-4 text-primary" aria-hidden="true" />
            Stämvolym 10–150 st · faktura · offert inom 24 timmar
          </p>
        </div>
        <img
          src={katForetag}
          alt="Graverade trädetaljer och namnbrickor för företag"
          width={1200}
          height={1200}
          fetchPriority="high"
          className="-rotate-1 rounded-3xl border-4 border-ink shadow-lift"
        />
      </div>

      <section className="mt-20">
        <p className="font-script text-2xl text-primary">det här kan jag göra</p>
        <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">Vad behöver ert team?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o) => (
            <div key={o.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-xl font-bold">{o.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="font-script text-2xl text-primary">för arrangören</p>
        <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
          Bilträff-paketet – allt till träffen i en beställning
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Plaketter till alla deltagare, priser till vinnarna och dekaler till klubben. Du väljer
          motiv – jag skissar, graverar och levererar i tid till donnet.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Flag,
              title: "Dash-plaketter i bulk",
              text: "En plakett till varje deltagare med träffens namn, år och klass. Paket från ca 690 kr för 25 st.",
            },
            {
              icon: Trophy,
              title: "Klasspriser & troféer",
              text: "Bäst i klass, Publikens val, Best in Show – graverade priser med biltema, 149–499 kr/st.",
            },
            {
              icon: Sticker,
              title: "Klubbdekaler & nyckelringar",
              text: "Klubbmärket som dekal och graverad nyckelring – populärt i försäljning på plats. Från 10 st.",
            },
          ].map((p) => (
            <div key={p.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <p.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-cream p-4 text-sm">
          Ungefärliga paketpriser – exakt pris får du med offerten (inom 24 timmar) tillsammans med
          digital skiss. On-site-gravyr på träffen kan bokas efter överenskommelse.
        </p>
      </section>

      <section className="mt-20 grid items-center gap-12 md:grid-cols-2">
        <img
          src={katGravyr}
          alt="Handgraverad ekbricka i verkstaden"
          width={1200}
          height={1200}
          loading="lazy"
          className="rotate-1 rounded-3xl border-4 border-ink shadow-lift"
        />
        <div>
          <p className="font-script text-2xl text-primary">så enkelt går det till</p>
          <h2 className="mt-1 font-serif text-4xl font-black tracking-tight">
            Från förfrågan till leverans
          </h2>
          <ol className="mt-8 space-y-6">
            {process.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-ink p-10 text-ink-foreground md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-script text-2xl text-gold">tryggt för inköpare</p>
            <h2 className="mt-2 font-serif text-3xl font-black tracking-tight md:text-4xl">
              Därför företag väljer Lins & Lager
            </h2>
            <ul className="mt-6 space-y-3 text-sm opacity-90">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink-foreground/5 p-8">
            <h3 className="font-serif text-2xl font-bold">Begär offert</h3>
            <p className="mt-3 text-sm opacity-80">
              Skriv antal, budget och tillfälle – du får svar med prisförslag och skiss inom 24
              timmar på vardagar.
            </p>
            <Button asChild size="lg" className="mt-6 w-full rounded-full">
              <a href="mailto:hej@linsochlager.se?subject=F%C3%B6retagsbest%C3%A4llning">
                <Mail className="mr-2 h-4 w-4" /> hej@linsochlager.se
              </a>
            </Button>
            <p className="mt-3 text-center text-xs opacity-60">
              Svar inom 24 timmar vardagar – ofta mycket snabbare.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}