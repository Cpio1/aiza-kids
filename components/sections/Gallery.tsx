"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { asset } from "@/lib/path";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Flower, KindergartenIllustration, Sparkle, Star, Wave } from "../ui/Decor";
import { Responsive } from "../ui/Responsive";

type OpenFn = (i: number) => void;

function Thumb({ src, index, onOpen, className = "", eager }: { src: string; index: number; onOpen: OpenFn; className?: string; eager?: boolean }) {
  const { t } = useLang();
  const [broken, setBroken] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${t.gallery.open} ${index + 1}`}
      className={`group relative block overflow-hidden bg-sky/40 shadow-sm ring-1 ring-white ${className}`}
    >
      {broken ? (
        <KindergartenIllustration className="size-full" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(src)}
          alt={`${t.gallery.photo} ${index + 1}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setBroken(true)}
          className="size-full object-cover object-[50%_30%] transition duration-500 group-hover:scale-105"
        />
      )}
      <span aria-hidden className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-white/85 opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

function Empty({ compact }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`relative mx-auto flex flex-col items-center overflow-hidden rounded-[2rem] border-[3px] border-dashed border-sky-deep/30 bg-white/70 text-center ${compact ? "px-5 py-8" : "max-w-3xl px-10 py-12"}`}>
      <div className="relative">
        <div className={`rotate-[-6deg] overflow-hidden rounded-2xl border-[6px] border-white shadow-lg ${compact ? "h-24 w-32" : "h-32 w-44"}`}>
          <KindergartenIllustration className="size-full" />
        </div>
        <div className={`absolute -right-8 top-3 rotate-[8deg] overflow-hidden rounded-2xl border-[6px] border-white bg-rose shadow-md ${compact ? "h-20 w-24" : "h-24 w-32"}`}>
          <div className="grid size-full place-items-center">
            <Camera className="size-8 text-[#8A3FB8]" aria-hidden />
          </div>
        </div>
        <Sparkle className="absolute -left-5 -top-3 size-6 animate-twinkle" color="#FFD84D" />
      </div>
      <p className={`mt-6 font-black ${compact ? "text-lg" : "text-xl"}`}>{t.gallery.emptyTitle}</p>
      <p className="mt-1.5 max-w-sm text-[15px] text-ink-soft">{t.gallery.emptyText}</p>
    </div>
  );
}

/* ================================ DESKTOP ================================ */

const DESKTOP_LIMIT = 8;
// мозаика: первая фотография крупная, остальные — разной формы
const MOSAIC = [
  "col-span-2 row-span-2 rounded-[2rem]",
  "rounded-[1.5rem_1.5rem_1.5rem_0.6rem]",
  "rounded-full",
  "rounded-[0.6rem_1.5rem_1.5rem_1.5rem]",
  "rounded-[1.5rem]",
  "col-span-2 rounded-[1.5rem]",
  "rounded-[1.5rem_0.6rem_1.5rem_1.5rem]",
  "rounded-[0.6rem_1.5rem_1.5rem_1.5rem]",
];

