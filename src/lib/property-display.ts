import type { Property } from "@/api/models/property";
export const marketplaceGroups = [
  {
    value: "SALE",
    code: "CAT-025",
    name: "Mua và bán",
    link: "/mua-va-ban-nha-le",
  },
  {
    value: "RENT",
    code: "CAT-026",
    name: "Thuê và cho thuê",
    link: "/thue-va-cho-thue",
  },
  {
    value: "DISTRIBUTION",
    code: "CAT-027",
    name: "Dự án phân phối",
    link: "/du-an-phan-phoi",
  },
  {
    value: "INVESTMENT",
    code: "CAT-028",
    name: "Dự án kêu gọi đầu tư",
    link: "/du-an-keu-goi-dau-tu",
  },
  {
    value: "MA",
    code: "CAT-029",
    name: "Dự án cần M&A",
    link: "/du-an-can-ma",
  },
] as const;
export const priceUnits: Record<string, string> = {
  VND: "đồng",
  VND_MONTH: "đồng/tháng",
  VND_M2: "đồng/m²",
  VND_M2_MONTH: "đồng/m²/tháng",
  USD: "USD",
  USD_MONTH: "USD/tháng",
  USD_M2: "USD/m²",
  USD_M2_MONTH: "USD/m²/tháng",
};
export function propertyPrice(property: Property) {
  return property.price == null
    ? "Liên hệ để biết giá"
    : `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(Number(property.price))} ${priceUnits[property.price_unit || "VND"] || ""}`;
}
export function priceTab(group?: string | null) {
  return group === "RENT"
    ? "Giá thuê"
    : group === "INVESTMENT"
      ? "Giá / vốn đầu tư"
      : group === "MA"
        ? "Giá chuyển nhượng"
        : "Giá bán";
}
