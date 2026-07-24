import { KEPLER_CONFIG } from "@/constants/kepler-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Building2, Home, TrendingUp, Shield, Wallet, Handshake, Key, Search } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[200px] md:h-[320px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: "url('https://picsum.photos/seed/about-hero/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full pb-6 md:pb-10">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3 text-white/70 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-white">Về chúng tôi</span>
              </div>
              <h1 className="text-[clamp(22px,4vw,42px)] font-bold text-white leading-tight">
                Về chúng tôi
              </h1>
              <p className="mt-1 md:mt-2 text-white/80 text-sm md:text-[15px] max-w-[560px]">
                Kepler Property - Nền tảng bất động sản chuyên nghiệp hàng đầu Việt Nam
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeIn direction="left" duration={0.6}>
              <div>
                <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-4 md:mb-6" />
                <h2 className="text-[clamp(20px,3.5vw,40px)] font-serif font-bold text-gray-900 leading-tight mb-4 md:mb-6">
                  Đồng hành cùng bạn trong hành trình tìm kiếm ngôi nhà mơ ước
                </h2>
                <div className="space-y-3 md:space-y-4 text-gray-600 text-sm md:text-[16px] leading-relaxed">
                  <p>
                    <strong>Kepler Property</strong> là nền tảng bất động sản chuyên nghiệp hàng đầu Việt Nam,
                    được thành lập với sứ mệnh đơn giản hóa quá trình tìm kiếm và giao dịch bất động sản
                    cho khách hàng.
                  </p>
                  <p>
                    Với đội ngũ chuyên gia giàu kinh nghiệm, hệ thống dữ liệu phong phú và dịch vụ tận tâm,
                    chúng tôi cam kết mang đến cho bạn những giải pháp bất động sản tốt nhất, phù hợp nhất
                    với nhu cầu và ngân sách của gia đình.
                  </p>
                </div>
                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Dự án BĐS</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">Giao dịch</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" duration={0.6} delay={0.2}>
              <div className="relative mt-8 lg:mt-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl">
                  <Image
                    src="https://picsum.photos/seed/about-intro/800/600"
                    alt="Kepler Property"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg md:shadow-xl max-w-[160px] md:max-w-[200px]">
                  <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
                  <div className="text-xs md:text-sm text-gray-500">Năm kinh nghiệm</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="text-center mb-8 md:mb-14">
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mx-auto mb-4 md:mb-6" />
              <h2 className="text-[clamp(22px,3.5vw,40px)] font-serif font-bold text-gray-900 leading-tight mb-3 md:mb-4">
                Tại sao chọn Kepler Property?
              </h2>
              <p className="text-gray-500 text-sm md:text-[16px] max-w-[600px] mx-auto">
                Chúng tôi cam kết mang đến trải nghiệm tìm kiếm bất động sản tốt nhất cho khách hàng
              </p>
            </div>
          </FadeIn>
          <Stagger delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { Icon: Home, title: "Kho bất động sản đa dạng", description: "Hàng nghìn tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền được cập nhật liên tục." },
              { Icon: Search, title: "Tìm kiếm thông minh", description: "Công cụ lọc và tìm kiếm nhanh chóng giúp bạn dễ dàng tìm được bất động sản phù hợp." },
              { Icon: TrendingUp, title: "Thông tin minh bạch", description: "Cập nhật giá cả, quy hoạch, pháp lý rõ ràng, giúp bạn đưa ra quyết định đúng đắn." },
              { Icon: Handshake, title: "Dịch vụ chuyên nghiệp", description: "Đội ngũ tư vấn nhiệt tình, hỗ trợ xuyên suốt từ khi tìm kiếm đến khi nhận nhà." },
              { Icon: Wallet, title: "Hỗ trợ tài chính", description: "Kết nối với các đối tác ngân hàng, hỗ trợ tư vấn vay vốn với lãi suất ưu đãi." },
              { Icon: Shield, title: "An toàn pháp lý", description: "Kiểm tra pháp lý toàn diện, đảm bảo giao dịch an toàn và minh bạch cho khách hàng." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="text-center mb-8 md:mb-14">
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mx-auto mb-4 md:mb-6" />
              <h2 className="text-[clamp(22px,3.5vw,40px)] font-serif font-bold text-gray-900 leading-tight mb-3 md:mb-4">
                Dịch vụ của chúng tôi
              </h2>
              <p className="text-gray-500 text-sm md:text-[16px] max-w-[600px] mx-auto">
                Giải pháp toàn diện cho mọi nhu cầu bất động sản của bạn
              </p>
            </div>
          </FadeIn>
          <Stagger delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { Icon: Building2, title: "Mua bán BĐS", items: ["Căn hộ chung cư", "Nhà phố, biệt thự", "Đất nền, shophouse", "Officetel, văn phòng"] },
              { Icon: Key, title: "Cho thuê BĐS", items: ["Căn hộ cho thuê", "Nhà cho thuê", "Văn phòng, mặt bằng", "Biệt thự, penthouse"] },
              { Icon: TrendingUp, title: "Tư vấn đầu tư", items: ["Phân tích tiềm năng", "Định giá BĐS", "Tư vấn pháp lý", "Chiến lược đầu tư"] },
              { Icon: Handshake, title: "Dịch vụ hỗ trợ", items: ["Tư vấn vay vốn", "Thiết kế nội thất", "Quản lý cho thuê", "Sang nhượng nhanh"] },
            ].map((service, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-50 p-4 md:p-8 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <service.Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base md:text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                        <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <FadeIn direction="up" duration={0.6}>
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-[clamp(22px,3.5vw,40px)] font-serif font-bold mb-3 md:mb-4">
              Sẵn sàng tìm ngôi nhà mơ ước?
            </h2>
            <p className="text-white/80 text-sm md:text-[16px] mb-6 md:mb-8 max-w-[500px] mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhanh chóng nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] md:min-h-[52px] px-6 md:px-8 bg-white text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-all hover:scale-105 rounded-lg md:rounded-xl"
              >
                Liên hệ ngay
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/apartments-for-sale"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] md:min-h-[52px] px-6 md:px-8 border-2 border-white text-white text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-primary transition-all hover:scale-105 rounded-lg md:rounded-xl"
              >
                Xem tin đăng
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact Info */}
      <section className="py-10 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <Stagger delay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                  <p className="text-gray-500 text-[15px]">{KEPLER_CONFIG.address}</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hotline</h3>
                  <p className="text-gray-500 text-[15px]">{KEPLER_CONFIG.hotlineDisplay}</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-500 text-[15px]">{KEPLER_CONFIG.contactEmail}</p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
