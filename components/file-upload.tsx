"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { validateFile, formatFileSize } from "@/lib/utils/file"
import { useI18n } from "@/components/i18n-provider"

interface FileUploadProps {
  file: File | null
  onFileSelect: (file: File) => void
  onFileRemove: () => void
}

export const FileUpload = ({ file, onFileSelect, onFileRemove }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()
  const { t } = useI18n()

  const handleFileSelect = (selectedFile: File) => {
    const validation = validateFile(selectedFile)

    if (!validation.valid) {
      toast({
        title: t("fileUpload.invalidFormatTitle"),
        description: validation.error,
        variant: "destructive",
      })
      return
    }

    onFileSelect(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-white">{t("fileUpload.label")}</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-green-500 bg-green-950"
            : file
              ? "border-green-600 bg-green-950"
              : "border-zinc-700 bg-zinc-900 hover:border-green-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="space-y-3">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
            <div>
              <p className="font-medium text-white">{file.name}</p>
              <p className="text-sm text-zinc-400">{formatFileSize(file.size)}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onFileRemove} className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
              {t("fileUpload.replace")}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-lg font-medium text-white">{t("fileUpload.dropOrSelect")}</p>
              <p className="text-sm text-zinc-400">{t("fileUpload.supportText")}</p>
            </div>
            <Button
              variant="outline"
              className="cursor-pointer border-green-600 text-green-400 hover:bg-green-950"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {t("fileUpload.selectFile")}
            </Button>
            <input
              type="file"
              accept=".rwmod"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]
                if (selectedFile) handleFileSelect(selectedFile)
              }}
              className="hidden"
              id="file-upload"
            />
          </div>
        )}
      </div>
    </div>
  )
}
