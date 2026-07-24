import { Metadata } from 'next';
import baseConfig from '@/configs/base';
interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Construct SEO metadata for Next.js pages
 * SEO CONFIG
 * Optimized for Vietnamese market and social sharing (Zalo, Facebook)
 */
export function constructMetadata({
  title,
  description = "Kepler Property cung cấp thông tin mua bán, cho thuê và dự án bất động sản, đồng thời hỗ trợ khách hàng trong quá trình tìm kiếm, tư vấn và thực hiện giao dịch.",
  image = "/images/seo.png",
  url = "",
  type = 'website',
  keywords = [],
  noIndex = false,
}: SeoProps): Metadata {
  const baseUrl = baseConfig.frontendDomain || 'https://kepler-client.vercel.app';
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const siteName = "Kepler Property";

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.length > 0 ? keywords : [
      "Kepler Property",
      "bất động sản",
      "mua bán nhà đất",
      "cho thuê bất động sản",
      "căn hộ",
      "nhà phố",
      "đất nền",
      "biệt thự",
      "dự án bất động sản",
      "tư vấn đầu tư",
      "tư vấn pháp lý",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,

    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },

    openGraph: {
      type: type === 'product' ? 'website' : type,
      title,
      description,
      url: fullUrl,
      siteName,
      images: [{
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
      locale: 'vi_VN',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@kepler_property',
    },

    alternates: {
      canonical: fullUrl,
    },

    metadataBase: new URL(baseUrl),

    icons: {
      icon: [
        { url: "/images/icon.png", type: "image/png" },
      ],
      shortcut: "/images/icon.png",
    },

    // Additional meta for Vietnamese market
    other: {
      'zalo-platform-site-verification': process.env.ZALO_VERIFICATION || '',
      'facebook-domain-verification': process.env.FB_DOMAIN_VERIFICATION || '',
    },
  };
}

/**
 * Generate structured data for SEO
 */
interface StructuredDataInput {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  inStock?: boolean;
  title?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  url?: string;
  [key: string]: unknown;
}

export function generateStructuredData(type: 'Product' | 'Article' | 'Organization', data: StructuredDataInput) {
  const baseUrl = baseConfig.frontendDomain || 'https://kepler-client.vercel.app';
  const siteName = 'Kepler Property';

  const schemas = {
    Product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image?.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
      brand: {
        '@type': 'Brand',
        name: siteName,
      },
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: 'VND',
        availability: data.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: siteName,
        },
      },
    },

    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image?.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
      author: {
        '@type': 'Person',
        name: data.author || siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`,
        },
      },
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}${data.url}`,
      },
    },

    Organization: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      sameAs: [
        'https://www.facebook.com/keplerland',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+84901234567',
        contactType: 'customer service',
        availableLanguage: ['Vietnamese'],
      },
    },
  };

  return schemas[type];
}

/**
 * Validate image for social sharing (Zalo/Facebook requirements)
 */
export function validateSocialImage(imageUrl: string): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Check if image is absolute URL
  if (!imageUrl.startsWith('http')) {
    warnings.push('Image should be an absolute URL for social sharing');
  }

  // Zalo/Facebook recommendations
  if (!imageUrl.includes('1200x630') && !imageUrl.includes('og-image')) {
    warnings.push('Image should be 1200x630px for optimal social sharing');
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
}

/**
 * Generate breadcrumb structured data
 */
// Example usage: generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Category', url: '/category' }, { name: 'Product', url: '/category/product' }])
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = baseConfig.frontendDomain || 'https://kepler-client.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}
