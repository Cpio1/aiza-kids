"use client";

import { Clock, Languages, MapPin, Navigation, Phone } from "lucide-react";
import { SITE } from "@/lib/content";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { Cloud, Flower, Star, Sun } from "../ui/Decor";
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
    <div className="screen relative flex flex-col justify-center bg-[radial-gradient(ellipse_at_90%_10%,#F3E6FF_0%,transparent_50%),linear-gradient(180deg,#FFF7DA_0%,#FFFDF7_100%)]">
      <Sun className="absolute right-[3%] top-4 size-14 animate-float" />
      <Cloud className="absolute left-[40%] top-6 w-20 animate-drift" />
      <div className="relative mx-auto w-full max-w-[1240px] px-8 py-14 short:py-4">
        <div className="flex items-end justify-between gap-8">
          <Heading eyebrow={c.eyebrow} title={c.title} accent="#F5BE1F" />
          <p className="mb-5 max-w-sm text-right text-lg font-black">{t.fullName}</p>
        </div>
        <div className="mt-8 grid grid-cols-[1.05fr_0.95fr] items-start gap-6 short:mt-4">
          {/* информационная карточка */}
          <div className="rounded-[2.25rem_0.9rem_2.25rem_2.25rem] bg-white p-7 shadow-[0_20px_50px_-30px_rgba(48,35,71,.5)] ring-1 ring-ink/5 short:p-5">
            <dl className="grid gap-4 short:gap-2.5">
              <div className="flex gap-3.5">
                <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-rose">
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
                  <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sun">
                    <Clock className="size-5" aria-hidden />
                    <span className="sr-only">{c.hours}</span>
                  </dt>
                  <dd>
                    <span className="block text-sm font-extrabold">{c.hours}</span>
                    <span className="text-lg font-black">{SITE.hours}</span>
                  </dd>
                </div>
                <div className="flex gap-3.5">
                  <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky">
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

            <p className="mt-6 text-sm font-extrabold short:mt-3">{c.phones}</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {SITE.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-2xl bg-mint px-4 py-3 transition short:py-2 hover:-translate-y-0.5 hover:shadow-md">
                  <span className="grid size-9 place-items-center rounded-full bg-white">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs font-bold text-ink-soft">{c.call}</span>
                    <span className="block font-black whitespace-nowrap">{p.display}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-wa font-extrabold short:min-h-11 text-white shadow-md shadow-wa/25 hover:bg-wa-dark">
                <WhatsAppIcon /> {c.whatsapp}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl ${IG_BG} font-extrabold text-ink shadow-md`}>
                <InstagramIcon /> {c.instagram}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
          </div>

          {/* карта */}
          <div className="relative flex flex-col overflow-hidden rounded-[0.9rem_2.25rem_2.25rem_2.25rem] bg-white shadow-[0_20px_50px_-30px_rgba(48,35,71,.5)] ring-1 ring-ink/5">
            <MapArt className="h-[clamp(190px,30svh,300px)] w-full" />
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-lg font-black">{c.mapTitle}</p>
                <p className="text-sm text-ink-soft">{c.mapText}</p>
              </div>
              <a href={SITE.twoGis} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#5E34AE] px-5 py-3 font-extrabold text-white shadow-md hover:bg-[#4A2590]">
                <Navigation className="size-4" aria-hidden /> {c.map}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
            <Flower className="absolute right-4 top-4 size-9" />
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
    <div className="relative bg-[linear-gradient(180deg,#FFF7DA_0%,#FFFDF7_100%)]">
      <Star className="absolute right-5 top-9 size-7 animate-twinkle" color="#F5BE1F" />
      <div className="mx-auto max-w-xl px-4 pb-10 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={c.eyebrow} title={c.title} accent="#F5BE1F" />
        <p className="mt-4 text-[17px] font-black">{t.fullName}</p>

        {/* быстрые действия — крупные плитки */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {SITE.phones.map((p, i) => (
            <a key={p.tel} href={`tel:${p.tel}`} className={`flex min-h-[88px] flex-col justify-between rounded-[1.4rem] p-3.5 shadow-sm ring-1 ring-white ${i ? "bg-sky" : "bg-mint"}`}>
              <span className="grid size-9 place-items-center rounded-full bg-white">
                <Phone className="size-4" aria-hidden />
              </span>
              <span className="mt-2 leading-tight">
                <span className="block text-[12px] font-bold text-ink-soft">{c.call}</span>
                <span className="block text-[14px] font-black min-[375px]:text-[15px]">{p.display}</span>
              </span>
            </a>
          ))}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-[64px] items-center justify-center gap-2 rounded-[1.4rem] bg-wa px-3 font-extrabold text-white shadow-md">
            <WhatsAppIcon /> {c.whatsapp}
            <span className="sr-only">{t.newTab}</span>
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`flex min-h-[64px] items-center justify-center gap-2 rounded-[1.4rem] ${IG_BG} px-3 font-extrabold text-ink shadow-md`}>
            <InstagramIcon /> {c.instagram}
            <span className="sr-only">{t.newTab}</span>
          </a>
        </div>

        {/* адрес + карта */}
        <div className="mt-4 overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-ink/5">
          <MapArt className="h-36 w-full md:h-48" />
          <div className="p-4">
            <p className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin className="size-4 text-[#7545CB]" aria-hidden /> {c.address}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-ink-soft">{c.addressText}</p>
            <a href={SITE.twoGis} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#5E34AE] font-extrabold text-white">
              <Navigation className="size-4" aria-hidden /> {c.map}
              <span className="sr-only">{t.newTab}</span>
            </a>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-[1.4rem] bg-sun p-3.5">
            <Clock className="size-5" aria-hidden />
            <p className="mt-1.5 text-[12.5px] font-bold text-ink-soft">{c.hours}</p>
            <p className="text-[17px] font-black">{SITE.hours}</p>
          </div>
          <div className="rounded-[1.4rem] bg-rose p-3.5">
            <Languages className="size-5" aria-hidden />
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
