"use client";

import { GROUPS, type GroupTone } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Flower, Rainbow, Sparkle, Star, Sun, Wave } from "../ui/Decor";
import { Responsive } from "../ui/Responsive";

const TONE: Record<GroupTone, { card: string; blob: string; deep: string; pill: string }> = {
  yellow: { card: "from-sun to-[#FFFBE3]", blob: "#FFE58A", deep: "#E6A400", pill: "bg-[#FFE58A]" },
  blue: { card: "from-sky to-[#EEF9FF]", blob: "#93DBFA", deep: "#1C8FC4", pill: "bg-[#A8E2FB]" },
  mint: { card: "from-mint to-[#F0FCF2]", blob: "#9BE6AC", deep: "#24924A", pill: "bg-[#A9EAB7]" },
  pink: { card: "from-rose to-[#FFF2F7]", blob: "#FFB0CB", deep: "#D6457A", pill: "bg-[#FFBBD2]" },
};

// индивидуальная форма для каждой карточки
const CARD_SHAPES = [
  "rounded-[2.5rem_2.5rem_1.25rem_2.5rem]",
  "rounded-[999px_999px_1.75rem_1.75rem]",
  "rounded-[1.25rem_2.5rem_2.5rem_2.5rem]",
  "rounded-[2.5rem_1.25rem_2.5rem_2.5rem]",
];
const BADGE_SHAPES = ["blob-a", "rounded-full", "blob-b", "rounded-[38%]"];

/** Маленький символ группы: облачко, птенец-звезда, цветок, солнце (декор). */
function GroupMark({ i, className = "" }: { i: number; className?: string }) {
  const marks = [
    <Cloud key="c" className={className} />,
    <Star key="s" className={className} color="#7CCFF5" />,
    <Flower key="f" className={className} petal="#8FE0A1" />,
    <Sun key="u" className={className} face={false} />,
  ];
  return marks[i];
}

/* ================================ DESKTOP ================================ */

function DesktopGroups() {
  const { t, lang } = useLang();
  return (
    <div className="screen relative flex flex-col justify-center bg-[linear-gradient(180deg,#FFF0F5_0%,#FFFDF5_70%,#FFF7EE_100%)]">
      <Rainbow className="absolute -left-10 top-16 w-40 rotate-[-12deg] opacity-50" />
      <Sparkle className="absolute right-[10%] top-14 size-6 animate-twinkle" color="#FFC93C" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-14 short:py-8">
        <div className="flex items-end justify-between gap-10">
          <Heading eyebrow={t.groups.eyebrow} title={t.groups.title} accent="#FF6F9F" />
          <p className="mb-6 max-w-sm text-right text-[1.05rem] text-ink-soft">{t.groups.text}</p>
        </div>

        <ul className="mt-12 grid grid-cols-4 gap-5 short:mt-8 xl:gap-6">
          {GROUPS.map((g, i) => {
            const tone = TONE[g.tone];
            return (
              <li
                key={g.name}
                className={`group relative flex flex-col bg-gradient-to-b ${tone.card} ${CARD_SHAPES[i]} px-5 pb-6 pt-16 shadow-[0_18px_40px_-24px_rgba(41,54,74,.5)] ring-1 ring-white transition duration-300 hover:-translate-y-1.5 short:pb-5 short:pt-14 ${
                  i % 2 ? "mt-6 short:mt-4" : ""
                }`}
              >
                {/* возраст в декоративной форме */}
                <div
                  className={`absolute -top-9 left-1/2 grid size-[5.5rem] -translate-x-1/2 place-items-center ${BADGE_SHAPES[i]} shadow-lg ring-4 ring-white short:size-20`}
                  style={{ background: tone.blob }}
                >
                  <span className="text-[2rem] font-black leading-none text-ink short:text-[1.8rem]">
                    {g.age}
                    <span className="text-xl align-top">+</span>
                  </span>
                </div>
                <GroupMark i={i} className="absolute right-4 top-4 size-8 opacity-90" />

                <p className="text-center">
                  <span className={`inline-block rounded-full ${tone.pill} px-3 py-1 text-[13px] font-extrabold`}>
                    {g.category[lang]}
                  </span>
                </p>
                <h3 className="mt-3 text-center text-[1.6rem] font-black leading-tight short:text-[1.45rem]">«{g.name}»</h3>
                <p className="mt-1 text-center text-sm font-extrabold" style={{ color: tone.deep }}>
                  {t.groups.age}: {g.ageLabel[lang]}
                </p>
                <p className="mt-3 text-center text-[15px] leading-snug text-ink-soft">{g.text[lang]}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <Wave fill="#FFF4EA" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileGroups() {
  const { t, lang } = useLang();
  return (
    <div className="relative bg-[linear-gradient(180deg,#FFF0F5_0%,#FFFDF5_100%)]">
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.groups.eyebrow} title={t.groups.title} text={t.groups.text} accent="#FF6F9F" />

        <ul className="mt-6 grid gap-3.5 md:grid-cols-2 md:gap-4">
          {GROUPS.map((g, i) => {
            const tone = TONE[g.tone];
            const flip = i % 2 === 1;
            return (
              <li
                key={g.name}
                className={`relative flex items-center gap-4 overflow-hidden bg-gradient-to-r ${tone.card} p-4 shadow-sm ring-1 ring-white ${
                  flip ? "rounded-[1.75rem_0.9rem_1.75rem_1.75rem] flex-row-reverse text-right md:flex-row md:text-left" : "rounded-[0.9rem_1.75rem_1.75rem_1.75rem]"
                }`}
              >
                <div
                  className={`relative grid size-[4.5rem] shrink-0 place-items-center ${BADGE_SHAPES[i]} shadow-md ring-[3px] ring-white`}
                  style={{ background: tone.blob }}
                >
                  <span className="text-[1.7rem] font-black leading-none">
                    {g.age}
                    <span className="align-top text-base">+</span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`inline-block rounded-full ${tone.pill} px-2.5 py-0.5 text-[12.5px] font-extrabold`}>
                    {g.category[lang]}
                  </span>
                  <h3 className="mt-1.5 text-[1.3rem] font-black leading-tight">«{g.name}»</h3>
                  <p className="mt-1 text-[14px] leading-snug text-ink-soft">{g.text[lang]}</p>
                </div>
                <GroupMark i={i} className={`absolute top-2 size-5 opacity-70 ${flip ? "left-3" : "right-3"}`} />
              </li>
            );
          })}
        </ul>
      </div>
      <Wave fill="#FFF4EA" className="h-6" />
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
