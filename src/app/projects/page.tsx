import { constructMetadata } from "@/lib/seo";
import { KEPLER_CONFIG, PROJECTS, PROJECT_FACTS, APARTMENT_TYPES, DELIVERY_ITEMS } from "@/constants/kepler-data";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";

export const metadata = constructMetadata({
  title: "Dự án BĐS",
  description: "Tổng quan các dự án BĐS nổi bật: Vinhomes Grand Park, Celesta Rise, Method Central Park, The Rive Gate.",
  url: "/projects",
  keywords: ["dự án BĐS", "Vinhomes Grand Park", "Celesta Rise", "Method Central Park", "The Rive Gate", "dự án TP.HCM"],
});

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative h-[320px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('https://picsum.photos/seed/projects-hero/1920/1080')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full pb-10">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 mb-3 text-white/70 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-white">Dự án</span>
              </div>
              <h1 className="text-[clamp(28px,4vw,42px)] font-bold text-white leading-tight">
                Dự án BĐS nổi bật
              </h1>
              <p className="mt-2 text-white/80 text-[15px] max-w-[560px]">
                Khám phá các dự án BĐS chất lượng cao với tiện ích đầy đủ và vị trí đắc địa.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" duration={0.6}>
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl">
              <Image
                src="https://picsum.photos/seed/projects-overview/1200/800"
                alt="Dự án BĐS"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn direction="right" duration={0.6} delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Tổng quan</span>
              </div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold text-[#1a1a1a] leading-tight mb-4">
                Các dự án nổi bật
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                Kepler Property mang đến các dự án BĐS chất lượng cao từ các chủ đầu tư uy tín.
                Mỗi dự án được lựa chọn kỹ lưỡng về vị trí, tiện ích và tiềm năng đầu tư.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {PROJECT_FACTS.map((f) => (
                  <StaggerItem key={f.label}>
                    <div className="bg-gray-50 p-4 border-l-[3px] border-primary rounded-xl">
                      <strong className="block text-xl font-bold text-[#1a1a1a]">{f.value}</strong>
                      <span className="block mt-1 text-gray-500 text-xs uppercase tracking-wide">{f.label}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${KEPLER_CONFIG.hotlineTel}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 rounded-xl"
                >
                  Nhận tư vấn
                </a>
                <a
                  href={KEPLER_CONFIG.projectUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center min-h-[48px] px-6 border border-gray-300 text-[#1a1a1a] text-sm font-semibold hover:bg-gray-50 transition-colors rounded-xl"
                >
                  Website
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Cấu phần dự án</span>
              </div>
              <h2 className="text-[clamp(26px,3vw,38px)] font-bold text-[#1a1a1a] leading-tight">
                Các dự án đang mở bán
              </h2>
            </div>
          </FadeIn>
          <Stagger delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <StaggerItem key={p.id}>
                <Link href={`/projects/${p.slug}`} className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl block">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden rounded-t-xl">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-primary text-[10px] font-semibold uppercase tracking-wide">
                      {p.type}
                    </span>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mt-2 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{p.location}</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex flex-col gap-1 pt-3 border-t border-gray-200 text-xs text-gray-600">
                      <span><strong className="text-[#1a1a1a]">Giá:</strong> {p.priceRange}</span>
                      <span><strong className="text-[#1a1a1a]">Quy mô:</strong> {p.scale}</span>
                      <span><strong className="text-[#1a1a1a]">Bàn giao:</strong> {p.handover}</span>
                      <span><strong className="text-[#1a1a1a]">Tiện ích:</strong> {p.amenities.join(", ")}</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Apartment types */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Sản phẩm căn hộ</span>
              </div>
              <h2 className="text-[clamp(26px,3vw,38px)] font-bold text-[#1a1a1a] leading-tight">
                Các loại BĐS
              </h2>
            </div>
          </FadeIn>
          <Stagger delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APARTMENT_TYPES.map((a) => (
              <StaggerItem key={a.type}>
                <article className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl">
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-t-xl">
                    <Image
                      src={a.img}
                      alt={a.type}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-3 pb-3 pt-3">
                    <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-primary transition-colors">{a.type}</h3>
                    <p className="text-primary font-bold mt-1">{a.area}</p>
                    <p className="text-gray-500 text-sm mt-2">{a.desc}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Bàn giao</span>
              </div>
              <h2 className="text-[clamp(26px,3vw,38px)] font-bold text-[#1a1a1a] leading-tight">
                Dịch vụ của chúng tôi
              </h2>
            </div>
          </FadeIn>
          <Stagger delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DELIVERY_ITEMS.map((item) => (
              <StaggerItem key={item.num}>
                <div className="bg-white p-6 border-t-[3px] border-primary rounded-xl hover:shadow-lg transition-shadow">
                  <span className="text-primary text-2xl font-bold">{item.num}</span>
                  <h3 className="mt-3 mb-2 text-[#1a1a1a] text-[16px] font-semibold">{item.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn direction="up" delay={0.3} duration={0.5}>
            <div className="bg-white border-l-[3px] border-primary p-4 text-gray-600 text-[13px] leading-relaxed mt-8 rounded-xl">
              <strong className="text-[#1a1a1a]">Lưu ý:</strong> thông tin dự án có thể thay đổi. Liên hệ hotline {KEPLER_CONFIG.hotlineDisplay} để nhận thông tin cập nhật nhất.
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a1a1a] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <FadeIn direction="up" duration={0.6}>
          <div className="max-w-[600px] mx-auto px-6 relative z-10">
            <h2 className="text-[clamp(22px,2.5vw,30px)] font-bold mb-3">
              Đăng ký tư vấn miễn phí
            </h2>
            <p className="text-white/70 mb-6">
              Liên hệ hotline để nhận tư vấn và thông tin chi tiết.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-7 bg-primary text-white text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-all hover:scale-105 rounded-xl"
            >
              Đăng ký tư vấn
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
