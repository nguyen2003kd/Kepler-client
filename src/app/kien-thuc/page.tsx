"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  FileBarChart,
  Map,
  Scale,
  Briefcase,
  Calculator,
  Settings,
  Building2,
  Users,
  Video,
  Mic,
  MonitorPlay,
  HelpCircle,
  ArrowRight,
  Download,
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  CATEGORIES,
  getFeaturedArticles,
  getLatestArticles,
  REPORTS,
  formatDate,
  ARTICLES,
  Article,
} from "./libs/mock-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  FileBarChart,
  Map,
  Scale,
  Briefcase,
  Calculator,
  Settings,
  Building2,
  Users,
};

function ArticleMeta({ article, light = false }: { article: Article; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-xs ${light ? "text-gray-300" : "text-gray-500"}`}>
      <span>{article.author}</span>
      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
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
  linkText,
  linkHref,
}: {
  eyebrow: string;
  headline: string;
  linkText?: string;
  linkHref?: string;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
          {eyebrow}
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
          {headline}
        </h2>
        <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors group shrink-0"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}

export default function KienThucPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(0);

  const featured = getFeaturedArticles();
  const main = featured[0];
  const side = featured.slice(1, 4);

  const articles = getLatestArticles(6);

  const searched = search.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          a.category.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  return (
    <div className="bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] overflow-hidden bg-[#1a1a1a]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Kepler Knowledge"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

        {/* Content */}
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
                <span className="text-white font-medium">Kiến thức</span>
              </nav>

              <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                Kiến thức &amp; Tin tức
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mt-4 leading-[1.1]">
                Góc nhìn từ Kepler
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
                Phân tích thị trường, nghiên cứu chuyên sâu, báo cáo và tài liệu từ đội ngũ
                chuyên gia Kepler Group — cổng vào hệ thống kiến thức bất động sản.
              </p>

              {/* Quick library links */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Thư viện
                </span>
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors group"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {m.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. FEATURED ===== */}
      {!searched && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <SectionHeader
              eyebrow="Bài nổi bật"
              headline="Tin tức đáng chú ý"
              linkText="Xem tất cả"
              linkHref="#"
            />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Main featured */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                {main && (
                  <Link href={`/kien-thuc/${main.slug}`} className="group block">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 mb-6 shadow-md group-hover:shadow-xl transition-shadow">
                      <img
                        src={main.image}
                        alt={main.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                      {main.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                      {main.title}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 max-w-2xl">
                      {main.excerpt}
                    </p>
                    <ArticleMeta article={main} />
                  </Link>
                )}
              </motion.div>

              {/* Side articles */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {side.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      href={`/kien-thuc/${article.slug}`}
                      className="group flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="w-28 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                          {article.category}
                        </span>
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg mt-1 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="mt-2">
                          <ArticleMeta article={article} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 3. LATEST ARTICLES ===== */}
      {!searched && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <SectionHeader
              eyebrow="Bài mới"
              headline="Bài viết mới nhất"
              linkText="Xem tất cả"
              linkHref="#"
            />

            {articles.length > 0 ? (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                  >
                    <Link
                      href={`/kien-thuc/${article.slug}`}
                      className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                          {article.category}
                        </span>
                        <h4 className="font-bold text-gray-900 text-base mt-2 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="mt-auto pt-4">
                          <ArticleMeta article={article} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-16 text-center bg-white rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm">
                  Chưa có bài viết trong danh mục này.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== 4. CATEGORIES ===== */}
      {!searched && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <SectionHeader
              eyebrow="Danh mục nội dung"
              headline="Cổng vào hệ thống kiến thức"
              linkText="Tất cả danh mục"
              linkHref="#"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Interactive list */}
              <div className="lg:col-span-7 space-y-1">
                {CATEGORIES.map((cat, index) => {
                  const Icon = ICON_MAP[cat.icon] || TrendingUp;
                  const isActive = activeCat === index;
                  return (
                    <motion.div
                      key={cat.slug}
                      onMouseEnter={() => setActiveCat(index)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/kien-thuc/${cat.slug}`}
                        className={`group flex items-center gap-5 border-l-2 px-6 py-5 transition-all duration-300 ${
                          isActive
                            ? "border-red-500 bg-white shadow-md"
                            : "border-gray-200 hover:border-gray-400 bg-transparent"
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"
                          }`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-gray-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3
                              className={`text-base font-bold transition-colors ${
                                isActive ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {cat.name}
                            </h3>
                            <span className="text-xs text-gray-400 font-medium">
                              {cat.articleCount} bài
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 transition-all duration-300 ${
                              isActive
                                ? "text-gray-600 opacity-100 max-h-20"
                                : "text-gray-400 opacity-0 max-h-0 overflow-hidden"
                            }`}
                          >
                            {cat.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-red-600 translate-x-0 opacity-100"
                              : "text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-50"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right: Sticky preview */}
              <div className="lg:col-span-5">
                <motion.div
                  className="sticky top-24 rounded-lg overflow-hidden shadow-xl aspect-[4/5] bg-gray-900"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Gradient background based on active category */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${CATEGORIES[activeCat]?.color || "from-gray-700 to-gray-900"} transition-all duration-500`}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
                    {/* Top: index */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-white/70 text-sm tracking-wider">
                        {String(activeCat + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
                      </span>
                      {(() => {
                        const ActiveIcon = ICON_MAP[CATEGORIES[activeCat]?.icon] || TrendingUp;
                        return (
                          <div className="w-12 h-12 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <ActiveIcon className="w-6 h-6 text-white" />
                          </div>
                        );
                      })()}
                    </div>

                    {/* Bottom: content */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                        {CATEGORIES[activeCat]?.name}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-[40ch]">
                        {CATEGORIES[activeCat]?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                          {CATEGORIES[activeCat]?.articleCount} bài viết
                        </span>
                        <Link
                          href={`/kien-thuc/${CATEGORIES[activeCat]?.slug}`}
                          className="inline-flex items-center gap-2 text-white text-sm font-medium group/link"
                        >
                          Khám phá danh mục
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== SEARCH RESULTS ===== */}
      {searched && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Kết quả tìm kiếm
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                {searched.length > 0
                  ? `${searched.length} kết quả cho "${search}"`
                  : `Không tìm thấy kết quả`}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </div>

            {searched.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searched.map((article) => (
                  <Link
                    key={article.id}
                    href={`/kien-thuc/${article.slug}`}
                    className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="font-bold text-gray-900 text-base mt-2 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto pt-4">
                        <ArticleMeta article={article} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-100 py-20 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base">
                  Không tìm thấy bài viết phù hợp với từ khóa &quot;{search}&quot;.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Thử từ khóa khác hoặc duyệt theo danh mục bên dưới.
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Xóa tìm kiếm
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== 5. REPORTS ===== */}
      {!searched && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <SectionHeader
              eyebrow="Tài nguyên"
              headline="Báo cáo & Tài liệu tải xuống"
              linkText="Tất cả tài liệu"
              linkHref="#"
            />

            <motion.div
              className="grid md:grid-cols-2 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {REPORTS.map((report) => (
                <motion.div
                  key={report.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <div className="group flex items-center gap-5 p-6 rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-xl hover:border-red-200 transition-all duration-300 cursor-pointer">
                    <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors">
                      <Download className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base group-hover:text-red-600 transition-colors">
                        {report.title}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-3">
                        <span className="px-2 py-0.5 bg-gray-100 rounded font-medium text-gray-600">
                          {report.fileType}
                        </span>
                        <span>{report.fileSize}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-red-600 transition-colors shrink-0" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== 6. FAQ CTA ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-lg p-8 md:p-16 text-white relative overflow-hidden"
          >
            {/* Atmospheric accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.12),_transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
                  Câu hỏi thường gặp
                </h2>
                <p className="text-white/70 max-w-2xl leading-relaxed">
                  Tìm câu trả lời cho các câu hỏi về dịch vụ, quy trình và chính sách
                  của Kepler Group.
                </p>
              </div>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-gray-100 transition-all group shrink-0"
              >
                Xem FAQ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
