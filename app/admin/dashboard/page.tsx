"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdminData } from "@/hooks/use-admin-data"
import { AlertTriangle, Loader2, RefreshCw, Settings, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const { config, tasks, isLoading, error, refetch } = useAdminData()

  const handleRefresh = () => {
    refetch.config()
    refetch.tasks()
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <div className="text-gray-600">正在加载数据...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
              <p className="text-gray-600">管理控制台</p>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              重新加载
            </Button>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div>数据加载失败：{error}</div>
                <div className="text-sm">
                  请检查后端服务是否正常运行
                </div>
                <Button onClick={handleRefresh} size="sm" variant="outline" className="mt-2">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  重试
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
            <p className="text-gray-600">管理控制台</p>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新数据
          </Button>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>系统状态</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>API服务:</span>
                  <span className="text-green-600 font-medium">运行中</span>
                </div>
                <div className="flex justify-between">
                  <span>系统状态:</span>
                  <span className="text-green-600 font-medium">
                    {config?.system_status === 'online' ? '在线' : '离线'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>任务管理</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>总任务数:</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>最大文件大小:</span>
                  <span className="font-medium">{config?.max_file_size ? `${config.max_file_size / 1024 / 1024}MB` : 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快捷操作 */}
        <Card>
          <CardHeader>
            <CardTitle>快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col justify-center">
                <Settings className="h-6 w-6 mb-2" />
                配置管理
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center">
                <Users className="h-6 w-6 mb-2" />
                任务监控
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center">
                <RefreshCw className="h-6 w-6 mb-2" />
                系统维护
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