function DesktopGallery({ photos, onOpen }: { photos: string[]; onOpen: OpenFn }) {
  const { t } = useLang();
  const [all, setAll] = useState(false);
  const shown = all ? photos : photos.slice(0, DESKTOP_LIMIT);
  return (
    <div className="screen relative flex flex-col justify-center bg-[linear-gradient(180deg,#F1EAFF_0%,#FFFDF7_100%)]">
      <Cloud className="absolute right-[6%] top-10 w-28 animate-drift" />
      <Star className="absolute left-[8%] top-20 size-7 animate-twinkle" color="#B49AF0" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-14 short:py-6">
        <div className="flex items-end justify-between gap-8">
          <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} accent="#7545CB" />
          {photos.length > DESKTOP_LIMIT && (
            <button
              type="button"
              onClick={() => setAll((v) => !v)}
              aria-expanded={all}
              className="mb-2 shrink-0 rounded-full bg-white px-5 py-2.5 font-extrabold shadow-md ring-2 ring-sky hover:ring-sky-deep"
            >
              {all ? t.gallery.showLess : `${t.gallery.showAll} (${photos.length})`}
            </button>
          )}
        </div>
        <div className="mt-8 short:mt-6">
          {photos.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-flow-dense auto-rows-[clamp(110px,17svh,180px)] grid-cols-4 gap-4 short:auto-rows-[clamp(110px,16svh,150px)]">
              {shown.map((src, i) => (
                <Thumb key={src} src={src} index={i} onOpen={onOpen} className={all && i >= DESKTOP_LIMIT ? "rounded-[1.5rem]" : MOSAIC[i]} eager={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Wave fill="#F5F0FF" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

const MOBILE_LIMIT = 6;

function MobileGallery({ photos, onOpen }: { photos: string[]; onOpen: OpenFn }) {
  const { t } = useLang();
  const [all, setAll] = useState(false);
  const shown = all ? photos : photos.slice(0, MOBILE_LIMIT);
  return (
    <div className="relative bg-[linear-gradient(180deg,#F1EAFF_0%,#FFFDF7_100%)]">
      <Flower className="absolute right-4 top-8 size-8" petal="#9C7BE3" />
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} accent="#7545CB" />
        <div className="mt-6">
          {photos.length === 0 ? (
            <Empty compact />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
                {shown.map((src, i) => (
                  <Thumb
                    key={src}
                    src={src}
                    index={i}
                    onOpen={onOpen}
                    eager={i < 2}
                    className={i === 0 ? "col-span-2 aspect-[16/10] rounded-[1.5rem] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-square rounded-[1.25rem]"}
                  />
                ))}
              </div>
              {photos.length > MOBILE_LIMIT && (
                <button
                  type="button"
                  onClick={() => setAll((v) => !v)}
                  aria-expanded={all}
                  className="mt-4 flex min-h-12 w-full items-center justify-center rounded-2xl bg-white font-extrabold shadow-sm ring-2 ring-sky"
                >
                  {all ? t.gallery.showLess : `${t.gallery.showAll} (${photos.length})`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Wave fill="#F5F0FF" className="h-6" />
    </div>
  );
}

/* =============================== LIGHTBOX ================================ */

function Lightbox({ photos, index, onClose, onIndex }: { photos: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const n = photos.length;
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        // удерживаем фокус внутри окна просмотра
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // предзагрузка соседних фотографий
  useEffect(() => {
    if (n < 2) return;
    [photos[(index + 1) % n], photos[(index - 1 + n) % n]].forEach((s) => {
      const img = new Image();
      img.src = asset(s);
    });
  }, [index, n, photos]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.viewer}
      className="fixed inset-0 z-[70] flex flex-col bg-[#231934]/95"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx > 0 ? prev : next)();
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div className="flex items-center justify-between px-3 pt-[max(.75rem,env(safe-area-inset-top))] text-white sm:px-5">
        <p className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold" aria-live="polite">
          {index + 1} {t.gallery.of} {n}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X className="size-6" aria-hidden />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-3 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={photos[index]} src={asset(photos[index])} alt={`${t.gallery.photo} ${index + 1}`} className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl" />
        {n > 1 && (
          <>
            <button type="button" onClick={prev} aria-label={t.gallery.prev} className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:grid">
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <button type="button" onClick={next} aria-label={t.gallery.next} className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:grid">
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="flex justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
          <button type="button" onClick={prev} aria-label={t.gallery.prev} className="grid size-14 place-items-center rounded-full bg-white/15 text-white">
            <ChevronLeft className="size-7" aria-hidden />
          </button>
          <button type="button" onClick={next} aria-label={t.gallery.next} className="grid size-14 place-items-center rounded-full bg-white/15 text-white">
            <ChevronRight className="size-7" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

export function Gallery({ photos }: { photos: string[] }) {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    document.documentElement.dataset.lightbox = open === null ? "" : "open";
  }, [open]);
  return (
    <section id="gallery" aria-label={t.gallery.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopGallery photos={photos} onOpen={setOpen} />} mobile={<MobileGallery photos={photos} onOpen={setOpen} />} />
      {open !== null && photos.length > 0 && <Lightbox photos={photos} index={open} onClose={close} onIndex={setOpen} />}
    </section>
  );
}
