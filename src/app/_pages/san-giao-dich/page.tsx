import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { resolveMarketplacePage } from "./marketplace-page";

export const metadata = constructMetadata({
  title: "Sàn giao dịch và dự án",
  description:
    "Mua và bán, thuê và cho thuê, dự án phân phối, dự án kêu gọi đầu tư và dự án cần M&A của Kepler.",
  url: "/san-giao-dich",
});

export default async function SanGiaoDichPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const query = await searchParams;
  const page = await resolveMarketplacePage("/san-giao-dich", query.page);
  if (!page) notFound();
  return page;
}
