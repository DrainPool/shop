# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Lins & Lager" — a Swedish e-commerce site (engraved/personalized gifts) built as a headless Shopify storefront. All user-facing copy, comments, and commit messages are in **Swedish**. The owner goes by "frallan"; the repo path is `shop`, planning docs live in `.hermes/plans/` (launch plan, QA reports, sales-copy research) — read the current launch plan before doing larger feature work.

## Commands

```sh
npm run dev        # dev server
npm run build      # production build (vite build)
npm run lint       # eslint
npm run format     # prettier --write
```

There is **no test framework**. The project's verification gate (per the launch plan) is:

```sh
npx tsc --noEmit   # type check
npm run build      # must pass
```

plus manual visual verification. Commits/pushes only happen when frallan explicitly says so.

Dependencies are managed with bun (`bunfig.toml` supply-chain guard: package versions younger than 24h are rejected; `@lovable.dev/*` packages are exempt). `bun.lock` and `package-lock.json` both exist — regenerate the lockfile if it gets out of sync.

## Build setup — do not fight the Lovable config

`vite.config.ts` wraps `@lovable.dev/vite-tanstack-config`, which already registers tanstackStart, viteReact, tailwindcss, nitro, tsConfigPaths, `@` path alias, VITE_* env injection, etc. **Do not add these plugins manually to vite.config.ts** — duplicates break the build. The custom `tanstackStart.server.entry: "server"` redirects the SSR entry to `src/server.ts` (an error-capture wrapper around the default server entry).

The repo is connected to Lovable: never rewrite pushed history (force push, rebase, squash published commits).

## Architecture

TanStack Start (SSR) + React 19 + Tailwind CSS 4 + zustand + Radix/shadcn (`src/components/ui/`).

**Routing** — file-based in `src/routes/` (see `src/routes/README.md`). The only root layout is `src/routes/__root.tsx`. `src/routeTree.gen.ts` is auto-generated — never edit it. Dynamic params are bare `$` (e.g. `produkt.$handle.tsx`, `kategori.$slug.tsx`).

**Product data — two modes, keyed by `VITE_DEMO_MODE=1` in `.env`:**

- **Shopify mode** (default): `src/lib/shopify.ts` talks to the Shopify Storefront API (GraphQL). The store currently has no active plan or products, so live calls fail — that's why demo mode exists.
- **Demo mode**: `src/lib/demoProducts.ts` provides 12 fictional products that mock `fetchProducts`/`fetchProductByHandle` (prices follow the competitive research in `.hermes/plans/`). Product images are AI-generated, served from `public/images/products/` (`{kategori}_{plats}_{hash}.webp` naming; `public/images/products/_v1_backup/` holds old versions).

Every consumer checks `isDemoMode()` and branches — if you add a new Shopify-touching code path, it needs its own demo-mode branch (this pattern exists in `src/stores/cartStore.ts` for cart mutations, added to silence 401 errors in demo).

**Env vars** (bracket access only — `env["VITE_DEMO_MODE"]`, dot access is not the pattern here): `VITE_DEMO_MODE=1` switches to demo mode, `VITE_SHOPIFY_STOREFRONT_TOKEN` is the public Storefront token, `FIRECRAWL_API_KEY` is server-only (used by the crawl API route).

**Server API routes** — `src/routes/api/**` are TanStack Start server routes (`server.handlers.POST` etc. on the route object), not page routes. Existing example: `api/public/firecrawl-crawl.ts` (proxies Firecrawl; reads `FIRECRAWL_API_KEY` server-side, never via `VITE_*`).

**Cart** — `src/stores/cartStore.ts` (zustand + `persist` to localStorage) owns the full cart lifecycle: cart create/lines add/update/remove via Storefront cart mutations, with line attributes carrying engraving/customization text. `buildLineKey()` dedupes lines by variant + attributes. `src/hooks/useCartSync.ts` re-syncs the cart with Shopify on mount/visibility-change. `src/stores/uiStore.ts` holds ephemeral cross-component UI state (cart drawer / search open).

**Categories** — `src/lib/categories.ts` is the single source of truth. Categories are **tag-based**: each category has a `tag` that filters products fetched from Shopify; category pages (`kategori.$slug.tsx`) match products by tag. New categories/occasions (jul, födelsedag, etc.) are added here. Product icons for the category icon row live in `src/assets/ikon-*.png`.

**Other libs** — `src/lib/wishlist.ts` (localStorage wishlist, heart buttons on cards/product pages), `src/lib/productSpecs.ts` (type-level material/care copy keyed by product tag — honesty principle: no invented dimensions per product; exact measurements live in each product description), `src/lib/error-capture.ts` + `error-page.ts` (SSR error handling wired through `src/server.ts`), `src/lib/galleryManifest.json` (customer gallery images).

## Conventions

- Prices are never hardcoded in copy (they change); product references are fine. Formatting goes through `formatPrice()` in `shopify.ts` (sv-SE, no decimals).
- Sales copy is first-person ("jag"), warm, sepia-toned — competitive-copy insights are documented in `.hermes/plans/saljgranskning-*.md`.
- SEO structures in place: JSON-LD (BreadcrumbList + CollectionPage) on category pages, sitemap, OG meta — keep them intact when editing routes.
- ESLint uses prettier (`eslint-plugin-prettier`); run `npm run format` before committing to avoid lint noise.
