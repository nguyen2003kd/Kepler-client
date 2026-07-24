import { constructMetadata } from "@/lib/seo";
import NewsContent from "./news-content";

export const metadata = constructMetadata({
  title: "Tin tức BĐS",
  description: "Cập nhật xu hướng thị trường, quy hoạch và tư vấn đầu tư BĐS mới nhất.",
  url: "/news",
  keywords: ["tin tức BĐS", "thị trường bất động sản", "tư vấn BĐS", "quy hoạch TP.HCM", "đầu tư BĐS"],
});

export default function NewsPage() {
  return <NewsContent />;
}
