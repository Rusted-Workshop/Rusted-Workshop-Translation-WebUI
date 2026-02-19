import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: [],
    message: "当前后端未启用任务日志接口",
  })
}
