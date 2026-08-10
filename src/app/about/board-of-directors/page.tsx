import { constructMetadata } from "@/lib/seo";
import {
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Target,
  Shield,
  Scale,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Ban điều hành",
  description:
    "Ban lãnh đạo Kepler — Ông Nguyễn Thái Hiền, Thạc sỹ Quản trị Kinh doanh, chuyên gia tư vấn bất động sản và thẩm định viên quốc gia với hơn 12 năm kinh nghiệm.",
  url: "/about/board-of-directors",
});

const leadershipValues = [
  {
    title: "Tầm nhìn & chiến lược",
    description:
      "Định hướng phát triển dài hạn, tận dụng cơ hội thị trường và xây dựng lộ trình bền vững cho Kepler.",
    icon: Target,
  },
  {
    title: "Chuẩn mực đạo đức",
    description:
      "Làm việc với tinh thần trách nhiệm, liêm chính và tuân thủ cao nhất trong mọi quyết định.",
    icon: Shield,
  },
  {
    title: "Chuyên môn sâu rộng",
    description:
      "Đội ngũ lãnh đạo tích lũy nhiều năm kinh nghiệm từ các tập đoàn bất động sản trong và ngoài nước.",
    icon: Award,
  },
  {
    title: "Minh bạch & công bằng",
    description:
      "Quản trị dựa trên sự công khai, công bằng và có trách nhiệm giải trình với khách hàng.",
    icon: Scale,
  },
  {
    title: "Phát triển bền vững",
    description:
      "Cân bằng giữa lợi ích doanh nghiệp, đối tác và cộng đồng trong từng dự án triển khai.",
    icon: TrendingUp,
  },
  {
    title: "Khách hàng là trọng tâm",
    description:
      "Mọi chiến lược đều hướng đến việc mang lại giá trị tối ưu và trải nghiệm chuyên nghiệp cho khách hàng.",
    icon: Users,
  },
];

export default function BoardOfDirectorsPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<Users className="h-6 w-6 text-red-400" />}
        eyebrow="Đội ngũ lãnh đạo"
        title="Ban điều hành"
        description="Đội ngũ lãnh đạo dày dặn kinh nghiệm, dẫn dắt Kepler trên con đường phát triển bền vững."
      />

      <AboutPageContent
        pageKeyVi="about-board-of-directors"
        pageKeyEn="about-board-of-directors_en"
        fallback={
          <>
            {/* Featured director */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="mb-16">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-red-600 uppercase">
                    <Briefcase className="h-4 w-4" />
                    Đội ngũ lãnh đạo
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Ban điều hành
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(239,68,68,0.18),_transparent_60%)]" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />

                    <div className="relative grid grid-cols-1 md:grid-cols-12">
                      {/* Avatar area */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center gap-8 p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/10 bg-gray-900/50">
                        <div className="relative">
                          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-rose-800 shadow-2xl border-4 border-white/10 flex items-center justify-center">
                            <span className="text-5xl font-black text-white/95 tracking-tight">
                              NTH
                            </span>
                          </div>
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold tracking-widest uppercase shadow-lg">
                              Lãnh đạo
                            </span>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 text-gray-300 font-medium">
                            <GraduationCap className="h-4 w-4 text-red-400" />
                            Thạc sỹ Quản trị Kinh doanh
                          </div>
                        </div>
                      </div>

                      {/* Bio area */}
                      <div className="md:col-span-7 p-10 md:p-14">
                        <span className="text-sm font-semibold tracking-wider text-red-500 uppercase">
                          Lãnh đạo điều hành
                        </span>
                        <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                          Ông Nguyễn Thái Hiền
                        </h3>

                        <div className="h-1 w-20 rounded-full bg-red-500 mt-6 mb-8" />

                        <div className="space-y-5 text-gray-300 leading-relaxed">
                          <p>
                            Am hiểu lĩnh vực bất động sản, thẩm định giá, tài
                            chính & quản trị. Ông đã có hơn 12 năm công tác
                            trong lĩnh vực bất động sản, thẩm định giá và tài
                            chính; là một chuyên gia về tư vấn bất động sản và
                            là thẩm định viên quốc gia.
                          </p>
                          <p>
                            Đã từng làm việc tại Tập đoàn bất động sản Hoàng Quân,
                            Tập đoàn Cengroup, Tập đoàn BĐS quốc tế Henry Butcher
                            Malaysia, Công ty CP thẩm định giá IVC Việt Nam… với
                            những vị trí cấp cao.
                          </p>
                          <p>
                            Ngoài ra, ông còn là giảng viên thỉnh giảng cho các
                            trường và trung tâm đào tạo bất động sản.
                          </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                          {[
                            "Bất động sản",
                            "Thẩm định giá",
                            "Tài chính",
                            "Quản trị",
                            "Giảng viên",
                          ].map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-gray-300 text-sm font-medium border border-white/10 hover:bg-red-600 hover:text-white transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* Leadership values / governance */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-red-600 uppercase">
                    <Shield className="h-4 w-4" />
                    Giá trị cốt lõi
                  </span>
                  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    Định hướng lãnh đạo & quản trị
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8">
                  {leadershipValues.map((value, idx) => (
                    <FadeIn key={value.title} delay={idx * 0.1}>
                      <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
                          <value.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
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
