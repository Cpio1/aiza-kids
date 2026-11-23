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
        fill="#E3F6FF"
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
            fill="#FFC93C"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="27" fill="#FFD54A" />
      <circle cx="42" cy="40" r="12" fill="#FFF3B0" opacity=".55" />
      {face && (
        <g fill="#29364A">
          <circle cx="41" cy="47" r="2.6" />
          <circle cx="59" cy="47" r="2.6" />
          <path d="M41 56q9 7 18 0" stroke="#29364A" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="55" r="3.2" fill="#FF9DB8" opacity=".7" />
          <circle cx="64" cy="55" r="3.2" fill="#FF9DB8" opacity=".7" />
        </g>
      )}
    </svg>
  );
}

export function Star({ className = "", color = "#FFC93C" }: P & { color?: string }) {
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

export function Flower({ className = "", petal = "#FF8FB3", center = "#FFD54A" }: P & { petal?: string; center?: string }) {
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
  const colors = ["#FF9DB8", "#FFB27A", "#FFD54A", "#8FE0A1", "#7CCFF5"];
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

export function Squiggle({ className = "", color = "#FF9DB8" }: P & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 20" className={`${base} ${className}`}>
      <path d="M2 10q10-12 20 0t20 0 20 0 20 0 20 0 16 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Dots({ className = "", color = "#29364A" }: P & { color?: string }) {
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
      <rect width="400" height="320" fill="#DDF4FF" />
      <rect y="160" width="400" height="160" fill="#FFF6CC" />
      <path d="M40 190a160 160 0 0 1 320 0" fill="none" stroke="#FFD5E5" strokeWidth="14" />
      <path d="M58 190a142 142 0 0 1 284 0" fill="none" stroke="#FFD6B5" strokeWidth="14" />
      <path d="M76 190a124 124 0 0 1 248 0" fill="none" stroke="#FFF3B0" strokeWidth="14" />
      <path d="M94 190a106 106 0 0 1 212 0" fill="none" stroke="#C9F2D0" strokeWidth="14" />
      <circle cx="330" cy="62" r="26" fill="#FFD54A" />
      <path d="M0 250q100-40 200 0t200 0v70H0Z" fill="#8FE0A1" />
      <path d="M0 270q100-30 200 0t200 0v50H0Z" fill="#6CCF86" />
      <rect x="130" y="150" width="140" height="110" rx="14" fill="#fff" />
      <path d="M118 158 200 96l82 62Z" fill="#FF8FB3" />
      <rect x="182" y="208" width="36" height="52" rx="18" fill="#FFC93C" />
      <rect x="146" y="176" width="30" height="28" rx="8" fill="#BDEBFF" />
      <rect x="224" y="176" width="30" height="28" rx="8" fill="#BDEBFF" />
      <circle cx="200" cy="134" r="11" fill="#FFF3B0" />
      <g fill="#fff">
        <ellipse cx="80" cy="70" rx="34" ry="14" />
        <ellipse cx="100" cy="62" rx="22" ry="14" />
      </g>
      <g transform="translate(60 230)">
        <rect x="-2" y="-30" width="4" height="34" fill="#3FBF6A" />
        <circle r="9" cy="-34" fill="#FF8FB3" />
        <circle r="4" cy="-34" fill="#FFD54A" />
      </g>
      <g transform="translate(330 236)">
        <rect x="-2" y="-30" width="4" height="34" fill="#3FBF6A" />
        <circle r="9" cy="-34" fill="#7CCFF5" />
        <circle r="4" cy="-34" fill="#FFD54A" />
      </g>
    </svg>
  );
}
