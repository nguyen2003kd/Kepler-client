"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Download, Award } from "lucide-react";
import Link from "next/link";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { FadeIn } from "@/components/ui/fade-in";
import baseConfig from "@/configs/base";

interface CertDataItem {
  id: string;
  img: string;
  "describe-img": string;
  content: string;
}

interface CertConfig {
  title: string;
  describe: string;
  data: CertDataItem[];
}

interface CapabilityConfig {
  title: string;
  description: string;
  fileUrl?: string;
  imageUrl?: string;
}

const FALLBACK_CAPABILITY: CapabilityConfig = {
  title: "Hồ sơ năng lực Kepler Group",
  description:
    "Bộ tài liệu giới thiệu năng lực, kinh nghiệm và các dự án tiêu biểu của Kepler Group. Tải xuống để xem chi tiết.",
};

const getImageUrl = (path: string) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${baseConfig.imgEndpointDomain}${path}`;
};

export default function AboutCertificationsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: certResp } = useGetApiV10PageConfig(
    { filters: "key==certification-config", pageSize: 1 },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const { data: capabilityResp } = useGetApiV10PageConfig(
    { filters: "key==ABOUT_CAPABILITY_PROFILE", pageSize: 1 },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const certConfig = useMemo<CertConfig>(() => {
    if (!mounted) return { title: "", describe: "", data: [] };
    const rows = certResp?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value) as CertConfig;
          if (parsed.data && Array.isArray(parsed.data)) return parsed;
        } catch {
          // fall through
        }
      }
    }
    return { title: "", describe: "", data: [] };
  }, [mounted, certResp]);

  const capability = useMemo<CapabilityConfig>(() => {
    if (!mounted) return FALLBACK_CAPABILITY;
    const rows = capabilityResp?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.title) return parsed as CapabilityConfig;
        } catch {
          // fall through
        }
      }
    }
    return FALLBACK_CAPABILITY;
  }, [mounted, capabilityResp]);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chứng chỉ */}
          <FadeIn>
            <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626] flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-wider text-[#DC2626] uppercase">
                    Minh bạch & Uy tín
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                    Chứng chỉ và giấy phép
                  </h3>
                </div>
              </div>

              {certConfig.data.length > 0 ? (
                <div className="space-y-3 flex-1 mb-6">
                  {certConfig.data.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      {item.img ? (
                        <img
                          src={getImageUrl(item.img)}
                          alt={item["describe-img"] || ""}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-[#DC2626]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">
                          {item["describe-img"] || "Chứng chỉ"}
                        </p>
                        {item.content && (
                          <p
                            className="text-xs text-gray-500 mt-1 line-clamp-2 [&_p]:inline [&_*]:text-xs"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        )}
                        {item.img && (
                          <a
                            href={getImageUrl(item.img)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs text-[#DC2626] font-semibold hover:gap-2 transition-all"
                          >
                            <Download className="w-3 h-3" />
                            Tải xuống
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed flex-1 mb-6">
                  Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group
                  công bố, khẳng định sự tuân thủ và uy tín trong hoạt động kinh doanh.
                </p>
              )}

              <Link
                href="/about/certifications"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors self-start"
              >
                <Eye className="h-4 w-4" />
                Xem chứng chỉ
              </Link>
            </div>
          </FadeIn>

          {/* Hồ sơ năng lực */}
          <FadeIn delay={0.1}>
            <div className="h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#DC2626] to-red-800 p-8 md:p-10 flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:48px_48px]" />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-red-100 uppercase">
                      Năng lực Kepler
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      {capability.title || "Hồ sơ năng lực"}
                    </h3>
                  </div>
                </div>

                {capability.imageUrl ? (
                  <div className="relative mb-6 flex-1 flex items-center justify-center">
                    <img
                      src={getImageUrl(capability.imageUrl)}
                      alt={capability.title || "Hồ sơ năng lực"}
                      className="max-h-48 w-auto object-contain rounded-xl shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="relative flex-1 flex flex-col justify-center mb-6">
                    <p className="text-red-50 text-base leading-relaxed">
                      {capability.description}
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-xl bg-white/10">
                        <div className="text-2xl font-black text-white">25+</div>
                        <div className="text-xs text-red-100 mt-1">Năm kinh nghiệm</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/10">
                        <div className="text-2xl font-black text-white">08</div>
                        <div className="text-xs text-red-100 mt-1">Công ty thành viên</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white/10">
                        <div className="text-2xl font-black text-white">50+</div>
                        <div className="text-xs text-red-100 mt-1">Chuyên gia</div>
                      </div>
                    </div>
                  </div>
                )}

                {capability.imageUrl && (
                  <p className="relative text-red-50 text-sm leading-relaxed mb-6">
                    {capability.description}
                  </p>
                )}

                {capability.fileUrl && (
                  <a
                    href={capability.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#DC2626] text-sm font-semibold rounded-full hover:bg-red-50 transition-colors self-start"
                  >
                    <Download className="h-4 w-4" />
                    Tải hồ sơ năng lực
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
