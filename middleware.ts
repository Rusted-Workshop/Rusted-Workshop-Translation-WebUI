import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 检查是否访问管理页面
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("Admin route accessed:", request.nextUrl.pathname)
    
    // 如果是登录页面，直接放行
    if (request.nextUrl.pathname === "/admin/login") {
      console.log("Admin login page, allowing access")
      return NextResponse.next()
    }

    // 检查是否有管理员token
    const token = request.cookies.get("admin_token")
    console.log("Admin token from cookies:", token ? "present" : "missing")

    if (!token || !token.value) {
      console.log("No admin token found, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    console.log("Admin token found, allowing access")
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
