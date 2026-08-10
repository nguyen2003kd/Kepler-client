import { constructMetadata } from "@/lib/seo";
import {
  UserCheck,
  BarChart3,
  Search,
  Scale,
  Wrench,
  TrendingUp,
  Palette,
  Award,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Hội đồng chuyên gia",
  description:
    "Hội đồng chuyên gia Kepler — các chuyên gia hàng đầu trong lĩnh vực thẩm định giá, luật đầu tư, quản lý vận hành, marketing BĐS và thiết kế thi công.",
  url: "/about/expert-council",
});

const experts = [
  {
    name: "Tiến sỹ Nguyễn Văn Anh",
    role: "Cố vấn cao cấp — Dịch vụ thẩm định giá bất động sản",
    field: "Thẩm định giá",
    bio: [
      "Tiến sỹ Quản Trị Kinh Doanh Trường Đại Học Nam California (SCUPS - U.S.A).",
      "Thẩm Định Viên về Giá do Bộ Tài chính cấp thẻ hành nghề.",
      "Đấu Giá Viên do Bộ Tư pháp cấp thẻ hành nghề.",
    ],
    experience:
      "Trong những năm gần đây ông là Giám đốc Công ty TNHH Thẩm Định Giá Sài Gòn (Saigon PA), Giám đốc Công ty TNHH Một Thành Viên Thẩm Định Giá Sài Gòn Nhà Đất, Giám đốc Công ty TNHH Thẩm Định Bất Động Sản Hoàng Quân…",
    current:
      "Hiện nay, ông là cố vấn cao cấp cho Kepler về các kỹ thuật thẩm định giá tài sản, tài chính doanh nghiệp, giúp cho Kepler hoạt động hiệu quả và đảm bảo các nghiệp vụ chuyên môn liên quan đến thẩm định giá.",
  },
  {
    name: "Thẩm định viên Nguyễn Thái Hiền",
    role: "Phụ trách tư vấn thẩm định giá",
    field: "Thẩm định giá",
    bio: [
      "Đã từng là lãnh đạo tại các Công ty thẩm định giá Hoàng Quân, Công ty thẩm định giá Thế Kỷ và Công ty thẩm định giá IVC Việt Nam…",
      "Với kinh nghiệm tiếp xúc và làm việc hơn 5.000 hồ sơ, ông có thể hiểu các loại tài sản.",
    ],
    experience: "",
    current: "",
  },
  {
    name: "Luật sư Vũ Văn Thành",
    role: "Phụ trách mảng tư vấn luật đầu tư và luật bất động sản",
    field: "Pháp lý",
    bio: ["Nhiều năm kinh nghiệm và trực tiếp xử lý rất nhiều trường hợp liên quan."],
    experience:
      "Đã từng là Phó ban pháp chế Tổng Cty bảo hiểm dầu khí Việt Nam, Trưởng văn phòng luật sư VNG Việt Nam.",
    current: "",
  },
  {
    name: "Kỹ sư Võ Minh Giáo",
    role: "Cán bộ chủ lực về quản lý và vận hành tòa nhà",
    field: "Quản lý vận hành",
    bio: [
      "Hơn 10 năm kinh nghiệm trong lĩnh vực quản lý và vận hành kỹ thuật tại các khách sạn lớn (Sofitel Plaza Saigon, Windsor Plaza Hotel, Saigon Center, Asia Refrigeration Corporation, New World Hotel Saigon…).",
      "Quản lý tài sản và vận hành các tòa nhà quy mô lớn như Everrich, Imperia, Nam Á Building, SCB Building…",
    ],
    experience: "",
    current:
      "Hiện ông Giáo là giảng viên hữu cơ của một số trường đào tạo nghề liên quan đến ngành BĐS.",
  },
  {
    name: "Thạc sỹ Nguyễn Thị Xuân Trang",
    role: "Phụ trách tư vấn marketing và phát triển bất động sản",
    field: "Marketing & Phát triển BĐS",
    bio: [
      "Nhiều năm kinh nghiệm trong việc triển khai các sản phẩm đầu tư, phân phối bất động sản và hệ thống bán lẻ.",
    ],
    experience: "",
    current: "",
  },
  {
    name: "KTS Nguyễn Văn Thả",
    role: "Phụ trách bộ phận tư vấn thiết kế và thi công",
    field: "Thiết kế & Thi công",
    bio: [
      "Thâm niên hơn 12 năm trong lĩnh vực thiết kế, xây dựng, lắp đặt trong mọi công trình dân dụng và chuyên dụng.",
      "Tham gia thiết kế và thi công một số dự án quy mô lớn với nhiều giải pháp tối ưu trong kiến trúc hiện đại.",
    ],
    experience: "",
    current: "",
  },
];

const fieldIcons: Record<string, LucideIcon> = {
  "Thẩm định giá": Search,
  "Pháp lý": Scale,
  "Quản lý vận hành": Wrench,
  "Marketing & Phát triển BĐS": TrendingUp,
  "Thiết kế & Thi công": Palette,
};

const expertGradients = [
  "from-red-500 to-rose-600",
  "from-rose-500 to-red-600",
  "from-red-600 to-red-700",
  "from-red-700 to-red-800",
  "from-rose-600 to-red-700",
];

