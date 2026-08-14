"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function KeplerPropertyHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/banner-1.png"
          alt="Kepler Property"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>
      <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <Link
            href="/he-sinh-thai"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Hệ sinh thái Kepler
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              Real Estate Advisory
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Từ cơ hội
            <br />
            <span className="text-primary">đến giá trị.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
            Đồng hành cùng chủ đầu tư, chủ tài sản và nhà đầu tư trong mọi quyết định bất động sản quan trọng.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Trao đổi nhu cầu
            </Link>
            <a
              href="#nang-luc"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Khám phá năng lực
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
