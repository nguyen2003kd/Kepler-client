import { constructMetadata } from "@/lib/seo";
import ListingPage from "@/components/listing-page";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "Cho thuê BĐS",
  description: "Tìm BĐS cho thuê: căn hộ, nhà, văn phòng, biệt thự, officetel. Lọc theo loại BĐS và diện tích.",
  url: "/apartments-for-rent",
  keywords: ["cho thuê BĐS", "căn hộ cho thuê", "nhà cho thuê", "văn phòng cho thuê", "biệt thự cho thuê", "officetel TP.HCM"],
});

export default function RentPage() {
  return (
    <Suspense>
      <ListingPage mode="rent" />
    </Suspense>
  );
}
