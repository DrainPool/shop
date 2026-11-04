import { createServerFn } from "@tanstack/react-start";
import { photoMetadataSchema, matchesPhotoSignature } from "./engravingPhoto";

export const uploadEngravingPhoto = createServerFn({ method: "POST" })
  .inputValidator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error("Välj en bild");
    const file = input.get("photo");
    if (!(file instanceof File)) throw new Error("Välj en bild");
    photoMetadataSchema.parse({ name: file.name, size: file.size, type: file.type });
    return input;
  })
  .handler(async ({ data }) => {
    const file = data.get("photo");
    if (!(file instanceof File)) throw new Error("Välj en bild");
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!matchesPhotoSignature(bytes, file.type)) throw new Error("Filen är inte en giltig bild");
    // Gäster får skapa en ny fil, aldrig ange eller skriva över en befintlig sökväg.
    const id = crypto.randomUUID();
    const secret = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!secret) throw new Error("Bildlagringen är inte tillgänglig just nu");
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`engraving-photo:${id}`)));
    const token = btoa(String.fromCharCode(...signature)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("engraving-photos").upload(id, bytes, { contentType: file.type, upsert: false });
    if (error) throw new Error("Bilden kunde inte sparas. Försök igen.");
    return { id, token };
  });