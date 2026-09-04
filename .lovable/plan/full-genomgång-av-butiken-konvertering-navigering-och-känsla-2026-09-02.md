# Full genomgång av butiken: konvertering, navigering och känsla

Sida för sida, med fokus på att fler besökare hittar rätt produkt och slutför köpet – utan att tappa den personliga tonen.

## 1. Navigering och produktupptäckt

- **Topmenyn görs sortimentsdriven.** Idag pekar flera länkar på ankare på startsidan ("Alla produkter", "Så funkar det"). Menyn byggs om till: Sortiment, Tillfällen, Fotografering (extern), Så funkar det, Om mig – med megameny under Sortiment och Tillfällen.
- **Sök blir synlig.** Sökknappen får tydlig ikon + "Sök" i desktop-headern, senaste sökningar och populära förslag när fältet är tomt.
- **Kategorirad på fler ställen.** Ikonraden visas även på startsidan och sortimentssidan, inte bara på kategorisidor.
- **Brödsmulor** på produkt- och kategorisidor, med korrekt kategori för produkten.
- **Relaterat + "Nyligen visade"** på produktsidan, så besökaren fortsätter bläddra i stället för att lämna.

## 2. Kategorisidor

- Toppsektion med bild/kicker och kortare säljande ingress; den långa punktlistan flyttas ner så produkterna syns direkt.
- Filter kompletteras med prisspann och tillfälle, plus aktiva filter-chips som går att ta bort ett i taget.
- Paginering/"Visa fler" i stället för att alltid ladda 50 produkter.
- Tomt läge får förslag på närliggande kategorier i stället för bara text.

## 3. Produktsida och konvertering

- Tydligare köpblock: pris, ev. jämförelsepris, lagerstatus, leveransbesked ("beställ idag – klar vecka X") samlat direkt under rubriken.
- Personaliseringsformuläret får stegkänsla med tydlig sammanfattning och validering innan "Lägg i varukorgen" aktiveras.
- Sticky köpfält på mobil.
- Bildgalleri med miniatyrer och zoom.
- Hopfällbara sektioner: Material & mått, Så graveras det, Frakt & retur.

## 4. Varukorg och kassa

- Fri frakt-mätare ("Handla för X kr till så bjuder jag på frakten", gräns 800 kr).
- Tom varukorg visar bästsäljare i stället för tom yta.
- Radera/ändra antal med tydligare knappar och ångra-toast.
- Betalningslogotyper och trygghetsrad i varukorgen och footern.
- Checkout förblir Shopify-hostad.

## 5. Startsidan

- Stramare flöde: hero → kategorirad → utvalda produkter → tillfällen → foto/om mig → nyhetsbrev → förtroende.
- Hero får en tydlig primär knapp ("Se sortimentet") och en sekundär ("Beställ något helt eget").
- Sektionerna får jämnare rytm i luft, rubrikstorlek och kortdesign.

## 6. Design och känsla

- Genomgång av designtokens i `src/styles.css`: spacing-skala, rubrikstorlekar, kortradier och skuggor blir konsekventa.
- Enhetliga knapp- och badge-varianter i stället för lokala klasser.
- Mjuka in-/hover-animationer med Framer Motion på kort och sektioner (diskret, inte lekfullt).
- Mobilgenomgång: touchytor, radavstånd, headerhöjd.

## 7. SEO och prestanda (följer med på köpet)

- Unik `head()` med titel, beskrivning och og-taggar per sida; produkt-JSON-LD kontrolleras.
- Bilder får rätt storlek, `loading="lazy"` och beskrivande alt-texter på svenska.

## Teknisk sammanfattning

- Uppdateras: `SiteHeader`, `MegaMenu`, `SearchOverlay`, `ProductCard`, `ProductFilters`, `QuickView`, `CartDrawer`, `ProductCustomizer`, `SiteFooter`, `routes/index.tsx`, `routes/sortiment.tsx`, `routes/kategori.$slug.tsx`, `routes/produkt.$handle.tsx`, `src/lib/categories.ts`, `src/styles.css`.
- Nya: `Breadcrumbs.tsx`, `FreeShippingMeter.tsx`, `RecentlyViewed.tsx`, `ProductGallery.tsx`, `StickyBuyBar.tsx`.
- Inga ändringar i kassaflödet eller Shopify-datamodellen; allt bygger på befintliga Storefront-fält.
- Inga påhittade omdömen – omdömesytor lämnas tomma tills riktiga omdömen finns.

## Att notera

Kampanjpriser kräver att du sätter jämförelsepris i Shopify-admin. Lagerstatus och leveransbesked bygger på `availableForSale` från Shopify.
