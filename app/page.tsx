"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Loader2, FileText, Settings, FileSearch } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TranslationStyleSelector } from "@/components/translation-style-selector"
import { LanguageSelector } from "@/components/language-selector"
import { FileUpload } from "@/components/file-upload"

import { ActionButtons } from "@/components/action-buttons"
import { TaskIdInput } from "@/components/task-id-input"
import { RealtimeProgress } from "@/components/realtime-progress"
import { useTaskManager } from "@/hooks/use-task-manager"
import { useTaskWebSocket } from "@/hooks/use-task-websocket"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

const targetLanguages = [
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁体中文" },
  { value: "ja", label: "日语" },
  { value: "ko", label: "韩语" },
  { value: "en", label: "英语" },
  { value: "ru", label: "俄语" },
  { value: "de", label: "德语" },
  { value: "fr", label: "法语" },
  { value: "es", label: "西班牙语" },
  { value: "it", label: "意大利语" },
  { value: "pt", label: "葡萄牙语" },
  { value: "ar", label: "阿拉伯语" },
  { value: "hi", label: "印地语" },
  { value: "nl", label: "荷兰语" },
  { value: "pl", label: "波兰语" },
  { value: "ro", label: "罗马尼亚语" },
  { value: "sv", label: "瑞典语" },
  { value: "tr", label: "土耳其语" },
  { value: "uk", label: "乌克兰语" },
  { value: "vi", label: "越南语" },
]

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [translationStyle, setTranslationStyle] = useState("auto")
  const [activeTab, setActiveTab] = useState("upload")
  const [targetLanguage, setTargetLanguage] = useState(targetLanguages[0].value)

  const {
    taskKey,
    taskStatus,
    fileName,
    isUploading,
    isRestoring,
    createTask,
    restoreTask,
    downloadResult,
    cancelTask,
    retryTask,
    reset,
  } = useTaskManager()

  const {
    isConnected,
    progress,
    currentStep,
    message: wsMessage,
    processedFiles,
    totalFiles,
    status: wsStatus,
    connectionError,
  } = useTaskWebSocket(taskKey)

  const handleUpload = () => {
    if (!file) return
    createTask(file, translationStyle, targetLanguage)
    setActiveTab("upload")
  }

  const handleTaskRestore = async (taskId: string) => {
    try {
      await restoreTask(taskId)
      // 任务恢复成功后，保持在当前的 restore 标签页，让用户看到查询结果
      // setActiveTab("restore") // 实际上已经在 restore 标签页了，无需切换
    } catch (error) {
      console.error("Failed to restore task:", error)
    }
  }

  const handleReset = () => {
    setFile(null)
    setTranslationStyle("auto")
    reset()
    setActiveTab("upload")
  }

  const handleDownload = () => {
    downloadResult(fileName)
  }

  // 使用WebSocket状态优先，回退到HTTP轮询状态
  const currentStatus = wsStatus || taskStatus?.status || ""
  const currentMessage = wsMessage || taskStatus?.message || ""

  return (
    <div className="min-h-screen blueprint-grid">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">铁锈工坊 - AI汉化</h2>
            <p className="text-lg text-gray-600">开放测试</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>汉化模组</span>
              </TabsTrigger>
              <TabsTrigger value="restore" className="flex items-center space-x-2">
                <FileSearch className="h-4 w-4" />
                <span>查找任务</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              {!taskKey ? (
                <div className="hard-card">
                  <div className="border-b-2 border-green-200 bg-green-50/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 border-2 border-green-300" style={{ borderRadius: '3px' }}>
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">模组汉化</h3>
                          <p className="text-sm text-gray-600 font-medium">MOD TRANSLATION</p>
                        </div>
                      </div>
                      <Link href="/admin/login">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 border-2 border-transparent hover:border-gray-300" style={{ borderRadius: '3px' }}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 font-medium">上传模组文件, 全自动汉化</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* 汉化风格选择 */}
                    <Label className="text-base font-medium">汉化风格</Label>
                    <div
                      key={"auto"}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md w-full ${
                        translationStyle === "auto"
                          ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-sm"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setTranslationStyle("auto")}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            translationStyle === "auto" 
                              ? "border-green-500 bg-gradient-to-br from-green-400 to-green-600" 
                              : "border-gray-300"
                          }`}
                        >
                          {translationStyle === "auto" && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">智能识别</h3>
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">推荐</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">AI 分析模组文件原风格</p>
                        </div>
                      </div>
                    </div>
                    <TranslationStyleSelector value={translationStyle} onChange={setTranslationStyle} />

                    <LanguageSelector 
                      value={targetLanguage} 
                      onChange={setTargetLanguage} 
                      languages={targetLanguages}
                    />

                    <FileUpload file={file} onFileSelect={setFile} onFileRemove={() => setFile(null)} />

                    <Button
                      onClick={handleUpload}
                      disabled={!file || isUploading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          上传中...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          开始汉化
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 统一使用 RealtimeProgress 显示所有状态 */}
                  {taskStatus ? (
                    <RealtimeProgress
                      taskKey={taskKey}
                      fileName={fileName}
                      progress={isConnected ? progress : (taskStatus.progress || 0)}
                      currentStep={isConnected ? currentStep : "轮询状态中..."}
                      message={isConnected ? currentMessage : (taskStatus.message || "正在轮询获取任务状态...")}
                      processedFiles={isConnected ? processedFiles : taskStatus.processed_files}
                      totalFiles={isConnected ? totalFiles : taskStatus.total_files}
                      status={currentStatus}
                      isConnected={isConnected}
                      connectionError={isConnected ? connectionError : "WebSocket连接断开，使用轮询模式获取状态"}
                      queuePosition={taskStatus.queue_position}
                    />
                  ) : (
                    /* 加载状态 */
                    <div className="hard-card">
                      <div className="p-6">
                        <div className="flex items-center justify-center space-x-3">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          <span className="text-blue-600 font-medium uppercase tracking-wide">正在获取任务状态...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  {taskStatus && (
                    <div className="hard-card">
                      <div className="p-6">
                        <ActionButtons
                          taskKey={taskKey}
                          taskStatus={taskStatus}
                          onDownload={handleDownload}
                          onReset={handleReset}
                          onCancel={cancelTask}
                          onRetry={retryTask}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="restore" className="space-y-6">
              <TaskIdInput onTaskRestore={handleTaskRestore} isLoading={isRestoring} />

              {taskKey && (
                <div className="space-y-6">
                  {/* 统一使用 RealtimeProgress 显示所有状态 */}
                  {taskStatus ? (
                    <RealtimeProgress
                      taskKey={taskKey}
                      fileName={fileName}
                      progress={isConnected ? progress : (taskStatus.progress || 0)}
                      currentStep={isConnected ? currentStep : "轮询状态中..."}
                      message={isConnected ? currentMessage : (taskStatus.message || "正在轮询获取任务状态...")}
                      processedFiles={isConnected ? processedFiles : taskStatus.processed_files}
                      totalFiles={isConnected ? totalFiles : taskStatus.total_files}
                      status={currentStatus}
                      isConnected={isConnected}
                      connectionError={isConnected ? connectionError : "WebSocket连接断开，使用轮询模式获取状态"}
                      queuePosition={taskStatus.queue_position}
                    />
                  ) : (
                    /* 加载状态 */
                    <div className="hard-card">
                      <div className="p-6">
                        <div className="flex items-center justify-center space-x-3">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          <span className="text-blue-600 font-medium uppercase tracking-wide">正在获取任务状态...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  {taskStatus && (
                    <div className="hard-card">
                      <div className="p-6">
                        <ActionButtons
                          taskKey={taskKey}
                          taskStatus={taskStatus}
                          onDownload={handleDownload}
                          onReset={handleReset}
                          onCancel={cancelTask}
                          onRetry={retryTask}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
