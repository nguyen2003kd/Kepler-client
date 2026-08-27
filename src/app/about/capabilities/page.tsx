import { constructMetadata } from "@/lib/seo";
import {
  Award,
  TrendingUp,
  MapPin,
  Users,
  Target,
  Globe,
  Zap,
  Building2,
  Landmark,
  Briefcase,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Năng lực và thành tựu",
  description:
    "Số liệu năng lực, thành tựu, phạm vi hoạt động và nhóm khách hàng - dự án tiêu biểu của Kepler Group.",
  url: "/about/capabilities",
});

const stats = [
  { value: "1.000+", label: "Khách hàng doanh nghiệp", icon: Building2 },
  { value: "500+", label: "Dự án hoàn thành", icon: Zap },
  { value: "50+", label: "Chuyên gia", icon: Users },
  { value: "10+", label: "Năm kinh nghiệm", icon: Clock },
];

const statGradients = [
  "from-red-500 to-rose-500",
  "from-rose-500 to-red-600",
  "from-red-600 to-red-700",
  "from-red-700 to-rose-700",
];

const achievements = [
  "Top thương hiệu uy tín trong lĩnh vực bất động sản và tư vấn doanh nghiệp.",
  "Đối tác chiến lược của nhiều tập đoàn và tổng công ty lớn.",
  "Hệ sinh thái dịch vụ toàn diện, đáp ứng đa dạng nhu cầu của khách hàng.",
  "Đội ngũ chuyên gia giàu kinh nghiệm, được thị trường công nhận.",
];

const regions = [
  {
    zone: "Miền Bắc",
    cities: "Hà Nội, Hải Phòng, Quảng Ninh",
    icon: Landmark,
    accent: "from-red-500 to-rose-600",
  },
  {
    zone: "Miền Trung",
    cities: "Đà Nẵng, Nghệ An",
    icon: Globe,
    accent: "from-rose-500 to-red-600",
  },
  {
    zone: "Miền Nam",
    cities: "TP.HCM, Bình Dương, Đồng Nai",
    icon: MapPin,
    accent: "from-red-600 to-red-700",
  },
];

