"use client";

import { ExternalLink, FileText, FolderOpen, HardDrive, Link as LinkIcon } from "lucide-react";
import { DOCUMENTS, SITE, type DocItem, type DocType } from "@/lib/content";
import { asset } from "@/lib/path";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Dots, Heart, Scallop, Sparkle, Star } from "../ui/Decor";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { Responsive } from "../ui/Responsive";

const TYPE_ICON: Record<DocType, typeof FileText> = { pdf: FileText, drive: HardDrive, link: LinkIcon };
const CARD_TONES = ["bg-white", "bg-sun", "bg-white", "bg-peach", "bg-rose"];
const ICON_TONES = ["bg-mint", "bg-white", "bg-sun", "bg-white", "bg-white"];
const ICON_SHAPES = ["blob-a", "blob-b", "blob-c", "blob-d", "rounded-[1rem_1rem_1rem_0.4rem]"];
const TILTS = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "rotate-0", "-rotate-[0.4deg]", "rotate-[0.6deg]"];

/** Стопка листочков со звёздочкой — иллюстрация к разделу. */
function PaperStack({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 170" className={`pointer-events-none ${className}`}>
      <rect x="40" y="26" width="120" height="132" rx="16" fill="#D9C8FA" transform="rotate(-10 100 92)" />
      <rect x="52" y="18" width="120" height="132" rx="16" fill="#FFE47A" transform="rotate(5 112 84)" />
      <rect x="46" y="20" width="120" height="132" rx="16" fill="#fff" stroke="#EDE4FF" strokeWidth="3" />
      {[50, 70, 90, 110].map((y, i) => (
        <rect key={y} x="64" y={y} width={i === 3 ? 50 : 84} height="7" rx="3.5" fill={i ? "#EDE4FF" : "#B49AF0"} />
      ))}
      <circle cx="146" cy="132" r="18" fill="#7545CB" />
      <path d="M137 132l6 6 12-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M182 30l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#FFD84D" />
    </svg>
  );
}

/** Документы из конфигурации + PDF-файлы, найденные в public/documents при сборке. */
function useDocs(pdfs: string[]): DocItem[] {
  const fromFiles: DocItem[] = pdfs
    .filter((p) => !DOCUMENTS.some((d) => d.href === p))
    .map((p) => {
      const name = decodeURIComponent(p.split("/").pop() || "").replace(/\.pdf$/i, "").replace(/[_-]+/g, " ");
      return { title: { kk: name, ru: name }, href: p, type: "pdf" };
    });
  return [...DOCUMENTS, ...fromFiles];
}

