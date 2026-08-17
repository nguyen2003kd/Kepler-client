"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, Link2Off, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/category-banner-investment.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 py-20 lg:px-12">
        {/* Broken link visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-12"
        >
          <div className="relative flex items-center gap-6">
            {/* Left chain */}
            <motion.div
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <Link2Off className="h-8 w-8 text-white/40" />
            </motion.div>

            {/* 404 number */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-7xl font-extrabold tracking-tighter text-white sm:text-8xl lg:text-9xl"
              >
                <span className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">4</span>
                <span className="text-primary">0</span>
                <span className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">4</span>
              </motion.h1>
              {/* Glow */}
              <div className="absolute inset-0 -z-10 bg-primary/20 blur-2xl" />
            </div>

            {/* Right chain */}
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <Link2Off className="h-8 w-8 text-white/40" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Lỗi 404
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Không tìm thấy trang
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/40">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời
            không khả dụng. Vui lòng kiểm tra đường dẫn hoặc thử lại.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
          >
            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
            Về trang chủ
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
          >
            <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
            Khám phá dịch vụ
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/25"
        >
          <span>Liên kết nhanh:</span>
          {[
            { label: "Trang chủ", href: "/" },
            { label: "Dịch vụ", href: "/services" },
            { label: "Hệ sinh thái", href: "/he-sinh-thai" },
            { label: "Liên hệ", href: "/lien-he" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/20 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
