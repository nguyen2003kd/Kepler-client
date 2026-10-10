import { cache } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import baseConfig from "@/configs/base";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { PostExtended } from "@/types/post";
import SafeImage from "@/components/common/safe-image";
import { getThumbnailSrc } from "@/lib/responsive-image";

const GROUP_PATH = "/linh-vuc-hoat-dong";
const normalizePath = (path: string) => "/" + path.replace(/^\/+|\/+$/g, "");

const getActivityGroup = cache(async (): Promise<CategoryWithChildren | null> => {
  try {
    const response = await fetch(`${baseConfig.backendDomain}/api/v1.0/category?language=vi`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return ((data.responseData || []) as CategoryWithChildren[]).find(category => category.link === GROUP_PATH) || null;
  } catch {
    return null;
  }
});

async function getActivityPosts(categoryId: string): Promise<PostExtended[]> {
  const query = new URLSearchParams({ category_id: categoryId, filterBy: "CLIENT", filters: "is_hidden==false", position: "true", sortOrderPosition: "ASC", pageSize: "999" });
  const response = await fetch(`${baseConfig.backendDomain}/api/v1.0/post?${query}`, { cache: "no-store" });
  if (!response.ok) return [];
  const data = await response.json();
  const posts = (data.responseData?.rows || []) as PostExtended[];
  return Promise.all(posts.map(async post => {
    const detail = await fetch(`${baseConfig.backendDomain}/api/v1.0/post/${post.id}`, { cache: "no-store" });
    return detail.ok ? (await detail.json()).responseData as PostExtended : post;
  }));
}

// Resolve by the CMS menu tree so edits to links and ordering in admin stay effective.
export async function resolveActivityPage(path: string) {
  const group = await getActivityGroup();
  if (!group) return null;
  const categories = [...(group.categories || [])].sort((a, b) => (a.position || 0) - (b.position || 0));
  const pathname = normalizePath(path);
  if (pathname === GROUP_PATH) return <ActivityPage category={group} categories={categories} posts={[]} overview />;
  const category = categories.find(item => item.link && normalizePath(item.link) === pathname);
  if (category?.id) return <ActivityPage category={category} categories={categories} posts={await getActivityPosts(category.id)} />;
  // Keep the existing article URL usable with the same service presentation.
  const parent = categories.find(item => item.link && pathname.startsWith(normalizePath(item.link) + "/"));
  if (!parent?.id) return null;
  const posts = await getActivityPosts(parent.id);
  const post = posts.find(item => item.slug === pathname.split("/").at(-1));
  return post ? <ActivityPage category={parent} categories={categories} posts={[post]} /> : null;
}

export default function ActivityPage({ category, categories, posts, overview = false }: {
  category: CategoryWithChildren; categories: CategoryWithChildren[]; posts: PostExtended[]; overview?: boolean;
}) {
  return (
    <main className="min-h-screen bg-white text-gray-900" data-activity-page>
      <section className="relative overflow-hidden bg-gray-900 bg-[url('/images/category-banner-investment.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <nav aria-label="Đường dẫn" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/90">
            <Link href="/" className="rounded py-2 hover:underline focus-visible:outline focus-visible:outline-2">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            {overview ? <span>Lĩnh vực hoạt động</span> : <Link href={GROUP_PATH} className="rounded py-2 hover:underline focus-visible:outline focus-visible:outline-2">Lĩnh vực hoạt động</Link>}
          </nav>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{category.name?.trim()}</h1>
          <div className="mt-6 h-1 w-20 bg-primary" />
          {category.description && <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">{category.description}</p>}
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <aside className="order-2 lg:order-1">
          <nav aria-label="Các lĩnh vực hoạt động" className="rounded-xl border border-gray-200 bg-gray-50 p-5 lg:sticky lg:top-8">
            <h2 className="mb-4 text-lg font-bold">Lĩnh vực hoạt động</h2>
            <ul className="space-y-2">
              {categories.filter(item => item.link).map(item => (
                <li key={item.id}>
                  <Link href={item.link!} aria-current={category.id === item.id ? "page" : undefined} className={`block rounded-lg px-4 py-3 text-sm font-medium leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${category.id === item.id ? "bg-primary text-white" : "text-gray-700 hover:bg-white hover:text-primary"}`}>{item.name?.trim()}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="order-1 min-w-0 lg:order-2">
          {overview ? (
            <section aria-label="Khám phá các lĩnh vực" className="grid gap-5 sm:grid-cols-2">
              {categories.filter(item => item.link).map(item => (
                <Link key={item.id} href={item.link!} className="group flex min-h-40 flex-col justify-between rounded-xl border border-gray-200 p-6 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <h2 className="text-xl font-bold leading-7 group-hover:text-primary">{item.name?.trim()}</h2>
                  {item.description && <p className="mt-3 leading-7 text-gray-700">{item.description}</p>}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Tìm hiểu lĩnh vực <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              ))}
            </section>
          ) : posts.length ? (
            <div className="space-y-12">
              {posts.map(post => (
                <article key={post.id} className="space-y-6" data-activity-content>
                  <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{post.title}</h2>
                  {post.summary && <div className="tiptap prose max-w-none text-lg leading-8 text-gray-700">{parse(post.summary)}</div>}
                  {(post.thumbnail_path || post.thumbnail_compress_info?.desktop) && <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-50"><SafeImage src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path, "/seo.png")} alt={post.title || category.name || ""} fill sizes="(max-width: 1024px) 100vw, 850px" className="object-contain" /></div>}
                  {[...(post.post_content || [])].sort((a, b) => (a.position || 0) - (b.position || 0)).map((content, index) => (
                    <div key={content.id || index} className="space-y-5">
                      {content.content && <div className="tiptap prose max-w-none leading-8 text-gray-700 [&_img]:h-auto [&_img]:max-w-full">{parse(content.content)}</div>}
                      {!!content.post_content_images?.length && <div className={`grid gap-4 ${(content.image_columns || 1) > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                        {[...content.post_content_images].sort((a, b) => (a.position || 0) - (b.position || 0)).map((image, imageIndex) => (
                          <div key={image.id || imageIndex} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50"><SafeImage src={getThumbnailSrc(image.file?.compress_info, image.file?.path, "/seo.png")} alt={`Hình minh họa ${post.title || category.name || ""}`} fill sizes="(max-width: 640px) 100vw, 850px" className="object-contain" /></div>
                        ))}
                      </div>}
                    </div>
                  ))}
                </article>
              ))}
            </div>
          ) : <p className="leading-7 text-gray-700">Nội dung giới thiệu đang được cập nhật.</p>}
          {!overview && <div className="mt-10 border-t border-gray-200 pt-8"><Link href="/contact?form=dich-vu-bds" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Liên hệ tư vấn <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>}
        </div>
      </div>
    </main>
  );
}
