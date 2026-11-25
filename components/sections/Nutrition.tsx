"use client";

import { Info } from "lucide-react";
import { MEALS } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Bumps, Cloud, CloudEdge, Flower, Heart, Sparkle, Star } from "../ui/Decor";
import { MealArt } from "../ui/MealArt";
import { Responsive } from "../ui/Responsive";

const TONE: Record<string, { bg: string; hex: string; ring: string; num: string }> = {
  yellow: { bg: "bg-sun", hex: "#FFF1A8", ring: "#FFE47A", num: "#8A6200" },
  mint: { bg: "bg-mint", hex: "#D9C8FA", ring: "#D3C2F8", num: "#5E34AE" },
  peach: { bg: "bg-peach", hex: "#FFE9B0", ring: "#FFE08A", num: "#8A6200" },
  pink: { bg: "bg-rose", hex: "#F3E6FF", ring: "#E3C8F7", num: "#8A3FB8" },
};
const CARD_SHAPES = [
  "rounded-[2.2rem_2.2rem_2.8rem_1rem]",
  "rounded-[2.2rem_2.2rem_1rem_2.8rem]",
  "rounded-[2.2rem_2.2rem_2.8rem_1rem]",
  "rounded-[2.2rem_2.2rem_1rem_2.8rem]",
];
// тарелки выстраиваются «улыбкой»
const ARC = ["", "pt-10 short:pt-7", "pt-10 short:pt-7", ""];
const STAR_COLORS = ["#FFD84D", "#B49AF0", "#FFC94D", "#CDB8F7"];

/** Номер приёма пищи в звёздочке. */
function StarNum({ n, color, className = "" }: { n: number; color: string; className?: string }) {
  return (
    <span className={`grid place-items-center ${className}`}>
      <Star color={color} className="col-start-1 row-start-1 size-full drop-shadow-[0_3px_4px_rgba(48,35,71,.25)]" />
      <span className="col-start-1 row-start-1 mt-1 text-base font-black text-ink">{n}</span>
    </span>
  );
}

/** Тарелка: белый ободок, пунктирная «салфетка» вокруг. */
function Plate({ kind, ring, className = "" }: { kind: (typeof MEALS)[number]["kind"]; ring: string; className?: string }) {
  return (
    <span className={`relative grid place-items-center rounded-full ${className}`} style={{ background: ring }}>
      <span aria-hidden className="absolute -inset-3 rounded-full border-[3px] border-dashed border-white/90" />
      <span aria-hidden className="absolute inset-0 rounded-full shadow-[0_20px_40px_-22px_rgba(48,35,71,.6)] ring-[6px] ring-white" />
      <MealArt kind={kind} className="relative size-[88%] transition duration-500 hover:rotate-12" />
    </span>
  );
}

/* ================================ DESKTOP ================================ */

