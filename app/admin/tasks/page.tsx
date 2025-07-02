"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { TaskTable } from "@/components/admin/task-table"
import { useAdminData } from "@/hooks/use-admin-data"

export default function AdminTasksPage() {
  const { tasks, isLoading, error, refetch } = useAdminData()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">任务管理</h1>
            <p className="text-gray-600">管理和监控所有翻译任务</p>
          </div>
        </div>

        <TaskTable 
          tasks={tasks} 
          isLoading={isLoading}
          error={error}
          onRefresh={refetch.tasks}
        />
      </div>
    </AdminLayout>
  )
}
