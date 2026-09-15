// Räknar om oklch-tokens ur src/styles.css till sRGB-hex.
//
// Varför den finns: styles.css har hex-värden i kommentarer som inte stämmer
// med tokens (se MASTER.md § 2). Behöver du ett hex-värde — för en favicon, en
// delningsbild, ett mejl, en extern tjänst som inte kan oklch — räkna om det
// härifrån i stället för att skriva av kommentaren.
//
//   node design-system/taggadet/rakna-om-oklch.cjs
//
// Listan nedan är token, oklch och vad kommentaren i styles.css påstår; sista
// kolumnen visar om påståendet håller. Webbläsaren är den yttersta sanningen
// (den komponerar oklch själv) — den här uträkningen landar inom 1/255 från
// webbläsarens värde, vilket räcker för allt utom färgprofilsarbete.

function oklchToHex(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const enc = (u) => {
    const v = u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  };
  const hex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
  return "#" + hex(enc(lr)) + hex(enc(lg)) + hex(enc(lb));
}

const tokens = [
  ["--background (ljust)", 0.967, 0.008, 85, "#F8F5F0"],
  ["--foreground", 0.18, 0.012, 30, "#141010"],
  ["--primary", 0.62, 0.09, 80, "#C8A96E"],
  ["--primary-deep", 0.47, 0.08, 78, "#806027"],
  ["--muted-foreground", 0.43, 0.015, 75, "#6B6259"],
  ["--gold", 0.72, 0.1, 80, "#C8A96E-aktig"],
  ["--cream", 0.95, 0.01, 85, "(ingen kommentar)"],
  ["--ink", 0.18, 0.012, 30, "#141010"],
  ["--border", 0.9, 0.008, 80, "#E2DDD8"],
  ["--background (mörkt)", 0.19, 0.014, 45, "(ingen kommentar)"],
  ["--primary (mörkt)", 0.72, 0.1, 80, "(sepia uppljusat)"],
  ["--primary-deep (mörkt)", 0.78, 0.09, 82, "(ljus rostguld-text)"],
  ["--gold (mörkt)", 0.75, 0.1, 80, "(ingen kommentar)"],
];

let avvikelser = 0;
console.log("token".padEnd(26) + "oklch".padEnd(26) + "verklig".padEnd(10) + "kommentar");
console.log("-".repeat(86));
for (const [namn, L, C, h, komm] of tokens) {
  const real = oklchToHex(L, C, h);
  const lika = komm.startsWith("#") && komm.slice(0, 7).toUpperCase() === real;
  if (komm.startsWith("#") && !lika) avvikelser++;
  console.log(
    namn.padEnd(26) +
      `oklch(${L} ${C} ${h})`.padEnd(26) +
      real.padEnd(10) +
      komm +
      (komm.startsWith("#") ? (lika ? "  ✓" : "  ← STÄMMER INTE") : ""),
  );
}
console.log("\nAntal hex-kommentarer som inte stämmer:", avvikelser);
