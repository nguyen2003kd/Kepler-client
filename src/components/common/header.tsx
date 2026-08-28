"use client";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import { useGetApiV10Category } from "@/api/endpoints/category";
import "@/i18n";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import type { NavItem } from "@/types";
import type { MenuItem as MenuItemType } from "@/types/menu";
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
  // Phone,
  Search,
  User,
  UserPen,
  X,
} from "lucide-react";
import Image from "@/components/common/safe-image";
import QuotationPopupDialog from "@/components/quotation-popup/quotation-popup-dialog";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHeaderMenuLayout } from "@/hooks/use-header-menu-layout";
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
  const { t, i18n } = useTranslation("header");
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { data: logoData } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = logoInfo?.file?.compress_info
    ? getResponsiveImage(logoInfo.file.compress_info)
    : logoInfo?.file?.path
      ? `${links.storageEndpoint}${logoInfo.file.path}`
      : "/seo.png";

  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category(
    { language: currentLang },
    {
    query: {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    },
  );

  const { email, first_name, last_name } = useAuthStore();
  const isAuthenticated = !!email;
  const [isMounted, setIsMounted] = useState(false);
  const [quotationPopupOpen, setQuotationPopupOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultNavItems: NavItem[] = useMemo(() => [
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
          name: "Giới thiệu Kepler Group",
          type: "",
          content_type: "",
          link: "/about/company-overview",
          sequence: 1,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-2",
          name: "Tầm nhìn – Sứ mệnh",
          type: "",
          content_type: "",
          link: "/about/vision-mission",
          sequence: 2,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-3",
          name: "Lĩnh vực hoạt động chính",
          type: "",
          content_type: "",
          link: "/services",
          sequence: 3,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-4",
          name: "Ban điều hành",
          type: "",
          content_type: "",
          link: "/about/board-of-directors",
          sequence: 4,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-5",
          name: "Hội đồng cố vấn",
          type: "",
          content_type: "",
          link: "/about/expert-council",
          sequence: 5,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-6",
          name: "Chứng chỉ và giấy phép",
          type: "",
          content_type: "",
          link: "/about/certifications",
          sequence: 6,
          display: true,
          parent_id: "2",
        },
        {
          id: "2-7",
          name: "Hồ sơ năng lực",
          type: "",
          content_type: "",
          link: "/about/capability-profile",
          sequence: 7,
          display: true,
          parent_id: "2",
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
        { id: "3-1", name: "Tư vấn định giá và thẩm định giá", type: "", content_type: "", link: "/services/tu-van-dinh-gia-va-tham-dinh-gia", sequence: 1, display: true, parent_id: "3" },
        { id: "3-2", name: "Phát triển dự án BĐS", type: "", content_type: "", link: "/services/phat-trien-du-an-bds", sequence: 2, display: true, parent_id: "3" },
        { id: "3-3", name: "Quản lý & khai thác tài sản", type: "", content_type: "", link: "/services/quan-ly-va-khai-thac-tai-san", sequence: 3, display: true, parent_id: "3" },
        { id: "3-4", name: "Tư vấn & thực hiện M&A", type: "", content_type: "", link: "/services/tu-van-va-thuc-hien-ma", sequence: 4, display: true, parent_id: "3" },
        { id: "3-5", name: "Tư vấn dịch vụ khác BĐS", type: "", content_type: "", link: "/services/tu-van-dich-vu-khac-bds", sequence: 5, display: true, parent_id: "3" },
        { id: "3-6", name: "Giải pháp số BĐS", type: "", content_type: "", link: "/services/giai-phap-so-bds", sequence: 6, display: true, parent_id: "3" },
        { id: "3-7", name: "Cho thuê HĐ cố vấn & chuyên gia", type: "", content_type: "", link: "/services/cho-thue-hop-dong-co-van-va-chuyen-gia", sequence: 7, display: true, parent_id: "3" },
      ],
    },
    {
      id: "5",
      name: "Sàn giao dịch và dự án",
      type: "",
      content_type: "",
      link: "/san-giao-dich",
      sequence: 4,
      display: true,
      parent_id: null,
      children: [
        { id: "5-1", name: "Mua và bán nhà lẻ", type: "", content_type: "", link: "/san-giao-dich/mua-ban-nha-le", sequence: 1, display: true, parent_id: "5" },
        { id: "5-2", name: "Thuê và cho thuê", type: "", content_type: "", link: "/san-giao-dich/thue-va-cho-thue", sequence: 2, display: true, parent_id: "5" },
        { id: "5-3", name: "Dự án phân phối", type: "", content_type: "", link: "/san-giao-dich/du-an-phan-phoi", sequence: 3, display: true, parent_id: "5" },
        { id: "5-4", name: "Kêu gọi đầu tư dự án", type: "", content_type: "", link: "/san-giao-dich/keu-goi-dau-tu", sequence: 4, display: true, parent_id: "5" },
        { id: "5-5", name: "Dự án cần M&A", type: "", content_type: "", link: "/san-giao-dich/du-an-can-ma", sequence: 5, display: true, parent_id: "5" },
      ],
    },
    {
      id: "6",
      name: "Đối tác & khách hàng tiêu biểu",
      type: "",
      content_type: "",
      link: "/doi-tac-khach-hang",
      sequence: 5,
      display: true,
      parent_id: null,
      children: [
        { id: "6-1", name: "Khách hàng cá nhân cao cấp", type: "", content_type: "", link: "/doi-tac-khach-hang/khach-hang-ca-nhan-cao-cap", sequence: 1, display: true, parent_id: "6" },
        { id: "6-2", name: "Khách hàng doanh nghiệp tiêu biểu", type: "", content_type: "", link: "/doi-tac-khach-hang/khach-hang-doanh-nghiep-tieu-bieu", sequence: 2, display: true, parent_id: "6" },
        { id: "6-3", name: "Đối tác chiến lược", type: "", content_type: "", link: "/doi-tac-khach-hang/doi-tac-chien-luoc", sequence: 3, display: true, parent_id: "6" },
        { id: "6-4", name: "Quỹ đầu tư quốc tế và trong nước", type: "", content_type: "", link: "/doi-tac-khach-hang/quy-dau-tu-quoc-te-va-trong-nuoc", sequence: 4, display: true, parent_id: "6" },
        { id: "6-5", name: "Đơn vị công nghệ proptech", type: "", content_type: "", link: "/doi-tac-khach-hang/don-vi-cong-nghe-proptech", sequence: 5, display: true, parent_id: "6" },
        { id: "6-6", name: "Mạng lưới phân phối độc quyền", type: "", content_type: "", link: "/doi-tac-khach-hang/mang-luoi-phan-phoi-doc-quyen", sequence: 6, display: true, parent_id: "6" },
        { id: "6-7", name: "Ngân hàng và tổ chức tài chính", type: "", content_type: "", link: "/doi-tac-khach-hang/ngan-hang-va-to-chuc-tai-chinh", sequence: 7, display: true, parent_id: "6" },
        { id: "6-8", name: "Đơn vị thẩm định giá và pháp lý", type: "", content_type: "", link: "/doi-tac-khach-hang/don-vi-tham-dinh-gia-va-phap-ly", sequence: 8, display: true, parent_id: "6" },
      ],
    },
    {
      id: "7",
      name: "Cộng đồng bất động sản – Real Hub",
      type: "",
      content_type: "",
      link: "/cong-dong-bds",
      sequence: 6,
      display: true,
      parent_id: null,
      children: [
        { id: "7-1", name: "Real Hub Offline", type: "", content_type: "", link: "/cong-dong-bds/offline", sequence: 1, display: true, parent_id: "7" },
        { id: "7-2", name: "Real Hub Online", type: "", content_type: "", link: "/cong-dong-bds/online", sequence: 2, display: true, parent_id: "7" },
        { id: "7-3", name: "Mô hình Real Hub", type: "", content_type: "", link: "/cong-dong-bds/mo-hinh-real-hub", sequence: 3, display: true, parent_id: "7" },
        { id: "7-4", name: "Tham gia Real Hub", type: "", content_type: "", link: "/cong-dong-bds/tham-gia-real-hub", sequence: 4, display: true, parent_id: "7" },
      ],
    },
    {
      id: "9",
      name: "Hệ sinh thái Kepler",
      type: "",
      content_type: "",
      link: "/he-sinh-thai",
      sequence: 7,
      display: true,
      parent_id: null,
      children: [
        { id: "9-1", name: "Kepler Property – KPC Group", type: "", content_type: "", link: "/he-sinh-thai/kepler-property", sequence: 1, display: true, parent_id: "9" },
        { id: "9-2", name: "Kepler Appraisal – KAC", type: "", content_type: "", link: "/he-sinh-thai/kpc-appraisal", sequence: 2, display: true, parent_id: "9" },
        { id: "9-3", name: "Kepler Management – KMC", type: "", content_type: "", link: "/he-sinh-thai/kmc-management", sequence: 3, display: true, parent_id: "9" },
        { id: "9-4", name: "Kepler Advisory – KAC Advisory", type: "", content_type: "", link: "/he-sinh-thai/kac-advisory", sequence: 4, display: true, parent_id: "9" },
        { id: "9-5", name: "Kepler Land", type: "", content_type: "", link: "/he-sinh-thai/kepler-land", sequence: 5, display: true, parent_id: "9" },
        { id: "9-6", name: "K-Homes", type: "", content_type: "", link: "/he-sinh-thai/k-homes", sequence: 6, display: true, parent_id: "9" },
        { id: "9-7", name: "BizOffice", type: "", content_type: "", link: "/he-sinh-thai/bizoffice", sequence: 7, display: true, parent_id: "9" },
      ],
    },
    {
      id: "12",
      name: "Chuyên gia & Cố vấn",
      type: "",
      content_type: "",
      link: "/chuyen-gia",
      sequence: 8,
      display: true,
      parent_id: null,
      children: [
        { id: "12-1", name: "Chuyên gia độc lập", type: "", content_type: "", link: "/chuyen-gia/chuyen-gia-doc-lap", sequence: 1, display: true, parent_id: "12" },
        { id: "12-2", name: "Hội đồng cố vấn", type: "", content_type: "", link: "/chuyen-gia/hoi-dong-co-van", sequence: 2, display: true, parent_id: "12" },
      ],
    },
    {
      id: "8",
      name: "Tin tức ngành và sự kiện",
      type: "",
      content_type: "",
      link: "/news",
      sequence: 9,
      display: true,
      parent_id: null,
      children: [
        { id: "8-1", name: "Văn bản Luật", type: "", content_type: "", link: "/news/van-ban-luat", sequence: 1, display: true, parent_id: "8" },
        { id: "8-2", name: "Bất động sản – Quy hoạch", type: "", content_type: "", link: "/news/bds-quy-hoach", sequence: 2, display: true, parent_id: "8" },
        { id: "8-3", name: "Tài chính – Thẩm định giá", type: "", content_type: "", link: "/news/tai-chinh-tham-dinh", sequence: 3, display: true, parent_id: "8" },
        { id: "8-4", name: "Kiến trúc – Xây dựng", type: "", content_type: "", link: "/news/kien-truc-xay-dung", sequence: 4, display: true, parent_id: "8" },
        { id: "8-5", name: "Nghiên cứu – Báo cáo", type: "", content_type: "", link: "/news/nghien-cuu-bao-cao", sequence: 5, display: true, parent_id: "8" },
      ],
    },
    {
      id: "10",
      name: "Kiến thức",
      type: "",
      content_type: "",
      link: "/kien-thuc",
      sequence: 10,
      display: true,
      parent_id: null,
      children: [
        { id: "10-1", name: "Đầu tư bất động sản", type: "", content_type: "", link: "/kien-thuc/dau-tu-bat-dong-san", sequence: 1, display: true, parent_id: "10" },
        { id: "10-2", name: "Tài chính và các khoản vay", type: "", content_type: "", link: "/kien-thuc/tai-chinh-va-cac-khoan-vay", sequence: 2, display: true, parent_id: "10" },
        { id: "10-3", name: "Thẩm định giá và định giá", type: "", content_type: "", link: "/kien-thuc/tham-dinh-gia-va-dinh-gia", sequence: 3, display: true, parent_id: "10" },
        { id: "10-4", name: "Thiết kế và xây dựng", type: "", content_type: "", link: "/kien-thuc/thiet-ke-va-xay-dung", sequence: 4, display: true, parent_id: "10" },
        { id: "10-5", name: "Quản lý và vận hành", type: "", content_type: "", link: "/kien-thuc/quan-ly-va-van-hanh", sequence: 5, display: true, parent_id: "10" },
        { id: "10-6", name: "Podcast và video", type: "", content_type: "", link: "/kien-thuc/podcast-va-video", sequence: 6, display: true, parent_id: "10" },
        { id: "10-7", name: "Khóa đào tạo", type: "", content_type: "", link: "/kien-thuc/khoa-dao-tao", sequence: 7, display: true, parent_id: "10" },
        { id: "10-8", name: "Tiêu điểm bất động sản", type: "", content_type: "", link: "/kien-thuc/tieu-diem-bat-dong-san", sequence: 8, display: true, parent_id: "10" },
      ],
    },
    {
      id: "11",
      name: "Liên hệ và đặt lịch",
      type: "",
      content_type: "",
      link: "/contact",
      sequence: 11,
      display: true,
      parent_id: null,
      children: [
        { id: "11-1", name: "Liên hệ Kepler", type: "", content_type: "", link: "/contact/lien-he-kepler", sequence: 1, display: true, parent_id: "11" },
        { id: "11-2", name: "Liên hệ hợp tác", type: "", content_type: "", link: "/contact/lien-he-hop-tac", sequence: 2, display: true, parent_id: "11" },
        { id: "11-3", name: "Yêu cầu bán/cho thuê BĐS", type: "", content_type: "", link: "/contact/yeu-cau-ban-cho-thue", sequence: 3, display: true, parent_id: "11" },
        { id: "11-4", name: "Yêu cầu thẩm định giá", type: "", content_type: "", link: "/contact/yeu-cau-tham-dinh-gia", sequence: 4, display: true, parent_id: "11" },
        { id: "11-5", name: "Yêu cầu dịch vụ BĐS", type: "", content_type: "", link: "/contact/yeu-cau-dich-vu", sequence: 5, display: true, parent_id: "11" },
        { id: "11-6", name: "Tư vấn thương vụ M&A", type: "", content_type: "", link: "/contact/tu-van-thuong-vu-ma", sequence: 6, display: true, parent_id: "11" },
        { id: "11-7", name: "Đặt lịch hẹn chuyên gia", type: "", content_type: "", link: "/contact/dat-lich-hen-chuyen-gia", sequence: 7, display: true, parent_id: "11" },
      ],
    },
  ], []);

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
            setIsHeaderHidden(true);
          } else if (currentScrollY < lastScrollY.current - 5 || currentScrollY < 100) {
            setIsHeaderHidden(false);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const baseNavigation: HeaderMenuItem[] = useMemo(() => {
    const apiData = categoriesData?.responseData?.length
      ? withCategoryQueryMode(
          (categoriesData.responseData as unknown as HeaderMenuItem[]).map((item) => ({

            ...item,
            sequence: ((item as Record<string, unknown>).position as number) || 99,
            display: true,
            parent_id: ((item as Record<string, unknown>).parent_category_id as string | null) ?? null,
          })) as HeaderMenuItem[],
          false,
        )
      : null;
    if (apiData) return apiData;
    return withCategoryQueryMode(
      (navItems.length > 0 ? navItems : defaultNavItems) as HeaderMenuItem[],
      false,
    );
  }, [categoriesData, navItems, defaultNavItems]);

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

  const filteredNavigation: HeaderMenuItem[] = useMemo(() => {
    return navigation.filter(
      (item) => !item.parent_id,
    );
  }, [navigation]);

  const finalNav: HeaderMenuItem[] = useMemo(() => {
    return [...filteredNavigation]
      .sort((a, b) => (a.sequence || 99) - (b.sequence || 99))
      .filter(item => item.display !== false);
  }, [filteredNavigation]);

  const { rows, rowGaps, isReady, navContainerRef, logoRef, parentRef, rightActionsRef, itemRefs } =
    useHeaderMenuLayout(finalNav);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMenuId(null);
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

  const showHeader = !isHeaderHidden || isHeaderHovered;

  return (
    <div className="min-h-[112px] md:min-h-[124px] lg:min-h-[128px]">
      {/* Hover trigger zone — invisible strip at top to reveal header */}
      {isHeaderHidden && (
        <div
          className="fixed top-0 left-0 right-0 h-8 z-[51]"
          onMouseEnter={() => setIsHeaderHovered(true)}
        />
      )}
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
          showHeader ? "translate-y-0" : "-translate-y-full",
          className,
        )}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <div className="header-inner">
        {/* === TOP BAR (đỏ) — Hotline + Quick links + Search + Language + Auth === */}
        <div
          className="header-topbar bg-[#DC2626] text-white"
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-24">
            <div className="flex items-center justify-between h-11 md:h-12 lg:h-12">
              {/* Left side */}
              <a
                href="tel:18001105"
                className="flex md:hidden items-center gap-1.5 text-[12px] hover:text-red-200 transition-colors whitespace-nowrap"
              >
                <Headphones className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-semibold tracking-wide">
                  {t("hotline")}: 1800 1105
                </span>
              </a>
              <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm min-w-0">
                <a
                  href="tel:18001105"
                  className="flex items-center gap-1.5 lg:gap-2 hover:text-red-200 transition-colors whitespace-nowrap"
                >
                  <Headphones className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="font-semibold">{t("hotline")}: 1800 1105</span>
                </a>
                <div className="hidden lg:block h-4 w-px bg-white/30"></div>
                <Link
                  href="/news"
                  className="hidden lg:flex items-center gap-1.5 hover:text-red-200 transition-colors whitespace-nowrap"
                >
                  <span>{t("newsAndEvents")}</span>
                </Link>
              </div>

              {/* Right side - Search, Language, Auth */}
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 md:ml-0 min-w-0">
                {/* Search */}
                <form onSubmit={handleSearch} className="hidden lg:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 xl:w-64 pl-4 pr-10 py-1.5 text-sm bg-white/20 rounded-full text-white placeholder:text-white/80 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </form>

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
                    <button
                      onClick={() => setQuotationPopupOpen(true)}
                      className="hidden md:flex items-center gap-1.5 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs md:text-sm font-medium"
                    >
                      <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>{t("quotation")}</span>
                    </button>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full border border-white/40 hover:border-white/70 hover:bg-white/10 transition-all text-xs md:text-sm font-medium"
                    >
                      <User className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>{t("login")}</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1.5 px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full bg-white text-[#DC2626] hover:bg-white/90 hover:shadow-md transition-all text-xs md:text-sm font-semibold"
                    >
                      <UserPen className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>{t("register")}</span>
                    </Link>
                  </div>
                )}

                {/* Separator */}
                <div className="hidden lg:block h-4 w-px bg-white/30"></div>

                {/* Liên hệ Kepler */}
                <Link
                  href="/contact"
                  className="hidden lg:flex items-center gap-1.5 hover:text-red-200 transition-colors text-xs lg:text-sm whitespace-nowrap"
                >
                  <span>{t("contactKepler")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* === MAIN BAR (trắng) — Logo + Nav + Mobile menu === */}
        <div
          className="header-mainbar bg-white border-b border-gray-200 py-2 md:py-3 lg:py-3 shadow-sm"
        >
          <div className="w-full px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <div
              ref={parentRef}
              className="relative flex flex-row justify-between items-stretch"
            >
              {/* Logo */}
              <div ref={logoRef} className="flex-shrink-0 z-10 flex items-center self-stretch">
                <Link href="/" className="flex items-center justify-center h-full overflow-visible py-1">
                  <div
                    className="header-logo relative w-28 sm:w-32 md:w-36 lg:w-40 h-full origin-left"
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

              {/* Navigation Menu - Desktop with dynamic 1/2 row layout */}
              <div
                ref={navContainerRef}
                className="hidden lg:flex flex-1 min-w-0 flex-col justify-center ml-4"
              >
                {/* Hidden measurement container — measures real item widths */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none invisible"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {finalNav.map((item, idx) => (
                    <span
                      key={`measure-${item.id}`}
                      ref={(el) => {
                        if (itemRefs.current) {
                          itemRefs.current[idx] = el;
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-base font-semibold"
                      style={{ visibility: "hidden" }}
                    >
                      <span>{item.name}</span>
                      {item.children && item.children.length > 0 && (
                        <span style={{ display: "inline-block", width: 14, height: 14 }} />
                      )}
                    </span>
                  ))}
                </div>

                {/* Actual navigation */}
                {isReady ? (
                  <nav className="flex flex-col gap-0 w-full">
                    {rows.map((rowItems, rowIdx) => (
                      <Fragment key={`row-${rowIdx}`}>
                        {rowIdx > 0 && (
                          <div className="h-px bg-gray-200 my-0.5" />
                        )}
                        <div
                          className="flex items-center w-full"
                          style={{ gap: `${rowGaps[rowIdx]}px` }}
                        >
                          {rowItems.map((item) => (
                            <MenuItem
                              variant="main"
                              key={item.id}
                              menu={item}
                              active={pathname === item.link}
                            />
                          ))}
                        </div>
                      </Fragment>
                    ))}
                  </nav>
                ) : (
                  <div className="flex items-center gap-4 py-2">
                    {finalNav.map((item) => (
                      <Skeleton
                        key={`skeleton-${item.id}`}
                        className="h-6 w-20 rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right actions placeholder (desktop) */}
              <div ref={rightActionsRef} className="hidden lg:flex items-center" />

              {/* Mobile & Tablet menu button */}
              <div className="lg:hidden flex items-center gap-2">
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

        {/* === MOBILE DRAWER (moved outside header to avoid transform stacking context) === */}
        </div>
      </header>
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
              <div className="px-3 pt-2 pb-3 space-y-0.5">
                {finalNav.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedMenuId === item.id;
                  return (
                    <div key={item.id}>
                      {hasChildren ? (
                        <button
                          onClick={() => setExpandedMenuId(isExpanded ? null : item.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-base font-medium transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.link}
                          className="block px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-base font-medium transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                      {hasChildren && isExpanded && (
                        <div className="ml-3 pl-3 border-l border-gray-200 space-y-0.5 mt-0.5 mb-1">
                          <Link
                            href={item.link}
                            className="block px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Xem tất cả
                          </Link>
                          {item.children!.map((child) => (
                            <Link
                              key={child.id}
                              href={child.link}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
      {isMounted && !isAuthenticated && (
        <QuotationPopupDialog
          open={quotationPopupOpen}
          onOpenChange={setQuotationPopupOpen}
        />
      )}
    </div>
  );
}
