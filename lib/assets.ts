import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { MediaItem } from "./media";

/**
 * Медиафайлы сайта — определяются во время сборки (статический экспорт), не в браузере.
 * Основной источник — манифест lib/generated/media.json, который создаёт
 * scripts/build-media.mjs (размеры, WebP-превью, удаление дубликатов).
 * Если манифеста нет, используется простой поиск файлов в public/.
 */
const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const MANIFEST = path.join(ROOT, "lib", "generated", "media.json");
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

export type SiteAssets = {
  hero: MediaItem | null;
  about: MediaItem | null;
  aboutVideo: string | null;
  logo: string | null;
  gallery: MediaItem[];
  pdfs: string[];
};

function listDir(rel: string, re: RegExp): string[] {
  const dir = path.join(PUBLIC, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => re.test(f) && !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${rel}/${f}`);
}

const plain = (src: string): MediaItem => ({ original: src, thumb: src, full: src, w: 4, h: 3, thumbW: 1600, fullW: 1600 });

function fallback(): Omit<SiteAssets, "pdfs"> {
  const find = (base: string, exts: string[]) => {
    for (const dir of ["images", "images/gallery"])
      for (const e of exts) if (fs.existsSync(path.join(PUBLIC, dir, `${base}.${e}`))) return `/${dir}/${base}.${e}`;
    return null;
  };
  const img = ["png", "webp", "jpg", "jpeg"];
  const hero = find("main-page", img);
  const about = find("main-page2", img);
  return {
    hero: hero ? plain(hero) : null,
    about: about ? plain(about) : null,
    aboutVideo: find("main-page2", ["mp4", "webm"]),
    logo: find("logo", img),
    gallery: listDir("images/gallery", IMAGE_RE)
      .filter((f) => !/\/(main-page2?|logo)\.[a-z]+$/i.test(f))
      .map(plain),
  };
}

export function getAssets(): SiteAssets {
  let media: Omit<SiteAssets, "pdfs">;
  try {
    media = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    media = fallback();
  }
  return { ...media, pdfs: listDir("documents", /\.pdf$/i) };
}
