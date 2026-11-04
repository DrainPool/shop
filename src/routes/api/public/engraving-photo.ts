import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/api/public/engraving-photo")({
  server: { handlers: { GET: async ({ request }) => {
    const url = new URL(request.url);
    const parsed = z.object({ id: z.string().uuid(), token: z.string().regex(/^[A-Za-z0-9_-]{43}$/) }).safeParse(Object.fromEntries(url.searchParams));
    if (!parsed.success) return new Response("Bilden hittades inte", { status: 404 });
    const secret = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!secret) return new Response("Bildlagringen är inte tillgänglig", { status: 503 });
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const bytes = Uint8Array.from(atob(parsed.data.token.replace(/-/g, "+").replace(/_/g, "/") + "="), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(`engraving-photo:${parsed.data.id}`));
    if (!valid) return new Response("Bilden hittades inte", { status: 404 });
    // Den signerade länken är behörigheten; inga filer kan listas eller läsas utan den.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.storage.from("engraving-photos").download(parsed.data.id);
    if (error || !data) return new Response("Bilden hittades inte", { status: 404 });
    return new Response(data, { headers: { "Content-Type": data.type, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "Content-Security-Policy": "default-src 'none'" } });
  } } },
});