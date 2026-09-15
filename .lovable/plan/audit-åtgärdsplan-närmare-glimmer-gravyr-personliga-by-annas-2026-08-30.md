# Audit + åtgärdsplan: närmare Glimmer Gravyr, Personliga, By Annas och Roffi

Jag har crawlat de fyra referenssidorna med Firecrawl och gått igenom din butik (startsida, kategorisida, produktsida, header, footer, filter, kundvagn).

## Ärlig bedömning – vad som redan är starkt

- Varm, egen visuell identitet (serif, handskrift, vinrött/guld) – snyggare och mer personlig än Personliga och By Annas.
- Personaliseringsformulär med sammanfattning innan köp är bättre byggt än hos flera av konkurrenterna.
- Policysidor, tillverkningsprocess och Om mig finns redan – bra förtroendegrund.

## Ärlig bedömning – vad som saknas jämfört med referenserna

1. **Ingen sökfunktion.** Alla fyra referenssidorna har sök i headern. Det är den enskilt största konverteringsmissen i en butik med 19 produkter och växande sortiment.
2. **Ingen megameny.** Personliga och Glimmer har grupperad dropdown (Hem & Inredning / Dryckestillbehör / Accessoarer …). Din topmeny leder mest till ankarlänkar på startsidan – besökaren förstår inte sortimentets bredd.
3. **Svag prissignalering.** By Annas visar överstruket ordinarie pris, "I lager", "NYHET"-flagga och kampanj i hela butiken. Du har badges men inga kampanj-/ordinariepriser och ingen lagerstatus.
4. **Ingen social proof i siffror.** Personliga kör "★★★★★ 163 000+ nöjda kunder sedan 2016" överallt. Du har 4,9/5 en gång på hero – inga faktiska omdömen per produkt.
5. **Ingen betalningslogotyprad.** Klarna/Swish/Visa/Mastercard-logotyper syns hos alla fyra. Du nämner det bara i text.
6. **Ingen FAQ-sida.** Glimmer har egen gravyr-FAQ – stark både för konvertering och Google.
7. **Fotografering är osynlig som tjänst.** Du fotograferar (Lins och Lager) men butiken säljer bara fysiska produkter. Där finns en unik vinkel ingen av konkurrenterna har: foto + graverad produkt i samma paket.
8. **Kategorisidan saknar SEO-text och toppbild.** Konkurrenternas kollektionssidor har rubriktext + beskrivning som rankar.
9. **Ingen mail-/rabattinsamling.** Alla fyra fångar e-post.
10. **Ingen prisspann-/materialfiltrering per kategori och ingen "snabbtitt"** – Roffi och Glimmer har rikare kategoriupplevelse.

## Vad jag bygger

### 1. Sök och megameny

- Sökknapp i headern som öppnar overlay, live-sökning mot Shopify (titel + tagg), resultat med bild och pris.
- Desktop-megameny grupperad i **Smycken & Accessoarer**, **Gravyr i trä & läder**, **Dryck & Prylar**, **Foto & 3D**, **Tillfällen** – byggd på befintliga `productTypes` och `occasions` i `src/lib/categories.ts`.

### 2. Fototjänsten in i butiken

- Ny sida `/fotografering`: porträtt, bröllop, dop, produktfoto för företag – med paketpriser och förfrågningsformulär.
- Ny sektion på startsidan: "Fota minnet – gravera det sedan", som kopplar foto → fototavla/smycke.
- Presentpaket-block: fotografering + graverad present som kombination (unik jämfört med alla fyra referenserna).

### 3. Produktsida (PDP) mot Glimmer-/Roffi-nivå

- Omdömesrad med stjärnor och antal, plus 3–4 kundcitat per produkttyp.
- Lagerstatus ("I lager – tillverkas denna vecka") och ordinarie/kampanjpris när Shopify har compareAtPrice.
- Hopfällbara sektioner: Material & mått, Så graveras det, Frakt & leverans, Vanliga frågor.
- Sticky köp-fält på mobil med pris + "Lägg i varukorgen".
- JSON-LD för produkt (pris, tillgänglighet, betyg) – ingen av småkonkurrenterna gör detta bra.

### 4. Kategorisidor

- Toppsektion med rubrik, SEO-text och bild per kategori.
- Filter kompletteras med prisspann-slider och materialval; sortering behålls.
- Snabbtitt-knapp på produktkort som öppnar dialog med bild, pris och "Lägg i varukorgen".

### 5. Förtroende och konvertering

- Betalningslogotyper (Klarna, Swish, Visa, Mastercard) i footer och i kundvagnen.
- Ny `/vanliga-fragor` med gravyr-, material-, leverans- och personaliseringsfrågor + FAQ-schema.
- E-postfångst i footern: "Få 10 % på din första personliga present".
- Kundvagn: fri frakt-mätare ("Handla för X kr till så bjuder jag på frakten") och tom-vagn-läge med presenttips, som Personliga.
- Omdömessektion på startsidan med riktiga citat och namn.

### 6. Copy och ton

- Genomgång av all text mot "trygg & professionell" med personlig värme, samma röst som Lins och Lager.
- Tydligare löften: skiss innan gravyr, svar inom 24 h, tillverkning 3–7 arbetsdagar.

## Teknisk sammanfattning

- Nya filer: `src/components/SearchOverlay.tsx`, `src/components/MegaMenu.tsx`, `src/components/QuickView.tsx`, `src/components/ReviewStars.tsx`, `src/components/PaymentLogos.tsx`, `src/components/NewsletterSignup.tsx`, `src/routes/fotografering.tsx`, `src/routes/vanliga-fragor.tsx`.
- Uppdateras: `SiteHeader`, `SiteFooter`, `CartDrawer`, `ProductCard`, `ProductFilters`, `routes/index.tsx`, `routes/kategori.$slug.tsx`, `routes/produkt.$handle.tsx`, `src/lib/categories.ts`, `src/lib/shopify.ts` (sökquery, `compareAtPrice`, `availableForSale`).
- Alla sidor får egen `head()` med titel, beskrivning och og-taggar; produkt- och FAQ-sidor får JSON-LD.
- Inga ändringar i kassaflödet – Shopify-hostad checkout behålls.
- Omdömen läggs som kurerad data i koden tills ett riktigt omdömesverktyg kopplas på (Shopify-appar syns inte via Storefront API).

## Att notera

Kampanjpriser kräver att du sätter "jämförelsepris" i Shopify-admin per produkt – annars visas bara ordinarie pris. Jag bygger stödet, du fyller i värdena.