function DocCard({ doc, i, compact }: { doc: DocItem; i: number; compact?: boolean }) {
  const { t, lang } = useLang();
  const Icon = TYPE_ICON[doc.type];
  const external = /^https?:/.test(doc.href);
  return (
    <li data-reveal style={{ "--d": `${(i % 6) * 70}ms` } as React.CSSProperties} className={`drop-shadow-[0_8px_12px_rgba(48,35,71,.12)] ${TILTS[i % TILTS.length]}`}>
      {/* «билет» с полукруглыми вырезами по бокам */}
      <div className={`ticket relative flex items-center gap-4 ${CARD_TONES[i % CARD_TONES.length]} ${compact ? "rounded-[1.4rem] py-3.5 pl-5 pr-4" : "rounded-[1.75rem] py-4 pl-6 pr-5"}`}>
        <span className={`relative grid size-12 shrink-0 place-items-center ${ICON_SHAPES[i % ICON_SHAPES.length]} ${ICON_TONES[i % ICON_TONES.length]} shadow-sm ring-2 ring-white`}>
          <Icon className="size-6 text-[#5E34AE]" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block break-words font-black leading-tight">{doc.title[lang]}</span>
          <span className="mt-0.5 block text-[13px] font-bold text-ink-soft">{t.documents.types[doc.type]}</span>
        </span>
        {/* перфорация */}
        <span aria-hidden className={`self-stretch border-l-2 border-dashed border-ink/15 ${compact ? "hidden min-[400px]:block" : ""}`} />
        <a
          href={external ? doc.href : asset(doc.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-[#7545CB] px-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5E34AE]"
        >
          {t.documents.view}
          <ExternalLink className="size-3.5" aria-hidden />
          <span className="sr-only">
            {doc.title[lang]} {t.newTab}
          </span>
        </a>
      </div>
    </li>
  );
}

function Empty({ compact }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-white/80 text-center shadow-sm ring-1 ring-ink/5 ${compact ? "px-5 py-7" : "px-10 py-10"}`}>
      <div className="relative mx-auto w-fit">
        <span className="grid size-20 place-items-center rounded-[1.6rem_1.6rem_1.6rem_0.6rem] bg-mint shadow-md">
          <FolderOpen className="size-10 text-[#5E34AE]" aria-hidden />
        </span>
        <span className="absolute -right-6 -top-3 grid size-11 rotate-12 place-items-center rounded-xl bg-sun shadow">
          <FileText className="size-5" aria-hidden />
        </span>
        <Sparkle className="absolute -left-5 top-0 size-5 animate-twinkle" color="#B49AF0" />
      </div>
      <p className={`mt-5 font-black ${compact ? "text-lg" : "text-xl"}`}>{t.documents.emptyTitle}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-[15px] text-ink-soft">{t.documents.emptyText}</p>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-wa px-5 font-extrabold text-white shadow-md hover:bg-wa-dark"
      >
        <WhatsAppIcon className="size-4" />
        {t.documents.contact}
        <span className="sr-only">{t.newTab}</span>
      </a>
    </div>
  );
}

/* ================================ DESKTOP ================================ */

function DesktopDocuments({ pdfs }: { pdfs: string[] }) {
  const { t } = useLang();
  const docs = useDocs(pdfs);
  return (
    <div className="relative flex min-h-[70svh] flex-col justify-center bg-[radial-gradient(ellipse_at_20%_60%,#FFF1A8_0%,transparent_40%),linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
      <Dots className="absolute right-10 top-12 size-16" />
      <Cloud className="absolute bottom-16 left-[4%] w-24 animate-drift" />
      <Heart className="absolute right-[6%] bottom-20 size-6 animate-bob" color="#FFC94D" />
      <div className="relative mx-auto my-auto grid w-full max-w-[1240px] grid-cols-[0.85fr_1.15fr] items-center gap-14 px-8 py-14 short:py-10">
        <div>
          <Heading eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} accent="#8B63D9" />
          <div data-reveal className="relative mt-6 w-fit">
            <PaperStack className="w-48 short:w-36" />
            <Sparkle className="absolute -left-4 top-2 size-5 animate-twinkle" color="#B49AF0" />
          </div>
        </div>
        {/* «папка» с язычком */}
        <div data-reveal className="relative mt-8">
          <span aria-hidden className="absolute -top-7 left-8 h-10 w-44 rounded-t-[1.4rem] bg-[#DCCDFA]" />
          <span aria-hidden className="absolute -top-4 left-14 z-10 grid size-8 place-items-center rounded-full bg-white text-[#5E34AE] shadow-sm">
            <FolderOpen className="size-4" />
          </span>
          <div className="relative rounded-[0.8rem_2.8rem_2.8rem_2.8rem] bg-[#DCCDFA] p-5 shadow-[0_24px_50px_-30px_rgba(48,35,71,.55)]">
            <div aria-hidden className="pattern-dots pointer-events-none absolute inset-0 rounded-[inherit] opacity-60" />
            <Star className="absolute -right-3 -top-3 size-9 animate-twinkle" color="#FFD84D" />
            {docs.length === 0 ? (
              <Empty />
            ) : (
              <ul className="relative grid max-h-[56svh] gap-3.5 overflow-y-auto p-2">
                {docs.map((d, i) => (
                  <DocCard key={d.href} doc={d} i={i} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Scallop fill="#FFF7DA" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileDocuments({ pdfs }: { pdfs: string[] }) {
  const { t } = useLang();
  const docs = useDocs(pdfs);
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div aria-hidden className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
      <PaperStack className="absolute -right-6 top-6 w-28 rotate-6 opacity-90" />
      <div className="relative mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} accent="#8B63D9" className="pr-20" />
        <div className="relative mt-6 rounded-[0.8rem_2.2rem_2.2rem_2.2rem] bg-[#E4D6FF] p-3 md:p-4">
          <span aria-hidden className="absolute -top-5 left-5 h-8 w-28 rounded-t-[1.1rem] bg-[#E4D6FF]" />
          {docs.length === 0 ? (
            <Empty compact />
          ) : (
            <ul className="relative grid gap-3">
              {docs.map((d, i) => (
                <DocCard key={d.href} doc={d} i={i} compact />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Scallop fill="#FFF7DA" className="relative h-6" />
    </div>
  );
}

export function Documents({ pdfs }: { pdfs: string[] }) {
  const { t } = useLang();
  return (
    <section id="documents" aria-label={t.documents.eyebrow} className="relative overflow-x-clip">
      <Responsive desktop={<DesktopDocuments pdfs={pdfs} />} mobile={<MobileDocuments pdfs={pdfs} />} />
    </section>
  );
}
