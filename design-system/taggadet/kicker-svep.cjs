// 3c: lyfter den kanoniska kickern till <Kicker>.
//
// Ersätter hela elementet <p className="(mt-N )?font-inscription text-sm
// text-primary-deep md:text-base( md:mt-N)?">…</p> med <Kicker>…</Kicker>.
// Den icke-giriga matchningen är säker: varje kanonisk kicker har ren text som
// barn — verifierat, noll nästlade taggar — så första </p> är alltid rätt.
//
// Avvikarna lämnas orörda och matchas inte av mönstret: fem kickers med
// text-gold på mörk botten, tre med text-xs/text-[11px], HomeHero (gold-accent
// + hero-rise) och CategoryBento (en <h3> med text-2xl).
//
//   node design-system/taggadet/kicker-svep.cjs          # torrkörning
//   node design-system/taggadet/kicker-svep.cjs --skriv  # verkställ

const fs = require("fs");
const path = require("path");

const skriv = process.argv.includes("--skriv");

const MÖNSTER =
  /<p className="((?:mt-\d+ )?)font-inscription text-sm text-primary-deep md:text-base((?: md:mt-\d+)?)">([\s\S]*?)<\/p>/g;

const IMPORT = 'import { Kicker } from "@/components/Kicker";';

function filer(dir, ut = []) {
  for (const post of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, post.name);
    if (post.isDirectory()) filer(p, ut);
    else if (post.name.endsWith(".tsx")) ut.push(p);
  }
  return ut;
}

/** Sista raden i importblocket (hanterar importer över flera rader). */
function importBlocketsSlut(rader) {
  let inne = false;
  let slut = -1;
  for (let i = 0; i < rader.length; i++) {
    const r = rader[i];
    if (!inne && /^import\b/.test(r)) inne = true;
    if (inne) {
      slut = i;
      if (/;\s*$/.test(r)) inne = false;
    } else if (slut !== -1 && r.trim() !== "" && !/^\/\//.test(r) && !/^\/\*/.test(r)) {
      break; // första raden efter importblocket
    }
  }
  return slut;
}

let antal = 0;
const filerÄndrade = [];
const utanImport = [];

for (const fil of filer("src")) {
  if (fil.endsWith("Kicker.tsx")) continue;
  const original = fs.readFileSync(fil, "utf8");
  const träffar = [...original.matchAll(MÖNSTER)];
  if (träffar.length === 0) continue;

  let ny = original.replace(MÖNSTER, (_hel, före, efter, innehåll) => {
    const extra = (före + efter).replace(/\s+/g, " ").trim();
    return extra
      ? `<Kicker className="${extra}">${innehåll}</Kicker>`
      : `<Kicker>${innehåll}</Kicker>`;
  });

  if (!ny.includes('from "@/components/Kicker"')) {
    const rader = ny.split("\n");
    const slut = importBlocketsSlut(rader);
    if (slut === -1) {
      utanImport.push(fil);
    } else {
      rader.splice(slut + 1, 0, IMPORT);
      ny = rader.join("\n");
    }
  }

  antal += träffar.length;
  filerÄndrade.push(`${fil.replace(/^src[\\/]/, "")} (${träffar.length})`);
  for (const t of träffar) {
    const extra = (t[1] + t[2]).replace(/\s+/g, " ").trim();
    console.log(
      `${fil.replace(/^src[\\/]/, "")}  →  <Kicker${extra ? ` className="${extra}"` : ""}>  ${JSON.stringify(
        t[3].trim().slice(0, 46),
      )}`,
    );
  }
  if (skriv) fs.writeFileSync(fil, ny);
}

console.log(
  `\n${antal} kickers i ${filerÄndrade.length} filer` + (skriv ? " — SKRIVET" : " — torrkörning"),
);
if (utanImport.length) console.log("FILER UTAN IMPORTBLOCK (måste åtgärdas manuellt):", utanImport);
