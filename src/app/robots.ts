import { MetadataRoute } from "next";
import baseConfig from "@/configs/base";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseConfig.frontendDomain}/sitemap.xml`,
  };
}
