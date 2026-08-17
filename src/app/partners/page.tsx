import { constructMetadata } from "@/lib/seo";
import PartnersView from "./_views/partners-view";

export const metadata = constructMetadata({
  title: "Đối tác chiến lược",
  description:
    "Mạng lưới đối tác chiến lược của Kepler Group: ngân hàng, quỹ đầu tư, luật, kiến trúc, nhà thầu, công nghệ, marketing và đơn vị tư vấn.",
  url: "/partners",
});

export default function PartnersPage() {
  return <PartnersView />;
}
