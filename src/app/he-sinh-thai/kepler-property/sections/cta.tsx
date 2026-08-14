"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function KeplerPropertyCta() {
  return (
    <section className="bg-gray-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:p-12"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              Bắt đầu một cuộc trao đổi
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bạn đang đứng trước một cơ hội bất động sản?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
              Chia sẻ bài toán của bạn. Đội ngũ Kepler Property sẽ cùng bạn nhìn rõ bước tiếp theo.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            Kết nối với Kepler Property
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
