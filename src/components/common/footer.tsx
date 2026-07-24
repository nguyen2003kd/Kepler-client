"use client";

import { KEPLER_CONFIG } from "@/constants/kepler-data";
import { Phone, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  return (
    <>
      {/* Newsletter band - Red background like Henry Butcher accent */}
      <section className="bg-primary text-white py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
            <div className="lg:max-w-[500px]">
              <h2 className="text-[clamp(20px,3vw,32px)] font-serif font-bold mb-2 md:mb-3">
                Nhận tin đăng mới nhất từ Kepler Property
              </h2>
              <p className="text-white/80 text-sm md:text-[15px]">
                Đăng ký email để nhận thông tin BĐS mới nhất.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row w-full lg:w-auto lg:min-w-[420px] overflow-hidden bg-white rounded-xl shadow-lg"
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubmitted(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Nhập email của bạn"
                className="flex-1 min-h-[48px] px-4 text-gray-800 outline-none text-sm rounded-t-xl sm:rounded-tr-none sm:rounded-bl-xl placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="min-h-[48px] px-6 bg-gray-900 text-white text-sm font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-b-xl sm:rounded-bl-none sm:rounded-tr-xl"
              >
                {emailSubmitted ? "Đã đăng ký" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - White background with dark text */}
      <footer className="bg-white text-gray-800 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="py-10 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-8 md:gap-10">
            {/* Brand + About */}
            <div className="sm:col-span-2 lg:col-span-2 pb-4 sm:pb-0 border-b sm:border-b-0 border-gray-100">
              <Link href="/" className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Kepler Property"
                  width={140}
                  height={40}
                  className="h-[40px] md:h-[50px] w-auto"
                />
                <span className="text-lg md:text-xl font-bold text-gray-800">
                  Kepler<span className="text-primary"> Property</span>
                </span>
              </Link>
              <p className="text-gray-500 text-[13px] md:text-[14px] leading-relaxed max-w-[400px] mb-4 md:mb-8">
                Nền tảng BĐS chuyên nghiệp hàng đầu Việt Nam.
                Cập nhật tin đăng mua bán, cho thuê nhà đất nhanh chóng và chính xác.
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <a
                  href={KEPLER_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener"
                  className="w-9 md:w-10 h-9 md:h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`tel:${KEPLER_CONFIG.hotlineTel}`}
                  className="w-9 md:w-10 h-9 md:h-10 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Hotline"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-4 md:mb-6 text-gray-900 text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-semibold">
                Liên hệ
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li>
                  <a href={`tel:${KEPLER_CONFIG.hotlineTel}`} className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">
                    {KEPLER_CONFIG.hotlineDisplay}
                  </a>
                </li>
                <li className="text-gray-500 text-[13px] md:text-[14px]">{KEPLER_CONFIG.address}</li>
              </ul>
            </div>

            {/* Properties */}
            <div>
              <h3 className="mb-4 md:mb-6 text-gray-900 text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-semibold">
                Mua bán
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li><Link href="/apartments-for-sale" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Căn hộ bán</Link></li>
                <li><Link href="/apartments-for-sale" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Nhà phố bán</Link></li>
                <li><Link href="/apartments-for-sale" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Đất nền</Link></li>
                <li><Link href="/apartments-for-sale" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Biệt thự</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 md:mb-6 text-gray-900 text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-semibold">
                Cho thuê
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li><Link href="/apartments-for-rent" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Căn hộ cho thuê</Link></li>
                <li><Link href="/apartments-for-rent" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Nhà cho thuê</Link></li>
                <li><Link href="/apartments-for-rent" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Văn phòng</Link></li>
                <li><Link href="/apartments-for-rent" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Shophouse</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 md:mb-6 text-gray-900 text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-semibold">
                Tin tức
              </h3>
              <ul className="space-y-2 md:space-y-4">
                <li><Link href="/news" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Tin thị trường</Link></li>
                <li><Link href="/news" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Tin dự án</Link></li>
                <li><Link href="/news" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Tư vấn</Link></li>
                <li><Link href="/contact" className="text-gray-500 text-[13px] md:text-[14px] hover:text-primary transition-colors">Liên hệ</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <span className="text-gray-400 text-xs">© 2026 Kepler Property. All Rights Reserved.</span>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/contact" className="text-gray-400 text-xs hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="text-gray-400 text-xs hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating hotline */}
      <a
        href={`tel:${KEPLER_CONFIG.hotlineTel}`}
        className="fixed z-50 right-6 bottom-6 w-14 h-14 bg-primary text-white grid place-items-center shadow-xl hover:scale-110 transition-transform rounded-xl"
        aria-label="Gọi hotline Kepler Property"
      >
        <Phone size={22} />
      </a>
    </>
  );
}
