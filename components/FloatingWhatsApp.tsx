"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";
import { useLang } from "./LanguageProvider";
import { WhatsAppIcon } from "./ui/BrandIcons";

/** Плавающая кнопка WhatsApp. На телефоне появляется после первого экрана
 *  (на нём уже есть большая кнопка WhatsApp) и скрывается при открытом меню/галерее. */
export function FloatingWhatsApp() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.innerWidth >= 1024 || window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(() => {
      const d = document.documentElement.dataset;
      setBlocked(d.menu === "open" || d.lightbox === "open");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-menu", "data-lightbox"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
    };
  }, []);

  if (blocked) return null;

  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.floatingWa} ${t.newTab}`}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-40 grid size-[52px] place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-6px_rgba(117,69,203,.7)] ring-4 ring-white transition duration-300 hover:scale-105 hover:bg-wa-dark lg:bottom-6 lg:right-6 lg:size-[3.75rem] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      tabIndex={show ? undefined : -1}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
