"use client"

import { TRANSLATION_STYLE_VALUES } from "@/constants"
import { useI18n } from "@/components/i18n-provider"

interface TranslationStyleSelectorProps {
  value: string
  onChange: (value: string) => void
}

export const TranslationStyleSelector = ({ value, onChange }: TranslationStyleSelectorProps) => {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRANSLATION_STYLE_VALUES.map((style) => (
          <div
            key={style}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
              value === style
                ? "border-green-600 bg-green-950 shadow-sm"
                : "border-zinc-700 bg-zinc-900 hover:border-green-600"
            }`}
            onClick={() => onChange(style)}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  value === style ? "border-green-500 bg-green-500" : "border-zinc-600"
                }`}
              >
                {value === style && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white">{t(`translationStyles.${style}.label`)}</h3>
                <p className="text-sm text-zinc-400 mt-1">{t(`translationStyles.${style}.description`)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
