import type { MetadataRoute } from "next";

import baseConfig from "@/configs/base";

const publicRoutes = [
  "",
  "/about",
  "/services",
  "/he-sinh-thai",
  "/du-an",
  "/news",
  "/kien-thuc",
  "/chuyen-gia",
  "/partners",
  "/careers",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = new URL(baseConfig.frontendDomain);
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: new URL(path || "/", siteUrl).toString(),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
