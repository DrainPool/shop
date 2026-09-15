// 3e: inventerar sektionsrytmen — vertikal padding på fullbreddsytor och
// marginalen mellan inbäddade sektioner.
//
// Räknar klasssträngar, inte rader: en rad kan bära `py-12 md:py-16`, och en
// radvis regex fångar då bara sista värdet. Här plockas varje `py-*`/`mt-*`
// ut för sig, med sin breakpoint-prefix.
//
//   node design-system/taggadet/rytminventering.cjs

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

/** Varje klass i varje className, som {fil, rad, klass}. */
function klasser() {
  const ut = [];
  for (const fil of filer("src")) {
    const rader = fs.readFileSync(fil, "utf8").split("\n");
    rader.forEach((r, i) => {
      for (const m of r.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
        for (const k of (m[1] || m[2] || "").split(/\s+/)) {
          if (k) ut.push({ fil: fil.replace(/^src[\\/]/, ""), rad: i + 1, klass: k });
        }
      }
    });
  }
  return ut;
}

const alla = klasser();

// --- fullbreddsytor: py-10 och uppåt (sektionsrytmen, inte komponentpadding)
const rytm = alla.filter((k) => /(^|:)py-(10|12|14|16|20|24|28|32|36)$/.test(k.klass));
const perVärde = new Map();
for (const k of rytm) {
  if (!perVärde.has(k.klass)) perVärde.set(k.klass, []);
  perVärde.get(k.klass).push(`${k.fil}:${k.rad}`);
}
console.log("=== fullbreddsytor (py-10 och uppåt) ===");
[...perVärde.entries()]
  .sort((a, b) => parseInt(b[0].match(/py-(\d+)/)[1]) - parseInt(a[0].match(/py-(\d+)/)[1]))
  .forEach(([klass, st]) => {
    console.log(
      `${String(st.length).padStart(2)}  ${klass.padEnd(8)} ${st.slice(0, 4).join(" ")}${st.length > 4 ? " …" : ""}`,
    );
  });

// --- inbäddade sektioner: mt-10 och uppåt
const inbäddad = alla.filter((k) => /(^|:)mt-(10|12|14|16|20|24)$/.test(k.klass));
const perMt = new Map();
for (const k of inbäddad) {
  if (!perMt.has(k.klass)) perMt.set(k.klass, []);
  perMt.get(k.klass).push(`${k.fil}:${k.rad}`);
}
console.log("\n=== inbäddade sektioner (mt-10 och uppåt) ===");
[...perMt.entries()]
  .sort((a, b) => parseInt(b[0].match(/mt-(\d+)/)[1]) - parseInt(a[0].match(/mt-(\d+)/)[1]))
  .forEach(([klass, st]) =>
    console.log(
      `${String(st.length).padStart(2)}  ${klass.padEnd(8)} ${st.slice(0, 3).join(" ")}${st.length > 3 ? " …" : ""}`,
    ),
  );

// --- responsiva par: vilka ytor andas olika på mobil och desktop?
const par = alla.filter((k) => /^py-\d+$/.test(k.klass)).map((k) => `${k.fil}:${k.rad}`);
const md = new Set(alla.filter((k) => /^md:py-\d+$/.test(k.klass)).map((k) => `${k.fil}:${k.rad}`));
const responsiva = par.filter((p) => md.has(p));
console.log(
  `\n=== responsiv vertikalpadding ===\n${responsiva.length} av ${rytm.length} fullbreddsytor byter py-* vid md:`,
);
responsiva.forEach((p) => console.log(`   ${p}`));

// --- per yta: hela signaturen (mobil + md) i källordning
const perYta = new Map();
for (const k of rytm) {
  const nyckel = `${k.fil}:${k.rad}`;
  if (!perYta.has(nyckel)) perYta.set(nyckel, []);
  perYta.get(nyckel).push(k.klass);
}
console.log("\n=== per yta (källordning) ===");
for (const [yta, kl] of perYta) {
  const mobil = kl.filter((x) => !x.startsWith("md:")).join("+") || "—";
  const stor =
    kl
      .filter((x) => x.startsWith("md:"))
      .map((x) => x.replace("md:", ""))
      .join("+") || "= mobil";
  console.log(`${mobil.padEnd(8)} → ${stor.padEnd(10)} ${yta}`);
}

console.log(
  `\n${perYta.size} fullbreddsytor (${rytm.length} py-klasser), ${inbäddad.length} mt-klasser i inbäddade sektioner`,
);
