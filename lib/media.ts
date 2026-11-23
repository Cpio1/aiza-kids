/** Изображение из медиа-манифеста (общий тип для сервера и клиента). */
export type MediaItem = {
  /** исходный файл в public/ */
  original: string;
  /** реальные размеры (с учётом EXIF-поворота) */
  w: number;
  h: number;
  /** оптимизированное превью для сеток */
  thumb: string;
  thumbW: number;
  /** версия для полноэкранного просмотра */
  full: string;
  fullW: number;
};

/** srcset из превью и полной версии (без повторов). */
export function srcSetOf(item: MediaItem, toUrl: (p: string) => string): string {
  const parts = new Map<number, string>();
  parts.set(item.thumbW, toUrl(item.thumb));
  parts.set(item.fullW, toUrl(item.full));
  return [...parts].map(([w, u]) => `${u} ${w}w`).join(", ");
}
