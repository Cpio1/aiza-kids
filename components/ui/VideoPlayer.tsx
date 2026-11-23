"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { asset } from "@/lib/path";
import { useLang } from "../LanguageProvider";

/** Видео без обрезки (object-contain) с отдельной кнопкой звука. Стартует без звука — так требуют браузеры для автозапуска. */
export function VideoPlayer({ src, label }: { src: string; label: string }) {
  const { lang } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };
  const text = muted ? (lang === "kk" ? "Дыбысты қосу" : "Включить звук") : lang === "kk" ? "Дыбысты өшіру" : "Выключить звук";
  return (
    <div className="relative size-full">
      <video ref={ref} src={asset(src)} aria-label={label} autoPlay muted loop playsInline preload="metadata" className="size-full object-contain" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={text}
        title={text}
        className="absolute bottom-3 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md"
      >
        {muted ? <VolumeX className="size-5" aria-hidden /> : <Volume2 className="size-5" aria-hidden />}
      </button>
    </div>
  );
}
