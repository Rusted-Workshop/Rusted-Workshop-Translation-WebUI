"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  getBrowserLocale,
  getStoredLocale,
  translate,
  type InterfaceLocale,
} from "@/lib/i18n"

type TranslateFn = ReturnType<typeof createTranslateFn>

type I18nContextValue = {
  locale: InterfaceLocale
  locales: readonly InterfaceLocale[]
  setLocale: (locale: InterfaceLocale) => void
  t: TranslateFn
}

const I18nContext = createContext<I18nContextValue | null>(null)

function createTranslateFn(locale: InterfaceLocale) {
  return (key: Parameters<typeof translate>[1], vars?: Parameters<typeof translate>[2]) => translate(locale, key, vars)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<InterfaceLocale>(DEFAULT_LOCALE)

  useEffect(() => {
    setLocale(getStoredLocale() || getBrowserLocale())
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  return (
    <I18nContext.Provider
      value={{
        locale,
        locales: SUPPORTED_LOCALES,
        setLocale,
        t: createTranslateFn(locale),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }

  return context
}

