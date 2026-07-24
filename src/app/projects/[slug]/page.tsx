import { constructMetadata } from "@/lib/seo";
import ProjectDetail from "./project-detail";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/constants/kepler-data";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return constructMetadata({ title: "Không tìm thấy", url: `/projects/${params.slug}` });

  return constructMetadata({
    title: project.title,
    description: project.description,
    url: `/projects/${project.slug}`,
    keywords: [project.title, project.type, project.location, "dự án BĐS", "Kepler Property"],
  });
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
