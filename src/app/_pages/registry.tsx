import { Suspense, type ComponentType } from "react";
import { redirect } from "next/navigation";

import AboutPage from "./about/page";
import AboutBoardOfDirectorsPage from "./about/board-of-directors/page";
import AboutCapabilityProfilePage from "./about/capability-profile/page";
import AboutCapabilitiesPage from "./about/capabilities/page";
import AboutCertificationsPage from "./about/certifications/page";
import AboutCompanyOverviewPage from "./about/company-overview/page";
import AboutExpertCouncilPage from "./about/expert-council/page";
import AboutHistoryPage from "./about/history/page";
import AboutMainServicesPage from "./about/main-services/page";
import AboutOrganizationalChartPage from "./about/organizational-chart/page";
import AboutVisionMissionPage from "./about/vision-mission/page";
import AppraisalRequestPage from "./appraisal-request/page";
import BookingPage from "./booking/page";
import WhoCanJoinPage from "./ai-co-the-tham-gia/page";
import CareersPage from "./careers/page";
import CertificationPage from "./certification/page";
import CookiePolicyPage from "./chinh-sach-cookie/page";
import PrivacyPolicyPage from "./chinh-sach-bao-mat/page";
import ExpertsPage from "./chuyen-gia/page";
import ContactPage from "./contact/page";
import CustomersPage from "./customers/page";
import CustomersPartnersPage from "./customers-partners/page";
import EcosystemIntroPage from "./gioi-thieu-he-sinh-thai-bat-dong-san/page";
import BizOfficePage from "./he-sinh-thai/bizoffice/page";
import KHomesPage from "./he-sinh-thai/k-homes/page";
import KacAdvisoryPage from "./he-sinh-thai/kac-advisory/page";
import KeplerLandPage from "./he-sinh-thai/kepler-land/page";
import KeplerPropertyPage from "./he-sinh-thai/kepler-property/page";
import KmcManagementPage from "./he-sinh-thai/kmc-management/page";
import KpcAppraisalPage from "./he-sinh-thai/kpc-appraisal/page";
import MaConsultingPage from "./ma-consulting/page";
import NewsPage from "./news/page";
import PartnersPage from "./partners/page";
import RealHubPage from "./realhub/page";
import ServicesPage from "./services/page";
import ReportSubscriptionPage from "./report-subscription/page";
import SearchPage from "./search/page";
import SurveyRegistrationPage from "./survey-registration/page";
import ProjectsPage from "./du-an/page";
import FAQPage from "./faq/page";
import TermsOfUsePage from "./dieu-khoan-su-dung/page";
import SanGiaoDichPage from "./san-giao-dich/page";
import ExpertJoinPage from "./tham-gia-doi-ngu-chuyen-gia/page";
import OfflineActivitiesPage from "./tham-gia-sinh-hoat-thuong-nhat/page";
import OnlinePlatformPage from "./tham-gia-tren-nen-tang-cong-nghe/page";

function EcosystemRedirect() {
  redirect("/he-sinh-thai/kepler-property");
  return null;
}

function SanGiaoDichFallback() {
  return <SanGiaoDichPage searchParams={Promise.resolve({})} />;
}

// Trang "use client" dung useSearchParams phai duoc bao Suspense khi render
// tu server component (catch-all), neu Next.js se bao loi CSR bailout.
function SearchPageSuspense() {
  return (
    <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
      <SearchPage />
    </Suspense>
  );
}

// Key = segment cuoi cua path (pages.path trong DB chi luu segment cuoi).
export const DESIGNED_PAGE_COMPONENTS: Record<string, ComponentType> = {
  about: AboutPage,
  "appraisal-request": AppraisalRequestPage,
  "board-of-directors": AboutBoardOfDirectorsPage,
  booking: BookingPage,
  careers: CareersPage,
  "capability-profile": AboutCapabilityProfilePage,
  capabilities: AboutCapabilitiesPage,
  certification: CertificationPage,
  certifications: AboutCertificationsPage,
  "chinh-sach-bao-mat": PrivacyPolicyPage,
  "chinh-sach-cookie": CookiePolicyPage,
  "chuyen-gia": ExpertsPage,
  "company-overview": AboutCompanyOverviewPage,
  "expert-council": AboutExpertCouncilPage,
  faq: FAQPage,
  history: AboutHistoryPage,
  "ma-consulting": MaConsultingPage,
  "main-services": AboutMainServicesPage,
  news: NewsPage,
  "organizational-chart": AboutOrganizationalChartPage,
  "vision-mission": AboutVisionMissionPage,
  "ai-co-the-tham-gia": WhoCanJoinPage,
  contact: ContactPage,
  customers: CustomersPage,
  "customers-partners": CustomersPartnersPage,
  "dieu-khoan-su-dung": TermsOfUsePage,
  "du-an": ProjectsPage,
  "gioi-thieu-he-sinh-thai-bat-dong-san": EcosystemIntroPage,
  "he-sinh-thai": EcosystemRedirect,
  bizoffice: BizOfficePage,
  "k-homes": KHomesPage,
  "kac-advisory": KacAdvisoryPage,
  "kepler-land": KeplerLandPage,
  "kepler-property": KeplerPropertyPage,
  "kmc-management": KmcManagementPage,
  "kpc-appraisal": KpcAppraisalPage,
  partners: PartnersPage,
  realhub: RealHubPage,
  "san-giao-dich": SanGiaoDichFallback,
  "report-subscription": ReportSubscriptionPage,
  search: SearchPageSuspense,
  services: ServicesPage,
  "survey-registration": SurveyRegistrationPage,
  "tham-gia-doi-ngu-chuyen-gia": ExpertJoinPage,
  "tham-gia-sinh-hoat-thuong-nhat": OfflineActivitiesPage,
  "tham-gia-tren-nen-tang-cong-nghe": OnlinePlatformPage,
};
