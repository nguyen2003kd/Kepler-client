"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  TrendingUp,
  FileBarChart,
  Map,
  Scale,
  Briefcase,
  Calculator,
  Settings,
  Building2,
  Users,
  LayoutGrid,
} from "lucide-react";
import {
  ARTICLES,
  CATEGORIES,
  formatDate,
} from "../libs/mock-data";

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

const PAGE_SIZE = 9;

function CatCard({
  icon: Icon,
  name,
  count,
  active,
  onClick,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 w-[120px] md:w-[140px] flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200 ${
        active
          ? "bg-red-50 border-red-600 text-red-600 shadow-md"
          : "bg-white border-gray-100 text-gray-600 hover:border-red-200 hover:bg-red-50/50"
      }`}
    >
      <div
        className={`w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all ${
          active ? "bg-red-600 text-white" : "bg-red-50 text-red-600"
        }`}
      >
        {Icon ? <Icon className="w-5 h-5 md:w-6 md:h-6" /> : <Users className="w-5 h-5 md:w-6 md:h-6" />}
      </div>
      <div className="text-center min-w-0 w-full">
        <p className={`text-xs md:text-sm font-bold leading-tight line-clamp-2 ${active ? "text-red-700" : "text-gray-700"}`}>
          {name}
        </p>
        <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">{count} bài</p>
      </div>
    </button>
  );
}

export default function AllArticlesPage() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const catRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (catRef.current) {
      const amount = 240;
      catRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const filtered = useMemo(() => {
    let list = [...ARTICLES].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (activeCat !== "all") {
      list = list.filter((a) => a.categorySlug === activeCat);
    }
    return list;
  }, [activeCat]);

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCatChange = (cat: string) => {
    setActiveCat(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative h-[40vh] min-h-[300px] max-h-[480px] overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Tất cả bài viết"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
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
                <span className="text-white font-medium">Tất cả bài viết</span>
              </nav>

              <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                Thư viện kiến thức
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mt-4">
                Tất cả bài viết
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">
                Tổng hợp toàn bộ bài viết, phân tích và nghiên cứu từ đội ngũ chuyên gia
                Kepler Group — cập nhật mới nhất.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="py-8 md:py-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Danh mục kiến thức</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 items-center justify-center hover:text-red-600 hover:border-red-200 transition-all shrink-0"
                aria-label="Cuộn trái"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={catRef}
                className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-0.5"
              >
                <CatCard
                  icon={LayoutGrid}
                  name="Tất cả"
                  count={ARTICLES.length}
                  active={activeCat === "all"}
                  onClick={() => handleCatChange("all")}
                />
                {CATEGORIES.map((cat) => (
                  <CatCard
                    key={cat.slug}
                    icon={ICON_MAP[cat.icon]}
                    name={cat.name}
                    count={ARTICLES.filter((a) => a.categorySlug === cat.slug).length}
                    active={activeCat === cat.slug}
                    onClick={() => handleCatChange(cat.slug)}
                  />
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 items-center justify-center hover:text-red-600 hover:border-red-200 transition-all shrink-0"
                aria-label="Cuộn phải"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES GRID ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                {filtered.length} bài viết
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-2">
                {activeCat === "all"
                  ? "Tất cả bài viết"
                  : CATEGORIES.find((c) => c.slug === activeCat)?.name || "Bài viết"}
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-red-500" />
            </div>
          </div>

          {visibleArticles.length > 0 ? (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {visibleArticles.map((article) => (
                <motion.div
                  key={article.id}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
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
          ) : (
            <div className="py-16 text-center bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500 text-sm">
                Không tìm thấy bài viết phù hợp.
              </p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
