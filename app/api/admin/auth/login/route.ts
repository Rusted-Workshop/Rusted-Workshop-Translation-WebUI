import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    console.log("Admin login attempt for password:", password ? "***" : "empty")

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "密码不能为空",
          error_code: "MISSING_PASSWORD",
          data: null,
        },
        { status: 400 }
      )
    }

    const backendUrl = `${API_BASE_URL}/api/admin/auth/login`
    console.log("Calling backend login at:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      console.error(`Backend login failed with status: ${response.status}`)
      const errorData = await response.json().catch(() => ({}))
      
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "登录失败",
          error_code: errorData.error_code || "LOGIN_ERROR",
          data: null,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("Backend login successful")

    if (data.success && data.data) {
      // 设置cookie
      const cookieStore = await cookies()
      cookieStore.set("admin_token", data.data, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24小时
        path: "/",
      })

      return NextResponse.json(data)
    }

    return NextResponse.json(
      {
        success: false,
        message: "登录响应格式错误",
        error_code: "INVALID_RESPONSE",
        data: null,
      },
      { status: 500 }
    )

  } catch (error) {
    console.error("Admin login API Error:", error)
    
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
