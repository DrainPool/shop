import { z } from "zod";
import { type CartItem } from "@/stores/cartStore";

const cleanText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} måste anges`)
    .max(max, `${label} får innehålla högst ${max} tecken`)
    .refine((value) => !/[<>]/.test(value), `${label} innehåller tecken som inte kan användas`);

export const demoCheckoutSchema = z.object({
  name: cleanText(100, "Namn"),
  email: z.string().trim().email("Ange en giltig e-postadress"),
  phone: z
    .string()
    .trim()
    .min(1, "Telefonnummer måste anges")
    .max(30, "Telefonnummer är för långt")
    .regex(/^\+?[\d\s\-()]+$/, "Ange ett giltigt telefonnummer"),
  address: cleanText(200, "Adress"),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postnummer måste anges")
    .regex(/^\d{3}\s?\d{2}$/, "Ange postnummer som 123 45 eller 12345"),
  city: cleanText(100, "Ort"),
  paymentMethod: z.enum(["swish", "invoice"], {
    message: "Välj betalningsalternativ",
  }),
  comment: z.string().trim().max(500, "Kommentaren får innehålla högst 500 tecken").optional(),
});

export type DemoCheckoutForm = z.infer<typeof demoCheckoutSchema>;

export interface DemoOrder {
  id: string;
  items: CartItem[];
  total: number;
  currency: string;
  customer: DemoCheckoutForm;
  createdAt: string;
}

export async function submitDemoOrder(order: DemoOrder): Promise<void> {
  const SUPABASE_URL =
    (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) ||
    process.env["SUPABASE_URL"] ||
    "https://vpvzqdcvlershkzpvqle.supabase.co";

  const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

  const body = JSON.stringify({
    orderId: order.id,
    customerEmail: order.customer.email,
    customerName: order.customer.name,
    phone: order.customer.phone,
    address: `${order.customer.address}, ${order.customer.postalCode} ${order.customer.city}`,
    paymentMethod: order.customer.paymentMethod === "swish" ? "Swish" : "Faktura",
    comment: order.customer.comment || "",
    total: order.total,
    currency: order.currency,
    items: order.items.map((i) => ({
      title: i.product.node.title,
      quantity: i.quantity,
      price: parseFloat(i.price.amount),
      variant: i.variantTitle,
      attributes: i.attributes,
    })),
  });

  try {
    const res = await fetch(`${FUNCTIONS_URL}/send-order-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (!res.ok) {
      throw new Error(`Order misslyckades (${res.status})`);
    }
  } catch {
    const subject = encodeURIComponent(`DEMO-order från ${order.customer.name}`);
    const text = encodeURIComponent(
      `Order: ${order.id}\n` +
        `Kund: ${order.customer.name}\n` +
        `E-post: ${order.customer.email}\n` +
        `Telefon: ${order.customer.phone}\n` +
        `Adress: ${order.customer.address}, ${order.customer.postalCode} ${order.customer.city}\n` +
        `Betalning: ${order.customer.paymentMethod === "swish" ? "Swish" : "Faktura"}\n` +
        `Kommentar: ${order.customer.comment || "—"}\n\n` +
        `Varor:\n` +
        order.items
          .map(
            (i) =>
              `- ${i.product.node.title} (${i.variantTitle}) × ${i.quantity} = ${
                parseFloat(i.price.amount) * i.quantity
              } ${order.currency}`,
          )
          .join("\n") +
        `\n\nTotalt: ${order.total} ${order.currency}`,
    );
    window.location.href = `mailto:taggat@linsochlager.net?subject=${subject}&body=${text}`;
  }
}
