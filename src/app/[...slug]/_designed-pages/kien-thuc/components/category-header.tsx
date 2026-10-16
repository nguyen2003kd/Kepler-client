"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface CategoryHeaderProps {
  title: string;
  description: string;
  breadcrumb: string;
  icon?: React.ReactNode;
}

export function CategoryHeader({
  title,
  description,
  breadcrumb,
  icon,
}: CategoryHeaderProps) {
  return (
    <section className="relative h-[50vh] min-h-[360px] max-h-[500px] overflow-hidden bg-[#1a1a1a]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/seo.png"
          alt={title}
          className="w-full h-full object-cover opacity-40"
        />
      </div>
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
              <Link href="/kien-thuc" className="hover:text-white transition-colors">
                Kiến thức
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-white font-medium">{breadcrumb}</span>
            </nav>

            <div className="flex items-start gap-5">
              {icon && (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                  {title}
                </h1>
                <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
                <p className="text-white/80 text-base md:text-lg leading-relaxed mt-5 max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
