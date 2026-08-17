"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowRight,
  ArrowUpRight,
  Scale,
  FileText,
  Gavel,
} from "lucide-react";
import {
  getArticlesByCategory,
  formatDate,
  Article,
} from "../libs/mock-data";

const FONT_MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const SUB_SECTIONS = [
  {
    id: "chinh-sach",
    tag: "chính sách",
    code: "01",
    title: "Chính sách",
    description:
      "Cập nhật chính sách pháp lý mới nhất tác động đến thị trường bất động sản.",
  },
  {
    id: "quy-dinh",
    tag: "quy định",
    code: "02",
    title: "Quy định",
    description:
      "Quy định, hướng dẫn và thông tư liên quan đến bất động sản.",
  },
  {
    id: "phan-tich",
    tag: "phân tích",
    code: "03",
    title: "Phân tích pháp lý bất động sản",
    description: "Phân tích chuyên sâu về pháp lý bất động sản.",
  },
];

export default function PhapLyPage() {
  const allArticles = getArticlesByCategory("phap-ly");

  const getArticlesByTag = (tag: string) =>
    allArticles.filter((a) =>
      a.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );

  const chinhSach = getArticlesByTag("chính sách");
  const quyDinh = getArticlesByTag("quy định");
  const phanTich = getArticlesByTag("phân tích");

  return (
    <div className="bg-white">
      {/* ===== HERO — split-screen, grid pattern, floating blob ===== */}
      <section className="relative min-h-[90vh] bg-gray-900 overflow-hidden flex items-center">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating blob */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 md:py-32 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left — content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xs font-semibold tracking-[0.25em] text-primary uppercase"
                  style={FONT_MONO}
                >
                  Kepler · Kiến thức pháp lý
                </span>
                <span className="h-px flex-1 bg-primary/30 max-w-[120px]" />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-white leading-[0.9]">
                Pháp lý
                <span className="block text-primary">bất động sản</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-[48ch] font-light">
                Chính sách, quy định và phân tích chuyên sâu — góc nhìn từ chuyên gia Kepler Group.
              </p>

              {/* Quick nav cards */}
              <div className="mt-12 grid sm:grid-cols-3 gap-3">
                {SUB_SECTIONS.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="group relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-medium text-primary"
                        style={FONT_MONO}
                      >
                        {s.code}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {s.title}
                    </h3>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — visual stat panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                {/* Inner glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <div className="flex items-center gap-3 mb-8">
                  <Scale className="h-6 w-6 text-primary" />
                  <span
                    className="text-xs font-semibold tracking-widest text-white/40 uppercase"
                    style={FONT_MONO}
                  >
                    Nền tảng pháp lý
                  </span>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: FileText, label: "Chính sách", count: chinhSach.length, desc: "Cập nhật mới nhất" },
                    { icon: Gavel, label: "Quy định", count: quyDinh.length, desc: "Thông tư & hướng dẫn" },
                    { icon: Scale, label: "Phân tích", count: phanTich.length, desc: "Góc nhìn chuyên gia" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/40">{item.desc}</p>
                      </div>
                      <span
                        className="text-2xl font-bold text-primary"
                        style={FONT_MONO}
                      >
                        {String(item.count).padStart(2, "0")}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 01 — CHÍNH SÁCH: featured image + vertical list ===== */}
      <FeaturedListSection
        code="01"
        id="chinh-sach"
        title="Chính sách"
        description="Cập nhật chính sách pháp lý mới nhất tác động đến thị trường bất động sản."
        articles={chinhSach}
      />

      {/* ===== 02 — QUY ĐỊNH: clean horizontal list ===== */}
      <ListSection
        code="02"
        id="quy-dinh"
        title="Quy định"
        description="Quy định, hướng dẫn và thông tư liên quan đến bất động sản."
        articles={quyDinh}
      />

      {/* ===== 03 — PHÂN TÍCH PHÁP LÝ BĐS: featured analysis ===== */}
      <AnalysisSection
        code="03"
        id="phan-tich"
        title="Phân tích pháp lý bất động sản"
        description="Phân tích chuyên sâu về pháp lý bất động sản."
        articles={phanTich}
      />

      {/* ===== CTA — grid pattern, blobs, glassmorphism ===== */}
      <section className="relative py-24 md:py-32 bg-gray-900 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating blobs */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-10 md:p-16 text-center backdrop-blur-md"
          >
            {/* Inner glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <p
              className="text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-6"
              style={FONT_MONO}
            >
              Kepler Group
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Cần tư vấn pháp lý
              <br />
              <span className="text-primary">bất động sản?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 leading-relaxed text-lg font-light">
              Đội ngũ chuyên gia pháp lý Kepler Group sẵn sàng hỗ trợ bạn giải đáp các vấn đề về BĐS.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
            >
              Liên hệ tư vấn
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   FEATURED LIST SECTION — 01 Chính sách
   Large image left + vertical list right
   ============================================================ */
function FeaturedListSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;
  const smalls = rest.slice(0, 4);

  return (
    <section id={id} className="py-20 md:py-28 bg-white scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="text-sm font-medium text-primary"
              style={FONT_MONO}
            >
              {code}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        {lead ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
            {/* Lead — overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <Link href={`/kien-thuc/${lead.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                      style={FONT_MONO}
                    >
                      Nổi bật
                    </span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-3 text-xs" style={FONT_MONO}>
                      <span className="font-medium text-primary">
                        {formatDate(lead.date)}
                      </span>
                      <span className="h-px w-8 bg-white/30" />
                      <span className="flex items-center gap-1 text-white/60">
                        <Clock className="h-3 w-3" />
                        {lead.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 line-clamp-2">
                      {lead.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
                      {lead.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-4">
                      Đọc tiếp
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Smalls — sidebar with accent border cards */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {smalls.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    href={`/kien-thuc/${article.slug}`}
                    className="group flex gap-4 rounded-xl border-l-2 border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-primary hover:bg-white hover:shadow-md hover:shadow-primary/5"
                  >
                    {/* Number badge */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                      <span
                        className="text-sm font-bold text-primary"
                        style={FONT_MONO}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex items-center gap-2 text-xs" style={FONT_MONO}>
                        <span className="font-medium text-primary">
                          {formatDate(article.date)}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-400">{article.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary line-clamp-2">
                        {article.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center self-center">
                      <ArrowUpRight className="h-4 w-4 text-gray-300 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

/* ============================================================
   LIST SECTION — 02 Quy định
   Clean horizontal rows, no card shadow
   ============================================================ */
function ListSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  return (
    <section id={id} className="py-20 md:py-28 bg-gray-50 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="text-sm font-medium text-primary"
              style={FONT_MONO}
            >
              {code}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        {articles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/kien-thuc/${article.slug}`}
                  className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:w-[280px] sm:min-h-[200px] shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
                      style={FONT_MONO}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs" style={FONT_MONO}>
                      <span className="font-medium text-primary">
                        {formatDate(article.date)}
                      </span>
                      <span className="h-px w-6 bg-gray-200" />
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                      {article.excerpt}
                    </p>

                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-3">
                        Đọc tiếp
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Arrow icon */}
                  <div className="hidden md:flex items-center pr-6">
                    <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

/* ============================================================
   ANALYSIS SECTION — 03 Phân tích pháp lý BĐS
   Featured large analysis + list below
   ============================================================ */
function AnalysisSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;

  return (
    <section id={id} className="py-20 md:py-28 bg-white scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className="text-sm font-medium text-primary"
              style={FONT_MONO}
            >
              {code}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        {lead ? (
          <>
            {/* Featured analysis — editorial overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14 md:mb-20"
            >
              <Link href={`/kien-thuc/${lead.slug}`} className="group block">
                <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl bg-gray-900">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span
                      className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                      style={FONT_MONO}
                    >
                      Phân tích nổi bật
                    </span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="mb-4 flex items-center gap-3 text-xs" style={FONT_MONO}>
                      <span className="font-medium text-primary">
                        {formatDate(lead.date)}
                      </span>
                      <span className="h-px w-8 bg-white/30" />
                      <span className="flex items-center gap-1 text-white/60">
                        <Clock className="h-3 w-3" />
                        {lead.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3 max-w-3xl">
                      {lead.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl line-clamp-2 mb-5">
                      {lead.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-4">
                      Đọc tiếp
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* More analyses — horizontal mini-cards with accent border */}
            {rest.length > 0 && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <h3
                    className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
                    style={FONT_MONO}
                  >
                    Các phân tích mới
                  </h3>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {rest.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link
                        href={`/kien-thuc/${article.slug}`}
                        className="group flex gap-5 rounded-xl border-l-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/5"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 flex items-center gap-2 text-xs" style={FONT_MONO}>
                            <span className="font-medium text-primary">
                              {formatDate(article.date)}
                            </span>
                            <span className="text-gray-300">·</span>
                            <span className="flex items-center gap-1 text-gray-400">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-gray-500">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center self-center">
                          <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="py-20 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <FileText className="h-5 w-5 text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm font-medium">Chưa có bài viết cho mục này.</p>
      <p className="text-gray-400 text-xs mt-1">Nội dung sẽ được cập nhật sớm.</p>
    </motion.div>
  );
}
