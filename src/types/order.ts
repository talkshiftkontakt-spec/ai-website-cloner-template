export type OrderStatus =
  | "pending"
  | "paid"
  | "production"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ShippingMethod = "courier" | "inpost";

export type PaymentMethod = "blik" | "card" | "transfer";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  apartment?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  customer: CustomerInfo;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: "PLN";
  createdAt: string;
  lineItemCount: number;
}
