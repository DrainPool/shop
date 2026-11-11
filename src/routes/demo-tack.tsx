import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/demo-tack")({
  head: () => ({
    meta: [
      { title: "Tack för din beställning | Taggat" },
      { name: "description", content: "Din beställning har tagits emot. Jag återkommer med en digital skiss inom 24 timmar." },
      { property: "og:title", content: "Tack för din beställning | Taggat" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/demo-tack` }],
  }),
  component: DemoTackPage,
});

function DemoTackPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <Package className="h-12 w-12 text-primary-deep" />
      </div>
      <h1 className="font-serif text-3xl tracking-tight md:text-4xl">Tack för din beställning!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Din order har tagits emot och jag återkommer inom<span className="font-semibold text-foreground"> 24 timmar</span> med en digital skiss.
      </p>
      <p className="mt-2 text-muted-foreground">
        När du har godkänt skissen startar jag gravyren. Du får en ny notis så fort produkten är klar att skickas.
      </p>

      <div className="mt-8 grid gap-4 sm:flex sm:justify-center">
        <Link to="/sortiment">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Fortsätt handla
          </Button>
        </Link>
        <Link to="/kontakt">
          <Button size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Kontakta mig
          </Button>
        </Link>
      </div>

      <div className="mt-12 rounded-2xl bg-cream p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Vad händer nu?</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-left">
          <li>Jag skickar en digital skiss inom 24 timmar.</li>
          <li>Du godkänner skissen (eller ber om ändringar).</li>
          <li>Jag graverar och paketerar din beställning.</li>
          <li>Du får ett meddelande när paketet är på väg.</li>
        </ol>
      </div>
    </div>
  );
}
