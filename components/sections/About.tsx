"use client";

import { Baby, Clock, Languages, Users, Utensils } from "lucide-react";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Dots, Flower, Star, Wave } from "../ui/Decor";
import { SmartImage } from "../ui/SmartImage";
import { Responsive } from "../ui/Responsive";
import { VideoPlayer } from "../ui/VideoPlayer";

function AboutMedia({ image, video }: { image: string | null; video: string | null }) {
  const { t } = useLang();
  if (video && !image) return <VideoPlayer src={video} label={t.about.imageAlt} />;
  return <SmartImage src={image} alt={t.about.imageAlt} className="size-full" fallbackClassName="size-full" />;
}

const ICONS = [Users, Languages, Baby, Utensils, Clock];
const TONES = [
  { bg: "bg-rose", dot: "#FF6F9F" },
  { bg: "bg-sky", dot: "#3FB4EA" },
  { bg: "bg-sun", dot: "#FFB627" },
  { bg: "bg-peach", dot: "#FF9A5A" },
  { bg: "bg-mint", dot: "#3FBF6A" },
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

function DesktopAbout({ image, video }: { image: string | null; video: string | null }) {
  const { t } = useLang();
  const f = t.about.features;
  return (
    <div className="screen relative flex flex-col justify-center bg-[linear-gradient(180deg,#F2FBF4_0%,#FFFDF5_100%)]">
      <Cloud className="absolute right-[4%] top-10 w-24 animate-drift" />
      <Dots className="absolute bottom-20 left-6 size-16" />
      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8 py-14 short:py-8 xl:gap-16">
        {/* фото-арка + заголовок */}
        <div className="grid grid-cols-[minmax(0,200px)_1fr] items-end gap-6 xl:grid-cols-[minmax(0,230px)_1fr]">
          <div className="relative">
            <div className="arch aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-mint to-sky p-2 shadow-lg short:max-h-[300px]">
              <div className="arch flex size-full items-center justify-center overflow-hidden bg-white/70">
                <AboutMedia image={image} video={video} />
              </div>
            </div>
            <Flower className="absolute -bottom-3 -right-3 size-10" petal="#FFB27A" />
            <Star className="absolute -left-2 top-6 size-7 animate-twinkle" color="#FF9DB8" />
          </div>
          <div className="self-center">
            <Heading eyebrow={t.about.eyebrow} title={t.about.title} accent="#3FBF6A" />
          </div>
          <p className="col-span-2 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft short:text-base">
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
                className={`group relative flex gap-4 overflow-hidden p-5 shadow-[0_12px_30px_-18px_rgba(41,54,74,.45)] ring-1 ring-white transition hover:-translate-y-1 short:p-4 ${TONES[i].bg} ${SHAPES[i]} ${
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
      <Wave fill="#FFF0F5" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileAbout({ image, video }: { image: string | null; video: string | null }) {
  const { t } = useLang();
  return (
    <div className="relative bg-[linear-gradient(180deg,#F2FBF4_0%,#FFFDF5_100%)]">
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.about.eyebrow} title={t.about.title} accent="#3FBF6A" />

        <div className="mt-5 flex items-start gap-4">
          <div className="relative w-[38%] max-w-[170px] shrink-0">
            <div className="blob-b aspect-square overflow-hidden bg-gradient-to-br from-mint to-sky p-1.5 shadow-md">
              <div className="blob-b flex size-full items-center justify-center overflow-hidden bg-white/70">
                <AboutMedia image={image} video={video} />
              </div>
            </div>
            <Star className="absolute -right-1 -top-1 size-6 animate-twinkle" color="#FF9DB8" />
          </div>
          <p className="min-w-0 text-[15px] leading-relaxed text-ink-soft">{t.about.text}</p>
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
      <Wave fill="#FFF0F5" className="h-6" />
    </div>
  );
}

export function About({ image, video = null }: { image: string | null; video?: string | null }) {
  const { t } = useLang();
  return (
    <section id="about" aria-label={t.about.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopAbout image={image} video={video} />} mobile={<MobileAbout image={image} video={video} />} />
    </section>
  );
}
