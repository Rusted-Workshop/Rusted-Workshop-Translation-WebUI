import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  try {
    const { taskKey } = await params
    const backendUrl = `${API_BASE_URL}/api/tasks/${taskKey}`
    console.log("Fetching task status from:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Task status response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch task status",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ taskKey: string }> }) {
  try {
    const { taskKey } = await params
    const backendUrl = `${API_BASE_URL}/api/tasks/${taskKey}`
    console.log("Cancelling task at:", backendUrl)

    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Cancel task response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to cancel task",
        error_code: "API_ERROR",
      },
      { status: 500 },
    )
  }
}
