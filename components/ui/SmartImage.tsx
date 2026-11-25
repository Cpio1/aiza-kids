"use client";

import { useState } from "react";
import { asset } from "@/lib/path";
import { srcSetOf, type MediaItem } from "@/lib/media";
import { KindergartenIllustration } from "./Decor";

type Props = {
  item: MediaItem | null;
  alt: string;
  className?: string;
  /** contain — не обрезать; cover — заполнить рамку (рамка с теми же пропорциями ничего не обрезает). */
  fit?: "contain" | "cover";
  priority?: boolean;
  sizes?: string;
  fallbackClassName?: string;
};

/** Изображение с srcset и аккуратной декоративной заглушкой вместо «битой» картинки. */
export function SmartImage({ item, alt, className = "", fit = "cover", priority, sizes = "100vw", fallbackClassName = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!item || failed) {
    return (
      <div role="img" aria-label={alt} className={`overflow-hidden ${fallbackClassName || className}`}>
        <KindergartenIllustration className="h-full w-full" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(item.thumb)}
      srcSet={srcSetOf(item, asset)}
      sizes={sizes}
      width={item.w}
      height={item.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}

type FrameProps = {
  item: MediaItem | null;
  alt: string;
  /** пропорции заглушки, если фото нет */
  fallbackRatio?: number;
  /** максимальная высота рамки (CSS-значение), ширина подстраивается под пропорции фото */
  maxHeight?: string;
  /** форма рамки */
  shape?: "wave" | "leaf" | "soft" | "blob" | "arch";
  tone?: "purple" | "yellow";
  priority?: boolean;
  sizes?: string;
  className?: string;
  align?: "center" | "start";
};

const SHAPES = {
  // внешний и внутренний радиусы — асимметричные «детские» формы
  wave: ["rounded-[3rem_1.25rem_3rem_1.25rem]", "rounded-[2.6rem_0.9rem_2.6rem_0.9rem]"],
  leaf: ["rounded-[1.25rem_3.25rem_1.25rem_3.25rem]", "rounded-[0.9rem_2.85rem_0.9rem_2.85rem]"],
  soft: ["rounded-[2.25rem]", "rounded-[1.9rem]"],
  blob: ["blob-a", "blob-a"],
  arch: ["rounded-[50%_50%_2.5rem_2.5rem/38%_38%_2.5rem_2.5rem]", "rounded-[50%_50%_2.1rem_2.1rem/38%_38%_2.1rem_2.1rem]"],
} as const;

/**
 * Фото в фиолетово-жёлтой рамке. Рамка повторяет реальные пропорции фото —
 * изображение не растягивается и не обрезается.
 */
export function PhotoFrame({ item, alt, fallbackRatio = 4 / 3, maxHeight, shape = "wave", tone = "purple", priority, sizes, className = "", align = "center" }: FrameProps) {
  const ratio = item ? item.w / item.h : fallbackRatio;
  const [outer, inner] = SHAPES[shape];
  const backing = tone === "purple" ? "bg-[#FFD84D]" : "bg-[#B49AF0]";
  const ring = tone === "purple" ? "from-[#7545CB] via-[#B49AF0] to-[#FFD84D]" : "from-[#FFD84D] via-[#FFE47A] to-[#B49AF0]";
  return (
    <div
      className={`relative ${align === "center" ? "mx-auto" : ""} ${className}`}
      style={{ aspectRatio: ratio, width: maxHeight ? `min(100%, calc(${maxHeight} * ${ratio}))` : "100%" }}
    >
      {/* мягкое пятно за фото и смещённая цветная «подложка» */}
      <div aria-hidden className={`absolute -inset-[8%] -z-0 rounded-full blur-2xl ${tone === "purple" ? "bg-[#D9C8FA]/70" : "bg-[#FFE47A]/60"}`} />
      <div aria-hidden className={`absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] ${shape === "blob" ? "blob-b" : outer} ${backing} opacity-90`} />
      <div aria-hidden className={`absolute inset-0 -translate-x-2.5 -translate-y-2.5 -rotate-[2deg] border-[3px] border-dashed ${shape === "blob" ? "blob-c" : outer} ${tone === "purple" ? "border-[#B49AF0]/70" : "border-[#FFC94D]/80"}`} />
      <div className={`relative size-full bg-gradient-to-br p-[7px] shadow-[0_24px_50px_-24px_rgba(48,35,71,.45)] ${outer} ${ring}`}>
        <div className={`size-full overflow-hidden bg-white ${inner}`}>
          <SmartImage item={item} alt={alt} priority={priority} sizes={sizes} className="size-full" fallbackClassName="size-full" />
        </div>
      </div>
    </div>
  );
}
