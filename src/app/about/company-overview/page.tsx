import { constructMetadata } from "@/lib/seo";
import { Building2, Layers, MessageSquareQuote } from "lucide-react";

export const metadata = constructMetadata({
  title: "Tổng quan Kepler Group",
  description:
    "Giới thiệu doanh nghiệp Kepler Group, lĩnh vực hoạt động, mô hình hệ sinh thái và thông điệp thương hiệu.",
  url: "/about/company-overview",
});

const businessFields = [
  {
    title: "Bất động sản",
    description:
      "Đầu tư, phát triển và phân phối các dự án bất động sản dân dụng, thương mại và công nghiệp.",
  },
  {
    title: "Tư vấn doanh nghiệp",
    description:
      "Cung cấp giải pháp tư vấn chiến lược, pháp lý, tài chính và chuyển đổi số cho doanh nghiệp.",
  },
  {
    title: "Giáo dục & Đào tạo",
    description:
      "Đào tạo, bồi dưỡng nghiệp vụ và phát triển nguồn nhân lực chất lượng cao.",
  },
];

const ecosystemItems = [
  "Kepler Property — Bất động sản",
  "Kepler Consulting — Tư vấn doanh nghiệp",
  "Kepler Education — Đào tạo & Phát triển nhân lực",
  "Kepler Legal — Tư vấn pháp lý",
];

export default function CompanyOverviewPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Giới thiệu doanh nghiệp
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Tổng quan Kepler Group
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Kepler Group là tập đoàn đa ngành hoạt động trong các lĩnh vực bất
            động sản, tư vấn doanh nghiệp, giáo dục và pháp lý, với mục tiêu xây
            dựng một hệ sinh thái đồng hành cùng doanh nghiệp và cá nhân trên con
            đường phát triển bền vững.
          </p>
        </div>
      </section>

      {/* Lĩnh vực hoạt động */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Lĩnh vực hoạt động
            </h2>
            <p className="text-gray-600">
              Những mảng kinh doanh cốt lõi của Kepler Group
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {businessFields.map((field) => (
              <div
                key={field.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {field.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mô hình hệ sinh thái */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Layers className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Mô hình hệ sinh thái
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kepler Group vận hành theo mô hình hệ sinh thái liên kết chặt
                chẽ giữa các đơn vị thành viên, tạo ra giá trị cộng hưởng và giải
                pháp toàn diện cho khách hàng.
              </p>
              <ul className="space-y-3">
                {ecosystemItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {ecosystemItems.map((item, idx) => (
                  <div
                    key={item}
                    className={`p-6 rounded-xl text-center ${
                      idx % 2 === 0
                        ? "bg-red-50 text-red-900"
                        : "bg-gray-50 text-gray-900"
                    }`}
                  >
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thông điệp thương hiệu */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
            <MessageSquareQuote className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Thông điệp thương hiệu
          </h2>
          <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">
            “Kepler Group — Kiến tạo giá trị bền vững, đồng hành cùng doanh
            nghiệp Việt Nam vươn tầm cao mới.”
          </blockquote>
        </div>
      </section>
    </div>
  );
}
