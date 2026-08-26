"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Home,
  CheckCircle2,
  User,
} from "lucide-react";
import {
  formatDate,
  getWebinarBySlug,
  getRelatedWebinars,
} from "../../libs/mock-data";

export default function WebinarDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const webinar = useMemo(() => getWebinarBySlug(slug), [slug]);
  const related = useMemo(
    () => (webinar ? getRelatedWebinars(webinar, 3) : []),
    [webinar],
  );

  if (!webinar) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Webinar không tồn tại.</p>
          <Link
            href="/kien-thuc/webinar"
            className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách webinar
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = webinar.status === "upcoming";

  return (
    <div className="bg-white">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" />
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/kien-thuc" className="hover:text-white transition-colors">
              Kiến thức
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/kien-thuc/webinar" className="hover:text-white transition-colors">
              Webinar
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white font-medium line-clamp-1">
              {webinar.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ===== PLAYER / BANNER ===== */}
      <section className="relative bg-black py-10 md:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 aspect-video flex items-center justify-center p-8 md:p-12">
              <div className="text-center max-w-2xl">
                <div className="flex items-center justify-center gap-2 mb-5">
                  {isUpcoming ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      <Calendar className="w-3 h-3" />
                      Sắp diễn ra
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã ghi hình
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
                    {webinar.category}
                  </span>
                </div>

                <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-xl mx-auto mb-6">
                  {isUpcoming ? (
                    <Calendar className="w-9 h-9 text-white" />
                  ) : (
                    <Play className="w-9 h-9 text-white ml-1" fill="currentColor" />
                  )}
                </button>

                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {webinar.title}
                </h1>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
                  {webinar.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Meta + CTA */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(webinar.date)} · {webinar.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {webinar.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {webinar.speaker}
              </span>
            </div>

            {isUpcoming && webinar.registrationUrl && (
              <a
                href={webinar.registrationUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Đăng ký tham gia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>

          {/* Tags */}
          {webinar.tags && webinar.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {webinar.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== RELATED ===== */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Cùng chủ đề
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                Webinar liên quan
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={`/kien-thuc/webinar/${rel.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all h-full"
                  >
                    <div className="relative h-32 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 z-10">
                        {rel.status === "upcoming" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Sắp diễn ra
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Đã ghi hình
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                          {rel.status === "upcoming" ? (
                            <Calendar className="w-5 h-5 text-white group-hover:text-red-600 transition-colors" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5 group-hover:text-red-600 transition-colors" fill="currentColor" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors mb-2">
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(rel.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rel.duration}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BACK CTA ===== */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <Link
            href="/kien-thuc/webinar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tất cả webinar
          </Link>
        </div>
      </section>
    </div>
  );
}
