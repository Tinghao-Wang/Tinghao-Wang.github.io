"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { DEFAULT_LANGUAGE, type Language } from "./i18n-config"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_LANGUAGE
    }

    const stored = window.localStorage.getItem("site-language")
    if (stored === "zh" || stored === "en") {
      return stored
    }

    const browserLang = window.navigator.language.toLowerCase()
    return browserLang.startsWith("zh") ? "zh" : DEFAULT_LANGUAGE
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    window.localStorage.setItem("site-language", language)
    const langAttr = language === "zh" ? "zh-Hant" : "en"
    document.documentElement.lang = langAttr
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage: (next: Language) => setLanguageState(next),
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


