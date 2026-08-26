import { constructMetadata } from "@/lib/seo";
import {
  Building2,
  Target,
  ArrowRight,
  Award,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Download,
  Eye,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";
import EcosystemMembersSection from "../components/ecosystem-members-section";
import baseConfig from "@/configs/base";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";

async function fetchBoardMembers() {
  try {
    const catRes = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/category`,
      { cache: "no-store" }
    );
    if (!catRes.ok) return [];
    const catData = await catRes.json();
    const all = (catData?.responseData || []) as CategoryWithChildren[];
    const flat: CategoryWithChildren[] = [];
    const flatten = (cats: CategoryWithChildren[]) => {
      for (const c of cats) { flat.push(c); if (c.categories) flatten(c.categories); }
    };
    flatten(all);
    const cat = flat.find((c) => c.link === "/about/board-of-directors");
    if (!cat) return [];

    const postRes = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post?category_id=${cat.id}&filters=is_hidden==false&sortField=created_at&sortOrder=desc&pageSize=20&filterBy=CLIENT`,
      { cache: "no-store" }
    );
    if (!postRes.ok) return [];
    const postData = await postRes.json();
    return postData?.responseData?.rows || [];
  } catch {
    return [];
  }
}
export const metadata = constructMetadata({
  title: "Giới thiệu Kepler Group",
  description:
    "Kepler Group — hệ sinh thái tư vấn và dịch vụ bất động sản chuyên nghiệp: tư vấn phát triển dự án, thẩm định giá, quản lý khai thác, M&A và giải pháp số.",
  url: "/about/company-overview",
});

const stats = [
  { label: "Năm kinh nghiệm", value: "25+" },
  { label: "Công ty thành viên", value: "08" },
  { label: "Lĩnh vực dịch vụ", value: "07" },
  { label: "Chuyên gia & Cố vấn", value: "50+" },
];

const boardMembers = [
  {
    name: "Nguyễn Thái Hiền",
    role: "Nhà sáng lập & Điều hành",
    init: "NTH",
    bio: "Thạc sỹ quản trị kinh doanh, thẩm định viên quốc gia và chuyên gia lĩnh vực bất động sản, tư vấn chiến lược, tư vấn quản trị. Hơn 25 năm công tác trong các vị trí quản lý lãnh đạo tại Tập đoàn BĐS Hoàng Quân, Cengroup, Henry Butcher Malaysia, VNG.",
    isFounder: true,
  },
  {
    name: "KTS. Mai Thanh Tùng",
    role: "Giám đốc dự án",
    init: "MTT",
    bio: "Phụ trách tư vấn thiết kế và thi công cho các dự án BĐS và công trình dân dụng. Gần 30 năm kinh nghiệm trong lĩnh vực thiết kế, xây dựng, lắp đặt.",
  },
  {
    name: "Nguyễn Quốc Đạt",
    role: "Thẩm định viên",
    init: "NQĐ",
    bio: "Thành viên, cổ đông Kepler Property. Chịu trách nhiệm kỹ thuật thẩm định giá tài sản, tài chính doanh nghiệp. Nguyên trưởng phó phòng định giá Công ty TNHH Thẩm Định BĐS Hoàng Quân.",
  },
  {
    name: "LS. Lưu Quang Phú",
    role: "Tư vấn luật",
    init: "LQP",
    bio: "Phụ trách mảng tư vấn luật đầu tư và pháp lý bất động sản. Nguyên Giám đốc Công ty luật Hoàng Quân, hiện là Giám đốc Công ty Luật OpenLaw.",
  },
  {
    name: "KS. Võ Minh Giáo",
    role: "Khai thác vận hành",
    init: "VMG",
    bio: "Cán bộ chủ lực quản lý và vận hành tòa nhà. Hơn 20 năm kinh nghiệm tại Sofitel Plaza, Windsor Plaza, Saigon Center, New World Hotel, Everrich, Imperia, SCB Building. Hiện là Giám đốc viện đào tạo quản lý VCG.",
  },
  {
    name: "Nguyễn Hoàng Nam",
    role: "Quản lý dự án",
    init: "NHN",
    bio: "Chuyên gia quản lý và điều phối phát triển dự án BĐS. Nhiều năm kinh nghiệm quản lý tiến độ, chi phí, pháp lý, thiết kế, lựa chọn nhà thầu từ giai đoạn chuẩn bị đầu tư đến bàn giao.",
  },
  {
    name: "Trần Minh Đức",
    role: "Tài chính bất động sản",
    init: "TMĐ",
    bio: "Chuyên gia phân tích tài chính và cấu trúc vốn cho dự án BĐS. Chuyên xây dựng mô hình tài chính, phân tích dòng tiền, IRR, NPV, khả năng huy động vốn.",
  },
  {
    name: "Phạm Quốc Anh",
    role: "Quy hoạch đô thị",
    init: "PQA",
    bio: "Chuyên gia quy hoạch và phát triển không gian đô thị. Kinh nghiệm nghiên cứu quy hoạch sử dụng đất, tổ chức không gian, hạ tầng và định hướng phát triển dự án.",
  },
  {
    name: "Lê Minh Khoa",
    role: "Thiết kế đô thị thông minh",
    init: "LMK",
    bio: "Chuyên gia thiết kế đô thị và ứng dụng giải pháp thông minh trong phát triển BĐS. Tập trung vào tổ chức không gian, cảnh quan, hạ tầng số và giải pháp công nghệ.",
  },
];

