// Tar bort död vikt: font-bold / font-semibold inuti en klass-sträng som
// redan innehåller font-serif. .font-serif ligger oskiktad i styles.css och
// tvingar font-weight: 400, så vikten är verkningslös (MASTER.md § 3).
//
//   node design-system/taggadet/ta-bort-doda-vikter.cjs          # torrkörning
//   node design-system/taggadet/ta-bort-doda-vikter.cjs --skriv  # verkställ
//
// Skriptet rör bara text inuti citattecken (", ' och backtick) som innehåller
// font-serif. Det rör alltså aldrig en vikt på ett element utan font-serif,
// och aldrig en kommentar utanför en klass-sträng.

const fs = require("fs");
const path = require("path");

const skriv = process.argv.includes("--skriv");
const VIKTER = /\bfont-(bold|semibold)\b/g;
const STRANG = /"([^"\n]*)"|'([^'\n]*)'|`([^`\n]*)`/g;

function filer(dir, ut = []) {
  for (const post of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, post.name);
    if (post.isDirectory()) filer(p, ut);
    else if (post.name.endsWith(".tsx")) ut.push(p);
  }
  return ut;
}

let filerÄndrade = 0;
let borttagna = 0;
const rader = [];

for (const fil of filer("src")) {
  const original = fs.readFileSync(fil, "utf8");
  let antalIFil = 0;

  // Rad för rad, så rapporten kan visa exakt vad som ändras.
  const ny = original
    .split("\n")
    .map((rad, i) => {
      if (!rad.includes("font-serif")) return rad;
      return rad.replace(STRANG, (hel, d, e, b) => {
        const text = d ?? e ?? b;
        if (text === undefined || !text.includes("font-serif")) return hel;
        const träffar = text.match(VIKTER);
        if (!träffar) return hel;
        antalIFil += träffar.length;
        const rensad = text.replace(VIKTER, "").replace(/ {2,}/g, " ").trimEnd();
        rader.push(`${fil.replace(/^src[\\/]/, "")}:${i + 1}  ${träffar.join("+")}  →  ${rensad}`);
        const citat = d !== undefined ? '"' : e !== undefined ? "'" : "`";
        return citat + rensad + citat;
      });
    })
    .join("\n");

  if (antalIFil > 0) {
    filerÄndrade++;
    borttagna += antalIFil;
    if (skriv) fs.writeFileSync(fil, ny);
  }
}

console.log(rader.join("\n"));
console.log(
  `\n${borttagna} döda vikter i ${filerÄndrade} filer` +
    (skriv ? " — SKRIVET" : " — torrkörning, inget skrivet"),
);
