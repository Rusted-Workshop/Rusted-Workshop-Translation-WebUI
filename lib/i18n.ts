export const SUPPORTED_LOCALES = ["zh-CN", "en"] as const

export type InterfaceLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: InterfaceLocale = "zh-CN"
export const LOCALE_STORAGE_KEY = "interface-locale"

const messages = {
  "zh-CN": {
    meta: {
      title: "铁锈工坊 - AI汉化",
      description: "Rusted Workshop Translation",
    },
    common: {
      beta: "Beta",
      testVersion: "测试版",
      loadingTaskStatus: "正在获取任务状态...",
      copied: "已复制",
      taskIdCopied: "任务ID已复制到剪贴板",
      language: "语言",
    },
    nav: {
      workshop: "铁锈工坊",
      toolSubtitle: "汉化组工具",
      workshopSite: "铁锈工坊",
      translationTool: "汉化工具",
      about: "关于",
    },
    footer: {
      copyright: "© 2025 铁锈工坊 - 工具",
    },
    home: {
      title: "铁锈工坊 - AI汉化",
      subtitle: "开放测试",
      uploadTab: "汉化模组",
      restoreTab: "查找任务",
      cardTitle: "模组汉化",
      cardSubtitle: "MOD TRANSLATION",
      cardDescription: "上传模组文件, 全自动汉化",
      styleLabel: "汉化风格",
      autoStyleLabel: "智能识别",
      autoStyleDescription: "AI 分析模组文件原风格",
      recommended: "推荐",
      uploadInProgress: "上传中...",
      startTranslation: "开始汉化",
    },
    targetLanguages: {
      label: "目标语言",
      placeholder: "请选择目标语言",
      "zh-CN": "简体中文",
      "zh-TW": "繁体中文",
      ja: "日语",
      ko: "韩语",
      en: "英语",
      ru: "俄语",
      de: "德语",
      fr: "法语",
      es: "西班牙语",
      it: "意大利语",
      pt: "葡萄牙语",
      ar: "阿拉伯语",
      hi: "印地语",
      nl: "荷兰语",
      pl: "波兰语",
      ro: "罗马尼亚语",
      sv: "瑞典语",
      tr: "土耳其语",
      uk: "乌克兰语",
      vi: "越南语",
    },
    translationStyles: {
      formal: {
        label: "正式风格",
        description: "使用正式、严谨的翻译风格",
      },
      casual: {
        label: "休闲风格",
        description: "使用轻松、口语化的翻译风格",
      },
      military: {
        label: "军事风格",
        description: "使用军事术语和严肃的语调",
      },
      literal: {
        label: "直译风格",
        description: "尽可能保持原文的字面意思",
      },
    },
    fileUpload: {
      label: "模组文件",
      replace: "重新选择",
      dropOrSelect: "拖拽文件到此处或点击选择",
      supportText: "支持 .rwmod 格式，最大 100MB",
      selectFile: "选择文件",
      invalidFormatTitle: "文件格式错误",
      invalidExtension: "请选择 .rwmod 格式的模组文件",
      fileTooLarge: "文件大小不能超过 100MB",
    },
    taskRestore: {
      title: "任务恢复",
      subtitle: "TASK RESTORE",
      description: "输入任务ID来查看和恢复之前的翻译任务进度",
      taskIdLabel: "任务ID",
      searching: "查询中...",
      searchTask: "查询任务",
    },
    actionButtons: {
      taskCompleted: "任务完成",
      taskFailed: "任务失败",
      taskControl: "任务控制",
      downloadFile: "下载文件",
      newTask: "新任务",
      copyTaskId: "复制任务ID",
      restart: "重新开始",
      retry: "重试",
      cancelTask: "取消任务",
    },
    progress: {
      title: "任务状态",
      subtitle: "TASK MONITOR",
      taskInfo: "任务信息",
      fileName: "文件名",
      taskId: "任务ID",
      queuePosition: "队列位置",
      queuePositionValue: "第 {position} 位",
      nextInQueue: "下一个处理",
      overallProgress: "总体进度",
      progressTitle: "进度",
      fileProcessingTitle: "文件处理进度",
      fileProgress: "文件进度",
      processedFiles: "已处理文件",
      completedPercent: "{percent}% 完成",
      statusMessage: "状态信息",
      lastUpdate: "最后更新",
      pending: "等待处理",
      queued: "排队中",
      processing: "正在处理",
      completed: "处理完成",
      failed: "处理失败",
      cancelled: "已取消",
      unknown: "未知状态",
    },
    taskMessages: {
      failedDefault: "任务处理失败",
      completed: "任务处理完成",
      processing: "任务处理中",
      pending: "任务等待处理中",
    },
    taskManager: {
      uploadSuccess: "上传成功",
      uploadSuccessDescription: "模组文件已上传，开始处理中...",
      uploadFailed: "上传失败",
      retryLater: "请稍后重试",
      restoreSuccess: "任务恢复成功",
      restoreSuccessDescription: "已恢复任务 {taskId}",
      taskNotFound: "任务不存在或已过期",
      restoreFailed: "恢复失败",
      cannotFindTask: "无法找到该任务",
      translationCompleted: "汉化完成",
      translationCompletedDescription: "你的模组已成功汉化，可以下载了！",
      translationFailed: "汉化失败",
      processingError: "处理过程中出现错误",
      downloadFailed: "下载失败",
      downloadSuccess: "下载成功",
      downloadStarted: "汉化模组已开始下载",
      taskCancelled: "任务已取消",
      taskCancelledDescription: "你可以重新上传文件",
      cancelFailed: "取消失败",
      retrySuccess: "重试成功",
      retrySuccessDescription: "任务已重新开始处理",
      retryFailed: "重试失败",
    },
    api: {
      backendError: "后端服务错误 ({status})",
      noTaskId: "后端未返回任务ID",
      createTaskFailed: "创建任务失败",
      getTaskStatusFailed: "获取任务状态失败",
      getDownloadUrlFailed: "获取下载链接失败",
      invalidDownloadUrl: "下载链接无效",
      cancelTaskFailed: "取消任务失败",
      retryTaskFailed: "重试任务失败",
      downloadResultFailed: "下载结果失败",
    },
    about: {
      title: "关于我们",
      subtitle: "铁锈工坊",
      intro: "我们致力于为铁锈提供易用的创作工具和平台",
      workshopTitle: "铁锈工坊",
      workshopDescription: "铁锈工坊是一个专注于铁锈模组创作的平台，我们希望更多的玩家能够享受到优质的游戏体验。",
      aiTitle: "AI 智能汉化",
      aiDescription: "使用 GPT 5.3 模型，结合向量化技术，为游戏模组提供专业的翻译服务，保持原有风格和语境",
      contactTitle: "联系我们",
      contactDescription: "有问题或建议？我们很乐意听到你的声音",
      qqGroup: "QQ 群",
      cta: "立即体验",
      thanksTitle: "感谢支持",
      thanksDescription: "感谢所有开发者、贡献者、校对人员、测试人员、以及我们的用户",
    },
  },
  en: {
    meta: {
      title: "Rusted Workshop - AI Translation",
      description: "Rusted Workshop Translation",
    },
    common: {
      beta: "Beta",
      testVersion: "Preview",
      loadingTaskStatus: "Loading task status...",
      copied: "Copied",
      taskIdCopied: "Task ID copied to clipboard",
      language: "Language",
    },
    nav: {
      workshop: "Rusted Workshop",
      toolSubtitle: "Localization Tools",
      workshopSite: "Rusted Workshop",
      translationTool: "Translation Tool",
      about: "About",
    },
    footer: {
      copyright: "© 2025 Rusted Workshop - Tools",
    },
    home: {
      title: "Rusted Workshop - AI Translation",
      subtitle: "Open Beta",
      uploadTab: "Translate Mod",
      restoreTab: "Find Task",
      cardTitle: "Mod Translation",
      cardSubtitle: "MOD TRANSLATION",
      cardDescription: "Upload a mod package for fully automated translation",
      styleLabel: "Translation Style",
      autoStyleLabel: "Smart Detection",
      autoStyleDescription: "AI analyzes the source style of the mod files",
      recommended: "Recommended",
      uploadInProgress: "Uploading...",
      startTranslation: "Start Translation",
    },
    targetLanguages: {
      label: "Target Language",
      placeholder: "Select a target language",
      "zh-CN": "Simplified Chinese",
      "zh-TW": "Traditional Chinese",
      ja: "Japanese",
      ko: "Korean",
      en: "English",
      ru: "Russian",
      de: "German",
      fr: "French",
      es: "Spanish",
      it: "Italian",
      pt: "Portuguese",
      ar: "Arabic",
      hi: "Hindi",
      nl: "Dutch",
      pl: "Polish",
      ro: "Romanian",
      sv: "Swedish",
      tr: "Turkish",
      uk: "Ukrainian",
      vi: "Vietnamese",
    },
    translationStyles: {
      formal: {
        label: "Formal",
        description: "Use a formal and precise translation style",
      },
      casual: {
        label: "Casual",
        description: "Use a relaxed and conversational tone",
      },
      military: {
        label: "Military",
        description: "Use military terminology and a serious tone",
      },
      literal: {
        label: "Literal",
        description: "Preserve the wording of the source text as closely as possible",
      },
    },
    fileUpload: {
      label: "Mod File",
      replace: "Choose Another File",
      dropOrSelect: "Drag a file here or click to select",
      supportText: "Supports .rwmod files, up to 100MB",
      selectFile: "Choose File",
      invalidFormatTitle: "Invalid File Format",
      invalidExtension: "Please select a mod file in .rwmod format",
      fileTooLarge: "File size must not exceed 100MB",
    },
    taskRestore: {
      title: "Restore Task",
      subtitle: "TASK RESTORE",
      description: "Enter a task ID to view and resume a previous translation task",
      taskIdLabel: "Task ID",
      searching: "Searching...",
      searchTask: "Search Task",
    },
    actionButtons: {
      taskCompleted: "Task Completed",
      taskFailed: "Task Failed",
      taskControl: "Task Control",
      downloadFile: "Download File",
      newTask: "New Task",
      copyTaskId: "Copy Task ID",
      restart: "Start Over",
      retry: "Retry",
      cancelTask: "Cancel Task",
    },
    progress: {
      title: "Task Status",
      subtitle: "TASK MONITOR",
      taskInfo: "Task Info",
      fileName: "File Name",
      taskId: "Task ID",
      queuePosition: "Queue Position",
      queuePositionValue: "#{position}",
      nextInQueue: "Next to process",
      overallProgress: "Overall Progress",
      progressTitle: "Progress",
      fileProcessingTitle: "File Processing",
      fileProgress: "File Progress",
      processedFiles: "Processed Files",
      completedPercent: "{percent}% complete",
      statusMessage: "Status Message",
      lastUpdate: "Last update",
      pending: "Pending",
      queued: "Queued",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
      unknown: "Unknown",
    },
    taskMessages: {
      failedDefault: "Task failed",
      completed: "Task completed",
      processing: "Task is processing",
      pending: "Task is waiting to be processed",
    },
    taskManager: {
      uploadSuccess: "Upload Successful",
      uploadSuccessDescription: "The mod file has been uploaded and processing has started.",
      uploadFailed: "Upload Failed",
      retryLater: "Please try again later",
      restoreSuccess: "Task Restored",
      restoreSuccessDescription: "Task {taskId} has been restored",
      taskNotFound: "The task does not exist or has expired",
      restoreFailed: "Restore Failed",
      cannotFindTask: "Unable to find this task",
      translationCompleted: "Translation Completed",
      translationCompletedDescription: "Your mod has been translated successfully and is ready to download.",
      translationFailed: "Translation Failed",
      processingError: "An error occurred during processing",
      downloadFailed: "Download Failed",
      downloadSuccess: "Download Started",
      downloadStarted: "The translated mod has started downloading",
      taskCancelled: "Task Cancelled",
      taskCancelledDescription: "You can upload a new file now",
      cancelFailed: "Cancel Failed",
      retrySuccess: "Retry Started",
      retrySuccessDescription: "The task has been restarted",
      retryFailed: "Retry Failed",
    },
    api: {
      backendError: "Backend service error ({status})",
      noTaskId: "The backend did not return a task ID",
      createTaskFailed: "Failed to create task",
      getTaskStatusFailed: "Failed to get task status",
      getDownloadUrlFailed: "Failed to get download URL",
      invalidDownloadUrl: "Invalid download URL",
      cancelTaskFailed: "Failed to cancel task",
      retryTaskFailed: "Failed to retry task",
      downloadResultFailed: "Failed to download result",
    },
    about: {
      title: "About Us",
      subtitle: "Rusted Workshop",
      intro: "We build practical creation tools and platforms for Rusted Warfare creators.",
      workshopTitle: "Rusted Workshop",
      workshopDescription: "Rusted Workshop is a platform focused on Rusted Warfare mod creation, aiming to help more players enjoy higher-quality gameplay experiences.",
      aiTitle: "AI Localization",
      aiDescription: "Powered by GPT 5.3 and vector search techniques, this service provides professional mod translation while preserving original tone and context.",
      contactTitle: "Contact Us",
      contactDescription: "Questions or suggestions? We'd like to hear from you.",
      qqGroup: "QQ Group",
      cta: "Try It Now",
      thanksTitle: "Thanks for the Support",
      thanksDescription: "Thanks to all developers, contributors, proofreaders, testers, and users.",
    },
  },
} as const

