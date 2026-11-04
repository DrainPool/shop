# Nya produkter: dop-tavla, golfmotiv och mikrofiberdukar

Skärmbilderna används bara som inspiration. Jag tar fram egna motiv och egna bilder, och inget kopieras.

## 1. Födelsetavla / doptavla (Shopify-produkt)

- Bebisens siluett i ljust trä på en mörkbetsad träskiva, med en skylt där namn, datum, klockslag, längd och vikt graveras.
- Kunden skriver in uppgifterna i formuläret för text på produktsidan. Valfritt: ladda upp ett foto som underlag för bebisens profil.
- Två storlekar som varianter (t.ex. 30×40 och 40×50 cm). Priserna är preliminära tills du bekräftar dem.
- Taggar: dop, födelse, barn, väggkonst. Visas under Dop och i presenttips för dop.
- 4 AI-bilder: framsida på vägg, närbild på skylten, barnrum och vinklad detalj. Alla märks som AI-visualisering.

Ta fram likande concept I samma anda/changer. Kanske finns andra produkter jag inte tänkt på. 

&nbsp;

## 2. Golfare i golfboll (Shopify-produkt)

- En golfare mitt i svingen, utskuren i trä framför en golfboll med gropmönster.
- Varianter: Väggkonst (stor) och Pokal på fot (mindre, med graverad skylt för namn, tävling och år).
- Taggar: golf, golfklubbor-relaterat, fars dag, företag/pris. Visas under golf, Fars dag och företag.
- 4 AI-bilder: vägg, hylla, pokal på fot och närbild på skylten.

## 3. Ny kategori: Mikrofiberdukar (material)

- Ny kategori "Mikrofiberdukar med logga": logga eller motiv bränns in i duken. Den passar barberare, bilvård, frisörer, optiker, gym och företag.
- Kategorisidan får kort text, ett avsnitt om vem duken passar och en egen kategoribild. Den finns i sök och filter.
- En startprodukt i Shopify: "Mikrofiberduk med egen logga", med färgval och antal (t.ex. 1, 10 och 25 st) som varianter. Logga laddas upp via fotouppladdningen. Priserna är preliminära.
- 4 AI-bilder: barberarstation, bilvård, stapel i olika färger och närbild på den inbrända loggan (fiktiv logga, inget varumärke).

## Övrigt

- Kategoribilder genereras där de saknas, alltså för mikrofiber och golf-tavlan om det behövs.
- Ingen claim av Shopify och ingen provperiod startas.
- Jag lägger till sökningstester för de nya taggarna och kategorin.

## Öppet för dig

- Riktiga priser och storlekar för alla tre. Jag sätter preliminära priser tills du bekräftar.

## Tekniskt

- Produkterna skapas i Shopify-sandlådan med varianter, taggar och AI-märkt alt-text.
- Kategorin läggs i `src/lib/categories.ts` och sökningstester i `src/lib/catalogSearch.test.js`.
- Bilderna genereras och laddas upp till Shopify enligt projektets regel om AI-alt-text.