# Vad vi kan ta från Gravyrbutiken.se

Gravyrbutiken har funnits sedan 2006 och är stora på glas, skyltar och företag. Vi kopierar inte deras texter, bilder eller omdömen. Vi tar bara idéerna som passar Taggat.

## Värt att ta efter

1. **"Exempelgravyr" som bild 2 på varje produktkort**
   De visar miljöbild först och en närbild på gravyren när man håller musen över kortet. Vi har redan flera bilder per produkt i Shopify. Kortet visar bild 2 vid hover, och på mobil går det att svepa.

2. **Kortare produktnamn med storlek/material efter ett streck**
   Till exempel "Whiskyglas Centra | 33 cl". Det gör korten lättare att jämföra. Vi ändrar titlarna i Shopify, inte i koden.

3. **Prisintervall på korten när en produkt har varianter**
   "229 kr – 269 kr" i stället för bara lägsta pris. Läses från Shopify-varianterna.

4. **Underkategorier för glas**
   Vinglas, whisky, öl, snaps och champagne som filter i glaskategorin. Det styrs av taggar i Shopify, och ger fler sidor som Google kan hitta.

5. **Presenttips per tillfälle som egna sidor**
   De har sidor för dop, student och bröllop. Vi har tre presenttipssidor i dag. Vi lägger till **dop**, **student** och **bröllop**, med länkar till riktiga kategorier.

6. **SEO-text längst ner på startsidan**
   En kort och ärlig text om vad Taggat graverar, med länkar till kategorierna. Den hamnar under allt annat så att sidan inte känns rörig.

7. **Plats för kundomdömen (förbereds, men visas inte än)**
   De visar citat med namn och produkt. Vi har inga riktiga omdömen, så sektionen visas först när det finns äkta omdömen. Inga påhittade.

## Det vi inte tar
- Deras breda sortiment av företagsskyltar och taktila skyltar (passar inte hantverkskänslan just nu).
- Stjärnbetyg utan riktiga recensioner.
- "Sedan 2006", eller att prata om sig själv som "vi". Taggat skriver i jag-form.

## Tekniskt
- Produktkort: visa media[1] vid hover/fokus och använd scroll-snap på mobil. Respektera reduced motion.
- Prisintervall: använd priceRange min/max via formatPrice().
- Glasets underkategorier läggs som subcategories i categories.ts och styrs av befintliga Shopify-taggar. Taggar som saknas läggs till i Shopify-sandlådan, utan claim.
- Tre nya presenttipsidor följer befintligt mönster med head(), JSON-LD och sitemap.
- SEO-blocket blir en statisk komponent på startsidan.
- Omdömessektionen visas bara om det finns data. Den är dold i dag.
