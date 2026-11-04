import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Upload, Loader2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photoMetadataSchema, type EngravingPhoto } from "@/lib/engravingPhoto";
import { uploadEngravingPhoto } from "@/lib/engravingPhoto.functions";

export function PhotoUploader({ value, onChange, onBusyChange, disabled }: {
  value: EngravingPhoto | null;
  onChange: (photo: EngravingPhoto | null) => void;
  onBusyChange: (busy: boolean) => void;
  disabled?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const upload = useServerFn(uploadEngravingPhoto);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function choose(file?: File) {
    if (!file || busy) return;
    const validation = photoMetadataSchema.safeParse({ name: file.name, size: file.size, type: file.type });
    if (!validation.success) { setError(validation.error.issues[0]?.message ?? "Välj en bild"); return; }
    setBusy(true); onBusyChange(true); setError("");
    try {
      const image = await createImageBitmap(file);
      image.close();
      const form = new FormData(); form.set("photo", file);
      const result = await upload({ data: form });
      const url = new URL("/api/public/engraving-photo", window.location.origin);
      url.searchParams.set("id", result.id); url.searchParams.set("token", result.token);
      setPreview(URL.createObjectURL(file));
      onChange({ url: url.toString(), name: file.name.replace(/[<>]/g, "").slice(0, 160) || "Foto" });
    } catch {
      setError("Bilden kunde inte laddas upp. Välj en giltig bild och försök igen.");
    } finally {
      setBusy(false); onBusyChange(false);
      if (input.current) input.current.value = "";
    }
  }

  return <section className="space-y-3 border-t border-border pt-5" aria-labelledby="photo-heading">
    <h2 id="photo-heading" className="font-serif text-xl">Ditt foto eller motiv</h2>
    <p className="text-sm text-muted-foreground">Jag graverar även foton och djurporträtt med hög detaljrikedom. Du godkänner skissen innan jag börjar.</p>
    <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Ladda upp foto för gravyr" disabled={busy || disabled} onChange={e => void choose(e.target.files?.[0])} />
    {value && <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <img src={preview || value.url} alt="Ditt uppladdade foto för gravyr" className="h-20 w-20 shrink-0 rounded-md object-contain" />
      <div className="min-w-0 flex-1"><p className="break-words text-sm font-medium">{value.name}</p><p className="mt-1 flex items-center gap-1 text-xs text-primary-deep"><Check className="h-4 w-4" aria-hidden="true" />Bilden är sparad</p></div>
      <Button type="button" variant="ghost" size="icon" aria-label="Ta bort foto" disabled={busy || disabled} onClick={() => { onChange(null); setPreview(""); setError(""); }}><Trash2 className="h-4 w-4" aria-hidden="true" /></Button>
    </div>}
    <Button type="button" variant="outline" className="min-h-11 w-full" disabled={busy || disabled} onClick={() => input.current?.click()}>
      {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Upload className="mr-2 h-4 w-4" aria-hidden="true" />}
      {busy ? "Sparar bilden…" : value ? "Byt foto" : "Ladda upp foto"}
    </Button>
    <p className="text-xs text-muted-foreground">Valfritt för textgravyr. JPG, PNG eller WebP, högst 10 MB. Bilden används som beställningsunderlag, inte i butikens galleri.</p>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
  </section>;
}