export interface AdminLoginRequest {
  password: string
}



export interface AdminConfig {
  max_file_size: number
  max_queue_size: number
  supported_languages: string[]
  translation_styles: string[]
  system_status: "online" | "maintenance" | "offline"
  message?: string
}

export interface TaskInfo {
  id: string
  filename: string
  status: string
  created_at: string
  completed_at?: string
  file_size: number
  translation_style: string
  progress?: number
  error_message?: string
}
