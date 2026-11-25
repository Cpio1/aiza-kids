/* Декоративные SVG-элементы: облака, солнце, звёзды, цветы, радуга, волны.
   Все скрыты от скринридеров (aria-hidden) и не перехватывают клики. */

type P = { className?: string };
const base = "pointer-events-none select-none";

export function Cloud({ className = "" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 120 64" className={`${base} ${className}`}>
      <path
        d="M28 60h68a22 22 0 0 0 2-44A30 30 0 0 0 42 14 20 20 0 0 0 28 60Z"
        fill="#fff"
      />
      <path
        d="M30 60h66a22 22 0 0 0 20-14c-6 6-14 8-22 8H34c-8 0-14-3-18-8a20 20 0 0 0 14 14Z"
        fill="#ECE3FF"
      />
    </svg>
  );
}

export function Sun({ className = "", face = true }: P & { face?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={`${base} ${className}`}>
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="47"
            y="2"
            width="6"
            height="16"
            rx="3"
            fill="#FFD84D"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="27" fill="#FFD84D" />
      <circle cx="42" cy="40" r="12" fill="#FFF1A8" opacity=".55" />
      {face && (
        <g fill="#302347">
          <circle cx="41" cy="47" r="2.6" />
          <circle cx="59" cy="47" r="2.6" />
          <path d="M41 56q9 7 18 0" stroke="#302347" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="55" r="3.2" fill="#B49AF0" opacity=".7" />
          <circle cx="64" cy="55" r="3.2" fill="#B49AF0" opacity=".7" />
        </g>
      )}
    </svg>
  );
}

export function Star({ className = "", color = "#FFD84D" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={`${base} ${className}`}>
      <path
        d="M20 2c1.6 0 2.4 6.6 4.3 9.5 2 2.9 9.8 3.4 10.3 5s-5.8 5.5-6.6 8.9c-.8 3.4 2.6 10.5 1.3 11.6s-7-4-9.3-4-8 5.1-9.3 4 2.1-8.2 1.3-11.6C11.2 22 4.9 18 5.4 16.5s8.3-2.1 10.3-5C17.6 8.6 18.4 2 20 2Z"
        fill={color}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#fff" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${base} ${className}`}>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" fill={color} />
    </svg>
  );
}

export function Flower({ className = "", petal = "#C9B3F5", center = "#FFD84D" }: P & { petal?: string; center?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 60" className={`${base} ${className}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="30" cy="15" rx="9" ry="13" fill={petal} transform={`rotate(${i * 60} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill={center} />
      <circle cx="27" cy="27" r="2.5" fill="#fff" opacity=".7" />
    </svg>
  );
}

