"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2, Terminal } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { login, isLoading, isAuthenticated, isInitialized } = useAdminAuth()
  const router = useRouter()

  // 只在初始化完成且已认证时设置重定向标志
  useEffect(() => {
    if (isInitialized && isAuthenticated && !isLoading) {
      console.log("LoginPage: Already authenticated on mount, setting redirect flag...")
      setShouldRedirect(true)
    }
  }, [isAuthenticated, isLoading, isInitialized])

  // 执行重定向
  useEffect(() => {
    if (shouldRedirect) {
      console.log("LoginPage: Executing redirect to dashboard...")
      const timer = setTimeout(() => {
        router.replace("/admin/dashboard")
      }, 100) // 短暂延迟确保状态稳定
      
      return () => clearTimeout(timer)
    }
  }, [shouldRedirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) {
      console.log("Submitting login form...")
      await login(password)
    }
  }

  // 如果还在初始化，显示加载状态
  if (!isInitialized) {
    return (
      <div className="min-h-screen blueprint-grid flex items-center justify-center">
        <div className="hard-card w-full max-w-md">
          <div className="p-6 text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
            <p className="text-gray-600 font-medium">初始化中...</p>
          </div>
        </div>
      </div>
    )
  }

  // 如果已经认证或者应该重定向，显示跳转状态
  if (isAuthenticated || shouldRedirect) {
    return (
      <div className="min-h-screen blueprint-grid flex items-center justify-center">
        <div className="hard-card w-full max-w-md">
          <div className="p-6 text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
            <p className="text-gray-600 font-medium">已登录，正在跳转...</p>
            <p className="text-xs text-gray-500">如果页面没有自动跳转，请点击下方按钮</p>
            <Button
              onClick={() => router.replace("/admin/dashboard")}
              className="w-full bg-red-600 hover:bg-red-700 border-2 border-red-700 hover:border-red-800 text-white font-bold uppercase tracking-wide"
              style={{ borderRadius: '4px' }}
            >
              手动跳转到仪表板
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen blueprint-grid flex items-center justify-center">
      <div className="hard-card w-full max-w-md">
        <div className="border-b-2 border-red-200 bg-red-50/50 p-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="p-3 bg-red-100 border-2 border-red-300" style={{ borderRadius: '3px' }}>
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">管理员登录</h1>
              <p className="text-sm text-gray-600 font-medium">ADMIN LOGIN</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">请输入管理员密码以访问后台</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                管理员密码
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                disabled={isLoading}
                className="border-2 border-gray-300 focus:border-red-500 bg-white"
                style={{ borderRadius: '4px' }}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 border-2 border-red-700 hover:border-red-800 text-white font-bold uppercase tracking-wide"
              disabled={!password.trim() || isLoading}
              style={{ borderRadius: '4px' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  登录中...
                </>
              ) : (
                <>
                  <Terminal className="h-4 w-4 mr-2" />
                  登录
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

