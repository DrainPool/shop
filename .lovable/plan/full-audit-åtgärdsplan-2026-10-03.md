# Full audit – åtgärdsplan

Granskningen visar att butiken är i gott skick: alla sidor har metadata och JSON-LD, bilder har alt-texter, varukorgen hanterar fel defensivt och SEO-grunderna (robots, sitemap, favicon) passerar skanningen. Fyra konkreta fynd återstår.

## 1. Stavfel i kundcopy (synligt på startsidan)

- `src/components/GiftBundles.tsx` rad 44: "Graverade tostglas" → "Graverade toastglas" i Bröllopspaketet.

## 2. Prestanda: Google Fonts blockerar varje sidladdning

- Tolv gravyrtypsnitt laddas synkront i `src/routes/__root.tsx` (head-länk) på varje sida, trots att de bara används i gravyrformuläret.
- Flytta laddningen till `ProductCustomizer.tsx` (injicera stylesheet-länken när formuläret monteras). Startsida, kategorier och FAQ slipper då en render-blockerande extern länk – mätbar LCP-vinst.
- Verifiera att förhandsvisningen av typsnitten fortfarande fungerar efter flytten.

## 3. SEO: utred överlappet /foretag vs /kategori/foretag

- Två sidor om samma målgrupp konkurrerar om samma sökord utan canonical mellan dem.
- Åtgärd: behåll `/foretag` som den riktade landningssidan och låt `/kategori/foretag` fokusera på produkturvalet, med tydlig internlänk mellan dem – eller slå ihop om innehållet visar sig vara för likt. Beslut fattas efter läsning av båda sidornas texter.

## 4. Städning och småförbättringar

- Verifiera om `getUnsplashImage` i `src/lib/unsplash.functions.ts` används (grep över hela repot); ta bort om död kod.
- `MegaMenu.tsx`: komplettera med `aria-haspopup`/`aria-controls` för korrekt ARIA-meny.

## Teknisk sammanfattning

- Filer: `GiftBundles.tsx`, `__root.tsx`, `ProductCustomizer.tsx`, `MegaMenu.tsx`, ev. `unsplash.functions.ts`, ev. `foretag.tsx`/`categories.ts`.
- Kontroller efteråt: `npx tsc --noEmit`, `npm run format`, Playwright-verifiering av startsida + produktsida (typsnittsförhandsvisningen).
- Ingen ändring rör kassaflödet, Shopify-datamodellen eller befintlig SEO-metadata.
