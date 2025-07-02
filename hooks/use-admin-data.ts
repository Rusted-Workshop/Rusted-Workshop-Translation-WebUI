"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/admin-api"
import type { AdminConfig, TaskInfo } from "@/types/admin"

export const useAdminData = () => {
  const [config, setConfig] = useState<AdminConfig | null>(null)
  const [tasks, setTasks] = useState<TaskInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchConfig = async (retryCount = 0) => {
    try {
      console.log("Fetching admin config...")
      const result = await adminApi.getConfig()
      console.log("Config result:", result)
      
      if (result.success && result.data) {
        setConfig(result.data)
        setError(null)
      } else {
        console.error("Failed to fetch config:", result.message)
        if (retryCount < 2) {
          console.log(`Retrying config fetch (${retryCount + 1}/3)...`)
          setTimeout(() => fetchConfig(retryCount + 1), 1000)
        } else {
          setError(result.message || "获取配置失败")
        }
      }
    } catch (error) {
      console.error("Failed to fetch config:", error)
      if (retryCount < 2) {
        setTimeout(() => fetchConfig(retryCount + 1), 1000)
      } else {
        const errorMsg = error instanceof Error ? error.message : "网络错误"
        setError(errorMsg)
      }
    }
  }

  const fetchTasks = async (retryCount = 0) => {
    try {
      console.log("Fetching admin tasks...")
      const result = await adminApi.getAllTasks()
      console.log("Tasks result:", result)
      
      if (result.success && result.data) {
        // 后端返回的数据结构是 { tasks: [], pagination: {} }
        // 映射后端字段名到前端期望的字段名
        const mappedTasks = (result.data.tasks || []).map((task: any) => ({
          id: task.task_key,
          filename: task.original_filename,
          status: task.status,
          created_at: task.created_at,
          completed_at: task.completed_at,
          file_size: task.file_size || 0,
          translation_style: 'auto', // 暂时使用默认值，数据库中暂无此字段
          progress: task.progress || 0,
          error_message: task.error_message
        }))
        setTasks(mappedTasks)
        setError(null)
      } else {
        console.error("Failed to fetch tasks:", result.message)
        if (retryCount < 2) {
          console.log(`Retrying tasks fetch (${retryCount + 1}/3)...`)
          setTimeout(() => fetchTasks(retryCount + 1), 1000)
        } else {
          setError(result.message || "获取任务列表失败")
        }
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      if (retryCount < 2) {
        setTimeout(() => fetchTasks(retryCount + 1), 1000)
      } else {
        const errorMsg = error instanceof Error ? error.message : "网络错误"
        setError(errorMsg)
      }
    }
  }

  const updateConfig = async (newConfig: Partial<AdminConfig>) => {
    try {
      const result = await adminApi.updateConfig(newConfig)
      if (result.success) {
        await fetchConfig()
        toast({
          title: "配置更新成功",
          description: "系统配置已更新",
        })
        return true
      } else {
        console.error("Failed to update config:", result.message)
        toast({
          title: "配置更新失败",
          description: result.message || "请稍后重试",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to update config:", error)
      toast({
        title: "配置更新失败",
        description: error instanceof Error ? error.message : "网络错误",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      console.log("Starting admin data fetch...")
      
      // 并行获取所有数据
      await Promise.allSettled([
        fetchConfig(), 
        fetchTasks()
      ])
      
      setIsLoading(false)
      console.log("Admin data fetch completed")
    }

    fetchData()

    // 定期刷新数据
    const interval = setInterval(() => {
      console.log("Refreshing admin data...")
      fetchTasks()
    }, 10000) // 10秒刷新一次

    return () => {
      console.log("Clearing admin data refresh interval")
      clearInterval(interval)
    }
  }, [])

  return {
    config,
    tasks,
    isLoading,
    error,
    refetch: {
      config: fetchConfig,
      tasks: fetchTasks,
    },
    updateConfig,
  }
}
