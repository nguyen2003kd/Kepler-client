import { constructMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import {
  Home,
  KeySquare,
  Building2,
  TrendingUp,
  Handshake,
  ArrowRight,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Sàn giao dịch",
  description:
    "Sàn giao dịch bất động sản Kepler — Mua bán nhà lẻ, Thuê & Cho thuê, Dự án phân phối, Kêu gọi đầu tư, Dự án cần M&A.",
  url: "/san-giao-dich",
});

const sections = [
  {
    href: "/san-giao-dich/mua-ban-nha-le",
    title: "Mua và bán nhà lẻ",
    icon: Home,
    description:
      "Dịch vụ kết nối nhu cầu mua, bán nhà ở và bất động sản dân dụng, từ nhà phố, biệt thự, căn hộ đến đất ở có tài sản trên đất. Kepler cung cấp thông tin thị trường, phân tích giá trị và hỗ trợ giao dịch nhằm giúp người mua tìm đúng tài sản, người bán tiếp cận đúng khách hàng và tối ưu hiệu quả giao dịch.",
    products: [
      "Nhà phố",
      "Biệt thự",
      "Căn hộ",
      "Nhà ở riêng lẻ",
      "Đất ở",
      "Nhà kết hợp kinh doanh",
      "Tài sản cần bán nhanh",
      "Bất động sản đầu tư cá nhân",
    ],
  },
  {
    href: "/san-giao-dich/thue-va-cho-thue",
    title: "Thuê và cho thuê",
    icon: KeySquare,
    description:
      "Giải pháp kết nối chủ sở hữu và khách thuê đối với nhà ở, văn phòng, mặt bằng thương mại, kho xưởng và các loại bất động sản khai thác cho thuê. Kepler hỗ trợ từ định giá thuê, marketing, tìm kiếm khách hàng, xem tài sản đến đàm phán và ký kết hợp đồng.",
    products: [
      "Nhà cho thuê",
      "Căn hộ",
      "Biệt thự",
      "Văn phòng",
      "Mặt bằng kinh doanh",
      "Shophouse",
      "Kho xưởng",
      "Bất động sản thương mại",
    ],
  },
  {
    href: "/san-giao-dich/du-an-phan-phoi",
    title: "Dự án phân phối",
    icon: Building2,
    description:
      "Giải pháp marketing và bán hàng bất động sản dành cho chủ đầu tư và đơn vị phát triển dự án, từ xây dựng chiến lược thị trường, định vị sản phẩm đến tổ chức phân phối và quản lý bán hàng. Kepler kết hợp dữ liệu thị trường – marketing – mạng lưới môi giới – công nghệ RealHub để đưa sản phẩm đến đúng khách hàng mục tiêu.",
    products: [
      "Khu đô thị thấp tầng (Đất nền, Nhà phố, Biệt thự)",
      "Khu dân cư căn hộ",
      "Bất động sản nghỉ dưỡng",
      "Bất động sản thương mại",
      "Bất động sản công nghiệp",
      "Dự án khu dân cư tái phát triển",
    ],
  },
  {
    href: "/san-giao-dich/keu-goi-dau-tu",
    title: "Kêu gọi đầu tư dự án",
    icon: TrendingUp,
    description:
      "Dịch vụ Kepler hỗ trợ chủ dự án tìm kiếm nhà đầu tư, đối tác vốn và nguồn lực phát triển, thông qua phân tích cơ hội, định giá, xây dựng phương án đầu tư và chuẩn bị hồ sơ gọi vốn. Kepler kết nối dự án – vốn – nhà đầu tư – chuyên gia, hướng tới hình thành cấu trúc đầu tư phù hợp và khả thi.",
    products: [
      "Góp vốn đầu tư",
      "Hợp tác đầu tư",
      "Hợp tác phát triển dự án",
      "Hợp tác kinh doanh",
      "Huy động vốn theo cấu trúc giao dịch",
      "Tìm đối tác chiến lược",
    ],
  },
  {
    href: "/san-giao-dich/du-an-can-ma",
    title: "Dự án cần M&A",
    icon: Handshake,
    description:
      "Nhóm sản phẩm dành cho các dự án, doanh nghiệp hoặc tài sản bất động sản cần tìm đối tác mua lại, chuyển nhượng, hợp tác đầu tư hoặc tái cấu trúc. Kepler – thông qua KMAC, KAC và hệ sinh thái chuyên gia – hỗ trợ đánh giá giá trị, cấu trúc thương vụ, tìm kiếm đối tác và điều phối quá trình giao dịch.",
    products: [
      "M&A dự án",
      "Chuyển nhượng dự án",
      "M&A doanh nghiệp bất động sản",
      "Mua bán công ty sở hữu dự án",
      "Mua bán tài sản",
      "Thoái vốn",
      "Tái cấu trúc sở hữu",
      "Hợp tác đầu tư / Liên doanh",
    ],
  },
];

export default function SanGiaoDichPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 to-red-900 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <span className="text-sm font-semibold tracking-wider text-red-200 uppercase">
              Sàn giao dịch Kepler
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Sàn giao dịch & Tư vấn bất động sản
            </h1>
            <p className="mt-6 text-lg md:text-xl text-red-100 max-w-3xl leading-relaxed">
              Các bất động sản thuộc sản phẩm của Kepler — không phải web chợ
              hoặc cộng đồng. Kepler cung cấp thông tin thị trường, phân tích
              giá trị và hỗ trợ giao dịch chuyên nghiệp.
            </p>
            <div className="mt-8 h-1 w-20 rounded-full bg-red-400" />
          </FadeIn>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <FadeIn key={section.href} delay={idx * 0.05}>
                <div className="group bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left: Icon + Title */}
                    <div className="lg:col-span-4 p-8 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 border-b lg:border-b-0 lg:border-r border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/15 group-hover:scale-105 transition-transform duration-300">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-400">
                          0{idx + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {section.title}
                      </h2>
                      <Link
                        href={section.href}
                        className="inline-flex items-center gap-2 mt-6 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all"
                      >
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Right: Description + Products */}
                    <div className="lg:col-span-8 p-8 md:p-10">
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {section.description}
                      </p>
                      <div className="mt-6">
                        <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Sản phẩm
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.products.map((product) => (
                            <span
                              key={product}
                              className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-700 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Sẵn sàng giao dịch cùng Kepler?
            </h2>
            <p className="mt-4 text-lg text-red-100">
              Liên hệ với chúng tôi để được tư vấn chuyên nghiệp
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Liên hệ ngay
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
