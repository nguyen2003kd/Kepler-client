"use client";

import { KEPLER_CONFIG } from "@/constants/kepler-data";
import { MapPin, Phone, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { SelectDropdown } from "@/components/ui/select-dropdown";

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [need, setNeed] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!need) {
      alert("Vui lòng chọn nhu cầu");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative h-[200px] md:h-[320px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('https://picsum.photos/seed/contact-hero/1920/1080')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full pb-6 md:pb-10">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3 text-white/70 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-white">Liên hệ</span>
              </div>
              <h1 className="text-[clamp(22px,4vw,42px)] font-bold text-white leading-tight">
                Liên hệ
              </h1>
              <p className="mt-1 md:mt-2 text-white/80 text-sm md:text-[15px] max-w-[560px]">
                Đăng ký tư vấn hoặc liên hệ hotline để nhận thông tin chi tiết về dự án.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 md:gap-12">
          {/* Info */}
          <FadeIn direction="left" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-3">
                <span className="w-6 md:w-8 h-[2px] bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Thông tin liên hệ</span>
              </div>
              <h2 className="text-[clamp(20px,2.5vw,32px)] font-bold text-[#1a1a1a] leading-tight mb-4 md:mb-6">
                Kepler Property
              </h2>
              <Stagger delay={0.1} className="space-y-3 md:space-y-5">
                <StaggerItem>
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <span className="grid place-items-center w-10 md:w-11 h-10 md:h-11 bg-primary/10 text-primary shrink-0 rounded-lg md:rounded-xl">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <h3 className="text-[#1a1a1a] font-semibold text-sm mb-1">Văn phòng</h3>
                      <p className="text-gray-500 text-xs md:text-sm">{KEPLER_CONFIG.address}</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <span className="grid place-items-center w-10 md:w-11 h-10 md:h-11 bg-primary/10 text-primary shrink-0 rounded-lg md:rounded-xl">
                      <Phone size={20} />
                    </span>
                    <div>
                      <h3 className="text-[#1a1a1a] font-semibold text-sm mb-1">Hotline</h3>
                      <a
                        href={`tel:${KEPLER_CONFIG.hotlineTel}`}
                        className="text-primary font-bold text-sm hover:underline"
                      >
                        {KEPLER_CONFIG.hotlineDisplay}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <span className="grid place-items-center w-10 md:w-11 h-10 md:h-11 bg-primary/10 text-primary shrink-0 rounded-lg md:rounded-xl">
                      <Mail size={20} />
                    </span>
                    <div>
                      <h3 className="text-[#1a1a1a] font-semibold text-sm mb-1">Email</h3>
                      <a
                        href={`mailto:${KEPLER_CONFIG.contactEmail}`}
                        className="text-gray-500 text-sm hover:text-primary transition-colors"
                      >
                        {KEPLER_CONFIG.contactEmail}
                      </a>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <span className="grid place-items-center w-11 h-11 bg-primary/10 text-primary shrink-0 rounded-xl">
                      <Facebook size={20} />
                    </span>
                    <div>
                      <h3 className="text-[#1a1a1a] font-semibold text-sm mb-1">Fanpage</h3>
                      <a
                        href={KEPLER_CONFIG.facebookUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-gray-500 text-sm hover:text-primary transition-colors"
                      >
                        facebook.com/keplerland
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="right" duration={0.6} delay={0.2}>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
                Đăng ký tư vấn
              </h2>
              {submitted ? (
                <FadeIn direction="up" duration={0.4}>
                  <div className="bg-white border-l-[3px] border-primary p-5 text-gray-600 rounded-xl">
                    <strong className="text-[#1a1a1a]">Cảm ơn bạn đã đăng ký!</strong>
                    <p className="mt-1 text-sm">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất qua thông tin bạn cung cấp.</p>
                  </div>
                </FadeIn>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FadeIn direction="up" delay={0.1} duration={0.4}>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                          Họ tên *
                        </label>
                        <input
                          required
                          className="w-full min-h-[42px] border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                        />
                      </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.15} duration={0.4}>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                          Số điện thoại *
                        </label>
                        <input
                          required
                          type="tel"
                          className="w-full min-h-[42px] border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                        />
                      </div>
                    </FadeIn>
                  </div>
                  <FadeIn direction="up" delay={0.2} duration={0.4}>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full min-h-[42px] border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.25} duration={0.4}>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Nhu cầu *
                      </label>
                      <SelectDropdown
                        value={need}
                        onChange={setNeed}
                        options={[
                          { value: "", label: "Chọn nhu cầu" },
                          { value: "Mua căn hộ", label: "Mua căn hộ" },
                          { value: "Thuê căn hộ", label: "Thuê căn hộ" },
                          { value: "Ký gửi bán", label: "Ký gửi bán" },
                          { value: "Ký gửi cho thuê", label: "Ký gửi cho thuê" },
                          { value: "Nhận tiến độ bàn giao", label: "Nhận tiến độ bàn giao" },
                        ]}
                      />
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.3} duration={0.4}>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Loại căn quan tâm
                      </label>
                      <SelectDropdown
                        value={roomType}
                        onChange={setRoomType}
                        options={[
                          { value: "", label: "Chưa xác định" },
                          { value: "1 phòng ngủ", label: "1 phòng ngủ" },
                          { value: "2 phòng ngủ", label: "2 phòng ngủ" },
                          { value: "3 phòng ngủ", label: "3 phòng ngủ" },
                        ]}
                      />
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.35} duration={0.4}>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Nội dung
                      </label>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-200 bg-white p-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none rounded-xl"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4} duration={0.4}>
                    <label className="flex items-start gap-2.5 text-gray-500 text-[13px] cursor-pointer">
                      <input type="checkbox" required className="mt-0.5" />
                      <span>Tôi đồng ý được liên hệ qua số điện thoại và email đã cung cấp để nhận thông tin về BĐS từ Kepler Property.</span>
                    </label>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.45} duration={0.4}>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center min-h-[48px] px-6 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] rounded-xl w-full"
                    >
                      Gửi đăng ký
                    </button>
                  </FadeIn>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