export function Rainbow({ className = "" }: P) {
  const colors = ["#B49AF0", "#FFC94D", "#FFD84D", "#CDB8F7", "#9C7BE3"];
  return (
    <svg aria-hidden viewBox="0 0 200 104" className={`${base} ${className}`}>
      {colors.map((c, i) => (
        <path
          key={c}
          d={`M${10 + i * 12} 100a${90 - i * 12} ${90 - i * 12} 0 0 1 ${180 - i * 24} 0`}
          fill="none"
          stroke={c}
          strokeWidth="11"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function Wave({ className = "", fill = "#fff" }: P & { fill?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className={`${base} block w-full ${className}`}>
      <path d="M0 40c160-40 320-40 480 0s320 40 480 0 320-40 480 0v40H0Z" fill={fill} />
    </svg>
  );
}

export function Squiggle({ className = "", color = "#B49AF0" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 20" className={`${base} ${className}`}>
      <path d="M2 10q10-12 20 0t20 0 20 0 20 0 20 0 16 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Dots({ className = "", color = "#302347" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 60" className={`${base} ${className}`}>
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={7 + (i % 4) * 15} cy={7 + Math.floor(i / 4) * 15} r="2.4" fill={color} opacity=".18" />
      ))}
    </svg>
  );
}

/** Иллюстрация-заглушка, если фото отсутствует или не загрузилось. */
export function KindergartenIllustration({ className = "" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className={`${base} ${className}`}>
      <rect width="400" height="320" fill="#EEE6FF" />
      <rect y="160" width="400" height="160" fill="#FFF6CC" />
      <path d="M40 190a160 160 0 0 1 320 0" fill="none" stroke="#F3E6FF" strokeWidth="14" />
      <path d="M58 190a142 142 0 0 1 284 0" fill="none" stroke="#FFE9B0" strokeWidth="14" />
      <path d="M76 190a124 124 0 0 1 248 0" fill="none" stroke="#FFF1A8" strokeWidth="14" />
      <path d="M94 190a106 106 0 0 1 212 0" fill="none" stroke="#D9C8FA" strokeWidth="14" />
      <circle cx="330" cy="62" r="26" fill="#FFD84D" />
      <path d="M0 250q100-40 200 0t200 0v70H0Z" fill="#CDB8F7" />
      <path d="M0 270q100-30 200 0t200 0v50H0Z" fill="#A98BE8" />
      <rect x="130" y="150" width="140" height="110" rx="14" fill="#fff" />
      <path d="M118 158 200 96l82 62Z" fill="#C9B3F5" />
      <rect x="182" y="208" width="36" height="52" rx="18" fill="#FFD84D" />
      <rect x="146" y="176" width="30" height="28" rx="8" fill="#EDE4FF" />
      <rect x="224" y="176" width="30" height="28" rx="8" fill="#EDE4FF" />
      <circle cx="200" cy="134" r="11" fill="#FFF1A8" />
      <g fill="#fff">
        <ellipse cx="80" cy="70" rx="34" ry="14" />
        <ellipse cx="100" cy="62" rx="22" ry="14" />
      </g>
      <g transform="translate(60 230)">
        <rect x="-2" y="-30" width="4" height="34" fill="#8B63D9" />
        <circle r="9" cy="-34" fill="#C9B3F5" />
        <circle r="4" cy="-34" fill="#FFD84D" />
      </g>
      <g transform="translate(330 236)">
        <rect x="-2" y="-30" width="4" height="34" fill="#8B63D9" />
        <circle r="9" cy="-34" fill="#9C7BE3" />
        <circle r="4" cy="-34" fill="#FFD84D" />
      </g>
    </svg>
  );
}

export function Heart({ className = "", color = "#B49AF0" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 30" className={`${base} ${className}`}>
      <path d="M16 28S2 19.5 2 10.2C2 5.6 5.4 2 9.6 2c2.8 0 5 1.5 6.4 3.8C17.4 3.5 19.6 2 22.4 2 26.6 2 30 5.6 30 10.2 30 19.5 16 28 16 28Z" fill={color} />
      <ellipse cx="9" cy="9" rx="3" ry="2" fill="#fff" opacity=".55" transform="rotate(-30 9 9)" />
    </svg>
  );
}

const BLOBS = [
  "M421 63c64 41 92 133 70 213s-94 149-175 165-170-21-221-86S28 186 69 116 196 18 268 14s89 8 153 49Z",
  "M437 109c47 65 51 165 1 232s-155 101-243 79S44 335 23 258 37 82 106 40 218-7 296 6s94 38 141 103Z",
  "M459 168c22 87-23 186-101 238S167 457 99 405 6 249 37 162 152 21 245 23s192 58 214 145Z",
];

/** Мягкая «клякса» для фоновых подложек. */
export function Blob({ className = "", color = "#EDE4FF", variant = 0 }: P & { color?: string; variant?: 0 | 1 | 2 }) {
  return (
    <svg aria-hidden viewBox="0 0 500 460" preserveAspectRatio="none" className={`${base} ${className}`}>
      <path d={BLOBS[variant]} fill={color} />
    </svg>
  );
}

/** Нижняя граница секции в виде облаков. */
export function CloudEdge({ className = "", fill = "#fff", back }: P & { fill?: string; back?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className={`${base} block w-full ${className}`}>
      {back && (
        <path
          d="M0 50c40-30 100-30 130 0 30-36 110-40 150 0 40-30 110-30 150 4 36-34 120-38 160 0 44-30 110-28 150 6 34-36 118-36 160-2 40-30 116-30 150 4 30-30 110-34 150 0 40-26 100-26 140 0L1440 50V90H0Z"
          fill={back}
        />
      )}
      <path
        d="M0 62c46-30 104-22 136 6 34-38 118-40 156 2 44-30 112-26 146 8 40-36 124-34 162 2 38-30 108-28 144 6 40-34 120-36 160 0 34-28 112-30 150 4 36-34 116-30 152 2 30-26 92-24 134-2L1440 60V90H0Z"
        fill={fill}
      />
    </svg>
  );
}

/** Нижняя граница из полукругов («фестон»). */
export function Scallop({ className = "", fill = "#fff" }: P & { fill?: string }) {
  const n = 24;
  const w = 1440 / n;
  const d = `M0 40${Array.from({ length: n }, () => `a${w / 2} ${w / 2.4} 0 0 1 ${w} 0`).join("")}V60H0Z`;
  return (
    <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className={`${base} block w-full ${className}`}>
      <path d={d} fill={fill} />
    </svg>
  );
}

/** Двухслойные холмы. */
export function Hills({ className = "", fill = "#fff", back = "#EDE4FF" }: P & { fill?: string; back?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className={`${base} block w-full ${className}`}>
      <path d="M0 40C200 0 360 10 540 44S900 90 1100 40 1360 10 1440 26v64H0Z" fill={back} />
      <path d="M0 70C180 30 380 40 600 66S980 96 1180 58s220-24 260-10v42H0Z" fill={fill} />
    </svg>
  );
}

/** Гирлянда из флажков. */
export function Bunting({ className = "", count = 14 }: P & { count?: number }) {
  const colors = ["#7545CB", "#FFD84D", "#B49AF0", "#FFC94D", "#9C7BE3", "#FFE47A"];
  const step = 1000 / count;
  return (
    <svg aria-hidden viewBox="0 0 1000 70" preserveAspectRatio="none" className={`${base} ${className}`}>
      <path d="M0 6Q500 46 1000 6" fill="none" stroke="#5B4D74" strokeOpacity=".35" strokeWidth="2" />
      {Array.from({ length: count }, (_, i) => {
        const x = step * i + step / 2;
        const t = x / 1000;
        const y = 6 + 40 * 2 * t * (1 - t) * 1; // точка на кривой Безье
        return <path key={i} d={`M${x - step * 0.36} ${y - 1}L${x + step * 0.36} ${y - 1}L${x} ${y + 26}Z`} fill={colors[i % colors.length]} />;
      })}
    </svg>
  );
}

/** Плавная завитушка. */
export function Swirl({ className = "", color = "#B49AF0" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 80" className={`${base} ${className}`}>
      <path
        d="M4 60c30-6 46-30 60-44 10-10 26-8 26 6s-20 20-26 8c-8-14 22-30 52-24s40 40 72 38 26-30 26-30"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
    </svg>
  );
}

/** «Облачные» выпуклости по верхнему краю карточки — карточка становится облачком.
 *  Родитель должен быть relative, контент — relative над ними. */
export function Bumps({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span aria-hidden className={`${base} absolute inset-x-0 top-0 ${className}`}>
      <span className="absolute -top-5 left-[12%] size-14 rounded-full" style={{ background: color }} />
      <span className="absolute -top-8 left-[34%] size-20 rounded-full" style={{ background: color }} />
      <span className="absolute -top-6 right-[14%] size-16 rounded-full" style={{ background: color }} />
    </span>
  );
}

/** Россыпь маленьких фигурок (звёзды, сердечки, кружки) поверх фона секции. */
export function Sprinkles({ className = "", seed = 0 }: P & { seed?: number }) {
  const items = [
    { x: 8, y: 18, k: "star", c: "#FFD84D", s: 18 },
    { x: 22, y: 78, k: "heart", c: "#CDB8F7", s: 16 },
    { x: 46, y: 8, k: "dot", c: "#B49AF0", s: 10 },
    { x: 64, y: 88, k: "star", c: "#B49AF0", s: 14 },
    { x: 84, y: 14, k: "heart", c: "#FFC94D", s: 15 },
    { x: 93, y: 62, k: "dot", c: "#FFD84D", s: 12 },
    { x: 4, y: 52, k: "dot", c: "#9C7BE3", s: 8 },
    { x: 74, y: 40, k: "sparkle", c: "#FFD84D", s: 14 },
  ];
  return (
    <div aria-hidden className={`${base} absolute inset-0 ${className}`}>
      {items.map((it, i) => {
        const x = (it.x + seed * 17) % 100;
        const style = { left: `${x}%`, top: `${it.y}%`, width: it.s, height: it.s, animationDelay: `${-i * 0.7}s` };
        if (it.k === "dot") return <span key={i} className="absolute rounded-full opacity-60 animate-float-slow" style={{ ...style, background: it.c }} />;
        if (it.k === "heart") return <span key={i} className="absolute animate-bob" style={style}><Heart color={it.c} className="size-full" /></span>;
        if (it.k === "sparkle") return <span key={i} className="absolute animate-twinkle" style={style}><Sparkle color={it.c} className="size-full" /></span>;
        return <span key={i} className="absolute animate-twinkle" style={style}><Star color={it.c} className="size-full" /></span>;
      })}
    </div>
  );
}

/** Маркерная «кисточка» под выделенным словом. */
export function Brush({ className = "", color = "#FFE47A" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 24" preserveAspectRatio="none" className={`${base} ${className}`}>
      <path d="M4 15c40-9 120-13 192-8 3 0 3 6 0 7-62 3-130 4-190 7-4 0-5-5-2-6Z" fill={color} />
    </svg>
  );
}
