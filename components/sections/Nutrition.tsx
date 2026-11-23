"use client";

import { Info } from "lucide-react";
import { MEALS } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Flower, Sparkle, Star, Wave } from "../ui/Decor";
import { MealArt } from "../ui/MealArt";
import { Responsive } from "../ui/Responsive";

const TONE: Record<string, { bg: string; ring: string; num: string }> = {
  yellow: { bg: "bg-sun", ring: "#FFE58A", num: "#E6A400" },
  mint: { bg: "bg-mint", ring: "#9BE6AC", num: "#24924A" },
  peach: { bg: "bg-peach", ring: "#FFC196", num: "#E2702E" },
  pink: { bg: "bg-rose", ring: "#FFB0CB", num: "#D6457A" },
};

/* ================================ DESKTOP ================================ */

function DesktopNutrition() {
  const { t, lang } = useLang();
  return (
    <div className="screen relative flex flex-col justify-center bg-[radial-gradient(ellipse_at_50%_0%,#FFE7D2_0%,transparent_60%),linear-gradient(180deg,#FFF4EA_0%,#FFFDF5_100%)]">
      <Cloud className="absolute left-[6%] top-12 w-24 animate-drift" />
      <Flower className="absolute right-[5%] top-16 size-10 animate-float-slow" petal="#FFB27A" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-14 short:py-8">
        <Heading align="center" eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} text={t.nutrition.text} accent="#FF9A5A" />

        {/* «день» — волнистая линия соединяет четыре тарелки */}
        <div className="relative mt-12 short:mt-5">
          <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[8%] top-[64px] h-24 w-[84%] short:top-[52px]">
            <path d="M0 60C125 0 250 0 333 60s208 60 333 0 250-60 334 0" fill="none" stroke="#FFB27A" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
          </svg>
          <ol className="relative grid grid-cols-4 gap-6">
            {MEALS.map((m, i) => {
              const tone = TONE[m.tone];
              return (
                <li key={m.kind} className={`flex flex-col items-center text-center ${i % 2 ? "pt-8 short:pt-6" : ""}`}>
                  <div className="relative">
                    <div className="grid size-[9.5rem] place-items-center rounded-full shadow-[0_20px_40px_-22px_rgba(41,54,74,.55)] short:size-[7.5rem] xl:size-[10.5rem] short:xl:size-[8rem]" style={{ background: tone.ring }}>
                      <MealArt kind={m.kind} className="size-[88%] transition duration-500 hover:rotate-6" />
                    </div>
                    <span className="absolute -left-1 top-1 grid size-10 place-items-center rounded-full bg-white border-[3px] text-lg font-black shadow-md" style={{ color: tone.num, borderColor: tone.ring }}>
                      {i + 1}
                    </span>
                    {i === 1 && <Sparkle className="absolute -right-2 top-2 size-5 animate-twinkle" color="#FFC93C" />}
                  </div>
                  <div className={`relative -mt-4 w-full max-w-[250px] ${tone.bg} min-h-[8.5rem] rounded-[1.75rem] px-4 pb-4 pt-7 shadow-sm short:min-h-[7.5rem] ring-1 ring-white short:pb-3`}>
                    <h3 className="text-[1.2rem] font-black leading-tight">{m.title[lang]}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-snug text-ink-soft">{m.text[lang]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mx-auto mt-8 flex w-fit max-w-full items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[13px] text-ink-soft ring-1 ring-ink/5 short:mt-4">
          <Info className="size-4 shrink-0" aria-hidden />
          {t.nutrition.note}
        </p>
      </div>
      <Wave fill="#EAF8FF" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileNutrition() {
  const { t, lang } = useLang();
  return (
    <div className="relative bg-[linear-gradient(180deg,#FFF4EA_0%,#FFFDF5_100%)]">
      <Star className="absolute right-4 top-8 size-7 animate-twinkle" color="#FFB27A" />
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} text={t.nutrition.text} accent="#FF9A5A" />

        {/* таймлайн дня */}
        <ol className="relative mt-7 grid gap-4 md:grid-cols-2">
          <span aria-hidden className="absolute bottom-10 left-[1.15rem] top-10 border-l-[3px] border-dotted border-[#FFB27A] md:hidden" />
          {MEALS.map((m, i) => {
            const tone = TONE[m.tone];
            return (
              <li key={m.kind} className="relative pl-12 md:pl-0">
                <span
                  className="absolute left-0 top-1/2 grid size-[2.4rem] -translate-y-1/2 place-items-center rounded-full bg-white border-[3px] text-base font-black shadow md:hidden"
                  style={{ color: tone.num, borderColor: tone.ring }}
                >
                  {i + 1}
                </span>
                <div className={`flex items-center gap-3 overflow-hidden rounded-[1.6rem] ${tone.bg} py-3 pl-4 pr-2 shadow-sm ring-1 ring-white`}>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-extrabold" style={{ color: tone.num }}>
                      {i + 1} · {t.nutrition.step}
                    </p>
                    <h3 className="text-[1.15rem] font-black leading-tight">{m.title[lang]}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-ink-soft">{m.text[lang]}</p>
                  </div>
                  <div className="grid size-[5.5rem] shrink-0 place-items-center rounded-full min-[390px]:size-24" style={{ background: tone.ring }}>
                    <MealArt kind={m.kind} className="size-[90%]" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-5 flex items-start gap-2 rounded-2xl bg-white/80 px-3.5 py-2.5 text-[13px] leading-snug text-ink-soft ring-1 ring-ink/5">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t.nutrition.note}
        </p>
      </div>
      <Wave fill="#EAF8FF" className="h-6" />
    </div>
  );
}

export function Nutrition() {
  const { t } = useLang();
  return (
    <section id="nutrition" aria-label={t.nutrition.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopNutrition />} mobile={<MobileNutrition />} />
    </section>
  );
}
