# Sälj- & språkgranskning 2 sep 2026 (commit f177095)

## Så har agenten granskat — full transparens

**1. Tidigare crawlat material (firecrawl):**

- Repo har API-route `/api/public/firecrawl-crawl.ts` från tidigare session (byggd för roffi.se-crawl).
- `FIRECRAWL_API_KEY` finns EJ i lokal .env — routen fungerar bara vid deploy med env satt.
- Sessionssökning hittade ingen tidigare konkurrent-crawl med data kvar (källor ej sparade).
- **Ersättning:** web_extract (live) på fyra svenska konkurrenter + Perplexity-analysen från 30 aug (fortfarande i Temp).

**2. Granskade konkurrenter (via web_extract, 2 sep):**

| Konkurrent          | Insikt                                                                                                                                                  | Åtgärd i butiken                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **medgravyr.se**    | Säkerhetsråd: gravera ALDRIG fullständigt namn på nyckelring (tappar/stöld → var nyckeln passar). Däck-format rymmer 70 tecken. FAQ med mottagarfrågor. | FAQ-insikt sparad — läggs till vid produktcopy.                                                                                                         |
| **holtbo.se**       | Tillfälleslistor: inflyttningspresent, musiker, symboliska gåvor. Emotionell copy ("bär en känsla, ett minne").                                         | Kandidat-underkategorier noterade. Tonen matchar vår redan.                                                                                             |
| **amikado.se**      | Foto-nyckelringar 149–239 kr med 273 omdömen (4,67). Leveransdatum per produkt.                                                                         | **Prismätning:** dina graverade nyckelringar i trä/läder kan ligga 149–249 kr.                                                                          |
| **yoursurprise.se** | Jättetillfällesnav (A-Z, 25+ tillfällen). "Diskmaskinssäker, flagnar aldrig"-glas-copy. Redigerare online.                                              | Vår glas-copy + FAQ har redan motsvarande (skiss-godkännande). Tillfällesnavet är störst glapp — men våra 9 occasions + jul + födelsedag täcker kärnan. |

**3. Genomförda åtgärder (commit f177095):**

- Startsidas SEO-title/description → konkurrentsökord först ("Personliga presenter med gravyr", "nyckelringar med namn", "julklappar med eget namn") — inte varumärket.
- Steps-copy: "digital skiss **att godkänna**" (konkurrenternas starkaste trust-signal) + "för hand i min verkstad i Småland".
- Fas 3 (89bda26): jag-form genom köpflödet + fraktlänk i varukorgen.

**4. Språkgranskning:**

- Konsekvent "jag"-form (enmannsverkstad) genom startsida, frakt, retur, FAQ, cart — kontrollerad via grep.
- Inga "vi"-rester utom medvetna ("vi hittar ofta en lösning" i kontakt-FAQ = jag+kund tillsammans, korrekt).
- Svenska tecken/typografi: endash, mellanslag före utropstecken — ok.

**5. 21st.dev-kvot:** Sök är gratis och använt för UI-komponenter; ingen ny hämtning behövdes denna runda (kvot 2/2 kvar).

## Nästa säljlyft (kopia till Fas 6)

- Säkerhets-FAQ: lägg in medgravyrs namn-råd när produkterna skrivs.
- Underkategorier "Inflyttning" / "Till musikern" — kandidater efter lansering.
- Foto-nyckelring prisförslag 149–249 kr (AI-bildprodukt).
