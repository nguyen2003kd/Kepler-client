import { slugify } from "@/lib/slugify";
import type { EcosystemUnit } from "./unit-data";

export interface EcosystemServiceContent {
  link?: string;
  content?: string;
}

export function getEcosystemServiceLink(unitKey: string, item: string, unit: EcosystemUnit) {
  const configured = unit.serviceContents?.[item]?.link?.trim();
  if (configured && (/^https?:\/\//i.test(configured) || /^\/(?!\/)/.test(configured))) return configured;
  return "/he-sinh-thai/" + unitKey + "/" + slugify(item);
}
