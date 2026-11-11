import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, ArrowLeft, Send, Loader2, Package } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { demoCheckoutSchema, type DemoCheckoutForm, submitDemoOrder, type DemoOrder } from "@/lib/demoCheckout";
import { SITE_URL } from "@/lib/siteUrls";

export const Route = createFileRoute("/demo-kassa")({
  head: () => ({
    meta: [
      { title: "Kassa | Taggat" },
      { name: "description", content: "Slutför din beställning av personliga presenter med gravyr." },
      { property: "og:title", content: "Kassa | Taggat" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/demo-kassa` }],
  }),
  component: DemoCheckoutPage,
});

function DemoCheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );
  const currency = items[0]?.price.currencyCode || "SEK";

  const form = useForm<DemoCheckoutForm>({
    resolver: zodResolver(demoCheckoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      paymentMethod: "swish",
      comment: "",
    },
  });

  async function onSubmit(data: DemoCheckoutForm) {
    if (items.length === 0) {
      toast.error("Varukorgen är tom");
      return;
    }
    setIsSubmitting(true);
    try {
      const order: DemoOrder = {
        id: `DEMO-${Date.now()}`,
        items: [...items],
        total: totalPrice,
        currency,
        customer: data,
        createdAt: new Date().toISOString(),
      };
      await submitDemoOrder(order);
      clearCart();
      setSubmitted(true);
    } catch {
      toast.error("Det gick inte att skicka beställningen", {
        description: "Prova igen, eller maila mig direkt på taggat@linsochlager.net",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-10 w-10 text-primary-deep" />
        </div>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">Tack för din beställning!</h1>
        <p className="mt-4 text-muted-foreground">
          Jag har fått din order och återkommer inom 24 timmar med en digital skiss innan jag börjar gravera.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/sortiment">
            <Button variant="outline">Fortsätt handla</Button>
          </Link>
          <Link to="/demo-tack">
            <Button>Gå till tack-sidan →</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14 text-center">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="font-serif text-3xl tracking-tight">Varukorgen är tom</h1>
        <p className="mt-4 text-muted-foreground">
          Det finns inget att beställa just nu.
        </p>
        <Link to="/sortiment">
          <Button className="mt-6">Utforska sortimentet →</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-5 py-8 md:py-14">
        <Breadcrumbs items={[{ label: "Varukorg" }, { label: "Kassa" }]} />

        <h1 className="mt-8 font-serif text-3xl tracking-tight md:text-4xl">Kassa</h1>
        <p className="mt-2 text-muted-foreground">
          Fyll i dina uppgifter — jag återkommer med en digital skiss innan jag börjar gravera.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <section className="card-shop space-y-4 p-6">
                <h2 className="font-serif text-xl">Dina uppgifter</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Namn *</FormLabel>
                      <FormControl><Input placeholder="Anna Andersson" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>E-post *</FormLabel>
                      <FormControl><Input type="email" placeholder="anna@exempel.se" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Telefon *</FormLabel>
                    <FormControl><Input placeholder="070-123 45 67" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </section>

              <section className="card-shop space-y-4 p-6">
                <h2 className="font-serif text-xl">Leveransadress</h2>
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Adress *</FormLabel>
                    <FormControl><Input placeholder="Storgatan 1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem><FormLabel>Postnummer *</FormLabel>
                      <FormControl><Input placeholder="123 45" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>Ort *</FormLabel>
                      <FormControl><Input placeholder="Aneby" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </section>

              <section className="card-shop space-y-4 p-6">
                <h2 className="font-serif text-xl">Betalning</h2>
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Välj betalningsalternativ *</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-3">
                        <div className="flex items-center space-x-3 rounded-xl border border-border p-4 transition-colors hover:bg-cream/50">
                          <RadioGroupItem value="swish" id="swish" />
                          <Label htmlFor="swish" className="flex-1 cursor-pointer">
                            <span className="font-medium">Swish</span>
                            <span className="block text-xs text-muted-foreground">Betalning via Swish direkt till 070-XXX XX XX</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-xl border border-border p-4 transition-colors hover:bg-cream/50">
                          <RadioGroupItem value="invoice" id="invoice" />
                          <Label htmlFor="invoice" className="flex-1 cursor-pointer">
                            <span className="font-medium">Faktura</span>
                            <span className="block text-xs text-muted-foreground">Faktura skickas till din e-post inom 24 timmar</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </section>

              <section className="card-shop space-y-4 p-6">
                <h2 className="font-serif text-xl">Orderkommentar</h2>
                <FormField control={form.control} name="comment" render={({ field }) => (
                  <FormItem><FormLabel>Önskemål eller frågor (valfritt)</FormLabel>
                    <FormControl><Textarea placeholder="Ex. 'Skriv datumet som 2026-04-12' eller 'Jag vill ha ett annat typsnitt'" rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Skickar beställning…</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" />Skicka beställning</>
                  )}
                </Button>
                <Link to="/sortiment">
                  <Button variant="ghost" size="lg" type="button">
                    <ArrowLeft className="mr-2 h-4 w-4" />Fortsätt handla
                  </Button>
                </Link>
              </div>
            </form>
          </Form>

          <aside className="space-y-4">
            <div className="card-shop p-6">
              <h2 className="font-serif text-xl">Ordersammanfattning</h2>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.lineKey} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.node.title}</p>
                      <p className="text-xs text-muted-foreground">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>
                      {item.attributes && item.attributes.length > 0 && (
                        <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                          {item.attributes.map((a) => (
                            <li key={a.key}><span className="font-medium">{a.key}:</span> {a.value}</li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-1 text-sm tabular-nums">{item.quantity} × {formatPrice(item.price.amount, item.price.currencyCode)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm"><span>Frakt</span><span className="text-muted-foreground">Räknas ut separat</span></div>
                <div className="mt-2 flex justify-between">
                  <span className="text-lg font-semibold">Totalt</span>
                  <span className="font-serif text-2xl tabular-nums">{formatPrice(totalPrice, currency)}</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground">Du godkänner alltid en digital skiss innan jag graverar.</p>
          </aside>
        </div>
      </div>
    </>
  );
}
