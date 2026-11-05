/**
 * Kontakt- och nyhetsbrevsanslutning till huvudsajtens Supabase-stack
 * (linsochlager-deploy, vpvzqdcvlershkzpvqle) — återanvänder deployade
 * edge functions och RLS-skyddade tabeller i stället för en egen backend.
 *
 * send-contact-notification gör tre saker server-side: CRM-upsert i
 * customers, rad i contact_submissions och mail till Fredrik med
 * reply_to = kunden. Rate-limitad (5/min per IP) och CORS-tillåten för
 * linsochlager.net där shoppen lever.
 */

const SUPABASE_URL =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ||
  process.env["SUPABASE_URL"] ||
  "https://vpvzqdcvlershkzpvqle.supabase.co";

const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

export interface KontaktData {
  namn: string;
  epost: string;
  meddelande: string;
}

/** Skicka kontaktformulär till edge-funktionen. Kastar vid fel. */
export async function skickaKontakt(data: KontaktData): Promise<void> {
  const res = await fetch(`${FUNCTIONS_URL}/send-contact-notification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: data.namn,
      customerEmail: data.epost,
      message: data.meddelande,
      service: "Taggat-butiken",
      source: "taggat_contact_form",
    }),
  });
  if (!res.ok) {
    // 429 = rate-limit, 400 = validering — båda är "försök igen"-lägen
    throw new Error(`Kontakt misslyckades (${res.status})`);
  }
}

/** Försök edge-funktionen; om den inte svarar öppnas förifyllt mail i stället. */
export async function skickaKontaktMedFallback(data: KontaktData): Promise<"edge" | "mailto"> {
  try {
    await skickaKontakt(data);
    return "edge";
  } catch {
    // Edge-funktionen nere/otillgänglig — kunden ska aldrig tappa meddelandet.
    const subject = encodeURIComponent(`Fråga till Taggat från ${data.namn || "besökare"}`);
    const body = encodeURIComponent(
      `Hej!\n\n${data.meddelande}\n\n— ${data.namn}\nSvara gärna till: ${data.epost}`,
    );
    window.location.href = `mailto:taggat@linsochlager.net?subject=${subject}&body=${body}`;
    return "mailto";
  }
}

/**
 * Nyhetsbrevsprenumeration: direkt insert i newsletter_subscribers
 * (RLS tillåter anonyma inserts; mailbekräftelsen sköts av befintliga
 * automationer i huvudsajten). Tabellen kräver name+email; status
 * har default 'active'.
 */
export async function prenumereraNyhetsbrev(epost: string, namn = "Nyhetsbrevsprenumerant"): Promise<void> {
  const key = (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined) ||
    process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!key) throw new Error("Supabase-nyckel saknas");
  const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify({ email: epost.toLowerCase(), name: namn }),
  });
  if (!res.ok && res.status !== 409) {
    throw new Error(`Prenumeration misslyckades (${res.status})`);
  }
}