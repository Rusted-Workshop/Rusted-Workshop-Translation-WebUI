"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Zap, Target, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen blueprint-grid flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-zinc-800 rounded-lg">
                <HelpCircle className="h-8 w-8 text-zinc-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">{t("about.title")}</h1>
                <p className="text-lg text-zinc-400 font-medium">{t("about.subtitle")}</p>
              </div>
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{t("about.intro")}</p>
          </div>

          <Card className="border-2 bg-gradient-to-br from-green-950 to-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-green-400" />
                <CardTitle className="text-2xl text-white">{t("about.workshopTitle")}</CardTitle>
                <Badge variant="outline" className="border-green-600 text-green-400">
                  {t("common.beta")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 text-lg leading-relaxed">{t("about.workshopDescription")}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-700 transition-colors bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-400" />
                <CardTitle className="text-lg text-white">{t("about.aiTitle")}</CardTitle>
                <Badge variant="outline" className="ml-2 border-green-600 text-green-400">
                  {t("common.testVersion")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">{t("about.aiDescription")}</p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-blue-950 to-purple-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{t("about.contactTitle")}</CardTitle>
              <CardDescription className="text-zinc-400">{t("about.contactDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-zinc-300">
                    {t("about.qqGroup")}：<a href="https://qm.qq.com/q/vAD9YAIScw" className="text-blue-400 hover:underline">924777972</a>
                  </span>
                </div>
                <div className="flex space-x-4">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/">{t("about.cta")}</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-bold text-white">{t("about.thanksTitle")}</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{t("about.thanksDescription")}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
