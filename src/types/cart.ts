export interface CartLineItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  customSkinUrl?: string;
  minecraftNick?: string;
}

export interface Cart {
  items: CartLineItem[];
  updatedAt: string;
}
