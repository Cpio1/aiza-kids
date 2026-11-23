"use client";

import { ArrowDown, Clock, Languages, Users, Baby } from "lucide-react";
import { SITE } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { Cloud, Flower, Rainbow, Sparkle, Star, Sun, Wave } from "../ui/Decor";
import { PhotoFrame } from "../ui/SmartImage";
import type { MediaItem } from "@/lib/media";
import { Responsive } from "../ui/Responsive";

const FACT_ICONS = [Users, Baby, Languages, Clock];
const FACT_BG = ["bg-rose", "bg-mint", "bg-sky", "bg-sun"];

function Title({ className = "" }: { className?: string }) {
  const { t, lang } = useLang();
  // KZ: «Айза» выделяется; RU: выделяется вторая строка с названием.
  return (
    <h1 className={`font-black leading-[1.06] tracking-tight text-ink text-balance ${className}`}>
      {lang === "kk" ? (
        <>
          <span className="relative inline-block text-[#7545CB]">
            {t.hero.titleA}
            <Sparkle color="#FFD84D" className="absolute -right-4 -top-2 size-5 animate-twinkle" />
          </span>{" "}
          {t.hero.titleB}
        </>
      ) : (
        <>
          {t.hero.titleA} <span className="text-[#7545CB]">{t.hero.titleB}</span>
        </>
      )}
    </h1>
  );
}

/* ================================ DESKTOP ================================ */

function DesktopHero({ image }: { image: MediaItem | null }) {
  const { t } = useLang();
  return (
    <div className="screen relative flex flex-col">
      {/* фон */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,#FFF1A8_0%,transparent_55%),radial-gradient(ellipse_at_85%_30%,#EDE4FF_0%,transparent_55%),linear-gradient(180deg,#FFFDF7_0%,#FFF8D6_100%)]" />
      <Cloud className="absolute left-[3%] top-[8%] w-28 animate-drift opacity-90" />
      <Cloud className="absolute right-[38%] top-[5%] w-20 animate-drift opacity-80 [animation-delay:-9s]" />
      <Star className="absolute left-[44%] top-[14%] size-6 animate-twinkle" color="#B49AF0" />
      <Flower className="absolute bottom-16 left-[2%] size-10 animate-float-slow" />

      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-[1fr_1.05fr] items-center gap-10 px-8 py-10 short:py-6 xl:gap-14">
        {/* текст */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-extrabold text-ink-soft shadow-sm ring-1 ring-ink/5">
            <Sun className="size-5" face={false} />
            {t.hero.badge}
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
              className="inline-flex items-center gap-2.5 rounded-full bg-wa px-6 py-3.5 font-extrabold text-white shadow-lg shadow-wa/30 transition hover:-translate-y-0.5 hover:bg-wa-dark"
            >
              <WhatsAppIcon className="size-5" />
              {t.hero.whatsapp}
              <span className="sr-only">{t.newTab}</span>
            </a>
            <a
              href="#groups"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD84D] px-6 py-3.5 font-extrabold text-ink shadow-md shadow-[#F5BE1F]/40 transition hover:-translate-y-0.5 hover:bg-[#FFCC1F]"
            >
              {t.hero.groups}
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>

          <ul className="mt-8 grid max-w-[34rem] grid-cols-4 gap-2.5 short:mt-6">
            {t.hero.facts.map((f, i) => {
              const Icon = FACT_ICONS[i];
              return (
                <li key={f} className={`flex flex-col items-center gap-1.5 rounded-[1.25rem] ${FACT_BG[i]} px-2 py-3 text-center shadow-sm ${i % 2 ? "translate-y-2" : ""}`}>
                  <span className="grid size-8 place-items-center rounded-full bg-white/80">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-[13px] font-extrabold leading-tight">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* изображение */}
        <div className="relative mx-auto flex w-full max-w-[620px] items-center justify-center py-6">
          <Rainbow className="absolute -left-6 top-0 w-36 -rotate-12 opacity-80" />
          <PhotoFrame
            item={image}
            alt={t.hero.imageAlt}
            fallbackRatio={1.2}
            maxHeight="min(52svh, 440px)"
            shape="wave"
            tone="purple"
            priority
            sizes="(min-width: 1280px) 620px, 48vw"
          />
          <Sun className="absolute -right-6 -top-4 size-16 animate-float" />
          <div className="absolute -bottom-3 -left-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-ink/5 animate-float-slow">
            <span className="grid size-10 place-items-center rounded-xl bg-sun">
              <Clock className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-ink-soft">{t.hero.hoursLabel}</span>
              <span className="block font-black">{SITE.hours}</span>
            </span>
          </div>
          <Star className="absolute -bottom-2 right-[16%] size-9 animate-twinkle" color="#9C7BE3" />
          <Flower className="absolute right-0 top-[48%] size-9" petal="#CDB8F7" />
        </div>
      </div>
      <Wave fill="#F5F0FF" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileHero({ image }: { image: MediaItem | null }) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF6CC_0%,#FFFDF7_45%,#EFE7FF_100%)]">
      <Cloud className="absolute -left-6 top-4 w-20 opacity-90" />
      <Sun className="absolute -right-5 top-2 size-20 animate-float" />

      <div className="relative mx-auto max-w-xl px-4 pb-6 pt-6 md:max-w-3xl md:px-8 md:pt-10">
        <p className="inline-flex max-w-[calc(100%-3.5rem)] items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12.5px] font-extrabold text-ink-soft shadow-sm">
          <Star className="size-3.5 shrink-0" />
          {t.hero.badge}
        </p>
        <Title className="mt-4 pr-6 text-[1.95rem] min-[375px]:text-[2.15rem] min-[430px]:text-[2.35rem] md:text-[2.9rem]" />

        <div className="md:mt-2 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-8">
          {/* изображение в «окошке» с радугой */}
          <div className="relative mx-auto mt-6 w-full pb-3 pr-3 md:order-2 md:mt-4">
            <PhotoFrame
              item={image}
              alt={t.hero.imageAlt}
              fallbackRatio={1.1}
              shape="leaf"
              tone="yellow"
              priority
              sizes="(min-width: 768px) 45vw, 92vw"
            />
            <Flower className="absolute -bottom-2 -left-2 size-9" />
            <Star className="absolute -right-1 -top-3 size-7 animate-twinkle" color="#B49AF0" />
          </div>

          <div className="md:order-1">
            <p className="mt-6 text-[15.5px] leading-relaxed text-ink-soft md:text-base">{t.hero.text}</p>
            <div className="mt-5 grid gap-2.5">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-wa px-5 text-[16px] font-extrabold text-white shadow-lg shadow-wa/30 active:scale-[.99]"
              >
                <WhatsAppIcon className="size-5" />
                {t.hero.whatsapp}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <a
                href="#groups"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#FFD84D] px-5 text-[16px] font-extrabold text-ink shadow-md shadow-[#F5BE1F]/40"
              >
                {t.hero.groups}
                <ArrowDown className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {t.hero.facts.map((f, i) => {
            const Icon = FACT_ICONS[i];
            return (
              <li key={f} className={`flex min-h-14 items-center gap-2.5 rounded-2xl ${FACT_BG[i]} px-3 py-2.5 shadow-sm`}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/80">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-[14px] font-extrabold leading-tight">{f}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <Wave fill="#F5F0FF" className="h-6" />
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
