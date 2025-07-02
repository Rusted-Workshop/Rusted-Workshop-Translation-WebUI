import type { ApiResponse } from "@/types"
import type { AdminLoginRequest, AdminConfig, TaskInfo } from "@/types/admin"

// 获取认证头部
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const adminApi = {
  async login(credentials: AdminLoginRequest): Promise<ApiResponse<string>> {
    try {
      console.log("Making login request to /api/admin/auth/login")
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      console.log("Login response status:", response.status)
      const data = await response.json()
      console.log("Login response data:", data)

      // 即使HTTP状态码不是200，也要检查响应体
      if (!response.ok && !data.success) {
        return {
          success: false,
          message: data.message || `HTTP错误 ${response.status}`,
          error_code: data.error_code || "HTTP_ERROR",
          data: "",
        }
      }

      return data
    } catch (error) {
      console.error("Admin login fetch error:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "网络连接失败",
        error_code: "FETCH_ERROR",
        data: "",
      }
    }
      },

    async getConfig(): Promise<ApiResponse<AdminConfig>> {
    try {
      console.log("Fetching admin config...")
      const response = await fetch("/api/admin/config", {
        headers: getAuthHeaders(),
      })
      
      console.log("Config response status:", response.status)
      const data = await response.json()
      console.log("Config response data:", data)
      
      return data
    } catch (error) {
      console.error("Failed to fetch config:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "获取配置失败",
        error_code: "FETCH_ERROR",
        data: {} as AdminConfig,
      }
    }
  },

  // 修改：使用新的管理员任务接口
  async getAllTasks(params?: {
    page?: number
    limit?: number
    status?: string
    language?: string
  }): Promise<ApiResponse<{ tasks: TaskInfo[], pagination: any }>> {
    try {
      const url = new URL("/api/admin/tasks", window.location.origin)

      if (params?.page) url.searchParams.set("page", params.page.toString())
      if (params?.limit) url.searchParams.set("limit", params.limit.toString())
      if (params?.status) url.searchParams.set("status", params.status)
      if (params?.language) url.searchParams.set("language", params.language)

      console.log("Fetching admin tasks from:", url.toString())
      const response = await fetch(url.toString(), {
        headers: getAuthHeaders(),
      })
      
      console.log("Tasks response status:", response.status)
      const data = await response.json()
      console.log("Tasks response data:", data)
      
      return data
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "获取任务列表失败",
        error_code: "FETCH_ERROR",
        data: { tasks: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } },
      }
    }
  },

  async updateConfig(config: Partial<AdminConfig>): Promise<ApiResponse> {
    try {
      console.log("Updating admin config...")
      const response = await fetch("/api/admin/config", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(config),
      })
      
      console.log("Update config response status:", response.status)
      const data = await response.json()
      console.log("Update config response data:", data)
      
      return data
    } catch (error) {
      console.error("Failed to update config:", error)
      return {
        success: false,
        message: error instanceof Error ? error.message : "更新配置失败",
        error_code: "FETCH_ERROR",
        data: null,
      }
    }
  },
}
