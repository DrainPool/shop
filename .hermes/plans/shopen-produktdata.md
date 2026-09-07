# Produktdata — Lins & Lager (utkast, frallan granskar)

**Källa:** 2025.07 Catalog Mingou/Norpie (129 sidor, Guangzhou — nyckelringar/sublimering).
**Princip: INGA priser från katalogen (föränderliga) — endast referenser + beskrivning.**
**Matcher frallans bilder i `genererade/`:** kategorinamnen där = svenska butiksnamn.

## Mapping: frallans kategorier → katalogavsnitt

| Frallans kategori | Katalog-sektion                                                 | Sidor                                                   | Referens-exempel |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------- | ---------------- |
| nyckelringar      | Keychain (+ Ring)                                               | 3–21, 2, 5, 28, 43, 44, 62                              | ~600+ ref        |
| kedjor            | Keychain (kedjetyper)                                           | 3–21                                                    | —                |
| armband           | Bracelet                                                        | 23, 26, 117, 119, 120                                   | —                |
| halshalsband      | Necklace + Pendant                                              | 22, 24, 25, 27, 101, 114                                | —                |
| barhalsband       | Necklace (barn/bara?)                                           | 22–27                                                   | —                |
| charms            | Charm                                                           | 33, 42                                                  | —                |
| beslag            | Clip + Plate                                                    | 31, 34, 72, 30, 32, 35, 60                              | —                |
| hjartan           | (sök 'heart')                                                   | —                                                       | —                |
| kors              | (sök 'cross')                                                   | —                                                       | —                |
| korgar            | (sök 'basket')                                                  | —                                                       | —                |
| minnesaskar       | (sök 'box')                                                     | —                                                       | —                |
| **Till bilen**    | Car + Tag                                                       | 29, 41, 45, 53, 57, 61, 64, 77+, 39, 40, 54, 74, 75, 91 | —                |
| (övrigt)          | Bottle, Magnet, Ornament, Pet, Bookmark, Mirror, Luggage, Medal | spritt                                                  | —                |

## Nya kategorier att förbereda i butiken (frallans svar)

- **jul** — Jul-paket: ornament-sidorna (92–97) är direktrelevanta (julgranskulor!)
- **fodelsedag** — occasion med underkategorier: student, fars/morsdag, bröllop, dop m.fl.

## Nästa steg

1. Per frallans bild i `genererade/{kategori}_H*.png`: hitta matchande katalogreferens via bildens H-hash i huvudmappen (bildfilnamnen delar hash-prefix).
2. Kopiera + döp om till `shop/public/images/products/{kategori}_{ref}.webp`.
3. Copy-utkast per produkt skrivs av Hermes (svenska), granskas av frallan per sektion.
