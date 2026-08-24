"use client";

import { useGetApiV10Post, useGetApiV10PostSlugSlug } from "@/api/endpoints/post";
import { Loading } from "@/components/common/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended as PostWithImage } from "@/types/post";
import parse from "html-react-parser";
import {
  Calendar,
  ChevronRight as BreadcrumbArrow,
  Eye,
  Facebook,
  Home,
  Link as LinkIcon,
  Mail,
  Twitter,
  User,
} from "lucide-react";
import Image from "@/components/common/safe-image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ProjectDetailViewProps {
  slug: string;
  initialPost?: PostWithImage;
}

export default function ProjectDetailView({ slug, initialPost }: ProjectDetailViewProps) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data, isLoading, error } = useGetApiV10PostSlugSlug(slug);

  const { data: relatedData } = useGetApiV10Post({
    filters: "is_hidden==false",
    sortField: "created_at",
    sortOrder: "desc",
    pageSize: 4,
    page: 1,
    filterBy: "CLIENT",
  });

  const currentPost = (data?.responseData as PostWithImage | undefined) ?? initialPost;

  const relatedProjects = useMemo(() => {
    const posts = (relatedData?.responseData?.rows as PostWithImage[]) || [];
    return posts.filter((p) => p.id !== currentPost?.id).slice(0, 3);
  }, [relatedData, currentPost]);

  if (isLoading && !initialPost) {
    return (
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <Loading text="Đang tải dự án..." size="lg" className="text-gray-900" />
        </div>
      </section>
    );
  }

  if ((error || !currentPost) && !initialPost) {
    return (
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="text-red-600 text-lg">
              {currentLang === "en" ? "Project not found" : "Không tìm thấy dự án"}
            </p>
            <Link href="/du-an">
              <Button className="mt-4">
                {currentLang === "en" ? "Back to projects" : "Về trang dự án"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!currentPost) return null;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = currentPost.title || "";
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  return (
    <>
      {/* Hero / Breadcrumb */}
      <section
        className="bg-[#0C2449] py-12 border-t border-gray-600"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            {currentLang === "en" ? "Project Detail" : "Chi tiết dự án"}
          </h1>
          <nav>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <Link href="/du-an" className="hover:text-white transition-colors">
                {currentLang === "en" ? "Projects" : "Dự án"}
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium line-clamp-1">{currentPost.title}</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-lg shadow-sm p-8">
                {currentPost.category?.name && (
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200">
                      {currentPost.category.name}
                    </Badge>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
                  {currentPost.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(currentPost.created_at).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{currentPost.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{currentPost.view || 0} {currentLang === "en" ? "views" : "lượt xem"}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <span className="text-gray-600 text-sm font-medium">
                    {currentLang === "en" ? "Share" : "Chia sẻ"}
                  </span>
                  <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShare("copy")}>
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShare("email")}>
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={getThumbnailSrc(currentPost.thumbnail_compress_info, currentPost.thumbnail_path, "/seo.png")}
                    alt={currentPost.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Summary */}
                {currentPost.summary && (
                  <div className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                    {parse(currentPost.summary)}
                  </div>
                )}

                {/* Post Content */}
                {currentPost.post_content && currentPost.post_content.length > 0 && (
                  <div className="prose prose-lg max-w-none">
                    {currentPost.post_content.map((content: PostContent, idx: number) => (
                      <div key={idx} className="mb-6">
                        {content.content && <div>{parse(content.content)}</div>}
                        {content.post_content_images && content.post_content_images.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {content.post_content_images.map((img, imgIdx) => {
                              const imgSrc = img.file?.compress_info?.desktop
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}${img.file.compress_info.desktop}`
                                : img.file?.path
                                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL || ""}${img.file.path}`
                                  : "/seo.png";
                              return (
                                <div key={imgIdx} className="relative aspect-video rounded-lg overflow-hidden">
                                  <Image
                                    src={imgSrc}
                                    alt=""
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </div>

            {/* Sidebar - Related Projects */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {currentLang === "en" ? "Related Projects" : "Dự án liên quan"}
                  </h3>
                  <div className="space-y-4">
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/du-an/${project.slug}`}
                        className="group flex gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={getThumbnailSrc(project.thumbnail_compress_info, project.thumbnail_path, "/seo.png")}
                            alt={project.title || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h4>
                          {project.category?.name && (
                            <span className="text-xs text-gray-500">{project.category.name}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
