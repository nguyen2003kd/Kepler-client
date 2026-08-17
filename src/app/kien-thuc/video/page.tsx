"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video as VideoIcon,
  Play,
  Eye,
  Calendar,
  ArrowRight,
  ChevronRight,
  ChevronUp,
  Home,
  Mic,
  MonitorPlay,
  Clock,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import { VIDEOS, formatDate } from "../libs/mock-data";

const PAGE_SIZE = 6;

/* ---------- CountUp ---------- */
function CountUp({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function VideoPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => Array.from(new Set(VIDEOS.map((v) => v.category))),
    [],
  );

  const filtered = useMemo(
    () =>
      [...VIDEOS].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const stats = [
    { value: VIDEOS.length, suffix: "", label: "Video" },
    { value: categories.length, suffix: "", label: "Danh mục" },
    { value: 45, suffix: "+", label: "Giờ nội dung" },
    { value: 20, suffix: "K+", label: "Lượt xem" },
  ];

  return (
    <div className="bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative h-[70vh] min-h-[460px] max-h-[640px] overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Video Kepler"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-8">
                <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                <Link href="/kien-thuc" className="hover:text-white transition-colors">
                  Kiến thức
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white font-medium">Video</span>
              </nav>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg bg-red-600/90 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <VideoIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                  Thư viện Video
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Video Kepler
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                Webinar, hướng dẫn, Kepler Talk và tour ảo — thư viện video
                từ đội ngũ chuyên gia Kepler Group.
              </p>

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#videos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                >
                  Xem video
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/kien-thuc/podcast"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  <Mic className="w-4 h-4" />
                  Kepler Podcast
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS ===== */}
      <section className="relative bg-gray-900 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-900 p-8 md:p-10 text-center group hover:bg-gray-800 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. VIDEO LIST ===== */}
      <section id="videos" className="bg-gray-50 py-16 pt-20 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Tất cả
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
                Thư viện video
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg self-start sm:self-end">
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="Xem dạng danh sách"
                className={`flex items-center justify-center px-3 py-1.5 rounded-md transition-all ${
                  view === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Xem dạng lưới"
                className={`flex items-center justify-center px-3 py-1.5 rounded-md transition-all ${
                  view === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              className={view === "list" ? "space-y-4" : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              {visible.map((video) => (
                <motion.div
                  key={video.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  {view === "list" ? (
                    <Link
                      href={`/kien-thuc/video/${video.slug}`}
                      className="group flex items-center gap-4 md:gap-6 bg-white rounded-xl border border-gray-200 p-4 md:p-5 hover:shadow-lg hover:border-red-200 transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-40 h-24 md:w-52 md:h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/70 rounded text-white text-[10px] font-medium">
                          {video.duration}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-bold uppercase tracking-wider">
                            {video.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {video.duration}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-1 group-hover:text-red-600 transition-colors mb-1">
                          {video.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-1 mb-2">{video.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(video.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href={`/kien-thuc/video/${video.slug}`}
                      className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all">
                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2 px-2.5 py-1 bg-red-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                          {video.category}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="mt-auto flex items-center gap-3 text-xs text-gray-400 pt-3 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(video.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load more / Collapse */}
          <div className="mt-10 flex justify-center gap-3">
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
              >
                Xem thêm
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/15">
                  +{Math.min(PAGE_SIZE, filtered.length - visibleCount)}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            {visibleCount > PAGE_SIZE && (
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(PAGE_SIZE);
                  document
                    .getElementById("videos")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-all group"
              >
                Thu gọn
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center bg-white rounded-lg border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm">
                Chưa có video trong danh mục này.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 4. CTA ===== */}
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
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Khám phá thêm{" "}
              <span className="text-red-500">thư viện đa phương tiện</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Ngoài video, Kepler còn cung cấp podcast và webinar — nhiều định dạng
              nội dung để bạn tiếp cận kiến thức theo cách phù hợp nhất.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/kien-thuc/podcast"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                <Mic className="w-4 h-4" />
                Kepler Podcast
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kien-thuc/webinar"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                <MonitorPlay className="w-4 h-4" />
                Webinar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
