# Förenkla vägen från kategori till köp

## Resultat

- Ett val som Golf, Smycken eller annan produktkategori öppnar kategorin direkt vid produktutbudet, inte högst upp på sidan.
- Produktsidan får en minimal rad utan logga: endast tillbaka och varukorg.
- Alla vanliga toppfält, huvudmenyn, kategorimenyn och löftesraden döljs på produktsidor.
- Produktens viktigaste köpflöde blir det första kunden möter: bild, namn, pris, ett kort trygghetslöfte, val/personalisering och köpknapp.
- Övrig information samlas i tydliga, stängda avsnitt under köpet så sidan känns lugnare.

## Genomförande

1. **Kategorival landar vid produkterna**
   - Ge produktutbudet en tydlig landningspunkt med rätt luft ovanför.
   - Uppdatera kategoriikoner och övriga relevanta kategorival så de går direkt dit.
   - Behåll kategorins namn och sammanhang tillgängligt utan att kunden först måste skrolla förbi den stora toppen.

2. **Minimal produktrad**
   - Visa en smal rad med tillbaka-knapp till föregående vy och varukorg.
   - Ingen logga, sök, önskelista, huvudmeny, megameny, nedräkning eller löftesrad ovanför produkten.
   - Behåll full navigation på butikens övriga sidor.

3. **Köp först på produktsidan**
   - Prioritera produktgalleri, namn, pris, lager/tillverkning och personalisering.
   - Korta trygghetsbudskapet till en enda sammanhållen rad nära priset eller köpvalen.
   - Behåll skissgodkännande och villkoret för personliga produkter nära köpknappen, eftersom de påverkar köpbeslutet.

4. **Samla sekundär information**
   - Flytta beskrivning, material/skötsel, leverans, retur/garanti och tillverkningssätt till kompakta dragspel efter köpsektionen.
   - Ta bort upprepade löften och separata informationsrutor som säger samma sak.
   - Låt relaterade produkter och nyligen visade ligga kvar längre ned som fortsatt shopping, utan att störa köpet.

5. **Stabil och testad kategorisida**
   - Rätta den bekräftade visningskonflikten där servern visar tomt läge men webbläsaren först visar laddningskort.
   - Säkerställ att samma första innehåll visas före och efter sidladdning.
   - Kontrollera kategori- och produktsidor på mobil och dator, inklusive tillbaka-knapp, varukorg, direktlandning och köpflöde.

## Tekniska detaljer

- Den globala sidramen växlar till en särskild minimal produktrad endast på `/produkt/...`.
- Kategorilänkar använder produktsektionens ankare och sektionen får skrollmarginal för den kvarvarande menyn.
- Kategorins produktdata får ett deterministiskt första renderingsläge för att undvika den observerade hydratiseringsskillnaden.
- Befintlig svenska, jag-form, SEO-data, produktdata, priser och kassafunktion påverkas inte.
