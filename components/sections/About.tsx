"use client";

import { Baby, Clock, Languages, Users, Utensils } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Dots, Flower, Star, Wave } from "../ui/Decor";
import { PhotoFrame } from "../ui/SmartImage";
import type { MediaItem } from "@/lib/media";
import { Responsive } from "../ui/Responsive";
import { VideoPlayer } from "../ui/VideoPlayer";

type MediaProps = { image: MediaItem | null; video: string | null; maxHeight?: string; align?: "center" | "start"; sizes: string; shape: "wave" | "leaf" | "soft"; tone: "purple" | "yellow" };

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
  { bg: "bg-[#DCCDFA]", dot: "#7545CB" },
  { bg: "bg-sky", dot: "#7545CB" },
  { bg: "bg-sun", dot: "#F5BE1F" },
  { bg: "bg-peach", dot: "#E8A317" },
  { bg: "bg-mint", dot: "#8B63D9" },
];
// Разные формы карточек вместо одинаковых прямоугольников
const SHAPES = [
  "rounded-[2rem_0.8rem_2rem_2rem]",
  "rounded-[0.8rem_2rem_2rem_2rem]",
  "rounded-[2rem_2rem_0.8rem_2rem]",
  "rounded-[2rem_2rem_2rem_0.8rem]",
  "rounded-[2.5rem]",
];

/* ================================ DESKTOP ================================ */

function DesktopAbout({ image, video }: { image: MediaItem | null; video: string | null }) {
  const { t } = useLang();
  const f = t.about.features;
  return (
    <div className="screen relative flex flex-col justify-center bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <Cloud className="absolute right-[4%] top-10 w-24 animate-drift" />
      <Dots className="absolute bottom-20 left-6 size-16" />
      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8 py-14 short:py-8 xl:gap-16">
        {/* заголовок, фото и текст */}
        <div>
          <Heading eyebrow={t.about.eyebrow} title={t.about.title} accent="#8B63D9" />
          <div className="relative mt-6 pb-3 pr-3 short:mt-4">
            <AboutMedia image={image} video={video} maxHeight="clamp(180px, 35svh, 330px)" align="start" sizes="(min-width: 1280px) 520px, 40vw" shape="leaf" tone="yellow" />
            <Flower className="absolute -bottom-1 left-2 size-9" petal="#FFC94D" />
            <Star className="absolute -top-3 right-6 size-7 animate-twinkle" color="#B49AF0" />
          </div>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft short:mt-3 short:text-[15px]">
            {t.about.text}
          </p>
        </div>

        {/* бенто-сетка характеристик */}
        <ul className="grid grid-cols-2 gap-4 short:gap-3">
          {f.map((item, i) => {
            const Icon = ICONS[i];
            const last = i === f.length - 1;
            return (
              <li
                key={item.title}
                className={`group relative flex gap-4 overflow-hidden p-5 shadow-[0_12px_30px_-18px_rgba(48,35,71,.45)] ring-1 ring-white transition hover:-translate-y-1 short:p-4 ${TONES[i].bg} ${SHAPES[i]} ${
                  last ? "col-span-2 items-center" : "flex-col"
                }`}
              >
                <span className={`grid shrink-0 place-items-center rounded-2xl bg-white shadow-sm ${last ? "size-14" : "size-12 short:size-11"}`}>
                  <Icon className="size-6" style={{ color: TONES[i].dot }} aria-hidden />
                </span>
                <span>
                  <span className="block text-lg font-black leading-tight short:text-base">{item.title}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-ink-soft short:text-sm">{item.text}</span>
                </span>
                <span aria-hidden className="absolute -bottom-6 -right-6 size-20 rounded-full bg-white/35" />
              </li>
            );
          })}
        </ul>
      </div>
      <Wave fill="#F7F0FF" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileAbout({ image, video }: { image: MediaItem | null; video: string | null }) {
  const { t } = useLang();
  return (
    <div className="relative bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.about.eyebrow} title={t.about.title} accent="#8B63D9" />

        <div className="mt-5 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-6">
          <div className="relative pb-3 pr-3">
            <AboutMedia image={image} video={video} sizes="(min-width: 768px) 45vw, 92vw" shape="wave" tone="purple" />
            <Star className="absolute -left-1 -top-2 size-6 animate-twinkle" color="#FFD84D" />
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft md:mt-0">{t.about.text}</p>
        </div>

        {/* вертикальная «дорожка» характеристик */}
        <ol className="relative mt-7 grid gap-3 md:grid-cols-2 md:gap-4">
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 border-l-[3px] border-dashed border-ink/10 md:hidden" />
          {t.about.features.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} className={`relative flex items-center gap-3.5 rounded-[1.5rem] bg-white p-3 pr-4 shadow-sm ring-1 ring-ink/5 ${i === 4 ? "md:col-span-2" : ""}`}>
                <span className={`grid size-[2.6rem] shrink-0 place-items-center rounded-full ${TONES[i].bg} ring-4 ring-white`}>
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
      <Wave fill="#F7F0FF" className="h-6" />
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
