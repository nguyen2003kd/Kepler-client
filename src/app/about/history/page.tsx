import { constructMetadata } from "@/lib/seo";
import { History } from "lucide-react";

export const metadata = constructMetadata({
  title: "Lịch sử phát triển",
  description:
    "Timeline hình thành và phát triển của Kepler Group cùng các dấu mốc nổi bật.",
  url: "/about/history",
});

const milestones = [
  {
    year: "2015",
    title: "Khởi nghiệp",
    description:
      "Kepler Group được thành lập với đội ngũ sáng lập nòng cốt, bắt đầu từ mảng tư vấn bất động sản.",
  },
  {
    year: "2017",
    title: "Mở rộng mảng tư vấn",
    description:
      "Ra mắt đơn vị tư vấn doanh nghiệp, mở rộng danh mục dịch vụ sang pháp lý và tài chính.",
  },
  {
    year: "2019",
    title: "Kiến tạo hệ sinh thái",
    description:
      "Chính thức vận hành theo mô hình hệ sinh thái với các đơn vị thành viên liên kết chặt chẽ.",
  },
  {
    year: "2021",
    title: "Đầu tư giáo dục & đào tạo",
    description:
      "Thành lập đơn vị giáo dục, đào tạo nghiệp vụ và phát triển nguồn nhân lực chất lượng cao.",
  },
  {
    year: "2023",
    title: "Chuyển đổi số",
    description:
      "Đẩy mạnh ứng dụng công nghệ số vào vận hành, ra mắt nền tảng hỗ trợ khách hàng trực tuyến.",
  },
  {
    year: "2025",
    title: "Vươn tầm mới",
    description:
      "Mở rộng mạng lưới chi nhánh, nâng tầm thương hiệu và chuẩn bị cho giai đoạn phát triển tiếp theo.",
  },
];

export default function HistoryPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <History className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Hành trình phát triển
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Lịch sử phát triển
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Timeline hình thành và phát triển của Kepler Group — những dấu mốc
            quan trọng đánh dấu chặng đường trưởng thành của tập đoàn.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Đường dọc */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-100 md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((m, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={m.year}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 top-2 z-10 -translate-x-1/2">
                      <div className="w-4 h-4 rounded-full bg-red-600 ring-4 ring-red-100" />
                    </div>

                    {/* Year (md+) */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Card */}
                    <div
                      className={`pl-12 md:pl-0 md:w-1/2 ${
                        isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold mb-3">
                          {m.year}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {m.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
