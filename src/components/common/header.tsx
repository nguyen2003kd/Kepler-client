"use client";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import { useGetApiV10Category } from "@/api/endpoints/category";
import "@/i18n";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import type { NavItem } from "@/types";
import type { MenuItem as MenuItemType } from "@/types/menu";
import { LanguageSwitcher } from "@components/common/components/language-switcher";
import { MenuItem } from "@components/common/components/menu-item";
import { UserNav } from "@components/common/user-nav";
import { Skeleton } from "@components/ui/skeleton";
import { cva } from "class-variance-authority";
import links from "@/lib/links";
import type { Logo } from "@/api/models/logo";
import { getResponsiveImage } from "@/lib/responsive-image";
import {
  // Briefcase,
  // Calendar,
  ChevronDown,
  FileText,
  Headphones,
  Menu,
  Phone,
  Search,
  User,
  UserPen,
  X,
} from "lucide-react";
import Image from "@/components/common/safe-image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { useTranslation } from "react-i18next";
interface HeaderProps {
  navItems?: NavItem[];
  className?: string;
}

type HeaderMenuItem = MenuItemType & {
  useCategoryQuery?: boolean;
  children?: HeaderMenuItem[];
  categories?: HeaderMenuItem[];
};
interface LogoWithFile extends Logo {
  file?: {
    path?: string;
    compress_info?: Record<string, string>;
    name?: string;
  };
}

const withCategoryQueryMode = (
  items: HeaderMenuItem[],
  enabled: boolean,
): HeaderMenuItem[] => {
  return items.map((item) => {
    const rawChildren = item.children || item.categories || [];
    return {
      ...item,
      useCategoryQuery: enabled,
      children: withCategoryQueryMode(rawChildren, enabled),
    };
  });
};
export const headerRoot = cva("header-base", {
  variants: {
    variant: {
      default: "bg-white shadow-sm",
      // customer: 'header-sticky border-accent border-b bg-cover bg-center',
      // admin: 'header-sticky border-accent border-b',
      // auth: 'bg-header-primary'
    },
    scrolled: {
      true: "bg-white bg-cover bg-center shadow-md transition-all duration-300",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      scrolled: true,
      className: "bg-cover bg-center shadow-md transition-all duration-300",
    },
    {
      variant: "default",
      scrolled: false,
      className:
        " bg-white relative w-full overflow-visible transition-all duration-300",
    },
  ],
  defaultVariants: {
    variant: "default",
    scrolled: false,
  },
});

