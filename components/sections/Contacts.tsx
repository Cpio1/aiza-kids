"use client";

import { Clock, Languages, MapPin, Navigation, Phone } from "lucide-react";
import { SITE } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { Blob, Bumps, Cloud, Flower, Heart, Rainbow, Star, Sun, Wave } from "../ui/Decor";
import { Responsive } from "../ui/Responsive";

/** Стилизованная «карта»-иллюстрация. Точные координаты не подтверждены,
 *  поэтому реальная карта открывается в 2GIS по поиску адреса. */
function MapArt({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none ${className}`}>
      <rect width="400" height="260" fill="#F3EDFF" />
      <path d="M0 70q80 30 160 0t240 10v40q-120-20-240 10T0 110Z" fill="#DCCCFF" />
      <path d="M-10 200 410 150" stroke="#fff" strokeWidth="22" />
      <path d="M120-10 170 270" stroke="#fff" strokeWidth="18" />
      <path d="M260-10 300 270" stroke="#fff" strokeWidth="14" />
      <path d="M-10 200 410 150" stroke="#FFE47A" strokeWidth="3" strokeDasharray="10 10" />
      {[[30, 20], [200, 20], [320, 190], [40, 220], [200, 210]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="60" height="34" rx="8" fill="#fff" opacity=".85" />
      ))}
      <circle cx="70" cy="150" r="14" fill="#D3C2F8" />
      <circle cx="350" cy="80" r="16" fill="#D3C2F8" />
      <circle cx="228" cy="128" r="34" fill="#7545CB" opacity=".15" />
      <path d="M228 84c-15 0-26 11-26 25 0 19 26 41 26 41s26-22 26-41c0-14-11-25-26-25Z" fill="#7545CB" />
      <circle cx="228" cy="109" r="9" fill="#fff" />
    </svg>
  );
}

const IG_BG = "bg-[#FFD84D] hover:bg-[#FFCC1F]";

/* ================================ DESKTOP ================================ */

function DesktopContacts() {
  const { t } = useLang();
  const c = t.contacts;
  return (
    <div className="screen relative flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_90%_10%,#F3E6FF_0%,transparent_50%),radial-gradient(ellipse_at_5%_90%,#EDE4FF_0%,transparent_40%),linear-gradient(180deg,#FFF7DA_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-confetti pointer-events-none absolute inset-0 opacity-50" />
      <Blob variant={1} color="#EDE4FF" className="absolute -right-24 bottom-[4%] h-[62%] w-[46%] opacity-80" />
      <Rainbow className="absolute -left-12 bottom-10 w-44 rotate-[18deg] opacity-50" />
      <Sun className="absolute right-[3%] top-4 size-16 animate-float" />
      <Cloud className="absolute left-[40%] top-6 w-20 animate-drift" />
      <Heart className="absolute left-[48%] bottom-10 size-6 animate-bob" color="#B49AF0" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-14 short:py-4">
        <div className="flex items-end justify-between gap-8">
          <Heading eyebrow={c.eyebrow} title={c.title} accent="#F5BE1F" />
          <p data-reveal className="mb-5 max-w-sm rotate-1 rounded-[1.8rem_1.8rem_0.5rem_1.8rem] bg-white/85 px-5 py-3 text-right text-lg font-black shadow-sm">{t.fullName}</p>
        </div>
        <div className="mt-12 grid grid-cols-[1.05fr_0.95fr] items-start gap-8 short:mt-9">
          {/* информационная карточка-облачко */}
          <div data-reveal className="relative rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-white p-7 shadow-[0_24px_50px_-30px_rgba(48,35,71,.55)] short:p-5">
            <Bumps color="#fff" />
            <Star className="absolute -left-3 -top-3 z-10 size-8 animate-twinkle" color="#FFD84D" />
            <dl className="relative grid gap-4 short:gap-2.5">
              <div className="flex gap-3.5">
                <dt className="grid size-11 shrink-0 -rotate-6 place-items-center blob-a bg-rose text-[#7545CB]">
                  <MapPin className="size-5" aria-hidden />
                  <span className="sr-only">{c.address}</span>
                </dt>
                <dd className="text-[15px] leading-snug text-ink-soft">
                  <span className="block text-sm font-extrabold text-ink">{c.address}</span>
                  {c.addressText}
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3.5">
                  <dt className="grid size-11 shrink-0 rotate-6 place-items-center blob-b bg-sun text-[#8A6200]">
                    <Clock className="size-5" aria-hidden />
                    <span className="sr-only">{c.hours}</span>
                  </dt>
                  <dd>
                    <span className="block text-sm font-extrabold">{c.hours}</span>
                    <span className="text-lg font-black">{SITE.hours}</span>
                  </dd>
                </div>
                <div className="flex gap-3.5">
                  <dt className="grid size-11 shrink-0 -rotate-3 place-items-center blob-c bg-sky text-[#7545CB]">
                    <Languages className="size-5" aria-hidden />
                    <span className="sr-only">{c.lang}</span>
                  </dt>
                  <dd>
                    <span className="block text-sm font-extrabold">{c.lang}</span>
                    <span className="text-lg font-black">{c.langValue}</span>
                  </dd>
                </div>
              </div>
            </dl>

            <p className="relative mt-6 text-sm font-extrabold short:mt-3">{c.phones}</p>
            <div className="relative mt-2 grid grid-cols-2 gap-3">
              {SITE.phones.map((p, i) => (
                <a key={p.tel} href={`tel:${p.tel}`} className={`flex items-center gap-3 rounded-full ${i ? "bg-sky" : "bg-mint"} py-2.5 pl-2.5 pr-4 transition short:py-1.5 hover:-translate-y-0.5 hover:shadow-md`}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#7545CB] shadow-sm">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs font-bold text-ink-soft">{c.call}</span>
                    <span className="block font-black whitespace-nowrap">{p.display}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="relative mt-3 grid grid-cols-2 gap-3">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-[1.6rem_1.6rem_0.5rem_1.6rem] bg-gradient-to-r from-[#7545CB] to-[#8B63D9] font-extrabold short:min-h-11 text-white shadow-md shadow-wa/25 transition hover:-translate-y-0.5 hover:from-[#5E34AE]">
                <WhatsAppIcon /> {c.whatsapp}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`flex min-h-12 items-center justify-center gap-2 rounded-[1.6rem_1.6rem_1.6rem_0.5rem] ${IG_BG} font-extrabold text-ink shadow-md transition hover:-translate-y-0.5`}>
                <InstagramIcon /> {c.instagram}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
          </div>

          {/* карта */}
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="relative rotate-1">
            <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[3rem_3rem_1rem_3rem] bg-[#FFD84D]" />
          <div className="relative flex flex-col overflow-hidden rounded-[3rem_3rem_1rem_3rem] border-[5px] border-white bg-white shadow-[0_20px_50px_-30px_rgba(48,35,71,.5)]">
            <div className="relative">
              <MapArt className="h-[clamp(180px,28svh,290px)] w-full" />
              <Wave fill="#fff" className="absolute inset-x-0 -bottom-px h-6" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 pb-5 pt-2">
              <div>
                <p className="text-lg font-black">{c.mapTitle}</p>
                <p className="text-sm text-ink-soft">{c.mapText}</p>
              </div>
              <a href={SITE.twoGis} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#5E34AE] px-5 py-3 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4A2590]">
                <Navigation className="size-4" aria-hidden /> {c.map}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
            <Flower className="absolute right-5 top-5 size-10 animate-sway" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileContacts() {
  const { t } = useLang();
  const c = t.contacts;
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_100%_0%,#F3E6FF_0%,transparent_50%),linear-gradient(180deg,#FFF7DA_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-confetti pointer-events-none absolute inset-0 opacity-40" />
      <Sun className="absolute -right-4 top-6 size-16 animate-float" />
      <div className="relative mx-auto max-w-xl px-4 pb-10 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={c.eyebrow} title={c.title} accent="#F5BE1F" />
        <p className="mt-4 text-[17px] font-black">{t.fullName}</p>

        {/* быстрые действия — крупные плитки */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {SITE.phones.map((p, i) => (
            <a key={p.tel} href={`tel:${p.tel}`} className={`flex min-h-[88px] flex-col justify-between border-[3px] border-white p-3.5 shadow-[0_8px_18px_-12px_rgba(48,35,71,.45)] ${i ? "rotate-1 rounded-[0.7rem_2rem_2rem_2rem] bg-sky" : "-rotate-1 rounded-[2rem_0.7rem_2rem_2rem] bg-mint"}`}>
              <span className={`grid size-9 place-items-center bg-white text-[#7545CB] ${i ? "blob-b" : "blob-a"}`}>
                <Phone className="size-4" aria-hidden />
              </span>
              <span className="mt-2 leading-tight">
                <span className="block text-[12px] font-bold text-ink-soft">{c.call}</span>
                <span className="block text-[14px] font-black min-[375px]:text-[15px]">{p.display}</span>
              </span>
            </a>
          ))}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-[64px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7545CB] to-[#8B63D9] px-3 font-extrabold text-white shadow-md">
            <WhatsAppIcon /> {c.whatsapp}
            <span className="sr-only">{t.newTab}</span>
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`flex min-h-[64px] items-center justify-center gap-2 rounded-full ${IG_BG} px-3 font-extrabold text-ink shadow-md`}>
            <InstagramIcon /> {c.instagram}
            <span className="sr-only">{t.newTab}</span>
          </a>
        </div>

        {/* адрес + карта */}
        <div data-reveal className="relative mt-5 overflow-hidden rounded-[2.5rem_2.5rem_1rem_2.5rem] border-[4px] border-white bg-white shadow-[0_14px_30px_-18px_rgba(48,35,71,.5)]">
          <div className="relative">
            <MapArt className="h-36 w-full md:h-48" />
            <Wave fill="#fff" className="absolute inset-x-0 -bottom-px h-5" />
            <Flower className="absolute right-4 top-4 size-8 animate-sway" />
          </div>
          <div className="p-4 pt-1">
            <p className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin className="size-4 text-[#7545CB]" aria-hidden /> {c.address}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-ink-soft">{c.addressText}</p>
            <a href={SITE.twoGis} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#5E34AE] font-extrabold text-white">
              <Navigation className="size-4" aria-hidden /> {c.map}
              <span className="sr-only">{t.newTab}</span>
            </a>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="relative blob-c bg-sun px-4 py-5 text-center">
            <Clock className="mx-auto size-5" aria-hidden />
            <p className="mt-1.5 text-[12.5px] font-bold text-ink-soft">{c.hours}</p>
            <p className="text-[17px] font-black">{SITE.hours}</p>
          </div>
          <div className="relative blob-d bg-rose px-4 py-5 text-center">
            <Languages className="mx-auto size-5" aria-hidden />
            <p className="mt-1.5 text-[12.5px] font-bold text-ink-soft">{c.lang}</p>
            <p className="text-[17px] font-black">{c.langValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contacts() {
  const { t } = useLang();
  return (
    <section id="contacts" aria-label={t.contacts.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopContacts />} mobile={<MobileContacts />} />
    </section>
  );
}
