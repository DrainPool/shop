# Nyckelringar: färre produkter, välj material och motiv

## Problemet
Idag finns 8 nyckelringar i Shopify som i grunden är samma sak med olika gravyr: "eget namn", "reg.nummer", "Om jag tappar den…", "djurporträtt", plus hus, hjärta, koordinater och läder. Kunden ser samma produkt om och om igen.

## Lösningen: en nyckelring per form/material, motivet väljs på produktsidan
Motivet (namn, reg.nummer, koordinater, rolig text, djurporträtt) är bara vad som graveras – inte en egen produkt.

Nytt sortiment (4 produkter i stället för 8):

| Produkt | Val (Shopify-varianter) |
|---|---|
| Nyckelring med gravyr | Material: Ek / Rostfritt stål / Läder |
| Husformad nyckelring | Material: Ek |
| Hjärtformad nyckelring | Material: Ek |
| (ev.) Koordinatbricka slås ihop med stål-varianten ovan |

På produktsidan väljer kunden sedan **motiv**:
- Text (namn, datum, rolig text)
- Reg.nummer
- Koordinater
- Foto/djurporträtt (laddar upp bild, jag skickar skiss) – ger pristillägg

Exempelförslagen i textrullgardinen ("Om jag tappar den är den inte min", "ABC 123" osv.) visar kunden vad som går – utan egna produkter.

## Priser (behöver ditt OK)
- Pris sätts per material: t.ex. ek 179 kr, läder 219 kr, stål 259 kr, hus 159 kr, hjärta 219 kr (dagens priser).
- Foto/djurporträtt: +120 kr (motsvarar dagens 299 kr för ek).

## Vad som händer med de gamla
- De 4 "motivprodukterna" (eget namn, reg.nummer, rolig text, djurporträtt) arkiveras i Shopify-sandlådan – inte raderade, kan tas tillbaka.
- Deras bilder flyttas till den samlade produkten så galleriet visar bredden (reg.nr, husdjur, text).
- Gamla länkar skickas vidare till den nya produkten så SEO inte tappas.
- Kategorin "Nya nyckelringar" tas bort; allt ligger under "Nyckelringar".

## Tekniska detaljer
- Shopify: uppdatera "Nyckelring i ek med eget namn" till "Nyckelring med gravyr" med option Material (3 varianter, SKU per material) och variant-option Motiv för fotopristillägget (Text / Foto) så priset blir rätt i kassan.
- Arkivera övriga motivprodukter via update (status), behåll handles för redirect-mappning i koden.
- `ProductCustomizer`: motivval styr fältet (textfält, reg.nr-fält med versaler, koordinatfält, bilduppladdning), validerat med befintliga Zod-scheman; skickas som radattribut.
- `categories.ts`: ta bort `nya-nyckelringar`, uppdatera sökfilter-test.
- Ingen claim / provperiod startas.
