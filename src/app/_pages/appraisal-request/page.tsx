import { constructMetadata } from "@/lib/seo";
import AppraisalRequestView from "./_views/appraisal-request-view";

export const metadata = constructMetadata({
  title: "Yêu cầu thẩm định",
  description:
    "Gửi yêu cầu thẩm định tài sản Kepler Group: loại tài sản, mục đích thẩm định, địa điểm và hồ sơ đính kèm.",
  url: "/appraisal-request",
});

export default function AppraisalRequestPage() {
  return <AppraisalRequestView />;
}
