"use client";

import { useMemo } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";

export interface ContactFormTypeConfig {
  slug: string;
  type: string;
  title: string;
  subtitle: string;
  showSubject?: boolean;
  showPreferredDate?: boolean;
  showPropertyInfo?: boolean;
  showOrganization?: boolean;
  contentLabel: string;
  contentPlaceholder: string;
}

const FALLBACK_FORM_TYPES: Record<string, ContactFormTypeConfig> = {
  "lien-he-kepler": {
    slug: "lien-he-kepler",
    type: "lien-he-kepler",
    title: "Liên hệ Kepler",
    subtitle: "Gửi tin nhắn cho chúng tôi, chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
    contentLabel: "Nội dung",
    contentPlaceholder: "Nhập nội dung tin nhắn của bạn...",
  },
  "lien-he-hop-tac": {
    slug: "lien-he-hop-tac",
    type: "lien-he-hop-tac",
    title: "Liên hệ hợp tác",
    subtitle: "Hợp tác kinh doanh, phân phối, chiến lược cùng Kepler Group.",
    showOrganization: true,
    contentLabel: "Nội dung hợp tác",
    contentPlaceholder: "Mô tả ngắn gọn về cơ hội hợp tác...",
  },
  "yeu-cau-ban-cho-thue": {
    slug: "yeu-cau-ban-cho-thue",
    type: "yeu-cau-ban-cho-thue",
    title: "Yêu cầu bán/cho thuê BĐS",
    subtitle: "Để lại thông tin BĐS, chuyên viên Kepler sẽ liên hệ tư vấn.",
    showPropertyInfo: true,
    contentLabel: "Thông tin BĐS",
    contentPlaceholder: "Địa chỉ, loại BĐS, diện tích, giá mong muốn...",
  },
  "yeu-cau-tham-dinh-gia": {
    slug: "yeu-cau-tham-dinh-gia",
    type: "yeu-cau-tham-dinh-gia",
    title: "Yêu cầu thẩm định giá",
    subtitle: "Yêu cầu dịch vụ thẩm định giá BĐS, máy móc, doanh nghiệp.",
    showOrganization: true,
    contentLabel: "Mô tả tài sản cần thẩm định",
    contentPlaceholder: "Loại tài sản, mục đích thẩm định, thời gian mong muốn...",
  },
  "yeu-cau-dich-vu": {
    slug: "yeu-cau-dich-vu",
    type: "yeu-cau-dich-vu",
    title: "Yêu cầu dịch vụ BĐS",
    subtitle: "Tư vấn mua, bán, cho thuê, đầu tư, khai thác BĐS.",
    showSubject: true,
    contentLabel: "Chi tiết yêu cầu",
    contentPlaceholder: "Mô tả chi tiết dịch vụ bạn cần...",
  },
  "tu-van-thuong-vu-ma": {
    slug: "tu-van-thuong-vu-ma",
    type: "tu-van-thuong-vu-ma",
    title: "Tư vấn thương vụ M&A",
    subtitle: "Tư vấn M&A, tái cấu trúc, tìm đối tác đầu tư.",
    showOrganization: true,
    contentLabel: "Mô tả thương vụ",
    contentPlaceholder: "Loại giao dịch, quy mô, ngành nghề, thời gian...",
  },
  "dat-lich-hen-chuyen-gia": {
    slug: "dat-lich-hen-chuyen-gia",
    type: "dat-lich-hen-chuyen-gia",
    title: "Đặt lịch hẹn chuyên gia",
    subtitle: "Đặt lịch tư vấn trực tiếp với chuyên gia Kepler.",
    showPreferredDate: true,
    contentLabel: "Nội dung cần tư vấn",
    contentPlaceholder: "Chủ đề bạn muốn tư vấn...",
  },
} as Record<string, ContactFormTypeConfig>;

interface ApiFormType {
  slug: string;
  title: string;
  subtitle: string;
  showSubject?: boolean;
  showPreferredDate?: boolean;
  showPropertyInfo?: boolean;
  showOrganization?: boolean;
  contentLabel: string;
  contentPlaceholder: string;
}

export function useContactFormTypes(): Record<string, ContactFormTypeConfig> {
  const { data } = useGetApiV10PageConfig(
    { filters: "key==CONTACT_FORM_TYPES" },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  );

  return useMemo(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row?.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.formTypes && Array.isArray(parsed.formTypes)) {
            const apiTypes: Record<string, ContactFormTypeConfig> = {};
            for (const ft of parsed.formTypes as ApiFormType[]) {
              if (!ft.slug) continue;
              apiTypes[ft.slug] = {
                ...FALLBACK_FORM_TYPES[ft.slug],
                ...ft,
                type: ft.slug,
              };
            }
            return { ...FALLBACK_FORM_TYPES, ...apiTypes };
          }
        } catch {
          // fall through to fallback
        }
      }
    }
    return FALLBACK_FORM_TYPES;
  }, [data]);
}

export { FALLBACK_FORM_TYPES };
