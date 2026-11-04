# Djupporträtt — koncept v0.1 (påverkad av pawblo.co, på TaggaDet-sätt)

**Status:** mockup för godkännande — ej implementerad i shop/ ännu.
**Mockup:** `djupportratt-koncept.html` (samma katalog). Alla porträtt i mockupen
är ritade SVG-platshållare, inga hämtade bilder.

## Pawblos system → TaggaDet-översättning

- **Ett mobilfoto in → kollektion "alter egos"** (personlighetsstilar: Dreggel,
  Bolltjuven, Granskaren, Misstänksam, Sötnosen, På modet, Mogen, Dagsluren,
  Stjärnan, Snällisen) — Pawblo gör bara hundar, vi gör alla djur.
- **Pawblos svaga punkter = våra skillnader:** Pawblo är digitalt-endast,
  hund-endast, och app skild från butik. TaggaDet: kollektionen blir
  **riktiga produkter** (nyckelring i ek, skylt i björk, hänge i silver) med
  lasergravyr i verkstaden, plus digitala filer som standard.
- **Skiss-godkännande:** kunden godkänner skissen innan lasern startar (per
  MASTER.md anti-pattern "Designa-själv med bilduppladdning" — vi gör inte
  designa-själv, vi gör skiss-flöde). AI-generering kan aldrig producera
  ombudsgenererade siffror; priser sätts i Shopify/demoProducts, aldrig i copy.

## Nästa steg (efter godkännande)

1. Route `/djupportratt` + kategori i `src/lib/categories.ts` + demoprodukter.
2. Uppladdningsflöde: foto in → AI-porträtt → skiss-godkännande → tillverkning.
3. Genereringsmotor: lokal SwarmUI (RTX 3060, SDXL) eller moln-API — beslutas
   av frallan.
