import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "50"
    const status = searchParams.get("status")
    const language = searchParams.get("language")

    const backendUrl = new URL("/api/admin/tasks", API_BASE_URL)
    backendUrl.searchParams.set("page", page)
    backendUrl.searchParams.set("limit", limit)
    if (status) backendUrl.searchParams.set("status", status)
    if (language) backendUrl.searchParams.set("language", language)

    console.log("Fetching admin tasks from:", backendUrl.toString())
    console.log("Auth header present:", !!authHeader)

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      console.error(`Backend responded with status: ${response.status}`)
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            success: false,
            message: "认证失败，请重新登录",
            error_code: "AUTH_ERROR",
            data: [],
          },
          { status: response.status }
        )
      }

      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "获取任务列表失败",
          error_code: errorData.error_code || "FETCH_ERROR",
          data: [],
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Admin tasks response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin tasks API Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "网络错误，请检查后端服务是否正常运行",
        error_code: "NETWORK_ERROR",
        data: [],
      },
      { status: 500 }
    )
  }
}
