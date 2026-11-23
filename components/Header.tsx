"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV, SITE, type Lang } from "@/lib/content";
import { asset } from "@/lib/path";
import { scrollToSection } from "@/lib/scroll";
import { useLang } from "./LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { Sun } from "./ui/Decor";

const NAV_COLORS = ["#FF9DB8", "#7CCFF5", "#FFB27A", "#8FE0A1", "#FFC93C", "#B49CFF"];

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

function Logo({ logo, compact }: { logo: string | null; compact?: boolean }) {
  const { t } = useLang();
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection("home");
      }}
      aria-label={t.toHome}
      className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-2xl pr-2"
    >
      <span className={`grid place-items-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-sun-deep/40 ${compact ? "size-10" : "size-11"}`}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(logo)} alt="" className="size-full object-contain" />
        ) : (
          <Sun className="size-9" face={false} />
        )}
      </span>
      <span className="leading-none">
        <span className={`block font-black tracking-tight text-ink ${compact ? "text-xl" : "text-2xl"}`}>
          Айза
        </span>
        <span className={`block text-[11px] font-bold text-ink-soft ${compact ? "max-[359px]:hidden" : ""}`}>{t.shortName}</span>
      </span>
    </a>
  );
}

function LangSwitch({ size = "md" }: { size?: "md" | "lg" }) {
  const { lang, setLang, t } = useLang();
  const opts: { v: Lang; label: string }[] = [
    { v: "kk", label: "ҚАЗ" },
    { v: "ru", label: "РУС" },
  ];
  return (
    <div role="group" aria-label={t.switchLang} className="flex rounded-full bg-sky/60 p-1 ring-1 ring-ink/5">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          lang={o.v}
          aria-pressed={lang === o.v}
          onClick={() => setLang(o.v)}
          className={`rounded-full font-extrabold transition ${
            size === "lg" ? "min-h-11 min-w-14 px-3 text-sm" : "min-h-9 min-w-12 px-2.5 text-xs"
          } ${lang === o.v ? "bg-white text-ink shadow" : "text-ink-soft hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Desktop ------------------------------ */

function DesktopHeader({ logo }: { logo: string | null }) {
  const { lang, t } = useLang();
  const active = useActiveSection();
  return (
    <div className="mx-auto flex h-[var(--header-h)] max-w-[1240px] items-center gap-4 px-6 xl:px-8">
      <Logo logo={logo} />
      <nav aria-label={t.mainNav} className="mx-auto">
        <ul className="flex items-center gap-0.5 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-ink/5 xl:gap-1">
          {NAV.map((n, i) => {
            const isActive = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-3 py-2 text-[14px] font-extrabold transition-colors xl:px-4 xl:text-[15px] ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                  style={isActive ? { background: `${NAV_COLORS[i]}55` } : undefined}
                >
                  {n.label[lang]}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <LangSwitch />
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden items-center gap-2 rounded-full bg-wa px-4 py-2.5 text-sm font-extrabold text-white shadow-md shadow-wa/30 transition hover:bg-wa-dark xl:inline-flex"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
        <span className="sr-only">{t.newTab}</span>
      </a>
    </div>
  );
}

/* ------------------------------ Mobile ------------------------------- */

function MobileHeader({ logo }: { logo: string | null }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.menu = "open";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.menu;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // ждём снятия блокировки прокрутки, затем переходим к началу секции
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  };

  return (
    <>
      <div className="flex h-[var(--header-h)] items-center justify-between gap-2 px-4 md:px-8">
        <Logo logo={logo} compact />
        <div className="flex items-center gap-2">
          <LangSwitch />
          <button
            ref={btnRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-2xl bg-ink text-white shadow-md"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-gradient-to-b from-[#fffdf5] via-[#FFF8D6] to-[#E6F7FF] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 md:px-8"
        >
          <nav aria-label={t.mainNav} className="mx-auto max-w-md">
            <ul className="grid gap-2.5">
              {NAV.map((n, i) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.id);
                    }}
                    className="flex min-h-14 items-center gap-3 rounded-[1.4rem] bg-white/90 px-4 text-lg font-extrabold text-ink shadow-sm ring-1 ring-ink/5 active:scale-[.99]"
                  >
                    <span className="grid size-8 place-items-center rounded-full text-sm font-black text-ink" style={{ background: `${NAV_COLORS[i]}88` }}>
                      {i + 1}
                    </span>
                    {n.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-wa px-3 font-extrabold text-white shadow-md">
                <WhatsAppIcon className="size-5" /> WhatsApp<span className="sr-only">{t.newTab}</span>
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-3 font-extrabold text-white shadow-md">
                <InstagramIcon className="size-5" /> Instagram<span className="sr-only">{t.newTab}</span>
              </a>
              {SITE.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-3 font-extrabold text-ink shadow-sm ring-1 ring-ink/10">
                  <Phone className="size-4" aria-hidden /> {p.display}
                </a>
              ))}
            </div>
            <p className="mt-4 text-center text-sm font-bold text-ink-soft">
              {t.hero.hoursLabel}: {SITE.hours}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}

export function Header({ logo }: { logo: string | null }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-[0_1px_0_rgba(41,54,74,.06)] bg-[#fffdf5]/95 lg:bg-[#fffdf5]/85 lg:backdrop-blur-md">
      <div className="hidden lg:block">
        <DesktopHeader logo={logo} />
      </div>
      <div className="lg:hidden">
        <MobileHeader logo={logo} />
      </div>
    </header>
  );
}
