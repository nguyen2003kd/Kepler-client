"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronUp,
  Home,
  Calendar,
  Clock,
  Video,
  Mic,
  MonitorPlay,
} from "lucide-react";
import {
  ARTICLES,
  Article,
  formatDate,
  getCategoryBySlug,
} from "../libs/mock-data";

const CATEGORY_SLUG = "hoat-dong-kepler";

const SUB_SECTIONS = [
  {
    key: "tin-doanh-nghiep",
    title: "Tin doanh nghiệp",
    description: "Tin tức hoạt động, báo cáo và cột mốc Kepler Group.",
    tag: "tin doanh nghiệp",
    accent: "from-red-600 to-red-800",
  },
  {
    key: "su-kien",
    title: "Sự kiện",
    description: "Triển lãm, workshop, gala và các sự kiện Kepler tham gia.",
    tag: "sự kiện",
    accent: "from-amber-500 to-orange-600",
  },
  {
    key: "noi-bo-hop-tac",
    title: "Hoạt động nội bộ & hợp tác",
    description: "Đào tạo, hợp tác chiến lược và chương trình đối tác.",
    tag: "nội bộ & hợp tác",
    accent: "from-rose-500 to-pink-600",
  },
] as const;

type FilterKey = "all" | (typeof SUB_SECTIONS)[number]["key"];

/* ---------- CountUp (from home stats-section) ---------- */
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

export default function HoatDongKeplerPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const PAGE_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const category = getCategoryBySlug(CATEGORY_SLUG);

  const allArticles = useMemo(
    () =>
      ARTICLES.filter((a) => a.categorySlug === CATEGORY_SLUG).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const bySub = useMemo(() => {
    const map: Record<string, Article[]> = {};
    for (const sub of SUB_SECTIONS) {
      map[sub.key] = allArticles.filter((a) =>
        (a.tags ?? []).some((t) => t.toLowerCase() === sub.tag),
      );
    }
    return map;
  }, [allArticles]);

  const filteredArticles = useMemo(() => {
    if (filter === "all") return allArticles;
    return bySub[filter] ?? [];
  }, [filter, allArticles, bySub]);

  // Reset pagination khi đổi filter
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  if (!category) return null;

  const stats = [
    { value: allArticles.length, suffix: "", label: "Bài viết hoạt động" },
    { value: SUB_SECTIONS.length, suffix: "", label: "Nhóm nội dung" },
    { value: 25, suffix: "+", label: "Sự kiện/năm" },
    { value: 50, suffix: "+", label: "Đối tác chiến lược" },
  ];

  return (
    <div className="bg-white">
      {/* ===== 1. HERO (ref: banner-section) ===== */}
      <section className="relative h-[70vh] min-h-[460px] max-h-[640px] overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <img
            src="/images/service-2.png"
            alt={category.name}
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
              {/* Breadcrumb */}
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
                <span className="text-white font-medium">{category.name}</span>
              </nav>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg bg-red-600/90 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                  Hoạt động Kepler
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {category.name}
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                {category.description} — cập nhật những hoạt động, sự kiện
                và cột mốc phát triển của Kepler Group.
              </p>

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#articles"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                >
                  Khám phá bài viết
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Kết nối Kepler
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS (ref: stats-section) ===== */}
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

      {/* ===== 3. ARTICLES (ref: news-section with tabs + sidebar) ===== */}
      <section id="articles" className="bg-gray-50 py-16 pt-20 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              {filter === "all" ? "Tất cả" : "Đã lọc"}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              {filter === "all"
                ? "Tin hoạt động"
                : SUB_SECTIONS.find((s) => s.key === filter)?.title}
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          {/* Filter tabs */}
          <div className="mb-10 border-b border-gray-200">
            <div className="flex flex-wrap gap-8 pb-4">
              <FilterTab
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="Tất cả"
                count={allArticles.length}
              />
              {SUB_SECTIONS.map((s) => (
                <FilterTab
                  key={s.key}
                  active={filter === s.key}
                  onClick={() => setFilter(s.key)}
                  label={s.title}
                  count={bySub[s.key]?.length ?? 0}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            {/* Main articles list */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {visibleArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      }}
                    >
                      <Link
                        href={`/kien-thuc/${article.slug}`}
                        className="md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-gray-100 shrink-0"
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div className="md:w-3/5 p-5 md:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                              {article.category}
                            </span>
                            <span className="text-gray-400 text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(article.date)}
                            </span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                            <Link href={`/kien-thuc/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                        <Link
                          href={`/kien-thuc/${article.slug}`}
                          className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                        >
                          Đọc tiếp →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Load more / Collapse */}
              <div className="mt-8 flex justify-center gap-3">
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
                  >
                    Xem thêm
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/15">
                      +{Math.min(PAGE_SIZE, filteredArticles.length - visibleCount)}
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
                        .getElementById("articles")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-all group"
                  >
                    Thu gọn
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}
              </div>

              {!hasMore && visibleCount <= PAGE_SIZE && filteredArticles.length > PAGE_SIZE && (
                <p className="mt-8 text-center text-xs text-gray-400 uppercase tracking-wider">
                  Đã xem tất cả {filteredArticles.length} bài viết
                </p>
              )}

              {filteredArticles.length === 0 && (
                <div className="py-16 text-center bg-white rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm">
                    Chưa có bài viết trong nhóm này.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar: latest + library */}
            <motion.div
              className="lg:col-span-3 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Latest in category */}
              <div className="sticky top-6 rounded-xl bg-white overflow-hidden shadow-lg border border-gray-200">
                <div className="bg-gray-900 px-5 py-5 border-b border-gray-200">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <div className="w-1 h-4 bg-red-500 rounded-full" />
                    Mới nhất
                  </h3>
                </div>
                <div className="p-2">
                  {allArticles.slice(0, 6).map((item, index) => (
                    <div key={item.id}>
                      <Link
                        href={`/kien-thuc/${item.slug}`}
                        className="flex items-start gap-2.5 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="flex-shrink-0 w-14 h-11 rounded overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 group-hover:text-gray-900 leading-snug font-medium line-clamp-2 mb-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </p>
                        </div>
                        <ArrowRight className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                      </Link>
                      {index < Math.min(5, allArticles.length - 1) && (
                        <hr className="my-1 border-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Library CTA mini */}
              <div className="rounded-xl bg-gray-900 overflow-hidden shadow-lg p-6">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-red-500 rounded-full" />
                  Thư viện
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: Video, label: "Video", href: "/kien-thuc/video" },
                    { icon: Mic, label: "Podcast", href: "/kien-thuc/podcast" },
                    { icon: MonitorPlay, label: "Webinar", href: "/kien-thuc/webinar" },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <Link
                        key={m.label}
                        href={m.href}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-300 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors">
                          <Icon className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white group-hover:text-gray-900 transition-colors flex-1">
                          {m.label}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-red-600 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. CTA (ref: cta-section) ===== */}
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
              Kết nối cùng{" "}
              <span className="text-red-500">Kepler Group</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Quý đối tác, khách hàng và báo chí có nhu cầu phối hợp sự kiện,
              hợp tác chiến lược hoặc trao đổi truyền thông — đội ngũ Kepler
              luôn sẵn sàng lắng nghe và đồng hành.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Liên hệ hợp tác
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dat-lich-tu-van"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                Đặt lịch tư vấn
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Filter tab (ref: news-section tabs) ---------- */
function FilterTab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-4 text-base font-medium transition-colors border-b-2 -mb-px ${
        active
          ? "text-gray-900 border-red-600"
          : "text-gray-500 border-transparent hover:text-gray-700"
      }`}
    >
      {label}
      <span
        className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
