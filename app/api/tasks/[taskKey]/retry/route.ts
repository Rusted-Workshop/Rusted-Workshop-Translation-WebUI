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

async function retryTask(params: Promise<{ taskKey: string }>) {
  try {
    const { taskKey } = await params
    const backendUrl = `${API_BASE_URL}/v1/tasks/${taskKey}/retry`

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      data: normalizeTask(task),
      message: "任务已重试",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : "Failed to retry task",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  return retryTask(params)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  return retryTask(params)
}
