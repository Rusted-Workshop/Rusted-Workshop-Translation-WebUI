import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001"

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  try {
    const { taskKey } = await params
    const backendUrl = `${API_BASE_URL}/v1/tasks/${taskKey}/result-url`

    const resultResponse = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!resultResponse.ok) {
      const message = await parseBackendError(resultResponse)
      return NextResponse.json(
        {
          success: false,
          message,
          error_code: "RESULT_URL_ERROR",
        },
        { status: resultResponse.status },
      )
    }

    const resultPayload = await resultResponse.json()
    const downloadUrl = resultPayload?.download_url as string | undefined

    if (!downloadUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "未获取到下载链接",
          error_code: "NO_DOWNLOAD_URL",
        },
        { status: 500 },
      )
    }

    const fileResponse = await fetch(downloadUrl, {
      method: "GET",
    })

    if (!fileResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `下载文件失败 (${fileResponse.status})`,
          error_code: "DOWNLOAD_ERROR",
        },
        { status: fileResponse.status },
      )
    }

    const arrayBuffer = await fileResponse.arrayBuffer()
    const contentType = fileResponse.headers.get("content-type") || "application/octet-stream"
    const contentDisposition =
      fileResponse.headers.get("content-disposition") ||
      `attachment; filename="${taskKey}.translated.rwmod"`

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
        "Content-Length": String(arrayBuffer.byteLength),
      },
    })
  } catch (error) {
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
