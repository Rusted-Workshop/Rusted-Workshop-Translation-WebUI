import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const backendUrl = `${API_BASE_URL}/api/admin/config`

    console.log("Fetching admin config from:", backendUrl)
    console.log("Auth header present:", !!authHeader)

    const response = await fetch(backendUrl, {
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
            data: null,
          },
          { status: response.status }
        )
      }

      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "获取配置信息失败",
          error_code: errorData.error_code || "FETCH_ERROR",
          data: null,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Admin config response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin config API Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "网络错误，请检查后端服务是否正常运行",
        error_code: "NETWORK_ERROR",
        data: null,
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const authHeader = request.headers.get("authorization")
    const backendUrl = `${API_BASE_URL}/api/admin/config`

    console.log("Updating admin config at:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error(`Backend responded with status: ${response.status}`)
      
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            success: false,
            message: "认证失败，请重新登录",
            error_code: "AUTH_ERROR",
            data: null,
          },
          { status: response.status }
        )
      }

      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "配置更新失败",
          error_code: errorData.error_code || "UPDATE_ERROR",
          data: null,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Admin config update response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin config update API Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "网络错误，请检查后端服务是否正常运行",
        error_code: "NETWORK_ERROR",
        data: null,
      },
      { status: 500 }
    )
  }
}
