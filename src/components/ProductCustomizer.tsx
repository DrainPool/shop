import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Loader2, Sparkles } from "lucide-react";
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
import { PaymentLogos } from "@/components/PaymentLogos";
import { useCartStore, type CartAttribute } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

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

const FONTS = ["Klassisk skrivstil", "Elegant antikva", "Modern versal", "Handskriven"];

/**
 * CSS-representation per stil – ger en aning om känslan i live-
 * förhandsvisningen. Den exakta skissen får kunden alltid i mejlet.
 */
const FONT_STACKS: Record<string, CSSProperties> = {
  "Klassisk skrivstil": { fontFamily: "'Brush Script MT', 'Segoe Script', cursive" },
  "Elegant antikva": { fontFamily: "Georgia, 'Times New Roman', serif" },
  "Modern versal": {
    fontFamily: "system-ui, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  },
  Handskriven: { fontFamily: "'Segoe Script', 'Bradley Hand', cursive" },
};

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
  keps: [],
  tshirt: [],
  hoodie: [],
  skarbrada: ["Ek", "Björk", "Valnöt"],
  lader: ["Läder – naturbrun", "Läder – svart"],
  stickers: ["Vinyl (sticker)"],
  foto: [],
  "3d": ["PLA-plast (3D)"],
};

