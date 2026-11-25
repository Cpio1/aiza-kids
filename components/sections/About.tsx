"use client";

import { Baby, Clock, Languages, Users, Utensils } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Blob, Bumps, Cloud, Dots, Flower, Heart, Hills, Sparkle, Star, Swirl } from "../ui/Decor";
import { PhotoFrame } from "../ui/SmartImage";
import type { MediaItem } from "@/lib/media";
import { Responsive } from "../ui/Responsive";
import { VideoPlayer } from "../ui/VideoPlayer";

type MediaProps = { image: MediaItem | null; video: string | null; maxHeight?: string; align?: "center" | "start"; sizes: string; shape: "wave" | "leaf" | "soft" | "blob" | "arch"; tone: "purple" | "yellow" };

/** Фото (или видео main-page2) в декоративной рамке с реальными пропорциями. */
function AboutMedia({ image, video, maxHeight, sizes, shape, tone, align }: MediaProps) {
  const { t } = useLang();
  if (video && !image) {
    return (
      <div className="relative mx-auto aspect-video overflow-hidden rounded-[2rem_0.9rem_2rem_0.9rem] bg-gradient-to-br from-[#7545CB] to-[#FFD84D] p-[6px]" style={{ width: maxHeight ? `min(100%, calc(${maxHeight} * 16 / 9))` : "100%" }}>
        <div className="size-full overflow-hidden rounded-[1.7rem_0.7rem_1.7rem_0.7rem] bg-white">
          <VideoPlayer src={video} label={t.about.imageAlt} />
        </div>
      </div>
    );
  }
  return <PhotoFrame item={image} alt={t.about.imageAlt} maxHeight={maxHeight} sizes={sizes} shape={shape} tone={tone} align={align} />;
}

const ICONS = [Users, Languages, Baby, Utensils, Clock];
const TONES = [
  { bg: "bg-[#DCCDFA]", hex: "#DCCDFA", dot: "#7545CB" },
  { bg: "bg-sky", hex: "#EDE4FF", dot: "#7545CB" },
  { bg: "bg-sun", hex: "#FFF1A8", dot: "#E8A317" },
  { bg: "bg-peach", hex: "#FFE9B0", dot: "#E8A317" },
  { bg: "bg-mint", hex: "#D9C8FA", dot: "#8B63D9" },
];
// Каждая карточка — своя форма: облачко, декоративный уголок, наклон, волна, капсула
const SHAPES = [
  "rounded-[2.2rem_2.2rem_2.2rem_0.8rem] mt-6",
  "rounded-[2.6rem_0.8rem_2.6rem_2.6rem] rotate-[1.2deg]",
  "pebble -rotate-[1.2deg]",
  "rounded-[2.4rem_2.4rem_0.8rem_2.4rem]",
  "rounded-[3rem]",
];
const ICON_SHAPES = ["blob-a", "rounded-2xl", "blob-c", "rounded-full", "blob-b"];

/** Декор внутри карточки в зависимости от её формы. */
function CardDecor({ i, hex }: { i: number; hex: string }) {
  if (i === 0) return <Bumps color={hex} />;
  if (i === 1)
    // загнутый уголок
    return <span aria-hidden className="absolute right-0 top-0 size-10 rounded-bl-[1.2rem] rounded-tr-[0.55rem] bg-[linear-gradient(225deg,#FFFDF7_50%,#B49AF0_50%)] opacity-90" />;
  if (i === 2) return <Sparkle className="absolute right-4 top-4 size-5 animate-twinkle" color="#E8A317" />;
  if (i === 3)
    return (
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <svg viewBox="0 0 200 30" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-7 w-full">
          <path d="M0 14q25-14 50 0t50 0 50 0 50 0v16H0Z" fill="#FFD84D" opacity=".45" />
        </svg>
      </span>
    );
  return <Heart className="absolute right-8 top-1/2 size-8 -translate-y-1/2 animate-bob opacity-80" color="#B49AF0" />;
}

/* ================================ DESKTOP ================================ */

