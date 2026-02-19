import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001"

type BackendTask = {
  task_id: string
  status: string
  progress?: number
  total_files?: number
  processed_files?: number
  error_message?: string | null
  created_at?: string
  completed_at?: string | null
}

function mapStatus(status: string): "pending" | "processing" | "completed" | "failed" | "cancelled" {
  switch (status) {
    case "pending":
      return "pending"
    case "preparing":
    case "translating":
    case "finalizing":
      return "processing"
    case "completed":
      return "completed"
    case "failed":
      return "failed"
    default:
      return "pending"
  }
}

function getTaskMessage(task: BackendTask): string {
  if (task.status === "failed") {
    return task.error_message || "任务处理失败"
  }
  if (task.status === "completed") {
    return "任务处理完成"
  }
  if (task.status === "preparing") {
    return "正在准备文件"
  }
  if (task.status === "translating") {
    return "正在翻译文件"
  }
  if (task.status === "finalizing") {
    return "正在打包结果"
  }
  return "任务等待处理中"
}

function normalizeTask(task: BackendTask) {
  return {
    task_key: task.task_id,
    status: mapStatus(task.status),
    progress: Math.round((task.progress || 0) * 100) / 100,
    message: getTaskMessage(task),
    total_files: task.total_files || 0,
    processed_files: task.processed_files || 0,
    created_at: task.created_at,
    completed_at: task.completed_at || null,
    error_message: task.error_message || null,
  }
}

async function parseBackendError(response: Response): Promise<string> {
  try {
    const payload = await response.json()
    if (payload?.detail?.message) {
      return payload.detail.message
    }
    if (payload?.message) {
      return payload.message
    }
  } catch {
    // ignore json parsing failure
  }
  return `后端服务错误 (${response.status})`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const searchParams = request.nextUrl.searchParams
    const targetLanguage = searchParams.get("target_language") || "zh-CN"
    const translateStyle = searchParams.get("translate_style") || "auto"

    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "未找到上传的文件",
          error_code: "NO_FILE",
        },
        { status: 400 },
      )
    }

    const backendFormData = new FormData()
    backendFormData.append("file", file)
    backendFormData.append("target_language", targetLanguage)
    backendFormData.append("translate_style", translateStyle)

    const backendUrl = `${API_BASE_URL}/v1/tasks`
    const response = await fetch(backendUrl, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      const message = await parseBackendError(response)
      return NextResponse.json(
        {
          success: false,
          data: null,
          message,
          error_code: "BACKEND_ERROR",
        },
        { status: response.status },
      )
    }

    const task = (await response.json()) as BackendTask

    return NextResponse.json({
      success: true,
      data: task.task_id,
      task: normalizeTask(task),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : "Internal server error",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "10")

    const backendUrl = new URL(`${API_BASE_URL}/v1/tasks`)
    backendUrl.searchParams.set("limit", String(limit))
    backendUrl.searchParams.set("offset", String(Math.max(0, (page - 1) * limit)))

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const message = await parseBackendError(response)
      return NextResponse.json(
        {
          success: false,
          data: [],
          message,
          error_code: "BACKEND_ERROR",
        },
        { status: response.status },
      )
    }

    const data = (await response.json()) as BackendTask[]
    const tasks = Array.isArray(data) ? data.map(normalizeTask) : []

    return NextResponse.json({
      success: true,
      data: tasks,
      page,
      limit,
      total: tasks.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : "Failed to fetch tasks",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const taskKeys = (await request.json()) as string[]
    if (!Array.isArray(taskKeys)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "请求体必须是任务ID数组",
          error_code: "INVALID_PAYLOAD",
        },
        { status: 400 },
      )
    }

    const results = await Promise.all(
      taskKeys.map(async (taskKey) => {
        const response = await fetch(`${API_BASE_URL}/v1/tasks/${taskKey}`, {
          method: "DELETE",
        })
        return {
          taskKey,
          ok: response.ok,
          status: response.status,
        }
      }),
    )

    const successList = results.filter((item) => item.ok).map((item) => item.taskKey)
    const failedList = results.filter((item) => !item.ok)

    return NextResponse.json(
      {
        success: failedList.length === 0,
        data: {
          cancelled: successList,
          failed: failedList,
        },
        message: failedList.length === 0 ? "批量取消成功" : "部分任务取消失败",
      },
      { status: failedList.length === 0 ? 200 : 207 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : "Failed to cancel tasks",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
