import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutPageContent from "../components/about-page-content";
import AboutBanner from "../components/banner";
import AboutStatsSection from "../components/about-stats-section";
import AboutEcosystemSection from "../components/about-ecosystem-section";
import AboutMainServicesSection from "../components/about-main-services-section";
import AboutVisionMissionSection from "../components/about-vision-mission-section";
import AboutExpertCouncilSection from "../components/about-expert-council-section";
import AboutCertificationsSection from "../components/about-certifications-section";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { ImageCompressInfo } from "@/types/post";
import MemberAvatar from "../components/member-avatar";
import { fetchBoardMembers } from "../lib/fetch-board-members";

export const metadata = constructMetadata({
  title: "Giới thiệu Kepler Group",
  description:
    "Kepler Group — hệ sinh thái tư vấn và dịch vụ bất động sản chuyên nghiệp: tư vấn phát triển dự án, thẩm định giá, quản lý khai thác, M&A và giải pháp số.",
  url: "/about/company-overview",
});

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

export default async function CompanyOverviewPage() {
  const boardPosts = await fetchBoardMembers(20);

  return (
    <div className="bg-white">
      <AboutBanner />

      {/* Stats — from PageConfig STATS_NUMBERS */}
      <AboutStatsSection />

      {/* Section 1: Giới thiệu Kepler Group — from PageConfig about-company-overview */}
      <AboutPageContent
        pageKeyVi="about-company-overview"
        pageKeyEn="about-company-overview_en"
        fallback={
          <>
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
            <AboutVisionMissionSection />

            {/* Section 3: Lĩnh vực hoạt động chính */}
            <AboutMainServicesSection />

            {/* Section 4: Hệ thống thành viên */}
            <AboutEcosystemSection />

            {/* Section 5: Ban điều hành */}
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

                {boardPosts.length > 0 ? (
                  <>
                    {/* First member featured */}
                    <FadeIn className="mb-8">
                      <a
                        href={`/about/board-of-directors/${boardPosts[0].slug}`}
                        className="group relative block overflow-hidden rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500"
                      >
                        <div className="grid md:grid-cols-5 gap-0">
                          {/* Left: avatar area */}
                          <div className="md:col-span-2 relative bg-gradient-to-br from-red-600 to-red-800 p-10 md:p-12 flex flex-col items-center justify-center min-h-[320px]">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                            {(() => {
                              const imgSrc = getThumbnailSrc(
                                (boardPosts[0] as { thumbnail_compress_info?: ImageCompressInfo }).thumbnail_compress_info,
                                boardPosts[0].thumbnail_path
                              );
                              return imgSrc ? (
                                <MemberAvatar
                                  thumbnailPath={boardPosts[0].thumbnail_path}
                                  thumbnailCompressInfo={(boardPosts[0] as { thumbnail_compress_info?: ImageCompressInfo }).thumbnail_compress_info}
                                  title={boardPosts[0].title}
                                  size="lg"
                                  className="relative ring-4 ring-white/20 shadow-2xl"
                                />
                              ) : (
                                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm ring-4 ring-white/20 flex items-center justify-center shadow-2xl">
                                  <span className="text-4xl md:text-5xl font-black text-white">
                                    {boardPosts[0].title.replace(/^(KTS\.|LS\.|KS\.)\s*/, "").charAt(0)}
                                  </span>
                                </div>
                              );
                            })()}
                            <span className="relative mt-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase border border-white/20">
                              {boardPosts[0].summary?.split(" - ")[0] || "Lãnh đạo"}
                            </span>
                          </div>

                          {/* Right: info */}
                          <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight group-hover:text-[#DC2626] transition-colors">
                              {boardPosts[0].title}
                            </h3>
                            <div className="mt-4 w-12 h-0.5 bg-[#DC2626]" />
                            <p className="mt-6 text-base md:text-lg text-gray-500 leading-relaxed">
                              {boardPosts[0].summary?.split(" - ").slice(1).join(" - ") || "Thành viên Ban điều hành Kepler Group"}
                            </p>
                            <div className="mt-8 inline-flex items-center gap-2 text-[#DC2626] font-semibold text-sm group-hover:gap-3 transition-all">
                              Xem hồ sơ chi tiết
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </FadeIn>

                    {/* Remaining members */}
                    {boardPosts.length > 1 && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {boardPosts.slice(1).map((post: { id: string; title: string; slug: string; summary?: string; thumbnail_path?: string; thumbnail_compress_info?: ImageCompressInfo }, idx: number) => {
                          const role = post.summary?.split(" - ")[0] || "";
                          const imgSrc = getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path);
                          return (
                            <FadeIn key={post.id} delay={idx * 0.05}>
                              <a
                                href={`/about/board-of-directors/${post.slug}`}
                                className="group block bg-white rounded-2xl border border-gray-200 hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                              >
                                <div className="h-1.5 bg-gradient-to-r from-[#DC2626] to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                <div className="p-6 flex flex-col items-center text-center">
                                  {imgSrc ? (
                                    <MemberAvatar
                                      thumbnailPath={post.thumbnail_path}
                                      thumbnailCompressInfo={post.thumbnail_compress_info}
                                      title={post.title}
                                      size="sm"
                                      className="ring-2 ring-gray-100 mb-4"
                                    />
                                  ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#DC2626] group-hover:to-red-800 flex items-center justify-center mb-4 transition-all duration-300">
                                      <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">
                                        {post.title.replace(/^(KTS\.|LS\.|KS\.)\s*/, "").charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                  <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug group-hover:text-[#DC2626] transition-colors">
                                    {post.title}
                                  </h3>
                                  {role && (
                                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                                      {role}
                                    </p>
                                  )}
                                </div>
                              </a>
                            </FadeIn>
                          );
                        })}
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

            {/* Section 6: Hội đồng cố vấn */}
            <AboutExpertCouncilSection />

            {/* Section 7 & 8: Chứng chỉ + Hồ sơ năng lực */}
            <AboutCertificationsSection />

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
