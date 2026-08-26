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
            <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider text-[#DC2626] uppercase">
                  Minh bạch & Uy tín
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  Chứng chỉ và giấy phép
                </h3>
              </div>

              {certConfig.data.length > 0 ? (
                <div className="space-y-3 mb-6">
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
                <p className="text-gray-600 leading-relaxed mb-6">
                  Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group
                  công bố, khẳng định sự tuân thủ và uy tín trong hoạt động kinh doanh.
                </p>
              )}

              <Link
                href="/about/certifications"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
              >
                <Eye className="h-4 w-4" />
                Xem chứng chỉ
              </Link>
            </div>
          </FadeIn>

          {/* Hồ sơ năng lực */}
          <FadeIn delay={0.1}>
            <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <span className="text-xs font-semibold tracking-wider text-[#DC2626] uppercase">
                  Năng lực Kepler
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {capability.title || "Hồ sơ năng lực"}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {capability.description}
              </p>
              {capability.fileUrl && (
                <a
                  href={capability.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Tải hồ sơ năng lực
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
