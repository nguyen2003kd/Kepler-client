import { constructMetadata } from "@/lib/seo";
import BookingView from "./_views/booking-view";

export const metadata = constructMetadata({
  title: "Đặt lịch tư vấn",
  description:
    "Đặt lịch tư vấn với đội ngũ chuyên gia Kepler Group: thông tin người đăng ký, nhu cầu tư vấn, thời gian mong muốn và ghi chú.",
  url: "/booking",
});

export default function BookingPage() {
  return <BookingView />;
}
