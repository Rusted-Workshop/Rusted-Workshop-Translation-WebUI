import { NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      service_name: "Rusted Workshop Translation API",
      api_base_url: API_BASE_URL,
      api_version: "v1",
      websocket_enabled: false,
    },
  })
}
