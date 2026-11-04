# Stoor of Lappland – vad vi tar efter

## Vad de gör bra

- **Tydlig regional identitet**: samiskt arv, Kiruna, "Jag heter Patrik". Berättelsen säljer.
- **Bygg-ditt-eget-set**: "Glasunderlägg i skiffer – välj dina motiv" för 99 kr/st, kunden blandar motiv.
- **Motivserier på flera produkter**: samma motiv (ren, ledkryss, skoter) på glas och underlägg.
- **Märkesglas som argument**: Rastal/Ockelbo nämns – kvalitet blir konkret.
- **Specialbeställning tydligt på startsidan**: "Har du en egen idé?" + förfrågan.
- **Blogg med presenttips** (julklappstips, presenter med berättelse) – drar in Google-trafik.
- Kampanjpris med överstruket pris, "Fri frakt"-märke på kategoribanners.

## Vad vi inte tar efter

- Kläder/brodyr, samisk design (inte vår identitet), ständiga rabatter, kopierade texter/motiv.

## Vad vi bygger

1. **Småländsk identitet** – förstärk "verkstad i Småland" i heron och om-mig-sektionen med en kort, konkret berättelse (jag skriver utkast, du rättar fakta).
2. **Blanda-ditt-set för skifferunderlägg** – produktsidan låter kunden välja motiv per underlägg (4-pack) via Shopify-varianter/radattribut. Pris från Shopify.
3. **Motivserier** – egna serier (t.ex. Småland, Jakt, Familj) som filter "Motiv" i sortimentet, styrt av Shopify-taggar `motiv-*`.
4. **Egen idé-block** – lyft specialbeställning tydligare på startsidan (finns delvis i FinalCta; flyttas upp och kopplas till kontaktformuläret).
5. **Presenttips-sidor (SEO)** – 3 guidesidor: "Julklappstips med gravyr", "Presenter till honom med gravyr", "Varför graverat glas håller". Länkar till riktiga kategorier, inga påhittade priser.
6. **Rea-visning** – om Shopify-produkten har jämförelsepris visas överstruket pris på kortet (kontrollera att det redan stöds; annars lägg till).

## Behöver från dig

- Vilka glasmärken du faktiskt använder (nämns bara om sant). Jag har inte börjat använda några specifika glas ännu. 
- Godkänn att jag skapar motiv-taggar och skiffer-varianter i Shopify-sandlådan (ingen claim).

## Tekniskt

- Motivfilter via befintlig `catalogSearch`-helper + URL-parametrar.
- Guidesidor som nya routes `/presenttips/$slug` med egen head(), JSON-LD Article, sitemap-poster.
- Skiffer-set: radattribut valideras med befintliga Zod-scheman i `cartValidation`.