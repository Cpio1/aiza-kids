"use client";

import { ArrowDown, Clock, Languages, Users, Baby } from "lucide-react";
import { SITE } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { Cloud, Flower, Rainbow, Sparkle, Star, Sun, Wave } from "../ui/Decor";
import { SmartImage } from "../ui/SmartImage";
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
          <span className="relative inline-block text-[#ff6f9f]">
            {t.hero.titleA}
            <Sparkle color="#FFC93C" className="absolute -right-4 -top-2 size-5 animate-twinkle" />
          </span>{" "}
          {t.hero.titleB}
        </>
      ) : (
        <>
          {t.hero.titleA} <span className="text-[#ff6f9f]">{t.hero.titleB}</span>
        </>
      )}
    </h1>
  );
}

/* ================================ DESKTOP ================================ */

function DesktopHero({ image }: { image: string | null }) {
  const { t } = useLang();
  return (
    <div className="screen relative flex flex-col">
      {/* фон */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,#FFF3B0_0%,transparent_55%),radial-gradient(ellipse_at_85%_30%,#BDEBFF_0%,transparent_55%),linear-gradient(180deg,#fffdf5_0%,#FFF8D6_100%)]" />
      <Cloud className="absolute left-[3%] top-[8%] w-28 animate-drift opacity-90" />
      <Cloud className="absolute right-[38%] top-[5%] w-20 animate-drift opacity-80 [animation-delay:-9s]" />
      <Star className="absolute left-[44%] top-[14%] size-6 animate-twinkle" color="#FF9DB8" />
      <Flower className="absolute bottom-16 left-[2%] size-10 animate-float-slow" />

      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-[1.05fr_1fr] items-center gap-10 px-8 py-10 short:py-6 xl:gap-14">
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-extrabold text-ink shadow-md ring-2 ring-sky transition hover:-translate-y-0.5 hover:ring-sky-deep"
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
        <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center">
          <Rainbow className="absolute -top-4 left-1/2 w-[86%] -translate-x-1/2 opacity-80" />
          <div className="blob-a relative aspect-square h-[min(56svh,480px)] max-w-full bg-gradient-to-br from-sky via-white to-rose p-3 shadow-[0_30px_60px_-25px_rgba(41,54,74,.35)]">
            <div className="blob-a flex size-full items-center justify-center overflow-hidden bg-white/60">
              <SmartImage src={image} alt={t.hero.imageAlt} priority className="size-full" fallbackClassName="size-full" />
            </div>
          </div>
          <Sun className="absolute -right-3 -top-6 size-24 animate-float" />
          <div className="absolute -left-6 bottom-[12%] flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-ink/5 animate-float-slow">
            <span className="grid size-10 place-items-center rounded-xl bg-sun">
              <Clock className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-ink-soft">{t.hero.hoursLabel}</span>
              <span className="block font-black">{SITE.hours}</span>
            </span>
          </div>
          <Star className="absolute -bottom-2 right-[16%] size-9 animate-twinkle" color="#7CCFF5" />
          <Flower className="absolute right-0 top-[48%] size-9" petal="#8FE0A1" />
        </div>
      </div>
      <Wave fill="#F2FBF4" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileHero({ image }: { image: string | null }) {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#FFF6CC_0%,#FFFDF5_45%,#E6F7FF_100%)]">
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
          <div className="relative mx-auto mt-6 w-full max-w-[290px] min-[390px]:max-w-[320px] md:order-2 md:max-w-[340px] md:mt-4">
            <Rainbow className="absolute -top-5 left-1/2 w-[78%] -translate-x-1/2" />
            <div className="arch relative aspect-[4/4.2] w-full overflow-hidden bg-gradient-to-b from-sky to-rose p-2.5 shadow-[0_20px_40px_-20px_rgba(41,54,74,.4)]">
              <div className="arch flex size-full items-center justify-center overflow-hidden bg-white/60">
                <SmartImage src={image} alt={t.hero.imageAlt} priority className="size-full" fallbackClassName="size-full" />
              </div>
            </div>
            <Flower className="absolute -bottom-3 -left-2 size-10" />
            <Star className="absolute -right-1 bottom-8 size-7 animate-twinkle" color="#FF9DB8" />
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
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white px-5 text-[16px] font-extrabold text-ink shadow-md ring-2 ring-sky"
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
      <Wave fill="#F2FBF4" className="h-6" />
    </div>
  );
}

export function Hero({ image }: { image: string | null }) {
  const { t } = useLang();
  return (
    <section id="home" aria-label={t.shortName} className="relative overflow-x-clip pt-[var(--header-h)]">
      <Responsive desktop={<DesktopHero image={image} />} mobile={<MobileHero image={image} />} />
    </section>
  );
}
