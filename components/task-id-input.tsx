"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2, Terminal } from "lucide-react"

interface TaskIdInputProps {
  onTaskRestore: (taskId: string) => void
  isLoading?: boolean
}

export const TaskIdInput = ({ onTaskRestore, isLoading = false }: TaskIdInputProps) => {
  const [taskId, setTaskId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskId.trim()) {
      onTaskRestore(taskId.trim())
    }
  }

  return (
    <div className="hard-card">
      <div className="border-b-2 border-green-800 bg-green-950/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-900 border-2 border-green-700" style={{ borderRadius: '3px' }}>
            <Terminal className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">任务恢复</h3>
            <p className="text-sm text-zinc-500 font-medium">TASK RESTORE</p>
          </div>
        </div>
        <p className="text-sm text-zinc-400 mt-3 font-medium">输入任务ID来查看和恢复之前的翻译任务进度</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="taskId" className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
              任务ID
            </Label>
            <Input
              id="taskId"
              type="text"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              placeholder="XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX"
              disabled={isLoading}
              className="border-2 border-zinc-700 focus:border-green-500 bg-zinc-800 text-white font-mono text-sm placeholder:text-zinc-500"
              style={{ borderRadius: '4px' }}
            />
          </div>

          <Button
            type="submit"
            disabled={!taskId.trim() || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 border-2 border-green-700 hover:border-green-800 text-white font-bold uppercase tracking-wide"
            style={{ borderRadius: '4px' }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                查询中...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                查询任务
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}