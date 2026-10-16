import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import baseConfig from "@/configs/base";
import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "./_templates/category-page";
import DynamicPostDetailPage from "./_templates/post-detail-page";
import { isIntroductionPath } from "@/lib/introduction-profile";
import { resolveActivityPage } from "./_designed-pages/linh-vuc-hoat-dong/activity-page";
import { resolveMarketplacePage } from "./_designed-pages/san-giao-dich/marketplace-page";
import { getApiV10PropertyId } from "@/api/endpoints/property";
import { getCategoryByLink, getCategoryWithSiblings, getPostsByCategory, getPostBySlug } from "./_designed-pages/api-helpers";
import { getPageByPath, normalizePagePath, type PageRecord } from "./_designed-pages/page-lookup";
import { DESIGNED_PAGE_COMPONENTS } from "./_designed-pages/registry";
import EcosystemServiceSubPage from "./_designed-pages/he-sinh-thai/[unitKey]/[serviceSlug]/page";
import ContactSubPage from "./_designed-pages/contact/[...slug]/page";
import ProductDetailSubPage from "./_designed-pages/products/[id]/page";
import KienThucGalleryPage from "./_designed-pages/kien-thuc/page";

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ date?: string; page?: string }>;
}
interface NewsDetailPageProps {
  params: Promise<{ slug: string[] }>;
}

const createMockCategory = (slug: string): CategoryWithChildren => {
  const displayName =
    slug === "post" ? "Bài viết" : slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    id: `mock-category-${slug}`,
    name: displayName,
    code: `mock-category-${slug}`,
    link: `/${slug}`,
    description: `Danh mục ${displayName}`,
    categories: [],
  } as CategoryWithChildren;
};

