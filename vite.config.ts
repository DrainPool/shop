// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// VITE_BASE_PATH=/shop vid bygge för linsochlager.net/shop. Tomt = roten.
const basePath = (process.env["VITE_BASE_PATH"] || "").replace(/\/+$/, "");
// Endast Shopifys publika Storefront-token får föras vidare till webbläsaren.
const storefrontToken =
  process.env["VITE_SHOPIFY_STOREFRONT_TOKEN"] || process.env["SHOPIFY_STOREFRONT_ACCESS_TOKEN"];

export default defineConfig({
  vite: {
    ...(basePath ? { base: `${basePath}/` } : {}),
    ...(storefrontToken
      ? { define: { 'import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN': JSON.stringify(storefrontToken) } }
      : {}),
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
