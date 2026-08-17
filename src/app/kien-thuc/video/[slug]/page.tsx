"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Play,
  Eye,
  Calendar,
  Clock,
  ChevronRight,
  Home,
  ArrowLeft,
} from "lucide-react";
import {
  formatDate,
  getVideoBySlug,
  getRelatedVideos,
} from "../../libs/mock-data";

export default function VideoDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const video = useMemo(() => getVideoBySlug(slug), [slug]);
  const related = useMemo(
    () => (video ? getRelatedVideos(video, 3) : []),
    [video],
  );

  if (!video) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Video không tồn tại.</p>
          <Link
            href="/kien-thuc/video"
            className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách video
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
            <Link href="/kien-thuc/video" className="hover:text-white transition-colors">
              Video
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white font-medium line-clamp-1">
              {video.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ===== VIDEO PLAYER ===== */}
      <section className="relative bg-black py-10 md:py-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 hover:bg-red-500 transition-all shadow-xl">
                <Play className="w-9 h-9 text-white ml-1" fill="white" />
              </button>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 rounded text-white text-sm font-medium">
              {video.duration}
            </div>
          </motion.div>

          {/* Video info */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                {video.category}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(video.date)}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {video.views} lượt xem
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {video.duration}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {video.title}
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 max-w-3xl">
              {video.description}
            </p>

            {video.tags && video.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== RELATED VIDEOS ===== */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
                Video liên quan
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={`/kien-thuc/video/${rel.slug}`}
                    className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-all">
                          <Play className="w-5 h-5 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                        {rel.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                        {rel.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(rel.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {rel.views}
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <Link
            href="/kien-thuc/video"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tất cả video
          </Link>
        </div>
      </section>
    </div>
  );
}
