import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { getAssets } from "@/lib/assets";
import { BASE_PATH } from "@/lib/path";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aiza.kz";
const TITLE = "ЖМ «Айза» бөбекжай-балабақшасы — ЧУ «Ясли-сад „Айза“» | Саймасай";
const DESCRIPTION =
  "ЖМ «Айза» бөбекжай-балабақшасы, Саймасай ауылы: 2 жастан асқан балаларға арналған 4 топ, қазақ тілінде оқыту, 4 рет тамақтану, 07:30–18:00. " +
  "ЧУ «Ясли-сад „Айза“», село Саймасай: 4 группы для детей от 2 лет, обучение на казахском языке, 4-разовое питание.";

export function generateMetadata(): Metadata {
  const { logo, hero } = getAssets();
  const icon = logo ? `${BASE_PATH}${logo}` : `${BASE_PATH}/favicon.svg`;
  const ogImage = hero?.thumb || logo;
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    keywords: ["Айза", "балабақша", "бөбекжай", "детский сад", "ясли-сад", "Саймасай", "Еңбекшіқазақ", "Енбекшиказахский район"],
    alternates: { canonical: "./", languages: { kk: "./", ru: "./" } },
    icons: { icon, apple: logo ? `${BASE_PATH}${logo}` : undefined },
    openGraph: {
      type: "website",
      title: TITLE,
      description: DESCRIPTION,
      siteName: "ЧУ «Ясли-сад „Айза“» / ЖМ «Айза» бөбекжай-балабақшасы",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      images: ogImage ? [{ url: `${BASE_PATH}${ogImage}` }] : undefined,
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    other: { "color-scheme": "only light" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF3B0",
  colorScheme: "only light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={nunito.variable} style={{ colorScheme: "only light" }}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