export default function Header({ navItems = [], className }: HeaderProps) {
  const { t } = useTranslation("header");
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { ref: navRef, isDragging } = useDragScroll<HTMLElement>();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const { data: logoData } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  // Scroll navigation functions
  const scrollMenu = (direction: "left" | "right") => {
    if (navRef.current) {
      const scrollAmount = 200;
      navRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (navRef.current && !isDragging) {
      e.preventDefault();
      const scrollAmount = e.deltaY * 0.8;
      navRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      checkScrollPosition();
      nav.addEventListener("scroll", checkScrollPosition);
      nav.addEventListener("wheel", handleWheel as EventListener, { passive: false });
      window.addEventListener("resize", checkScrollPosition);
      return () => {
        nav.removeEventListener("scroll", checkScrollPosition);
        nav.removeEventListener("wheel", handleWheel as EventListener);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [isDragging]);

  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = logoInfo?.file?.compress_info
    ? getResponsiveImage(logoInfo.file.compress_info)
    : logoInfo?.file?.path
      ? `${links.storageEndpoint}${logoInfo.file.path}`
      : "/seo.png";

  // Fetch categories from API with current language
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category(
    { language: currentLang },
    {
    query: {
      staleTime: 1000 * 30,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
    },
  );

  // Auth state
  const { email, first_name, last_name } = useAuthStore();
  const isAuthenticated = !!email;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultNavItems: NavItem[] = [
    {
      id: "1",
      name: "Trang chủ",
      type: "",
      content_type: "",
      link: "/",
      sequence: 1,
      display: true,
      parent_id: null,
    },
    {
      id: "2",
      name: "Giới thiệu",
      type: "",
      content_type: "",
      link: "/about",
      sequence: 2,
      display: true,
      parent_id: null,
      children: [
        {
          id: "2-1",
          name: "Tổng quan",
          type: "",
          content_type: "",
          link: "/about/overview",
          sequence: 1,
          display: true,
          parent_id: "2",
          children: [
            {
              id: "2-1-1",
              name: "Lịch sử hình thành",
              type: "",
              content_type: "",
              link: "/about/overview/history",
              sequence: 1,
              display: true,
              parent_id: "2-1",
            },
            {
              id: "2-1-2",
              name: "Cơ cấu tổ chức",
              type: "",
              content_type: "",
              link: "/about/overview/organization",
              sequence: 2,
              display: true,
              parent_id: "2-1",
            },
          ],
        },
        {
          id: "2-2",
          name: "Tầm nhìn & Sứ mệnh",
          type: "",
          content_type: "",
          link: "/about/vision-mission",
          sequence: 2,
          display: true,
          parent_id: "2",
          children: [
            {
              id: "2-2-1",
              name: "Giá trị cốt lõi",
              type: "",
              content_type: "",
              link: "/about/vision-mission/core-values",
              sequence: 1,
              display: true,
              parent_id: "2-2",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Dịch vụ",
      type: "",
      content_type: "",
      link: "/services",
      sequence: 3,
      display: true,
      parent_id: null,
      children: [
        {
          id: "3-1",
          name: "Tư vấn pháp lý",
          type: "",
          content_type: "",
          link: "/services/legal-consulting",
          sequence: 1,
          display: true,
          parent_id: "3",
          children: [
            {
              id: "3-1-1",
              name: "Doanh nghiệp vừa và nhỏ",
              type: "",
              content_type: "",
              link: "/services/legal-consulting/sme",
              sequence: 1,
              display: true,
              parent_id: "3-1",
            },
            {
              id: "3-1-2",
              name: "Khởi nghiệp",
              type: "",
              content_type: "",
              link: "/services/legal-consulting/startup",
              sequence: 2,
              display: true,
              parent_id: "3-1",
            },
          ],
        },
        {
          id: "3-2",
          name: "Hỗ trợ tài chính",
          type: "",
          content_type: "",
          link: "/services/financial-support",
          sequence: 2,
          display: true,
          parent_id: "3",
          children: [
            {
              id: "3-2-1",
              name: "Vốn vay ưu đãi",
              type: "",
              content_type: "",
              link: "/services/financial-support/loans",
              sequence: 1,
              display: true,
              parent_id: "3-2",
            },
            {
              id: "3-2-2",
              name: "Quỹ đầu tư",
              type: "",
              content_type: "",
              link: "/services/financial-support/funds",
              sequence: 2,
              display: true,
              parent_id: "3-2",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Tin tức",
      type: "",
      content_type: "",
      link: "/news",
      sequence: 4,
      display: true,
      parent_id: null,
      children: [
        {
          id: "4-1",
          name: "Tin SME",
          type: "",
          content_type: "",
          link: "/news/sme",
          sequence: 1,
          display: true,
          parent_id: "4",
          children: [
            {
              id: "4-1-1",
              name: "Hoạt động nổi bật",
              type: "",
              content_type: "",
              link: "/news/sme/activities",
              sequence: 1,
              display: true,
              parent_id: "4-1",
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Liên hệ",
      type: "",
      content_type: "",
      link: "/contact",
      sequence: 7,
      display: true,
      parent_id: null,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contactItem: HeaderMenuItem = {
    id: "contact",
    name: t("contact"),
    type: "",
    content_type: "",
    link: "/contact",
    sequence: 999,
    display: true,
    parent_id: null,
    children: [
      {
        id: "contact-overview",
        name: t("contactOverview"),
        type: "",
        content_type: "",
        link: "/contact",
        sequence: 1,
        display: true,
        parent_id: "contact",
      },
      {
        id: "booking",
        name: t("booking"),
        type: "",
        content_type: "",
        link: "/booking",
        sequence: 2,
        display: true,
        parent_id: "contact",
      },
      {
        id: "appraisal-request",
        name: t("appraisalRequest"),
        type: "",
        content_type: "",
        link: "/appraisal-request",
        sequence: 4,
        display: true,
        parent_id: "contact",
      },
      {
        id: "ma-consulting",
        name: t("maConsulting"),
        type: "",
        content_type: "",
        link: "/ma-consulting",
        sequence: 5,
        display: true,
        parent_id: "contact",
      },
      {
        id: "survey-registration",
        name: t("surveyRegistration"),
        type: "",
        content_type: "",
        link: "/survey-registration",
        sequence: 6,
        display: true,
        parent_id: "contact",
      },
      {
        id: "report-subscription",
        name: t("reportSubscription"),
        type: "",
        content_type: "",
        link: "/report-subscription",
        sequence: 7,
        display: true,
        parent_id: "contact",
      },
    ],
  };

  const kienThucItem: HeaderMenuItem = {
    id: "kien-thuc",
    name: t("kienThuc"),
    type: "",
    content_type: "",
    link: "/kien-thuc",
    sequence: 5,
    display: true,
    parent_id: null,
    children: [
      {
        id: "kien-thuc-overview",
        name: t("kienThucOverview"),
        type: "",
        content_type: "",
        link: "/kien-thuc",
        sequence: 1,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-thi-truong",
        name: t("kienThucThiTruong"),
        type: "",
        content_type: "",
        link: "/kien-thuc/thi-truong",
        sequence: 2,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-nghien-cuu-bao-cao",
        name: t("kienThucNghienCuuBaoCao"),
        type: "",
        content_type: "",
        link: "/kien-thuc/nghien-cuu-bao-cao",
        sequence: 3,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-quy-hoach",
        name: t("kienThucQuyHoach"),
        type: "",
        content_type: "",
        link: "/kien-thuc/quy-hoach",
        sequence: 4,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-phap-ly",
        name: t("kienThucPhapLy"),
        type: "",
        content_type: "",
        link: "/kien-thuc/phap-ly",
        sequence: 5,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-dau-tu",
        name: t("kienThucDauTu"),
        type: "",
        content_type: "",
        link: "/kien-thuc/dau-tu",
        sequence: 6,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-tham-dinh-gia",
        name: t("kienThucThamDinhGia"),
        type: "",
        content_type: "",
        link: "/kien-thuc/tham-dinh-gia-tai-chinh",
        sequence: 7,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-quan-ly-van-hanh",
        name: t("kienThucQuanLyVanHanh"),
        type: "",
        content_type: "",
        link: "/kien-thuc/quan-ly-van-hanh",
        sequence: 8,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-kien-truc",
        name: t("kienThucKienTruc"),
        type: "",
        content_type: "",
        link: "/kien-thuc/kien-truc-xay-dung",
        sequence: 9,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-hoat-dong",
        name: t("kienThucHoatDong"),
        type: "",
        content_type: "",
        link: "/kien-thuc/hoat-dong-kepler",
        sequence: 10,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-video",
        name: t("kienThucVideo"),
        type: "",
        content_type: "",
        link: "/kien-thuc/video",
        sequence: 11,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-podcast",
        name: t("kienThucPodcast"),
        type: "",
        content_type: "",
        link: "/kien-thuc/podcast",
        sequence: 12,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "kien-thuc-webinar",
        name: t("kienThucWebinar"),
        type: "",
        content_type: "",
        link: "/kien-thuc/webinar",
        sequence: 13,
        display: true,
        parent_id: "kien-thuc",
      },
      {
        id: "faq",
        name: t("faq"),
        type: "",
        content_type: "",
        link: "/faq",
        sequence: 14,
        display: true,
        parent_id: "kien-thuc",
      },
    ],
  };

  const aboutItem: HeaderMenuItem = {
    id: "about",
    name: t("menu:about"),
    type: "",
    content_type: "",
    link: "/about",
    sequence: 2,
    display: true,
    parent_id: null,
    children: [
      {
        id: "about-overview",
        name: t("aboutOverview"),
        type: "",
        content_type: "",
        link: "/about",
        sequence: 1,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-company-overview",
        name: t("aboutCompanyOverview"),
        type: "",
        content_type: "",
        link: "/about/company-overview",
        sequence: 2,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-vision-mission",
        name: t("aboutVisionMission"),
        type: "",
        content_type: "",
        link: "/about/vision-mission",
        sequence: 3,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-history",
        name: t("aboutHistory"),
        type: "",
        content_type: "",
        link: "/about/history",
        sequence: 4,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-organizational-structure",
        name: t("aboutOrganizationalChart"),
        type: "",
        content_type: "",
        link: "/about/organizational-chart",
        sequence: 5,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-board-of-directors",
        name: t("aboutBoardOfDirectors"),
        type: "",
        content_type: "",
        link: "/about/board-of-directors",
        sequence: 6,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-expert-council",
        name: t("aboutExpertCouncil"),
        type: "",
        content_type: "",
        link: "/about/expert-council",
        sequence: 7,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-capabilities",
        name: t("aboutCapabilities"),
        type: "",
        content_type: "",
        link: "/about/capabilities",
        sequence: 8,
        display: true,
        parent_id: "about",
      },
      // TODO: Không có trong list khách gửi — tạm ẩn
      // {
      //   id: "about-branches-offices",
      //   name: t("aboutBranchesOffices"),
      //   type: "",
      //   content_type: "",
      //   link: "/about/branches-offices",
      //   sequence: 9,
      //   display: true,
      //   parent_id: "about",
      // },
      {
        id: "about-certifications",
        name: t("aboutCertifications"),
        type: "",
        content_type: "",
        link: "/about/certifications",
        sequence: 10,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-capability-profile",
        name: t("aboutCapabilityProfile"),
        type: "",
        content_type: "",
        link: "/about/capability-profile",
        sequence: 11,
        display: true,
        parent_id: "about",
      },
    ],
  };

  const customersPartnersItem: HeaderMenuItem = {
    id: "customers-partners",
    name: t("customersPartners"),
    type: "",
    content_type: "",
    link: "/customers-partners",
    sequence: 6,
    display: true,
    parent_id: null,
    children: [
      {
        id: "customers-partners-overview",
        name: t("customersPartnersOverview"),
        type: "",
        content_type: "",
        link: "/customers-partners",
        sequence: 1,
        display: true,
        parent_id: "customers-partners",
      },
      {
        id: "customers",
        name: t("customers"),
        type: "",
        content_type: "",
        link: "/customers",
        sequence: 2,
        display: true,
        parent_id: "customers-partners",
      },
      {
        id: "partners",
        name: t("partners"),
        type: "",
        content_type: "",
        link: "/partners",
        sequence: 3,
        display: true,
        parent_id: "customers-partners",
      },
    ],
  };

  const baseNavigation: HeaderMenuItem[] = categoriesData?.responseData?.length
    ? withCategoryQueryMode(
        categoriesData.responseData as unknown as HeaderMenuItem[],
        true,
      )
    : withCategoryQueryMode(
        (navItems.length > 0 ? navItems : defaultNavItems) as HeaderMenuItem[],
        false,
      );

  // Inject "Chứng nhận" vào children của "Năng lực" (TẠM THỜI ẨN)
  // TODO: Uncomment khi cần hiển thị certification
  /*
  const navigationWithCertification = baseNavigation.map((item) => {
    const itemWithChildren = item as HeaderMenuItem;
    // Kiểm tra nếu là category "Năng lực" (theo link hoặc name)
    if (
      itemWithChildren.link?.includes("/nang-luc") ||
      itemWithChildren.name?.toLowerCase().includes("năng lực")
    ) {
      const hasCertification = (itemWithChildren.children || []).some(
        (child) => child.link === "/certification"
      );
      if (!hasCertification) {
        return {
          ...itemWithChildren,
          children: [
            ...(itemWithChildren.children || []),
            {
              id: "certification",
              name: "Chứng nhận, công nhận, chỉ định",
              link: "/certification",
              type: "",
              content_type: "",
              sequence: 999,
              display: true,
              parent_id: itemWithChildren.id,
              useCategoryQuery: false,
            },
          ],
        };
      }
    }
    return itemWithChildren;
  });

  const navigation = navigationWithCertification;
  */
  const navigation = baseNavigation;

  const filteredNavigation = navigation.filter(
    (item) => item.link !== "/contact" && item.link !== "/about",
  );

  const pinnedItems: HeaderMenuItem[] = [
    {
      id: "pinned-services",
      name: "Dịch vụ",
      type: "",
      content_type: "",
      link: "/services",
      sequence: 3,
      display: true,
      parent_id: null,
      children: [
        { id: "svc-1", name: "Tư vấn đầu tư", type: "", content_type: "", link: "/services/tu-van-dau-tu", sequence: 1, display: true, parent_id: "pinned-services" },
        { id: "svc-2", name: "Thẩm định giá", type: "", content_type: "", link: "/services/tham-dinh-gia", sequence: 2, display: true, parent_id: "pinned-services" },
        { id: "svc-3", name: "Phát triển dự án", type: "", content_type: "", link: "/services/phat-trien-du-an", sequence: 3, display: true, parent_id: "pinned-services" },
        { id: "svc-4", name: "Quản lý BĐS", type: "", content_type: "", link: "/services/quan-ly-bat-dong-san", sequence: 4, display: true, parent_id: "pinned-services" },
        { id: "svc-5", name: "Asset Enhancement", type: "", content_type: "", link: "/services/asset-enhancement", sequence: 5, display: true, parent_id: "pinned-services" },
        { id: "svc-6", name: "Tư vấn M&A", type: "", content_type: "", link: "/services/tu-van-ma", sequence: 6, display: true, parent_id: "pinned-services" },
        { id: "svc-7", name: "Môi giới & Leasing", type: "", content_type: "", link: "/services/moi-gioi-leasing", sequence: 7, display: true, parent_id: "pinned-services" },
        { id: "svc-8", name: "Thiết kế & Xây dựng", type: "", content_type: "", link: "/services/thiet-ke-xay-dung", sequence: 8, display: true, parent_id: "pinned-services" },
        { id: "svc-9", name: "Giải pháp số", type: "", content_type: "", link: "/services/giai-phap-so", sequence: 9, display: true, parent_id: "pinned-services" },
      ],
    },
    {
      id: "pinned-ecosystem",
      name: "Hệ sinh thái",
      type: "",
      content_type: "",
      link: "/he-sinh-thai",
      sequence: 4,
      display: true,
      parent_id: null,
      children: [
        { id: "eco-1", name: "Kepler Property", type: "", content_type: "", link: "/he-sinh-thai/kepler-property", sequence: 1, display: true, parent_id: "pinned-ecosystem" },
        { id: "eco-2", name: "KPC Appraisal", type: "", content_type: "", link: "/he-sinh-thai/kpc-appraisal", sequence: 2, display: true, parent_id: "pinned-ecosystem" },
        { id: "eco-3", name: "KMC Management", type: "", content_type: "", link: "/he-sinh-thai/kmc-management", sequence: 3, display: true, parent_id: "pinned-ecosystem" },
        { id: "eco-4", name: "KAC Advisory", type: "", content_type: "", link: "/he-sinh-thai/kac-advisory", sequence: 4, display: true, parent_id: "pinned-ecosystem" },
        { id: "eco-5", name: "K-Homes Design & Build", type: "", content_type: "", link: "/he-sinh-thai/k-homes", sequence: 5, display: true, parent_id: "pinned-ecosystem" },
        { id: "eco-6", name: "RealHub Platform", type: "", content_type: "", link: "/realhub", sequence: 6, display: true, parent_id: "pinned-ecosystem" },
      ],
    },
    {
      id: "pinned-realhub",
      name: "RealHub",
      type: "",
      content_type: "",
      link: "/realhub",
      sequence: 5,
      display: true,
      parent_id: null,
      children: [
        { id: "rh-1", name: "Marketplace", type: "", content_type: "", link: "/realhub#modules", sequence: 1, display: true, parent_id: "pinned-realhub" },
        { id: "rh-2", name: "CRM", type: "", content_type: "", link: "/realhub#modules", sequence: 2, display: true, parent_id: "pinned-realhub" },
        { id: "rh-3", name: "Dashboard", type: "", content_type: "", link: "/realhub#modules", sequence: 3, display: true, parent_id: "pinned-realhub" },
        { id: "rh-4", name: "Broker Network", type: "", content_type: "", link: "/realhub#modules", sequence: 4, display: true, parent_id: "pinned-realhub" },
        { id: "rh-5", name: "AI Assistant", type: "", content_type: "", link: "/realhub#modules", sequence: 5, display: true, parent_id: "pinned-realhub" },
        { id: "rh-6", name: "Valuation", type: "", content_type: "", link: "/realhub#modules", sequence: 6, display: true, parent_id: "pinned-realhub" },
        { id: "rh-7", name: "Roadmap", type: "", content_type: "", link: "/realhub#roadmap", sequence: 7, display: true, parent_id: "pinned-realhub" },
        { id: "rh-8", name: "Đăng ký quan tâm", type: "", content_type: "", link: "/realhub#register", sequence: 8, display: true, parent_id: "pinned-realhub" },
      ],
    },
    {
      id: "pinned-experts",
      name: "Chuyên gia",
      type: "",
      content_type: "",
      link: "/chuyen-gia",
      sequence: 6,
      display: true,
      parent_id: null,
      children: [
        { id: "exp-1", name: "Luật", type: "", content_type: "", link: "/chuyen-gia?category=Luật", sequence: 1, display: true, parent_id: "pinned-experts" },
        { id: "exp-2", name: "Thẩm định giá", type: "", content_type: "", link: "/chuyen-gia?category=Thẩm định giá", sequence: 2, display: true, parent_id: "pinned-experts" },
        { id: "exp-3", name: "Kiến trúc", type: "", content_type: "", link: "/chuyen-gia?category=Kiến trúc", sequence: 3, display: true, parent_id: "pinned-experts" },
        { id: "exp-4", name: "Tài chính", type: "", content_type: "", link: "/chuyen-gia?category=Tài chính", sequence: 4, display: true, parent_id: "pinned-experts" },
        { id: "exp-5", name: "Xây dựng", type: "", content_type: "", link: "/chuyen-gia?category=Xây dựng", sequence: 5, display: true, parent_id: "pinned-experts" },
        { id: "exp-6", name: "Kế toán", type: "", content_type: "", link: "/chuyen-gia?category=Kế toán", sequence: 6, display: true, parent_id: "pinned-experts" },
        { id: "exp-7", name: "Bất động sản", type: "", content_type: "", link: "/chuyen-gia?category=Bất động sản", sequence: 7, display: true, parent_id: "pinned-experts" },
        { id: "exp-8", name: "Quản lý vận hành", type: "", content_type: "", link: "/chuyen-gia?category=Quản lý vận hành", sequence: 8, display: true, parent_id: "pinned-experts" },
      ],
    },
  ];

  const finalNav = [
    ...(filteredNavigation[0] ? [filteredNavigation[0]] : []),
    aboutItem,
    ...pinnedItems,
    kienThucItem,
    ...filteredNavigation.slice(1).filter(
      (item) =>
        item.link !== "/services" &&
        item.link !== "/dich-vu" &&
        item.link !== "/he-sinh-thai" &&
        item.link !== "/realhub" &&
        item.link !== "/chuyen-gia" &&
        item.link !== "/kien-thuc",
    ),
    customersPartnersItem,
    contactItem,
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
        setIsMobileMenuOpen(false);
      }
    },
    [router, searchQuery],
  );

  return (
    <div className="h-[68px] md:h-[80px] lg:h-[84px]">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          className,
        )}
      >
        {/* === TOP BAR (đỏ) — Hotline + Quick links + Search + Language + Auth === */}
        <div
          className={cn(
            "bg-[#DC2626] text-white overflow-hidden",
            isScrolled
              ? "h-0 transition-all duration-500 ease-in-out"
              : "h-12 transition-all duration-300 ease-in-out",
          )}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-24">
            <div className="flex items-center justify-between h-12">
              {/* Left side */}
              <a
                href="tel:18001105"
                className="flex md:hidden items-center gap-1.5 text-[13px] hover:text-red-200 transition-colors"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span className="font-semibold tracking-wide">
                  {t("hotline")}: 1800 1105
                </span>
              </a>
              <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm">
                <Link
                  href="/contact"
                  className="hover:text-red-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("contact")}</span>
                </Link>
                {/* <div className="h-3 w-px bg-white/30"></div>
                <Link
                  href="/careers"
                  className="hover:text-red-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("careers")}</span>
                </Link>
                <div className="h-3 w-px bg-white/30"></div>
                <Link
                  href="/work-schedule"
                  className="hover:text-red-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("workSchedule")}</span>
                </Link> */}
                <div className="h-3 w-px bg-white/30"></div>
                <a
                  href="tel:18001105"
                  className="flex items-center gap-1.5 lg:gap-2 hover:text-red-200 transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span className="font-semibold">{t("hotline")}: 1800 1105</span>
                </a>
              </div>

              {/* Right side - Search, Language, Auth */}
              <div className="flex items-center gap-2 lg:gap-3 md:ml-0">
                {/* Search */}
                <form onSubmit={handleSearch} className="hidden lg:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-4 pr-10 py-1.5 text-sm bg-white/10 rounded-full text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </form>

                {/* Language */}
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>

                {/* Separator */}
                <div className="hidden md:block h-4 w-px bg-white/30"></div>

                {/* Auth Section */}
                {!isMounted ? (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Skeleton className="h-7 w-20 md:h-8 md:w-28 bg-white/20 rounded-full" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <span className="md:hidden text-xs font-medium">
                      {t("hi")}{" "}
                      <span className="font-semibold">
                        {first_name || t("user")}!
                      </span>
                    </span>
                    {/* Quotation Button */}
                    <Link
                      href="/quotation"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-medium">
                        {t("quotation")}
                      </span>
                    </Link>
                    {/* Avatar */}
                    <div className="scale-[0.85] md:scale-90">
                      <UserNav
                        user={{
                          name:
                            `${first_name || ""} ${last_name || ""}`.trim() ||
                            email ||
                            t("user"),
                          email: email || "",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Link
                      href="/login"
                      className="flex items-center gap-1 md:gap-2 pl-1.5 pr-2.5 md:pr-4 py-1 md:py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[85px] md:min-w-0"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                      <span className="text-xs md:text-sm font-medium">
                        {t("login")}
                      </span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1 md:gap-2 pl-1.5 pr-2.5 md:pr-4 py-1 md:py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[75px] md:min-w-0"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center">
                        <UserPen className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                      <span className="text-xs md:text-sm font-medium">
                        {t("register")}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === MAIN BAR (trắng) — Logo + Nav + Mobile menu === */}
        <div
          className={cn(
            "bg-white border-b border-gray-200 overflow-hidden",
            isScrolled
              ? "py-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out"
              : "py-2 md:py-3 lg:py-3 shadow-sm transition-all duration-200 ease-in-out",
          )}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <div
              className={cn(
                "relative flex flex-row justify-between transition-all duration-500 ease-in-out",
                isScrolled
                  ? "items-center"
                  : "items-center",
              )}
            >
              {/* Logo */}
              <div className="flex-shrink-0 z-10">
                <Link href="/" className="flex items-center h-10 md:h-12 lg:h-12 overflow-visible">
                  <div
                    className={cn(
                      "relative w-28 sm:w-32 md:w-36 lg:w-40 h-9 sm:h-10 md:h-11 lg:h-11 origin-left transition-all duration-300",
                      isScrolled ? "scale-90 drop-shadow-md" : "scale-100 drop-shadow-none",
                    )}
                  >
                    <Image
                      src={logoUrl}
                      alt={logoInfo?.name || "Logo"}
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation Menu - Desktop with Scroll */}
              <div className="hidden lg:flex items-center flex-1 min-w-0 justify-start ml-8 relative group">
                {showLeftArrow && (
                  <button
                    onClick={() => scrollMenu("left")}
                    className="absolute left-0 z-30 p-2 bg-gradient-to-r from-white via-white to-transparent hover:from-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Scroll left"
                  >
                    <ChevronDown className="w-5 h-5 text-[#DC2626] rotate-90" />
                  </button>
                )}

                <nav
                  ref={navRef}
                  className="hidden lg:flex items-center flex-1 min-w-0 justify-start overflow-x-auto scrollbar-hide py-2 px-4 select-none scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {finalNav.map((item) => (
                    <MenuItem
                      variant="main"
                      key={item.id}
                      menu={item}
                      active={pathname === item.link}
                    />
                  ))}
                </nav>

                {showRightArrow && (
                  <button
                    onClick={() => scrollMenu("right")}
                    className="absolute right-0 z-30 p-2 bg-gradient-to-l from-white via-white to-transparent hover:from-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Scroll right"
                  >
                    <ChevronDown className="w-5 h-5 text-[#DC2626] -rotate-90" />
                  </button>
                )}
              </div>

              {/* Mobile & Tablet menu button */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="md:hidden p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-300 scale-90">
                  <LanguageSwitcher />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === MOBILE DRAWER (slide-in from right) === */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="lg:hidden fixed top-0 right-0 bottom-0 z-[56] w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="px-5 py-4 border-b border-gray-200"
              >
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 overflow-hidden bg-white">
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <Search className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="px-3 pt-2 pb-3 space-y-1">
                {finalNav.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    className="block px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 px-5 pt-4 pb-6 space-y-2">
                {!isMounted ? (
                  <>
                    <Skeleton className="h-14 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </>
                ) : isAuthenticated ? (
                  <>
                    <div className="px-3 py-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        {`${first_name || ""} ${last_name || ""}`.trim() ||
                          email ||
                          t("user")}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{email}</p>
                    </div>
                    <Link
                      href="/quotation"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-white bg-red-600 rounded-lg font-semibold shadow-md hover:bg-red-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      {t("quotation")}
                    </Link>
                    <Link
                      href="/user"
                      className="block px-3 py-2 text-center text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("profile")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2.5 text-center text-red-600 border border-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2.5 text-center text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