function DesktopAbout({ image, video }: { image: MediaItem | null; video: string | null }) {
  const { t } = useLang();
  const f = t.about.features;
  return (
    <div className="screen relative flex flex-col justify-center bg-[radial-gradient(ellipse_at_80%_40%,#EDE4FF_0%,transparent_55%),linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-confetti pointer-events-none absolute inset-0 opacity-50" />
      <Blob variant={1} color="#FFF1A8" className="absolute -left-24 top-[18%] h-[60%] w-[30%] opacity-60" />
      <Cloud className="absolute right-[4%] top-10 w-24 animate-drift" />
      <Swirl className="absolute left-[36%] top-8 w-40 opacity-80" color="#CDB8F7" />
      <Dots className="absolute bottom-20 left-6 size-16" />
      <div className="relative mx-auto my-auto grid w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8 py-14 short:py-8 xl:gap-16">
        {/* заголовок, фото и текст */}
        <div>
          <Heading eyebrow={t.about.eyebrow} title={t.about.title} accent="#8B63D9" />
          <div data-reveal className="relative mt-6 pb-3 pr-3 short:mt-4">
            <AboutMedia image={image} video={video} maxHeight="clamp(180px, 35svh, 330px)" align="start" sizes="(min-width: 1280px) 520px, 40vw" shape="arch" tone="yellow" />
            <Flower className="absolute -bottom-1 left-2 size-9 animate-sway" petal="#FFC94D" />
            <Star className="absolute -top-3 right-6 size-7 animate-twinkle" color="#B49AF0" />
          </div>
          <p data-reveal className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft short:mt-3 short:text-[15px]">
            {t.about.text}
          </p>
        </div>

        {/* характеристики на декоративной подложке */}
        <div className="relative">
          <Blob variant={2} color="#E4D6FF" className="absolute -inset-x-10 -inset-y-12 h-[calc(100%+6rem)] w-[calc(100%+5rem)] opacity-70" />
          <Heart className="absolute -left-6 -top-6 size-7 animate-bob" color="#FFC94D" />
          <ul className="relative grid grid-cols-2 gap-4 short:gap-3">
            {f.map((item, i) => {
              const Icon = ICONS[i];
              const last = i === f.length - 1;
              return (
                <li key={item.title} data-reveal="pop" style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className={last ? "col-span-2" : ""}>
                  <div
                    className={`group relative flex h-full gap-4 border-[3px] border-white p-5 shadow-[0_14px_30px_-18px_rgba(48,35,71,.5)] transition hover:-translate-y-1 short:p-4 ${TONES[i].bg} ${SHAPES[i]} ${
                      last ? "items-center px-8" : "flex-col"
                    }`}
                  >
                    <CardDecor i={i} hex={TONES[i].hex} />
                    <span className={`relative grid shrink-0 place-items-center bg-white shadow-sm transition group-hover:rotate-6 ${ICON_SHAPES[i]} ${last ? "size-14" : "size-12 short:size-11"}`}>
                      <Icon className="size-6" style={{ color: TONES[i].dot }} aria-hidden />
                    </span>
                    <span className="relative">
                      <span className="block text-lg font-black leading-tight short:text-base">{item.title}</span>
                      <span className="mt-1 block text-[15px] leading-snug text-ink-soft short:text-sm">{item.text}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Hills fill="#F7F0FF" back="#FFF4C8" className="relative -mb-px h-12" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

const M_SHAPES = [
  "rounded-[2rem_2rem_2rem_0.7rem]",
  "rounded-[0.7rem_2rem_2rem_2rem]",
  "rounded-[2.4rem]",
  "rounded-[2rem_0.7rem_2rem_2rem]",
  "pebble",
];

function MobileAbout({ image, video }: { image: MediaItem | null; video: string | null }) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-confetti pointer-events-none absolute inset-0 opacity-40" />
      <Blob variant={1} color="#FFF1A8" className="absolute -right-24 top-24 h-64 w-72 opacity-60" />
      <Cloud className="absolute -right-4 top-6 w-16 animate-drift" />
      <div className="relative mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.about.eyebrow} title={t.about.title} accent="#8B63D9" />

        <div className="mt-6 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-6">
          <div data-reveal className="relative pb-3 pr-3">
            <AboutMedia image={image} video={video} sizes="(min-width: 768px) 45vw, 92vw" shape="arch" tone="purple" />
            <Star className="absolute -left-1 -top-2 size-6 animate-twinkle" color="#FFD84D" />
            <Heart className="absolute bottom-2 right-0 size-6 animate-bob" color="#B49AF0" />
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft md:mt-0">{t.about.text}</p>
        </div>

        {/* «дорожка» характеристик — карточки разной формы */}
        <ol className="relative mt-7 grid gap-3 md:grid-cols-2 md:gap-4">
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 border-l-[3px] border-dashed border-[#B49AF0]/40 md:hidden" />
          {t.about.features.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                className={`relative flex items-center gap-3.5 border-[3px] border-white ${M_SHAPES[i]} ${i % 2 ? "bg-white/90" : TONES[i].bg} p-3 pr-5 shadow-[0_8px_18px_-12px_rgba(48,35,71,.4)] ${i === 4 ? "md:col-span-2" : ""}`}
              >
                <span className={`grid size-[2.6rem] shrink-0 place-items-center ${ICON_SHAPES[i]} ${i % 2 ? TONES[i].bg : "bg-white"} ring-4 ring-white`}>
                  <Icon className="size-5" style={{ color: TONES[i].dot }} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-black leading-tight">{item.title}</span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{item.text}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <Hills fill="#F7F0FF" back="#FFF4C8" className="relative h-8" />
    </div>
  );
}

export function About({ image, video = null }: { image: MediaItem | null; video?: string | null }) {
  const { t } = useLang();
  return (
    <section id="about" aria-label={t.about.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopAbout image={image} video={video} />} mobile={<MobileAbout image={image} video={video} />} />
    </section>
  );
}
