"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdminData } from "@/hooks/use-admin-data"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  const { config, updateConfig, isLoading } = useAdminData()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    max_file_size: config?.max_file_size || 100,
    max_queue_size: config?.max_queue_size || 50,
    system_status: config?.system_status || "online",
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await updateConfig(formData)
      if (success) {
        toast({
          title: "保存成功",
          description: "系统配置已更新",
        })
      } else {
        throw new Error("保存失败")
      }
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载中...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600">配置系统参数和运行状态</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 基础设置 */}
          <Card>
            <CardHeader>
              <CardTitle>基础设置</CardTitle>
              <CardDescription>配置文件上传和队列限制</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max_file_size">最大文件大小 (MB)</Label>
                <Input
                  id="max_file_size"
                  type="number"
                  value={formData.max_file_size}
                  onChange={(e) => setFormData({ ...formData, max_file_size: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_queue_size">最大队列长度</Label>
                <Input
                  id="max_queue_size"
                  type="number"
                  value={formData.max_queue_size}
                  onChange={(e) => setFormData({ ...formData, max_queue_size: Number.parseInt(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card>
            <CardHeader>
              <CardTitle>系统状态</CardTitle>
              <CardDescription>控制系统运行状态</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system_status">系统状态</Label>
                <Select
                  value={formData.system_status}
                  onValueChange={(value) => setFormData({ ...formData, system_status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">正常运行</SelectItem>
                    <SelectItem value="maintenance">维护模式</SelectItem>
                    <SelectItem value="offline">离线状态</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 支持的语言 */}
          <Card>
            <CardHeader>
              <CardTitle>支持的语言</CardTitle>
              <CardDescription>当前系统支持的翻译语言</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {config?.supported_languages?.map((lang) => (
                  <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {lang}
                  </span>
                )) || (
                  <span className="text-gray-500 text-sm">暂无数据</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 翻译风格 */}
          <Card>
            <CardHeader>
              <CardTitle>翻译风格</CardTitle>
              <CardDescription>当前系统支持的翻译风格</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {config?.translation_styles?.map((style) => (
                  <span key={style} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                    {style}
                  </span>
                )) || (
                  <span className="text-gray-500 text-sm">暂无数据</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700">
            {isSaving ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                保存设置
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
