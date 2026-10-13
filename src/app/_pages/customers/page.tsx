import { constructMetadata } from "@/lib/seo";
import CustomersView from "./_views/customers-view";

export const metadata = constructMetadata({
  title: "Khách hàng tiêu biểu",
  description:
    "Khách hàng tiêu biểu của Kepler Group: logo khách hàng, case study, testimonials, video khách hàng và những câu chuyện đồng hành.",
  url: "/customers",
});

export default function CustomersPage() {
  return <CustomersView />;
}
