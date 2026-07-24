import { constructMetadata } from "@/lib/seo";
import ListingPage from "@/components/listing-page";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "Mua bán BĐS",
  description: "Tìm BĐS đang bán: căn hộ, nhà phố, biệt thự, đất nền, shophouse. Lọc theo loại BĐS, diện tích và khu vực.",
  url: "/apartments-for-sale",
  keywords: ["mua bán BĐS", "căn hộ bán", "nhà phố bán", "biệt thự", "đất nền", "shophouse", "BĐS TP.HCM"],
});

export default function SalePage() {
  return (
    <Suspense>
      <ListingPage mode="sale" />
    </Suspense>
  );
}
