 "use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Languages, HelpCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useI18n } from "@/components/i18n-provider"

export const Header = () => {
  const { t } = useI18n()

  return (
    <header className="border-b bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{t("nav.workshop")}</h1>
              <p className="text-sm text-green-400 font-medium">{t("nav.toolSubtitle")}</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-300 hover:text-green-400 hover:bg-zinc-800"
                asChild
              >
                <a href="https://rw.denox.cc" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("nav.workshopSite")}
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-300 hover:text-green-400 hover:bg-zinc-800"
                asChild
              >
                <Link href="/">
                  <Languages className="h-4 w-4 mr-2" />
                  {t("nav.translationTool")}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800"
                asChild
              >
                <Link href="/about">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {t("nav.about")}
                </Link>
              </Button>
            </nav>

            <LocaleSwitcher />

            <Badge variant="outline" className="border-green-600 text-green-400">
              {t("common.beta")}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
