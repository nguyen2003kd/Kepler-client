"use client";

import { NewsItem, NEWS, KEPLER_CONFIG } from "@/constants/kepler-data";
import { Calendar, User, ArrowLeft, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: NewsItem;
}

export default function NewsDetailContent({ item }: Props) {
  const related = NEWS.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[360px] bg-gray-100 overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 h-full flex flex-col justify-end pb-8">
          <div className="flex items-center gap-2 mb-3 text-white/70 text-xs">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-primary transition-colors">Tin tức</Link>
          </div>
          <span className="inline-block w-fit px-3 py-1 bg-primary text-white text-xs font-semibold rounded-xl mb-3">
            {item.category}
          </span>
          <h1 className="text-[clamp(22px,3vw,34px)] font-bold text-white leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Meta */}
          <div className="flex items-center gap-5 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {item.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={16} />
              {item.author}
            </span>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Quay lại tin tức
          </Link>

          {/* Body */}
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 text-[17px] leading-relaxed font-medium mb-4">
              {item.excerpt}
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Bài viết thuộc chuyên mục {item.category}, được biên soạn bởi đội ngũ {item.author}.
              Nội dung dưới đây cung cấp cái nhìn chi tiết về chủ đề, giúp bạn đọc nắm bắt
              thông tin và đưa ra quyết định phù hợp.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Thị trường bất động sản luôn biến động không ngừng. Việc cập nhật thông tin
              thường xuyên là yếu tố quan trọng để đưa ra quyết định đầu tư đúng đắn. Kepler
              Property cam kết mang đến những thông tin chính xác, khách quan và kịp thời nhất
              cho khách hàng.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Nếu bạn cần tư vấn chi tiết hơn về chủ đề này, hãy liên hệ với đội ngũ chuyên
              viên của Kepler Property qua hotline {KEPLER_CONFIG.hotlineDisplay} hoặc email
              {" "}{KEPLER_CONFIG.contactEmail}. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-[#1a1a1a] font-bold text-base mb-1">Cần tư vấn thêm?</h3>
              <p className="text-gray-500 text-sm">Liên hệ ngay với Kepler Property</p>
            </div>
            <a
              href={`tel:${KEPLER_CONFIG.hotlineTel}`}
              className="flex items-center gap-2 px-6 min-h-[44px] bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-xl"
            >
              <Phone size={18} />
              {KEPLER_CONFIG.hotlineDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((n) => (
                <Link key={n.id} href={`/news/${n.id}`} className="group bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow rounded-xl">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={n.img}
                      alt={n.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-3 pb-3 pt-3">
                    <span className="text-primary text-xs font-semibold uppercase tracking-wide">{n.category}</span>
                    <h3 className="mt-1.5 text-[#1a1a1a] text-sm font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {n.title}
                    </h3>
                    <p className="mt-1.5 text-gray-500 text-xs">{n.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
