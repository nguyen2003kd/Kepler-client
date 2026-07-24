import {
  NEWS,
  PROJECTS,
  SALE_PROPERTIES,
  RENT_PROPERTIES,
} from "@/constants/kepler-data";
import Link from "next/link";
import { ArrowRight, Building2, Users, Award, TrendingUp, Search, Home, Shield, Headphones } from "lucide-react";
import NewsCard from "./news-card";
import PropertyCarousel from "./property-carousel";
import ProjectCarousel from "./project-carousel";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

export default function HomeContent() {
  return (
    <>
      {/* Intro - Henry Butcher style with serif heading */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.6}>
            <div className="max-w-[800px]">
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-4 md:mb-6" />
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mb-4 md:mb-6">
                Nền tảng bất động sản chuyên nghiệp hàng đầu Việt Nam
              </h2>
              <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed mb-6 md:mb-8 max-w-[680px]">
                Kepler Property cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ,
                biệt thự, đất nền nhanh chóng và chính xác nhất. Hỗ trợ tư vấn, pháp lý,
                vay vốn và sau bán hàng toàn diện.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link
                  href="/apartments-for-sale"
                  className="inline-flex items-center gap-2 md:gap-3 min-h-[42px] md:min-h-[48px] px-4 md:px-6 bg-primary text-white text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all hover:scale-105 rounded-lg md:rounded-xl"
                >
                  Xem tin đăng
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 md:gap-3 min-h-[42px] md:min-h-[48px] px-4 md:px-6 border-2 border-primary text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-primary hover:text-white transition-all hover:scale-105 rounded-lg md:rounded-xl"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 md:py-12 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Stagger delay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StaggerItem>
              <div className="text-center group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/70 text-sm mt-1">Dự án BĐS</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-white/70 text-sm mt-1">Khách hàng</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-white/70 text-sm mt-1">Năm kinh nghiệm</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center group">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-white/70 text-sm mt-1">Hài lòng</div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="mb-8 md:mb-10">
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-4 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Tại sao chọn chúng tôi</span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Cam kết chất lượng dịch vụ
              </h2>
            </div>
          </FadeIn>
          <Stagger delay={0.1} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { Icon: Home, title: "Kho BĐS đa dạng", desc: "Hàng nghìn tin đăng được cập nhật liên tục" },
              { Icon: Search, title: "Tìm kiếm thông minh", desc: "Công cụ lọc nhanh chóng, chính xác" },
              { Icon: Shield, title: "Thông tin minh bạch", desc: "Giá cả, pháp lý rõ ràng, đáng tin cậy" },
              { Icon: Headphones, title: "Hỗ trợ tận tâm", desc: "Đội ngũ tư vấn chuyên nghiệp 24/7" },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Properties for Sale */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
              <div>
                <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Mua bán</span>
                <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                  Nhà đất đang bán
                </h2>
              </div>
              <Link
                href="/apartments-for-sale"
                className="inline-flex items-center gap-2 md:gap-3 text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:gap-3 md:hover:gap-4 transition-all group"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <PropertyCarousel properties={SALE_PROPERTIES} listingLabel="Bán" />
          </FadeIn>
        </div>
      </section>

      {/* Properties for Rent */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
              <div>
                <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Cho thuê</span>
                <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                  Nhà đất cho thuê
                </h2>
              </div>
              <Link
                href="/apartments-for-rent"
                className="inline-flex items-center gap-2 md:gap-3 text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:gap-3 md:hover:gap-4 transition-all group"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <PropertyCarousel properties={RENT_PROPERTIES} listingLabel="Cho thuê" />
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
              <div>
                <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Dự án</span>
                <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                  Dự án nổi bật
                </h2>
                <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                  Khám phá các dự án BĐS chất lượng cao.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 md:gap-3 text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:gap-3 md:hover:gap-4 transition-all group"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <ProjectCarousel projects={PROJECTS} />
          </FadeIn>
        </div>
      </section>

      {/* News */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="mb-6 md:mb-10">
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Tin tức
              </span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Tin tức bất động sản
              </h2>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                Cập nhật xu hướng thị trường, quy hoạch và tư vấn đầu tư BĐS.
              </p>
            </div>
          </FadeIn>
          <Stagger delay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {NEWS.slice(0, 3).map((n) => (
              <StaggerItem key={n.id}>
                <NewsCard item={n} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 md:py-20 bg-[#1a1a1a] text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
          <FadeIn direction="up" duration={0.6}>
            <div className="text-center">
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold mb-3 md:mb-4">
                Sẵn sàng tìm ngôi nhà mơ ước?
              </h2>
              <p className="text-white/70 text-sm md:text-[16px] mb-6 md:mb-8 max-w-[500px] mx-auto">
                Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhanh chóng nhất
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 md:gap-3 min-h-[44px] md:min-h-[52px] px-5 md:px-8 bg-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all hover:scale-105 rounded-lg md:rounded-xl"
                >
                  Liên hệ ngay
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 md:gap-3 min-h-[44px] md:min-h-[52px] px-5 md:px-8 border-2 border-white text-white text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all hover:scale-105 rounded-lg md:rounded-xl"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
