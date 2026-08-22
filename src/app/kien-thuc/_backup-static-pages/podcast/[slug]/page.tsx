"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mic,
  Play,
  Calendar,
  Clock,
  Headphones,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  formatDate,
  getPodcastBySlug,
  getRelatedPodcasts,
} from "../../libs/mock-data";

export default function PodcastDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const podcast = useMemo(() => getPodcastBySlug(slug), [slug]);
  const related = useMemo(
    () => (podcast ? getRelatedPodcasts(podcast, 3) : []),
    [podcast],
  );

  if (!podcast) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Tập podcast không tồn tại.</p>
          <Link
            href="/kien-thuc/podcast"
            className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách podcast
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
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
            <Link href="/kien-thuc/podcast" className="hover:text-white transition-colors">
              Podcast
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white font-medium line-clamp-1">
              Tập {podcast.episode}
            </span>
          </nav>
        </div>
      </div>

      {/* ===== PLAYER ===== */}
      <section className="relative bg-black py-10 md:py-16">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-gray-900 shadow-2xl p-8 md:p-12"
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
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <button className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shrink-0">
                <Play className="w-10 h-10 text-red-600 ml-1" fill="currentColor" />
              </button>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                    <Mic className="w-3 h-3" />
                    Tập {podcast.episode}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
                    {podcast.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {podcast.title}
                </h1>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mt-4 max-w-2xl">
                  {podcast.description}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(podcast.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {podcast.duration}
              </span>
              {podcast.guests && (
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" />
                  Khách mời: {podcast.guests}
                </span>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          {podcast.tags && podcast.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {podcast.tags.map((tag) => (
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
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
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
                Tập liên quan
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>

            <div className="space-y-4">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={`/kien-thuc/podcast/${rel.slug}`}
                    className="group flex items-center gap-4 md:gap-6 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-red-200 transition-all"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-bold">
                          Tập {rel.episode}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {rel.duration}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1 group-hover:text-red-600 transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-1 mt-1">{rel.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BACK CTA ===== */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <Link
            href="/kien-thuc/podcast"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tất cả podcast
          </Link>
        </div>
      </section>
    </div>
  );
}
