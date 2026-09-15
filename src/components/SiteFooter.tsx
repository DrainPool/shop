import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PaymentLogos } from "@/components/PaymentLogos";
import { Wordmark } from "@/components/Wordmark";
import { FOTOGRAFERING_URL } from "@/lib/siteUrls";
import { productTypes } from "@/lib/categories";

export function SiteFooter() {
  return (
    <footer className="mt-16">
      <div className="bg-ink text-ink-foreground">
        {/* Kategorilänkar på varje sida – crawl-yta till alla produkttyper.
            Wrap-grid i stället för kolumnlistan så att mobilen inte overflowar. */}
        <nav className="mx-auto max-w-7xl px-5 pb-8 pt-10 text-sm" aria-label="Sortiment">
          <h2 className="mb-3 font-serif text-lg">Sortiment</h2>
          <ul className="grid grid-cols-2 gap-2 opacity-80 sm:grid-cols-3 lg:grid-cols-4">
            {productTypes.map((c) => (
              <li key={c.slug}>
                <Link to="/kategori/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-3">
          <div>
            <p className="text-gold">
              <Wordmark />
            </p>
            <p className="mt-3 max-w-xs text-sm opacity-80">
              Personliga smycken, gravyr, 3D-utskrifter och foto – tillverkat för hand i Småland med
              omtanke om varje detalj.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm opacity-80">
              <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
              <a href="mailto:hej@linsochlager.se" className="hover:text-gold hover:underline">
                hej@linsochlager.se
              </a>
            </p>
          </div>

          <nav className="text-sm" aria-label="Köpvillkor">
            <h2 className="mb-3 font-serif text-lg">Köpvillkor</h2>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link to="/frakt-leverans" className="hover:text-gold">
                  Frakt &amp; leveranstid
                </Link>
              </li>
              <li>
                <Link to="/retur" className="hover:text-gold">
                  Retur &amp; reklamation
                </Link>
              </li>
              <li>
                <Link to="/garanti" className="hover:text-gold">
                  Garanti
                </Link>
              </li>
              <li>
                <Link to="/villkor" className="hover:text-gold">
                  Allmänna villkor
                </Link>
              </li>
              <li>
                <Link to="/integritetspolicy" className="hover:text-gold">
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link to="/tillverkningsprocessen" className="hover:text-gold">
                  Tillverkningsprocessen
                </Link>
              </li>
              <li>
                <Link to="/om-mig" className="hover:text-gold">
                  Om mig
                </Link>
              </li>
              <li>
                <Link to="/vanliga-fragor" className="hover:text-gold">
                  Vanliga frågor
                </Link>
              </li>
              <li>
                <a
                  href={FOTOGRAFERING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Fotografering
                </a>
              </li>
            </ul>
          </nav>

          <div className="text-sm opacity-80">
            <h2 className="mb-3 font-serif text-lg text-ink-foreground">Har du en idé?</h2>
            <p>
              Skriv några rader om tillfället, namnen och känslan du vill fånga – du får ett förslag
              med skiss innan jag börjar tillverka.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold/85"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Kontakta mig
              </Link>
              <Link
                to="/foretag"
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/30 px-4 py-2 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
              >
                För företag
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 pb-6">
          <p className="text-xs opacity-70">Trygg betalning via Shopifys kassa</p>
          <PaymentLogos />
        </div>
        <div className="border-t border-ink-foreground/15 py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} TaggaDet. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
