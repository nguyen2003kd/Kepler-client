"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import { useTranslation } from "react-i18next";

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

const fallbackData: VisionMissionData = {
  vision: {
    eyebrow: "Định hướng phát triển",
    title: "Tầm nhìn – Sứ mệnh",
    cardTitle: "Tầm nhìn",
    points: [
      { text: "Xây dựng mô hình khép kín mang lại nhiều tiện ích và chất lượng cho khách hàng và đối tác với sản phẩm và dịch vụ chuyên nghiệp." },
      { text: "Trở thành công ty có dịch vụ và sản phẩm chuyên nghiệp nhất trong ngành bất động sản tại Việt Nam." },
    ],
    sideCardTitle: "",
    sideCardDesc: "",
  },
  mission: {
    eyebrow: "Sứ mệnh",
    title: "Sứ mệnh",
    cardTitle: "Sứ mệnh",
    mainDesc: "Cung cấp sản phẩm và dịch vụ tốt nhất, chuyên nghiệp nhất cho thị trường.",
    subItems: [
      { title: "Tốt nhất cho thị trường", description: "Sản phẩm và dịch vụ chuyên nghiệp, dẫn đầu về chất lượng và trải nghiệm." },
      { title: "Chuỗi giá trị cho người tiêu dùng", description: "Kết nối lợi ích bền vững giữa doanh nghiệp và cộng đồng trong lĩnh vực bất động sản." },
    ],
  },
};

export default function AboutVisionMissionSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "vi";
  const configKey = lang === "en" ? "about-vision-mission_en" : "about-vision-mission";

  const { data, isLoading } = useGetApiV10PageConfig(
    { filters: `key==${configKey}`, pageSize: 1 },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    }
  );

  let vmData: VisionMissionData = fallbackData;

  if (!isLoading) {
    const rows = (data?.responseData?.rows as PageConfig[]) ?? [];
    const row = rows.find((r) => r.key === configKey);
    if (row?.value) {
      try {
        const parsed = JSON.parse(row.value);
        if (parsed.vision && parsed.mission) {
          vmData = parsed as VisionMissionData;
        }
      } catch { /* keep fallback */ }
    }
  }

  const { vision, mission } = vmData;

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-14">
          <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
            {vision.eyebrow}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {vision.title}
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {vision.cardTitle}
              </h3>
              <ul className="space-y-4">
                {vision.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {mission.cardTitle}
              </h3>
              <ul className="space-y-4">
                {mission.subItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong className="font-semibold text-gray-900">{item.title}:</strong>{" "}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-8 text-right">
          <Link
            href="/about/vision-mission"
            className="inline-flex items-center gap-2 text-[#DC2626] font-semibold hover:gap-3 transition-all"
          >
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
