import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Проверка файлов в public/ во время сборки (статический экспорт).
 * Если файла нет — ссылка на него не создаётся, вместо него показывается заглушка.
 */
const PUBLIC = path.join(process.cwd(), "public");
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

function exists(rel: string): string | null {
  return fs.existsSync(path.join(PUBLIC, rel)) ? `/${rel}` : null;
}

/** Первый существующий файл из списка вариантов (например, main-page2.png / .jpg / .mp4). */
function firstExisting(base: string, exts: string[]): string | null {
  for (const e of exts) {
    const hit = exists(`${base}.${e}`);
    if (hit) return hit;
  }
  return null;
}

function listDir(rel: string, re: RegExp): string[] {
  const dir = path.join(PUBLIC, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => re.test(f) && !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${rel}/${f}`);
}

export type SiteAssets = {
  hero: string | null;
  about: string | null;
  /** main-page2 в виде видео (mp4/webm), если оно есть. */
  aboutVideo: string | null;
  logo: string | null;
  gallery: string[];
  pdfs: string[];
};

export function getAssets(): SiteAssets {
  return {
    hero: firstExisting("images/main-page", ["png", "webp", "jpg", "jpeg"]),
    about: firstExisting("images/main-page2", ["png", "webp", "jpg", "jpeg"]),
    aboutVideo: firstExisting("images/main-page2", ["mp4", "webm"]),
    logo: exists("images/logo.png"),
    gallery: listDir("images/gallery", IMAGE_RE),
    pdfs: listDir("documents", /\.pdf$/i),
  };
}
