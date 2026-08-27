import type { MetadataRoute } from "next";

import baseConfig from "@/configs/base";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = new URL(baseConfig.frontendDomain).origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register", "/forgot-password", "/view-only"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
