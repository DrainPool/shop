import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";

const LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

function createRunIdFetch() {
  let runId: string | undefined;
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER))
      headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
    const response = await fetch(input, { ...init, headers });
    runId ??= response.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined;
    return response;
  };
}

const resultSchema = z.object({
  intro: z.string(),
  picks: z.array(
    z.object({
      handle: z.string(),
      reason: z.string(),
      engraving: z.string(),
    }),
  ),
});

export type AdvisorResult = z.infer<typeof resultSchema>;

export class AdvisorError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function runGiftAdvisor(prompt: string, catalog: string): Promise<AdvisorResult> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new AdvisorError("Presentguiden är inte konfigurerad just nu.", 401);

  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: createRunIdFetch(),
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions:
      "Du är presentguide i Taggat, en liten svensk verkstad (enskild firma) som graverar personliga presenter. " +
      "Skriv på felfri svenska i jag-form, varmt och tryggt. Välj 2–4 produkter ENBART ur katalogen (använd exakt handle). " +
      "Respektera budgeten (pris i kr). Hitta aldrig på produkter, priser eller leveranstider. " +
      "För varje val: en kort motivering (max 2 meningar) och ett konkret gravyrförslag (max 40 tecken) anpassat till mottagaren. " +
      "intro: en mening som sammanfattar tanken bakom valen.",
    prompt: `KATALOG (handle | titel | pris kr | taggar):\n${catalog}\n\nKUNDENS BESKRIVNING:\n${prompt}`,
    output: Output.object({ schema: resultSchema }),
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  try {
    return await result.output;
  } catch (error: any) {
    if (NoObjectGeneratedError.isInstance(error) && error.text) {
      try {
        return resultSchema.parse(JSON.parse(error.text));
      } catch {
        /* faller igenom */
      }
    }
    const status = error?.statusCode ?? error?.lastError?.statusCode ?? 500;
    if (status === 429)
      throw new AdvisorError("Många frågar samtidigt – försök igen om en stund.", 429);
    if (status === 402 || status === 403)
      throw new AdvisorError(
        "Presentguiden är tillfälligt pausad. Hör gärna av dig direkt till mig.",
        status,
      );
    console.error("Presentguiden misslyckades", error);
    throw new AdvisorError("Kunde inte ta fram förslag just nu. Försök igen om en stund.", 500);
  }
}
