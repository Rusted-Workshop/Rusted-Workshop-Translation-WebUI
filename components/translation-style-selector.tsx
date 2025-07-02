"use client"

import { TRANSLATION_STYLES } from "@/constants"

interface TranslationStyleSelectorProps {
  value: string
  onChange: (value: string) => void
}

export const TranslationStyleSelector = ({ value, onChange }: TranslationStyleSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRANSLATION_STYLES.map((style) => (
          <div
            key={style.value}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
              value === style.value
                ? "border-green-500 bg-green-50 shadow-sm"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => onChange(style.value)}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  value === style.value ? "border-green-500 bg-green-500" : "border-gray-300"
                }`}
              >
                {value === style.value && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{style.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{style.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
