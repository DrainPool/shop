import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useEngravingPreview } from "@/stores/engravingPreviewStore";
import { Link } from "@tanstack/react-router";
import { Check, Clock, Loader2 } from "lucide-react";
import { CutoffCountdown } from "@/components/FomoBanner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore, type CartAttribute } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { customizationSchema } from "@/lib/cartValidation";
import { PhotoUploader } from "@/components/product/PhotoUploader";
import type { EngravingPhoto } from "@/lib/engravingPhoto";

const MATERIALS = [
  "Ek",
  "Björk",
  "Valnöt",
  "Läder – naturbrun",
  "Läder – svart",
  "Rostfritt stål",
  "Mässing",
  "Silverpläterad",
  "PLA-plast (3D)",
  "Vinyl (sticker)",
];

// Gravyrtypsnitten laddas från Google Fonts och används bara i
// förhandsvisningen och stilknapparna – aldrig i saj-tens övriga typografi.
// Alla har latin-ext, så å/ä/ö graveras rätt. Stylesheetet injiceras först
// när formuläret monteras (se useEffect nedan), så att startsida, kategori-
// sidor och FAQ inte blockerar på en extern fontlänk de aldrig använder.
const ENGRAVING_FONTS_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@500&family=Cinzel:wght@500&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Dancing+Script:wght@600&family=Great+Vibes&family=Kalam&family=Marcellus&family=Montserrat:wght@600&family=Parisienne&family=Playfair+Display:ital,wght@0,600;1,500&family=Satisfy&display=swap";

function ensureEngravingFonts() {
  if (document.querySelector(`link[data-engraving-fonts]`)) return;
  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://fonts.gstatic.com";
  preconnect.crossOrigin = "anonymous";
  preconnect.dataset["engravingFonts"] = "";
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = ENGRAVING_FONTS_STYLESHEET;
  stylesheet.dataset["engravingFonts"] = "";
  document.head.append(preconnect, stylesheet);
}
const FONTS = [
  "Skrivstil – klassisk",
  "Skrivstil – luftig",
  "Skrivstil – elegant",
  "Skrivstil – lekfull",
  "Handstil – avslappnad",
  "Handstil – tusch",
  "Antikva – ståtlig",
  "Antikva – fin",
  "Antikva – romersk",
  "Versal – modern",
  "Versal – tunn",
  "Versal – rak",
];

