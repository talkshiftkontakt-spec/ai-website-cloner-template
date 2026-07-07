import type { ShippingMethod } from "@/types/order";

const SHIPPING_COSTS: Record<ShippingMethod, number> = {
 courier: 1500,
 inpost: 1200,
};

export function getShippingCost(method: ShippingMethod): number {
 return SHIPPING_COSTS[method];
}

export function getShippingLabel(method: ShippingMethod): string {
 switch (method) {
 case "courier":
 return "Kurier: dostawa pod adres";
 case "inpost":
 return "Paczkomat InPost";
 default: {
 const _exhaustive: never = method;
 return _exhaustive;
 }
 }
}

export function getDeliveryEstimate(): string {
 return "3 do 5 dni roboczych + 1 do 2 dni wysyłki";
}

export const FREE_SHIPPING_THRESHOLD = 30000;

export function qualifiesForFreeShipping(subtotal: number): boolean {
 return subtotal >= FREE_SHIPPING_THRESHOLD;
}
