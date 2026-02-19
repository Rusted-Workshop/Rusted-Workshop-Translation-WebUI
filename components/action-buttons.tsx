"use client"

import { Button } from "@/components/ui/button"
import { Download, RotateCcw, Copy, Settings, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { TaskStatus } from "@/types"

interface ActionButtonsProps {
  taskKey: string
  taskStatus: TaskStatus
  onDownload: () => void
  onReset: () => void
  onCancel: () => void
  onRetry?: () => void
}

export const ActionButtons = ({ taskKey, taskStatus, onDownload, onReset, onCancel, onRetry }: ActionButtonsProps) => {
  const { toast } = useToast()

  const copyTaskId = () => {
    navigator.clipboard.writeText(taskKey)
    toast({
      title: "已复制",
      description: "任务ID已复制到剪贴板",
    })
  }

  const getStatusIcon = () => {
    switch (taskStatus.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Settings className="h-4 w-4 text-blue-400" />
    }
  }

  const getStatusText = () => {
    switch (taskStatus.status) {
      case "completed":
        return "任务完成"
      case "failed":
        return "任务失败"
      default:
        return "任务控制 Task Control"
    }
  }

  if (taskStatus.status === "completed") {
    return (
      <div className="hard-card bg-green-950/30">
        <div className="border-b-2 border-green-800 bg-green-900/50 px-4 py-2">
          <h4 className="text-sm font-bold text-green-400 uppercase tracking-wide flex items-center">
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex space-x-3">
            <Button 
              onClick={onDownload} 
              className="flex-1 bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 text-white font-bold uppercase tracking-wide"
              style={{ borderRadius: '4px' }}
            >
              <Download className="h-4 w-4 mr-2" />
              下载文件
            </Button>
            <Button 
              onClick={onReset} 
              className="border-2 border-green-600 bg-green-950 text-green-400 hover:bg-green-900 hover:border-green-500 font-bold uppercase tracking-wide"
              style={{ borderRadius: '4px' }}
            >
              新任务
            </Button>
          </div>
          <Button 
            onClick={copyTaskId} 
            className="w-full border-2 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 text-xs font-bold uppercase tracking-wide"
            style={{ borderRadius: '4px' }}
          >
            <Copy className="h-3 w-3 mr-2" />
            复制任务ID
          </Button>
        </div>
      </div>
    )
  }

  if (taskStatus.status === "failed") {
    return (
      <div className="hard-card bg-red-950/30">
        <div className="border-b-2 border-red-800 bg-red-900/50 px-4 py-2">
          <h4 className="text-sm font-bold text-red-400 uppercase tracking-wide flex items-center">
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </h4>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex space-x-3">
            <Button 
              onClick={onReset} 
              className="flex-1 bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 text-white font-bold uppercase tracking-wide"
              style={{ borderRadius: '4px' }}
            >
              重新开始
            </Button>
            {onRetry && (
              <Button 
                onClick={onRetry} 
                className="border-2 border-blue-600 bg-blue-950 text-blue-400 hover:bg-blue-900 hover:border-blue-500 font-bold uppercase tracking-wide"
                style={{ borderRadius: '4px' }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重试
              </Button>
            )}
          </div>
          <Button 
            onClick={copyTaskId} 
            className="w-full border-2 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 text-xs font-bold uppercase tracking-wide"
            style={{ borderRadius: '4px' }}
          >
            <Copy className="h-3 w-3 mr-2" />
            复制任务ID
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="hard-card bg-blue-950/30">
      <div className="border-b-2 border-blue-800 bg-blue-900/50 px-4 py-2">
        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wide flex items-center">
          {getStatusIcon()}
          <span className="ml-2">{getStatusText()}</span>
        </h4>
      </div>
      <div className="p-4 space-y-3">
        <Button 
          onClick={onCancel} 
          className="w-full border-2 border-red-600 bg-red-950 text-red-400 hover:bg-red-900 hover:border-red-500 font-bold uppercase tracking-wide"
          style={{ borderRadius: '4px' }}
        >
          取消任务
        </Button>
        <Button 
          onClick={copyTaskId} 
          className="w-full border-2 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 text-xs font-bold uppercase tracking-wide"
          style={{ borderRadius: '4px' }}
        >
          <Copy className="h-3 w-3 mr-2" />
          复制任务ID
        </Button>
      </div>
    </div>
  )
}