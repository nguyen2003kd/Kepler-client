"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileBarChart,
  Microscope,
  FileText,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Home,
  Flame,
} from "lucide-react";
import {
  getArticlesByCategory,
  getLatestArticles,
  REPORTS,
  formatDate,
  Article,
} from "../libs/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SUB_SECTIONS = [
  {
    id: "nghien-cuu",
    label: "Nghiên cứu",
    description: "Nghiên cứu chuyên sâu về thị trường và chủ đề BĐS",
    icon: Microscope,
    tags: ["nghiên cứu", "thị trường", "phân tích"],
  },
  {
    id: "bao-cao",
    label: "Báo cáo chuyên đề",
    description: "Báo cáo định kỳ và chuyên đề từ phòng nghiên cứu",
    icon: FileText,
    tags: ["báo cáo", "thị trường", "2025"],
  },
  {
    id: "tai-lieu",
    label: "Tài liệu tải xuống",
    description: "Download báo cáo, tài liệu nghiên cứu PDF",
    icon: Download,
    tags: [],
  },
];

const HERO_STATS = [
  { value: 24, suffix: "+", label: "Nghiên cứu", icon: Microscope },
  { value: 12, suffix: "", label: "Báo cáo", icon: FileText },
  { value: REPORTS.length, suffix: "", label: "Tài liệu", icon: Download },
];

function getSubArticles(tags: string[], limit = 6): Article[] {
  const catArticles = getArticlesByCategory("nghien-cuu-bao-cao");
  const latest = getLatestArticles(10);
  const all = [
    ...catArticles,
    ...latest.filter((a) => a.categorySlug !== "nghien-cuu-bao-cao"),
  ];
  const unique = all.filter(
    (a, i, self) => i === self.findIndex((s) => s.id === a.id),
  );
  const filtered = unique.filter((a) => a.tags?.some((t) => tags.includes(t)));
  return (filtered.length >= 2 ? filtered : unique).slice(0, limit);
}

