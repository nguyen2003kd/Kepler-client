"use client";

import {
  Handshake,
  Building2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Users,
  Globe,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import baseConfig from "@/configs/base";

const PARTNERS_CONFIG_KEY = "Partners_config";

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

export default function DoiTacView() {
  const { data, isLoading } = useGetApiV10PageConfig(
    {
      filters: `key==${PARTNERS_CONFIG_KEY}`,
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

  const partners = useMemo(() => {
    const rows = (data?.responseData?.rows || []) as PageConfig[];
    const config = rows.find((item) => item.key === PARTNERS_CONFIG_KEY);
    return parsePartners(config?.value).filter((p) => p.is_active);
  }, [data]);

  const STATS = [
    { value: String(partners.length).padStart(2, "0"), label: "Đối tác chiến lược", icon: Handshake },
    { value: "06", label: "Lĩnh vực phủ sóng", icon: Globe },
    { value: "100+", label: "Dự án hợp tác", icon: Building2 },
    { value: "08", label: "Nhóm chuyên môn", icon: Lightbulb },
  ];

  const statGradients = [
    "from-red-500 to-rose-500",
    "from-rose-500 to-red-600",
    "from-red-600 to-red-700",
    "from-red-700 to-rose-700",
  ];

  // Marquee: lặp danh sách đối tác để chạy vô hạn
  const marqueeLoop = partners.length > 0 ? [...partners, ...partners, ...partners] : [];

  return (
    <div className="bg-white">
      {/* === HERO === */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/seo.png"
          alt="Đối tác chiến lược"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.18),_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                  <Handshake className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                  Đối tác
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Đối tác chiến lược
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                Mạng lưới đối tác đa lĩnh vực đồng hành cùng Kepler Group — từ
                ngân hàng, quỹ đầu tư đến luật, kiến trúc, nhà thầu, công nghệ,
                marketing và tư vấn chuyên sâu.
              </p>
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#all-partners"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                >
                  Xem tất cả đối tác
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/customers"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Xem khách hàng tiêu biểu
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === STATS STRIP (dark) === */}
      <section className="relative bg-gray-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statGradients[idx]}`}
                />
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <s.icon className="h-6 w-6 text-red-400" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TẤT CẢ ĐỐI TÁC (filter nhóm tạm thời disable — show all) === */}
      <section
        id="all-partners"
        className="relative bg-gray-50 py-20 md:py-28 scroll-mt-[80px]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Danh sách đối tác
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Tất cả đối tác đồng hành
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Toàn bộ mạng lưới đối tác chiến lược đang đồng hành cùng Kepler
              Group trên nhiều lĩnh vực chuyên môn.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : partners.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <Users className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">Chưa có đối tác nào được cấu hình</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {partners.map((p, i) => {
                const isLastOdd =
                  partners.length % 2 !== 0 && i === partners.length - 1;
                return (
                  <motion.a
                    key={p.id}
                    href={p.website || "#"}
                    target={p.website && p.website !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`group flex items-center gap-4 h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${isLastOdd ? "sm:col-span-2 lg:col-span-1 xl:col-span-1" : ""
                      }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden group-hover:from-red-50 group-hover:to-red-100/50 group-hover:border-red-200 transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getImageUrl(p.logo)}
                        alt={p.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors truncate">
                        {p.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        Đối tác chiến lược
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* === MARQUEE — TẤT CẢ ĐỐI TÁC CHẠY NGANG 2 HÀNG NGƯỢC CHIỀU === */}
      {marqueeLoop.length > 0 && (
        <section className="relative bg-white py-20 md:py-28 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Mạng lưới
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
                Tất cả đối tác đồng hành
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>
          </div>

          {/* Marquee row 1 — left to right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeLoop.map((p, idx) => (
                <div
                  key={`${p.id}-${idx}`}
                  className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-100 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(p.logo)}
                      alt={p.name}
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      Đối tác chiến lược
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Marquee row 2 — right to left, slower */}
          <div className="relative overflow-hidden mt-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeLoop.map((p, idx) => (
                <div
                  key={`${p.id}-r2-${idx}`}
                  className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-red-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(p.logo)}
                      alt={p.name}
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      Đối tác chiến lược
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* === CTA === */}
      <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.12),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trở thành đối tác chiến lược của{" "}
              <span className="text-red-500">Kepler</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Kepler luôn tìm kiếm những đối tác cùng tầm nhìn, cam kết chất lượng
              và hướng tới sự phát triển bền vững. Hợp tác cùng chúng tôi để mở rộng
              mạng lưới và kiến tạo giá trị chung.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Liên hệ hợp tác
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/customers"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                Xem khách hàng tiêu biểu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
