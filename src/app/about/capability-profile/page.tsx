import { constructMetadata } from "@/lib/seo";
import { FileText, Download, File, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Hồ sơ năng lực",
  description:
    "Hồ sơ năng lực Kepler Group — tài liệu giới thiệu năng lực, kinh nghiệm và các dự án tiêu biểu của Kepler.",
  url: "/about/capability-profile",
});

const profileDocuments = [
  {
    title: "Hồ sơ năng lực tổng quan",
    description:
      "Giới thiệu tổng quan về Kepler Group, các lĩnh vực hoạt động và năng lực cốt lõi.",
    size: "PDF · 2.5 MB",
    pages: 24,
    category: "Tổng quan",
  },
  {
    title: "Hồ sơ năng lực Thẩm định giá",
    description:
      "Chi tiết năng lực thẩm định giá tài sản, doanh nghiệp, máy móc thiết bị.",
    size: "PDF · 3.2 MB",
    pages: 32,
    category: "Thẩm định giá",
  },
  {
    title: "Hồ sơ năng lực Môi giới BĐS",
    description:
      "Danh mục dự án phân phối, năng lực marketing và phân phối bất động sản.",
    size: "PDF · 4.1 MB",
    pages: 40,
    category: "Môi giới",
  },
  {
    title: "Hồ sơ năng lực Quản lý tòa nhà",
    description:
      "Quy trình quản lý vận hành, danh mục tòa nhà đang quản lý và đội ngũ kỹ thuật.",
    size: "PDF · 2.8 MB",
    pages: 28,
    category: "Quản lý",
  },
];

const relatedDocuments = [
  { title: "Báo cáo thị trường BĐS Q3/2024", type: "Báo cáo", date: "10/2024" },
  { title: "Tài liệu đào tạo nội bộ", type: "Tài liệu", date: "09/2024" },
  { title: "Quy trình thẩm định giá", type: "Quy trình", date: "08/2024" },
  { title: "Hướng dẫn sử dụng dịch vụ", type: "Hướng dẫn", date: "07/2024" },
  { title: "Bộ tiêu chuẩn chất lượng", type: "Tiêu chuẩn", date: "06/2024" },
  { title: "Chính sách bảo mật thông tin", type: "Chính sách", date: "05/2024" },
];

export default function CapabilityProfilePage() {
  const featured = profileDocuments[0];

  return (
    <div className="bg-white">
      <AboutHero
        icon={<FileText className="h-6 w-6 text-red-400" />}
        eyebrow="Năng lực Kepler"
        title="Hồ sơ năng lực"
        description="Bộ tài liệu giới thiệu năng lực, kinh nghiệm và các dự án tiêu biểu của Kepler Group."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-capability-profile"
        pageKeyEn="about-capability-profile_en"
        fallback={
          <>
            {/* Hồ sơ năng lực nổi bật */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-14">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Tài liệu chính thức
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Hồ sơ năng lực
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-5">
                  {/* Featured document */}
                  <FadeIn className="lg:col-span-7">
                    <div className="relative h-full rounded-3xl bg-gray-900 text-white p-8 md:p-10 overflow-hidden group">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/20 rounded-full blur-[100px]" />

                      <div className="relative h-full flex flex-col">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 w-20 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <FileText className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-bold tracking-wider">
                              PDF
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-red-300 border border-red-500/30 mb-4">
                              {featured.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                              {featured.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {featured.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{featured.size}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-500" />
                            <span>{featured.pages} trang</span>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
                          >
                            Tải xuống
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Related capability profiles */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    {profileDocuments.slice(1).map((doc, idx) => (
                      <FadeIn key={doc.title} delay={0.05 + idx * 0.08}>
                        <div className="group h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-14 h-18 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                              <FileText className="w-5 h-5 mb-0.5" />
                              <span className="text-[9px] font-bold tracking-wider">
                                PDF
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                                {doc.title}
                              </h3>
                              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                                {doc.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                  {doc.size} · {doc.pages} trang
                                </span>
                                <Download className="w-4 h-4 text-red-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Tài liệu liên quan */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-14">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Tham khảo thêm
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Tài liệu liên quan
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-4">
                  {relatedDocuments.map((doc, idx) => (
                    <FadeIn key={doc.title} delay={idx * 0.05}>
                      <div className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                          <File className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span className="font-medium">{doc.type}</span>
                            <span>·</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
