"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/seo.png";

export default function SafeImage({ src, alt, onError, ...props }: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const isFallbackImage =
    typeof currentSrc === "string" && currentSrc.endsWith(FALLBACK_IMAGE);
  const className =
    isFallbackImage && typeof props.className === "string"
      ? props.className.replace(/\bobject-cover\b/g, "object-contain")
      : props.className;

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <NextImage
      {...props}
      className={className}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        onError?.(event);

        if (typeof currentSrc === "string" && currentSrc !== FALLBACK_IMAGE) {
          setCurrentSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}
