"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Clock,
  Calendar,
  HardDrive,
  Zap,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Pause
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TaskInfo } from "@/types/admin"

interface TaskTableProps {
  tasks: TaskInfo[]
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
    case "queued":
      return "secondary"
    case "processing":
      return "default"
    case "completed":
      return "default"
    case "failed":
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "等待中"
    case "queued":
      return "排队中"
    case "processing":
      return "处理中"
    case "completed":
      return "已完成"
    case "failed":
      return "失败"
    case "cancelled":
      return "已取消"
    default:
      return status
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
    case "queued":
      return <Pause className="h-4 w-4" />
    case "processing":
      return <Loader2 className="h-4 w-4 animate-spin" />
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "failed":
    case "cancelled":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
    case "queued":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "processing":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "completed":
      return "text-green-600 bg-green-50 border-green-200"
    case "failed":
    case "cancelled":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function TaskTable({ tasks, isLoading, error, onRefresh }: TaskTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = !searchTerm ||
                           task.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "created_at":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "filename":
          return a.filename.localeCompare(b.filename)
        case "status":
          return a.status.localeCompare(b.status)
        case "file_size":
          return (b.file_size || 0) - (a.file_size || 0)
        default:
          return 0
      }
    })

  const handleDownload = (taskId: string) => {
    window.open(`/api/tasks/${taskId}/download`, '_blank')
  }

  const handleDelete = async (taskId: string) => {
    if (confirm("确定要删除这个任务吗？")) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          // 立即刷新任务列表
          onRefresh?.()
        } else {
          alert("删除失败")
        }
      } catch (error) {
        alert("删除失败：" + (error instanceof Error ? error.message : "未知错误"))
      }
    }
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            任务管理
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              加载任务数据失败：{error}
              {onRefresh && (
                <Button onClick={onRefresh} size="sm" variant="outline" className="ml-2">
                  重试
                </Button>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          任务管理
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 搜索和过滤 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索任务ID或文件名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">等待中</SelectItem>
                <SelectItem value="queued">排队中</SelectItem>
                <SelectItem value="processing">处理中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">创建时间</SelectItem>
                <SelectItem value="filename">文件名</SelectItem>
                <SelectItem value="status">状态</SelectItem>
                <SelectItem value="file_size">文件大小</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 任务统计 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">总任务数</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-lg font-bold text-yellow-600">
              {tasks.filter(t => ['pending', 'queued'].includes(t.status.toLowerCase())).length}
            </div>
            <div className="text-sm text-gray-600">等待/排队</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-bold text-green-600">
              {tasks.filter(t => t.status.toLowerCase() === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-lg font-bold text-red-600">
              {tasks.filter(t => ['failed', 'cancelled'].includes(t.status.toLowerCase())).length}
            </div>
            <div className="text-sm text-gray-600">失败/取消</div>
          </div>
        </div>

        {/* 任务卡片列表 */}
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <div className="text-gray-500">
              {tasks.length === 0 ? "暂无任务数据" : "没有匹配的任务"}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* 左侧：主要信息 */}
                    <div className="flex-1 space-y-3">
                      {/* 文件名和状态 */}
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 truncate" title={task.filename}>
                            {task.filename}
                          </h3>
                          <p className="text-sm text-gray-500 font-mono">
                            ID: {task.id}
                          </p>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          {getStatusText(task.status)}
                        </div>
                      </div>

                      {/* 进度条 */}
                      {task.progress !== undefined && task.status.toLowerCase() !== 'pending' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">处理进度</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}

                      {/* 错误信息 */}
                      {task.error_message && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-800">{task.error_message}</p>
                          </div>
                        </div>
                      )}

                      {/* 详细信息 */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDistanceToNow(new Date(task.created_at), { 
                              addSuffix: true, 
                              locale: zhCN 
                            })}
                          </span>
                        </div>
                        
                        {task.completed_at && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>
                              {formatDistanceToNow(new Date(task.completed_at), { 
                                addSuffix: true, 
                                locale: zhCN 
                              })}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <HardDrive className="h-4 w-4" />
                          <span>{task.file_size ? formatFileSize(task.file_size) : "未知"}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          <span>{task.translation_style || "智能识别"}</span>
                        </div>
                      </div>
                    </div>

                    {/* 右侧：操作按钮 */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:w-24">
                      {task.status.toLowerCase() === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(task.id)}
                          className="flex-1 lg:flex-none"
                        >
                          <Download className="h-4 w-4 lg:mr-0 mr-2" />
                          <span className="lg:hidden">下载</span>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(task.id)}
                        className="flex-1 lg:flex-none"
                      >
                        <Trash2 className="h-4 w-4 lg:mr-0 mr-2" />
                        <span className="lg:hidden">删除</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 统计信息 */}
        {tasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
            显示 {filteredTasks.length} / {tasks.length} 个任务
          </div>
        )}
      </CardContent>
    </Card>
  )
}
