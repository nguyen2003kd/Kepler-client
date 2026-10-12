"use client";

import Image from "@/components/common/safe-image";
// import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiV10BaseConfig } from "@/api/endpoints/base-config";
import { BaseConfig } from "@/api/models";
import baseConfig from "@/configs/base";
import { useTranslation } from "react-i18next";

interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  is_active: boolean;
}

const CUSTOMERS_CONFIG_KEY = "Customers_config";
const PARTNERS_CONFIG_KEY = "Partners_config";
const LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY = "Customers_partners_config";

function getImageUrl(logo: string | undefined): string {
  if (!logo || logo.trim() === "") return "/seo.png";
  return logo.startsWith("http")
    ? logo
    : `${baseConfig.imgEndpointDomain}${logo}`;
}

function parsePartners(value: string | null | undefined): Partner[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function useBaseConfigPartners(key: string) {
  return useGetApiV10BaseConfig(
    {
      filters: `key==${key}`,
      pageSize: 1,
    },
    {
      query: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    }
  );
}

function extractPartners(
  data: { responseData?: { rows?: unknown[] } } | undefined,
  key: string
): Partner[] {
  const rows = (data?.responseData?.rows || []) as BaseConfig[];
  const config = rows.find((item) => item.key === key);
  return parsePartners(config?.value);
}

export default function Clients() {
  const { t } = useTranslation("pages/about");
  const { data: customersData, isLoading: isCustomersLoading } =
    useBaseConfigPartners(CUSTOMERS_CONFIG_KEY);
  const { data: partnersData, isLoading: isPartnersLoading } =
    useBaseConfigPartners(PARTNERS_CONFIG_KEY);
  // Fallback: nếu 2 key mới chưa có dữ liệu thì đọc key cũ (gộp chung)
  const { data: legacyData } = useBaseConfigPartners(
    LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY
  );

  const isLoading = isCustomersLoading || isPartnersLoading;

  const customers: Partner[] = (() => {
    const active = extractPartners(customersData, CUSTOMERS_CONFIG_KEY).filter(
      (p) => p.is_active
    );
    if (active.length > 0) return active;
    // Fallback key cũ (gộp chung khách hàng + đối tác)
    return extractPartners(
      legacyData,
      LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY
    ).filter((p) => p.is_active);
  })();

  const partners: Partner[] = extractPartners(
    partnersData,
    PARTNERS_CONFIG_KEY
  ).filter((p) => p.is_active);

  const sections = [
    { label: t("clients"), items: customers },
    { label: t("partners"), items: partners },
  ].filter((section) => section.items.length > 0);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto h-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <h2 className="text-4xl font-bold mb-12">{t("clientsPartners")}</h2>
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sections.length === 0) {
    return null;
  }

  const renderCarousel = (items: Partner[]) => (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      loop={items.length > 6}
      speed={800}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
      }}
      className="w-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={`item-${item.id}-${index}`}>
          <div className="flex items-center justify-center p-2 h-40">
            <a
              href={item.website || "#"}
              target={item.website ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`relative w-full h-full ${item.website ? "cursor-pointer" : "cursor-default"}`}
            >
              <Image
                src={getImageUrl(item.logo)}
                alt={item.name}
                fill
                className="object-contain"
              />
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto h-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <h2 className="text-4xl font-bold mb-12">{t("clientsPartners")}</h2>

          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.label}>
                <h3 className="text-xl font-semibold text-gray-700 mb-6">
                  {section.label}
                </h3>
                {renderCarousel(section.items)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