const MAX_TEXT = 40;

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
  keps: [
    { l1: "Golfkungen" },
    { l1: "Pappa" },
    { l1: "Team E" },
    { l1: "MVP" },
    { l1: "Äventyraren" },
    { l1: "Fiskaren" },
  ],
  tshirt: [
    { l1: "Team Larsson" },
    { l1: "Bästefarmor" },
    { l1: "Familjen K" },
    { l1: "Segrarna" },
    { l1: "Träning 2026" },
  ],
  hoodie: [
    { l1: "Team Larsson" },
    { l1: "Världens bästa moster" },
    { l1: "Familjen K" },
    { l1: "Fred & skratt" },
    { l1: "Löparklubben" },
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

export function ProductCustomizer({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variants = node.variants.edges.map((v) => v.node);
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  // Lokal pending – bara den här knappen visar spinner
  const [pending, setPending] = useState(false);

  const [variantId, setVariantId] = useState<string>(
    (variants.find((v) => v.availableForSale) ?? variants[0])?.id ?? "",
  );
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [font, setFont] = useState<string>(FONTS[0] as string);
  const [material, setMaterial] = useState("");
  const [note, setNote] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Förslagen väljs utifrån produkttypen (första kända taggen vinner)
  const suggestions = useMemo(() => {
    for (const t of node.tags || []) {
      if (TEXT_SUGGESTIONS[t]) return TEXT_SUGGESTIONS[t];
    }
    return DEFAULT_SUGGESTIONS;
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

  const attributes: CartAttribute[] = useMemo(() => {
    const list: CartAttribute[] = [];
    if (line1.trim()) list.push({ key: "Gravyrtext rad 1", value: line1.trim() });
    if (line2.trim()) list.push({ key: "Gravyrtext rad 2", value: line2.trim() });
    if (line1.trim() || line2.trim()) list.push({ key: "Stil", value: font });
    if (!variantHasMaterial && material) list.push({ key: "Material", value: material });
    if (note.trim()) list.push({ key: "Önskemål", value: note.trim() });
    return list;
  }, [line1, line2, font, material, note, variantHasMaterial]);

  const handleAddToCart = async () => {
    if (!selected || pending) return;
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
                onClick={() => setVariantId(v.id)}
              >
                {v.title} · {formatPrice(v.price.amount, v.price.currencyCode)}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" /> Personlig anpassning
        </h2>
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
              onChange={(e) => setLine1(e.target.value)}
            />
            <p id="line1-count" className="text-xs text-muted-foreground" aria-live="polite">
              {line1.length}/{MAX_TEXT} tecken
              {line1.length >= MAX_TEXT ? " – max antal nått" : ""}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="line2">Text rad 2 (valfritt)</Label>
            <Input
              id="line2"
              value={line2}
              maxLength={MAX_TEXT}
              placeholder="T.ex. 12 juni 2026"
              onChange={(e) => setLine2(e.target.value)}
            />
          </div>

          <div className="rounded-xl bg-cream/70 p-3">
            <button
              type="button"
              onClick={() => setShowSuggestions((v) => !v)}
              aria-expanded={showSuggestions}
              className="flex items-center gap-1 text-sm font-medium text-primary-deep hover:underline"
            >
              Behöver du inspiration? Låna en text
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showSuggestions ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {showSuggestions && (
              <>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s.l1}
                      type="button"
                      onClick={() => {
                        setLine1(s.l1);
                        if (s.l2 !== undefined) setLine2(s.l2);
                      }}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary"
                    >
                      {s.l1}
                      {s.l2 ? ` · ${s.l2}` : ""}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Klicka för att låna – ändra fritt efteråt, det är bara ett förslag.
                </p>
              </>
            )}
            {isNyckelring && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tips: förnamn räcker gott – undvik adress eller liknande på en nyckelring som ska
                hänga utanför.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="font">Stil på texten</Label>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger id="font">
                  <SelectValue placeholder="Välj stil" />
                </SelectTrigger>
                <SelectContent>
                  {FONTS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!variantHasMaterial && materialOptions.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="material">Material (valfritt)</Label>
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
          </div>

          {/* Live-förhandsvisning – ger en aning om hur stilen påverkar
              texten; exakt skiss skickas alltid i mejlet före gravyr. */}
          <div className="rounded-xl border border-gold/40 bg-cream/70 p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">Så kan din gravyr te sig</p>
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
              En fingervisning – exakt skiss får du alltid i mejlet att godkänna innan jag graverar.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Övriga önskemål (valfritt)</Label>
            <Textarea
              id="note"
              value={note}
              maxLength={250}
              rows={3}
              placeholder="Berätta om tillfället, önskad symbol eller leveransdatum."
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-cream p-5">
        <h3 className="font-serif text-lg font-semibold">Din sammanfattning</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Produkt</dt>
            <dd className="text-right font-medium">{node.title}</dd>
          </div>
          {selected && variants.length > 1 && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Variant</dt>
              <dd className="text-right font-medium">{selected.title}</dd>
            </div>
          )}
          {attributes.length === 0 ? (
            <p className="text-muted-foreground">
              Ingen text ifylld ännu – produkten levereras då utan gravyr.
            </p>
          ) : (
            attributes.map((a) => (
              <div key={a.key} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{a.key}</dt>
                <dd className="text-right font-medium break-words">{a.value}</dd>
              </div>
            ))
          )}
          <div className="flex justify-between gap-4 border-t border-border pt-2">
            <dt className="text-muted-foreground">Pris</dt>
            <dd className="text-right font-semibold">
              {selected && formatPrice(selected.price.amount, selected.price.currencyCode)}
            </dd>
          </div>
        </dl>

        {/* Skiss-löftet närmast knappen – det är här stavningsoron
            uppstår, och skissen (inte en kontrollbock) är skyddet. */}
        <p className="mt-4 text-sm text-muted-foreground">
          Osäker på stavning eller layout? Oroa dig inte – ingenting graveras förrän du sagt ja. Du
          får en exakt skiss i mejlet att godkänna först.
        </p>

        <Button
          className="mt-4 w-full rounded-full"
          size="lg"
          onClick={handleAddToCart}
          disabled={pending || !selected?.availableForSale}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Lägg i varukorgen
            </>
          )}
        </Button>

        {!selected?.availableForSale && (
          <p className="mt-4 rounded-xl bg-gold/15 p-3 text-sm">
            Just nu slutsåld – jag tar in nästa tillverkning inom kort.{" "}
            <Link to="/kontakt" className="font-semibold text-primary-deep hover:underline">
              Skriv till mig
            </Link>{" "}
            så bokar jag in dig.
          </p>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Fraktadress och betalning fyller du i tryggt i Shopifys kassa – dina texter följer med
          automatiskt till beställningen.
        </p>
        <div className="mt-3">
          <p className="mb-1.5 text-xs text-muted-foreground">Betala tryggt i kassan med:</p>
          <PaymentLogos />
        </div>
      </div>
    </div>
  );
}