/* ============ CountUp ============ */
function CountUp({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
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
          const steps = 50;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ============ Section Header ============ */
function SectionHeader({
  eyebrow,
  headline,
  description,
  icon: Icon,
  count,
}: {
  eyebrow: string;
  headline: string;
  description?: string;
  icon?: React.ElementType;
  count?: number;
}) {
  return (
    <motion.div
      className="mb-10 md:mb-12"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-red-600" />
          </div>
        )}
        <span className="text-[11px] font-semibold tracking-widest text-red-600 uppercase">
          {eyebrow}
        </span>
        {count !== undefined && (
          <span className="text-xs text-gray-400">· {count} mục</span>
        )}
      </div>
      <h2 className="text-2xl md:text-[28px] font-bold tracking-tight text-gray-900">
        {headline}
      </h2>
      {description && (
        <p className="text-gray-500 text-sm mt-1.5 max-w-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ============ Article Card ============ */
function ArticleCard({ article, featured }: { article: Article; featured?: boolean }) {
  return (
    <Card className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 rounded-2xl group h-full flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-semibold shadow-sm">
            <Flame className="w-3 h-3" />
            NỔI BẬT
          </div>
        )}
      </div>
      <CardHeader className="pb-1 pt-4 px-5">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-700 hover:bg-red-50 text-[11px] font-medium px-2 py-0.5 rounded-md"
          >
            {article.category}
          </Badge>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.date)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-2 flex-1">
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[42px] group-hover:text-red-600 transition-colors">
          <Link href={`/kien-thuc/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-5 pt-0 pb-4 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-[10px] font-semibold">
            {article.author.slice(0, 1)}
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <Link
          href={`/kien-thuc/${article.slug}`}
          className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          Đọc tiếp
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}

/* ============ Horizontal Article Card — list ngang cho Section 2 ============ */
function HorizontalArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`/kien-thuc/${article.slug}`}
      className="group flex gap-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden h-full"
    >
      {/* Ảnh bên trái */}
      <div className="relative w-32 sm:w-44 md:w-52 shrink-0 overflow-hidden bg-gray-50">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-bold text-white bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex-1 min-w-0 py-4 pr-5 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-red-50 text-red-700 hover:bg-red-50 text-[11px] font-medium px-2 py-0.5 rounded-md"
          >
            {article.category}
          </Badge>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.date)}
          </span>
        </div>
        <h3 className="text-[15px] md:text-base font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors mb-1.5">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-white text-[9px] font-semibold">
              {article.author.slice(0, 1)}
            </div>
            {article.author}
          </span>
          <span className="w-1 h-1 rounded-full bg-current opacity-40" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============ Report Card — chiều cao đồng nhất ============ */
function ReportCard({
  report,
  index,
}: {
  report: (typeof REPORTS)[0];
  index: number;
}) {
  return (
    <Card className="bg-white border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 rounded-2xl h-full flex flex-col group">
      <CardContent className="p-5 flex flex-col h-full">
        {/* Top */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-[52px] shrink-0 rounded-xl bg-gray-900 flex flex-col items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-white/80 mb-0.5" />
            <span className="text-white text-[9px] font-mono font-bold uppercase tracking-wider">
              {report.fileType}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                {report.category}
              </span>
              <span className="text-[11px] text-gray-300 font-mono">
                #{String(index + 1).padStart(3, "0")}
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[42px] group-hover:text-red-600 transition-colors">
              {report.title}
            </h3>
          </div>
        </div>

        {/* Description cố định */}
        <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed min-h-[40px]">
          {report.description}
        </p>

        {/* Footer dính đáy */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(report.date)}
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Tải xuống
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============ SECTION 1 ============ */
function Section1({ sub }: { sub: (typeof SUB_SECTIONS)[0] }) {
  const articles = getSubArticles(sub.tags, 7);
  const [featured, ...rest] = articles;
  const gridArticles = rest.slice(0, 6);

  return (
    <section id={sub.id} className="py-14 md:py-18 bg-white scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="01 · Research"
          headline={sub.label}
          description={sub.description}
          icon={sub.icon}
          count={articles.length}
        />

        {/* Featured ngang — ảnh trái, nội dung phải, aspect thấp */}
        {featured && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link href={`/kien-thuc/${featured.slug}`} className="group block">
              <Card className="bg-white border border-gray-100 overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 rounded-2xl">
                <div className="flex flex-col md:flex-row">
                  {/* Ảnh — chiếm 1/2, aspect thấp */}
                  <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-50">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-semibold shadow-sm">
                      <Flame className="w-3.5 h-3.5" />
                      NỔI BẬT
                    </div>
                  </div>
                  {/* Nội dung — chiếm 1/2 */}
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 mb-3">
                      <Badge className="bg-red-50 text-red-700 hover:bg-red-50 text-[11px]">
                        {featured.category}
                      </Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(featured.date)}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors mb-3">
                      {featured.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-5">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-semibold">
                          {featured.author.slice(0, 1)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{featured.author}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featured.readTime}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-red-600 flex items-center gap-1.5">
                        Đọc nghiên cứu
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Grid 3 cột bên dưới */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridArticles.map((article, i) => (
            <motion.div
              key={article.id}
              className="h-full"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 2 ============ */
function Section2({ sub }: { sub: (typeof SUB_SECTIONS)[0] }) {
  const articles = getSubArticles(sub.tags, 6);

  return (
    <section id={sub.id} className="py-14 md:py-18 bg-gray-50/60 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="02 · Reports"
          headline={sub.label}
          description={sub.description}
          icon={sub.icon}
          count={articles.length}
        />

        {/* List ngang 2 cột — khác kiểu với Section 1 */}
        <div className="grid sm:grid-cols-2 gap-5">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              className="h-full"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <HorizontalArticleCard article={article} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 3 ============ */
function Section3({ sub }: { sub: (typeof SUB_SECTIONS)[0] }) {
  return (
    <section id={sub.id} className="py-14 md:py-18 bg-white scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
        <SectionHeader
          eyebrow="03 · Downloads"
          headline={sub.label}
          description={sub.description}
          icon={sub.icon}
          count={REPORTS.length}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPORTS.map((report, i) => (
            <motion.div
              key={report.id}
              className="h-full"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ReportCard report={report} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
export default function NghienCuuBaoCaoPage() {
  const [activeSub, setActiveSub] = useState(SUB_SECTIONS[0].id);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[44vh] min-h-[360px] max-h-[480px] overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Nghiên cứu và Báo cáo"
            className="w-full h-full object-cover opacity-[0.18]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-[1200px] w-full mx-auto px-5 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <nav className="flex items-center gap-1.5 text-sm text-white/45 mb-5">
                <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/25" />
                <Link href="/kien-thuc" className="hover:text-white transition-colors">
                  Kiến thức
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-white/25" />
                <span className="text-white/75">Nghiên cứu và Báo cáo</span>
              </nav>

              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                  <FileBarChart className="w-4.5 h-4.5 text-red-400" />
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-red-400 uppercase">
                  Danh mục kiến thức
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
                Nghiên cứu và Báo cáo
              </h1>
              <p className="text-white/55 text-[15px] leading-relaxed mt-3.5 max-w-xl">
                Nghiên cứu chuyên sâu, báo cáo định kỳ và tài liệu tải xuống từ đội ngũ chuyên gia Kepler Group.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-7">
                {HERO_STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-lg md:text-xl font-bold text-white tabular-nums leading-none">
                          <CountUp value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-[11px] text-white/45 mt-0.5">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
            {SUB_SECTIONS.map((sub) => {
              const isActive = activeSub === sub.id;
              const Icon = sub.icon;
              return (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  onClick={() => setActiveSub(sub.id)}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                    isActive
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sub.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Section1 sub={SUB_SECTIONS[0]} />
      <Section2 sub={SUB_SECTIONS[1]} />
      <Section3 sub={SUB_SECTIONS[2]} />
    </div>
  );
}