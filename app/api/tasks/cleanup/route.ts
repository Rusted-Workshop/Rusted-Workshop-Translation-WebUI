import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = searchParams.get("days") || "30"
    const dryRun = searchParams.get("dry_run") || "true"

    const backendUrl = new URL("/api/tasks/cleanup", API_BASE_URL)
    backendUrl.searchParams.set("days", days)
    backendUrl.searchParams.set("dry_run", dryRun)

    console.log("Cleaning up tasks at:", backendUrl.toString())

    const response = await fetch(backendUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Cleanup response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to cleanup tasks",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
