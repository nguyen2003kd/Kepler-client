import { constructMetadata } from "@/lib/seo";
import {
  Target,
  Compass,
  Award,
  Scale,
  Lightbulb,
  Heart,
  Quote,
  Users,
  Gem,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi",
  description:
    "Tầm nhìn, sứ mệnh và các giá trị cốt lõi định hướng mọi hoạt động của Kepler Group.",
  url: "/about/vision-mission",
});

const visions = [
  "Xây dựng mô hình khép kín mang lại nhiều tiện ích và chất lượng cho khách hàng và đối tác với sản phẩm và dịch vụ chuyên nghiệp.",
  "Trở thành Công ty có dịch vụ sản phẩm chuyên nghiệp trong ngành bất động sản tại Việt Nam.",
];

const coreValues = [
  {
    num: "01",
    Icon: Award,
    title: "Chất lượng",
    description:
      "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt kỳ vọng của khách hàng.",
    variant: "dark",
    span: "lg:col-span-7",
  },
  {
    num: "02",
    Icon: Scale,
    title: "Chính trực",
    description:
      "Thượng tôn pháp luật, minh bạch và trách nhiệm trong mọi hoạt động kinh doanh.",
    variant: "red",
    span: "lg:col-span-5",
  },
  {
    num: "03",
    Icon: Lightbulb,
    title: "Đổi mới",
    description:
      "Không ngừng sáng tạo, ứng dụng công nghệ để mang lại giải pháp tối ưu cho khách hàng.",
    variant: "light",
    span: "lg:col-span-5",
  },
  {
    num: "04",
    Icon: Heart,
    title: "Đồng hành",
    description:
      "Luôn sát cánh cùng khách hàng và đối tác trong mọi giai đoạn phát triển.",
    variant: "dark",
    span: "lg:col-span-7",
  },
];

export default function VisionMissionPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<Target className="h-6 w-6 text-red-400" />}
        eyebrow="Định hướng phát triển"
        title="Tầm nhìn - Sứ mệnh - Giá trị cốt lõi"
        description="Những định hướng và niềm tin dẫn lối cho mọi hoạt động của Kepler Group trên hành trình kiến tạo giá trị bền vững."
        image="/seo.png"
      />

      <AboutPageContent
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
                    <div className="relative h-full rounded-3xl bg-gray-900 text-white p-10 md:p-14 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.10),_transparent_60%)]" />
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                            <Target className="h-7 w-7 text-red-400" />
                          </div>
                          <h3 className="text-3xl font-extrabold tracking-tight text-white">
                            Tầm nhìn của Kepler
                          </h3>
                        </div>
                        <ul className="space-y-6">
                          {visions.map((v, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                                0{i + 1}
                              </div>
                              <span className="text-lg text-gray-300 leading-relaxed">
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
                      <Quote className="relative h-10 w-10 text-white/70" />
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
                    Lý do chúng tôi tồn tại
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <FadeIn className="order-2 lg:order-1">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-red-600 transform translate-x-5 translate-y-5" />
                      <div className="relative rounded-3xl bg-white p-10 md:p-14 border border-gray-200 overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl bg-red-600 flex items-center justify-center shadow-xl">
                          <Compass className="h-10 w-10 text-white" />
                        </div>
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
                    <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-14 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
                      <div className="relative space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                            <Gem className="h-6 w-6 text-red-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              Tốt nhất cho thị trường
                            </h4>
                            <p className="mt-1 text-gray-400 leading-relaxed">
                              Sản phẩm và dịch vụ chuyên nghiệp, dẫn đầu về
                              chất lượng và trải nghiệm.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                            <Users className="h-6 w-6 text-red-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              Chuỗi giá trị cho người tiêu dùng
                            </h4>
                            <p className="mt-1 text-gray-400 leading-relaxed">
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

            {/* Giá trị cốt lõi — bento grid */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Giá trị cốt lõi
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Nền tảng văn hóa Kepler
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
                  {coreValues.map((value, idx) => {
                    const Icon = value.Icon;
                    return (
                      <FadeIn
                        key={value.title}
                        className={value.span}
                        delay={idx * 0.08}
                      >
                        <div
                          className={`relative h-full rounded-2xl p-8 md:p-10 overflow-hidden group transition-all duration-300 hover:shadow-xl ${
                            value.variant === "dark"
                              ? "bg-gray-900 text-white"
                              : value.variant === "red"
                              ? "bg-red-600 text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          {value.variant === "light" && (
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                          )}
                          {value.variant === "dark" && (
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.10),_transparent_60%)]" />
                          )}

                          <div className="relative">
                            <div className="flex items-start justify-between mb-6">
                              <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                  value.variant === "dark"
                                    ? "bg-red-600/20 border border-red-500/30"
                                    : value.variant === "red"
                                    ? "bg-white/15 border border-white/20"
                                    : "bg-red-600"
                                }`}
                              >
                                <Icon
                                  className={`h-7 w-7 ${
                                    value.variant === "dark" ||
                                    value.variant === "red"
                                      ? "text-white"
                                      : "text-white"
                                  }`}
                                />
                              </div>
                              <span
                                className={`text-5xl font-black ${
                                  value.variant === "dark"
                                    ? "text-white/10"
                                    : value.variant === "red"
                                    ? "text-white/15"
                                    : "text-gray-900/10"
                                }`}
                              >
                                {value.num}
                              </span>
                            </div>
                            <h3
                              className={`text-2xl font-extrabold tracking-tight mb-3 ${
                                value.variant === "dark" ||
                                value.variant === "red"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {value.title}
                            </h3>
                            <p
                              className={`leading-relaxed ${
                                value.variant === "dark"
                                  ? "text-gray-300"
                                  : value.variant === "red"
                                  ? "text-white/90"
                                  : "text-gray-600"
                              }`}
                            >
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
