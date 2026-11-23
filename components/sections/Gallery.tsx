"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { asset } from "@/lib/path";
import { srcSetOf, type MediaItem } from "@/lib/media";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Flower, KindergartenIllustration, Sparkle, Star, Wave } from "../ui/Decor";
import { Responsive } from "../ui/Responsive";

type OpenFn = (i: number) => void;

// Разнообразные асимметричные формы и чередующиеся фиолетовые/жёлтые рамки
const FRAMES = [
  { outer: "rounded-[1.75rem_0.75rem_1.75rem_1.75rem]", inner: "rounded-[1.45rem_0.5rem_1.45rem_1.45rem]", ring: "from-[#7545CB] to-[#B49AF0]" },
  { outer: "rounded-[0.75rem_1.75rem_1.75rem_1.75rem]", inner: "rounded-[0.5rem_1.45rem_1.45rem_1.45rem]", ring: "from-[#FFD84D] to-[#FFE47A]" },
  { outer: "rounded-[1.75rem]", inner: "rounded-[1.45rem]", ring: "from-[#B49AF0] to-[#FFD84D]" },
  { outer: "rounded-[1.75rem_1.75rem_0.75rem_1.75rem]", inner: "rounded-[1.45rem_1.45rem_0.5rem_1.45rem]", ring: "from-[#FFD84D] to-[#B49AF0]" },
  { outer: "rounded-[1.75rem_1.75rem_1.75rem_0.75rem]", inner: "rounded-[1.45rem_1.45rem_1.45rem_0.5rem]", ring: "from-[#8B63D9] to-[#7545CB]" },
];

