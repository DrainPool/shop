import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOTOGRAFERING_URL } from "@/lib/siteUrls";

/**
 * Idé-bandet – fångar den som inte hittar "rätta presenten" och
 * gör egna designer till nästa steg (kontakt) istället för att
 * lämna sidan. Foto-cross-sellen ligger i samma band som en
 * bisak – den ska inte väga upp huvud-CTA:n.
 *
 * Delas av startsidan (efter "Speciella tillfällen") och
 * /sortiment (sist). ÄRLIGHETS-RAM: inga priser, inga nya löften.
 */
export function IdeaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 rounded-3xl bg-cream p-8 md:grid-cols-[3fr_2fr] md:items-center md:p-12">
        {/* Vänster: egna designer + kontakt-CTA */}
        <div>
          <p className="font-script text-2xl text-primary-deep">hittar du inte rätta presenten?</p>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight">
            Jag gör egna designer
          </h2>
          <p className="mt-3 text-muted-foreground">
            Det som finns i butiken är bara en början. Berätta om tillfället, namnet och känslan du
            vill fånga – så skissar jag något som bara finns i ett exemplar. Ofta kan jag gravera på
            saker du redan äger, också.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link to="/kontakt">Hör av dig med din idé</Link>
          </Button>
        </div>

        {/* Höger: foto-cross-sell (länk ut till fotosajten) */}
        <div className="md:border-l md:border-ink/10 md:pl-10">
          <p className="font-script text-2xl text-primary-deep">jag fotograferar också</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Bröllop, dop, familj och produktbilder – bilden du älskar kan bli tavla, smycke eller
            graverat minne i samma verkstad.
          </p>
          <a
            href={FOTOGRAFERING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-deep hover:underline"
          >
            Läs om fotografering
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(öppnas i nytt fönster)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
