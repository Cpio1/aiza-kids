"use client";

import { ArrowDown, Clock, Languages, Users, Baby } from "lucide-react";
import { SITE } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { Blob, Brush, Cloud, CloudEdge, Flower, Heart, Rainbow, Sparkle, Star, Sun } from "../ui/Decor";
import { PhotoFrame } from "../ui/SmartImage";
import type { MediaItem } from "@/lib/media";
import { Responsive } from "../ui/Responsive";

const FACT_ICONS = [Users, Baby, Languages, Clock];
const FACT_BG = ["bg-rose", "bg-mint", "bg-sky", "bg-sun"];
// у каждого факта — своя форма «наклейки» и наклон
const FACT_SHAPE = ["blob-a", "rounded-[1.6rem_0.7rem_1.6rem_1.6rem]", "blob-c", "rounded-full"];
const FACT_TILT = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

function Title({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  // KZ: «Айза» выделяется; RU: выделяется вторая строка с названием.
  return (
    <h1 className={`font-black leading-[1.06] tracking-tight text-ink text-balance ${className}`}>
      {lang === "kk" ? (
        <>
          <span className="relative inline-block text-[#7545CB]">
            <Brush className="absolute -bottom-1 left-[-4%] -z-0 h-[0.42em] w-[108%]" />
            <span className="relative">{t.hero.titleA}</span>
            <Sparkle color="#FFD84D" className="absolute -right-4 -top-2 size-5 animate-twinkle" />
          </span>{" "}
          {t.hero.titleB}
        </>
      ) : (
        <>
          {t.hero.titleA}{" "}
          <span className="relative inline text-[#7545CB]">
            <span className="relative bg-[linear-gradient(transparent_62%,#FFE47A_62%,#FFE47A_90%,transparent_90%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {t.hero.titleB}
            </span>
          </span>
        </>
      )}
    </h1>
  );
}

/** Сказочное небо: мягкие градиенты, свечение солнца, кляксы и узор. */
function Sky({ mobile }: { mobile?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,#FFF1A8_0%,transparent_50%),radial-gradient(ellipse_at_88%_22%,#E4D6FF_0%,transparent_55%),radial-gradient(ellipse_at_60%_100%,#F3E6FF_0%,transparent_60%),linear-gradient(180deg,#FFFBEA_0%,#FFF6DA_55%,#F6EEFF_100%)]" />
      <div className="pattern-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_80%)]" />
      <Blob variant={0} color="#EDE4FF" className={`absolute opacity-80 ${mobile ? "-right-24 top-40 h-72 w-80" : "-right-20 top-[8%] h-[78%] w-[52%]"}`} />
      <Blob variant={2} color="#FFF1A8" className={`absolute opacity-70 ${mobile ? "-left-28 top-[46%] h-64 w-72" : "-left-32 bottom-[6%] h-[46%] w-[30%]"}`} />
      <span className="absolute -left-16 -top-16 size-72 rounded-full bg-[#FFE47A]/30 blur-3xl" />
    </div>
  );
}

/* ================================ DESKTOP ================================ */

function DesktopHero({ image }: { image: MediaItem | null }) {
  const { t } = useLang();
  return (
    <div className="screen relative flex flex-col">
      <Sky />
      <Cloud className="absolute left-[3%] top-[8%] w-28 animate-drift opacity-90" />
      <Cloud className="absolute right-[40%] top-[4%] w-20 animate-drift opacity-80 [animation-delay:-9s]" />
      <Star className="absolute left-[46%] top-[16%] size-6 animate-twinkle" color="#B49AF0" />
      <Heart className="absolute left-[40%] bottom-[22%] size-5 animate-bob" color="#FFC94D" />
      <Sparkle className="absolute left-[30%] top-[10%] size-4 animate-twinkle [animation-delay:-1.2s]" color="#9C7BE3" />
      <Flower className="absolute bottom-24 left-[2%] size-10 animate-float-slow" />

      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-[1fr_1.05fr] items-center gap-10 px-8 py-10 short:py-6 xl:gap-14">
        {/* текст */}
        <div className="animate-rise">
          <p className="relative inline-flex -rotate-2 items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-ink-soft shadow-[0_8px_20px_-10px_rgba(48,35,71,.35)]">
            <span aria-hidden className="absolute inset-[3px] rounded-full border-[1.5px] border-dashed border-[#FFC94D]" />
            <Sun className="relative size-5" face={false} />
            <span className="relative">{t.hero.badge}</span>
          </p>
          <Title className="mt-5 text-[clamp(2.4rem,3.6vw,3.6rem)] short:mt-4 short:text-[clamp(2.2rem,3.2vw,3rem)]" />
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-soft short:mt-4 short:text-base">
            {t.hero.text}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 short:mt-5">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7545CB] to-[#8B63D9] py-3 pl-3 pr-6 font-extrabold text-white shadow-[0_12px_24px_-10px_rgba(117,69,203,.7)] ring-4 ring-white/70 transition hover:-translate-y-0.5 hover:from-[#5E34AE]"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/20 transition group-hover:rotate-12">
                <WhatsAppIcon className="size-5" />
              </span>
              {t.hero.whatsapp}
              <span className="sr-only">{t.newTab}</span>
            </a>
            <a
              href="#groups"
              className="group inline-flex items-center gap-2 rounded-[1.6rem_1.6rem_1.6rem_0.5rem] bg-[#FFD84D] px-6 py-3.5 font-extrabold text-ink shadow-[0_12px_24px_-12px_rgba(232,163,23,.8)] ring-4 ring-white/70 transition hover:-translate-y-0.5 hover:bg-[#FFCC1F]"
            >
              {t.hero.groups}
              <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>

          <ul className="mt-9 grid max-w-[34rem] grid-cols-4 gap-3 short:mt-6">
            {t.hero.facts.map((f, i) => {
              const Icon = FACT_ICONS[i];
              return (
                <li
                  key={f}
                  className={`flex flex-col items-center gap-1.5 ${FACT_SHAPE[i]} ${FACT_BG[i]} ${FACT_TILT[i]} border-[3px] border-white px-2 py-3 text-center shadow-[0_10px_20px_-12px_rgba(48,35,71,.45)] transition hover:rotate-0 hover:scale-105 ${i % 2 ? "translate-y-2" : ""}`}
                >
                  <span className="grid size-8 place-items-center rounded-full bg-white/85">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-[13px] font-extrabold leading-tight">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* изображение */}
        <div className="relative mx-auto flex w-full max-w-[620px] items-center justify-center py-6 animate-rise [animation-delay:.15s]">
          <Rainbow className="absolute -left-10 -top-4 w-48 -rotate-12 opacity-90" />
          <PhotoFrame
            item={image}
            alt={t.hero.imageAlt}
            fallbackRatio={1.2}
            maxHeight="min(52svh, 440px)"
            shape="blob"
            tone="purple"
            priority
            sizes="(min-width: 1280px) 620px, 48vw"
          />
          <Sun className="absolute -right-6 -top-4 size-20 animate-float" />
          {/* часы работы — в «облачке» */}
          <div className="absolute -bottom-3 -left-4 animate-float-slow">
            <div className="relative flex items-center gap-2.5 rounded-[2rem] bg-white px-4 py-3 shadow-[0_14px_30px_-14px_rgba(48,35,71,.45)]">
              <span aria-hidden className="absolute -top-4 left-5 size-9 rounded-full bg-white" />
              <span aria-hidden className="absolute -top-6 left-12 size-12 rounded-full bg-white" />
              <span className="relative grid size-10 place-items-center blob-b bg-sun">
                <Clock className="size-5" aria-hidden />
              </span>
              <span className="relative leading-tight">
                <span className="block text-xs font-bold text-ink-soft">{t.hero.hoursLabel}</span>
                <span className="block font-black">{SITE.hours}</span>
              </span>
            </div>
          </div>
          <Star className="absolute -bottom-2 right-[16%] size-9 animate-twinkle" color="#9C7BE3" />
          <Heart className="absolute right-[2%] top-[42%] size-7 animate-bob" color="#B49AF0" />
          <Flower className="absolute right-[6%] bottom-[8%] size-9 animate-sway" petal="#FFC94D" center="#7545CB" />
        </div>
      </div>
      <CloudEdge fill="#F5F0FF" back="#FFFFFF" className="relative -mb-px h-14" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileHero({ image }: { image: MediaItem | null }) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden">
      <Sky mobile />
      <Cloud className="absolute -left-6 top-4 w-20 opacity-90 animate-drift" />
      <Sun className="absolute -right-5 top-2 size-20 animate-float" />
      <Heart className="absolute left-[46%] top-3 size-4 animate-bob" color="#CDB8F7" />

      <div className="relative mx-auto max-w-xl px-4 pb-6 pt-6 md:max-w-3xl md:px-8 md:pt-10">
        <p className="relative inline-flex max-w-[calc(100%-3.5rem)] -rotate-2 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12.5px] font-extrabold text-ink-soft shadow-sm">
          <span aria-hidden className="absolute inset-[3px] rounded-full border border-dashed border-[#FFC94D]" />
          <Star className="relative size-3.5 shrink-0" />
          <span className="relative">{t.hero.badge}</span>
        </p>
        <Title className="mt-4 pr-6 text-[1.95rem] min-[375px]:text-[2.15rem] min-[430px]:text-[2.35rem] md:text-[2.9rem]" />

        <div className="md:mt-2 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-8">
          {/* изображение в «кляксе» с радугой */}
          <div className="relative mx-auto mt-7 w-full px-2 pb-4 pr-4 md:order-2 md:mt-4">
            <Rainbow className="absolute -left-2 -top-6 w-28 -rotate-12 opacity-90" />
            <PhotoFrame
              item={image}
              alt={t.hero.imageAlt}
              fallbackRatio={1.1}
              shape="blob"
              tone="yellow"
              priority
              sizes="(min-width: 768px) 45vw, 92vw"
            />
            <Flower className="absolute -bottom-1 left-0 size-9 animate-sway" />
            <Star className="absolute -right-0 -top-3 size-7 animate-twinkle" color="#B49AF0" />
            <Heart className="absolute bottom-6 right-0 size-6 animate-bob" color="#FFC94D" />
          </div>

          <div className="md:order-1">
            <p className="mt-6 text-[15.5px] leading-relaxed text-ink-soft md:text-base">{t.hero.text}</p>
            <div className="mt-5 grid gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#7545CB] to-[#8B63D9] px-5 text-[16px] font-extrabold text-white shadow-[0_12px_24px_-10px_rgba(117,69,203,.7)] ring-4 ring-white/70 active:scale-[.99]"
              >
                <WhatsAppIcon className="size-5" />
                {t.hero.whatsapp}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <a
                href="#groups"
                className="flex min-h-[54px] items-center justify-center gap-2 rounded-[1.7rem_1.7rem_1.7rem_0.5rem] bg-[#FFD84D] px-5 text-[16px] font-extrabold text-ink shadow-[0_12px_24px_-12px_rgba(232,163,23,.8)] ring-4 ring-white/70"
              >
                {t.hero.groups}
                <ArrowDown className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {t.hero.facts.map((f, i) => {
            const Icon = FACT_ICONS[i];
            const shapes = ["rounded-[1.8rem_0.8rem_1.8rem_1.8rem]", "rounded-full", "rounded-[0.8rem_1.8rem_1.8rem_1.8rem]", "rounded-[1.8rem_1.8rem_0.8rem_1.8rem]"];
            return (
              <li
                key={f}
                className={`flex min-h-14 items-center gap-2.5 ${shapes[i]} ${FACT_BG[i]} ${i % 2 ? "rotate-1" : "-rotate-1"} border-[3px] border-white px-3 py-2.5 shadow-[0_8px_16px_-10px_rgba(48,35,71,.4)]`}
              >
                <span className="grid size-8 shrink-0 place-items-center blob-b bg-white/85">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-[14px] font-extrabold leading-tight">{f}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <CloudEdge fill="#F5F0FF" back="#FFFFFF" className="relative h-8" />
    </div>
  );
}

export function Hero({ image }: { image: MediaItem | null }) {
  const { t } = useLang();
  return (
    <section id="home" aria-label={t.shortName} className="relative overflow-x-clip pt-[var(--header-h)]">
      <Responsive desktop={<DesktopHero image={image} />} mobile={<MobileHero image={image} />} />
    </section>
  );
}
