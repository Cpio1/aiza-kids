"use client";

import { GROUPS, type GroupTone } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Bumps, Cloud, Flower, Rainbow, Scallop, Sprinkles, Star, Sun } from "../ui/Decor";
import { Responsive } from "../ui/Responsive";

// Чередуем жёлтый, лавандовый, фиолетовый и кремовый оттенки
const TONE: Record<GroupTone, { card: string; blob: string; deep: string; pill: string; badgeText: string }> = {
  yellow: { card: "from-[#FFF1A8] to-[#FFFBE3]", blob: "#FFD84D", deep: "#7A5600", pill: "bg-[#FFE47A]", badgeText: "#302347" },
  blue: { card: "from-[#EDE4FF] to-[#F8F5FF]", blob: "#C9B3F5", deep: "#6A3BBE", pill: "bg-[#DCCDFA]", badgeText: "#302347" },
  mint: { card: "from-[#C9B3F5] to-[#EDE4FF]", blob: "#7545CB", deep: "#4A2590", pill: "bg-white/75", badgeText: "#FFFFFF" },
  pink: { card: "from-[#FFF3D6] to-[#FFFDF7]", blob: "#FFE9B0", deep: "#7545CB", pill: "bg-[#F1E8FF]", badgeText: "#5E34AE" },
};

// индивидуальная форма для каждой карточки: арка, облачко, галька, «нашивка» со строчкой
const CARD_SHAPES = [
  "rounded-[50%_50%_2rem_2rem/7rem_7rem_2rem_2rem] -rotate-[1.5deg]",
  "rounded-[2.5rem] rotate-1",
  "pebble -rotate-1",
  "rounded-[2.75rem_1rem_2.75rem_2.75rem] rotate-[1.5deg]",
];
const BADGE_SHAPES = ["blob-a", "rounded-full", "blob-b", "blob-d"];

/** Маленький символ группы: облачко, птенец-звезда, цветок, солнце (декор). */
function GroupMark({ i, className = "" }: { i: number; className?: string }) {
  const marks = [
    <Cloud key="c" className={className} />,
    <Star key="s" className={className} color="#9C7BE3" />,
    <Flower key="f" className={className} petal="#CDB8F7" />,
    <Sun key="u" className={className} face={false} />,
  ];
  return marks[i];
}

/** Индивидуальный декор карточки. */
function CardDecor({ i }: { i: number }) {
  if (i === 0)
    return (
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <span className="absolute -bottom-10 -left-8 size-28 rounded-full bg-white/40" />
        <span className="absolute -bottom-6 right-6 size-14 rounded-full bg-[#FFD84D]/30" />
      </span>
    );
  if (i === 1) return <Bumps color="#EDE4FF" />;
  if (i === 2)
    return (
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full">
          <path d="M0 20q25-18 50 0t50 0 50 0 50 0v20H0Z" fill="#fff" opacity=".45" />
        </svg>
      </span>
    );
  return <span aria-hidden className="pointer-events-none absolute inset-2.5 rounded-[2.3rem_0.7rem_2.3rem_2.3rem] border-2 border-dashed border-[#B49AF0]/50" />;
}

/* ================================ DESKTOP ================================ */

