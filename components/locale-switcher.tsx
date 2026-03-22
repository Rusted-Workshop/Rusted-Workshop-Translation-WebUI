"use client"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"
import type { InterfaceLocale } from "@/lib/i18n"

const localeLabels: Record<InterfaceLocale, string> = {
  "zh-CN": "简体中文",
  en: "English",
}

export const LocaleSwitcher = () => {
  const { locale, locales, setLocale, t } = useI18n()

  return (
    <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 p-1">
      {locales.map((item) => (
        <Button
          key={item}
          variant="ghost"
          size="sm"
          onClick={() => setLocale(item)}
          className={
            item === locale
              ? "bg-green-600 text-white hover:bg-green-700"
              : "text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
          }
          aria-label={`${t("common.language")}: ${localeLabels[item]}`}
        >
          {localeLabels[item]}
        </Button>
      ))}
    </div>
  )
}
