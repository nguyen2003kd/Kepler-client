"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative bg-red-700 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Cùng Kepler kiến tạo giá trị cho{" "}
            <span className="text-red-100">dự án của bạn</span>
          </h2>
          <p className="mt-6 text-red-100 text-base leading-relaxed max-w-[60ch]">
            Nếu Quý khách đang tìm kiếm một đơn vị tư vấn chuyên nghiệp trong
            lĩnh vực đầu tư, thẩm định giá, phát triển dự án, quản lý tài sản
            hoặc M&amp;A, đội ngũ Kepler luôn sẵn sàng đồng hành để đưa ra giải
            pháp phù hợp với mục tiêu phát triển của doanh nghiệp.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dat-lich-tu-van"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-red-700 text-sm font-semibold rounded-full hover:bg-red-50 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group"
            >
              Đặt lịch tư vấn
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              Gửi yêu cầu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
