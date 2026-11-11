import { z } from "zod";

const cleanText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} får innehålla högst ${max} tecken`)
    .refine((value) => !/[<>\'"&]/.test(value), `${label} innehåller tecken som inte kan användas`);

export const customizationSchema = z
  .object({
    line1: cleanText(40, "Rad 1"),
    line2: cleanText(40, "Rad 2"),
    note: cleanText(250, "Önskemål"),
    giftMessage: cleanText(160, "Presenthälsningen"),
    withoutEngraving: z.boolean(),
    hasPhoto: z.boolean().default(false),
  })
  .refine((value) => value.withoutEngraving || value.hasPhoto || Boolean(value.line1 || value.line2), {
    message: "Skriv din gravyrtext, ladda upp ett foto eller välj utan gravyr",
    path: ["line1"],
  });

export const cartAttributeSchema = z.object({
  key: cleanText(80, "Fältnamnet").refine(Boolean, "Fältnamnet måste anges"),
  value: cleanText(250, "Valet").refine(Boolean, "Valet måste anges"),
});

export const cartLineSchema = z.object({
  variantId: z.string().trim().min(1).max(250),
  quantity: z.number().int().min(1).max(99),
  attributes: z.array(cartAttributeSchema).max(20),
});

export function validateCartLine(input: {
  variantId: string;
  quantity: number;
  attributes: Array<{ key: string; value: string }>;
}) {
  return cartLineSchema.safeParse(input);
}
