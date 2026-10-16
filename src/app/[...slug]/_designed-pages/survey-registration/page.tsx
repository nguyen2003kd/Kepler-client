import { constructMetadata } from "@/lib/seo";
import SurveyRegistrationView from "./_views/survey-registration-view";

export const metadata = constructMetadata({
  title: "Đăng ký khảo sát tài sản",
  description:
    "Đăng ký khảo sát tài sản trực tiếp Kepler Group: thông tin tài sản, địa chỉ khảo sát, thời gian đề xuất và người liên hệ.",
  url: "/survey-registration",
});

export default function SurveyRegistrationPage() {
  return <SurveyRegistrationView />;
}
