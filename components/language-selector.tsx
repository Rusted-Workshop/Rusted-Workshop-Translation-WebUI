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
      <Label className="text-base font-medium text-white">目标语言</Label>
      <div className="relative">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 border-zinc-700 bg-zinc-900 text-white hover:border-green-600 focus:border-green-500 transition-colors">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-zinc-400" />
              <SelectValue placeholder="请选择目标语言" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto bg-zinc-900 border-zinc-700">
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value} className="text-white hover:bg-zinc-800 focus:bg-zinc-800">
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}