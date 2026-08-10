import { constructMetadata } from "@/lib/seo";
import {
  History,
  Rocket,
  Briefcase,
  Network,
  GraduationCap,
  Monitor,
  Globe,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import SafeImage from "@/components/common/safe-image";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Lịch sử phát triển",
  description:
    "Timeline hình thành và phát triển của Kepler Group cùng các dấu mốc nổi bật.",
  url: "/about/history",
});

const eras = [
  {
    range: "2015 — 2017",
    title: "Giai đoạn khởi nghiệp",
    color: "red",
    milestones: [
      {
        year: "2015",
        title: "Khởi nghiệp",
        icon: Rocket,
        description:
          "Kepler Group được thành lập từ đội ngũ sáng lập nòng cốt, tập trung mảng tư vấn bất động sản.",
        details: [
          "Xây dựng nền tảng dịch vụ thẩm định giá và môi giới đầu tiên.",
          "Tiếp cận các dự án nhà ở và đất nền tại TP.HCM và Hà Nội.",
          "Định hình triết lý lấy chuyên môn làm cốt lõi để phục vụ khách hàng.",
        ],
      },
      {
        year: "2017",
        title: "Mở rộng mảng tư vấn",
        icon: Briefcase,
        description:
          "Ra mắt đơn vị tư vấn doanh nghiệp, mở rộng danh mục dịch vụ sang pháp lý và tài chính.",
        details: [
          "Hợp tác với luật sư và chuyên gia tài chính để cung cấp giải pháp toàn diện.",
          "Phát triển dịch vụ tư vấn đầu tư BĐS cho khách hàng doanh nghiệp.",
          "Mở rộng mạng lưới đối tác tại các thành phố lớn miền Bắc và miền Nam.",
        ],
      },
    ],
  },
  {
    range: "2019 — 2021",
    title: "Giai đoạn kiến tạo",
    color: "rose",
    milestones: [
      {
        year: "2019",
        title: "Kiến tạo hệ sinh thái",
        icon: Network,
        description:
          "Chính thức vận hành theo mô hình hệ sinh thái với các đơn vị thành viên liên kết chặt chẽ.",
        details: [
          "Thành lập các đơn vị chuyên biệt hóa: thẩm định, môi giới, quản lý dự án.",
          "Xây dựng quy trình chuẩn và hệ thống quản lý chất lượng dịch vụ.",
          "Hoàn thiện mô hình đồng hành dài hạn với chủ đầu tư và khách hàng cá nhân.",
        ],
      },
      {
        year: "2021",
        title: "Đầu tư giáo dục & đào tạo",
        icon: GraduationCap,
        description:
          "Thành lập đơn vị giáo dục, đào tạo nghiệp vụ và phát triển nguồn nhân lực chất lượng cao.",
        details: [
          "Phát triển chương trình đào tạo thẩm định giá, môi giới, quản lý BĐS.",
          "Hợp tác với chuyên gia trong và ngoài nước để chia sẻ kiến thức thực tiễn.",
          "Xây dựng đội ngũ nhân sự chuyên nghiệp, sẵn sàng cho giai đoạn tăng trưởng.",
        ],
      },
    ],
  },
  {
    range: "2023 — 2025",
    title: "Giai đoạn vươn tầm",
    color: "red",
    milestones: [
      {
        year: "2023",
        title: "Chuyển đổi số",
        icon: Monitor,
        description:
          "Đẩy mạnh ứng dụng công nghệ số vào vận hành, ra mắt nền tảng hỗ trợ khách hàng trực tuyến.",
        details: [
          "Áp dụng công cụ số hóa để quản lý dữ liệu dự án, nâng cao minh bạch.",
          "Ra mắt kênh tương tác trực tuyến giúp khách hàng tiếp cận thông tin nhanh chóng.",
          "Tối ưu hóa quy trình nội bộ, rút ngắn thời gian phản hồi và phục vụ.",
        ],
      },
      {
        year: "2025",
        title: "Vươn tầm mới",
        icon: Globe,
        description:
          "Mở rộng mạng lưới chi nhánh, nâng tầm thương hiệu và chuẩn bị cho giai đoạn phát triển tiếp theo.",
        details: [
          "Mở rộng phạm vi hoạt động ra các tỉnh thành trọng điểm trên cả nước.",
          "Tăng cường liên kết với đối tác chiến lược trong và ngoài nước.",
          "Hướng đến mục tiêu trở thành đơn vị tư vấn BĐS chuyên nghiệp hàng đầu Việt Nam.",
        ],
      },
    ],
  },
];

const stats = [
  { value: "10+", label: "Năm phát triển", icon: History },
  { value: "06", label: "Mốc thời gian", icon: Target },
  { value: "50+", label: "Đối tác", icon: Network },
  { value: "03", label: "Vùng miền", icon: Globe },
];

const futurePillars = [
  {
    icon: TrendingUp,
    title: "Tăng trưởng bền vững",
    text: "Mở rộng quy mô dựa trên năng lực thực tiễn và uy tín đã xây dựng.",
  },
  {
    icon: Award,
    title: "Chuẩn hóa chuyên môn",
    text: "Nâng cao chất lượng dịch vụ theo các tiêu chuẩn quốc tế và thực tiễn Việt Nam.",
  },
  {
    icon: Network,
    title: "Hệ sinh thái kết nối",
    text: "Kết nối chặt chẽ giữa khách hàng, đối tác và chuyên gia trên nền tảng công nghệ.",
  },
];

