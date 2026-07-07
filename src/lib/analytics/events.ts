/* eslint-disable @typescript-eslint/no-explicit-any */

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const w = window as any;
  if (w.gtag) {
    w.gtag("event", name, params);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, params);
  }
}

export const analyticsEvents = {
  viewItem: (product: { slug: string; name: string; price: number }) =>
    trackEvent("view_item", {
      item_id: product.slug,
      item_name: product.name,
      value: product.price / 100,
      currency: "PLN",
    }),
  addToCart: (product: { slug: string; name: string; price: number }) =>
    trackEvent("add_to_cart", {
      item_id: product.slug,
      item_name: product.name,
      value: product.price / 100,
      currency: "PLN",
    }),
  beginCheckout: (value: number) =>
    trackEvent("begin_checkout", { value: value / 100, currency: "PLN" }),
  purchase: (orderNumber: string, value: number) =>
    trackEvent("purchase", {
      transaction_id: orderNumber,
      value: value / 100,
      currency: "PLN",
    }),
  skinUpload: (success: boolean) =>
    trackEvent("skin_upload", { success }),
  skinPreview3d: () => trackEvent("skin_preview_3d"),
  filterApplied: (filters: Record<string, string>) =>
    trackEvent("filter_applied", filters),
  search: (query: string, resultsCount: number) =>
    trackEvent("search", { search_term: query, results_count: resultsCount }),
};
