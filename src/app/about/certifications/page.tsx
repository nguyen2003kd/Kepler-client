import { constructMetadata } from "@/lib/seo";
import { FileCheck2, ScrollText, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Chứng chỉ - Giấy phép",
  description:
    "Chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép công bố.",
  url: "/about/certifications",
});

const certifications = [
  {
    title: "Giấy chứng nhận đăng ký doanh nghiệp",
    code: "GP-2025-001",
    description:
      "Chứng nhận đăng ký kinh doanh do Sở Kế hoạch và Đầu tư cấp.",
  },
  {
    title: "Chứng chỉ ISO 9001:2015",
    code: "ISO-9001-2025",
    description:
      "Chứng nhận hệ thống quản lý chất lượng theo tiêu chuẩn quốc tế.",
  },
  {
    title: "Giấy phép hoạt động môi giới bất động sản",
    code: "GPL-MG-2025",
    description:
      "Giấy phép do Sở Xây dựng cấp, đủ điều kiện hoạt động môi giới BĐS.",
  },
];

const licenses = [
  {
    title: "Giấy phép kinh doanh dịch vụ tư vấn",
    code: "GP-TV-2025",
    description: "Đủ điều kiện cung cấp dịch vụ tư vấn doanh nghiệp.",
  },
  {
    title: "Giấy chứng nhận đủ điều kiện đào tạo",
    code: "GP-ĐT-2025",
    description: "Cơ sở đào tạo đủ điều kiện theo quy định của Bộ GD&ĐT.",
  },
];

export default function CertificationsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Minh bạch & Uy tín
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Chứng chỉ - Giấy phép
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép
            công bố, khẳng định sự tuân thủ và uy tín trong hoạt động kinh
            doanh.
          </p>
        </div>
      </section>

      {/* Chứng chỉ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FileCheck2 className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Chứng chỉ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((c) => (
              <div
                key={c.code}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileCheck2 className="h-8 w-8 text-red-600" />
                  <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {c.code}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giấy phép */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ScrollText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Giấy phép</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {licenses.map((l) => (
              <div
                key={l.code}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <ScrollText className="h-8 w-8 text-blue-600" />
                  <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {l.code}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {l.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {l.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tài liệu pháp lý công bố */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Tài liệu pháp lý được phép công bố
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kepler Group cam kết minh bạch trong hoạt động kinh doanh. Các tài
            liệu pháp lý được phép công bố sẽ được cập nhật tại đây để khách
            hàng và đối tác tham khảo.
          </p>
        </div>
      </section>
    </div>
  );
}
