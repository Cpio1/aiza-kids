import { Squiggle } from "./Decor";

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
export function Heading({ eyebrow, title, text, align = "left", size = "desktop", accent = "#FF9DB8", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full bg-white/80 font-extrabold tracking-wide text-ink-soft shadow-sm ring-1 ring-ink/5 ${
          size === "desktop" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-[13px]"
        }`}
      >
        <span className="size-2 rounded-full" style={{ background: accent }} />
        {eyebrow}
      </p>
      <h2
        className={`font-black leading-[1.1] text-ink text-balance ${
          size === "desktop"
            ? "mt-3 text-[clamp(1.9rem,2.4vw,2.6rem)] short:mt-2 short:text-[clamp(1.7rem,2.1vw,2.2rem)]"
            : "mt-3 text-[1.6rem] min-[390px]:text-[1.75rem] md:text-[2.1rem]"
        }`}
      >
        {title}
      </h2>
      <Squiggle color={accent} className={`mt-2 h-4 w-24 ${center ? "mx-auto" : ""}`} />
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
