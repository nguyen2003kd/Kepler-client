import { MetadataRoute } from "next";
import baseConfig from "@/configs/base";
import { SALE_PROPERTIES, RENT_PROPERTIES, PROJECTS, NEWS } from "@/constants/kepler-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = baseConfig.frontendDomain;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apartments-for-sale`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apartments-for-rent`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const propertyPages: MetadataRoute.Sitemap = [...SALE_PROPERTIES, ...RENT_PROPERTIES].map((p) => ({
    url: `${baseUrl}/properties/${p.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsPages: MetadataRoute.Sitemap = NEWS.map((n) => ({
    url: `${baseUrl}/news/${n.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...projectPages, ...newsPages];
}
