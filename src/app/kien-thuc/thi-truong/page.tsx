"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Home,
  Activity,
  Mail,
  LineChart,
  PiggyBank,
  Sparkles,
  ChevronDown,
  Flame,
  BookOpen,
} from "lucide-react";
import {
  getArticlesByCategory,
  getLatestArticles,
  formatDate,
  Article,
} from "../libs/mock-data";

const SUB_CATEGORIES = [
  {
    id: "phan-tich",
    label: "Phân tích thị trường",
    icon: LineChart,
    tags: ["thị trường", "phân tích"],
    count: 8,
  },
  {
    id: "xu-huong",
    label: "Xu hướng",
    icon: TrendingUp,
    tags: ["xu hướng", "căn hộ", "2025"],
    count: 6,
  },
  {
    id: "dau-tu",
    label: "Thông tin đầu tư",
    icon: PiggyBank,
    tags: ["đầu tư", "BĐS công nghiệp", "M&A"],
    count: 10,
  },
];

const HERO_STATS = [
  { value: 24, suffix: "", label: "Bài phân tích", icon: BookOpen },
  { value: 3, suffix: "", label: "Chuyên mục con", icon: Activity },
  { value: 100, suffix: "%", label: "Cập nhật hàng tuần", icon: Sparkles },
];

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count, duration]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {formatDate(article.date)}
      </span>
      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {article.readTime}
      </span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  headline,
  href,
  linkText,
}: {
  eyebrow: string;
  headline: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
          {headline}
        </h2>
        <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-orange-400" />
      </div>
      {href && linkText && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors group shrink-0"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}

export default function ThiTruongPage() {
  const [activeSub, setActiveSub] = useState(SUB_CATEGORIES[0].id);

  const allArticles = useMemo(() => {
    const byCategory = getArticlesByCategory("thi-truong");
    const latest = getLatestArticles(10);
    const combined = [...byCategory, ...latest.filter((a) => a.categorySlug !== "thi-truong")];
    return combined.filter((a, i, self) => i === self.findIndex((s) => s.id === a.id));
  }, []);

  // Lọc bài theo sub-category đang chọn (qua tags)
  const activeSubData = SUB_CATEGORIES.find((s) => s.id === activeSub);
  const activeTags = activeSubData?.tags || [];
  const subArticles = useMemo(() => {
    const filtered = allArticles.filter((a) => a.tags?.some((t) => activeTags.includes(t)));
    return filtered.length >= 3 ? filtered : allArticles;
  }, [activeTags, allArticles]);

  const [featuredArticle, ...restArticles] = subArticles;
  const sidebarArticles = restArticles.slice(0, 3);
  const gridArticles = restArticles.slice(3, 9);

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative h-[52vh] min-h-[420px] max-h-[600px] overflow-hidden bg-[#0f0f0f]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Góc nhìn thị trường"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-orange-900/20" />

        {/* Decorative floating orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-red-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 md:mb-8">
                <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                <Link href="/kien-thuc" className="hover:text-white transition-colors">
                  Kiến thức
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white font-medium">Góc nhìn thị trường</span>
              </nav>

              <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                Danh mục kiến thức
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mt-4">
                Góc nhìn thị trường
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">
                Phân tích thị trường, xu hướng và thông tin đầu tư — góc nhìn chuyên sâu
                từ đội ngũ chuyên gia Kepler Group.
              </p>

              {/* Animated stats row */}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-6 md:gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {HERO_STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <Icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-extrabold text-white tabular-nums">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-xs text-white/60 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs uppercase tracking-widest">Cuộn xuống</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SUB-CATEGORY PILLS ===== */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 py-4 overflow-x-auto no-scrollbar">
            {SUB_CATEGORIES.map((sub) => {
              const isActive = activeSub === sub.id;
              const Icon = sub.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sub.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-gray-500"
                    }`}
                  >
                    {sub.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED + SIDEBAR (lọc theo sub đang chọn) ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader
            eyebrow={activeSubData?.label || "Bài nổi bật"}
            headline="Bài nổi bật"
            linkText="Xem tất cả"
            href="/kien-thuc/tat-ca"
          />

          <motion.div
            key={`featured-${activeSub}`}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Featured main */}
            <div className="lg:col-span-7">
              {featuredArticle && (
                <Link href={`/kien-thuc/${featuredArticle.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg">
                      <Flame className="w-3.5 h-3.5" />
                      NỔI BẬT
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                    {featuredArticle.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mt-5 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-5 max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>
                  <ArticleMeta article={featuredArticle} />
                </Link>
              )}
            </div>

            {/* Sidebar - bài cùng sub */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                <span className="w-1 h-5 rounded-full bg-red-500" />
                Bài đọc nhiều
              </div>
              {sidebarArticles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="relative w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-red-600 shadow">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-base mt-1 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="mt-2">
                      <ArticleMeta article={article} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES GRID ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeader
            eyebrow="Bài mới nhất"
            headline={activeSubData?.label || "Bài viết mới nhất"}
            linkText="Xem tất cả"
            href="/kien-thuc/tat-ca"
          />

          <motion.div
            key={activeSub}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {gridArticles.map((article) => (
              <motion.div
                key={`${article.id}-${activeSub}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Link
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 inline-block px-2.5 py-1 bg-white/95 backdrop-blur-sm text-red-600 text-xs font-semibold rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 text-base group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <ArticleMeta article={article} />
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                        Đọc tiếp
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 p-8 md:p-12 shadow-2xl"
          >
            {/* Decorative orbs */}
            <motion.div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-orange-400/10 blur-3xl"
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  Bản tin thị trường
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-3">
                  Nhận phân tích thị trường hàng tuần
                </h3>
                <p className="text-white/80 mt-2 leading-relaxed">
                  Cập nhật xu hướng, số liệu và góc nhìn chuyên sâu từ Kepler Group qua email.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-5 py-3 rounded-lg bg-white/95 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white min-w-[240px]"
                />
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-red-600 text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap"
                >
                  Đăng ký ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
