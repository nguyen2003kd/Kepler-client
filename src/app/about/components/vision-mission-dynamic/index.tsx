"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface VisionPoint {
  text: string;
}

interface MissionSubItem {
  title: string;
  description: string;
}

interface VisionMissionData {
  vision: {
    eyebrow: string;
    title: string;
    cardTitle: string;
    points: VisionPoint[];
    sideCardTitle: string;
    sideCardDesc: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    cardTitle: string;
    mainDesc: string;
    subItems: MissionSubItem[];
  };
}

interface VisionMissionDynamicProps {
  pageKeyVi: string;
  pageKeyEn: string;
  fallback: ReactNode;
}

export default function VisionMissionDynamic({
  pageKeyVi,
  pageKeyEn,
  fallback,
}: VisionMissionDynamicProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "vi";
  const configKey = lang === "en" ? pageKeyEn : pageKeyVi;

  const { data, isLoading } = useGetApiV10PageConfig(
    { filters: `key==${configKey}`, pageSize: 1 },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    }
  );

  if (isLoading) return <>{fallback}</>;

  const rows = (data?.responseData?.rows as PageConfig[]) ?? [];
  const row = rows.find((r) => r.key === configKey);

  if (!row?.value) return <>{fallback}</>;

  let vmData: VisionMissionData | null = null;
  try {
    const parsed = JSON.parse(row.value);
    if (parsed.vision && parsed.mission) {
      vmData = parsed as VisionMissionData;
    }
  } catch {
    // fall through to fallback
  }

  if (!vmData) return <>{fallback}</>;

  const { vision, mission } = vmData;

  return (
    <>
      {/* Tầm nhìn — bento statement */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn className="max-w-2xl mb-16">
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              {vision.eyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {vision.title}
            </h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-5 items-stretch">
            <FadeIn className="lg:col-span-8">
              <div className="relative h-full rounded-3xl bg-white border border-gray-200 p-10 md:p-14 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                <div className="relative">
                  <div className="mb-8">
                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      {vision.cardTitle}
                    </h3>
                  </div>
                  <ul className="space-y-6">
                    {vision.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="text-lg text-gray-600 leading-relaxed">
                          {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-4" delay={0.1}>
              <div className="relative h-full rounded-3xl bg-red-600 text-white p-10 md:p-14 overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <p className="relative mt-6 text-2xl md:text-3xl font-extrabold leading-tight">
                  {vision.sideCardTitle}
                </p>
                <p className="relative mt-auto pt-8 text-white/80 leading-relaxed">
                  {vision.sideCardDesc}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sứ mệnh — overlapping layout */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn className="max-w-2xl mb-16">
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              {mission.eyebrow}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {mission.title}
            </h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-red-600 transform translate-x-5 translate-y-5" />
                <div className="relative rounded-3xl bg-white p-10 md:p-14 border border-gray-200 overflow-hidden">
                  <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
                    {mission.cardTitle}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {mission.mainDesc}
                  </p>
                  <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />
                </div>
              </div>
            </FadeIn>

            <FadeIn
              className="order-1 lg:order-2"
              delay={0.1}
              direction="left"
            >
              <div className="relative rounded-3xl bg-white border border-gray-200 p-10 md:p-14 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                <div className="relative space-y-8">
                  {mission.subItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
