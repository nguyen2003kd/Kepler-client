"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  Download,
  FileText,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  Home,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  getArticleBySlug,
  getRelatedArticles,
  getLatestArticles,
  REPORTS,
  formatDate,
} from "../libs/mock-data";
import { ArticleCard } from "../components/article-card";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const related = useMemo(
    () => (article ? getRelatedArticles(article, 3) : []),
    [article],
  );
  const latest = useMemo(
    () =>
      article
        ? getLatestArticles(5).filter((a) => a.id !== article.id).slice(0, 4)
        : [],
    [article],
  );

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Bài viết không tồn tại.</p>
          <Link
            href="/kien-thuc"
            className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang Kiến thức
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = article.title;
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
    }
  };

  return (
    <div className="bg-white">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-1.5 text-sm text-white/60 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link
              href="/kien-thuc"
              className="hover:text-white transition-colors"
            >
              Kiến thức
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link
              href={`/kien-thuc/${article.categorySlug}`}
              className="hover:text-white transition-colors"
            >
              {article.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-5">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {article.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT + SIDEBAR ===== */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article content */}
            <div className="lg:col-span-2">
              <motion.article
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tổng quan</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {article.excerpt} Bài viết này cung cấp cái nhìn chuyên sâu từ
                  đội ngũ chuyên gia Kepler Group, dựa trên dữ liệu thực tế và
                  kinh nghiệm thực chiến trong ngành bất động sản.
                </p>

                <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                  Phân tích chi tiết
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Thị trường bất động sản đang trải qua giai đoạn biến động mạnh
                  với nhiều cơ hội và thách thức đan xen. Các yếu tố vĩ mô như
                  lãi suất, chính sách tín dụng, và dòng vốn FDI đều có tác động
                  trực tiếp đến diễn biến thị trường.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Trong bối cảnh này, nhà đầu tư cần có chiến lược rõ ràng và
                  đánh giá kỹ các yếu tố rủi ro. Kepler Group với kinh nghiệm
                  nhiều năm trong lĩnh vực thẩm định giá, môi giới và quản lý
                  tài sản cung cấp các giải pháp toàn diện cho khách hàng.
                </p>

                <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                  Đề xuất và khuyến nghị
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dựa trên phân tích trên, chúng tôi khuyến nghị nhà đầu tư:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Nghiên cứu kỹ quy hoạch khu vực trước khi đầu tư</li>
                  <li>Theo dõi các chính sách pháp lý mới nhất</li>
                  <li>Đa dạng hóa danh mục đầu tư</li>
                  <li>Tham vấn chuyên gia trước khi ra quyết định</li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  Để được tư vấn chi tiết hơn, quý khách có thể liên hệ với đội
                  ngũ chuyên gia Kepler Group qua hotline hoặc đặt lịch tư vấn
                  trực tiếp.
                </p>
              </motion.article>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ:
                </span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>

              {/* Downloads */}
              <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-red-600" />
                  Tài liệu tải xuống
                </h3>
                <div className="space-y-3">
                  {REPORTS.slice(0, 2).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200 hover:border-red-200 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {report.title}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {report.fileType} · {report.fileSize}
                        </span>
                      </div>
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 flex items-center justify-center transition-all shrink-0"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                {/* Latest */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                      Bài viết mới
                    </span>
                  </div>
                  <div className="space-y-4">
                    {latest.map((a) => (
                      <ArticleCard key={a.id} article={a} variant="compact" />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-center overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <h3 className="text-white font-bold mb-2">Cần tư vấn?</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Liên hệ chuyên gia Kepler để được hỗ trợ
                    </p>
                    <Link
                      href="/booking"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-red-600 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                    >
                      Đặt lịch tư vấn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                Cùng danh mục
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                Bài viết liên quan
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <ArticleCard article={a} />
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
            href="/kien-thuc/tat-ca"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Xem tất cả bài viết
          </Link>
        </div>
      </section>
    </div>
  );
}
