import { constructMetadata } from "@/lib/seo";
import {
  Building2,
  BarChart3,
  Home,
  TrendingUp,
  Wrench,
  Palette,
  ArrowRight,
  Users,
  Award,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Giới thiệu Kepler Group",
  description:
    "Giới thiệu Kepler — công ty tư vấn bất động sản chuyên nghiệp: thẩm định giá, môi giới, marketing, quản lý tòa nhà, thiết kế nội ngoại thất.",
  url: "/about/company-overview",
});

const stats = [
  { label: "Năm kinh nghiệm", value: "10+", icon: Award },
  { label: "Lĩnh vực dịch vụ", value: "05", icon: BarChart3 },
  { label: "Đối tác chiến lược", value: "50+", icon: Users },
];

const businessFields = [
  {
    title: "Thẩm định giá tài sản",
    description:
      "Nhà ở, đất đai, nhà máy, dự án, máy móc - thiết bị, giá trị doanh nghiệp...",
    icon: BarChart3,
    accent: "from-red-500 to-rose-600",
  },
  {
    title: "Đại lý và môi giới bất động sản",
    description:
      "Nhận phân phối bất động sản cư dân, thương mại, công nghiệp, nghỉ dưỡng...",
    icon: Home,
    accent: "from-red-600 to-red-700",
  },
  {
    title: "Marketing và phát triển BĐS",
    description:
      "Tư vấn, triển khai ý tưởng kinh doanh và phát triển sản phẩm.",
    icon: TrendingUp,
    accent: "from-rose-500 to-red-600",
  },
  {
    title: "Quản lý tòa nhà, khu đô thị, dự án",
    description:
      "Quản lý vận hành, chăm sóc bảo dưỡng các dự án đang hoạt động.",
    icon: Wrench,
    accent: "from-red-700 to-red-800",
  },
  {
    title: "Thiết kế và hoàn thiện nội ngoại thất",
    description: "Cho các dự án bất động sản, văn phòng làm việc.",
    icon: Palette,
    accent: "from-rose-600 to-red-700",
  },
];

export default function CompanyOverviewPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<Building2 className="h-6 w-6 text-red-400" />}
        eyebrow="Giới thiệu doanh nghiệp"
        title="Giới thiệu Kepler Group"
        description="Công ty tư vấn Bất động sản Kepler — đơn vị tư vấn và cung cấp dịch vụ chuyên nghiệp trong ngành bất động sản."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-company-overview"
        pageKeyEn="about-company-overview_en"
        fallback={
          <>
            {/* Stats strip */}
            <section className="relative bg-gray-900 py-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_60%)]" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {stats.map((stat, idx) => (
                    <FadeIn key={stat.label} delay={idx * 0.1}>
                      <div className="flex items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                          <stat.icon className="h-7 w-7 text-red-400" />
                        </div>
                        <div>
                          <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400 uppercase tracking-wider font-medium mt-1">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Intro */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <FadeIn className="lg:col-span-5" direction="right">
                    <div className="lg:sticky lg:top-8">
                      <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                        Về chúng tôi
                      </span>
                      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Giới thiệu Kepler
                      </h2>
                      <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                      <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                        Chúng tôi hướng đến một giải pháp dịch vụ trọn gói khép
                        kín, với sự chuyên nghiệp, hiệu quả và chi phí tốt nhất.
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn className="lg:col-span-7" delay={0.15}>
                    <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                      <p>
                        Công ty tư vấn Bất động sản Kepler là một đơn vị tư vấn
                        và cung cấp dịch vụ chuyên nghiệp trong ngành bất động
                        sản (môi giới, thẩm định giá, quản lý, tư vấn hỗ trợ tài
                        chính, nghiên cứu BĐS…). Với đội ngũ nhân sự có trình độ
                        chuyên môn cao, đã từng đảm nhận các vai trò lãnh đạo
                        của nhiều công ty khác nhau.
                      </p>
                      <p>
                        Đội ngũ chúng tôi có hơn 10 năm làm việc với nhiều công
                        ty tập đoàn bất động sản trong và ngoài nước, chúng tôi
                        hiểu được những gì mà khách hàng và chủ đầu tư mong muốn,
                        nhất là trong thị trường bất động sản có nhiều biến động
                        và đòi hỏi sự chuyên nghiệp.
                      </p>
                      <p>
                        Kepler được phát triển bởi nhiều giám đốc ngành với sự
                        trợ giúp của các nhóm nhà quản lý, nhà lãnh đạo nhiều
                        kinh nghiệm. Kepler là bước chuyển tiếp có tính kế thừa
                        các dịch vụ cao cấp từ các nước đã phát triển và thích
                        ứng với từng địa phương.
                      </p>
                      <div className="relative p-8 rounded-2xl bg-gray-900 text-white overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
                        <p className="relative text-xl font-medium leading-relaxed">
                          “Kepler không ngừng phấn đấu hoàn thiện sản phẩm, dịch
                          vụ một cách chuyên nghiệp và xuất sắc nhất cho khách
                          hàng.”
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Business fields — bento grid */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Dịch vụ cốt lõi
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Các lĩnh vực hoạt động chính
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {businessFields.map((field, idx) => (
                    <FadeIn
                      key={field.title}
                      delay={idx * 0.06}
                      className={idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                    >
                      <div className="group relative h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${field.accent}`}
                        />
                        <div className="flex items-start gap-5">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${field.accent} flex items-center justify-center shrink-0`}
                          >
                            <field.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {field.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {field.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Partners CTA */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn>
                  <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/20 rounded-full blur-[100px]" />
                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                      <div>
                        <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                          Mạng lưới đối tác
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                          Đồng hành cùng đối tác chiến lược
                        </h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
                          Kepler luôn tìm kiếm và kết nối với những đối tác cùng
                          chung tầm nhìn, cùng xây dựng hệ sinh thái bất động sản
                          chuyên nghiệp và bền vững.
                        </p>
                      </div>
                      <div className="flex md:justify-end">
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors group"
                        >
                          Trở thành đối tác
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
