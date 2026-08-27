"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNkNGQ0ZDQiLz48L3N2Zz4=";

const isBackendUrl = (src: unknown): boolean => {
  if (typeof src !== "string") return false;
  return src.includes("/api/storage/") || src.includes("localhost:4100");
};

export default function SafeImage({ src, alt, onError, ...props }: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src]);

  if (hasErrored && props.fill) {
    return (
      <div
        className={props.className}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${FALLBACK_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f5f5f5",
        }}
        aria-label={typeof alt === "string" ? alt : undefined}
        role="img"
      />
    );
  }

  if (hasErrored && !props.fill) {
    return (
      <div
        className={props.className}
        style={{
          width: typeof props.width === "number" ? `${props.width}px` : "100%",
          height: typeof props.height === "number" ? `${props.height}px` : "auto",
          backgroundImage: `url("${FALLBACK_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f5f5f5",
        }}
        aria-label={typeof alt === "string" ? alt : undefined}
        role="img"
      />
    );
  }

  const shouldSkipOptimizer = isBackendUrl(currentSrc);

  return (
    <NextImage
      {...props}
      src={currentSrc}
      alt={alt}
      unoptimized={hasErrored || shouldSkipOptimizer}
      onError={(event) => {
        onError?.(event);
        if (!hasErrored) {
          setHasErrored(true);
        }
      }}
    />
  );
}
