"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICT, type Dict, type Lang } from "@/lib/content";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "kk", t: DICT.kk, setLang: () => {} });
const KEY = "aiza-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Язык по умолчанию — казахский; выбор посетителя запоминается в браузере.
  const [lang, setLangState] = useState<Lang>("kk");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "ru" || saved === "kk") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "kk"
        ? "«Айза» балабақшасы — Саймасай ауылы"
        : "Детский сад «Айза» — село Саймасай";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: DICT[lang] as Dict, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
