// 3d: sätter aria-hidden="true" på de dekorativa lucide-ikonerna.
//
// Varje rad är förhandskontrollerad: antingen står ikonen intill synlig text i
// samma kontroll, eller är den ikon-only inuti en kontroll som redan har
// aria-label (namnkällan finns alltså). Ingen ikon-only-kontroll saknade namn.
//
// Rör INTE src/components/ui/ — shadcn-primitiverna har egna kända varningar
// och hålls utanför (MASTER.md § 11).
//
//   node design-system/taggadet/aria-svep.cjs          # torrkörning
//   node design-system/taggadet/aria-svep.cjs --skriv  # verkställ

const fs = require("fs");

const skriv = process.argv.includes("--skriv");

// [fil, rad, ikonnamn] — radnumret är kontrollerat mot filen vid körning.
const MÅL = [
  ["src/components/ProductCustomizer.tsx", 527, "Check"],
  ["src/components/ProductFilters.tsx", 164, "SlidersHorizontal"],
  ["src/components/ProductFilters.tsx", 181, "X"],
  ["src/components/SearchOverlay.tsx", 72, "Search"],
  ["src/components/SearchOverlay.tsx", 88, "Search"],
  ["src/components/SiteFooter.tsx", 36, "Mail"],
  ["src/components/SiteFooter.tsx", 110, "Mail"],
  ["src/components/SiteHeader.tsx", 196, "Menu"],
  ["src/components/WishlistRow.tsx", 65, "Trash2"],
  ["src/routes/foretag.tsx", 154, "Mail"],
  ["src/routes/foretag.tsx", 316, "Mail"],
  ["src/routes/om-mig.tsx", 98, "Mail"],
  ["src/routes/om-mig.tsx", 149, "Mail"],
  ["src/routes/onskelista.tsx", 66, "Mail"],
  ["src/routes/produkt.$handle.tsx", 319, "ArrowLeft"],
  ["src/routes/produkt.$handle.tsx", 388, "Check"],
  ["src/routes/produkt.$handle.tsx", 464, "Sparkles"],
  ["src/routes/tillverkningsprocessen.tsx", 196, "Mail"],
];

const perFil = new Map();
for (const [fil, rad, ikon] of MÅL) {
  if (!perFil.has(fil)) perFil.set(fil, fs.readFileSync(fil, "utf8").split("\n"));
  const rader = perFil.get(fil);
  const i = rad - 1;
  const r = rader[i];
  if (r === undefined) {
    console.error(`FEL ${fil}:${rad} — raden finns inte`);
    process.exit(1);
  }
  if (!new RegExp(`<${ikon}[\\s/>]`).test(r)) {
    console.error(`FEL ${fil}:${rad} — ingen <${ikon}> på raden:\n  ${r}`);
    process.exit(1);
  }
  if (r.includes("aria-hidden")) {
    console.error(`FEL ${fil}:${rad} — har redan aria-hidden (dubbelmarkering?):\n  ${r}`);
    process.exit(1);
  }
  const antal = (r.match(/\/>/g) || []).length;
  if (antal !== 1) {
    console.error(`FEL ${fil}:${rad} — ${antal} stycken "/>" på raden, förväntade 1:\n  ${r}`);
    process.exit(1);
  }
  rader[i] = r.replace("/>", 'aria-hidden="true" />');
  console.log(`${fil.replace(/^src[\\/]/, "")}:${rad}  <${ikon}>  →  ${rader[i].trim()}`);
}

if (skriv) {
  for (const [fil, rader] of perFil) fs.writeFileSync(fil, rader.join("\n"));
  console.log(`\n${MÅL.length} ikoner i ${perFil.size} filer — SKRIVET`);
} else {
  console.log(`\n${MÅL.length} ikoner i ${perFil.size} filer — torrkörning, inget skrivet`);
}
