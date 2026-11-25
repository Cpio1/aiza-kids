import { getAssets } from "@/lib/assets";
import { SITE } from "@/lib/content";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Groups } from "@/components/sections/Groups";
import { Nutrition } from "@/components/sections/Nutrition";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { RevealObserver } from "@/components/ui/RevealObserver";

export default function Page() {
  // Файлы из public/ проверяются при сборке — отсутствующие не дают битых ссылок.
  const assets = getAssets();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: "ЧУ «Ясли-сад „Айза“»",
    alternateName: "«Айза» балабақшасы",
    telephone: SITE.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Хазиева, 7",
      addressLocality: "село Саймасай",
      addressRegion: "Алматинская область, Енбекшиказахский район",
      addressCountry: "KZ",
    },
    sameAs: [SITE.instagram],
  };

  return (
    <LanguageProvider>
      <Header logo={assets.logo} />
      <main>
        <Hero image={assets.hero} />
        <About image={assets.about} video={assets.aboutVideo} />
        <Groups />
        <Nutrition />
        <Gallery photos={assets.gallery} />
        <Documents pdfs={assets.pdfs} />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </LanguageProvider>
  );
}
