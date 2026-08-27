import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";
import { fetchPageConfig, getImageUrl, type CapabilityConfig } from "../lib/fetch-page-config";

export const metadata = constructMetadata({
  title: "Hồ sơ năng lực",
  description:
    "Hồ sơ năng lực Kepler Group — tài liệu giới thiệu năng lực, kinh nghiệm và các dự án tiêu biểu của Kepler.",
  url: "/about/capability-profile",
});

export default async function CapabilityProfilePage() {
  const config = await fetchPageConfig<CapabilityConfig>("ABOUT_CAPABILITY_PROFILE");

  const title = config?.title || "";
  const description = config?.description || "";
  const fileUrl = config?.fileUrl || "";
  const imageUrl = config?.imageUrl || "";
  const hasData = !!(title || description || imageUrl || fileUrl);

  return (
    <div className="bg-white">
      <AboutHero
        eyebrow="Năng lực Kepler"
        title="Hồ sơ năng lực"
        description="Bộ tài liệu giới thiệu năng lực, kinh nghiệm và các dự án tiêu biểu của Kepler Group."
      />

      <AboutPageContent
        pageKeyVi="about-capability-profile"
        pageKeyEn="about-capability-profile_en"
        fallback={
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

              {hasData ? (
                <FadeIn>
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500">
                    <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left: image or stats */}
                      <div className="relative bg-gradient-to-br from-red-600 to-red-800 p-10 md:p-12 flex flex-col items-center justify-center min-h-[320px]">
                        {imageUrl ? (
                          <img
                            src={getImageUrl(imageUrl)}
                            alt={title || "Hồ sơ năng lực"}
                            className="max-h-64 w-auto object-contain rounded-xl shadow-2xl"
                          />
                        ) : (
                          <div className="grid grid-cols-3 gap-4 w-full">
                            <div className="text-center p-4 rounded-xl bg-white/10">
                              <div className="text-3xl font-black text-white">25+</div>
                              <div className="text-xs text-red-100 mt-1">Năm kinh nghiệm</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-white/10">
                              <div className="text-3xl font-black text-white">08</div>
                              <div className="text-xs text-red-100 mt-1">Công ty thành viên</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-white/10">
                              <div className="text-3xl font-black text-white">50+</div>
                              <div className="text-xs text-red-100 mt-1">Chuyên gia</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: info */}
                      <div className="p-10 md:p-12 flex flex-col justify-center">
                        {title && (
                          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                            {title}
                          </h3>
                        )}
                        <div className="mt-4 w-12 h-0.5 bg-red-600" />
                        {description && (
                          <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                            {description}
                          </p>
                        )}
                        {fileUrl && (
                          <a
                            href={getImageUrl(fileUrl)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors self-start"
                          >
                            Tải hồ sơ năng lực
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
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
