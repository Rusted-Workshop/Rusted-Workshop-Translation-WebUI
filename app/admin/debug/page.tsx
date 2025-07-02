"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Server, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function AdminDebugPage() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [testPassword, setTestPassword] = useState("")

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

  const runAPITests = async () => {
    setIsLoading(true)
    const results: any = {}

    // 测试1: 检查API基础连接
    console.log("Testing API base connection...")
    try {
      const response = await fetch(`${apiBaseUrl}/api/config/public`)
      results.apiConnection = {
        status: response.status,
        success: response.ok,
        data: response.ok ? await response.json() : null,
        error: response.ok ? null : `HTTP ${response.status}`
      }
    } catch (error) {
      results.apiConnection = {
        success: false,
        error: error instanceof Error ? error.message : "连接失败"
      }
    }

    // 测试2: 检查支持的语言API
    console.log("Testing languages API...")
    try {
      const response = await fetch(`${apiBaseUrl}/api/config/languages`)
      results.languagesAPI = {
        status: response.status,
        success: response.ok,
        data: response.ok ? await response.json() : null,
        error: response.ok ? null : `HTTP ${response.status}`
      }
    } catch (error) {
      results.languagesAPI = {
        success: false,
        error: error instanceof Error ? error.message : "连接失败"
      }
    }

    // 测试3: 检查任务统计API
    console.log("Testing tasks stats API...")
    try {
      const response = await fetch(`${apiBaseUrl}/api/tasks/stats`)
      results.tasksStatsAPI = {
        status: response.status,
        success: response.ok,
        data: response.ok ? await response.json() : null,
        error: response.ok ? null : `HTTP ${response.status}`
      }
    } catch (error) {
      results.tasksStatsAPI = {
        success: false,
        error: error instanceof Error ? error.message : "连接失败"
      }
    }

    // 测试4: 测试管理员登录
    if (testPassword) {
      console.log("Testing admin login...")
      try {
        const response = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: testPassword })
        })
        results.adminLogin = {
          status: response.status,
          success: response.ok,
          data: response.ok ? await response.json() : null,
          error: response.ok ? null : `HTTP ${response.status}`
        }
      } catch (error) {
        results.adminLogin = {
          success: false,
          error: error instanceof Error ? error.message : "登录失败"
        }
      }
    }

    // 测试5: 检查管理员API（需要token）
    const token = localStorage.getItem("admin_token")
    if (token) {
      console.log("Testing admin stats API...")
      try {
        const response = await fetch("/api/admin/stats", {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        results.adminStatsAPI = {
          status: response.status,
          success: response.ok,
          data: response.ok ? await response.json() : null,
          error: response.ok ? null : `HTTP ${response.status}`
        }
      } catch (error) {
        results.adminStatsAPI = {
          success: false,
          error: error instanceof Error ? error.message : "连接失败"
        }
      }
    }

    setTestResults(results)
    setIsLoading(false)
  }

  const getStatusBadge = (result: any) => {
    if (!result) return <Badge variant="secondary">未测试</Badge>
    if (result.success) return <Badge variant="default" className="bg-green-600">成功</Badge>
    return <Badge variant="destructive">失败</Badge>
  }

  const getStatusIcon = (result: any) => {
    if (!result) return <AlertTriangle className="h-4 w-4 text-gray-400" />
    if (result.success) return <CheckCircle className="h-4 w-4 text-green-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">API调试</h1>
            <p className="text-gray-600">测试后端API连接和认证状态</p>
          </div>
          <Button onClick={runAPITests} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? '测试中...' : '运行测试'}
          </Button>
        </div>

        {/* 系统信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              系统信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">API 基础URL</div>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded">{apiBaseUrl}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">当前Token</div>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {localStorage.getItem("admin_token") ? "已设置" : "未设置"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 登录测试 */}
        <Card>
          <CardHeader>
            <CardTitle>登录测试</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">管理员密码</label>
                <Input
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="输入管理员密码进行测试"
                />
              </div>
              <Button onClick={runAPITests} disabled={!testPassword || isLoading}>
                测试登录
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 测试结果 */}
        <Card>
          <CardHeader>
            <CardTitle>测试结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* API连接测试 */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(testResults.apiConnection)}
                  <div>
                    <div className="font-medium">公开配置API</div>
                    <div className="text-sm text-gray-600">GET /api/config/public</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(testResults.apiConnection)}
                  {testResults.apiConnection?.status && (
                    <Badge variant="outline">HTTP {testResults.apiConnection.status}</Badge>
                  )}
                </div>
              </div>

              {/* 语言API测试 */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(testResults.languagesAPI)}
                  <div>
                    <div className="font-medium">支持语言API</div>
                    <div className="text-sm text-gray-600">GET /api/config/languages</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(testResults.languagesAPI)}
                  {testResults.languagesAPI?.status && (
                    <Badge variant="outline">HTTP {testResults.languagesAPI.status}</Badge>
                  )}
                </div>
              </div>

              {/* 任务统计API测试 */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(testResults.tasksStatsAPI)}
                  <div>
                    <div className="font-medium">任务统计API</div>
                    <div className="text-sm text-gray-600">GET /api/tasks/stats</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(testResults.tasksStatsAPI)}
                  {testResults.tasksStatsAPI?.status && (
                    <Badge variant="outline">HTTP {testResults.tasksStatsAPI.status}</Badge>
                  )}
                </div>
              </div>

              {/* 管理员登录测试 */}
              {testResults.adminLogin && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(testResults.adminLogin)}
                    <div>
                      <div className="font-medium">管理员登录</div>
                      <div className="text-sm text-gray-600">POST /api/admin/auth/login</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(testResults.adminLogin)}
                    {testResults.adminLogin?.status && (
                      <Badge variant="outline">HTTP {testResults.adminLogin.status}</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* 管理员统计API测试 */}
              {testResults.adminStatsAPI && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(testResults.adminStatsAPI)}
                    <div>
                      <div className="font-medium">管理员统计API</div>
                      <div className="text-sm text-gray-600">GET /api/admin/stats</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(testResults.adminStatsAPI)}
                    {testResults.adminStatsAPI?.status && (
                      <Badge variant="outline">HTTP {testResults.adminStatsAPI.status}</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 错误详情 */}
            {Object.values(testResults).some((result: any) => result?.error) && (
              <div className="mt-6">
                <h4 className="font-medium text-red-600 mb-2">错误详情</h4>
                <div className="space-y-2">
                  {Object.entries(testResults).map(([key, result]: [string, any]) => {
                    if (result?.error) {
                      return (
                        <Alert key={key} variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{key}:</strong> {result.error}
                          </AlertDescription>
                        </Alert>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )}

            {/* 成功响应数据 */}
            {Object.values(testResults).some((result: any) => result?.success && result?.data) && (
              <div className="mt-6">
                <h4 className="font-medium text-green-600 mb-2">响应数据</h4>
                <div className="space-y-4">
                  {Object.entries(testResults).map(([key, result]: [string, any]) => {
                    if (result?.success && result?.data) {
                      return (
                        <div key={key} className="border rounded-lg p-3">
                          <div className="font-medium text-sm text-gray-600 mb-2">{key}</div>
                          <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
} 