const FONT_STACKS: Record<string, CSSProperties> = {
  "Skrivstil – klassisk": { fontFamily: "'Great Vibes', cursive" },
  "Skrivstil – luftig": { fontFamily: "'Dancing Script', cursive" },
  "Skrivstil – elegant": { fontFamily: "'Parisienne', cursive" },
  "Skrivstil – lekfull": { fontFamily: "'Satisfy', cursive" },
  "Handstil – avslappnad": { fontFamily: "'Caveat', cursive" },
  "Handstil – tusch": { fontFamily: "'Kalam', cursive" },
  "Antikva – ståtlig": { fontFamily: "'Playfair Display', serif" },
  "Antikva – fin": { fontFamily: "'Cormorant Garamond', serif" },
  "Antikva – romersk": { fontFamily: "'Cinzel', serif" },
  "Versal – modern": {
    fontFamily: "'Montserrat', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  "Versal – tunn": {
    fontFamily: "'Marcellus', serif",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  "Versal – rak": {
    fontFamily: "'Bebas Neue', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
};

/**
 * CSS-representation per stil – ger en aning om känslan i live-
 * förhandsvisningen. Den exakta skissen får kunden alltid i mejlet.
 */

/**
 * Materialval per produkttyp – en tom lista gömmer fältet helt
 * (materialet är då givet, t.ex. glas eller keramik). Okänd tagg
 * faller tillbaka på MATERIALS.
 */
const MATERIALS_BY_TAG: Record<string, string[]> = {
  nyckelring: ["Ek", "Läder – naturbrun", "Läder – svart", "Rostfritt stål"],
  smycken: ["Rostfritt stål", "Mässing", "Silverpläterad"],
  glas: [],
  mugg: [],
  tumbler: ["Rostfritt stål"],
  skarbrada: ["Ek", "Björk", "Valnöt"],
  lader: ["Läder – naturbrun", "Läder – svart"],
  stickers: ["Vinyl (sticker)"],
  foto: [],
  "3d": ["PLA-plast (3D)"],
};

const MAX_TEXT = 40;

/**
 * Motivserier per produkttyp – samma formspråk återkommer på flera produkter.
 * Motivet är ett val på produkten, inte en egen produktpost per variation.
 * Tom lista (eller okänd tagg) gömmer fältet helt.
 */
const MOTIFS_BY_TAG: Record<string, string[]> = {
  glas: ["Klassisk", "Med en blinkning", "Jakt", "Familj", "Min stora dag", "Egen design"],
  mugg: ["Klassisk", "Med en blinkning", "Familj", "Egen design"],
  tumbler: ["Klassisk", "Jakt", "Med en blinkning", "Familj", "Egen design"],
  skarbrada: ["Klassisk", "Familj", "Jakt & grill", "Min stora dag", "Egen design"],
  lader: ["Klassisk", "Jakt", "Familj", "Egen design"],
  askar: ["Klassisk", "Min stora dag", "Familj", "Egen design"],
  smycken: ["Klassisk", "Familj", "Min stora dag", "Egen design"],
  skyltar: ["Klassisk", "Familj", "Jakt", "Egen design"],
};

/**
 * "Låna en text"-förslag per produkttyp (taggen på produkten).
 * Kortare än MAX_TEXT, inga priser – klicken fyller bara inputen,
 * kunden kan ändra fritt efteråt.
 */
const TEXT_SUGGESTIONS: Record<string, { l1: string; l2?: string }[]> = {
  nyckelring: [
    { l1: "Anna" },
    { l1: "Erik" },
    { l1: "Pappa" },
    { l1: "Mormor" },
    { l1: "Team K" },
    { l1: "Bilen" },
    { l1: "Sommarstugan" },
    { l1: "Hemmet" },
  ],
  smycken: [
    { l1: "Elsa" },
    { l1: "För alltid" },
    { l1: "E & J" },
    { l1: "Min älskling" },
    { l1: "Bär dig alltid" },
    { l1: "Mormor" },
  ],
  glas: [
    { l1: "Skål!" },
    { l1: "Santé" },
    { l1: "Vänskap" },
    { l1: "Farfar" },
    { l1: "Fira 2026" },
    { l1: "Gott liv" },
  ],
  mugg: [
    { l1: "Morgonmys" },
    { l1: "Elin" },
    { l1: "Pappas kaffe" },
    { l1: "Inte före kaffe" },
    { l1: "Världens bästa" },
    { l1: "Team fika" },
  ],
  tumbler: [
    { l1: "Håller värmen" },
    { l1: "Äventyraren" },
    { l1: "Fika på toppen" },
    { l1: "Elin" },
    { l1: "Team 2026" },
    { l1: "Naturmänniskan" },
  ],
  skarbrada: [
    { l1: "Köket" },
    { l1: "Hos farmor" },
    { l1: "Matlagningen" },
    { l1: "Kocken" },
    { l1: "Kök & kärlek" },
    { l1: "Grillmästaren" },
  ],
  lader: [
    { l1: "A.K" },
    { l1: "Erik" },
    { l1: "Pappa" },
    { l1: "Resan" },
    { l1: "Kärleken" },
    { l1: "Mitt" },
  ],
  stickers: [
    { l1: "Elsas" },
    { l1: "Team K" },
    { l1: "Bullen" },
    { l1: "Företaget" },
    { l1: "Min bil" },
  ],
  foto: [
    { l1: "Familjen 2026" },
    { l1: "Sommarön" },
    { l1: "Farmors 80-år" },
    { l1: "Bästa dagen" },
    { l1: "Hunden Bella" },
  ],
  "3d": [
    { l1: "Elsa" },
    { l1: "Team Ekgren" },
    { l1: "Barnens" },
    { l1: "Favoriten" },
    { l1: "MVP" },
    { l1: "Firar dig" },
  ],
};

const DEFAULT_SUGGESTIONS: { l1: string; l2?: string }[] = [
  { l1: "Anna & Erik" },
  { l1: "Grattis!" },
  { l1: "Tack för allt" },
  { l1: "Familjen K" },
  { l1: "Välkommen" },
  { l1: "Alma" },
  { l1: "Fira 2026" },
  { l1: "Käraste" },
];

/**
 * Mottagaranpassade förslag – läggs först när produkten är taggad för en
 * mottagare, så förslagen känns valda för personen och inte bara för saken.
 */
const RECIPIENT_SUGGESTIONS: Record<string, { l1: string; l2?: string }[]> = {
  "till-henne": [{ l1: "Käraste du" }, { l1: "Min Anna" }, { l1: "Tack för allt" }],
  "till-honom": [{ l1: "Bäste pappa" }, { l1: "Min Erik" }, { l1: "Tack, farsan" }],
  "till-barn": [{ l1: "Elsas" }, { l1: "Lille vän" }, { l1: "Född 2026" }],
  "till-mor-farforaldrar": [{ l1: "Mormor" }, { l1: "Farfar" }, { l1: "Barnbarnen" }],
  "till-paret": [{ l1: "Anna & Erik" }, { l1: "Vi två" }, { l1: "Sedan 2026" }],
};

export function ProductCustomizer({
  product,
  initialText = "",
}: {
  product: ShopifyProduct;
  /** Förifylld gravyrtext, t.ex. vald i presentguiden. */
  initialText?: string;
}) {
  const node = product.node;
  const variants = node.variants.edges.map((v) => v.node);
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  // Lokal pending – bara den här knappen visar spinner
  const [pending, setPending] = useState(false);
  const [photo, setPhoto] = useState<EngravingPhoto | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);

  // Gravyrtypsnitten laddas först när formuläret faktiskt visas
  useEffect(() => {
    ensureEngravingFonts();
  }, []);

  const [variantId, setVariantId] = useState<string>(
    (variants.find((v) => v.availableForSale) ?? variants[0])?.id ?? "",
  );
  const [line1, setLine1] = useState(initialText.slice(0, 40));
  const [line2, setLine2] = useState("");
  const [font, setFont] = useState<string>(FONTS[0] as string);
  const [material, setMaterial] = useState("");
  const [note, setNote] = useState("");
  // Presentläge: dölj pris i paketet och skriv en hälsning direkt på kortet.
  // Inga påhittade tillägg eller priser – det här är sådant jag gör i verkstaden.
  const [asGift, setAsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  // Motivserie – ett val på produkten i stället för en egen produkt per motiv.
  const [motif, setMotif] = useState("");
  const [withoutEngraving, setWithoutEngraving] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Skicka texten till produktbilden för live-förhandsvisning.
  const setPreview = useEngravingPreview((s) => s.set);
  useEffect(() => {
    setPreview({ line1, line2, fontStyle: FONT_STACKS[font] });
  }, [line1, line2, font, setPreview]);
  useEffect(() => () => setPreview({ line1: "", line2: "" }), [setPreview]);

  // Mottagarens förslag först, därefter produkttypens (första kända taggen
  // vinner i båda stegen). Dubbletter rensas så listan aldrig upprepar sig.
  const suggestions = useMemo(() => {
    const tags = node.tags || [];
    const recipient = tags.flatMap((t) => RECIPIENT_SUGGESTIONS[t] ?? []);
    let byType: { l1: string; l2?: string }[] | null = null;
    for (const t of tags) {
      if (TEXT_SUGGESTIONS[t]) {
        byType = TEXT_SUGGESTIONS[t];
        break;
      }
    }
    const merged = [...recipient, ...(byType ?? DEFAULT_SUGGESTIONS)];
    const seen = new Set<string>();
    return merged.filter((s) => {
      const key = `${s.l1}|${s.l2 ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [node.tags]);
  const isNyckelring = (node.tags || []).includes("nyckelring");

  // Materialalternativen härleds ur produkttypen – ingen generisk lista
  // som erbjuder ek till ett silversmycke.
  const materialOptions = useMemo(() => {
    for (const t of node.tags || []) {
      if (MATERIALS_BY_TAG[t]) return MATERIALS_BY_TAG[t];
    }
    return MATERIALS;
  }, [node.tags]);

  const selected = variants.find((v) => v.id === variantId) ?? variants[0];

  // Materialval sker via varianten om butiken har det som produktalternativ.
  const variantHasMaterial = useMemo(
    () =>
      (node.options || []).some((o) =>
        ["material", "utförande", "trä", "metall"].some((m) => o.name.toLowerCase().includes(m)),
      ),
    [node.options],
  );

  // Motivet väljs via varianten om butiken redan har det som produktalternativ –
  // då ska jag inte fråga två gånger om samma sak.
  const variantHasMotif = useMemo(
    () =>
      (node.options || []).some((o) =>
        ["motiv", "serie", "design", "stil"].some((m) => o.name.toLowerCase().includes(m)),
      ),
    [node.options],
  );

  // Motivserier – samma formspråk återkommer på flera produkter utan att
  // butiken fylls med nästan identiska produktposter.
  const motifOptions = useMemo(() => {
    for (const t of node.tags || []) {
      if (MOTIFS_BY_TAG[t]) return MOTIFS_BY_TAG[t];
    }
    return [];
  }, [node.tags]);

  const attributes: CartAttribute[] = useMemo(() => {
    const list: CartAttribute[] = [];
    if (line1.trim()) list.push({ key: "Gravyrtext rad 1", value: line1.trim() });
    if (line2.trim()) list.push({ key: "Gravyrtext rad 2", value: line2.trim() });
    if (line1.trim() || line2.trim()) list.push({ key: "Stil", value: font });
    if (withoutEngraving) list.push({ key: "Gravyr", value: "Utan gravyr" });
    if (!variantHasMotif && motif) list.push({ key: "Motiv", value: motif });
    if (!variantHasMaterial && material) list.push({ key: "Material", value: material });
    if (note.trim()) list.push({ key: "Önskemål", value: note.trim() });
    if (photo) {
      list.push({ key: "Foto för gravyr", value: photo.url });
      list.push({ key: "Bildfil", value: photo.name });
    }
    if (asGift) {
      list.push({ key: "Skickas som present", value: "Ja – inget pris i paketet" });
      if (giftMessage.trim()) list.push({ key: "Presenthälsning", value: giftMessage.trim() });
    }
    return list;
  }, [
    line1,
    line2,
    font,
    material,
    motif,
    note,
    variantHasMaterial,
    variantHasMotif,
    asGift,
    giftMessage,
    withoutEngraving,
    photo,
  ]);

  const handleAddToCart = async () => {
    if (!selected || pending || photoBusy) return;
    if (/fotogravyr/i.test(selected.title) && !photo) {
      setValidationError("Ladda upp ditt foto innan du beställer fotogravyr");
      return;
    }
    const validation = customizationSchema.safeParse({
      line1,
      line2,
      note,
      giftMessage,
      withoutEngraving,
      hasPhoto: Boolean(photo),
    });
    if (!validation.success) {
      setValidationError(validation.error.issues[0]?.message || "Kontrollera dina val");
      document.getElementById("line1")?.focus();
      return;
    }
    setValidationError("");
    setPending(true);
    try {
      const ok = await addItem({
        product,
        variantId: selected.id,
        variantTitle: selected.title,
        price: selected.price,
        quantity: 1,
        selectedOptions: selected.selectedOptions || [],
        attributes,
      });
      if (ok) {
        toast.success("Tillagd i varukorgen", {
          description: `${node.title}${line1.trim() ? ` – "${line1.trim()}"` : ""}`,
          position: "top-center",
          action: {
            label: "Öppna varukorgen",
            onClick: () => setCartOpen(true),
          },
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {variants.length > 1 && (
        <div>
          <h2 className="mb-3 text-sm font-medium">
            {variantHasMaterial ? "Välj material/utförande" : "Välj variant"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <Button
                key={v.id}
                variant={selected?.id === v.id ? "default" : "outline"}
                size="sm"
                disabled={!v.availableForSale}
                aria-pressed={selected?.id === v.id}
                // h-11 på mobil: 44 px tryckyta (tummens minimimått)
                className="h-11 transition-[color,background-color,transform] duration-200 active:scale-[0.97] motion-reduce:active:scale-100 md:h-8"
                onClick={() => setVariantId(v.id)}
              >
                {v.title} · {formatPrice(v.price.amount, v.price.currencyCode)}
              </Button>
            ))}
          </div>
        </div>
      )}

      <PhotoUploader value={photo} disabled={pending} onBusyChange={setPhotoBusy} onChange={(value) => {
        setPhoto(value);
        if (value) { setWithoutEngraving(false); setValidationError(""); }
      }} />

      <div className="border-t border-border pt-5">
        <h2 className="font-serif text-xl">Din text</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Skriv namnet eller texten precis som du vill ha den – jag skickar alltid en digital skiss
          innan tillverkning.
        </p>

        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="line1">Text / namn (rad 1)</Label>
            <Input
              id="line1"
              value={line1}
              maxLength={MAX_TEXT}
              placeholder="T.ex. Anna & Erik"
              aria-describedby="line1-count"
              aria-invalid={Boolean(validationError)}
              onChange={(e) => {
                setLine1(e.target.value);
                if (e.target.value.trim()) {
                  setWithoutEngraving(false);
                  setValidationError("");
                }
              }}
            />
            <p
              id="line1-count"
              className={cn(
                "text-xs",
                line1.length >= MAX_TEXT
                  ? "font-medium text-primary-deep"
                  : "text-muted-foreground",
              )}
            >
              {line1.length}/{MAX_TEXT} tecken
              {line1.length >= MAX_TEXT ? " – max antal nått på raden" : ""}
            </p>
            {/* Meddelas bara när gränsen nås – räknaren som tickar på varje
                tecken skulle annars prata ihop skärmläsaren. */}
            <span role="status" aria-live="polite" className="sr-only">
              {line1.length >= MAX_TEXT ? `Rad 1 har nått max antal tecken (${MAX_TEXT}).` : ""}
            </span>
          </div>

          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border px-3 py-2 text-sm">
            <input
              type="checkbox"
              checked={withoutEngraving}
              onChange={(e) => {
                setWithoutEngraving(e.target.checked);
                if (e.target.checked) {
                  setLine1("");
                  setLine2("");
                  setPhoto(null);
                  setValidationError("");
                }
              }}
              className="h-5 w-5 flex-shrink-0 accent-[var(--color-primary-deep,currentColor)]"
            />
            Jag vill beställa den här utan gravyr
          </label>
          {validationError && (
            <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
              {validationError}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="line2">Text rad 2 (valfritt)</Label>
            <Input
              id="line2"
              value={line2}
              maxLength={MAX_TEXT}
              placeholder="T.ex. 12 juni 2026"
              aria-describedby="line2-count"
              onChange={(e) => setLine2(e.target.value)}
            />
            <p
              id="line2-count"
              className={cn(
                "text-xs",
                line2.length >= MAX_TEXT
                  ? "font-medium text-primary-deep"
                  : "text-muted-foreground",
              )}
            >
              {line2.length}/{MAX_TEXT} tecken
              {line2.length >= MAX_TEXT ? " – max antal nått på raden" : ""}
            </p>
            <span role="status" aria-live="polite" className="sr-only">
              {line2.length >= MAX_TEXT ? `Rad 2 har nått max antal tecken (${MAX_TEXT}).` : ""}
            </span>
          </div>

          <div className="border-t border-border pt-2">
            <label
              htmlFor="text-forslag"
              className="mt-1 block text-sm font-medium text-primary-deep"
            >
              Behöver du inspiration? Välj en färdig text
            </label>
            <select
              id="text-forslag"
              value=""
              onChange={(e) => {
                const s = suggestions[Number(e.target.value)];
                if (!s) return;
                setLine1(s.l1);
                if (s.l2 !== undefined) setLine2(s.l2);
              }}
              className="mt-1 min-h-11 w-full cursor-pointer rounded-xl border border-border bg-background px-3 text-sm md:min-h-10"
            >
              <option value="" disabled>
                Välj ett förslag – du kan ändra fritt efteråt
              </option>
              {suggestions.map((s, i) => (
                <option key={s.l1 + i} value={i}>
                  {s.l1}
                  {s.l2 ? ` · ${s.l2}` : ""}
                </option>
              ))}
            </select>
            {isNyckelring && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tips: förnamn räcker gott – undvik adress eller liknande på en nyckelring som ska
                hänga utanför.
              </p>
            )}
          </div>

          {/* Stilvalet ligger synligt men kompakt, så tolv alternativ inte tar över köpvyn. */}
          <div className="border-t border-border pt-3">
            <Label htmlFor="font">Välj stil</Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger id="font" className="mt-2 min-h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 rounded-xl bg-cream px-4 py-3 text-center">
              <span className="block text-xl leading-tight" style={FONT_STACKS[font]}>
                {line1.trim() || "Din text"}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">{font}</span>
            </div>
          </div>

          {((!variantHasMaterial && materialOptions.length > 0) ||
            (!variantHasMotif && motifOptions.length > 0)) && (
            <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
              {!variantHasMaterial && materialOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Välj material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialOptions.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {!variantHasMotif && motifOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="motif">Motivserie</Label>
                  <Select value={motif} onValueChange={setMotif}>
                    <SelectTrigger id="motif">
                      <SelectValue placeholder="Välj motiv" />
                    </SelectTrigger>
                    <SelectContent>
                      {motifOptions.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <details className="group border-t border-border pt-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-primary-deep">
              Extra önskemål{" "}
              <span className="float-right transition-transform group-open:rotate-45">+</span>
            </summary>
            {/* Live-förhandsvisning – ger en aning om hur stilen påverkar
              texten; exakt skiss skickas alltid i mejlet före gravyr. */}
            <div className="mt-4 rounded-xl bg-cream p-4 text-center">
              <p className="text-xs font-medium text-muted-foreground">Så kan din gravyr bli</p>
              <p
                className="mt-2 text-2xl break-words text-ink"
                style={FONT_STACKS[font] ?? undefined}
                aria-hidden="true"
              >
                {line1.trim() || "Din text här"}
              </p>
              {line2.trim() && (
                <p
                  className="mt-1 text-lg break-words text-ink"
                  style={FONT_STACKS[font] ?? undefined}
                  aria-hidden="true"
                >
                  {line2.trim()}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                En fingervisning – exakt skiss får du alltid i mejlet att godkänna innan jag
                graverar.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="note">Övriga önskemål (valfritt)</Label>
              <Textarea
                id="note"
                value={note}
                maxLength={250}
                rows={3}
                placeholder="Berätta om tillfället, önskad symbol eller leveransdatum."
                aria-describedby="note-count"
                onChange={(e) => setNote(e.target.value)}
              />
              <p id="note-count" className="text-xs text-muted-foreground">
                {note.length}/250 tecken
              </p>
            </div>

            {/* Presentläge – jag lägger ingen prisuppgift i paketet och skriver
              hälsningen på ett kort för hand. Inga påhittade tilläggspriser. */}
            <div className="mt-4 rounded-xl bg-cream p-4">
              <label
                htmlFor="as-gift"
                className="flex cursor-pointer items-start gap-3 text-sm font-medium"
              >
                <input
                  id="as-gift"
                  type="checkbox"
                  checked={asGift}
                  onChange={(e) => setAsGift(e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[var(--color-primary-deep,currentColor)]"
                />
                <span>
                  Skickas som present
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    Då följer ingen prisuppgift med i paketet, och jag skriver din hälsning på ett
                    kort för hand.
                  </span>
                </span>
              </label>

              {asGift && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="gift-message">Presenthälsning (valfritt)</Label>
                  <Textarea
                    id="gift-message"
                    value={giftMessage}
                    maxLength={160}
                    rows={2}
                    placeholder="T.ex. Grattis Anna – tack för att du finns. Kram, Fredrik"
                    aria-describedby="gift-message-count"
                    onChange={(e) => setGiftMessage(e.target.value)}
                  />
                  <p id="gift-message-count" className="text-xs text-muted-foreground">
                    {giftMessage.length}/160 tecken
                  </p>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">Klart att lägga i varukorgen</h3>
          <p className="font-semibold tabular-nums text-primary-deep">
            {selected && formatPrice(selected.price.amount, selected.price.currencyCode)}
          </p>
        </div>
        <dl className="mt-3 grid gap-x-4 gap-y-1 rounded-xl bg-cream p-3 text-sm sm:grid-cols-[auto_1fr]">
          <dt className="text-muted-foreground">Gravyr</dt>
          <dd className="font-medium sm:text-right">
            {withoutEngraving
              ? "Utan gravyr"
              : [line1.trim(), line2.trim()].filter(Boolean).join(" · ") || (photo ? "Foto enligt godkänd skiss" : "Skriv din text eller välj foto ovan")}
          </dd>
          <dt className="text-muted-foreground">Stil</dt>
          <dd className="font-medium sm:text-right">{withoutEngraving ? "–" : font}</dd>
          {material && (
            <>
              <dt className="text-muted-foreground">Material</dt>
              <dd className="font-medium sm:text-right">{material}</dd>
            </>
          )}
          {motif && (
            <>
              <dt className="text-muted-foreground">Motiv</dt>
              <dd className="font-medium sm:text-right">{motif}</dd>
            </>
          )}
          {photo && <><dt className="text-muted-foreground">Foto</dt><dd className="min-w-0 break-words font-medium sm:text-right">{photo.name}</dd></>}
        </dl>

        {/* Skiss-löftet närmast knappen – det är här stavningsoron
            uppstår, och skissen (inte en kontrollbock) är skyddet. */}
        <p className="mt-4 text-sm text-muted-foreground">
          Du får en exakt skiss i mejlet att godkänna innan jag graverar.
        </p>

        {/* Returvillkoret precis vid köpet – personliga varor saknar ångerrätt,
            men reklamationsrätten står lika tydligt. */}
        <p className="mt-2 text-xs text-muted-foreground">
          Personligt graverat görs unikt till dig och har därför ingen ångerrätt – men blir något
          fel är det mitt ansvar, och jag gör om det.{" "}
          <Link to="/retur" className="underline hover:text-primary-deep">
            Retur och garanti
          </Link>
        </p>

        <Button
          className="mt-4 w-full rounded-full transition-[color,background-color,transform] duration-200 active:scale-[0.98] motion-reduce:active:scale-100"
          size="lg"
          onClick={handleAddToCart}
          disabled={pending || photoBusy || !selected?.availableForSale}
          aria-busy={pending}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" /> Lägg i varukorgen
            </>
          )}
        </Button>

        {/* Ärligt tillverkningsstopp: räknar ner till verkstadens nästa
            produktionstillfälle (vardagar 14:00) – inte en påhittad kampanj. */}
        {selected?.availableForSale && (
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-primary-deep" aria-hidden="true" />
            Beställ inom
            <CutoffCountdown className="font-semibold text-primary-deep" />
            så hinner den med i dagens tillverkning.
          </p>
        )}

        {!selected?.availableForSale && (
          <p className="mt-4 rounded-xl bg-gold/15 p-3 text-sm">
            Just nu slutsåld – jag tar in nästa tillverkning inom kort.{" "}
            <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
              Skriv till mig
            </Link>{" "}
            så bokar jag in dig.
          </p>
        )}
      </div>
    </div>
  );
}
