import { NextResponse } from "next/server";

import type { CartLineItem } from "@/types/cart";
import type { PaymentMethod, ShippingMethod } from "@/types/order";

interface CheckoutBody {
 customer: {
 name: string;
 email: string;
 phone: string;
 address: string;
 city: string;
 postal: string;
 apartment?: string;
 marketing?: boolean;
 };
 shippingMethod: ShippingMethod;
 paymentMethod: PaymentMethod;
 items: CartLineItem[];
 subtotal: number;
 shippingCost: number;
 total: number;
}

function generateOrderNumber(): string {
 const year = new Date().getFullYear();
 const seq = Math.floor(Math.random() * 90000) + 10000;
 return `HC-${year}-${seq}`;
}

export async function POST(request: Request) {
 try {
 const body = (await request.json()) as CheckoutBody;

 if (!body.customer?.email || !body.customer?.name || !body.items?.length) {
 return NextResponse.json(
 { error: "Nieprawidłowe dane zamówienia" },
 { status: 400 },
 );
 }

 const serverSubtotal = body.items.reduce(
 (sum, item) => sum + item.price * item.quantity,
 0,
 );

 if (serverSubtotal !== body.subtotal) {
 return NextResponse.json(
 { error: "Niezgodność kwoty zamówienia" },
 { status: 400 },
 );
 }

 const orderNumber = generateOrderNumber();

 // In production: persist to DB, redirect to PayU/Przelewy24
 console.info("[checkout]", {
 orderNumber,
 email: body.customer.email,
 total: body.total,
 items: body.items.length,
 payment: body.paymentMethod,
 });

 return NextResponse.json({
 orderNumber,
 status: "pending",
 paymentUrl: null,
 });
 } catch {
 return NextResponse.json(
 { error: "Błąd serwera" },
 { status: 500 },
 );
 }
}
