import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  try {
    const { taskKey } = await params
    const backendUrl = `${API_BASE_URL}/api/tasks/${taskKey}/download`
    console.log("Downloading from:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "GET",
    })

    if (!response.ok) {
      console.error("Download failed with status:", response.status)
      return NextResponse.json(
        {
          success: false,
          message: "Download failed",
          error_code: "DOWNLOAD_ERROR",
        },
        { status: response.status },
      )
    }

    // 获取文件内容
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 获取原始响应头
    const contentType = response.headers.get("content-type") || "application/octet-stream"
    const contentDisposition =
      response.headers.get("content-disposition") || 'attachment; filename="translated_mod.rwmod"'

    console.log("Download successful, file size:", buffer.length)

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Download API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Download failed",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
