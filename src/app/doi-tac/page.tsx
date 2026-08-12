import { constructMetadata } from "@/lib/seo";
import DoiTacView from "./_views/doi-tac-view";

export const metadata = constructMetadata({
  title: "Đối tác chiến lược",
  description:
    "Mạng lưới đối tác chiến lược của Kepler Group: ngân hàng, quỹ đầu tư, luật, kiến trúc, nhà thầu, công nghệ, marketing và đơn vị tư vấn.",
  url: "/doi-tac",
});

export default function DoiTacPage() {
  return <DoiTacView />;
}
