# Fas 6 — Faktiska produktexempel till butikens verkstadsgalleri (2 sep)

**Kontext:** Bilderna i `public/images/products/` (92 st, 23 produkter × 4 miljöer) är AI-genererade och redan committade. Dessa fiktiva produkter matchar de kategorier som HAR bilder. Produkter utan bilder (bil, jul, skärbräda, glas) ligger i fiktiva-produkter-fas6.md för Shopify senare.

## MAPPERING: fiktiva produkter → befintliga bilder

| Fiktiv produkt | Bild (4 miljöer) | Taggar | Pris |
|---|---|---|---|
| Nyckelring i ek med eget namn | nyckelringar_H13eab | nyckelring, tra, fodelsedag, bastsaljare | 179 kr |
| Nyckelring "Farfar" | nyckelringar_H63402 | nyckelring, farsdag | 189 kr |
| Kors dop — silver | kors_H0586 | smycken, dop, bastsaljare | 449 kr |
| Kors dop — trä | kors_H187160 | smycken, dop | 399 kr |
| Minnesask dop | minnesaskar_H83f8f | smycken, dop, nyhet | 399 kr |
| Hjärtan — par | hjartan_H1e2e70 | smycken, brollop | 549 kr |
| Hjärtan — dop | hjartan_H23b20 | smycken, dop | 429 kr |
| Hjärtan — minne | hjartan_H7d33cf | smycken, fodelsedag | 429 kr |
| Halsband handgraverat | halshalsband_H18804 | smycken, fodelsedag, bastsaljare | 449 kr |
| Halsband med berlock | halshalsband_H740e5 | smycken, dop | 479 kr |
| Halsband —parsmycke | halshalsband_Hbc72de | smycken, brollop | 890 kr |
| Armband läder | armband_Heddb6 | smycken, farsdag | 399 kr |
| Barhalsband barn ×4 | barhalsband_H5b004/H78735/H90ec1/Hf1c25 | smycken, dop, barn | 349–479 kr |
| Charms ×3 | charms_H60ab2/H88c3a/Hd6a05 | smycken, fodelsedag | 249–329 kr |
| Kedjor ×2 | kedjor_Hb408a/Hfcea4 | smycken, brollop | 549–590 kr |
| Beslag | beslag_Ha7f65 | foretag, gravering | 89 kr |
| Korgar ×1 | korgar_H0a665 | foretag, gravering | 349 kr |

## Shopify-taggar att skapa (checklista)
- [ ] Produkttyper: nyckelring, glas, smycken, skarbrada, lader, kors (ny!), tra, 3d, foto, sticker, tumbler, mugg, keps, tshirt, hoodie
- [ ] Tillfällen: bastsaljare, nyhet, brollop, dop, foretag, farsdag, barn, fodelsedag, jul, student, bil, morsdag
- [ ] Material/tema: tra, lader, gravering

## Verifiering i butiken
Varje fiktiv produkt ska:
1. Synas i rätt kategori (/kategori/<slug>)
2. Ha produktkort med badge (bastsaljare/nyhet)
3. Öppna produktsida med LiquidLoader → Personalisera → korg
4. Ingå i relaterade produkter (samma tag)
5. Synas i sökning (SearchOverlay)