import type { TranslationStyle } from "@/types"

export const TRANSLATION_STYLES: TranslationStyle[] = [
  { value: "formal", label: "正式风格", description: "使用正式、严谨的翻译风格" },
  { value: "casual", label: "休闲风格", description: "使用轻松、口语化的翻译风格" },
  { value: "military", label: "军事风格", description: "使用军事术语和严肃的语调" },
  { value: "literal", label: "直译风格", description: "尽可能保持原文的字面意思" },
]

export const FILE_SIZE_LIMIT = 100 * 1024 * 1024 // 100MB
export const POLL_INTERVAL = 2000 // 2 seconds
