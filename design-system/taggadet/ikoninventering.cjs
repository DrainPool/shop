// 3d: inventerar lucide-ikoner som saknar aria-hidden.
//
// Läser varje fils lucide-import för att veta vilka identifierare som är
// ikoner (annars skulle <Button>, <Link> m.fl. fastna), hittar varje
// förekomst av <Namn ...> och rapporterar om elementet har aria-hidden,
// aria-label eller en omslutande förälder med aria-hidden.
//
//   node design-system/taggadet/ikoninventering.cjs

const fs = require("fs");
const path = require("path");

function filer(dir, ut = []) {
  for (const post of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, post.name);
    if (post.isDirectory()) filer(p, ut);
    else if (post.name.endsWith(".tsx")) ut.push(p);
  }
  return ut;
}

/**
 * Slutet på öppningstaggen som börjar vid `start`.
 *
 * Får inte vara `indexOf(">")`: ett attribut kan innehålla ett `>` inuti ett
 * uttryck — `<Heart className={`... ${count > 0 ? ...}`} />` — och då klipps
 * taggen av mitt i, så att ett `aria-hidden` längre fram inte hittas. Skanningen
 * håller därför redd för klammerparenteser, citattecken och mall-literaler.
 */
function taggensSlut(s, start) {
  let klammer = 0;
  let citat = null; // ", ' eller `
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (citat) {
      if (c === "\\") i++;
      else if (c === citat) citat = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") citat = c;
    else if (c === "{") klammer++;
    else if (c === "}") klammer--;
    else if (c === ">" && klammer === 0) return i;
  }
  return s.length - 1;
}

/** Alla element med aria-hidden i filen, som intervall [start, slut]. */
function doldaOmråden(text) {
  const områden = [];
  const re = /aria-hidden/;
  let i = -1;
  while ((i = text.search(re)) !== -1 && i !== -1) {
    // hitta öppningstaggen runt förekomsten
    const öppna = text.lastIndexOf("<", i);
    const stäng = taggensSlut(text, öppna);
    const tagg = text.slice(öppna, stäng + 1);
    const namn = (tagg.match(/^<([A-Za-z][\w.]*)/) || [])[1];
    if (!namn) break;
    // självstängande?
    if (/\/>$/.test(tagg)) {
      områden.push([öppna, stäng + 1]);
    } else {
      const slut = text.indexOf(`</${namn}>`, stäng);
      områden.push([öppna, slut === -1 ? stäng + 1 : slut + namn.length + 3]);
    }
    text =
      text.slice(0, i) + " ".repeat("aria-hidden".length) + text.slice(i + "aria-hidden".length);
  }
  return områden;
}

let antal = 0;
for (const fil of filer("src")) {
  const s = fs.readFileSync(fil, "utf8");
  const import_ = s.match(/import\s*\{([^}]*)\}\s*from\s*"lucide-react";/);
  if (!import_) continue;
  const namn = import_[1]
    .split(",")
    .map((x) => x.trim().replace(/^type\s+/, ""))
    .filter((x) => /^[A-Z]/.test(x));
  if (namn.length === 0) continue;

  const områden = doldaOmråden(s);
  for (const n of namn) {
    const re = new RegExp(`<${n}(?=[\\s/>])`, "g");
    let m;
    while ((m = re.exec(s))) {
      const stäng = taggensSlut(s, m.index);
      const tagg = s.slice(m.index, stäng + 1);
      if (/aria-hidden|aria-label|<title/.test(tagg)) continue;
      const iDold = områden.some(([a, b]) => m.index >= a && m.index <= b);
      const rad = s.slice(0, m.index).split("\n").length;
      antal++;
      console.log(
        `${iDold ? "[gömd av förälder] " : "[LUCKA]           "}${fil.replace(/^src[\\/]/, "")}:${rad}  <${n}>  ${tagg.replace(/\s+/g, " ").slice(0, 96)}`,
      );
    }
  }
}
console.log(`\n${antal} ikoner utan egen aria-hidden`);
