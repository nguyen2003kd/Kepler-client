"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import baseConfig from "@/configs/base";
import { useMemo } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CUSTOMERS_CONFIG_KEY = "Customers_config";
const LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY = "Customers_partners_config";

interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  is_active: boolean;
}

function getImageUrl(logo: string | undefined): string {
  if (!logo || logo.trim() === "") return "/seo.png";
  return logo.startsWith("http") ? logo : `${baseConfig.imgEndpointDomain}${logo}`;
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

export default function CustomersSection() {
  const { data, isLoading } = useGetApiV10PageConfig(
    {
      filters: `key==${CUSTOMERS_CONFIG_KEY}`,
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
  // Fallback: nếu key mới chưa có dữ liệu thì đọc key cũ (gộp chung)
  const { data: legacyData } = useGetApiV10PageConfig(
    {
      filters: `key==${LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY}`,
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

  const customers = useMemo(() => {
    const rows = (data?.responseData?.rows || []) as PageConfig[];
    const config = rows.find((item) => item.key === CUSTOMERS_CONFIG_KEY);
    if (config?.value) {
      const parsed = parsePartners(config.value);
      if (parsed.length > 0) return parsed.filter((p) => p.is_active);
    }
    // Fallback key cũ
    const legacyRows = (legacyData?.responseData?.rows || []) as PageConfig[];
    const legacyConfig = legacyRows.find(
      (item) => item.key === LEGACY_CUSTOMERS_PARTNERS_CONFIG_KEY
    );
    return parsePartners(legacyConfig?.value).filter((p) => p.is_active);
  }, [data, legacyData]);

  if (isLoading) {
    return (
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        </div>
      </section>
    );
  }

  if (customers.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.5}>
          <div className="mb-6 md:mb-10">
            <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Khách hàng</span>
            <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
              Khách hàng đã đồng hành
            </h2>
            <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
              Những khách hàng tin tưởng và đồng hành cùng Kepler.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            loop={customers.length > 1}
            speed={4000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove
            className="!pb-12"
          >
            {customers.map((c) => (
              <SwiperSlide key={c.id} className="!w-[300px]">
                <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[180px]">
                  <div className="relative w-16 h-16 mb-4">
                    <SafeImage
                      src={getImageUrl(c.logo)}
                      alt={c.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="64px"
                    />
                  </div>
                  <h3 className="text-[#1a1a1a] text-sm font-serif font-bold leading-tight">
                    {c.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
