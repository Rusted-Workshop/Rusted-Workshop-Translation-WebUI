export interface TaskStatus {
  task_key?: string // 任务ID
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  progress?: number
  message?: string
  queue_position?: number
  estimated_time?: number
  estimated_remaining?: string
  filename?: string
  total_files?: number
  processed_files?: number
  created_at?: string
  started_at?: string | null
  completed_at?: string | null
  error_message?: string | null
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error_code?: string
}

export interface TranslationStyle {
  value: string
  label: string
  description: string
}
