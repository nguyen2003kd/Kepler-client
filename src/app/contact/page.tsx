import { constructMetadata } from "@/lib/seo";
import ContactContent from "./contact-content";

export const metadata = constructMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Kepler Property để nhận tư vấn BĐS miễn phí. Hotline, email và văn phòng tại TP.HCM.",
  url: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
