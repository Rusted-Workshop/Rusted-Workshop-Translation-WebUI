"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Zap, Target, Mail, Code2, Image } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen blueprint-grid">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 页面标题 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gray-100 rounded-lg">
                <HelpCircle className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">关于我们</h1>
                <p className="text-lg text-gray-600 font-medium">铁锈工坊</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们致力于为铁锈提供易用的创作工具和平台
            </p>
          </div>

          {/* 项目介绍 */}
          <Card className="border-2 bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl">铁锈工坊</CardTitle>
                <Badge variant="outline" className="border-green-200 text-green-700">Beta</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                铁锈工坊是一个专注于铁锈模组创作的平台，我们希望更多的玩家能够享受到优质的游戏体验。
              </p>
            </CardContent>
          </Card>

          {/* 核心功能 */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">AI 智能汉化</CardTitle>
                  <Badge variant="outline" className="ml-2 border-green-200 text-green-700">测试版</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使用最新的AI、向量化技术，为游戏模组提供专业的翻译服务，保持原有风格和语境
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">模组编辑器</CardTitle>
                  <Badge variant="outline" className="ml-2 border-blue-200 text-blue-700">未发布</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  提供直观、易用的模组编辑器，让玩家能够轻松创建、编辑和分享自己的模组
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Image className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">AI贴图生成</CardTitle>
                  <Badge variant="outline" className="ml-2 border-purple-200 text-purple-700">未发布</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  使用最新的AI绘图（Stable Diffusion），为模组提供高质量的贴图
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 更新日志 */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">更新日志</CardTitle>
              <CardDescription>
                我们正在不断完善和扩展功能，欢迎提供反馈和建议
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-700">内部测试
                      <span className="text-gray-500 text-sm">（2025-06-02）</span>
                    </h4>
                    <p className="text-gray-600 mt-1">
                      完成基础的 AI 汉化功能，支持多种翻译风格，提供稳定的汉化服务，开放测试🎉
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-green-700">开放公开测试
                      <span className="text-gray-500 text-sm">（2025-07-02）</span>
                    </h4>
                    <p className="text-gray-600 mt-1">
                      开放公开测试，欢迎提供反馈和建议
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">添加无损翻译支持</h4>
                    <p className="text-gray-600 mt-1">
                      保留原始文本，使用多语言字段，同时支持多个国家语言翻译。
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">增加LSP支持</h4>
                    <p className="text-gray-600 mt-1">
                      增加LSP支持，AI自动修复模组出现的错误。
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-yellow-700">接入模组编辑器</h4>
                    <p className="text-gray-600 mt-1">
                      接入模组编辑器，让玩家能够轻松创建多语言模组。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 联系我们 */}
          <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">联系我们</CardTitle>
              <CardDescription>
                有问题或建议？我们很乐意听到你的声音
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">QQ 群：<a href="https://qm.qq.com/q/vAD9YAIScw" className="text-blue-600 hover:underline">924777972</a></span>
                </div>
                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href="/">
                      立即体验
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 致谢 */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-bold text-gray-900">感谢支持</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              感谢所有开发者、贡献者、校对人员、测试人员、以及我们的用户
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 