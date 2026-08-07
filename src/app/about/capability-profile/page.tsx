import { constructMetadata } from "@/lib/seo";
import { FileText, Download, FolderOpen } from "lucide-react";

export const metadata = constructMetadata({
  title: "Hồ sơ năng lực",
  description:
    "Xem hồ sơ năng lực, tải tài liệu PDF và danh sách tài liệu liên quan của Kepler Group.",
  url: "/about/capability-profile",
});

const documents = [
  {
    title: "Hồ sơ năng lực tổng quan",
    type: "PDF",
    size: "2.5 MB",
    description:
      "Tổng hợp năng lực, kinh nghiệm và dự án tiêu biểu của Kepler Group.",
  },
  {
    title: "Danh mục dự án tiêu biểu",
    type: "PDF",
    size: "5.1 MB",
    description:
      "Giới thiệu các dự án tiêu biểu đã triển khai trong các lĩnh vực cốt lõi.",
  },
  {
    title: "Chứng chỉ & Giấy phép",
    type: "PDF",
    size: "1.8 MB",
    description: "Bộ chứng chỉ, giấy phép và tài liệu pháp lý liên quan.",
  },
  {
    title: "Hồ sơ năng lực mảng bất động sản",
    type: "PDF",
    size: "3.4 MB",
    description: "Năng lực chuyên sâu trong lĩnh vực bất động sản của Kepler.",
  },
];

export default function CapabilityProfilePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Hồ sơ năng lực
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Hồ sơ năng lực
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Tài liệu tổng hợp về năng lực, kinh nghiệm và dự án tiêu biểu của
            Kepler Group. Tải về để tham khảo chi tiết.
          </p>
        </div>
      </section>

      {/* Tải tài liệu PDF */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Download className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Tải tài liệu PDF
              </h2>
              <p className="text-gray-600">
                Tài liệu hồ sơ năng lực định dạng PDF, sẵn sàng tải về.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {documents.map((d) => (
              <div
                key={d.title}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-7 w-7 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {d.title}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {d.type} · {d.size}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {d.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex-shrink-0"
                >
                  <Download className="h-4 w-4" />
                  Tải về
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Danh sách tài liệu liên quan */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Danh sách tài liệu liên quan
            </h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
            {[
              "Báo cáo thường niên Kepler Group",
              "Tài liệu giới thiệu dịch vụ",
              "Hợp đồng mẫu & Điều kiện hợp tác",
              "Chính sách bảo mật thông tin",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{item}</span>
                </div>
                <Download className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
