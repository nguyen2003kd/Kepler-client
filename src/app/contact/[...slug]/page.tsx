import { Metadata } from "next";
import DynamicContactForm from "../components/dynamic-contact-form";

interface ContactSubPageProps {
  params: { slug: string[] };
}

const CONTACT_TITLES: Record<string, string> = {
  "lien-he-kepler": "Liên hệ Kepler",
  "lien-he-hop-tac": "Liên hệ hợp tác",
  "yeu-cau-ban-cho-thue": "Yêu cầu bán/cho thuê BĐS",
  "yeu-cau-tham-dinh-gia": "Yêu cầu thẩm định giá",
  "yeu-cau-dich-vu": "Yêu cầu dịch vụ BĐS",
  "tu-van-thuong-vu-ma": "Tư vấn thương vụ M&A",
  "dat-lich-hen-chuyen-gia": "Đặt lịch hẹn chuyên gia",
};

export async function generateMetadata({ params }: ContactSubPageProps): Promise<Metadata> {
  const slug = params.slug[0];
  const title = CONTACT_TITLES[slug] || "Liên hệ";
  return { title: `${title} | Kepler Property` };
}

export default function ContactSubPage({ params }: ContactSubPageProps) {
  const formType = params.slug[0];
  return <DynamicContactForm formType={formType} />;
}
