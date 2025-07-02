"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Settings, BarChart3, FileText, LogOut, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, isLoading, isInitialized, logout } = useAdminAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // 只有在初始化完成后才进行重定向检查
    if (isInitialized && !isLoading && !isAuthenticated) {
      console.log("AdminLayout: Not authenticated, redirecting to login...")
      router.replace("/admin/login")
    }
  }, [isAuthenticated, isLoading, isInitialized, router])

  // 如果还在初始化中
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
          <p className="text-gray-600">验证登录状态...</p>
        </div>
      </div>
    )
  }

  // 如果未认证，显示加载状态（很快会被重定向）
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
          <p className="text-gray-600">重定向到登录页...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: "/admin/dashboard", label: "仪表板", icon: BarChart3 },
    { href: "/admin/tasks", label: "任务管理", icon: FileText },
    { href: "/admin/settings", label: "系统设置", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">管理后台</h1>
                <p className="text-sm text-gray-500">铁锈工坊 - AI 汉化</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-red-200 text-red-700">
                管理员
              </Badge>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Card className="w-64 h-fit">
            <div className="p-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive ? "bg-red-50 text-red-700 border border-red-200" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </Card>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
