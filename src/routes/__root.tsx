import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";
import { SITE_URL } from "@/lib/siteUrls";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

/**
 * Organisations-schema för Google – sitter på alla sidor via root-layouten.
 * Grundare och ort är frallans uppgifter (sep 2026) – ärlighetsprincipen
 * gäller även i JSON-LD: inget påhittat här.
 */
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lins & Lager",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  email: "hej@linsochlager.se",
  description:
    "Handgjorda personliga presenter med gravyr, 3D-utskrifter, foto och stickers – tillverkade i Småland sedan 2016.",
  founder: {
    "@type": "Person",
    name: "Fredrik Arvidsson",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aneby",
    addressCountry: "SE",
  },
};

// Plausible – frallans egen instans (analyt.linsochlager.net), cookiefritt
// och GDPR-vänligt. Laddas bara i produktionsbygget så dev-besök inte
// skräpar ner statistiken.
const PLAUSIBLE_SCRIPT = "https://analyt.linsochlager.net/js/script.js";
const PLAUSIBLE_DOMAIN = "linsochlager.net";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <p className="font-script text-3xl text-primary-deep">åh nej</p>
        <h1 className="mt-1 font-serif text-6xl font-bold tracking-tight text-foreground">404</h1>
        <h2 className="mt-3 text-xl font-semibold text-foreground">Sidan hittades inte</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats. Här är några vända vägar vidare:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            { slug: "bastsaljare", label: "Mest älskade" },
            { slug: "brollop", label: "Till bröllopet" },
            { slug: "dop", label: "Till dopet" },
            { slug: "bil", label: "Till bilen" },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/kategori/$slug"
              params={{ slug: c.slug }}
              className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary-deep"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Till startsidan
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Söker du något särskilt? Skriv till{" "}
          <a
            href="mailto:hej@linsochlager.se"
            className="font-medium text-primary-deep hover:underline"
          >
            hej@linsochlager.se
          </a>{" "}
          så hittar vi det ihop.
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Nu gick något fel</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ett fel uppstod på vår sida. Prova att ladda om, eller gå tillbaka till startsidan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Prova igen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lins & Lager – personligt hantverk" },
      {
        name: "description",
        content:
          "Handgjorda och personliga presenter: smycken, gravyr, 3D-utskrifter, foto och stickers till bröllop, dop och företag.",
      },
      { name: "author", content: "Lins & Lager" },
      // Google Search Console-verifiering (frallan, sep 2026)
      { name: "google-site-verification", content: "7378177556809660516" },
      { property: "og:title", content: "Lins & Lager – personligt hantverk" },
      {
        property: "og:description",
        content:
          "Handgjorda och personliga presenter: smycken, gravyr, 3D-utskrifter, foto och stickers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lins & Lager" },
      { property: "og:locale", content: "sv_SE" },
      { property: "og:image", content: "https://linsochlager.net/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Verkstaden hos Lins & Lager – graverade detaljer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://linsochlager.net/og-default.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Fonterna är självhostade (se @font-face i styles.css) – inga
      // Google-länkar kvar, ingen tredjepartsförfrågan vid sidladdning.
      // Preconnect mot Shopify-domänen bara i riktigt läge (demo läser
      // aldrig dit, då blir det bara en onödig uppslagning).
      ...(import.meta.env["VITE_DEMO_MODE"] === "1"
        ? []
        : [
            {
              rel: "preconnect",
              href: `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`,
            },
          ]),
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSON_LD),
      },
      // Plausible (frallans egen instans) laddas bara i produktion –
      // besök på dev-servern ska inte hamna i statistiken.
      ...(import.meta.env.PROD
        ? [
            {
              src: PLAUSIBLE_SCRIPT,
              defer: true,
              "data-domain": PLAUSIBLE_DOMAIN,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

function AppShell() {
  useCartSync();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-full focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Hoppa till innehållet
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="top-center" />
    </div>
  );
}
