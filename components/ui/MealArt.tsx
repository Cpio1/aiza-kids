import type { MealKind } from "@/lib/content";

/* Декоративные иллюстрации приёмов пищи (не являются меню детского сада). */

function Plate({ children, rim = "#fff", inner = "#F6F8FB" }: { children?: React.ReactNode; rim?: string; inner?: string }) {
  return (
    <>
      <ellipse cx="60" cy="66" rx="46" ry="44" fill="#29364A" opacity=".07" />
      <circle cx="60" cy="60" r="44" fill={rim} />
      <circle cx="60" cy="60" r="33" fill={inner} />
      {children}
    </>
  );
}

function Fork({ x = 8 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 22)`} fill="#B7C2D3">
      <rect x="3" y="26" width="4" height="50" rx="2" />
      <rect x="0" y="0" width="2" height="22" rx="1" />
      <rect x="4" y="0" width="2" height="22" rx="1" />
      <rect x="8" y="0" width="2" height="22" rx="1" />
      <path d="M0 18h10v6a5 5 0 0 1-10 0Z" />
    </g>
  );
}

function Spoon({ x = 106 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 22)`} fill="#B7C2D3">
      <ellipse cx="5" cy="10" rx="5.5" ry="10" />
      <rect x="3" y="18" width="4" height="58" rx="2" />
    </g>
  );
}

export function MealArt({ kind, className = "" }: { kind: MealKind; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={`pointer-events-none select-none ${className}`}>
      {kind === "breakfast" && (
        <>
          <Plate inner="#FFF6D6" />
          {/* каша в мисочке */}
          <path d="M34 56h52a26 22 0 0 1-52 0Z" fill="#FFB27A" />
          <path d="M34 56h52" stroke="#FF9A5A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="60" cy="55" rx="24" ry="6" fill="#FFF3B0" />
          <circle cx="52" cy="53" r="3" fill="#FF6F9F" />
          <circle cx="62" cy="52" r="3" fill="#7CCFF5" />
          <circle cx="69" cy="55" r="2.6" fill="#FF6F9F" />
          <path d="M60 40c-3-5 3-7 0-12M68 42c-3-5 3-7 0-12" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity=".9" />
          <Spoon />
        </>
      )}
      {kind === "vitamin" && (
        <>
          <Plate inner="#EAFBEF" />
          {/* яблоко */}
          <path d="M44 48c-10 0-14 10-10 20s10 12 13 10c3 2 9 0 13-10s0-20-10-20c-2 0-4 1-3 1s-1-1-3-1Z" fill="#FF6F6F" />
          <path d="M47 46c0-5 2-8 5-9" stroke="#6B4B3A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M52 40c5-3 9-1 10 2-4 2-8 2-10-2Z" fill="#3FBF6A" />
          {/* апельсин */}
          <circle cx="76" cy="66" r="13" fill="#FFA53D" />
          <circle cx="72" cy="62" r="3" fill="#FFD08A" />
          <path d="M76 53l2-4 4 1" stroke="#3FBF6A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {/* ягодки */}
          <circle cx="58" cy="80" r="4" fill="#B04CC8" />
          <circle cx="65" cy="83" r="4" fill="#8A3FB0" />
          <circle cx="60" cy="87" r="3.5" fill="#B04CC8" />
          <path d="M84 36l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" fill="#FFC93C" />
        </>
      )}
      {kind === "lunch" && (
        <>
          <Plate inner="#FFEFE2" />
          {/* суп */}
          <circle cx="60" cy="60" r="26" fill="#FFC27A" />
          <circle cx="60" cy="60" r="26" fill="none" stroke="#fff" strokeWidth="2" opacity=".6" />
          <rect x="47" y="52" width="9" height="9" rx="2" fill="#FF8A3D" />
          <rect x="62" y="64" width="8" height="8" rx="2" fill="#FF8A3D" />
          <circle cx="66" cy="52" r="4" fill="#6CCF86" />
          <circle cx="52" cy="68" r="3.5" fill="#6CCF86" />
          <path d="M56 46q4 2 8 0" stroke="#3FBF6A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <Fork x={4} />
          <Spoon x={108} />
        </>
      )}
      {kind === "snack" && (
        <>
          <Plate inner="#FFF0F5" />
          {/* стакан молока */}
          <path d="M66 34h20l-3 46a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4Z" fill="#fff" stroke="#BDEBFF" strokeWidth="2.5" />
          <path d="M67.3 48h17.4l-2.2 31a3 3 0 0 1-3 3h-6.9a3 3 0 0 1-3-3Z" fill="#F4FAFF" />
          {/* печенье */}
          <circle cx="46" cy="62" r="15" fill="#E9A863" />
          <circle cx="46" cy="62" r="15" fill="none" stroke="#C9864A" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="41" cy="57" r="2.4" fill="#7A4A2A" />
          <circle cx="51" cy="60" r="2.4" fill="#7A4A2A" />
          <circle cx="44" cy="68" r="2.4" fill="#7A4A2A" />
          <circle cx="56" cy="80" r="9" fill="#F2BE7E" />
          <circle cx="54" cy="78" r="1.8" fill="#7A4A2A" />
          <circle cx="58" cy="83" r="1.8" fill="#7A4A2A" />
          <path d="M28 34l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8Z" fill="#FF9DB8" />
        </>
      )}
    </svg>
  );
}
