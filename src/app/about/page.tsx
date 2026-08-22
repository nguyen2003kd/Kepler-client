import { constructMetadata } from "@/lib/seo";
import {
  Building2,
  Target,
  History,
  Network,
  Users,
  Award,
  Zap,
  FileCheck2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import Banner from "./components/banner";
import Clients from "./components/clients";
import Introduction from "./components/introduction";
import VideoList from "./components/video-list";

export const metadata = constructMetadata({
  title: "Giới thiệu",
  description:
    "Tổng quan về Kepler Group - công ty tư vấn bất động sản chuyên nghiệp.",
  url: "/about",
});

const aboutLinks = [
  {
    href: "/about/company-overview",
    title: "Giới thiệu Kepler Group",
    description: "Giới thiệu doanh nghiệp, lĩnh vực hoạt động và mô hình hệ sinh thái.",
    icon: Building2,
  },
  {
    href: "/about/vision-mission",
    title: "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi",
    description: "Định hướng phát triển và những giá trị cốt lõi của Kepler.",
    icon: Target,
  },
  {
    href: "/about/history",
    title: "Lịch sử phát triển",
    description: "Hành trình hình thành và các dấu mốc nổi bật của Kepler Group.",
    icon: History,
  },
  {
    href: "/about/organizational-chart",
    title: "Cơ cấu tổ chức",
    description: "Sơ đồ cơ cấu và các đơn vị, bộ phận chính của Kepler.",
    icon: Network,
  },
  {
    href: "/about/board-of-directors",
    title: "Ban điều hành",
    description: "Danh sách thành viên ban lãnh đạo và thông tin tóm tắt.",
    icon: Users,
  },
  {
    href: "/about/expert-council",
    title: "Hội đồng cố vấn",
    description: "Đội ngũ chuyên gia và hồ sơ chuyên môn liên quan.",
    icon: Award,
  },
  {
    href: "/about/capabilities",
    title: "Năng lực và thành tựu",
    description: "Số liệu năng lực, thành tựu, phạm vi và nhóm khách hàng.",
    icon: Zap,
  },
  {
    href: "/about/certifications",
    title: "Chứng chỉ - Giấy phép",
    description: "Chứng chỉ, giấy phép và tài liệu pháp lý được phép công bố.",
    icon: FileCheck2,
  },
  {
    href: "/about/capability-profile",
    title: "Hồ sơ năng lực",
    description: "Xem và tải hồ sơ năng lực cùng các tài liệu liên quan.",
    icon: FileText,
  },
];

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "05", label: "Lĩnh vực cốt lõi" },
  { value: "50+", label: "Đối tác chiến lược" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Banner />

      <Introduction />

      <VideoList />

      {/* Tổng quan Kepler */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <FadeIn className="lg:col-span-5" direction="right">
              <div className="lg:sticky lg:top-8">
                <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                  Tổng quan
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Kepler Group là đơn vị tư vấn bất động sản chuyên nghiệp
                </h1>
                <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-7" delay={0.15}>
              <div className="space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Công ty tư vấn Bất động sản Kepler cung cấp giải pháp toàn
                  diện trong ngành bất động sản: từ thẩm định giá, môi giới,
                  marketing & phát triển BĐS, quản lý vận hành đến thiết kế và
                  hoàn thiện nội ngoại thất.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Với đội ngũ nhân sự có trình độ chuyên môn cao, từng đảm
                  nhận vai trò lãnh đạo tại nhiều tập đoàn bất động sản trong
                  và ngoài nước, Kepler hướng đến một giải pháp dịch vụ trọn
                  gói khép kín, với sự chuyên nghiệp, hiệu quả và chi phí tốt
                  nhất.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
                  {stats.map((stat, idx) => (
                    <FadeIn key={stat.label} delay={0.2 + idx * 0.05}>
                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-sm text-gray-500 uppercase tracking-wider font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Khám phá trang con */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn className="max-w-2xl mb-16">
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Khám phá
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Các nội dung giới thiệu
            </h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutLinks.map((link, idx) => (
              <FadeIn key={link.href} delay={idx * 0.05}>
                <Link
                  href={link.href}
                  className="group block h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/15 group-hover:scale-105 transition-transform duration-300">
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {link.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Clients />

      {/* <Testimonial /> */}

      {/* <RelatedServices /> */}

      {/* Mission & Vision */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Sứ mệnh</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Xây dựng một hệ sinh thái hỗ trợ toàn diện cho các doanh nghiệp
                vừa và nhỏ, giúp họ phát triển bền vững và cạnh tranh hiệu quả
                trong nền kinh tế số.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Tầm nhìn</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trở thành nền tảng hỗ trợ doanh nghiệp vừa và nhỏ hàng đầu Việt
                Nam, đồng hành cùng hàng nghìn doanh nghiệp trên con đường phát
                triển.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Core Values */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Chất lượng
              </h3>
              <p className="text-gray-600">
                Cam kết cung cấp dịch vụ chất lượng cao, đáp ứng mọi nhu cầu của
                doanh nghiệp
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Đồng hành
              </h3>
              <p className="text-gray-600">
                Luôn sát cánh cùng doanh nghiệp trong mọi giai đoạn phát triển
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hiệu quả
              </h3>
              <p className="text-gray-600">
                Tối ưu hóa quy trình, mang lại giá trị thiết thực cho doanh
                nghiệp
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Statistics */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <div className="text-gray-600">Doanh nghiệp</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Chuyên gia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-600">Dịch vụ</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng hợp tác cùng chúng tôi?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Đăng ký ngay để nhận tư vấn miễn phí
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-red-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Đăng ký ngay
          </a>
        </div>
      </section> */}
    </div>
  );
}
