import { constructMetadata } from "@/lib/seo";
import PropertyDetail from "./property-detail";
import { notFound } from "next/navigation";
import { SALE_PROPERTIES, RENT_PROPERTIES } from "@/constants/kepler-data";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props) {
  const property = [...SALE_PROPERTIES, ...RENT_PROPERTIES].find((p) => p.id === params.id);
  if (!property) return constructMetadata({ title: "Không tìm thấy", url: `/properties/${params.id}` });

  return constructMetadata({
    title: property.title,
    description: property.description,
    url: `/properties/${property.id}`,
    keywords: [property.type, property.district, "bất động sản", "Kepler Property"],
  });
}

export function generateStaticParams() {
  return [...SALE_PROPERTIES, ...RENT_PROPERTIES].map((p) => ({ id: p.id }));
}

export default function PropertyPage({ params }: Props) {
  const property = [...SALE_PROPERTIES, ...RENT_PROPERTIES].find((p) => p.id === params.id);
  if (!property) notFound();
  return <PropertyDetail property={property} />;
}
