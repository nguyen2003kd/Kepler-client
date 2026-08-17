import { constructMetadata } from "@/lib/seo";
import MaConsultingView from "./_views/ma-consulting-view";

export const metadata = constructMetadata({
  title: "Tư vấn M&A",
  description:
    "Đăng ký tư vấn M&A Kepler Group: nhu cầu bên mua/bên bán, thông tin doanh nghiệp/dự án và file đính kèm.",
  url: "/ma-consulting",
});

export default function MaConsultingPage() {
  return <MaConsultingView />;
}
