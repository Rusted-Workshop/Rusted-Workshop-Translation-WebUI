import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

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
          message: "未找到上传的文件",
          error_code: "NO_FILE",
        },
        { status: 400 },
      )
    }

    // 创建新的 FormData 并添加参数
    const backendFormData = new FormData()
    backendFormData.append("file", file)

    // 构建后端 URL
    const backendUrl = new URL("/api/tasks/", API_BASE_URL)
    backendUrl.searchParams.set("target_language", targetLanguage)
    backendUrl.searchParams.set("translate_style", translateStyle)

    console.log("Sending request to:", backendUrl.toString())

    const response = await fetch(backendUrl.toString(), {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Backend error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      throw new Error(`后端服务错误 (${response.status}): ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Backend response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
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
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"
    const status = searchParams.get("status")
    const language = searchParams.get("language")

    const backendUrl = new URL("/api/tasks/", API_BASE_URL)
    backendUrl.searchParams.set("page", page)
    backendUrl.searchParams.set("limit", limit)
    if (status) backendUrl.searchParams.set("status", status)
    if (language) backendUrl.searchParams.set("language", language)

    console.log("Fetching tasks from:", backendUrl.toString())

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Tasks list response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch tasks",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const taskKeys = await request.json()
    const backendUrl = `${API_BASE_URL}/api/tasks/`

    console.log("Batch cancelling tasks:", taskKeys)

    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskKeys),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Batch cancel response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to cancel tasks",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
