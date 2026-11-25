import { Brush, Squiggle, Star } from "./Decor";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  size?: "desktop" | "mobile";
  accent?: string;
  className?: string;
};

/** Заголовок секции. Desktop и Mobile получают разную типографику и плотность. */
export function Heading({ eyebrow, title, text, align = "left", size = "desktop", accent = "#B49AF0", className = "" }: Props) {
  const center = align === "center";
  return (
    <div data-reveal className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {/* «наклейка» с подписью раздела */}
      <p
        className={`relative inline-flex -rotate-2 items-center gap-2 rounded-full bg-white font-extrabold tracking-wide text-ink-soft shadow-[0_6px_16px_-8px_rgba(48,35,71,.35)] ${
          size === "desktop" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-[13px]"
        }`}
      >
        <span aria-hidden className="absolute inset-[3px] rounded-full border-[1.5px] border-dashed" style={{ borderColor: `${accent}66` }} />
        <Star className="relative size-4 shrink-0" color={accent} />
        <span className="relative">{eyebrow}</span>
      </p>
      <h2
        className={`relative font-black leading-[1.1] text-ink text-balance ${
          size === "desktop"
            ? "mt-3 text-[clamp(1.9rem,2.4vw,2.6rem)] short:mt-2 short:text-[clamp(1.7rem,2.1vw,2.2rem)]"
            : "mt-3 text-[1.6rem] min-[390px]:text-[1.75rem] md:text-[2.1rem]"
        }`}
      >
        <span className="relative inline">
          {title}
        </span>
      </h2>
      <div className={`mt-2 flex items-center gap-1.5 ${center ? "justify-center" : ""}`}>
        <Squiggle color={accent} className="h-4 w-20" />
        <Brush color="#FFE47A" className="h-2.5 w-8" />
        <span aria-hidden className="size-2 rounded-full" style={{ background: accent }} />
      </div>
      {text && (
        <p
          className={`text-ink-soft text-pretty ${
            size === "desktop" ? "mt-3 max-w-xl text-[1.05rem] leading-relaxed short:mt-2 short:text-base" : "mt-3 text-[15px] leading-relaxed md:text-base"
          } ${center ? "mx-auto" : ""}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
