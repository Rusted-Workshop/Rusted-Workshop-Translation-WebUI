import type { ApiResponse, TaskStatus } from "@/types"

export const api = {
  async createTask(file: File, translateStyle: string, targetLanguage: string = "zh-CN"): Promise<ApiResponse<string>> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`/api/tasks?target_language=${targetLanguage}&translate_style=${translateStyle}`, {
      method: "POST",
      body: formData,
    })

    return response.json()
  },

  async getTaskStatus(taskKey: string): Promise<ApiResponse<TaskStatus>> {
    const response = await fetch(`/api/tasks/${taskKey}`)
    return response.json()
  },

  async cancelTask(taskKey: string): Promise<ApiResponse> {
    const response = await fetch(`/api/tasks/${taskKey}`, {
      method: "DELETE",
    })
    return response.json()
  },

  async downloadResult(taskKey: string): Promise<Response> {
    return fetch(`/api/tasks/${taskKey}/download`)
  },

  // 新增：获取任务日志
  async getTaskLogs(taskKey: string, limit?: number): Promise<ApiResponse<any[]>> {
    const url = new URL(`/api/tasks/${taskKey}/logs`, window.location.origin)
    if (limit) url.searchParams.set("limit", limit.toString())

    const response = await fetch(url.toString())
    return response.json()
  },

  // 新增：重试任务
  async retryTask(taskKey: string): Promise<ApiResponse> {
    const response = await fetch(`/api/tasks/${taskKey}/retry`)
    return response.json()
  },

  // 新增：获取任务列表
  async getTasks(params?: {
    page?: number
    limit?: number
    status?: string
    language?: string
  }): Promise<ApiResponse<any[]>> {
    const url = new URL("/api/tasks", window.location.origin)
    if (params?.page) url.searchParams.set("page", params.page.toString())
    if (params?.limit) url.searchParams.set("limit", params.limit.toString())
    if (params?.status) url.searchParams.set("status", params.status)
    if (params?.language) url.searchParams.set("language", params.language)

    const response = await fetch(url.toString())
    return response.json()
      },

    // 新增：批量取消任务
  async batchCancelTasks(taskKeys: string[]): Promise<ApiResponse> {
    const response = await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskKeys),
    })
    return response.json()
  },

  // 新增：清理旧任务
  async cleanupTasks(days?: number, dryRun?: boolean): Promise<ApiResponse> {
    const url = new URL("/api/tasks/cleanup", window.location.origin)
    if (days) url.searchParams.set("days", days.toString())
    if (dryRun !== undefined) url.searchParams.set("dry_run", dryRun.toString())

    const response = await fetch(url.toString(), {
      method: "POST",
    })
    return response.json()
  },

  // 新增：获取公开配置
  async getPublicConfig(): Promise<ApiResponse<any>> {
    const response = await fetch("/api/config/public")
    return response.json()
  },

  // 新增：获取支持的语言
  async getSupportedLanguages(): Promise<ApiResponse<string[]>> {
    const response = await fetch("/api/config/languages")
    return response.json()
  },
}

