# Presentguide, säsong och skarp drift

## 1. Lyft presentguiden
- Startsidan: en lugn puff "Osäker på vad du ska ge?" direkt efter tillfällesrutnätet, med knapp till presentguiden.
- Headern: länk "Presentguide" i menyn (dator) och mobilmenyn.
- Kategorisidor: liten textlänk under produkterna ("Hitta rätt med presentguiden").

## 2. Säsong: Fars dag och jul
- Presentguiden får snabbval (knappar) för Fars dag, Jul, Bröllop och Dop som fyller i tillfälle.
- Startsidans säsongskort: november visar jul i stället för Fars dag efter 2:a söndagen i november (Fars dag i Sverige), oktober–början av november visar Fars dag.
- Kort säsongsrad i puffen ("Beställ julklappar i god tid – skiss inom 48 timmar") som läser leveranslöftet från samma källa som resten av butiken.

## 3. Förbered skarp Shopify-drift
- Ny checklista i projektet (TESTGUIDE-avsnitt) för att gå från demoläge till egna produkter: taggar för kategorier, mottagare och presentpaket, bilder, priser, demoläget av.
- Kontroll i koden att alla vägar som rör Shopify har demoläge och tydliga felmeddelanden.

## 4. Övrigt jag rättar om jag hittar det
- Saknade alt-texter, trasiga länkar, stavfel och sidor utan unik titel/beskrivning.

## Teknisk sammanfattning
- Ny komponent `home/GuideTeaser.tsx`, inkopplad i `routes/index.tsx`; länkar i `SiteHeader.tsx`/mobilmeny.
- `SEASON_BY_MONTH` i `CategoryBento.tsx` ersätts med datumfunktion (beräknar andra söndagen i november).
- Snabbvalschips i `routes/presentguide.tsx` som sätter tillfällesfältet.
- Följer `design-system/taggadet/MASTER.md`; verifiering med typkontroll, bygge och Playwright på dator och mobil.
- Uppdatera `roadmap.md`.
