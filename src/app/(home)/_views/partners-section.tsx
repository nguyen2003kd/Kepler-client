"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import baseConfig from "@/configs/base";

import "swiper/css";

interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  is_active: boolean;
}

const CUSTOMERS_PARTNERS_CONFIG_KEY = "Customers_partners_config";

function getImageUrl(logo: string | undefined): string {
  if (!logo || logo.trim() === "") return "/seo.png";
  return logo.startsWith("http") ? logo : `${baseConfig.imgEndpointDomain}${logo}`;
}

function parsePartners(value: string): Partner[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function PartnersSection() {
  const { data, isLoading } = useGetApiV10PageConfig(
    {
      filters: `key==${CUSTOMERS_PARTNERS_CONFIG_KEY}`,
      pageSize: 1,
    },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    }
  );

  const partners: Partner[] = (() => {
    if (!data?.responseData?.rows) return [];
    const rows = data.responseData.rows as PageConfig[];
    const config = rows.find((item) => item.key === CUSTOMERS_PARTNERS_CONFIG_KEY);
    return parsePartners(config?.value || "");
  })();

  const activePartners = partners.filter((p) => p.is_active);
  const LOOP_PARTNERS = [...activePartners, ...activePartners, ...activePartners];

  if (isLoading) {
    return (
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (activePartners.length === 0) return null;
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Đối tác</span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Đối tác của Kepler
              </h2>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                Mạng lưới đối tác chiến lược đồng hành cùng phát triển.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView={"auto"}
            loop
            freeMode
            speed={3000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove
            className="!overflow-hidden"
          >
            {LOOP_PARTNERS.map((partner, idx) => (
              <SwiperSlide key={`${partner.id}-${idx}`} className="!w-[200px] !mr-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-32 h-32">
                    <SafeImage
                      src={getImageUrl(partner.logo)}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{partner.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