const advisorForms = [
  "Cố vấn theo dự án",
  "Cố vấn theo thương vụ đầu tư/M&A",
  "Cố vấn định kỳ cho doanh nghiệp",
  "Hội đồng chuyên gia độc lập cho các quyết định quan trọng",
];

export default async function CompanyOverviewPage() {
  const boardPosts = await fetchBoardMembers();

  return (
    <div className="bg-white">
      <AboutHero
        icon={<Building2 className="h-6 w-6 text-red-400" />}
        eyebrow="Giới thiệu doanh nghiệp"
        title="Giới thiệu Kepler Group"
        description="Hệ sinh thái tư vấn và dịch vụ bất động sản chuyên nghiệp — đồng hành cùng doanh nghiệp trong toàn bộ vòng đời tài sản."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-company-overview"
        pageKeyEn="about-company-overview_en"
        fallback={
          <>
            {/* Stats strip */}
            <section className="relative bg-[#DC2626] py-16 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:48px_48px]" />
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <FadeIn key={stat.label} delay={idx * 0.08}>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-sm text-red-100 uppercase tracking-wider font-medium mt-2">
                          {stat.label}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 1: Giới thiệu Kepler Group */}
            <section className="py-20 md:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  <FadeIn className="lg:col-span-5" direction="right">
                    <div className="lg:sticky lg:top-8">
                      <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
                        Về chúng tôi
                      </span>
                      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Giới thiệu Kepler Group
                      </h2>
                      <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
                      <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                        Hệ sinh thái tư vấn và dịch vụ bất động sản khép kín —
                        từ nghiên cứu đầu tư đến vận hành và tối ưu giá trị.
                      </p>
                    </div>
                  </FadeIn>

                  <FadeIn className="lg:col-span-7" delay={0.15}>
                    <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                      <p>
                        Kepler Group là doanh nghiệp hoạt động trong lĩnh vực tư
                        vấn phát triển dự án, tư vấn đầu tư, thẩm định giá, quản
                        lý và khai thác tài sản, thực hiện các thương vụ
                        M&amp;A và giải pháp số cho bất động sản.
                      </p>
                      <p>
                        Đội ngũ sáng lập có hơn 25 năm kinh nghiệm, đã từng và
                        đang công tác tại các tổ chức tập đoàn lớn trong và
                        ngoài nước chuyên về lĩnh vực bất động sản.
                      </p>
                      <p>
                        Chúng tôi kết hợp kinh nghiệm thực tiễn, đội ngũ chuyên
                        gia đa ngành và phương pháp tiếp cận dựa trên dữ liệu,
                        kinh nghiệm và thực chiến nhằm mang đến giải pháp phù
                        hợp cho từng giai đoạn phát triển của dự án và doanh
                        nghiệp.
                      </p>
                      <div className="relative p-8 rounded-2xl bg-[#DC2626] text-white overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <p className="relative text-xl font-medium leading-relaxed">
                          Kepler không chỉ tư vấn mà còn đồng hành trong quá
                          trình triển khai, vận hành và tối ưu hiệu quả đầu tư
                          cùng khách hàng.
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Section 2: Tầm nhìn – Sứ mệnh */}
            <section className="py-20 md:py-28 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-14">
                  <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
                    Định hướng phát triển
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Tầm nhìn – Sứ mệnh
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-6">
                  <FadeIn>
                    <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626] flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Tầm nhìn
                        </h3>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>
                            Xây dựng mô hình khép kín mang lại nhiều tiện ích và
                            chất lượng cho khách hàng và đối tác với sản phẩm
                            và dịch vụ chuyên nghiệp.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>
                            Trở thành công ty có dịch vụ và sản phẩm chuyên
                            nghiệp nhất trong ngành bất động sản tại Việt Nam.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626] flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Sứ mệnh
                        </h3>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>
                            Cung cấp sản phẩm và dịch vụ tốt nhất, chuyên nghiệp
                            nhất cho thị trường.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>
                            Tạo ra một chuỗi giá trị cho người tiêu dùng trong
                            lĩnh vực bất động sản.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </FadeIn>
                </div>

                <FadeIn className="mt-8 text-right">
                  <a
                    href="/about/vision-mission"
                    className="inline-flex items-center gap-2 text-[#DC2626] font-semibold hover:gap-3 transition-all"
                  >
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </FadeIn>
              </div>
            </section>

            {/* Section 3: Hệ thống thành viên */}
            <EcosystemMembersSection />

            {/* Section 4: Ban điều hành */}
            <section className="py-20 md:py-28 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-14">
                  <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
                    Đội ngũ lãnh đạo
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Ban điều hành
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
                </FadeIn>

                {/* Board members from API */}
                {boardPosts.length > 0 ? (
                  <>
                    {/* First member featured */}
                    <FadeIn className="mb-8">
                      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#DC2626]" />
                        <div className="grid md:grid-cols-12 gap-0">
                          <div className="md:col-span-4 flex flex-col items-center justify-center gap-6 p-10 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                            {boardPosts[0].thumbnail_path ? (
                              <img
                                src={boardPosts[0].thumbnail_path}
                                alt={boardPosts[0].title}
                                className="w-32 h-32 rounded-full object-cover shadow-xl"
                              />
                            ) : (
                              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DC2626] to-red-800 flex items-center justify-center shadow-xl">
                                <span className="text-4xl font-black text-white tracking-tight">
                                  {boardPosts[0].title.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="text-center">
                              <span className="inline-block px-4 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-bold tracking-widest uppercase">
                                Lãnh đạo
                              </span>
                              <h3 className="mt-3 text-xl font-bold text-gray-900">
                                {boardPosts[0].title}
                              </h3>
                            </div>
                          </div>
                          <div className="md:col-span-8 p-8 md:p-10">
                            <a
                              href={`/about/board-of-directors/${boardPosts[0].slug}`}
                              className="text-base md:text-lg text-gray-600 leading-relaxed hover:text-[#DC2626] transition-colors"
                            >
                              Xem hồ sơ chi tiết
                              <ArrowRight className="inline h-4 w-4 ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </FadeIn>

                    {/* Remaining members */}
                    {boardPosts.length > 1 && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {boardPosts.slice(1).map((post: { id: string; title: string; slug: string; thumbnail_path?: string }, idx: number) => (
                          <FadeIn key={post.id} delay={idx * 0.05}>
                            <a
                              href={`/about/board-of-directors/${post.slug}`}
                              className="group h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-lg transition-all duration-300 block"
                            >
                              <div className="flex items-center gap-4 mb-4">
                                {post.thumbnail_path ? (
                                  <img
                                    src={post.thumbnail_path}
                                    alt={post.title}
                                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-[#DC2626]">
                                      {post.title.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#DC2626] transition-colors">
                                    {post.title}
                                  </h3>
                                </div>
                              </div>
                            </a>
                          </FadeIn>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Fallback: Founder */}
                    <FadeIn className="mb-8">
                      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#DC2626]" />
                        <div className="grid md:grid-cols-12 gap-0">
                          <div className="md:col-span-4 flex flex-col items-center justify-center gap-6 p-10 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DC2626] to-red-800 flex items-center justify-center shadow-xl">
                              <span className="text-4xl font-black text-white tracking-tight">
                                {boardMembers[0].init}
                              </span>
                            </div>
                            <div className="text-center">
                              <span className="inline-block px-4 py-1.5 rounded-full bg-[#DC2626] text-white text-xs font-bold tracking-widest uppercase">
                                Nhà sáng lập
                              </span>
                              <h3 className="mt-3 text-xl font-bold text-gray-900">
                                {boardMembers[0].name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {boardMembers[0].role}
                              </p>
                            </div>
                          </div>
                          <div className="md:col-span-8 p-8 md:p-10">
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                              {boardMembers[0].bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FadeIn>

                    {/* Fallback: Team members */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                      {boardMembers.slice(1).map((member, idx) => (
                        <FadeIn key={member.name} delay={idx * 0.05}>
                          <div className="group h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <span className="text-sm font-bold text-[#DC2626]">
                                  {member.init}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-gray-900 leading-snug">
                                  {member.name}
                                </h3>
                                <p className="text-xs text-[#DC2626] font-medium mt-0.5">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                              {member.bio}
                            </p>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </>
                )}

                <FadeIn className="mt-8 text-right">
                  <a
                    href="/about/board-of-directors"
                    className="inline-flex items-center gap-2 text-[#DC2626] font-semibold hover:gap-3 transition-all"
                  >
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </FadeIn>
              </div>
            </section>

            {/* Section 5: Hội đồng cố vấn */}
            <section className="py-20 md:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <FadeIn className="lg:col-span-5" direction="right">
                    <div className="lg:sticky lg:top-8">
                      <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
                        Chuyên gia tin cậy
                      </span>
                      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                        Hội đồng cố vấn Kepler
                      </h2>
                      <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
                    </div>
                  </FadeIn>

                  <FadeIn className="lg:col-span-7" delay={0.15}>
                    <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                      <p>
                        Hội đồng Cố vấn Kepler là mạng lưới chuyên gia đa ngành
                        được Kepler tổ chức nhằm cung cấp góc nhìn độc lập,
                        chuyên sâu và thực tiễn cho các quyết định quan trọng
                        trong lĩnh vực bất động sản.
                      </p>
                      <p>
                        Hội đồng quy tụ các chuyên gia theo từng nhóm chuyên môn
                        như đầu tư &amp; tài chính, thẩm định giá, pháp lý, quy
                        hoạch đô thị, phát triển dự án, thiết kế kiến trúc – đô
                        thị, quản lý &amp; khai thác tài sản, M&amp;A và công
                        nghệ bất động sản.
                      </p>
                      <p>
                        Tùy theo tính chất của từng dự án hoặc thương vụ, Kepler
                        thành lập Hội đồng Cố vấn chuyên biệt, lựa chọn các
                        chuyên gia phù hợp để đánh giá cơ hội, thẩm tra phương
                        án, nhận diện rủi ro và đưa ra khuyến nghị chiến lược.
                      </p>
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-900 mb-4">
                        Các hình thức tham gia:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {advisorForms.map((form) => (
                          <div
                            key={form}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                            <span>{form}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <a
                        href="/about/expert-council"
                        className="inline-flex items-center gap-2 text-[#DC2626] font-semibold hover:gap-3 transition-all"
                      >
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Section 6 & 7: Chứng chỉ + Hồ sơ năng lực */}
            <section className="py-20 md:py-28 bg-gray-50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Chứng chỉ */}
                  <FadeIn>
                    <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626] flex items-center justify-center">
                          <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold tracking-wider text-[#DC2626] uppercase">
                            Minh bạch &amp; Uy tín
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Chứng chỉ và giấy phép
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler
                        Group công bố, khẳng định sự tuân thủ và uy tín trong
                        hoạt động kinh doanh.
                      </p>
                      <a
                        href="/about/certifications"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        Xem chứng chỉ
                      </a>
                    </div>
                  </FadeIn>

                  {/* Hồ sơ năng lực */}
                  <FadeIn delay={0.1}>
                    <div className="h-full bg-white rounded-2xl p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626] flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold tracking-wider text-[#DC2626] uppercase">
                            Năng lực Kepler
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Hồ sơ năng lực
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Bộ tài liệu giới thiệu năng lực, kinh nghiệm và các dự án
                        tiêu biểu của Kepler Group. Tải xuống để xem chi tiết.
                      </p>
                      <a
                        href="/about/capability-profile"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Tải hồ sơ năng lực
                      </a>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 md:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn>
                  <div className="relative rounded-3xl bg-[#DC2626] text-white p-10 md:p-16 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:48px_48px]" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                      <div>
                        <span className="text-sm font-semibold tracking-wider text-red-100 uppercase">
                          Đồng hành cùng Kepler
                        </span>
                        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                          Kết nối với chúng tôi
                        </h2>
                        <p className="mt-4 text-red-100 text-lg leading-relaxed">
                          Kepler luôn sẵn sàng đồng hành cùng doanh nghiệp trong
                          mọi giai đoạn phát triển dự án và tối ưu giá trị tài
                          sản.
                        </p>
                      </div>
                      <div className="flex md:justify-end">
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#DC2626] font-semibold rounded-full hover:bg-gray-100 transition-colors group"
                        >
                          Liên hệ tư vấn
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
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
