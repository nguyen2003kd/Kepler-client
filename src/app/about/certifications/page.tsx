import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";
import { fetchPageConfig, getImageUrl, type CertConfig, type CertDataItem } from "../lib/fetch-page-config";

export const metadata = constructMetadata({
  title: "Chứng chỉ - Giấy phép",
  description:
    "Chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép công bố.",
  url: "/about/certifications",
});

export default async function CertificationsPage() {
  const certConfig = await fetchPageConfig<CertConfig>("certification-config");
  const licenseConfig = await fetchPageConfig<CertConfig>("license-config");

  const certs: CertDataItem[] = certConfig?.data || [];
  const licenses: CertDataItem[] = licenseConfig?.data || [];
  const hasData = certs.length > 0 || licenses.length > 0;

  return (
    <div className="bg-white">
      <AboutHero
        eyebrow="Minh bạch & Uy tín"
        title="Chứng chỉ - Giấy phép"
        description="Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép công bố, khẳng định sự tuân thủ và uy tín trong hoạt động kinh doanh."
      />

      <AboutPageContent
        pageKeyVi="about-certifications"
        pageKeyEn="about-certifications_en"
        fallback={
          <section className="py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <FadeIn className="max-w-2xl mb-16">
                <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                  Hồ sơ pháp lý
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                  Chứng chỉ & Giấy phép
                </h2>
                <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Các văn bản xác nhận tư cách pháp lý và năng lực hoạt động của Kepler Group.
                </p>
              </FadeIn>

              {hasData ? (
                <div className="space-y-16">
                  {/* Certifications */}
                  {certs.length > 0 && (
                    <div>
                      <FadeIn className="mb-8">
                        <div className="flex items-center gap-3 w-full">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-200" />
                          <span className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-base shadow-lg shadow-red-600/20 whitespace-nowrap">
                            Chứng chỉ
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-200" />
                        </div>
                      </FadeIn>
                      <div className="grid md:grid-cols-3 gap-6">
                        {certs.map((item, idx) => (
                          <FadeIn key={item.id} delay={idx * 0.08}>
                            <div className="group h-full bg-white rounded-2xl border border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 overflow-hidden">
                              <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                              <div className="p-8">
                                {item.img ? (
                                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-100">
                                    <img
                                      src={getImageUrl(item.img)}
                                      alt={item["describe-img"] || ""}
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-6 h-48 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                                    <span className="text-4xl font-black text-red-200">
                                      {(item["describe-img"] || "C").charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                                  {item["describe-img"] || "Chứng chỉ"}
                                </h3>
                                {item.content && (
                                  <div
                                    className="text-sm text-gray-600 leading-relaxed line-clamp-3 [&_p]:text-sm [&_p]:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                  />
                                )}
                                {item.img && (
                                  <a
                                    href={getImageUrl(item.img)}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:gap-3 transition-all"
                                  >
                                    Tải xuống
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Licenses */}
                  {licenses.length > 0 && (
                    <div>
                      <FadeIn className="mb-8">
                        <div className="flex items-center gap-3 w-full">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-200" />
                          <span className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-base shadow-lg shadow-red-600/20 whitespace-nowrap">
                            Giấy phép
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-200" />
                        </div>
                      </FadeIn>
                      <div className="grid md:grid-cols-3 gap-6">
                        {licenses.map((item, idx) => (
                          <FadeIn key={item.id} delay={idx * 0.08}>
                            <div className="group h-full bg-white rounded-2xl border border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 overflow-hidden">
                              <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                              <div className="p-8">
                                {item.img ? (
                                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-100">
                                    <img
                                      src={getImageUrl(item.img)}
                                      alt={item["describe-img"] || ""}
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-6 h-48 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                                    <span className="text-4xl font-black text-red-200">
                                      {(item["describe-img"] || "G").charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                                  {item["describe-img"] || "Giấy phép"}
                                </h3>
                                {item.content && (
                                  <div
                                    className="text-sm text-gray-600 leading-relaxed line-clamp-3 [&_p]:text-sm [&_p]:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                  />
                                )}
                                {item.img && (
                                  <a
                                    href={getImageUrl(item.img)}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:gap-3 transition-all"
                                  >
                                    Tải xuống
                                    <ArrowRight className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">
                    Nội dung đang được cập nhật.
                  </p>
                </div>
              )}
            </div>
          </section>
        }
      />
    </div>
  );
}
