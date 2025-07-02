"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"

interface Language {
  value: string
  label: string
}

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  languages: Language[]
}

export const LanguageSelector = ({ value, onChange, languages }: LanguageSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">目标语言</Label>
      <div className="relative">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-colors">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <SelectValue placeholder="请选择目标语言" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 