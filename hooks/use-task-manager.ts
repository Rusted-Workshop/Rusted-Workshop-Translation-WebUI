"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import { POLL_INTERVAL } from "@/constants"
import type { TaskStatus } from "@/types"
import { useI18n } from "@/components/i18n-provider"

export const useTaskManager = () => {
  const [taskKey, setTaskKey] = useState<string>("")
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [, setTargetLanguage] = useState<string>("")
  const { toast } = useToast()
  const { t } = useI18n()

  const createTask = async (file: File, translateStyle: string, targetLanguage: string = "zh-CN") => {
    setIsUploading(true)
    try {
      const result = await api.createTask(file, translateStyle, targetLanguage)

      if (!result.success) {
        throw new Error(result.message || t("taskManager.uploadFailed"))
      }

      setTaskKey(result.data)
      setFileName(file.name)
      setTargetLanguage(targetLanguage)

      toast({
        title: t("taskManager.uploadSuccess"),
        description: t("taskManager.uploadSuccessDescription"),
      })
    } catch (error) {
      toast({
        title: t("taskManager.uploadFailed"),
        description: error instanceof Error ? error.message : t("taskManager.retryLater"),
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const restoreTask = async (taskId: string) => {
    setIsRestoring(true)
    try {
      const result = await api.getTaskStatus(taskId)

      if (!result.success) {
        throw new Error(result.message || t("taskManager.taskNotFound"))
      }

      setTaskKey(taskId)
      setTaskStatus(result.data)
      setFileName(result.data.filename || `task_${taskId}`)
      setTargetLanguage(result.data.target_language || "")

      toast({
        title: t("taskManager.restoreSuccess"),
        description: t("taskManager.restoreSuccessDescription", { taskId }),
      })
    } catch (error) {
      toast({
        title: t("taskManager.restoreFailed"),
        description: error instanceof Error ? error.message : t("taskManager.cannotFindTask"),
        variant: "destructive",
      })
    } finally {
      setIsRestoring(false)
    }
  }

  const checkTaskStatus = useCallback(async () => {
    if (!taskKey) return

    try {
      const result = await api.getTaskStatus(taskKey)

      if (!result.success) {
        return
      }

      setTaskStatus(result.data)
      if (result.data.target_language) {
        setTargetLanguage(result.data.target_language)
      }

      if (result.data.status === "completed") {
        toast({
          title: t("taskManager.translationCompleted"),
          description: t("taskManager.translationCompletedDescription"),
        })
      } else if (result.data.status === "failed") {
        toast({
          title: t("taskManager.translationFailed"),
          description: result.data.message || t("taskManager.processingError"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to check task status:", error)
    }
  }, [taskKey, toast, t])

  const downloadResult = async () => {
    if (!taskKey) return

    try {
      const downloadUrl = await api.getDownloadResultUrl(taskKey)
      window.location.assign(downloadUrl)

      toast({
        title: t("taskManager.downloadSuccess"),
        description: t("taskManager.downloadStarted"),
      })
    } catch (error) {
      toast({
        title: t("taskManager.downloadFailed"),
        description: error instanceof Error ? error.message : t("taskManager.retryLater"),
        variant: "destructive",
      })
    }
  }

  const cancelTask = async () => {
    if (!taskKey) return

    try {
      const result = await api.cancelTask(taskKey)

      if (result.success) {
        reset()
        toast({
          title: t("taskManager.taskCancelled"),
          description: t("taskManager.taskCancelledDescription"),
        })
      }
    } catch (error) {
      toast({
        title: t("taskManager.cancelFailed"),
        description: t("taskManager.retryLater"),
        variant: "destructive",
      })
    }
  }

  const retryTask = async () => {
    if (!taskKey) return

    try {
      const result = await api.retryTask(taskKey)

      if (!result.success) {
        throw new Error(result.message || t("taskManager.retryFailed"))
      }

      toast({
        title: t("taskManager.retrySuccess"),
        description: t("taskManager.retrySuccessDescription"),
      })
      checkTaskStatus()
    } catch (error) {
      toast({
        title: t("taskManager.retryFailed"),
        description: error instanceof Error ? error.message : t("taskManager.retryLater"),
        variant: "destructive",
      })
    }
  }

  const reset = () => {
    setTaskKey("")
    setTaskStatus(null)
    setFileName("")
    setTargetLanguage("")
  }

  useEffect(() => {
    if (taskKey && taskStatus?.status !== "completed" && taskStatus?.status !== "failed") {
      const interval = setInterval(checkTaskStatus, POLL_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [taskKey, taskStatus?.status, checkTaskStatus])

  return {
    taskKey,
    taskStatus,
    fileName,
    isUploading,
    isRestoring,
    createTask,
    restoreTask,
    downloadResult,
    cancelTask,
    retryTask,
    reset,
  }
}
