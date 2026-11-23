#!/usr/bin/env node
/**
 * Сборка медиа-манифеста (запускается автоматически перед `next dev` и `next build`).
 *
 * 1. Ищет изображения в public/images (включая подпапки, например gallery/).
 * 2. main-page.* → главный экран, main-page2.* → «О нас», logo.* → логотип.
 *    Остальные фото из public/images/gallery → галерея.
 * 3. Убирает дубликаты по содержимому файла (sha1).
 * 4. Считывает реальные размеры (с учётом EXIF-поворота) — пропорции не искажаются.
 * 5. Создаёт оптимизированные WebP-версии в public/images/_optimized/
 *    (превью для сетки и полноразмерные для просмотра). Исходники не изменяются.
 * 6. Пишет манифест в lib/generated/media.json — его читает страница при сборке.
 *
 * Если sharp недоступен, используются исходные файлы без оптимизации.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const IMAGES = path.join(PUBLIC, "images");
const OUT_DIR = path.join(IMAGES, "_optimized");
const MANIFEST = path.join(ROOT, "lib", "generated", "media.json");
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const VIDEO_RE = /\.(mp4|webm)$/i;

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[media] sharp не найден — изображения будут использованы без оптимизации");
}

const toUrl = (abs) => "/" + path.relative(PUBLIC, abs).split(path.sep).join("/");
const sha1 = (abs) => crypto.createHash("sha1").update(fs.readFileSync(abs)).digest("hex");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith(".") || e.name.startsWith("_")) return [];
    const abs = path.join(dir, e.name);
    return e.isDirectory() ? walk(abs) : [abs];
  });
}

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const files = walk(IMAGES).sort((a, b) => naturalSort(toUrl(a), toUrl(b)));
const images = files.filter((f) => IMAGE_RE.test(f));
const baseName = (f) => path.basename(f).replace(/\.[^.]+$/, "").toLowerCase();

// Приоритет: файл в корне public/images, затем в подпапках; PNG → WebP → JPG.
const EXT_ORDER = ["png", "webp", "jpg", "jpeg"];
function pick(name, list = images) {
  return (
    list
      .filter((f) => baseName(f) === name)
      .sort((a, b) => {
        const depth = (f) => path.relative(IMAGES, f).split(path.sep).length;
        const ext = (f) => EXT_ORDER.indexOf(path.extname(f).slice(1).toLowerCase());
        return depth(a) - depth(b) || ext(a) - ext(b);
      })[0] || null
  );
}

async function meta(abs) {
  if (sharp) {
    const m = await sharp(abs).metadata();
    const rotated = (m.orientation || 1) >= 5;
    return { w: rotated ? m.height : m.width, h: rotated ? m.width : m.height };
  }
  return { w: 4, h: 3 };
}

/** Возвращает { url, width } — width нужен для srcset. */
async function optimize(abs, hash, width, quality, suffix, natural) {
  if (!sharp) return { url: toUrl(abs), width: natural.w };
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const name = `${baseName(abs).replace(/[^a-z0-9_-]+/gi, "-")}-${hash.slice(0, 8)}-${suffix}.webp`;
  const target = path.join(OUT_DIR, name);
  if (!fs.existsSync(target)) {
    // ограничение по длинной стороне: вертикальные фото не становятся «тяжелее» горизонтальных
    await sharp(abs)
      .rotate()
      .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toFile(target);
  }
  // если WebP не даёт заметного выигрыша — отдаём исходный файл
  if (fs.statSync(target).size > fs.statSync(abs).size * 0.9) {
    fs.rmSync(target);
    return { url: toUrl(abs), width: natural.w };
  }
  const m = await sharp(target).metadata();
  return { url: toUrl(target), width: m.width };
}

async function entry(abs, { thumbWidth = 720, fullWidth = 1600 } = {}) {
  const hash = sha1(abs);
  const natural = await meta(abs);
  const thumb = await optimize(abs, hash, thumbWidth, 72, `t${thumbWidth}`, natural);
  const full = await optimize(abs, hash, fullWidth, 82, `f${fullWidth}`, natural);
  return {
    original: toUrl(abs),
    hash,
    w: natural.w,
    h: natural.h,
    thumb: thumb.url,
    thumbW: thumb.width,
    full: full.url,
    fullW: full.width,
  };
}

const heroFile = pick("main-page");
const aboutFile = pick("main-page2");
const logoFile = pick("logo");
const videoFile = files.find((f) => VIDEO_RE.test(f) && baseName(f) === "main-page2") || null;

const hero = heroFile ? await entry(heroFile, { thumbWidth: 960, fullWidth: 1400 }) : null;
const about = aboutFile ? await entry(aboutFile, { thumbWidth: 800, fullWidth: 1400 }) : null;

// Галерея: все фото из public/images/gallery, кроме служебных и дубликатов.
const RESERVED = new Set(["main-page", "main-page2", "logo"]);
const seen = new Set([hero?.hash, about?.hash].filter(Boolean));
const gallery = [];
let duplicates = 0;
for (const abs of images.filter((f) => f.includes(`${path.sep}gallery${path.sep}`))) {
  if (RESERVED.has(baseName(abs))) continue;
  const e = await entry(abs);
  if (seen.has(e.hash)) {
    duplicates++;
    continue;
  }
  seen.add(e.hash);
  gallery.push(e);
}

// Удаляем устаревшие оптимизированные файлы
if (sharp && fs.existsSync(OUT_DIR)) {
  const used = new Set([hero, about, ...gallery].filter(Boolean).flatMap((e) => [e.thumb, e.full]));
  // (исходные файлы в used не мешают — удаляются только файлы из _optimized)
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (!used.has(toUrl(path.join(OUT_DIR, f)))) fs.rmSync(path.join(OUT_DIR, f));
  }
}

const strip = ({ hash, ...rest }) => rest;
const manifest = {
  hero: hero && strip(hero),
  about: about && strip(about),
  aboutVideo: videoFile ? toUrl(videoFile) : null,
  logo: logoFile ? toUrl(logoFile) : null,
  gallery: gallery.map(strip),
};
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  `[media] главная: ${hero?.original ?? "—"}, «О нас»: ${about?.original ?? "—"}, логотип: ${logoFile ? toUrl(logoFile) : "—"}, ` +
    `галерея: ${gallery.length} фото${duplicates ? ` (пропущено дубликатов: ${duplicates})` : ""}`
);