/** Превью в рамке. Рамка повторяет пропорции фото — ничего не обрезается и не растягивается. */
function Thumb({ item, index, onOpen, sizes, eager, className = "", style }: { item: MediaItem; index: number; onOpen: OpenFn; sizes: string; eager?: boolean; className?: string; style?: React.CSSProperties }) {
  const { t } = useLang();
  const [broken, setBroken] = useState(false);
  const f = FRAMES[index % FRAMES.length];
  return (
    <button
      type="button"
      data-index={index}
      onClick={() => onOpen(index)}
      aria-label={`${t.gallery.open} ${index + 1}`}
      className={`group relative block bg-gradient-to-br p-[4px] shadow-[0_12px_28px_-18px_rgba(48,35,71,.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-18px_rgba(117,69,203,.6)] ${f.outer} ${f.ring} ${className}`}
      style={style}
    >
      <span className={`block overflow-hidden bg-[#F1EAFF] ${f.inner}`} style={{ aspectRatio: `${item.w} / ${item.h}` }}>
        {broken ? (
          <KindergartenIllustration className="size-full" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(item.thumb)}
            srcSet={srcSetOf(item, asset)}
            sizes={sizes}
            width={item.w}
            height={item.h}
            alt={`${t.gallery.photo} ${index + 1}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setBroken(true)}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        )}
      </span>
      <span aria-hidden className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-[#7545CB] opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

/** После «Показать ещё» переводим фокус на первую новую фотографию. */
function useReveal(total: number, initial: number) {
  const [all, setAll] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const toggle = () => {
    const opening = !all;
    setAll(opening);
    if (opening)
      requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(`[data-index="${initial}"]`)?.focus({ preventScroll: false }));
  };
  return { all, toggle, listRef, count: all ? total : Math.min(total, initial), hidden: Math.max(0, total - initial) };
}

function MoreButton({ all, hidden, onClick, className = "" }: { all: boolean; hidden: number; onClick: () => void; className?: string }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={all}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#FFD84D] px-5 font-extrabold text-ink shadow-md shadow-[#F5BE1F]/40 transition hover:bg-[#FFCC1F] ${className}`}
    >
      <Images className="size-4" aria-hidden />
      {all ? t.gallery.showLess : `${t.gallery.showAll} (+${hidden})`}
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

const GAP = 16;
type Row = { items: { item: MediaItem; index: number }[]; h: number; full: boolean };

/** Разбивка на «выровненные ряды»: каждый ряд заполняет ширину, фото сохраняют пропорции. */
function justify(items: MediaItem[], width: number, target: number): Row[] {
  const rows: Row[] = [];
  let cur: Row["items"] = [];
  let sum = 0;
  items.forEach((item, index) => {
    cur.push({ item, index });
    sum += item.w / item.h;
    const h = (width - GAP * (cur.length - 1)) / sum;
    if (h <= target) {
      rows.push({ items: cur, h, full: true });
      cur = [];
      sum = 0;
    }
  });
  if (cur.length) {
    // последний неполный ряд растягиваем на всю ширину, если фото станут не слишком крупными
    const h = (width - GAP * (cur.length - 1)) / sum;
    rows.push(h <= target * 1.4 ? { items: cur, h, full: true } : { items: cur, h: target, full: false });
  }
  return rows;
}

const height = (rows: Row[]) => rows.reduce((a, r) => a + r.h, 0) + GAP * Math.max(0, rows.length - 1);

/**
 * Подбираем высоту рядов так, чтобы галерея поместилась в экран ноутбука.
 * Если все фото не помещаются даже при минимальной высоте ряда — часть прячем под кнопку.
 */
function planDesktop(items: MediaItem[], width: number, avail: number) {
  for (let target = 240; target >= 125; target -= 5) {
    const rows = justify(items, width, target);
    if (height(rows) <= avail) return { target, count: items.length };
  }
  const target = 140;
  const rows = justify(items, width, target);
  let count = 0;
  let used = 0;
  for (const r of rows) {
    if (used + r.h > avail - 56) break; // место под кнопку «Показать ещё»
    used += r.h + GAP;
    count += r.items.length;
  }
  return { target, count: Math.max(count, Math.min(4, items.length)) };
}

function DesktopGallery({ photos, onOpen }: { photos: MediaItem[]; onOpen: OpenFn }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  // по умолчанию (до замера экрана) — ноутбук 1366×768
  const [plan, setPlan] = useState(() => ({ width: 1176, ...planDesktop(photos, 1176, 330) }));
  const { all, toggle, listRef, count, hidden } = useReveal(photos.length, plan.count);

  useEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const root = rootRef.current;
      if (!list || !root || !list.clientWidth) return; // скрыто на телефоне
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 68;
      const offset = list.getBoundingClientRect().top - root.getBoundingClientRect().top;
      const bottom = 48 + 40; // нижний отступ + волна
      const avail = window.innerHeight - header - offset - bottom;
      setPlan({ width: list.clientWidth, ...planDesktop(photos, list.clientWidth, Math.max(260, avail)) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [photos, listRef]);

  const rows = justify(photos.slice(0, count), plan.width, plan.target);

  return (
    <div ref={rootRef} className="screen relative flex flex-col justify-center bg-[linear-gradient(180deg,#F1EAFF_0%,#FFFDF7_70%,#FFF8E1_100%)]">
      <Cloud className="absolute right-[5%] top-8 w-24 animate-drift" />
      <Star className="absolute left-[3%] top-24 size-6 animate-twinkle" color="#FFD84D" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-12 short:py-6">
        <div className="flex items-end justify-between gap-8">
          <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} accent="#7545CB" />
          {hidden > 0 && <MoreButton all={all} hidden={hidden} onClick={toggle} className="mb-2 shrink-0" />}
        </div>
        <div className="mt-7 short:mt-5">
          {photos.length === 0 ? (
            <Empty />
          ) : (
            /* «Выровненные ряды»: ширина каждого фото пропорциональна его соотношению сторон,
               поэтому снимки не обрезаются и не растягиваются. */
            <div ref={listRef} className="flex flex-col gap-4">
              {rows.map((row, ri) => {
                const sum = row.items.reduce((a, { item }) => a + item.w / item.h, 0);
                const rowWidth = row.full ? "100%" : `${Math.round(row.h * sum + GAP * (row.items.length - 1))}px`;
                return (
                  <div key={ri} className="flex max-w-full gap-4" style={{ width: rowWidth }}>
                    {row.items.map(({ item, index }) => {
                      const r = item.w / item.h;
                      return (
                        <Thumb
                          key={item.original}
                          item={item}
                          index={index}
                          onOpen={onOpen}
                          eager={index < 4}
                          sizes={`${Math.round(r * row.h)}px`}
                          className="min-w-0"
                          style={{ flex: `${r} 1 0` }}
                        />
                      );
                    })}
                  </div>
                );
              })}
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

function MobileGallery({ photos, onOpen }: { photos: MediaItem[]; onOpen: OpenFn }) {
  const { t } = useLang();
  const { all, toggle, listRef, count, hidden } = useReveal(photos.length, MOBILE_LIMIT);
  return (
    <div className="relative bg-[linear-gradient(180deg,#F1EAFF_0%,#FFFDF7_100%)]">
      <Flower className="absolute right-4 top-8 size-8" petal="#FFD84D" center="#7545CB" />
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} accent="#7545CB" />
        <div className="mt-6">
          {photos.length === 0 ? (
            <Empty compact />
          ) : (
            <>
              {/* кладка в 2 колонки (на планшете — 3): каждое фото в своих пропорциях */}
              <div ref={listRef} className="columns-2 gap-3 md:columns-3">
                {photos.slice(0, count).map((item, i) => (
                  <Thumb
                    key={item.original}
                    item={item}
                    index={i}
                    onOpen={onOpen}
                    eager={i < 2}
                    sizes="(min-width: 768px) 32vw, 48vw"
                    className="mb-3 w-full break-inside-avoid"
                  />
                ))}
              </div>
              {hidden > 0 && <MoreButton all={all} hidden={hidden} onClick={toggle} className="mt-2 w-full min-h-12 rounded-2xl" />}
            </>
          )}
        </div>
      </div>
      <Wave fill="#F5F0FF" className="h-6" />
    </div>
  );
}

/* =============================== LIGHTBOX ================================ */

function Lightbox({ photos, index, onClose, onIndex }: { photos: MediaItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
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
    [photos[(index + 1) % n], photos[(index - 1 + n) % n]].forEach((p) => {
      const img = new Image();
      img.src = asset(p.full);
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
        <img
          key={photos[index].original}
          src={asset(photos[index].full)}
          width={photos[index].w}
          height={photos[index].h}
          alt={`${t.gallery.photo} ${index + 1}`}
          className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain shadow-2xl ring-4 ring-[#B49AF0]/40"
        />
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
        <div className="no-scrollbar mx-auto hidden max-w-full gap-2 overflow-x-auto px-4 pb-4 sm:flex">
          {photos.map((p, i) => (
            <button
              key={p.original}
              type="button"
              onClick={() => onIndex(i)}
              aria-label={`${t.gallery.photo} ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-14 shrink-0 overflow-hidden rounded-xl ring-2 transition ${i === index ? "opacity-100 ring-[#FFD84D]" : "opacity-55 ring-transparent hover:opacity-90"}`}
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(p.thumb)} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
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

export function Gallery({ photos }: { photos: MediaItem[] }) {
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