const createPageCategory = (
  page: PageRecord,
  lastSlug: string,
): CategoryWithChildren =>
  ({
    id: page.id,
    name: page.name,
    code: page.path?.replace(/^\//, "") || lastSlug,
    link: page.path || `/${lastSlug}`,
    description: page.description,
    categories: [],
  }) as CategoryWithChildren;

// Resolve theo page API: DESIGNED -> component tinh, NEWS -> ui tin tuc + posts.
async function resolveDesignedOrNewsPage(
  slug: string[],
  searchParams?: { date?: string; page?: string },
  siblingCategories?: CategoryWithChildren[],
  parentLink?: string,
) {
  const lastSlug = slug.at(-1);
  if (!lastSlug) return null;

  const pageRecord = await getPageByPath(normalizePagePath(lastSlug));
  if (!pageRecord?.type) return null;

  if (pageRecord.type === "DESIGNED") {
    const DesignedComponent = DESIGNED_PAGE_COMPONENTS[lastSlug];
    if (DesignedComponent) return <DesignedComponent />;
    return null;
  }

  if (pageRecord.type === "NEWS") {
    const category =
      slug.length === 1
        ? (await getCategoryByLink(lastSlug, "vi")) ||
        createPageCategory(pageRecord, lastSlug)
        : createPageCategory(pageRecord, lastSlug);
    const categoryEn =
      slug.length === 1 ? await getCategoryByLink(lastSlug, "en") : null;

    const categoryId = category.id;
    const apiPosts = categoryId ? await getPostsByCategory(categoryId) : [];
    const posts =
      apiPosts.length > 0
        ? apiPosts
        : getMockPostsForCategory(
          category.id || `page-${lastSlug}`,
          category.name || lastSlug,
          category.link || `/${lastSlug}`,
        );

    return (
      <DynamicCategoryPage
        category={category}
        categoryEn={categoryEn}
        initialPosts={posts}
        date={searchParams?.date}
        siblingCategories={siblingCategories}
        parentLink={parentLink}
      />
    );
  }

  return null;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (
    slug.length === 3 &&
    slug[0] === "san-giao-dich" &&
    slug[1] === "san-pham"
  ) {
    try {
      const { responseData: property } = await getApiV10PropertyId(slug[2]);
      if (property)
        return {
          title: property.title || "Sản phẩm | Kepler",
          description: (property.description || property.location || "").slice(
            0,
            160,
          ),
        };
    } catch { }
    return { title: "Không tìm thấy sản phẩm | Kepler" };
  }

  // Page API truoc: DESIGNED/NEWS co ten mo ta rieng trong CMS.
  const lastSlug = slug.at(-1);
  if (lastSlug) {
    const pageRecord = await getPageByPath(normalizePagePath(lastSlug));
    if (pageRecord?.type === "DESIGNED" || pageRecord?.type === "NEWS") {
      return {
        title: `${pageRecord.name || lastSlug} | Kepler Property`,
        description: pageRecord.description || pageRecord.name || lastSlug,
      };
    }
  }

  const post = await getPostBySlug(lastSlug ?? "");
  if (!post) {
    const fullSlug = slug.join("/");
    const category = await getCategoryByLink(fullSlug, "vi");
    if (category) {
      return {
        title: `${category.name} | Kepler Property`,
        description: category.description || category.name,
      };
    }
    return {
      title: "Không tìm thấy tin tức",
      description: ` không tồn tại hoặc đã bị xóa.`,
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/${slug.join("/")}`;
  const description =
    post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Tin tức mới nhất";

  return {
    title: post.title || "Tin tức",
    description,
    openGraph: {
      title: post.title || "Tin tức",
      description,
      url: pageUrl,
      type: "article",
      ...(!isIntroductionPath(slug.join("/")) && {
        publishedTime: post.created_at || undefined,
      }),
      siteName: "KEPLER",
      ...(thumbnailUrl && {
        images: [
          { url: thumbnailUrl, width: 1200, height: 630, alt: post.title || "" },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Tin tức",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function DynamicPage({
  params,
  searchParams,
}: DynamicPageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const [firstSlug, secondSlug] = slug;
  const marketplacePage = await resolveMarketplacePage(
    slug.join("/"),
    resolvedSearchParams.page,
  );
  if (marketplacePage) return marketplacePage;
  const activityPage = await resolveActivityPage(slug.join("/"));
  if (activityPage) return activityPage;

  // Trang kien-thuc dung layout gallery/library rieng, khong dungDynamicCategoryPage.
  if (slug.length === 1 && firstSlug === "kien-thuc") {
    return <KienThucGalleryPage />;
  }

  // Sub-route cua trang lien he (form theo loai).
  if (firstSlug === "contact" && slug.length === 2) {
    return <ContactSubPage params={{ slug: [secondSlug!] }} />;
  }

  // Trang dich vu cua don vi he sinh thai: /he-sinh-thai/{unitKey}/{serviceSlug}
  if (firstSlug === "he-sinh-thai" && slug.length === 3) {
    return (
      <EcosystemServiceSubPage
        params={
          Promise.resolve({
            unitKey: slug[1]!,
            serviceSlug: slug[2]!,
          }) as never
        }
      />
    );
  }

  // Trang chi tiet san pham (mock data hien tai, giu nguyen behavior cu).
  if (firstSlug === "products" && slug.length === 2) {
    return <ProductDetailSubPage params={{ id: secondSlug! }} />;
  }

  if (slug.length === 1) {
    // Page API quyet dinh DESIGNED/NEWS truoc, vi path page la canonical.
    const pageResult = await resolveDesignedOrNewsPage(
      slug,
      resolvedSearchParams,
    );
    if (pageResult) return pageResult;

    const post = await getPostBySlug(firstSlug);

    if (post) {
      return (
        <DynamicPostDetailPage
          post={post}
          categoryName={post.category?.name || "Bài viết"}
          categorySlug={post.category?.link?.replace(/^\//, "") || ""}
          urlCategoryId={post.category?.id}
        />
      );
    }

    const [category, categoryEn] = await Promise.all([
      getCategoryByLink(firstSlug, "vi"),
      getCategoryByLink(firstSlug, "en"),
    ]);
    const finalCategory = category ?? createMockCategory(firstSlug);
    const apiPosts = await getPostsByCategory(finalCategory.id!);
    const posts =
      apiPosts.length > 0
        ? apiPosts
        : getMockPostsForCategory(
          finalCategory.id!,
          finalCategory.name!,
          finalCategory.link!,
        );

    return (
      <DynamicCategoryPage
        category={finalCategory}
        categoryEn={categoryEn}
        initialPosts={posts}
        date={resolvedSearchParams.date}
      />
    );
  }

  if (slug.length === 2) {
    const fullSlug = slug.join("/");
    const post = await getPostBySlug(secondSlug);

    if (post) {
      const urlCategory = await getCategoryByLink(firstSlug);
      const displayCategory = urlCategory ?? createMockCategory(firstSlug);

      return (
        <DynamicPostDetailPage
          post={post}
          categoryName={displayCategory.name || firstSlug}
          categorySlug={displayCategory.link?.replace(/^\//, "") || firstSlug}
          urlCategoryId={urlCategory?.id}
        />
      );
    }

    // Page API theo segment cuoi (pages.path chi luu segment cuoi).
    const parent = await getCategoryByLink(firstSlug, "vi");
    const pageResult = await resolveDesignedOrNewsPage(
      slug,
      resolvedSearchParams,
      parent?.categories || [],
      `/${firstSlug}`,
    );
    if (pageResult) return pageResult;

    // Try category page (e.g. /cong-dong-bds/luat, /du-an/mua-ban-nha-le)
    const [{ category, siblings }, categoryEn] = await Promise.all([
      getCategoryWithSiblings(fullSlug, "vi"),
      getCategoryByLink(fullSlug, "en"),
    ]);

    if (category) {
      const apiPosts = await getPostsByCategory(category.id!);
      const posts =
        apiPosts.length > 0
          ? apiPosts
          : getMockPostsForCategory(
            category.id!,
            category.name!,
            category.link!,
          );

      return (
        <DynamicCategoryPage
          category={category}
          categoryEn={categoryEn}
          initialPosts={posts}
          date={resolvedSearchParams.date}
          siblingCategories={siblings}
          parentLink={`/${firstSlug}`}
        />
      );
    }

    notFound();
  }

  if (slug.length >= 3) {
    const fullSlug = slug.join("/");
    const lastSlug = slug.at(-1)!;

    // Try post first
    const post = await getPostBySlug(lastSlug);
    if (post) {
      const parentSlug = slug.slice(0, -1).join("/");
      const urlCategory = await getCategoryByLink(parentSlug);
      const displayCategory = urlCategory ?? createMockCategory(parentSlug);

      return (
        <DynamicPostDetailPage
          post={post}
          categoryName={displayCategory.name || parentSlug}
          categorySlug={displayCategory.link?.replace(/^\//, "") || parentSlug}
          urlCategoryId={urlCategory?.id}
        />
      );
    }

    // Page API theo segment cuoi.
    const grandParent = await getCategoryByLink(
      slug.slice(0, -1).join("/"),
      "vi",
    );
    const parentSlug = slug.slice(0, -1).join("/");
    const pageResult = await resolveDesignedOrNewsPage(
      slug,
      resolvedSearchParams,
      grandParent?.categories || [],
      `/${parentSlug}`,
    );
    if (pageResult) return pageResult;

    // Try category page
    const [{ category, siblings }, categoryEn] = await Promise.all([
      getCategoryWithSiblings(fullSlug, "vi"),
      getCategoryByLink(fullSlug, "en"),
    ]);

    if (category) {
      const apiPosts = await getPostsByCategory(category.id!);
      const posts =
        apiPosts.length > 0
          ? apiPosts
          : getMockPostsForCategory(
            category.id!,
            category.name!,
            category.link!,
          );

      return (
        <DynamicCategoryPage
          category={category}
          categoryEn={categoryEn}
          initialPosts={posts}
          date={resolvedSearchParams.date}
          siblingCategories={siblings}
          parentLink={`/${parentSlug}`}
        />
      );
    }

    notFound();
  }

  notFound();
}
