"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Zap, Target, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AboutPage() {
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
                <h1 className="text-4xl font-bold text-white">关于我们</h1>
                <p className="text-lg text-zinc-400 font-medium">铁锈工坊</p>
              </div>
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              我们致力于为铁锈提供易用的创作工具和平台
            </p>
          </div>

          <Card className="border-2 bg-gradient-to-br from-green-950 to-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-green-400" />
                <CardTitle className="text-2xl text-white">铁锈工坊</CardTitle>
                <Badge variant="outline" className="border-green-600 text-green-400">Beta</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 text-lg leading-relaxed">
                铁锈工坊是一个专注于铁锈模组创作的平台，我们希望更多的玩家能够享受到优质的游戏体验。
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-700 transition-colors bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-400" />
                <CardTitle className="text-lg text-white">AI 智能汉化</CardTitle>
                <Badge variant="outline" className="ml-2 border-green-600 text-green-400">测试版</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                使用 GPT 5.3 模型，结合向量化技术，为游戏模组提供专业的翻译服务，保持原有风格和语境
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-blue-950 to-purple-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">联系我们</CardTitle>
              <CardDescription className="text-zinc-400">
                有问题或建议？我们很乐意听到你的声音
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-zinc-300">QQ 群：<a href="https://qm.qq.com/q/vAD9YAIScw" className="text-blue-400 hover:underline">924777972</a></span>
                </div>
                <div className="flex space-x-4">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/">
                      立即体验
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-bold text-white">感谢支持</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              感谢所有开发者、贡献者、校对人员、测试人员、以及我们的用户
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}