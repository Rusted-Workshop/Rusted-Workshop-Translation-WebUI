"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface ProgressData {
  progress: number
  current_step: string
  processed_files?: number
  total_files?: number
  message: string
  timestamp: string
}

interface StatusData {
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  message: string
  timestamp: string
}

interface ErrorData {
  error_code: string
  message: string
  timestamp: string
}

interface WebSocketMessage {
  type: "progress" | "status" | "error"
  data: ProgressData | StatusData | ErrorData
}

export const useTaskWebSocket = (taskKey: string | null) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [status, setStatus] = useState<string>("")
  const [message, setMessage] = useState("")
  const [processedFiles, setProcessedFiles] = useState<number | undefined>()
  const [totalFiles, setTotalFiles] = useState<number | undefined>()
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const connect = useCallback(() => {
    if (!taskKey) return

    try {
      const wsUrl = `ws://localhost:8000/api/ws/tasks/${taskKey}/ws`
      console.log("Connecting to WebSocket:", wsUrl)

      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("WebSocket connected")
        setIsConnected(true)
        setConnectionError(null)
      }

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          console.log("WebSocket message received:", message)

          switch (message.type) {
            case "progress":
              const progressData = message.data as ProgressData
              setProgress(progressData.progress)
              setCurrentStep(progressData.current_step)
              setMessage(progressData.message)
              setProcessedFiles(progressData.processed_files)
              setTotalFiles(progressData.total_files)
              break

            case "status":
              const statusData = message.data as StatusData
              setStatus(statusData.status)
              setMessage(statusData.message)

              if (statusData.status === "completed") {
                toast({
                  title: "汉化完成",
                  description: statusData.message,
                })
              } else if (statusData.status === "failed") {
                toast({
                  title: "汉化失败",
                  description: statusData.message,
                  variant: "destructive",
                })
              }
              break

            case "error":
              const errorData = message.data as ErrorData
              setConnectionError(errorData.message)
              toast({
                title: "处理错误",
                description: errorData.message,
                variant: "destructive",
              })
              break
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }

      ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason)
        setIsConnected(false)

        // 如果不是正常关闭，尝试重连
        if (event.code !== 1000 && taskKey) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect...")
            connect()
          }, 3000)
        }
      }

      ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        setConnectionError("WebSocket连接错误")
      }
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error)
      setConnectionError("无法建立WebSocket连接")
    }
  }, [taskKey, toast])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      wsRef.current.close(1000, "User disconnected")
      wsRef.current = null
    }

    setIsConnected(false)
  }, [])

  useEffect(() => {
    if (taskKey) {
      connect()
    } else {
      disconnect()
    }

    return () => {
      disconnect()
    }
  }, [taskKey, connect, disconnect])

  return {
    progress,
    currentStep,
    status,
    message,
    processedFiles,
    totalFiles,
    isConnected,
    connectionError,
    reconnect: connect,
  }
}
