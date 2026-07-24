import { constructMetadata } from "@/lib/seo";
import NewsDetailContent from "./news-detail-content";
import { notFound } from "next/navigation";
import { NEWS } from "@/constants/kepler-data";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props) {
  const item = NEWS.find((n) => n.id === params.id);
  if (!item) return constructMetadata({ title: "Không tìm thấy", url: `/news/${params.id}` });

  return constructMetadata({
    title: item.title,
    description: item.excerpt,
    url: `/news/${item.id}`,
    keywords: [item.category, "tin tức BĐS", "Kepler Property"],
  });
}

export function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.id }));
}

export default function NewsDetailPage({ params }: Props) {
  const item = NEWS.find((n) => n.id === params.id);
  if (!item) notFound();
  return <NewsDetailContent item={item} />;
}
