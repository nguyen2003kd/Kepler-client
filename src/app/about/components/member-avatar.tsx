"use client";

import { useState } from "react";
import baseConfig from "@/configs/base";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { ImageCompressInfo } from "@/types/post";

interface MemberAvatarProps {
  thumbnailPath?: string | null;
  thumbnailCompressInfo?: ImageCompressInfo | null;
  title: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16 text-xl",
  md: "w-12 h-12 text-base",
  lg: "w-28 h-28 md:w-32 md:h-32 text-4xl md:text-5xl",
};

const imgSizeClasses = {
  sm: "w-16 h-16",
  md: "w-12 h-12",
  lg: "w-28 h-28 md:w-32 md:h-32",
};

export default function MemberAvatar({
  thumbnailPath,
  thumbnailCompressInfo,
  title,
  size = "md",
  className = "",
}: MemberAvatarProps) {
  const [errored, setErrored] = useState(false);
  const imgSrc = getThumbnailSrc(thumbnailCompressInfo, thumbnailPath);
  const initial = title.replace(/^(KTS\.|LS\.|KS\.)\s*/, "").charAt(0);

  if (imgSrc && !errored) {
    const fullSrc = imgSrc.startsWith("http")
      ? imgSrc
      : `${baseConfig.imgEndpointDomain}${imgSrc}`;
    return (
      <img
        src={fullSrc}
        alt={title}
        onError={() => setErrored(true)}
        className={`${imgSizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center ${className}`}
    >
      <span className="font-bold text-gray-400">{initial}</span>
    </div>
  );
}
