"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function KeplerPropertyCta() {
  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:p-12"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/80">
              Bắt đầu một cuộc trao đổi
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bạn đang đứng trước một cơ hội bất động sản?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
              Chia sẻ bài toán của bạn. Đội ngũ Kepler Property sẽ cùng bạn nhìn rõ bước tiếp theo.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            Kết nối với Kepler Property
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
