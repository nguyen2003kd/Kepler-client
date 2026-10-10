"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SafeImage from "@/components/common/safe-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs, type ProfileTab } from "@/lib/introduction-profile";

interface ProfileLayoutProps {
  name: string;
  groupName: string;
  backHref: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  subtitle?: ReactNode;
  panels: Record<ProfileTab, ReactNode>;
}

export default function ProfileLayout({
  name, groupName, backHref, imageSrc, imageAlt, imageCaption, subtitle, panels,
}: ProfileLayoutProps) {
  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-12">
        <Link href={backHref} className="mb-6 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-gray-600 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {groupName}
        </Link>
        <article className="grid gap-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[180px] md:mx-0 md:max-w-none">
            <div data-profile-image className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
              {imageSrc ? (
                <SafeImage src={imageSrc} alt={imageAlt || name} fill priority sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 180px" className="object-contain" />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl font-semibold text-gray-400" aria-label={`Chưa có ảnh của ${name}`}>
                  {name.split(/\s+/).filter(Boolean).slice(-2).map((word) => word[0]).join("")}
                </div>
              )}
            </div>
            {imageCaption && <p className="mt-2 text-center text-xs text-gray-500">{imageCaption}</p>}
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-primary">{groupName}</p>
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">{name}</h1>
            {subtitle && <div className="mt-3 text-base leading-relaxed text-gray-600">{subtitle}</div>}
            <Tabs defaultValue="introduction" className="mt-6">
              <TabsList aria-label={`Thông tin về ${name}`} className="grid h-auto w-full grid-cols-3 gap-1 rounded-none border-b border-gray-200 bg-transparent p-0">
                {profileTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="min-h-12 whitespace-normal rounded-none border-b-2 border-transparent px-1 py-3 text-center text-sm leading-snug text-gray-600 shadow-none transition-colors hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:px-3 sm:text-base">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {profileTabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0 min-h-[240px] py-6 text-base leading-relaxed text-gray-700 [overflow-wrap:anywhere]">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">{tab.label}</h2>
                  {panels[tab.value] || <p className="text-gray-500">Nội dung đang được cập nhật.</p>}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </article>
      </section>
    </div>
  );
}
