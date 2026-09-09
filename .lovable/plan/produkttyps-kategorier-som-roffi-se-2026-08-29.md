# Produkttyps-kategorier som roffi.se

Du har rätt: dagens kategorier är tillfällen (bröllop, dop, farsdag) – inte produkttyper. Referensbilden visar en rad med runda ikoner: Nyckelring, Glas, Keps, T-shirt, Hoodie, Muggar, Tumbler. Den tidigare crawl-datan finns inte kvar i sandboxen, så jag crawlar om roffi.se innan jag bygger.

## Steg 1 – Crawla om roffi.se (Firecrawl)
Kör den befintliga crawl-endpointen mot www.roffi.se och plocka ut:
- exakt kategorilista (produkttyper) och deras namn
- produkttyper per kategori, prisnivåer och hur produktsidorna är uppbyggda
- filter- och varianttermer (färg, storlek, material)

Resultatet styr taxonomin nedan – listan justeras efter vad crawlen faktiskt visar.

## Steg 2 – Ny kategoristruktur: produkttyp
Två nivåer istället för en:
- **Produkttyp** (ny, primär): Nyckelring, Glas, Keps, T-shirt, Hoodie, Mugg, Tumbler, Läder, Skärbräda, Smycke, Sticker, Foto/Tavla, 3D-utskrift
- **Tillfälle** (behålls, sekundär): Bröllop, Dop, Företag, Farsdag & jakt, Barn

`src/lib/categories.ts` byggs om till två listor (`productTypes`, `occasions`) med slug, Shopify-tagg, titel och text.

## Steg 3 – Ikonrad överst på startsidan
En horisontell rad med runda beige cirklar och tunna linjeikoner (som i din bild), placerad direkt under hero. Scrollbar på mobil, understruken text på hover/aktiv. Varje ikon länkar till `/kategori/<slug>`. Ikonerna genereras som transparenta line-art-PNG:er i samma varma stil som resten av sajten.

Samma ikonrad återanvänds överst på kategorisidorna så man kan hoppa mellan produkttyper.

## Steg 4 – Produkter i Shopify
De 12 nuvarande produkterna får produkttyp-taggar. Nya produkter skapas för de typer som saknas (nyckelring, glas, keps, t-shirt, hoodie, mugg, tumbler) med svensk titel, beskrivning, pris, SKU, bild och taggar – så att ingen kategori står tom.

## Steg 5 – Filter & produktsida
- Filtret får en egen grupp "Produkttyp" utöver material/tillfälle/pris
- Kategorisidan visar rubrik, kort text, ikonrad, filter och grid
- Produktsidan får "Liknande i samma kategori" längst ner

## Tekniskt
- `src/lib/categories.ts`: delas i `productTypes` + `occasions`, gemensam `getCategory(slug)` slår mot båda
- Ny komponent `src/components/CategoryIconRow.tsx`
- `src/routes/index.tsx` och `src/routes/kategori.$slug.tsx` renderar ikonraden
- `src/components/ProductFilters.tsx`: nya `TAG_LABELS` + grupperade facetter
- Shopify-produkter uppdateras/skapas via batch-verktygen; befintliga taggar bevaras

## Att notera
Roffi säljer kläder och dryckesglas (t-shirt, hoodie, keps, tumbler). Jag lägger in dem som kategorier enligt din referens – säg till om någon typ inte ska säljas, så plockar jag bort den.
