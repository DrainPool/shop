# Dogfood-QA-rapport — Lins & Lager (2 sep 2026)

## Executive summary

- **48 sidtester** (24 rutter × desktop 1440×900 + mobil 390×844): **0 FAIL**
- **9 console-404:or** — samtliga harmlösa (demo-läget saknar produkter för vissa taggar; förväntat)
- **6 flödestest:** sök, önskelista, korg-tillägg, kvantitet, borttag, tom-läge — **alla godkända**
- **H1-granskning:** 23/24 unika, korrekta; 1 timing-kosmetika
- **Bugg fixad under QA:** syncCart 401 i demo (c9bc083)

## Testade rutter (alla ok, unika H1:or)

/ (Ge bort en present...) · /sortiment (Allt jag gör) · /kategori/{nyckelringar,glas,smycken,jul,fodelsedag,bil,brollop,dop,foretag} · /produkt/{nyckelring-i-ek,olglas} · /foretag · /vanliga-fragor · /frakt-leverans · /retur · /garanti · /villkor · /integritetspolicy · /om-mig · /kontakt · /tillverkningsprocessen · 404

## Flöden (skärmdumpar: qa-sok.png, qa-korg.png, qa-drawer-tom.png)

1. Sök-overlay: 30 träffar på "nyckelring" ✓
2. Önskelista: spara → toast "Sparad i din lista" ✓
3. Korg: tillägg med personalisering + bekräftelse-kryssbox ✓
4. Kvantitet +/− ✓
5. Ta bort → tomt läge med kategorilänkar + WishlistStrip ✓
6. PaymentLogos (Klarna/Swish/Visa/Mastercard/Apple Pay) ✓

## Findings (inga kritiska)

1. [Low/Visual] Tom H1 vid query-timing på /kategori/smycken (desktop) + /kategori/glas (mobil) — renderar korrekt efter load; kosmetiskt
2. [Low/Console] 404-resource på taggar utan demo-produkter (fodelsedag, brollop, dop) — försvinner med riktiga produkter
3. [Fixed] syncCart 401 i demo-läge — fixat c9bc083

## Ej testat (kräver riktiga Shopify-produkter)

- Shopify-checkout (betalflödet — ägs av Shopify)
- Rabattkoder i kassan
- Recensionsvisning (ReviewSection läser product_reviews — finns ej för demo-produkter)

## Verktyg

Playwright headless + vision_analyze (spetsade frågor per skärmdump), console-error-lyssnare per sida. Testdata: demoläge (97ddf2c) med 12 fiktiva produkter.
