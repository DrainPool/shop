// 3b: konverterar de tolv riktiga korten till .card-shop.
//
// .card-shop sätter radie (--radius-3xl), kant, bakgrund (--card) och skugga
// (--shadow-soft) — alltså exakt de tokens korten skriver för hand. De tas
// bort och ersätts av card-shop. Paddingen sätts per användning även i dag och
// behålls, liksom flex/overflow-klasser.
//
// Grinden är körd och passerad: skiktprov.html visar att .card-shop vinner
// över en samtidig rounded-*/shadow-* (26,4 px mot 22,4 px), så inga
// radie-klasser behöver plockas bort av nöd — de tas bort för att de ljuger
// om vad som styr.
//
//   node design-system/taggadet/kort-svep.cjs          # torrkörning
//   node design-system/taggadet/kort-svep.cjs --skriv  # verkställ

const fs = require("fs");

const skriv = process.argv.includes("--skriv");

// [fil, radnummer, exakt text att byta ut, ersättning]
const BYTEN = [
  [
    "src/routes/foretag.tsx",
    189,
    "rounded-3xl border border-border bg-card p-7 shadow-soft",
    "card-shop p-7",
  ],
  [
    "src/routes/foretag.tsx",
    225,
    "rounded-3xl border border-border bg-card p-7 shadow-soft",
    "card-shop p-7",
  ],
  [
    "src/routes/kontakt.tsx",
    71,
    "rounded-3xl border border-border bg-card p-8 shadow-soft",
    "card-shop p-8",
  ],
  [
    "src/routes/kontakt.tsx",
    85,
    "rounded-3xl border border-border bg-card p-8 shadow-soft",
    "card-shop p-8",
  ],
  [
    "src/routes/kontakt.tsx",
    105,
    "rounded-3xl border border-border bg-card p-8 shadow-soft",
    "card-shop p-8",
  ],
  [
    "src/routes/kontakt.tsx",
    117,
    "rounded-3xl border border-border bg-card p-8 shadow-soft",
    "card-shop p-8",
  ],
  [
    "src/routes/om-mig.tsx",
    118,
    "rounded-3xl border border-border bg-card p-7 shadow-soft",
    "card-shop p-7",
  ],
  [
    "src/routes/tillverkningsprocessen.tsx",
    165,
    "flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft",
    "flex gap-4 card-shop p-6",
  ],
  [
    "src/components/CustomerShowcase.tsx",
    55,
    "overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
    "overflow-hidden card-shop",
  ],
  [
    "src/components/ProductCustomizer.tsx",
    282,
    "rounded-2xl border border-border bg-card p-5 shadow-soft",
    "card-shop p-5",
  ],
  // ReviewSection saknade shadow-soft — den får en skugga av konverteringen.
  // Planen pekade ut just denna som den enda bland de konverterade.
  [
    "src/components/ReviewSection.tsx",
    79,
    "rounded-2xl border border-border bg-card p-5",
    "card-shop p-5",
  ],
  [
    "src/routes/villkor.tsx",
    112,
    "rounded-3xl border border-border bg-card p-7 shadow-soft",
    "card-shop p-7",
  ],
];

const perFil = new Map();
for (const [fil, rad, från, till] of BYTEN) {
  if (!perFil.has(fil)) perFil.set(fil, fs.readFileSync(fil, "utf8").split("\n"));
  const rader = perFil.get(fil);
  const i = rad - 1;
  if (rader[i] === undefined) {
    console.error(`FEL ${fil}:${rad} — raden finns inte`);
    process.exit(1);
  }
  if (!rader[i].includes(från)) {
    console.error(`FEL ${fil}:${rad} — innehåller inte förväntad text.\n  rad: ${rader[i]}`);
    process.exit(1);
  }
  if (rader[i].split(från).length !== 2) {
    console.error(`FEL ${fil}:${rad} — texten förekommer inte exakt en gång på raden`);
    process.exit(1);
  }
  rader[i] = rader[i].replace(från, till);
  console.log(`${fil.replace(/^src[\\/]/, "")}:${rad}  →  ${till}`);
}

if (skriv) {
  for (const [fil, rader] of perFil) fs.writeFileSync(fil, rader.join("\n"));
  console.log(`\n${BYTEN.length} kort konverterade i ${perFil.size} filer — SKRIVET`);
} else {
  console.log(`\n${BYTEN.length} kort i ${perFil.size} filer — torrkörning, inget skrivet`);
}
