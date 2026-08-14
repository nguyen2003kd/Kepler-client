import { notFound } from "next/navigation";
import { experts, getExpertBySlug } from "../expert-data";
import ExpertProfileContent from "./expert-profile-content";

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export default function ExpertProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const expert = getExpertBySlug(params.slug);

  if (!expert) {
    notFound();
  }

  return <ExpertProfileContent expert={expert} />;
}

