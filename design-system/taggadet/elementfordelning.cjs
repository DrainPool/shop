// 3e: vilket element bär egentligen rytmen?
//
// Sektionsrytmen sitter inte nödvändigtvis på <section>. Läser varje fil och
// hittar varje öppningstagg som bär en py-10+ respektive mt-10+, och räknar
// elementtyp.
//
// En radvis regex duger inte: `className` ligger ofta på raden efter taggnamnet,
// och en naiv taggmatching med `\{[^{}]*\}` klarar inte nästlade klamrar i en
// mall-literal. Därför samma klammer-medvetna skanner som ikoninventeringen
// använder — den håller redd för klammerdjup, citattecken och escapes.
//
//   node design-system/taggadet/elementfordelning.cjs

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

/** Slutet på öppningstaggen som börjar vid `start` (index för `>`). */
function taggensSlut(s, start) {
  let klammer = 0;
  let citat = null;
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

// Vänsterranden måste ta citattecken: klasssträngen börjar ofta direkt med
// klassen (`className="mt-14"`), och då är föregående tecken `"`, inte ett
// mellanslag. `:` får däremot INTE ingå — annars räknas `md:py-24` som mobilvärde.
const VÄNSTER = `(^|[\\s{"'\`])`;
const HÖGER = `([\\s}"'\`]|$)`;
const PAD = new RegExp(`${VÄNSTER}py-(10|12|14|16|20|24|36)${HÖGER}`);
const MARG = new RegExp(`${VÄNSTER}mt-(10|12|14|16|20|24)${HÖGER}`);

const py = new Map();
const mt = new Map();

for (const fil of filer("src")) {
  const s = fs.readFileSync(fil, "utf8");
  for (const m of s.matchAll(/<([A-Za-z][\w.]*)/g)) {
    const slut = taggensSlut(s, m.index);
    const tagg = s.slice(m.index, slut + 1);
    if (PAD.test(tagg)) py.set(m[1], (py.get(m[1]) || 0) + 1);
    if (MARG.test(tagg)) mt.set(m[1], (mt.get(m[1]) || 0) + 1);
  }
}

function visa(titel, karta) {
  console.log(`=== ${titel} ===`);
  [...karta.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([n, c]) => console.log(`${String(c).padStart(3)}  <${n}>`));
  console.log(`     summa ${[...karta.values()].reduce((a, b) => a + b, 0)}\n`);
}

visa("py-10 och uppåt", py);
visa("mt-10 och uppåt", mt);
