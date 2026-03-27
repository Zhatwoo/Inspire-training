"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations.en[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("inspire-language") as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
      document.documentElement.setAttribute("lang", saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("inspire-language", lang);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
