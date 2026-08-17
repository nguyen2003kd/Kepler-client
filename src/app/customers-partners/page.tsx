import { constructMetadata } from "@/lib/seo";
import CustomersPartnersView from "./_views/customers-partners-view";

export const metadata = constructMetadata({
  title: "Khách hàng & Đối tác",
  description:
    "Khách hàng tiêu biểu và mạng lưới đối tác chiến lược của Kepler Group.",
  url: "/customers-partners",
});

export default function CustomersPartnersPage() {
  return <CustomersPartnersView />;
}