type Messages = typeof messages
type TranslationKey = ExtractNestedKeys<Messages[typeof DEFAULT_LOCALE]>

type Primitive = string | number | boolean | null | undefined

type ExtractNestedKeys<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends string
    ? TKey
    : TObj[TKey] extends Record<string, unknown>
      ? `${TKey}.${ExtractNestedKeys<TObj[TKey]>}`
      : never
}[keyof TObj & string]

function isSupportedLocale(locale: string): locale is InterfaceLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
}

function getValue(locale: InterfaceLocale, key: TranslationKey): string {
  const segments = key.split(".")
  let current: unknown = messages[locale]

  for (const segment of segments) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      current = undefined
      break
    }
    current = (current as Record<string, unknown>)[segment]
  }

  if (typeof current === "string") {
    return current
  }

  return key
}

export function translate(
  locale: InterfaceLocale,
  key: TranslationKey,
  vars?: Record<string, Primitive>
): string {
  const template = getValue(locale, key)
  if (!vars) {
    return template
  }

  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`))
}

export function resolveLocale(input?: string | null): InterfaceLocale {
  if (!input) {
    return DEFAULT_LOCALE
  }

  if (isSupportedLocale(input)) {
    return input
  }

  const lower = input.toLowerCase()
  if (lower.startsWith("zh")) {
    return "zh-CN"
  }

  if (lower.startsWith("en")) {
    return "en"
  }

  return DEFAULT_LOCALE
}

export function getBrowserLocale(): InterfaceLocale {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE
  }

  return resolveLocale(navigator.language)
}

export function getStoredLocale(): InterfaceLocale | null {
  if (typeof window === "undefined") {
    return null
  }

  return resolveLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY))
}

export function getInterfaceLocale(): InterfaceLocale {
  return getStoredLocale() || getBrowserLocale()
}
