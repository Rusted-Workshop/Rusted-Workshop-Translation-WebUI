"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  FileText, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Terminal,
  Zap,
  Copy
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface RealtimeProgressProps {
  taskKey: string
  fileName: string
  progress: number
  currentStep: string
  message: string
  processedFiles?: number
  totalFiles?: number
  status: string
  queuePosition?: number | null
}

export const RealtimeProgress = ({
  taskKey,
  fileName,
  progress,
  currentStep,
  message,
  processedFiles,
  totalFiles,
  status,
  queuePosition,
}: RealtimeProgressProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "queued":
        return <Clock className="h-5 w-5 text-yellow-400" />
      case "processing":
        return <Loader2 className="h-5 w-5 text-green-400 animate-spin" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-zinc-500" />
      default:
        return <Activity className="h-5 w-5 text-zinc-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "等待处理"
      case "queued":
        return "排队中"
      case "processing":
        return "正在处理"
      case "completed":
        return "处理完成"
      case "failed":
        return "处理失败"
      case "cancelled":
        return "已取消"
      default:
        return "未知状态"
    }
  }

  const getStatusBadgeClass = () => {
    switch (status) {
      case "completed":
        return "border-green-600 bg-green-950 text-green-400"
      case "failed":
        return "border-red-600 bg-red-950 text-red-400"
      case "processing":
        return "border-blue-600 bg-blue-950 text-blue-400"
      case "pending":
        return "border-blue-600 bg-blue-950 text-blue-400"
      case "queued":
        return "border-yellow-600 bg-yellow-950 text-yellow-400"
      default:
        return "border-zinc-600 bg-zinc-800 text-zinc-400"
    }
  }

  return (
    <div className="hard-card">
      <div className="border-b-2 border-green-800 bg-green-950/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-900 border-2 border-green-700" style={{ borderRadius: '3px' }}>
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">任务状态</h3>
              <p className="text-sm text-zinc-500 font-medium">TASK MONITOR</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className={`hard-badge ${getStatusBadgeClass()}`}>
              {getStatusText()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="hard-card bg-zinc-900/50">
          <div className="border-b-2 border-zinc-700 bg-zinc-800/50 px-4 py-2">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              TASK INFO
            </h4>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500 uppercase">文件名</span>
              <span className="text-sm font-bold text-white">{fileName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500 uppercase">任务ID</span>
              <div className="flex items-center space-x-2">
                <code 
                  className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 border border-zinc-700 font-mono uppercase cursor-pointer hover:bg-zinc-700 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(taskKey);
                    toast({
                      title: "已复制",
                      description: "任务ID已复制到剪贴板",
                    });
                  }}
                >
                  {taskKey}
                </code>
                <Copy className="h-4 w-4 text-zinc-500 cursor-pointer hover:text-zinc-300" 
                  onClick={() => {
                    navigator.clipboard.writeText(taskKey);
                    toast({
                      title: "已复制", 
                      description: "任务ID已复制到剪贴板",
                    });
                  }}
                />
              </div>
            </div>
            {(status === "pending" || status === "queued") && queuePosition && queuePosition > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500 uppercase">队列位置</span>
                <div className="flex items-center space-x-2">
                  <Badge className="hard-badge border-yellow-600 bg-yellow-950 text-yellow-400">
                    第 {queuePosition} 位
                  </Badge>
                  {queuePosition === 1 && (
                    <span className="text-xs text-green-400 font-medium">下一个处理</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hard-card bg-blue-950/30">
          <div className="border-b-2 border-blue-800 bg-blue-900/50 px-4 py-2">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wide flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              进度 PROGRESS
            </h4>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 border-2 ${progress > 0 ? 'bg-green-500 border-green-600' : 'bg-zinc-700 border-zinc-600'}`} 
                     style={{ borderRadius: '2px' }}></div>
                <span className="text-lg font-bold text-white uppercase tracking-wide">总体进度</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-400">{progress}</span>
                <span className="text-lg text-zinc-500 font-medium">%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="hard-progress h-6">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 border-r-2 border-green-700"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="hard-card bg-zinc-800 p-3">
                <div className="flex items-center justify-center text-sm font-medium text-zinc-300">
                  <Clock className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-zinc-400">{currentStep}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {processedFiles !== undefined && totalFiles !== undefined && (
          <div className="hard-card bg-purple-950/30">
            <div className="border-b-2 border-purple-800 bg-purple-900/50 px-4 py-2">
              <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wide flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                文件处理进度 FILE PROCESSING
              </h4>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white uppercase tracking-wide">文件进度</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-purple-400">{processedFiles}</span>
                  <span className="text-lg text-zinc-500 font-medium"> / {totalFiles}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="hard-progress h-4">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${(processedFiles / totalFiles) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-medium text-zinc-500 uppercase tracking-wide">
                  <span>已处理文件</span>
                  <span>{Math.round((processedFiles / totalFiles) * 100)}% 完成</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="hard-card bg-yellow-950/30">
          <div className="border-b-2 border-yellow-800 bg-yellow-900/50 px-4 py-2">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wide flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              状态信息 STATUS MESSAGE
            </h4>
          </div>
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-900 border-2 border-yellow-700" style={{ borderRadius: '3px' }}>
                <Clock className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-300 leading-relaxed">{message}</p>
                <p className="text-xs text-zinc-500 mt-2 flex items-center font-medium uppercase tracking-wide">
                  <span className="w-2 h-2 bg-green-500 mr-2 border border-green-600" style={{ borderRadius: '1px' }}></span>
                  LAST UPDATE: {new Date().toLocaleTimeString("zh-CN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