function DesktopGroups() {
  const { t, lang } = useLang();
  return (
    <div className="screen relative flex flex-col justify-center bg-[radial-gradient(ellipse_at_50%_100%,#FFF1A8_0%,transparent_45%),linear-gradient(180deg,#F7F0FF_0%,#FFFDF7_70%,#FFF7EE_100%)]">
      <div aria-hidden className="pattern-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <Sprinkles />
      <Rainbow className="absolute -left-10 top-16 w-44 rotate-[-12deg] opacity-60" />
      <Sun className="absolute right-[4%] top-10 size-16 animate-float" />
      <div className="relative mx-auto my-auto w-full max-w-[1240px] px-8 py-14 short:py-8">
        <div className="flex items-end justify-between gap-10">
          <Heading eyebrow={t.groups.eyebrow} title={t.groups.title} accent="#7545CB" />
          <p data-reveal className="relative mb-6 max-w-sm rounded-[2rem_2rem_0.6rem_2rem] bg-white/80 px-5 py-3 text-right text-[1.05rem] text-ink-soft shadow-sm">
            {t.groups.text}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-4 gap-6 short:mt-10 xl:gap-7">
          {GROUPS.map((g, i) => {
            const tone = TONE[g.tone];
            return (
              <li key={g.name} data-reveal="pop" style={{ "--d": `${i * 110}ms` } as React.CSSProperties} className={i % 2 ? "mt-6 short:mt-4" : ""}>
                <div
                  className={`group relative flex h-full flex-col bg-gradient-to-b ${tone.card} ${CARD_SHAPES[i]} px-5 pb-7 pt-16 shadow-[0_22px_40px_-24px_rgba(48,35,71,.55)] transition duration-300 hover:-translate-y-2 hover:rotate-0 short:pb-5 short:pt-14`}
                >
                  <CardDecor i={i} />
                  {/* возраст в декоративной форме */}
                  <div
                    className={`absolute -top-9 left-1/2 z-10 grid size-[5.5rem] -translate-x-1/2 place-items-center ${BADGE_SHAPES[i]} shadow-lg ring-4 ring-white transition group-hover:scale-110 short:size-20`}
                    style={{ background: tone.blob }}
                  >
                    <span className="text-[2rem] font-black leading-none short:text-[1.8rem]" style={{ color: tone.badgeText }}>
                      {g.age}
                      <span className="text-xl align-top">+</span>
                    </span>
                  </div>
                  <GroupMark i={i} className="absolute right-5 top-5 size-8 opacity-90" />

                  <p className="relative text-center">
                    <span className={`inline-block rounded-full ${tone.pill} px-3 py-1 text-[13px] font-extrabold`}>
                      {g.category[lang]}
                    </span>
                  </p>
                  <h3 className="relative mt-3 text-center text-[1.6rem] font-black leading-tight short:text-[1.45rem]">«{g.name}»</h3>
                  <p className="relative mt-1 text-center text-sm font-extrabold" style={{ color: tone.deep }}>
                    {t.groups.age}: {g.ageLabel[lang]}
                  </p>
                  <p className="relative mt-3 text-center text-[15px] leading-snug text-ink-soft">{g.text[lang]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Scallop fill="#FFF4C8" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

const M_SHAPES = [
  "rounded-[3rem_1.75rem_1.75rem_3rem]",
  "rounded-[1.75rem_3rem_3rem_1.75rem] flex-row-reverse text-right md:flex-row md:text-left md:rounded-[3rem_1.75rem_1.75rem_3rem]",
  "pebble",
  "rounded-[1.75rem_3rem_3rem_1.75rem] flex-row-reverse text-right md:flex-row md:text-left md:rounded-[2rem_0.8rem_2rem_2rem]",
];

function MobileGroups() {
  const { t, lang } = useLang();
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F0FF_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
      <Rainbow className="absolute -right-8 top-6 w-28 rotate-12 opacity-50" />
      <div className="relative mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.groups.eyebrow} title={t.groups.title} text={t.groups.text} accent="#7545CB" />

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {GROUPS.map((g, i) => {
            const tone = TONE[g.tone];
            const flip = i % 2 === 1;
            return (
              <li
                key={g.name}
                data-reveal
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                className={`relative flex items-center gap-4 overflow-hidden border-[3px] border-white bg-gradient-to-r ${tone.card} p-3 shadow-[0_10px_22px_-14px_rgba(48,35,71,.5)] ${M_SHAPES[i]} ${
                  flip ? "pl-5 md:pl-3" : "pr-5"
                }`}
              >
                {i === 3 && <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-[inherit] border-2 border-dashed border-[#B49AF0]/45" />}
                <div
                  className={`relative grid size-[4.5rem] shrink-0 place-items-center ${BADGE_SHAPES[i]} shadow-md ring-[3px] ring-white`}
                  style={{ background: tone.blob }}
                >
                  <span className="text-[1.7rem] font-black leading-none" style={{ color: tone.badgeText }}>
                    {g.age}
                    <span className="align-top text-base">+</span>
                  </span>
                </div>
                <div className="relative min-w-0 flex-1 py-1">
                  <span className={`inline-block rounded-full ${tone.pill} px-2.5 py-0.5 text-[12.5px] font-extrabold`}>
                    {g.category[lang]}
                  </span>
                  <h3 className="mt-1.5 text-[1.3rem] font-black leading-tight">«{g.name}»</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-soft">{g.text[lang]}</p>
                </div>
                <GroupMark i={i} className={`absolute top-2 size-5 opacity-70 ${flip ? "left-[38%] md:left-auto md:right-6" : "right-6"}`} />
              </li>
            );
          })}
        </ul>
      </div>
      <Scallop fill="#FFF4C8" className="relative h-6" />
    </div>
  );
}

export function Groups() {
  const { t } = useLang();
  return (
    <section id="groups" aria-label={t.groups.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopGroups />} mobile={<MobileGroups />} />
    </section>
  );
}
