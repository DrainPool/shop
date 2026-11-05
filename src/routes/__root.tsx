import { withBase } from "@/lib/basePath";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { ScrollExtras } from "@/components/ScrollExtras";
import { SiteFooter } from "@/components/SiteFooter";
import { MinimalProductHeader } from "@/components/product/MinimalProductHeader";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";
import { useCartStore } from "@/stores/cartStore";
import { SITE_URL, GOOGLE_MAPS_URL } from "@/lib/siteUrls";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";
import { Kicker } from "@/components/Kicker";

/**
 * Organisations-schema för Google – sitter på alla sidor via root-layouten.
 * Grundare och ort är frallans uppgifter (sep 2026) – ärlighetsprincipen
 * gäller även i JSON-LD: inget påhittat här.
 */
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taggat",
  url: SITE_URL,
  // Google vill ha en kvadratisk rasterbild, minst 112×112, med opagen botten
  // för organisationslogotypen. apple-touch-icon.png är precis det (180×180,
  // pappersbotten) och är samma märke som favicon.svg. Den pekade tidigare på
  // /favicon.ico – scaffold-ikonen från Initial release, alltså inte Taggats
  // märke alls.
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: "taggat@linsochlager.net",
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
  // Kopplar sajten till Google-företagsprofilen (Lins och Lager, Aneby).
  sameAs: [GOOGLE_MAPS_URL, "https://linsochlager.net"],
  hasMap: GOOGLE_MAPS_URL,
};

/**
 * WebSite-schema med SearchAction – berättar för Google att siten har
 * intern sökning, så ett "sök på sajten"-fältet kan dyka upp direkt i
 * sökresultatet. Query-parametern ?s= matchar sökflows på klientsidan.
 */
const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Taggat",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// Plausible – frallans egen instans (analyt.linsochlager.net), cookiefritt
// och GDPR-vänligt. Laddas bara i produktionsbygget så dev-besök inte
// skräpar ner statistiken.
const PLAUSIBLE_SCRIPT = "https://analyt.linsochlager.net/js/script.js";
const PLAUSIBLE_DOMAIN = "linsochlager.net";

/**
 * Delningsbilden. Ligger som konstant i stället för som två likadana
 * hårdkodade strängar (og:image och twitter:image hade exakt samma värde och
 * kunde glida isär utan att någon märkte det).
 *
 * Filen är og-default.png och inte .jpg: den byggs genom att design-system/
 * taggadet/logo/og-default.html skärmdumpas, och webbläsaren kan bara skriva
 * PNG. Att döpa en PNG till .jpg vore att ljuga om innehållet.
 *
 * Måtten nedan är filens verkliga mått — de stämmer nu, vilket de inte gjorde
 * förut: den gamla og-default.jpg var 1600×1104 medan metat påstod 1200×630.
 *
 * Alt-texten beskriver vad bilden faktiskt visar. Den förra beskrev en
 * verkstadsbild som inte längre är delningsbild.
 */
const OG_IMAGE = `${SITE_URL}/og-default.png`;
const OG_IMAGE_ALT =
  "Taggat – märket och raden ”lasergravyr & personliga presenter, gjorda för hand i Småland”";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <Kicker>åh nej</Kicker>
        <h1 className="mt-1 font-serif text-6xl tracking-tight text-foreground">404</h1>
        <h2 className="mt-3 text-xl font-semibold text-foreground">Sidan hittades inte</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sidan du letar efter finns inte eller har flyttats. Här är några vägar vidare:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            { slug: "presenter", label: "Alla presenter" },
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
            href="mailto:taggat@linsochlager.net"
            className="font-medium text-primary-deep hover:underline"
          >
            taggat@linsochlager.net
          </a>{" "}
          så hittar jag det åt dig.
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
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
      { title: "Taggat – personligt hantverk" },
      {
        name: "description",
        content:
          "Handgjorda och personliga presenter: smycken, gravyr, 3D-utskrifter, foto och stickers till bröllop, dop och företag.",
      },
      { name: "author", content: "Taggat" },
      // Google Search Console-verifiering (frallan, sep 2026)
      { name: "google-site-verification", content: "7378177556809660516" },
      { property: "og:title", content: "Taggat – personligt hantverk" },
      {
        property: "og:description",
        content:
          "Handgjorda och personliga presenter: smycken, gravyr, 3D-utskrifter, foto och stickers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Taggat" },
      { property: "og:locale", content: "sv_SE" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Preload av brödtextens och rubrikernas fontfiler – annars upptäcks
      // de först när styles.css hunnit ladda och tolkas, vilket skjuter upp
      // LCP. crossOrigin krävs för woff2 (annars hämtas filen dubelt).
      {
        rel: "preload",
        href: withBase("/fonts/worksans-latin.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: withBase("/fonts/marcellus-latin.woff2"),
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Sajtens fonter är självhostade (se @font-face i styles.css).
      // Gravyrtypsnitten i anpassningsformuläret kommer däremot från
      // Google Fonts – de injiceras av ProductCustomizer först när kunden
      // öppnar formuläret och blockerar aldrig övriga sidors rendering.
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
      // Flikikonen i tre lager. SVG först: den är skarp i varje storlek och
      // växlar själv färg med systemtemat (se public/favicon.svg). PNG-32 som
      // komplement till webbläsare utan SVG-faviconstöd, och apple-touch-icon
      // för hemskärmen. favicon.ico ligger kvar sist som sista utväg – den är
      // scaffold-ikonen från Initial release och kan inte ersättas i ICO-format
      // utan ett bildverktyg, vilket repot inte har. Den förfalskas inte.
      { rel: "icon", href: withBase("/favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: withBase("/favicon-32.png"), type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: withBase("/apple-touch-icon.png"), sizes: "180x180" },
      { rel: "icon", href: withBase("/favicon.ico"), type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSON_LD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(WEBSITE_JSON_LD),
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
  const isProductPage = useLocation().pathname.startsWith("/produkt/");

  // Varukorgen persistar med skipHydration – SSR-html och första klientrender
  // matchar (ingen badge-mismatch), sedan rehydreras den här efter montering.
  // Kommer localStorage från demoläget (demo-cart-…) städas den bort direkt i
  // riktigt läge, annars skickas kunden mot demo.checkout.invalid i kassan.
  useEffect(() => {
    const { cartId, clearCart } = useCartStore.getState();
    void import("@/lib/demoProducts").then(({ isDemoMode }) => {
      if (!isDemoMode() && cartId?.startsWith("demo-")) clearCart();
    });
    void useCartStore.persist.rehydrate();
  }, []);

  return (
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-full focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Hoppa till innehållet
        </a>
        <ScrollExtras />
        {isProductPage ? <MinimalProductHeader /> : <SiteHeader />}
        <main id="main" className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="top-center" />
      </div>
    );
}
