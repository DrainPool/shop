import { useMemo, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore, type CartAttribute } from "@/stores/cartStore";
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

const MAX_TEXT = 40;

export function ProductCustomizer({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variants = node.variants.edges.map((v) => v.node);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const [variantId, setVariantId] = useState<string>(
    (variants.find((v) => v.availableForSale) ?? variants[0])?.id ?? "",
  );
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [font, setFont] = useState<string>(FONTS[0] as string);
  const [material, setMaterial] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

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
    if (!selected) return;
    await addItem({
      product,
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity: 1,
      selectedOptions: selected.selectedOptions || [],
      attributes,
    });
    toast.success("Tillagd i varukorgen", {
      description: `${node.title}${line1.trim() ? ` – "${line1.trim()}"` : ""}`,
      position: "top-center",
    });
    setConfirmed(false);
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
                {v.title}
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
              onChange={(e) => setLine1(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {line1.length}/{MAX_TEXT} tecken
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

            {!variantHasMaterial && (
              <div className="space-y-2">
                <Label htmlFor="material">Material (valfritt)</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Välj material" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIALS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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

        <div className="mt-4 flex items-start gap-3">
          <Checkbox
            id="confirm"
            checked={confirmed}
            onCheckedChange={(v) => setConfirmed(v === true)}
          />
          <Label htmlFor="confirm" className="text-sm leading-snug font-normal">
            Jag har kontrollerat stavning och detaljer i sammanfattningen.
          </Label>
        </div>

        <Button
          className="mt-5 w-full"
          size="lg"
          onClick={handleAddToCart}
          disabled={isLoading || !confirmed || !selected?.availableForSale}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Lägg i varukorgen
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Fraktadress och betalning fyller du i tryggt i Shopifys kassa – dina texter följer med
          automatiskt till beställningen.
        </p>
      </div>
    </div>
  );
}
