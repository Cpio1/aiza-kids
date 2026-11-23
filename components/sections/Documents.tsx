"use client";

import { ExternalLink, FileText, FolderOpen, HardDrive, Link as LinkIcon } from "lucide-react";
import { DOCUMENTS, SITE, type DocItem, type DocType } from "@/lib/content";
import { asset } from "@/lib/path";
import { useLang } from "../LanguageProvider";
import { Heading } from "../ui/Heading";
import { Cloud, Dots, Sparkle, Star, Wave } from "../ui/Decor";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { Responsive } from "../ui/Responsive";

const TYPE_ICON: Record<DocType, typeof FileText> = { pdf: FileText, drive: HardDrive, link: LinkIcon };
const CARD_TONES = ["bg-mint", "bg-sky", "bg-sun", "bg-rose", "bg-peach"];

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
    <li className={`relative flex items-center gap-4 overflow-hidden ${CARD_TONES[i % CARD_TONES.length]} ${compact ? "rounded-[1.5rem] p-3.5" : "rounded-[1.75rem] p-4"} shadow-sm ring-1 ring-white`}>
      <span className="relative grid size-12 shrink-0 place-items-center rounded-[1rem_1rem_1rem_0.4rem] bg-white shadow-sm">
        <Icon className="size-6" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block break-words font-black leading-tight">{doc.title[lang]}</span>
        <span className="mt-0.5 block text-[13px] font-bold text-ink-soft">{t.documents.types[doc.type]}</span>
      </span>
      <a
        href={external ? doc.href : asset(doc.href)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-extrabold shadow-sm hover:shadow-md"
      >
        {t.documents.view}
        <ExternalLink className="size-3.5" aria-hidden />
        <span className="sr-only">
          {doc.title[lang]} {t.newTab}
        </span>
      </a>
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
    <div className="relative flex min-h-[70svh] flex-col justify-center bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <Dots className="absolute right-10 top-12 size-16" />
      <Cloud className="absolute bottom-16 left-[4%] w-24 animate-drift" />
      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-[0.85fr_1.15fr] items-center gap-14 px-8 py-14 short:py-10">
        <div>
          <Heading eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} accent="#8B63D9" />
          <Star className="mt-6 size-8 animate-twinkle" color="#CDB8F7" />
        </div>
        {docs.length === 0 ? (
          <Empty />
        ) : (
          <ul className="grid max-h-[60svh] gap-3 overflow-y-auto p-1">
            {docs.map((d, i) => (
              <DocCard key={d.href} doc={d} i={i} />
            ))}
          </ul>
        )}
      </div>
      <Wave fill="#FFF7DA" className="relative -mb-px h-10" />
    </div>
  );
}

/* ================================ MOBILE ================================= */

function MobileDocuments({ pdfs }: { pdfs: string[] }) {
  const { t } = useLang();
  const docs = useDocs(pdfs);
  return (
    <div className="relative bg-[linear-gradient(180deg,#F5F0FF_0%,#FFFDF7_100%)]">
      <div className="mx-auto max-w-xl px-4 pb-8 pt-10 md:max-w-3xl md:px-8">
        <Heading size="mobile" eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} accent="#8B63D9" />
        <div className="mt-6">
          {docs.length === 0 ? (
            <Empty compact />
          ) : (
            <ul className="grid gap-3">
              {docs.map((d, i) => (
                <DocCard key={d.href} doc={d} i={i} compact />
              ))}
            </ul>
          )}
        </div>
      </div>
      <Wave fill="#FFF7DA" className="h-6" />
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
