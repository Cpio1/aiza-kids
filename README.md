# Детский сад «Айза» — лендинг

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · статический экспорт (`out/`).

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статическая сборка в папку out/
```

## Где что менять

| Что | Где |
| --- | --- |
| Тексты KZ/RU, группы, питание, контакты | `lib/content.ts` (единый источник для Desktop и Mobile) |
| Документы (PDF, Google Drive, ссылки) | массив `DOCUMENTS` в `lib/content.ts`; PDF из `public/documents/` подхватываются автоматически |
| Фото главной | `main-page.(png/webp/jpg/jpeg)` — в `public/images/` или `public/images/gallery/` |
| Фото блока «О нас» | `main-page2.*` (так же; можно видео `main-page2.mp4`/`.webm`) |
| Логотип (шапка и favicon) | `public/images/logo.*` |
| Галерея | `public/images/gallery/` — JPG, JPEG, PNG, WebP; порядок по имени файла |

### Как подключаются фотографии

Перед `npm run dev` и `npm run build` автоматически запускается `scripts/build-media.mjs`
(вручную — `npm run media`). Он:

- находит фото, назначает `main-page` на главную, `main-page2` — в «О нас», остальные — в галерею;
- пропускает одинаковые по содержимому файлы (дубликаты);
- считывает реальные размеры — фото не растягиваются и не обрезаются;
- создаёт облегчённые WebP-версии в `public/images/_optimized/` (исходники не меняются);
- записывает манифест `lib/generated/media.json`, который страница читает при сборке.

Папки `_optimized/` и `lib/generated/` создаются при каждой сборке и в git не хранятся.
Если файла нет, вместо него показывается декоративная заглушка, битых ссылок не создаётся.

## Desktop и Mobile

Каждый раздел состоит из двух самостоятельных композиций (`DesktopHero` / `MobileHero`,
`DesktopGroups` / `MobileGroups` и т. д.) в `components/sections/`.
Desktop — от 1024px, Mobile — до 1023px (на 768–1023px — планшетная адаптация мобильной композиции).
Скрытая версия получает `display: none`, поэтому не попадает в Tab-навигацию, а ID секций
задаются один раз на общей обёртке `<section>`.

## Деплой

**GitHub Pages:** Settings → Pages → Source: «GitHub Actions». Workflow `.github/workflows/deploy.yml`
собирает сайт при каждом push в `main` и сам подставляет `BASE_PATH` (`/<имя-репозитория>`).

**Vercel:** импортировать репозиторий — настройки по умолчанию (Next.js) подходят,
`output: "export"` поддерживается.

Тёмная тема отключена: сайт всегда отображается в светлой теме.
