import { constructMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHeroDynamic from "../components/about-hero-dynamic";
import VisionMissionDynamic from "../components/vision-mission-dynamic";
import CoreValuesSection from "../components/about-core-values";

export const metadata = constructMetadata({
  title: "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi",
  description:
    "Tầm nhìn, sứ mệnh và các giá trị cốt lõi định hướng mọi hoạt động của Kepler Group.",
  url: "/about/vision-mission",
});

export default function VisionMissionPage() {
  return (
    <div className="bg-white">
      <AboutHeroDynamic
        configKeyVi="about-vision-mission-hero"
        configKeyEn="about-vision-mission-hero_en"
        fallbackEyebrow="Định hướng phát triển"
        fallbackTitle="Tầm nhìn - Sứ mệnh - Giá trị cốt lõi"
        fallbackDescription="Những định hướng và niềm tin dẫn lối cho mọi hoạt động của Kepler Group trên hành trình kiến tạo giá trị bền vững."
        fallbackImage="/seo.png"
      />

      <VisionMissionDynamic
        pageKeyVi="about-vision-mission"
        pageKeyEn="about-vision-mission_en"
        fallback={
          <>
            {/* Tầm nhìn — bento statement */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Định hướng tương lai
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Tầm nhìn
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid lg:grid-cols-12 gap-5 items-stretch">
                  <FadeIn className="lg:col-span-8">
                    <div className="relative h-full rounded-3xl bg-white border border-gray-200 p-10 md:p-14 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                      <div className="relative">
                      <div className="mb-8">
                          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Tầm nhìn của Kepler
                          </h3>
                        </div>
                        <ul className="space-y-6">
                          {[
                            "Xây dựng mô hình khép kín mang lại nhiều tiện ích và chất lượng cho khách hàng và đối tác với sản phẩm và dịch vụ chuyên nghiệp.",
                            "Trở thành Công ty có dịch vụ sản phẩm chuyên nghiệp trong ngành bất động sản tại Việt Nam.",
                          ].map((v, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                                0{i + 1}
                              </div>
                              <span className="text-lg text-gray-600 leading-relaxed">
                                {v}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn className="lg:col-span-4" delay={0.1}>
                    <div className="relative h-full rounded-3xl bg-red-600 text-white p-10 md:p-14 overflow-hidden flex flex-col">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                      <p className="relative mt-6 text-2xl md:text-3xl font-extrabold leading-tight">
                        Khép kín{" "}
                        <span className="text-white/60 text-2xl">&middot;</span>{" "}
                        Chất lượng{" "}
                        <span className="text-white/60 text-2xl">&middot;</span>{" "}
                        Chuyên nghiệp
                      </p>
                      <p className="relative mt-auto pt-8 text-white/80 leading-relaxed">
                        Mọi hành trình của Kepler đều hướng đến một hệ sinh thái
                        toàn diện, nơi chất lượng và sự chuyên nghiệp tạo nên
                        giá trị bền vững.
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Sứ mệnh — overlapping layout */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Sứ mệnh
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Sứ mệnh
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <FadeIn className="order-2 lg:order-1">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-red-600 transform translate-x-5 translate-y-5" />
                      <div className="relative rounded-3xl bg-white p-10 md:p-14 border border-gray-200 overflow-hidden">
                        <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">
                          Sứ mệnh
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          Cung cấp sản phẩm và dịch vụ tốt nhất, chuyên nghiệp
                          nhất cho thị trường và tạo ra một chuỗi giá trị cho
                          người tiêu dùng trong lĩnh vực bất động sản.
                        </p>
                        <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn
                    className="order-1 lg:order-2"
                    delay={0.1}
                    direction="left"
                  >
                    <div className="relative rounded-3xl bg-white border border-gray-200 p-10 md:p-14 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                      <div className="relative space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                            01
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">
                              Tốt nhất cho thị trường
                            </h4>
                            <p className="mt-1 text-gray-600 leading-relaxed">
                              Sản phẩm và dịch vụ chuyên nghiệp, dẫn đầu về
                              chất lượng và trải nghiệm.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                            02
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">
                              Chuỗi giá trị cho người tiêu dùng
                            </h4>
                            <p className="mt-1 text-gray-600 leading-relaxed">
                              Kết nối lợi ích bền vững giữa doanh nghiệp và
                              cộng đồng trong lĩnh vực bất động sản.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>
          </>
        }
      />

      <CoreValuesSection />
    </div>
  );
}
