import { constructMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";
import { getThumbnailSrc } from "@/lib/responsive-image";
import MemberAvatar from "../components/member-avatar";
import { fetchExpertCouncil, type BoardPost } from "../lib/fetch-board-members";

export const metadata = constructMetadata({
  title: "Hội đồng cố vấn",
  description:
    "Hội đồng cố vấn Kepler — các chuyên gia hàng đầu trong lĩnh vực thẩm định giá, luật đầu tư, quản lý vận hành, marketing BĐS và thiết kế thi công.",
  url: "/about/expert-council",
});

export default async function ExpertCouncilPage() {
  const expertPosts = await fetchExpertCouncil();

  return (
    <div className="bg-white">
      <AboutHero
        eyebrow="Chuyên gia tin cậy"
        title="Hội đồng cố vấn"
        description="Hội đồng cố vấn của Kepler quy tụ những chuyên gia hàng đầu trong nhiều lĩnh vực, đóng góp tri thức và kinh nghiệm vào mọi giải pháp dành cho khách hàng."
      />

      <AboutPageContent
        pageKeyVi="about-expert-council"
        pageKeyEn="about-expert-council_en"
        fallback={
          <section className="py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <FadeIn className="max-w-2xl mb-16">
                <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                  Đội ngũ cố vấn
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                  Hội đồng cố vấn
                </h2>
                <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
              </FadeIn>

              {expertPosts.length > 0 ? (
                <>
                  {/* Featured expert — first member */}
                  {expertPosts[0] && (
                    <FadeIn className="mb-8">
                      <a
                        href={`/about/expert-council/${expertPosts[0].slug}`}
                        className="group relative block overflow-hidden rounded-3xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500"
                      >
                        <div className="grid md:grid-cols-5 gap-0">
                          {/* Left: avatar area */}
                          <div className="md:col-span-2 relative bg-gradient-to-br from-red-600 to-red-800 p-10 md:p-12 flex flex-col items-center justify-center min-h-[320px]">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                            {(() => {
                              const post = expertPosts[0] as BoardPost;
                              const imgSrc = getThumbnailSrc(
                                post.thumbnail_compress_info,
                                post.thumbnail_path
                              );
                              return imgSrc ? (
                                <MemberAvatar
                                  thumbnailPath={post.thumbnail_path}
                                  thumbnailCompressInfo={post.thumbnail_compress_info}
                                  title={post.title}
                                  size="lg"
                                  className="relative ring-4 ring-white/20 shadow-2xl"
                                />
                              ) : (
                                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm ring-4 ring-white/20 flex items-center justify-center shadow-2xl">
                                  <span className="text-4xl md:text-5xl font-black text-white">
                                    {post.title.replace(/^(KTS\.|LS\.|KS\.|TS\.|ThS\.)\s*/, "").charAt(0)}
                                  </span>
                                </div>
                              );
                            })()}
                            <span className="relative mt-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase border border-white/20">
                              {(expertPosts[0] as BoardPost).summary?.split(" - ")[0] || "Cố vấn"}
                            </span>
                          </div>

                          {/* Right: info */}
                          <div className="md:col-span-3 p-10 md:p-12 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                              {expertPosts[0].title}
                            </h3>
                            <div className="mt-4 w-12 h-0.5 bg-red-600" />
                            <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
                              {expertPosts[0].summary?.split(" - ").slice(1).join(" - ") || "Thành viên Hội đồng cố vấn Kepler Group"}
                            </p>
                            <div className="mt-8 inline-flex items-center gap-2 text-red-600 font-semibold text-sm group-hover:gap-3 transition-all">
                              Xem hồ sơ chi tiết
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </FadeIn>
                  )}

                  {/* Expert grid — remaining members */}
                  {expertPosts.length > 1 && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                      {expertPosts.slice(1).map((post: BoardPost, idx: number) => {
                        const role = post.summary?.split(" - ")[0] || "";
                        const imgSrc = getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path);
                        return (
                          <FadeIn key={post.id} delay={idx * 0.05}>
                            <a
                              href={`/about/expert-council/${post.slug}`}
                              className="group block bg-white rounded-2xl border border-gray-200 hover:border-red-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                              {/* Top accent */}
                              <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

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
                                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-600 group-hover:to-red-800 flex items-center justify-center mb-4 transition-all duration-300">
                                    <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">
                                      {post.title.replace(/^(KTS\.|LS\.|KS\.|TS\.|ThS\.)\s*/, "").charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors">
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
