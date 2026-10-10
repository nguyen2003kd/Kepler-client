"use client";

import parse from "html-react-parser";
import SafeImage from "@/components/common/safe-image";
import { getProfileSections, type ProfileTab } from "@/lib/introduction-profile";
import type { PostExtended } from "@/types/post";
import ProfileLayout from "./profile-layout";

export default function CmsMemberProfile({ post, categoryName, categorySlug }: {
  post: PostExtended; categoryName: string; categorySlug: string;
}) {
  const sections = getProfileSections(post);
  const renderPanel = (tab: ProfileTab) => sections[tab].length ? (
    <div className="space-y-5">
      {sections[tab].map((section) => (
        <div key={section.id} className="space-y-4">
          {section.content && <div className="tiptap prose max-w-none [&_img]:h-auto [&_img]:max-w-full">{parse(section.content)}</div>}
          {!!section.post_content_images?.length && (
            <div className={`grid gap-4 ${Math.min(2, section.image_columns || 1) === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
              {[...section.post_content_images].sort((a, b) => (a.position || 0) - (b.position || 0)).map((img) => (
                <div key={img.id || img.file?.path} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50">
                  <SafeImage src={img.file?.compress_info?.desktop || img.file?.path || "/seo.png"} alt={`Hình minh họa hồ sơ ${post.title || ""}`} fill className="object-contain" sizes="(max-width: 640px) 100vw, 400px" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : undefined;

  return <ProfileLayout
    name={post.title || "Hồ sơ thành viên"}
    groupName={categoryName}
    backHref={`/${categorySlug.replace(/^\//, "")}`}
    imageSrc={post.thumbnail_compress_info?.desktop || post.thumbnail_path || undefined}
    subtitle={post.summary ? <div className="tiptap prose max-w-none">{parse(post.summary)}</div> : undefined}
    panels={{ introduction: renderPanel("introduction"), experience: renderPanel("experience"), achievements: renderPanel("achievements") }}
  />;
}