function DesktopNutrition() {
  const { t, lang } = useLang();
  return (
    <div className="screen gingham relative flex flex-col justify-center">
      {/* мягкое свечение, чтобы «скатерть» не мешала читать */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_30%,#FFFDF7_0%,rgba(255,253,247,.85)_45%,transparent_100%)]" />
      <Cloud className="absolute left-[6%] top-12 w-24 animate-drift" />
      <Flower className="absolute right-[5%] top-16 size-10 animate-sway" petal="#B49AF0" />
      <Heart className="absolute left-[14%] bottom-[18%] size-6 animate-bob" color="#CDB8F7" />
      <Sparkle className="absolute right-[16%] bottom-[22%] size-5 animate-twinkle" color="#7545CB" />
      <div className="relative mx-auto my-auto w-full max-w-[1240px] px-8 py-14 short:py-8">
        <Heading align="center" eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} text={t.nutrition.text} accent="#E8A317" />

        <div className="relative mt-14 short:mt-8">
          {/* пунктирная «улыбка» соединяет четыре тарелки */}
          <svg aria-hidden viewBox="0 0 1000 140" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[10%] top-[40px] h-28 w-[80%] short:top-[30px]">
            <path d="M0 30Q500 170 1000 30" fill="none" stroke="#B49AF0" strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
          </svg>
          <ol className="relative grid grid-cols-4 gap-7">
            {MEALS.map((m, i) => {
              const tone = TONE[m.tone];
              return (
                <li key={m.kind} data-reveal="pop" style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className={`flex flex-col items-center text-center ${ARC[i]}`}>
                  <div className="relative z-10">
                    <Plate kind={m.kind} ring={tone.ring} className="size-[9rem] short:size-[7.25rem] xl:size-[10rem] short:xl:size-[7.75rem]" />
                    <StarNum n={i + 1} color={STAR_COLORS[i]} className="absolute -left-4 -top-2 size-12" />
                  </div>
                  {/* подпись-облачко */}
                  <div className={`relative mt-6 w-full max-w-[250px] ${tone.bg} ${CARD_SHAPES[i]} min-h-[8rem] px-4 pb-4 pt-5 shadow-[0_14px_28px_-18px_rgba(48,35,71,.5)] short:mt-5 short:min-h-[7rem] short:pb-3`}>
                    <Bumps color={tone.hex} className="origin-top scale-[.8]" />
                    <h3 className="relative text-[1.2rem] font-black leading-tight">{m.title[lang]}</h3>
                    <p className="relative mt-1.5 text-[14.5px] leading-snug text-ink-soft">{m.text[lang]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mx-auto mt-9 flex w-fit max-w-full items-center gap-2 rounded-full border-2 border-dashed border-[#FFC94D] bg-white/90 px-4 py-2 text-[13px] text-ink-soft short:mt-5">
          <Info className="size-4 shrink-0" aria-hidden />
          {t.nutrition.note}
        </p>
      </div>
      <CloudEdge fill="#F1EAFF" back="#FFFDF7" className="relative -mb-px h-12" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileNutrition() {
  const { t, lang } = useLang();
  return (
    <div className="gingham relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,247,.92)_0%,rgba(255,253,247,.7)_100%)]" />
      <Star className="absolute right-4 top-8 size-7 animate-twinkle" color="#FFC94D" />
      <Heart className="absolute left-3 top-4 size-5 animate-bob" color="#CDB8F7" />
      <div className="relative mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} text={t.nutrition.text} accent="#E8A317" />

        {/* день зигзагом: тарелки чередуются слева и справа */}
        <ol className="relative mt-8 grid gap-5 md:grid-cols-2">
          {MEALS.map((m, i) => {
            const tone = TONE[m.tone];
            const flip = i % 2 === 1;
            return (
              <li
                key={m.kind}
                data-reveal
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                className={`relative flex items-center gap-3 ${tone.bg} border-[3px] border-white py-3 shadow-[0_10px_22px_-14px_rgba(48,35,71,.45)] ${
                  flip ? "flex-row-reverse rounded-[1.6rem_3.2rem_3.2rem_1.6rem] pl-4 pr-3 md:flex-row md:rounded-[3.2rem_1.6rem_1.6rem_3.2rem] md:pl-3 md:pr-4" : "rounded-[3.2rem_1.6rem_1.6rem_3.2rem] pl-3 pr-4"
                }`}
              >
                <div className="relative shrink-0">
                  <Plate kind={m.kind} ring={tone.ring} className="size-[5.25rem] min-[390px]:size-[5.75rem]" />
                  <StarNum n={i + 1} color={STAR_COLORS[i]} className="absolute -left-2 -top-3 size-9" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-extrabold" style={{ color: tone.num }}>
                    {i + 1} · {t.nutrition.step}
                  </p>
                  <h3 className="text-[1.15rem] font-black leading-tight">{m.title[lang]}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-soft">{m.text[lang]}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 flex items-start gap-2 rounded-[1.4rem] border-2 border-dashed border-[#FFC94D] bg-white/90 px-3.5 py-2.5 text-[13px] leading-snug text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t.nutrition.note}
        </p>
      </div>
      <CloudEdge fill="#F1EAFF" back="#FFFDF7" className="relative h-8" />
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
