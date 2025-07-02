"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/admin-api"

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // 设置token到localStorage和cookies
  const setToken = useCallback((token: string) => {
    localStorage.setItem("admin_token", token)
    // 设置cookie，确保中间件能够访问
    document.cookie = `admin_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7天过期
  }, [])

  // 清除token
  const clearToken = useCallback(() => {
    localStorage.removeItem("admin_token")
    document.cookie = "admin_token=; path=/; max-age=0" // 删除cookie
  }, [])

  // 检查认证状态
  const checkAuth = useCallback(() => {
    if (typeof window === 'undefined') return false
    
    const token = localStorage.getItem("admin_token")
    const isAuth = !!token
    console.log("Checking auth status, token exists:", isAuth)
    setIsAuthenticated(isAuth)
    return isAuth
  }, [])

  // 只在组件初始化时检查一次认证状态
  useEffect(() => {
    if (!isInitialized) {
      console.log("Initializing auth state...")
      checkAuth()
      setIsLoading(false)
      setIsInitialized(true)
    }
  }, [isInitialized, checkAuth])

  const login = async (password: string) => {
    setIsLoading(true)
    try {
      console.log("Starting login process...")
      const result = await adminApi.login({ password })
      console.log("Login API result:", result)

      if (result.success && result.data) {
        console.log("Login successful, setting token...")
        setToken(result.data)
        setIsAuthenticated(true)
        
        toast({
          title: "登录成功",
          description: "欢迎回来，管理员",
        })
        
        console.log("Login successful, redirecting to dashboard...")
        // 延迟跳转，确保状态更新完成
        setTimeout(() => {
          router.replace("/admin/dashboard")
        }, 500)
      } else {
        const errorMessage = result.message || "登录失败，请检查密码"
        console.error("Login failed:", errorMessage)
        toast({
          title: "登录失败",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error instanceof Error ? error.message : "网络错误，请稍后重试"
      toast({
        title: "登录失败",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(() => {
    clearToken()
    setIsAuthenticated(false)
    router.replace("/admin/login")
    toast({
      title: "已退出登录",
      description: "你已安全退出管理后台",
    })
  }, [clearToken, router, toast])

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    logout,
    checkAuth,
  }
}
