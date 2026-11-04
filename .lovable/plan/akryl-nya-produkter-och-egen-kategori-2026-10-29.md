# Akryl: nya produkter och egen kategori

## Vad marknaden visar
- Laserskurna akrylprodukter säljs brett i Sverige: tårttoppers från ca 349 kr, bordsskyltar 199–549 kr och brickor/tags i 10-pack (Omni Design).
- Graverade akrylskyltar marknadsförs som tåliga mot sol, fukt och kyla, med valfri form. Används till dörrskyltar, brevlådor, plaketter och bagagetaggar (Dortex).
- Fotoprodukter med gravyr (t.ex. fotonyckelring 149 kr hos Amikado) är populära – passar din högupplösta fotogravyr.
- Glatt tårttopper med klistermärken kostar 59 kr (Temashop) – konkurrera med kvalitet och äkta utskuren text, inte pris.

## Förslag på nya akrylprodukter (8 st)
| Produkt | Tillfälle | Riktpris (förslag) |
|---|---|---|
| Tårttopper med namn/ålder (utskuren text) | Födelsedag, dop, bröllop, student | 249–349 kr |
| Bröllopsskylt / välkomstskylt | Bröllop | 599–899 kr |
| Bordsplaceringar med namn (10-pack) | Bröllop, fest, företag | 299 kr |
| Fotoblock/fotoplatta i akryl med fotogravyr + LED-fot | Mors/fars dag, jul, minne | 449–699 kr |
| Akrylnyckelring med foto eller namn | Alla | 129–159 kr |
| Julkulor/julhängen i akryl med namn | Jul | 99–149 kr/st |
| Dörr- eller brevlådeskylt i akryl (tål väder) | Nytt hem | 249–399 kr |
| Husdjurs-minnesskylt med fotogravyr | Minne, husdjur | 349–499 kr |

Priserna är förslag tills du har räknat material och tid.

## Vad som byggs
1. Ny materialkategori **Akryl** (sökbar på ”akryl”, ”plexiglas”, ”tårttopper”), med kort text om att jag skär och graverar akryl i egen verkstad.
2. De nya produkterna skapas i Shopify-sandlådan med taggen `akryl` plus tillfälle, svenska texter i jag-form, Shopify-varianter för storlek där det behövs.
3. Två AI-bilder per produkt, tydligt märkta som visualiseringar.
4. Akryl syns som val på nyckelringen (”Akryl med foto”) och kopplas till befintliga sidor för bröllop, jul, födelsedag och nytt hem.
5. Ingen claim eller provperiod startas.

## Behöver ditt OK
- Vilka av de 8 produkterna du vill börja med.
- Riktpriser, max storlek på din maskin och vilka akrylfärger/tjocklekar du har (t.ex. klar 3 mm, spegelguld).

## Tekniska detaljer
- `categories.ts`: ny produkttyp `akryl` (tag `akryl`, ikon med lucide-fallback).
- Shopify: `batch_create_products` med tags, varianter och bilder från `src/assets/akryl/`; nyckelringen får variant ”Akryl med foto”.
- Sökning fungerar redan via tagg och beskrivning genom `catalogSearch`; utöka testet med en akrylprodukt.