const clientGroups = [
  {
    title: "Doanh nghiệp vừa và nhỏ (SME)",
    icon: Briefcase,
    span: "md:col-span-8",
  },
  {
    title: "Tập đoàn, tổng công ty",
    icon: Building2,
    span: "md:col-span-4",
  },
  {
    title: "Khách hàng cá nhân & nhà đầu tư",
    icon: Users,
    span: "md:col-span-5",
  },
  {
    title: "Đối tác chiến lược & ngân hàng",
    icon: Landmark,
    span: "md:col-span-7",
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="bg-white">
      <AboutHero
        eyebrow="Năng lực & Thành tựu"
        title="Năng lực và thành tựu"
        description="Những con số và dấu ấn khẳng định vị thế của Kepler Group trên thị trường."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-capabilities"
        pageKeyEn="about-capabilities_en"
        fallback={
          <>
            {/* Opening */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <FadeIn className="lg:col-span-5" direction="right">
                    <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                      Năng lực & Thành tựu
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                      Sức mạnh được kiến tạo từ kết quả thực tế
                    </h2>
                    <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                    <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                      Kepler Group tích lũy năng lực qua từng dự án, từng đối
                      tác và từng giải pháp được thị trường công nhận.
                    </p>
                  </FadeIn>

                  <FadeIn className="lg:col-span-7" delay={0.15}>
                    <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-12 overflow-hidden">
                      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
                      <div className="relative flex items-start gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                          <Target className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold tracking-tight">
                            Nền tảng năng lực toàn diện
                          </h3>
                          <p className="mt-4 text-gray-300 leading-relaxed">
                            Mạng lưới khách hàng rộng khắp, đội ngũ chuyên gia
                            dày dạn và hệ sinh thái dịch vụ khép kín là ba trụ
                            cột giúp Kepler tự tin đồng hành cùng mọi phân khúc
                            thị trường.
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="relative bg-gray-900 py-20 md:py-24 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_60%)]" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="text-center mb-14">
                  <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                    Thống kê năng lực
                  </span>
                  <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    Những con số tạo nên năng lực
                  </h2>
                  <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {stats.map((s, idx) => (
                    <FadeIn key={s.label} delay={idx * 0.08}>
                      <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden group hover:bg-white/10 transition-all duration-300">
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statGradients[idx]}`}
                        />
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                          <s.icon className="h-6 w-6 text-red-400" />
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                          {s.value}
                        </div>
                        <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider font-medium">
                          {s.label}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Dấu ấn
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Thành tựu nổi bật
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-12 gap-5">
                  <FadeIn className="md:col-span-5" direction="right">
                    <div className="h-full relative rounded-3xl bg-gray-900 text-white p-10 overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-900/20 rounded-full blur-3xl" />
                      <div className="relative h-full flex flex-col justify-between">
                        <div>
                          <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                            <Award className="h-7 w-7 text-red-400" />
                          </div>
                          <h3 className="mt-8 text-3xl font-extrabold tracking-tight leading-tight">
                            Uy tín được khẳng định qua từng dự án
                          </h3>
                        </div>
                        <p className="mt-6 text-gray-300 leading-relaxed">
                          Kepler không ngừng hoàn thiện để mang đến giá trị bền
                          vững cho khách hàng, đối tác và cộng đồng.
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  <div className="md:col-span-7 space-y-4">
                    {achievements.map((a, idx) => (
                      <FadeIn key={idx} delay={idx * 0.08}>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                            <TrendingUp className="h-5 w-5 text-red-600" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">{a}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Scope — map-style list */}
            <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-12">
                  <FadeIn className="lg:col-span-5" direction="right">
                    <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                      Vùng phủ
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      Phạm vi hoạt động
                    </h2>
                    <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                    <p className="mt-6 text-gray-300 leading-relaxed">
                      Từ Bắc vào Nam, Kepler duy trì mạng lưới vững chắc tại
                      các thành phố trọng điểm của Việt Nam.
                    </p>
                  </FadeIn>

                  <div className="lg:col-span-7">
                    <ul className="relative space-y-8">
                      <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-red-500/0 via-red-500/40 to-red-500/0" />
                      {regions.map((r, idx) => (
                        <FadeIn key={r.zone} delay={idx * 0.12}>
                          <li className="relative pl-16">
                            <div
                              className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${r.accent} flex items-center justify-center shadow-lg shadow-red-900/20`}
                            >
                              <r.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                              <h3 className="text-xl font-bold text-white tracking-tight">
                                {r.zone}
                              </h3>
                              <p className="mt-1 text-gray-300 leading-relaxed">
                                {r.cities}
                              </p>
                            </div>
                          </li>
                        </FadeIn>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Client groups — bento */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Đối tác & Khách hàng
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Nhóm khách hàng và dự án
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                </FadeIn>

                <div className="grid md:grid-cols-12 gap-5">
                  {clientGroups.map((g, idx) => (
                    <FadeIn
                      key={g.title}
                      delay={idx * 0.08}
                      className={g.span}
                    >
                      <div className="group h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-600" />
                        <div className="flex flex-col h-full justify-between min-h-[160px]">
                          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                            <g.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h3 className="mt-6 text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                            {g.title}
                          </h3>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust closing */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn>
                  <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/20 rounded-full blur-[100px]" />
                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-6">
                          <ShieldCheck className="h-6 w-6 text-red-400" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                          Sẵn sàng đồng hành cùng mọi tham vọng
                        </h3>
                      </div>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        Với năng lực đã được kiểm chứng, Kepler cam kết mang
                        đến giải pháp chuyên nghiệp, hiệu quả và bền vững cho
                        từng đối tác và dự án.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