const spanClasses = [
  "md:col-span-2 lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function getPrefix(name: string) {
  const match = name.match(
    /^(Tiến sỹ|Thạc sỹ|Luật sư|Kỹ sư|KTS|Thẩm định viên)/,
  );
  return match ? match[0] : "";
}

function getLastInitial(name: string) {
  const stripped = name.replace(
    /^(Tiến sỹ|Thạc sỹ|Luật sư|Kỹ sư|KTS|Thẩm định viên)\s+/,
    "",
  );
  const last = stripped.split(" ").pop();
  return last ? last.charAt(0).toUpperCase() : "";
}

export default function ExpertCouncilPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<UserCheck className="h-6 w-6 text-red-400" />}
        eyebrow="Chuyên gia tin cậy"
        title="Hội đồng chuyên gia"
        description="Hội đồng chuyên gia của Kepler quy tụ những chuyên gia hàng đầu trong nhiều lĩnh vực, đóng góp tri thức và kinh nghiệm vào mọi giải pháp dành cho khách hàng."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-expert-council"
        pageKeyEn="about-expert-council_en"
        fallback={
          <>
            {/* Hero statement */}
            <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.18),_transparent_60%)]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-[120px]" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 text-red-400 font-semibold tracking-wider uppercase text-sm">
                    <Award className="h-4 w-4" />
                    Đội ngũ chuyên gia
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Trí tuệ tập hợp — nền tảng của mọi giải pháp
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-600" />
                  <p className="mt-8 text-lg text-gray-300 leading-relaxed">
                    Hội đồng chuyên gia của Kepler là những nhà lãnh đạo thực
                    tiễn từ thẩm định giá, pháp lý, vận hành, marketing và thiết
                    kế. Họ cùng nhau kiến tạo giá trị bền vững cho khách hàng.
                  </p>
                </FadeIn>
              </div>
            </section>

            {/* Featured expert */}
            <section className="py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn>
                  <div className="relative rounded-3xl bg-gray-900 text-white p-8 md:p-12 overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.18),_transparent_60%)]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/20 rounded-full blur-[100px]" />
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-red-800" />

                    <div className="relative grid lg:grid-cols-5 gap-10 items-start">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-5">
                          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_transparent_70%)]" />
                            <span className="text-5xl font-black text-white/90">
                              {getLastInitial(experts[0].name)}
                            </span>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <BarChart3 className="h-7 w-7 text-red-400" />
                          </div>
                        </div>

                        <div>
                          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30">
                            {getPrefix(experts[0].name)}
                          </span>
                          <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                            {experts[0].name}
                          </h3>
                          <p className="mt-2 text-gray-300 font-medium">
                            {experts[0].role}
                          </p>
                          <span className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/20">
                            {experts[0].field}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-3 space-y-5">
                        <ul className="space-y-3">
                          {experts[0].bio.map((b, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-300 leading-relaxed"
                            >
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {experts[0].experience && (
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                            <p className="text-gray-300 leading-relaxed">
                              <span className="font-semibold text-red-400">
                                Kinh nghiệm:{" "}
                              </span>
                              {experts[0].experience}
                            </p>
                          </div>
                        )}

                        {experts[0].current && (
                          <div className="rounded-2xl bg-red-600/10 border border-red-500/20 p-5">
                            <p className="text-gray-300 leading-relaxed">
                              <span className="font-semibold text-red-400">
                                Hiện tại:{" "}
                              </span>
                              {experts[0].current}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* Expert network — non-uniform bento grid */}
            <section className="py-24 md:py-32 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Mạng lưới chuyên môn
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Mọi lĩnh vực, một tầm nhìn
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-600" />
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
                  {experts.slice(1).map((expert, idx) => {
                    const ExpertIcon = fieldIcons[expert.field] ?? BarChart3;
                    const prefix = getPrefix(expert.name);
                    const initial = getLastInitial(expert.name);
                    const gradient = expertGradients[idx % expertGradients.length];

                    return (
                      <FadeIn
                        key={expert.name}
                        delay={idx * 0.08}
                        className={spanClasses[idx]}
                      >
                        <div className="group relative h-full bg-gray-900 rounded-2xl p-7 border border-white/10 hover:border-red-500/30 transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.14),_transparent_60%)] opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div
                            className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradient}`}
                          />

                          <div className="relative">
                            <div className="flex items-start justify-between mb-5">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <span className="text-2xl font-black text-white/90">
                                  {initial}
                                </span>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                                <ExpertIcon className="h-6 w-6 text-red-400" />
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white">
                                  {expert.name}
                                </h3>
                                {prefix && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/20">
                                    {prefix}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 font-medium">
                                {expert.role}
                              </p>
                              <span className="mt-2 inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                                {expert.field}
                              </span>
                            </div>

                            <ul className="space-y-2 mb-4">
                              {expert.bio.map((b, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>

                            {expert.experience && (
                              <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-3">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                  <span className="font-semibold text-red-400">
                                    Kinh nghiệm:{" "}
                                  </span>
                                  {expert.experience}
                                </p>
                              </div>
                            )}

                            {expert.current && (
                              <div className="rounded-xl bg-red-600/10 border border-red-500/20 p-4">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                  <span className="font-semibold text-red-400">
                                    Hiện tại:{" "}
                                  </span>
                                  {expert.current}
                                </p>
                              </div>
                            )}
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
