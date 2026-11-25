"use client";

import { ArrowUp } from "lucide-react";
import { NAV, SITE } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";
import { useLang } from "./LanguageProvider";
import { CloudEdge, Heart, Sparkle, Star } from "./ui/Decor";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="relative bg-gradient-to-b from-[#6A3BBE] to-[#5A31A6] text-white/90">
      <CloudEdge fill="#6A3BBE" back="#B49AF0" className="absolute -top-8 h-8 lg:-top-12 lg:h-12" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Star className="absolute left-[6%] top-6 size-5 animate-twinkle" color="#FFD84D" />
        <Sparkle className="absolute right-[30%] top-10 size-4 animate-twinkle [animation-delay:-1s]" color="#fff" />
        <Heart className="absolute right-[8%] bottom-10 size-5 animate-bob opacity-70" color="#CDB8F7" />
        <span className="absolute -bottom-16 left-[40%] size-48 rounded-full bg-white/5" />
      </div>
      {/* нижний отступ на телефоне — чтобы плавающая кнопка WhatsApp ничего не перекрывала */}
      <div className="relative mx-auto max-w-[1240px] px-4 pb-24 pt-8 md:px-8 lg:pb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xl font-black text-white">{t.fullName}</p>
            <p className="mt-1 text-sm">
              {t.hero.hoursLabel}: {SITE.hours} ·{" "}
              {SITE.phones.map((p, i) => (
                <span key={p.tel}>
                  <a href={`tel:${p.tel}`} className="whitespace-nowrap underline-offset-4 hover:underline">
                    {p.display}
                  </a>
                  {i === 0 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <nav aria-label={t.mainNav} className="hidden lg:block">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-white">
                    {n.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5 text-[13px] lg:pr-20">
          <p>
            © {new Date().getFullYear()} {t.fullName}. {t.footer.rights}
          </p>
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-4 font-bold text-white hover:bg-white/20"
          >
            <ArrowUp className="size-4" aria-hidden /> {t.footer.top}
          </button>
        </div>
      </div>
    </footer>
  );
}