export default function HistoryPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<History className="h-6 w-6 text-red-400" />}
        eyebrow="Hành trình phát triển"
        title="Lịch sử phát triển"
        description="Timeline hình thành và phát triển của Kepler Group — những dấu mốc quan trọng đánh dấu chặng đường trưởng thành của tập đoàn."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-history"
        pageKeyEn="about-history_en"
        fallback={
          <>
            {/* Opening */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <FadeIn>
                    <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                      Từ những bước đầu
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                      Hành trình không ngừng nghỉ
                    </h2>
                    <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                    <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
                      Từ một đơn vị tư vấn bất động sản, Kepler đã dần hình
                      thành hệ sinh thái dịch vụ toàn diện. Mỗi giai đoạn đều
                      là bước chuyển mình, khẳng định tầm nhìn và khả năng
                      thích ứng trong bối cảnh thị trường không ngừng thay
                      đổi.
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
                      <SafeImage
                        src="/images/histories.jpg"
                        alt="Hành trình Kepler"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8">
                        <div className="text-white text-4xl font-black">
                          2015
                        </div>
                        <div className="text-white/80 text-lg font-medium">
                          Khởi đầu từ tư vấn BĐS
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="relative bg-gray-950 py-16 md:py-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.10),_transparent_60%)]" />
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {stats.map((s, idx) => (
                    <FadeIn key={s.label} delay={idx * 0.08}>
                      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
                        <s.icon className="h-6 w-6 text-red-400 mx-auto mb-4" />
                        <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                          {s.value}
                        </div>
                        <div className="mt-1 text-sm text-gray-400 uppercase tracking-wider font-medium">
                          {s.label}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-gray-50">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.08),_transparent_55%)]" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="text-center mb-20">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Timeline
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Dấu mốc theo từng giai đoạn
                  </h2>
                  <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="relative">
                  {/* Central line */}
                  <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-red-300 to-transparent md:-translate-x-1/2" />

                  <div className="space-y-16 md:space-y-24">
                    {eras
                      .flatMap((era) =>
                        era.milestones.map((m) => ({
                          ...m,
                          stage: era.title,
                        }))
                      )
                      .map((m, idx) => {
                        const isLeft = idx % 2 === 0;
                        return (
                          <FadeIn
                            key={m.year}
                            delay={idx * 0.08}
                            direction={isLeft ? "left" : "right"}
                          >
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-16 items-center">
                              {/* Connector node */}
                              <div className="absolute left-8 md:left-1/2 top-0 z-10 md:-translate-x-1/2">
                                <div className="w-16 h-16 rounded-full bg-white border-2 border-red-500 shadow-[0_0_0_8px_rgba(220,38,38,0.12)] flex items-center justify-center">
                                  <m.icon className="h-6 w-6 text-red-600" />
                                </div>
                              </div>

                              {/* Card */}
                              <div
                                className={`pl-24 md:pl-0 ${
                                  isLeft
                                    ? "md:order-1 md:pr-20 md:text-right"
                                    : "md:order-2 md:pl-20"
                                }`}
                              >
                                <div
                                  className={`group relative overflow-hidden rounded-3xl border border-gray-800 bg-white p-7 md:p-9 hover:border-red-600/40 transition-colors duration-300 ${
                                    isLeft ? "md:ml-auto" : ""
                                  }`}
                                >
                                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-rose-700" />
                                  <div className="absolute -top-20 -right-20 w-56 h-56 bg-red-600/10 rounded-full blur-3xl opacity-60" />

                                  <div className="relative">
                                    <div
                                      className={`flex items-center gap-3 mb-4 ${
                                        isLeft ? "md:justify-end" : ""
                                      }`}
                                    >
                                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white text-sm font-bold">
                                        {m.year}
                                      </span>
                                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                        {m.stage}
                                      </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                      {m.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-5">
                                      {m.description}
                                    </p>

                                    <ul className="space-y-3">
                                      {m.details.map((d, i) => (
                                        <li
                                          key={i}
                                          className={`flex items-start gap-3 text-gray-600 ${
                                            isLeft
                                              ? "md:flex-row-reverse md:text-right"
                                              : ""
                                          }`}
                                        >
                                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                          <span className="leading-relaxed text-sm">
                                            {d}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Empty opposite side */}
                              <div
                                className={`hidden md:block ${
                                  isLeft ? "md:order-2" : "md:order-1"
                                }`}
                              />
                            </div>
                          </FadeIn>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>

            {/* Future */}
            <section className="relative py-24 md:py-32 overflow-hidden">
              <div className="absolute inset-0">
                <SafeImage
                  src="/images/bg-banner.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-15"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gray-950/90" />
              </div>
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                    Tầm nhìn tương lai
                  </span>
                  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Tiếp tục viết tiếp câu chuyện
                  </h2>
                  <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-6">
                  {futurePillars.map((p, idx) => (
                    <FadeIn key={p.title} delay={idx * 0.08}>
                      <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-6">
                          <p.icon className="h-6 w-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {p.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <FadeIn className="mt-14 text-center">
                  <a
                    href="/about/company-overview"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors group"
                  >
                    Tìm hiểu thêm về Kepler
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </FadeIn>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
