import { constructMetadata } from "@/lib/seo";
import ReportSubscriptionView from "./_views/report-subscription-view";

export const metadata = constructMetadata({
  title: "Đăng ký nhận báo cáo",
  description:
    "Đăng ký nhận báo cáo Kepler Group: họ tên, email, doanh nghiệp và nhóm báo cáo quan tâm.",
  url: "/report-subscription",
});

export default function ReportSubscriptionPage() {
  return <ReportSubscriptionView />;
}
