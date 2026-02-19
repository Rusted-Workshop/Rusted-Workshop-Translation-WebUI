import { NextResponse } from "next/server"

const SUPPORTED_LANGUAGES = [
  "zh-CN",
  "zh-TW",
  "ja",
  "ko",
  "en",
  "ru",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
  "hi",
  "nl",
  "pl",
  "ro",
  "sv",
  "tr",
  "uk",
  "vi",
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: SUPPORTED_LANGUAGES,
  })
}
