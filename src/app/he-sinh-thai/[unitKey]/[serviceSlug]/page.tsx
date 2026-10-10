import type { Metadata } from "next";
import EcosystemServicePage from "./service-page";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getApiV10PageConfig } from "@/api/endpoints/page-config";
import { slugify } from "@/lib/slugify";
import { units, type EcosystemUnit } from "../../unit-data";

interface PageProps {
  params: Promise<{ unitKey: string; serviceSlug: string }>;
}

const getUnit = cache(async (unitKey: string): Promise<EcosystemUnit | undefined> => {
  const fallback = units[unitKey];
  try {
    const data = await getApiV10PageConfig({ filters: "key==ECOSYSTEM_MEMBERS" });
    const rows = data.responseData?.rows || [];
    const row = rows.find(r => r.language === "vi") || rows[0];
    const parsed = JSON.parse(typeof row?.value === "string" ? row.value : "{}");
    const member = parsed.members?.find((m: { slug: string }) => m.slug === unitKey);
    if (member) return {
      ...fallback,
      name: member.name || fallback?.name || unitKey,
      eyebrow: member.eyebrow || fallback?.eyebrow || "",
      description: member.description || fallback?.description || "",
      overview: member.overview || fallback?.overview || "",
      items: member.tags || fallback?.items || [],
      industries: member.industries || fallback?.industries || [],
      products: member.products || fallback?.products || [],
      clients: member.clients || fallback?.clients || "",
      serviceContents: member.service_contents || {},
    };
  } catch {
    // Keep supplied content available if the CMS cannot be reached.
  }
  return fallback;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { unitKey, serviceSlug } = await params;
  const unit = await getUnit(unitKey);
  const item = unit?.items.find(label => slugify(label) === serviceSlug);
  return { title: item && unit ? item + " | " + unit.name : "Không tìm thấy nội dung | Kepler" };
}

export default async function ServicePage({ params }: PageProps) {
  const { unitKey, serviceSlug } = await params;
  const unit = await getUnit(unitKey);
  if (!unit || !unit.items.some(label => slugify(label) === serviceSlug)) notFound();
  return <EcosystemServicePage unitKey={unitKey} serviceSlug={serviceSlug} unit={unit} />;
}
