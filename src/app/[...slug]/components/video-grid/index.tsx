"use client";

import { useGetApiV10File } from "@/api/endpoints/file";
import { File } from "@/api/models/file";
import baseConfig from "@/configs/base";
import { useState } from "react";

interface VideoGridProps {
  categoryName?: string;
  categoryCode?: string;
}

export default function VideoGrid({
  categoryName = "Podcast & Video",
}: VideoGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetApiV10File({
    filters: "type==VIDEO,is_in_library==true",
    sortField: "created_at",
    sortOrder: "desc",
    page: currentPage,
    pageSize: 10,
  });

  const videos = (data?.responseData?.rows as File[]) || [];
  const totalCount = data?.responseData?.count || 0;
  const pageSize = data?.responseData?.pageSize || 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">{error ? "Không thể tải video" : "Hiện tại chưa có video nào"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((file) => {
          const videoUrl = `${baseConfig.backendDomain}${file.path}`;
          return (
            <div
              key={file.id}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-video bg-black">
                <video
                  src={videoUrl}
                  controls
                  crossOrigin="anonymous"
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {file.title || file.name}
                </h3>
                {file.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{file.description}</p>
                )}
                {file.created_at && (
                  <p className="text-xs text-gray-500">
                    {new Date(file.created_at).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
