"use client";

import { useState } from "react";
import { asset } from "@/lib/path";
import { KindergartenIllustration } from "./Decor";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  /** contain — не обрезать (главные изображения, PNG с прозрачностью); cover — для миниатюр. */
  fit?: "contain" | "cover";
  priority?: boolean;
  fallbackClassName?: string;
};

/** Изображение с аккуратной декоративной заглушкой вместо «битой» картинки. */
export function SmartImage({ src, alt, className = "", fit = "contain", priority, fallbackClassName = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={`overflow-hidden ${fallbackClassName || className}`}>
        <KindergartenIllustration className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
