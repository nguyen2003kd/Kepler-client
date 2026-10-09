"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

const heroHighlights = [
  { icon: CalendarDays, label: "Hàng tuần – hàng tháng – hàng quý" },
  { icon: MapPin, label: "Không gian Kepler & đối tác" },
  { icon: Users, label: "Theo chủ đề & nhóm thành viên" },
];

export default function OfflineActivitiesHero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
              Offline để gặp gỡ
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Đăng ký tham gia Offline
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Gặp gỡ – Chia sẻ – Kết nối – Hợp tác – Giải pháp. Real Hub tổ
            chức các hoạt động networking định kỳ hàng tuần, hàng tháng và
            hàng quý tại các không gian thuộc hệ sinh thái Kepler và các địa
            điểm đối tác.
          </p>
          <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#hoat-dong"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]"
            >
              Xem các hoạt động
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Đăng ký ngay
            </Link>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid sm:grid-cols-3 gap-4"
        >
          {heroHighlights.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
            >
              <item.icon className="h-5 w-5 shrink-0 text-red-400" />
              <span className="text-sm font-medium text-gray-200">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
