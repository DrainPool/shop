import { useId } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Mail, Truck, Sparkles } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PaymentLogos } from "@/components/PaymentLogos";
import { FOTOGRAFERING_URL } from "@/lib/siteUrls";

/** Tape-variant av 21st.dev "Footer Taped Design" (radu, id 4448) — dekortejp i sepia. */
function Tape({ className }: { className?: string }) {
  const sheenId = useId();
  return (
    <svg viewBox="0 0 95 40" fill="none" aria-hidden="true" className={className}>
      <path d="M4 12 L91 4 L88 30 L2 34 Z" fill="currentColor" opacity="0.85" />
      <path d="M4 12 L91 4 L88 30 L2 34 Z" fill={`url(#${sheenId})`} />
      <defs>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const promises = [
  { icon: Truck, title: "Fri frakt över 800 kr", text: "Spårbar leverans inom Sverige." },
  { icon: Sparkles, title: "Skapas efter din order", text: "Digital skiss innan tillverkning." },
  { icon: Heart, title: "Handgjort i Småland", text: "Små serier, stor omtanke." },
];

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="relative border-y border-border bg-cream">
        <Tape className="absolute -top-3 left-6 h-7 w-16 -rotate-6 text-gold/70" />
        <Tape className="absolute -bottom-3 right-8 h-7 w-16 rotate-3 text-gold/70" />
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep" />
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <NewsletterSignup />
      </div>

      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-serif text-2xl font-semibold">
              Lins &amp; Lager <Heart className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
            </p>
            <p className="mt-3 max-w-xs text-sm opacity-80">
              Personliga smycken, gravyr, 3D-utskrifter och foto – tillverkat för hand i Småland med
              omtanke om varje detalj.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm opacity-80">
              <Mail className="h-4 w-4 text-gold" />
              <a href="mailto:hej@linsochlager.se" className="hover:text-gold hover:underline">
                hej@linsochlager.se
              </a>
            </p>
          </div>

          <nav className="text-sm" aria-label="Köpvillkor">
            <h2 className="mb-3 font-serif text-lg font-semibold">Köpvillkor</h2>
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
            <h2 className="mb-3 font-serif text-lg font-semibold text-ink-foreground">
              Har du en idé?
            </h2>
            <p>
              Skriv några rader om tillfället, namnen och känslan du vill fånga – du får ett förslag
              med skiss innan vi börjar tillverka.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold/85"
              >
                <Mail className="h-4 w-4" /> Kontakta mig
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 pb-6">
          <p className="text-xs opacity-70">Trygg betalning via Shopifys kassa</p>
          <PaymentLogos />
        </div>
        <div className="border-t border-ink-foreground/15 py-5 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Lins &amp; Lager. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
