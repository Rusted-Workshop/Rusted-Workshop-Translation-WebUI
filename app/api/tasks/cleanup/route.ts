import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      message: "当前后端未启用任务清理接口",
      error_code: "NOT_IMPLEMENTED",
    },
    { status: 501 },
  )
}
