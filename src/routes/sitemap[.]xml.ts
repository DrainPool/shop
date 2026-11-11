import { createFileRoute } from "@tanstack/react-router";
import { occasions, productTypes, recipients } from "@/lib/categories";
import { fetchProducts } from "@/lib/shopify";
import { DEMO_PRODUCTS } from "@/lib/demoProducts";
import { giftTips } from "@/lib/giftTips";
import { SITE_URL } from "@/lib/siteUrls";

/**
 * Sitemapen byggs per anrop i stället för att vara en statisk fil:
 * kategorier kommer från categories.ts (single source of truth) och
 * produkterna hämtas live – så produktsidorna hamnar i XML:en utan att
 * filen måste uppdateras för hand vid varje ny produkt.
 * Faller Shopify-anropet ut (token saknas, butiken nere) används
 * demo-produkterna som fallback så sitemapen aldrig är tom.
 */

const LASTMOD = "2026-11-11";

const STATIC_PAGES: { path: string; priority: string; changefreq?: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/sortiment", priority: "0.9", changefreq: "weekly" },
  { path: "/presentguide", priority: "0.7", changefreq: "monthly" },
  { path: "/foretag", priority: "0.8" },
  { path: "/vanliga-fragor", priority: "0.8" },
  { path: "/om-mig", priority: "0.6" },
  { path: "/tillverkningsprocessen", priority: "0.6" },
  { path: "/kontakt", priority: "0.6" },
  { path: "/frakt-leverans", priority: "0.5" },
  { path: "/retur", priority: "0.5" },
  { path: "/garanti", priority: "0.5" },
  { path: "/villkor", priority: "0.3" },
  { path: "/integritetspolicy", priority: "0.3" },
  { path: "/fotografering", priority: "0.5" },
];

/** Högt prioriterade tillfällen (säsongssidorna som driver trafik) */
const HIGH_PRIORITY_OCCASIONS = new Set([
  "jul",
  "brollop",
  "dop",
  "fodelsedag",
  "morsdag",
  "student",
]);

/** Tillfällen som inte är riktade inköpssidor utan urval/tekniska listor */
const LOW_PRIORITY_OCCASIONS = new Set(["bastsaljare", "nyheter"]);

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: {
          loc: string;
          lastmod?: string | undefined;
          priority: string;
          changefreq?: string | undefined;
        }[] = [];

        for (const p of STATIC_PAGES) {
          entries.push({
            loc: `${SITE_URL}${p.path}`,
            lastmod: LASTMOD,
            priority: p.priority,
            changefreq: p.changefreq,
          });
        }

        // Produkttyperna är navigationsbasen, tillfällena säsongssidor
        for (const c of productTypes) {
          entries.push({
            loc: `${SITE_URL}/kategori/${c.slug}`,
            lastmod: LASTMOD,
            priority: "0.8",
          });
        }
        for (const o of occasions) {
          const priority = HIGH_PRIORITY_OCCASIONS.has(o.slug)
            ? "0.9"
            : LOW_PRIORITY_OCCASIONS.has(o.slug)
              ? "0.4"
              : "0.7";
          entries.push({ loc: `${SITE_URL}/kategori/${o.slug}`, lastmod: LASTMOD, priority });
        }
        for (const recipient of recipients) {
          entries.push({
            loc: `${SITE_URL}/kategori/${recipient.slug}`,
            lastmod: LASTMOD,
            priority: recipient.slug === "presenter" ? "0.9" : "0.8",
          });
        }

        // Presenttips – dynamiskt från giftTips så nya artiklar hamnar
        // automatiskt i sitemapen utan handpåläggning.
        for (const tip of giftTips) {
          entries.push({
            loc: `${SITE_URL}/presenttips/${tip.slug}`,
            lastmod: LASTMOD,
            priority: "0.6",
            changefreq: "monthly",
          });
        }

        // Produktsidorna – hämtas live i båda lägena (demo/Shopify)
        let products: Awaited<ReturnType<typeof fetchProducts>> = [];
        try {
          products = await fetchProducts(250);
        } catch {
          // Nätverksfel/token saknas – fall tillbaka på demo-produkter
          products = DEMO_PRODUCTS.map((d) => ({
            node: {
              id: d.handle,
              title: d.title,
              description: d.description,
              handle: d.handle,
              tags: d.tags,
              availableForSale: true,
              priceRange: {
                minVariantPrice: { amount: d.price, currencyCode: "SEK" },
              },
              images: {
                edges: d.extraImages
                  ? [d.image, ...d.extraImages].map((url) => ({ node: { url, altText: d.title } }))
                  : [{ node: { url: d.image, altText: d.title } }],
              },
              variants: { edges: [] },
              options: [],
            },
          }));
        }
        for (const p of products) {
          entries.push({
            loc: `${SITE_URL}/produkt/${p.node.handle}`,
            lastmod: LASTMOD,
            priority: "0.6",
          });
        }

        const xml =
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          entries
            .map(
              (e) =>
                `  <url><loc>${esc(e.loc)}</loc>` +
                (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "") +
                (e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : "") +
                `<priority>${e.priority}</priority></url>`,
            )
            .join("\n") +
          `\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
