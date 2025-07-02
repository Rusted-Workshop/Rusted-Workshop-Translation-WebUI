import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  try {
    const { taskKey } = await params
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get("limit") || "100"

    const backendUrl = new URL(`/api/tasks/${taskKey}/logs`, API_BASE_URL)
    backendUrl.searchParams.set("limit", limit)

    console.log("Fetching task logs from:", backendUrl.toString())

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
    console.log("Task logs response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch task logs",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
