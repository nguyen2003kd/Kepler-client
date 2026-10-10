import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slugify } from "@/lib/slugify";
import type { EcosystemUnit } from "../../unit-data";
import { getEcosystemServiceLink } from "../../service-content";

export default function EcosystemServicePage({ unitKey, serviceSlug, unit }: { unitKey: string; serviceSlug: string; unit: EcosystemUnit }) {
  const item = unit?.items.find(label => slugify(label) === serviceSlug);
  const parent = unitKey === "realhub" ? "/realhub" : "/he-sinh-thai/" + unitKey;
  if (!unit || !item) return <main className="mx-auto max-w-7xl px-6 py-20"><h1 className="text-3xl font-bold">Không tìm thấy nội dung</h1><Link href="/he-sinh-thai" className="mt-6 inline-block text-primary underline">Về thương hiệu thành viên</Link></main>;
  const content = unit.serviceContents?.[item]?.content?.trim();
  const introduction = unit.overview || unit.description;

  return (
    <main className="min-h-screen bg-white text-gray-900" data-ecosystem-service>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <nav aria-label="Đường dẫn" className="mb-8 flex flex-wrap items-center gap-3 text-sm text-white/90">
            <Link href="/" className="py-2 hover:underline">Trang chủ</Link><span aria-hidden="true">/</span>
            <Link href={parent} className="py-2 hover:underline">{unit.name}</Link><span aria-hidden="true">/</span><span>{item}</span>
          </nav>
          <p className="text-sm font-semibold text-white/80">{unit.name}</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{item}</h1>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <article className="min-w-0">
          <h2 className="text-2xl font-bold">Giới thiệu chung</h2>
          <p className="mt-5 text-lg leading-8 text-gray-700">{introduction}</p>
          <h2 className="mt-10 text-2xl font-bold">Nội dung chi tiết</h2>
          {content ? <div className="mt-5 space-y-4 text-lg leading-8 text-gray-700">{content.split(/\n\s*\n/).map((paragraph, index) => <p key={index} className="whitespace-pre-line">{paragraph}</p>)}</div> : <p className="mt-5 leading-8 text-gray-700">Nội dung chi tiết về {item.toLocaleLowerCase("vi")} đang được cập nhật.</p>}
          <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-200 pt-8">
            <Link href={parent} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Về {unit.name}</Link>
            <Link href={unitKey === "kpc-appraisal" ? "/contact?form=tham-dinh-gia" : "/contact?form=dich-vu-bds"} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary/90">Liên hệ tư vấn<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </article>
        <aside>
          <nav aria-label="Dịch vụ của thương hiệu" className="border-t border-gray-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="text-lg font-bold">{unit.name}</h2>
            <ul className="mt-4 space-y-2">{unit.items.map(label => <li key={label}><Link href={getEcosystemServiceLink(unitKey,label,unit)} aria-current={label===item ? "page" : undefined} className={"block rounded-lg px-4 py-3 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary " + (label===item ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-50 hover:text-primary")}>{label}</Link></li>)}</ul>
          </nav>
        </aside>
      </div>
    </main>
  );
}
