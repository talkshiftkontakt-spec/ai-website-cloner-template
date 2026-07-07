"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PaymentBadges } from "@/components/marketing/TrustStrip";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/commerce/cart-store";
import {
 FREE_SHIPPING_THRESHOLD,
 getShippingCost,
 getShippingLabel,
} from "@/lib/commerce/shipping";
import { analyticsEvents } from "@/lib/analytics/events";
import { formatPrice } from "@/lib/format";
import type { PaymentMethod, ShippingMethod } from "@/types/order";

const steps = ["Dane", "Wysyłka", "Płatność"];

export default function CheckoutPage() {
 const router = useRouter();
 const items = useCartStore((s) => s.items);
 const subtotal = useCartStore((s) => s.subtotal());
 const clearCart = useCartStore((s) => s.clearCart);
 const [step, setStep] = useState(0);
 const [loading, setLoading] = useState(false);
 const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("inpost");
 const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("blik");
 const [form, setForm] = useState({
 name: "",
 email: "",
 phone: "",
 address: "",
 city: "",
 postal: "",
 apartment: "",
 marketing: false,
 });

 const shipping =
 subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : getShippingCost(shippingMethod);
 const total = subtotal + shipping;

 if (items.length === 0) {
 return (
 <div className="container-site section-padding text-center">
 <h1 className="font-display text-4xl font-bold">Kasa</h1>
 <p className="mt-4 text-muted-foreground">Koszyk jest pusty.</p>
 <Link
 href="/kolekcje/wszystkie"
 className={cn(buttonVariants(), "mt-8 inline-flex")}
 >
 Przeglądaj kolekcję
 </Link>
 </div>
 );
 }

 const handleSubmit = async () => {
 setLoading(true);
 analyticsEvents.beginCheckout(total);

 try {
 const response = await fetch("/api/checkout", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 customer: form,
 shippingMethod,
 paymentMethod,
 items,
 subtotal,
 shippingCost: shipping,
 total,
 }),
 });

 const data = (await response.json()) as { orderNumber?: string; error?: string };

 if (!response.ok || !data.orderNumber) {
 throw new Error(data.error ?? "Błąd zamówienia");
 }

 analyticsEvents.purchase(data.orderNumber, total);
 clearCart();
 router.push(`/dziekujemy?order=${data.orderNumber}`);
 } catch {
 setLoading(false);
 alert("Wystąpił błąd. Spróbuj ponownie.");
 }
 };

 return (
 <div className="container-site section-padding">
 <Breadcrumbs
 items={[
 { label: "Strona główna", href: "/" },
 { label: "Koszyk", href: "/koszyk" },
 { label: "Kasa" },
 ]}
 className="mb-8"
 />

 <h1 className="font-display text-4xl font-bold">Kasa</h1>

 <div className="mt-6 flex gap-2">
 {steps.map((s, i) => (
 <div
 key={s}
 className={`flex-1 rounded-lg py-2 text-center text-sm font-medium ${
 i <= step
 ? "bg-primary text-primary-foreground"
 : "bg-surface text-muted-foreground"
 }`}
 >
 {i + 1}. {s}
 </div>
 ))}
 </div>

 <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
 <div className="space-y-6">
 {step === 0 && (
 <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
 <div className="grid gap-4 sm:grid-cols-2">
 <div className="sm:col-span-2">
 <Label htmlFor="name">Imię i nazwisko</Label>
 <Input
 id="name"
 required
 value={form.name}
 onChange={(e) => setForm({ ...form, name: e.target.value })}
 className="mt-2"
 />
 </div>
 <div>
 <Label htmlFor="email">Email</Label>
 <Input
 id="email"
 type="email"
 required
 value={form.email}
 onChange={(e) => setForm({ ...form, email: e.target.value })}
 className="mt-2"
 />
 </div>
 <div>
 <Label htmlFor="phone">Telefon</Label>
 <Input
 id="phone"
 type="tel"
 required
 value={form.phone}
 onChange={(e) => setForm({ ...form, phone: e.target.value })}
 className="mt-2"
 />
 </div>
 </div>
 <Button
 className="w-full h-12"
 disabled={!form.name || !form.email || !form.phone}
 onClick={() => setStep(1)}
 >
 Dalej: Wysyłka
 </Button>
 </div>
 )}

 {step === 1 && (
 <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
 <fieldset>
 <legend className="mb-3 font-medium">Sposób wysyłki</legend>
 {(["inpost", "courier"] as const).map((method) => (
 <label
 key={method}
 className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
 >
 <input
 type="radio"
 name="shipping"
 checked={shippingMethod === method}
 onChange={() => setShippingMethod(method)}
 className="accent-primary"
 />
 <div>
 <p className="font-medium">{getShippingLabel(method)}</p>
 <p className="text-sm text-muted-foreground">
 {subtotal >= FREE_SHIPPING_THRESHOLD
 ? "Gratis"
 : formatPrice(getShippingCost(method))}
 </p>
 </div>
 </label>
 ))}
 </fieldset>
 <div className="grid gap-4 sm:grid-cols-2">
 <div>
 <Label htmlFor="postal">Kod pocztowy</Label>
 <Input
 id="postal"
 required
 value={form.postal}
 onChange={(e) => setForm({ ...form, postal: e.target.value })}
 className="mt-2"
 />
 </div>
 <div>
 <Label htmlFor="city">Miasto</Label>
 <Input
 id="city"
 required
 value={form.city}
 onChange={(e) => setForm({ ...form, city: e.target.value })}
 className="mt-2"
 />
 </div>
 <div className="sm:col-span-2">
 <Label htmlFor="address">Adres</Label>
 <Input
 id="address"
 required
 value={form.address}
 onChange={(e) => setForm({ ...form, address: e.target.value })}
 className="mt-2"
 />
 </div>
 </div>
 <div className="flex gap-3">
 <Button variant="outline" onClick={() => setStep(0)}>
 Wstecz
 </Button>
 <Button
 className="flex-1 h-12"
 disabled={!form.postal || !form.city || !form.address}
 onClick={() => {
 analyticsEvents.beginCheckout(total);
 setStep(2);
 }}
 >
 Dalej: Płatność
 </Button>
 </div>
 </div>
 )}

 {step === 2 && (
 <div className="space-y-4 rounded-xl border border-border bg-surface p-6">
 <fieldset>
 <legend className="mb-3 font-medium">Metoda płatności</legend>
 {(
 [
 { id: "blik" as const, label: "BLIK" },
 { id: "card" as const, label: "Karta płatnicza" },
 { id: "transfer" as const, label: "Przelew online" },
 ] as const
 ).map((method) => (
 <label
 key={method.id}
 className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
 >
 <input
 type="radio"
 name="payment"
 checked={paymentMethod === method.id}
 onChange={() => setPaymentMethod(method.id)}
 className="accent-primary"
 />
 <span className="font-medium">{method.label}</span>
 </label>
 ))}
 </fieldset>
 <PaymentBadges />
 <label className="flex items-start gap-2 text-sm text-muted-foreground">
 <input
 type="checkbox"
 checked={form.marketing}
 onChange={(e) =>
 setForm({ ...form, marketing: e.target.checked })
 }
 className="mt-1 accent-primary"
 />
 Chcę otrzymywać informacje o nowych kolekcjach i limitowanych
 edycjach.
 </label>
 <div className="flex gap-3">
 <Button variant="outline" onClick={() => setStep(1)}>
 Wstecz
 </Button>
 <Button
 className="flex-1 h-12"
 disabled={loading}
 onClick={() => void handleSubmit()}
 >
 {loading ? "Przetwarzanie…" : `Zapłać ${formatPrice(total)}`}
 </Button>
 </div>
 <p className="text-xs text-muted-foreground text-center">
 Bezpieczna płatność · Szyfrowane połączenie SSL
 </p>
 </div>
 )}
 </div>

 <div className="h-fit rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
 <h2 className="font-semibold">Twoje zamówienie</h2>
 <ul className="mt-4 space-y-2 text-sm">
 {items.map((item) => (
 <li key={item.id} className="flex justify-between gap-2">
 <span className="text-muted-foreground">
 {item.productName} × {item.quantity}
 </span>
 <span>{formatPrice(item.price * item.quantity)}</span>
 </li>
 ))}
 </ul>
 <dl className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
 <div className="flex justify-between">
 <dt className="text-muted-foreground">Razem</dt>
 <dd className="font-semibold text-primary">{formatPrice(total)}</dd>
 </div>
 </dl>
 </div>
 </div>
 </div>
 );
}
