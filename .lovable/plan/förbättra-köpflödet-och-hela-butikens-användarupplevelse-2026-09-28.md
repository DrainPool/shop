# Förbättra köpflödet och hela butikens användarupplevelse

## Mål

Göra vägen från produkt till betalning kortare och tryggare, särskilt på mobil. Kunden ska förstå vad som krävs, kunna kontrollera sin gravyr och nå Shopify-kassan utan att distraheras av upprepade budskap. Befintliga produkter, priser, kategorier, svenska texter och SEO-struktur behålls.

## 1. Förenkla produktens anpassning

- Dela upp valen visuellt i tre tydliga delar: **Din text**, **Välj stil** och **Extra önskemål**.
- Behåll alla tolv gravyrstilar och textförslagen, men gör stilvalet kompaktare och lättare att överblicka på mobil.
- Visa material och motiv där de påverkar själva beställningen; göm bara verkligt frivilliga val under ”Fler val”.
- Gör det omöjligt att råka beställa en personlig produkt med tom gravyr. Kunden får antingen skriva text eller aktivt välja att produkten ska vara utan gravyr.
- Visa en kort sammanfattning med vald text, stil, material/motiv och pris precis ovanför köpknappen.
- Behåll skisslöftet och returvillkoret vid köpbeslutet, men ta bort upprepningar runt omkring.

## 2. Gör varukorgen till en tydlig sista kontroll

- Visa den valda varan först, med gravyrtext och övriga val tydligare än i dag.
- Lägg en kompakt kontrollrad ovanför kassaknappen: kunden ser direkt om varje vara har text, stil och eventuell presenthälsning.
- Behåll fri-frakt-mätaren, men visa högst **ett** relevant tilläggsförslag. De två nuvarande merförsäljningsblocken ska inte konkurrera med varan eller kassaknappen.
- Håll totalsumma och kassaknapp fast och fullt synliga på små skärmar, utan att innehåll kapas bakom dem.
- Flytta bort överflödig förklaring från kassaytan; där ska bara totalsumma, leveranslänk, kassaknapp och ett kort skisslöfte finnas.
- Placera alla meddelanden på samma lugna plats och aldrig nere i högra hörnet.

## 3. Säkra övergången till Shopify-kassan

- Behåll det riktiga Shopify-flödet: varukorgen skapas och uppdateras via Storefront API och checkout-URL hämtas därifrån.
- Öppna alltid den riktiga checkout-URL:en i en ny flik med `channel=online_store`; inga manuella produkt-, cart- eller checkout-länkar.
- Stäng varukorgen efter lyckad öppning och synka när kunden återvänder, så genomförda köp inte ligger kvar lokalt.
- Stoppa övergången om någon rad saknar bekräftat Shopify-rad-ID eller giltig checkout-URL. Visa då ett tydligt ”Försök igen” i stället för att låta en lokal vara saknas i kassan.
- Gör återhämtningen efter en utgången Shopify-varukorg begriplig och konsekvent; varukorgen får inte tömmas tyst.
- Validera och längdbegränsa gravyr, önskemål och presenthälsning innan uppgifterna skickas vidare.

## 4. Förbättra butikens övriga väg till köp

- Ge produktkort två stabila titelrader så pris och länk ligger jämnt även med långa produktnamn.
- Anpassa filterytan: kompakt och stängd på mobil, direkt överblickbar på större skärmar.
- Gör ”Se hela sortimentet” tydligare i sortimentsmenyn utan att lägga tillbaka en stor eller texttung meny.
- Dela sidfotens länkar i korrekta grupper: **Köpvillkor** och **Om butiken**, med samma länkar kvar för SEO.
- Behåll produkt- och kategoritexterna längre ned på sidorna. Ingen viktig söktext, internlänk, metadata eller strukturerad data tas bort.

## 5. Kontroll och kvalitet

- Kontrollera hela flödet: startsida → kategori/sortiment → produkt → anpassning → varukorg → Shopify-kassa.
- Testa tom text, utan gravyr, variantbyte, slutsåld produkt, flera varor, antal, borttagning/ångra och utgången varukorg.
- Verifiera på 375 px mobilbredd och stor datorvy att inget överlappar eller kapas och att kassaknappen alltid går att nå.
- Tabba genom val, varukorg och dialoger; kontrollera synlig fokusmarkering och skärmläsarmeddelanden.
- Kontrollera att alla innehållssidor behåller unik titel, beskrivning, Open Graph, rubrikhierarki och befintlig JSON-LD.
- Kör typkontroll, formatering, relevanta kontroller och slutlig visuell genomgång.

## Tekniska detaljer

- Huvudfiler: `ProductCustomizer`, `CartDrawer`, `cartStore`, `useCartSync`, `ProductCard`, `ProductFilters`, `MegaMenu` och `SiteFooter`.
- Delad Zod-validering används för kundens fria texter och samma regler tillämpas före varje Shopify-mutation.
- Befintliga semantiska färger, knappar, 44 px tryckytor, rörelsereducering och svenska jag-ton följs.
- Shopify-produkter, variant-ID:n och checkout-URL:er förblir verkliga; inga demoprodukter eller falska kassaflöden införs.
