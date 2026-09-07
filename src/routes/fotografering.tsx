import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { FOTOGRAFERING_URL as EXTERNAL } from "@/lib/siteUrls";

export const Route = createFileRoute("/fotografering")({
  component: RedirectPage,
  head: () => ({
    meta: [
      {
        // Meta-refresh som reserv: skickar vidare omdirigering i SSR/innehållsförhandlare
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "http-equiv": "refresh",
        content: `0;url=${EXTERNAL}`,
      } as any,
    ],
    links: [{ rel: "canonical", href: EXTERNAL }],
  }),
  beforeLoad: () => {
    // Kastar en omdirigering på klientsidan så navigering inom appen går rätt väg.
    if (typeof window !== "undefined") {
      window.location.replace(EXTERNAL);
    }
  },
});

function RedirectPage() {
  useEffect(() => {
    window.location.replace(EXTERNAL);
  }, []);

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold tracking-tight">Fotografering</h1>
      <p className="mt-3 text-muted-foreground">
        Allt om fotografering – bröllop, dop, familj och produktbilder – finns på min fotografiska
        sajt.
      </p>
      <a
        href={EXTERNAL}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold/85"
      >
        Gå till linsochlager.net/foto
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
